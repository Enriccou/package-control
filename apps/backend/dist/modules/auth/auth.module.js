var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Module({
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
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map