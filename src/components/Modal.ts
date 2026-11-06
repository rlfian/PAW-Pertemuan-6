import type { CourseName, Task, TaskPriority } from '../types/task';

export function renderEditModal(task: Task | null): string {
  if (!task) {
    return `<div id="edit-modal-backdrop" class="modal-backdrop" aria-hidden="true"></div>`;
  }

  const courses: CourseName[] = [
    'Pengembangan Aplikasi Web',
    'Manajemen Basis Data',
    'Pengembangan Aplikasi Mobile',
    'Kecerdasan Buatan',
    'Jaringan Komputer',
    'Lainnya'
  ];

  const priorities: { value: TaskPriority; label: string }[] = [
    { value: 'tinggi', label: '🔴 Tinggi (Mendesak)' },
    { value: 'sedang', label: '🟡 Sedang (Normal)' },
    { value: 'rendah', label: '🟢 Rendah (Santai)' }
  ];

  return `
    <div id="edit-modal-backdrop" class="modal-backdrop is-open" role="dialog" aria-modal="true" aria-labelledby="modal-edit-title">
      <div class="modal-box">
        <div class="modal-header-row">
          <h3 id="modal-edit-title" class="modal-title">Sunting Tugas Kuliah</h3>
          <button id="modal-close-btn" class="modal-close-x" type="button" aria-label="Tutup modal">&times;</button>
        </div>

        <form id="edit-task-form">
          <input type="hidden" id="edit-task-id" value="${task.id}" />

          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label" for="edit-task-title">Judul Tugas *</label>
            <input 
              id="edit-task-title" 
              class="form-input" 
              type="text" 
              value="${escapeAttr(task.title)}" 
              required 
              maxlength="120"
            />
          </div>

          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label" for="edit-task-course">Mata Kuliah *</label>
            <select id="edit-task-course" class="form-select" required>
              ${courses.map(c => `<option value="${c}" ${task.course === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div class="form-group">
              <label class="form-label" for="edit-task-deadline">Tenggat Waktu *</label>
              <input id="edit-task-deadline" class="form-input" type="date" value="${task.deadline}" required />
            </div>

            <div class="form-group">
              <label class="form-label" for="edit-task-priority">Prioritas *</label>
              <select id="edit-task-priority" class="form-select" required>
                ${priorities.map(p => `<option value="${p.value}" ${task.priority === p.value ? 'selected' : ''}>${p.label}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label" for="edit-task-tags">Tag (Pisahkan Koma)</label>
            <input 
              id="edit-task-tags" 
              class="form-input" 
              type="text" 
              value="${escapeAttr(task.tags.join(', '))}" 
            />
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label" for="edit-task-notes">Catatan Tambahan</label>
            <textarea 
              id="edit-task-notes" 
              class="form-input" 
              rows="3" 
              placeholder="Catatan pengerjaan atau referensi..."
            >${escapeAttr(task.notes || '')}</textarea>
          </div>

          <div class="modal-btn-row">
            <button id="modal-cancel-btn" class="btn-card-action outline" type="button" style="padding: 8px 16px;">
              Batal
            </button>
            <button class="btn-card-action blue" type="submit" style="padding: 8px 18px;">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function escapeAttr(str: string): string {
  return str.replace(/"/g, '&quot;');
}
