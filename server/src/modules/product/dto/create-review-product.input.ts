import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateReviewProductInput {
	@Field(() => Int)
	rating: number;

	@Field(() => String)
	comment: string;
}
