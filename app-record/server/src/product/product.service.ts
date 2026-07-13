import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { generateSlug } from '../utils/generate-slug'
import { ProductDto } from './dto/product.dto'
import { returnProductObject } from './return-product-object'
import { CategoryService } from '../category/category.service'

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService
  ) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) return this.search(searchTerm)

    return this.prisma.product.findMany({
      select: returnProductObject,
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async search(searchTerm?: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            },
            description: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        ]
      },
      select: returnProductObject
    })
  }

  async getBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug
      },
      select: returnProductObject
    })

    if (!product)
      throw new NotFoundException(`Product with slug ${slug} not found`)
    return product
  }

  async getByCategory(categorySlug: string) {
    const product = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug
        }
      },
      select: returnProductObject
    })

    if (!product)
      throw new NotFoundException(`Product with slug ${categorySlug} not found`)
    return product
  }

  async create() {
    return this.prisma.product.create({
      data: {
        name: '',
        slug: '',
        image: '',
        description: '',
        price: 0
      }
    })
  }

  async update(id: string, dto: ProductDto) {
    const { name, price, image, description, categoryId } = dto

    await this.categoryService.getById(categoryId)

    return this.prisma.product.update({
      where: {
        id
      },
      data: {
        name,
        price,
        image,
        description,
        slug: generateSlug(name),
        category: {
          connect: {
            id: categoryId
          }
        }
      }
    })
  }

  async delete(id: string) {
    return this.prisma.product.delete({
      where: {
        id
      }
    })
  }
}
