import { useEffect, useState } from 'react';

interface LanguageToggleProps {
  id?: string;
}

export default function LanguageToggle({ id }: LanguageToggleProps) {
  const [lang, setLang] = useState<'pt' | 'en'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('lang') as 'pt' | 'en' | null;
    if (stored) {
      setLang(stored);
    } else {
      const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
      setLang(browserLang);
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'pt' ? 'en' : 'pt';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
    window.location.reload();
  };

  if (!mounted) {
    return (
      <button
        id={id}
        class="btn-primary gap-1 px-3"
        aria-label="Loading language..."
        disabled
      >
        <span class="w-4 h-4 border-2 border-neutral-300 border-t-transparent rounded-full animate-spin" />
      </button>
    );
  }

  return (
    <button
      id={id}
      onClick={toggleLang}
      class="btn-primary gap-1 px-3"
      aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <span class="font-medium uppercase tracking-[0.1em] text-xs">
        {lang === 'pt' ? 'EN' : 'PT'}
      </span>
    </button>
  );
}