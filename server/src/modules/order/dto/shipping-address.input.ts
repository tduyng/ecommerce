import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ShippingAddressInput {
	@Field()
	address: string;

	@Field()
	city: string;

	@Field()
	postalCode: string;

	@Field()
	country: string;
}
