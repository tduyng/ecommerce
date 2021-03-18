import { Resolver } from '@nestjs/graphql';
import { Order } from './order.schema';

@Resolver(() => Order)
export class OrderResolver {}
