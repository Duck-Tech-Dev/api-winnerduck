import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });
      request['user'] = payload;
    }
    catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
    return true;
  }

  async extractToken(request: any): Promise<string | undefined> {
    const cookies: string = request.headers.cookie;
    if (!cookies) {
      return undefined;
    }
    const tokenCookie = cookies.split(';').find(c => c.trim().startsWith('wd_access_token='));
    if (!tokenCookie) {
      return undefined;
    }
    const token = tokenCookie.split('=')[1];
    return token;
  }
}
