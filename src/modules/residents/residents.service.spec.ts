import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResidentsService } from './residents.service';

describe('ResidentsService', () => {
  let service: ResidentsService;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn().mockResolvedValue({ _id: '1', name: 'Test' }),
      findAll: vi.fn().mockResolvedValue([]),
      findById: vi.fn().mockResolvedValue(null),
      findByEmail: vi.fn().mockResolvedValue(null),
      findByPropertyId: vi.fn().mockResolvedValue([]),
      update: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };

    service = new ResidentsService(mockRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a resident', async () => {
    const dto = {
      name: 'Test',
      email: 'test@test.com',
      phone: '11999999999',
      address: 'Test Address',
      propertyId: '1',
      moveInDate: '2026-01-01',
    };
    const result = await service.create(dto);
    expect(result).toBeDefined();
    expect(mockRepository.create).toHaveBeenCalled();
  });

  it('should find all residents', async () => {
    await service.findAll(0, 10);
    expect(mockRepository.findAll).toHaveBeenCalledWith(0, 10);
  });

  it('should find resident by id', async () => {
    await service.findById('1');
    expect(mockRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should find resident by email', async () => {
    await service.findByEmail('test@test.com');
    expect(mockRepository.findByEmail).toHaveBeenCalled();
  });

  it('should find residents by property id', async () => {
    await service.findByPropertyId('1');
    expect(mockRepository.findByPropertyId).toHaveBeenCalled();
  });

  it('should update a resident', async () => {
    mockRepository.findById.mockResolvedValue({ _id: '1' });
    const dto = { phone: '11988888888' };
    await service.update('1', dto);
    expect(mockRepository.update).toHaveBeenCalled();
  });

  it('should delete a resident', async () => {
    mockRepository.findById.mockResolvedValue({ _id: '1' });
    await service.delete('1');
    expect(mockRepository.delete).toHaveBeenCalled();
  });
});
