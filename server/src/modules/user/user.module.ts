import { OrderService } from '@modules/order/order.service';
import { Order, OrderSchema } from '@modules/order/schemas';
import { ProductService } from '@modules/product/product.service';
import { Product, ProductSchema } from '@modules/product/schemas/product.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminResolver } from './admin.resolver';
import { UserExitsValidator } from './decorators/user-exists.validator';
import { UploadService } from './upload.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Product.name, schema: ProductSchema },
			{ name: Order.name, schema: OrderSchema },
		]),
	],
	controllers: [UserController],
	providers: [
		UserService,
		UserExitsValidator,
		AdminResolver,
		UploadService,
		OrderService,
		ProductService,
	],
	exports: [UserService, UploadService],
})
export class UserModule {}
