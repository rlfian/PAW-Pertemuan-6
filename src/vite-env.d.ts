/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_STUDENT_NAME: string;
  readonly VITE_STUDENT_NIM: string;
  readonly VITE_COURSE_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
