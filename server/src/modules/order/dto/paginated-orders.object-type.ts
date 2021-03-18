import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from '../schemas';

@ObjectType()
export class PaginatedOrder {
	@Field(() => Int, { defaultValue: 0 })
	count: number;

	@Field(() => [Order])
	orders: Order[];
}
