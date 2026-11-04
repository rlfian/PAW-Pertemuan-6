import type { AppConfig } from '../services/env';

export interface HeaderStats {
  total: number;
  pending: number;
  completed: number;
  completionRate: number;
}

export function renderHeader(config: AppConfig, stats: HeaderStats, activeTab: 'tasks' | 'docs'): string {
  const isTasks = activeTab === 'tasks';
  const isDocs = activeTab === 'docs';

  return `
    <header class="hero-wrapper">
      <div class="hero-bg-shapes" aria-hidden="true">
        <!-- SVG Geometric Origami & Paper Plane Vector Motif -->
        <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="120,40 380,80 260,280" fill="#ffffff" opacity="0.35"/>
          <polygon points="260,280 380,80 440,240" fill="#ffffff" opacity="0.2"/>
          <polygon points="40,160 120,40 260,280" fill="#ffffff" opacity="0.15"/>
          <!-- Origami Paper Plane Path -->
          <path d="M420 60 L240 180 L300 210 Z" fill="#ffffff" opacity="0.6"/>
          <path d="M420 60 L300 210 L380 200 Z" fill="#ffffff" opacity="0.8"/>
        </svg>
      </div>

      <div class="container">
        <!-- Navigation Bar -->
        <nav class="navbar">
          <div class="brand-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 2L11 13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            <div>
              <span>TASKFLOW PAW</span>
              <span class="brand-subtitle">Praktikum PAW • Pertemuan 6</span>
            </div>
          </div>

          <div class="nav-links">
            <button class="nav-link-btn ${isTasks ? 'active' : ''}" id="nav-btn-tasks" type="button">
              Daftar Tugas
            </button>
            <button class="nav-link-btn ${isDocs ? 'active' : ''}" id="nav-btn-docs" type="button">
              Panduan Materi Kuliah
            </button>
          </div>

          <div class="user-badge" title="Identitas Mahasiswa Pengembang">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>${config.studentName} (${config.studentNim})</span>
          </div>
        </nav>

        <!-- Hero Content Text -->
        <div class="hero-content">
          <h1 class="hero-title">MANAJEMEN TUGAS KULIAH</h1>
          <p class="hero-tagline">Rapi, Terstruktur, Tuntas Tepat Waktu.</p>
          <p class="hero-description">
            Aplikasi web terintegrasi berbasis <strong>TypeScript</strong> dan <strong>Vite</strong> untuk memenuhi tugas praktikum pertemuan ke-6 mata kuliah <strong>${config.courseName}</strong>. Dilengkapi alur Git profesional dan sistem tipe data aman.
          </p>
        </div>
      </div>
    </header>

    <!-- Floating Form Card & 4 Stat Cards -->
    <div class="container">
      <section class="floating-control-card" aria-label="Form Tambah Tugas">
        <!-- Top Notch Tabs (Inspired by Travel Flight Search Tabs) -->
        <div class="notch-tabs">
          <button class="notch-tab-btn active" type="button" id="tab-new-task">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Tambah Tugas Baru
          </button>
          <button class="notch-tab-btn" type="button" id="tab-goto-guide">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Materi & Konsep PAW
          </button>
        </div>

        <!-- Form Card Container -->
        <div class="form-card-container">
          <form id="add-task-form" class="form-grid">
            <div class="form-group" style="grid-column: span 2;">
              <label class="form-label" for="task-title-input">Judul Tugas Kuliah *</label>
              <input 
                id="task-title-input" 
                class="form-input" 
                type="text" 
                placeholder="Contoh: Modul 2 Praktikum Android RecyclerView" 
                required 
                maxlength="120"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="task-course-select">Mata Kuliah *</label>
              <select id="task-course-select" class="form-select" required>
                <option value="Pengembangan Aplikasi Web">Pengembangan Aplikasi Web</option>
                <option value="Manajemen Basis Data">Manajemen Basis Data</option>
                <option value="Pengembangan Aplikasi Mobile">Pengembangan Aplikasi Mobile</option>
                <option value="Kecerdasan Buatan">Kecerdasan Buatan</option>
                <option value="Jaringan Komputer">Jaringan Komputer</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="task-deadline-input">Tenggat Waktu (Deadline) *</label>
              <input id="task-deadline-input" class="form-input" type="date" required />
            </div>

            <div class="form-group">
              <label class="form-label" for="task-priority-select">Prioritas Pengerjaan *</label>
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
              <button class="btn-primary" type="submit" style="width: 100%; height: 46px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Simpan Tugas
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- 4 Stat Summary Cards (Matching Reference White Cards) -->
      <section class="stats-grid" aria-label="Ringkasan Statistik Tugas">
        <div class="stat-card">
          <div class="stat-icon-wrapper" style="background: #e0f2fe; color: #0284c7;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-number" id="stat-total">${stats.total}</span>
            <span class="stat-label">Total Tugas Kuliah</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper" style="background: #fffbeb; color: #f59e0b;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-number" id="stat-pending" style="color: #d97706;">${stats.pending}</span>
            <span class="stat-label">Belum Selesai (Aktif)</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper" style="background: #ecfdf5; color: #10b981;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-number" id="stat-completed" style="color: #059669;">${stats.completed}</span>
            <span class="stat-label">Telah Diselesaikan</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper" style="background: #f5f3ff; color: #8b5cf6;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 20V10" />
              <path d="M12 20V4" />
              <path d="M6 20v-6" />
            </svg>
          </div>
          <div class="stat-content">
            <span class="stat-number" id="stat-rate" style="color: #7c3aed;">${stats.completionRate}%</span>
            <span class="stat-label">Progres Penyelesaian</span>
          </div>
        </div>
      </section>
    </div>
  `;
}
