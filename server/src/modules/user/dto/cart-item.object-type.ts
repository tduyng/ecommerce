import { Product } from '@modules/product/schemas/product.schema';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('CartItem')
export class CartItem {
	@Field(() => Product)
	product: Product;

	@Field(() => Int)
	quantity: number;

	@Field(() => Float)
	price: number;
}
