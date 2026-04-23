import { useCallback, useEffect, useState } from 'react'
import { fetchAdminUsers } from '../api/adminClient'
import { getErrorMessage } from '../lib/getErrorMessage'
import type { AdminUserRecord } from '../types/adminUser'

type AdminUsersState =
  | { status: 'loading' }
  | { status: 'ready'; users: AdminUserRecord[] }
  | { status: 'error'; message: string }

export function useAdminUsers() {
  const [usersState, setUsersState] = useState<AdminUsersState>({ status: 'loading' })

  const reloadUsers = useCallback(() => {
    setUsersState({ status: 'loading' })
    fetchAdminUsers()
      .then((users) => setUsersState({ status: 'ready', users }))
      .catch((error: unknown) => {
        setUsersState({ status: 'error', message: getErrorMessage(error, 'Could not load users') })
      })
  }, [])

  useEffect(() => {
    let cancelled = false
    fetchAdminUsers()
      .then((users) => {
        if (!cancelled) setUsersState({ status: 'ready', users })
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setUsersState({ status: 'error', message: getErrorMessage(error, 'Could not load users') })
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { usersState, reloadUsers }
}
