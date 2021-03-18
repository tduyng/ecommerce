import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

// User change password directly on website
@InputType()
export class ChangePasswordInput {
	@IsString()
	@Field(() => String, { nullable: false })
	oldPassword: string;

	@MinLength(3)
	@IsString()
	@Field(() => String, { nullable: false })
	newPassword: string;
}
