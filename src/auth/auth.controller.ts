import { Controller, HttpCode, HttpStatus, Post, Body, Param, UseGuards, Get, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

class LogInDto {
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
    @Post('login')
    async login(@Body() logInDto: LogInDto, @Res({passthrough: true}) response: Response): Promise<void> {
        try {
            const { username, password } = logInDto;
            const { access_token } = await this.authService.logIn(username, password);
            response.cookie('wd_access_token', access_token, {httpOnly: true, secure: true});
            response.send();
        }
        catch (error) {
            console.log("Error on auth/login:\n", error);
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
            console.log("Error on auth/signup:\n", error);
            response.status(HttpStatus.BAD_REQUEST).send(error.message);
        }
    }

    @UseGuards(AuthGuard)
    @Get('check')
    async checkAuth(): Promise<void> {
        return;
    }

    @HttpCode(HttpStatus.OK)
    @Post('validate')
    async validateToken(@Body() validationDto: any, @Res({passthrough: true}) response: Response): Promise<void> {
        try {
            const allCookies = validationDto.cookies;
            const token = allCookies.find((cookie: any) => cookie.name === 'wd_access_token').value;
            await this.authService.validateToken(token);
            response.send();
        }
        catch (error) {
            console.log("Error on auth/validate:\n", error);
            response.status(HttpStatus.BAD_REQUEST).send(error.message);
        }
    }

}
