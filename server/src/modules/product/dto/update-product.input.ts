import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	brand?: string;

	@Field({ nullable: true })
	category?: string;

	@Field({ nullable: true })
	description?: string;

	@Field(() => String, {
		nullable: true,
		defaultValue: 'https://i.imgur.com/Vih6Km5.png',
	})
	image?: string;

	@Field(() => Float, { nullable: true })
	price?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	countInStock?: number;
}
