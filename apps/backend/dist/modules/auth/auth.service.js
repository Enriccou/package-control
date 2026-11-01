var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ManagersService } from '../managers/managers.service.js';
import bcrypt from 'bcryptjs';
let AuthService = class AuthService {
    managersService;
    jwtService;
    constructor(managersService, jwtService) {
        this.managersService = managersService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const manager = await this.managersService.findByEmail(loginDto.email);
        if (!manager) {
            throw new UnauthorizedException('dados inválidos');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, manager.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('dados inválidos');
        }
        return this.generateTokens(manager);
    }
    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw new UnauthorizedException('Token não fornecido');
        }
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            const manager = await this.managersService.findById(payload.sub);
            if (!manager) {
                throw new UnauthorizedException('Token inválido');
            }
            return this.generateTokens(manager);
        }
        catch (error) {
            throw new UnauthorizedException('Token de refresh inválido ou expirado');
        }
    }
    async logout(managerId) {
        return { message: 'Logout realizado com sucesso' };
    }
    generateTokens(manager) {
        const payload = { sub: manager._id, email: manager.email, role: manager.role };
        const access_token = this.jwtService.sign(payload, {
            expiresIn: parseInt(process.env.JWT_EXPIRATION || '3600'),
        });
        const refresh_token = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRATION || '604800'),
        });
        return {
            access_token,
            refresh_token,
            manager: {
                id: manager._id,
                name: manager.name,
                email: manager.email,
                role: manager.role,
            },
        };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ManagersService,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map