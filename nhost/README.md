# Penyiapan Nhost

1. Buat proyek Nhost, lalu salin subdomain dan region dari pengaturan proyek.
2. Salin `.env.example` menjadi `.env` di folder utama proyek, lalu isi `VITE_NHOST_SUBDOMAIN` dan `VITE_NHOST_REGION`. Mulai ulang Vite setelah mengubah nilai tersebut.
3. Jalankan SQL dari `migrations/default/20260928000000_create_contact_forms/up.sql` pada database Postgres proyek melalui SQL Editor Nhost.
4. Di Hasura Console, lacak kedua tabel pada schema `public` jika belum terlacak secara otomatis.
5. Untuk role `public`, berikan izin insert pada `newsletter_subscriptions` untuk kolom `email`, serta pada `contact_messages` untuk kolom `name`, `email`, dan `message`. Gunakan `{}` sebagai kondisi insert. Jangan berikan izin select, update, atau delete kepada role ini.
6. Jalankan aplikasi dengan `npm run dev`, lalu uji kedua formulir.

Browser hanya menggunakan subdomain dan region proyek. Jangan pernah memasukkan admin secret ke variabel `VITE_` atau kode sisi klien. Izin insert untuk role `public` memungkinkan pengiriman data tanpa login, jadi aktifkan pembatasan laju (rate limiting) atau perlindungan penyalahgunaan lain yang tersedia di proyek Nhost sebelum digunakan di produksi.