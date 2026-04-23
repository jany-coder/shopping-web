import 'dotenv/config'
import { app } from './app.mjs'
import { connectDb } from './config/db.mjs'
import { seedProductsIfEmpty } from './seedProducts.mjs'

const PORT = Number(process.env.PORT) || 3001

async function start() {
  await connectDb()
  await seedProductsIfEmpty()

  const server = app.listen(PORT, '127.0.0.1', () => {
    console.log(`Mongo API listening on http://127.0.0.1:${PORT}`)
  })

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.error(
        `\n[ERROR] Port ${PORT} is already in use. Another app may be answering /api.\n` +
          `  Fix: lsof -i :${PORT} (Mac) and stop it, or PORT=3002 npm run dev\n`
      )
    }
    throw err
  })
}

start().catch((err) => {
  console.error('\n[ERROR] Failed to start backend server.')
  console.error(err)
  process.exit(1)
})
