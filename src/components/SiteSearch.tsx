import { useEffect, useMemo, useRef, useState } from 'react';
import { modelFamilies, getMonogram, getModelTypeLabel, type ModelFamily } from '../data/models';

interface SearchItem {
  type: 'lab' | 'model';
  familyId: string;
  modelId?: string;
  title: string;
  subtitle: string;
  logoId?: string;
  monogram: string;
  brandColor: string;
  country: string;
  haystack: string;
}

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const f of modelFamilies as ModelFamily[]) {
    const base = {
      familyId: f.id,
      logoId: f.logoId,
      monogram: getMonogram(f),
      brandColor: f.brandColor,
      country: f.country,
    };
    items.push({
      ...base,
      type: 'lab',
      title: f.name,
      subtitle: f.creator,
      haystack: `${f.name} ${f.creator}`.toLowerCase(),
    });
    for (const m of f.models) {
      items.push({
        ...base,
        type: 'model',
        modelId: m.id,
        title: m.name,
        subtitle: `${getModelTypeLabel(m.type)} · ${f.name}`,
        haystack: `${m.name} ${f.name}`.toLowerCase(),
      });
    }
  }
  return items;
}

function ItemLogo({ item }: { item: SearchItem }) {
  if (item.logoId) {
    return (
      <span class="flex h-6 w-6 items-center justify-center rounded-md bg-white ring-1 ring-black/5 shrink-0 overflow-hidden">
        <img src={`/logos/${item.logoId}.svg`} alt="" width="14" height="14" class="h-3.5 w-3.5 object-contain" loading="lazy" />
      </span>
    );
  }
  return (
    <span class="flex h-6 w-6 items-center justify-center rounded-md ring-1 ring-black/5 shrink-0" style={{ background: item.brandColor }} aria-hidden="true">
      <span class="text-white font-semibold leading-none" style={{ fontSize: item.monogram.length > 2 ? '7px' : '9px' }}>{item.monogram}</span>
    </span>
  );
}

function highlight(text: string, q: string) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark class="bg-amber-200/70 dark:bg-amber-400/30 text-inherit rounded-[2px] px-0.5">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

function flashCard(familyId: string) {
  const el = document.getElementById(familyId);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.add('search-flash');
  setTimeout(() => el.classList.remove('search-flash'), 1900);
}

export default function SiteSearch() {
  const index = useMemo(buildIndex, []);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const scored = index
      .filter(it => it.haystack.includes(q))
      .map(it => ({ it, score: (it.title.toLowerCase().startsWith(q) ? 0 : 1) + (it.type === 'lab' ? 0 : 0.1) }))
      .sort((a, b) => a.score - b.score);
    return scored.slice(0, 8).map(s => s.it);
  }, [index, query]);

  useEffect(() => { setActive(0); }, [query]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    // Keyboard shortcut: "/" focuses search
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        const tag = (document.activeElement?.tagName || '').toLowerCase();
        if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, []);

  const select = (it: SearchItem | undefined) => {
    if (!it) return;
    setOpen(false);
    setQuery('');
    inputRef.current?.blur();
    if (it.type === 'model') {
      const fn = (window as any).openModelModal;
      if (typeof fn === 'function') { fn(it.familyId, it.modelId); return; }
    }
    flashCard(it.familyId);
  };

  const onKeyDown = (e: any) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive(a => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); select(results[active]); }
    else if (e.key === 'Escape') { setOpen(false); (e.target as HTMLInputElement).blur(); }
  };

  return (
    <div ref={wrapRef} class="relative w-full max-w-xs">
      <div class="relative">
        <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onInput={(e) => { setQuery((e.target as HTMLInputElement).value); setOpen(true); }}
          onFocus={() => { if (query) setOpen(true); }}
          onKeyDown={onKeyDown}
          placeholder="Search models, labs..."
          aria-label="Search models and labs"
          class="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 pl-8 pr-3 py-1.5 text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 focus:bg-white dark:focus:bg-neutral-900"
        />
      </div>

      {open && results.length > 0 && (
        <div class="absolute left-0 right-0 mt-2 z-[60] overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xl">
          <ul class="max-h-[60vh] overflow-y-auto py-1">
            {results.map((it, i) => (
              <li key={`${it.familyId}-${it.modelId ?? 'lab'}`}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => select(it)}
                  class={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${i === active ? 'bg-neutral-100 dark:bg-neutral-900' : ''}`}
                >
                  <ItemLogo item={it} />
                  <span class="min-w-0 flex-1">
                    <span class="block text-sm font-medium text-neutral-900 dark:text-neutral-50 truncate">{highlight(it.title, query)}</span>
                    <span class="block text-xs text-neutral-500 dark:text-neutral-400 truncate">{it.country} {it.subtitle}</span>
                  </span>
                  <span class={`text-[10px] font-medium uppercase tracking-[0.1em] shrink-0 ${it.type === 'lab' ? 'text-blue-500' : 'text-neutral-400 dark:text-neutral-500'}`}>{it.type}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div class="absolute left-0 right-0 mt-2 z-[60] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xl px-3 py-3 text-sm text-neutral-500 dark:text-neutral-400">
          No matches for "{query}"
        </div>
      )}
    </div>
  );
}
