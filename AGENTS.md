# AGENTS.md — Instruksi untuk AI Coding Agent

## 1. Peran
Bertindak sebagai software engineer yang membantu membangun aplikasi LABORATORIUM IPA. Ikuti PRD.md, ARCHITECTURE.md, DESIGN.md, WORKFLOW.md, dan TODO.md. Jika dokumen bertentangan, jangan menebak: jelaskan konflik dan minta keputusan.

## 2. Prinsip utama
- Utamakan solusi sederhana, mudah dipahami pemula, dan minim dependensi.
- Gunakan HTML, CSS, dan JavaScript biasa. Jangan menambahkan framework besar tanpa persetujuan.
- Jangan membuat fitur di luar PRD hanya karena terlihat menarik.
- Kerjakan satu modul kecil pada satu waktu.
- Jangan mengganti struktur proyek atau teknologi tanpa izin.
- Jangan mengklaim fitur selesai sebelum diuji.

## 3. Gaya kode
- Gunakan nama variabel/fungsi yang jelas dan konsisten dalam bahasa Inggris.
- Gunakan `camelCase` untuk variabel/fungsi dan `PascalCase` hanya jika memang diperlukan.
- Pisahkan file berdasarkan tanggung jawab: halaman, komponen, layanan data, utilitas, dan konfigurasi.
- Hindari fungsi yang terlalu panjang; pecah menjadi fungsi kecil.
- Beri komentar untuk alasan/aturan bisnis yang tidak jelas, bukan untuk setiap baris.
- Gunakan `async/await` dan tangani error secara eksplisit.
- Validasi input di sisi klien untuk pengalaman pengguna dan ulangi validasi penting di sisi server/database.
- Jangan memasukkan data rahasia, password, service-role key, atau token ke Git.

## 4. Keamanan wajib
- Supabase Row Level Security (RLS) harus aktif pada semua tabel yang berisi data aplikasi.
- Jangan mengandalkan penyembunyian tombol/menu sebagai sistem keamanan.
- Role harus diverifikasi dari data profil tepercaya di database, bukan dari input form atau localStorage.
- Jangan pernah menaruh Supabase service-role key di frontend.
- Gunakan Supabase Auth untuk sesi pengguna; jangan membuat sistem password sendiri.
- Guru mendaftar sendiri dengan Google dan NIP; Admin harus menyetujui pengajuan sebelum akun aktif.
- Siswa mendaftar sendiri dengan email dan kata sandi; Admin harus memeriksa identitas NIS/absen/nama/kelas dan menyetujui pengajuan sebelum akun aktif.
- Identitas NIP, NIS, nomor absen, nama, dan kelas bukan rahasia autentikasi. Pengguna tidak dapat mengubah role atau status persetujuannya sendiri.
- Batasi akses laporan kecelakaan dan data pribadi.
- File upload harus memvalidasi tipe, ukuran, dan hak akses.
- Gunakan konfirmasi untuk tindakan berisiko seperti menghapus, menolak, atau mengubah status penting.
- Catat perubahan penting pada audit log tanpa menyimpan password/token.

## 5. Database dan data
- Gunakan foreign key, unique constraint, dan validasi yang sesuai.
- Simpan tanggal/waktu secara konsisten; tampilkan sesuai zona waktu sekolah.
- Gunakan status yang sudah ditetapkan di PRD; jangan membuat variasi ejaan.
- Data transaksi tidak dihapus permanen tanpa persetujuan eksplisit.
- Buat migration SQL yang dapat diulang dengan aman atau dokumentasikan cara menjalankannya.
- Jangan mengubah data produksi saat pengembangan.

## 6. UI/UX
- Bahasa antarmuka utama: Bahasa Indonesia.
- Utamakan tampilan responsif, jelas, konsisten, dan mudah digunakan guru/siswa.
- Berikan state loading, kosong, sukses, dan error.
- Form harus memiliki label, validasi, dan pesan kesalahan yang mudah dimengerti.
- Pastikan navigasi dapat digunakan dengan keyboard dan kontras teks memadai.
- Jangan menggunakan data contoh seolah-olah data nyata.

## 7. Pengujian
- Uji alur normal, input tidak valid, akses tanpa login, dan akses lintas role.
- Uji RLS dengan akun Admin, Guru, dan Siswa.
- Uji bentrok jadwal dan peminjaman ganda.
- Uji tampilan mobile dan desktop.
- Uji PWA melalui HTTPS dan periksa service worker.
- Catat hasil pengujian dan langkah reproduksi bug.

## 8. Ketika mengubah kode
Sebelum mengubah:
1. Baca dokumen proyek yang relevan.
2. Periksa struktur dan kode yang sudah ada.
3. Sebutkan file yang akan diubah dan alasan singkat.
4. Jika perubahan berdampak pada database, keamanan, biaya, hosting, atau scope, minta persetujuan terlebih dahulu.

Sesudah mengubah:
1. Jalankan pemeriksaan/test yang tersedia.
2. Laporkan file yang berubah.
3. Laporkan hasil test, termasuk yang belum dijalankan.
4. Perbarui TODO.md.
5. Jangan menandai selesai jika masih ada error penting.

## 9. Larangan
- Jangan menaruh secret di source code.
- Jangan membuat akun Admin default dengan password yang ditanam di kode.
- Jangan membuat bypass RLS untuk memudahkan demo.
- Jangan menghapus file/data pengguna tanpa izin.
- Jangan mengubah role pengguna melalui browser.
- Jangan menambahkan dependensi tanpa alasan dan persetujuan jika berdampak besar.
