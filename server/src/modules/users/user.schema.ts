import { HookNextFunction, Document } from 'mongoose';
import argon2 from 'argon2';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import slugify from 'slugify';

export enum RoleType {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

@Schema({ timestamps: true })
export class User extends Document {
	@Prop({ unique: true })
	email: string;

	@Prop({ type: String, select: false })
	password: string;

	@Prop()
	username: string;

	@Prop({ required: false })
	googleId?: string;

	@Prop({ required: false })
	facebookId?: string;

	@Prop({ required: false })
	thumbnail?: string;

	@Prop({ type: Array, default: [] })
	cart: any[];

	@Prop({ type: String, enum: Object.values(RoleType), default: RoleType.USER })
	role: RoleType;

	@Prop({ type: String, select: false, required: false })
	currentHashedRefreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hook before insert or save
UserSchema.pre('save', encryptPassword);
UserSchema.pre('save', updateUsername);
UserSchema.pre('save', validateEmail);

/* Helper methods */
async function encryptPassword(
	this: User & { password: string },
	next: HookNextFunction,
) {
	try {
		if (!this.isModified('password')) return next();
		this.password = await argon2.hash(this.password);
		return next();
	} catch (error) {
		return next(error);
	}
}
export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function validateEmail(this: User, next: HookNextFunction) {
	try {
		if (!this.email) return next();
		const isEmail = emailRegex.test(this.email);
		if (isEmail) return next();

		return next(new Error('Invalid email address'));
	} catch (error) {
		return next(error);
	}
}

/* Helper methods */
async function updateUsername(this: User, next: HookNextFunction) {
	try {
		if (!this.isModified('username')) return next();
		this.username = slugify(this.username, { lower: true });
		return next();
	} catch (error) {
		return next(error);
	}
}
