/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV_API_KEY: string
  readonly VITE_ENV_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}