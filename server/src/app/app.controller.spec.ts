import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { envConfig } from 'src/common/config/env.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

describe('AppController', () => {
	let appController: AppController;

	let app: TestingModule;

	beforeAll(async () => {
		app = await Test.createTestingModule({
			imports: [
				MongooseModule.forRoot(envConfig().mongodbUri, {
					useNewUrlParser: true,
					useFindAndModify: false,
					useCreateIndex: true,
				}),
			],
			controllers: [AppController],
			providers: [
				AppService,
				{
					provide: Connection,
					useValue: { readyState: jest.fn().mockReturnValue(1) },
				},
			],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	afterAll(async () => {
		app.close();
	});

	it('Should be defined', () => {
		expect(appController).toBeDefined();
	});

	describe('getHello', () => {
		it('should return "Hello World!"', () => {
			expect(appController.getHello()).toBe('Hello World!');
		});
	});
});
