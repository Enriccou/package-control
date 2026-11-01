var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, Body, UseGuards, Headers } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginDto } from './dtos/login.dto.js';
import { LoginCommand } from './commands/impl/login.command.js';
import { RefreshTokenCommand } from './commands/impl/refresh-token.command.js';
import { LogoutCommand } from './commands/impl/logout.command.js';
import { JwtAuthGuard } from './guards/jwt.guard.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
let AuthController = class AuthController {
    commandBus;
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async login(loginDto) {
        return this.commandBus.execute(new LoginCommand(loginDto));
    }
    async refresh(authHeader) {
        const token = authHeader?.replace('Bearer ', '');
        return this.commandBus.execute(new RefreshTokenCommand(token));
    }
    async logout(user) {
        return this.commandBus.execute(new LogoutCommand(user.userId));
    }
};
__decorate([
    Post('login'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Post('refresh'),
    __param(0, Headers('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Post('logout'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    Controller('auth'),
    __metadata("design:paramtypes", [CommandBus])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map