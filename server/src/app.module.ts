import { envConfig } from '@common/config/env.config';
import { graphqlConfig } from '@common/config/graphql.config';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';

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
		MulterModule.register({
			dest: 'src/upload',
		}),
		GraphQLModule.forRootAsync({
			useFactory: graphqlConfig,
		}),
		UserModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
