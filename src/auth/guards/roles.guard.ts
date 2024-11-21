import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../constants/key-decorators';
import { IRequiredRoles } from '../decorators/roles.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { roles } = this.reflector.getAllAndOverride<IRequiredRoles>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) || {};

    if (!roles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    
    if( roles.some((role) => user.role) ){
      return true
    }

    return false

  }
}
