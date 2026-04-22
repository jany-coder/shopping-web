import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import { subscribeNewsletter } from '../../api/client'
import { getErrorMessage } from '../../lib/getErrorMessage'
import { isValidEmail, normalizeEmail } from '../../lib/emailValidation'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = normalizeEmail(email)

    if (trimmed.length === 0) {
      setStatus('error')
      setMessage('Please enter your email address.')
      return
    }

    if (!isValidEmail(trimmed)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await subscribeNewsletter(trimmed)
      setStatus('success')
      setMessage(res.message ?? "You're on the list. Check your inbox for promos.")
      setEmail('')
    } catch (error: unknown) {
      setStatus('error')
      setMessage(getErrorMessage(error, 'Something went wrong. Please try again.'))
    }
  }

  return (
    <section className="bg-brand px-4 py-12 text-center text-white md:px-8 md:py-20">
      <h2 className="mx-auto max-w-4xl text-2xl font-black uppercase leading-tight tracking-wide text-white sm:text-3xl md:text-5xl">
        JOIN SHOPPING COMMUNITY TO
        <br />
        GET MONTHLY PROMO
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm text-white/90 sm:text-base md:mt-6 md:text-lg">
        Type your email down below and be young wild generation.
      </p>
      <form
        className="mx-auto mt-6 w-full max-w-2xl md:mt-8"
        onSubmit={(e) => void handleSubmit(e)}
        noValidate
      >
        <div className="flex items-center gap-2 rounded-xl bg-surface p-2 md:gap-3 md:p-3">
          <input
            className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-ink outline-none placeholder:text-ink/35 sm:px-3 sm:text-base md:py-3"
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Add your email here"
            value={email}
            disabled={status === 'loading'}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'error' || status === 'success') {
                setStatus('idle')
                setMessage('')
              }
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="shrink-0 rounded-lg bg-ink px-5 py-2 text-sm font-semibold uppercase tracking-wide text-surface disabled:opacity-60 sm:px-6 sm:py-3 sm:text-base"
          >
            {status === 'loading' ? '…' : 'SEND'}
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-ink md:text-sm">
          <Link
            to="/admin"
            className="font-medium text-ink underline decoration-ink/40 underline-offset-2 transition-colors hover:text-black hover:decoration-black"
          >
            Admin — newsletter subscribers
          </Link>
        </p>
      </form>

      <div
        className="mx-auto mt-4 max-w-2xl md:mt-5"
        aria-live="polite"
        aria-atomic="true"
      >
        {status === 'success' && message ? (
          <div
            className="flex items-start gap-3 rounded-xl border border-ink/10 bg-surface px-4 py-3 text-left text-ink shadow-md md:px-5 md:py-4"
            role="status"
          >
            <FaCheckCircle
              className="mt-0.5 size-5 shrink-0 text-green-600 md:size-6"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-bold md:text-base">You&apos;re subscribed</p>
              <p className="mt-1 text-sm leading-snug text-ink/80 md:text-base">{message}</p>
            </div>
          </div>
        ) : null}
        {status === 'error' && message ? (
          <p className="rounded-xl bg-red-950/35 px-4 py-3 text-left text-sm text-red-100 md:text-base" role="alert">
            {message}
          </p>
        ) : null}
      </div>
    </section>
  )
}
