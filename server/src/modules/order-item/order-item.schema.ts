import { Product } from '@modules/product/product.schema';
import { Field, Float, GraphQLISODateTime, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema()
@ObjectType()
export class OrderItem extends Document {
	// @Prop({ type: Types.ObjectId })
	@Field(() => ID)
	_id: string;

	@Prop({ type: String, required: true })
	@Field()
	name: string;

	@Prop({ type: Number, required: true, default: 0 })
	@Field(() => Int)
	quantity: number;

	@Prop({ type: Number, required: true })
	@Field(() => Float)
	price: number;

	@Prop({ type: String, required: true, default: 'https://i.imgur.com/Vih6Km5.png' })
	@Field(() => String)
	image: string;

	@Prop({ type: Types.ObjectId, ref: Product.name })
	@Field(() => Product)
	product: Product;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	createdAt: Date;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	updatedAt: Date;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
