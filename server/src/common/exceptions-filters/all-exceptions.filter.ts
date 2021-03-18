import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

// Avoid always try catch for resolver of graphql
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		switch (host.getType() as string) {
			case 'http':
				// Catch error direct if is http request
				super.catch(exception, host);
				return;
			case 'graphql':
				// Catch graphql request error with apollo-error-converter
				// Fill name, code, type fields for Apollo Error Converter
				if (!exception.type) {
					exception.type = exception.constructor?.name || exception.message;
				}
				if (!exception.code) {
					exception.code = exception.status;
				}
				return exception;
			default:
				super.catch(exception, host);
				return;
		}
	}
}
