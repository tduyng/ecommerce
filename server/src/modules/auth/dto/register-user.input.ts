import { UserExitsValidator } from '@modules/user/decorators/user-exists.validator';
import { Field, InputType } from '@nestjs/graphql';
import {
	IsEmail,
	IsOptional,
	IsString,
	Matches,
	MinLength,
	Validate,
} from 'class-validator';

@InputType()
export class RegisterUserInput {
	@Matches(/[a-zA-Z0-9_-]{2,30}/)
	@Validate(UserExitsValidator)
	@Field(() => String, { nullable: false })
	username: string;

	@IsEmail()
	@Validate(UserExitsValidator)
	@Field(() => String, { nullable: false })
	email: string;

	@IsString()
	@MinLength(3)
	@IsOptional()
	@Field(() => String, { nullable: true })
	password?: string;

	@IsOptional()
	@IsString()
	@Field(() => String, { nullable: true })
	thumbnail?: string;
}
