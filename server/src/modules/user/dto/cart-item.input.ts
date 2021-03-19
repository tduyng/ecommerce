import { ProductInput } from '@modules/product/dto/product.input';
import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CartItemInput {
	@Field(() => ProductInput)
	product: ProductInput;

	@Field(() => Int)
	quantity: number;

	@Field(() => Float)
	price: number;
}
