import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class ResetPasswordInput {
	@IsString()
	@Field()
	token: string;

	@MinLength(3)
	@IsString()
	@Field()
	newPassword: string;
}
