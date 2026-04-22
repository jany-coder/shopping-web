import { useState } from 'react'
import { AdminDemoLogin } from '../components/admin/AdminDemoLogin'
import { isAdminDemoSession } from '../lib/adminDemoAuth'
import { AdminSubscribersView } from './AdminSubscribersView'

export function AdminPage() {
  const [authed, setAuthed] = useState(() => isAdminDemoSession())

  if (!authed) {
    return <AdminDemoLogin onLoggedIn={() => setAuthed(true)} />
  }

  return <AdminSubscribersView onLogout={() => setAuthed(false)} />
}
