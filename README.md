# SIMAS Yayasan — React + Vite

Migrasi dari HTML statis + Tailwind CDN ke React 18 + Vite + Tailwind + React Router.

## Jalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` lalu login dengan akun demo:
superadmin / yayasan123, admin.smk / smk123, admin.sd / sd123,
kepsek.smp / smp123, pj.lab / pj123.

## Struktur src

```text
src/main.jsx            -> entry Vite + HashRouter
src/App.jsx             -> routing semua menu
src/lib/auth.js         -> RBAC, sesi, lokasi (migrasi auth.js)
src/lib/store.js        -> seed + localStorage + KPI (migrasi store.js)
src/lib/AppContext.jsx  -> state global + toast
src/components/        -> Layout, Sidebar, Header, Guard, Modals
src/pages/             -> Login, Dashboard, Katalog, Layanan, Audit,
                          Depresiasi, Pengaturan, Bantuan
```

Folder lama `assets/js/*.js`, `login.html`, dan `Design/` tetap ada
sebagai arsip dan tidak dipakai oleh build Vite.

