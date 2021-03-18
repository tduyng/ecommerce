import { Resolver } from '@nestjs/graphql';
import { Product } from './schemas/product.schema';

@Resolver(() => Product)
export class ProductResolver {}
