<div align="center">

# 🎓 EduCore LMS — Portal Akademik & Manajemen Tugas Kuliah

### Aplikasi Web Modern Berbasis TypeScript & Vite (Praktikum Pertemuan 6 PAW)
**Desain & UI Mengadopsi EduCore LMS UIN Sunan Gunung Djati Bandung**

[![Vite](https://img.shields.io/badge/Vite-6.1.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)

**Mata Kuliah**: Pengembangan Aplikasi Web (PAW) &bull; **Pertemuan**: 6 &bull; **Jenis**: Tugas Individu  
**Pengembang**: [Rio Alfian (Syahril Arfian Almazril)](https://github.com/rlfian) (NIM: **1247050145**)  
**Program Studi**: Teknik Informatika &bull; **Institusi**: UIN Sunan Gunung Djati Bandung

[🌐 Kunjungi Live Demo EduCore LMS (GitHub Pages)](https://rlfian.github.io/PAW-Pertemuan-6/) &bull; [📂 Repositori GitHub](https://github.com/rlfian/PAW-Pertemuan-6) &bull; [📄 Dokumentasi Git Workflow](docs/git-workflow.md)

</div>

---

## 📌 Deskripsi Proyek

**EduCore LMS** adalah portal pembelajaran terpadu dan sistem manajemen tugas kuliah modern untuk mahasiswa Teknik Informatika UIN Sunan Gunung Djati Bandung. Aplikasi ini dibangun secara murni menggunakan arsitektur **Vanilla TypeScript** dan **Vite**, mengimplementasikan antarmuka akademis resmi dengan 4 navigasi tampilan terintegrasi:

1. **Dashboard Utama Mahasiswa**: Hero card profil mahasiswa Rio Alfian (NIM 1247050145), 4 kartu ringkasan metrik akademik (IPK 3.88, 21 SKS, Presensi 96.4%, 3 Diskusi), katalog 6 kartu mata kuliah aktif, jadwal kuliah hari ini, widget to-do list interaktif, serta pengumuman rektorat.
2. **Detail Mata Kuliah (`IF-301 • Pemrograman Aplikasi Web`)**: Ring presensi 100%, tombol sinkronisasi Zoom perkuliahan virtual, kartu pertemuan aktif *P-6 Sedang Berlangsung* dengan rincian CPMK, unduhan slide materi teori & rekaman, banner tugas praktikum, riwayat pertemuan lampau, dan widget konsultasi asisten lab.
3. **TaskFlow CRUD Manager**: Sistem manajemen tugas terpadu dengan formulir penambahan tugas baru, modal edit, konfirmasi hapus, pengalihan status selesai/belum selesai dengan efek animasi *confetti*, penyaringan status, dan pencarian instan.
4. **Dokumentasi Modul Akademik**: Penjelasan komprehensif materi praktikum Pertemuan 6 (Git/GitHub, npm & SemVer, TypeScript types/generics, peran Compiler/Transpiler/Bundler Vite, serta isolasi keamanan Environment Variables).

---

## ✨ Fitur Utama Aplikasi

- **Full Reactive Multi-View**: Navigasi mulus antar 4 tab (*Dashboard*, *Detail Kelas IF-301*, *Tugas & Ujian*, dan *Modul Edukasi*) tanpa reload halaman.
- **Daftar Tugas Kuliah (CRUD)**: Menampilkan kartu tugas interaktif lengkap dengan nama mata kuliah, tanggal deadline, tag kategori, catatan khusus, dan badge prioritas (Tinggi, Sedang, Rendah).
- **Status Pengerjaan**: Checkbox interaktif untuk mengubah status (Belum Selesai $\leftrightarrow$ Selesai) terhubung langsung dengan to-do list di Dashboard dan modal TaskFlow.
- **Penyimpanan Lokal Persisten (LocalStorage Generics)**: Seluruh manipulasi data tersimpan secara aman di browser client melalui `LocalStorageService<T>`.
- **Penyaringan & Pengurutan Cepat**: Filter instan (Semua / Belum Selesai / Selesai), pencarian realtime, dan pengurutan deadline otomatis.
- **Desain Responsif & Ergonomis**: Mengikuti standar token CSS `:root`, font family Inter, palet warna institusional Navy (`#0b2240` / `#0084ff`), mobile safe area, dan bebas AI visual slop.

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

### Antarmuka EduCore LMS (Desain Baru)
- `01-educore-lms-dashboard.png` — Dashboard Mahasiswa EduCore LMS (Hero profile Rio Alfian, 4 kartu metrik, 6 kartu mata kuliah, jadwal kuliah, dan to-do list).
- `02-educore-course-detail-paw.png` — Tampilan Kelas Mata Kuliah IF-301 Pemrograman Aplikasi Web (Presensi 100%, Zoom CTA, Pertemuan 6 aktif, materi perkuliahan, dan banner tugas).
- `03-educore-taskflow-crud.png` — Antarmuka TaskFlow CRUD Manager (Form tambah tugas, filter, sorting, dan manajemen status).
- `04-educore-documentation-paw.png` — Dokumentasi Akademik interaktif (Git, npm, TypeScript, Vite Bundler, dan Environment Variables).

### Bukti Git & GitHub Workflow
- `04-git-commit-history-dan-branches.png` — Bukti riwayat 11+ commit semantik dan branching.
- `05-git-merge-conflict-resolution.png` — Bukti simulasi & penyelesaian merge conflict.
- `06-github-pull-request-status.png` — Bukti pembuatan dan merge Pull Request #1 di GitHub.

---

## 📄 Lisensi
Hak Cipta &copy; 2026 **Rio Alfian (Syahril Arfian Almazril)** &bull; NIM: 1247050145. Didistribusikan di bawah lisensi MIT.
