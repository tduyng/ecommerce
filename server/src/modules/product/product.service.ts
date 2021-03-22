import { PaginationInput } from '@modules/user/dto/pagination.input';
import { User } from '@modules/user/user.schema';
import { UserService } from '@modules/user/user.service';
import {
	BadRequestException,
	HttpException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductInput, PaginatedProduct, UpdateProductInput } from './dto';
import { CategoryBrands } from './dto/category-brands.object-type';
import { CreateReviewProductInput } from './dto/create-review-product.input';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name) private productModel: Model<Product>,
		private userService: UserService,
	) {}

	public async findMany(pagination?: PaginationInput): Promise<PaginatedProduct> {
		const limit = pagination?.limit || 25;
		const page = pagination?.page || 1;
		const products: Product[] = await this.productModel
			.find({})
			.skip((page - 1) * limit)
			.limit(limit)
			.lean();
		const count = await this.productModel.countDocuments({});
		return { count, products };
	}

	public async findManyByBrand(
		brand: string,
		pagination?: PaginationInput,
	): Promise<PaginatedProduct> {
		const limit = pagination?.limit || 25;
		const page = pagination?.page || 1;
		const products: Product[] = await this.productModel
			.find({ brand: new RegExp(brand, 'i') })
			.skip((page - 1) * limit)
			.limit(limit)
			.lean();
		const count = await this.productModel.countDocuments({
			brand: new RegExp(brand, 'i'),
		});
		return { count, products };
	}

	public async findManyByCategory(
		category: string,
		pagination?: PaginationInput,
	): Promise<PaginatedProduct> {
		const limit = pagination?.limit || 25;
		const page = pagination?.page || 1;
		const products: Product[] = await this.productModel
			.find({ category: new RegExp(category, 'i') })
			.skip((page - 1) * limit)
			.limit(limit)
			.lean();
		const count = await this.productModel.countDocuments({
			category: new RegExp(category, 'i'),
		});
		return { count, products };
	}

	public async queryProducts(
		q: string,
		pagination?: PaginationInput,
	): Promise<PaginatedProduct> {
		const limit = pagination?.limit || 25;
		const page = pagination?.page || 1;
		const products: Product[] = await this.productModel
			.find({
				$text: { $search: `\"${q}\"` },
			})
			.skip((page - 1) * limit)
			.limit(limit)
			.lean();

		const count = await this.productModel.countDocuments({
			$text: { $search: `\"${q}\"` },
		});
		return { count, products };
	}

	public async findById(_id: string): Promise<Product> {
		const product: Product = await this.productModel.findById(_id).lean();
		return product;
	}

	public async createProduct(input: CreateProductInput, user: User): Promise<Product> {
		const newProduct: Product = await this.productModel.create({ ...input, user });
		return newProduct;
	}

	public async updateProduct(_id: string, input: UpdateProductInput): Promise<Product> {
		const updated: Product = await this.productModel
			.findByIdAndUpdate(_id, input, { new: true })
			.lean();
		return updated;
	}

	public async deleteProduct(_id: string): Promise<Product> {
		return await this.productModel.findByIdAndDelete(_id);
	}

	public async createOrUpdateReviewProduct(
		userId: string,
		productId: string,
		input: CreateReviewProductInput,
	) {
		const user = await this.userService.findById(userId);
		if (!user) throw new UnauthorizedException();
		const product: Product = await this.findById(productId);
		if (!product)
			throw new BadRequestException(`Product with id: ${productId} not found`);
		const isAlreadyReviewed = await this.productModel
			.findOne({
				_id: productId,
				'reviews.user._id': userId,
			})
			.lean();
		const review = {
			...input,
			reviewerName: user.fullName || user.username,
			user,
		};
		let updated: Product;
		if (!isAlreadyReviewed) {
			updated = await this.productModel
				.findByIdAndUpdate(
					productId,
					{
						$push: { reviews: review },
					},
					{ new: true },
				)
				.lean();
		} else {
			updated = await this.productModel
				.findOneAndUpdate(
					{
						_id: productId,
						'reviews.user._id': userId,
					},
					{
						$set: {
							'reviews.$.rating': input.rating,
							'reviews.$.comment': input.comment,
						},
					},
					{ new: true },
				)
				.lean();
		}

		return updated;
	}

	public async findTopProducts(limit?: number) {
		const safeLimit = limit | 25;
		const products: Product[] = await this.productModel
			.find({})
			.sort({ rating: -1 })
			.limit(safeLimit)
			.lean();

		return products;
	}

	public async findLatestProducts(limit?: number) {
		const safeLimit = limit | 25;
		const products: Product[] = await this.productModel
			.find({})
			.sort({ createdAt: -1 })
			.limit(safeLimit)
			.lean();

		return products;
	}

	public async getCategoryList(): Promise<string[]> {
		const categories: string[] = await this.productModel.find().distinct('category');
		return categories;
	}

	public async getBrandsBelongsToCategory(category: string): Promise<string[]> {
		const brands: string[] = await this.productModel
			.find({ category: new RegExp('^' + category + '$', 'i') })
			.distinct('brand');
		return brands;
	}

	public async getCategoryBrands(): Promise<CategoryBrands[]> {
		const result: CategoryBrands[] = [];

		try {
			const categories = await this.getCategoryList();
			for (const category of categories) {
				const brands = await this.getBrandsBelongsToCategory(category);
				result.push({ category, brands });
			}

			return result;
		} catch (error) {
			throw new HttpException(error.message, 500);
		}
	}
}
