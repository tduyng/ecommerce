import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaymentResultInput {
	@Field()
	status: string;

	@Field(() => String)
	email: string;
}
