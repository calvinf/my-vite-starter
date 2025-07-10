# My Vite Starter

A minimal, modern React + Vite starter template using Bun, TypeScript, Tailwind CSS, ESLint, and Prettier. Ideal for rapid prototyping and modern web development.

## Features

- ⚡️ Fast development with [Vite](https://vite.dev/) and [SWC](https://swc.rs/)
- ⚛️ [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- 🎨 [Tailwind CSS 4](https://tailwindcss.com/) for utility-first styling
- 🧹 [ESLint 9](https://eslint.org/) and [Prettier](https://prettier.io/) for code quality and formatting
- 🧪 [Bun](https://bun.sh/) for package management and testing

## Quick Start

```bash
# Install dependencies
bun install

# Start the development server
bun dev

# Run tests
bun test
```

## Main Component

The main UI is rendered by the `App` component:

```tsx
import App from './App';

function Root() {
  return <App />;
}
```

## Example Test

- See [`src/App.test.tsx`](src/App.test.tsx) for an example test using Testing Library and Bun's test runner.

## Scripts

- `bun dev` – Start the development server
- `bun run build` – Build for production
- `bun test` – Run tests
- `bun lint` – Lint the codebase
- `bun format` – Format code with Prettier

## Tooling

- **Linting:** Uses strict TypeScript ESLint config (`