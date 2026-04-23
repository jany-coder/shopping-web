import { ApiError, apiUrl } from './client'
import {
  API_NETWORK_ERROR_MESSAGE,
  apiErrorFromFailedResponse,
  readResponseJson,
} from './requestUtils'
import type { SubscriberRecord } from '../types/subscriber'
import type { ProductDto } from '../types/product'

export async function fetchAdminSubscribers(): Promise<SubscriberRecord[]> {
  let res: Response
  try {
    res = await fetch(apiUrl('/api/admin/subscribers'))
  } catch {
    throw new ApiError(API_NETWORK_ERROR_MESSAGE, 0)
  }
  const body = await readResponseJson(res)
  if (!res.ok) {
    throw apiErrorFromFailedResponse(res, body, 'Failed to load subscribers')
  }
  if (!Array.isArray(body)) {
    throw new ApiError('Invalid response', 500)
  }
  return body as SubscriberRecord[]
}

export async function deleteAdminSubscriber(email: string): Promise<void> {
  let res: Response
  try {
    res = await fetch(apiUrl('/api/admin/subscribers'), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
  } catch {
    throw new ApiError(API_NETWORK_ERROR_MESSAGE, 0)
  }
  const body = await readResponseJson(res)
  if (!res.ok) {
    throw apiErrorFromFailedResponse(res, body, 'Failed to remove subscriber')
  }
}

export async function fetchAdminProducts(): Promise<ProductDto[]> {
  let res: Response
  try {
    res = await fetch(apiUrl('/api/admin/products'))
  } catch {
    throw new ApiError(API_NETWORK_ERROR_MESSAGE, 0)
  }
  const body = await readResponseJson(res)
  if (!res.ok) {
    throw apiErrorFromFailedResponse(res, body, 'Failed to load products')
  }
  if (!Array.isArray(body)) {
    throw new ApiError('Invalid response', 500)
  }
  return body as ProductDto[]
}

export type AdminNewProductInput = {
  id: string
  title: string
  category: string
  price?: number
  imageUrl: string
  cta?: string
}

export async function createAdminProduct(input: AdminNewProductInput): Promise<ProductDto> {
  let res: Response
  try {
    res = await fetch(apiUrl('/api/admin/products'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
  } catch {
    throw new ApiError(API_NETWORK_ERROR_MESSAGE, 0)
  }
  const body = await readResponseJson(res)
  if (!res.ok) {
    throw apiErrorFromFailedResponse(res, body, 'Failed to add product')
  }
  return body as ProductDto
}

export async function deleteAdminProduct(id: string): Promise<void> {
  let res: Response
  try {
    res = await fetch(apiUrl(`/api/admin/products/${encodeURIComponent(id)}`), {
      method: 'DELETE',
    })
  } catch {
    throw new ApiError(API_NETWORK_ERROR_MESSAGE, 0)
  }
  const body = await readResponseJson(res)
  if (!res.ok) {
    throw apiErrorFromFailedResponse(res, body, 'Failed to remove product')
  }
}
