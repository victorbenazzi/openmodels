export type Locale = 'pt' | 'en';

export const translations: Record<Locale, Record<string, string>> = {
  pt: {
    // Hero
    heroTitle: 'OpenModels',
    heroSubtitle: 'Catálogo dos principais modelos de IA chineses open source',
    heroDescription: 'Compare benchmarks, acesse interfaces oficiais e descubra qual modelo é ideal para seu caso de uso — tudo em um só lugar.',
    
    // Navigation
    navModels: 'Modelos',
    navBenchmarks: 'Benchmarks',
    navUseCases: 'Casos de Uso',
    navAbout: 'Sobre',
    
    // Model Cards
    officialWebsite: 'Site Oficial',
    chatInterface: 'Chat',
    huggingFace: 'Hugging Face',
    githubRepo: 'GitHub',
    flagshipModel: 'Modelo Principal',
    contextWindow: 'Janela de Contexto',
    license: 'Licença',
    openWeight: 'Pesos Abertos',
    closedWeight: 'Pesos Fechados',
    viewDetails: 'Ver detalhes',
    hideDetails: 'Ocultar',
    
    // Benchmarks
    benchmarksTitle: 'Comparativo de Benchmarks',
    benchmarksSubtitle: 'Pontuações das principais avaliações públicas. Valores mais altos = melhor desempenho.',
    modelFamily: 'Família / Lab',
    modelName: 'Modelo',
    type: 'Tipo',
    params: 'Parâmetros',
    activeParams: 'Parâmetros Ativos',
    context: 'Contexto',
    benchlm: 'BenchLM',
    artificialAnalysis: 'Artificial Analysis',
    sweBench: 'SWE-Bench',
    mathArena: 'MathArena',
    mmmu: 'MMMU',
    gpqa: 'GPQA',
    lastUpdated: 'Última atualização',
    sortAsc: 'Ordem crescente',
    sortDesc: 'Ordem decrescente',
    noData: '—',
    
    // Use Cases
    useCasesTitle: 'Melhor Modelo por Caso de Uso',
    useCasesSubtitle: 'Recomendações baseadas nos benchmarks mais recentes e feedback da comunidade.',
    bestForCoding: 'Melhor para Coding',
    bestForReasoning: 'Melhor para Reasoning',
    bestForMath: 'Melhor para Matemática',
    bestForAgentic: 'Melhor para Agentes/Tool Use',
    bestForLongContext: 'Melhor para Contexto Longo',
    bestForSelfHosting: 'Melhor para Self-Hosting',
    bestForMultilingual: 'Melhor para Multilíngue',
    bestOverall: 'Melhor Geral (Open Weight)',
    
    // Strengths
    strengthsTitle: 'Pontos Fortes',
    coding: 'Coding',
    reasoning: 'Reasoning',
    math: 'Matemática',
    agentic: 'Agentes/Tool Use',
    longContext: 'Contexto Longo',
    multilingual: 'Multilíngue',
    multimodal: 'Multimodal',
    speed: 'Velocidade',
    selfHosting: 'Self-Hosting',
    
    // Footer
    footerDataSource: 'Dados de benchmarks: BenchLM, Artificial Analysis, SWE-Bench Verified, MathArena, MMMU, GPQA Diamond.',
    footerDisclaimer: 'Benchmarks evoluem rapidamente. Verifique fontes originais para decisões críticas.',
    footerUpdated: 'Atualizado em',
    footerBuiltBy: 'Desenvolvido por Victor Benazzi',
    footerSourceCode: 'Código fonte',
    
    // Theme/Lang
    language: 'Idioma',
    portuguese: 'Português',
    english: 'English',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Escuro',
    system: 'Sistema',
    
    // Model Types
    typeReasoning: 'Reasoning',
    typeCoding: 'Coding',
    typeMultimodal: 'Multimodal',
    typeGeneral: 'General',
    typeNonReasoning: 'Non-Reasoning',
  },
  en: {
    // Hero
    heroTitle: 'OpenModels',
    heroSubtitle: 'Catalog of Top Chinese Open-Source AI Models',
    heroDescription: 'Compare benchmarks, access official interfaces, and discover the right model for your use case — all in one place.',
    
    // Navigation
    navModels: 'Models',
    navBenchmarks: 'Benchmarks',
    navUseCases: 'Use Cases',
    navAbout: 'About',
    
    // Model Cards
    officialWebsite: 'Official Website',
    chatInterface: 'Chat',
    huggingFace: 'Hugging Face',
    githubRepo: 'GitHub',
    flagshipModel: 'Flagship Model',
    contextWindow: 'Context Window',
    license: 'License',
    openWeight: 'Open Weight',
    closedWeight: 'Closed Weight',
    viewDetails: 'View details',
    hideDetails: 'Hide',
    
    // Benchmarks
    benchmarksTitle: 'Benchmark Comparison',
    benchmarksSubtitle: 'Scores from major public evaluations. Higher values = better performance.',
    modelFamily: 'Family / Lab',
    modelName: 'Model',
    type: 'Type',
    params: 'Parameters',
    activeParams: 'Active Params',
    context: 'Context',
    benchlm: 'BenchLM',
    artificialAnalysis: 'Artificial Analysis',
    sweBench: 'SWE-Bench',
    mathArena: 'MathArena',
    mmmu: 'MMMU',
    gpqa: 'GPQA',
    lastUpdated: 'Last updated',
    sortAsc: 'Ascending',
    sortDesc: 'Descending',
    noData: '—',
    
    // Use Cases
    useCasesTitle: 'Best Model by Use Case',
    useCasesSubtitle: 'Recommendations based on latest benchmarks and community feedback.',
    bestForCoding: 'Best for Coding',
    bestForReasoning: 'Best for Reasoning',
    bestForMath: 'Best for Math',
    bestForAgentic: 'Best for Agentic/Tool Use',
    bestForLongContext: 'Best for Long Context',
    bestForSelfHosting: 'Best for Self-Hosting',
    bestForMultilingual: 'Best for Multilingual',
    bestOverall: 'Best Overall (Open Weight)',
    
    // Strengths
    strengthsTitle: 'Strengths',
    coding: 'Coding',
    reasoning: 'Reasoning',
    math: 'Math',
    agentic: 'Agentic/Tool Use',
    longContext: 'Long Context',
    multilingual: 'Multilingual',
    multimodal: 'Multimodal',
    speed: 'Speed',
    selfHosting: 'Self-Hosting',
    
    // Footer
    footerDataSource: 'Benchmark sources: BenchLM, Artificial Analysis, SWE-Bench Verified, MathArena, MMMU, GPQA Diamond.',
    footerDisclaimer: 'Benchmarks evolve rapidly. Verify original sources for critical decisions.',
    footerUpdated: 'Updated on',
    footerBuiltBy: 'Built by Victor Benazzi',
    footerSourceCode: 'Source code',
    
    // Theme/Lang
    language: 'Language',
    portuguese: 'Português',
    english: 'English',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    
    // Model Types
    typeReasoning: 'Reasoning',
    typeCoding: 'Coding',
    typeMultimodal: 'Multimodal',
    typeGeneral: 'General',
    typeNonReasoning: 'Non-Reasoning',
  },
};

export function t(locale: Locale, key: string): string {
  return translations[locale][key] || key;
}

export function getSupportedLocales(): Locale[] {
  return ['pt', 'en'];
}