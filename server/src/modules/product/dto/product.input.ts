import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Product } from '../schemas/product.schema';

@InputType()
export class ProductInput extends Product {
	@Field()
	name: string;

	@Field()
	brand: string;

	@Field()
	category: string;

	@Field()
	description: string;

	@Field(() => String)
	image: string;

	@Field(() => Float)
	price: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	countInStock: number;
}
