<div align="center">

# ✈️ TASKFLOW PAW — Manajemen Tugas Kuliah

### Aplikasi Web Modern Berbasis TypeScript & Vite (Praktikum Pertemuan 6)

[![Vite](https://img.shields.io/badge/Vite-6.1.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)

**Mata Kuliah**: Pengembangan Aplikasi Web (PAW) &bull; **Pertemuan**: 6 &bull; **Jenis**: Tugas Individu  
**Pengembang**: [Rio Alfian (Syahril Arfian Almazril)](https://github.com/rlfian) (NIM: **1247050145**)  
**Program Studi**: Teknik Informatika &bull; **Institusi**: UIN Sunan Gunung Djati Bandung

[🌐 Kunjungi Live Demo Aplikasi](https://paw-pertemuan-6.vercel.app) &bull; [📂 Repositori GitHub](https://github.com/rlfian/PAW-Pertemuan-6) &bull; [📄 Dokumentasi Git Workflow](docs/git-workflow.md)

</div>

---

## 📌 Deskripsi Proyek

**TaskFlow PAW** adalah aplikasi web interaktif yang dirancang khusus untuk mengelola daftar tugas kuliah secara rapi, responsif, dan terstruktur. Aplikasi ini dibangun dengan standar arsitektur **Vanilla TypeScript** dan **Vite** yang mengadopsi estetika desain modern *Sky Blue Origami & Paper Elevation* (mengadaptasi visual referensi template formulir perjalanan beraksen lipatan kertas).

Aplikasi ini mencakup seluruh fitur CRUD tugas kuliah, filter status, pencarian realtime, penghitungan tenggat waktu otomatis, sistem penyimpanan lokal persisten (*LocalStorage* generic), serta modul edukasi terintegrasi yang menjelaskan materi pokok praktikum.

---

## ✨ Fitur Utama Aplikasi

1. **Daftar Tugas Kuliah (Task List)**: Menampilkan kartu tugas interaktif lengkap dengan nama mata kuliah, tanggal deadline, tag kategori, catatan khusus, dan badge prioritas (Tinggi, Sedang, Rendah).
2. **Tambah Tugas Baru**: Formulir terstruktur dengan validasi input, pemilihan prioritas, dan input tag kategori.
3. **Sunting & Hapus Tugas**: Modal pengeditan yang ramah pengguna serta konfirmasi penghapusan data.
4. **Status Pengerjaan**: Checkbox interaktif untuk mengubah status (Belum Selesai $\leftrightarrow$ Selesai) dilengkapi efek animasi perayaan (*confetti*).
5. **Penyaringan & Pengurutan (Filter & Sort)**: Filter instan berdasarkan status (Semua / Belum Selesai / Selesai), pencarian teks bebas, dan pengurutan (Deadline / Prioritas / Terbaru).
6. **Statistik Progres Akademik**: 4 kartu ringkasan menampilkan Total Tugas, Belum Selesai, Telah Selesai, dan Persentase Progres Kelulusan Tugas.
7. **Modul Panduan Materi Kuliah**: Menyajikan 4 kartu perbandingan interaktif (*Folded Bookmark Cards*) yang menjelaskan Git & GitHub, npm & SemVer, TypeScript, Vite & Bundler/Transpiler, serta protokol keamanan `.env`.

---

## 💎 Penerapan 5 Kriteria TypeScript (Nilai Maksimal)

Kode sumber mengimplementasikan 5 syarat TypeScript yang diwajibkan dalam rubric secara murni di berkas [`src/types/task.ts`](src/types/task.ts) dan [`src/utils/helpers.ts`](src/utils/helpers.ts):

| Kriteria | Implementasi Kode | Lokasi Berkas |
| :--- | :--- | :--- |
| **1. Primitive Types** | `string` (id, title, course, deadline), `number` (createdAt, daysRemaining), `boolean` (isCompleted, success). | [`src/types/task.ts`](src/types/task.ts#L35-L46) |
| **2. Array** | `tags: string[]` untuk label kategori, `tasks: Task[]` untuk koleksi daftar tugas. | [`src/types/task.ts`](src/types/task.ts#L43) |
| **3. Interface** | `interface Task`, `interface TaskFormData`, `interface StorageResponse<T>`, `interface IStorageService<T>`. | [`src/types/task.ts`](src/types/task.ts#L35-L87) |
| **4. Type Alias & Union** | `type TaskStatus = 'belum_selesai' \| 'selesai'`, `type TaskPriority = 'rendah' \| 'sedang' \| 'tinggi'`, `type FilterStatus = 'semua' \| TaskStatus`. | [`src/types/task.ts`](src/types/task.ts#L17-L28) |
| **5. Generics Sederhana** | Kelas `LocalStorageService<T>` untuk storage aman, fungsi `filterItems<T>(items: T[], predicate: (item: T) => boolean): T[]`, dan `cloneData<T>(data: T): T`. | [`src/services/storage.ts`](src/services/storage.ts) & [`src/utils/helpers.ts`](src/utils/helpers.ts) |

---

## 🛠️ Peran Compiler, Transpiler, dan Bundler (Vite + TypeScript)

Dalam arsitektur web modern yang digunakan pada proyek ini:
- **Transpiler (`esbuild`)**: Mengonversi kode TypeScript modern ke JavaScript murni (ECMAScript) secara instan saat server pengembangan (`npm run dev`) berjalan melalui Native ES Modules (ESM).
- **Compiler (`tsc`)**: Menjalankan pengecekan tipe statis (*type check*) tanpa menghasilkan emit berkas JS (`noEmit: true`), menjamin tidak ada kesalahan tipe sebelum rilis produksi.
- **Bundler (`Rollup`)**: Menggabungkan, melakukan *tree-shaking* (membuang kode yang tidak terpakai), serta meminifikasi seluruh modul HTML, CSS, dan TypeScript menjadi satu bundel optimal di direktori `dist/` saat menjalankan `npm run build`.

---

## 🔐 Keamanan Environment Variables

- Berkas `.env` digunakan untuk konfigurasi metadata aplikasi di sisi klien dengan prefix `VITE_` (misalnya `VITE_APP_TITLE`, `VITE_APP_VERSION`, `VITE_STUDENT_NAME`).
- Berkas template publik [`.env.example`](.env.example) disediakan untuk panduan tim tanpa memuat rahasia.
- Kredensial rahasia (seperti API key rahasia dan kata sandi database) **tidak diberi prefix `VITE_`** dan berkas `.env` secara ketat dikecualikan dari Git melalui [`.gitignore`](.gitignore), sehingga tidak akan pernah bocor ke publik atau repositori GitHub.

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

### Prasyarat
- Node.js versi 18+ (disarankan Node.js 20+ LTS / Node.js 24)
- npm versi 9+

### Langkah Instalasi
1. Kloning repositori:
   ```bash
   git clone https://github.com/rlfian/PAW-Pertemuan-6.git
   cd PAW-Pertemuan-6
   ```

2. Pasang seluruh dependensi:
   ```bash
   npm install
   ```

3. Siapkan environment variables:
   ```bash
   cp .env.example .env
   ```

4. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:5173`.

5. Melakukan kompilasi dan build produksi:
   ```bash
   npm run build
   ```
   Output build siap saji akan tercipta di direktori `dist/`.

---

## 📸 Bukti Tangkapan Layar (Screenshots)

Seluruh berkas bukti screenshot hasil otomatisasi tersimpan di direktori [`docs/screenshots/`](docs/screenshots/):
- `01-tampilan-utama-taskflow.png` — Tampilan antarmuka utama tema Sky Blue Origami.
- `02-tambah-dan-filter-tugas.png` — Interaksi CRUD dan penyaringan tugas.
- `03-modul-materi-dan-dokumentasi.png` — Modul 4 kartu perbandingan materi kuliah.
- `04-git-commit-history-dan-branches.png` — Bukti riwayat 7+ commit dan branch.
- `05-git-merge-conflict-resolution.png` — Bukti simulasi & penyelesaian merge conflict.
- `06-github-pull-request-status.png` — Bukti pembuatan dan merge Pull Request di GitHub.

---

## 📄 Lisensi
Hak Cipta &copy; 2026 **Rio Alfian (Syahril Arfian Almazril)**. Didistribusikan di bawah lisensi MIT.
