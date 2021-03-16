import { SESSION_AUTH_KEY } from '@common/config/session.config';
import { HttpContext, UserFromRequest } from '@common/types';
import { User } from '@modules/user/user.schema';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Context, Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
	AuthToken,
	AuthTokenResponse,
	ChangePasswordInput,
	LoginUserInput,
	RegisterUserInput,
	ResetPasswordInput,
} from './dto';
import { LogoutResponse } from './dto/logout-response.objec-type';
import { TokenResponse } from './dto/token-response.objec-type';
import { UserResponse } from './dto/user-response.object-type';
import { JwtAuth, JwtRefreshTokenGuard } from './guards';
import { AuthService } from './services/auth.service';

@Resolver()
export class AuthResolver {
	constructor(private authService: AuthService, private userService: UserService) {}

	@Query(() => UserResponse)
	public async me(@Context() ctx: HttpContext) {
		const userJwt = ctx.req?.user as UserFromRequest;
		if (!userJwt) return { user: null };
		const realUser: User = await this.userService.findById(userJwt._id);
		if (!realUser) return { user: null };
		return { user: realUser };
	}

	@Mutation(() => TokenResponse)
	public async register(@Args('input') input: RegisterUserInput) {
		const token = await this.authService.register(input);
		return { token };
	}

	@Mutation(() => AuthTokenResponse)
	public async activate(@Args('token') token: string, @Context() { req }: HttpContext) {
		const user: User = await this.authService.activateAccount(token);
		if (!user) throw new BadRequestException('Token is not valid');

		req.user = user;
		const authToken: AuthToken = await this.authService.generateAuthToken({ user });
		req.session.authToken = authToken;
		return authToken;
	}

	@Mutation(() => AuthTokenResponse)
	public async login(
		@Args('input') input: LoginUserInput,
		@Context() { req }: HttpContext,
	) {
		const user = await this.authService.validateUser(input);
		if (!user) throw new BadRequestException('Invalid credentials');
		const authToken: AuthToken = await this.authService.generateAuthToken({ user });
		req.user = user;
		req.session.authToken = authToken;
		return { authToken };
	}

	@Mutation(() => LogoutResponse)
	@JwtAuth()
	public async logout(@Context() { req }: HttpContext) {
		try {
			req.res?.clearCookie(SESSION_AUTH_KEY);
			req.session?.destroy();
			return { isLogout: true };
		} catch (error) {
			return { isLogout: false, error: { message: error.message } };
		}
	}

	@Mutation(() => TokenResponse)
	public async forgotPassword(@Args('email') email: string) {
		const token = await this.authService.forgotPassword(email);
		// An email will be send to that email
		return { token };
	}

	@Mutation(() => UserResponse)
	public async resetPassword(
		@Args('input') input: ResetPasswordInput,
		@Context() { req }: HttpContext,
	) {
		try {
			const user: User = await this.authService.resetPassword(input);

			// Logout after change password
			req.res?.clearCookie(SESSION_AUTH_KEY);
			req.session?.destroy();
			return { user };
		} catch (error) {
			return { user: null, error: { message: error.message } };
		}
	}

	// Users change password directly on website when he already knows their password
	@Mutation(() => UserResponse)
	@JwtAuth()
	public async changePassword(
		@Args('input') input: ChangePasswordInput,
		@Context() { req }: HttpContext,
	) {
		try {
			const userJwt: UserFromRequest = req.user;
			const user: User = await this.authService.changePassword(userJwt?._id, input);
			req.res?.clearCookie(SESSION_AUTH_KEY);
			req.session?.destroy();
			return { user };
		} catch (error) {
			return { user: null, error: { message: error.message } };
		}
	}

	@Mutation(() => AuthTokenResponse)
	public async autoRefresh(@Context() { req }: HttpContext) {
		const refreshToken = req.session?.authToken?.refreshToken;
		if (!refreshToken) return { accessToken: null, refreshToken: null };
		const accessToken = req.session?.authToken?.accessToken;
		// if accessToken still valid --> ignore
		if (accessToken) return req.session?.authToken;
		// If access token expired and refreshToken still valid --> auto refresh
		const userJwt = await this.authService.getUserFromRefreshToken(refreshToken);
		if (!userJwt) return null;

		const realUser = await this.userService.findById(userJwt._id);
		if (!realUser) return null;
		const newAccessToken = await this.authService.resetAccessToken({ user: realUser });
		const newAuthToken = req.session?.authToken;
		newAuthToken.accessToken = newAccessToken;
		req.session.authToken = newAuthToken;
		return { authToken: newAuthToken };
	}

	@Mutation(() => AuthTokenResponse)
	@UseGuards(JwtRefreshTokenGuard)
	public async refresh(@Context() { req }: HttpContext) {
		const userJwt: UserFromRequest = req.user;
		const newAccessToken = await this.authService.resetAccessToken({ user: userJwt });
		const newAuthToken = req.session?.authToken;
		newAuthToken.accessToken = newAccessToken;
		req.session.authToken = newAuthToken;
		return { authToken: newAuthToken };
	}
}
