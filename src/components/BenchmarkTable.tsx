import { useState, useMemo } from 'react';
import { modelFamilies, type BenchmarkScores, getScoreClass, getModelTypeLabel, getModelTypeBadgeClass, formatDate } from '../data/models';
import type { Locale } from '../scripts/i18n';

interface BenchmarkTableProps {
  locale: Locale;
}

const BENCHMARK_COLUMNS = [
  { key: 'benchlm', label: 'BenchLM', color: 'blue' },
  { key: 'artificialAnalysis', label: 'Artificial Analysis', color: 'purple' },
  { key: 'sweBench', label: 'SWE-Bench', color: 'green' },
  { key: 'mathArena', label: 'MathArena', color: 'orange' },
  { key: 'mmmu', label: 'MMMU', color: 'pink' },
  { key: 'gpqa', label: 'GPQA', color: 'indigo' },
] as const;

type BenchmarkKey = typeof BENCHMARK_COLUMNS[number]['key'];

interface TableRow {
  familyId: string;
  familyName: string;
  modelId: string;
  modelName: string;
  type: string;
  parameters: string;
  activeParams?: string;
  context: string;
  benchmarks: BenchmarkScores;
  releaseDate: string;
  isOpenWeight: boolean;
}

function getTranslations(locale: Locale) {
  return {
    modelFamily: { pt: 'Família / Lab', en: 'Family / Lab' },
    modelName: { pt: 'Modelo', en: 'Model' },
    type: { pt: 'Tipo', en: 'Type' },
    params: { pt: 'Parâmetros', en: 'Parameters' },
    activeParams: { pt: 'Parâmetros Ativos', en: 'Active Params' },
    context: { pt: 'Contexto', en: 'Context' },
    benchlm: { pt: 'BenchLM', en: 'BenchLM' },
    artificialAnalysis: { pt: 'Artificial Analysis', en: 'Artificial Analysis' },
    sweBench: { pt: 'SWE-Bench', en: 'SWE-Bench' },
    mathArena: { pt: 'MathArena', en: 'MathArena' },
    mmmu: { pt: 'MMMU', en: 'MMMU' },
    gpqa: { pt: 'GPQA', en: 'GPQA' },
    lastUpdated: { pt: 'Última atualização', en: 'Last updated' },
    sortAsc: { pt: 'Ordem crescente', en: 'Ascending' },
    sortDesc: { pt: 'Ordem decrescente', en: 'Descending' },
    noData: { pt: '—', en: '—' },
  };
}

export default function BenchmarkTable({ locale }: BenchmarkTableProps) {
  const t = getTranslations(locale);
  const [sortKey, setSortKey] = useState<BenchmarkKey | 'modelName'>('benchlm');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [expandedFamily, setExpandedFamily] = useState<string | null>(null);

  const rows = useMemo((): TableRow[] => {
    const result: TableRow[] = [];
    for (const family of modelFamilies) {
      for (const model of family.models) {
        result.push({
          familyId: family.id,
          familyName: family.name,
          modelId: model.id,
          modelName: model.name,
          type: getModelTypeLabel(model.type, locale),
          parameters: model.parameters,
          activeParams: model.activeParams,
          context: model.contextWindow,
          benchmarks: model.benchmarks,
          releaseDate: formatDate(model.releaseDate, locale),
          isOpenWeight: model.isOpenWeight,
        });
      }
    }
    return result;
  }, [locale]);

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
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
  }, [rows, sortKey, sortDir]);

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

  const formatScore = (score: number | undefined) => {
    if (score === undefined) return t.noData[locale];
    return String(score);
  };

  return (
    <div class="table-container">
      <table class="benchmark-table" role="table">
        <thead>
          <tr>
            <th scope="col" class="w-[200px] min-w-[200px]">
              <button
                onClick={() => handleSort('modelName')}
                class="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
                aria-label={t.modelName[locale]}
                aria-sort={sortKey === 'modelName' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                {t.modelFamily[locale]} {getSortIcon('modelName')}
              </button>
            </th>
            <th scope="col" class="w-[180px] min-w-[180px]">
              <button
                onClick={() => handleSort('modelName')}
                class="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
                aria-label={t.modelName[locale]}
                aria-sort={sortKey === 'modelName' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                {t.modelName[locale]} {getSortIcon('modelName')}
              </button>
            </th>
            <th scope="col" class="w-[100px] min-w-[100px] text-center">
              {t.type[locale]}
            </th>
            <th scope="col" class="w-[90px] min-w-[90px] text-center">
              {t.params[locale]}
            </th>
            <th scope="col" class="w-[100px] min-w-[100px] text-center">
              {t.activeParams[locale]}
            </th>
            <th scope="col" class="w-[80px] min-w-[80px] text-center">
              {t.context[locale]}
            </th>
            {BENCHMARK_COLUMNS.map(col => (
              <th key={col.key} scope="col" class="w-[80px] min-w-[80px] text-center">
                <button
                  onClick={() => handleSort(col.key)}
                  class="flex items-center justify-center gap-1 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
                  aria-label={col.label}
                  aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  {col.label} {getSortIcon(col.key)}
                </button>
              </th>
            ))}
            <th scope="col" class="w-[100px] min-w-[100px] text-center">
              Open Weight
            </th>
            <th scope="col" class="w-[100px] min-w-[100px] text-center">
              Release
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) => (
            <tr key={row.modelId} class={index % 2 === 0 ? '' : 'bg-neutral-50/50 dark:bg-neutral-900/50'}>
              <td class="font-medium text-neutral-900 dark:text-neutral-50">
                <div class="flex items-center gap-2">
                  <img src={`/logos/${row.familyId}.svg`} alt="" width="18" height="18" class="h-[18px] w-[18px] shrink-0" />
                  <span class="truncate block">{row.familyName}</span>
                </div>
              </td>
              <td class="font-medium text-neutral-700 dark:text-neutral-300">
                {row.modelName}
              </td>
              <td class="text-center">
                <span class={`model-type-badge ${getModelTypeBadgeClass(row.modelId.includes('reasoning') ? 'reasoning' : row.modelId.includes('coding') ? 'coding' : row.modelId.includes('multimodal') ? 'multimodal' : row.modelId.includes('non-reasoning') ? 'non-reasoning' : 'general')} inline-block`}>
                  {row.type}
                </span>
              </td>
              <td class="text-center font-mono text-neutral-600 dark:text-neutral-400">{row.parameters}</td>
              <td class="text-center font-mono text-neutral-600 dark:text-neutral-400">{row.activeParams || '—'}</td>
              <td class="text-center font-mono text-neutral-600 dark:text-neutral-400">{row.context}</td>
              {BENCHMARK_COLUMNS.map(col => (
                <td key={col.key} class="text-center">
                  <span class={`score-cell ${getScoreClass(row.benchmarks[col.key as BenchmarkKey])}`}>
                    {formatScore(row.benchmarks[col.key as BenchmarkKey])}
                  </span>
                </td>
              ))}
              <td class="text-center">
                <span class={`badge ${row.isOpenWeight ? 'badge-green' : 'badge-gray'} inline-block`}>
                  {row.isOpenWeight ? '✓' : '✗'}
                </span>
              </td>
              <td class="text-center text-neutral-500 dark:text-neutral-400">{row.releaseDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}