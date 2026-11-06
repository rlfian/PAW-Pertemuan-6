import type { AppConfig } from '../services/env';
import type { Task } from '../types/task';
import type { HeaderStats } from './Header';

export function renderCourseDetailView(config: AppConfig, stats: HeaderStats, tasks: Task[]): string {
  const pawTask = tasks.find(t => t.id === 'task_paw_001') || tasks[0];

  return `
    <!-- Breadcrumbs -->
    <div class="breadcrumbs-bar">
      <div class="breadcrumbs-links">
        <a href="#dashboard" data-nav="dashboard" style="display:flex; align-items:center; gap:4px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          Dashboard
        </a>
        <span>/</span>
        <a href="#courses" data-nav="dashboard">Mata Kuliah</a>
        <span>/</span>
        <strong style="color:var(--color-text-main);">IF-301 • ${config.courseName}</strong>
      </div>
      <div class="sync-badge">
        <span class="sync-dot"></span>
        <span>SINKRONISASI AKTIF</span>
        <span style="font-family:var(--font-family-mono); opacity:0.7;">REV.2024-W08</span>
      </div>
    </div>

    <!-- Big Course Header Card (Image 1) -->
    <section class="course-hero-card">
      <div>
        <div class="course-hero-badges">
          <span class="badge-code">IF-301 • 3 SKS</span>
          <span class="badge-gray">Kelas: Reguler A</span>
          <span class="badge-gray">Di Ruang FST-302 (Lantai 3)</span>
          <span style="font-size:0.78rem; color:#64748b; font-weight:600;">Semester Ganjil 2024/2025</span>
        </div>
        <h1 class="course-hero-title">${config.courseName}</h1>
        <p class="course-hero-desc">
          Teori & Praktikum Rekayasa Perangkat Lunak Berbasis Web Modern, RESTful API, State Architecture & Cloud Deployment.
        </p>

        <div class="course-meta-grid">
          <div class="meta-box">
            <div class="meta-avatar">MT</div>
            <div class="meta-col">
              <span class="meta-role">DOSEN PENGAMPU</span>
              <span class="meta-name">Dr. Ir. M. Taufik, M.T.</span>
              <span class="meta-email">taufik@uinsgd.ac.id</span>
            </div>
          </div>
          <div class="meta-box">
            <div class="meta-avatar" style="background:#f5f3ff; color:#7c3aed;">FA</div>
            <div class="meta-col">
              <span class="meta-role">ASISTEN PRAKTIKUM</span>
              <span class="meta-name">Fajar Anugrah, S.Kom.</span>
              <span class="meta-email">Lab Komputer FST-02</span>
            </div>
          </div>
          <div class="meta-box">
            <div class="meta-avatar" style="background:#ecfdf5; color:#059669;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div class="meta-col">
              <span class="meta-role">JADWAL KULIAH</span>
              <span class="meta-name">Rabu, 08:00 - 10:30 WIB</span>
              <span style="font-size:0.72rem; color:#64748b;">Sesi Teori & Praktikum</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Attendance & Zoom Box -->
      <div class="course-hero-right">
        <div class="attendance-circle-wrap">
          <div class="attendance-text-col">
            <span class="att-title">PRESENSI MAHASISWA</span>
            <div class="att-percentage">100% <span style="font-size:0.85rem; font-weight:600; color:#64748b;">7/7 Pertemuan</span></div>
            <span class="att-status">Status: Sangat Tertib (Syarat UTS Terpenuhi)</span>
          </div>
          <div style="width:48px; height:48px; border-radius:50%; border:4px solid #10b981; display:flex; align-items:center; justify-content:center; color:#10b981; font-weight:800; font-size:0.85rem;">
            ✔
          </div>
        </div>

        <button class="btn-zoom" type="button" onclick="alert('Membuka tautan virtual meeting perkuliahan...')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="23 7 16 12 23 17 23 7"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
          Masuk Perkuliahan Virtual (Zoom)
        </button>

        <div class="att-links-row">
          <a href="#presensi" style="display:flex; align-items:center; gap:4px;">
            <span>📋</span> Presensi P-6
          </a>
          <span>•</span>
          <a href="#silabus" style="display:flex; align-items:center; gap:4px;">
            <span>📄</span> Silabus PDF
          </a>
        </div>
      </div>
    </section>

    <!-- Sub-Tabs Navigation inside Course -->
    <div class="meeting-subtabs-bar">
      <button class="meeting-subtab-btn active" type="button">
        📑 Pertemuan & Modul (8)
      </button>
      <button class="meeting-subtab-btn" type="button" data-nav="tasks">
        📝 Tugas & Evaluasi (${tasks.length})
      </button>
      <button class="meeting-subtab-btn" type="button">
        💬 Forum Diskusi (12)
      </button>
      <button class="meeting-subtab-btn" type="button">
        📅 Daftar Presensi
      </button>
      <button class="meeting-subtab-btn" type="button" data-nav="docs">
        📈 Panduan & Rubrik PAW
      </button>
    </div>

    <!-- Main Two-Column Layout (Course Detail - Image 1) -->
    <div class="lms-main-grid">
      <!-- LEFT COLUMN: Active Meeting, Downloads, Past Meetings -->
      <section>
        <!-- ACTIVE MEETING: Pertemuan 6 (Sedang Berlangsung) -->
        <article class="active-meeting-card">
          <div class="meeting-indicator-row">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--color-primary);"></span>
            PERTEMUAN 6 • MINGGU INI (SEDANG BERLANGSUNG)
          </div>
          <div style="font-size:0.78rem; color:#64748b; font-weight:600; margin-bottom:8px;">
            23 OKT 2024 • 08:00 - 10:30 WIB
          </div>
          <h2 class="meeting-title">Modern Frontend Tooling, TypeScript, dan Vite Setup</h2>
          <p class="meeting-desc">
            Materi perkuliahan pekan ini mengupas perancangan kode frontend berbasis <strong>TypeScript murni</strong>, penerapan 5 kriteria type system standar industri, alur kolaboratif <strong>Git & GitHub</strong> terdistribusi (branching, atomic commit, simulasi & resolusi merge conflict, serta Pull Request), konfigurasi <strong>npm</strong> (dependencies vs devDependencies & Semantic Versioning), dan arsitektur <strong>Vite</strong> (esbuild transpiler, Rollup bundler, HMR, dan isolasi kredensial <code>.env</code>).
          </p>

          <!-- CPMK Box -->
          <div class="cpmk-box">
            <h4 class="cpmk-title">Capaian Pembelajaran Khusus (CPMK):</h4>
            <ul class="cpmk-list">
              <li class="cpmk-item">
                <span class="cpmk-icon">✔</span>
                <span>Mampu menyusun kontrak type TypeScript standar dengan primitive types, array, interface, union types, dan generics sederhana.</span>
              </li>
              <li class="cpmk-item">
                <span class="cpmk-icon">✔</span>
                <span>Memahami alur kerja Git &amp; GitHub (minimal 5 commit atomik, 2 branch, resolusi merge conflict, dan pembuatan Pull Request).</span>
              </li>
              <li class="cpmk-item">
                <span class="cpmk-icon">✔</span>
                <span>Mengimplementasikan Vite bundler dan transpiler esbuild dengan isolasi variabel lingkungan aman via <code>.env</code>.</span>
              </li>
            </ul>
          </div>

          <!-- Materi & Berkas Perkuliahan -->
          <h4 style="font-size:0.85rem; font-weight:800; text-transform:uppercase; color:var(--color-text-main); margin-bottom:12px;">
            Materi & Berkas Perkuliahan:
          </h4>
          <div class="files-list-grid">
            <div class="file-item-card" title="Unduh Slide Teori">
              <div class="file-icon-title">
                <span style="font-size:1.4rem;">📄</span>
                <div>
                  <div class="file-title">Slide Modul Teori P-6.pdf</div>
                  <div class="file-sub">12.4 MB • Versi Revisi 2</div>
                </div>
              </div>
              <span style="color:var(--color-primary); font-size:1.1rem;">⬇</span>
            </div>

            <div class="file-item-card" title="Tonton Rekaman Perkuliahan">
              <div class="file-icon-title">
                <span style="font-size:1.4rem;">🎥</span>
                <div>
                  <div class="file-title">Rekaman Zoom Kelas P-6</div>
                  <div class="file-sub">1 Jam 45 Menit • 1080p Cloud</div>
                </div>
              </div>
              <span style="color:var(--color-primary); font-size:1.1rem;">↗</span>
            </div>

            <a class="file-item-card" href="https://github.com/rlfian/PAW-Pertemuan-6" target="_blank" rel="noopener noreferrer" title="Buka Repositori GitHub">
              <div class="file-icon-title">
                <span style="font-size:1.4rem;">💻</span>
                <div>
                  <div class="file-title">Starter Code Repo (Vite-TS)</div>
                  <div class="file-sub">github.com/rlfian/PAW-Pertemuan-6</div>
                </div>
              </div>
              <span style="color:var(--color-primary); font-size:1.1rem;">↗</span>
            </a>

            <div class="file-item-card" title="Unduh Koleksi API">
              <div class="file-icon-title">
                <span style="font-size:1.4rem;">📦</span>
                <div>
                  <div class="file-title">REST_Collection_v2.json</div>
                  <div class="file-sub">Postman Environment Included</div>
                </div>
              </div>
              <span style="color:var(--color-primary); font-size:1.1rem;">⬇</span>
            </div>
          </div>

          <!-- Tugas Praktikum 6 Banner -->
          <div class="practical-task-banner">
            <div class="task-banner-info">
              <div class="task-icon-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div>
                <h4 class="task-banner-title">${pawTask.title}</h4>
                <div class="task-banner-deadline">
                  ⏰ Tenggat: 3 hari lagi (24 Okt 2024, 23:59 WIB)
                </div>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
              <button class="btn-hero-primary" type="button" data-nav="tasks">
                Kelola Tugas Praktikum
              </button>
              <button class="btn-card-action outline" type="button" data-nav="docs">
                Rubrik Penilaian
              </button>
            </div>
          </div>
        </article>

        <!-- Pertemuan yang Telah Selesai Accordion (Image 1) -->
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; margin-top:30px;">
          <h3 style="font-size:1rem; font-weight:800; color:var(--color-text-main);">Pertemuan Yang Telah Selesai</h3>
          <span style="font-size:0.75rem; color:#64748b; font-weight:600;">7 Pertemuan Lengkap</span>
        </div>

        <div class="past-meetings-list">
          <div class="past-meeting-item">
            <div style="display:flex; align-items:center; gap:12px;">
              <span class="meeting-badge-num">P-7</span>
              <div>
                <h4 class="meeting-past-title">DOM Manipulation, Asynchronous JS, & Fetch API</h4>
                <span class="meeting-past-meta">16 Okt 2024 • Praktikum Lab 2</span>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:16px;">
              <span style="font-size:0.75rem; color:#059669; font-weight:700;">✔ Tuntas</span>
              <span style="font-size:0.8rem; font-weight:800; color:var(--color-primary);">Nilai Tugas 1: 95/100</span>
            </div>
          </div>

          <div class="past-meeting-item">
            <div style="display:flex; align-items:center; gap:12px;">
              <span class="meeting-badge-num">P-5</span>
              <div>
                <h4 class="meeting-past-title">Modern Frontend Tooling, TypeScript, dan Vite Setup</h4>
                <span class="meeting-past-meta">09 Okt 2024 • Sesi Teori & Studi Kasus</span>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:16px;">
              <span style="font-size:0.75rem; color:#059669; font-weight:700;">✔ Tuntas</span>
              <span style="font-size:0.78rem; color:#64748b; font-weight:600;">Hadir (08:02 WIB)</span>
            </div>
          </div>

          <div class="past-meeting-item" style="background:#f8fafc;">
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-size:1.2rem;">📁</span>
              <div>
                <h4 class="meeting-past-title">Arsip Pertemuan 1 – 4</h4>
                <span class="meeting-past-meta">Dasar HTML5 Semantik, CSS3 Flexbox/Grid, TailwindCSS Framework, & Dasar JS</span>
              </div>
            </div>
            <a href="#arsip-p1-4" style="font-size:0.78rem; color:var(--color-primary); font-weight:700;">Lihat Arsip</a>
          </div>
        </div>

        <!-- Pertemuan Mendatang (Pascaujian & Final Project) -->
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; margin-top:30px;">
          <h3 style="font-size:1rem; font-weight:800; color:var(--color-text-main); display:flex; align-items:center; gap:6px;">
            <span>🔒</span> Pertemuan Mendatang (Pascaujian &amp; Final Project)
          </h3>
          <span style="font-size:0.75rem; color:#64748b; font-weight:600;">Silabus Terjadwal</span>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
          <div class="sidebar-widget" style="padding:16px;">
            <div style="display:flex; justify-content:space-between; font-size:0.74rem; font-weight:700; color:#64748b; margin-bottom:4px;">
              <span>P-9 • PEKAN DEPAN</span>
              <span>🔒</span>
            </div>
            <h5 style="font-size:0.86rem; font-weight:800; margin-bottom:4px;">Ujian Tengah Semester (UTS) Teori & Praktik</h5>
            <p style="font-size:0.75rem; color:#64748b;">Live coding pembuatan RESTful CRUD terotomatisasi di Lab Komputer 2.</p>
          </div>

          <div class="sidebar-widget" style="padding:16px;">
            <div style="display:flex; justify-content:space-between; font-size:0.74rem; font-weight:700; color:#64748b; margin-bottom:4px;">
              <span>P-10 s/d P-12</span>
              <span>🔒</span>
            </div>
            <h5 style="font-size:0.86rem; font-weight:800; margin-bottom:4px;">React Architecture & Component Lifecycle</h5>
            <p style="font-size:0.75rem; color:#64748b;">Virtual DOM, React Hooks lanjutan (useMemo, useCallback), Custom Hooks, & Router v6.</p>
          </div>
        </div>
      </section>

      <!-- RIGHT COLUMN: Course Sidebar Widgets (Image 1) -->
      <aside class="sidebar-col">
        <!-- 1. Pengumuman Dosen -->
        <div class="sidebar-widget">
          <div class="widget-header">
            <span class="widget-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              Pengumuman Dosen
            </span>
            <span style="font-size:0.72rem; color:#64748b;">Kemarin, 14:20</span>
          </div>
          <div>
            <h5 style="font-size:0.86rem; font-weight:800; margin-bottom:6px;">Persiapan UTS & Unggah Tugas 6</h5>
            <p style="font-size:0.8rem; color:#475569; line-height:1.45; margin-bottom:8px;">
              "Assalamu'alaikum wr. wb. Mahasiswa sekalian, mohon pastikan repositori GitHub untuk Tugas 6 telah diatur secara public atau di-invite asisten lab. Kisi-kisi UTS pekan depan akan dibahas pada 30 menit awal pertemuan hari ini."
            </p>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.74rem;">
              <strong>Dr. Ir. M. Taufik, M.T.</strong>
              <a href="#forum" style="color:var(--color-primary); font-weight:700;">Balas di Forum Diskusi</a>
            </div>
          </div>
        </div>

        <!-- 2. Tenggat & Evaluasi Aktif -->
        <div class="sidebar-widget">
          <div class="widget-header">
            <span class="widget-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Tenggat & Evaluasi Aktif
            </span>
            <span class="widget-badge" style="background:#fff7ed; color:#ea580c;">${stats.pending} Tertunda</span>
          </div>

          <div style="margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; font-size:0.74rem; font-weight:700; margin-bottom:4px;">
              <span style="color:#0284c7;">TUGAS INDIVIDU</span>
              <span style="color:#ef4444;">3 Hari Lagi</span>
            </div>
            <h5 style="font-size:0.88rem; font-weight:800; margin-bottom:4px;">Tugas 6: Git, npm, TypeScript, & Vite</h5>
            <p style="font-size:0.76rem; color:#64748b; line-height:1.4; margin-bottom:10px;">
              Implementasi web daftar tugas kuliah ber-tipe data ketat, alur Git branching & conflict resolution, dan publikasi website online.
            </p>
            <button class="btn-card-action blue" type="button" data-nav="tasks" style="width:100%; padding:9px;">
              Unggah Berkas Jawaban (Link &amp; Repo)
            </button>
          </div>

          <div style="border-top:1px solid var(--color-border-subtle); padding-top:10px; display:flex; align-items:center; gap:8px;">
            <span>💻</span>
            <div>
              <div style="font-size:0.8rem; font-weight:700;">UTS Praktikum (Live Coding)</div>
              <div style="font-size:0.7rem; color:#64748b;">Rabu, 30 Okt 2024 • Sesi 1</div>
            </div>
          </div>
        </div>

        <!-- 3. Konsultasi & Asisten Lab -->
        <div class="sidebar-widget">
          <div class="widget-header">
            <span class="widget-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Konsultasi & Asisten Lab
            </span>
          </div>
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
            <div class="meta-avatar" style="background:#f5f3ff; color:#7c3aed; width:42px; height:42px;">FA</div>
            <div>
              <h5 style="font-size:0.86rem; font-weight:800;">Fajar Anugrah, S.Kom.</h5>
              <span style="font-size:0.72rem; color:#64748b;">Koordinator Asisten Praktikum</span>
            </div>
          </div>
          <div style="font-size:0.75rem; color:#64748b; display:flex; flex-direction:column; gap:6px; margin-bottom:14px;">
            <div>📧 fajar.anugrah@uinsgd.ac.id</div>
            <div>💬 Telegram Group: @paw2024_reguler_uinsgd</div>
            <div>🏢 Lab Komputer 2 (Senin - Kamis, 13:00 - 16:00 WIB)</div>
          </div>
          <button class="btn-card-action outline" type="button" style="width:100%;">
            Jadwalkan Konsultasi Tugas
          </button>
        </div>

        <!-- 4. Rekan Kelas & Kelompok -->
        <div class="sidebar-widget">
          <div class="widget-header">
            <span class="widget-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Rekan Kelas & Kelompok
            </span>
            <span style="font-size:0.72rem; color:#64748b; font-weight:700;">36 Mahasiswa</span>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:800; color:var(--color-primary); margin-bottom:4px;">
              <span>KELOMPOK 04 [PROYEK FINAL]</span>
              <span>4 Anggota</span>
            </div>
            <p style="font-size:0.74rem; color:#64748b; line-height:1.4; margin-bottom:12px;">
              Topik: Sistem Manajemen Logistik Kampus Terintegrasi Webhook.
            </p>
            <button class="btn-card-action outline" type="button" style="width:100%;">
              Lihat Buku Direktori Kelas
            </button>
          </div>
        </div>
      </aside>
    </div>
  `;
}
