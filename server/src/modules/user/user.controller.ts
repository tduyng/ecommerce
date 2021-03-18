import {
	BadRequestException,
	Controller,
	HttpException,
	Logger,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';
import fs from 'fs';

@Controller('users')
export class UserController {
	constructor(private uploadService: UploadService) {}

	@Post('upload')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: 'src/upload',
			}),
		}),
	)
	public async uploadFile(@UploadedFile() file: any) {
		try {
			if (!file) {
				throw new BadRequestException('Please choose a file');
			}
			const filename = file.filename;
			const fullPath = process.cwd() + `/src/upload/${filename}`;
			const upload = await this.uploadService.upload(file.filename, file.mimetype);
			const url = this.uploadService.getUrl(filename);
			fs.unlink(fullPath, (err) => {
				if (err) throw err;
				Logger.log(`${file.filename} uploaded!`);
			});
			console.log(upload[0]);

			return url;
		} catch (error) {
			throw new HttpException(error.message, 500);
		}
	}
}
