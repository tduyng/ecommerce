import { Review } from '@modules/review/review.schema';
import { User } from '@modules/user/user.schema';
import { Field, GraphQLISODateTime, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema()
@ObjectType()
export class Product extends Document {
	// @Prop({ type: Types.ObjectId })
	@Field(() => ID)
	_id: string;

	@Prop({ type: String, required: true })
	@Field(() => String)
	name: string;

	@Prop({ type: String, required: true, default: 'https://i.imgur.com/Vih6Km5.png' })
	@Field(() => String)
	image: string;

	@Prop({ type: String, required: true })
	@Field(() => String)
	brand: string;

	@Prop({ type: String, required: true })
	@Field(() => String)
	category: string;

	@Prop({ type: String, required: true })
	@Field(() => String)
	description: string;

	@Prop({ type: Number, required: true, default: 0 })
	@Field(() => Int)
	rating: number;

	@Prop({ type: Number, required: true, default: 0 })
	@Field(() => Int)
	numReviews: number;

	@Prop({ type: Number, required: true, default: 0 })
	@Field(() => Int)
	price: number;

	@Prop({ type: Number, required: true, default: 0 })
	@Field(() => Int)
	countInStock: number;

	@Prop({ type: [{ type: Types.ObjectId, ref: Review.name }] })
	@Field(() => [Review])
	reviews: Review[];

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	@Field(() => User)
	user: User;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	createdAt: Date;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	updatedAt: Date;
}