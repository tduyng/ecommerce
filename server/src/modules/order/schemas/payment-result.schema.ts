import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class PaymentResult extends Document {
	// @Prop({ type: Types.ObjectId })
	@Field(() => ID)
	_id?: string;

	@Prop()
	@Field()
	status: string;

	@Prop()
	@Field()
	email: string;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	createdAt?: Date;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	updatedAt?: Date;
}

export const PaymentResultSchema = SchemaFactory.createForClass(PaymentResult);
