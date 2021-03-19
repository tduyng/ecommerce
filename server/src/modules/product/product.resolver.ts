import { JwtGuard } from '@modules/auth/guards';
import { CurrentUser } from '@modules/user/decorators';
import { PaginationInput } from '@modules/user/dto/pagination.input';
import { User } from '@modules/user/user.schema';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput, PaginatedProduct, UpdateProductInput } from './dto';
import { CreateReviewProductInput } from './dto/create-review-product.input';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@Resolver(() => Product)
export class ProductResolver {
	constructor(private productService: ProductService) {}

	@Query(() => PaginatedProduct)
	public async products(@Args('pagination') pagination?: PaginationInput) {
		return await this.productService.findMany(pagination);
	}

	@Query(() => PaginatedProduct)
	public async productsByBrand(
		@Args('brand') brand: string,
		@Args('pagination') pagination?: PaginationInput,
	) {
		return await this.productService.findManyByBrand(brand, pagination);
	}

	@Query(() => PaginatedProduct)
	public async productsByCategory(
		@Args('category') category: string,
		@Args('pagination') pagination?: PaginationInput,
	) {
		return await this.productService.findManyByCategory(category, pagination);
	}

	@Query(() => PaginatedProduct)
	public async queryProducts(
		@Args('q') q: string,
		@Args('pagination') pagination?: PaginationInput,
	) {
		return await this.productService.queryProducts(q, pagination);
	}

	@Query(() => [Product])
	public async topProducts(@Args('limit') limit?: number) {
		return await this.productService.findTopProducts(limit);
	}

	@Query(() => Product)
	public async productById(@Args('_id') _id: string) {
		return await this.productService.findById(_id);
	}

	@Mutation(() => Product)
	@UseGuards(JwtGuard)
	public async reviewProduct(
		@Args('productId') productId: string,
		@Args('input') input: CreateReviewProductInput,
		@CurrentUser() user: User,
	) {
		return await this.productService.createOrUpdateReviewProduct(
			user._id,
			productId,
			input,
		);
	}
}
