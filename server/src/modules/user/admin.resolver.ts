import { UserResponse } from '@modules/auth/dto';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { Roles } from './decorators/roles.decorator';
import { PaginatedUser } from './dto/paginated-user.object-type';
import { UpdateUserInput } from './dto/update-user.input';
import { RoleType, User } from './user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
@Roles(RoleType.ADMIN)
export class AdminResolver {
	constructor(private userService: UserService) {}
	@Query(() => UserResponse)
	public async userById(@Args('id') id: string) {
		const user: User = await this.userService.findById(id);
		return { user };
	}

	@Query(() => UserResponse)
	public async userByUsername(@Args('username') username: string) {
		const user = await this.userService.findOne({ username });
		return { user };
	}

	@Query(() => UserResponse)
	public async userByEmail(@Args('email') email: string) {
		const user = await this.userService.findOne({ email });
		return { user };
	}

	@Query(() => PaginatedUser)
	public async searchUsers(
		@Args('q') q: string,
		@Args('limit') limit?: number,
		@Args('page') page?: number,
	) {
		const safeLimit = limit || 25;
		const safePage = page || 1;
		const result = await this.userService.queryUsers(q, {
			limit: safeLimit,
			page: safePage,
		});
		return result;
	}

	@Query(() => UserResponse)
	public async updateUser(@Args('id') id: string, @Args('input') input: UpdateUserInput) {
		const user = await this.userService.updateOne(id, input);
		return { user };
	}

	@Query(() => Boolean)
	public async deleteUserById(@Args('id') id: string) {
		try {
			await this.userService.deleteById(id);
			return true;
		} catch (error) {
			return false;
		}
	}
}
