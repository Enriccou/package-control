import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ManagersService } from '../managers/managers.service';
import { UnauthorizedException } from '@nestjs/common';

vi.mock('bcryptjs', () => ({
  default: {
    compare: vi.fn().mockResolvedValue(true),
    hash: vi.fn().mockResolvedValue('hashed_password'),
  },
}));

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: any;
  let managersService: any;

  beforeEach(() => {
    jwtService = {
      sign: vi.fn((payload) => `token_${payload.sub}`),
      verify: vi.fn((token, opts) => ({ sub: '123', email: 'test@test.com' })),
    };

    managersService = {
      findByEmail: vi.fn(),
      findById: vi.fn(),
    };

    authService = new AuthService(managersService, jwtService);
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const mockManager = {
        _id: '123',
        email: 'test@test.com',
        password: '$2a$10$mock',
        name: 'Test User',
        role: 'ADMIN',
      };

      managersService.findByEmail.mockResolvedValue(mockManager);

      const result = await authService.login({
        email: 'test@test.com',
        password: 'password',
      });

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
      expect(result.manager.email).toBe('test@test.com');
    });

    it('should throw when email not found', async () => {
      managersService.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login({
          email: 'notfound@test.com',
          password: 'password',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refreshToken', () => {
    it('should refresh token successfully', async () => {
      const mockManager = {
        _id: '123',
        email: 'test@test.com',
        name: 'Test User',
        role: 'ADMIN',
      };

      managersService.findById.mockResolvedValue(mockManager);

      const result = await authService.refreshToken('valid_refresh_token');

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
    });

    it('should throw when refresh token is invalid', async () => {
      jwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(authService.refreshToken('invalid_token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw when no token provided', async () => {
      await expect(authService.refreshToken('')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      const result = await authService.logout('123');

      expect(result).toEqual({
        message: 'Logout realizado com sucesso',
      });
    });
  });
});
