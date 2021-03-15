import { envConfig } from '@common/config/env.config';
import { Module } from '@nestjs/common';
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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
