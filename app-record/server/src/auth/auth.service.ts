import { Body, Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AuthDto } from './dto/auth.dto'
import { faker } from '@faker-js/faker/locale/en_US'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { User } from '../../generated/prisma/client'
type JwtPayload = {
  id: string
}
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const token = await this.issueToken(user.id)

    return {
      user: this.returnUserField(user),
      ...token
    }
  }
  async getNewToken(refreshToken: string) {
    const result = await this.jwt.verifyAsync<JwtPayload>(refreshToken)
    if (!result) throw new UnauthorizedException('Invalid refresh token')

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id
      }
    })

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    const token = await this.issueToken(user.id)

    return {
      user: this.returnUserField(user),
      ...token
    }
  }
  async register(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })
    if (oldUser) {
      throw new UnauthorizedException('User already exists')
    }
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: faker.person.firstName(),
        avatarPath: faker.image.avatar(),
        phone: faker.phone.number(),
        password: await hash(dto.password)
      }
    })
    const tokens = await this.issueToken(user.id)
    return {
      user: this.returnUserField(user),
      ...tokens
    }
  }

  private async issueToken(userId: string) {
    const data = { id: userId }
    const accessToken = await this.jwt.signAsync(data, {
      expiresIn: '1d'
    })
    const refreshToken = await this.jwt.signAsync(data, {
      expiresIn: '7d'
    })
    return { accessToken, refreshToken }
  }
  private returnUserField(user: User) {
    return {
      id: user.id,
      email: user.email
    }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (!user) throw new UnauthorizedException('User not found')
    const isValid = await verify(user.password, dto.password)
    if (!isValid) throw new UnauthorizedException('Invalid password')
    return user
  }
}
