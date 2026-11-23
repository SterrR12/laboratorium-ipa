# SKILL — Prompt Berulang untuk Pengembangan

Gunakan prompt berikut sebagai pola kerja. Sertakan konteks modul dan file yang sedang dikerjakan.

## 1. Implementasi fitur

> Baca PRD.md, AGENTS.md, ARCHITECTURE.md, DESIGN.md, dan TODO.md. Implementasikan hanya fitur [NAMA FITUR] untuk role [ROLE]. Periksa kode yang sudah ada sebelum mengubah. Jelaskan rencana singkat dan file yang akan diubah. Pertahankan teknologi dan pola proyek. Sertakan validasi, loading/error/empty state, serta pengujian. Jangan menandai selesai sebelum test dijalankan. Perbarui TODO.md.

## 2. Debugging

> Bantu perbaiki bug berikut: [DESKRIPSI BUG]. Telusuri penyebabnya terlebih dahulu, jangan langsung menulis ulang banyak file. Jelaskan akar masalah, perubahan minimal yang diperlukan, dan risiko regresi. Setelah perbaikan, jalankan test yang relevan dan laporkan hasilnya.

## 3. Pengujian fitur

> Buat test case untuk fitur [NAMA FITUR] berdasarkan PRD.md. Sertakan skenario normal, input kosong/tidak valid, pengguna belum login, akses Admin/Guru/Siswa, kegagalan jaringan, dan batasan data. Pisahkan hasil yang sudah diuji dan yang masih perlu diuji manual.

## 4. Security review

> Lakukan pemeriksaan keamanan pada modul [NAMA MODUL]. Fokus pada Supabase RLS, autentikasi, otorisasi, validasi input, upload file, kebocoran data pribadi, secret di frontend, dan manipulasi role. Jangan menonaktifkan RLS untuk memperbaiki error. Laporkan temuan berdasarkan tingkat risiko dan usulkan perbaikan minimal.

## 5. Refactoring

> Refactor modul [NAMA MODUL] agar lebih mudah dibaca dan dirawat tanpa mengubah perilaku yang sudah benar. Jangan menambah framework atau dependency tanpa izin. Pertahankan kontrak fungsi dan skema database. Jalankan test sebelum dan sesudah refactor.

## 6. Pemeriksaan database

> Tinjau perubahan schema SQL untuk [FITUR]. Pastikan tipe data, relasi, foreign key, unique constraint, indeks, nilai status, dan RLS sesuai ARCHITECTURE.md. Jelaskan dampak migrasi dan cara rollback. Jangan menjalankan perubahan pada database produksi tanpa persetujuan.

## 7. Review UI/UX

> Tinjau halaman [NAMA HALAMAN] berdasarkan DESIGN.md. Periksa hierarki informasi, konsistensi komponen, responsivitas, aksesibilitas, label form, kontras, loading, empty state, dan error state. Jangan mengubah identitas visual tanpa alasan.

## 8. Review sebelum rilis

> Lakukan release review untuk aplikasi LABORATORIUM IPA. Periksa TODO.md, build/deployment, autentikasi Google, RLS per role, alur peminjaman, inventaris, laporan, pengumuman, PWA, HTTPS, dan dokumentasi. Kelompokkan temuan menjadi blocker, penting, dan saran. Jangan menyatakan siap produksi jika masih ada blocker.
