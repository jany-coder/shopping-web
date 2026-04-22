import { FaEnvelope, FaInbox, FaTrashAlt } from 'react-icons/fa'
import type { SubscriberRecord } from '../../types/subscriber'
import { formatIsoDateTime } from '../../lib/formatIsoDateTime'

const ROW_GRID =
  'flex flex-col gap-3 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(7.5rem,auto)] md:items-center md:gap-6'

type SubscriberTableProps = {
  loading: boolean
  listError: string
  subscribers: SubscriberRecord[]
  deletingEmail: string | null
  onDelete: (email: string) => void
}

function SkeletonRows() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <li
          key={i}
          className="border-b border-zinc-100/80 px-4 py-4 last:border-0 md:px-8"
        >
          <div className="flex animate-pulse items-center gap-4">
            <div className="size-11 shrink-0 rounded-2xl bg-zinc-200/80" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 max-w-[min(100%,20rem)] rounded-lg bg-zinc-200/80" />
              <div className="h-3 w-28 rounded-md bg-zinc-100 md:hidden" />
            </div>
            <div className="hidden h-8 w-36 shrink-0 rounded-full bg-zinc-200/70 md:block" />
            <div className="size-10 shrink-0 rounded-xl bg-zinc-200/70 md:ml-auto" />
          </div>
        </li>
      ))}
    </>
  )
}

export function SubscriberTable({
  loading,
  listError,
  subscribers,
  deletingEmail,
  onDelete,
}: SubscriberTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-900/6 ring-1 ring-black/3">
      <div className="hidden border-b border-zinc-100 bg-linear-to-r from-zinc-50 to-zinc-50/50 px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(7.5rem,auto)] md:items-center md:gap-6 md:px-8">
        <span>Email</span>
        <span>Subscribed</span>
        <span className="text-center">Action</span>
      </div>
      <ul className="divide-y divide-zinc-100/90">
        {loading ? (
          <SkeletonRows />
        ) : subscribers.length === 0 && !listError ? (
          <li className="px-4 py-16 md:px-8">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-brand/35 to-brand/10 text-ink/70 shadow-inner ring-1 ring-black/4">
                <FaInbox className="size-7" aria-hidden />
              </div>
              <p className="mt-5 text-lg font-bold tracking-tight text-zinc-900">No subscribers yet</p>
            </div>
          </li>
        ) : subscribers.length === 0 ? (
          <li className="px-4 py-12 text-center text-sm text-zinc-400 md:px-8">—</li>
        ) : (
          subscribers.map((row) => (
            <li
              key={row.email}
              className="group px-4 py-4 transition-colors hover:bg-zinc-50/90 md:px-8"
            >
              <div className={ROW_GRID}>
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand/40 to-brand/15 text-ink shadow-sm ring-1 ring-black/4"
                    aria-hidden
                  >
                    <FaEnvelope className="size-4 opacity-90" />
                  </span>
                  <span
                    className="truncate font-mono text-[0.8125rem] font-medium text-zinc-900 md:text-[0.9375rem]"
                    title={row.email}
                  >
                    {row.email}
                  </span>
                </div>
                <span className="inline-flex w-fit items-center rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium tabular-nums tracking-tight text-zinc-600 ring-1 ring-zinc-200/60 md:text-sm">
                  <span className="mr-1.5 text-zinc-400 md:hidden">Joined</span>
                  {formatIsoDateTime(row.subscribedAt)}
                </span>
                <div className="flex justify-center md:justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-white px-3.5 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 disabled:pointer-events-none disabled:opacity-45"
                    disabled={deletingEmail !== null}
                    aria-busy={deletingEmail === row.email}
                    title="Remove from list"
                    onClick={() => void onDelete(row.email)}
                  >
                    {deletingEmail === row.email ? (
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="size-3.5 animate-spin rounded-full border-2 border-red-300 border-t-red-700"
                          aria-hidden
                        />
                        Removing…
                      </span>
                    ) : (
                      <>
                        <FaTrashAlt className="size-3.5 opacity-90" aria-hidden />
                        Remove
                      </>
                    )}
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
