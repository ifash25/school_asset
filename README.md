# SIMAS Yayasan — Sistem Informasi Manajemen Aset

Aplikasi website inventaris aset multi-unit Yayasan Pendidikan Islam
(Executive Dashboard Konsolidasi + modul operasional).

## Cara Menjalankan
Tidak perlu build. Cukup buka file:
```
index.html
```
via Live Server VS Code atau server statis apapun:
```
npx serve .
python -m http.server 8000
```

## Struktur
```
index.html              -> SPA (Dashboard, Katalog, Layanan, Audit, Depresiasi, Pengaturan, Bantuan)
assets/css/app.css      -> custom style + token spacing Material3
assets/js/store.js      -> data seed + localStorage + agregasi
assets/js/app.js        -> layout, routing, dashboard render, modul CRUD
```

## Fitur Dashboard
- Filter konteks unit (Semua/Yayasan/SMK/SMP/SD/TK/RQ) — semua KPI & grafik ikut berubah
- Search aset live, notifikasi, export PDF/XLSX/Cetak
- Tambah Aset + Scan QR (modal fungsional, tersimpan di localStorage)
- Toggle Nilai vs Kuantitas, tabel peringatan dengan aksi, donut status, log aktivitas

## Login & RBAC
Mulai dari `login.html` (otomatis bila belum ada sesi).
| Username | Sandi | Peran | Unit |
|---|---|---|---|
| superadmin | yayasan123 | Super Admin Yayasan | Semua |
| admin.smk | smk123 | Admin Unit | SMK IT |
| admin.sd | sd123 | Admin Unit | SD IT |
| kepsek.smp | smp123 | Kepsek / Auditor | SMP IT |
| pj.lab | pj123 | PJ Ruangan | Lab SMK |

- Non-Super Admin: konteks unit dikunci pada unitnya, menu difilter per peran, route terproteksi.
- Registrasi aset butuh `aset.create`; tombol Buat BA butuh `disposal.approve` (PJ hanya mendapat pesan pengajuan).
- Menu Pengaturan & RBAC (Super Admin): kelola pengguna, matriks akses 7 menu × 4 peran, pohon lokasi 6 kampus.
- Sesi: `localStorage simas_session_v1`. Keluar via ikon logout di header.
