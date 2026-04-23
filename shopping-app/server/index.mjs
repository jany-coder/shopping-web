import app from './app.mjs'

const PORT = Number(process.env.PORT) || 3001

const server = app.listen(PORT, '127.0.0.1', () => {
  console.log(`Mock API listening on http://127.0.0.1:${PORT}`)
  console.log('Routes: /api/health, /api/products, /api/newsletter, /api/admin/subscribers (open demo)')
})

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(
      `\n[ERROR] Port ${PORT} is already in use. Another app may be answering /api.\n` +
        `  Fix: lsof -i :${PORT} (Mac) and stop it, or PORT=3002 node server/index.mjs + VITE_API_PROXY_PORT=3002 in .env.local\n`
    )
  }
  throw err
})
