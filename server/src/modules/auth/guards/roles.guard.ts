import { RoleType } from '@modules/user/user.schema';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserFromRequest } from 'src/common/types';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly _reflector: Reflector) {}
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		// Gets the roles that are passed by the context of class context and route handler
		const classRole = this._reflector.get<RoleType[]>('roles', context.getClass());
		const handlerRole = this._reflector.get<RoleType[]>('roles', context.getHandler());

		let allowedRoles: RoleType[] = [];

		if (classRole) allowedRoles = classRole;
		if (handlerRole) allowedRoles.concat(handlerRole);

		// If no roles are found it can continue.
		if (allowedRoles.length < 1) return true;

		// Gets current user from request object
		const request: Request = context.switchToHttp().getRequest();
		const user = request.user as UserFromRequest;

		// Make sure always pass for 'ADMIN'
		allowedRoles.push(RoleType.ADMIN);

		// User must be have role & the value of role must match with @RoleGuard('value_role')
		return user.role && allowedRoles.includes(user.role);
	}
}
