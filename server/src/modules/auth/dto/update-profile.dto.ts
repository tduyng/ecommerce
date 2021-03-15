import { UserExitsValidator } from '@modules/user/decorators/user-exists.validator';
import { IsEmail, IsOptional, IsString, Matches, Validate } from 'class-validator';

export class UpdateProfileDto {
	@IsOptional()
	@Matches(/[a-zA-Z0-9_-]{2,30}/)
	@Validate(UserExitsValidator)
	username?: string;

	@IsOptional()
	@IsEmail()
	@Validate(UserExitsValidator)
	email?: string;

	@IsOptional()
	@IsString()
	thumbnail?: string;
}
