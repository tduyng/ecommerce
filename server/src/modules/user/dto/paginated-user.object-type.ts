import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user.schema';

@ObjectType()
export class PaginatedUser {
	@Field(() => Int, { defaultValue: 0 })
	count: number;

	@Field(() => [User])
	users: User[];
}
