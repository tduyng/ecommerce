import { User } from '@modules/users/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HookNextFunction, Types, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Review extends Document {
	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: Number, required: true, default: 0 })
	rating: number;

	@Prop({ type: String, required: true })
	comment: string;

	@Prop({ type: Types.ObjectId, ref: User.name })
	user: User;
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
