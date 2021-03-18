import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from '../services/password.service';
import argon2 from 'argon2';

describe('PasswordService', () => {
	let passwordService: PasswordService;
	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PasswordService],
		}).compile();
		passwordService = module.get<PasswordService>(PasswordService);
	});

	it('Should be defined', () => {
		expect(passwordService).toBeDefined();
	});

	describe('hash', () => {
		it('Should be hash password', async () => {
			const plain = '1234567';
			const hash = await passwordService.hash(plain);
			expect(await argon2.verify(hash, plain)).toEqual(true);
		});
	});

	describe('verify', () => {
		it('Should be return true', async () => {
			const plain = '1234567';
			const hash = await argon2.hash(plain);
			expect(await passwordService.verify(hash, plain)).toBe(true);
		});
	});
});
