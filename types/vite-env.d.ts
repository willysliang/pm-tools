/// <reference types="vite/client" />

/**
 * import.meta.env 中相关定义
 */
export interface ImportMetaEnv {
  /** API 的基础域名 */
  VITE_API_DOMAIN: string;
}

declare module 'vite/client' {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
