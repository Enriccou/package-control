import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockJwtService: any;

  beforeEach(() => {
    mockJwtService = {
      sign: vi.fn().mockReturnValue('token'),
      verify: vi.fn().mockReturnValue({ userId: '1' }),
    };

    service = new AuthService(mockJwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate tokens', async () => {
    const payload = { userId: '1', email: 'test@test.com' };
    const result = await service.generateTokens(payload);
    expect(result).toBeDefined();
    expect(result.access_token).toBe('token');
    expect(result.refresh_token).toBe('token');
  });

  it('should validate token', async () => {
    const result = await service.validateToken('valid_token');
    expect(result).toBeDefined();
    expect(result.userId).toBe('1');
  });

  it('should throw error for invalid token', async () => {
    mockJwtService.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await expect(service.validateToken('invalid_token')).rejects.toThrow();
  });
});
