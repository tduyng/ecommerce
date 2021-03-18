import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

@Injectable()
export class PasswordService {
	public async hash(plain: string) {
		return await argon2.hash(plain);
	}
	public async verify(hash: string, plain: string) {
		return await argon2.verify(hash, plain);
	}
}
