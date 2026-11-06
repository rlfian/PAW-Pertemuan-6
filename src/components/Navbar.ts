import type { AppConfig } from '../services/env';

export type NavTab = 'dashboard' | 'course-detail' | 'tasks' | 'schedule' | 'docs';

export function renderNavbar(config: AppConfig, activeTab: NavTab): string {
  return `
    <!-- 1. Institutional Topbar (UIN Sunan Gunung Djati Bandung) -->
    <div class="institution-topbar">
      <div class="container topbar-content">
        <div class="topbar-left">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 21h18"/>
            <path d="M9 8h1"/>
            <path d="M9 12h1"/>
            <path d="M9 16h1"/>
            <path d="M14 8h1"/>
            <path d="M14 12h1"/>
            <path d="M14 16h1"/>
            <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
          </svg>
          <span>UIN Sunan Gunung Djati Bandung</span>
        </div>
        <div class="topbar-right">
          <span>📅 Pekan Perkuliahan Ke-9</span>
          <span class="topbar-pill">Semester Ganjil 2024/2025</span>
          <a href="#helpdesk" style="display: flex; align-items: center; gap: 4px; color: #cbd5e1;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Bantuan IT
          </a>
        </div>
      </div>
    </div>

    <!-- 2. Main EduCore LMS Navbar -->
    <header class="lms-navbar">
      <div class="container navbar-content">
        <!-- Logo -->
        <div class="brand-wrapper" id="nav-brand-home" title="Kembali ke Dashboard">
          <div class="brand-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div class="brand-text-col">
            <div class="brand-title">
              EduCore LMS
              <span class="brand-badge">PORTAL</span>
            </div>
            <span class="brand-subtitle">Portal Akademik Mahasiswa • UIN SGD</span>
          </div>
        </div>

        <!-- Center Menu Links -->
        <nav class="nav-menu">
          <button class="nav-item-btn ${activeTab === 'dashboard' ? 'active' : ''}" type="button" data-nav="dashboard">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </button>
          <button class="nav-item-btn ${activeTab === 'course-detail' ? 'active' : ''}" type="button" data-nav="course-detail">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Mata Kuliah
          </button>
          <button class="nav-item-btn ${activeTab === 'tasks' ? 'active' : ''}" type="button" data-nav="tasks">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            Tugas & Ujian
          </button>
          <button class="nav-item-btn ${activeTab === 'docs' ? 'active' : ''}" type="button" data-nav="docs">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            Panduan PAW
          </button>
        </nav>

        <!-- Right Side Icons & Profile -->
        <div class="navbar-right">
          <!-- Notification Bell -->
          <button class="icon-btn-badge" type="button" title="Notifikasi Akademik" aria-label="Notifikasi">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span class="badge-dot"></span>
          </button>

          <!-- Messages -->
          <button class="icon-btn-badge" type="button" title="Pesan Forum Diskusi" aria-label="Pesan">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span class="badge-number">2</span>
          </button>

          <!-- Student Profile Pill -->
          <div class="student-profile-pill" title="Profil Mahasiswa">
            <div class="student-avatar">RA</div>
            <div class="student-info-col">
              <span class="student-name">${config.studentName}</span>
              <span class="student-nim">${config.studentNim}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}
