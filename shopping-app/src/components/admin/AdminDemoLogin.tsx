import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { adminDemoLoginOk, setAdminDemoSession } from '../../lib/adminDemoAuth'

type AdminDemoLoginProps = {
  onLoggedIn: () => void
}

export function AdminDemoLogin({ onLoggedIn }: AdminDemoLoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (adminDemoLoginOk(username, password)) {
      setAdminDemoSession()
      onLoggedIn()
      return
    }
    setError('Invalid username or password.')
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 text-ink">
      <header className="border-b border-zinc-200 bg-white px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <span className="text-sm font-semibold text-zinc-800">Admin</span>
          <Link className="text-sm text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline" to="/">
            Back to site
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-lg font-semibold text-zinc-900">Sign in</h1>
          <div className="mt-3 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm leading-relaxed text-zinc-800">
            <p className="m-0">
              <span className="font-medium text-zinc-600">username:</span> admin
            </p>
            <p className="mt-1 mb-0">
              <span className="font-medium text-zinc-600">password:</span> admin
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-zinc-700" htmlFor="admin-demo-user">
                Username
              </label>
              <input
                id="admin-demo-user"
                name="username"
                autoComplete="username"
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-400 focus:ring-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700" htmlFor="admin-demo-pass">
                Password
              </label>
              <input
                id="admin-demo-pass"
                name="password"
                type="password"
                autoComplete="current-password"
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-400 focus:ring-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error ? (
              <p className="text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className="w-full rounded-md bg-ink py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
