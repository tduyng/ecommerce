import { User } from '@modules/user/user.schema';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtRefreshTokenStrategy } from '../strategies/jwt-refresh.strategy';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';

const oneUser = { _id: 'some_id', email: 'some_email' } as User;

describe('JwtRefreshTokenStrategy', () => {
	let jwtRefreshTokenStrategy: JwtRefreshTokenStrategy;
	let jwtService: any;

	const mockRequest = {
		session: {
			authToken: {
				refreshToken: 'some-token',
			},
		},
	} as Request;

	const mockAuthService = () => ({
		getUserFromRefreshToken: jest.fn(),
	});

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				JwtRefreshTokenStrategy,
				{
					provide: AuthService,
					useFactory: mockAuthService,
				},
			],
		}).compile();

		jwtRefreshTokenStrategy = module.get<JwtRefreshTokenStrategy>(
			JwtRefreshTokenStrategy,
		);
		jwtService = module.get<AuthService>(AuthService);
	});

	it('Should be defined', () => {
		expect(jwtRefreshTokenStrategy).toBeDefined();
	});

	describe('activate', () => {
		it('Should be throw an error when user not found', async () => {
			jwtService.getUserFromRefreshToken.mockReturnValue(null);
			try {
				await jwtRefreshTokenStrategy.validate(mockRequest);
			} catch (error) {
				expect(error).toBeInstanceOf(UnauthorizedException);
			}
		});
		it('Should return an user', async () => {
			jwtService.getUserFromRefreshToken.mockReturnValue(oneUser);
			const user = await jwtRefreshTokenStrategy.validate(mockRequest);
			expect(user).toEqual(oneUser);
		});
	});
});
