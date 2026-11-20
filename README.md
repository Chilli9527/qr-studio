# QR Studio

A customizable QR code generator web app — a high-fidelity rebuild of the front-end from online-qr-generator.com.

> Current scope: front-end only. QR generation, design customization, live preview and multi-format download are fully working in the browser. User accounts, cloud saving, dynamic redirects, scan analytics and subscriptions require a backend and are not connected yet.

## Features

- **QR types**: Website URL, plain text, WiFi, vCard, Email, Phone, SMS
- **Design**: color presets + custom foreground/background, 4 dot styles, 3 corner styles, optional centered logo with adjustable size
- **Formats**: download as PNG, SVG or JPG at high resolution
- **Live preview**: rendered on canvas with device-pixel-ratio scaling
- **Pages**: landing page, generator studio, login/register UI

## Tech stack

- Vite + React + TypeScript
- `qrcode` — QR matrix generation
- `lucide-react` — icons

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
# output in dist/ — deploy this folder to any static host
```

## Deploy

This is a static site. Import this repo into Vercel, Netlify, Cloudflare Pages or any static host with:

- Build command: `npm run build`
- Output directory: `dist`

## Project structure

```
src/
  qr.ts          QR engine: content builders, canvas renderer, multi-format export
  Landing.tsx    Marketing landing page
  Studio.tsx     QR generator workbench
  Auth.tsx       Login / register UI
  App.tsx        Hash-based routing
  styles.css     Design system
```
