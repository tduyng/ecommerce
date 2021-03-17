import { UpdateProfileInput } from '@modules/auth/dto';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { RoleType } from '../user.schema';

@InputType()
export class UpdateUserInput extends UpdateProfileInput {
	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	role?: RoleType;
}
