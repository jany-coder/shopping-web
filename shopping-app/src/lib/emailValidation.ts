const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(email: string): string {
  return email.trim()
}

export function isValidEmail(email: string): boolean {
  const t = normalizeEmail(email)
  if (t.length === 0 || t.length > 254) return false
  return EMAIL_REGEX.test(t)
}
