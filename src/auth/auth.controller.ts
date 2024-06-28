import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { MyLoggerService } from 'src/logger/logger.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly logger: MyLoggerService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    this.logger.log("Some log message");
    return this.authService.refresh(refreshToken);
  }
}
