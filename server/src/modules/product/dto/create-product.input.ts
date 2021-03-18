import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
	@Field()
	name: string;

	@Field()
	brand: string;

	@Field()
	category: string;

	@Field()
	description: string;

	@Field(() => String, { defaultValue: 'https://i.imgur.com/Vih6Km5.png' })
	image: string;

	@Field(() => Float)
	price: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	countInStock: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	numReviews: number;
}
