import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '../../generated/prisma/client'
import { returnUserObject } from './return-user-object'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(id: string) {
    return this.getByID(id)
  }

  async getByID(id: string, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            slug: true,
            category: {
              select: {
                name: true
              }
            }
          }
        },
        ...selectObject
      }
    })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async toggleFavorite(userId: string, productId: string) {
    const user = await this.getByID(userId)
    if (!user) throw new NotFoundException('User not found')

    const isExist = user.favorites.some(product => product.id === productId)

    await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        favorites: {
          [isExist ? 'disconnect' : 'connect']: {
            id: productId
          }
        }
      }
    })
  }
}
