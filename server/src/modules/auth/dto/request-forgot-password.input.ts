import { IsEmail } from 'class-validator';

export class RequestForgotPasswordInput {
	@IsEmail()
	email: string;
}
