import { User } from '@modules/user/user.schema';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { PayloadUserForJwtToken } from 'src/common/types';
import { EmailService } from 'src/providers/email/email.service';
import { LoginUserDto, RegisterUserDto, ResetPasswordDto } from '../dto';
import { AuthService } from '../services/auth.service';
import { PasswordService } from '../services/password.service';

describe('AuthService', () => {
	let authService: AuthService;
	let passwordService: any;

	let jwtService: any;
	let userModel: any;
	let emailService: any;

	const mockUserModel = () => ({
		findOne: jest.fn(),
		findByIdAndUpdate: jest.fn(),
		create: jest.fn(),
	});

	const mockEmailService = () => ({
		sendWelcome: jest.fn(),
		sendEmailConfirmation: jest.fn(),
		sendResetPassword: jest.fn(),
	});

	const mockJwtService = () => ({
		sign: jest.fn(),
		signAsync: jest.fn(),
		verify: jest.fn(),
		verifyAsync: jest.fn(),
	});

	const mockPasswordService = () => ({
		hash: jest.fn(),
		verify: jest.fn(),
	});

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				JwtService,
				PasswordService,
				{ provide: getModelToken(User.name), useFactory: mockUserModel },
				{ provide: EmailService, useFactory: mockEmailService },
				{ provide: JwtService, useFactory: mockJwtService },
				{
					provide: PasswordService,
					useFactory: mockPasswordService,
				},
			],
		}).compile();

		authService = module.get<AuthService>(AuthService);
		passwordService = module.get<PasswordService>(PasswordService);
		userModel = module.get<Model<User>>(getModelToken(User.name));
		jwtService = module.get<JwtService>(JwtService);
		emailService = module.get<EmailService>(EmailService);
	});

	it('Should be defined', () => {
		expect(authService).toBeDefined();
	});

	describe('validateUser', () => {
		let loginInput: LoginUserDto;
		let hash: string;
		let mockUser: User;
		beforeAll(async () => {
			loginInput = {
				usernameOrEmail: 'some-email@email.com',
				password: '123456',
			};
			hash = await passwordService.hash(loginInput.password);
			mockUser = {
				username: 'some-username',
				email: 'some-email@email.com',
				password: hash,
			} as User;
		});
		it('Should return an user when login by email', async () => {
			userModel.findOne.mockImplementationOnce(() => ({
				select: jest
					.fn()
					.mockImplementationOnce(() => ({ lean: jest.fn().mockReturnValue(mockUser) })),
			}));
			passwordService.verify.mockReturnValue(true);
			const user = await authService.validateUser(loginInput);
			expect(user).toEqual(mockUser);
		});

		it('Should return an user when login by username', async () => {
			loginInput = {
				usernameOrEmail: 'some-username',
				password: '123456',
			};
			userModel.findOne.mockImplementationOnce(() => ({
				select: jest
					.fn()
					.mockImplementationOnce(() => ({ lean: jest.fn().mockReturnValue(mockUser) })),
			}));
			passwordService.verify.mockReturnValue(true);
			const user = await authService.validateUser(loginInput);
			expect(user).toEqual(mockUser);
		});

		it('Should return null if password not match', async () => {
			loginInput = {
				usernameOrEmail: 'some-username',
				password: '123456789',
			};
			userModel.findOne.mockImplementationOnce(() => ({
				select: jest
					.fn()
					.mockImplementationOnce(() => ({ lean: jest.fn().mockReturnValue(mockUser) })),
			}));
			passwordService.verify.mockReturnValue(false);
			const user = await authService.validateUser(loginInput);
			expect(user).toBe(null);
		});
		it('Should return null if note found user with email', async () => {
			loginInput = {
				usernameOrEmail: 'some-email@email.com',
				password: '1234567',
			};
			userModel.findOne.mockImplementationOnce(() => ({
				select: jest
					.fn()
					.mockImplementationOnce(() => ({ lean: jest.fn().mockReturnValue(null) })),
			}));
			const user = await authService.validateUser(loginInput);
			expect(user).toBe(null);
		});
	});

	describe('register', () => {
		it('Should return a token string for email confirmation', async () => {
			jwtService.sign.mockReturnValue('token-jwt');
			emailService.sendEmailConfirmation.mockResolvedValue();
			const result = await authService.register({
				email: 'some-email@email.com',
			} as RegisterUserDto);
			expect(result).toEqual({ token: 'token-jwt' });
		});
	});

	describe('activateAccount', () => {
		it('Should return an user', async () => {
			const userJwt = { email: 'some-email@email.com' };
			const newUser = { _id: 'some_id', ...userJwt } as User;
			jwtService.verifyAsync.mockReturnValue({ user: userJwt });
			userModel.create.mockReturnValue(newUser);
			emailService.sendWelcome.mockResolvedValue();
			const result = await authService.activateAccount('some-token-jwt');
			expect(result).toEqual(newUser);
		});
	});

	describe('forgotPassword', () => {
		it('Should return a token string', async () => {
			const oneUser = { email: 'some-email@email.com' };
			userModel.findOne.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(oneUser),
			}));
			jwtService.signAsync.mockReturnValue('some-token-jwt');
			emailService.sendResetPassword.mockResolvedValue();
			const result = await authService.forgotPassword('some-email@email.com');
			expect(result).toEqual({ token: 'some-token-jwt' });
		});
		it('Should throw an error when user not found with email given', async () => {
			userModel.findOne.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(null),
			}));
			try {
				await authService.forgotPassword('some-email@email.com');
			} catch (error) {
				expect(error).toBeInstanceOf(BadRequestException);
			}
		});
	});

	describe('resetPassword', () => {
		it('Should return an user ', async () => {
			const userJwt = { email: 'some-email@email.com' };
			const realUser = { _id: 'some_id', email: 'some-email@email.com' } as User;
			const input = {
				token: 'some-token-jwt',
				newPassword: 'newPassword',
			} as ResetPasswordDto;
			jwtService.verifyAsync.mockReturnValue({ user: userJwt });
			userModel.findOne.mockImplementationOnce(() => ({
				select: jest
					.fn()
					.mockImplementationOnce(() => ({ lean: jest.fn().mockReturnValue(realUser) })),
			}));
			userModel.findByIdAndUpdate.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(realUser),
			}));
			const result = await authService.resetPassword(input);
			expect(result).toEqual(realUser);
		});

		it('Should throw an error when invalid token', async () => {
			const input = {
				token: 'some-token-jwt',
				newPassword: 'newPassword',
			} as ResetPasswordDto;
			jwtService.verifyAsync.mockReturnValue(null);
			try {
				await authService.resetPassword(input);
			} catch (error) {
				expect(error).toBeInstanceOf(UnauthorizedException);
			}
		});

		it('Should throw an error when email not match with token', async () => {
			const userJwt = { email: 'some-email@email.com' };
			const input = {
				token: 'some-token-jwt',
				newPassword: 'newPassword',
			} as ResetPasswordDto;
			jwtService.verifyAsync.mockReturnValue({ user: userJwt });
			userModel.findOne.mockImplementationOnce(() => ({
				select: jest
					.fn()
					.mockImplementationOnce(() => ({ lean: jest.fn().mockReturnValue(null) })),
			}));
			try {
				await authService.resetPassword(input);
			} catch (error) {
				expect(error).toBeInstanceOf(UnauthorizedException);
			}
		});

		describe('generateAuthToken', () => {
			it('Should return an object authToken', async () => {
				const payload = { user: 'some-email@email.com' } as PayloadUserForJwtToken;
				jwtService.signAsync.mockReturnValue('some-token-jwt');
				const result = await authService.generateAuthToken(payload);
				expect(result).toEqual({
					authToken: { accessToken: 'some-token-jwt', refreshToken: 'some-token-jwt' },
				});
			});
		});
		describe('resetAccessToken', () => {
			it('Should return an object authToken', async () => {
				const payload = { user: 'some-email@email.com' } as PayloadUserForJwtToken;
				jwtService.signAsync.mockReturnValue('some-token-jwt');
				const result = await authService.resetAccessToken(payload);
				expect(result).toEqual('some-token-jwt');
			});
		});

		describe('resetCurrentHashedRefreshToken', () => {
			it('Should return an user', async () => {
				const oneUser = { email: 'some-email@email.com' } as User;
				userModel.findByIdAndUpdate.mockImplementationOnce(() => ({
					lean: jest.fn().mockReturnValue(oneUser),
				}));
				const result = await authService.resetCurrentHashedRefreshToken(
					'some_id',
					'some-refresh-token-jwt',
				);
				expect(result).toEqual(oneUser);
			});
		});

		describe('getUserFromToken', () => {
			it('Should return null for invalid token', async () => {
				jwtService.verifyAsync.mockReturnValue(null);
				const result = await authService.getUserFromToken('some-token');
				expect(result).toBe(null);
			});
			it('Should return null for invalid email in token', async () => {
				jwtService.verifyAsync.mockReturnValue({
					user: { email: 'some-email-not-exists@email.com' },
				});
				userModel.findOne.mockImplementationOnce(() => ({
					lean: jest.fn().mockReturnValue(null),
				}));
				const result = await authService.getUserFromToken('some-token');
				expect(result).toBe(null);
			});

			it('Should return an user', async () => {
				const mockUser = { email: 'some-email-exists@email.com' } as User;
				jwtService.verifyAsync.mockReturnValue({
					user: mockUser,
				});
				userModel.findOne.mockImplementationOnce(() => ({
					lean: jest.fn().mockReturnValue(mockUser),
				}));
				const result = await authService.getUserFromToken('some-token');
				expect(result).toEqual(mockUser);
			});
		});

		describe('getUserFromRefreshToken', () => {
			let loginInput: LoginUserDto;
			let hash: string;
			let mockUser: User;
			beforeAll(async () => {
				loginInput = {
					usernameOrEmail: 'some-email@email.com',
					password: '123456',
				};
				hash = await passwordService.hash(loginInput.password);
				mockUser = {
					username: 'some-username',
					email: 'some-email@email.com',
					password: hash,
				} as User;
			});
			it('Should return an user', async () => {
				jwtService.verifyAsync.mockReturnValue({
					user: mockUser,
				});
				userModel.findOne.mockImplementationOnce(() => ({
					select: jest.fn().mockImplementationOnce(() => ({
						lean: jest.fn().mockReturnValue(mockUser),
					})),
				}));
				passwordService.verify.mockReturnValue(true);
				const result = await authService.getUserFromRefreshToken('some-token');
				expect(result).toEqual(mockUser);
			});
		});
	});
});
