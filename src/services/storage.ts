import type { IStorageService, StorageResponse, Task } from '../types/task';

/**
 * Generic LocalStorage Service.
 * Mengimplementasikan kontrak IStorageService<T> dengan penanganan error yang kuat.
 */
export class LocalStorageService<T> implements IStorageService<T> {
  private readonly defaultFallback: T;

  constructor(defaultFallback: T) {
    this.defaultFallback = defaultFallback;
  }

  /**
   * Mengambil data bertipe T dari localStorage.
   */
  public get(key: string): StorageResponse<T> {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        return {
          success: true,
          data: this.defaultFallback,
          message: 'Data belum tersimpan di localStorage, menggunakan nilai fallback.',
          timestamp: Date.now()
        };
      }

      const parsed: unknown = JSON.parse(raw);
      return {
        success: true,
        data: parsed as T,
        message: 'Data berhasil dimuat dari localStorage.',
        timestamp: Date.now()
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        data: this.defaultFallback,
        message: `Gagal membaca localStorage: ${errorMsg}`,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Menyimpan data bertipe T ke localStorage.
   */
  public set(key: string, value: T): StorageResponse<T> {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return {
        success: true,
        data: value,
        message: 'Data berhasil disimpan ke localStorage.',
        timestamp: Date.now()
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        data: null,
        message: `Gagal menulis ke localStorage: ${errorMsg}`,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Menghapus key dari localStorage.
   */
  public clear(key: string): StorageResponse<null> {
    try {
      localStorage.removeItem(key);
      return {
        success: true,
        data: null,
        message: `Kunci ${key} berhasil dibersihkan.`,
        timestamp: Date.now()
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        data: null,
        message: `Gagal membersihkan kunci: ${errorMsg}`,
        timestamp: Date.now()
      };
    }
  }
}

/**
 * Data awal tugas kuliah (Initial Seed Data).
 */
export const INITIAL_TASKS: Task[] = [
  {
    id: 'task_paw_001',
    title: 'Tugas Pertemuan 6: TypeScript, Vite, dan Git',
    course: 'Pengembangan Aplikasi Web',
    deadline: '2026-11-06',
    priority: 'tinggi',
    status: 'selesai',
    isCompleted: true,
    tags: ['TypeScript', 'Vite', 'Git', 'Praktikum'],
    createdAt: Date.now() - 86400000 * 2,
    notes: 'Implementasi 5 kriteria TypeScript, 5 commit, branch, merge conflict, PR, dan upload website.'
  },
  {
    id: 'task_paw_002',
    title: 'Praktikum Pertemuan 7: React State & Component',
    course: 'Pengembangan Aplikasi Web',
    deadline: '2026-11-13',
    priority: 'sedang',
    status: 'belum_selesai',
    isCompleted: false,
    tags: ['React', 'Props', 'useState'],
    createdAt: Date.now() - 86400000,
    notes: 'Mempelajari arsitektur komponen React, unidirectional data flow, dan modularisasi.'
  },
  {
    id: 'task_pam_003',
    title: 'Modul 2: Implementasi RecyclerView pada Android',
    course: 'Pengembangan Aplikasi Mobile',
    deadline: '2026-11-10',
    priority: 'tinggi',
    status: 'belum_selesai',
    isCompleted: false,
    tags: ['Android', 'Kotlin', 'Material3'],
    createdAt: Date.now() - 3600000 * 12,
    notes: 'Kustomisasi CardView, ViewHolder, dan Adapter untuk katalog produk kafe.'
  },
  {
    id: 'task_bd_004',
    title: 'Optimasi Query SQL & Normalisasi Skema',
    course: 'Manajemen Basis Data',
    deadline: '2026-11-15',
    priority: 'rendah',
    status: 'belum_selesai',
    isCompleted: false,
    tags: ['SQL', 'PostgreSQL', 'Indexing'],
    createdAt: Date.now() - 3600000 * 5,
    notes: 'Menganalisis execution plan (EXPLAIN ANALYZE) pada relasi multi-tabel.'
  }
];

export const TASK_STORAGE_KEY = 'taskflow_paw_tasks_production_main_v1';
export const taskStorage = new LocalStorageService<Task[]>(INITIAL_TASKS);
