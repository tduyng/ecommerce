import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class PaginationInput {
	@IsNumber()
	@IsOptional()
	@Field(() => Int, { nullable: true })
	limit?: number;

	@IsNumber()
	@IsOptional()
	@Field(() => Int, { nullable: true })
	page?: number;
}
