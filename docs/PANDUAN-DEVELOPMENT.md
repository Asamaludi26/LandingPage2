# Handbook Pengembangan — Nusa Atelier

> Panduan praktis untuk pengembang yang bekerja pada platform ini. Dokumen ini berisi **alur kerja sehari-hari, cara menambah kode baru, konvensi, quality gate, deployment, dan troubleshooting**.
> Untuk struktur file & alur komponen yang lebih dalam, lihat **[ARCHITECTURE.md](./ARCHITECTURE.md)**. Untuk cara mengubah isi teks/data, lihat **[PANDUAN-KONTEN.md](./PANDUAN-KONTEN.md)**.

---

## 1. Alur Kerja Sehari-hari (Daily Workflow)

```
1. SCAN   — baca source aktual sebelum menulis kode (Glob → Grep → Read). JANGAN menebak struktur.
2. PLAN   — tentukan file yang akan disentuh & efek sampingnya.
3. IMPLEMENT — tulis/mengubah kode mengikuti konvensi proyek (lihat bagian 5).
4. VERIFY — jalankan npm run lint (wajib zero error) dan bila menyentuh tata letak/struktur, npm run build.
5. DOCUMENT — perbarui docs/ (ARCHITECTURE, PANDUAN-KONTEN, PANDUAN-DEVELOPMENT) bila perilaku berubah.
```

### Prasyarat & Perintah

| Perintah | Fungsi |
| :--- | :--- |
| `npm install` | Pasang dependensi. |
| `npm run dev` | Dev server di `http://localhost:3000` (host `0.0.0.0`). |
| `npm run lint` | Type-check statis `tsc --noEmit` — **quality gate utama, zero error wajib**. |
| `npm run build` | Build produksi ke `/dist` (lazy chunks per halaman). |
| `npm run preview` | Pratinjau hasil build lokal. |
| `npm run clean` | Hapus folder `dist`. |

---

## 2. Cara Menambah Halaman Baru (Route)

1. Buat komponen halaman di `src/pages/` (mis. `ContactPage.tsx`) dengan **named export** `export const ContactPage`.
2. Daftarkan sebagai **lazy route** di `src/App.tsx`:
   ```tsx
   const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
   // lalu di dalam <Routes>:
   <Route path="/kontak" element={<ContactPage />} />
   ```
   - Home `"/"` di-import **eager** (tanpa lazy); halaman lain lazy.
   - Tambahkan rute ke prefetch (blok `void import('./pages/...')` di `App.tsx`) agar transisi tidak menampilkan spinner.
3. Bila halaman wajib memakai penutup statis (CTABand/Showroom/Testimonials/FAQ), gunakan `PageStaticSections` (`components/layout/PageStaticSections.tsx`) dengan prop `ctaBand={...}`.
4. Tambahkan teks konten halaman ke `src/content/*.ts` (jika ada) dan daftarkan ekspor di barrel `src/content/index.ts`.
5. Tambahkan link di `NAV_LINKS` / `FOOTER` bila perlu (`src/content/layout.ts`).
6. Jalankan `npm run lint` + `npm run build`, lalu perbarui `docs/ARCHITECTURE.md` (tabel route + struktur folder).

---

## 3. Cara Menambah Section Baru

1. Buat komponen di `src/components/sections/` dengan pola komponen yang ada (lihat `AboutSection.tsx` / `EndToEndService.tsx`) — gunakan preset animasi (`Reveal`, `MaskReveal`, `CinematicImg`) dari `src/lib/animations.ts` & `ui/Reveal.tsx`/`ui/Editorial.tsx`.
2. Beri **`id`** pada elemen `<section>` jika section akan menjadi target navigasi anchor (mis. `<section id="showroom">`).
3. Pasang section ke halaman yang memakai (di `src/pages/*.tsx`), atau ke `PageStaticSections` bila statis di semua halaman.
4. Untuk teks, taruh di `src/content/sections.ts` (SSOT) — bukan hardcode di komponen.
5. Jika ingin menjadi target dropdown/mega menu, tambahkan `NavChild` dengan `type: 'anchor'` di `NAV_LINKS`.

---

## 4. Cara Menambah Produk / Showroom / Testimoni / FAQ

Semua data terpusat di `src/content/*.ts`:

| Data | File | Cara |
| :--- | :--- | :--- |
| Produk | `products.ts` | Tambah objek di `PRODUCTS_DATA` sesuai interface `Product` (id unik, category.id valid, gambar harus ada di `public/assets/`). |
| Kategori filter | `products.ts` | Tambah di `PRODUCT_CATEGORIES`. |
| Showroom | `showrooms.ts` | Tambah di `SHOWROOMS_DATA` (id unik + semua field). |
| Testimoni | `testimonials.ts` | Tambah di `TESTIMONIALS_DATA`. |
| FAQ | `faqs.ts` | Tambah di `FAQS_DATA`. |
| Proses/layanan | `workflow.ts`, `services.ts` | Sesuai bidang masing-masing. |

Aturan: ikuti **interface** yang sudah ada (jangan ubah nama field tanpa menyesuaikan pemakai), gambar rujuk ke `public/assets/`, lalu `npm run lint` + `npm run build`. Detail lengkap: `PANDUAN-KONTEN.md`.

---

## 5. Konvensi Kode (Code Conventions)

1. **TypeScript strict** — tidak boleh `any`. Semua fungsi/komponen ditipckan eksplisit.
2. **SSOT Konten**: teks/produk/showroom/FAQ di `src/content/*.ts`, import dari barrel `'../../content'` — jangan hardcode di JSX.
3. **SSOT Animasi**: pakai preset `animations.ts` (`LUXURY_EASE`, `EASE_EDITORIAL`, `EASE_CINEMATIC`, `viewportConfig`, `microButton`, ...) dan wrapper `Reveal`/`MaskReveal`/`CinematicImg`. Jangan tempel easing/margin random.
4. **Modal global** → `usePageActions().openReservation` (dari `layout/PageLayout.tsx`). Modal spesifik-konteks (reservasi per showroom di `ShowroomsSection`) boleh lokal.
5. **WhatsApp** → selalu `buildWaLink(message)` + guard `onClick={(e) => { if (!allowWaOpen()) e.preventDefault(); }}`. Nomor WA tidak pernah plaintext.
6. **Anti-Overlap animasi** → `AnimatePresence mode="wait"` untuk pergantian tab/form.
7. **Navigasi anchor** → pakai `smoothScrollTo(href)` (dari `lib/scroll.ts`) untuk scroll mulus Lenis + offset header; `setSectionHash(href)` untuk sinkron hash ke address bar; dari halaman lain gunakan `navigate('/', { state: { scrollTo: href } })`.
8. **Responsive** → touch target ≥ 44×44px; tab horizontal pakai `no-scrollbar overflow-x-auto`.
9. **Error handling** → wajib; jangan biarkan empty catch block.
10. **Baris baru di akhir file**; jangan tambah komentar berlebih kecuali perlu menjelaskan keputusan non-trivial.

---

## 6. Sistem Animasi & Scroll (ringkas)

- **Smooth scroll**: `useSmoothScroll()` di `PageLayout` menginisialisasi **Lenis** dan mengekspos `window.__lenis`. Semua scroll terprogram lewat `lib/scroll.ts`.
- **Offset header**: `smoothScrollTo` mengurangi `HEADER_OFFSET` (108px) agar section tidak tertutup sticky header.
- **Hash & "lokasi tab"**: `setSectionHash(hash)` memakai `history.replaceState`; saat berpindah halaman ke anchor via state, `PageLayout` men-sinkron hash setelah dua rAF.
- **Transisi halaman**: `AnimatedRoutes` (`mode="wait"`) + preset `pageTransition`; key = `pathname` sehingga navigasi hash/query di halaman sama tidak men-trigger transisi ulang.

---

## 7. Deployment (Hosting SPA)

Aplikasi memakai `BrowserRouter`, sehingga **butuh rewrite semua rute ke `index.html`** agar rute dalam (mis. `/koleksi-produk/:id`, `/layanan`) tidak mengembalikan 404 saat di-refresh langsung.

- **Netlify**: file `public/_redirects` → `/* /index.html 200`.
- **Vercel**: `rewrites` ke `/index.html`.
- **Nginx**: `try_files $uri /index.html;`.
- **Apache**: `.htaccess` dengan `FallbackResource /index.html`.

1. `npm run build` → hasil di `/dist`.
2. Upload `/dist` ke host; terapkan rewrite di atas.
3. Pratinjau: `npm run preview`.

---

## 8. Troubleshooting Umum

| Gejala | Kemungkinan Penyebab | Solusi |
| :--- | :--- | :--- |
| Anchor tidak mendarat tepat (tertutup header) | Offset header tidak sesuai | Pastikan `HEADER_OFFSET` di `lib/scroll.ts` = tinggi sticky header aktual. |
| Hash (`/#section`) tidak muncul di address bar | Navigasi lewat `smoothScrollTo` tanpa `setSectionHash` | Panggil `setSectionHash(href)` setelah scroll pada path aktif. |
| Scroll kasar / tidak mulus | Lenis belum inisialisasi / ditimpa | Pastikan `useSmoothScroll()` aktif di `PageLayout`; gunakan `smoothScrollTo`, bukan `window.scrollTo`. |
| Konten teks berubah tapi build error | Field konten diubah tanpa sesuaikan pemakai | Ikuti interface di `src/content/*.ts`; jangan ganti nama/struktur field. |
| Rute dalam 404 saat refresh | Hosting belum rewrite SPA | Terapkan rewrite ke `index.html` (lihat bagian 7). |
| Klik WA tidak membuka (guard) | Anti-spam `allowWaOpen()` menahan (cooldown 3s / kuota 5×) | Harap tunggu jeda; `WaLimitToast` memberi umpan balik. |

---

## 9. Checklist "Siap Merge / Selesai"

- [ ] `npm run lint` → zero `tsc` error.
- [ ] `npm run build` → sukses (bila menyentuh tata letak/struktur).
- [ ] Konten baru diuji via `npm run dev` (mobile + desktop).
- [ ] Docs diperbarui: `ARCHITECTURE.md`, `PANDUAN-KONTEN.md`, `PANDUAN-DEVELOPMENT.md` bila perilaku/struktur berubah.
- [ ] Roadmap fitur baru tercatat di `PRD.md` (§Lingkup Fitur) bila menambah modul.
