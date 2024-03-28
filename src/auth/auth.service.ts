import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async logIn(username: string, password: string): Promise<{access_token: string}> {
    const user: User = await this.userService.getByUsername(username);
    if (user && user.password === password) {
      const payload = { username: user.username, sub: user.userid };
      const token = await this.jwtService.signAsync(payload);
      return { access_token: token };
    }
    else {
      throw new Error('Invalid username or password');
    }   
  }

  async signUp(username: string, email: string, password: string): Promise<{ access_token: string }> {
    const user: User = await this.userService.getByUsername(username);
    if (user) {
      throw new Error('Username already exists');
    }
    const emailUser: User = await this.userService.getByEmail(email);
    if (emailUser) {
      throw new Error('Email already exists');
    }
    const newUser: User = await this.userService.createUser(username, email, password);
    const payload = { username: newUser.username, sub: newUser.userid };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }

  async validateToken(token: string): Promise<void> {
    try {
      await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret } );
    }
    catch (error) {
      throw new Error('Invalid token');
    }
  }
}
