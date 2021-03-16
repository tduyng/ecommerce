import { Field, ObjectType } from '@nestjs/graphql';
import { MessageError } from './user-response.object-type';

@ObjectType()
export class LogoutResponse {
	@Field(() => Boolean)
	isLogout: boolean;

	@Field(() => MessageError, { nullable: true })
	error?: MessageError;
}
