# Technical Stack Documentation (Tech Stack)
## Nusa Atelier — Architecture & Dependencies Specification

---

### 1. Ikhtisar Stack Teknologi (Technology Overview)

Aplikasi **Nusa Atelier** dibangun dengan arsitektur **Single Page Application (SPA)** berbasis modern web stack dengan fokus pada performa tinggi, animasi *luxury tier*, *strict type safety*, dan kemudahan pemeliharaan.

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Layer                          │
│  React 19 (TypeScript 5.8 strict) + Tailwind CSS v4 +       │
│  Motion for React + react-router-dom 7 + lucide-react       │
├─────────────────────────────────────────────────────────────┤
│                    Animation & Smooth Engine                │
│  Lenis Smooth Scroll + Motion (Cubic-Bezier Easing)         │
├─────────────────────────────────────────────────────────────┤
│                       Build & Runtime                       │
│  Vite 6.2 + @vitejs/plugin-react + @tailwindcss/vite        │
└─────────────────────────────────────────────────────────────┘
```

---

### 2. Spesifikasi Bahasa & Pustaka Utama (Core Technologies)

| Kategori | Teknologi | Versi (package.json) | Peran |
| :--- | :--- | :--- | :--- |
| **Framework UI** | `react` | `^19.0.1` | Pustaka antarmuka deklaratif dengan React Compiler ready & reconciliation tercepat. |
| **DOM Renderer** | `react-dom` | `^19.0.1` | Rendering komponen ke DOM. |
| **Bahasa** | `typescript` | `~5.8.2` | Strict typing; `tsc --noEmit` sebagai quality gate. |
| **Build & Dev Server** | `vite` | `^6.2.3` | Bundler esbuild/Rollup, cold start sub-detik, alias `@` → root. |
| **Plugin React** | `@vitejs/plugin-react` | `^5.0.4` | Fast Refresh & JSX transform. |
| **CSS Framework** | `tailwindcss` | `^4.1.14` | Utility-first CSS v4 via `@tailwindcss/vite` (tanpa tailwind.config). |
| **Tailwind Vite** | `@tailwindcss/vite` | `^4.1.14` | Plugin resmi Tailwind v4 untuk Vite. |
| **Mesin Animasi** | `motion` | `^12.23.24` | Solusi deklaratif (Framer Motion successor): `layoutId`, `AnimatePresence`, spring physics, `useInView`. |
| **Inertial Scrolling** | `lenis` | `^1.3.26` | Smooth momentum scrolling; instance di `window.__lenis`. |
| **Router** | `react-router-dom` | `^7.18.3` | BrowserRouter, nested routes, `React.lazy` + `Suspense`. |
| **Ikonografi** | `lucide-react` | `^0.546.0` | Ikon vektor ringan & tree-shakeable. |

---

### 3. Sistem Desain & Konfigurasi Styling (Design System)

Estetika **Quiet Luxury & Warm Minimalism**:

* **Palet Warna**:
  - `Canvas`: `#F9F8F6` (warm stone) — background utama
  - `Text`: `#1A1A1A` (charcoal)
  - `Dark Container`: `#151515` (CTABand, Footer) & `#141414`
  - `Accent Olive`: `#5A5A40` (border accent layanan/produk)
  - `CTA Blue Navy`: `#26496C` (tombol utama) → hover `#1D3A58`
  - `Gold Accent`: `#E5C38E` (statistik/italic serif)
  - `Border`: `#E5E3DF`
  - `Muted`: `#6B6B5F` & `#8C8276`
  - `WhatsApp Green`: `#25D366`

* **Tipografi**:
  - **Display/Heading**: Cormorant Garamond (serif editorial, italic accent)
  - **Body/Interface**: Plus Jakarta Sans (sans modern, baseline 16px, line-height 1.6)
  - `index.html` memuat kedua font via Google Fonts (preconnect).

---

### 4. Arsitektur Animasi (Animation Engine)

Semua preset di `src/lib/animations.ts` (aktual — mohon jangan mereferensikan preset lama):

* **Easing Curves**:
  ```typescript
  export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;      // easing utama (reveal/UI)
  export const EASE_EDITORIAL = [0.77, 0, 0.175, 1] as const;  // mask reveal (editorial)
  export const EASE_CINEMATIC = [0.65, 0, 0.35, 1] as const;   // gambar cinematic (crossfade/zoom)
  ```
* **Pre-trigger Viewport** (margin berbeda — jangan disamaratakan):
  ```typescript
  export const viewportConfig = { once: true, margin: '0px 0px 80px 0px', amount: 0.05 }; // Footer fadeInUp
  ```
  `Reveal` `-40px` • `MaskReveal` `-30px` • `CinematicImg` `-40px`.

* **Preset Lengkap (aktual)**:

  | Preset | Fungsi |
  | :--- | :--- |
  | `fadeInUp` | Opacity 0→1 + y 16→0 (dipakai Footer). |
  | `microButton` | Hover: scale 1.025 + lift -1.5px. Tap: scale 0.97. |
  | `navDrawerVariants` | Drawer mobile slide dari kanan (closed x:100%, open x:0). |
  | `navBackdropVariants` | Opacity backdrop drawer 0→1. |
  | `navItemStagger` | Stagger item menu: `0.1 + custom * 0.04`. |
  | `navMenuPanel` | Panel mega-menu navbar: fade + rise 12px (0.55s, `LUXURY_EASE`), `staggerChildren 0.06`, `delayChildren 0.1`; exit cepat 0.2s. |
  | `navMenuChild` | Anak panel masuk berjenjang (opacity + y12→0, 0.5s). |
  | `pageTransition` | Transisi antar-route (`AnimatePresence mode="wait"`): exit naik 0.22s, enter fade+rise 22px 0.55s (`LUXURY_EASE`). |
  | `RevealDir`/`revealVariants` | `up`, `down`, `left`, `right`, `fade`, `zoom`, `blur`. |
  | `staggerContainer(stagger, delayChildren)` | Container stagger untuk `RevealGroup`. |
  | `revealTransition(duration)` | Transition anak reveal. |

* **Catatan migrasi**: `LUXURY_SPRING`, `fadeIn`, `fadeInLeft`, `fadeInRight`, `cardStagger`, `microCard`, `microBadge` **tidak ada** di codebase. Jangan dipakai.

* **Reveal system** wrapper (`ui/Reveal.tsx`): `Reveal`/`RevealGroup`/`RevealItem`/`RevealImg` — satu-satunya wrapper scroll-reveal.
* **Mode Transisi Aman**: `AnimatePresence mode="wait"` untuk pergantian tab & fase form; FAQ pakai animasi height tanpa `mode`.

---

### 5. Perintah Skrip & Siklus Pengembangan (NPM Scripts)

```json
{
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist",
    "lint": "tsc --noEmit"
  }
}
```

* **`npm run dev`**: dev server port `3000`, binding `0.0.0.0`.
* **`npm run build`**: kompilasi produksi ke `/dist`.
* **`npm run lint`**: type check statis (`tsc --noEmit`) — **zero error wajib**.
* **`npm run preview`**: pratinjau build lokal.
* **`npm run clean`**: hapus direktori `dist` (skrip praktik lintas-shell).