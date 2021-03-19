import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductResolver } from './product.resolver';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductService } from './product.service';
import { UserService } from '@modules/user/user.service';
import { User, UserSchema } from '@modules/user/user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductSchema },
			{ name: User.name, schema: UserSchema },
		]),
	],
	providers: [ProductService, ProductResolver, UserService],
	exports: [ProductService],
})
export class ProductModule {}
