import { BASE_URL } from '@/constants'

export const addDomainToImagePath = (imagePaths: string[]) => {
  return imagePaths.map((imagePath) => `${BASE_URL}${imagePath}`)
}
