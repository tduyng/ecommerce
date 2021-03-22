import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryBrands {
	@Field()
	category: string;

	@Field(() => [String])
	brands: string[];
}
