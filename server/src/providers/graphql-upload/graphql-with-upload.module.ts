import { graphqlConfig } from '@common/config/graphql.config';
import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlUploadExpress } from 'graphql-upload';

@Module({})
export class GraphQLWithUploadModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
	}

	static forRoot(): DynamicModule {
		return {
			module: GraphQLWithUploadModule,
			imports: [
				GraphQLModule.forRootAsync({
					useFactory: graphqlConfig,
				}),
			],
		};
	}
}
