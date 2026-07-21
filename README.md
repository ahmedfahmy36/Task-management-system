# Task Management Mini App

A modern, responsive Task Management application built with Nuxt 3, Vue 3 (Composition API), Pinia, and Tailwind CSS.

## Features
- **Data Table**: View all tasks with status filtering and title search.
- **Task Management**: Add, edit, and delete tasks.
- **Task Detail View**: View individual task details, including a visual activity log to track updates.
- **Validation**: Enforces required titles and future due dates.
- **Mock API**: Simulates network latency (1s delay) with proper loading states.
- **Reusable UI**: Built using generic, reusable Vue components (`BaseButton`, `BaseInput`, `BaseCard`).

## Tech Stack
- **Framework**: [Nuxt 3](https://nuxt.com/) / Vue 3
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Language**: TypeScript

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000` by default.

3. **Run Unit Tests:**
   ```bash
   npx vitest run
   ```
