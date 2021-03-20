import { ProductCart } from '@modules/product/dto/product-cart.object-type';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CartItem {
	@Field(() => ProductCart)
	product: ProductCart;

	@Field(() => Int)
	quantity: number;

	@Field(() => Float)
	price: number;
}
