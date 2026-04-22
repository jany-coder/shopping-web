import { ApiError, apiUrl } from './client'
import {
  API_NETWORK_ERROR_MESSAGE,
  apiErrorFromFailedResponse,
  readResponseJson,
} from './requestUtils'
import type { SubscriberRecord } from '../types/subscriber'

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
