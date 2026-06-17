import { useState, useMemo } from 'react';
import {
  modelFamilies,
  type BenchmarkScores,
  type Region,
  type Openness,
  type Model,
  getScoreClass,
  getModelTypeLabel,
  getModelTypeBadgeClass,
  getOpennessLabel,
  getOpennessBadgeClass,
  getMonogram,
  regionOrder,
  regionLabels,
  formatDate,
} from '../data/models';

const BENCHMARK_COLUMNS = [
  { key: 'aaii', label: 'AA Index' },
  { key: 'gpqa', label: 'GPQA' },
  { key: 'sweBench', label: 'SWE-bench' },
  { key: 'aime', label: 'AIME' },
  { key: 'mmluPro', label: 'MMLU-Pro' },
  { key: 'liveCodeBench', label: 'LiveCodeBench' },
  { key: 'mmmu', label: 'MMMU' },
] as const;

type BenchmarkKey = typeof BENCHMARK_COLUMNS[number]['key'];

interface TableRow {
  familyId: string;
  familyName: string;
  country: string;
  region: Region;
  logoId?: string;
  monogram: string;
  brandColor: string;
  modelId: string;
  modelName: string;
  modelType: Model['type'];
  typeLabel: string;
  parameters: string;
  activeParams?: string;
  context: string;
  benchmarks: BenchmarkScores;
  releaseDate: string;
  openness: Openness;
}

const TYPE_OPTIONS: Model['type'][] = ['reasoning', 'non-reasoning', 'coding', 'multimodal', 'general'];
const OPENNESS_OPTIONS: Openness[] = ['open-source', 'open-weight', 'restricted', 'closed'];

function RowLogo({ row }: { row: TableRow }) {
  if (row.logoId) {
    return (
      <span class="flex h-6 w-6 items-center justify-center rounded-md bg-white ring-1 ring-black/5 shrink-0 overflow-hidden">
        <img src={`/logos/${row.logoId}.svg`} alt="" width="14" height="14" class="h-3.5 w-3.5 object-contain" loading="lazy" />
      </span>
    );
  }
  return (
    <span
      class="flex h-6 w-6 items-center justify-center rounded-md ring-1 ring-black/5 shrink-0"
      style={{ background: row.brandColor }}
      aria-hidden="true"
    >
      <span class="text-white font-semibold leading-none" style={{ fontSize: row.monogram.length > 2 ? '7px' : '9px' }}>{row.monogram}</span>
    </span>
  );
}

function openModal(familyId: string, modelId: string) {
  const fn = (window as any).openModelModal;
  if (typeof fn === 'function') fn(familyId, modelId);
}

export default function BenchmarkTable() {
  const [sortKey, setSortKey] = useState<BenchmarkKey | 'modelName'>('aaii');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [regionFilter, setRegionFilter] = useState<Region | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<Model['type'] | 'all'>('all');
  const [opennessFilter, setOpennessFilter] = useState<Openness | 'all'>('all');
  const [query, setQuery] = useState('');

  const rows = useMemo((): TableRow[] => {
    const result: TableRow[] = [];
    for (const family of modelFamilies) {
      for (const model of family.models) {
        result.push({
          familyId: family.id,
          familyName: family.name,
          country: family.country,
          region: family.region,
          logoId: family.logoId,
          monogram: getMonogram(family),
          brandColor: family.brandColor,
          modelId: model.id,
          modelName: model.name,
          modelType: model.type,
          typeLabel: getModelTypeLabel(model.type),
          parameters: model.parameters,
          activeParams: model.activeParams,
          context: model.contextWindow,
          benchmarks: model.benchmarks,
          releaseDate: formatDate(model.releaseDate),
          openness: model.openness,
        });
      }
    }
    return result;
  }, []);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(r => {
      if (regionFilter !== 'all' && r.region !== regionFilter) return false;
      if (typeFilter !== 'all' && r.modelType !== typeFilter) return false;
      if (opennessFilter !== 'all' && r.openness !== opennessFilter) return false;
      if (q && !r.modelName.toLowerCase().includes(q) && !r.familyName.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, regionFilter, typeFilter, opennessFilter, query]);

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';
      if (sortKey === 'modelName') {
        aVal = a.modelName.toLowerCase();
        bVal = b.modelName.toLowerCase();
      } else {
        aVal = a.benchmarks[sortKey] ?? -1;
        bVal = b.benchmarks[sortKey] ?? -1;
      }
      if (aVal === bVal) return 0;
      const dir = sortDir === 'asc' ? 1 : -1;
      return aVal > bVal ? dir : -dir;
    });
  }, [filteredRows, sortKey, sortDir]);

  const handleSort = (key: BenchmarkKey | 'modelName') => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const getSortIcon = (key: BenchmarkKey | 'modelName') => {
    if (sortKey !== key) return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M7 16l5 5 5-5M7 8l5-5 5 5" />
      </svg>
    );
    return sortDir === 'asc' ? (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M7 16l5 5 5-5" />
      </svg>
    ) : (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M7 8l5-5 5 5" />
      </svg>
    );
  };

  const formatScore = (score: number | undefined) => (score === undefined ? '-' : String(score));

  const selectClass = "rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700";

  return (
    <div>
      <div class="flex flex-wrap items-center gap-2.5 mb-4">
        <input
          type="search"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
          placeholder="Search model or lab..."
          class={`${selectClass} flex-1 min-w-[160px]`}
          aria-label="Search model or lab"
        />
        <select class={selectClass} value={regionFilter} onChange={(e) => setRegionFilter((e.target as HTMLSelectElement).value as Region | 'all')} aria-label="Filter by region">
          <option value="all">All regions</option>
          {regionOrder.map(r => (
            <option key={r} value={r}>{regionLabels[r]}</option>
          ))}
        </select>
        <select class={selectClass} value={typeFilter} onChange={(e) => setTypeFilter((e.target as HTMLSelectElement).value as Model['type'] | 'all')} aria-label="Filter by type">
          <option value="all">All types</option>
          {TYPE_OPTIONS.map(ty => (
            <option key={ty} value={ty}>{getModelTypeLabel(ty)}</option>
          ))}
        </select>
        <select class={selectClass} value={opennessFilter} onChange={(e) => setOpennessFilter((e.target as HTMLSelectElement).value as Openness | 'all')} aria-label="Filter by openness">
          <option value="all">All openness</option>
          {OPENNESS_OPTIONS.map(o => (
            <option key={o} value={o}>{getOpennessLabel(o)}</option>
          ))}
        </select>
        <span class="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums whitespace-nowrap ml-auto">
          {sortedRows.length} models
        </span>
      </div>

      <div class="table-container">
        <table class="benchmark-table" role="table">
          <thead>
            <tr>
              <th scope="col" class="w-[190px] min-w-[190px]">
                <button onClick={() => handleSort('modelName')} class="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors" aria-label="Sort by family">
                  Family / Lab {getSortIcon('modelName')}
                </button>
              </th>
              <th scope="col" class="w-[180px] min-w-[180px]">
                <button onClick={() => handleSort('modelName')} class="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors" aria-label="Sort by model">
                  Model {getSortIcon('modelName')}
                </button>
              </th>
              <th scope="col" class="w-[100px] min-w-[100px] text-center">Type</th>
              <th scope="col" class="w-[110px] min-w-[110px] text-center">Parameters</th>
              <th scope="col" class="w-[90px] min-w-[90px] text-center">Context</th>
              {BENCHMARK_COLUMNS.map(col => (
                <th key={col.key} scope="col" class="w-[92px] min-w-[92px] text-center">
                  <button onClick={() => handleSort(col.key)} class="flex items-center justify-center gap-1 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors w-full" aria-label={`Sort by ${col.label}`}>
                    {col.label} {getSortIcon(col.key)}
                  </button>
                </th>
              ))}
              <th scope="col" class="w-[120px] min-w-[120px] text-center">Openness</th>
              <th scope="col" class="w-[100px] min-w-[100px] text-center">Release</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, index) => (
              <tr
                key={row.modelId}
                class={`cursor-pointer ${index % 2 === 0 ? '' : 'bg-neutral-50/50 dark:bg-neutral-900/50'}`}
                onClick={() => openModal(row.familyId, row.modelId)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(row.familyId, row.modelId); } }}
                tabIndex={0}
                role="button"
                title={`Open ${row.familyName} details`}
              >
                <td class="font-medium text-neutral-900 dark:text-neutral-50">
                  <div class="flex items-center gap-2.5">
                    <RowLogo row={row} />
                    <span class="truncate block">{row.country} {row.familyName}</span>
                  </div>
                </td>
                <td class="font-medium text-neutral-700 dark:text-neutral-300">{row.modelName}</td>
                <td class="text-center">
                  <span class={`model-type-badge ${getModelTypeBadgeClass(row.modelType)} inline-block`}>{row.typeLabel}</span>
                </td>
                <td class="text-center font-mono text-neutral-600 dark:text-neutral-400 text-xs">
                  {row.parameters}{row.activeParams ? <span class="text-neutral-400 dark:text-neutral-500">/{row.activeParams}</span> : ''}
                </td>
                <td class="text-center font-mono text-neutral-600 dark:text-neutral-400 text-xs">{row.context}</td>
                {BENCHMARK_COLUMNS.map(col => (
                  <td key={col.key} class="text-center">
                    <span class={`score-cell ${getScoreClass(row.benchmarks[col.key as BenchmarkKey], col.key as BenchmarkKey)}`}>
                      {formatScore(row.benchmarks[col.key as BenchmarkKey])}
                    </span>
                  </td>
                ))}
                <td class="text-center">
                  <span class={`badge ${getOpennessBadgeClass(row.openness)} inline-block`}>{getOpennessLabel(row.openness)}</span>
                </td>
                <td class="text-center text-neutral-500 dark:text-neutral-400 text-xs">{row.releaseDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
