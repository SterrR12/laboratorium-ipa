# DESIGN — Pedoman UI/UX LABORATORIUM IPA

## 1. Arah desain

Karakter aplikasi: **bersih, edukatif, modern, terpercaya, dan mudah digunakan**. Hindari tampilan yang terlalu ramai atau dekoratif. Informasi inventaris, jadwal, dan status harus mudah dipindai.

## 2. Pengguna dan perangkat
- Admin: dominan menggunakan desktop, tetapi tetap harus nyaman di tablet/ponsel.
- Guru: desktop dan ponsel.
- Siswa: prioritas pengalaman mobile.
- Desain responsif mulai dari layar ponsel (mobile-first).

## 3. Palet warna awal

| Token | Warna | Penggunaan |
|---|---|---|
| Primary | `#245B8F` | Navigasi utama, tombol primer |
| Primary dark | `#173D63` | Hover dan teks kuat |
| Accent | `#35A7A0` | Aksen edukatif dan informasi |
| Background | `#F5F7FA` | Latar halaman |
| Surface | `#FFFFFF` | Kartu dan panel |
| Text | `#1F2937` | Teks utama |
| Muted | `#64748B` | Teks sekunder |
| Success | `#16834A` | Kondisi baik/berhasil |
| Warning | `#B7791F` | Peringatan/sisa sedikit |
| Danger | `#C0392B` | Rusak, gagal, urgent |
| Border | `#E2E8F0` | Garis pemisah |

Warna status harus selalu disertai teks, bukan warna saja.

## 4. Tipografi
- Gunakan font sistem (`system-ui`, `Arial`, sans-serif) agar ringan.
- Heading tegas dan ringkas.
- Body text nyaman dibaca, ukuran dasar sekitar 14–16px.
- Angka ringkasan dashboard gunakan ukuran lebih besar dan konsisten.

## 5. Layout
- Sidebar pada desktop; navigasi ringkas pada mobile.
- Header berisi nama halaman, identitas pengguna, dan akses pengumuman.
- Konten menggunakan lebar yang nyaman, grid kartu dashboard, serta tabel yang dapat bergulir horizontal pada layar kecil.
- Form panjang dibagi ke bagian yang jelas.
- Berikan breadcrumb jika halaman bertingkat.

## 6. Komponen utama
- Button: primary, secondary, outline, danger.
- Status badge: Menunggu, Disetujui, Ditolak, Dipinjam, Dikembalikan, Terlambat, Baik, Rusak, Tersedia, Habis.
- Summary card: angka, label, ikon sederhana.
- Data table: pencarian, filter, pagination, empty state.
- Modal konfirmasi untuk tindakan berisiko.
- Form field dengan label permanen, helper text, dan pesan error.
- Toast/alert untuk hasil tindakan.
- QR card untuk label nomor unit inventaris.

## 7. Dashboard per role

### Admin
- Total alat dan bahan.
- Alat baik/rusak.
- Bahan tersedia/habis.
- Pengajuan peminjaman menunggu.
- Jadwal praktikum hari ini/terdekat.
- Jumlah peminjam aktif.
- Laporan yang perlu ditindaklanjuti.

### Guru
- Jadwal praktikum terdekat.
- Pengajuan peminjaman milik sendiri.
- Status pengajuan jadwal.
- Pengumuman terbaru.
- Akses cepat membuat laporan.

### Siswa
- Jadwal praktikum kelas.
- Status peminjaman milik sendiri.
- Pengumuman terbaru.
- Akses cepat mengajukan peminjaman dan laporan.

## 8. Aksesibilitas dan interaksi
- Kontras teks yang memadai (target WCAG AA).
- Semua input memiliki label.
- Tombol memiliki teks yang jelas.
- Fokus keyboard terlihat.
- Jangan menyampaikan status hanya melalui warna.
- Gunakan konfirmasi sebelum tindakan yang tidak mudah dibatalkan.
- Tampilkan loading dan cegah submit ganda.

## 9. PWA dan offline
- Sediakan ikon aplikasi ukuran umum dan manifest.
- Cache hanya shell aplikasi dan aset statis yang aman.
- Jangan menyimpan data sensitif atau laporan kecelakaan dalam cache publik.
- Saat offline, tampilkan indikator dan nonaktifkan transaksi yang memerlukan server.
- Jangan menampilkan pesan “berhasil disimpan” jika server belum mengonfirmasi.

## 10. Prinsip konsistensi
- Gunakan spacing, radius, bayangan, dan ukuran komponen yang konsisten.
- Hindari terlalu banyak warna, gradien, animasi, dan ikon berbeda gaya.
- Utamakan kejelasan status dan tindakan berikutnya bagi pengguna.
