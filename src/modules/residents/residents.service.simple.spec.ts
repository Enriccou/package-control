import { describe, it, expect } from 'vitest';
import { ResidentsService } from './residents.service';

describe('ResidentsService - Instantiation', () => {
  it('should be defined', () => {
    expect(ResidentsService).toBeDefined();
  });

  it('should have required methods', () => {
    expect(ResidentsService.prototype.create).toBeDefined();
    expect(ResidentsService.prototype.findAll).toBeDefined();
    expect(ResidentsService.prototype.findById).toBeDefined();
    expect(ResidentsService.prototype.findByEmail).toBeDefined();
    expect(ResidentsService.prototype.findByPropertyId).toBeDefined();
    expect(ResidentsService.prototype.update).toBeDefined();
    expect(ResidentsService.prototype.delete).toBeDefined();
  });
});
