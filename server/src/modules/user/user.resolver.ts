import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './user.schema';
// import { UserService } from './user.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import admin from 'firebase-admin';
import { envConfig } from '@common/config/env.config';
import uuid from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('src/serviceAccountKey.json');

@Resolver(() => User)
export class UserResolver {
	// constructor(private userService: UserService) {}

	@Mutation(() => String)
	public async uploadFile(
		@Args('file', { type: () => GraphQLUpload }) file: Promise<FileUpload>,
	) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			storageBucket: envConfig().firebase.storageBucket,
		});
		const bucket = admin.storage().bucket();
		const { filename, mimetype, encoding } = await file;
		const metadata = {
			metadata: {
				// This line is very important. It's to create a download token.
				firebaseStorageDownloadTokens: uuid(),
			},
			contentType: 'image/*',
			cacheControl: 'public, max-age=31536000',
		};

		// Uploads a local file to the bucket
		const upload = await bucket.upload(filename, {
			// Support for HTTP requests made with `Accept-Encoding: gzip`
			gzip: true,
			metadata: metadata,
		});
		console.log(`${filename} uploaded.`);
		console.log('attachment:', filename, mimetype, encoding);
		console.log(upload);

		return 'uploaded';

		// const stream = createReadStream();
		// stream.on('data', (chunk: Buffer) => {
		// 	/* do stuff with data here */
		// });
	}
}
