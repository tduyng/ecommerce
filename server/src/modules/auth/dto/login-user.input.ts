import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class LoginUserInput {
	@IsString()
	@IsNotEmpty()
	@Field(() => String, { nullable: false })
	usernameOrEmail: string;

	@IsString()
	@MinLength(3)
	@Field(() => String, { nullable: false })
	password: string;
}
