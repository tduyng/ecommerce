import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { OrderItem } from '../schemas/order-item.schema';
import { PaymentResult } from '../schemas/payment-result.schema';
import { ShippingAddress } from '../schemas/shipping-address.schema';

@InputType()
export class CreateOrderInput {
	@Field(() => OrderItem)
	orderItems: OrderItem[];

	@Field(() => ShippingAddress)
	shippingAddress: ShippingAddress;

	@Field(() => PaymentResult)
	paymentResult: PaymentResult;

	@Field(() => String)
	paymentMethod: string;

	@Field(() => Float)
	taxPrice: number;

	@Field(() => Float)
	shippingPrice: number;

	@Field(() => Float)
	totalPrice: number;
}
