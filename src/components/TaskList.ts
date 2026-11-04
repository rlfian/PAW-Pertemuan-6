import type { Task, TaskFilterOptions } from '../types/task';
import { formatIndonesianDate, getDaysRemaining } from '../utils/helpers';

export function renderTaskList(tasks: Task[], filter: TaskFilterOptions): string {
  const isStatusAll = filter.status === 'semua';
  const isStatusPending = filter.status === 'belum_selesai';
  const isStatusCompleted = filter.status === 'selesai';

  const cardsHtml = tasks.length === 0 
    ? `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="2" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="9" y1="16" x2="13" y2="16" />
        </svg>
        <h3 class="empty-state-title">Tidak Ada Tugas yang Cocok</h3>
        <p class="empty-state-desc">Coba sesuaikan kata kunci pencarian atau ubah filter status di atas.</p>
      </div>
    `
    : tasks.map(task => {
        const remaining = getDaysRemaining(task.deadline);
        let deadlineClass = '';
        if (remaining.isOverdue) deadlineClass = 'overdue';
        else if (remaining.days <= 1) deadlineClass = 'today';

        return `
          <article class="task-card ${task.isCompleted ? 'is-completed' : ''}" data-id="${task.id}">
            <!-- Card Header -->
            <div class="task-card-header">
              <span class="course-badge">${task.course}</span>
              <span class="priority-pill ${task.priority}">
                ${task.priority === 'tinggi' ? '🔥 Tinggi' : task.priority === 'sedang' ? '⚡ Sedang' : '🌱 Rendah'}
              </span>
            </div>

            <!-- Card Body -->
            <div class="task-card-body">
              <h3 class="task-card-title">${escapeHtml(task.title)}</h3>
              
              <div class="task-meta-row">
                <span class="deadline-indicator ${deadlineClass}" title="Tenggat Waktu">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  ${formatIndonesianDate(task.deadline)} (${remaining.label})
                </span>
              </div>

              ${task.tags && task.tags.length > 0 ? `
                <div class="task-tags-row">
                  ${task.tags.map(tag => `<span class="tag-badge">#${escapeHtml(tag)}</span>`).join('')}
                </div>
              ` : ''}

              ${task.notes ? `
                <p class="task-notes">${escapeHtml(task.notes)}</p>
              ` : ''}
            </div>

            <!-- Card Footer & Actions -->
            <div class="task-card-footer">
              <label class="status-toggle-label">
                <input 
                  type="checkbox" 
                  class="status-toggle-checkbox" 
                  data-action="toggle-status" 
                  data-id="${task.id}"
                  ${task.isCompleted ? 'checked' : ''}
                />
                <span>${task.isCompleted ? '✅ Selesai' : '⏳ Belum Selesai'}</span>
              </label>

              <div class="task-action-btns">
                <button 
                  class="action-btn edit" 
                  type="button" 
                  data-action="edit-task" 
                  data-id="${task.id}"
                  title="Sunting Tugas"
                  aria-label="Sunting tugas"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </button>
                <button 
                  class="action-btn delete" 
                  type="button" 
                  data-action="delete-task" 
                  data-id="${task.id}"
                  title="Hapus Tugas"
                  aria-label="Hapus tugas"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        `;
      }).join('');

  return `
    <div class="container">
      <!-- Section Header with Filter Controls -->
      <section class="section-header">
        <div class="section-title-wrap">
          <span class="section-eyebrow">Manajemen Tugas Akademik</span>
          <h2 class="section-title">Daftar Tugas Kuliah</h2>
        </div>

        <div class="filter-bar">
          <!-- Status Filter Pills -->
          <button class="filter-pill ${isStatusAll ? 'active' : ''}" type="button" data-filter-status="semua">
            Semua (${tasks.length})
          </button>
          <button class="filter-pill ${isStatusPending ? 'active' : ''}" type="button" data-filter-status="belum_selesai">
            Belum Selesai
          </button>
          <button class="filter-pill ${isStatusCompleted ? 'active' : ''}" type="button" data-filter-status="selesai">
            Selesai
          </button>

          <!-- Search Input -->
          <div class="search-input-wrap">
            <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input 
              id="filter-search-input" 
              type="text" 
              placeholder="Cari tugas atau tag..." 
              value="${escapeHtml(filter.searchQuery)}"
            />
          </div>

          <!-- Sort Dropdown -->
          <select id="filter-sort-select" class="form-select" style="width: auto; padding: 7px 12px; font-size: 0.84rem;">
            <option value="createdAt" ${filter.sortBy === 'createdAt' ? 'selected' : ''}>Urut: Terbaru</option>
            <option value="deadline" ${filter.sortBy === 'deadline' ? 'selected' : ''}>Urut: Deadline Terdekat</option>
            <option value="priority" ${filter.sortBy === 'priority' ? 'selected' : ''}>Urut: Prioritas Tertinggi</option>
          </select>
        </div>
      </section>

      <!-- Task Cards Grid -->
      <section class="tasks-grid" id="tasks-container">
        ${cardsHtml}
      </section>
    </div>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
