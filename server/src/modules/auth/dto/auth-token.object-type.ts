import { User } from '@modules/user/user.schema';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthToken {
	@Field(() => String, { nullable: true })
	accessToken?: string;

	@Field(() => String, { nullable: true })
	refreshToken?: string;
}

@ObjectType()
export class AuthTokenResponse {
	@Field(() => AuthToken, { nullable: true })
	authToken?: AuthToken;

	@Field(() => User, { nullable: true })
	user?: User;
}
