import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductCart {
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
