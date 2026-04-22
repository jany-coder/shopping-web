const SESSION_KEY = 'fcs-mart-admin-demo'

const DEMO_USERNAME = 'admin'
const DEMO_PASSWORD = 'admin'

export function isAdminDemoSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function setAdminDemoSession(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearAdminDemoSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

/** Fake demo gate — not secure; credentials exist only in client JS. */
export function adminDemoLoginOk(username: string, password: string): boolean {
  return username.trim() === DEMO_USERNAME && password === DEMO_PASSWORD
}
