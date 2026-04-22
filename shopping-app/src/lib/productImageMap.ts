import newArrival01Img from '../assets/new-arrival-01.png'
import newArrival02Img from '../assets/new-arrival-2.png'
import newArrival03Img from '../assets/new-arrival-3.png'

/** Maps API `imageKey` to bundled asset URLs (not the product catalog). */
export const productImageMap: Record<string, string> = {
  'new-arrival-01': newArrival01Img,
  'new-arrival-2': newArrival02Img,
  'new-arrival-3': newArrival03Img,
}

export function resolveProductImage(imageKey: string): string | undefined {
  return productImageMap[imageKey]
}
