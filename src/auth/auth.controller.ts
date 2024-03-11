import { Controller } from '@nestjs/common';
import { Controller, HttpCode, HttpStatus, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';

class SignInDto {
    username: string;
    password: string;
}

@Controller('auth')
export class AuthController {}
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async login(@Body() signInDto: SignInDto): Promise<{access_token: string}>{
        const { username, password } = signInDto;
        return this.authService.signIn(username, password);
    }
}
