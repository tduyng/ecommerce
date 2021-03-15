import { User } from '@modules/user/user.schema';
import { Field, GraphQLISODateTime, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HookNextFunction, Types, Document } from 'mongoose';

@Schema()
@ObjectType()
export class Review extends Document {
	// @Prop({ type: Types.ObjectId })
	@Field(() => ID)
	_id: string;

	@Prop({ type: String, required: true })
	@Field()
	name: string;

	@Prop({ type: Number, required: true, default: 0 })
	@Field(() => Int)
	rating: number;

	@Prop({ type: String, required: true })
	@Field()
	comment: string;

	@Prop({ type: Types.ObjectId, ref: User.name })
	@Field(() => User)
	user: User;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	createdAt: Date;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

// Hook before insert or save
ReviewSchema.pre('save', checkComment);

export const commentRegex = /^.{6,}$/; // Min length 6 characters
function checkComment(this: Review, next: HookNextFunction) {
	try {
		if (!this.comment) return next();
		const isValid = commentRegex.test(this.comment);
		if (isValid) return next();
		return next(new Error('Comment must be 6 character minimum'));
	} catch (error) {
		return next(error);
	}
}
