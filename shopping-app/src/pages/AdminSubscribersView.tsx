import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaArrowLeft, FaBoxOpen, FaExclamationCircle, FaSyncAlt, FaUser, FaUsers } from 'react-icons/fa'
import { ProductManager } from '../components/admin/ProductManager'
import { SubscriberTable } from '../components/admin/SubscriberTable'
import { UsersTable } from '../components/admin/UsersTable'
import { useAdminProducts } from '../hooks/useAdminProducts'
import { useAdminSubscribers } from '../hooks/useAdminSubscribers'
import { useAdminUsers } from '../hooks/useAdminUsers'
import { clearAdminDemoSession } from '../lib/adminDemoAuth'

type AdminSubscribersViewProps = {
  onLogout: () => void
}

export function AdminSubscribersView({ onLogout }: AdminSubscribersViewProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'subscribers' | 'users'>('products')
  const { listState, reload, removeSubscriber, deleteError, deletingEmail } = useAdminSubscribers()
  const { state: productsState } = useAdminProducts()
  const { usersState, reloadUsers } = useAdminUsers()

  async function handleDelete(email: string) {
    if (!window.confirm(`Remove ${email} from the newsletter list?`)) return
    await removeSubscriber(email)
  }

  const loading = listState.status === 'loading'
  const listError = listState.status === 'error' ? listState.message : ''
  const subscribers = listState.status === 'ready' ? listState.subscribers : []
  const subscriberCount = listState.status === 'ready' ? listState.subscribers.length : 0
  const productCount = productsState.status === 'ready' ? productsState.products.length : 0
  const users = usersState.status === 'ready' ? usersState.users : []
  const usersCount = usersState.status === 'ready' ? usersState.users.length : 0
  const usersError = usersState.status === 'error' ? usersState.message : ''

  function handleRefresh() {
    reload()
    reloadUsers()
  }

  return (
    <div className="min-h-screen bg-[#f4f6f5] text-ink">
      <header className="border-b border-ink/10 bg-surface shadow-sm">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 md:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-ink/55 uppercase">Admin Panel</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink">Dashboard</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/15 bg-white px-3 py-2 text-sm text-ink/80 hover:bg-ink/5 disabled:opacity-60"
              onClick={handleRefresh}
              disabled={loading || usersState.status === 'loading'}
            >
              <FaSyncAlt className={`size-3 ${loading || usersState.status === 'loading' ? 'animate-spin' : ''}`} aria-hidden />
              {loading || usersState.status === 'loading' ? 'Refreshing…' : 'Refresh'}
            </button>
            <button
              type="button"
              className="rounded-md border border-ink/15 bg-white px-3 py-2 text-sm text-ink/80 hover:bg-ink/5"
              onClick={() => {
                clearAdminDemoSession()
                onLogout()
              }}
            >
              Log out
            </button>
            <Link
              className="inline-flex items-center gap-2 rounded-md border border-ink/15 bg-white px-3 py-2 text-sm text-ink/80 hover:bg-ink/5"
              to="/"
            >
              <FaArrowLeft className="size-3" aria-hidden />
              Back
            </Link>
          </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-ink/55">Products</p>
                <p className="mt-2 text-3xl font-semibold leading-none text-ink">{productCount}</p>
              </div>
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand/25 text-ink">
                <FaBoxOpen className="size-4" aria-hidden />
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-ink/55">Subscribers</p>
                <p className="mt-2 text-3xl font-semibold leading-none text-ink">{subscriberCount}</p>
              </div>
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand/25 text-ink">
                <FaUsers className="size-4" aria-hidden />
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-ink/55">Users</p>
                <p className="mt-2 text-3xl font-semibold leading-none text-ink">{usersCount}</p>
              </div>
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand/25 text-ink">
                <FaUser className="size-4" aria-hidden />
              </span>
            </div>
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
        {usersError ? (
          <div className="mt-3 flex gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            <FaExclamationCircle className="mt-0.5 size-4 shrink-0 text-red-600" aria-hidden />
            <span>{usersError}</span>
          </div>
        ) : null}

        <section className="mt-6 rounded-2xl border border-ink/10 bg-surface p-5 shadow-md md:p-6">
          <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-ink/10 pb-4">
            <button
              type="button"
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                activeTab === 'products'
                  ? 'bg-brand text-ink'
                  : 'border border-ink/15 bg-white text-ink/80 hover:bg-ink/5'
              }`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button
              type="button"
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                activeTab === 'subscribers'
                  ? 'bg-brand text-ink'
                  : 'border border-ink/15 bg-white text-ink/80 hover:bg-ink/5'
              }`}
              onClick={() => setActiveTab('subscribers')}
            >
              Subscribers
            </button>
            <button
              type="button"
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                activeTab === 'users'
                  ? 'bg-brand text-ink'
                  : 'border border-ink/15 bg-white text-ink/80 hover:bg-ink/5'
              }`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
          </div>

          {activeTab === 'products' ? (
            <>
              <h2 className="m-0 text-lg font-semibold text-ink">Manage products</h2>
              <p className="mt-1 text-sm text-ink/55">Add new items and remove outdated products.</p>
              <ProductManager embedded />
            </>
          ) : activeTab === 'subscribers' ? (
            <>
              <h2 className="m-0 text-lg font-semibold text-ink">Manage subscribers</h2>
              <p className="mt-1 text-sm text-ink/55">View newsletter signups and remove addresses.</p>
              <div className="mt-5">
                <SubscriberTable
                  loading={loading}
                  listError={listError}
                  subscribers={subscribers}
                  deletingEmail={deletingEmail}
                  onDelete={handleDelete}
                />
              </div>
            </>
          ) : (
            <>
              <h2 className="m-0 text-lg font-semibold text-ink">Registered users</h2>
              <p className="mt-1 text-sm text-ink/55">View all signed up users in the system.</p>
              <div className="mt-5">
                <UsersTable loading={usersState.status === 'loading'} listError={usersError} users={users} />
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  )
}
