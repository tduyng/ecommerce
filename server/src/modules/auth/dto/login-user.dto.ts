import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
	@IsString()
	@IsNotEmpty()
	usernameOrEmail: string;

	@IsString()
	@MinLength(3)
	password: string;
}
