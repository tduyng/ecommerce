import {
	DataStoredFromToken,
	PayloadUserForJwtToken,
	UserFromRequest,
} from '@common/types/http.types';
import { emailRegex, User } from '@modules/user/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from 'src/providers/email/email.service';
import {
	ChangePasswordDto,
	LoginUserDto,
	RegisterUserDto,
	ResetPasswordDto,
} from '../dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private passwordService: PasswordService,
		private jwtService: JwtService,
		private emailService: EmailService,
	) {}

	public async validateUser(input: LoginUserDto) {
		const { usernameOrEmail, password } = input;
		const isEmail = emailRegex.test(usernameOrEmail);
		let user: User | null;
		if (isEmail) {
			user = await this.userModel
				.findOne({ email: usernameOrEmail })
				.select('+password')
				.lean();
		} else {
			user = await this.userModel
				.findOne({ username: usernameOrEmail })
				.select('+password')
				.lean();
		}
		if (!user) return null;
		// Check password
		const isMatch = await this.passwordService.verify(user.password, password);
		if (!isMatch) return null;
		return user;
	}

	public async register(input: RegisterUserDto) {
		const payload: PayloadUserForJwtToken = {
			user: { ...input },
		};
		const token = await this.jwtService.signAsync(payload);
		await this.emailService.sendEmailConfirmation(input.email, token);
		return { token };
	}

	public async activateAccount(token: string) {
		if (!token) return null;
		const decoded = await this.jwtService.verifyAsync(token);
		if (!decoded || !decoded?.user) return null;
		const dataRegister = decoded.user;
		const newUser = await this.userModel.create(dataRegister);
		await this.emailService.sendWelcome(newUser.email);
		return newUser;
	}

	public async forgotPassword(email: string) {
		if (!emailRegex.test(email)) throw new BadRequestException('Input must be email!');
		const user = await this.userModel.findOne({ email }).lean();
		if (!user) throw new BadRequestException(`User not found with email: ${email}`);
		const emailToken = await this.jwtService.signAsync({ user });
		await this.emailService.sendResetPassword(email, emailToken);

		return { token: emailToken };
	}

	public async resetPassword(input: ResetPasswordDto) {
		const { token, newPassword } = input;
		const decoded = await this.jwtService.verifyAsync(token);
		if (!decoded || !decoded.user)
			throw new BadRequestException('Token is invalid or missing');

		const userJwt = decoded.user;
		const realUser: User = await this.userModel
			.findOne({ email: userJwt.email })
			.select('+password')
			.lean();
		const hash = await this.passwordService.hash(newPassword);
		const updated = await this.userModel
			.findByIdAndUpdate(realUser._id, { password: hash }, { new: true })
			.lean();

		return updated;
	}

	// When use want to change password, they already know their old password
	public async changePassword(_id: string, input: ChangePasswordDto) {
		const { oldPassword, newPassword } = input;
		const user: User = await this.userModel.findById(_id).select('+password').lean();
		if (!user) throw new BadRequestException(`User with id: ${_id} not found`);
		const isMatch = await this.passwordService.verify(user.password, oldPassword);
		if (!isMatch)
			throw new BadRequestException(`Old password must match the current user password`);
		const newHash = await this.passwordService.hash(newPassword);
		const updated = await this.userModel
			.findByIdAndUpdate(_id, { password: newHash }, { new: true })
			.lean();
		return updated;
	}

	public async updateProfile(_id: string, input: UpdateProfileDto) {
		const user: User = await this.userModel.findById(_id).lean();
		if (!user) throw new BadRequestException(`User with id: ${_id} not found`);
		const username = input.username || user.username;
		const email = input.email || user.email;
		const thumbnail = input.thumbnail || user.thumbnail;

		const updated = await this.userModel
			.findById(_id, { username, email, thumbnail }, { new: true })
			.lean();
		return updated;
	}

	public async getUserFromToken(token: string): Promise<User | null> {
		if (!token) return null;
		const decoded: DataStoredFromToken = await this.jwtService.verifyAsync(token);
		if (!decoded || !decoded?.user) return null;
		const { user } = decoded;
		const realUser: User = await this.userModel.findOne({ email: user.email }).lean();
		if (!realUser) return null;
		return realUser;
	}

	public async getUserFromRefreshToken(refreshToken: string): Promise<User | null> {
		if (!refreshToken) return null;
		const decoded: DataStoredFromToken = await this.jwtService.verifyAsync(refreshToken);
		const userReq: UserFromRequest = decoded.user;
		if (!decoded || !userReq) return null;
		const user: User = await this.userModel
			.findOne({ email: userReq.email })
			.select('+currentHashedRefreshToken')
			.lean();
		if (!user) return null;
		const isRefreshTokenMatching = await this.passwordService.verify(
			user.currentHashedRefreshToken,
			refreshToken,
		);

		if (!isRefreshTokenMatching) return null;
		return user;
	}
}
