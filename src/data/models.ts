// Benchmark scores. Real, public evaluations only. All percentages 0-100,
// except `aaii` which is the Artificial Analysis Intelligence Index (a 0-100
// composite that, under the current v4.x methodology, tops out around 50-60
// for the strongest models). Numbers come from official model cards,
// technical reports, Artificial Analysis and reputable leaderboards.
export interface BenchmarkScores {
  aaii?: number;          // Artificial Analysis Intelligence Index (current methodology)
  gpqa?: number;          // GPQA Diamond
  sweBench?: number;      // SWE-bench Verified
  aime?: number;          // AIME (2025 / 2026)
  mmluPro?: number;       // MMLU-Pro
  liveCodeBench?: number; // LiveCodeBench
  mmmu?: number;          // MMMU (multimodal)
}

export interface Strength {
  category: 'coding' | 'reasoning' | 'math' | 'agentic' | 'long-context' | 'multilingual' | 'multimodal' | 'speed' | 'self-hosting';
  score: number; // 1-10
}

// How open a model is, from most to least permissive:
// open-source   = weights + training data + code (OSI-style, e.g. OLMo, Granite)
// open-weight   = downloadable weights, permissive commercial use (Apache-2.0, MIT)
// restricted    = downloadable weights but limited (non-commercial, revenue gate,
//                 community license with use restrictions)
// closed        = API only, no weights
export type Openness = 'open-source' | 'open-weight' | 'restricted' | 'closed';

export type Region = 'china' | 'north-america' | 'europe' | 'middle-east' | 'asia-pacific';

export interface Model {
  id: string;
  name: string;
  type: 'reasoning' | 'non-reasoning' | 'coding' | 'multimodal' | 'general';
  parameters: string;
  activeParams?: string;
  contextWindow: string;
  releaseDate: string; // YYYY-MM
  license: string;
  openness: Openness;
  benchmarks: BenchmarkScores;
}

export interface ModelFamily {
  id: string;
  name: string;
  creator: string;
  country: string; // emoji flag
  region: Region;
  logoId?: string; // filename without extension; if absent, a monogram is rendered
  monogram?: string; // 1-2 char fallback label
  brandColor: string; // hex, used for accents and the monogram chip
  description: string;
  website: string;
  chatInterface: string;
  huggingFace: string;
  github: string;
  models: Model[];
  strengths: Strength[];
  updatedAt: string;
}

export const modelFamilies: ModelFamily[] = [
  // =====================================================================
  // CHINA
  // =====================================================================

  // QWEN (Alibaba)
  {
    id: 'qwen',
    name: 'Qwen',
    creator: 'Alibaba (Tongyi Lab)',
    country: '🇨🇳',
    region: 'china',
    logoId: 'qwen',
    brandColor: '#6E59F0',
    description: 'The world’s most prolific open-weight family. Spans tiny dense models to frontier MoE, with reasoning, coding (Coder), vision (VL) and omni variants. Mostly Apache-2.0 and the download leader on Hugging Face.',
    website: 'https://qwen.ai',
    chatInterface: 'https://chat.qwen.ai',
    huggingFace: 'https://huggingface.co/Qwen',
    github: 'https://github.com/QwenLM',
    updatedAt: '2026-06',
    strengths: [
      { category: 'coding', score: 9.5 },
      { category: 'reasoning', score: 9 },
      { category: 'multilingual', score: 9.5 },
      { category: 'multimodal', score: 9 },
      { category: 'long-context', score: 8.5 },
      { category: 'self-hosting', score: 9 },
    ],
    models: [
      { id: 'qwen3-6-27b', name: 'Qwen3.6-27B', type: 'reasoning', parameters: '27B', contextWindow: '256K', releaseDate: '2026-04', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { gpqa: 87.8, sweBench: 77.2, aime: 94.1, mmluPro: 86.2, liveCodeBench: 83.9 } },
      { id: 'qwen3-5-397b', name: 'Qwen3.5-397B-A17B', type: 'general', parameters: '397B', activeParams: '17B', contextWindow: '256K (1M)', releaseDate: '2026-02', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aaii: 45, gpqa: 88.4, sweBench: 76.4, aime: 91.3, mmluPro: 87.8, liveCodeBench: 83.6, mmmu: 85.0 } },
      { id: 'qwen3-235b-thinking-2507', name: 'Qwen3-235B-A22B Thinking 2507', type: 'reasoning', parameters: '235B', activeParams: '22B', contextWindow: '256K', releaseDate: '2025-07', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aaii: 22, gpqa: 81.1, aime: 92.3, mmluPro: 84.4, liveCodeBench: 74.1 } },
      { id: 'qwen3-coder-480b', name: 'Qwen3-Coder 480B-A35B', type: 'coding', parameters: '480B', activeParams: '35B', contextWindow: '256K (1M)', releaseDate: '2025-07', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aaii: 18, sweBench: 67.0 } },
      { id: 'qwen3-next-80b-thinking', name: 'Qwen3-Next-80B-A3B Thinking', type: 'reasoning', parameters: '80B', activeParams: '3B', contextWindow: '256K (1M)', releaseDate: '2025-09', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { gpqa: 77.2, aime: 87.8, mmluPro: 82.7, liveCodeBench: 68.7 } },
      { id: 'qwen3-vl-235b', name: 'Qwen3-VL 235B-A22B', type: 'multimodal', parameters: '235B', activeParams: '22B', contextWindow: '256K', releaseDate: '2025-10', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { gpqa: 77.1, aime: 89.7, mmmu: 80.6 } },
      { id: 'qwq-32b', name: 'QwQ-32B', type: 'reasoning', parameters: '32B', contextWindow: '128K', releaseDate: '2025-03', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aaii: 13, aime: 79.5, mmluPro: 69.1, liveCodeBench: 63.4 } },
      { id: 'qwen3-7-max', name: 'Qwen3.7-Max', type: 'reasoning', parameters: 'Undisclosed', contextWindow: '1M', releaseDate: '2026-05', license: 'Proprietary', openness: 'closed', benchmarks: { aaii: 57 } },
    ],
  },

  // DEEPSEEK
  {
    id: 'deepseek',
    name: 'DeepSeek',
    creator: 'DeepSeek (深度求索)',
    country: '🇨🇳',
    region: 'china',
    logoId: 'deepseek',
    brandColor: '#4D6BFE',
    description: 'Hangzhou lab known for frontier reasoning and coding at very low cost. Pioneer of MLA, DeepSeekMoE and Sparse Attention (DSA). Releases mostly under MIT with full code and reports.',
    website: 'https://www.deepseek.com',
    chatInterface: 'https://chat.deepseek.com',
    huggingFace: 'https://huggingface.co/deepseek-ai',
    github: 'https://github.com/deepseek-ai',
    updatedAt: '2026-04',
    strengths: [
      { category: 'coding', score: 9.5 },
      { category: 'reasoning', score: 9.5 },
      { category: 'math', score: 9.5 },
      { category: 'agentic', score: 9 },
      { category: 'long-context', score: 9 },
      { category: 'self-hosting', score: 6 },
    ],
    models: [
      { id: 'deepseek-v4-pro', name: 'DeepSeek-V4-Pro', type: 'reasoning', parameters: '1.6T', activeParams: '49B', contextWindow: '1M', releaseDate: '2026-04', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 44, gpqa: 90.1, mmluPro: 87.5, liveCodeBench: 93.5 } },
      { id: 'deepseek-v3-2', name: 'DeepSeek-V3.2', type: 'reasoning', parameters: '671B', activeParams: '37B', contextWindow: '128K', releaseDate: '2025-12', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 33, gpqa: 82.4, sweBench: 73.1, aime: 93.1, mmluPro: 85.0, liveCodeBench: 83.3 } },
      { id: 'deepseek-v3-1-terminus', name: 'DeepSeek-V3.1-Terminus', type: 'reasoning', parameters: '671B', activeParams: '37B', contextWindow: '128K', releaseDate: '2025-09', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 29, gpqa: 80.7, sweBench: 68.4, mmluPro: 85.0, liveCodeBench: 74.9 } },
      { id: 'deepseek-r1-0528', name: 'DeepSeek-R1-0528', type: 'reasoning', parameters: '671B', activeParams: '37B', contextWindow: '128K', releaseDate: '2025-05', license: 'MIT', openness: 'open-weight', benchmarks: { gpqa: 81.0, sweBench: 57.6, aime: 87.5, mmluPro: 85.0, liveCodeBench: 73.3 } },
      { id: 'deepseek-r1', name: 'DeepSeek-R1', type: 'reasoning', parameters: '671B', activeParams: '37B', contextWindow: '128K', releaseDate: '2025-01', license: 'MIT', openness: 'open-weight', benchmarks: { gpqa: 71.5, sweBench: 49.2, aime: 79.8, mmluPro: 84.0, liveCodeBench: 65.9 } },
      { id: 'deepseek-v3', name: 'DeepSeek-V3', type: 'general', parameters: '671B', activeParams: '37B', contextWindow: '128K', releaseDate: '2024-12', license: 'MIT', openness: 'open-weight', benchmarks: { gpqa: 59.1, sweBench: 42.0, mmluPro: 75.9, liveCodeBench: 37.6 } },
    ],
  },

  // KIMI (Moonshot AI)
  {
    id: 'kimi',
    name: 'Kimi (Moonshot)',
    creator: 'Moonshot AI (月之暗面)',
    country: '🇨🇳',
    region: 'china',
    logoId: 'kimi',
    brandColor: '#1783FF',
    description: 'Specialist in trillion-parameter MoE models for agentic, coding and long-context work. The K2.x line is natively multimodal and handles hundreds of sequential tool calls.',
    website: 'https://www.moonshot.ai',
    chatInterface: 'https://www.kimi.com',
    huggingFace: 'https://huggingface.co/moonshotai',
    github: 'https://github.com/MoonshotAI',
    updatedAt: '2026-04',
    strengths: [
      { category: 'agentic', score: 9.5 },
      { category: 'long-context', score: 9.5 },
      { category: 'coding', score: 9 },
      { category: 'reasoning', score: 9 },
      { category: 'multimodal', score: 8 },
      { category: 'self-hosting', score: 5 },
    ],
    models: [
      { id: 'kimi-k2-6', name: 'Kimi K2.6', type: 'general', parameters: '1T', activeParams: '32B', contextWindow: '256K', releaseDate: '2026-04', license: 'Modified MIT', openness: 'open-weight', benchmarks: { aaii: 43, gpqa: 90.5, sweBench: 80.2, aime: 96.4, liveCodeBench: 89.6 } },
      { id: 'kimi-k2-5', name: 'Kimi K2.5', type: 'multimodal', parameters: '1T', activeParams: '32B', contextWindow: '256K', releaseDate: '2026-01', license: 'Modified MIT', openness: 'open-weight', benchmarks: { aaii: 38, gpqa: 87.6, sweBench: 76.8, aime: 96.1, mmluPro: 87.1, liveCodeBench: 85.0 } },
      { id: 'kimi-k2-thinking', name: 'Kimi K2 Thinking', type: 'reasoning', parameters: '1T', activeParams: '32B', contextWindow: '256K', releaseDate: '2025-11', license: 'Modified MIT', openness: 'open-weight', benchmarks: { aaii: 33, gpqa: 84.5, sweBench: 71.3, aime: 94.5, mmluPro: 84.6, liveCodeBench: 83.1 } },
      { id: 'kimi-k2-0905', name: 'Kimi K2 Instruct 0905', type: 'coding', parameters: '1T', activeParams: '32B', contextWindow: '256K', releaseDate: '2025-09', license: 'Modified MIT', openness: 'open-weight', benchmarks: { sweBench: 69.2 } },
    ],
  },

  // GLM (Zhipu / Z.ai)
  {
    id: 'glm',
    name: 'GLM (Z.ai)',
    creator: 'Zhipu AI (智谱)',
    country: '🇨🇳',
    region: 'china',
    logoId: 'glm',
    brandColor: '#3B82F6',
    description: 'Tsinghua University spin-off and one of China’s frontier labs. GLM-5.2 leads the Artificial Analysis index among open-weight models. Ships its flagships under MIT.',
    website: 'https://z.ai',
    chatInterface: 'https://chat.z.ai',
    huggingFace: 'https://huggingface.co/zai-org',
    github: 'https://github.com/zai-org',
    updatedAt: '2026-06',
    strengths: [
      { category: 'reasoning', score: 9.5 },
      { category: 'coding', score: 9.5 },
      { category: 'agentic', score: 9 },
      { category: 'math', score: 9 },
      { category: 'long-context', score: 8.5 },
      { category: 'self-hosting', score: 7 },
    ],
    models: [
      { id: 'glm-5-2', name: 'GLM-5.2', type: 'reasoning', parameters: '744B', activeParams: '40B', contextWindow: '1M', releaseDate: '2026-06', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 51, gpqa: 89 } },
      { id: 'glm-5-1', name: 'GLM-5.1', type: 'reasoning', parameters: '744B', activeParams: '40B', contextWindow: '200K', releaseDate: '2026-04', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 40, sweBench: 77.8 } },
      { id: 'glm-4-7', name: 'GLM-4.7', type: 'reasoning', parameters: '357B', activeParams: '32B', contextWindow: '200K', releaseDate: '2025-12', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 34, sweBench: 73.8 } },
      { id: 'glm-4-6', name: 'GLM-4.6', type: 'coding', parameters: '357B', activeParams: '32B', contextWindow: '200K', releaseDate: '2025-09', license: 'MIT', openness: 'open-weight', benchmarks: { sweBench: 68 } },
      { id: 'glm-4-5-air', name: 'GLM-4.5-Air', type: 'general', parameters: '106B', activeParams: '12B', contextWindow: '128K', releaseDate: '2025-07', license: 'MIT', openness: 'open-weight', benchmarks: {} },
      { id: 'glm-4-5v', name: 'GLM-4.5V', type: 'multimodal', parameters: '106B', activeParams: '12B', contextWindow: '64K', releaseDate: '2025-08', license: 'MIT', openness: 'open-weight', benchmarks: {} },
    ],
  },

  // MINIMAX
  {
    id: 'minimax',
    name: 'MiniMax',
    creator: 'MiniMax',
    country: '🇨🇳',
    region: 'china',
    logoId: 'minimax',
    brandColor: '#F2406B',
    description: 'Shanghai lab focused on coding, agentic workflows and ultra-long context. The M2.x series uses an efficient dense MoE; M3 adds native vision and a 1M token window.',
    website: 'https://www.minimax.io',
    chatInterface: 'https://code.minimax.io',
    huggingFace: 'https://huggingface.co/MiniMaxAI',
    github: 'https://github.com/MiniMax-AI',
    updatedAt: '2026-06',
    strengths: [
      { category: 'coding', score: 9 },
      { category: 'agentic', score: 9 },
      { category: 'long-context', score: 9.5 },
      { category: 'reasoning', score: 8.5 },
      { category: 'multimodal', score: 8.5 },
      { category: 'speed', score: 8.5 },
    ],
    models: [
      { id: 'minimax-m3', name: 'MiniMax-M3', type: 'multimodal', parameters: '428B', activeParams: '23B', contextWindow: '1M', releaseDate: '2026-06', license: 'MiniMax Community', openness: 'restricted', benchmarks: { aaii: 44, gpqa: 93 } },
      { id: 'minimax-m2-7', name: 'MiniMax-M2.7', type: 'reasoning', parameters: '230B', activeParams: '9.8B', contextWindow: '205K', releaseDate: '2026-04', license: 'Modified MIT', openness: 'open-weight', benchmarks: { aaii: 38, gpqa: 87 } },
      { id: 'minimax-m2-5', name: 'MiniMax-M2.5', type: 'reasoning', parameters: '230B', activeParams: '9.8B', contextWindow: '205K', releaseDate: '2026-02', license: 'Modified MIT', openness: 'open-weight', benchmarks: { aaii: 34, gpqa: 85.2, sweBench: 80.2, aime: 86.3 } },
      { id: 'minimax-m2', name: 'MiniMax-M2', type: 'general', parameters: '230B', activeParams: '9.8B', contextWindow: '205K', releaseDate: '2025-10', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 28, gpqa: 78, sweBench: 69.4, aime: 78, mmluPro: 82, liveCodeBench: 83 } },
      { id: 'minimax-m1', name: 'MiniMax-M1', type: 'reasoning', parameters: '456B', activeParams: '46B', contextWindow: '1M', releaseDate: '2025-06', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { gpqa: 70, sweBench: 56, aime: 76.9, mmluPro: 81.1, liveCodeBench: 65 } },
    ],
  },

  // STEPFUN
  {
    id: 'stepfun',
    name: 'StepFun',
    creator: 'StepFun (阶跃星辰)',
    country: '🇨🇳',
    region: 'china',
    logoId: 'stepfun',
    brandColor: '#1C6BFF',
    description: 'Shanghai lab specialized in natively multimodal models (text, vision, audio, video) and efficient MoE for agentic and coding tasks. The Step-3 / Step-3.x line is open under Apache-2.0.',
    website: 'https://www.stepfun.com',
    chatInterface: 'https://www.stepfun.com',
    huggingFace: 'https://huggingface.co/stepfun-ai',
    github: 'https://github.com/stepfun-ai',
    updatedAt: '2026-05',
    strengths: [
      { category: 'multimodal', score: 8.5 },
      { category: 'reasoning', score: 8.5 },
      { category: 'coding', score: 8 },
      { category: 'long-context', score: 7.5 },
      { category: 'self-hosting', score: 7 },
    ],
    models: [
      { id: 'step-3-5-flash', name: 'Step-3.5-Flash', type: 'reasoning', parameters: '197B', activeParams: '11B', contextWindow: '256K', releaseDate: '2026-02', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { gpqa: 83.5, sweBench: 74.4, aime: 97.3, mmluPro: 84.4, liveCodeBench: 86.4 } },
      { id: 'step-3-7-flash', name: 'Step-3.7-Flash', type: 'multimodal', parameters: '198B', activeParams: '11B', contextWindow: '256K', releaseDate: '2026-05', license: 'Apache-2.0', openness: 'open-weight', benchmarks: {} },
      { id: 'step-3', name: 'Step-3', type: 'multimodal', parameters: '321B', activeParams: '38B', contextWindow: '64K', releaseDate: '2025-07', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { gpqa: 70.0, aime: 67.1, liveCodeBench: 83.7, mmmu: 74.2 } },
    ],
  },

  // ERNIE (Baidu)
  {
    id: 'ernie',
    name: 'ERNIE (Baidu)',
    creator: 'Baidu (百度)',
    country: '🇨🇳',
    region: 'china',
    logoId: 'ernie',
    brandColor: '#2541E3',
    description: 'In 2025 Baidu open-sourced the entire ERNIE 4.5 family under Apache-2.0, from 0.3B dense to a 424B MoE. Strong in native Chinese and search; the 5.x flagships remain proprietary.',
    website: 'https://ernie.baidu.com',
    chatInterface: 'https://yiyan.baidu.com',
    huggingFace: 'https://huggingface.co/baidu',
    github: 'https://github.com/PaddlePaddle/ERNIE',
    updatedAt: '2025-11',
    strengths: [
      { category: 'multilingual', score: 9 },
      { category: 'multimodal', score: 8 },
      { category: 'reasoning', score: 7.5 },
      { category: 'self-hosting', score: 7 },
      { category: 'coding', score: 6.5 },
    ],
    models: [
      { id: 'ernie-4-5-300b', name: 'ERNIE-4.5-300B-A47B', type: 'general', parameters: '424B', activeParams: '47B', contextWindow: '128K', releaseDate: '2025-06', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aaii: 15, mmluPro: 77.6, liveCodeBench: 46.7 } },
      { id: 'ernie-4-5-vl-28b', name: 'ERNIE-4.5-VL-28B-A3B Thinking', type: 'multimodal', parameters: '28B', activeParams: '3B', contextWindow: '128K', releaseDate: '2025-11', license: 'Apache-2.0', openness: 'open-weight', benchmarks: {} },
      { id: 'ernie-4-5-21b-thinking', name: 'ERNIE-4.5-21B-A3B Thinking', type: 'reasoning', parameters: '21B', activeParams: '3B', contextWindow: '128K', releaseDate: '2025-09', license: 'Apache-2.0', openness: 'open-weight', benchmarks: {} },
    ],
  },

  // ANT GROUP (Ling / Ring / inclusionAI)
  {
    id: 'ant',
    name: 'Ling / Ring (Ant)',
    creator: 'Ant Group / inclusionAI',
    country: '🇨🇳',
    region: 'china',
    logoId: 'ant',
    brandColor: '#1677FF',
    description: 'Ant Group (Alipay) open-source brand. The "Bailing" MoE family: Ling (non-thinking), Ring (reasoning) and Ming (multimodal). First to release open trillion-parameter models, under MIT.',
    website: 'https://www.inclusion-ai.org',
    chatInterface: 'https://huggingface.co/inclusionAI',
    huggingFace: 'https://huggingface.co/inclusionAI',
    github: 'https://github.com/inclusionAI',
    updatedAt: '2026-04',
    strengths: [
      { category: 'reasoning', score: 9 },
      { category: 'math', score: 9 },
      { category: 'coding', score: 8.5 },
      { category: 'agentic', score: 8 },
      { category: 'self-hosting', score: 6 },
    ],
    models: [
      { id: 'ring-2-6-1t', name: 'Ring-2.6-1T', type: 'reasoning', parameters: '1T', activeParams: '63B', contextWindow: '128K', releaseDate: '2026-04', license: 'MIT', openness: 'open-weight', benchmarks: { gpqa: 88.3, sweBench: 74, aime: 95.8 } },
      { id: 'ling-2-6-1t', name: 'Ling-2.6-1T', type: 'non-reasoning', parameters: '1T', activeParams: '63B', contextWindow: '262K', releaseDate: '2026-04', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 26, sweBench: 72.2 } },
      { id: 'ling-2-6-flash', name: 'Ling-2.6-flash', type: 'non-reasoning', parameters: '104B', activeParams: '7.4B', contextWindow: '262K', releaseDate: '2026-04', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 19, sweBench: 61.2, aime: 73.9 } },
      { id: 'ling-1t', name: 'Ling-1T', type: 'non-reasoning', parameters: '1T', activeParams: '50B', contextWindow: '128K', releaseDate: '2025-10', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 19 } },
    ],
  },

  // TENCENT (Hunyuan)
  {
    id: 'hunyuan',
    name: 'Hunyuan (Tencent)',
    creator: 'Tencent (腾讯)',
    country: '🇨🇳',
    region: 'china',
    logoId: 'hunyuan',
    monogram: 'Hy',
    brandColor: '#0052D9',
    description: 'Tencent’s model family: dense and MoE LLMs, reasoning, multimodal and 3D/image generation. Much of it is open under the Hunyuan community license; the TurboS and T1 flagships stay closed.',
    website: 'https://hunyuan.tencent.com',
    chatInterface: 'https://yuanbao.tencent.com',
    huggingFace: 'https://huggingface.co/tencent',
    github: 'https://github.com/Tencent-Hunyuan',
    updatedAt: '2026-04',
    strengths: [
      { category: 'reasoning', score: 8.5 },
      { category: 'coding', score: 8 },
      { category: 'multimodal', score: 8 },
      { category: 'agentic', score: 8 },
      { category: 'multilingual', score: 8 },
      { category: 'self-hosting', score: 7 },
    ],
    models: [
      { id: 'hy3-preview', name: 'Hy3-preview', type: 'reasoning', parameters: '295B', activeParams: '21B', contextWindow: '256K', releaseDate: '2026-04', license: 'Tencent Community', openness: 'restricted', benchmarks: { aaii: 34, gpqa: 73.2, sweBench: 74.4 } },
      { id: 'hunyuan-a13b', name: 'Hunyuan-A13B', type: 'general', parameters: '80B', activeParams: '13B', contextWindow: '256K', releaseDate: '2025-06', license: 'Tencent Community', openness: 'restricted', benchmarks: { gpqa: 71.2, aime: 76.8, mmluPro: 67.2, liveCodeBench: 63.9 } },
      { id: 'hunyuan-7b', name: 'Hunyuan-7B-Instruct', type: 'general', parameters: '7B', contextWindow: '256K', releaseDate: '2025-07', license: 'Tencent Community', openness: 'restricted', benchmarks: { gpqa: 60.1, aime: 75.3, mmluPro: 57.8, liveCodeBench: 57 } },
      { id: 'hunyuan-large', name: 'Hunyuan-Large', type: 'general', parameters: '389B', activeParams: '52B', contextWindow: '256K', releaseDate: '2024-11', license: 'Tencent Community', openness: 'restricted', benchmarks: { gpqa: 42.4 } },
    ],
  },

  // XIAOMI (MiMo)
  {
    id: 'mimo',
    name: 'MiMo (Xiaomi)',
    creator: 'Xiaomi',
    country: '🇨🇳',
    region: 'china',
    logoId: 'mimo',
    monogram: 'Mi',
    brandColor: '#FF6900',
    description: 'Xiaomi’s open-source effort, from the dense MiMo-7B reasoner to large multimodal MoE. All weights MIT-licensed. MiMo-V2.5-Pro ranks near the top of the Artificial Analysis index.',
    website: 'https://mimo.xiaomi.com',
    chatInterface: 'https://aistudio.xiaomimimo.com',
    huggingFace: 'https://huggingface.co/XiaomiMiMo',
    github: 'https://github.com/XiaomiMiMo',
    updatedAt: '2026-04',
    strengths: [
      { category: 'reasoning', score: 9 },
      { category: 'coding', score: 9 },
      { category: 'math', score: 9 },
      { category: 'multimodal', score: 8 },
      { category: 'self-hosting', score: 7.5 },
    ],
    models: [
      { id: 'mimo-v2-5-pro', name: 'MiMo-V2.5-Pro', type: 'reasoning', parameters: '1.02T', activeParams: '42B', contextWindow: '1M', releaseDate: '2026-04', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 42, sweBench: 78.9 } },
      { id: 'mimo-v2-flash', name: 'MiMo-V2-Flash', type: 'reasoning', parameters: '309B', activeParams: '15B', contextWindow: '256K', releaseDate: '2025-12', license: 'MIT', openness: 'open-weight', benchmarks: { gpqa: 83.7, sweBench: 73.4, aime: 94.1, mmluPro: 84.9, liveCodeBench: 80.6 } },
      { id: 'mimo-vl-7b', name: 'MiMo-VL-7B-RL', type: 'multimodal', parameters: '7B', contextWindow: '32K', releaseDate: '2025-08', license: 'MIT', openness: 'open-weight', benchmarks: { mmmu: 70.6 } },
      { id: 'mimo-7b-rl', name: 'MiMo-7B-RL', type: 'reasoning', parameters: '7B', contextWindow: '32K', releaseDate: '2025-05', license: 'MIT', openness: 'open-weight', benchmarks: { gpqa: 60.6, aime: 70.2, liveCodeBench: 52.2 } },
    ],
  },

  // BYTEDANCE (Seed)
  {
    id: 'seed',
    name: 'Seed (ByteDance)',
    creator: 'ByteDance Seed',
    country: '🇨🇳',
    region: 'china',
    logoId: 'seed',
    monogram: 'Sd',
    brandColor: '#4E5FFF',
    description: 'ByteDance’s research lab (parent of TikTok). Runs two tracks: open Seed models (Seed-OSS, Seed-Coder, UI-TARS) and closed flagships that power the Doubao assistant.',
    website: 'https://seed.bytedance.com',
    chatInterface: 'https://www.doubao.com',
    huggingFace: 'https://huggingface.co/ByteDance-Seed',
    github: 'https://github.com/ByteDance-Seed',
    updatedAt: '2025-08',
    strengths: [
      { category: 'coding', score: 8.5 },
      { category: 'agentic', score: 8.5 },
      { category: 'reasoning', score: 8 },
      { category: 'long-context', score: 8 },
      { category: 'self-hosting', score: 8 },
    ],
    models: [
      { id: 'seed-oss-36b', name: 'Seed-OSS-36B-Instruct', type: 'reasoning', parameters: '36B', contextWindow: '512K', releaseDate: '2025-08', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { gpqa: 71.4, sweBench: 56, aime: 84.7, mmluPro: 82.7, liveCodeBench: 67.4 } },
      { id: 'seed-coder-8b', name: 'Seed-Coder-8B', type: 'coding', parameters: '8B', contextWindow: '64K', releaseDate: '2025-05', license: 'MIT', openness: 'open-weight', benchmarks: { liveCodeBench: 24.7 } },
    ],
  },

  // SHANGHAI AI LAB / OpenGVLab (InternLM / InternVL)
  {
    id: 'internlm',
    name: 'InternLM / InternVL',
    creator: 'Shanghai AI Lab / OpenGVLab',
    country: '🇨🇳',
    region: 'china',
    logoId: 'internlm',
    monogram: 'In',
    brandColor: '#5B5BD6',
    description: 'The Shanghai AI Laboratory’s "Intern" ecosystem: text LLMs (InternLM), scientific models (Intern-S1) and the strong InternVL multimodal models. All open under Apache-2.0.',
    website: 'https://huggingface.co/internlm',
    chatInterface: 'https://huggingface.co/OpenGVLab',
    huggingFace: 'https://huggingface.co/internlm',
    github: 'https://github.com/InternLM',
    updatedAt: '2026-02',
    strengths: [
      { category: 'multimodal', score: 9 },
      { category: 'reasoning', score: 8.5 },
      { category: 'math', score: 8.5 },
      { category: 'self-hosting', score: 8.5 },
      { category: 'long-context', score: 7 },
    ],
    models: [
      { id: 'intern-s1-pro', name: 'Intern-S1-Pro', type: 'multimodal', parameters: '~1T', activeParams: '22B', contextWindow: '256K', releaseDate: '2026-02', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aime: 93.1, mmluPro: 86.6 } },
      { id: 'intern-s1', name: 'Intern-S1', type: 'multimodal', parameters: '241B', activeParams: '28B', contextWindow: '64K', releaseDate: '2025-08', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { gpqa: 77.3, aime: 86.0, mmluPro: 83.5, mmmu: 77.7 } },
      { id: 'internvl3-5-241b', name: 'InternVL3.5-241B-A28B', type: 'multimodal', parameters: '241B', activeParams: '28B', contextWindow: '32K', releaseDate: '2025-08', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { gpqa: 73.2, aime: 75.6, mmluPro: 81.3, mmmu: 77.7 } },
      { id: 'internlm3-8b', name: 'InternLM3-8B-Instruct', type: 'general', parameters: '8B', contextWindow: '32K', releaseDate: '2025-01', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { gpqa: 37.4, mmluPro: 57.6 } },
    ],
  },

  // OpenBMB (MiniCPM)
  {
    id: 'minicpm',
    name: 'MiniCPM (OpenBMB)',
    creator: 'OpenBMB / ModelBest',
    country: '🇨🇳',
    region: 'china',
    monogram: 'cpm',
    brandColor: '#0D9488',
    description: 'Community tied to Tsinghua’s NLP lab, focused on ultra-efficient on-device ("end-side") language and multimodal models, under Apache-2.0.',
    website: 'https://modelbest.cn',
    chatInterface: 'https://huggingface.co/openbmb',
    huggingFace: 'https://huggingface.co/openbmb',
    github: 'https://github.com/OpenBMB',
    updatedAt: '2026-05',
    strengths: [
      { category: 'self-hosting', score: 9.5 },
      { category: 'speed', score: 9 },
      { category: 'multimodal', score: 8 },
      { category: 'multilingual', score: 7.5 },
    ],
    models: [
      { id: 'minicpm5-1b', name: 'MiniCPM5-1B', type: 'reasoning', parameters: '1.08B', contextWindow: '131K', releaseDate: '2026-05', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aaii: 18 } },
      { id: 'minicpm-o-4-5', name: 'MiniCPM-o-4.5', type: 'multimodal', parameters: '9B', contextWindow: '32K', releaseDate: '2026-02', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { mmmu: 67.6 } },
      { id: 'minicpm4-8b', name: 'MiniCPM4-8B', type: 'general', parameters: '8B', contextWindow: '128K', releaseDate: '2025-06', license: 'Apache-2.0', openness: 'open-weight', benchmarks: {} },
    ],
  },

  // SKYWORK (Kunlun)
  {
    id: 'skywork',
    name: 'Skywork',
    creator: 'Kunlun Tech (昆仑万维)',
    country: '🇨🇳',
    region: 'china',
    logoId: 'skywork',
    monogram: 'Sk',
    brandColor: '#5E5CE6',
    description: 'Kunlun Tech’s model division. Ships open reasoners (OR1), multimodal reasoning models (R1V) and video/image generation models.',
    website: 'https://skywork.ai',
    chatInterface: 'https://skywork.ai',
    huggingFace: 'https://huggingface.co/Skywork',
    github: 'https://github.com/SkyworkAI',
    updatedAt: '2025-07',
    strengths: [
      { category: 'reasoning', score: 8.5 },
      { category: 'math', score: 8.5 },
      { category: 'multimodal', score: 8 },
      { category: 'coding', score: 7.5 },
    ],
    models: [
      { id: 'skywork-or1-32b', name: 'Skywork-OR1-32B', type: 'reasoning', parameters: '32B', contextWindow: '32K', releaseDate: '2025-05', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aime: 73.3, liveCodeBench: 63.0 } },
      { id: 'skywork-r1v3-38b', name: 'Skywork-R1V3-38B', type: 'multimodal', parameters: '38B', contextWindow: '32K', releaseDate: '2025-07', license: 'MIT', openness: 'open-weight', benchmarks: { mmmu: 76.0 } },
    ],
  },

  // 01.AI (Yi)
  {
    id: 'yi',
    name: 'Yi (01.AI)',
    creator: '01.AI (零一万物)',
    country: '🇨🇳',
    region: 'china',
    logoId: 'yi',
    brandColor: '#00B341',
    description: 'Founded by Kai-Fu Lee. The Yi series (2024) pioneered bilingual open source and long context. Since late 2024 the company shifted to B2B and stopped training large in-house models.',
    website: 'https://www.01.ai',
    chatInterface: 'https://www.wanzhi.com',
    huggingFace: 'https://huggingface.co/01-ai',
    github: 'https://github.com/01-ai',
    updatedAt: '2024-10',
    strengths: [
      { category: 'long-context', score: 8 },
      { category: 'multilingual', score: 8 },
      { category: 'coding', score: 7.5 },
      { category: 'self-hosting', score: 9 },
      { category: 'speed', score: 8.5 },
    ],
    models: [
      { id: 'yi-1-5-34b', name: 'Yi-1.5 34B', type: 'general', parameters: '34B', contextWindow: '32K', releaseDate: '2024-05', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { mmluPro: 52.3 } },
      { id: 'yi-coder-9b', name: 'Yi-Coder 9B', type: 'coding', parameters: '9B', contextWindow: '128K', releaseDate: '2024-09', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { liveCodeBench: 23.4 } },
      { id: 'yi-lightning', name: 'Yi-Lightning', type: 'general', parameters: 'Undisclosed', contextWindow: '64K', releaseDate: '2024-10', license: 'Proprietary', openness: 'closed', benchmarks: { gpqa: 50.9 } },
    ],
  },

  // SENSETIME (SenseNova)
  {
    id: 'sensetime',
    name: 'SenseNova (SenseTime)',
    creator: 'SenseTime (商汤)',
    country: '🇨🇳',
    region: 'china',
    logoId: 'sensetime',
    monogram: 'Sn',
    brandColor: '#E11D48',
    description: 'SenseTime, a computer-vision giant, opened part of the SenseNova family in 2025-2026, led by the unified multimodal U1 (understanding + image generation). The V6 flagship stays closed.',
    website: 'https://www.sensetime.com',
    chatInterface: 'https://huggingface.co/sensenova',
    huggingFace: 'https://huggingface.co/sensenova',
    github: 'https://github.com/OpenSenseNova',
    updatedAt: '2026-04',
    strengths: [
      { category: 'multimodal', score: 8.5 },
      { category: 'reasoning', score: 7.5 },
      { category: 'self-hosting', score: 7.5 },
    ],
    models: [
      { id: 'sensenova-u1-8b', name: 'SenseNova-U1-8B-MoT', type: 'multimodal', parameters: '18B', contextWindow: '32K', releaseDate: '2026-04', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { mmmu: 68.8 } },
    ],
  },

  // =====================================================================
  // NORTH AMERICA
  // =====================================================================

  // META (Llama)
  {
    id: 'llama',
    name: 'Llama (Meta)',
    creator: 'Meta',
    country: '🇺🇸',
    region: 'north-america',
    logoId: 'llama',
    monogram: 'Ll',
    brandColor: '#0668E1',
    description: 'The family that popularized open models. Weights under the Llama Community License (not OSI, with a 700M MAU clause). Llama 4 is the last open generation: Meta pivoted to the closed Muse Spark in 2026.',
    website: 'https://www.llama.com',
    chatInterface: 'https://www.meta.ai',
    huggingFace: 'https://huggingface.co/meta-llama',
    github: 'https://github.com/meta-llama',
    updatedAt: '2025-04',
    strengths: [
      { category: 'multilingual', score: 8.5 },
      { category: 'long-context', score: 9 },
      { category: 'multimodal', score: 8 },
      { category: 'agentic', score: 7 },
      { category: 'self-hosting', score: 6.5 },
    ],
    models: [
      { id: 'llama-4-maverick', name: 'Llama 4 Maverick', type: 'multimodal', parameters: '400B', activeParams: '17B', contextWindow: '1M', releaseDate: '2025-04', license: 'Llama 4 Community', openness: 'restricted', benchmarks: { aaii: 14, gpqa: 69.8, mmluPro: 80.5, liveCodeBench: 43.4, mmmu: 73.4 } },
      { id: 'llama-4-scout', name: 'Llama 4 Scout', type: 'multimodal', parameters: '109B', activeParams: '17B', contextWindow: '10M', releaseDate: '2025-04', license: 'Llama 4 Community', openness: 'restricted', benchmarks: { gpqa: 57.2, mmluPro: 74.3, liveCodeBench: 32.8, mmmu: 69.4 } },
      { id: 'llama-3-3-70b', name: 'Llama 3.3 70B', type: 'general', parameters: '70B', contextWindow: '128K', releaseDate: '2024-12', license: 'Llama 3.3 Community', openness: 'restricted', benchmarks: { aaii: 9 } },
      { id: 'llama-3-1-405b', name: 'Llama 3.1 405B', type: 'general', parameters: '405B', contextWindow: '128K', releaseDate: '2024-07', license: 'Llama 3.1 Community', openness: 'restricted', benchmarks: { aaii: 9, gpqa: 50.7, mmluPro: 73.3 } },
    ],
  },

  // GOOGLE (Gemma)
  {
    id: 'gemma',
    name: 'Gemma (Google)',
    creator: 'Google DeepMind',
    country: '🇺🇸',
    region: 'north-america',
    logoId: 'gemma',
    monogram: 'G',
    brandColor: '#4285F4',
    description: 'Google DeepMind’s lightweight open family, built from Gemini research. Covers general LLMs, edge models (3n) and derivatives for vision, code, medicine and safety. Gemma 4 (2026) moved to Apache-2.0.',
    website: 'https://ai.google.dev/gemma',
    chatInterface: 'https://aistudio.google.com',
    huggingFace: 'https://huggingface.co/google',
    github: 'https://github.com/google-deepmind/gemma',
    updatedAt: '2026-03',
    strengths: [
      { category: 'multimodal', score: 9 },
      { category: 'multilingual', score: 9 },
      { category: 'self-hosting', score: 9 },
      { category: 'reasoning', score: 8.5 },
      { category: 'speed', score: 8.5 },
    ],
    models: [
      { id: 'gemma-4-31b', name: 'Gemma 4 31B', type: 'reasoning', parameters: '31B', contextWindow: '256K', releaseDate: '2026-03', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aaii: 29, gpqa: 84.3, aime: 89.2, mmluPro: 85.2, liveCodeBench: 80.0 } },
      { id: 'gemma-4-26b-a4b', name: 'Gemma 4 26B-A4B', type: 'reasoning', parameters: '25B', activeParams: '3.8B', contextWindow: '256K', releaseDate: '2026-03', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { gpqa: 82.3, aime: 88.3, mmluPro: 82.6, liveCodeBench: 77.1 } },
      { id: 'gemma-3-27b', name: 'Gemma 3 27B', type: 'multimodal', parameters: '27B', contextWindow: '128K', releaseDate: '2025-03', license: 'Gemma Terms', openness: 'restricted', benchmarks: { gpqa: 42.4, mmluPro: 67.5, mmmu: 64.9 } },
      { id: 'gemma-3n-e4b', name: 'Gemma 3n E4B', type: 'multimodal', parameters: '~8B', activeParams: '4B', contextWindow: '32K', releaseDate: '2025-06', license: 'Gemma Terms', openness: 'restricted', benchmarks: {} },
    ],
  },

  // MICROSOFT (Phi)
  {
    id: 'phi',
    name: 'Phi (Microsoft)',
    creator: 'Microsoft Research',
    country: '🇺🇸',
    region: 'north-america',
    logoId: 'phi',
    monogram: 'φ',
    brandColor: '#0F6CBD',
    description: 'Family of small language models built on "textbook-quality" synthetic data, aiming to match much larger models on reasoning, math and code. Almost all MIT-licensed.',
    website: 'https://azure.microsoft.com/en-us/products/phi/',
    chatInterface: 'https://huggingface.co/microsoft',
    huggingFace: 'https://huggingface.co/microsoft',
    github: 'https://github.com/microsoft/PhiCookBook',
    updatedAt: '2026-03',
    strengths: [
      { category: 'reasoning', score: 8 },
      { category: 'math', score: 8 },
      { category: 'coding', score: 7.5 },
      { category: 'self-hosting', score: 9.5 },
      { category: 'speed', score: 9 },
    ],
    models: [
      { id: 'phi-4-reasoning-plus', name: 'Phi-4-reasoning-plus', type: 'reasoning', parameters: '14B', contextWindow: '32K', releaseDate: '2025-04', license: 'MIT', openness: 'open-weight', benchmarks: { gpqa: 68.9, aime: 78.0, mmluPro: 76.0, liveCodeBench: 53.1 } },
      { id: 'phi-4', name: 'Phi-4', type: 'general', parameters: '14B', contextWindow: '16K', releaseDate: '2024-12', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 10, gpqa: 56.1, mmluPro: 70.4 } },
      { id: 'phi-4-reasoning-vision', name: 'Phi-4-reasoning-vision-15B', type: 'multimodal', parameters: '15B', contextWindow: '16K', releaseDate: '2026-03', license: 'MIT', openness: 'open-weight', benchmarks: { mmmu: 54.3 } },
      { id: 'phi-4-mini', name: 'Phi-4-mini', type: 'general', parameters: '3.8B', contextWindow: '128K', releaseDate: '2025-02', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 8, mmluPro: 52.8 } },
    ],
  },

  // NVIDIA (Nemotron)
  {
    id: 'nemotron',
    name: 'Nemotron (NVIDIA)',
    creator: 'NVIDIA',
    country: '🇺🇸',
    region: 'north-america',
    logoId: 'nemotron',
    monogram: 'Nv',
    brandColor: '#76B900',
    description: 'NVIDIA’s open family built for reasoning and agents. The 2025-2026 generations use hybrid Mamba-Transformer architectures, 1M context, and release weights, data and recipes (Nemotron 3 under OpenMDW).',
    website: 'https://developer.nvidia.com/nemotron',
    chatInterface: 'https://build.nvidia.com',
    huggingFace: 'https://huggingface.co/nvidia',
    github: 'https://github.com/NVIDIA-NeMo',
    updatedAt: '2026-06',
    strengths: [
      { category: 'reasoning', score: 9 },
      { category: 'agentic', score: 8.5 },
      { category: 'coding', score: 8 },
      { category: 'long-context', score: 9 },
      { category: 'self-hosting', score: 7 },
    ],
    models: [
      { id: 'nemotron-3-ultra', name: 'Nemotron-3-Ultra-550B-A55B', type: 'reasoning', parameters: '550B', activeParams: '55B', contextWindow: '1M', releaseDate: '2026-06', license: 'OpenMDW-1.1', openness: 'open-source', benchmarks: { aaii: 38, sweBench: 76.2, mmluPro: 79.1 } },
      { id: 'nemotron-3-super', name: 'Nemotron-3-Super-120B-A12B', type: 'reasoning', parameters: '120B', activeParams: '12.7B', contextWindow: '1M', releaseDate: '2026-03', license: 'OpenMDW-1.1', openness: 'open-source', benchmarks: { gpqa: 79.4, mmluPro: 83.3, liveCodeBench: 78.4 } },
      { id: 'nemotron-3-nano', name: 'Nemotron-3-Nano-30B-A3B', type: 'reasoning', parameters: '31.6B', activeParams: '3.5B', contextWindow: '1M', releaseDate: '2025-12', license: 'NVIDIA Open Model', openness: 'open-weight', benchmarks: { gpqa: 73.0, sweBench: 38.8, aime: 89.1, mmluPro: 78.3, liveCodeBench: 68.3 } },
      { id: 'llama-nemotron-ultra', name: 'Llama-3.1-Nemotron-Ultra-253B', type: 'reasoning', parameters: '253B', contextWindow: '128K', releaseDate: '2025-04', license: 'NVIDIA Open + Llama', openness: 'restricted', benchmarks: { gpqa: 76.0, aime: 72.5, liveCodeBench: 66.3 } },
    ],
  },

  // OpenAI (gpt-oss)
  {
    id: 'gptoss',
    name: 'gpt-oss (OpenAI)',
    creator: 'OpenAI',
    country: '🇺🇸',
    region: 'north-america',
    logoId: 'gptoss',
    monogram: 'ai',
    brandColor: '#10A37F',
    description: 'OpenAI’s first open-weight release since GPT-2. Two MoE reasoning models under Apache-2.0, with configurable reasoning effort and native MXFP4 quantization to run on a single GPU.',
    website: 'https://openai.com/index/introducing-gpt-oss/',
    chatInterface: 'https://gpt-oss.com',
    huggingFace: 'https://huggingface.co/openai',
    github: 'https://github.com/openai/gpt-oss',
    updatedAt: '2025-08',
    strengths: [
      { category: 'reasoning', score: 9 },
      { category: 'coding', score: 8.5 },
      { category: 'agentic', score: 8.5 },
      { category: 'self-hosting', score: 8.5 },
      { category: 'speed', score: 9 },
    ],
    models: [
      { id: 'gpt-oss-120b', name: 'gpt-oss-120b', type: 'reasoning', parameters: '117B', activeParams: '5.1B', contextWindow: '128K', releaseDate: '2025-08', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aaii: 24, gpqa: 80.1, sweBench: 62.4, aime: 92.5, mmluPro: 80.8 } },
      { id: 'gpt-oss-20b', name: 'gpt-oss-20b', type: 'reasoning', parameters: '21B', activeParams: '3.6B', contextWindow: '128K', releaseDate: '2025-08', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aaii: 15, gpqa: 71.5, sweBench: 60.7, aime: 91.7, mmluPro: 73.6 } },
    ],
  },

  // xAI (Grok)
  {
    id: 'grok',
    name: 'Grok (xAI)',
    creator: 'xAI',
    country: '🇺🇸',
    region: 'north-america',
    logoId: 'grok',
    monogram: 'xAI',
    brandColor: '#333333',
    description: 'xAI open-sources the previous Grok generation while keeping the current one closed. So far only Grok-1 (Apache-2.0) and Grok-2 (restricted community license) have public weights; Grok 3+ is closed.',
    website: 'https://x.ai',
    chatInterface: 'https://grok.com',
    huggingFace: 'https://huggingface.co/xai-org',
    github: 'https://github.com/xai-org',
    updatedAt: '2025-08',
    strengths: [
      { category: 'reasoning', score: 7 },
      { category: 'multilingual', score: 7 },
      { category: 'self-hosting', score: 5 },
    ],
    models: [
      { id: 'grok-2', name: 'Grok-2', type: 'general', parameters: '~270B', activeParams: '115B', contextWindow: '128K', releaseDate: '2025-08', license: 'xAI Community', openness: 'restricted', benchmarks: { aaii: 8 } },
      { id: 'grok-1', name: 'Grok-1', type: 'general', parameters: '314B', activeParams: '79B', contextWindow: '8K', releaseDate: '2024-03', license: 'Apache-2.0', openness: 'open-weight', benchmarks: {} },
    ],
  },

  // ALLEN INSTITUTE (OLMo)
  {
    id: 'olmo',
    name: 'OLMo (Ai2)',
    creator: 'Allen Institute for AI',
    country: '🇺🇸',
    region: 'north-america',
    logoId: 'olmo',
    monogram: 'Ai2',
    brandColor: '#F0529C',
    description: 'Seattle nonprofit producing the reference fully-open models: beyond weights, it releases training data, code, checkpoints and evaluations, almost always under Apache-2.0.',
    website: 'https://allenai.org/olmo',
    chatInterface: 'https://playground.allenai.org',
    huggingFace: 'https://huggingface.co/allenai',
    github: 'https://github.com/allenai',
    updatedAt: '2026-01',
    strengths: [
      { category: 'reasoning', score: 7.5 },
      { category: 'multimodal', score: 7 },
      { category: 'self-hosting', score: 8 },
      { category: 'multilingual', score: 6 },
    ],
    models: [
      { id: 'olmo-3-think-32b', name: 'OLMo 3-Think 32B', type: 'reasoning', parameters: '32B', contextWindow: '65K', releaseDate: '2025-11', license: 'Apache-2.0', openness: 'open-source', benchmarks: { aaii: 6, aime: 72.5 } },
      { id: 'olmo-3-instruct-7b', name: 'OLMo 3-Instruct 7B', type: 'non-reasoning', parameters: '7B', contextWindow: '65K', releaseDate: '2025-11', license: 'Apache-2.0', openness: 'open-source', benchmarks: {} },
      { id: 'olmo-2-32b', name: 'OLMo 2 32B Instruct', type: 'general', parameters: '32B', contextWindow: '4K', releaseDate: '2025-03', license: 'Apache-2.0', openness: 'open-source', benchmarks: {} },
      { id: 'molmo-72b', name: 'Molmo 72B', type: 'multimodal', parameters: '72B', contextWindow: '4K', releaseDate: '2024-09', license: 'Apache-2.0', openness: 'open-source', benchmarks: { mmmu: 59.4 } },
    ],
  },

  // IBM (Granite)
  {
    id: 'granite',
    name: 'Granite (IBM)',
    creator: 'IBM',
    country: '🇺🇸',
    region: 'north-america',
    logoId: 'granite',
    monogram: 'IBM',
    brandColor: '#0F62FE',
    description: 'IBM’s enterprise family, all Apache-2.0, spanning language, code, vision, embeddings and safety. The 4.x models use a hybrid Mamba/Transformer architecture and are cryptographically signed.',
    website: 'https://www.ibm.com/granite',
    chatInterface: 'https://www.ibm.com/granite/playground/',
    huggingFace: 'https://huggingface.co/ibm-granite',
    github: 'https://github.com/ibm-granite',
    updatedAt: '2026-04',
    strengths: [
      { category: 'self-hosting', score: 9 },
      { category: 'long-context', score: 8.5 },
      { category: 'coding', score: 8 },
      { category: 'multilingual', score: 8 },
      { category: 'speed', score: 8.5 },
    ],
    models: [
      { id: 'granite-4-1-30b', name: 'Granite 4.1-30B', type: 'general', parameters: '30B', contextWindow: '512K', releaseDate: '2026-04', license: 'Apache-2.0', openness: 'open-source', benchmarks: { mmluPro: 64.1 } },
      { id: 'granite-4-h-small', name: 'Granite-4.0-H-Small', type: 'general', parameters: '32B', activeParams: '9B', contextWindow: '128K', releaseDate: '2025-10', license: 'Apache-2.0', openness: 'open-source', benchmarks: { mmluPro: 55.5 } },
      { id: 'granite-4-1-8b', name: 'Granite 4.1-8B', type: 'general', parameters: '8B', contextWindow: '512K', releaseDate: '2026-04', license: 'Apache-2.0', openness: 'open-source', benchmarks: { mmluPro: 56.0 } },
    ],
  },

  // COHERE (Command / Aya)
  {
    id: 'command',
    name: 'Command (Cohere)',
    creator: 'Cohere / Cohere Labs',
    country: '🇨🇦',
    region: 'north-america',
    logoId: 'command',
    monogram: 'Co',
    brandColor: '#D6336C',
    description: 'Canadian enterprise-model lab. The Command line and multilingual Aya have open weights, usually under CC-BY-NC (non-commercial). The new Command A+ flagship is the first under Apache-2.0.',
    website: 'https://cohere.com',
    chatInterface: 'https://dashboard.cohere.com',
    huggingFace: 'https://huggingface.co/CohereLabs',
    github: 'https://github.com/Cohere-Labs-Community',
    updatedAt: '2026-05',
    strengths: [
      { category: 'multilingual', score: 9.5 },
      { category: 'agentic', score: 8 },
      { category: 'long-context', score: 8.5 },
      { category: 'reasoning', score: 7.5 },
      { category: 'self-hosting', score: 7 },
    ],
    models: [
      { id: 'command-a-plus', name: 'Command A+', type: 'multimodal', parameters: '218B', activeParams: '25B', contextWindow: '128K', releaseDate: '2026-05', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aaii: 37, mmmu: 75.1 } },
      { id: 'command-a', name: 'Command A', type: 'general', parameters: '111B', contextWindow: '256K', releaseDate: '2025-03', license: 'CC-BY-NC', openness: 'restricted', benchmarks: { gpqa: 50.5 } },
      { id: 'command-r-plus', name: 'Command R+', type: 'general', parameters: '104B', contextWindow: '128K', releaseDate: '2024-04', license: 'CC-BY-NC', openness: 'restricted', benchmarks: { gpqa: 34.3 } },
      { id: 'aya-expanse-32b', name: 'Aya Expanse 32B', type: 'multimodal', parameters: '32B', contextWindow: '128K', releaseDate: '2024-12', license: 'CC-BY-NC', openness: 'restricted', benchmarks: { mmluPro: 45.4 } },
    ],
  },

  // NOUS RESEARCH (Hermes)
  {
    id: 'hermes',
    name: 'Hermes (Nous)',
    creator: 'Nous Research',
    country: '🇺🇸',
    region: 'north-america',
    logoId: 'hermes',
    monogram: 'No',
    brandColor: '#8B5CF6',
    description: 'Open-source collective known for the Hermes series of neutral, steerable post-training, and the Psyche decentralized-training network. Hermes 4 introduced hybrid reasoning.',
    website: 'https://nousresearch.com',
    chatInterface: 'https://hermes.nousresearch.com',
    huggingFace: 'https://huggingface.co/NousResearch',
    github: 'https://github.com/NousResearch',
    updatedAt: '2025-08',
    strengths: [
      { category: 'reasoning', score: 8 },
      { category: 'agentic', score: 8 },
      { category: 'coding', score: 7.5 },
      { category: 'self-hosting', score: 7 },
    ],
    models: [
      { id: 'hermes-4-405b', name: 'Hermes 4 405B', type: 'reasoning', parameters: '406B', contextWindow: '128K', releaseDate: '2025-08', license: 'Llama 3.1 Community', openness: 'restricted', benchmarks: { gpqa: 70.6, aime: 78.1, mmluPro: 80.6, liveCodeBench: 61.4 } },
      { id: 'hermes-4-14b', name: 'Hermes 4 14B', type: 'reasoning', parameters: '14B', contextWindow: '128K', releaseDate: '2025-08', license: 'Apache-2.0', openness: 'open-weight', benchmarks: {} },
    ],
  },

  // HUGGING FACE (SmolLM)
  {
    id: 'smollm',
    name: 'SmolLM (Hugging Face)',
    creator: 'Hugging Face',
    country: '🇺🇸',
    region: 'north-america',
    logoId: 'smollm',
    monogram: 'Sm',
    brandColor: '#D97706',
    description: 'Hugging Face’s science team. Fully open small language and vision models (weights, data and configs) under Apache-2.0, focused on running locally.',
    website: 'https://huggingface.co/blog/smollm3',
    chatInterface: 'https://huggingface.co/HuggingFaceTB',
    huggingFace: 'https://huggingface.co/HuggingFaceTB',
    github: 'https://github.com/huggingface/smollm',
    updatedAt: '2025-07',
    strengths: [
      { category: 'self-hosting', score: 9.5 },
      { category: 'speed', score: 9 },
      { category: 'reasoning', score: 6 },
    ],
    models: [
      { id: 'smollm3-3b', name: 'SmolLM3-3B', type: 'reasoning', parameters: '3B', contextWindow: '128K', releaseDate: '2025-07', license: 'Apache-2.0', openness: 'open-source', benchmarks: { gpqa: 41.7, aime: 36.7, liveCodeBench: 30.0 } },
      { id: 'smolvlm-2-2b', name: 'SmolVLM 2.2B', type: 'multimodal', parameters: '2.2B', contextWindow: '16K', releaseDate: '2025-02', license: 'Apache-2.0', openness: 'open-source', benchmarks: {} },
    ],
  },

  // APPLE
  {
    id: 'apple',
    name: 'Apple',
    creator: 'Apple',
    country: '🇺🇸',
    region: 'north-america',
    logoId: 'apple',
    monogram: '',
    brandColor: '#333336',
    description: 'Apple Machine Learning Research publishes research models with weights and code (OpenELM, DCLM, FastVLM). These are distinct from the closed on-device Apple Intelligence models.',
    website: 'https://machinelearning.apple.com',
    chatInterface: 'https://huggingface.co/apple',
    huggingFace: 'https://huggingface.co/apple',
    github: 'https://github.com/apple',
    updatedAt: '2025-05',
    strengths: [
      { category: 'self-hosting', score: 9 },
      { category: 'multimodal', score: 7 },
      { category: 'speed', score: 8.5 },
    ],
    models: [
      { id: 'fastvlm-7b', name: 'FastVLM 7B', type: 'multimodal', parameters: '7B', contextWindow: '32K', releaseDate: '2025-05', license: 'apple-amlr', openness: 'restricted', benchmarks: { mmmu: 45.4 } },
      { id: 'openelm-3b', name: 'OpenELM 3B', type: 'general', parameters: '3B', contextWindow: '2K', releaseDate: '2024-04', license: 'apple-amlr', openness: 'restricted', benchmarks: {} },
      { id: 'dclm-7b', name: 'DCLM-7B', type: 'general', parameters: '7B', contextWindow: '2K', releaseDate: '2024-07', license: 'apple-ascl', openness: 'restricted', benchmarks: {} },
    ],
  },

  // SERVICENOW (Apriel)
  {
    id: 'apriel',
    name: 'Apriel (ServiceNow)',
    creator: 'ServiceNow AI',
    country: '🇺🇸',
    region: 'north-america',
    monogram: 'Ap',
    brandColor: '#1B998B',
    description: 'ServiceNow’s compact reasoning models, designed for single-GPU enterprise deployment. Apriel-1.5-15B-Thinker drew attention for scoring high on the Artificial Analysis index for its size.',
    website: 'https://www.servicenow.com/blogs/2025/apriel-model-family-frontier-reasoning',
    chatInterface: 'https://huggingface.co/ServiceNow-AI',
    huggingFace: 'https://huggingface.co/ServiceNow-AI',
    github: 'https://github.com/ServiceNow',
    updatedAt: '2025-10',
    strengths: [
      { category: 'reasoning', score: 8.5 },
      { category: 'self-hosting', score: 9 },
      { category: 'agentic', score: 7.5 },
    ],
    models: [
      { id: 'apriel-1-5-15b', name: 'Apriel-1.5-15B-Thinker', type: 'reasoning', parameters: '15B', contextWindow: '131K', releaseDate: '2025-10', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 52 } },
      { id: 'apriel-nemotron-15b', name: 'Apriel-Nemotron-15B-Thinker', type: 'reasoning', parameters: '15B', contextWindow: '131K', releaseDate: '2025-05', license: 'MIT', openness: 'open-weight', benchmarks: {} },
    ],
  },

  // REKA
  {
    id: 'reka',
    name: 'Reka AI',
    creator: 'Reka AI',
    country: '🇺🇸',
    region: 'north-america',
    monogram: 'Rk',
    brandColor: '#FF4D4D',
    description: 'San Francisco lab (founded by ex-DeepMind/Google researchers) focused on multimodal models. Ships open reasoners (Reka Flash, Apache-2.0) alongside the closed Reka Core flagship.',
    website: 'https://reka.ai',
    chatInterface: 'https://chat.reka.ai',
    huggingFace: 'https://huggingface.co/RekaAI',
    github: 'https://github.com/reka-ai',
    updatedAt: '2025-07',
    strengths: [
      { category: 'reasoning', score: 7 },
      { category: 'multimodal', score: 7 },
      { category: 'coding', score: 7 },
      { category: 'self-hosting', score: 8 },
    ],
    models: [
      { id: 'reka-flash-3-1', name: 'Reka Flash 3.1', type: 'reasoning', parameters: '21B', contextWindow: '128K', releaseDate: '2025-07', license: 'Apache-2.0', openness: 'open-weight', benchmarks: {} },
      { id: 'reka-flash-3', name: 'Reka Flash 3', type: 'reasoning', parameters: '21B', contextWindow: '128K', releaseDate: '2025-03', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aaii: 4 } },
    ],
  },

  // LIQUID AI (LFM)
  {
    id: 'liquid',
    name: 'Liquid AI (LFM)',
    creator: 'Liquid AI',
    country: '🇺🇸',
    region: 'north-america',
    logoId: 'liquid',
    monogram: 'Lq',
    brandColor: '#00B3A4',
    description: 'MIT CSAIL spin-off. The Liquid Foundation Models use a custom hybrid architecture (short convolutions + attention), optimized for edge (phones, laptops) with low memory and fast CPU inference.',
    website: 'https://www.liquid.ai',
    chatInterface: 'https://www.liquid.ai/playground',
    huggingFace: 'https://huggingface.co/LiquidAI',
    github: 'https://github.com/Liquid4All',
    updatedAt: '2025-10',
    strengths: [
      { category: 'self-hosting', score: 9.5 },
      { category: 'speed', score: 9.5 },
      { category: 'multimodal', score: 6 },
    ],
    models: [
      { id: 'lfm2-8b-a1b', name: 'LFM2-8B-A1B', type: 'general', parameters: '8.3B', activeParams: '1.5B', contextWindow: '32K', releaseDate: '2025-10', license: 'LFM Open', openness: 'restricted', benchmarks: {} },
      { id: 'lfm2-1-2b', name: 'LFM2-1.2B', type: 'general', parameters: '1.2B', contextWindow: '32K', releaseDate: '2025-07', license: 'LFM Open', openness: 'restricted', benchmarks: {} },
    ],
  },

  // =====================================================================
  // EUROPE
  // =====================================================================

  // MISTRAL AI
  {
    id: 'mistral',
    name: 'Mistral AI',
    creator: 'Mistral AI',
    country: '🇫🇷',
    region: 'europe',
    logoId: 'mistral',
    monogram: 'M',
    brandColor: '#FA520F',
    description: 'French lab with a dual strategy: lots of open weights under Apache-2.0 alongside commercial products. In 2026 the flagships opened up (Large 3, Small 4) and lines like Magistral (reasoning) and Devstral (coding) consolidated.',
    website: 'https://mistral.ai',
    chatInterface: 'https://chat.mistral.ai',
    huggingFace: 'https://huggingface.co/mistralai',
    github: 'https://github.com/mistralai',
    updatedAt: '2026-04',
    strengths: [
      { category: 'coding', score: 8.5 },
      { category: 'reasoning', score: 8 },
      { category: 'multilingual', score: 9 },
      { category: 'multimodal', score: 8 },
      { category: 'agentic', score: 8 },
      { category: 'self-hosting', score: 8.5 },
    ],
    models: [
      { id: 'mistral-large-3', name: 'Mistral Large 3', type: 'multimodal', parameters: '675B', activeParams: '41B', contextWindow: '256K', releaseDate: '2025-12', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aaii: 16 } },
      { id: 'mistral-small-4', name: 'Mistral Small 4', type: 'reasoning', parameters: '119B', activeParams: '6B', contextWindow: '256K', releaseDate: '2026-03', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { aaii: 28, gpqa: 71.2 } },
      { id: 'mistral-medium-3-5', name: 'Mistral Medium 3.5', type: 'multimodal', parameters: '128B', contextWindow: '256K', releaseDate: '2026-04', license: 'Modified MIT', openness: 'open-weight', benchmarks: { sweBench: 77.6 } },
      { id: 'magistral-small-1-2', name: 'Magistral Small 1.2', type: 'reasoning', parameters: '24B', contextWindow: '128K', releaseDate: '2025-09', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { gpqa: 70.1, aime: 77.3, liveCodeBench: 70.9 } },
      { id: 'devstral-small-1-1', name: 'Devstral Small 1.1', type: 'coding', parameters: '24B', contextWindow: '128K', releaseDate: '2025-07', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { sweBench: 53.6 } },
      { id: 'mistral-small-3-2', name: 'Mistral Small 3.2', type: 'multimodal', parameters: '24B', contextWindow: '128K', releaseDate: '2025-06', license: 'Apache-2.0', openness: 'open-weight', benchmarks: { gpqa: 46.1, mmluPro: 69.1, mmmu: 64.0 } },
      { id: 'mixtral-8x22b', name: 'Mixtral 8x22B', type: 'general', parameters: '141B', activeParams: '39B', contextWindow: '64K', releaseDate: '2024-04', license: 'Apache-2.0', openness: 'open-weight', benchmarks: {} },
    ],
  },

  // =====================================================================
  // MIDDLE EAST
  // =====================================================================

  // TII (Falcon)
  {
    id: 'falcon',
    name: 'Falcon (TII)',
    creator: 'Technology Innovation Institute',
    country: '🇦🇪',
    region: 'middle-east',
    logoId: 'falcon',
    monogram: 'Fa',
    brandColor: '#00857C',
    description: 'Abu Dhabi institute (TII). Open models from dense transformers (180B, Falcon 3) to attention+Mamba hybrids (Falcon-H1) and Arabic models, under the Falcon license (Apache-2.0 based).',
    website: 'https://falconllm.tii.ae',
    chatInterface: 'https://chat.falconllm.tii.ae',
    huggingFace: 'https://huggingface.co/tiiuae',
    github: 'https://github.com/tiiuae',
    updatedAt: '2026-01',
    strengths: [
      { category: 'reasoning', score: 8 },
      { category: 'multilingual', score: 8.5 },
      { category: 'self-hosting', score: 8.5 },
      { category: 'coding', score: 7.5 },
    ],
    models: [
      { id: 'falcon-h1r-7b', name: 'Falcon-H1R-7B', type: 'reasoning', parameters: '8B', contextWindow: '256K', releaseDate: '2026-01', license: 'Falcon-LLM 2.0', openness: 'open-weight', benchmarks: { gpqa: 61.3, aime: 83.1, mmluPro: 72.1, liveCodeBench: 68.6 } },
      { id: 'falcon-h1-34b', name: 'Falcon-H1-34B-Instruct', type: 'general', parameters: '34B', contextWindow: '256K', releaseDate: '2025-05', license: 'Falcon-LLM', openness: 'open-weight', benchmarks: { gpqa: 41.5, aime: 16.7, mmluPro: 58.7, liveCodeBench: 49.7 } },
      { id: 'falcon-3-10b', name: 'Falcon 3 10B', type: 'general', parameters: '10B', contextWindow: '32K', releaseDate: '2024-12', license: 'Falcon-LLM 2.0', openness: 'open-weight', benchmarks: { mmluPro: 38.1 } },
    ],
  },

  // AI21 (Jamba)
  {
    id: 'jamba',
    name: 'Jamba (AI21)',
    creator: 'AI21 Labs',
    country: '🇮🇱',
    region: 'middle-east',
    logoId: 'jamba',
    monogram: 'J',
    brandColor: '#6B4FBB',
    description: 'Israeli lab. Jamba is a hybrid SSM-Transformer family (Mamba + attention + MoE) built for long context and memory efficiency (small KV cache).',
    website: 'https://www.ai21.com',
    chatInterface: 'https://studio.ai21.com',
    huggingFace: 'https://huggingface.co/ai21labs',
    github: 'https://github.com/ai21labs',
    updatedAt: '2025-10',
    strengths: [
      { category: 'long-context', score: 9.5 },
      { category: 'speed', score: 8 },
      { category: 'self-hosting', score: 7 },
    ],
    models: [
      { id: 'jamba-large-1-7', name: 'Jamba Large 1.7', type: 'general', parameters: '398B', activeParams: '94B', contextWindow: '256K', releaseDate: '2025-07', license: 'Jamba Open', openness: 'open-weight', benchmarks: {} },
      { id: 'jamba-reasoning-3b', name: 'Jamba Reasoning 3B', type: 'reasoning', parameters: '3B', contextWindow: '256K', releaseDate: '2025-10', license: 'Apache-2.0', openness: 'open-weight', benchmarks: {} },
    ],
  },

  // =====================================================================
  // ASIA-PACIFIC
  // =====================================================================

  // LG (EXAONE)
  {
    id: 'exaone',
    name: 'EXAONE (LG)',
    creator: 'LG AI Research',
    country: '🇰🇷',
    region: 'asia-pacific',
    logoId: 'exaone',
    monogram: 'EX',
    brandColor: '#A50034',
    description: 'Family from South Korea’s LG group. Bilingual-to-multilingual models from edge to 32B reasoning. Open weights, but under the non-commercial EXAONE license (research and education).',
    website: 'https://www.lgresearch.ai/exaone',
    chatInterface: 'https://huggingface.co/LGAI-EXAONE',
    huggingFace: 'https://huggingface.co/LGAI-EXAONE',
    github: 'https://github.com/LG-AI-EXAONE',
    updatedAt: '2025-07',
    strengths: [
      { category: 'reasoning', score: 8.5 },
      { category: 'math', score: 8.5 },
      { category: 'coding', score: 8 },
      { category: 'multilingual', score: 8 },
      { category: 'self-hosting', score: 8 },
    ],
    models: [
      { id: 'exaone-4-0-32b', name: 'EXAONE 4.0 32B', type: 'reasoning', parameters: '32B', contextWindow: '131K', releaseDate: '2025-07', license: 'EXAONE (non-commercial)', openness: 'restricted', benchmarks: { gpqa: 75.4, aime: 85.3, mmluPro: 81.8, liveCodeBench: 72.6 } },
      { id: 'exaone-deep-32b', name: 'EXAONE Deep 32B', type: 'reasoning', parameters: '32B', contextWindow: '32K', releaseDate: '2025-03', license: 'EXAONE (non-commercial)', openness: 'restricted', benchmarks: {} },
      { id: 'exaone-3-5-32b', name: 'EXAONE 3.5 32B', type: 'non-reasoning', parameters: '32B', contextWindow: '32K', releaseDate: '2024-12', license: 'EXAONE (non-commercial)', openness: 'restricted', benchmarks: {} },
    ],
  },

  // UPSTAGE (Solar)
  {
    id: 'solar',
    name: 'Solar (Upstage)',
    creator: 'Upstage',
    country: '🇰🇷',
    region: 'asia-pacific',
    logoId: 'solar',
    monogram: 'So',
    brandColor: '#6D28D9',
    description: 'South Korean company known for "Depth-Up-Scaling" (stacking layers from a base model then continued pretraining). The Solar line targets high capability on a single GPU.',
    website: 'https://www.upstage.ai',
    chatInterface: 'https://console.upstage.ai',
    huggingFace: 'https://huggingface.co/upstage',
    github: 'https://github.com/UpstageAI',
    updatedAt: '2025-07',
    strengths: [
      { category: 'reasoning', score: 7.5 },
      { category: 'self-hosting', score: 8.5 },
      { category: 'multilingual', score: 7.5 },
      { category: 'speed', score: 8 },
    ],
    models: [
      { id: 'solar-pro-2', name: 'Solar Pro 2', type: 'reasoning', parameters: '31B', contextWindow: '64K', releaseDate: '2025-07', license: 'MIT', openness: 'open-weight', benchmarks: { aaii: 15 } },
      { id: 'solar-10-7b', name: 'SOLAR-10.7B', type: 'non-reasoning', parameters: '10.7B', contextWindow: '4K', releaseDate: '2023-12', license: 'Apache-2.0', openness: 'open-weight', benchmarks: {} },
    ],
  },

  // SARVAM (India)
  {
    id: 'sarvam',
    name: 'Sarvam AI',
    creator: 'Sarvam AI',
    country: '🇮🇳',
    region: 'asia-pacific',
    logoId: 'sarvam',
    monogram: 'Sa',
    brandColor: '#E0481B',
    description: 'Bengaluru startup focused on AI for Indian languages and tech sovereignty. Open models optimized for Hindi, Tamil, Telugu, Bengali and other languages, plus English.',
    website: 'https://www.sarvam.ai',
    chatInterface: 'https://huggingface.co/sarvamai',
    huggingFace: 'https://huggingface.co/sarvamai',
    github: 'https://github.com/sarvamai',
    updatedAt: '2025-05',
    strengths: [
      { category: 'multilingual', score: 9 },
      { category: 'self-hosting', score: 8 },
      { category: 'reasoning', score: 7 },
    ],
    models: [
      { id: 'sarvam-m', name: 'Sarvam-M', type: 'reasoning', parameters: '24B', contextWindow: '128K', releaseDate: '2025-05', license: 'Apache-2.0', openness: 'open-weight', benchmarks: {} },
      { id: 'sarvam-1', name: 'Sarvam-1', type: 'general', parameters: '2B', contextWindow: '8K', releaseDate: '2024-10', license: 'Sarvam (restricted)', openness: 'restricted', benchmarks: {} },
    ],
  },
];

// ---------------------------------------------------------------------------
// Region metadata
// ---------------------------------------------------------------------------
export const regionOrder: Region[] = ['china', 'north-america', 'europe', 'middle-east', 'asia-pacific'];

export const regionLabels: Record<Region, string> = {
  'china': 'China',
  'north-america': 'North America',
  'europe': 'Europe',
  'middle-east': 'Middle East',
  'asia-pacific': 'Asia-Pacific',
};

// ---------------------------------------------------------------------------
// Utility functions
// ---------------------------------------------------------------------------
export function isOpenWeight(openness: Openness): boolean {
  return openness !== 'closed';
}

export function getMonogram(family: ModelFamily): string {
  if (family.monogram) return family.monogram;
  const cleaned = family.name.replace(/\s*\(.*\)/, '').trim();
  return cleaned.slice(0, 2);
}

export function getAllModels(): Model[] {
  return modelFamilies.flatMap(family => family.models);
}

export function getModelsByFamily(familyId: string): Model[] {
  const family = modelFamilies.find(f => f.id === familyId);
  return family?.models || [];
}

export function getFamiliesByRegion(region: Region): ModelFamily[] {
  return modelFamilies.filter(f => f.region === region);
}

export function getModelCount(): number {
  return getAllModels().length;
}

export function getOpenModelCount(): number {
  return getAllModels().filter(m => isOpenWeight(m.openness)).length;
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

const findModel = (familyId: string, modelId: string): Model =>
  modelFamilies.find(f => f.id === familyId)!.models.find(m => m.id === modelId)!;

export function getUseCaseRecommendations(): Record<string, { familyId: string; model: Model; reason: string }> {
  return {
    coding: {
      familyId: 'deepseek',
      model: findModel('deepseek', 'deepseek-v4-pro'),
      reason: 'DeepSeek-V4-Pro leads open-source agentic coding: 93.5 on LiveCodeBench and 90.1 on GPQA Diamond, with efficient MoE and 1M context.'
    },
    reasoning: {
      familyId: 'glm',
      model: findModel('glm', 'glm-5-2'),
      reason: 'GLM-5.2 is the top-ranked open-weight model on the Artificial Analysis index (51), ahead of DeepSeek and Kimi.'
    },
    math: {
      familyId: 'deepseek',
      model: findModel('deepseek', 'deepseek-v3-2'),
      reason: 'DeepSeek-V3.2 hits 93.1 on AIME 2025. The DeepSeek line is a reference for heavy math and proofs.'
    },
    agentic: {
      familyId: 'kimi',
      model: findModel('kimi', 'kimi-k2-6'),
      reason: 'Kimi K2.6 specializes in agentic workflows, with 80.2 SWE-bench Verified and support for hundreds of sequential tool calls.'
    },
    longContext: {
      familyId: 'minimax',
      model: findModel('minimax', 'minimax-m3'),
      reason: 'MiniMax-M3 pairs a native 1M token window with sparse attention (MSA) and native vision, keeping frontier-level quality.'
    },
    selfHosting: {
      familyId: 'qwen',
      model: findModel('qwen', 'qwen3-6-27b'),
      reason: 'Qwen3.6-27B is dense, runs on a single 24-32GB GPU and still beats much larger models on coding (SWE-bench 77.2).'
    },
    multilingual: {
      familyId: 'qwen',
      model: findModel('qwen', 'qwen3-5-397b'),
      reason: 'The Qwen family has the best native multilingual support (30+ languages) and is the most downloaded on Hugging Face.'
    },
    overall: {
      familyId: 'glm',
      model: findModel('glm', 'glm-5-2'),
      reason: 'GLM-5.2 is the best open-weight model on the overall index (51), closely followed by DeepSeek-V4-Pro, Kimi K2.6 and MiniMax-M3.'
    },
  };
}

export function getModelTypeLabel(type: Model['type']): string {
  const labels: Record<Model['type'], string> = {
    reasoning: 'Reasoning',
    coding: 'Coding',
    multimodal: 'Multimodal',
    general: 'General',
    'non-reasoning': 'Non-Reasoning',
  };
  return labels[type] || type;
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

export function getOpennessLabel(openness: Openness): string {
  const labels: Record<Openness, string> = {
    'open-source': 'Open Source',
    'open-weight': 'Open Weight',
    'restricted': 'Open (restricted)',
    'closed': 'Closed',
  };
  return labels[openness] || openness;
}

export function getOpennessBadgeClass(openness: Openness): string {
  const classes: Record<Openness, string> = {
    'open-source': 'badge-green',
    'open-weight': 'badge-green',
    'restricted': 'badge-amber',
    'closed': 'badge-gray',
  };
  return classes[openness] || 'badge-gray';
}

// Score colouring. The AA Intelligence Index uses a different scale than the
// percentage benchmarks, so it gets its own thresholds.
export function getScoreClass(score: number | undefined, key?: keyof BenchmarkScores): string {
  if (score === undefined) return 'score-na';
  if (key === 'aaii') {
    if (score >= 35) return 'score-high';
    if (score >= 18) return 'score-med';
    return 'score-low';
  }
  if (score >= 75) return 'score-high';
  if (score >= 55) return 'score-med';
  return 'score-low';
}

export function formatNumber(num: number): string {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return String(num);
}

export function formatDate(dateStr: string): string {
  if (!dateStr || dateStr === 'TBA' || dateStr.includes('H2') || dateStr.includes('H1')) {
    return dateStr;
  }
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}
