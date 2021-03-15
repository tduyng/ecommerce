import { IsString, MinLength } from 'class-validator';

// User change password directly on website
export class ChangePasswordDto {
	@IsString()
	oldPassword: string;

	@MinLength(3)
	@IsString()
	newPassword: string;
}
