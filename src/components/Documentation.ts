export function renderDocumentation(): string {
  return `
    <div class="container doc-section-wrapper" id="guide-section">
      <!-- Section Header -->
      <section class="section-header" style="text-align: center; justify-content: center; margin-bottom: 36px;">
        <div class="section-title-wrap" style="align-items: center;">
          <span class="section-eyebrow">Dokumentasi Praktikum Pertemuan 6</span>
          <h2 class="section-title">Panduan Materi: Git, npm, TypeScript, dan Vite</h2>
          <p style="max-width: 650px; color: var(--color-text-muted); margin-top: 6px;">
            Penjelasan komprehensif mengenai konsep fundamental pengembangan aplikasi web modern, peran compiler, transpiler, bundler, dan protokol keamanan environment variables.
          </p>
        </div>
      </section>

      <!-- 4 Comparison Cards (Folded Bookmark Pattern from Reference Image) -->
      <div class="comparison-grid">
        <!-- Card 1: Git & GitHub -->
        <article class="comparison-card">
          <div class="fold-notch-header">
            <span class="card-topic-tag">Version Control System</span>
            <h3 class="card-topic-title">1. Git & GitHub</h3>
          </div>
          <div class="comparison-card-body">
            <p class="doc-desc">
              Git bertindak sebagai sistem pelacak versi terdistribusi (*distributed VCS*), sedangkan GitHub adalah platform kolaborasi berbasis cloud.
            </p>
            <ul class="doc-bullets">
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>Atomic Commits</strong>: Setiap commit mewakili satu unit perubahan bermakna dengan pesan semantik (misal <code>feat:</code>, <code>fix:</code>, <code>chore:</code>).</span>
              </li>
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>Branching & PR</strong>: Mengisolasi fitur baru di branch terpisah (<code>feature/...</code>) sebelum dimerge ke <code>main</code> via Pull Request.</span>
              </li>
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>Merge Conflict</strong>: Terjadi ketika dua cabang mengubah baris kode yang sama; diselesaikan manual dengan memilih konten yang valid lalu membuat merge commit.</span>
              </li>
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>.gitignore</strong>: Mencegah berkas sensitif (<code>.env</code>) dan dependensi berat (<code>node_modules/</code>) terunggah ke repositori publik.</span>
              </li>
            </ul>
            <div class="code-snippet-box">
              git checkout -b feature/task-filters<br/>
              git commit -m "feat(filter): add status filter"<br/>
              git merge feature/task-filters
            </div>
          </div>
        </article>

        <!-- Card 2: npm & SemVer -->
        <article class="comparison-card">
          <div class="fold-notch-header" style="background: linear-gradient(135deg, #0369a1, #0284c7);">
            <span class="card-topic-tag">Package Management</span>
            <h3 class="card-topic-title">2. npm & SemVer</h3>
          </div>
          <div class="comparison-card-body">
            <p class="doc-desc">
              Node Package Manager (npm) mengelola pustaka pihak ketiga dan siklus eksekusi skrip proyek via <code>package.json</code>.
            </p>
            <ul class="doc-bullets">
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>dependencies</strong>: Pustaka yang dibutuhkan saat runtime produksi di browser (contoh: <code>canvas-confetti</code>).</span>
              </li>
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>devDependencies</strong>: Pustaka penunjang selama pengembangan dan kompilasi (contoh: <code>typescript</code>, <code>vite</code>).</span>
              </li>
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>Semantic Versioning (MAJOR.MINOR.PATCH)</strong>:
                  <br/>• Karat (<code>^1.2.3</code>): Izinkan pembaruan minor & patch (kompatibel).
                  <br/>• Tilde (<code>~1.2.3</code>): Izinkan pembaruan patch saja (bug fix).
                </span>
              </li>
            </ul>
            <div class="code-snippet-box">
              npm install canvas-confetti<br/>
              npm install -D typescript vite<br/>
              npm run build
            </div>
          </div>
        </article>

        <!-- Card 3: TypeScript Engine -->
        <article class="comparison-card">
          <div class="fold-notch-header" style="background: linear-gradient(135deg, #075985, #0284c7);">
            <span class="card-topic-tag">Type Safety System</span>
            <h3 class="card-topic-title">3. TypeScript</h3>
          </div>
          <div class="comparison-card-body">
            <p class="doc-desc">
              TypeScript menambahkan <em>static type system</em> di atas JavaScript untuk mendeteksi bug sedini mungkin saat proses penulisan kode.
            </p>
            <ul class="doc-bullets">
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>Primitive Types</strong>: <code>string</code>, <code>number</code>, <code>boolean</code> memberikan kepastian tipe variabel.</span>
              </li>
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>Array & Interface</strong>: <code>Task[]</code> dan <code>interface Task</code> mendefinisikan kontrak struktur objek tugas kuliah.</span>
              </li>
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>Union Types</strong>: <code>type TaskStatus = 'belum_selesai' | 'selesai'</code> membatasi nilai hanya pada opsi yang sah.</span>
              </li>
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>Generics</strong>: <code>LocalStorageService&lt;T&gt;</code> dan <code>filterItems&lt;T&gt;</code> membuat kode dapat digunakan kembali untuk sembarang tipe data.</span>
              </li>
            </ul>
            <div class="code-snippet-box">
              interface Task { title: string; isCompleted: boolean; }<br/>
              type Status = 'belum_selesai' | 'selesai';<br/>
              function filter&lt;T&gt;(items: T[], fn: (i: T) =&gt; boolean): T[]
            </div>
          </div>
        </article>

        <!-- Card 4: Vite, Tooling & Env -->
        <article class="comparison-card">
          <div class="fold-notch-header" style="background: linear-gradient(135deg, #0f172a, #0369a1);">
            <span class="card-topic-tag">Build & Security</span>
            <h3 class="card-topic-title">4. Vite & Tooling</h3>
          </div>
          <div class="comparison-card-body">
            <p class="doc-desc">
              Peran sentral <strong>Compiler</strong>, <strong>Transpiler</strong>, dan <strong>Bundler</strong> dalam ekosistem web modern:
            </p>
            <ul class="doc-bullets">
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>Transpiler (esbuild)</strong>: Mengonversi kode TypeScript & ES modern ke JavaScript standar yang didukung semua browser secara instan pada dev server.</span>
              </li>
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>Bundler (Rollup)</strong>: Menggabungkan modul, aset CSS, dan skrip menjadi satu paket optimal (minifikasi & tree-shaking) pada output <code>dist/</code>.</span>
              </li>
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>Hot Module Replacement (HMR)</strong>: Memperbarui modul di browser tanpa me-reload seluruh halaman.</span>
              </li>
              <li class="doc-bullet-item">
                <span class="bullet-icon">✔</span>
                <span><strong>Keamanan .env</strong>: Hanya variabel berawalan <code>VITE_</code> yang disuntikkan ke sisi klien. API Key rahasia tidak boleh diberi prefix <code>VITE_</code> agar tidak bocor.</span>
              </li>
            </ul>
            <div class="code-snippet-box">
              # Client-safe (.env)<br/>
              VITE_APP_TITLE=TaskFlow PAW<br/>
              # Server-only (Tidak diekspos)<br/>
              SECRET_API_KEY=sk_internal_only
            </div>
          </div>
        </article>
      </div>

      <!-- 4-Step Workflow Diagram (How It Works from Reference Image) -->
      <section class="workflow-section" style="margin-top: 50px;">
        <div class="workflow-header">
          <span class="section-eyebrow">Alur Kerja Sistem</span>
          <h3 style="font-size: 1.45rem; font-weight: 800; margin-top: 4px;">4 Langkah Pengelolaan Tugas Kuliah</h3>
        </div>

        <div class="workflow-grid">
          <!-- Step 1 -->
          <div class="workflow-step">
            <div class="step-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <h4 class="step-title">1. Masukkan Tugas</h4>
            <p class="step-desc">Isi formulir dengan judul tugas, mata kuliah, tag, dan catatan khusus.</p>
          </div>

          <!-- Step 2 -->
          <div class="workflow-step">
            <div class="step-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h4 class="step-title">2. Tentukan Deadline</h4>
            <p class="step-desc">Tentukan batas waktu dan skala prioritas (Tinggi, Sedang, atau Rendah).</p>
          </div>

          <!-- Step 3 -->
          <div class="workflow-step">
            <div class="step-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h4 class="step-title">3. Kerjakan & Pantau</h4>
            <p class="step-desc">Gunakan filter status dan hitung mundur hari tersisa untuk fokus eksekusi.</p>
          </div>

          <!-- Step 4 -->
          <div class="workflow-step">
            <div class="step-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h4 class="step-title">4. Tandai Selesai</h4>
            <p class="step-desc">Centang tugas yang tuntas untuk merayakan pencapaian progres akademik.</p>
          </div>
        </div>
      </section>
    </div>
  `;
}
