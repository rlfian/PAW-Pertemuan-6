import confetti from 'canvas-confetti';
import { renderCourseDetailView } from './components/CourseDetailView';
import { renderDashboardView } from './components/DashboardView';
import { renderDocumentationView } from './components/DocumentationView';
import { renderFooter } from './components/Footer';
import type { HeaderStats } from './components/Header';
import { renderEditModal } from './components/Modal';
import { renderNavbar, type NavTab } from './components/Navbar';
import { renderTaskManagerView } from './components/TaskManagerView';
import { getAppConfig } from './services/env';
import { TASK_STORAGE_KEY, taskStorage } from './services/storage';
import type { CourseName, FilterStatus, Task, TaskFilterOptions, TaskPriority } from './types/task';
import { cloneData, filterItems, generateId, sortTasks } from './utils/helpers';

class EduCoreApp {
  private tasks: Task[] = [];
  private filter: TaskFilterOptions = {
    status: 'semua',
    course: 'semua',
    searchQuery: '',
    sortBy: 'createdAt'
  };
  private activeTab: NavTab = 'dashboard';
  private editingTask: Task | null = null;
  private readonly appConfig = getAppConfig();

  constructor() {
    this.init();
  }

  private init(): void {
    // 1. Muat data dari Generic LocalStorage Service
    const storageResult = taskStorage.get(TASK_STORAGE_KEY);
    this.tasks = storageResult.data || [];

    // 2. Render awal
    this.render();
  }

  private calculateStats(): HeaderStats {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.isCompleted).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, pending, completed, completionRate };
  }

  private getFilteredTasks(): Task[] {
    const filtered = filterItems(this.tasks, (task: Task) => {
      // Filter Status
      if (this.filter.status === 'belum_selesai' && task.isCompleted) return false;
      if (this.filter.status === 'selesai' && !task.isCompleted) return false;

      // Filter Pencarian
      if (this.filter.searchQuery.trim() !== '') {
        const query = this.filter.searchQuery.toLowerCase();
        const titleMatch = task.title.toLowerCase().includes(query);
        const courseMatch = task.course.toLowerCase().includes(query);
        const tagsMatch = task.tags.some(tag => tag.toLowerCase().includes(query));
        if (!titleMatch && !courseMatch && !tagsMatch) return false;
      }

      return true;
    });

    return sortTasks(filtered, this.filter.sortBy);
  }

  private saveToStorage(): void {
    taskStorage.set(TASK_STORAGE_KEY, this.tasks);
  }

  private render(): void {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const stats = this.calculateStats();
    const filteredTasks = this.getFilteredTasks();

    let contentHtml = '';
    if (this.activeTab === 'dashboard') {
      contentHtml = `<div class="container">${renderDashboardView(this.appConfig, stats, this.tasks)}</div>`;
    } else if (this.activeTab === 'course-detail') {
      contentHtml = `<div class="container">${renderCourseDetailView(this.appConfig, stats, this.tasks)}</div>`;
    } else if (this.activeTab === 'tasks') {
      contentHtml = `<div class="container">${renderTaskManagerView(filteredTasks, this.filter)}</div>`;
    } else if (this.activeTab === 'docs') {
      contentHtml = `<div class="container">${renderDocumentationView()}</div>`;
    }

    appEl.innerHTML = `
      ${renderNavbar(this.appConfig, this.activeTab)}
      <main id="main-content">
        ${contentHtml}
      </main>
      ${renderFooter(this.appConfig)}
      <div id="modal-container">${renderEditModal(this.editingTask)}</div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    // 1. Delegasi Navigasi Tab (Navbar, Cards, Buttons dengan data-nav)
    document.querySelectorAll<HTMLElement>('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetNav = el.getAttribute('data-nav') as NavTab;
        if (targetNav) {
          this.activeTab = targetNav;
          this.render();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    // 2. Klik Brand Logo kembali ke Dashboard
    const brandHome = document.getElementById('nav-brand-home');
    brandHome?.addEventListener('click', () => {
      this.activeTab = 'dashboard';
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. Tombol Presensi di Hero Card
    const btnHeroAttendance = document.getElementById('btn-hero-attendance');
    btnHeroAttendance?.addEventListener('click', () => {
      alert('Presensi perkuliahan berhasil dicatat! Status: Hadir Tepat Waktu (08:02 WIB).');
    });

    // 4. Pencarian Kursus di Dashboard
    const dashboardSearch = document.getElementById('dashboard-course-search') as HTMLInputElement | null;
    dashboardSearch?.addEventListener('input', (e) => {
      const q = (e.target as HTMLInputElement).value.toLowerCase();
      document.querySelectorAll<HTMLElement>('.course-card').forEach(card => {
        const title = card.querySelector('.course-card-title')?.textContent?.toLowerCase() || '';
        const lecturer = card.querySelector('.course-card-lecturer')?.textContent?.toLowerCase() || '';
        if (title.includes(q) || lecturer.includes(q)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });

    // 5. Form Tambah Tugas Baru (di view tasks)
    const addForm = document.getElementById('add-task-form') as HTMLFormElement | null;
    addForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddTask();
    });

    // 6. Filter Pills (Semua, Belum Selesai, Selesai)
    document.querySelectorAll<HTMLButtonElement>('[data-filter-status]').forEach(pill => {
      pill.addEventListener('click', () => {
        const status = pill.getAttribute('data-filter-status') as FilterStatus;
        if (status) {
          this.filter.status = status;
          this.render();
        }
      });
    });

    // 7. Input Search Tugas
    const searchInput = document.getElementById('filter-search-input') as HTMLInputElement | null;
    searchInput?.addEventListener('input', (e) => {
      this.filter.searchQuery = (e.target as HTMLInputElement).value;
      this.render();
      const reSearch = document.getElementById('filter-search-input') as HTMLInputElement | null;
      if (reSearch) {
        reSearch.focus();
        reSearch.setSelectionRange(reSearch.value.length, reSearch.value.length);
      }
    });

    // 8. Sort Dropdown
    const sortSelect = document.getElementById('filter-sort-select') as HTMLSelectElement | null;
    sortSelect?.addEventListener('change', (e) => {
      this.filter.sortBy = (e.target as HTMLSelectElement).value as 'deadline' | 'priority' | 'createdAt';
      this.render();
    });

    // 9. Delegasi Global Aksi Tugas (Toggle Status, Edit, Delete)
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      // Toggle status checkbox
      const checkbox = target.closest<HTMLInputElement>('input[data-action="toggle-status"]');
      if (checkbox) {
        const id = checkbox.getAttribute('data-id');
        if (id) {
          this.handleToggleStatus(id);
        }
        return;
      }

      // Edit task
      const editBtn = target.closest<HTMLButtonElement>('button[data-action="edit-task"]');
      if (editBtn) {
        const id = editBtn.getAttribute('data-id');
        if (id) {
          this.handleOpenEditModal(id);
        }
        return;
      }

      // Delete task
      const deleteBtn = target.closest<HTMLButtonElement>('button[data-action="delete-task"]');
      if (deleteBtn) {
        const id = deleteBtn.getAttribute('data-id');
        if (id) {
          this.handleDeleteTask(id);
        }
        return;
      }
    }, { once: false });

    // 10. Modal Listeners
    this.attachModalListeners();
  }

  private handleAddTask(): void {
    const titleInput = document.getElementById('task-title-input') as HTMLInputElement | null;
    const courseSelect = document.getElementById('task-course-select') as HTMLSelectElement | null;
    const deadlineInput = document.getElementById('task-deadline-input') as HTMLInputElement | null;
    const prioritySelect = document.getElementById('task-priority-select') as HTMLSelectElement | null;
    const tagsInput = document.getElementById('task-tags-input') as HTMLInputElement | null;

    if (!titleInput || !courseSelect || !deadlineInput || !prioritySelect) return;

    const title = titleInput.value.trim();
    const course = courseSelect.value as CourseName;
    const deadline = deadlineInput.value;
    const priority = prioritySelect.value as TaskPriority;
    const tags = tagsInput && tagsInput.value.trim() !== ''
      ? tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
      : [course];

    if (!title || !deadline) return;

    const newTask: Task = {
      id: generateId('task'),
      title,
      course,
      deadline,
      priority,
      status: 'belum_selesai',
      isCompleted: false,
      tags,
      createdAt: Date.now()
    };

    this.tasks.unshift(newTask);
    this.saveToStorage();
    this.render();
  }

  private handleToggleStatus(id: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    task.isCompleted = !task.isCompleted;
    task.status = task.isCompleted ? 'selesai' : 'belum_selesai';

    if (task.isCompleted) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback jika browser memblokir animasi
      }
    }

    this.saveToStorage();
    this.render();
  }

  private handleDeleteTask(id: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    const confirmed = window.confirm(`Apakah Anda yakin ingin menghapus tugas "${task.title}"?`);
    if (confirmed) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.saveToStorage();
      this.render();
    }
  }

  private handleOpenEditModal(id: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    this.editingTask = cloneData(task);
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.innerHTML = renderEditModal(this.editingTask);
      this.attachModalListeners();
    }
  }

  private attachModalListeners(): void {
    const closeBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const modalBackdrop = document.getElementById('edit-modal-backdrop');
    const editForm = document.getElementById('edit-task-form') as HTMLFormElement | null;

    const closeModal = () => {
      this.editingTask = null;
      if (modalBackdrop) {
        modalBackdrop.classList.remove('is-open');
        modalBackdrop.innerHTML = '';
      }
    };

    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);

    modalBackdrop?.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    editForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const idInput = document.getElementById('edit-task-id') as HTMLInputElement | null;
      const titleInput = document.getElementById('edit-task-title') as HTMLInputElement | null;
      const courseSelect = document.getElementById('edit-task-course') as HTMLSelectElement | null;
      const deadlineInput = document.getElementById('edit-task-deadline') as HTMLInputElement | null;
      const prioritySelect = document.getElementById('edit-task-priority') as HTMLSelectElement | null;
      const tagsInput = document.getElementById('edit-task-tags') as HTMLInputElement | null;
      const notesInput = document.getElementById('edit-task-notes') as HTMLTextAreaElement | null;

      if (!idInput || !titleInput || !courseSelect || !deadlineInput || !prioritySelect) return;

      const task = this.tasks.find(t => t.id === idInput.value);
      if (task) {
        task.title = titleInput.value.trim();
        task.course = courseSelect.value;
        task.deadline = deadlineInput.value;
        task.priority = prioritySelect.value as TaskPriority;
        task.tags = tagsInput ? tagsInput.value.split(',').map(t => t.trim()).filter(Boolean) : [];
        task.notes = notesInput ? notesInput.value.trim() : undefined;

        this.saveToStorage();
        closeModal();
        this.render();
      }
    });
  }
}

// Inisialisasi saat DOM Siap
document.addEventListener('DOMContentLoaded', () => {
  new EduCoreApp();
});
