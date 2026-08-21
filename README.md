# My Vite Starter

A minimal, modern React + Vite starter template using Bun, TypeScript, Tailwind CSS, Oxlint, Oxfmt, mise, and hk. Ideal for rapid prototyping and modern web development.

## Features

- ⚡️ Fast development with [Vite](https://vite.dev/) and [SWC](https://swc.rs/)
- ⚛️ [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- 🎨 [Tailwind CSS 4](https://tailwindcss.com/) for utility-first styling
- 🧹 [Oxlint](https://oxc.rs/docs/guide/usage/linter) and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) for code quality and formatting
- 🧪 [Bun](https://bun.sh/) for package management and testing

## Quick Start

```bash
# Install pinned Bun and hk via mise
mise install

# Install dependencies
bun install

# Start the development server
bun dev

# Run tests
bun test
```

## Main Component

- See [`src/App.tsx`](src/App.tsx) for the main application component and [`src/main.tsx`](src/main.tsx) for the entry point.

## Example Test

- See [`src/App.test.tsx`](src/App.test.tsx) for an example test using Testing Library and Bun's test runner.

## Scripts

- `bun dev` – Start the development server
- `bun run build` – Build for production
- `bun test` – Run tests
- `bun lint` – Lint the codebase
- `bun format` – Format the codebase
- `mise run check` – Lint and format-check via [hk](https://hk.jdx.dev/)
- `mise run fix` – Auto-fix lint and format via hk

## Tooling

- **Tool versions:** [mise](https://mise.jdx.dev/) pins Bun and hk in `mise.toml`
- **Git hooks:** [hk](https://hk.jdx.dev/) runs Oxfmt and Oxlint on commit/push (replaces husky + lint-staged)
- **Linting:** Uses [Oxlint](https://oxc.rs/docs/guide/usage/linter) correctness defaults with TypeScript, React, Unicorn, and Oxc plugins (React Compiler diagnostics enforced as errors)
- **Formatting:** Uses [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)
- **Testing:** Uses Bun's test runner with Testing Library and jest-dom matchers
- **Styling:** Tailwind CSS is imported globally via `src/index.css`
