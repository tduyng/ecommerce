import { RoleType } from '@modules/user/user.schema';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';

export function JwtAuth(...roles: RoleType[]) {
	return applyDecorators(
		SetMetadata('roles', roles),
		UseGuards(AuthGuard('jwt'), RolesGuard),
	);
}
