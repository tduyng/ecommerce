import { UserFromRequest } from '@common/types';
import { RoleType } from '@modules/user/user.schema';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
	constructor(private readonly reflector: Reflector) {
		super();
	}
	public async canActivate(context: ExecutionContext) {
		await super.canActivate(context);

		const ctx = GqlExecutionContext.create(context);
		const user = ctx.getContext().req.user as UserFromRequest;

		const classRole = this.reflector.get<RoleType[]>('roles', context.getClass());
		const handlerRole = this.reflector.get<RoleType[]>('roles', context.getHandler());

		let allowedRoles: RoleType[] = [];

		if (classRole) allowedRoles = classRole;
		if (handlerRole) allowedRoles.concat(handlerRole);

		// If no roles are found it can continue.
		if (allowedRoles.length < 1) return true;

		// Make sure always pass for 'ADMIN'
		allowedRoles.push(RoleType.ADMIN);

		// User must be have role & the value of role must match with @RoleGuard('value_role')
		return user.role && allowedRoles.includes(user.role);
	}

	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}
}
