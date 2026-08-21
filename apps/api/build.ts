const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  compile: true,
  target: 'node',
  minify: true,
})

if (!result.success) {
  console.error('Build failed:', result.logs)
  process.exit(1)
}
