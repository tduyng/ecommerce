import { User } from '@modules/user/user.schema';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageError {
	@Field()
	message: string;
}

@ObjectType()
export class UserResponse {
	@Field(() => User, { nullable: true })
	user: User;

	@Field(() => MessageError, { nullable: true })
	error: MessageError;
}
