# ARCHITECTURE.md — Rancangan Implementasi

## 1. Keputusan teknologi

| Bagian | Teknologi | Alasan |
|---|---|---|
| Frontend | HTML5, CSS3, JavaScript ES Modules | Dasar, ringan, mudah dipelajari |
| Backend/API | Supabase client + PostgreSQL + Supabase Auth | Mengurangi kebutuhan membuat server sendiri |
| Database | Supabase PostgreSQL | Relasional, mendukung constraint dan RLS |
| Login Guru | Supabase Auth Google OAuth + pengajuan NIP | Guru mendaftar sendiri; Admin memverifikasi dan menyetujui akun |
| Login Siswa | Supabase Auth email/password + data identitas pada profil | Siswa mendaftar sendiri; Admin memverifikasi dan menyetujui akun |
| File/foto | Supabase Storage | Penyimpanan foto inventaris dan laporan |
| Hosting frontend | GitHub Pages | Hosting statis dan integrasi Git |
| PWA | Web App Manifest + Service Worker | Dapat dipasang dari browser |
| QR Code | Library QR ringan yang dipilih saat implementasi | Identifikasi unit alat |

**Catatan:** GitHub Pages tidak menjalankan backend PHP/Node dan tidak menyediakan database. Supabase menjadi backend terpisah. Periksa batas paket gratis dan kebijakan layanan sebelum penggunaan produksi; kuota dan ketentuan dapat berubah.

## 2. Gambaran arsitektur

Browser pengguna  
→ GitHub Pages (HTML/CSS/JS/PWA)  
→ Supabase Auth (login/session)  
→ Supabase Database (PostgreSQL + RLS)  
→ Supabase Storage (foto dan lampiran)

Semua permintaan data dari frontend memakai sesi pengguna. Kebijakan RLS menentukan data apa yang boleh dibaca/ditulis oleh Admin, Guru, dan Siswa.

## 3. Struktur folder yang disarankan

```text
laboratorium-ipa/
├── index.html
├── manifest.webmanifest
├── service-worker.js
├── assets/
│   ├── icons/
│   └── images/
├── css/
│   ├── main.css
│   ├── layout.css
│   └── components.css
├── js/
│   ├── app.js
│   ├── config/
│   │   └── supabase.js
│   ├── auth/
│   │   ├── auth.js
│   │   └── permissions.js
│   ├── services/
│   │   ├── inventory-service.js
│   │   ├── borrowing-service.js
│   │   ├── schedule-service.js
│   │   ├── report-service.js
│   │   └── announcement-service.js
│   ├── pages/
│   ├── components/
│   └── utils/
├── database/
│   ├── schema.sql
│   ├── policies.sql
│   └── seed-development.sql
├── docs/
├── PRD.md
├── AGENTS.md
├── ARCHITECTURE.md
├── TODO.md
├── SKILL.md
├── WORKFLOW.md
└── DESIGN.md
```

Gunakan hash-based routing sederhana (contoh `#/dashboard`) agar kompatibel dengan GitHub Pages tanpa konfigurasi server rewrite.

## 4. Modul aplikasi

1. Autentikasi dan profil.
2. Dashboard sesuai role.
3. Manajemen pengguna (Admin).
4. Inventaris alat.
5. Inventaris bahan.
6. QR Code dan detail unit.
7. Peminjaman dan pengembalian.
8. Jadwal praktikum.
9. Pengaduan kerusakan/kehilangan.
10. Laporan kecelakaan praktikum.
11. Pengumuman.
12. Riwayat aktivitas/audit log.
13. PWA dan pengaturan aplikasi.

## 5. Rancangan tabel database

### `profiles`
- `id` UUID, primary key, sama dengan ID Supabase Auth.
- `role` enum: admin/guru/siswa.
- `full_name`
- `email`
- `nip` nullable, unique jika terisi.
- `nis` nullable, unique jika terisi.
- `attendance_number` nullable.
- `class_name` nullable.
- `approval_status`: pending/active/rejected.
- `created_at`, `updated_at`.

Guru dan siswa mengajukan profil sendiri. Akun baru berstatus `pending` dan tidak dapat memakai fitur aplikasi sebelum Admin menyetujui pengajuan. Admin memeriksa NIP Guru atau data NIS/absen/nama/kelas Siswa; Admin tidak membuat akun mereka. Pengguna tidak dapat mengubah `role` atau `approval_status` miliknya.

### `inventory_items`
- `id` UUID.
- `item_type`: alat/bahan.
- `name`, `category`, `description`, `location`.
- `unit_of_measure` nullable.
- `stock_quantity` untuk bahan atau jumlah ringkasan.
- `condition_status`: baik/rusak untuk alat; tersedia/habis untuk bahan.
- `stock_note`: sisa banyak/sisa sedikit/catatan.
- `photo_path`, `is_active`, `created_at`, `updated_at`.

### `inventory_units`
- `id` UUID.
- `item_id` foreign key ke inventory_items.
- `unit_number` unique, misalnya ALT-0001-01.
- `condition_status`: baik/rusak.
- `qr_value` atau nilai identifikasi unik.
- `notes`, `created_at`, `updated_at`.

### `borrow_requests`
- `id`, `requester_id`, `item_id` atau relasi detail unit.
- `quantity`, `purpose`, `borrow_date`, `expected_return_date`.
- `status`, `admin_note`, `approved_by`, `approved_at`.
- `checked_out_at`, `returned_at`, `created_at`.

Untuk peminjaman banyak alat dalam satu permintaan, gunakan tabel detail `borrow_request_items` yang terhubung ke `borrow_requests`.

### `practical_schedules`
- `id`, `created_by`, `class_name`, `subject`, `topic`.
- `start_at`, `end_at`, `room`.
- `status`: pending/approved/rejected/rescheduled.
- `notes`, `reviewed_by`, `created_at`.

### `incident_reports`
- `id`, `reporter_id`.
- `report_type`: damage/loss/accident.
- `inventory_unit_id` nullable.
- `incident_at`, `location`, `description`, `initial_action`.
- `attachment_path`, `priority`, `status`, `admin_note`, `created_at`.

### `announcements`
- `id`, `title`, `body`, `category`.
- `target_type`: all/role/user.
- `target_role` nullable.
- `created_by`, `published_at`, `expires_at`, `is_published`.

Untuk target beberapa pengguna tertentu, gunakan tabel relasi `announcement_recipients(announcement_id, user_id)`.

### `audit_logs`
- `id`, `actor_id`, `action`, `entity_type`, `entity_id`.
- `old_data` dan `new_data` terbatas pada data non-rahasia.
- `created_at`.

Tambahkan tabel relasi bila dibutuhkan, indeks pencarian, foreign key, dan constraint. Jangan menyimpan password di tabel profil.

## 6. Prinsip akses/RLS

- `profiles`: pengguna dapat mengajukan dan membaca profil sendiri; Admin dapat memeriksa, menyetujui, atau menolak pengajuan; pengguna tidak dapat mengubah role atau status persetujuan sendiri.
- `inventory_items` dan `inventory_units`: semua pengguna terautentikasi dapat membaca informasi inventaris yang disetujui; hanya Admin dapat menulis.
- `borrow_requests`: Guru/Siswa membuat dan membaca permintaan milik sendiri; Admin membaca dan memproses semua.
- `practical_schedules`: Guru membuat permintaan jadwal; Admin menyetujui/mengubah; Guru/Siswa membaca jadwal yang sesuai.
- `incident_reports`: pelapor membaca laporannya sendiri; Admin/petugas berwenang membaca dan menindaklanjuti.
- `announcements`: Admin menulis; pengguna membaca hanya jika menjadi target.
- `audit_logs`: hanya Admin/petugas berwenang membaca; insert dilakukan melalui mekanisme tepercaya.

Kebijakan RLS perlu diuji dengan tiga akun role berbeda. Hindari kebijakan yang memberi akses luas hanya demi memudahkan pengembangan.

## 7. Tahapan implementasi dan kriteria selesai

### Tahap 0 — Persiapan
- Buat repository GitHub.
- Buat project Supabase.
- Siapkan struktur folder dan tujuh dokumen.
- Selesai jika aplikasi dapat dibuka lokal dan konfigurasi rahasia tidak masuk Git.

### Tahap 1 — Kerangka UI
- Buat layout, navigasi, login, dashboard dummy, dan tampilan mobile.
- Selesai jika halaman utama konsisten dan responsif.

### Tahap 2 — Auth dan role
- Integrasikan Supabase Auth.
- Buat alur pengajuan mandiri Guru/Siswa dan persetujuan Admin.
- Terapkan RLS awal.
- Selesai jika akun tidak bisa mengakses halaman/aksi role lain dan tes RLS lulus.

### Tahap 3 — Inventaris dan QR
- CRUD alat, unit alat, bahan, status kondisi, catatan stok, QR.
- Selesai jika nomor unit unik, scan QR membuka detail unit, dan status tervalidasi.

### Tahap 4 — Peminjaman
- Form pengajuan, persetujuan Admin, penyerahan, pengembalian, status.
- Selesai jika unit rusak/tidak tersedia tidak dapat dipinjam dan konflik peminjaman dicegah.

### Tahap 5 — Jadwal
- Pengajuan Guru, persetujuan Admin, tampilan siswa, validasi bentrok.
- Selesai jika jadwal bentrok ditolak dan jadwal mendatang tampil di dashboard.

### Tahap 6 — Laporan dan pengumuman
- Pengaduan kerusakan/kehilangan, kecelakaan, pengumuman tertarget.
- Selesai jika pembatasan akses dan alur tindak lanjut diuji.

### Tahap 7 — PWA dan deployment
- Manifest, service worker, ikon, HTTPS, GitHub Pages.
- Selesai jika aplikasi dapat dipasang, cache shell berfungsi, dan transaksi offline tidak diklaim berhasil.

### Tahap 8 — QA dan rilis
- Uji role, RLS, validasi, mobile, aksesibilitas, backup, dan dokumentasi.
- Selesai jika tidak ada bug kritis terbuka dan Admin menerima hasil uji.

## 8. Deployment GitHub Pages

- Simpan source code pada repository GitHub.
- Atur base path jika repository menggunakan URL `username.github.io/nama-repo/`.
- Aktifkan GitHub Pages melalui Settings → Pages atau GitHub Actions.
- Simpan URL Supabase project dan anon/publishable key pada konfigurasi frontend. Key publik bukan pengganti RLS.
- Jangan commit service-role key, password, atau kredensial OAuth rahasia.
- Atur URL redirect OAuth Supabase dan Google sesuai domain GitHub Pages yang dipakai.
- Gunakan HTTPS.
- Uji ulang callback login, routing, manifest, dan service worker pada URL hasil deployment.

## 9. Risiko dan mitigasi

- **GitHub Pages statis:** gunakan Supabase sebagai backend, bukan mencoba menjalankan database di GitHub Pages.
- **Identitas siswa mudah ditebak:** gunakan email/password melalui Supabase Auth; NIS dan nomor absen hanya atribut identitas dan akun menunggu persetujuan Admin.
- **Akses data bocor:** aktifkan RLS dan uji lintas role.
- **Kuota layanan gratis:** pantau pemakaian Supabase dan siapkan ekspor/backup.
- **Offline:** hanya cache aset dan data publik/non-sensitif yang aman; transaksi tetap memerlukan koneksi.
- **Kecelakaan praktikum:** tampilkan instruksi kontak petugas dan SOP darurat sekolah.
