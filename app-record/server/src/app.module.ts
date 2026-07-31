import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { CategoryModule } from './category/category.module'
import { ProductModule } from './product/product.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ServeStaticModule.forRoot({
      renderPath: `${path}/uploads`,
      serveRoot: '/uploads'
    }),
    PrismaModule,
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule
  ]
})
export class AppModule {}
