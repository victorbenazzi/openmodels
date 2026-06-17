# OpenModels

> **Catálogo premium dos principais modelos de IA chineses open source** — benchmarks, links oficiais e pontos fortes em um só lugar.

🌐 **Live:** [openmodels.victorbenazzi.com](https://openmodels.victorbenazzi.com)

---

## ✨ Features

- **8 Labs Principais**: Qwen (Alibaba), DeepSeek, Kimi (Moonshot), GLM (Z.ai), MiniMax, Ernie (Baidu), Yi (01.AI), StepFun, Ant Group (Ling)
- **25+ Modelos** com dados detalhados: parâmetros, contexto, licença, data de release
- **Benchmarks Comparativos**: BenchLM, Artificial Analysis, SWE-Bench, MathArena, MMMU, GPQA — tabela ordenável
- **Casos de Uso**: Recomendações por categoria (coding, reasoning, math, agentic, long-context, self-hosting, multilingual, overall)
- **Bilingue PT/EN** com persistência no localStorage
- **Dark Mode** com suporte a preferência do sistema + toggle manual
- **Design Premium Minimalista**: Base 14px, max-width 1216px, identidade visual do [victorbenazzi.com.br](https://victorbenazzi.com.br)
- **Deploy Automático**: Cloudflare Pages via GitHub Actions
- **Performance**: Lighthouse > 95, Astro 5 static + islands, zero-JS por padrão

---

## 🛠 Tech Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | Astro 5.x |
| Styling | Tailwind CSS v4 (native CSS variables) |
| Language | TypeScript (strict) |
| Interatividade | React 19 islands (BenchmarkTable, toggles) |
| Deploy | Cloudflare Pages / Workers |
| Domain | openmodels.victorbenazzi.com |
| CI/CD | GitHub Actions |

---

## 📦 Quick Start

```bash
# Clone
git clone https://github.com/victorbenazzi/openmodels.git
cd openmodels

# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Deploy (requires Wrangler auth)
npm run deploy
```

---

## 📁 Project Structure

```
openmodels/
├── public/
│   ├── favicon.svg
│   ├── og.svg
│   └── logos/           # Lab logos (SVG)
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── ModelFamilyCard.astro
│   │   ├── BenchmarkTable.tsx    # React island
│   │   ├── UseCaseGuide.astro
│   │   ├── LanguageToggle.tsx    # React island
│   │   ├── ThemeToggle.tsx       # React island
│   │   └── Footer.astro
│   ├── data/
│   │   └── models.ts             # Static model data (TypeScript)
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── scripts/
│   │   └── i18n.ts               # PT/EN translations
│   └── styles/
│       └── global.css            # Tailwind v4 + design system
├── .github/workflows/
│   └── deploy.yml                # Cloudflare Pages deploy
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── wrangler.jsonc
```

---

## 📊 Data Sources

Benchmarks agregados de fontes públicas (atualizado Junho 2026):

- **BenchLM** — [benchlm.ai](https://benchlm.ai)
- **Artificial Analysis** — [artificialanalysis.ai](https://artificialanalysis.ai)
- **SWE-Bench Verified** — [swebench.com](https://swebench.com)
- **MathArena** — [matharena.ai](https://matharena.ai)
- **MMMU** — [mmmu-benchmark.github.io](https://mmmu-benchmark.github.io)
- **GPQA Diamond** — [github.com/idavidrein/gpqa](https://github.com/idavidrein/gpqa)

> ⚠️ *Benchmarks evoluem rapidamente. Verifique fontes originais para decisões críticas.*

---

## 🎨 Design System

O design replica a identidade visual do [victorbenazzi.com.br](https://github.com/victorbenazzi/victorbenazzi-new-astro):

- **Base font**: 14px (`text-sm` = 0.875rem)
- **Max width**: 1216px
- **Colors**: Neutral palette (neutral-50 → neutral-950)
- **Headers**: `text-xs font-medium uppercase tracking-[0.2em]`
- **Body**: `text-sm text-neutral-500 leading-relaxed`
- **Borders**: `border-neutral-200` / `dark:border-neutral-800`
- **Hover**: `hover:text-neutral-900` / `dark:hover:text-neutral-50`

---

## 🚀 Deploy na Cloudflare

1. Conecte o repositório no [Cloudflare Pages](https://pages.cloudflare.com)
2. Configure variáveis de ambiente:
   - `CLOUDFLARE_API_TOKEN` (com permissão Pages)
   - `CLOUDFLARE_ACCOUNT_ID`
3. Build command: `npm run build`
4. Output directory: `./dist`
5. Adicione o domínio personalizado: `openmodels.victorbenazzi.com`

O workflow GitHub Actions (`.github/workflows/deploy.yml`) faz deploy automático:
- **PRs** → Preview deployments
- **Push to main** → Production deployment

---

## 📝 Atualizando Dados

Edite `src/data/models.ts` com novas informações:

```typescript
// Adicionar novo modelo
{
  id: 'novo-modelo',
  name: 'Nome do Modelo',
  type: 'reasoning', // ou 'coding', 'multimodal', 'general', 'non-reasoning'
  parameters: '70B',
  activeParams: '8B', // para MoE
  contextWindow: '128K',
  releaseDate: '2025-12',
  license: 'Apache-2.0',
  isOpenWeight: true,
  benchmarks: { benchlm: 75, artificialAnalysis: 70, sweBench: 50, mathArena: 60 },
}
```

Rode `npm run build` para validar TypeScript.

---

## 📄 License

MIT — Livre para uso, modificação e distribuição.

---

## 👤 Autor

**Victor Benazzi** — AI & Automation Engineer  
[🌐 victorbenazzi.com.br](https://www.victorbenazzi.com.br) · [🐙 GitHub](https://github.com/victorbenazzi) · [💼 LinkedIn](https://www.linkedin.com/in/victorbenazzi/) · [📧 hello@victorbenazzi.com.br](mailto:hello@victorbenazzi.com.br)

---

*Última atualização: Junho 2026*