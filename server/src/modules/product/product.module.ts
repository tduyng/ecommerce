import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductResolver } from './product.resolver';
import { Product, ProductSchema } from './product.schema';
import { ProductService } from './product.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
	providers: [ProductService, ProductResolver],
})
export class ProductModule {}
