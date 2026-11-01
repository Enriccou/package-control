import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { ManagersModule } from '../managers/managers.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { JwtAuthGuard } from './guards/jwt.guard.js';
import { RolesGuard } from './guards/roles.guard.js';
import { LoginHandler } from './handlers/commands/login.handler.js';
import { RefreshTokenHandler } from './handlers/commands/refresh-token.handler.js';
import { LogoutHandler } from './handlers/commands/logout.handler.js';

const CommandHandlers = [LoginHandler, RefreshTokenHandler, LogoutHandler];

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    ManagersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    ...CommandHandlers,
  ],
  exports: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
