import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../product.schema';

@ObjectType()
export class PaginatedProduct {
	@Field(() => Int, { defaultValue: 0 })
	count: number;

	@Field(() => [Product])
	products: Product[];
}
