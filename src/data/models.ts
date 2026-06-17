import type { Locale } from '../scripts/i18n';

export interface BenchmarkScores {
  benchlm?: number;
  artificialAnalysis?: number;
  sweBench?: number;
  mathArena?: number;
  mmmu?: number;
  gpqa?: number;
}

export interface Strength {
  category: 'coding' | 'reasoning' | 'math' | 'agentic' | 'long-context' | 'multilingual' | 'multimodal' | 'speed' | 'self-hosting';
  score: number; // 1-10
}

export interface Model {
  id: string;
  name: string;
  type: 'reasoning' | 'non-reasoning' | 'coding' | 'multimodal' | 'general';
  parameters: string;
  activeParams?: string;
  contextWindow: string;
  releaseDate: string;
  license: string;
  isOpenWeight: boolean;
  benchmarks: BenchmarkScores;
}

export interface ModelFamily {
  id: string;
  name: string;
  creator: string;
  logo: string; // SVG path or identifier
  description: Record<Locale, string>;
  website: string;
  chatInterface: string;
  huggingFace: string;
  github: string;
  models: Model[];
  strengths: Strength[];
  updatedAt: string;
}

export const modelFamilies: ModelFamily[] = [
  // QWEN (Alibaba)
  {
    id: 'qwen',
    name: 'Qwen',
    creator: 'Alibaba Cloud',
    logo: 'qwen',
    description: {
      pt: 'Família mais abrangente de modelos open source da China. Cobrem todos os tamanhos (0.5B a 235B+) com variantes MoE, multimodais (VL), especializadas em código (Coder) e reasoning (QwQ). Leader em downloads no Hugging Face.',
      en: 'China\’s most comprehensive open-source model family. Covers all sizes (0.5B to 235B+) with MoE, multimodal (VL), coding-specialized (Coder), and reasoning (QwQ) variants. Leader in Hugging Face downloads.'
    },
    website: 'https://qwenlm.github.io/',
    chatInterface: 'https://chat.qwen.ai/',
    huggingFace: 'https://huggingface.co/Qwen',
    github: 'https://github.com/QwenLM',
    updatedAt: '2025-07-25',
    strengths: [
      { category: 'coding', score: 9.5 },
      { category: 'reasoning', score: 8.5 },
      { category: 'multilingual', score: 9.5 },
      { category: 'long-context', score: 8 },
      { category: 'self-hosting', score: 9 },
      { category: 'speed', score: 8 },
    ],
    models: [
      {
        id: 'qwen3-5-397b-reasoning',
        name: 'Qwen3.5 397B Reasoning',
        type: 'reasoning',
        parameters: '397B',
        activeParams: '397B',
        contextWindow: '128K',
        releaseDate: '2025-07',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 79, artificialAnalysis: 72, sweBench: 52, mathArena: 68, gpqa: 61 },
      },
      {
        id: 'qwen3-6-27b',
        name: 'Qwen3.6-27B',
        type: 'non-reasoning',
        parameters: '27B',
        activeParams: '27B',
        contextWindow: '262K',
        releaseDate: '2025-09',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 75, artificialAnalysis: 68, sweBench: 48, mathArena: 55 },
      },
      {
        id: 'qwen3-coder-32b',
        name: 'Qwen3-Coder 32B',
        type: 'coding',
        parameters: '32B',
        activeParams: '32B',
        contextWindow: '128K',
        releaseDate: '2025-07',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 72, artificialAnalysis: 70, sweBench: 58, mathArena: 45 },
      },
      {
        id: 'qwq-32b',
        name: 'QwQ-32B',
        type: 'reasoning',
        parameters: '32B',
        activeParams: '32B',
        contextWindow: '128K',
        releaseDate: '2025-03',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 65, artificialAnalysis: 60, sweBench: 42, mathArena: 72, gpqa: 58 },
      },
      {
        id: 'qwen3-235b-a22b',
        name: 'Qwen3 235B A22B (MoE)',
        type: 'general',
        parameters: '235B',
        activeParams: '22B',
        contextWindow: '128K',
        releaseDate: '2025-04',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 57, artificialAnalysis: 55, sweBench: 38, mathArena: 48 },
      },
      {
        id: 'qwen3-max',
        name: 'Qwen3-Max (Largest)',
        type: 'general',
        parameters: 'Unknown (Proprietary)',
        contextWindow: '1M',
        releaseDate: '2025-09',
        license: 'Custom (Not open-weight)',
        isOpenWeight: false,
        benchmarks: { benchlm: 82, artificialAnalysis: 78, sweBench: 62, mathArena: 71 },
      },
    ],
  },

  // DEEPSEEK
  {
    id: 'deepseek',
    name: 'DeepSeek',
    creator: 'DeepSeek (深度求索)',
    logo: 'deepseek',
    description: {
      pt: 'Laboratório focado em eficiência algorítmica e arquiteturas MoE nativas. Pioneiros em Sparse Attention e modelos de reasoning 100% transparentes (R1). Todos os modelos lançados no Hugging Face com código completo.',
      en: 'Lab focused on algorithmic efficiency and native MoE architectures. Pioneers in Sparse Attention and fully transparent reasoning models (R1). All models released on Hugging Face with complete code.'
    },
    website: 'https://www.deepseek.com/',
    chatInterface: 'https://chat.deepseek.com/',
    huggingFace: 'https://huggingface.co/deepseek-ai',
    github: 'https://github.com/deepseek-ai',
    updatedAt: '2026-03-30',
    strengths: [
      { category: 'coding', score: 9.5 },
      { category: 'reasoning', score: 9.5 },
      { category: 'math', score: 9 },
      { category: 'speed', score: 9 },
      { category: 'self-hosting', score: 8 },
      { category: 'long-context', score: 9.5 },
    ],
    models: [
      {
        id: 'deepseek-v4-pro-max',
        name: 'DeepSeek V4 Pro (Max)',
        type: 'reasoning',
        parameters: '685B',
        activeParams: '37B',
        contextWindow: '1M',
        releaseDate: '2026-03',
        license: 'MIT',
        isOpenWeight: true,
        benchmarks: { benchlm: 87, artificialAnalysis: 82, sweBench: 64, mathArena: 85, gpqa: 78 },
      },
      {
        id: 'deepseek-v4-pro-high',
        name: 'DeepSeek V4 Pro (High)',
        type: 'reasoning',
        parameters: '685B',
        activeParams: '37B',
        contextWindow: '1M',
        releaseDate: '2026-03',
        license: 'MIT',
        isOpenWeight: true,
        benchmarks: { benchlm: 83, artificialAnalysis: 78, sweBench: 61, mathArena: 81, gpqa: 74 },
      },
      {
        id: 'deepseek-v4-flash-max',
        name: 'DeepSeek V4 Flash (Max)',
        type: 'reasoning',
        parameters: '685B',
        activeParams: '37B',
        contextWindow: '1M',
        releaseDate: '2026-03',
        license: 'MIT',
        isOpenWeight: true,
        benchmarks: { benchlm: 77, artificialAnalysis: 72, sweBench: 55, mathArena: 74, gpqa: 68 },
      },
      {
        id: 'deepseek-v3-2-thinking',
        name: 'DeepSeek V3.2 (Thinking)',
        type: 'reasoning',
        parameters: '671B',
        activeParams: '37B',
        contextWindow: '128K',
        releaseDate: '2025-09',
        license: 'MIT',
        isOpenWeight: true,
        benchmarks: { benchlm: 63, artificialAnalysis: 58, sweBench: 45, mathArena: 68, gpqa: 60 },
      },
      {
        id: 'deepseek-r1',
        name: 'DeepSeek R1',
        type: 'reasoning',
        parameters: '671B',
        activeParams: '37B',
        contextWindow: '128K',
        releaseDate: '2025-01',
        license: 'MIT',
        isOpenWeight: true,
        benchmarks: { benchlm: 61, artificialAnalysis: 57, sweBench: 44, mathArena: 71, gpqa: 62 },
      },
      {
        id: 'deepseek-v3',
        name: 'DeepSeek V3 (Base)',
        type: 'general',
        parameters: '671B',
        activeParams: '37B',
        contextWindow: '128K',
        releaseDate: '2024-12',
        license: 'MIT',
        isOpenWeight: true,
        benchmarks: { benchlm: 58, artificialAnalysis: 55, sweBench: 38, mathArena: 52 },
      },
    ],
  },

  // KIMI (Moonshot AI)
  {
    id: 'kimi',
    name: 'Kimi (Moonshot AI)',
    creator: 'Moonshot AI',
    logo: 'kimi',
    description: {
      pt: 'Especialista em janelas de contexto ultra-longas (128K-256K tokens) e workflows agenteados. Kimi K2.6 é o 2º modelo open weight mais forte globalmente. Primeiro modelo open a lidar com centenas de chamadas de ferramenta sequenciais.',
      en: 'Specialist in ultra-long context windows (128K-256K tokens) and agentic workflows. Kimi K2.6 is the 2nd strongest open-weight model globally. First open model to handle hundreds of sequential tool calls.'
    },
    website: 'https://www.moonshot.ai/',
    chatInterface: 'https://kimi.moonshot.cn/',
    huggingFace: 'https://huggingface.co/MoonshotAI',
    github: 'https://github.com/MoonshotAI',
    updatedAt: '2025-11-04',
    strengths: [
      { category: 'long-context', score: 10 },
      { category: 'agentic', score: 9.5 },
      { category: 'coding', score: 9 },
      { category: 'reasoning', score: 8.5 },
      { category: 'multilingual', score: 8 },
      { category: 'self-hosting', score: 5 }, // 1T params = impractical locally
    ],
    models: [
      {
        id: 'kimi-k2-6',
        name: 'Kimi K2.6',
        type: 'non-reasoning',
        parameters: '1T (MoE)',
        activeParams: '~50B',
        contextWindow: '256K',
        releaseDate: '2025-11',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 81, artificialAnalysis: 76, sweBench: 58, mathArena: 65, gpqa: 62 },
      },
      {
        id: 'kimi-k2-5-reasoning',
        name: 'Kimi K2.5 (Reasoning)',
        type: 'reasoning',
        parameters: '1T (MoE)',
        activeParams: '~50B',
        contextWindow: '128K',
        releaseDate: '2025-09',
        license: 'Custom (Not open-weight)',
        isOpenWeight: false,
        benchmarks: { benchlm: 77, artificialAnalysis: 72, sweBench: 55, mathArena: 72, gpqa: 68 },
      },
      {
        id: 'kimi-k2-5',
        name: 'Kimi K2.5 (Non-Reasoning)',
        type: 'non-reasoning',
        parameters: '1T (MoE)',
        activeParams: '~50B',
        contextWindow: '128K',
        releaseDate: '2025-09',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 74, artificialAnalysis: 69, sweBench: 52, mathArena: 58 },
      },
      {
        id: 'kimi-k2',
        name: 'Kimi K2',
        type: 'coding',
        parameters: '1T (MoE)',
        activeParams: '~50B',
        contextWindow: '128K',
        releaseDate: '2025-07',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 71, artificialAnalysis: 66, sweBench: 50, mathArena: 55 },
      },
    ],
  },

  // GLM / Z.AI
  {
    id: 'glm',
    name: 'GLM (Z.ai)',
    creator: 'Z.ai (formerly Zhipu AI)',
    logo: 'glm',
    description: {
      pt: 'Spin-off da Universidade de Tsinghua, arquitetura MoE proprietária (não derivada de LLaMA). GLM-5.1 e GLM-5 Reasoning empatam no topo chinês. Forte adoção empresarial na China, milhões de downloads globais.',
      en: 'Tsinghua University spin-off with proprietary MoE architecture (not LLaMA-derived). GLM-5.1 and GLM-5 Reasoning tie at the top of Chinese leaderboard. Strong enterprise adoption in China, millions of global downloads.'
    },
    website: 'https://z.ai/',
    chatInterface: 'https://chat.z.ai/',
    huggingFace: 'https://huggingface.co/ZhipuAI',
    github: 'https://github.com/ZhipuAI',
    updatedAt: '2025-07-28',
    strengths: [
      { category: 'reasoning', score: 9.5 },
      { category: 'math', score: 9.5 },
      { category: 'coding', score: 8.5 },
      { category: 'agentic', score: 8 },
      { category: 'long-context', score: 8.5 },
      { category: 'multilingual', score: 8.5 },
      { category: 'self-hosting', score: 8.5 },
    ],
    models: [
      {
        id: 'glm-5-1',
        name: 'GLM-5.1',
        type: 'non-reasoning',
        parameters: '106B (MoE)',
        activeParams: '12B',
        contextWindow: '203K',
        releaseDate: '2025-07',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 83, artificialAnalysis: 78, sweBench: 58, mathArena: 71, gpqa: 65 },
      },
      {
        id: 'glm-5-reasoning',
        name: 'GLM-5 (Reasoning)',
        type: 'reasoning',
        parameters: '355B (MoE)',
        activeParams: '32B',
        contextWindow: '200K',
        releaseDate: '2025-07',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 83, artificialAnalysis: 79, sweBench: 59, mathArena: 82, gpqa: 74 },
      },
      {
        id: 'glm-4-5-air',
        name: 'GLM-4.5-Air',
        type: 'non-reasoning',
        parameters: '106B (MoE)',
        activeParams: '12B',
        contextWindow: '128K',
        releaseDate: '2025-07',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 76, artificialAnalysis: 71, sweBench: 52, mathArena: 58 },
      },
      {
        id: 'glm-4',
        name: 'GLM-4 (Base)',
        type: 'general',
        parameters: '355B (MoE)',
        activeParams: '32B',
        contextWindow: '128K',
        releaseDate: '2024-08',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 62, artificialAnalysis: 58, sweBench: 41, mathArena: 52 },
      },
    ],
  },

  // MINIMAX
  {
    id: 'minimax',
    name: 'MiniMax',
    creator: 'MiniMax',
    logo: 'minimax',
    description: {
      pt: 'Laboratório chinês em ascensão com modelos fortes em coding e multimodal. MiMo-V2-Flash no mid-tier, M2.7 competindo no topo. Arquitetura própria, foco em eficiência de inferência.',
      en: 'Rising Chinese lab with strong coding and multimodal models. MiMo-V2-Flash in mid-tier, M2.7 competing at the top. Custom architecture, focus on inference efficiency.'
    },
    website: 'https://www.minimaxi.com/',
    chatInterface: 'https://hailuo.ai/',
    huggingFace: 'https://huggingface.co/MiniMax-AI',
    github: 'https://github.com/MiniMax-AI',
    updatedAt: '2025-09-15',
    strengths: [
      { category: 'coding', score: 8.5 },
      { category: 'multimodal', score: 8.5 },
      { category: 'reasoning', score: 8 },
      { category: 'speed', score: 8.5 },
      { category: 'self-hosting', score: 7.5 },
    ],
    models: [
      {
        id: 'minimax-m2-7',
        name: 'MiniMax M2.7',
        type: 'reasoning',
        parameters: '400B+ (MoE)',
        activeParams: '~40B',
        contextWindow: '128K',
        releaseDate: '2025-09',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 78, artificialAnalysis: 73, sweBench: 58, mathArena: 70, gpqa: 64, mmmu: 68 },
      },
      {
        id: 'mimo-v2-flash',
        name: 'MiMo-V2-Flash',
        type: 'non-reasoning',
        parameters: '100B+ (MoE)',
        activeParams: '~12B',
        contextWindow: '128K',
        releaseDate: '2025-08',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 63, artificialAnalysis: 59, sweBench: 42, mathArena: 48 },
      },
    ],
  },

  // ERNIE (Baidu)
  {
    id: 'ernie',
    name: 'Ernie (Baidu)',
    creator: 'Baidu',
    logo: 'ernie',
    description: {
      pt: 'Primeiro grande LLM chinês a fazer pivô de proprietário para open source (mid-2025). Ernie Bot gratuito desde abril 2025. Ernie 5 multimodal planejado para H2 2025. Forte em chinês nativo e busca.',
      en: 'First major Chinese LLM to pivot from proprietary to open source (mid-2025). Ernie Bot free since April 2025. Ernie 5 multimodal planned for H2 2025. Strong in native Chinese and search integration.'
    },
    website: 'https://ernie.baidu.com/',
    chatInterface: 'https://yiyan.baidu.com/',
    huggingFace: 'https://huggingface.co/baidu',
    github: 'https://github.com/PaddlePaddle/Ernie',
    updatedAt: '2025-06-30',
    strengths: [
      { category: 'multilingual', score: 9 },
      { category: 'reasoning', score: 7.5 },
      { category: 'coding', score: 7 },
      { category: 'multimodal', score: 8 },
      { category: 'self-hosting', score: 7.5 },
    ],
    models: [
      {
        id: 'ernie-5-multimodal',
        name: 'Ernie 5 (Multimodal) - Planned',
        type: 'multimodal',
        parameters: 'TBA',
        contextWindow: 'TBA',
        releaseDate: '2025-H2',
        license: 'TBA (Expected Apache-2.0)',
        isOpenWeight: true,
        benchmarks: {},
      },
      {
        id: 'ernie-4-5',
        name: 'Ernie 4.5 (Latest Open)',
        type: 'general',
        parameters: '300B+ (MoE)',
        activeParams: '~30B',
        contextWindow: '128K',
        releaseDate: '2025-06',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 58, artificialAnalysis: 54, sweBench: 38, mathArena: 45 },
      },
    ],
  },

  // YI (01.AI)
  {
    id: 'yi',
    name: 'Yi (01.AI)',
    creator: '01.AI',
    logo: 'yi',
    description: {
      pt: 'Fundado por Kai-Fu Lee. Série Yi (6B, 9B, 34B, 200K context) foi pioneira em contextos longos open source. Yi-Large (closed) e Yi-Coder destacam-se. Movimento recente para modelos menores e eficientes.',
      en: 'Founded by Kai-Fu Lee. Yi series (6B, 9B, 34B, 200K context) pioneered long-context open source. Yi-Large (closed) and Yi-Coder stand out. Recent shift to smaller, efficient models.'
    },
    website: 'https://www.01.ai/',
    chatInterface: 'https://chat.01.ai/',
    huggingFace: 'https://huggingface.co/01-ai',
    github: 'https://github.com/01-ai',
    updatedAt: '2025-05-15',
    strengths: [
      { category: 'long-context', score: 9 },
      { category: 'coding', score: 8 },
      { category: 'multilingual', score: 8.5 },
      { category: 'self-hosting', score: 9.5 },
      { category: 'speed', score: 8.5 },
    ],
    models: [
      {
        id: 'yi-1.5-34b',
        name: 'Yi-1.5 34B',
        type: 'general',
        parameters: '34B',
        activeParams: '34B',
        contextWindow: '200K',
        releaseDate: '2024-05',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 52, artificialAnalysis: 50, sweBench: 35, mathArena: 42 },
      },
      {
        id: 'yi-coder-9b',
        name: 'Yi-Coder 9B',
        type: 'coding',
        parameters: '9B',
        activeParams: '9B',
        contextWindow: '200K',
        releaseDate: '2024-08',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 48, artificialAnalysis: 46, sweBench: 41, mathArena: 32 },
      },
      {
        id: 'yi-lightning',
        name: 'Yi-Lightning (Fast)',
        type: 'general',
        parameters: '16B (MoE)',
        activeParams: '4B',
        contextWindow: '128K',
        releaseDate: '2025-10',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 60, artificialAnalysis: 56, sweBench: 38, mathArena: 45 },
      },
    ],
  },

  // STEPFUN
  {
    id: 'stepfun',
    name: 'StepFun',
    creator: 'StepFun (阶跃星辰)',
    logo: 'stepfun',
    description: {
      pt: 'Novo laboratório chinês com foco em modelos multimodais e reasoning. Step-2 (MoE) e Step-1V (vision) mostram resultados competitivos. Abordagem aberta desde o início.',
      en: 'New Chinese lab focused on multimodal and reasoning models. Step-2 (MoE) and Step-1V (vision) show competitive results. Open approach from the start.'
    },
    website: 'https://www.stepfun.com/',
    chatInterface: 'https://chat.stepfun.com/',
    huggingFace: 'https://huggingface.co/stepfun-ai',
    github: 'https://github.com/stepfun-ai',
    updatedAt: '2025-08-20',
    strengths: [
      { category: 'multimodal', score: 8.5 },
      { category: 'reasoning', score: 8 },
      { category: 'coding', score: 7.5 },
      { category: 'long-context', score: 8 },
      { category: 'self-hosting', score: 8 },
    ],
    models: [
      {
        id: 'step-2',
        name: 'Step-2 (MoE)',
        type: 'reasoning',
        parameters: '400B+ (MoE)',
        activeParams: '~40B',
        contextWindow: '128K',
        releaseDate: '2025-08',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 70, artificialAnalysis: 66, sweBench: 48, mathArena: 62, gpqa: 58 },
      },
      {
        id: 'step-1v',
        name: 'Step-1V (Vision)',
        type: 'multimodal',
        parameters: '100B+',
        contextWindow: '128K',
        releaseDate: '2025-06',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 64, artificialAnalysis: 60, mmmu: 65 },
      },
    ],
  },

  // ANT GROUP (Ling)
  {
    id: 'ant',
    name: 'Ling (Ant Group)',
    creator: 'Ant Group',
    logo: 'ant',
    description: {
      pt: 'Ant Group (Alipay) entra no jogo open source com Ling - modelos otimizados para aplicações financeiras e enterprise. Foco em compliance, segurança e inferência eficiente.',
      en: 'Ant Group (Alipay) enters open source with Ling - models optimized for financial and enterprise applications. Focus on compliance, security, and efficient inference.'
    },
    website: 'https://antgroup.com/',
    chatInterface: 'https://ling.antgroup.com/',
    huggingFace: 'https://huggingface.co/AntGroup',
    github: 'https://github.com/AntGroup',
    updatedAt: '2025-09-10',
    strengths: [
      { category: 'reasoning', score: 8 },
      { category: 'coding', score: 7.5 },
      { category: 'multilingual', score: 8 },
      { category: 'self-hosting', score: 8.5 },
      { category: 'speed', score: 8.5 },
    ],
    models: [
      {
        id: 'ling-plus',
        name: 'Ling-Plus',
        type: 'general',
        parameters: '200B+ (MoE)',
        activeParams: '~20B',
        contextWindow: '128K',
        releaseDate: '2025-09',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 68, artificialAnalysis: 64, sweBench: 45, mathArena: 55 },
      },
      {
        id: 'ling-lite',
        name: 'Ling-Lite',
        type: 'general',
        parameters: '16B (MoE)',
        activeParams: '3B',
        contextWindow: '128K',
        releaseDate: '2025-09',
        license: 'Apache-2.0',
        isOpenWeight: true,
        benchmarks: { benchlm: 55, artificialAnalysis: 52, sweBench: 32, mathArena: 40 },
      },
    ],
  },
];

// Utility functions
export function getAllModels(): Model[] {
  return modelFamilies.flatMap(family => family.models);
}

export function getModelsByFamily(familyId: string): Model[] {
  const family = modelFamilies.find(f => f.id === familyId);
  return family?.models || [];
}

export function getTopModelsByBenchmark(benchmark: keyof BenchmarkScores, limit = 10): Array<{ family: string; model: Model; score: number }> {
  const results: Array<{ family: string; model: Model; score: number }> = [];
  for (const family of modelFamilies) {
    for (const model of family.models) {
      const score = model.benchmarks[benchmark];
      if (score !== undefined) {
        results.push({ family: family.name, model, score });
      }
    }
  }
  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function getUseCaseRecommendations(): Record<string, { family: string; model: Model; reason: Record<Locale, string> }> {
  return {
    coding: {
      family: 'DeepSeek',
      model: modelFamilies.find(f => f.id === 'deepseek')!.models.find(m => m.id === 'deepseek-v4-pro-max')!,
      reason: {
        pt: 'Top no SWE-Bench (64%) e BenchLM coding. Arquitetura MoE eficiente para inferência rápida.',
        en: 'Tops SWE-Bench (64%) and BenchLM coding. Efficient MoE for fast inference.'
      }
    },
    reasoning: {
      family: 'GLM (Z.ai)',
      model: modelFamilies.find(f => f.id === 'glm')!.models.find(m => m.id === 'glm-5-reasoning')!,
      reason: {
        pt: 'GLM-5 Reasoning lidera MathArena (82%) e GPQA (74%). "Cleanest pick quando o trabalho é reasoning-first."',
        en: 'GLM-5 Reasoning leads MathArena (82%) and GPQA (74%). "Cleanest pick when work is reasoning-first."'
      }
    },
    math: {
      family: 'DeepSeek',
      model: modelFamilies.find(f => f.id === 'deepseek')!.models.find(m => m.id === 'deepseek-v4-pro-max')!,
      reason: {
        pt: 'DeepSeek V4 Pro Max atinge 85% no MathArena — melhor modelo chinês para matemática pesada.',
        en: 'DeepSeek V4 Pro Max hits 85% on MathArena — best Chinese model for heavy math.'
      }
    },
    agentic: {
      family: 'Kimi (Moonshot)',
      model: modelFamilies.find(f => f.id === 'kimi')!.models.find(m => m.id === 'kimi-k2-6')!,
      reason: {
        pt: 'Primeiro modelo open a lidar com centenas de chamadas de ferramenta sequenciais (Nathan Lambert). Melhor para workflows agenteados.',
        en: 'First open model to handle hundreds of sequential tool calls (Nathan Lambert). Best for agentic workflows.'
      }
    },
    longContext: {
      family: 'Kimi (Moonshot)',
      model: modelFamilies.find(f => f.id === 'kimi')!.models.find(m => m.id === 'kimi-k2-6')!,
      reason: {
        pt: 'Janela de 256K tokens nativa — a maior entre modelos open weight de fronteira.',
        en: 'Native 256K token window — largest among frontier open-weight models.'
      }
    },
    selfHosting: {
      family: 'Qwen',
      model: modelFamilies.find(f => f.id === 'qwen')!.models.find(m => m.id === 'qwen3-6-27b')!,
      reason: {
        pt: 'Qwen3.6-27B open weight, 262K contexto, roda em GPU consumer (24GB VRAM). Melhor equilíbrio capacidade/hardware.',
        en: 'Qwen3.6-27B open weight, 262K context, runs on consumer GPU (24GB VRAM). Best capability/hardware balance.'
      }
    },
    multilingual: {
      family: 'Qwen',
      model: modelFamilies.find(f => f.id === 'qwen')!.models.find(m => m.id === 'qwen3-5-397b-reasoning')!,
      reason: {
        pt: 'Qwen tem melhor suporte multilíngue nativo (30+ idiomas) e é o mais baixado globalmente no Hugging Face.',
        en: 'Qwen has best native multilingual support (30+ languages) and is most downloaded globally on Hugging Face.'
      }
    },
    overall: {
      family: 'DeepSeek',
      model: modelFamilies.find(f => f.id === 'deepseek')!.models.find(m => m.id === 'deepseek-v4-pro-max')!,
      reason: {
        pt: 'DeepSeek V4 Pro Max (87 BenchLM) — modelo open weight mais forte da China, elite em coding + agentic forte.',
        en: 'DeepSeek V4 Pro Max (87 BenchLM) — China\'s strongest open-weight model, elite coding + strong agentic.'
      }
    },
  };
}

export function formatNumber(num: number): string {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return String(num);
}

export function getModelTypeLabel(type: Model['type'], locale: Locale): string {
  const labels: Record<Model['type'], Record<Locale, string>> = {
    reasoning: { pt: 'Reasoning', en: 'Reasoning' },
    coding: { pt: 'Coding', en: 'Coding' },
    multimodal: { pt: 'Multimodal', en: 'Multimodal' },
    general: { pt: 'Geral', en: 'General' },
    'non-reasoning': { pt: 'Non-Reasoning', en: 'Non-Reasoning' },
  };
  return labels[type]?.[locale] || type;
}

export function getModelTypeBadgeClass(type: Model['type']): string {
  const classes: Record<Model['type'], string> = {
    reasoning: 'model-type-reasoning',
    coding: 'model-type-coding',
    multimodal: 'model-type-multimodal',
    general: 'model-type-general',
    'non-reasoning': 'model-type-non-reasoning',
  };
  return classes[type] || 'model-type-general';
}

export function getScoreClass(score: number | undefined): string {
  if (score === undefined) return 'score-na';
  if (score >= 75) return 'score-high';
  if (score >= 55) return 'score-med';
  return 'score-low';
}

export function formatDate(dateStr: string, locale: Locale): string {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', { year: 'numeric', month: 'short' });
}