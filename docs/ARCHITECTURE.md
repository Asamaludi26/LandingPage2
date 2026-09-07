# Arsitektur Nusa Atelier

Dokumen ini menjelaskan bagaimana kode disusun, ke mana data mengalir, dan aturan yang harus dipegang saat ngubah-ngubah. Urutan baca yang pas: PRD, TECH_STACK, baru file ini.

Catatan: semua yang tertulis di sini sesuai kondisi kode yang berjalan sekarang, bukan rencana di atas kertas.

## Gambaran besar

Ini SPA React 19 + Vite, routing ditangani React Router dengan URL bersih (tanpa `#`). Beberapa hal yang jadi ciri khas project ini:

- Semua data dipegang `src/content/`. Teks, produk, showroom, testimoni, FAQ, sampai meta SEO hidup di satu tempat. Komponen tinggal membaca, tidak menulis teks sendiri.
- Kontennya statis. Tidak ada fetch di runtime; data diketik TypeScript dan ikut di-bundle.
- Tidak ada backend. Jalan keluar dari sistem cuma dua: membuka WhatsApp (via `wa.me`) dan nelpon.

## Struktur file

Yang penting saja, sisanya komponen pendukung:

```
index.html                    # shell HTML: meta SEO global, JSON-LD Organization, favicon
public/
  favicon.svg                 # monogram "NA"
  assets/                     # gambar produk + og-cover (og:image untuk SEO)
  robots.txt
  sitemap.xml                 # 4 halaman utama + 9 produk
src/
  main.tsx                    # render App dengan BrowserRouter
  App.tsx                     # definisi rute + PageLayout + page transition
  index.css                   # Tailwind v4 + style dasar (font, scrollbar, utility)
  components/
    layout/                   # PageLayout, Header, Footer, FloatingWhatsApp,
                              # PageHero, PageStaticSections
    sections/                 # Hero, AboutSection, ProductCategories,
                              # EndToEndService, ShowroomsSection, Testimonials,
                              # FaqSection, ProjectGallery
    modals/                   # ShowroomReservationModal
    ui/                       # Reveal, Editorial, CtaButton, CTABand,
                              # WhatsAppIcon, WaLimitToast
  content/
    index.ts                  # semua data konten diekspor lewat sini
    layout.ts                 # SITE_INFO, NAV_LINKS, TOPBAR, FOOTER
    sections.ts               # teks dan data section beranda
    products.ts               # PRODUCT_CATEGORIES + PRODUCTS_DATA (9 produk)
    collections.ts            # teks halaman /koleksi-produk
    productDetail.ts          # detail tambahan per produk
    showrooms.ts              # SHOWROOMS_DATA (2 lokasi)
    testimonials.ts           # TESTIMONIALS_DATA
    faqs.ts                   # FAQS_DATA
    about.ts                  # teks halaman /tentang-kami
    services.ts               # teks halaman /layanan
    workflow.ts               # data proses kerja
    seo.ts                    # SITE_URL, metadata rute, generator JSON-LD
  lib/
    wa.ts                     # nomor WA, obfuscation, session key, event
    useSeo.ts                 # hook SEO per halaman
    scroll.ts                 # smoothScrollTo, setSectionHash, HEADER_OFFSET
    animations.ts             # preset animasi (easing, reveal, nav, page)
    useLenis.ts               # smooth-scroll via Lenis
    useScrollLock.ts          # kunci scroll saat modal terbuka
    useModalBehaviour.ts      # perilaku modal reservasi
  pages/
    HomePage.tsx              # beranda
    AboutPage.tsx             # /tentang-kami
    ProductsPage.tsx          # /koleksi-produk (dengan filter)
    ProductDetailPage.tsx     # /koleksi-produk/:productId
    ServicesPage.tsx          # /layanan
```

Catatan soal `sitemap.xml`: isinya 4 halaman utama plus 9 produk. Setiap produk atau halaman baru wajib ditambahkan ke situ, kalau tidak SEO-nya tidak ikut ter-index.

## Routing

Rute resmi di `App.tsx`:

| URL | Halaman |
| :--- | :--- |
| `/` | Beranda (Hero, Tentang, Koleksi, End-to-End, Showroom, Testimoni, FAQ) |
| `/tentang-kami` | Tentang |
| `/koleksi-produk` | Koleksi produk + filter |
| `/koleksi-produk/:productId` | Detail produk |
| `/layanan` | Layanan |

Semua dibungkus `PageLayout`. Dia yang memuat Header, Footer, FloatingWhatsApp, ShowroomReservationModal, WaLimitToast, dan memanggil `useRouteSeo`. Halaman-halaman selain beranda dimuat lazy (React.lazy) dengan prefetch diam-diam setelah 300 ms supaya transisi halaman tidak menampilkan loader.

Pindah halaman memakai transisi halus via `AnimatePresence` + `pageTransition` dari `animations.ts` (lamanya sekitar setengah detik, tidak mengganggu).

Rute yang tidak dikenal (belum ada di daftar) diarahkan balik ke beranda dengan `<Navigate to="/" replace />`. Kami sengaja tidak membuat halaman 404 terpisah.

## Alur data

```
src/content/**  ->  komponen (Page/Section/Modal)  ->  render DOM
```

Data diimpor langsung dari `src/content/index.ts`, tidak ada lapisan server. Tiap entitas punya tipe (Product, Showroom, Section, dan seterusnya); kalau menambah field di data, tipe ikut diperbarui.

Detail produk (`/koleksi-produk/:productId`) mencari data pakai `product.id` di `PRODUCTS_DATA`. Jadi id produk adalah syarat mutlak dan harus unik.

## Navigasi

Nav menu (`NAV_LINKS` di `src/content/layout.ts`) mendukung dua tipe link:

- `route`: pindah ke halaman lain lewat router. Contohnya Tentang ke `/tentang-kami`.
- `anchor`: scroll halus ke id di beranda. Contoh: `#beranda`, `#layanan`, `#showroom`, `#faq`.

`Header.tsx` membedakan keduanya lewat `goToSection(href, isRoute)`: kalau `isRoute` benar maka `navigate(href)`, kalau tidak maka `smoothScrollTo(href)`. `handleNavClick` menjalankan semuanya sekaligus: menutup mega menu item yang punya dropdown, menutup drawer mobile, lalu routing atau scroll.

Ada dua item nav yang punya mega menu (Koleksi dan Layanan). Children-nya berisi link route yang kadang membawa hash, misalnya `/koleksi-produk#katalog-lengkap`. Kalau pengguna sudah berada di halaman itu, klik hanya scroll ke bagiannya; kalau belum, router memindahkan dulu ke halamannya. Link "Tentang Kami" di footer juga route `/tentang-kami`.

Soal anchor dari halaman lain: anchor seperti `#showroom` cuma berlaku di beranda. Kalau pengguna sedang di halaman lain, Header mengirim state `{ scrollTo: '#showroom' }`. `PageLayout` yang menerima state ini akan scroll ke target itu lalu membersihkan state; begitu juga sebaliknya, tanpa state ia langsung scroll ke atas. Kalau id suatu section diubah, perbarui juga NAV_LINKS biar tidak patah.

## WhatsApp concierge

Semua ada di `src/lib/wa.ts`. Nomor disimpan dalam keadaan terobfuscate: `ENC_DIRECT` didekode jadi nomor asli saat menyusun URL `wa.me`, `ENC_DISPLAY` yang tampil di layar (terlihat acak). Semua tombol memasang helper yang sama, jadi semuanya ngarah ke satu nomor.

Ada proteksi spam di dalamnya:

- Cooldown 3 detik antar klik.
- Maksimal 5 buka per sesi (disimpan di `sessionStorage` dengan key `na_wa_open`).
- Kalau klik ditahan karena cooldown atau kuota habis, kode memancarkan event `na:wa-limit` yang ditangkap `WaLimitToast` untuk menampilkan pesan, bukan cuma diam.

`buildWaLink(message)` menghasilkan URL `wa.me/<nomor>?text=<pesan>`, `allowWaOpen()` memutuskan bolak-balik apakah buka diizinkan, `watchWaLimit(handler)` untuk berlangganan event limit.

Aturannya tegas: jangan menulis nomor WA mentah di kode. Saat nomor asli siap, cukup perbarui `wa.ts`, seluruh tombol mengikutinya.

## SEO

SEO jalan di tiga lapis:

1. `index.html` berisi meta statis: title, description, OG, twitter, canonical, plus JSON-LD Organization. Ini jadi baseline semua halaman.
2. Hook `useRouteSeo(location)` membaca metadata dari `src/content/seo.ts` per halaman, mengganti title/description/OG/twitter/canonical, lalu menyuntik JSON-LD dinamis ke elemen `#seo-route-jsonld`. Untuk halaman detail produk, meta mengikuti data produk (`productRouteMeta(product)`), jadi tidak perlu diedit manual.
3. `robots.txt` dan `sitemap.xml` sebagai pelengkap. Sitemap ditulis manual, jangan lupa ditambah tiap ada halaman atau produk baru.

Yang perlu diingat: `SITE_URL` di `seo.ts` satu-satunya sumber domain. Jangan hardcode URL di luar file itu.

## Modal reservasi

ShowroomReservationModal dirender oleh PageLayout dan dibuka lewat konteks `usePageActions()` (fungsi `openReservation`), dipakai dari kartu showroom, CTA, header, maupun footer. Modal memformat tanggal, waktu, dan ringkasan data, lalu menyusun pesan ke WhatsApp lewat `wa.ts`. Saat modal terbuka, body di-kunci scroll-nya (`useScrollLock`), dan perilaku tambahannya diatur `useModalBehaviour`.

Jangan pindahkan logika form ke luar modal kecuali benar-benar perlu. Satu sumber kebenaran tetap `wa.ts`.

## Animasi

Preset semua ada di `src/lib/animations.ts`. Yang sering dipakai:

- `LUXURY_EASE` — easing bawaan untuk hampir semua transisi.
- `revealVariants` — arah reveal (up, down, left, right, fade, zoom, blur).
- `pageTransition` — transisi antar rute di App.
- `navMenuPanel` / `navItemStagger` — animasi mega menu.
- `fadeInUp`, `microButton`, `staggerContainer` — utilitas lain.

Komponen animasi ada di `ui/`:

- `Reveal` — reveal per elemen, bisa diatur arah, durasi, dan once.
- `RevealGroup` + `RevealItem` — untuk stagger antar elemen sekelas.
- `RevealImg` — gambar muncul dengan pan/zoom sinematik.
- `MaskReveal` dan `CinematicImg` (di Editorial) — teks yang terbuka dari balik mask dan foto yang dulu muncul seperti edisi majalah.

Aturannya sederhana: tiru pola yang sudah ada. Jangan bikin animasi baru yang lebih heboh dari yang sekarang; ini brand quiet luxury.

## Section CTA

`CTABand` (di `ui/`) adalah band gelap penutup halaman: judul, aksen, deskripsi, dan dua tombol (reservasi + WhatsApp). Datanya (`CTABAND`) ada di `sections.ts`. `PageStaticSections` (di `layout/`) yang menyusun urutan penutup hampir semua halaman: CTABand opsional → Showrooms → Testimonials → FAQ. Memakai satu komponen ini untuk semua halaman lebih gampang daripada markup diulang.

Timpa hanya lewat props `ctaBand`, `showShowrooms`, `showTestimonials`, `showFaq`. Di beranda CTABand dilewati karena sudah ada CTA di EndToEndService.

## Styling

Tailwind v4 tanpa file config; aturan tambahan ditulis langsung di `src/index.css`. Di sana ada style dasar (`body` memakai font **Plus Jakarta Sans**), kelas `.font-serif` untuk judul **Cormorant Garamond**, utility `no-scrollbar`, dan styling scrollbar. Kedua font dimuat dari Google Fonts lewat `index.html` (dengan `preconnect` dan `display=swap`).

Warna memakai utility arbitrary dengan hex langsung di komponen, misalnya latar `bg-[#F9F8F6]`, teks `text-[#1A1A1A]`, aksen emas `text-[#E5C38E]`, band gelap `bg-[#151515]`. Tidak ada blok `@theme` atau token warna khusus — kalau menambah warna, ikutkan kebiasaan ini alias hex inline.

Beberapa aturan:

- Pakai utility Tailwind, jangan inline style `style={{...}}`.
- Responsive memakai breakpoint bawaan (`md:`, `lg:`).
- Font serif/sans yang dipakai jangan diganti sembarangan; kalau menarik dari Google Fonts, sesuaikan juga `index.html`.

## Konvensi kode

- TypeScript strict, `npm run lint` harus nol error.
- Nama file komponen PascalCase, lib/hook camelCase.
- Data diimpor lewat `src/content/index.ts`.
- Tidak ada `console.log` di kode produksi (kecuali memang sengaja di `wa.ts` untuk debug).
- Nomor telepon/WA muncul lewat helper `wa.ts`, bukan ditulis mentah.

Lanjutkan ke PANDUAN-DEVELOPMENT.md untuk langkah menambah halaman, section, atau produk.