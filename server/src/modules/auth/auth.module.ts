import { envConfig } from '@common/config/env.config';
import { UserModule } from '@modules/user/user.module';
import { User, UserSchema } from '@modules/user/user.schema';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from 'src/providers/email/email.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		PassportModule.register({
			defaultStrategy: 'jwt',
			session: true,
		}),
		JwtModule.register({
			secret: envConfig().jwt.jwtSecret,
		}),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		EmailModule,
		UserModule,
	],
	providers: [
		AuthService,
		PasswordService,
		JwtStrategy,
		JwtRefreshTokenStrategy,
		AuthResolver,
	],
	exports: [AuthService, PasswordService],
})
export class AuthModule {}
