import { UserExitsValidator } from '@modules/user/decorators/user-exists.validator';
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, Matches, Validate } from 'class-validator';

@InputType()
export class UpdateProfileInput {
	@IsOptional()
	@Matches(/[a-zA-Z0-9_-]{2,30}/)
	@Validate(UserExitsValidator)
	@Field(() => String, { nullable: true })
	username?: string;

	@IsOptional()
	@IsEmail()
	@Validate(UserExitsValidator)
	@Field(() => String, { nullable: true })
	email?: string;

	@IsOptional()
	@IsString()
	@Field(() => String, { nullable: true })
	thumbnail?: string;
}
