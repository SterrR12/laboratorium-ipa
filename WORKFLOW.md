# WORKFLOW — Aturan Kerja AI dan Developer

## 1. Alur setiap sesi
1. Baca instruksi proyek dan status TODO.md.
2. Tentukan satu tujuan kecil untuk sesi tersebut.
3. Periksa file dan implementasi yang sudah ada.
4. Sampaikan rencana singkat sebelum perubahan.
5. Kerjakan perubahan sekecil mungkin.
6. Jalankan pemeriksaan dan test.
7. Laporkan file yang berubah, hasil test, risiko, dan pekerjaan berikutnya.
8. Perbarui TODO.md.

## 2. AI boleh berjalan mandiri untuk
- Membaca dan menjelaskan kode.
- Mengusulkan solusi tanpa mengubah file.
- Membuat komponen kecil sesuai desain yang sudah disepakati.
- Memperbaiki typo atau bug lokal yang tidak mengubah perilaku/struktur.
- Menulis test dan dokumentasi.
- Memperbarui TODO sesuai hasil pekerjaan yang benar-benar dilakukan.

## 3. AI wajib meminta izin sebelum
- Mengubah atau mengganti tech stack/framework.
- Mengubah struktur database yang sudah digunakan.
- Mengubah kebijakan RLS atau aturan role.
- Menghapus data, file, tabel, atau riwayat.
- Menambah layanan berbayar, dependency besar, atau integrasi eksternal.
- Mengubah domain, repository, pengaturan hosting, atau konfigurasi OAuth.
- Mengubah fitur/scope PRD.
- Menjalankan migrasi pada database produksi atau melakukan deployment produksi.

## 4. Aturan keamanan
- Tidak pernah menaruh secret di repository.
- Tidak pernah menggunakan service-role key pada frontend.
- Tidak pernah membuat bypass RLS untuk demo.
- Tidak pernah menjadikan NIS/NIP/nomor absen sebagai satu-satunya faktor autentikasi.
- Jangan menampilkan laporan kecelakaan kepada pengguna yang tidak berwenang.
- Gunakan data dummy untuk pengembangan.
- Minta persetujuan sebelum memakai data pribadi nyata.

## 5. Definisi selesai (Definition of Done)
Sebuah fitur hanya boleh dinyatakan selesai jika:
- Sesuai kebutuhan PRD.
- UI memiliki loading, empty, success, dan error state yang diperlukan.
- Validasi input berjalan.
- Hak akses diuji pada role terkait.
- RLS/database policy diuji jika fitur membaca/menulis data.
- Tidak ada error kritis di console atau test.
- Tampilan mobile dan desktop diperiksa.
- Dokumentasi dan TODO diperbarui.
- Kekurangan yang belum selesai dinyatakan secara terbuka.

## 6. Format laporan AI setelah bekerja

```text
Tujuan:
Perubahan:
File yang dibuat/diubah:
Pengujian:
Hasil:
Risiko atau kekurangan:
Status TODO:
Langkah berikutnya:
```

## 7. Pengelolaan versi
- Gunakan Git commit kecil dengan pesan yang jelas.
- Jangan commit `.env`, token, password, file rahasia, atau data siswa nyata.
- Gunakan branch untuk pekerjaan besar.
- Jangan force-push atau menghapus branch utama tanpa izin.
- Buat backup sebelum perubahan data penting.
