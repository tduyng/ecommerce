import { Resolver } from '@nestjs/graphql';
import { Query } from 'mongoose';
import { AuthService } from './services/auth.service';

@Resolver()
export class AuthResolver {
	constructor(private authService: AuthService) {}

  @Query(()=> )
}
