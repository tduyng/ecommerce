import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';
@InputType()
export class UserWhereUniqueInput {
	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	_id?: string;

	@IsEmail()
	@IsOptional()
	@Field(() => String, { nullable: true })
	email?: string;

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	username?: string;
}
