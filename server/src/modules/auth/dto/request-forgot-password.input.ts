import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
@InputType()
export class RequestForgotPasswordInput {
	@IsEmail()
	@Field()
	email: string;
}
