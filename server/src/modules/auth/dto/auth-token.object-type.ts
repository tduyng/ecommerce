import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthToken {
	@Field({ description: 'JWT access token' })
	accessToken: string;

	@Field({ description: 'JWT refresh token' })
	refreshToken: string;
}
