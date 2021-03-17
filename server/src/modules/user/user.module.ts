import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminResolver } from './admin.resolver';
import { UserExitsValidator } from './decorators/user-exists.validator';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	providers: [UserService, UserExitsValidator, AdminResolver],
	exports: [UserService],
})
export class UserModule {}
