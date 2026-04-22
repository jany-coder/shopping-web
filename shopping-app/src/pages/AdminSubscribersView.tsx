import { Link } from 'react-router-dom'
import { FaArrowLeft, FaExclamationCircle, FaSyncAlt } from 'react-icons/fa'
import { SubscriberTable } from '../components/admin/SubscriberTable'
import { useAdminSubscribers } from '../hooks/useAdminSubscribers'
import { clearAdminDemoSession } from '../lib/adminDemoAuth'

type AdminSubscribersViewProps = {
  onLogout: () => void
}

export function AdminSubscribersView({ onLogout }: AdminSubscribersViewProps) {
  const { listState, reload, removeSubscriber, deleteError, deletingEmail } = useAdminSubscribers()

  async function handleDelete(email: string) {
    if (!window.confirm(`Remove ${email} from the newsletter list?`)) return
    await removeSubscriber(email)
  }

  const loading = listState.status === 'loading'
  const listError = listState.status === 'error' ? listState.message : ''
  const subscribers = listState.status === 'ready' ? listState.subscribers : []
  const count = listState.status === 'ready' ? listState.subscribers.length : null

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-100 via-white to-brand/7 text-ink">
      <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/85 px-4 py-5 shadow-sm backdrop-blur-md md:px-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Newsletter</p>
            <h1 className="mt-1.5 text-2xl font-black tracking-tight text-zinc-900 md:text-3xl">Subscribers</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/15 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={reload}
              disabled={loading}
            >
              <FaSyncAlt className={`size-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden />
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
            <button
              type="button"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
              onClick={() => {
                clearAdminDemoSession()
                onLogout()
              }}
            >
              Log out
            </button>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
              to="/"
            >
              <FaArrowLeft className="size-3 opacity-70" aria-hidden />
              Back to site
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
        {count !== null ? (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-baseline gap-1.5 rounded-2xl bg-white px-4 py-2 text-sm shadow-md shadow-zinc-900/4 ring-1 ring-zinc-200/80">
              <span className="text-2xl font-black tabular-nums tracking-tight text-zinc-900">{count}</span>
              <span className="font-medium text-zinc-500">
                subscriber{count === 1 ? '' : 's'}
              </span>
            </span>
          </div>
        ) : null}

        {listError ? (
          <div
            className="mb-6 flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50/90 px-4 py-4 text-sm text-red-900 shadow-sm sm:flex-row sm:items-center sm:justify-between md:px-8"
            role="alert"
          >
            <span className="flex gap-3">
              <FaExclamationCircle className="mt-0.5 size-5 shrink-0 text-red-600" aria-hidden />
              <span className="leading-snug">{listError}</span>
            </span>
            <button
              type="button"
              className="shrink-0 self-start rounded-xl bg-white px-4 py-2 text-sm font-semibold text-red-800 shadow-sm ring-1 ring-red-200/80 transition hover:bg-red-50 sm:self-center"
              onClick={reload}
            >
              Try again
            </button>
          </div>
        ) : null}

        {deleteError ? (
          <div
            className="mb-6 flex gap-3 rounded-2xl border border-red-100 bg-red-50/90 px-4 py-4 text-sm text-red-900 shadow-sm md:px-8"
            role="alert"
          >
            <FaExclamationCircle className="mt-0.5 size-5 shrink-0 text-red-600" aria-hidden />
            <span className="leading-snug">{deleteError}</span>
          </div>
        ) : null}

        <SubscriberTable
          loading={loading}
          listError={listError}
          subscribers={subscribers}
          deletingEmail={deletingEmail}
          onDelete={handleDelete}
        />
      </main>
    </div>
  )
}
