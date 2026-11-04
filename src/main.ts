import confetti from 'canvas-confetti';
import { renderDocumentation } from './components/Documentation';
import { renderFooter } from './components/Footer';
import { renderHeader, type HeaderStats } from './components/Header';
import { renderEditModal } from './components/Modal';
import { renderTaskList } from './components/TaskList';
import { getAppConfig } from './services/env';
import { TASK_STORAGE_KEY, taskStorage } from './services/storage';
import type { CourseName, FilterStatus, Task, TaskFilterOptions, TaskPriority } from './types/task';
import { cloneData, filterItems, generateId, sortTasks } from './utils/helpers';

// State Aplikasi
class TaskFlowApp {
  private tasks: Task[] = [];
  private filter: TaskFilterOptions = {
    status: 'semua',
    course: 'semua',
    searchQuery: '',
    sortBy: 'createdAt'
  };
  private activeTab: 'tasks' | 'docs' = 'tasks';
  private editingTask: Task | null = null;
  private readonly appConfig = getAppConfig();

  constructor() {
    this.init();
  }

  private init(): void {
    // Muat data dari Generic LocalStorage Service
    const storageResult = taskStorage.get(TASK_STORAGE_KEY);
    this.tasks = storageResult.data || [];

    // Render awal
    this.render();
  }

  private calculateStats(): HeaderStats {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.isCompleted).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, pending, completed, completionRate };
  }

  /**
   * Menggunakan Generic Filter function untuk menyaring data tugas
   */
  private getFilteredTasks(): Task[] {
    // 1. Generic Filter berdasarkan status dan kata kunci
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

    // 2. Sorting
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

    appEl.innerHTML = `
      ${renderHeader(this.appConfig, stats, this.activeTab)}
      <main id="main-content">
        ${this.activeTab === 'tasks' ? renderTaskList(filteredTasks, this.filter) : renderDocumentation()}
      </main>
      ${renderFooter(this.appConfig)}
      <div id="modal-container">${renderEditModal(this.editingTask)}</div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    // Navigasi Tab (Daftar Tugas vs Panduan Materi)
    const navTasks = document.getElementById('nav-btn-tasks');
    const navDocs = document.getElementById('nav-btn-docs');
    const tabNewTask = document.getElementById('tab-new-task');
    const tabGotoGuide = document.getElementById('tab-goto-guide');

    navTasks?.addEventListener('click', () => {
      this.activeTab = 'tasks';
      this.render();
    });

    navDocs?.addEventListener('click', () => {
      this.activeTab = 'docs';
      this.render();
    });

    tabNewTask?.addEventListener('click', () => {
      this.activeTab = 'tasks';
      this.render();
      document.getElementById('task-title-input')?.focus();
    });

    tabGotoGuide?.addEventListener('click', () => {
      this.activeTab = 'docs';
      this.render();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });

    // Form Tambah Tugas
    const addForm = document.getElementById('add-task-form') as HTMLFormElement | null;
    addForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddTask();
    });

    // Filter Status Pills
    const filterPills = document.querySelectorAll<HTMLButtonElement>('[data-filter-status]');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const status = pill.getAttribute('data-filter-status') as FilterStatus;
        if (status) {
          this.filter.status = status;
          this.render();
        }
      });
    });

    // Filter Search Input
    const searchInput = document.getElementById('filter-search-input') as HTMLInputElement | null;
    searchInput?.addEventListener('input', (e) => {
      this.filter.searchQuery = (e.target as HTMLInputElement).value;
      this.render();
      // Keep cursor position
      const reSearch = document.getElementById('filter-search-input') as HTMLInputElement | null;
      if (reSearch) {
        reSearch.focus();
        reSearch.setSelectionRange(reSearch.value.length, reSearch.value.length);
      }
    });

    // Sort Dropdown
    const sortSelect = document.getElementById('filter-sort-select') as HTMLSelectElement | null;
    sortSelect?.addEventListener('change', (e) => {
      this.filter.sortBy = (e.target as HTMLSelectElement).value as 'deadline' | 'priority' | 'createdAt';
      this.render();
    });

    // Delegasi Event untuk Aksi Tugas (Toggle Status, Edit, Delete)
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      // 1. Toggle Status Checkbox
      const checkbox = target.closest<HTMLInputElement>('input[data-action="toggle-status"]');
      if (checkbox) {
        const id = checkbox.getAttribute('data-id');
        if (id) this.handleToggleStatus(id);
        return;
      }

      // 2. Edit Task Button
      const editBtn = target.closest<HTMLButtonElement>('button[data-action="edit-task"]');
      if (editBtn) {
        const id = editBtn.getAttribute('data-id');
        if (id) this.handleOpenEditModal(id);
        return;
      }

      // 3. Delete Task Button
      const deleteBtn = target.closest<HTMLButtonElement>('button[data-action="delete-task"]');
      if (deleteBtn) {
        const id = deleteBtn.getAttribute('data-id');
        if (id) this.handleDeleteTask(id);
        return;
      }
    });

    // Event Modal
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

    // Tambahkan ke array dan simpan
    this.tasks.unshift(newTask);
    this.saveToStorage();
    this.render();
  }

  private handleToggleStatus(id: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    task.isCompleted = !task.isCompleted;
    task.status = task.isCompleted ? 'selesai' : 'belum_selesai';

    // Efek perayaan konfeti jika tugas selesai
    if (task.isCompleted) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // Fallback jika browser menolak animasi
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

// Inisialisasi Aplikasi Saat DOM Siap
document.addEventListener('DOMContentLoaded', () => {
  new TaskFlowApp();
});
