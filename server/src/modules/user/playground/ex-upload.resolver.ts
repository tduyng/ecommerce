import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user.schema';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Logger } from '@nestjs/common';
import fs from 'fs';
import { ExUploadService } from './ex-upload.service';

@Resolver(() => User)
export class ExUploadResolve {
	constructor(private uploadService: ExUploadService) {}

	@Mutation(() => String)
	public async uploadFile(@Args('file', { type: () => GraphQLUpload }) file: FileUpload) {
		try {
			const { fullPath, fileMimetype } = await this.uploadService.storeFileByFs(file);
			const upload = await this.uploadService.upload(fullPath, fileMimetype);
			console.log(upload);
			fs.unlink(fullPath, (err) => {
				if (err) throw err;
				Logger.log(`${file.filename} uploaded!`);
			});

			console.log('url --->');

			return 'uploaded';
		} catch (error) {
			throw error;
		}
	}
}
