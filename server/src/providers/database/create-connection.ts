import mongoose, { Connection } from 'mongoose';
import { Logger } from '@nestjs/common';
import { envConfig } from 'src/common/config/env.config';

export const createConnection = async (): Promise<Connection> => {
	const env = envConfig();

	const mongoClient = await mongoose.connect(env.mongodbUri, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useNewUrlParser: true,
	});

	Logger.log('Database connected');
	return mongoClient.connection;
};
