import { envConfig } from '@common/config/env.config';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { GraphQLWithUploadModule } from './providers/graphql-upload/graphql-with-upload.module';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			useFactory: () => ({
				uri: envConfig().mongodbUri,
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
			}),
		}),
		// GraphQLModule.forRootAsync({
		// 	useFactory: graphqlConfig,
		// }),
		GraphQLWithUploadModule.forRoot(),
		UserModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
