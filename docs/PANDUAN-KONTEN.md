# Panduan Konten Nusa Atelier

Panduan untuk yang tugasnya cuma ganti teks dan isi konten tanpa menyentuh logika komponen. Kalau pekerjaannya bikin fitur atau halaman baru, pindah ke PANDUAN-DEVELOPMENT.md.

Idenya sederhana: semua konten sumbernya satu, folder `src/content/`. Edit file datanya, simpan, refresh browser, selesai.

## Halaman dan bagian ini dipegang file mana

| Halaman / bagian | File |
| :--- | :--- |
| Header, topbar, menu, footer, kontak, jam, sosmed | `src/content/layout.ts` |
| Teks & data section beranda (Hero, About, Koleksi, End-to-End, Showroom, Testimoni, FAQ, CTA) | `src/content/sections.ts` |
| Halaman Koleksi (/koleksi-produk) — hero & keunggulan | `src/content/collections.ts` |
| Grid produk & kategori (9 produk + 6 kategori) | `src/content/products.ts` |
| Detail tambahan per produk | `src/content/productDetail.ts` |
| Testimoni / ulasan | `src/content/testimonials.ts` |
| Halaman Tentang (/tentang-kami) | `src/content/about.ts` |
| Halaman Layanan (/layanan) | `src/content/services.ts` |
| Showroom dan reservasi (alamat, jam, telepon) | `src/content/showrooms.ts` |
| FAQ | `src/content/faqs.ts` |
| Meta SEO (title, description, JSON-LD) | `src/content/seo.ts` |

## Hal yang paling sering diminta

### Ganti nomor telepon / WhatsApp

Ada beberapa tempat yang tampil, jadi cek semua:

- Nomor WhatsApp sebenarnya di `src/lib/wa.ts`. Angkanya disimpan terobfuscate; ganti `ENC_DIRECT` dan `ENC_DISPLAY` mengikuti pola +3/mod-10 yang sudah ada, jangan tulis nomor mentah di file lain.
- Telepon di header/footer: `SITE_INFO.phoneGeneral` di `src/content/layout.ts`.
- Telepon per showroom: `src/content/showrooms.ts`, plus daftar showroom di `FOOTER.showrooms` (`layout.ts`).
- Telepon & alamat di meta SEO: `SEO_SITE.phone` dan `SEO_SITE.address` di `src/content/seo.ts`, plus JSON-LD statis di `index.html`.

Semua tombol WhatsApp memanggil helper di `wa.ts`, jadi cukup satu titik.

### Ganti teks hero

Buka `src/content/sections.ts`. Hero adalah `HERO_SLIDES` (array slide) dengan field `kicker`, `headlineTop`, `headlineAccent`, `body`, `cues`, dan tombolnya di `HERO_CTA`. Section-section lain juga di file yang sama: `ABOUT_SECTION`, `PRODUCT_CATEGORIES_SECTION`, `END_TO_END_SERVICE`, `TESTIMONIALS_SECTION`, `FAQ_SECTION`, `SHOWROOMS_SECTION`, `CTABAND`.

### Tambah atau kurangi produk

Edit `products.ts` dan, kalau perlu, `productDetail.ts` untuk detail khusus. Tiga hal yang sering ketinggalan:

1. `id` produk harus unik. Dia yang jadi penentu rute `/koleksi-produk/:productId`.
2. Tambahkan URL produk baru ke `public/sitemap.xml`, formatnya `https://www.nusaatelier.com/koleksi-produk/<id>`.
3. Kalau muncul kategori baru, tambahkan ke `PRODUCT_CATEGORIES` di `products.ts` dan opsi filter akan mengikuti.

### Ganti testimoni atau FAQ

Testimoni di `testimonials.ts` (field `quote`, `author`, `role`, `location`, `projectType`). FAQ di `faqs.ts`, bentuknya daftar flat `{ question, answer }`. Tinggal edit array-nya.

### Ubah alamat atau jam showroom

Datanya di `src/content/showrooms.ts`, dua entri: Showroom Senopati dan Studio Menteng. Alamat yang tampil di beberapa tempat, jadi kalau berubah jangan lupa: `FOOTER.showrooms` (`layout.ts`), `SEO_SITE.address` (`seo.ts`), JSON-LD statis di `index.html`, dan `FAKTA-PELANGGAN.md`.

### Ganti meta SEO per halaman

Buka `src/content/seo.ts`. Ada metadata per halaman (`HOME_ROUTE_META`, `ABOUT_ROUTE_META`, `PRODUCTS_ROUTE_META`, `SERVICES_ROUTE_META`) dan `productRouteMeta(product)` untuk halaman detail produk. Title/description produk mengikuti data produk, jadi tidak diubah manual.

## Beberapa aturan

- Teks baru taruh di file konten dulu, jangan di-hardcode di komponen.
- `SITE_URL` di `seo.ts` jangan diubah kalau domain finalnya belum pasti. Semua canonical dan JSON-LD ngikut nilai itu.
- Harga pakai format titik di teks (misal `1.500.000`). Catatan: data produk saat ini tidak menyimpan harga; harga dibahas lewat WhatsApp.
- Emoji mencolok dihindari; brand-nya quiet luxury.
- Kalau judul halaman diubah di `seo.ts`, cek juga title di `index.html` yang jadi fallback global.
- Setelah selesai, jalankan `npm run lint` (wajib nol error) dan `npm run build` buat yakin build tetap sukses.

Kalau setelah edit produk tidak muncul di halaman detail, cek ejaan `id` di `products.ts`; biasanya itu biangnya.