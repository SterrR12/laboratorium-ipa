# PRD — LABORATORIUM IPA

**Nama produk:** LABORATORIUM IPA  
**Jenis:** Aplikasi web pengelolaan laboratorium sekolah, responsif, dan PWA  
**Versi dokumen:** 1.0  
**Status:** Draft awal untuk MVP

## 1. Ringkasan produk

LABORATORIUM IPA adalah aplikasi untuk membantu sekolah mengelola inventaris alat dan bahan laboratorium, peminjaman, jadwal praktikum, pengaduan kerusakan/kehilangan, laporan kecelakaan praktikum, serta pengumuman. Aplikasi memiliki tiga role: Admin, Guru, dan Siswa.

Aplikasi dibuat dengan teknologi sederhana: HTML, CSS, JavaScript, Supabase, dan GitHub Pages. Aplikasi dapat dipasang sebagai PWA pada perangkat yang mendukung.

## 2. Masalah yang ingin diselesaikan

- Data alat dan bahan laboratorium berisiko tersebar di buku, spreadsheet, atau pesan.
- Kondisi dan jumlah persediaan sulit dipantau secara konsisten.
- Pengajuan peminjaman dan jadwal praktikum belum tercatat dalam satu tempat.
- Kerusakan, kehilangan, dan kecelakaan praktikum membutuhkan saluran pelaporan yang jelas.
- Informasi dari pengelola laboratorium perlu disampaikan kepada semua pengguna atau kelompok tertentu.

## 3. Tujuan dan indikator keberhasilan

- Admin dapat mengelola pengguna, inventaris, pengajuan, jadwal, laporan, dan pengumuman dari satu aplikasi.
- Setiap alat memiliki nomor unit unik dan QR/barcode untuk identifikasi.
- Perubahan kondisi dan stok bahan tercatat serta dapat ditelusuri.
- Guru dan siswa dapat mengajukan peminjaman dan membuat laporan.
- Guru dapat mengajukan atau mengusulkan jadwal praktikum.
- Dashboard menampilkan jadwal terdekat dan jumlah peminjam/pengajuan secara jelas.
- Aplikasi nyaman digunakan melalui desktop dan ponsel serta dapat dipasang sebagai PWA.

## 4. Target pengguna

### Admin
Pengelola laboratorium atau petugas yang diberi kewenangan penuh. Admin mengelola data master, akun, inventaris, transaksi, jadwal, laporan, dan pengumuman.

### Guru
Guru mengajukan akun sendiri menggunakan akun Google dan NIP. Akun menunggu persetujuan Admin yang memeriksa NIP. Setelah disetujui, Guru dapat mengajukan peminjaman dan jadwal praktikum, membuat pengaduan kerusakan/kehilangan, serta melaporkan kecelakaan praktikum.

### Siswa
Siswa mengajukan akun sendiri menggunakan email dan kata sandi, serta mengisi NIS, nomor absen, nama lengkap, dan kelas. Akun menunggu persetujuan Admin yang memeriksa data siswa. Setelah disetujui, siswa dapat mengajukan peminjaman, membuat pengaduan kerusakan/kehilangan, serta melaporkan kecelakaan praktikum.

## 5. Fitur MVP

### 5.1 Autentikasi dan profil
- Tiga role: `admin`, `guru`, `siswa`.
- Guru mendaftar sendiri menggunakan akun Google melalui Supabase Auth dan mengajukan NIP.
- NIP harus diverifikasi Admin; akun Guru berstatus menunggu sampai disetujui.
- Siswa mendaftar sendiri menggunakan email dan kata sandi melalui Supabase Auth, lalu mengajukan NIS, nomor absen, nama lengkap, dan kelas.
- Data siswa harus diverifikasi Admin; akun Siswa berstatus menunggu sampai disetujui.
- NIS, nomor absen, nama, kelas, dan NIP adalah data identitas, **bukan kata sandi**.
- Admin menyetujui atau menolak pengajuan akun, tetapi tidak membuat akun Guru atau Siswa.
- Admin dibuat melalui proses provisioning yang aman, bukan melalui pilihan role bebas pada formulir pendaftaran publik.
- Pengguna hanya dapat mengubah profil yang diizinkan; role tidak dapat dinaikkan sendiri.

### 5.2 Dashboard
- Ringkasan jumlah alat, bahan, alat rusak, bahan habis, dan pengajuan yang menunggu.
- Jadwal praktikum hari ini dan jadwal terdekat.
- Jumlah peminjam aktif dan ringkasan peminjaman.
- Ringkasan pengaduan/laporan yang belum ditindaklanjuti.
- Tampilan dashboard menyesuaikan role.

### 5.3 Inventaris
Dua kelompok inventaris:

**A. Alat**
- Nama alat, kode inventaris, kategori, merek/spesifikasi, jumlah, lokasi penyimpanan, foto, catatan.
- Setiap unit memiliki nomor unit unik, misalnya `ALT-0001-01`.
- Kondisi hanya dua nilai: `Baik` atau `Rusak`.
- Satu alat yang memiliki banyak unit sebaiknya dicatat per unit agar kondisi dan riwayatnya dapat dilacak.
- QR Code/barcode untuk membuka detail unit. QR Code menjadi pilihan awal karena mudah dipindai kamera ponsel.

**B. Bahan**
- Nama bahan, kode, satuan, jumlah/stok, lokasi penyimpanan, foto (opsional), catatan.
- Kondisi hanya dua nilai: `Tersedia` atau `Habis`.
- Catatan stok: `Sisa banyak`, `Sisa sedikit`, atau catatan bebas.
- Admin memperbarui stok dan status. Pengurangan stok harus tercatat.

### 5.4 Peminjaman alat
- Guru dan siswa mengisi alat/unit, jumlah, tujuan, tanggal pinjam, dan tanggal rencana kembali.
- Admin meninjau dan menyetujui/menolak pengajuan.
- Status: `Menunggu`, `Disetujui`, `Ditolak`, `Dipinjam`, `Dikembalikan`, `Terlambat`, `Dibatalkan`.
- Catat waktu persetujuan, penyerahan, pengembalian, dan petugas.
- Alat berstatus rusak atau sedang dipinjam tidak dapat diajukan.
- Cegah peminjaman ganda atas unit yang sama pada periode yang bertabrakan.

### 5.5 Jadwal praktikum
- Guru dapat mengajukan jadwal dengan kelas, mata pelajaran, topik, tanggal, jam mulai/selesai, kebutuhan alat/bahan, dan catatan.
- Admin menyetujui, menolak, atau mengusulkan perubahan.
- Siswa dapat melihat jadwal yang relevan untuk kelasnya.
- Cegah bentrok jadwal ruang/laboratorium.
- Tampilkan jadwal hari ini dan mendatang.

### 5.6 Pengaduan kerusakan dan kehilangan
- Guru/siswa memilih alat atau unit, jenis laporan (`Kerusakan` atau `Kehilangan`), kronologi, tanggal kejadian, dan foto opsional.
- Admin memeriksa dan memperbarui status: `Baru`, `Diperiksa`, `Ditindaklanjuti`, `Selesai`.
- Riwayat laporan tersimpan.

### 5.7 Laporan kecelakaan praktikum
- Guru/siswa dapat mengirim laporan berisi waktu, lokasi, kegiatan praktikum, kronologi, tindakan awal, pihak yang perlu dihubungi, dan foto opsional.
- Tandai sebagai laporan prioritas/urgent.
- Aplikasi bukan pengganti prosedur tanggap darurat sekolah. UI harus menampilkan instruksi untuk segera menghubungi guru/petugas dan layanan darurat sesuai SOP sekolah.
- Akses detail laporan dibatasi kepada pelapor dan petugas berwenang.

### 5.8 Pengumuman
- Admin membuat judul, isi, kategori, tanggal berlaku, dan target penerima.
- Target: semua pengguna, Guru, Siswa, atau pengguna tertentu yang dipilih.
- Kategori awal: `Umum`, `Jadwal Praktikum`, `Peminjaman`, `Inventaris`, `Keselamatan`.
- Guru/siswa melihat pengumuman sesuai target.
- Simpan pembuat dan waktu publikasi.

### 5.9 PWA
- Web app manifest, ikon aplikasi, service worker, dan layout responsif.
- Cache shell aplikasi agar halaman dasar dapat dibuka kembali.
- Data transaksi (peminjaman, laporan, perubahan stok) memerlukan koneksi internet dan tidak boleh mengaku berhasil saat offline.
- Tampilkan status online/offline dan pesan sinkronisasi yang jujur.

## 6. Di luar scope MVP

- Integrasi dengan sistem akademik/sekolah eksternal.
- Pembayaran, denda otomatis, atau akuntansi.
- Prediksi kebutuhan bahan berbasis AI.
- Notifikasi WhatsApp/SMS berbayar.
- Multi-sekolah atau multi-cabang.
- Sinkronisasi transaksi penuh saat offline.
- Pelacakan lokasi perangkat.
- Aplikasi native Android/iOS terpisah.

## 7. Aturan bisnis utama

- Hanya Admin yang dapat membuat/mengubah/menghapus data inventaris dan mengelola role.
- Guru dan siswa hanya dapat melihat data inventaris yang aman untuk ditampilkan.
- Guru dan siswa hanya dapat melihat transaksi/laporan milik sendiri, kecuali informasi jadwal/pengumuman yang ditujukan kepada mereka.
- Status kondisi alat: `Baik`, `Rusak`.
- Status bahan: `Tersedia`, `Habis`; catatan sisa stok membantu menjelaskan jumlah yang masih banyak/sedikit.
- Nomor unit alat harus unik.
- Semua perubahan penting dicatat pada audit log.
- Penghapusan data transaksi sebaiknya berupa arsip/nonaktif, bukan hapus permanen.

## 8. Asumsi yang perlu dikonfirmasi

- Apakah jadwal praktikum perlu persetujuan Admin sebelum tampil untuk siswa?
- Apakah bahan dapat dipinjam/dikeluarkan melalui transaksi stok, atau hanya dipantau inventarisnya?
- Apakah satu sekolah hanya memiliki satu ruang laboratorium IPA?
- Format nomor inventaris dan nomor unit yang berlaku di sekolah.

## 9. Prioritas rilis

**MVP 1:** autentikasi dan role, dashboard dasar, inventaris alat/bahan, QR unit, peminjaman, dan pengumuman.  
**MVP 2:** jadwal praktikum, pengaduan, laporan kecelakaan, audit log, laporan ringkas.  
**MVP 3:** penyempurnaan PWA, aksesibilitas, backup/ekspor, dan pengujian menyeluruh.
