# Panduan Konten — Nusa Atelier

Semua teks website (judul, deskripsi, alamat, nomor WA, referensi gambar, dsb.) hidup di folder **`src/content/`**.
Halaman & komponen tinggal membaca data dari sini — jadi untuk **mengubah konten Anda tidak perlu menyentuh kode di `src/pages/` maupun `src/components/`**.

**Gambar**: file asli diletakkan di `public/assets/`, lalu direferensikan sebagai `/assets/<nama-file>` di `src/content/`. Contoh lapangan:
`image: '/assets/unsplash-1616486338812-3dadae4b4ace.jpg'`.

---

## Cara Pakai (3 langkah)

1. **Cari tahu konstanta apa** yang dipakai halaman yang mau diedit (lihat tabel di bawah).
2. **Edit teks/nilai** di file konten terkait.
3. **Verifikasi** — jalankan di terminal:
   - `npm run lint` (cek tipe & error)
   - `npm run build` (cek bisa di-build)

---

## Peta: Halaman → File Konten

| Halaman / Area | File | Konstanta utama |
|---|---|---|
| **Semua halaman** — data umum (nama brand, telp, email, jam operasional) | `src/content/layout.ts` | `SITE_INFO` |
| **Semua halaman** — navigasi atas | `src/content/layout.ts` | `NAV_LINKS`, `LOGO`, `TOPBAR`, `HEADER_CTA`, `DRAWER` |
| **Semua halaman** — footer | `src/content/layout.ts` | `FOOTER` |
| **Beranda** — hero slider | `src/content/sections.ts` | `HERO_SLIDES`, `HERO_CTA` |
| **Beranda** — section Tentang | `src/content/sections.ts` | `ABOUT_SECTION` |
| **Beranda** — section Koleksi / kategori produk | `src/content/sections.ts` + `products.ts` | `PRODUCT_CATEGORIES_SECTION`, `PRODUCT_CATEGORIES`, `PRODUCTS_DATA` |
| **Beranda** — section Layanan End-to-End | `src/content/sections.ts` + `workflow.ts` | `END_TO_END_SERVICE`, `WORKFLOW_STEPS` |
| **Semua halaman** — section Testimoni | `src/content/sections.ts` + `testimonials.ts` | `TESTIMONIALS_SECTION`, `TESTIMONIALS_DATA` |
| **Semua halaman** — section FAQ | `src/content/sections.ts` + `faqs.ts` | `FAQ_SECTION`, `FAQS_DATA` |
| **Semua halaman** — section Showroom | `src/content/sections.ts` + `showrooms.ts` | `SHOWROOMS_SECTION`, `SHOWROOMS_DATA` |
| **Semua halaman** — CTA band & panel WhatsApp melayang | `src/content/sections.ts` | `CTABAND`, `WHATSAPP_FLOAT` |
| **Semua halaman** — breadcrumb header halaman interior | `src/content/sections.ts` | `PAGE_HERO` |
| **Daftar produk** (dipakai Beranda, Koleksi, Detail) | `src/content/products.ts` | `PRODUCT_CATEGORIES`, `PRODUCTS_DATA` |
| **Halaman /tentang-kami** | `src/content/about.ts` | `ABOUT_PAGE` |
| **Halaman /koleksi-produk** | `src/content/collections.ts` | `PRODUCTS_PAGE` (berisi `hero`, `advantages`, `catalogDetails`, `fullCatalog`, `ctaBand`) |
| **Halaman /produk/:id** | `src/content/productDetail.ts` + `products.ts` | `PRODUCT_DETAIL_PAGE`, `PRODUCTS_DATA` |
| **Halaman /layanan** | `src/content/services.ts` + `workflow.ts` | `SERVICES_PAGE`, `WORKFLOW_STEPS` |

---

## Rincian per File

### `layout.ts` — data global

- **`SITE_INFO`** — sumber nilai berulang: nama usaha, `foundedYear`, `projectsCount`, `fabricCount`, telp, email, jam buka, Instagram. Nilai di sini dipakai ulang oleh file konten lain (mis. `SITE_INFO.fabricCount` muncul di `ABOUT_SECTION`, `SERVICES_PAGE`, `PRODUCTS_PAGE`). Ubah sekali di sini, otomatis berubah di semua tempat.
- **`NAV_LINKS`** — struktur khusus tipe `NavLink { label, href, type, menu?, menuSubtitle?, children? }`:
  - `type: 'anchor'` → id section home (`'#layanan'`), digulir halus.
  - `type: 'route'` → rute halaman (`'/layanan'`).
  - `menu: 'links'` → item membuka **mega menu** — **indeks section halaman tujuan** (`NavChild { label, href, type, description? }`), href route + hash deep-link:
  - Koleksi → `/koleksi-produk` (top), `/koleksi-produk#koleksi-spesialisasi` (spotlight), `/koleksi-produk#katalog-lengkap` (katalog).
  - Layanan → `/layanan` (top) dan `/layanan#layanan-{ikhtisar|ruang-lingkup|proses|khusus|garansi|galeri}` — id section berada di `ServicesPage.tsx` & `ProjectGallery.tsx` (bukan di konten).
  - Tanpa `menu` (mis. `'#showroom'`) → tautan anchor polos, digulir halus.
  - `menuSubtitle` → kalimat pengantar panel. Ubah label/href/deskripsi di sini, bukan di komponen.
- **`FOOTER`** — struktur khusus:
  - `quickLinks` & `categories` memakai tipe `FooterLink { label, type, target }`.
    - `type: 'anchor'` → target id section (`'#showroom'`), digulir halus.
    - `type: 'route'` → target rute halaman (`'/tentang-kami'`).
  - `showrooms[].phone` — **sudah termasuk prefix "Telp: "** (mis. `'Telp: (021) 750 4911'`).
  - `copyrightLine` — function `(year: number) => string`, diteruskan tahun dari JS ke teks hak cipta.
- Ikon brand ditulis sebagai teks singkat (`brandMark: 'NA'`), bukan gambar.

### `sections.ts` — teks section + WhatsApp

- Ikon pada data (mis. `ABOUT_SECTION.workshop.features[].icon`) adalah **nama komponen**, bukan JSX: `icon: Scissors`. Jangan tulis `<Scissors ...>` di sini.
- `WHATSAPP_FLOAT.quickMessages`, `defaultMessage`, dst. — pesan pilihan cepat chat WhatsApp.
- Pola judul `title1` / `titleAccent` / `title3`: bagian "accent" dirender miring berwarna (`italic text-[#5A5A40]`). **Perhatikan spasi di akhir** `title1` — spasi itu penting agar tidak menempel ke kata accent (contoh `hero.title: 'Satu Atap Untuk '`).
- `PAGE_HERO` — label breadcrumb & tombol di header halaman interior (Tentang, Koleksi, Layanan, Detail produk).

### `products.ts` — database produk

- `PRODUCT_CATEGORIES` — filter kategori di Beranda & halaman Koleksi. `id` kategori **wajib cocok** dengan field `category` tiap produk.
- `PRODUCTS_DATA: Product[]` — tiap produk:
  - `id` → **unik**, menjadi URL detail (`/koleksi-produk/<id>`). Jangan ada duplikat.
  - `name`, `subtitle`, `description`, `popularFor` — teks.
  - `image` + `galleryImages[]` — referensi gambar lokal (`/assets/unsplash-*.jpg`).
  - `tags[]`, `materials[]`, `features[]` — daftar label.
  - `specs[]` — pasangan `{ label, value }` di tabel spesifikasi.
- Untuk menambah produk baru: salin satu blok produk, ganti semua field, pastikan `category` memakai `id` dari `PRODUCT_CATEGORIES`.

### `collections.ts` — halaman /koleksi-produk

- `PRODUCTS_PAGE.catalogDetails[]` — 6 kartu kategori besar (Urutan sesuai `id`: gorden, blinds, kain, wallpaper, furniture, flooring). Tiap kartu: `name`, `tagline`, `desc`, `highlights[]`, `image`, `alt`.
- `PRODUCTS_PAGE.fullCatalog.*` — judul & label bagian "Semua Produk Eksklusif" (daftar produk diambil otomatis dari `PRODUCTS_DATA`).

### `productDetail.ts` — halaman detail produk

- Teks/label statis halaman detail (galeri, spesifikasi, quick facts, "Cara Memesan", CTA).
- `ctaBand.description` mengandung **placeholder `{product}`** yang diganti nama produk secara otomatis — biarkan placeholder tetap ada, hanya edit kalimat di sekelilingnya.
- Isi produk yang tampil diambil dari `PRODUCTS_DATA` sesuai `id` di URL — jadi untuk mengubah isi detail produk, edit `products.ts`, bukan file ini.

### `services.ts` — halaman /layanan

- `SERVICES_PAGE.hero`, `.overview`, `.serviceLines.lines[]`, `.process` (`stages[]`, `images[]`), `.special.services[]`, `.warranty.items[]`, `.gallery` (`kicker`, `title1`, `titleAccent`, `note`, `items[]` — tiap item: `image`, `alt`, `project`, `location`), `.ctaBand`.
- `SERVICES_PAGE.gallery.items[]` — foto slider "Galeri Realisasi" (6 bukti proyek). Atur urutannya sesuai penampilan di slider.
- `warranty.waMessage` — isi pesan WhatsApp tombol "Konsultasi Garansi".

### `about.ts` — halaman /tentang-kami

- `ABOUT_PAGE.hero`, `.metrics[]`, `.heritage`, `.journey.milestones[]`, `.workshop`, `.craft.steps[]`, `.quality.checks[]` + `.warrantyItems[]`, `.wholesale`, `.pillars.items[]`, `.ctaBand`.

### `workflow.ts`, `showrooms.ts`, `testimonials.ts`, `faqs.ts`

- `WORKFLOW_STEPS` — 4 tahap proses. **Catatan:** `icon` di sini adalah **string nama** (`'Ruler'`), bukan `LucideIcon`. Kalau mengganti ikon, gunakan salah satu nama yang sudah didukung (`MessageSquareText`, `Ruler`, `Scissors`, `ShieldCheck`); nama baru perlu ditambahkan ke daftar `getIcon` di komponen pemakai (`EndToEndService.tsx` & `ServicesPage.tsx`).
- `SHOWROOMS_DATA` — alamat, jam, telp, fasilitas, `mapEmbedUrl`, `googleMapsUrl`, `image` untuk tiap galeri. (Catatan: `phone` di sini tanpa prefix "Telp: " — format berbeda dari footer.)
- `TESTIMONIALS_DATA` — `quote`, `author`, `role`, `location`, `avatar`, `projectType`.
- `FAQS_DATA` — `question` & `answer`.

---

## Aturan Penting (supaya tidak error)

1. **Konten = data, bukan JSX.** Ikon pakai nama komponen (`icon: Layers`), bukan `<Layers />`. Kalau tidak butuh ikon, pakai `null` atau hapus field — jangan paksa JSX.
2. **Jangan hapus field yang dipakai komponen.** Format tiap konstanta sudah "dikontrak" oleh komponen pemakai. Ubah **nilainya**, bukan **namanya/strukturnya** — kecuali Anda juga menyesuaikan komponen.
3. **Jaga agar jumlah item tetap masuk akal** di array yang di-mapping:
   - `PRODUCTS_DATA` → otomatis (bebas tambah).
   - `SERVICES_PAGE.process.stages[]` & `WORKFLOW_STEPS` → harus **sama panjang** (dipasangkan per indeks).
   - `FaqSection`/`Testimonials` → bebas tambah, komponen menyesuaikan grid.
4. **Referensi gambar**: untuk gambar baru, letakkan file di `public/assets/` dan tulis path-nya sebagai `/assets/<nama-file>` (mis. `/assets/foto-sofa-saya.jpg`). Boleh juga memakai tautan `https` eksternal yang valid untuk referensi di `src/content/`.
5. **Setelah mengubah konten**: `npm run lint` lalu `npm run build` sampai keduanya hijau.

---

## Contoh Edit Cepat

**Ganti nomor WhatsApp header topbar** → `src/content/layout.ts`, field `TOPBAR.waMessage`.

**Ubah alamat Showroom Fatmawati** → `src/content/showrooms.ts`, item pertama `SHOWROOMS_DATA`.

**Ganti judul hero Beranda** → `src/content/sections.ts`, array `HERO_SLIDES`, field `headlineTop` / `headlineAccent`.

**Tambah produk baru di halaman Koleksi** → `src/content/products.ts`, tambah objek baru di `PRODUCTS_DATA` (id unik, `category` salah satu dari `PRODUCT_CATEGORIES`).