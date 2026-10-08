# Spesifikasi Kebutuhan & Fitur Aplikasi Inventaris Aset Yayasan Pendidikan Islam / Sekolah Multi-Unit (SIMAS Yayasan)

## 1. Arsitektur Multi-Unit & Tata Kelola Hak Akses
* **Multi-Unit Hierarkis:** Pengelompokan terpusat untuk unit:
  * Rumah Qur'an (RQ)
  * TK / PAUD
  * SD / Madrasah Ibtidaiyah
  * SMP / MTs
  * SMK / SMA
  * Kantor Pusat / Sekretariat Yayasan
* **Hierarki Lokasi Fisik:** Kampus/Cabang -> Gedung -> Lantai -> Ruangan (Kelas, Laboratorium, Perpustakaan, Ruang Guru, Gudang, Bengkel).
* **Role-Based Access Control (RBAC):**
  * Super Admin Yayasan (Akses penuh lintas unit & audit finansial aset)
  * Admin Unit/Sekolah (Pengelolaan aset per unit)
  * Kepala Sekolah / Auditor (Persetujuan peminjaman, disposal, review opname)
  * PJ Ruangan / Guru / Staf (Pencatatan mutasi ringan & pelaporan kerusakan)

## 2. Manajemen Siklus Hidup Aset (Asset Lifecycle)
* **Registrasi & Data Induk:** Nomor inventaris, merk, tipe, S/N, tanggal pengadaan, vendor, garansi, sumber dana (BOS, Yayasan, Wakaf, Donatur).
* **Kategori Aset:** Elektronik & TIK, Furnitur & Meubilair, Kendaraan Operasional, Gedung & Lahan, Alat Laboratorium, Fasilitas Olahraga & Seni.
* **Smart Tagging:** Label Barcode & QR Code otomatis siap cetak (integrasi sticker label/thermal printer).
* **Kondisi & Status Aset:** Aktif, Rusak Ringan, Rusak Berat, Hilang, Dipinjam, Afkir/Disposal.

## 3. Modul Operasional & Layanan
* **Sistem Peminjaman & Mutasi Antar Unit:** Workflow pengajuan pinjam fasilitas/alat, validasi serah terima digital, jatuh tempo, denda/tanggung jawab.
* **Maintenance & Servis:** Tiket aduan kerusakan, jadwal preventive maintenance fasilitas penting, histori bengkel/reparasi, estimasi biaya.
* **Penyusutan Nilai (Depresiasi) & Disposal:** Metode garis lurus otomatis untuk neraca aset yayasan, berita acara pemutihan/penjualan/hibah.

## 4. Audit, Stock Opname & Akuntabilitas
* **Stock Opname Digital:** Mode audit berkala via scan QR kamera, status verifikasi match/unmatched.
* **Executive Dashboard & Reporting:** Total valuasi aset, distribusi aset per unit, peringatan garansi habis, log audit trail anti-fraud.
