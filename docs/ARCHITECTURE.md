# Arsitektur File & Sistem (Architecture)

## Nusa Atelier — Struktur Kode & Alur Komponen

Dokumen ini adalah referensi teknis arsitektur source code aktual. **Apabila isi dokumen ini berbeda dari isi file `.ts/.tsx`, yang benar adalah isi file source.** Seluruh data konten terpusat di `src/content/*.ts` (lihat `docs/PANDUAN-KONTEN.md`).

---

### 1. Struktur Pohon Direktori (Directory Tree)

```
.
├── .gitignore                  # Daftar file/folder yang diabaikan Git
├── index.html                  # Entry point HTML (font, meta SEO, #root)
├── package.json                # Dependensi & scripts (dev/build/lint/preview/clean)
├── README.md                   # Landing ringkas → menunjuk seluruh dokumen ke docs/
├── tsconfig.json               # Konfigurasi TypeScript (strict)
├── vite.config.ts              # Konfigurasi Vite + plugin Tailwind v4 (alias "@")
│
├── public/                     # Aset statis (di-salin apa adanya oleh Vite)
│   ├── favicon.svg             # Ikon situs (monogram NA)
│   └── assets/                 # Seluruh gambar lokal: unsplash-*.jpg, og-cover.jpg
│
├── docs/                       # ★ Seluruh dokumentasi proyek (.md)
│   ├── README.md               # Indeks dokumentasi + arsitektur konten + quick start
│   ├── PRD.md                  # Product Requirements Document
│   ├── TECH_STACK.md           # Spesifikasi stack teknologi
│   ├── ARCHITECTURE.md         # File ini — arsitektur aplikasi
│   ├── FAKTA-PELANGGAN.md      # Fakta riil untuk komunikasi/Presentasi ke pelanggan (PM)
│   ├── PANDUAN-KONTEN.md       # Panduan edit konten src/content/ (per halaman)
│   └── PANDUAN-DEVELOPMENT.md  # Handbook pengembangan (alur kerja, konvensi, deploy, troubleshooting)
│
├── dist/                       # Hasil build (vite build) — jangan di-edit manual
│
└── src/                        # Seluruh kode sumber aplikasi
    ├── App.tsx                 # Routing utama (6 route, lazy loading, Suspense)
    ├── index.css               # Entry CSS: Tailwind v4, @utility no-scrollbar, CSS Lenis
    ├── main.tsx                # Entry React: createRoot + StrictMode + BrowserRouter
    │
    ├── components/
    │   ├── layout/             # Komponen kerangka halaman
    │   │   ├── Header.tsx               # Sticky nav, mega menu dropdown, mobile drawer, focus trap
    │   │   ├── Footer.tsx               # Footer gelap, tautan, kontak showroom, tombol modal
    │   │   ├── FloatingWhatsApp.tsx     # FAB + quick-chat box WhatsApp Concierge
    │   │   ├── PageHero.tsx             # Hero reusable untuk halaman dalam (kicker/CTA)
    │   │   ├── PageLayout.tsx           # Layout induk + PageActionsContext + modal global
    │   │   └── PageStaticSections.tsx   # Penutup statis reusable: CTABand? → Showrooms → Testimonials → FAQ
    │   │
    │   ├── modals/             # Komponen dialog modal
    │   │   └── ShowroomReservationModal.tsx   # Form reservasi showroom → preview WA → kirim
    │   │
    │   ├── sections/           # Section konten (dipakai lintas halaman)
    │   │   ├── Hero.tsx                # Slideshow 3-slide autoplay + swipe (ID #beranda)
    │   │   ├── AboutSection.tsx        # Tab Kisah/Workshop/Wholesale (ID #tentang-kami)
    │   │   ├── ProductCategories.tsx   # Katalog terfilter (ID #koleksi-produk)
    │   │   ├── EndToEndService.tsx     # 4 tahap layanan (ID #layanan)
    │   │   ├── ShowroomsSection.tsx    # Pilih showroom + tab + modal reservasi (ID #showroom)
    │   │   ├── Testimonials.tsx        # 3 testimoni + banner arsitek
    │   │   └── FaqSection.tsx          # Accordion FAQ (ID #faq)
    │   │
    │   └── ui/                 # Komponen reusable kecil
    │       ├── CTABand.tsx             # Band CTA gelap reusable (Reservasi + WA)
    │       ├── CtaButton.tsx           # Tombol CTA multi-varian (4 varian)
    │       ├── Editorial.tsx           # MaskReveal & CinematicImg (gaya editorial)
    │       ├── Reveal.tsx              # Scroll-reveal utama (Reveal/RevealGroup/RevealItem/RevealImg)
    │       └── WhatsAppIcon.tsx        # Icon WhatsApp resmi (SVG trade dress)
    │
    ├── content/               # ★ SSOT seluruh konten statis (produk, showroom, testimoni, FAQ, teks halaman)
    │   │                       #   (panduan edit: docs/PANDUAN-KONTEN.md)
    │   ├── index.ts           # Barrel — re-export semua konstanta
    │   ├── layout.ts          # SITE_INFO, NAV_LINKS, LOGO, TOPBAR, HEADER_CTA, DRAWER, FOOTER
    │   ├── sections.ts        # HERO_SLIDES, ABOUT_SECTION, PRODUCT_CATEGORIES_SECTION, END_TO_END_SERVICE,
    │   │                      #   TESTIMONIALS_SECTION, FAQ_SECTION, SHOWROOMS_SECTION, CTABAND, WHATSAPP_FLOAT, PAGE_HERO
    │   ├── products.ts        # PRODUCT_CATEGORIES, PRODUCTS_DATA
    │   ├── showrooms.ts       # SHOWROOMS_DATA
    │   ├── testimonials.ts    # TESTIMONIALS_DATA
    │   ├── faqs.ts            # FAQS_DATA
    │   ├── workflow.ts        # WORKFLOW_STEPS
    │   ├── about.ts           # ABOUT_PAGE
    │   ├── collections.ts     # PRODUCTS_PAGE
    │   ├── productDetail.ts   # PRODUCT_DETAIL_PAGE
    │   └── services.ts        # SERVICES_PAGE
    │
    ├── lib/                    # Pustaka utilitas & hooks
    │   ├── animations.ts       # Preset Motion: ease, viewportConfig, microButton, navDrawer*, reveal*
    │   ├── scroll.ts           # smoothScrollTo(target, duration) & scrollToTop(immediate) — Lenis-aware
    │   ├── useLenis.ts         # useSmoothScroll() — inisialisasi Lenis + expose window.__lenis
    │   ├── useModalBehaviour.ts# Perilaku modal: Escape, focus trap, restore focus
    │   ├── useScrollLock.ts    # Kunci scroll latar saat modal/drawer terbuka
    │   └── wa.ts               # buildWaLink() & allowWaOpen() — nomor WA obfuscated + guard anti-spam
    │
    └── pages/                  # Halaman per route
        ├── HomePage.tsx             # Route "/" (diekspor eager — tanpa lazy)
        ├── AboutPage.tsx            # Route "/tentang-kami" (lazy)
        ├── ProductsPage.tsx         # Route "/koleksi-produk" (lazy)
        ├── ProductDetailPage.tsx    # Route "/koleksi-produk/:productId" (lazy)
        └── ServicesPage.tsx         # Route "/layanan" (lazy)
```

---

### 2. Routing & Entry Points

#### `src/main.tsx`
- `createRoot` → `<App/>` di dalam `<React.StrictMode>` dan `<BrowserRouter>`.

#### `src/App.tsx` — Tabel Route

| Path | Komponen | Loading |
| :--- | :--- | :--- |
| `/` | `HomePage` | Eager (di-import langsung) |
| `/tentang-kami` | `AboutPage` | `React.lazy` |
| `/koleksi-produk` | `ProductsPage` | `React.lazy` |
| `/koleksi-produk/:productId` | `ProductDetailPage` | `React.lazy` |
| `/layanan` | `ServicesPage` | `React.lazy` |
| `*` (fallback) | `<Navigate to="/" replace>` | — |

- Semua halaman lazy dibungkus `<Suspense fallback={<PageFallback/>}>` — spinner loading besar minimalis.
- Seluruh `Routes` berada di dalam `<PageLayout>` sehingga Header/Footer/modal muncul di semua halaman.
- **Transisi halaman**: `<AnimatedRoutes>` membungkus `Routes` dengan `<AnimatePresence mode="wait">` + `motion.div key={location.pathname}` memakai preset `pageTransition` (`animations.ts`) — halaman lama naik-keluar 0.22s, halaman baru fade+rise 0.55s (`LUXURY_EASE`); header/footer tetap statis. Key = `pathname` sehingga navigasi hash/query di halaman yang sama (mis. `/layanan#…`, `?kategori=…`) tidak men-trigger transisi ulang. Chunk route di-prefetch ~300ms setelah mount agar transisi tak menampilkan spinner.

#### Susunan Halaman (urutan section)

| Halaman | Urutan Section |
| :--- | :--- |
| `HomePage` | `Hero` → `AboutSection` → `ProductCategories` → `EndToEndService` → `PageStaticSections` (tanpa CTABand) |
| `AboutPage` | `PageHero` → Metrics → Heritage & Story → **Journey Timeline** (band gelap) → Workshop & Atelier (4 kartu fitur) → **Craft Process** (4 kartu tahap) → **Quality & Warranty** (checklist + 4 stat garansi) → Wholesale (+ badge wilayah) → Pillars → `PageStaticSections` (dengan CTABand) |
| `ProductsPage` | `PageHero` → Advantage strip → Category Spotlights → Katalog Lengkap (`#katalog-lengkap`) → `PageStaticSections` (dengan CTABand) |
| `ProductDetailPage` | Breadcrumb → Hero produk → Galeri (CinematicImg + thumbs) → Spesifikasi + QUICK_FACTS → Komposisi Material → Fitur + Callouts → Slider "Semua Produk" → Cara Memesan → `PageStaticSections` (dengan CTABand) |
| `ServicesPage` | `PageHero` → Ikhtisar + stat → 4 Lini Layanan → 4 Tahap Proses (deep dive) → Layanan Khusus → Garansi & Purnajual → Galeri Realisasi (slider 6 foto via `ProjectGallery`) → `PageStaticSections` (dengan CTABand) |

> **Pola penutup halaman**: Empat halaman dalam memakai komponen bersama `PageStaticSections` (`components/layout/PageStaticSections.tsx`) yang me-render `CTABand` (konten via prop `ctaBand`) → `ShowroomsSection` → `Testimonials` → `FaqSection`. Beranda memanggil komponen yang sama dengan `ctaBand={null}` (tanpa band CTA). Menambah/mengurangi/mengganti urutan section statis cukup di satu komponen ini.

---

### 3. Aliran Data & State Management

Aplikasi tanpa backend: **semua konten statis** dari `src/content/*.ts`; seluruh konversi lead dilakukan via **WhatsApp link** yang dibangun `src/lib/wa.ts`.

#### A. PageActionsContext (modal global) — pola utama

`src/components/layout/PageLayout.tsx` adalah pemilik seluruh modal global:

```
PageLayout (root layout)
├─ useSmoothScroll()                 → inisialisasi Lenis, expose window.__lenis
├─ location.state.scrollTo handling  → scroll lintas halaman
├─ state isReservationOpen           → ShowroomReservationModal (showroom = SHOWROOMS_DATA[0])
├─ useScrollLock(...)                → kunci scroll saat reservasi terbuka
└─ PageActionsContext.Provider
    ├─ Header        onOpenReservation
    ├─ main          {children} (halaman aktif)
    ├─ Footer        onOpenReservation
    ├─ 1 modal global + FloatingWhatsApp
```

Hook publik:

```typescript
const { openReservation } = usePageActions(); // dari './PageLayout'
```

- Dipakai oleh: `PageHero`, `HomePage`, `AboutPage`, `ProductsPage`, `ProductDetailPage`, `CTABand` (internal), `ProductCategories`, `EndToEndService`, `Header`, `Footer`.
- **Pengecualian lokal**: `ShowroomsSection` memiliki *modal reservasi sendiri* dengan state lokal `isReservationOpen` + `selectedShowroom`, sehingga modal mengikuti showroom yang sedang dipilih. Modal ini **bukan** bagian dari `PageActionsContext`.

#### B. Navigasi Anchor Antar-Halaman (smooth scroll)

Header (`handleNavClick`) & Footer (`handleAnchor`) memakai pola yang sama:

```typescript
if (location.pathname === '/') {
  smoothScrollTo(href, 1.15);            // sudah di home → scroll langsung
  setSectionHash(href);                  // hash #section ke address bar (replaceState)
} else {
  navigate('/', { state: { scrollTo: href } });  // kirim target via router state
}
```

`PageLayout` membaca `location.state.scrollTo`:

```typescript
if (pendingScroll) {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    smoothScrollTo(pendingScroll);
    setSectionHash(pendingScroll);       // hash tampil di "lokasi tab"
  }));
  navigate(location.pathname, { replace: true, state: null }); // bersihkan state
} else {
  scrollToTop(true);   // ganti halaman tanpa target → kembali ke atas
}
```

- Efek berjalan pada `[location.pathname]`, menjadikan **navigation ke halaman lain** sekaligus scrolling ke anchor section.
- Semua fungsi scroll Lenis-aware (`src/lib/scroll.ts`): `smoothScrollTo` menghitung `pixel = rect.top + pageYOffset − HEADER_OFFSET (108px)` lalu memakai `window.__lenis.scrollTo(pixel, { duration })` (fallback `window.scrollTo`) — section mendarat tepat di bawah sticky header; `setSectionHash` menyinkronkan hash tanpa menambah riwayat.

#### C. Tombol Anchor langsung di homepage (tanpa route)

- `HomePage.handleExploreProducts()` → `smoothScrollTo('#koleksi-produk', 1.2)`.
- Diteruskan ke `Hero` sebagai prop `onExploreProducts`.

---

### 4. Integrasi WhatsApp (`src/lib/wa.ts`)

Semua link WhatsApp dibuat dari satu sumber:

| Sumber | Nilai (real) |
| :--- | :--- |
| `WA_DIRECT` | Nomor tanpa `+` (digunakan untuk `wa.me/<nomor>`) |
| `WA_DISPLAY` | Format human-readable untuk label UI |
| `buildWaLink(message)` | `https://wa.me/${WA_DIRECT}?text=${encodeURIComponent(message)}` |
| `allowWaOpen()` | Guard anti-spam: minimal jeda 3 detik antar buka + maks 5×/sesi (`sessionStorage` key `hd_wa_open`). Saat klik ditahan (return `false`), memancarkan `CustomEvent` `hd:wa-limit` agar UI menampilkan feedback — bukan "bisu" |
| `watchWaLimit(handler)` | Subscribe event `hd:wa-limit` (detail `{ reason: 'cooldown'|'exhausted', maxOpens }`); mengembalikan fungsi unsubscribe. Dipakai `WaLimitToast` |

- Nomor disimpan **obfuscated** (tiap digit di-shift +3) pada konstanta `ENC_DIRECT`/`ENC_DISPLAY`, lalu di-decode saat runtime. Jangan direfaktor menjadi plaintext di source.
- Setiap elemen `<a href={buildWaLink(...)}>` WAJIB dipasangi:
  ```tsx
  onClick={(e) => { if (!allowWaOpen()) e.preventDefault(); }}
  ```
  Kecuali pada `FloatingWhatsApp.handleSendQuickMessage` yang langsung `allowWaOpen()` sebelum `window.open`.

- **Umpan balik anti-spam**: `WaLimitToast` (di-mount di `PageLayout`) mendengarkan `watchWaLimit` dan menampilkan notifikasi elegan saat klik ditahan (cooldown / kuota sesi habis) — sehingga pemblokiran tidak terkesan "rusak/bisu".

---

### 5. Lapisan Scaffold UI

#### `src/components/layout/Header.tsx`
- **Top bar** (desktop): alamat showroom, jam operasional, badge "Survei Bebas Biaya", `tel:` phoneGeneral, link WA.
- **Nav bar sticky**: `isScrolled` (window.scrollY > 30) mengubah latar/tinggi/blur; logo "NA" + Nusa Atelier; 6 nav links. Item ber-menu (`menu: 'links'`, satu-satunya `NavMenuKind`) membuka **mega menu** — buka via hover **dan** klik (toggle, `handleDesktopLinkClick`); panel absolute `top-full` lebar penuh (animasi `navMenuPanel`/`navMenuChild` + aksen `scaleX`, garis `#26496C`), underline indikator `layoutId="desktopNavUnderline"`. Koleksi & Layanan → grid `NavChild[]` = **indeks section halaman tujuan** (list bersih: label + deskripsi + panah `ArrowUpRight` untuk route / `ArrowRight` untuk anchor; hover bg tipis). Koleksi: `/koleksi-produk`, `#koleksi-spesialisasi`, `#katalog-lengkap`. Layanan: `/layanan` + `#layanan-{ikhtisar|ruang-lingkup|proses|khusus|garansi|galeri}` (id section di `ServicesPage`/`ProjectGallery`); ProductsPage membaca `search+hash` dan auto-scroll, ServicesPage scroll ke hash via `smoothScrollTo`. + tautan header "Lihat Semua". Showroom & FAQ → tautan anchor polos tanpa menu (scroll ke `#showroom`/`#faq`). Tutup via mouse-leave (delay 160ms), scroll, Escape, klik di luar bar (`headerBarRef`).
- **CTA**: tombol "Reservasi Showroom" (buka reservation modal).
- **Mobile drawer**: slide-in dari kanan (`navDrawerVariants`), backdrop (`navBackdropVariants`), item stagger (`navItemStagger`), item ber-menu jadi **accordion** (`expandedItem`, `AnimatePresence` height), focus trap manual, Escape close, `useScrollLock`, restore focus.

#### `src/components/layout/Footer.tsx`
- 4 kolom: brand (logo + deskripsi + badge garansi), Navigasi Cepat, Koleksi & Spesialisasi, Galeri Showroom (2 lokasi + tombol Reservasi).
- Bottom bar: copyright + tautan legal (statis).
- `fadeInUp` (viewportConfig) untuk animasi grid atas.

#### `src/components/layout/FloatingWhatsApp.tsx`
- FAB melingkar hijau `#25D366` di kanan-bawah; membuka quick-chat box (AnimatePresence): header "Konsultan Siap Membantu", 4 quick messages (pre-filled message), dan tombol "Buka Percakapan WhatsApp".
- Escape menutup box; `data-lenis-prevent` pada box.

#### `src/components/layout/PageHero.tsx` — Props
```typescript
interface PageHeroProps {
  breadcrumbLabel: string;
  kicker: string;
  title: string;        // baris pertama, class biasa
  accent: string;       // baris kedua, italic accent
  description: string;
  image: string;
  alt: string;
}
```
- Kiri: breadcrumb (Beranda → label), kicker MaskReveal, judul MaskReveal 2 baris, garis aksen `#26496C`, deskripsi, lalu `CtaButton` Reservasi (primary) yang memanggil `usePageActions`.
- Kanan: gambar `CinematicImg pan="up" once={false}` dalam frame 4/5.

---

### 6. Sistem Animasi (`src/lib/animations.ts`)

| Preset | Nilai / Peran |
| :--- | :--- |
| `LUXURY_EASE` | `[0.16, 1, 0.3, 1]` — easing utama seluruh UI |
| `EASE_EDITORIAL` | `[0.77, 0, 0.175, 1]` — line-reveal MaskReveal |
| `EASE_CINEMATIC` | `[0.65, 0, 0.35, 1]` — reveal gambar CinematicImg |
| `viewportConfig` | `{ once: true, margin: '0px 0px 80px 0px', amount: 0.05 }` — dipakai `fadeInUp` di Footer |
| `fadeInUp` | Prop spread untuk animasi fade+rise sekali jalan |
| `microButton` | `whileHover / whileTap` untuk tombol |
| `navDrawerVariants` | Slide-in drawer kanan (kecepatan beda saat open vs close) |
| `navBackdropVariants` | Opacity backdrop drawer |
| `navItemStagger` | Item drawer masuk berjenjang (custom index) |
| `revealVariants` | Tabel per arah: `up`, `down`, `left`, `right`, `fade`, `zoom`, `blur` |
| `staggerContainer(stagger, delayChildren)` | Variant induk untuk stagger anak |
| `revealTransition(duration)` | Transition standar reveal (LUXURY_EASE) |

Catatan: preset `LUXURY_SPRING`, `fadeIn`, `fadeInLeft`, `fadeInRight`, `cardStagger`, `microCard`, `microBadge` **tidak lagi ada di file aktual** — jangan dirujuk dalam kode baru.

---

### 7. Scroll Reveal & Editorial (`ui/Reveal.tsx`, `ui/Editorial.tsx`)

**`Reveal.tsx`** (satu-satunya wrapper scroll-reveal — pengganti `AnimatedSection`/`AnimateIn` yang sudah dihapus):

| Komponen | Fungsi |
| :--- | :--- |
| `Reveal` | Reveal dua arah (`once` default **false**), `direction` dari `RevealDir`, support `as` (div/span/li/section), `delay`, `duration`, `className` |
| `RevealGroup` | Variant induk `staggerContainer` untuk meng-stagger `RevealItem` anak |
| `RevealItem` | Item anak di dalam `RevealGroup` |
| `RevealImg` | Gambar dengan zoom-in reveal (`scale 1.15 → 1`) + fade, dua arah |

Intern sequencing: `useInView` dengan `margin: '0px 0px -40px 0px'`, `amount: 0.01` (Reveal) — **jangan diubah** kecuali sengaja, karena berpasangan dengan `viewportConfig` Footer (margin +80px).

**`Editorial.tsx`**:
- `MaskReveal` — garis teks tersembunyi (overflow-hidden) naik `y: '112%' → 0`; `EASE_EDITORIAL`; `margin: -30px`, `amount: 0.1`. Dipakai untuk kicker/kicker baris, judul utama, dan heading section.
- `CinematicImg` — gambar dengan `scale 1.22 → 1` + pan opsional (`pan: 'none' | 'left' | 'right' | 'up'`); `EASE_CINEMATIC`; `margin: -40px`, `amount: 0.2`, `once` default **true**.

---

### 8. CTA & Styling

**`CtaButton.tsx`** — render `motion.a` bila `href` disediakan, selain itu `motion.button`. Varian:

| Varian | Gaya |
| :--- | :--- |
| `primary` | BG `#26496C`, hover `#1D3A58`, teks putih (CTA utama) |
| `secondary` | Putih, border `#E5E3DF`, teks `#1A1A1A` |
| `onDark` | BG putih, teks `#151515` (di atas hero gelap / band gelap) |
| `onDarkOutline` | Border `white/20`, teks putih (di atas gelap) |

**`CTABand.tsx`** — band gelap `#151515`; props `title`, `accent?`, `description?`. Memakai `usePageActions().openReservation` untuk "Reservasi Kunjungan" + CTA sekunder ke WhatsApp. Digunakan pada `AboutPage`, `ProductsPage`, `ProductDetailPage`.

**Palet warna utama** (Tailwind arbitrary values): Canvas `#F9F8F6`, Teks `#1A1A1A`/`#4A4A3A`/`#6B6B5F`, Aksen `#5A5A40`, Border `#E5E3DF`, Biru CTA `#26496C`, Emas `#E5C38E`, Hijau WA `#25D366`.

**Font**: serif `Cormorant Garamond` (`.font-serif`, di-declare di `index.css`), sans `Plus Jakarta Sans` (body di `index.html` + `index.css`).

**`index.css`** — memuat Tailwind v4 `@import "tailwindcss"`, `@utility no-scrollbar` (utilitas custom, dipakai tab horizontal & galeri), layer base (font body, warna, `overflow-x:hidden`), helper Lenis (`data-lenis-prevent`, `.lenis-stopped`), dan custom scrollbar WebKit.

---

### 9. Pola yang Harus Dipatuhi Saat Mengubah Kode

1. **SSOT konten**: Ubah teks/produk/showroom/FAQ hanya di `src/content/*.ts` (lalu ikuti `docs/PANDUAN-KONTEN.md`). Folder lama `src/data/` sudah dihapus.
2. **SSOT animasi**: Jangan menempel easing/margin viewport acak; pakai preset `animations.ts` dan komponen `Reveal`/`MaskReveal`/`CinematicImg`.
3. **Semua WA link** via `buildWaLink()` + guard `allowWaOpen()`.
4. **Modal global** via `usePageActions()`; modal spesifik-konteks (reservasi per showroom) boleh lokal di section.
5. **`npm run lint`** (`tsc --noEmit`) wajib bersih sebelum finish.