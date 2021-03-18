import { User } from '@modules/user/user.schema';
import { UnauthorizedException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { PayloadUserForJwtToken } from 'src/common/types';
import { JwtStrategy } from '../strategies/jwt.strategy';

const oneUser = { _id: 'some_id', email: 'some_email' } as User;

describe('JwtStrategy', () => {
	let jwtStrategy: JwtStrategy;
	let userModel: any;

	const mockUserModel = () => ({
		findOne: jest.fn(() => ({ lean: jest.fn() })),
	});
	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				JwtStrategy,
				{ provide: getModelToken(User.name), useFactory: mockUserModel },
			],
		}).compile();

		jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
		userModel = module.get<Model<User>>(getModelToken(User.name));
	});

	it('Should be defined', () => {
		expect(jwtStrategy).toBeDefined();
	});

	describe('activate', () => {
		it('Should be throw an error when user not found', async () => {
			const payload = { user: { _id: 'some_id' } } as PayloadUserForJwtToken;
			userModel.findOne.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(null),
			}));
			try {
				await jwtStrategy.validate(payload);
			} catch (error) {
				expect(error).toBeInstanceOf(UnauthorizedException);
			}
		});
		it('Should return an user', async () => {
			const payload = { user: { email: 'some_email' } } as PayloadUserForJwtToken;
			userModel.findOne.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(oneUser),
			}));
			const user = await jwtStrategy.validate(payload);
			expect(user).toEqual(user);
		});
	});
});
