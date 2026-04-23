/** Shape returned by `GET /api/products` */
export type ProductDto = {
  id: string
  sku: string
  stock: number
  title: string
  category: string
  price?: number
  imageUrl?: string
  cta?: string
}
