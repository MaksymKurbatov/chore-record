import {
  Body,
  Controller,
  Delete,
  Query,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductDto } from './dto/product.dto'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.productService.getAll(searchTerm)
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productService.getBySlug(slug)
  }

  @Get('by-category/:category')
  async getByCategory(@Param('category') category: string) {
    return this.productService.getByCategory(category)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async create() {
    return await this.productService.create()
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ProductDto) {
    return await this.productService.update(id, dto)
  }

  @HttpCode(200)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id)
  }
}
