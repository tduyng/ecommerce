import { UserResponse } from '@modules/auth/dto';
import { JwtGuard } from '@modules/auth/guards';
import { PaginatedOrder } from '@modules/order/dto/paginated-orders.object-type';
import { OrderService } from '@modules/order/order.service';
import { Order } from '@modules/order/schemas';
import { ProductService } from '@modules/product/product.service';
import { UseGuards } from '@nestjs/common';
// import { JwtGuard } from '@modules/auth/guards';
// import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Roles } from './decorators/roles.decorator';
import { PaginatedUser } from './dto/paginated-user.object-type';
import { PaginationInput } from './dto/pagination.input';
import { UpdateUserInput } from './dto/update-user.input';
import { RoleType, User } from './user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
@Roles(RoleType.ADMIN)
@UseGuards(JwtGuard)
export class AdminResolver {
	constructor(
		private userService: UserService,
		private orderService: OrderService,
		private productService: ProductService,
	) {}
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

	@Mutation(() => UserResponse)
	public async updateUser(@Args('id') id: string, @Args('input') input: UpdateUserInput) {
		const user = await this.userService.updateOne(id, input);
		return { user };
	}

	@Mutation(() => Boolean)
	public async deleteUserById(@Args('id') id: string) {
		try {
			await this.userService.deleteById(id);
			return true;
		} catch (error) {
			return false;
		}
	}

	@Query(() => PaginatedOrder)
	public async getManyOrders(@Args('pagination?') pagination?: PaginationInput) {
		return await this.orderService.findManyOrders(pagination);
	}

	@Mutation(() => Order)
	public async deliveryOrder(@Args('_id') _id: string) {
		return await this.orderService.updateOrderToDelivered(_id);
	}

	@Mutation(() => Product)
	public async createProduct(@Args('input') input: CreateProductInput) {
		return await this.productService.createProduct(input);
	}

	@Mutation(() => Product)
	public async updateProduct(
		@Args('_id') _id: string,
		@Args('input') input: UpdateProductInput,
	) {
		return await this.productService.updateProduct(_id, input);
	}

	@Mutation(() => Boolean)
	public async deleteProduct(@Args('_id') _id: string) {
		const productDeleted = await this.productService.deleteProduct(_id);
		return productDeleted ? true : false;
	}
}
