import { RoleType, User } from '@modules/user/user.schema';
import { Request, Response } from 'express';

export interface HttpContext {
	req: Request;
	res: Response;
}

export interface PayloadUserForJwtToken {
	user: UserFromRequest;
}

export interface DataStoredFromToken {
	user: UserFromRequest;
}

export interface UserFromRequest extends Partial<User> {
	_id?: string;
	role?: RoleType;
	email?: string;
	username?: string;
	password?: string;
	avatar?: string;
}
export interface SessionAuthToken {
	authToken?: IAuthToken;
}
export interface IAuthToken {
	accessToken?: string;
	refreshToken?: string;
}
