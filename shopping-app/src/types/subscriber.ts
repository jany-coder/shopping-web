export type SubscriberRecord = {
  email: string
  /** ISO timestamp from API; may be missing in older local JSON. */
  subscribedAt?: string
}
