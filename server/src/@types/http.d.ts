import { Cart } from '@modules/user/dto';
declare global {
	namespace Express {
		interface Request {
			session?: {
				authToken?: {
					accessToken?: string;
					refreshToken?: string;
				};
				cart?: Cart;
				destroy: () => void;
				res: Response;
			};
		}
	}
}
