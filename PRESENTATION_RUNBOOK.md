# DR Infantil – Demo & QA Runbook

This document summarizes the essential manual checks (Stage 2) and speaking points/flow for the presentation (Stage 5). Keep it nearby while running the walkthrough.

---

## 1. Quick Start Checklist

1. **Install dependencies** (only if `node_modules` was cleaned):
   ```powershell
   npm install --legacy-peer-deps
   ```
2. **Start dev server**:
   ```powershell
   npm run dev
   ```
   - Opens on <http://localhost:5173>
3. **Production sanity (optional)**:
   ```powershell
   npm run build
   npx vite preview
   ```

---

## 2. Critical Flow Spot-Checks

| Flow | Steps | Expected Result |
|------|-------|-----------------|
| **Home landing** | Load root route | Gradient hero with animated hearts/unicorn, CTA copy “Mundo das Diferenças”. Call-to-action buttons scroll down. |
| **Navigation header** | Switch through menu items (desktop & mobile) | Current page highlighted, mobile menu toggle works, login button shows credentials alert. |
| **Disease Library (static)** | Choose “Doenças” | Grid of mock diseases, filters respond, clicking card shows detail snippet (static). |
| **Disease Library (API toggle)** | If `VITE_USE_API=true`, test API pages (`DiseaseLibraryAPI`, `DiseaseDetailAPI`) | Loading state visible, mock API results appear. |
| **Video Library** | “Vídeos” | Cards render with thumbnails and categories. |
| **Games Hub** | “Jogos” | Display of available mini-games; each tile opens respective page (`MemoryGame`, `Puzzle`, `ColoringGame`, `HangmanGame`, `Quiz`). |
| **Stories** | “Histórias” | Storybook cards with CTA to read/listen. |
| **Community – login** | Go to “Comunidade”; submit credentials | Login form visible when logged out; use: `admin@drinfantil.com.br / admin123` or `teste@exemplo.com / teste123`. Success alert, user card + logout button appear. |
| **Community – explore posts** | While logged in, filter categories, open a post | Category pills highlight, modal shows post, comments section, comment input. Logout clears session. |
| **Resources** | “Recursos” | External links & download cards render. |
| **Footer** | Scroll bottom | Contact CTA, navigation shortcuts, social icons. |

> ⚠️ If any flow misbehaves, grab console/log output immediately after reproducing for faster debugging.

---

## 3. Demo Script (10–12 minutes)

1. **Context & mission (30s)**
   - “DR Infantil” supports families navigating rare childhood diseases.
   - Blend of accessible education + playful gamification.

2. **Home overview (1 min)**
   - Highlight inclusive design, soft gradient branding, emotional copy.
   - Show CTA buttons pointing to knowledge vs. fun tracks.

3. **Knowledge journey (3–4 min)**
   - **Disease Library**: filters & search (mention API toggle for real data).
   - **Disease Detail**: emphasise parent-friendly layout, key facts.
   - **Resources**: curated PDFs, hotlines, partner organizations.

4. **Engagement journey (2–3 min)**
   - **Games Hub**: quick tour of memory, puzzle, coloring; note each encourages empathy/education.
   - **Stories**: accessible narratives with audio/visual blends.

5. **Community (3 min)**
   - Login form, credentials, mock auth explanation.
   - Show category filters & celebratory posts.
   - Emphasise moderation rules & positivity cues (star badges, heart icons).

6. **Technical highlights (1 min)**
   - React + TypeScript + Vite + Tailwind.
   - Zustand store orchestrating navigation, mocks for API simulation.
   - Modular component library (`src/components/common` / `community`).

7. **Roadmap callout (30s)**
   - Backend integration (replace mocks), richer analytics, accessibility audits.

---

## 4. Troubleshooting Notes

- **Empty screen?** Ensure `npm run dev` is still running (check `Get-Process node`).
- **Dependency warning (lucide-react vs React 19)**: the project is locked at a known-good snapshot; if reinstalling, use `--legacy-peer-deps`.
- **Stuck login state**: clear `localStorage` key `dr_infantil_user`.
- **Colors/fonts off**: confirm Tailwind compiled (watch console for PostCSS errors).

---

Good luck with the presentation! Keep this runbook open and annotate any real-time feedback to feed the roadmap section.
