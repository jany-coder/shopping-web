import { useCallback, useEffect, useState } from 'react'
import { getProducts } from '../api/client'
import { getErrorMessage } from '../lib/getErrorMessage'
import type { ProductDto } from '../types/product'

type State =
  | { status: 'loading' }
  | { status: 'ok'; data: ProductDto[] }
  | { status: 'error'; message: string }

export function useProducts() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    getProducts()
      .then((data) => {
        if (!cancelled) setState({ status: 'ok', data })
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: 'error',
            message: getErrorMessage(error, 'Something went wrong'),
          })
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  const reload = useCallback(() => {
    setState({ status: 'loading' })
    getProducts()
      .then((data) => {
        setState({ status: 'ok', data })
      })
      .catch((error: unknown) => {
        setState({
          status: 'error',
          message: getErrorMessage(error, 'Something went wrong'),
        })
      })
  }, [])

  return { state, reload }
}
