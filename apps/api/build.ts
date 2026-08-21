const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  target: 'node',
  outdir: './dist',
  minify: true,
})

if (!result.success) {
  console.error('Build failed:', result.logs)
  process.exit(1)
}
