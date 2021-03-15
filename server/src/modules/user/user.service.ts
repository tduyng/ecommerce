import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserWhereUniqueInput } from './dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}
	public async findOne(where: UserWhereUniqueInput): Promise<User> {
		const user: User = await this.userModel.findOne(where).lean();
		return user;
	}

	public async findById(_id: string): Promise<User> {
		const user: User = await this.userModel.findById(_id).lean();
		return user;
	}

	// finOne
	// findMany
	// updateOne
	// updateMany
	// deleteOne
	// deleteMany
}
