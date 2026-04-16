# 🌤️ Weather App

A beginner-friendly weather application built with **React + Vite + Tailwind CSS v4**.

## Features
- 🔍 Search any city in the world
- 🌡️ Displays temperature, feels like, condition, humidity, wind speed, visibility, pressure
- 🌈 Dynamic gradient background based on weather condition
- ⏳ Loading spinner while fetching
- ❌ Proper error handling (city not found, network errors, empty input)
- 📱 Fully responsive

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

## Tailwind CSS v4 Setup (What Changed from v3)

| v3 (old)                          | v4 (new)                              |
|-----------------------------------|---------------------------------------|
| `tailwind.config.js`              | ❌ Deleted — not needed               |
| `postcss.config.js`               | ❌ Deleted — not needed               |
| `autoprefixer` package            | ❌ Removed                            |
| `@tailwind base/components/utilities` | ✅ Replaced with `@import "tailwindcss"` |
| PostCSS plugin                    | ✅ Uses `@tailwindcss/vite` plugin     |
| `theme.extend` in JS config       | ✅ Use `@theme {}` block in CSS        |

## Tech Stack
- ⚡ Vite 8
- ⚛️ React 19
- 🎨 Tailwind CSS v4 (with `@tailwindcss/vite`)
- 🌐 OpenWeatherMap REST API

## API Key
The app uses a free demo key. For production, get your own at [openweathermap.org](https://openweathermap.org/api)
and replace `API_KEY` in `src/App.jsx`.
