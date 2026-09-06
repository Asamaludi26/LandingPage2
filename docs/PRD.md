# Product Requirements Document (PRD)
## Nusa Atelier — Digital Flagship & Consultation Platform

---

### 1. Ringkasan Eksekutif (Executive Summary)

**Nusa Atelier** adalah jenama spesialis interior tekstil dan window covering mewah yang telah berkiprah sejak **1992** (32+ tahun pengalaman). Platform digital ini dirancang sebagai *digital flagship showroom* berestetika *quiet luxury*, menghubungkan pemilik properti residensial mewah, desainer interior, serta arsitek dengan layanan kustomisasi gorden, blinds, kain upholstery, wallpaper, furniture custom, dan flooring berstandar internasional.

Platform berperan sebagai **mesin konversi lead (*consultation & lead-generation engine*)**: pengalaman visual elegan, kurasi katalog, pemesanan survei teknis on-site, reservasi kunjungan showroom, hingga komunikasi instan **WhatsApp Concierge**. **Tidak ada backend/database, keranjang, maupun pembayaran.**

---

### 2. Visi & Nilai Inti Produk (Product Vision & Core Values)

* **Visi**: Menjadi destinasi rujukan utama di Indonesia untuk solusi window fashion dan tekstil interior mewah dengan standar kurasi kelas dunia dan presisi pengerjaan *haute couture*.
* **Nilai Inti**:
  1. **Timeless Elegance**: Desain visual tenang, lapang, berkelas tanpa ornamen berlebih (*quiet luxury*).
  2. **Artisan Craftsmanship**: Workshop dan atelier in-house dengan penjahit berpengalaman lebih dari 20 tahun.
  3. **End-to-End Precision**: Layanan tuntas — survei on-site, konsultasi sampel kain gratis, instalasi rapi, garansi mekanisme 1–5 tahun.
  4. **Frictionless Consultation**: Interaksi pengguna yang mulus — reservasi kunjungan terkirim dalam hitungan detik via WhatsApp.

---

### 3. Target Audiens & Persona Pengguna (Target Audience & Personas)

#### Persona A: Pemilik Residensial Mewah / Penthouse (*High-Net-Worth Individuals*)
* **Profil**: Pemilik rumah di kawasan elite (Pondok Indah, Menteng, PIK, BSD, Pakubuwono) dengan jendela void tinggi atau penthouse modern.
* **Kebutuhan**: Gorden bermotor (*smart motorized*), insulasi panas/cahaya maksimal, vitrase linen murni Eropa, privasi tinggi, layanan survei ke lokasi.
* **Pain Point**: Sulit menemukan vendor yang mampu menangani jendela void raksasa dengan jahitan sempurna dan rel motor terintegrasi smart home.

#### Persona B: Desainer Interior & Konsultan Arsitektur
* **Profil**: Praktisi interior design studio yang menangani proyek residensial mewah atau boutique hospitality.
* **Kebutuhan**: Akses katalog sampel kain masif (10.000+ varian), spesifikasi teknis bahan (fire-retardant, acoustic, eco-certified), dukungan fabrikasi custom dan CMT.
* **Pain Point**: Keterbatasan variasi tekstil lokal, sampel fisik lambat, vendor tanpa workshop sendiri.

#### Persona C: Pengelola Properti Komersial & Hospitality
* **Profil**: General Manager/Project Director hotel butik, restoran fine-dining, kantor korporat prestisius.
* **Kebutuhan**: Ketahanan material commercial heavy-duty, efisiensi biaya wholesale/B2B, sertifikasi keamanan api, ketepatan waktu instalasi.

---

### 4. Lingkup Fitur & Spesifikasi Fungsional (Functional Requirements)

#### 4.1. Header & Sticky Navigation
* **Top bar**: alamat showroom, jam operasional, badge *"Survei Bebas Biaya"*, quick dial telepon, dan tautan WhatsApp.
* **Menu navigasi**: Beranda `#beranda`, Tentang `#tentang-kami`, Koleksi `#koleksi-produk`, Layanan `#layanan`, Showroom `#showroom`, FAQ `#faq`. Hanya item **Koleksi** & **Layanan** yang memakai **mega menu**.
* **Dropdown Koleksi**: indeks section halaman tujuan → `/koleksi-produk` (Koleksi & Produk Eksklusif), `/koleksi-produk#koleksi-spesialisasi` (Spesialisasi Kami), `/koleksi-produk#katalog-lengkap` (Katalog Lengkap) — deep-link membuka halaman dengan filter aktif + auto-scroll.
* **Dropdown Layanan**: indeks section halaman `/layanan` → `/layanan` (top), `#layanan-ikhtisar`, `#layanan-ruang-lingkup`, `#layanan-proses`, `#layanan-khusus`, `#layanan-garansi`, `#layanan-galeri`.
* **Showroom & FAQ**: tautan anchor polos (tanpa dropdown) — smooth-scroll ke `#showroom` / `#faq`, dengan hash section tersinkron ke address bar (`/#showroom`).
* **Action CTAs**: tombol *Reservasi Showroom* (membuka modal reservasi global).
* **Navigasi lintas halaman**: di halaman lain, klik anchor → pindah ke home dengan smooth-scroll ke section target (`location.state.scrollTo`) lalu hash ditampilkan di address bar.
* **Mobile drawer**: drawer layar penuh dengan animasi slide, staggered link, sub-menu accordion (expand/collapse) hanya untuk Koleksi & Layanan, focus trap, dan kunci scroll latar.

#### 4.2. Hero Section (Slideshow)
* **Visual**: slideshow otomatis 3 slide (7 detik) dengan crossfade cinematic, zoom halus, swipe (pointer), dan indikator dots.
* **Headline & CTA per slide**: kicker, headline 2-baris + accent italic, deskripsi, 2 CTA — *WhatsApp* (primary, pre-filled pesan) & *Jelajahi Koleksi* (smooth-scroll ke `#koleksi-produk`).
* Autoplay berhenti saat hover/drag/keluar viewport.

#### 4.3. Tentang Kami (About Section)
* **Tab Switcher interaktif** (sliding indicator `layoutId`):
  1. *Kisah Sejak 1992*: sejarah, visi kurasi, filosofi, pilar kualitas.
  2. *Workshop & Atelier*: workshop in-house, teknik blind-stitch, checklist kapabilitas.
  3. *Distributor & Wholesale*: layanan khusus desainer, arsitek, kontraktor (B2B).
* **3 pilar nilai**: penghargaan/sertifikasi, ketepatan, dedikasi — dengan hover lift.
* Transisi konten tab anti-tumpang tindih (`AnimatePresence mode="wait"`).

#### 4.4. Katalog & Filter Koleksi (Product Categories)
* **6 kategori produk** + filter *Semua*:
  1. **Gorden** (double drapery, French pleat, ripple fold, sheer).
  2. **Blinds** (roller, venetian wood, honeycomb, motorized Somfy/Tuya).
  3. **Kain** (beludru Belgia, jacquard, boucle, linen, microfiber).
  4. **Wallpaper** (grasscloth alami, metallic foil, silk wallcovering).
  5. **Furniture** (sofa custom, headboard, credenza, rangka kayu solid).
  6. **Flooring** (engineered oak, karpet tenun wool).
* **Kartu produk**: gambar bersih, nama, subtitle, deskripsi, badge material (maks 2 + `+N lainnya`).
* **Aksi**: *Detail Bahan* → halaman detail produk; *Reservasi Kunjungan* → buka modal reservasi.
* Filter dinamis dengan animasi layout (`motion layout` + `AnimatePresence`).

#### 4.5. Halaman Detail Produk (Product Detail Page)
Rute `#/koleksi-produk/:productId` (bukan modal).
* **Breadcrumb** kategori navigable; **hero** gambar utama `CinematicImg` + judul, deskripsi, CTA *Reservasi* & *Pesan Sampel via WhatsApp*.
* **Galeri**: pilih gambar (thumb desktop / strip geser mobile), gambar besar cinematic.
* **Spesifikasi `dl`**: baris label–nilai (bahan, dimensi, aksesoris, garansi, dst).
* **Quick facts**: estimasi produksi 7–21 hari, garansi 1–5 tahun, survei gratis, customizable.
* **Komposisi material** grid + fitur + callout rekomendasi ruangan (`popularFor`) + callout craftsmanship.
* **Slider "Semua Produk"**: korsel infinite (wrap seamless) dengan navigasi prev/next & swipe.
* **Cara Memesan** (4 langkah): konsultasi WA → survei → produksi → instalasi + garansi.
* Product tidak ditemukan → redirect ke `/koleksi-produk`.
* Penutup section: CTABand → Showroom → Testimonials → FAQ.

#### 4.6. Alur Layanan End-to-End (End-to-End Service Flow)
Grid 4 tahap (`WORKFLOW_STEPS`, ikon dipetakan di komponen):
1. *Konsultasi & Kurasi Material* — diskusi konsep, kurasi sampel 10.000+.
2. *Survei On-Site* — pengukuran presisi dengan peralatan laser.
3. *Craftsmanship* — pemotongan & penjahitan manual berstandar bespoke.
4. *Instalasi Bersih & Garansi* — pemasangan rapi + garansi resmi.
Plus 2 callout: segmen **Residensial** (CTA reservasi) & **Arsitek/Desainer** (CTA WhatsApp B2B).
CTA *"Jelajahi Seluruh Layanan Secara Lengkap"* → halaman `#/layanan`.

#### 4.6b. Halaman Detail Layanan (Services Page — `/layanan`)
Halaman dalam dengan pola yang sama seperti `/tentang-kami` & `/koleksi-produk`, dijangkau dari CTA section `#layanan` di beranda dan tautan footer.
* **PageHero**: breadcrumb *Layanan*, CTA Reservasi.
* **Ikhtisar**: narasi *satu atap* sejak 1992 + 3 kartu stat (garansi 1–5 tahun, estimasi 7–21 hari, 10.000+ sampel kain).
* **4 Lini Layanan**: Gorden & Window Fashion, Blinds & Window Shades, Upholstery & Custom Furniture, Wallpaper & Flooring — tiap lini 3 poin ceklis rinci.
* **4 Tahap Proses (deep dive)**: setiap tahap dari `WORKFLOW_STEPS` diperluas dengan 4 detail penuh (baris bolak-balik + gambar).
* **Layanan Khusus**: survei rumah gratis, skema trade/B2B, komersial & hospitality, motorized & smart home.
* **Garansi & Purnajual**: kartu garansi, dry-clean, perawatan/pemindahan rel, after-sales responsif + CTA WhatsApp garansi.
* **Galeri Realisasi**: slider 6 foto proyek (crossfade cinematic + settle), navigasi panah prev/next, counter, swipe, dan strip thumbnail untuk memilih foto — sebagai bukti profesionalitas.
* Penutup: CTABand → Showroom → Testimonials → FAQ.

#### 4.7. Galeri Showroom Fisik (Showrooms Section)
* **2 showroom** (tab switching, sliding indicator):
  1. **Showroom Fatmawati** (Jakarta Selatan) — galeri sampel kain, display sistem motorized, ruang konsultasi arsitek.
  2. **Showroom Pintu Air** (Jakarta Pusat) — tekstil wholesale & retail, koleksi kain klasik, konsultasi proyek besar.
* **Informasi**: badge distrik, nama, alamat, jam operasional, telepon `tel:`, fasilitas (grid ikon), peta interaktif (iframe) + tautan Google Maps.
* **CTA Reservasi Kunjungan** membuka modal reservasi **untuk showroom yang dipilih** (state lokal section).

#### 4.8. Modal Reservasi Showroom (Showroom Reservation Modal)
* **Formulir**: nama, no. WhatsApp (prefix `+62`, auto-format `3-4-4`, validasi `8xxxxxxxxxx`, batas merah + pesan error), tanggal kunjungan (`min` hari ini) & slot waktu (09.00–17.00 WIB tiap 30 menit).
* **Anti-bot**: honeypot tersembunyi + timestamp minimal buka form (2.5 detik).
* **Preview WhatsApp**: fase konfirmasi menampilkan simulasi chat WhatsApp realistis (header, bubble, detail reservasi — nama, no. WA, showroom, alamat, tanggal format Indonesia, waktu).
* **Kirim**: tombol hijau membuka `wa.me` dengan pesan pre-filled; opsi *Edit Data* kembali ke form.
* Modal global membuka showroom default `SHOWROOMS_DATA[0]`; section showroom membuka versi lokal per-cabang.

#### 4.9. Testimonial & Bukti Sosial (Testimonials)
* 3 kartu testimoni (quote, 5 bintang, avatar, nama, peran, lokasi, tipe proyek).
* **Banner Arsitek Partner**: callout peminjaman katalog sampel material dengan CTA WhatsApp.

#### 4.10. Tanya Jawab Terstruktur (FAQ Section)
* Accordion 6 pertanyaan (biaya survei, durasi fabrikasi, proyek luar kota, sistem smart home, CMT, garansi). Item pertama terbuka default; animasi height halus.
* Penutup: CTA WhatsApp.

#### 4.11. Floating WhatsApp Concierge
* **FAB** hijau `#25D366` kanan-bawah; membuka quick-chat box: header brand, kartu sapaan, **4 pesan cepat** pre-filled (konsultasi, katalog, reservasi, harga), footer CTA *Buka Percakapan WhatsApp*.
* Semua aksi WA dilindungi **guard anti-spam** (interval 3 detik & maks 5 bukaan/sesi).

#### 4.12. Modal Global & State Terpusat (Cross-cutting)
* `PageActionsContext` (`PageLayout`) menyediakan `openReservation()` — dipakai Header, Footer, PageHero, CTABand, ProductCategories, EndToEndService, dan seluruh halaman.
* Navigasi anchor homogen: halaman aktif → `smoothScrollTo`; halaman lain → `navigate('/', { state: { scrollTo } })`.

---

### 5. Kebutuhan Non-Fungsional (Non-Functional Requirements)
1. **Performa & Kecepatan Muat**:
   - Lazy-loading halaman non-home (`React.lazy` + `Suspense fallback`).
   - Preload gambar slide tetangga Hero.
   - Aset visual rasio aspek terkontrol untuk mencegah *layout shift*.
2. **Kualitas Animasi & Interaksi**:
   - Kurva easing *quiet luxury* (`LUXURY_EASE [0.16,1,0.3,1]`, `EASE_EDITORIAL`, `EASE_CINEMATIC`).
   - Smooth-scrolling Lenis (momentum inertial).
   - Tanpa overlap visual pada pergantian tab/form (`AnimatePresence mode="wait"`).
3. **Responsivitas Perangkat**:
   - Kompatibel 360px+ hingga ultrawide/4K; touch target minimal 44×44px; horizontal scroll pakai `no-scrollbar`.
4. **Aksesibilitas & Tipografi**:
   - WCAG AA untuk kontras teks; hiеrarki jelas: display serif (Cormorant Garamond) + body sans (Plus Jakarta Sans).
   - Modal: `role="dialog" aria-modal`, fokus trap + restore, Escape-close, aria-label pada tombol ikon.
5. **Keamanan & Validasi**:
   - Validasi klien pada nomor WhatsApp (regex `8xxxxxxxxxx`) & email.
   - Anti-bot: honeypot + deteksi waktu isi form.
   - Sanitasi semua pesan WA dengan `encodeURIComponent`; nomor WA tidak ditulis plaintext di source (obfuscated).

---

### 6. Metrik Keberhasilan (Success Metrics / KPIs)
* **Tingkat Konversi Lead**: persentase pengunjung yang menyelesaikan reservasi / permintaan katalog via WhatsApp (> 4.5%).
* **Durasi Sesi Pengguna**: rata-rata waktu jelajah (> 2 menit 30 detik).
* **Engagement Katalog**: interaksi filter kategori & klik halaman detail produk (≥ 35% pengunjung unik).
* **Kepuasan Aksesibilitas**: zero rendering error lintas browser (Chrome, Safari iOS, Edge, Firefox).
* **Kualitas Build**: `npm run lint` (tsc) zero error sebelum deploy.

---

### 7. Tidak Termasuk Lingkup (Out of Scope / Non-Goals)
Fitur yang TIDAK ada di produk saat ini dan bukan target pengembangan:
- **Interactive Estimator (kalkulator biaya)**.
- **Consultation Modal terpisah** (digantikan ShowroomReservationModal).
- **Product Detail Modal** (digantikan halaman detail penuh `/koleksi-produk/:id`).
- Item navigasi "Estimasi Biaya".
- E-commerce, keranjang, pembayaran, akun pengguna, backend/database.