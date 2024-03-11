import { Controller, HttpCode, HttpStatus, Post, Body, HttpException, UseGuards, Get, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

class SignInDto {
    username: string;
    password: string;
}

class SignUpDto {
    username: string;
    email: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async login(@Body() signInDto: SignInDto): Promise<{access_token: string}> {
        try {
            const { username, password } = signInDto;
            return this.authService.signIn(username, password);
        }
        catch (error) {
            console.log(error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signUp(@Body() signInDto: SignUpDto): Promise<{access_token: string} | {error: string}> {
        try {
            const { username, email, password } = signInDto;
            console.log(username, email, password);
            return this.authService.signUp(username, email, password);
        }
        catch (error) {
            console.log(error);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req): Promise<any> {
        return req.user;
    }

}
