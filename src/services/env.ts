/**
 * Service untuk membaca environment variables Vite secara type-safe.
 * Vite mengekspos variabel lingkungan dengan awalan VITE_ melalui `import.meta.env`.
 */

export interface AppConfig {
  readonly appTitle: string;
  readonly appVersion: string;
  readonly appEnv: string;
  readonly studentName: string;
  readonly studentNim: string;
  readonly courseName: string;
}

export function getAppConfig(): AppConfig {
  return {
    appTitle: import.meta.env.VITE_APP_TITLE || 'TaskFlow PAW',
    appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    appEnv: import.meta.env.VITE_APP_ENV || 'production',
    studentName: import.meta.env.VITE_STUDENT_NAME || 'Rio Alfian',
    studentNim: import.meta.env.VITE_STUDENT_NIM || '1247050145',
    courseName: import.meta.env.VITE_COURSE_NAME || 'Pengembangan Aplikasi Web',
  };
}
