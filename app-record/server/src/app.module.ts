import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [PrismaModule, ConfigModule.forRoot(), AuthModule, UserModule]
})
export class AppModule {}
