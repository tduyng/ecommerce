import { UserResponse } from '@modules/auth/dto';
import { JwtGuard } from '@modules/auth/guards';
import { PaginatedOrder } from '@modules/order/dto/paginated-orders.object-type';
import { OrderService } from '@modules/order/order.service';
import { Order } from '@modules/order/schemas';
import { CreateProductInput, UpdateProductInput } from '@modules/product/dto';
import { ProductService } from '@modules/product/product.service';
import { Product } from '@modules/product/schemas/product.schema';
import { UseGuards } from '@nestjs/common';
// import { JwtGuard } from '@modules/auth/guards';
// import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CurrentUser } from '../../common/decorators';
import { Roles } from '../../common/decorators/roles.decorator';
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
	public async adminGetUserById(@Args('id') id: string) {
		const user: User = await this.userService.findById(id);
		return { user };
	}

	@Query(() => UserResponse)
	public async adminGetUserByUsername(@Args('username') username: string) {
		const user = await this.userService.findOne({ username });
		return { user };
	}

	@Query(() => UserResponse)
	public async adminGetUserByEmail(@Args('email') email: string) {
		const user = await this.userService.findOne({ email });
		return { user };
	}

	@Query(() => PaginatedUser)
	public async adminSearchUsers(
		@Args('q') q: string,
		@Args('limit', { nullable: true }) limit?: number,
		@Args('page', { nullable: true }) page?: number,
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
	public async adminUpdateOneUser(
		@Args('id') id: string,
		@Args('input') input: UpdateUserInput,
	) {
		const user = await this.userService.updateOne(id, input);
		return { user };
	}

	@Mutation(() => Boolean)
	public async adminDeleteUserById(@Args('id') id: string) {
		try {
			await this.userService.deleteById(id);
			return true;
		} catch (error) {
			return false;
		}
	}

	@Query(() => PaginatedOrder)
	public async adminGetOrders(
		@Args('pagination', { nullable: true }) pagination?: PaginationInput,
	) {
		return await this.orderService.findManyOrders(pagination);
	}

	@Mutation(() => Order)
	public async adminSetDeliveryOrder(@Args('_id') _id: string) {
		return await this.orderService.updateOrderToDelivered(_id);
	}

	@Mutation(() => Product)
	public async adminCreateProduct(
		@Args('input') input: CreateProductInput,
		@CurrentUser() user: User,
	) {
		return await this.productService.createProduct(input, user);
	}

	@Mutation(() => Product)
	public async adminUpdateProduct(
		@Args('_id') _id: string,
		@Args('input') input: UpdateProductInput,
	) {
		return await this.productService.updateProduct(_id, input);
	}

	@Mutation(() => Boolean)
	public async adminDeleteProduct(@Args('_id') _id: string) {
		const productDeleted = await this.productService.deleteProduct(_id);
		return productDeleted ? true : false;
	}
}
