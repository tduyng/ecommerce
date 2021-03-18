import dotenv from 'dotenv';

export const envConfig = (): EnvConfig => {
	const mode = process.env.NODE_ENV;
	if (!mode || mode === 'development') {
		dotenv.config();
	} else {
		dotenv.config({ path: `.env.${mode}` });
	}

	const port = parseInt(process.env.PORT) || 5025;

	return {
		mode,
		port,
		serverUrl: process.env.SERVER_URL || `http://localhost:5025`,
		clientUrl: process.env.CLIENT_URL || `http://localhost:3000`,
		mongodbUri: process.env.MONGODB_URI || `mongodb://localhost:27017/ecommerce-test`,
		sessionSecret: process.env.SESSION_SECRET || `some-very-strong-secret`,
		cookieSecret: process.env.COOKIE_SECRET || `some-very-strong-secret`,
		jwt: {
			jwtSecret: process.env.JWT_SECRET || `some-very-strong-secret`,
			jwtExpiredTime: parseInt(process.env.JWT_EXPIRED_TIME) || 7200,
			jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || `some-very-strong-secret`,
			jwtRefreshExpiredTime: parseInt(process.env.JWT_REFRESH_EXPIRED_TIME) || 2592000,
		},
		email: {
			sendgridApiKey: process.env.SENDGRID_API_KEY,
			emailSender: process.env.EMAIL_AUTH_USER || 'your-email@yopmail.com',
		},
		firebase: {
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		},
	};
};

export interface EnvConfig {
	mode: string;
	port: number;
	serverUrl: string;
	clientUrl: string;
	mongodbUri: string;
	sessionSecret: string;
	cookieSecret: string;
	jwt: {
		jwtSecret: string;
		jwtExpiredTime: number;
		jwtRefreshSecret: string;
		jwtRefreshExpiredTime: number;
	};

	email: {
		sendgridApiKey: string;
		emailSender: string;
	};
	firebase: {
		storageBucket: string;
	};
}
