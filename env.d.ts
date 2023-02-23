/// <reference types="vite/client" />

interface Window {
  readonly PKG: Record<string, string>;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}