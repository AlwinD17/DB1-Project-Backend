import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../../constants/key-decorators';
import { ERoles } from '../../constants/roles.enum';

export interface IRequiredRoles{
  roles: ERoles[]
}

export const Roles = (
  roles: ERoles[]
  ) =>
    SetMetadata(ROLES_KEY, Roles);