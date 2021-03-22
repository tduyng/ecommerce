import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ProductInput {
	@Field(() => ID)
	_id: string;

	@Field(() => String)
	name: string;

	@Field(() => String)
	image: string;

	@Field(() => String)
	brand: string;

	@Field(() => String)
	category: string;

	@Field(() => String)
	description: string;

	@Field(() => Int, { defaultValue: 0 })
	rating: number;

	@Field(() => Int, { defaultValue: 0 })
	numReviews: number;

	@Field(() => Float)
	price: number;

	@Field(() => Int, { defaultValue: 0 })
	countInStock: number;
}
