import { useCallback, useEffect, useState } from 'react'
import { deleteAdminSubscriber, fetchAdminSubscribers } from '../api/adminClient'
import { getErrorMessage } from '../lib/getErrorMessage'
import type { SubscriberRecord } from '../types/subscriber'

type AdminListState =
  | { status: 'loading' }
  | { status: 'ready'; subscribers: SubscriberRecord[] }
  | { status: 'error'; message: string }

export function useAdminSubscribers() {
  const [listState, setListState] = useState<AdminListState>({ status: 'loading' })
  const [deleteError, setDeleteError] = useState('')
  const [deletingEmail, setDeletingEmail] = useState<string | null>(null)

  const reload = useCallback(() => {
    setListState({ status: 'loading' })
    fetchAdminSubscribers()
      .then((subscribers) => setListState({ status: 'ready', subscribers }))
      .catch((error: unknown) => {
        setListState({
          status: 'error',
          message: getErrorMessage(error, 'Could not load subscribers'),
        })
      })
  }, [])

  useEffect(() => {
    let cancelled = false
    fetchAdminSubscribers()
      .then((subscribers) => {
        if (!cancelled) setListState({ status: 'ready', subscribers })
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setListState({
            status: 'error',
            message: getErrorMessage(error, 'Could not load subscribers'),
          })
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  const removeSubscriber = useCallback(async (email: string) => {
    setDeleteError('')
    setDeletingEmail(email)
    try {
      await deleteAdminSubscriber(email)
      setListState((prev) => {
        if (prev.status !== 'ready') return prev
        return {
          status: 'ready',
          subscribers: prev.subscribers.filter((s) => s.email !== email),
        }
      })
    } catch (error: unknown) {
      setDeleteError(getErrorMessage(error, 'Could not remove subscriber'))
    } finally {
      setDeletingEmail(null)
    }
  }, [])

  return {
    listState,
    reload,
    removeSubscriber,
    deleteError,
    deletingEmail,
  }
}
