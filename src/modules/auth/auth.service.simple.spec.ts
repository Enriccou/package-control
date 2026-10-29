import { describe, it, expect } from 'vitest';
import { AuthService } from './auth.service';

describe('AuthService - Instantiation', () => {
  it('should be defined', () => {
    expect(AuthService).toBeDefined();
  });

  it('should have required methods', () => {
    expect(AuthService.prototype.generateTokens).toBeDefined();
  });
});
