import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { UserWhereUniqueInput } from './dto';
import { PaginatedUser } from './dto/paginated-user.object-type';
import { PaginationInput } from './dto/pagination.input';
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

	public async findManyUser(
		filter: FilterQuery<User>,
		pagination?: PaginationInput,
	): Promise<PaginatedUser> {
		let users: User[] = [];
		// Always make default pagination = 25 with first page
		const limit = pagination?.limit || 25;
		const page = pagination?.page || 1;
		users = await this.userModel
			.find(filter)
			.skip((page - 1) * limit)
			.limit(limit)
			.lean();

		const count = await this.userModel.countDocuments(filter);
		return { count, users };
	}

	public async updateOne(_id: string, input: UpdateQuery<User>): Promise<User> {
		const updated: User = await this.userModel
			.findByIdAndUpdate(_id, input, { new: true })
			.lean();
		return updated;
	}

	public async updateMany(
		filter: FilterQuery<User>,
		input: UpdateQuery<User>,
	): Promise<User[]> {
		const updated: User[] = await this.userModel
			.updateMany(filter, input, { new: true })
			.lean();
		return updated;
	}

	public async deleteById(_id: string) {
		return await this.userModel.deleteOne({ _id });
	}

	public async deleteOne(filter: FilterQuery<User>) {
		return await this.userModel.deleteOne(filter);
	}

	public async deleteMany(filter: FilterQuery<User>) {
		return await this.userModel.deleteMany(filter);
	}

	public async queryUsers(
		q: string,
		pagination?: PaginationInput,
	): Promise<PaginatedUser> {
		const text = q.trim();
		const count: number = await this.userModel.countDocuments({
			$or: [{ username: new RegExp(text, 'i') }, { email: new RegExp(text, 'i') }],
		});

		const limit = pagination?.limit || 25;
		const page = pagination?.page || 1;

		const users: User[] = await this.userModel
			.find({
				$or: [{ username: new RegExp(text, 'i') }, { email: new RegExp(text, 'i') }],
			})
			.skip((page - 1) * limit)
			.limit(limit)
			.lean();
		return { count, users };
	}
}
