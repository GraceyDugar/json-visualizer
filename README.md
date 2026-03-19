# JSONViz — JSON Visualizer

> Paste any JSON and instantly see it as a beautiful interactive diagram.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-violet?style=for-the-badge)](https://json-visualizerai.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![D3.js](https://img.shields.io/badge/D3.js-Diagrams-orange?style=for-the-badge)](https://d3js.org)

---

## What is JSONViz?

JSON data is everywhere — APIs, datasets, ML model outputs, databases — but reading raw JSON is painful. JSONViz turns any JSON instantly into a beautiful, interactive visual tree diagram.

## Features

- Paste any JSON → get an instant visual diagram
- Color coded nodes by data type — objects, arrays, strings, numbers
- Interactive — zoom, pan, hover effects
- Ctrl+Enter shortcut to visualize instantly
- Works with any JSON — APIs, datasets, ML outputs, databases
- No backend — runs entirely in your browser, instant results

## Why I built this

As a data scientist working with APIs, Kaggle datasets, and ML model outputs, I constantly deal with complex nested JSON. This tool makes it effortless to understand any JSON structure at a glance.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| D3.js | Interactive diagram rendering |
| shadcn/ui | UI components |
| Tailwind CSS | Styling |
| Vercel | Deployment |

## How to run locally
```bash
git clone https://github.com/GraceyDugar/json-visualizer.git
cd json-visualizer
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Author

GraceyDugar — [GitHub](https://github.com/GraceyDugar)