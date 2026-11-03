import { spawn } from 'node:child_process'

const vite = spawn(
  process.execPath,
  ['node_modules/vite/bin/vite.js', ...process.argv.slice(2)],
  { stdio: 'inherit' },
)

const api = spawn(
  process.execPath,
  ['node_modules/json-server/lib/cli/bin.js', '--watch', 'db.json', '--host', '127.0.0.1', '--port', '3000'],
  { stdio: 'inherit' },
)

const children = [vite, api]
let shuttingDown = false

const shutdown = (exitCode = 0) => {
  if (shuttingDown) return
  shuttingDown = true
  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM')
  }
  process.exitCode = exitCode
}

for (const child of children) {
  child.on('error', (error) => {
    console.error('No se pudo iniciar uno de los servidores:', error.message)
    shutdown(1)
  })
  child.on('exit', (code) => {
    if (!shuttingDown) shutdown(code ?? 1)
  })
}

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))
