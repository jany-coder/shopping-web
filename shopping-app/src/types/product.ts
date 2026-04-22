/** Shape returned by `GET /api/products` */
export type ProductDto = {
  id: string
  title: string
  category: string
  price?: number
  imageKey: string
  cta?: string
}
