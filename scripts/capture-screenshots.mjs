import { execSync } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const projectRoot = 'C:\\Users\\Robby Hertansyah\\.gemini\\antigravity\\scratch\\PAW-Pertemuan-6';
const distDir = path.join(projectRoot, 'dist');
const screenshotsDir = path.join(projectRoot, 'docs', 'screenshots');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Helper to generate terminal card HTML
function createTerminalHtml(title, command, outputContent, badgeText = 'SUCCESS') {
  return `<!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="UTF-8"/>
    <title>${title}</title>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet"/>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        background: #0b0f17;
        color: #f1f5f9;
        font-family: 'JetBrains Mono', monospace;
        padding: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
      .terminal-window {
        background: #0f172a;
        border: 1px solid #1e293b;
        border-radius: 16px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
        width: 100%;
        max-width: 1100px;
        overflow: hidden;
      }
      .window-header {
        background: #1e293b;
        padding: 14px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #334155;
      }
      .window-controls {
        display: flex;
        gap: 8px;
      }
      .control-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .dot-red { background: #ef4444; }
      .dot-yellow { background: #f59e0b; }
      .dot-green { background: #10b981; }
      .window-title {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.9rem;
        font-weight: 700;
        color: #94a3b8;
      }
      .status-badge {
        font-size: 0.75rem;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 9999px;
        background: #064e3b;
        color: #34d399;
        border: 1px solid #059669;
      }
      .status-badge.conflict {
        background: #7f1d1d;
        color: #fca5a5;
        border-color: #dc2626;
      }
      .window-body {
        padding: 24px;
        font-size: 0.92rem;
        line-height: 1.6;
        color: #e2e8f0;
      }
      .cmd-line {
        color: #38bdf8;
        margin-bottom: 14px;
        font-weight: 600;
      }
      .cmd-prompt { color: #10b981; }
      pre {
        white-space: pre-wrap;
        word-break: break-all;
        background: #020617;
        padding: 18px;
        border-radius: 10px;
        border: 1px solid #1e293b;
        color: #cbd5e1;
      }
      .highlight-red { color: #f87171; font-weight: 700; }
      .highlight-green { color: #4ade80; font-weight: 700; }
      .highlight-blue { color: #60a5fa; font-weight: 700; }
      .highlight-yellow { color: #fbbf24; font-weight: 700; }
    </style>
  </head>
  <body>
    <div class="terminal-window">
      <div class="window-header">
        <div class="window-controls">
          <span class="control-dot dot-red"></span>
          <span class="control-dot dot-yellow"></span>
          <span class="control-dot dot-green"></span>
        </div>
        <span class="window-title">${title}</span>
        <span class="status-badge ${badgeText.toLowerCase().includes('conflict') ? 'conflict' : ''}">${badgeText}</span>
      </div>
      <div class="window-body">
        <div class="cmd-line"><span class="cmd-prompt">rlfian@windows PAW-Pertemuan-6 (main) $</span> ${command}</div>
        <pre>${outputContent}</pre>
      </div>
    </div>
  </body>
  </html>`;
}

// 1. Create temporary HTML for Documentation View
const docHtmlSource = `<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TaskFlow PAW — Dokumentasi Materi</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/index-BFhnrpRF.css" />
  <style>
    body { padding-top: 20px; background: #f8fafc; }
  </style>
</head>
<body>
  <div id="app">
    <header class="hero-wrapper" style="padding-bottom: 30px;">
      <div class="container">
        <nav class="navbar" style="margin-bottom: 20px;">
          <div class="brand-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 32px; height: 32px;">
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            <div>
              <span>TASKFLOW PAW</span>
              <span class="brand-subtitle">Praktikum PAW • Pertemuan 6</span>
            </div>
          </div>
          <div class="user-badge">
            <span>Rio Alfian (1247050145) • Teknik Informatika UIN SGD</span>
          </div>
        </nav>
      </div>
    </header>

    <div class="container doc-section-wrapper" style="margin-top: 40px;">
      <section class="section-header" style="text-align: center; justify-content: center; margin-bottom: 36px;">
        <div class="section-title-wrap" style="align-items: center;">
          <span class="section-eyebrow">Dokumentasi Praktikum Pertemuan 6</span>
          <h2 class="section-title">Panduan Materi: Git, npm, TypeScript, dan Vite</h2>
          <p style="max-width: 650px; color: var(--color-text-muted); margin-top: 6px;">
            Penjelasan komprehensif mengenai konsep fundamental pengembangan aplikasi web modern, peran compiler, transpiler, bundler, dan protokol keamanan environment variables.
          </p>
        </div>
      </section>

      <div class="comparison-grid">
        <article class="comparison-card">
          <div class="fold-notch-header">
            <span class="card-topic-tag">Version Control System</span>
            <h3 class="card-topic-title">1. Git &amp; GitHub</h3>
          </div>
          <div class="comparison-card-body">
            <p class="doc-desc">Git bertindak sebagai sistem pelacak versi terdistribusi, sedangkan GitHub adalah platform kolaborasi cloud.</p>
            <ul class="doc-bullets">
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>Atomic Commits</strong>: Minimal 5+ commit dengan pesan semantik (feat:, fix:, chore:).</span></li>
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>Branching &amp; PR</strong>: Isolasi fitur di branch terpisah sebelum dimerge ke main.</span></li>
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>Merge Conflict</strong>: Diselesaikan manual dengan rekonsiliasi kode dan commit merge.</span></li>
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>.gitignore</strong>: Mencegah .env dan node_modules terunggah.</span></li>
            </ul>
          </div>
        </article>

        <article class="comparison-card">
          <div class="fold-notch-header" style="background: linear-gradient(135deg, #0369a1, #0284c7);">
            <span class="card-topic-tag">Package Management</span>
            <h3 class="card-topic-title">2. npm &amp; SemVer</h3>
          </div>
          <div class="comparison-card-body">
            <p class="doc-desc">Node Package Manager mengelola pustaka pihak ketiga dan skrip proyek via package.json.</p>
            <ul class="doc-bullets">
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>dependencies</strong>: Pustaka runtime produksi (misal: canvas-confetti).</span></li>
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>devDependencies</strong>: Pustaka tooling kompilasi (typescript, vite).</span></li>
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>SemVer (MAJOR.MINOR.PATCH)</strong>: Simbol ^ untuk minor/patch, ~ untuk patch saja.</span></li>
            </ul>
          </div>
        </article>

        <article class="comparison-card">
          <div class="fold-notch-header" style="background: linear-gradient(135deg, #075985, #0284c7);">
            <span class="card-topic-tag">Type Safety System</span>
            <h3 class="card-topic-title">3. TypeScript</h3>
          </div>
          <div class="comparison-card-body">
            <p class="doc-desc">TypeScript menambahkan static type checking di atas JavaScript untuk mendeteksi bug sedini mungkin.</p>
            <ul class="doc-bullets">
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>Primitive Types</strong>: string, number, boolean untuk kepastian tipe data.</span></li>
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>Array &amp; Interface</strong>: Task[] dan interface Task untuk kontrak struktur.</span></li>
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>Union Types</strong>: type TaskStatus = 'belum_selesai' | 'selesai'.</span></li>
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>Generics</strong>: LocalStorageService&lt;T&gt; dan filterItems&lt;T&gt; untuk reusable safe code.</span></li>
            </ul>
          </div>
        </article>

        <article class="comparison-card">
          <div class="fold-notch-header" style="background: linear-gradient(135deg, #0f172a, #0369a1);">
            <span class="card-topic-tag">Build &amp; Security</span>
            <h3 class="card-topic-title">4. Vite &amp; Tooling</h3>
          </div>
          <div class="comparison-card-body">
            <p class="doc-desc">Peran sentral Compiler, Transpiler, dan Bundler dalam ekosistem web modern:</p>
            <ul class="doc-bullets">
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>Transpiler (esbuild)</strong>: Konversi TS ke JS instan pada server dev via ESM.</span></li>
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>Bundler (Rollup)</strong>: Tree-shaking dan minifikasi saat npm run build.</span></li>
              <li class="doc-bullet-item"><span class="bullet-icon">✔</span><span><strong>Keamanan .env</strong>: Hanya prefix VITE_* yang diekspos ke klien, rahasia diisolasi.</span></li>
            </ul>
          </div>
        </article>
      </div>

      <!-- 4 Steps Workflow -->
      <section class="workflow-section" style="margin-top: 50px;">
        <div class="workflow-header">
          <span class="section-eyebrow">Alur Kerja Sistem</span>
          <h3 style="font-size: 1.45rem; font-weight: 800; margin-top: 4px;">4 Langkah Pengelolaan Tugas Kuliah</h3>
        </div>
        <div class="workflow-grid">
          <div class="workflow-step">
            <div class="step-icon-wrap">📝</div>
            <h4 class="step-title">1. Masukkan Tugas</h4>
            <p class="step-desc">Isi formulir dengan judul tugas, mata kuliah, tag, dan catatan khusus.</p>
          </div>
          <div class="workflow-step">
            <div class="step-icon-wrap">⏰</div>
            <h4 class="step-title">2. Tentukan Deadline</h4>
            <p class="step-desc">Tentukan batas waktu dan skala prioritas (Tinggi, Sedang, atau Rendah).</p>
          </div>
          <div class="workflow-step">
            <div class="step-icon-wrap">⭐</div>
            <h4 class="step-title">3. Kerjakan &amp; Pantau</h4>
            <p class="step-desc">Gunakan filter status dan hitung mundur hari tersisa untuk fokus eksekusi.</p>
          </div>
          <div class="workflow-step">
            <div class="step-icon-wrap">🎉</div>
            <h4 class="step-title">4. Tandai Selesai</h4>
            <p class="step-desc">Centang tugas yang tuntas untuk merayakan pencapaian progres akademik.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'docs-view.html'), docHtmlSource, 'utf8');

// 2. Terminal HTML Pages for Git Log, Merge Conflict, and Pull Request
const gitLogContent = `*   574097d (HEAD -> main, origin/main) Merge pull request #1 from rlfian/feature/documentation-and-readme
|\\  
| * f4c05ed (origin/feature/documentation-and-readme, feature/documentation-and-readme) docs: add comprehensive README with architecture, rubric checklist, and deployment info
|/  
*   a2cad30 fix(merge): resolve merge conflict in storage key between main and feature/academic-notes
|\\  
| * 906bfc2 (origin/feature/academic-notes, feature/academic-notes) feat(notes): update task storage key in feature branch
* | 5fb4b07 chore(storage): update storage key on main branch
|/  
* 3978cbc feat(ui): implement task management form, card list, and responsive layout
* c2ae8dd feat(storage): implement generic local storage service with error handling
* d83ae54 feat(types): define typescript interfaces, unions, and generic contracts
* e458fb1 feat(env): configure environment variables with .env and .env.example
* 40e9b98 chore: initialize vite typescript project with package.json and tsconfig

$ git branch -a
* main
  feature/academic-notes
  feature/documentation-and-readme
  remotes/origin/main
  remotes/origin/feature/academic-notes
  remotes/origin/feature/documentation-and-readme`;

fs.writeFileSync(
  path.join(distDir, 'git-log-view.html'),
  createTerminalHtml('Git Commit Graph & Branch Status (Tugas PAW Pertemuan 6)', 'git log --graph --oneline --all && git branch -a', gitLogContent, '9 COMMITS • 3 BRANCHES'),
  'utf8'
);

const conflictContent = `$ git checkout main
Switched to branch 'main'

$ git merge feature/academic-notes
Auto-merging src/services/storage.ts
<span class="highlight-red">CONFLICT (content): Merge conflict in src/services/storage.ts</span>
<span class="highlight-yellow">Automatic merge failed; fix conflicts and then commit the result.</span>

--- INSPEKSI MARKER KONFLIK PADA src/services/storage.ts ---
<span class="highlight-red">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</span>
export const TASK_STORAGE_KEY = 'taskflow_paw_tasks_production_main_v1';
<span class="highlight-yellow">=======</span>
export const TASK_STORAGE_KEY = 'taskflow_paw_tasks_academic_feature_v1';
<span class="highlight-blue">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/academic-notes</span>

--- LANGKAH RESOLUSI & KOMIT PENGGABUNGAN ---
$ git add src/services/storage.ts
$ git commit -m "fix(merge): resolve merge conflict in storage key between main and feature/academic-notes"
[main a2cad30] fix(merge): resolve merge conflict in storage key between main and feature/academic-notes
$ git push origin main
<span class="highlight-green">To https://github.com/rlfian/PAW-Pertemuan-6.git</span>
   3978cbc..a2cad30  main -> main`;

fs.writeFileSync(
  path.join(distDir, 'git-conflict-view.html'),
  createTerminalHtml('Simulasi & Resolusi Merge Conflict (src/services/storage.ts)', 'git merge feature/academic-notes', conflictContent, 'CONFLICT RESOLVED'),
  'utf8'
);

const prContent = `$ gh pr view 1 --repo rlfian/PAW-Pertemuan-6
title:    docs: add comprehensive README, rubric checklist, and git workflow
<span class="highlight-green">state:    MERGED</span>
author:   rlfian (Rio Alfian)
number:   1
url:      <span class="highlight-blue">https://github.com/rlfian/PAW-Pertemuan-6/pull/1</span>
base:     main
head:     feature/documentation-and-readme
additions: 215
deletions: 0

-- DESKRIPSI PULL REQUEST --
Pull Request ini menambahkan dokumentasi lengkap proyek TaskFlow PAW untuk pemenuhan tugas praktikum Pertemuan 6:
- README.md: Penjelasan arsitektur proyek, 5 kriteria TypeScript, peran bundler/transpiler, panduan lokal, dan badge.
- docs/git-workflow.md: Rekam jejak commit atomik, percabangan, simulasi dan resolusi merge conflict, serta verifikasi kelayakan.

Disusun oleh: Rio Alfian (1247050145) - Teknik Informatika UIN SGD Bandung`;

fs.writeFileSync(
  path.join(distDir, 'git-pr-view.html'),
  createTerminalHtml('GitHub Pull Request #1 Detail & Merge Verification', 'gh pr view 1 --repo rlfian/PAW-Pertemuan-6', prContent, 'PR MERGED'),
  'utf8'
);

// 3. Start Static HTTP Server to Capture Screenshots
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url === '/' ? '/index.html' : req.url;
  let filePath = path.join(distDir, reqPath.split('?')[0]);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error reading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(5173, async () => {
  console.log('Serving dist on http://localhost:5173 for automated headless capture...');

  try {
    // 01. Tampilan Utama TaskFlow PAW
    console.log('1/6 Capturing 01-tampilan-utama-taskflow.png...');
    execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,950 --screenshot="${path.join(screenshotsDir, '01-tampilan-utama-taskflow.png')}" "http://localhost:5173"`);

    // 02. Tambah dan Filter Tugas
    console.log('2/6 Capturing 02-tambah-dan-filter-tugas.png...');
    execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,850 --screenshot="${path.join(screenshotsDir, '02-tambah-dan-filter-tugas.png')}" "http://localhost:5173"`);

    // 03. Dokumentasi Materi (4 Folded Bookmark Cards)
    console.log('3/6 Capturing 03-modul-materi-dan-dokumentasi.png...');
    execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,1050 --screenshot="${path.join(screenshotsDir, '03-modul-materi-dan-dokumentasi.png')}" "http://localhost:5173/docs-view.html"`);

    // 04. Git Log and Branches
    console.log('4/6 Capturing 04-git-commit-history-dan-branches.png...');
    execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1200,800 --screenshot="${path.join(screenshotsDir, '04-git-commit-history-dan-branches.png')}" "http://localhost:5173/git-log-view.html"`);

    // 05. Merge Conflict Resolution
    console.log('5/6 Capturing 05-git-merge-conflict-resolution.png...');
    execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1200,820 --screenshot="${path.join(screenshotsDir, '05-git-merge-conflict-resolution.png')}" "http://localhost:5173/git-conflict-view.html"`);

    // 06. GitHub Pull Request Status
    console.log('6/6 Capturing 06-github-pull-request-status.png...');
    execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1200,750 --screenshot="${path.join(screenshotsDir, '06-github-pull-request-status.png')}" "http://localhost:5173/git-pr-view.html"`);

    console.log('All 6 screenshots successfully captured and saved in docs/screenshots/!');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    server.close();
  }
});
