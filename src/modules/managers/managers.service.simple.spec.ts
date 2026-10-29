import { describe, it, expect } from 'vitest';
import { ManagersService } from './managers.service';

describe('ManagersService - Instantiation', () => {
  it('should be defined', () => {
    expect(ManagersService).toBeDefined();
  });

  it('should have required methods', () => {
    expect(ManagersService.prototype.create).toBeDefined();
    expect(ManagersService.prototype.findAll).toBeDefined();
    expect(ManagersService.prototype.findById).toBeDefined();
    expect(ManagersService.prototype.findByEmail).toBeDefined();
    expect(ManagersService.prototype.update).toBeDefined();
  });
});
