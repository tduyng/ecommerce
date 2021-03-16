import { SESSION_AUTH_KEY } from '@common/config/session.config';
import { HttpContext, UserFromRequest } from '@common/types';
import { User } from '@modules/user/user.schema';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Context, Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
	ChangePasswordInput,
	LoginUserInput,
	RegisterUserInput,
	ResetPasswordInput,
} from './dto';
import { AuthToken } from './dto/auth-token.object-type';
import { JwtAuth, JwtRefreshTokenGuard } from './guards';
import { AuthService } from './services/auth.service';

@Resolver()
export class AuthResolver {
	constructor(private authService: AuthService, private userService: UserService) {}

	@Query(() => User)
	public async me(@Context() ctx: HttpContext) {
		const userJwt = ctx.req?.user as UserFromRequest;
		if (!userJwt) return null;
		const realUser: User = await this.userService.findById(userJwt._id);
		if (!realUser) return null;
		return realUser;
	}

	@Mutation(() => String)
	public async register(@Args('input') input: RegisterUserInput) {
		const token = await this.authService.register(input);
		return token;
	}

	@Mutation(() => AuthToken)
	public async activate(@Args('token') token: string, @Context() { req }: HttpContext) {
		const user: User = await this.authService.activateAccount(token);
		if (!user) throw new BadRequestException('Token is not valid');

		req.user = user;
		const authToken: AuthToken = await this.authService.generateAuthToken({ user });
		req.session.authToken = authToken;
		return authToken;
	}

	@Mutation(() => AuthToken)
	public async login(
		@Args('input') input: LoginUserInput,
		@Context() { req }: HttpContext,
	) {
		const user = await this.authService.validateUser(input);
		if (!user) throw new BadRequestException('Invalid credentials');
		const authToken: AuthToken = await this.authService.generateAuthToken({ user });
		req.user = user;
		req.session.authToken = authToken;
		return authToken;
	}

	@Mutation(() => Boolean)
	@JwtAuth()
	public async logout(@Context() { req }: HttpContext) {
		try {
			req.res?.clearCookie(SESSION_AUTH_KEY);
			req.session?.destroy();
			return true;
		} catch (error) {
			return false;
		}
	}

	@Mutation(() => String)
	public async forgotPassword(@Args('email') email: string) {
		const token = await this.authService.forgotPassword(email);
		// An email will be send to that email
		return token;
	}

	@Mutation(() => User)
	public async resetPassword(
		@Args('input') input: ResetPasswordInput,
		@Context() { req }: HttpContext,
	) {
		try {
			const user: User = await this.authService.resetPassword(input);

			// Logout after change password
			req.res?.clearCookie(SESSION_AUTH_KEY);
			req.session?.destroy();
			return user;
		} catch (error) {
			throw error;
		}
	}

	// Users change password directly on website when he already knows their password
	@Mutation(() => User)
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
			return user;
		} catch (error) {
			throw error;
		}
	}

	@Mutation(() => AuthToken)
	public async autoRefreshPassword(@Context() { req }: HttpContext) {
		const refreshToken = req.session?.authToken?.refreshToken;
		if (!refreshToken) return null;
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
		return newAuthToken;
	}

	@Mutation(() => AuthToken)
	@UseGuards(JwtRefreshTokenGuard)
	public async refresh(@Context() { req }: HttpContext) {
		const userJwt: UserFromRequest = req.user;
		const newAccessToken = await this.authService.resetAccessToken({ user: userJwt });
		const newAuthToken = req.session?.authToken;
		newAuthToken.accessToken = newAccessToken;
		req.session.authToken = newAuthToken;
		return newAuthToken;
	}
}
