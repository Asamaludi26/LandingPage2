# Dokumentasi Nusa Atelier

Kumpulan catatan seputar website Nusa Atelier. Website-nya SPA statis tanpa backend, jadi dokumentasi di sini lebih banyak bicara soal kebutuhan produk, isi kode, dan cara ganti konten.

**Isinya:**
- `PRD.md` — apa yang kita bangun dan buat siapa. Baca dulu ini kalau belum tahu konteks produknya.
- `TECH_STACK.md` — daftar versi teknologi dan aturan styling. Fungsinya buat ngecek versi, bukan buat dipelajari lama-lama.
- `ARCHITECTURE.md` — struktur kode, routing, alur data, aturan edit. Wajib dibaca developer baru sebelum ngoding.
- `FAKTA-PELANGGAN.md` — data brand buat komunikasi ke pelanggan. Nomor kontak dan alamat di dalamnya masih placeholder, jangan dipakai buat kontak asli.
- `PANDUAN-KONTEN.md` — cara ganti teks, produk, showroom, FAQ, dan data SEO tanpa bongkar komponen.
- `PANDUAN-DEVELOPMENT.md` — alur kerja developer: nambah halaman/section/produk, deploy, dan troubleshooting.

**Mau ngapain?**
- Ganti teks website → buka PANDUAN-KONTEN.md
- Nambah fitur atau halaman → PANDUAN-DEVELOPMENT.md, detail teknisnya di ARCHITECTURE.md
- Jelasin produk ke calon client → FAKTA-PELANGGAN.md
- Cek versi library → TECH_STACK.md

**Perintah yang dipakai tiap hari:**

```bash
npm install
npm run dev      # dev server di http://localhost:3000
npm run lint     # type-check (tsc --noEmit), wajib nol error
npm run build    # build produksi ke dist/
```

**Data konten ada di mana?**

Semua data hidup di `src/content/`. Komponen cuma baca dari sana, jadi ganti konten tinggal edit di folder itu, nggak perlu sentuh komponen. Langkahnya dijelaskan di PANDUAN-KONTEN.md.

Satu hal yang gampang ketinggalan: nomor kontak dan alamat showroom di website sekarang masih angka acak (placeholder). Kalau data aslinya sudah siap, ganti di `src/content/` lalu sekalian perbarui FAKTA-PELANGGAN.md biar yang dipegang PM sama ceritanya.