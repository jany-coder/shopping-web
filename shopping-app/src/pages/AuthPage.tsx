import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { loginAuth, signupAuth } from '../api/authClient'
import { getErrorMessage } from '../lib/getErrorMessage'
import { writeAuthSession } from '../lib/authSession'

export function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const mode: 'login' | 'signup' = searchParams.get('mode') === 'signup' ? 'signup' : 'login'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res =
        mode === 'login'
          ? await loginAuth({ email: email.trim(), password })
          : await signupAuth({ name: name.trim(), email: email.trim(), password })
      writeAuthSession(res.token, res.user)
      nav('/')
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Authentication failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="m-0 text-2xl font-bold text-zinc-900">{mode === 'login' ? 'Sign In' : 'Sign Up'}</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {mode === 'login'
            ? 'Sign in with your account to continue.'
            : 'Create your account to get started.'}
        </p>
        <form className="mt-6 space-y-4" onSubmit={(e) => void onSubmit(e)}>
          {mode === 'signup' ? (
            <label className="block space-y-1">
              <span className="text-sm font-medium text-zinc-700">Name</span>
              <input
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
              />
            </label>
          ) : null}
          <label className="block space-y-1">
            <span className="text-sm font-medium text-zinc-700">Email</span>
            <input
              type="email"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium text-zinc-700">Password</span>
            <input
              type="password"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </label>
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-md bg-ink py-2 text-sm font-semibold text-white disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create account'}
          </button>
        </form>
        <div className="mt-4 flex items-center justify-between text-sm">
          <button
            type="button"
            className="text-zinc-600 underline-offset-2 hover:underline"
            onClick={() => {
              const next = mode === 'login' ? 'signup' : 'login'
              setError('')
              if (next === 'login') setName('')
              setSearchParams({ mode: next })
            }}
          >
            {mode === 'login' ? 'Not a registered user? Sign up' : 'Already registered? Sign in'}
          </button>
          <Link className="text-zinc-600 underline-offset-2 hover:underline" to="/">
            Back
          </Link>
        </div>
      </div>
    </main>
  )
}

