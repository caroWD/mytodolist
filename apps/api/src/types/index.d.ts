declare module 'bun' {
  interface Env {
    NODE_ENV?: 'development' | 'production' | 'test'
    PORT?: number
  }
}
