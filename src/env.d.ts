/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}
