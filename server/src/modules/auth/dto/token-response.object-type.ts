import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenResponse {
	@Field(() => String, { nullable: true })
	token?: string;
}
