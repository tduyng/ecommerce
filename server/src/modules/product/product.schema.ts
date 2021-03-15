import { Review } from '@modules/review/review.schema';
import { User } from '@modules/user/user.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class ProductSchema {
	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: String, required: true, default: 'https://i.imgur.com/Vih6Km5.png' })
	image: string;

	@Prop({ type: String, required: true })
	brand: string;

	@Prop({ type: String, required: true })
	category: string;

	@Prop({ type: String, required: true })
	description: string;

	@Prop({ type: Number, required: true, default: 0 })
	rating: number;

	@Prop({ type: Number, required: true, default: 0 })
	numReviews: number;

	@Prop({ type: Number, required: true, default: 0 })
	price: number;

	@Prop({ type: Number, required: true, default: 0 })
	countInStock: number;

	@Prop({ type: [{ type: Types.ObjectId, ref: Review.name }] })
	reviews: Review[];

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	user: User;
}
