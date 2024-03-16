import { Controller, HttpCode, HttpStatus, Post, Body, UseGuards, Get, Request, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

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
    async login(@Body() signInDto: SignInDto, @Res({passthrough: true}) response: Response): Promise<void> {
        try {
            const { username, password } = signInDto;
            const { access_token } = await this.authService.signIn(username, password);
            response.cookie('wd_access_token', access_token, {httpOnly: true, secure: true});
            response.send();
        }
        catch (error) {
            console.log(error);
            response.status(HttpStatus.BAD_REQUEST).send(error.message);
        }
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signUp(@Body() signInDto: SignUpDto, @Res({passthrough: true}) response: Response): Promise<void> {
        try {
            const { username, email, password } = signInDto;
            const { access_token } = await this.authService.signUp(username, email, password);
            response.cookie('wd_access_token', access_token, {httpOnly: true, secure: true});
            response.send();
        }
        catch (error) {
            console.log(error);
            response.status(HttpStatus.BAD_REQUEST).send(error.message);
        }
    }

    @UseGuards(AuthGuard)
    @Get('check')
    async getProfile(): Promise<void> {
        return;
    }

}
