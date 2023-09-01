// auth/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../database/models/user.model'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Se nenhum papel é exigido, acesse a rota
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // Supondo que você tenha armazenado o usuário no objeto de solicitação durante a autenticação

    // Verifique se o usuário tem a role necessária para acessar a rota
    return requiredRoles.some((role) => user.data.role === role);
  }
}
