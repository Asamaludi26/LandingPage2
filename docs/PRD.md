# PRD — Nusa Atelier

Ini rangkuman produk website Nusa Atelier: siapa targetnya, fitur apa saja yang ada, dan alurnya tinggal gimana. Developer yang mau bekerja di project ini sebaiknya baca dulu, baru lanjut ke ARCHITECTURE.md.

Luruskan dari awal: website ini tidak menyimpan data pengguna dan tidak memproses pembayaran. Seluruh penyelesaian transaksi dan reservasi lewat WhatsApp. Karena itu tidak ada backend, login, atau database. Yang dianggap konversi di sini cuma satu: pengunjung mengirim pesan WhatsApp.

## Latar belakang

Nusa Atelier bergerak di furnitur dan interior rumah dengan pengerjaan kategori luxury. Website ini jadi semacam gerbang utama yang mengarahkan pengunjung ke WhatsApp untuk semua titik kontak: booking survey, jasa instalasi, konsultasi desain. Bidang utamanya: gorden & blinds, kain upholstery, wallpaper, furnitur custom, dan lantai parquet & karpet wool.

Gaya mereknya quiet luxury: tenang, berkelas, subtil. Tidak ada ornamen heboh. Bahasa visual harus meyakinkan tanpa drama berlebihan.

Visi jangka panjangnya jadi kiblat desain premium Indonesia, tempat orang yang lagi bangun atau renovasi rumah mewah otomatis kepikiran Nusa Atelier. Saat ini semua orang bersaing di harga; kita bersaing di presisi, siluet, dan kualitas jahitan.

Definisi "End-to-End" di sini: semua kebutuhan furnitur dari gorden sampai parket beres di satu pintu.

## Buat siapa

1. **Dekorator profesional.** Butuh material gorden/karpet premium buat nawarin klien, plus vendor yang bisa diandalkan. Yang dia cari di website: bukti kredibilitas (umur perusahaan, galeri, pencapaian), kontak yang cepat ke WhatsApp, detail material yang jelas. Problemnya selama ini: vendor tidak konsisten, hasil tidak sesuai janji, komunikasi lambat.

2. **Pemilik rumah mewah.** Mau melengkapi atau menata interior (area nonton, dapur, kamar anak, ruang tamu) tanpa ribet. Dia butuh rasa yakin dari visual, kejelasan layanan satu atap, dan jalan pintas ke konsultasi. Yang ditakutkan: salah pilih material, pelayanan ribet, kualitas tidak sebanding harga.

3. **Profesional sibuk.** Orang tipe "semua beres, saya tinggal lihat hasil". Dia butuh kesan segalanya bisa diurus di sini, kontak yang mudah, dan sesedikit mungkin isian form. Sifatnya anti ditelpon sales dan malas bolak-balik ngejelasin kebutuhan.

## Fitur yang ada

**Beranda.** Hero dengan headline, subheadline, dan tombol WhatsApp. Setelah hero langsung section Tentang (tetap di beranda). Terus Koleksi Produk dengan filter kategori, End-to-End, kartu Showroom, Testimoni, dan FAQ. Pelan-pelan, satu alur.

**Koleksi & filter.** Grid produk dengan menu kategori (Semua plus 6 kategori). Saat kategori dipilih, grid ikut menyaring dan halaman scroll pelan ke grid produk. Semua kartu produk punya tombol WhatsApp.

**Halaman dalam.** Ada empat: Tentang (`/tentang-kami`), Koleksi (`/koleksi-produk`), Detail produk (`/koleksi-produk/:productId`), dan Layanan (`/layanan`). Halaman Tentang menyisipkan narasi perusahaan dengan timeline dari 1992 sampai sekarang, cerita workshop, standar kualitas, divisi grosir, dan pilar brand. Halaman detail produk: galeri, box info, deskripsi, spesifikasi, dan tombol WhatsApp.

**Reservasi showroom.** Dari kartu Showroom ada tombol buka modal. Isinya nama, WhatsApp, email, tanggal, pilihan lokasi (Showroom Senopati / Studio Menteng), dan catatan bebas. Tombol kirim membuka WhatsApp dengan ringkasan data yang sudah diformat rapi. Kalau WhatsApp gagal kebuka (limit/izin), ada jalan alternatif: isi ulang form, telepon showroom, atau email. Kasus ini jarang terjadi, tapi disiapkan.

**WhatsApp concierge.** Tombol WhatsApp ada di header, di mayoritas section, di tiap produk, dan di halaman detail. Semuanya ngarah ke satu nomor: `62812-3456-7890` (cek: ini placeholder). Kode menyimpan nomor dalam bentuk teracak agar crawler tidak gampang menelusuri; filenya `src/lib/wa.ts`. Saat nomor asli siap, ganti di situ aja.

## Hal non-fungsional

- **Performa.** SPA yang ringan, asset gambar lokal di `/public`. Font dimuat dari Google Fonts dengan preconnect agar tidak memperlambat render teks.
- **Animasi.** Halus tapi tidak berlebihan. Reveal pelan saat scroll, header berubah buram, mega menu beranimasi, efek teks di hero. Tidak ada animasi gimmick yang mengganggu.
- **Responsif.** Nyaman di desktop dan ponsel. Navigasi di ponsel pakai drawer terpisah, grid jadi tumpukan, mega menu berubah jadi accordion.
- **Aksesibilitas.** Bisa dioper lewat keyboard, ada `aria-label` di elemen penting, alt text gambar deskriptif, dan setiap halaman cuma punya satu `<h1>`.
- **Keamanan.** Tidak ada secret di repo. Nomor WhatsApp diobfuscate di kode.

## Ukur keberhasilan

Patokannya satu: pesan WhatsApp. Yang dipantau: klik tombol WA dari mana saja (filter, kartu, halaman detail, header, showroom, FAQ), pesan yang benar-benar terkirim, dan spamming kolom nama.

Sisi teknis: LCP di bawah 2,5 detik, CLS di bawah 0,1, ukuran bundle gzip di bawah 170 KB (perkiraan). Angka ini realistis karena SPA + Tailwind v4 memang ringan tanpa mengubah pengalaman pengguna.

## Di luar cakupan

- E-commerce, checkout, integrasi payment.
- Login, wishlist, akun pengguna.
- Bahasa asing / terjemahan penuh (i18n).
- SEO dinamis dari CMS. Sekarang statis, dikelola lewat `src/content/seo.ts` dan `public/sitemap.xml`.
- Integrasi feed Instagram.
- Tombol "follow us" yang mencolok. Sengaja dilewati supaya desain tetap bersih.