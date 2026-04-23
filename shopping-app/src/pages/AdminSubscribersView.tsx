import { Link } from 'react-router-dom'
import { FaArrowLeft, FaExclamationCircle, FaSyncAlt } from 'react-icons/fa'
import { ProductManager } from '../components/admin/ProductManager'
import { SubscriberTable } from '../components/admin/SubscriberTable'
import { useAdminProducts } from '../hooks/useAdminProducts'
import { useAdminSubscribers } from '../hooks/useAdminSubscribers'
import { clearAdminDemoSession } from '../lib/adminDemoAuth'

type AdminSubscribersViewProps = {
  onLogout: () => void
}

export function AdminSubscribersView({ onLogout }: AdminSubscribersViewProps) {
  const { listState, reload, removeSubscriber, deleteError, deletingEmail } = useAdminSubscribers()
  const { state: productsState } = useAdminProducts()

  async function handleDelete(email: string) {
    if (!window.confirm(`Remove ${email} from the newsletter list?`)) return
    await removeSubscriber(email)
  }

  const loading = listState.status === 'loading'
  const listError = listState.status === 'error' ? listState.message : ''
  const subscribers = listState.status === 'ready' ? listState.subscribers : []
  const subscriberCount = listState.status === 'ready' ? listState.subscribers.length : 0
  const productCount = productsState.status === 'ready' ? productsState.products.length : 0

  return (
    <div className="min-h-screen bg-zinc-100 text-ink">
      <header className="border-b border-zinc-200 bg-white px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-500">Admin</p>
            <h1 className="mt-1 text-2xl font-semibold text-zinc-900">Dashboard</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
              onClick={reload}
              disabled={loading}
            >
              <FaSyncAlt className={`size-3 ${loading ? 'animate-spin' : ''}`} aria-hidden />
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
            <button
              type="button"
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
              onClick={() => {
                clearAdminDemoSession()
                onLogout()
              }}
            >
              Log out
            </button>
            <Link
              className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
              to="/"
            >
              <FaArrowLeft className="size-3" aria-hidden />
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-8">
        <section className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4">
            <p className="text-sm text-zinc-500">Products</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">{productCount}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4">
            <p className="text-sm text-zinc-500">Subscribers</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">{subscriberCount}</p>
          </div>
        </section>

        {listError ? (
          <div
            className="mt-4 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:flex-row sm:items-center sm:justify-between"
            role="alert"
          >
            <span className="flex gap-2">
              <FaExclamationCircle className="mt-0.5 size-4 shrink-0 text-red-600" aria-hidden />
              <span>{listError}</span>
            </span>
            <button
              type="button"
              className="self-start rounded border border-red-300 bg-white px-3 py-1.5 text-sm text-red-800 hover:bg-red-100 sm:self-center"
              onClick={reload}
            >
              Try again
            </button>
          </div>
        ) : null}

        {deleteError ? (
          <div className="mt-3 flex gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            <FaExclamationCircle className="mt-0.5 size-4 shrink-0 text-red-600" aria-hidden />
            <span>{deleteError}</span>
          </div>
        ) : null}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <section className="rounded-xl border border-zinc-200 bg-white p-4 md:p-5">
            <h2 className="m-0 text-lg font-semibold text-zinc-900">Manage products</h2>
            <p className="mt-1 text-sm text-zinc-500">Add new items and remove outdated products.</p>
            <ProductManager embedded />
          </section>

          <section className="rounded-xl border border-zinc-200 bg-white p-4 md:p-5">
            <h2 className="m-0 text-lg font-semibold text-zinc-900">Manage subscribers</h2>
            <p className="mt-1 text-sm text-zinc-500">View newsletter signups and remove addresses.</p>
            <div className="mt-4">
              <SubscriberTable
                loading={loading}
                listError={listError}
                subscribers={subscribers}
                deletingEmail={deletingEmail}
                onDelete={handleDelete}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
