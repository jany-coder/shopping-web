import { ApiError, apiUrl } from './client'
import { apiErrorFromFailedResponse, readResponseJson } from './requestUtils'

export type AuthUser = {
  id: string
  name: string
  email: string
}

export type AuthResponse = {
  ok: true
  token: string
  user: AuthUser
}

export async function signupAuth(input: {
  name: string
  email: string
  password: string
}): Promise<AuthResponse> {
  const res = await fetch(apiUrl('/api/auth/signup'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const body = await readResponseJson(res)
  if (!res.ok) throw apiErrorFromFailedResponse(res, body, 'Signup failed')
  return body as AuthResponse
}

export async function loginAuth(input: {
  email: string
  password: string
}): Promise<AuthResponse> {
  const res = await fetch(apiUrl('/api/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const body = await readResponseJson(res)
  if (!res.ok) throw apiErrorFromFailedResponse(res, body, 'Login failed')
  return body as AuthResponse
}

export async function fetchMe(token: string): Promise<AuthUser> {
  const res = await fetch(apiUrl('/api/auth/me'), {
    headers: { Authorization: `Bearer ${token}` },
  })
  const body = await readResponseJson(res)
  if (!res.ok) throw apiErrorFromFailedResponse(res, body, 'Auth check failed')
  const parsed = body as { user?: AuthUser }
  if (!parsed?.user) throw new ApiError('Invalid response', 500)
  return parsed.user
}

