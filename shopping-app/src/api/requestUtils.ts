import { ApiError } from './client'

/** Shown when `fetch` fails before an HTTP response (offline, wrong port, etc.). */
export const API_NETWORK_ERROR_MESSAGE =
  'Cannot reach the API. Start the backend server and verify VITE_API_URL points to it.'

export async function readResponseJson(res: Response): Promise<unknown> {
  try {
    return await res.json()
  } catch {
    return undefined
  }
}

export function apiErrorFromFailedResponse(
  res: Response,
  body: unknown,
  defaultMessage: string,
): ApiError {
  const messageFromBody =
    typeof body === 'object' &&
    body !== null &&
    'error' in body &&
    typeof (body as { error: unknown }).error === 'string'
      ? (body as { error: string }).error
      : `${defaultMessage} (HTTP ${res.status})`
  return new ApiError(messageFromBody, res.status)
}
