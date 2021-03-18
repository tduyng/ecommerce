import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class ShippingAddress extends Document {
	// @Prop({ type: Types.ObjectId })
	@Field(() => ID)
	_id?: string;

	@Prop({ type: String, required: true })
	@Field()
	address: string;

	@Prop({ type: String, required: true })
	@Field()
	city: string;

	@Prop({ type: String, required: true })
	@Field()
	postalCode: string;

	@Prop({ type: String, required: true })
	@Field()
	country: string;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	createdAt?: Date;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	updatedAt?: Date;
}

export const ShippingAddressSchema = SchemaFactory.createForClass(ShippingAddress);
