import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { PaginatedUser } from '../dto/paginated-user.object-type';
import { PaginationInput } from '../dto/pagination.input';
import { User } from '../user.schema';
import { UserService } from '../user.service';

const mockUser = {
	_id: 'some_id',
	username: 'some_username',
	email: 'some-email@email.com',
} as User;

describe('UserService', () => {
	let userService: UserService;
	let userModel: any;

	const mockUserModel = () => ({
		findOne: jest.fn(),
		findById: jest.fn(),
		find: jest.fn(),
		findByIdAndUpdate: jest.fn(),
		deleteOne: jest.fn(),
		deleteMany: jest.fn(),
		countDocuments: jest.fn(),
		updateMany: jest.fn(),
	});

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{ provide: getModelToken(User.name), useFactory: mockUserModel },
			],
		}).compile();

		userService = module.get<UserService>(UserService);
		userModel = module.get<Model<User>>(getModelToken(User.name));
	});
	it('Should be defined', () => {
		expect(userService).toBeDefined();
	});

	describe('findOne', () => {
		it('Should return an user', async () => {
			userModel.findOne.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(mockUser),
			}));
			const result = await userService.findOne({ username: 'some_username' });
			expect(result).toEqual(mockUser);
		});
	});

	describe('findById', () => {
		it('Should return an user', async () => {
			userModel.findById.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(mockUser),
			}));
			const result = await userService.findById('some_id');
			expect(result).toEqual(mockUser);
		});
	});

	describe('findMany', () => {
		it('Should return array users + count', async () => {
			const filter: FilterQuery<User> = { username: /some/i };
			const pagination: PaginationInput = { limit: 25, page: 1 };
			const mockResult: PaginatedUser = { count: 1, users: [mockUser] };
			userModel.countDocuments.mockReturnValue(1);
			userModel.find.mockImplementationOnce(() => ({
				skip: jest.fn().mockImplementation(() => ({
					limit: jest.fn().mockImplementation(() => ({
						lean: jest.fn().mockReturnValue([mockUser]),
					})),
				})),
			}));

			const result = await userService.findManyUser(filter, pagination);
			expect(result).toEqual(mockResult);
		});
	});

	describe('updateMany', () => {
		it('Should return an array of users', async () => {
			const filter: FilterQuery<User> = { username: /some/i };
			const inputUpdate: UpdateQuery<User> = { avatar: null };
			userModel.updateMany.mockImplementation(() => ({
				lean: jest.fn().mockReturnValue([mockUser]),
			}));
			const result = await userService.updateMany(filter, inputUpdate);
			expect(result).toEqual([mockUser]);
		});
	});

	describe('deleteById', () => {
		it('Should delete successfully', async () => {
			userModel.deleteOne.mockReturnValue({ deleteCount: 1 });
			expect(await userService.deleteById('some_id')).toBeDefined();
		});
	});
	describe('deleteOne', () => {
		it('Should delete successfully', async () => {
			userModel.deleteOne.mockReturnValue({ deleteCount: 1 });
			expect(await userService.deleteOne({ username: 'some_username' })).toBeDefined();
		});
	});
	describe('deleteMany', () => {
		it('Should delete successfully', async () => {
			const filter: FilterQuery<User> = { username: /some/i };
			userModel.deleteMany.mockReturnValue({ deleteCount: 1 });
			expect(await userService.deleteMany(filter)).toBeDefined();
		});
	});

	describe('queryUsers', () => {
		it('Should return array users + count', async () => {
			const q: string = 'some';
			const pagination: PaginationInput = { limit: 25, page: 1 };
			const mockResult: PaginatedUser = { count: 1, users: [mockUser] };
			userModel.countDocuments.mockReturnValue(1);
			userModel.find.mockImplementationOnce(() => ({
				skip: jest.fn().mockImplementation(() => ({
					limit: jest.fn().mockImplementation(() => ({
						lean: jest.fn().mockReturnValue([mockUser]),
					})),
				})),
			}));

			const result = await userService.queryUsers(q, pagination);
			expect(result).toEqual(mockResult);
		});
	});
});
