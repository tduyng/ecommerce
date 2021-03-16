import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';

export const graphqlConfig = () => {
	return {
		playground: process.env.NODE_ENV === 'development',
		autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
		sortSchema: true,
		uploads: {
			maxFileSize: 20_000_000, // 20 MB
			maxFiles: 5,
		},
		tracing: false,
		context: ({ req, connection }) => {
			if (!connection) {
				// Http request
				return {
					token: undefined as string | undefined,
					req: req as Request,
				};
			} else {
				// USE THIS TO PROVIDE THE RIGHT CONTEXT FOR I18N
				return {
					token: undefined as string | undefined,
					req: connection.context as Request,
				};
			}
		},

		formatError: (error: GraphQLError) => {
			const graphQLFormattedError: GraphQLFormattedError = {
				message: error.extensions?.exception?.response?.message || error.message,
				locations: error.locations,
				path: error.path,
				extensions: {
					code: error.extensions?.code,
					exception: {
						name: error.extensions?.exception?.name || error.extensions?.exception?.type,
					},
				},
			};
			return graphQLFormattedError;
		},
	};
};
