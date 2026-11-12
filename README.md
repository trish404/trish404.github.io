# trisha.exe ♡ portfolio

Pink retro Y2K portfolio. Vite + React 19.

| Library | Where it's used |
|---|---|
| react-three-fiber + drei | chrome iridescent heart, stars, ring (`src/components/Scene3D.jsx`) |
| shadergradient | animated hero background (`Hero.jsx`) |
| ybouane/liquidglass | draggable glass bubbles and hero card, refracting the live gradient + 3D scene (`Hero.jsx`) |
| liquid-logo (Paper `LiquidMetal`) | liquid-metal heart logo in the nav and About section (`public/logo.svg` is the mask) |
| GSAP + ScrollTrigger + Flip | pinned horizontal experience scroll, reveals, counters, project filter |
| Lenis | smooth scrolling, synced with GSAP's ticker (`src/hooks/useLenis.js`) |
| Vanta (NET) | publications background (`Papers.jsx`, uses three r134 aliased as `three-vanta`) |
| react-bits | SplitText, DecryptedText, CircularText, TiltedCard, GlitchText, ScrollVelocity, ClickSpark (`src/components/reactbits/`) |

**Edit content:** everything lives in `src/data.js`.

```bash
npm install --ignore-scripts   # liquidglass ships a broken postinstall
npm run dev
npm run build
```

## Deploy to Vercel

```bash
npx vercel login
npx vercel --prod
```

Framework preset: Vite. Build command: `npm run build`. Output: `dist`.
In Vercel project settings, set the install command to `npm install --ignore-scripts`.
