import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminResolver } from './admin.resolver';
import { UserExitsValidator } from './decorators/user-exists.validator';
import { UploadService } from './upload.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	controllers: [UserController],
	providers: [UserService, UserExitsValidator, AdminResolver, UploadService],
	exports: [UserService, UploadService],
})
export class UserModule {}
