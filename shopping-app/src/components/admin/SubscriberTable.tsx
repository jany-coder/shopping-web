import type { SubscriberRecord } from '../../types/subscriber'
import { formatIsoDateTime } from '../../lib/formatIsoDateTime'

const ROW_GRID =
  'flex flex-col gap-2 md:grid md:grid-cols-[minmax(0,1fr)_minmax(11rem,auto)_minmax(9rem,auto)] md:items-center md:gap-4'

type SubscriberTableProps = {
  loading: boolean
  listError: string
  subscribers: SubscriberRecord[]
  deletingEmail: string | null
  onDelete: (email: string) => void
}

export function SubscriberTable({
  loading,
  listError,
  subscribers,
  deletingEmail,
  onDelete,
}: SubscriberTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-md">
      <div className="hidden border-b border-ink/8 bg-ink/3 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink/50 md:grid md:grid-cols-[minmax(0,1fr)_minmax(11rem,auto)_minmax(9rem,auto)] md:items-center md:gap-4 md:px-6">
        <span>Email</span>
        <span>Subscribed</span>
        <span className="text-center">Action</span>
      </div>
      <ul>
        {loading ? (
          <li className="px-4 py-8 text-center text-sm text-ink/55 md:px-6">Loading…</li>
        ) : subscribers.length === 0 && !listError ? (
          <li className="px-4 py-8 text-center text-sm text-ink/55 md:px-6">No subscribers yet.</li>
        ) : subscribers.length === 0 ? (
          <li className="px-4 py-8 text-center text-sm text-ink/55 md:px-6">—</li>
        ) : (
          subscribers.map((row) => (
            <li
              key={row.email}
              className="border-b border-ink/8 px-4 py-3 last:border-0 md:px-6"
            >
              <div className={ROW_GRID}>
                <span className="min-w-0 break-all font-mono text-sm text-ink md:text-base">
                  {row.email}
                </span>
                <span className="text-xs text-ink/55 md:text-sm">
                  <span className="md:hidden">Subscribed: </span>
                  {formatIsoDateTime(row.subscribedAt)}
                </span>
                <div className="flex shrink-0 justify-center">
                  <button
                    type="button"
                    className="whitespace-nowrap rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-800 hover:bg-red-50 disabled:opacity-50 md:text-sm"
                    disabled={deletingEmail !== null}
                    aria-busy={deletingEmail === row.email}
                    onClick={() => void onDelete(row.email)}
                  >
                    {deletingEmail === row.email ? 'Removing…' : 'Delete'}
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
