import { envConfig } from '@common/config/env.config';
import { graphqlConfig } from '@common/config/graphql.config';
import { AuthModule } from '@modules/auth/auth.module';
import { OrderModule } from '@modules/order/order.module';
import { ProductModule } from '@modules/product/product.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
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
				useFindAndModify: false,
			}),
		}),
		// GraphQLWithUploadModule.forRoot(),
		GraphQLModule.forRootAsync({
			useFactory: graphqlConfig,
		}),
		UserModule,
		AuthModule,
		ProductModule,
		OrderModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
