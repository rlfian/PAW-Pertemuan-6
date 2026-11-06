export function renderDocumentationView(): string {
  return `
    <div class="taskflow-manager-card" style="margin-top: 24px;">
      <div class="manager-header-row" style="border-bottom: 1px solid var(--color-border); padding-bottom: 16px;">
        <div class="manager-title-col">
          <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:var(--color-primary); letter-spacing:0.05em; margin-bottom:2px;">
            Praktikum Pemrograman Aplikasi Web • Modul Evaluasi Pertemuan 6
          </div>
          <h2 class="manager-title">Dokumentasi &amp; Pembahasan Materi Kuliah</h2>
          <p class="manager-desc">
            Penjelasan komprehensif mengenai konsep fundamental pengembangan web modern, peran compiler, transpiler, bundler, serta protokol keamanan environment variables.
          </p>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(270px, 1fr)); gap:18px; margin-top:20px;">
        <!-- Card 1: Git & GitHub -->
        <div class="sidebar-widget" style="border-top:3px solid var(--color-primary);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span class="sks-pill">VCS &amp; Kolaborasi</span>
            <span style="font-size:0.75rem; font-weight:800; color:var(--color-primary);">MODUL 1</span>
          </div>
          <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:8px;">1. Git &amp; GitHub</h3>
          <p style="font-size:0.8rem; color:#64748b; line-height:1.5; margin-bottom:12px;">
            Git adalah distributed version control system untuk melacak setiap perubahan riwayat kode, sedangkan GitHub merupakan platform kolaborasi cloud.
          </p>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:0.78rem; color:#334155;">
            <li>✔ <strong>Atomic Commits</strong>: Minimal 5+ commit dengan pesan semantik (<code>feat:</code>, <code>fix:</code>, <code>chore:</code>).</li>
            <li>✔ <strong>Branching &amp; PR</strong>: Isolasi fitur di branch terpisah sebelum digabungkan ke <code>main</code>.</li>
            <li>✔ <strong>Merge Conflict</strong>: Disimulasikan dan diselesaikan secara manual dengan rekonsiliasi kode.</li>
            <li>✔ <strong>.gitignore</strong>: Mencegah <code>.env</code> dan <code>node_modules/</code> bocor ke repositori publik.</li>
          </ul>
        </div>

        <!-- Card 2: npm & SemVer -->
        <div class="sidebar-widget" style="border-top:3px solid #0284c7;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span class="sks-pill" style="background:#e0f2fe; color:#0284c7;">Package Manager</span>
            <span style="font-size:0.75rem; font-weight:800; color:#0284c7;">MODUL 2</span>
          </div>
          <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:8px;">2. npm &amp; SemVer</h3>
          <p style="font-size:0.8rem; color:#64748b; line-height:1.5; margin-bottom:12px;">
            npm mengelola pustaka dependensi dan mengorkestrasi skrip lifecycle aplikasi melalui konfigurasi <code>package.json</code>.
          </p>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:0.78rem; color:#334155;">
            <li>✔ <strong>dependencies</strong>: Pustaka yang diperlukan saat runtime browser di production (contoh: <code>canvas-confetti</code>).</li>
            <li>✔ <strong>devDependencies</strong>: Pustaka pendukung kompilasi saat development (contoh: <code>typescript</code>, <code>vite</code>).</li>
            <li>✔ <strong>Semantic Versioning</strong>: Format <code>MAJOR.MINOR.PATCH</code> dengan prefix <code>^</code> (minor/patch) dan <code>~</code> (patch only).</li>
          </ul>
        </div>

        <!-- Card 3: TypeScript Engine -->
        <div class="sidebar-widget" style="border-top:3px solid #7c3aed;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span class="sks-pill" style="background:#f5f3ff; color:#7c3aed;">Type Safety</span>
            <span style="font-size:0.75rem; font-weight:800; color:#7c3aed;">MODUL 3</span>
          </div>
          <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:8px;">3. TypeScript Engine</h3>
          <p style="font-size:0.8rem; color:#64748b; line-height:1.5; margin-bottom:12px;">
            TypeScript memperkaya JavaScript dengan sistem tipe data statis ketat guna mendeteksi kesalahan lebih awal sebelum runtime.
          </p>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:0.78rem; color:#334155;">
            <li>✔ <strong>Primitive Types</strong>: <code>string</code>, <code>number</code>, <code>boolean</code> menjamin kepastian tipe variabel.</li>
            <li>✔ <strong>Array &amp; Interface</strong>: <code>Task[]</code> dan <code>interface Task</code> mendefinisikan kontrak data tugas kuliah.</li>
            <li>✔ <strong>Union Types</strong>: <code>type TaskStatus = 'belum_selesai' | 'selesai'</code> membatasi opsi nilai.</li>
            <li>✔ <strong>Generics</strong>: <code>LocalStorageService&lt;T&gt;</code> dan <code>filterItems&lt;T&gt;</code> untuk fungsi reusable yang type-safe.</li>
          </ul>
        </div>

        <!-- Card 4: Vite, Tooling & Env -->
        <div class="sidebar-widget" style="border-top:3px solid #059669;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span class="sks-pill" style="background:#ecfdf5; color:#059669;">Build &amp; Security</span>
            <span style="font-size:0.75rem; font-weight:800; color:#059669;">MODUL 4</span>
          </div>
          <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:8px;">4. Vite, Tooling &amp; Env</h3>
          <p style="font-size:0.8rem; color:#64748b; line-height:1.5; margin-bottom:12px;">
            Peran kunci Compiler, Transpiler, dan Bundler dalam ekosistem web modern:
          </p>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:0.78rem; color:#334155;">
            <li>✔ <strong>Transpiler (esbuild)</strong>: Mengonversi TypeScript ke JavaScript standar secara instan pada dev server via Native ESM.</li>
            <li>✔ <strong>Bundler (Rollup)</strong>: Menggabungkan modul, tree-shaking, dan meminifikasi output di direktori <code>dist/</code>.</li>
            <li>✔ <strong>Compiler (tsc)</strong>: Menjalankan type checking ketat (<code>noEmit: true</code>) sebelum build produksi.</li>
            <li>✔ <strong>Keamanan .env</strong>: Hanya variabel berawalan <code>VITE_*</code> yang boleh diakses browser; rahasia diisolasi di server.</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}
