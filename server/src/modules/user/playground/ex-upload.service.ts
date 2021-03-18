import { envConfig } from '@common/config/env.config';
import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import { v4 as uuid } from 'uuid';
import path from 'path';
import { Readable } from 'stream';
import { execFile } from 'child_process';
import fs from 'fs';
import { FileUpload } from 'graphql-upload';
import hasha from 'hasha';
import slugify from 'slugify';

@Injectable()
export class ExUploadService {
	private uploadDir: string;
	constructor() {
		admin.initializeApp({
			credential: admin.credential.cert('src/serviceAccountKey.json'),
			storageBucket: envConfig().firebase.storageBucket,
		});
		this.uploadDir = process.cwd() + '/src/upload';
	}
	public get bucket() {
		const bucket = admin.storage().bucket();
		return bucket;
	}

	public async upload(filePath: string, mimetype: string) {
		const bucket = admin.storage().bucket();
		const metadata = {
			metadata: {
				// This line is very important. It's to create a download token.
				firebaseStorageDownloadTokens: uuid(),
			},
			contentType: mimetype,
			cacheControl: 'public, max-age=31536000', // 30mb
		};

		// Uploads a local file to the bucket
		const upload = await bucket.upload(filePath, {
			// Support for HTTP requests made with `Accept-Encoding: gzip`
			gzip: true,
			metadata: metadata,
		});
		return upload;
	}

	public async storeFileByFs(file: FileUpload): Promise<IFileInFs> {
		const fileUpload = await file;
		const fileStream = fileUpload.createReadStream();

		if (!fs.existsSync(this.uploadDir)) {
			fs.mkdirSync(this.uploadDir);
		}

		const buffer = await this.streamToBuffer(fileStream);
		const hashSum = hasha(buffer, { algorithm: 'sha256' });

		const fileName = slugify(fileUpload.filename);
		const fullPath = path.resolve(this.uploadDir, hashSum, fileName);
		const fileDir = path.resolve(this.uploadDir, hashSum);

		if (!fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir);

			await this.saveFile(fullPath, buffer);
		}

		const fileSize = this.getFileOrDirSizeInBytes(path.dirname(fullPath));

		return {
			originName: fileUpload.filename,
			fileName,
			fullPath,
			filePath: `/src/uploads/${hashSum}/${fileName}`,
			fileSize,
			fileMimetype: fileUpload.mimetype,
			hashSum,
		};
	}

	public async removeDirByFs(hashSum: string): Promise<boolean> {
		const dirPath = path.resolve(this.uploadDir, hashSum);

		if (fs.existsSync(dirPath)) {
			this.deleteDirOrFile(dirPath);
		}

		return true;
	}

	public async execCommand(command: string, args: string[]): Promise<IExecCommand> {
		return new Promise((resolve, reject) => {
			execFile(
				command,
				args,
				{ encoding: 'buffer' },
				(err: Error, stdout: Buffer, stderr: Buffer) => {
					if (err) {
						reject(err);
					}
					return resolve({ stdout, stderr });
				},
			);
		});
	}

	private async streamToBuffer(stream: Readable): Promise<Buffer> {
		const buffer = [];

		return new Promise((resolve, reject) =>
			stream
				.on('error', (error) => reject(error))
				.on('data', (data) => buffer.push(data))
				.on('end', () => resolve(Buffer.concat(buffer))),
		);
	}
	private getFileOrDirSizeInBytes(filePath: string): number {
		let size = 0;

		const stats = fs.statSync(filePath);

		if (stats.isFile()) {
			size += stats.size;
		} else if (stats.isDirectory()) {
			fs.readdirSync(filePath).map((child) => {
				size += this.getFileOrDirSizeInBytes(`${filePath}/${child}`);
			});
		}

		return size;
	}

	private deleteDirOrFile(filePath: string): void {
		const stats = fs.statSync(filePath);

		if (stats.isFile()) {
			fs.unlinkSync(filePath);
		} else if (stats.isDirectory()) {
			fs.readdirSync(filePath).map((child) => {
				this.deleteDirOrFile(`${filePath}/${child}`);
			});

			fs.rmdirSync(filePath);
		}

		return;
	}

	private async saveFile(filePath: string, file: NodeJS.ArrayBufferView): Promise<void> {
		return new Promise((resolve, reject) => {
			fs.mkdir(path.dirname(filePath), { recursive: true }, (errorMkdir: Error) => {
				if (errorMkdir) {
					reject(errorMkdir);
				}
				fs.writeFile(filePath, file, (errorWrite: Error) => {
					if (errorWrite) {
						reject(errorWrite);
					}
					resolve();
				});
			});
		});
	}
}

export interface IFileInFs {
	originName: string;
	fileName: string;
	fullPath: string;
	filePath: string;
	fileSize: number;
	fileMimetype: string;
	hashSum: string;
}

export interface IExecCommand {
	stdout: Buffer;
	stderr: Buffer;
}
