import { Resolver } from '@nestjs/graphql';
import { Product } from './product.schema';

@Resolver(() => Product)
export class ProductResolver {}
