import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';
import { ConfigModule } from '@nestjs/config';
import { MyLoggerService } from 'src/logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule.register({ session: false }), // Disable session support
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60min' },
    }),

    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: '60m' },
    //   }),
    // }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
    MyLoggerService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
  constructor() {}
}
