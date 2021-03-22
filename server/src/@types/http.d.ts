declare namespace Express {
	interface Request {
		session?: {
			authToken?: {
				accessToken?: string;
				refreshToken?: string;
			};
			cart?: any;
			destroy: () => void;
			res: Response;
		};
	}
}
