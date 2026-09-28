# Velox

Landing page modern untuk brand dan startup yang ingin menampilkan produk secara jelas dan menarik. Dibangun dengan React, TypeScript, Vite, dan Tailwind CSS, dengan animasi antarmuka serta formulir kontak dan newsletter yang menyimpan data melalui Nhost.

## Fitur

- Hero section dengan tombol untuk membuka video intro.
- Bagian proposisi nilai, fitur, testimoni, dan pilihan harga.
- Formulir kontak dan newsletter yang mengirim data ke Nhost melalui GraphQL.
- Tampilan responsif dengan animasi menggunakan Framer Motion.
- Ikon dari Lucide React.

## Teknologi

- React 19 dan TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Nhost: Hasura GraphQL dan PostgreSQL

## Persiapan

Pastikan Node.js dan npm sudah terpasang. Kemudian, dari folder proyek, jalankan:

```bash
npm install
```

## Konfigurasi Nhost

1. Buat proyek di Nhost dan siapkan database.
2. Salin `.env.example` menjadi `.env` di folder utama proyek.
3. Isi subdomain dan region proyek Nhost di `.env`:

   ```env
   VITE_NHOST_SUBDOMAIN=subdomain-proyek-anda
   VITE_NHOST_REGION=region-proyek-anda
   ```

4. Jalankan SQL pada [migration database](nhost/migrations/default/20260928000000_create_contact_forms/up.sql) melalui SQL Editor Nhost.
5. Di Hasura Console, lacak tabel `newsletter_subscriptions` dan `contact_messages` pada schema `public` jika belum terlacak otomatis.
6. Atur izin insert untuk role `public`: kolom `email` pada `newsletter_subscriptions`, serta kolom `name`, `email`, dan `message` pada `contact_messages`. Gunakan `{}` sebagai kondisi insert. Jangan berikan izin baca, ubah, atau hapus kepada role `public`.
7. Mulai ulang server Vite jika nilai `.env` diubah.

> Panduan lebih rinci tersedia di [nhost/README.md](nhost/README.md). Jangan pernah menaruh admin secret pada variabel `VITE_` atau kode frontend. Formulir menerima pengiriman anonim, jadi aktifkan perlindungan spam atau pembatasan laju sebelum deployment produksi.

## Menjalankan aplikasi

Jalankan server pengembangan:

```bash
npm run dev
```

Untuk membuat dan melihat build produksi secara lokal:

```bash
npm run build
npm run preview
```

## Catatan

Paket harga pada halaman ini merupakan konten tampilan dan belum terhubung ke sistem pembayaran atau proses checkout.