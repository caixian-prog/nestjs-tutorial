import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    return this.usersService.create(username, password);
  }
  @Post('register/admin')
  async registerAdmin(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    return this.usersService.create(username, password, 'admin');
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('admin')
  getAdminData(@Request() req) {
    return 'This is admin data';
  }
}
