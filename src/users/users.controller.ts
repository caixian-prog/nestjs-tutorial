import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { username, password, role } = createUserDto;
    return this.usersService.create(username, password, role || 'user');
  }

  @Post('register/admin')
  async registerAdmin(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    return this.usersService.create(username, password, 'admin');
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get admin data' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieve admin data.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('admin')
  getAdminData(@Request() req) {
    return 'This is admin data';
  }
}
