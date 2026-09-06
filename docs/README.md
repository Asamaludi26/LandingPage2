# Nusa Atelier — Digital Flagship & Consultation Platform

> Solusi interior mewah: gorden eksklusif, blinds motorized, kain upholstery, wallpaper, custom furniture, dan flooring premium di Jakarta sejak 1992. Platform **static SPA** — lead diarahkan ke **WhatsApp Concierge** (tanpa backend/database).

---

## Indeks Dokumentasi

1. **[PRD.md](./PRD.md)** — **Product Requirements Document**
   - Visi, persona target, spesifikasi fungsional seluruh modul, kebutuhan non-fungsional, metrik keberhasilan.

2. **[TECH_STACK.md](./TECH_STACK.md)** — **Spesifikasi Stack Teknologi**
   - Versi pustaka aktual, sistem desain *quiet luxury*, preset animasi, npm scripts.

3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** — **Arsitektur File & Struktur Sistem**
   - Pohon direktori, routing, alur data, sistem modal, integrasi WhatsApp, aturan pengubahan kode.

4. **[FAKTA-PELANGGAN.md](./FAKTA-PELANGGAN.md)** — **Fakta Sheat untuk PM & Komunikasi ke Pelanggan**
   - Seluruh data riil brand, layanan, produk, showroom, proses, garansi, dan FAQ — untuk presentasi/penawaran ke pelanggan **tanpa salah sebut angka**.

5. **[PANDUAN-KONTEN.md](./PANDUAN-KONTEN.md)** — **Panduan Edit Konten (Tim Developer)**
   - Peta file konten per halaman + aturan edit agar tidak memecah build.

6. **[PANDUAN-DEVELOPMENT.md](./PANDUAN-DEVELOPMENT.md)** — **Handbook Pengembangan (Tim Developer)**
   - Alur kerja sehari-hari, cara menambah halaman/section/produk, konvensi kode, quality gate, deployment, dan troubleshooting umum.

---

## Dokumentasi yang Diperlukan untuk Pengembangan

Peta kelengkapan dokumentasi saat ini di folder `docs/`, dikelompokkan menurut audiens:

| Jenis | Dokumen | Audiens | Status |
| :--- | :--- | :--- | :--- |
| Kebutuhan produk | `PRD.md` | PM, Pengembang | ✅ Aktif |
| Spesifikasi teknis | `TECH_STACK.md` | Pengembang | ✅ Aktif |
| Arsitektur & struktur kode | `ARCHITECTURE.md` | Pengembang | ✅ Aktif |
| Panduan edit konten | `PANDUAN-KONTEN.md` | Pengembang konten | ✅ Aktif |
| Handbook pengembangan | `PANDUAN-DEVELOPMENT.md` | Pengembang (onboarding & daily) | ✅ Aktif |
| Fakta untuk komunikasi | `FAKTA-PELANGGAN.md` | PM / Komunikasi | ✅ Aktif |
| Indeks & quick start | `README.md` | Semua | ✅ Aktif |
| Catatan rilis (release/changelog) | *(belum ada)* | Pengembang, PM | 🔶 Disarankan |
| Panduan deployment / CI | *(bagian dari PANDUAN-DEVELOPMENT)* | DevOps/Pengembang | 🔶 Disarankan |

> Saran kelengkapan berikutnya (bukan bagian dari repo saat ini, disarankan dibuat sesuai kebutuhan tim):
> - **`CHANGELOG.md`** — catatan rilis/versi agar perubahan perilaku bisa ditelusuri antar-iterasi.
> - **Skrip/panduan CI/CD** — hosting SPA, *rewrite* ke `index.html` untuk `BrowserRouter` (agar rute dalam tidak 404), minify/assets, dan caching.
> - **Buku panduan pengujian (test plan)** — jika tim menambah suite test otomatis (saat ini belum ada; verifikasi manual via `npm run dev` + `npm run lint`).

---

## Arsitektur Konten (PENTING — kondisi terbaru)

**Semua teks konten website kini terpusat di folder `src/content/`** (menggantikan `src/data/siteData.ts` yang sudah dihapus). Strukturnya:

```
src/content/
├── index.ts          # Barrel — re-export semua konstanta (import dari sini)
├── layout.ts         # SITE_INFO, NAV_LINKS, LOGO, TOPBAR, HEADER_CTA, DRAWER, FOOTER
├── sections.ts       # HERO_SLIDES, ABOUT_SECTION, PRODUCT_CATEGORIES_SECTION,
│                     #   END_TO_END_SERVICE, TESTIMONIALS_SECTION, FAQ_SECTION,
│                     #   SHOWROOMS_SECTION, CTABAND, WHATSAPP_FLOAT, PAGE_HERO
├── products.ts       # PRODUCT_CATEGORIES, PRODUCTS_DATA (database produk)
├── showrooms.ts      # SHOWROOMS_DATA (2 galeri)
├── testimonials.ts   # TESTIMONIALS_DATA
├── faqs.ts           # FAQS_DATA
├── workflow.ts       # WORKFLOW_STEPS (4 tahap proses)
├── about.ts          # ABOUT_PAGE (/tentang-kami)
├── collections.ts    # PRODUCTS_PAGE (/koleksi-produk)
├── productDetail.ts  # PRODUCT_DETAIL_PAGE (/koleksi-produk/:id)
└── services.ts       # SERVICES_PAGE (/layanan)
```

> Panduan edit konten detail: **[PANDUAN-KONTEN.md](./PANDUAN-KONTEN.md)**.

**Aturan utama tim developer:**
- Konten = **data, bukan JSX**. Ikon disimpan sebagai nama komponen (`icon: Layers`), bukan `<Layers …/>`.
- Saat mengubah konten, edit **nilai** di `src/content/*.ts` — jangan ubah nama/struktur field tanpa menyesuaikan komponen pemakai.
- Semua import dilakukan dari barrel `'../content'` / `'../../content'`, bukan dari file per-topik maupun folder `data/`.
- Setelah mengubah konten: jalankan `npm run lint` lalu `npm run build`.

> Untuk data angka riil (nomor telp, alamat, jumlah kain, dll.) yang dipakai presentasi, lihat **[FAKTA-PELANGGAN.md](./FAKTA-PELANGGAN.md)** — jangan menyebut angka dari ingatan jika belum dicek.

---

## Memulai Pengembangan (Quick Start)

### Prasyarat
- **Node.js**: versi 18 ke atas
- **Package Manager**: `npm` atau `bun`

### Instalasi Dependensi
```bash
npm install
```

### Menjalankan Server Pengembangan Lokal
```bash
npm run dev
```
Aplikasi aktif di `http://localhost:3000` (host `0.0.0.0`).

### Validasi Linting & Type Checking
```bash
npm run lint
```
Quality gate utama: `tsc --noEmit` — harus **zero error**.

### Membangun Versi Produksi
```bash
npm run build
```
Output statis di `/dist` (lazy chunks per halaman).

---

## Struktur Folder

```
src/
├── App.tsx                     # Routing: /, /tentang-kami, /koleksi-produk, /koleksi-produk/:productId, /layanan, *→/
│                               #   HomePage eager; halaman lain React.lazy + Suspense fallback
├── main.tsx                    # Entry: createRoot + StrictMode + BrowserRouter
├── index.css                   # Tailwind v4, @utility no-scrollbar, CSS Lenis, font, scrollbar
├── content/                    # ★ SSOT seluruh konten (lihat "Arsitektur Konten" di atas)
├── components/
│   ├── layout/                 # Header, Footer, FloatingWhatsApp, PageHero, PageLayout, PageStaticSections
│   ├── sections/               # Hero, AboutSection, ProductCategories, EndToEndService, ShowroomsSection, Testimonials, FaqSection
│   ├── modals/                 # ShowroomReservationModal
│   └── ui/                     # Reveal, Editorial, CTABand, CtaButton, WhatsAppIcon, WaLimitToast
├── lib/                        # animations.ts, wa.ts, scroll.ts, useLenis.ts, useModalBehaviour.ts, useScrollLock.ts
└── pages/                      # HomePage, AboutPage, ProductsPage, ProductDetailPage, ServicesPage
```

> Penyesuaian konten (produk, showroom, testimoni, FAQ, kontak) dilakukan di `src/content/*.ts` — **bukan** di komponen render. Referensi lama ke `src/data/siteData.ts` sudah tidak berlaku.

---

## Kontak & Jam Operasional

- **WhatsApp**: tersedia via Floating Button (kanan-bawah) atau tautan di header/footer.
- **Telepon**: `+62 21 750 4911` (hotline utama).
- **Email**: `info@nusaatelier.com` | **Instagram**: `@nusaatelier.id`
- **Jam operasional**: Senin – Sabtu, 09.00 – 18.00 WIB.
- **Showroom**: Fatmawati (Jakarta Selatan) & Heritage Studio Pintu Air (Jakarta Pusat) — reservasi kunjungan melalui modal *Reservasi Showroom*.

---

## Untuk Project Manager

Sampaikan ke pelanggan berdasarkan **[FAKTA-PELANGGAN.md](./FAKTA-PELANGGAN.md)** — berisi data lengkap & terverifikasi (identitas, showroom, produk, layanan, proses, garansi, sejarah, FAQ) agar penyampaian konsisten dan tidak salah sebut.