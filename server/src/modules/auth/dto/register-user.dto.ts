import { UserExitsValidator } from '@modules/user/decorators/user-exists.validator';
import {
	IsEmail,
	IsOptional,
	IsString,
	Matches,
	MinLength,
	Validate,
} from 'class-validator';

export class RegisterUserDto {
	@Matches(/[a-zA-Z0-9_-]{2,30}/)
	@Validate(UserExitsValidator)
	username: string;

	@IsEmail()
	@Validate(UserExitsValidator)
	email: string;

	@IsString()
	@MinLength(3)
	@IsOptional()
	password?: string;

	@IsOptional()
	@IsString()
	thumbnail?: string;
}
