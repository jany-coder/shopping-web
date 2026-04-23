export const AUTH_TOKEN_KEY = 'fcs-auth-token'
export const AUTH_USER_KEY = 'fcs-auth-user'

export type AuthSessionUser = {
  id: string
  name: string
  email: string
}

export function readAuthUser(): AuthSessionUser | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(AUTH_USER_KEY)
  if (!raw) return null
  try {
    const parsed: unknown = JSON.parse(raw)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof (parsed as { id?: unknown }).id === 'string' &&
      typeof (parsed as { name?: unknown }).name === 'string' &&
      typeof (parsed as { email?: unknown }).email === 'string'
    ) {
      return parsed as AuthSessionUser
    }
  } catch {
    return null
  }
  return null
}

export function isAuthed(): boolean {
  if (typeof window === 'undefined') return false
  return Boolean(window.localStorage.getItem(AUTH_TOKEN_KEY))
}

export function writeAuthSession(token: string, user: AuthSessionUser): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(AUTH_TOKEN_KEY, token)
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
  window.dispatchEvent(new Event('fcs-auth-changed'))
}

export function clearAuthSession(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
  window.localStorage.removeItem(AUTH_USER_KEY)
  window.dispatchEvent(new Event('fcs-auth-changed'))
}

