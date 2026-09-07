# Fakta Pelanggan Nusa Atelier

Catatan singkat buat tim yang bicara dengan pelanggan (admin, PM, konsultan). Ini yang disepakati soal brand, produk, layanan, dan sejarah. Dipakai juga sebagai patokan kalau ada pertanyaan yang jawabannya harus konsisten.

## Data kontak sekarang masih placeholder

Ini penting: nomor telepon, WhatsApp, dan alamat showroom yang tampil di website belum data asli. Angkanya dibuat acak supaya pengunjung tidak mengira itu kontak sungguhan dan crawler tidak bisa mengumpulkan data lama. Ringkasannya:

- WhatsApp: `62812-3456-7890` (placeholder)
- Telepon general & Showroom Senopati: `+62 21 555 0172` (placeholder)
- Telepon Studio Menteng: `+62 21 555 0173` (placeholder)
- Alamat kedua lokasi di bawah juga perumahan fiktif.

Jadi jangan membagikan nomor-nomor itu sebagai kontak resmi. Nanti bisa diganti di `src/lib/wa.ts`, `src/content/layout.ts`, `src/content/showrooms.ts`, dan `src/content/seo.ts`.

## Identitas

- Nama brand: **Nusa Atelier**. Slogan yang dipakai: "Nusa Atelier, Karya Kami, Ketenangan Anda." Slogan lama "Karya Angkasa, Ketenangan Anda" tidak dipakai lagi.
- Nama resmi: PT Nusa Atelier.
- Monogram di favicon: **NA**.
- Email: `info@nusaatelier.com`
- Instagram: `@nusaatelier.id`
- Domain rencana: `https://www.nusaatelier.com` (nilai `SITE_URL` di `src/content/seo.ts`)

## Sejarah

Ulasan singkatnya begini. Dimulai di Menteng, Jakarta, tahun 1992 sebagai atelier pembuat gorden dan jok kursi. Tahun 2008 membuka showroom flagship di kawasan Senopati dan dari situlah lokasi ini dikenal. 2018 masuk divisi motorisasi (mitra resmi Somfy dan Dooya). Sekarang jaringan distribusi grosirnya sampai Singapura dan Malaysia.

Di website, angka-angka publik yang dipakai: pengalaman 32+ tahun, 1.800+ proyek selesai, lebih dari 10.000 sampel kain dunia.

## Produk

Ada 9 produk yang tayang, tersebar di 6 kategori. Daftarnya sesuai data live (`src/content/products.ts`):

| Produk | Kategori |
| :--- | :--- |
| Gorden Ripple Fold & Vitrase Sheer Linen | Gorden & Vitrase |
| Gorden French Pleat Klasik Eksklusif | Gorden & Vitrase |
| Motorized Wooden Venetian Blinds | Blinds & Window Shades |
| Silhouette & Shangri-La Window Shades | Blinds & Window Shades |
| Kain Upholstery Textured Bouclé & Chenille | Kain Upholstery & Sofa |
| Kulit Asli Italian Full Grain & Aniline | Kain Upholstery & Sofa |
| Exclusive Silk & Textured Fabric Wallcovering | Wallpaper & Wallcovering |
| Bespoke Custom Curved Sofa & Credenza | Custom Furniture |
| Lantai Kayu Parquet Herringbone & Karpet Wool | Lantai Parquet & Karpet |

Perhatian: data produk tidak menyimpan harga. Semua harga disepakati lewat WhatsApp setelah penyesuaian ukuran dan material. Jadi kalau ada yang menanyakan harga di website, arahkan ke konsultasi.

## Layanan

- Gorden & blinds custom: konsultasi, survei & pengukuran, penjahitan, pemasangan.
- Upholstery sofa & reupholstery (termasuk kulit Italian).
- Wallcovering / wallpaper tekstil.
- Furniture custom (sofa, kursi, headboard) dengan rangka kayu solid.
- Lantai parquet & karpet wool.
- Binis grosir kain untuk toko dan desainer, plus kolaborasi arsitek (B2B).

Semua layanan diarahkan lewat WhatsApp. Survei dan pengukuran on-site gratis di area Jabodetabek.

## Showroom dan studio

| Lokasi | Alamat (placeholder) | Jam buka |
| :--- | :--- | :--- |
| Showroom Senopati (Jakarta Selatan) | Jl. Senopati No. 21A, Kramat Pela, Kebayoran Baru | Senin-Sabtu 09.00-18.00, Minggu dengan janji temu |
| Studio Menteng (Jakarta Pusat) | Jl. HOS Cokroaminoto No. 12, Gondangdia, Menteng | Senin-Sabtu 09.00-17.30, Minggu tutup |

Kunjungan ke dua-duanya bisa dijadwalkan lewat reservasi di website. Sekadar melihat-lihat tidak butuh janji khusus untuk datang.

## Bagaimana WhatsApp bekerja

Semua tombol di website memakai satu nomor placeholder yang sama. Format pesan yang dibentuk sistem diawali konteks, misalnya "Halo Nusa Atelier, saya tertarik konsultasi interior..." atau "Saya ingin reservasi kunjungan...". Ada proteksi kecil: jeda 3 detik antar klik dan maksimal 5 kali buka WhatsApp per sesi pengunjung, biar tidak spam. Setelah itu pengunjung diarahkan ke pilihan telepon atau email. Kalau butuh detail teknis, ada di `src/lib/wa.ts`.

## Kesimpulan

Kontak dan lokasi di file ini belum resmi. Identitas dan produk sudah sesuai data live, jadi kalau mengubah produk, kategori, atau jam showroom, sumbernya `src/content/`, lalu file ini ikut diperbarui supaya cerita di depan pelanggan tidak beda-beda.