# Sopa de letras Game

An **interactive word search game** built with **Next.js** and **React**, featuring automatic word and topic generation via the **Groq API**.

---

## Features

- Generate words based on a user-provided topic.
- Generate a random topic automatically.
- Select words by dragging over the grid (supports mouse and touch).
- Celebration modal when all words are found.
- Retry the game with a "Retry" button.
- Automatic word validation and duplicate filtering.

---

## Technologies

- **Next.js 13** (app router, server/client components)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Groq SDK** for generating words and topics

---

## Project Structure

```
/app
  /components   # UI components: Grid, GridRow, WordList, Input, WinModal
  /hooks        # Custom hooks: useWordSearch, useWordSelection
  /utils        # Grid generation & word checking utilities
  /api
    generate-words.ts  # POST endpoint for word generation
    random-topic.ts    # GET endpoint for random topic
  /types        # TypeScript type definitions
  page.tsx      # Main page component
```

## Installation

```bash
git clone <repo-url>
cd sopa-de-letras
npm install
```

## Set your environment variable:

```
NEXT_PUBLIC_GROQ_API_KEY=<your_api_key>
```

## Run development server

```
npm run dev
```

## Build for production

```
npm run build
```

## Run production version locally

```
npm start
```

## Usage

Open the app in your browser (localhost:3000).
