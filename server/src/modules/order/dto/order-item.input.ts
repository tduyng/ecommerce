import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class OrderItemInput {
	@Field()
	name: string;

	@Field(() => Int, { defaultValue: 1 })
	quantity: number;

	@Field(() => Float)
	price: number;

	@Field()
	image: string;

	@Field(() => String)
	product: string;
}
