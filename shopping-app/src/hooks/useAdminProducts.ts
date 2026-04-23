import { useCallback, useEffect, useState } from 'react'
import {
  createAdminProduct,
  deleteAdminProduct,
  fetchAdminProducts,
  type AdminNewProductInput,
} from '../api/adminClient'
import { getErrorMessage } from '../lib/getErrorMessage'
import type { ProductDto } from '../types/product'

type ProductsState =
  | { status: 'loading' }
  | { status: 'ready'; products: ProductDto[] }
  | { status: 'error'; message: string }

export function useAdminProducts() {
  const [state, setState] = useState<ProductsState>({ status: 'loading' })
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const reload = useCallback(() => {
    setState({ status: 'loading' })
    fetchAdminProducts()
      .then((products) => setState({ status: 'ready', products }))
      .catch((e: unknown) => {
        setState({ status: 'error', message: getErrorMessage(e, 'Could not load products') })
      })
  }, [])

  useEffect(() => {
    let cancelled = false
    fetchAdminProducts()
      .then((products) => {
        if (!cancelled) setState({ status: 'ready', products })
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setState({ status: 'error', message: getErrorMessage(e, 'Could not load products') })
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  const createProduct = useCallback(async (input: AdminNewProductInput) => {
    setError('')
    setBusyId('__create__')
    try {
      const created = await createAdminProduct(input)
      setState((prev) =>
        prev.status === 'ready'
          ? { status: 'ready', products: [created, ...prev.products] }
          : { status: 'ready', products: [created] },
      )
    } catch (e: unknown) {
      setError(getErrorMessage(e, 'Could not add product'))
    } finally {
      setBusyId(null)
    }
  }, [])

  const removeProduct = useCallback(async (id: string) => {
    setError('')
    setBusyId(id)
    try {
      await deleteAdminProduct(id)
      setState((prev) =>
        prev.status === 'ready'
          ? { status: 'ready', products: prev.products.filter((p) => p.id !== id) }
          : prev,
      )
    } catch (e: unknown) {
      setError(getErrorMessage(e, 'Could not remove product'))
    } finally {
      setBusyId(null)
    }
  }, [])

  return { state, reload, createProduct, removeProduct, busyId, error }
}

