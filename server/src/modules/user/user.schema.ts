import { HookNextFunction, Document, Types } from 'mongoose';
import argon2 from 'argon2';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import slugify from 'slugify';
import {
	Field,
	GraphQLISODateTime,
	HideField,
	ID,
	ObjectType,
	registerEnumType,
} from '@nestjs/graphql';

export enum RoleType {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

registerEnumType(RoleType, {
	name: 'RoleType',
	description: 'User role',
});

@Schema()
@ObjectType('User')
export class User extends Document {
	// @Prop({ type: Types.ObjectId })
	@Field(() => ID)
	_id: string;

	@Prop({ type: String, unique: true })
	@Field()
	username: string;

	@Prop({ type: String, unique: true })
	@Field()
	email: string;

	@Prop({ type: String, select: false })
	@HideField()
	password: string;

	@Prop({ required: false })
	@Field(() => String, { nullable: true })
	thumbnail?: string;

	@Prop({ type: String, enum: Object.values(RoleType), default: RoleType.USER })
	@Field(() => String, { nullable: true })
	role: RoleType;

	@Prop({ type: String, select: false, required: false })
	@HideField()
	currentHashedRefreshToken?: string;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	createdAt: Date;

	@Prop({ type: Date, default: Date.now })
	@Field(() => GraphQLISODateTime)
	updatedAt: Date;
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
