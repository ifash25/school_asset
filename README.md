# SIMAS Yayasan — React + Vite + Supabase

Migrasi dari HTML statis + Tailwind CDN ke React 18 + Vite + Tailwind + React Router + Supabase.

## Jalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` lalu login dengan akun demo:
superadmin / yayasan123, admin.smk / smk123, admin.sd / sd123,
kepsek.smp / smp123, pj.lab / pj123.

## Hubungkan Supabase (wajib untuk CRUD database)

1. Buat project di https://supabase.com lalu salin **Project URL** dan **anon public key**
   (Project Settings > API).
2. Isi file `.env` di root project:
```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```
3. Di Supabase Dashboard > SQL Editor, jalankan isi file `supabase-schema.sql`
   (membuat tabel `assets`, `loans`, `alerts`, `activities`, `app_users` + RLS public).
4. Restart `npm run dev`. Badge di banner berubah:
   - `Local Mode` = `.env` masih placeholder, data hanya localStorage
   - `Menghubungkan…` / `Supabase Live` = terhubung ke database
5. Saat pertama konek dan tabel `assets` kosong, seed demo otomatis diinsert sekali.

## CRUD yang tersambung ke Supabase

- Katalog: tambah (modal), ubah (dialog Ubah), ganti kondisi, hapus
- Layanan: ajukan pinjam, setujui, selesaikan, hapus
- Audit: verifikasi scan QR -> tabel `activities`
- Pengaturan: tambah user -> tabel `app_users`, hapus user
- Semua baca awal (assets, loans, alerts, activities, users) dari Supabase;
  localStorage tetap dipakai sebagai cache offline.

