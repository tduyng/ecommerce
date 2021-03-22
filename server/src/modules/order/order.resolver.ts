import { JwtGuard } from '@modules/auth/guards';
import { CurrentUser } from '@common/decorators';
import { PaginationInput } from '@modules/user/dto/pagination.input';
import { User } from '@modules/user/user.schema';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CreateOrderInput, PaymentResultInput } from './dto';
import { PaginatedOrder } from './dto/paginated-orders.object-type';
import { OrderService } from './order.service';
import { Order } from './schemas/order.schema';

@Resolver(() => Order)
@UseGuards(JwtGuard)
export class OrderResolver {
	constructor(private orderService: OrderService) {}

	@Query(() => Order)
	public async orderById(@Args('_id') _id: string) {
		const order = await this.orderService.findOrderById(_id);
		if (!order) throw new BadRequestException(`Order with id: ${_id} not found.`);
		return order;
	}

	@Query(() => PaginatedOrder)
	public async myOrders(
		@CurrentUser() user: User,
		@Args('pagination', { nullable: true }) pagination?: PaginationInput,
	) {
		return await this.orderService.findOrdersByUser(user._id, pagination);
	}

	@Mutation(() => Order)
	public async createOrder(
		@Args('input') input: CreateOrderInput,
		@CurrentUser() user: User,
	) {
		return await this.orderService.createOrder(user._id, input);
	}

	@Mutation(() => Order)
	public async payOrder(
		@Args('_id') _id: string,
		@Args('paymentResult') paymentResult: PaymentResultInput,
	) {
		return await this.orderService.updateOrderToPaid(_id, paymentResult);
	}
}
