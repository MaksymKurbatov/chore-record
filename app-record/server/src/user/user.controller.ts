import { Controller, Get, HttpCode, Param, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('profile')
  getProfile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id)
  }

  @HttpCode(200)
  @Auth()
  @Patch('profile/favorites/:productId')
  async toggleFavorite(
    @CurrentUser('id') id: string,
    @Param('productId') productId: string
  ) {
    return await this.userService.toggleFavorite(id, productId)
  }
}
