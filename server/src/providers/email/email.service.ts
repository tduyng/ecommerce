import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EnvConfig, envConfig } from 'src/common/config/env.config';

type MailOptions = ISendMailOptions & { template?: string };

@Injectable()
export class EmailService {
	private _env: EnvConfig;
	constructor(private mailer: MailerService) {
		this._env = envConfig();
	}

	send(options: MailOptions) {
		if (this._env.mode !== 'test') {
			return this.mailer.sendMail(options);
		}
		return null;
	}

	public async sendWelcome(toEmail: string): Promise<void> {
		await this.send({
			template: 'welcome',
			to: toEmail,
			subject: '🥳🎉 Welcome to the Bookstore',
			context: {
				siteUrl: this._env.clientUrl,
			},
		}).then();
	}

	public async sendResetPassword(toEmail: string, token: string): Promise<void> {
		const tokenUrl = `${this._env.serverUrl}/api/auth/reset-password?token=${token}`;
		await this.send({
			template: 'reset-password',
			to: toEmail,
			subject: '🔑 Request to recover your password',
			context: {
				tokenUrl,
			},
		}).then();
	}

	public async sendEmailConfirmation(toEmail: string, token: string): Promise<void> {
		const tokenUrl = `${this._env.serverUrl}/api/auth/activate?token=${token}`;
		await this.send({
			template: 'email-confirmation',
			to: toEmail,
			subject: 'Confirmation you email registration',
			context: {
				tokenUrl,
			},
		}).then();
	}
}
