# Panduan Development Nusa Atelier

Catatan kerja untuk developer yang mengerjakan project ini: alur, checklist, aturan, dan troubleshooting. Kalau belum baca ARCHITECTURE.md, baca itu dulu biar istilahnya nyambung.

## Persiapan

```bash
npm install
npm run dev      # http://localhost:3000
```

Ada dua gerbang kualitas yang wajib lewat sebelum menyatakan selesai:

```bash
npm run lint     # tsc --noEmit, harus nol error
npm run build    # vite build, harus sukses
```

## Alur kerja harian

1. Terima kebutuhan, cek dulu `src/content/`. Kebanyakan permintaan yang terdengar seperti "fitur baru" ternyata cuma perubahan data.
2. Edit, jalankan `npm run dev` untuk melihat hasilnya.
3. Tes manual desktop dan mobile, untuk rute yang tersentuh.
4. Jalankan lint dan build sampai keduanya hijau.
5. Commit dan push ke `main`. Repo-nya private, di GitHub.

## Menambah halaman baru

1. Buat file di `src/pages/` mengikuti pola halaman yang sudah ada (`HomePage.tsx` dan kawan-kawannya).
2. Daftarkan rutenya di `App.tsx`.
3. Tambahkan meta SEO di `src/content/seo.ts` (RouteMeta baru) supaya title, canonical, dan OG terisi otomatis.
4. Tambahkan URL-nya ke `public/sitemap.xml`.
5. Kalau halaman butuh konten sendiri, taruh teksnya di file konten yang relevan, bukan inline di komponen.

## Menambah section di beranda

1. Data dan tipenya masuk ke `src/content/sections.ts`, ikuti pola section yang ada.
2. Komponennya dibuat di `src/components/sections/`.
3. Render di `HomePage.tsx` sesuai urutan yang diinginkan.
4. Kalau section punya id anchor (misal `#layanan`) dan mau ditampilkan di menu, daftarkan di `NAV_LINKS` (`src/content/layout.ts`).

Perlu diingat soal navigasi: link di nav itu dua macam. `type: 'route'` untuk pindah halaman (contoh Tentang ke `/tentang-kami`), `type: 'anchor'` untuk scroll di beranda (contoh `#layanan`). Jangan memakai href murni untuk rute dalam; pakai tipe `route` biar SPA tidak melakukan reload penuh.

## Menambah produk baru

1. Tambah object di `src/content/products.ts`. Syarat mutlak: `id` unik (dipakai untuk rute detail), gambar lokal di `public/`. Catatan: data produk tidak menyimpan harga.
2. Untuk halaman detail, isi `src/content/productDetail.ts` kalau perlu detail khusus; meta SEO bisa memakai `productRouteMeta(product)` di `seo.ts`.
3. Tambahkan `https://www.nusaatelier.com/koleksi-produk/<id>` ke `public/sitemap.xml`.
4. Kalau ada kategori baru, tambahkan ke `PRODUCT_CATEGORIES` di `products.ts`.
5. Cek halaman `/koleksi-produk` dan `/koleksi-produk/<id>` di browser.

## Konvensi kode

Ringkasnya:

- TypeScript strict, hindari `any` tanpa alasan.
- Nama file komponen PascalCase, lib/hook camelCase.
- Data diimpor lewat `src/content/index.ts`.
- Animasi masuk memakai komponen `Reveal` dengan preset dari `src/lib/animations.ts`. Kalau mau animasi custom, tiru pola yang ada dulu, jangan asal buat baru.
- Tidak ada `console.log` di kode produksi.
- Sebelum membuat section baru, mending berangkat dari section yang sudah ada. Konsistensi lebih berharga daripada "lebih bagus".

## Deploy

Website-nya SPA murni, jadi hal pertama yang harus diatur di hosting: semua permintaan yang tidak dikenal diarahkan ke `index.html`. Kalau tidak, rute `/tentang-kami`, `/koleksi-produk`, `/koleksi-produk/<id>`, dan `/layanan` akan 404 saat di-refresh langsung.

Biasanya diatur lewat:

- Netlify: file `_redirects` berisi `/* /index.html 200`.
- Vercel atau Cloudflare Pages: pakai SPA rewrite bawaan.

Setelah deploy, cek tiga hal: lintasan utama, rute `/koleksi-produk/<id>` yang dibuka langsung di URL, dan SEO (title, canonical, sitemap). Pastikan `SITE_URL` di `src/content/seo.ts` sesuai dengan domain deploy.

## Troubleshooting

| Gejala | Kemungkinan penyebab | Solusi |
| :--- | :--- | :--- |
| `npm run lint` error | Tipe data berubah tanpa memperbarui tipe | Sinkronkan tipe di `content/` |
| Halaman `/koleksi-produk/<id>` kosong | `id` tidak cocok dengan data produk | Cek ejaan `id` di `products.ts` dan link-nya |
| Tombol WhatsApp tidak terbuka / kena limit | Encode di `wa.ts` salah atau limit WA | Perbaiki encode; event `na:wa-limit` menangani fallback |
| Anchor dari halaman dalam tidak scroll | Tipe link `anchor` padahal di page lain, atau `HEADER_OFFSET` bergeser | Cek `goToSection` di `Header.tsx` dan offset di `src/lib/scroll.ts` |
| Canonical atau title tidak berubah | Meta diubah dari halaman, bukan dari SEO infra | Cek `useSeo` dan `seo.ts`; meta dinamis bukan di `index.html` |
| Build sukses tapi SEO tidak berubah | Cache hosting | Hard refresh, pastikan `sitemap.xml` ikut ter-deploy |
| Font tidak muncul | Google Fonts terblokir atau URL diubah | Cek `<link>` font & preconnect di `index.html` |

## Checklist sebelum commit

- `npm run lint` nol error
- `npm run build` sukses
- Tes desktop dan mobile untuk rute yang tersentuh
- Meta SEO terbarui dan sitemap sesuai
- Tidak ada teks/kontak lama yang tersisa (kadang butuh grep cepat)
- `git status` bersih dari file yang tidak sengaja (`.ai/`, `node_modules`)