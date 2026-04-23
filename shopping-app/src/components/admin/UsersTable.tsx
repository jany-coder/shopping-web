import { FaUser } from 'react-icons/fa'
import { formatIsoDateTime } from '../../lib/formatIsoDateTime'
import type { AdminUserRecord } from '../../types/adminUser'

type UsersTableProps = {
  loading: boolean
  listError: string
  users: AdminUserRecord[]
}

export function UsersTable({ loading, listError, users }: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
      <div className="hidden border-b border-ink/10 bg-brand/20 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink/60 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(12rem,auto)] md:items-center md:gap-5 md:px-6">
        <span>Name</span>
        <span>Email</span>
        <span>Joined</span>
      </div>
      <ul className="divide-y divide-ink/10">
        {loading ? (
          <li className="px-4 py-8 text-center text-sm text-ink/55 md:px-6">Loading users…</li>
        ) : users.length === 0 && !listError ? (
          <li className="px-4 py-8 text-center text-sm text-ink/55 md:px-6">No users yet.</li>
        ) : users.length === 0 ? (
          <li className="px-4 py-8 text-center text-sm text-ink/55 md:px-6">—</li>
        ) : (
          users.map((user) => (
            <li key={user.id} className="px-4 py-3.5 transition-colors hover:bg-brand/10 md:px-6">
              <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(12rem,auto)] md:items-center md:gap-5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand/20 text-ink/80" aria-hidden>
                    <FaUser className="size-3.5" />
                  </span>
                  <span className="truncate text-sm font-medium text-ink">{user.name}</span>
                </div>
                <span className="truncate font-mono text-xs text-ink/70">{user.email}</span>
                <span className="inline-flex w-fit items-center rounded-full bg-brand/20 px-3 py-1 text-xs text-ink/70 ring-1 ring-brand/45">
                  {user.createdAt ? formatIsoDateTime(user.createdAt) : '—'}
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
