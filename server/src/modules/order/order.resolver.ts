import { Resolver } from '@nestjs/graphql';
import { Order } from './schemas/order.schema';

@Resolver(() => Order)
export class OrderResolver {}
