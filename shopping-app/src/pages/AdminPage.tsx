import { Link } from 'react-router-dom'
import { SubscriberTable } from '../components/admin/SubscriberTable'
import { useAdminSubscribers } from '../hooks/useAdminSubscribers'

export function AdminPage() {
  const { listState, reload, removeSubscriber, deleteError, deletingEmail } = useAdminSubscribers()

  async function handleDelete(email: string) {
    if (!window.confirm(`Remove ${email} from the newsletter list?`)) return
    await removeSubscriber(email)
  }

  const loading = listState.status === 'loading'
  const listError = listState.status === 'error' ? listState.message : ''
  const subscribers = listState.status === 'ready' ? listState.subscribers : []

  return (
    <div className="min-h-screen bg-[#f4f6f5] text-ink">
      <header className="border-b border-ink/10 bg-surface px-4 py-4 shadow-sm md:px-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4">
          <h1 className="text-lg font-black tracking-wide md:text-xl">Subscribers</h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-sm font-medium text-ink hover:bg-ink/5"
              onClick={reload}
              disabled={loading}
            >
              {loading ? '…' : 'Refresh'}
            </button>
            <Link
              className="text-sm font-medium text-ink/70 underline-offset-2 hover:text-ink hover:underline"
              to="/"
            >
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-10">
        {listError ? (
          <div
            className="mb-4 flex flex-col gap-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800 sm:flex-row sm:items-center sm:justify-between"
            role="alert"
          >
            <span>{listError}</span>
            <button
              type="button"
              className="shrink-0 rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-900 hover:bg-red-100"
              onClick={reload}
            >
              Try again
            </button>
          </div>
        ) : null}

        {deleteError ? (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {deleteError}
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
