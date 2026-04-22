import { ApiError } from '../api/client'

/** Turns thrown values from `fetch` / API helpers into a user-visible message. */
export function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof ApiError ? error.message : fallback
}
