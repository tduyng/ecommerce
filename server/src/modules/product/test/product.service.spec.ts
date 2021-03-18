import { UserService } from '@modules/user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateProductInput } from '../dto';
import { CreateReviewProductInput } from '../dto/create-review-product.input';
import { ProductService } from '../product.service';
import { Product } from '../schemas/product.schema';

const mockProduct = {
	_id: 'some_id',
	name: 'some_name',
	brand: 'some_brand',
	category: 'some_category',
	description: 'some_description',
} as Product;

describe('ProductService', () => {
	let productService: ProductService;
	let productModel: any;
	let userService: any;

	const mockProductModel = () => ({
		findOne: jest.fn(),
		findById: jest.fn(),
		find: jest.fn(),
		findByIdAndUpdate: jest.fn(),
		findOneAndUpdate: jest.fn(),
		deleteOne: jest.fn(),
		deleteMany: jest.fn(),
		countDocuments: jest.fn(),
		updateMany: jest.fn(),
		findByIdAndDelete: jest.fn(),
		create: jest.fn(),
	});

	const mockUserService = () => ({
		findById: jest.fn(),
	});

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductService,
				{ provide: UserService, useFactory: mockUserService },
				{ provide: getModelToken(Product.name), useFactory: mockProductModel },
			],
		}).compile();

		productService = module.get<ProductService>(ProductService);
		userService = module.get<UserService>(UserService);
		productModel = module.get<Model<Product>>(getModelToken(Product.name));
	});
	it('Should be defined', () => {
		expect(productService).toBeDefined();
	});

	describe('findMany', () => {
		it('Should return paginated result {count, products}', async () => {
			productModel.find.mockImplementation(() => ({
				skip: jest.fn().mockImplementation(() => ({
					limit: jest.fn().mockImplementation(() => ({
						lean: jest.fn().mockReturnValue([mockProduct]),
					})),
				})),
			}));

			productModel.countDocuments.mockReturnValue(1);
			const result = await productService.findMany();
			expect(result).toEqual({ count: 1, products: [mockProduct] });
		});
	});

	describe('findManyByBrand', () => {
		it('Should return paginated result {count, products}', async () => {
			productModel.find.mockImplementation(() => ({
				skip: jest.fn().mockImplementation(() => ({
					limit: jest.fn().mockImplementation(() => ({
						lean: jest.fn().mockReturnValue([mockProduct]),
					})),
				})),
			}));

			productModel.countDocuments.mockReturnValue(1);
			const result = await productService.findManyByBrand('some_brand');
			expect(result).toEqual({ count: 1, products: [mockProduct] });
		});
	});
	describe('findManyByCategory', () => {
		it('Should return paginated result {count, products}', async () => {
			productModel.find.mockImplementation(() => ({
				skip: jest.fn().mockImplementation(() => ({
					limit: jest.fn().mockImplementation(() => ({
						lean: jest.fn().mockReturnValue([mockProduct]),
					})),
				})),
			}));

			productModel.countDocuments.mockReturnValue(1);
			const result = await productService.findManyByCategory('some_category');
			expect(result).toEqual({ count: 1, products: [mockProduct] });
		});
	});

	describe('queryProducts', () => {
		it('Should return paginated result {count, products}', async () => {
			productModel.find.mockImplementation(() => ({
				skip: jest.fn().mockImplementation(() => ({
					limit: jest.fn().mockImplementation(() => ({
						lean: jest.fn().mockReturnValue([mockProduct]),
					})),
				})),
			}));

			productModel.countDocuments.mockReturnValue(1);
			const result = await productService.queryProducts('some');
			expect(result).toEqual({ count: 1, products: [mockProduct] });
		});
	});

	describe('findById', () => {
		it('Should return a product', async () => {
			productModel.findById.mockImplementation(() => ({
				lean: jest.fn().mockReturnValue(mockProduct),
			}));
			const result = await productService.findById('some_id');
			expect(result).toEqual(mockProduct);
		});
	});

	describe('createProduct', () => {
		it('Should return a product', async () => {
			productModel.create.mockReturnValue(mockProduct);
			const result = await productService.createProduct({
				name: 'some_name',
			} as CreateProductInput);
			expect(result).toEqual(mockProduct);
		});
	});

	describe('updateProduct', () => {
		it('Should return a product', async () => {
			productModel.findByIdAndUpdate.mockImplementation(() => ({
				lean: jest.fn().mockReturnValue(mockProduct),
			}));
			const result = await productService.updateProduct('some_id', {
				name: 'some_name',
			} as CreateProductInput);
			expect(result).toEqual(mockProduct);
		});
	});

	describe('deleteProduct', () => {
		it('Should be defined when delete successfully', async () => {
			productModel.findByIdAndDelete.mockReturnValue('some_value');
			const result = await productService.deleteProduct('some_id');
			expect(result).toBeDefined();
		});
	});

	describe('findTopProducts', () => {
		it('Should return array of products}', async () => {
			const mockResult = [mockProduct, mockProduct, mockProduct];
			productModel.find.mockImplementation(() => ({
				sort: jest.fn().mockImplementation(() => ({
					limit: jest.fn().mockImplementation(() => ({
						lean: jest.fn().mockReturnValue(mockResult),
					})),
				})),
			}));
			const result = await productService.findTopProducts();
			expect(result).toEqual(mockResult);
		});
	});

	describe('createOrUpdateReviewProduct', () => {
		it('Should update old reviews successfully', async () => {
			userService.findById.mockReturnValue({ _id: 'some_user_id' });
			productModel.findById.mockImplementation(() => ({
				lean: jest.fn().mockReturnValue(mockProduct),
			}));
			productModel.findOne.mockImplementation(() => ({
				lean: jest.fn().mockReturnValue(mockProduct),
			}));
			productModel.findOneAndUpdate.mockImplementation(() => ({
				lean: jest.fn().mockReturnValue(mockProduct),
			}));
			const result = await productService.createOrUpdateReviewProduct(
				'some_user_id',
				'some_product_id',
				{ comment: 'some_name' } as CreateReviewProductInput,
			);
			expect(result).toEqual(mockProduct);
		});

		it('Should add new review for product', async () => {
			userService.findById.mockReturnValue({ _id: 'some_user_id' });
			productModel.findById.mockImplementation(() => ({
				lean: jest.fn().mockReturnValue(mockProduct),
			}));
			productModel.findOne.mockImplementation(() => ({
				lean: jest.fn().mockReturnValue(null),
			}));
			productModel.findByIdAndUpdate.mockImplementation(() => ({
				lean: jest.fn().mockReturnValue(mockProduct),
			}));
			const result = await productService.createOrUpdateReviewProduct(
				'some_user_id',
				'some_product_id',
				{ comment: 'some_name' } as CreateReviewProductInput,
			);
			expect(result).toEqual(mockProduct);
		});
	});
});
