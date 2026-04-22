/** Formats API ISO timestamps for subscriber lists (locale-aware). */
export function formatIsoDateTime(iso: string | undefined): string {
  if (!iso?.trim()) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}
