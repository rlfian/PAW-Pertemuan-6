import type { AppConfig } from '../services/env';

export function renderFooter(config: AppConfig): string {
  return `
    <footer class="lms-footer" id="helpdesk">
      <div class="container">
        <div class="footer-cols-grid">
          <!-- Col 1: Brand & Institution Info -->
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <span style="font-weight:800; font-size:1.05rem; color:#ffffff;">EduCore LMS</span>
            </div>
            <p class="footer-text" style="margin-bottom:12px;">
              Sistem Informasi Akademik &amp; Learning Management System Terpadu UIN Sunan Gunung Djati Bandung.
            </p>
            <p class="footer-text" style="font-size:0.75rem; color:#64748b;">
              📍 Kampus 1: Jl. A.H. Nasution No. 105, Cipadung, Cibiru, Kota Bandung, Jawa Barat 40614.
            </p>
          </div>

          <!-- Col 2: Layanan Mahasiswa -->
          <div>
            <h4 class="footer-col-title">Layanan Mahasiswa</h4>
            <ul class="footer-links-list">
              <li><a href="#krs">Panduan Registrasi KRS Online</a></li>
              <li><a href="#repository">Sistem Repositori Skripsi &amp; Tugas Akhir</a></li>
              <li><a href="#library">Perpustakaan Digital (e-Library)</a></li>
              <li><a href="#scholarship">Layanan Kemahasiswaan &amp; Beasiswa</a></li>
            </ul>
          </div>

          <!-- Col 3: Kalender Akademik -->
          <div>
            <h4 class="footer-col-title">Kalender Akademik</h4>
            <ul class="footer-links-list">
              <li>Pekan Perkuliahan: <span style="color:#cbd5e1;">23 Sep – 13 Des 2024</span></li>
              <li>Ujian Tengah Semester: <span style="color:#38bdf8;">04 Nov – 15 Nov 2024</span></li>
              <li>Minggu Tenang: <span style="color:#cbd5e1;">16 Des – 20 Des 2024</span></li>
              <li>Ujian Akhir Semester: <span style="color:#cbd5e1;">23 Des – 03 Jan 2025</span></li>
            </ul>
          </div>

          <!-- Col 4: Bantuan IT Helpdesk -->
          <div>
            <h4 class="footer-col-title">Bantuan IT Helpdesk</h4>
            <div class="footer-contact-box">
              <div class="contact-row">
                <span>📧</span>
                <a href="mailto:helpdesk.lms@uinsgd.ac.id">helpdesk.lms@uinsgd.ac.id</a>
              </div>
              <div class="contact-row">
                <span>💬</span>
                <span>WhatsApp Hotline: 0812-3456-7890</span>
              </div>
              <div class="contact-row" style="font-size:0.75rem; color:#64748b;">
                <span>⏰</span>
                <span>Jam Layanan: Senin – Jumat (08:00 – 16:00 WIB)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Copyright -->
        <div class="footer-bottom-strip">
          <div>
            &copy; 2024 Pusat Teknologi Informasi &amp; Pangkalan Data (PTIPD) UIN Sunan Gunung Djati Bandung. Hak Cipta Dilindungi.
          </div>
          <div style="display:flex; gap:16px;">
            <a href="#privasi">Kebijakan Privasi</a>
            <span>•</span>
            <a href="#syarat">Syarat Ketentuan</a>
            <span>•</span>
            <span class="footer-student-credit">Mahasiswa: ${config.studentName} (${config.studentNim})</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}
