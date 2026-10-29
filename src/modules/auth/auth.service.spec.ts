import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: any;

  const mockUser = {
    _id: '507f1f77bcf86cd799439011',
    email: 'admin@example.com',
    password: '$2b$10$hashedpassword',
    name: 'Admin User',
    role: 'ADMIN',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: vi.fn(),
            verify: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);
  });

  describe('generateTokens', () => {
    it('should generate access and refresh tokens', async () => {
      const payload = { userId: mockUser._id, email: mockUser.email, role: mockUser.role };

      jwtService.sign
        .mockReturnValueOnce('access_token')
        .mockReturnValueOnce('refresh_token');

      const result = await service.generateTokens(payload);

      expect(result.access_token).toBe('access_token');
      expect(result.refresh_token).toBe('refresh_token');
      expect(jwtService.sign).toHaveBeenCalledTimes(2);
    });
  });

  describe('validateToken', () => {
    it('should validate a valid token', async () => {
      const token = 'valid_token';
      const decoded = { userId: mockUser._id, email: mockUser.email };

      jwtService.verify.mockReturnValue(decoded);

      const result = await service.validateToken(token);

      expect(result).toEqual(decoded);
      expect(jwtService.verify).toHaveBeenCalledWith(token);
    });

    it('should throw UnauthorizedException for invalid token', async () => {
      const token = 'invalid_token';
      jwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.validateToken(token)).rejects.toThrow();
    });
  });
});
