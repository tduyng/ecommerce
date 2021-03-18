import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { envConfig } from 'src/common/config/env.config';
import { PayloadUserForJwtToken } from 'src/common/types';
import { User } from '@modules/user/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => req?.session?.authToken?.accessToken,
			]),
			ignoreExpiration: false,
			secretOrKey: envConfig().jwt.jwtSecret,
		});
	}

	async validate(payload: PayloadUserForJwtToken): Promise<User> {
		const user: User = await this.userModel.findOne({ email: payload.user.email }).lean();
		return user;
	}
}
