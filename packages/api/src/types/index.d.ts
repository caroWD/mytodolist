declare module 'bun' {
  interface Env {
    NODE_ENV?: 'development' | 'production'
    PORT?: number
  }
}
