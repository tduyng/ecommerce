import { User } from '@modules/user/user.schema';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envConfig } from 'src/common/config/env.config';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh-token',
) {
	constructor(private authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => req?.session?.authToken?.refreshToken,
			]),
			ignoreExpiration: false,
			secretOrKey: envConfig().jwt.jwtRefreshSecret,
			passReqToCallback: true,
		});
	}
	async validate(req: Request): Promise<User> {
		const refreshToken = req?.session?.authToken?.refreshToken;
		if (!refreshToken) return null;
		const user = await this.authService.getUserFromRefreshToken(refreshToken);
		return user;
	}
}
