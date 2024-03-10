import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('all')
    async getAll() {
        try {
            const data = await this.userService.getAll();
            return data;
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }

    @Get('one/:id')
    async getByID(@Param('id') id: string) {
        try {
            const data = await this.userService.getByID(id);
            return data;
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }

    @Get('ids')
    async getAllIDs() {
        console.log('getting all ids');
        try {
            const data = await this.userService.getAllIDs();
            return data;
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }
}
