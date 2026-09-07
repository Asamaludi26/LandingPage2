# Tech Stack Nusa Atelier

Catatan tentang teknologi yang dipakai, lengkap dengan versinya. Versi di sini harus sinkron dengan `package.json`; kalau ada update library, perbarui dua-duanya.

## Pustaka inti

Versi berikut sesuai deklarasi di `package.json` (pakai tanda `^` sesuai semver):

- React dan React DOM `^19.0.1`
- Vite `^6.2.3` sebagai bundler
- @vitejs/plugin-react `^5.0.4`
- Tailwind CSS `^4.1.14` lewat @tailwindcss/vite `^4.1.14`, konfigurasi via CSS, tanpa `tailwind.config.js`
- TypeScript `~5.8.2`
- React Router DOM `^7.18.3`
- Motion `^12.23.24` untuk animasi (yang dulu namanya framer-motion)
- Lenis `^1.3.26` untuk smooth-scroll
- lucide-react `^0.546.0` untuk ikon

## Perintah

```bash
npm run dev       # dev server di http://localhost:3000
npm run lint      # tsc --noEmit. Harus nol error sebelum dianggap selesai.
npm run build     # build produksi ke dist/
npm run preview   # menjalankan hasil build di lokal
npm run clean     # hapus folder dist/
```

## Cara kerjanya singkat

Vite berperan sebagai bundler, tapi hasilnya satu SPA murni (React Router, URL bersih tanpa `#`). Semua halaman memakai satu `index.html`. Berhubung SPA, server produksi wajib menangani fallback: permintaan yang tidak dikenal diarahkan ke `index.html`, bukan dibiarkan 404. Detailnya ada di PANDUAN-DEVELOPMENT.md bagian deploy.

Styling memakai Tailwind v4. Aturan font dan warna ada di `src/index.css`: `body` memakai **Plus Jakarta Sans**, judul memakai **Cormorant Garamond** (kelas `.font-serif`). Palet diisi lewat utility arbitrary dengan hex langsung, misal `#F9F8F6` (latar), `#1A1A1A` (teks), `#E5C38E` (aksen emas). Kedua font diambil dari Google Fonts (ada `preconnect` dan `display=swap` di `index.html`), bukan file lokal.

Motion memakai preset yang didefinisikan di `src/lib/animations.ts`. Lenis aktif di awal; fungsi scroll-nya ditampung di `src/lib/scroll.ts` bareng konstanta `HEADER_OFFSET`.

## Sistem desain: quiet luxury

Bahasa visualnya presisi dan tenang. Rules-nya singkat:

- **Presisi.** Grid rapat, siluet bersih, proporsi dijaga. Jangan menambah ornamen tanpa alasan.
- **Ketenangan.** Palet hangat netral: latar `#F9F8F6`, teks `#1A1A1A`, aksen emas `#E5C38E`. Judul pakai serif mewah (Cormorant Garamond), body pakai sans (Plus Jakarta Sans). Keduanya dari Google Fonts.
- **Detail manusiawi.** Efek hover ringan, reveal pelan saat scroll. Tanpa gimmick.

Utility custom paling dikenal cuma `no-scrollbar`. Lebar kontainer dan skala heading memakai kelas Tailwind standar.

## Tentang SEO

Ada sebagian infrastruktur SEO yang gampang dilupakan: `SITE_URL` di `src/content/seo.ts` adalah satu-satunya sumber domain untuk SEO dinamis, nilainya `https://www.nusaatelier.com`. Semua canonical dan JSON-LD dinamis ikut nilai itu. URL mentah di luar itu cuma ada di `index.html` (baseline statis) — kalau domain berubah, sinkronkan dua-duanya. Dari nilai itu juga, `src/lib/useSeo.ts` mengatur title, description, canonical, OG/Twitter, dan injeksi JSON-LD per halaman. Dipanggil otomatis oleh PageLayout.

File `public/robots.txt` dan `public/sitemap.xml` mengikuti. Kalau ada halaman atau produk baru, tambahkan URL-nya ke sitemap.

Repo-nya private: `https://github.com/Asamaludi26/LandingPage2`.

## Kenapa pilihan ini

SPA plus Vite plus Tailwind v4 bikin build kecil dan dev cepat. React Router v7 siap kalau suatu saat butuh data dinamis. Motion sinkron dengan React. Lenis murah meriah. Kombinasi ini yang bikin situs terasa premium tapi tetap ringan.

Kalau butuh cara edit konten atau detail arsitektur, lanjut baca PANDUAN-KONTEN.md dan ARCHITECTURE.md.