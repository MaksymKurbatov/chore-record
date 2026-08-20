import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { path } from 'app-root-path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { CategoryModule } from './category/category.module'
import { ProductModule } from './product/product.module'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(path, 'uploads'),
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
