import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ManagersService } from '../managers/managers.service.js';
import { LoginDto } from './dtos/login.dto.js';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private managersService: ManagersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const manager = await this.managersService.findByEmail(loginDto.email);

    if (!manager) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      manager.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return this.generateTokens(manager);
  }

  async refreshToken(refreshToken: string) {
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
    } catch (error) {
      throw new UnauthorizedException('Token de refresh inválido ou expirado');
    }
  }

  async logout(managerId: string) {
    return { message: 'Logout realizado com sucesso' };
  }

  private generateTokens(manager: any) {
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
}
