import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../../common/constants/key-decorators';
import { ERoles } from '../../config/roles.enum';

export interface IRequiredRoles{
  roles: ERoles[]
}

export const Roles = (
  roles: ERoles[]
  ) =>
    SetMetadata(ROLES_KEY, roles);