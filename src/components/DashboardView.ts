import type { AppConfig } from '../services/env';
import type { Task } from '../types/task';
import { formatIndonesianDate, getDaysRemaining } from '../utils/helpers';
import type { HeaderStats } from './Header';

export function renderDashboardView(config: AppConfig, stats: HeaderStats, tasks: Task[]): string {
  // Ambil tugas yang belum selesai untuk To-Do widget
  const upcomingTasks = tasks.filter(t => !t.isCompleted).slice(0, 3);

  return `
    <!-- 1. Hero Greeting Card (Image 2) -->
    <section class="lms-hero-card">
      <div class="hero-watermark">
        <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      </div>

      <div class="hero-header-row">
        <div>
          <div class="hero-badge-status">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10b981;"></span>
            Semester Ganjil 2024/2025 • Status Mahasiswa: Aktif / Reguler
          </div>
          <h1 class="hero-greeting-title">
            Selamat Datang Kembali, <span>${config.studentName}</span>
          </h1>
          <p class="hero-greeting-desc">
            Portal Pembelajaran Terpadu Fakultas Sains dan Teknologi. Anda memiliki <strong>${stats.pending} tenggat waktu tugas</strong> dan <strong>1 perkuliahan tatap muka</strong> hari ini.
          </p>
        </div>

        <div class="hero-actions-col">
          <button class="btn-hero-primary" type="button" id="btn-hero-attendance">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            Presensi Kuliah Hari Ini
          </button>
          <button class="btn-hero-secondary" type="button">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Unduh KHS Sementara
          </button>
          <button class="btn-hero-secondary" type="button">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Konsultasi Dosen Wali
          </button>
        </div>
      </div>

      <!-- Academic Stats Strip -->
      <div class="hero-academic-strip">
        <div class="strip-item">
          <span class="strip-label">IPK Berjalan</span>
          <span class="strip-value highlight-green">3.88</span>
          <span class="strip-sub">Skala 4.00 (Cumlaude)</span>
        </div>
        <div class="strip-item">
          <span class="strip-label">SKS Tempuh</span>
          <span class="strip-value highlight-blue">21 SKS</span>
          <span class="strip-sub">Beban Maksimal 24 SKS</span>
        </div>
        <div class="strip-item">
          <span class="strip-label">Kehadiran Presensi</span>
          <span class="strip-value">96.4%</span>
          <span class="strip-sub">Memenuhi Syarat UAS</span>
        </div>
        <div class="strip-item">
          <span class="strip-label">Dosen Wali Akademik</span>
          <span class="strip-value" style="font-size:1.05rem; padding-top:4px;">Dr. Mulyana, M.T.</span>
          <span class="strip-sub" style="color:#34d399;">✔ KRS Tervalidasi</span>
        </div>
      </div>
    </section>

    <!-- 2. 4 Quick Metric Cards (Image 2) -->
    <section class="metrics-row" aria-label="Metrik Ringkasan Akademik">
      <div class="metric-card" data-nav="course-detail">
        <div class="metric-text-col">
          <span class="metric-category">MATA KULIAH AKTIF</span>
          <span class="metric-number">7 Kelas</span>
          <span class="metric-desc">✔ 21 SKS terdaftar</span>
        </div>
        <div class="metric-icon-box blue">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
      </div>

      <div class="metric-card" data-nav="tasks">
        <div class="metric-text-col">
          <span class="metric-category">TUGAS MENDATANG</span>
          <span class="metric-number" style="color:#ea580c;">${stats.pending} Tugas</span>
          <span class="metric-desc alert">⏰ 1 segera jatuh tempo</span>
        </div>
        <div class="metric-icon-box orange">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-text-col">
          <span class="metric-category">PRESENSI KEHADIRAN</span>
          <span class="metric-number" style="color:#059669;">96.4%</span>
          <span class="metric-desc good">✔ Sangat Baik (A+)</span>
        </div>
        <div class="metric-icon-box green">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-text-col">
          <span class="metric-category">FORUM DISKUSI AKTIF</span>
          <span class="metric-number" style="color:#7c3aed;">3 Diskusi</span>
          <span class="metric-desc">💬 Respon dosen & asisten</span>
        </div>
        <div class="metric-icon-box purple">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- 3. Two-Column Layout (Left 68% / Right 32%) -->
    <div class="lms-main-grid">
      <!-- LEFT COLUMN: Subtabs & 6 Course Cards -->
      <section>
        <div class="view-subtabs-row">
          <div class="subtabs-pills">
            <button class="subtab-pill active" type="button" id="tab-courses-list">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              Mata Kuliah Semester Ini
            </button>
            <button class="subtab-pill" type="button" data-nav="tasks">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Tenggat Waktu Tugas
            </button>
            <button class="subtab-pill" type="button" data-nav="docs">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              Materi & Modul Kuliah
            </button>
          </div>

          <div class="subtab-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" id="dashboard-course-search" placeholder="Cari mata kuliah..." />
          </div>
        </div>

        <!-- 6 Course Cards Grid -->
        <div class="course-cards-grid">
          <!-- 1. Pemrograman Aplikasi Web (Main Focus) -->
          <article class="course-card" style="border-top: 3px solid var(--color-primary);">
            <div>
              <div class="course-card-top">
                <span class="sks-pill">3 SKS • Reguler A</span>
                <span class="presensi-pill green">
                  <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10b981;"></span>
                  Presensi 100%
                </span>
              </div>
              <h3 class="course-card-title">Pemrograman Aplikasi Web</h3>
              <p class="course-card-lecturer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Dosen: Dr. Ir. M. Taufik, M.T.
              </p>
              <div class="course-card-taskbox">
                <div class="taskbox-header">
                  <span class="taskbox-label">
                    <span>📋</span> Tugas Praktikum 6
                  </span>
                  <span class="taskbox-deadline">Tenggat: 3 hari lagi</span>
                </div>
                <p class="taskbox-title">
                  Git, npm, TypeScript, dan Vite (Implementasi 5 kriteria type safety, branch conflict resolution, & deploy web).
                </p>
              </div>
            </div>
            <div class="course-card-actions">
              <button class="btn-card-action blue" type="button" data-nav="tasks">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                Kirim Tugas
              </button>
              <button class="btn-card-action outline" type="button" data-nav="course-detail">
                Buka Kelas
              </button>
            </div>
          </article>

          <!-- 2. Basis Data Lanjut -->
          <article class="course-card">
            <div>
              <div class="course-card-top">
                <span class="sks-pill">3 SKS • Reguler A</span>
                <span class="presensi-pill green">
                  <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10b981;"></span>
                  Presensi 92%
                </span>
              </div>
              <h3 class="course-card-title">Basis Data Lanjut</h3>
              <p class="course-card-lecturer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Dosen: Rina Wulandari, M.Kom.
              </p>
              <div class="course-card-taskbox">
                <div class="taskbox-header">
                  <span class="taskbox-label"><span>📝</span> Kuis 1 Online</span>
                  <span class="taskbox-deadline" style="color:#7c3aed; background:#f5f3ff;">Buka: Besok, 09:00</span>
                </div>
                <p class="taskbox-title">
                  Perancangan Skema Relasional, Optimasi Query Indeks B-Tree & Partial.
                </p>
              </div>
            </div>
            <div class="course-card-actions">
              <button class="btn-card-action purple" type="button">
                Persiapan Kuis
              </button>
              <button class="btn-card-action outline" type="button">
                Buka Kelas
              </button>
            </div>
          </article>

          <!-- 3. Algoritma & Struktur Data -->
          <article class="course-card">
            <div>
              <div class="course-card-top">
                <span class="sks-pill">3 SKS • Reguler A</span>
                <span class="presensi-pill green">
                  <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10b981;"></span>
                  Presensi 100%
                </span>
              </div>
              <h3 class="course-card-title">Algoritma & Struktur Data</h3>
              <p class="course-card-lecturer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Dosen: Prof. Ahmad Dahlan, Ph.D.
              </p>
              <div class="course-card-taskbox">
                <div class="taskbox-header">
                  <span class="taskbox-label"><span>📘</span> Tugas Mandiri</span>
                  <span class="taskbox-deadline" style="color:#0284c7; background:#e0f2fe;">Tenggat: 6 hari lagi</span>
                </div>
                <p class="taskbox-title">
                  Analisis Kompleksitas Waktu Asimtotik O(n log n) pada Quicksort & Merge Sort.
                </p>
              </div>
            </div>
            <div class="course-card-actions">
              <button class="btn-card-action blue" type="button">
                Kirim Tugas
              </button>
              <button class="btn-card-action outline" type="button">
                Buka Kelas
              </button>
            </div>
          </article>

          <!-- 4. Jaringan Komputer -->
          <article class="course-card">
            <div>
              <div class="course-card-top">
                <span class="sks-pill">3 SKS • Reguler A</span>
                <span class="presensi-pill green">
                  <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10b981;"></span>
                  Presensi 94%
                </span>
              </div>
              <h3 class="course-card-title">Jaringan Komputer</h3>
              <p class="course-card-lecturer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Dosen: Hendra Wijaya, S.T., M.T.
              </p>
              <div class="course-card-taskbox">
                <div class="taskbox-header">
                  <span class="taskbox-label"><span>📢</span> Pengumuman</span>
                  <span class="taskbox-deadline" style="color:#059669; background:#ecfdf5;">Hari Ini</span>
                </div>
                <p class="taskbox-title">
                  Kuliah pengganti tatap maya via Zoom: Konfigurasi Subnetting CIDR & Routing OSPF.
                </p>
              </div>
            </div>
            <div class="course-card-actions">
              <button class="btn-card-action blue" type="button">
                Tautan Zoom
              </button>
              <button class="btn-card-action outline" type="button">
                Buka Kelas
              </button>
            </div>
          </article>

          <!-- 5. Rekayasa Perangkat Lunak -->
          <article class="course-card">
            <div>
              <div class="course-card-top">
                <span class="sks-pill">3 SKS • Reguler A</span>
                <span class="presensi-pill yellow">
                  <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#f59e0b;"></span>
                  Presensi 85%
                </span>
              </div>
              <h3 class="course-card-title">Rekayasa Perangkat Lunak</h3>
              <p class="course-card-lecturer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Dosen: Maya Safitri, M.Cs.
              </p>
              <div class="course-card-taskbox">
                <div class="taskbox-header">
                  <span class="taskbox-label"><span>👥</span> Diskusi Kelompok</span>
                  <span class="taskbox-deadline" style="color:#64748b; background:#f1f5f9;">Sprint 2</span>
                </div>
                <p class="taskbox-title">
                  Penyusunan Backlog Produk, Sprint Planning, dan Dokumentasi SRS IEEE 830.
                </p>
              </div>
            </div>
            <div class="course-card-actions">
              <button class="btn-card-action" style="background:#059669; color:#fff;" type="button">
                Forum Tim
              </button>
              <button class="btn-card-action outline" type="button">
                Buka Kelas
              </button>
            </div>
          </article>

          <!-- 6. Kecerdasan Buatan (AI) -->
          <article class="course-card">
            <div>
              <div class="course-card-top">
                <span class="sks-pill">3 SKS • Reguler A</span>
                <span class="presensi-pill green">
                  <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10b981;"></span>
                  Presensi 100%
                </span>
              </div>
              <h3 class="course-card-title">Kecerdasan Buatan (AI)</h3>
              <p class="course-card-lecturer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Dosen: Dr. Yudi Setiawan, M.T.
              </p>
              <div class="course-card-taskbox">
                <div class="taskbox-header">
                  <span class="taskbox-label"><span>🧠</span> Modul 7</span>
                  <span class="taskbox-deadline" style="color:#ea580c; background:#fff7ed;">Materi Baru</span>
                </div>
                <p class="taskbox-title">
                  Fondasi Jaringan Saraf Tiruan (Perceptron, Multilayer Perceptron & Backpropagation).
                </p>
              </div>
            </div>
            <div class="course-card-actions">
              <button class="btn-card-action" style="background:#d97706; color:#fff;" type="button">
                Unduh Slide
              </button>
              <button class="btn-card-action outline" type="button">
                Buka Kelas
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- RIGHT COLUMN: Sidebar Widgets (Image 2) -->
      <aside class="sidebar-col">
        <!-- 1. Jadwal Kuliah Hari Ini -->
        <div class="sidebar-widget">
          <div class="widget-header">
            <span class="widget-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Jadwal Kuliah Hari Ini
            </span>
            <span class="widget-badge">Rabu, 23 Okt</span>
          </div>
          <div class="schedule-list">
            <div class="schedule-item">
              <div class="schedule-time-row">
                <span>08:00 - 10:30 WIB</span>
                <span class="schedule-status-pill">Sedang Berjalan</span>
              </div>
              <h4 class="schedule-name">Pemrograman Aplikasi Web (Teori)</h4>
              <p class="schedule-room">📍 Ruang FST-302 (Lantai 3)</p>
            </div>
            <div class="schedule-item later">
              <div class="schedule-time-row">
                <span>13:00 - 15:30 WIB</span>
                <span class="schedule-status-pill" style="background:#f1f5f9; color:#64748b;">Nanti Siang</span>
              </div>
              <h4 class="schedule-name">Praktikum Jaringan Komputer</h4>
              <p class="schedule-room">📍 Lab Komputer 2 (Gedung Lab Terpadu)</p>
            </div>
          </div>
        </div>

        <!-- 2. To-Do List Akademik Pekan Ini (Interactive Checkboxes!) -->
        <div class="sidebar-widget">
          <div class="widget-header">
            <span class="widget-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              To-Do List Akademik Pekan Ini
            </span>
            <span class="widget-badge" id="todo-pending-count">${stats.pending} Tersisa</span>
          </div>

          <div class="todo-filter-pills">
            <button class="todo-filter-btn active" type="button">Semua</button>
            <button class="todo-filter-btn" type="button">Tugas</button>
            <button class="todo-filter-btn" type="button">Kuis/Ujian</button>
          </div>

          <div class="todo-widget-list" id="sidebar-todo-container">
            ${upcomingTasks.length === 0 ? `
              <p style="font-size:0.8rem; color:#64748b; text-align:center; padding:12px 0;">
                Semua tugas pekan ini telah diselesaikan! 🎉
              </p>
            ` : upcomingTasks.map(task => {
              const rem = getDaysRemaining(task.deadline);
              return `
                <div class="todo-widget-item" data-id="${task.id}">
                  <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    data-action="toggle-status" 
                    data-id="${task.id}"
                    ${task.isCompleted ? 'checked' : ''}
                  />
                  <div class="todo-col">
                    <span class="todo-text">${escapeHtml(task.title)}</span>
                    <span class="todo-date">⏰ ${formatIndonesianDate(task.deadline)} (${rem.label})</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <button class="btn-card-action blue" type="button" data-nav="tasks" style="width:100%; margin-top:14px;">
            Buka Semua Tugas (${tasks.length})
          </button>
        </div>

        <!-- 3. Pengumuman Rektorat & FST -->
        <div class="sidebar-widget">
          <div class="widget-header">
            <span class="widget-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              Pengumuman Rektorat & FST
            </span>
            <a href="#arsip" style="font-size:0.75rem; color:var(--color-primary); font-weight:700;">Arsip</a>
          </div>

          <div class="announcement-item">
            <div class="announcement-meta">
              <span style="font-weight:700; color:#0284c7;">Bagian Keuangan & BAAK</span>
              <span>21 Okt 2024</span>
            </div>
            <h5 class="announcement-title">Batas Akhir Pengajuan Dispensasi & Pembayaran UKT Semester Genap</h5>
            <p class="announcement-snippet">Diberitahukan kepada seluruh mahasiswa aktif batas waktu verifikasi kelulusan beasiswa dan pembayaran termin kedua.</p>
          </div>

          <div class="announcement-item">
            <div class="announcement-meta">
              <span style="font-weight:700; color:#0284c7;">Pusat Teknologi Informasi (PTIK)</span>
              <span>18 Okt 2024</span>
            </div>
            <h5 class="announcement-title">Pemeliharaan Server SIKAD & SSO Kampus (Sabtu Dini Hari)</h5>
            <p class="announcement-snippet">Optimalisasi kapasitas database penyimpanan kuis daring dan integrasi portal e-Library pusat.</p>
          </div>
        </div>
      </aside>
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
