import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const GraphqlReq = createParamDecorator((data, context: ExecutionContext) => {
	const ctx = GqlExecutionContext.create(context).getContext();
	const req: Request = ctx.req;
	return req;
});
