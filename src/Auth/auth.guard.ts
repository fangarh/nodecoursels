import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class LoftAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return true;
  }
}
