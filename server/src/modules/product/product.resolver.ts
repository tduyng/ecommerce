import { JwtGuard } from '@modules/auth/guards';
import { CurrentUser } from '@common/decorators';
import { PaginationInput } from '@modules/user/dto/pagination.input';
import { User } from '@modules/user/user.schema';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginatedProduct } from './dto';
import { CreateReviewProductInput } from './dto/create-review-product.input';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@Resolver(() => Product)
export class ProductResolver {
	constructor(private productService: ProductService) {}

	@Query(() => PaginatedProduct)
	public async products(
		@Args('pagination', { nullable: true }) pagination?: PaginationInput,
	) {
		return await this.productService.findMany(pagination);
	}

	@Query(() => PaginatedProduct)
	public async productsByBrand(
		@Args('brand') brand: string,
		@Args('pagination', { nullable: true }) pagination?: PaginationInput,
	) {
		return await this.productService.findManyByBrand(brand, pagination);
	}

	@Query(() => PaginatedProduct)
	public async productsByCategory(
		@Args('category') category: string,
		@Args('pagination', { nullable: true }) pagination?: PaginationInput,
	) {
		return await this.productService.findManyByCategory(category, pagination);
	}

	@Query(() => PaginatedProduct)
	public async queryProducts(
		@Args('q') q: string,
		@Args('pagination', { nullable: true }) pagination?: PaginationInput,
	) {
		return await this.productService.queryProducts(q, pagination);
	}

	@Query(() => [Product])
	public async topProducts(@Args('limit', { nullable: true }) limit?: number) {
		return await this.productService.findTopProducts(limit);
	}

	@Query(() => [Product])
	public async latestProducts(@Args('limit', { nullable: true }) limit?: number) {
		return await this.productService.findLatestProducts(limit);
	}

	@Query(() => [String])
	public async allCategories() {
		return await this.productService.getCategoryList();
	}

	@Query(() => [String])
	public async brandsOfCategory(@Args('category') category: string) {
		return await this.productService.getBrandsBelongsToCategory(category);
	}

	@Query(() => Product)
	public async productById(@Args('_id') _id: string) {
		const product = await this.productService.findById(_id);
		if (!product) throw new BadRequestException(`Product with id: ${_id} not found`);
		return product;
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
