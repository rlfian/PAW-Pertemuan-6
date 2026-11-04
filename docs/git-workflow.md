# Dokumentasi Alur Kerja Git & GitHub (Tugas PAW Pertemuan 6)

Dokumen ini memuat bukti rekam jejak pelaksanaan seluruh ketentuan Git dan GitHub untuk evaluasi praktikum **Pengembangan Aplikasi Web (PAW)**.

---

## 👤 Identitas Mahasiswa
- **Nama**: Rio Alfian (Syahril Arfian Almazril)
- **NIM**: 1247050145
- **Mata Kuliah**: Pengembangan Aplikasi Web (PAW)
- **Repositori**: [https://github.com/rlfian/PAW-Pertemuan-6](https://github.com/rlfian/PAW-Pertemuan-6)

---

## 📌 Checklist Pemenuhan Kriteria Tugas

| Kriteria Tugas | Status | Bukti / Catatan |
| :--- | :---: | :--- |
| **Membuat repository GitHub** | ✅ Tuntas | `https://github.com/rlfian/PAW-Pertemuan-6` (Publik) |
| **Minimal 5 Commit** | ✅ Tuntas | 7+ Commit atomik terstruktur dengan Semantic Commit Messages |
| **Minimal 2 Branch** | ✅ Tuntas | Branch: `main`, `feature/academic-notes`, `feature/documentation-and-readme` |
| **Merge Branch ke Branch Utama** | ✅ Tuntas | Merge `feature/academic-notes` dan Pull Request branch ke `main` |
| **Menyelesaikan Merge Conflict** | ✅ Tuntas | Terjadi konflik di `src/services/storage.ts`, diselesaikan dengan commit resolusi |
| **Push dan Pull** | ✅ Tuntas | Berhasil `git push origin` dan `git pull origin main` |
| **Minimal 1 Pull Request** | ✅ Tuntas | PR dibuat dan di-merge melalui GitHub CLI (`gh pr`) |
| **Menggunakan .gitignore** | ✅ Tuntas | Mengabaikan `node_modules/`, `dist/`, `.env`, `.DS_Store` |

---

## 🌿 Riwayat Cabang (Branching)
```bash
$ git branch -a
* main
  feature/academic-notes
  feature/documentation-and-readme
  remotes/origin/main
  remotes/origin/feature/academic-notes
```

---

## 💥 Simulasi & Penyelesaian Merge Conflict

### 1. Pemicu Konflik
- Pada branch `feature/academic-notes`, baris deklarasi kunci storage diubah menjadi:
  ```typescript
  export const TASK_STORAGE_KEY = 'taskflow_paw_tasks_academic_feature_v1';
  ```
- Pada branch `main`, baris yang sama diubah menjadi:
  ```typescript
  export const TASK_STORAGE_KEY = 'taskflow_paw_tasks_production_main_v1';
  ```
- Saat menjalankan `git merge feature/academic-notes`, Git mendeteksi modifikasi yang bertentangan pada baris yang sama.

### 2. Output Terminal Saat Terjadi Konflik
```text
Auto-merging src/services/storage.ts
CONFLICT (content): Merge conflict in src/services/storage.ts
Automatic merge failed; fix conflicts and then commit the result.
```

### 3. Tampilan Marker Konflik dalam Kode
```typescript
<<<<<<< HEAD
export const TASK_STORAGE_KEY = 'taskflow_paw_tasks_production_main_v1';
=======
export const TASK_STORAGE_KEY = 'taskflow_paw_tasks_academic_feature_v1';
>>>>>>> feature/academic-notes
```

### 4. Langkah Penyelesaian Konflik
1. Membuka berkas `src/services/storage.ts`.
2. Menghapus marker konflik (`<<<<<<< HEAD`, `=======`, `>>>>>>>`).
3. Merekonsiliasi nilai kunci storage menjadi standar produksi:
   ```typescript
   // Resolved: Menggunakan key terpadu hasil rekonsiliasi antara main dan feature/academic-notes
   export const TASK_STORAGE_KEY = 'taskflow_paw_tasks_v1';
   ```
4. Menambahkan berkas hasil perbaikan ke area pementasan:
   ```bash
   git add src/services/storage.ts
   ```
5. Membuat commit merge resolusi:
   ```bash
   git commit -m "fix(merge): resolve merge conflict in storage key between main and feature/academic-notes"
   ```

---

## 🔀 Riwayat Pull Request
- **Branch Sumber**: `feature/documentation-and-readme`
- **Branch Target**: `main`
- **Metode Penggabungan**: Squash/Merge via GitHub CLI (`gh pr merge`)
