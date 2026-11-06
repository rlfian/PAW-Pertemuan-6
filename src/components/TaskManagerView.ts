import type { Task, TaskFilterOptions } from '../types/task';
import { formatIndonesianDate, getDaysRemaining } from '../utils/helpers';

export function renderTaskManagerView(tasks: Task[], filter: TaskFilterOptions): string {
  const isStatusAll = filter.status === 'semua';
  const isStatusPending = filter.status === 'belum_selesai';
  const isStatusCompleted = filter.status === 'selesai';

  const cardsHtml = tasks.length === 0
    ? `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #ffffff; border-radius: 12px; border: 2px dashed #e2e8f0;">
        <div style="font-size: 2.5rem; margin-bottom: 10px;">📋</div>
        <h4 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">Tidak Ada Tugas Yang Cocok</h4>
        <p style="font-size: 0.85rem; color: #64748b;">Silakan ubah filter status atau kata kunci pencarian di atas.</p>
      </div>
    `
    : tasks.map(task => {
        const remaining = getDaysRemaining(task.deadline);
        let deadlineColor = '#64748b';
        let deadlineBg = '#f1f5f9';
        if (remaining.isOverdue) {
          deadlineColor = '#ef4444';
          deadlineBg = '#fef2f2';
        } else if (remaining.days <= 1) {
          deadlineColor = '#ea580c';
          deadlineBg = '#fff7ed';
        }

        return `
          <article class="task-item-card ${task.isCompleted ? 'is-completed' : ''}" data-id="${task.id}">
            <!-- Topbar -->
            <div class="task-card-topbar">
              <span class="sks-pill" style="font-size:0.72rem;">${task.course}</span>
              <span class="presensi-pill ${task.priority === 'tinggi' ? 'red' : task.priority === 'sedang' ? 'yellow' : 'green'}" 
                    style="${task.priority === 'tinggi' ? 'background:#fef2f2; color:#ef4444;' : task.priority === 'sedang' ? 'background:#fffbeb; color:#d97706;' : 'background:#ecfdf5; color:#059669;'}">
                ${task.priority === 'tinggi' ? '🔥 Tinggi' : task.priority === 'sedang' ? '⚡ Sedang' : '🌱 Rendah'}
              </span>
            </div>

            <!-- Body -->
            <div class="task-card-body">
              <h3 class="task-card-title">${escapeHtml(task.title)}</h3>
              
              <div class="task-deadline-badge" style="color:${deadlineColor};">
                <span style="background:${deadlineBg}; padding:2px 8px; border-radius:6px; font-weight:700;">
                  📅 ${formatIndonesianDate(task.deadline)} (${remaining.label})
                </span>
              </div>

              ${task.tags && task.tags.length > 0 ? `
                <div class="task-tags-wrap">
                  ${task.tags.map(t => `<span class="task-tag">#${escapeHtml(t)}</span>`).join('')}
                </div>
              ` : ''}

              ${task.notes ? `
                <p style="font-size:0.78rem; color:#64748b; background:#f8fafc; padding:8px 10px; border-radius:6px; border-left:3px solid var(--color-primary); margin-top:2px;">
                  ${escapeHtml(task.notes)}
                </p>
              ` : ''}
            </div>

            <!-- Footer & Actions -->
            <div class="task-card-footer">
              <label class="toggle-label">
                <input 
                  type="checkbox" 
                  class="todo-checkbox" 
                  data-action="toggle-status" 
                  data-id="${task.id}"
                  ${task.isCompleted ? 'checked' : ''}
                />
                <span style="color:${task.isCompleted ? '#059669' : '#0f172a'};">
                  ${task.isCompleted ? '✔ Selesai' : '⏳ Belum Selesai'}
                </span>
              </label>

              <div class="card-actions-row">
                <button 
                  class="btn-icon-action" 
                  type="button" 
                  data-action="edit-task" 
                  data-id="${task.id}"
                  title="Sunting Tugas"
                  aria-label="Sunting"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </button>
                <button 
                  class="btn-icon-action delete" 
                  type="button" 
                  data-action="delete-task" 
                  data-id="${task.id}"
                  title="Hapus Tugas"
                  aria-label="Hapus"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
          </article>
        `;
      }).join('');

  return `
    <div class="taskflow-manager-card" style="margin-top: 24px;">
      <!-- Manager Header -->
      <div class="manager-header-row">
        <div class="manager-title-col">
          <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:var(--color-primary); letter-spacing:0.05em; margin-bottom:2px;">
            Portal Akademik • Modul Penugasan
          </div>
          <h2 class="manager-title">Kelola Daftar Tugas Kuliah (TaskFlow PAW)</h2>
          <p class="manager-desc">
            Manajemen tugas akademik terpadu dengan sistem tipe data TypeScript ketat, sinkronisasi LocalStorage, dan pelacakan tenggat waktu.
          </p>
        </div>
      </div>

      <!-- Form Tambah Tugas Baru -->
      <form id="add-task-form" class="educore-form-grid">
        <div class="form-group" style="grid-column: span 2;">
          <label class="form-label" for="task-title-input">Judul Tugas Kuliah *</label>
          <input 
            id="task-title-input" 
            class="form-input" 
            type="text" 
            placeholder="Contoh: Tugas Praktikum 6: Git, npm, TypeScript, dan Vite" 
            required 
            maxlength="120"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="task-course-select">Mata Kuliah *</label>
          <select id="task-course-select" class="form-select" required>
            <option value="Pengembangan Aplikasi Web">Pemrograman Aplikasi Web</option>
            <option value="Manajemen Basis Data">Basis Data Lanjut</option>
            <option value="Pengembangan Aplikasi Mobile">Pengembangan Aplikasi Mobile</option>
            <option value="Kecerdasan Buatan">Kecerdasan Buatan (AI)</option>
            <option value="Jaringan Komputer">Jaringan Komputer</option>
            <option value="Rekayasa Perangkat Lunak">Rekayasa Perangkat Lunak</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="task-deadline-input">Tenggat Waktu *</label>
          <input id="task-deadline-input" class="form-input" type="date" required />
        </div>

        <div class="form-group">
          <label class="form-label" for="task-priority-select">Prioritas *</label>
          <select id="task-priority-select" class="form-select" required>
            <option value="tinggi">🔴 Tinggi (Mendesak)</option>
            <option value="sedang" selected>🟡 Sedang (Normal)</option>
            <option value="rendah">🟢 Rendah (Santai)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="task-tags-input">Tag Kategori (Pisahkan Koma)</label>
          <input 
            id="task-tags-input" 
            class="form-input" 
            type="text" 
            placeholder="Praktikum, Laporan, Individu" 
          />
        </div>

        <div class="form-group">
          <button class="btn-hero-primary" type="submit" style="height: 40px; width: 100%;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Simpan Tugas
          </button>
        </div>
      </form>

      <!-- Task Controls Filter Bar -->
      <div class="task-controls-bar">
        <div class="filter-pills-wrap">
          <button class="filter-pill-btn ${isStatusAll ? 'active' : ''}" type="button" data-filter-status="semua">
            Semua (${tasks.length})
          </button>
          <button class="filter-pill-btn ${isStatusPending ? 'active' : ''}" type="button" data-filter-status="belum_selesai">
            Belum Selesai
          </button>
          <button class="filter-pill-btn ${isStatusCompleted ? 'active' : ''}" type="button" data-filter-status="selesai">
            Selesai
          </button>
        </div>

        <div style="display:flex; align-items:center; gap:10px;">
          <!-- Search Input -->
          <div class="subtab-search" style="min-width:200px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              id="filter-search-input" 
              type="text" 
              placeholder="Cari judul tugas / tag..." 
              value="${escapeHtml(filter.searchQuery)}"
            />
          </div>

          <!-- Sort Select -->
          <select id="filter-sort-select" class="form-select" style="width: auto; padding: 7px 12px; font-size: 0.82rem;">
            <option value="createdAt" ${filter.sortBy === 'createdAt' ? 'selected' : ''}>Urut: Terbaru</option>
            <option value="deadline" ${filter.sortBy === 'deadline' ? 'selected' : ''}>Urut: Deadline</option>
            <option value="priority" ${filter.sortBy === 'priority' ? 'selected' : ''}>Urut: Prioritas</option>
          </select>
        </div>
      </div>

      <!-- Tasks Grid -->
      <div class="tasks-grid" id="tasks-container">
        ${cardsHtml}
      </div>
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
