import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];

    if (!apiKey) {
      return false;
    }

    const reqUser = await this.prisma.user.findFirst({
      where: {
        api_key: apiKey,
      },
    });

    if (!reqUser) {
      return false;
    }
    return true;
  }
}
