# Portfolio App Project Context

This document serves as the master reference for the current state, architecture, and design decisions of the Sayyed/Ahmed Portfolio App. This ensures that any future AI agents or developers have full context on how the application functions.

## 1. Tech Stack & Fundamentals
- **Framework**: React (Bootstrapped with Vite)
- **Styling**: Vanilla CSS (`index.css`) utilizing CSS Variables for global theming.
- **Hosting/Dev**: Runs locally on port `5173`.

## 2. Design System: Editorial Gradient
The app evolved from an early 3D/Isometric VR design into a clean, magazine-style **Editorial Gradient Design**:
- **Background**: Soft, warm radial gradient fading from pastel orange (`#FFF4E5`) to pure white.
- **Components**: Flat, clean cards with soft drop shadows (`rgba(0, 0, 0, 0.05)`) and rounded borders (`border-radius: 12px`).
- **Z-Index Layering**: The Hero section utilizes absolute positioning to weave massive background typography *behind* a foreground portrait image, anchoring heavy text blocks to the bottom corners.

## 3. Global Typography
Custom local fonts are stored in `src/assets/fonts/` and declared via `@font-face` in `index.css`.
- **English**: Uses `CrayonLibre` (Italic for the main Hero greeting), `Poppins` for body text, and `Oswald` for massive display text.
- **Japanese**: `JapaneseCrayon` (`crayon_1-1.ttf`).
- **Arabic**: `ArabicLemon` (`LemonBrushArabicPersonalUseOnly-Regular.otf`).

## 4. Multi-Language Engine & RTL Support
The application features a full-page, multi-lingual engine.
- **State Management**: The `lang` state (`'en'`, `'jp'`, `'ar'`) is managed at the top level in `App.jsx` and passed down as a prop to all child components.
- **Translations**: Every component (`Navbar.jsx`, `About.jsx`, `Experience.jsx`, `Projects.jsx`, `Skills.jsx`, `Contact.jsx`) contains an internal dictionary object `t` that conditionally renders the correct text based on the active language.
- **RTL Architecture**: When Arabic (`ar`) is active, `App.jsx` dynamically updates `document.body.dir = 'rtl'`. The Hero component also flips its absolute positioning (swapping `left` and `right` anchors) to perfectly mirror the UI layout.

## 5. Dynamic Features
The `Hero.jsx` component acts as the primary interactive hub:
- **Time-Aware Greetings**: Uses `new Date().getHours()` to dynamically output time-appropriate greetings in English (Good morning/afternoon/evening) and Japanese. Arabic defaults to "السلام عليكم".
- **Live Islamic Prayer API**: 
  - When Arabic mode is active, the app fires a REST API call to `https://api.aladhan.com/v1/timingsByCity?city=Dubai&country=United%20Arab%20Emirates&method=8`.
  - It fetches the day's real prayer schedule for Dubai, UAE.
  - A helper function calculates the time difference between the user's current local clock and the next upcoming prayer (Fajr, Dhuhr, Asr, Maghrib, Isha) and displays a live countdown tag (e.g., "Maghrib in 2h 30m").

## 6. Project Structure
```text
portfolio-app/
├── src/
│   ├── assets/
│   │   ├── fonts/ (CrayonLibre, LemonBrush, etc.)
│   │   └── new-profile.png (Masked portrait image)
│   ├── components/
│   │   ├── Navbar.jsx (Contains language toggle UI)
│   │   └── PerspectiveCard.jsx (Base container for sections)
│   ├── sections/
│   │   ├── Hero.jsx (Z-index layout, API calls, time logic)
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   └── Contact.jsx
│   ├── App.jsx (Global language & RTL state)
│   ├── index.css (Global design tokens & fonts)
│   └── main.jsx
├── index.html
└── PROJECT_CONTEXT.md
```
