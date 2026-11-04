import type { Predicate, Task, TaskPriority } from '../types/task';

/**
 * Generic Filter Function:
 * Menyaring elemen array bertipe T berdasarkan fungsi predikat yang diberikan.
 * Contoh implementasi Generic sederhana pada TypeScript.
 */
export function filterItems<T>(items: T[], predicate: Predicate<T>): T[] {
  const result: T[] = [];
  for (const item of items) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}

/**
 * Generic Search Function:
 * Mencari elemen dalam array bertipe T.
 */
export function findItem<T>(items: T[], predicate: Predicate<T>): T | undefined {
  for (const item of items) {
    if (predicate(item)) {
      return item;
    }
  }
  return undefined;
}

/**
 * Generic Deep Clone sederhana memanfaatkan JSON serialization.
 */
export function cloneData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

/**
 * Generator ID acak berbasis timestamp dan karakter heksadesimal.
 */
export function generateId(prefix: string = 'task'): string {
  const randomPart = Math.random().toString(36).substring(2, 9);
  return `${prefix}_${Date.now()}_${randomPart}`;
}

/**
 * Format tanggal dari string ISO YYYY-MM-DD ke format lokal Indonesia yang ramah dibaca.
 */
export function formatIndonesianDate(dateStr: string): string {
  if (!dateStr) return '-';
  try {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);

    return date.toLocaleDateString('id-ID', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

/**
 * Hitung selisih hari dari hari ini ke tanggal deadline.
 */
export function getDaysRemaining(deadlineStr: string): { days: number; label: string; isOverdue: boolean } {
  if (!deadlineStr) return { days: 0, label: 'Tanpa deadline', isOverdue: false };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parts = deadlineStr.split('-');
  const deadline = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  deadline.setHours(0, 0, 0, 0);

  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { days: diffDays, label: `Terlambat ${Math.abs(diffDays)} hari`, isOverdue: true };
  } else if (diffDays === 0) {
    return { days: 0, label: 'Hari ini!', isOverdue: false };
  } else if (diffDays === 1) {
    return { days: 1, label: 'Besok', isOverdue: false };
  } else {
    return { days: diffDays, label: `${diffDays} hari lagi`, isOverdue: false };
  }
}

/**
 * Konversi prioritas ke bobot numerik untuk keperluan sorting.
 */
export function getPriorityWeight(priority: TaskPriority): number {
  switch (priority) {
    case 'tinggi': return 3;
    case 'sedang': return 2;
    case 'rendah': return 1;
    default: return 0;
  }
}

/**
 * Mengurutkan array Task berdasarkan kriteria.
 */
export function sortTasks(tasks: Task[], sortBy: 'deadline' | 'priority' | 'createdAt'): Task[] {
  const cloned = [...tasks];
  return cloned.sort((a, b) => {
    if (sortBy === 'priority') {
      return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
    }
    if (sortBy === 'deadline') {
      return a.deadline.localeCompare(b.deadline);
    }
    // Default: createdAt descending (terbaru di atas)
    return b.createdAt - a.createdAt;
  });
}
