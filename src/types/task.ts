/**
 * ==============================================================================
 * PRAKTIKUM PAW PERTEMUAN 6: DEFINISI MODEL & TYPE SYSTEM TYPESCRIPT
 * ==============================================================================
 * Berkas ini mengimplementasikan 5 kriteria wajib tugas:
 * 1. Primitive types (string, number, boolean)
 * 2. Array (string[], Task[])
 * 3. Interface (Task, TaskFormData, StorageResponse<T>)
 * 4. Type alias dan Union type (TaskStatus, TaskPriority, CourseName)
 * 5. Generics sederhana (StorageResponse<T>, Predicate<T>, Repository<T>)
 */

// ------------------------------------------------------------------------------
// 4. TYPE ALIAS & UNION TYPES
// ------------------------------------------------------------------------------
export type TaskStatus = 'belum_selesai' | 'selesai';
export type TaskPriority = 'rendah' | 'sedang' | 'tinggi';
export type FilterStatus = 'semua' | TaskStatus;

export type CourseName = 
  | 'Pengembangan Aplikasi Web'
  | 'Manajemen Basis Data'
  | 'Pengembangan Aplikasi Mobile'
  | 'Kecerdasan Buatan'
  | 'Jaringan Komputer'
  | 'Lainnya';

// ------------------------------------------------------------------------------
// 1. PRIMITIVE TYPES & 2. ARRAYS & 3. INTERFACES
// ------------------------------------------------------------------------------

/**
 * Interface mewakili satu entitas Tugas Kuliah.
 * Menggabungkan primitive types (string, number, boolean) dan array (string[]).
 */
export interface Task {
  readonly id: string;           // primitive: string (UUID / timestamp-based)
  title: string;                 // primitive: string
  course: CourseName | string;   // union type + string
  deadline: string;              // primitive: string (format ISO YYYY-MM-DD)
  priority: TaskPriority;        // union type
  status: TaskStatus;            // union type
  isCompleted: boolean;          // primitive: boolean
  tags: string[];                // array: string[]
  createdAt: number;             // primitive: number (epoch milliseconds)
  notes?: string;                // optional primitive: string
}

/**
 * Interface data masukan form saat menambahkan atau menyunting tugas.
 */
export interface TaskFormData {
  title: string;
  course: string;
  deadline: string;
  priority: TaskPriority;
  tagsInput: string;             // string pemisah koma sebelum diubah ke string[]
  notes?: string;
}

/**
 * Interface filter pencarian dan pengelompokan.
 */
export interface TaskFilterOptions {
  status: FilterStatus;
  course: string;
  searchQuery: string;
  sortBy: 'deadline' | 'priority' | 'createdAt';
}

// ------------------------------------------------------------------------------
// 5. GENERICS SEDERHANA
// ------------------------------------------------------------------------------

/**
 * Interface generic untuk membungkus hasil operasi penyimpanan / I/O.
 */
export interface StorageResponse<T> {
  readonly success: boolean;
  readonly data: T | null;
  readonly message: string;
  readonly timestamp: number;
}

/**
 * Generic Predicate Function Type.
 */
export type Predicate<T> = (item: T) => boolean;

/**
 * Generic Interface untuk kontrak repository penyimpanan.
 */
export interface IStorageService<T> {
  get(key: string): StorageResponse<T>;
  set(key: string, value: T): StorageResponse<T>;
  clear(key: string): StorageResponse<null>;
}
