import type { AppConfig } from '../services/env';

export function renderFooter(config: AppConfig): string {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h3 class="footer-brand-title">TASKFLOW PAW</h3>
            <p class="footer-text">
              Platform manajemen daftar tugas kuliah berbasis <strong>TypeScript</strong> dan <strong>Vite</strong>. Disusun untuk memenuhi evaluasi praktikum Pertemuan 6 mata kuliah ${config.courseName}.
            </p>
            <div class="footer-meta-pill">
              Build Mode: ${config.appEnv.toUpperCase()} • v${config.appVersion}
            </div>
          </div>

          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 10px;">Identitas Pengembang</h4>
            <p class="footer-text"><strong>Nama:</strong> ${config.studentName}</p>
            <p class="footer-text"><strong>NIM:</strong> ${config.studentNim}</p>
            <p class="footer-text"><strong>Program Studi:</strong> Teknik Informatika</p>
            <p class="footer-text"><strong>Institusi:</strong> UIN Sunan Gunung Djati Bandung</p>
          </div>

          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 10px;">Protokol Keamanan .env</h4>
            <p class="footer-text" style="font-size: 0.8rem;">
              ✔ Variabel <code>VITE_*</code> diekspos secara aman ke browser untuk metadata aplikasi.
            </p>
            <p class="footer-text" style="font-size: 0.8rem; margin-top: 6px;">
              🛡️ Kredensial rahasia (<code>SECRET_API_KEY</code>, database password) diisolasi di lingkungan server dan diabaikan oleh <code>.gitignore</code>.
            </p>
          </div>
        </div>

        <div class="footer-bottom-bar">
          <div>
            &copy; ${currentYear} <strong>${config.studentName}</strong> (${config.studentNim}) — Seluruh Hak Cipta Dilindungi.
          </div>
          <div style="display: flex; gap: 16px;">
            <a href="https://github.com/rlfian/PAW-Pertemuan-6" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">
              GitHub Repository
            </a>
            <a href="https://syahrilarfianalmazril.vercel.app" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">
              Website Pribadi
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
