import { RoleType } from '@modules/user/user.schema';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: Array<RoleType>) => SetMetadata('roles', roles);
