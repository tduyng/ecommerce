import session from 'express-session';
import { envConfig } from './env.config';
export const SESSION_AUTH_KEY = 'SESSION_AUTH';

export function sessionConfig(): session.SessionOptions {
	const env = envConfig();
	const __prod__ = env.mode === 'production';
	// In-memory storage
	return {
		name: SESSION_AUTH_KEY,
		secret: env.sessionSecret,
		resave: false,
		saveUninitialized: false,
		proxy: true, // add this when behind a reverse proxy, if you need secure cookies
		cookie: {
			httpOnly: true,
			secure: __prod__,
			maxAge: env.jwt.jwtRefreshExpiredTime, // 30 days --> need >= max of alive time of refresh token
			sameSite: __prod__ ? 'none' : 'lax',
			// domain: __prod__ ? '.bookzeta.netlify.app' : undefined,
		},
	};
}
