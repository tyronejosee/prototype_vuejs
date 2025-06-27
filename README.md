<div align="center">
  <a href="https://github.com/tyronejosee/project_prototype_vuejs#gh-light-mode-only" target="_blank">
    <img src="./.github/logo.svg" alt="logo-light" width="80">
  </a>
  <a href="https://github.com/tyronejosee/project_prototype_vuejs#gh-dark-mode-only" target="_blank">
    <img src="./.github/logo.svg" alt="logo-dark" width="80">
  </a>
</div>
<div align="center">
  <h1><strong>Prototype VueJS</strong></h1>
  <a href="https://prototype-vuejs.vercel.app/"><strong>Deploy on Vercel</strong></a>
</div>
<p align="center">
This is a Vue 3 + Vite calendar prototype.
<p>

<p align="center">
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/vue-3.4.38-42b883" alt="vue-version">
  </a>
  <a href="https://pinia.vuejs.org/">
    <img src="https://img.shields.io/badge/pinia-2.1.7-fcd34d" alt="pinia-version">
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/vite-5.4.2-646cff" alt="vite-version">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/typescript-5.5.3-3178c6" alt="typescript-version">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/tailwindcss-3.3.5-38bdf8" alt="tailwindcss-version">
  </a>
  <a href="https://date-fns.org/">
    <img src="https://img.shields.io/badge/date--fns-2.30.0-ff6b6b" alt="date-fns-version">
  </a>
</p>

```mermaid
flowchart TD
    A[CalendarView.vue] -->|uses| B[CalendarGrid.vue]
    B -->|renders| C[DayCell.vue]
    A -->|sidebar| D[EventList.vue]
    A -->|modal| E[EventModal.vue]
    A -->|filter| F[TagFilter.vue]
    A -->|theme| G[ThemeToggle.vue]
    B -->|composable| H[useCalendar.ts]
    A -->|store| I[eventStore.ts]
    subgraph Components
        B
        C
        D
        E
        F
        G
    end
    subgraph Store & Logic
        I
        H
    end
```

## ✨ Features

- Month grid calendar with event dots per day
- Event creation, editing, and deletion (modal)
- Tag filtering for events
- Light/Dark theme toggle
- Persistent storage (localStorage)
- Import/Export events as JSON

## ⚙️ Installation

Install dependencies

```bash
pnpm install
```

Start the development server at `http://localhost:3000/`

```bash
pnpm run dev
```

Build the application for production.

```bash
pnpm build
```

Start the server in production mode.

```bash
pnpm start
```

Run the linter to check the code quality.

```bash
pnpm lint
```

## ⚖️ License

This project is under the [MIT License](https://github.com/tyronejosee/project_prototype_vuejs/blob/main/LICENSE).

Enjoy! 🎉
