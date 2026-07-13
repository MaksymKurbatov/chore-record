import { Prisma } from '../../generated/prisma/client'
import { returnCategoryObject } from '../category/return-category-object'

export const returnProductObject: Prisma.ProductSelect = {
  id: true,
  name: true,
  description: true,
  price: true,
  image: true,
  slug: true,
  createdAt: true,
  category: { select: returnCategoryObject }
}
