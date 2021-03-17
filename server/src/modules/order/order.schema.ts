import { OrderItem } from '@modules/order-item/order-item.schema';
import { PaymentResult } from '@modules/payment-result/payment-result.schema';
import { ShippingAddress } from '@modules/shipping-address/shipping-address.schema';
import { User } from '@modules/user/user.schema';
import { Field, Float, GraphQLISODateTime, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema()
@ObjectType()
export class Order extends Document {
	// @Prop({ type: Types.ObjectId })
	@Field(() => ID)
	_id: string;

	@Prop({ type: String, required: true })
	@Field(() => String)
	paymentMethod: string;

	@Prop({ type: Number, required: true, default: 0.0 })
	@Field(() => Float)
	taxPrice: number;

	@Prop({ type: Number, required: true, default: 0.0 })
	@Field(() => Float)
	shippingPrice: number;

	@Prop({ type: Number, required: true, default: 0.0 })
	@Field(() => Float)
	totalPrice: number;

	@Prop({ type: Boolean, required: true, default: false })
	@Field(() => Boolean)
	isPaid: boolean;

	@Prop({ type: Date })
	@Field(() => GraphQLISODateTime)
	paidAt: Date;

	@Prop({ type: Boolean, required: true, default: false })
	@Field(() => Boolean)
	isDelivered: boolean;

	@Prop({ type: Date })
	@Field(() => GraphQLISODateTime)
	deliveredAt: Date;

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	@Field(() => User)
	user: User;

	@Prop({ type: [{ type: Types.ObjectId, ref: OrderItem.name }] })
	@Field(() => [OrderItem])
	orderItems: OrderItem[];

	@Prop({ type: Types.ObjectId, ref: ShippingAddress.name })
	@Field(() => ShippingAddress)
	shippingAddress: ShippingAddress;

	@Prop({ type: Types.ObjectId, ref: PaymentResult.name })
	@Field(() => PaymentResult)
	paymentResult: PaymentResult;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	createdAt: Date;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
