import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ManagersService } from './managers.service';

describe('ManagersService', () => {
  let service: ManagersService;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn().mockResolvedValue({ _id: '1', name: 'Test' }),
      findAll: vi.fn().mockResolvedValue([]),
      findById: vi.fn().mockResolvedValue(null),
      findByEmail: vi.fn().mockResolvedValue(null),
      update: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };

    service = new ManagersService(mockRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a manager', async () => {
    const dto = { name: 'Test', email: 'test@test.com', password: 'Pass123' };
    const result = await service.create(dto);
    expect(result).toBeDefined();
    expect(mockRepository.create).toHaveBeenCalled();
  });

  it('should find all managers', async () => {
    await service.findAll(0, 10);
    expect(mockRepository.findAll).toHaveBeenCalledWith(0, 10);
  });

  it('should find manager by id', async () => {
    await service.findById('1');
    expect(mockRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should find manager by email', async () => {
    await service.findByEmail('test@test.com');
    expect(mockRepository.findByEmail).toHaveBeenCalled();
  });

  it('should update a manager', async () => {
    mockRepository.findById.mockResolvedValue({ _id: '1' });
    const dto = { name: 'Updated' };
    await service.update('1', dto);
    expect(mockRepository.update).toHaveBeenCalled();
  });

  it('should delete a manager', async () => {
    mockRepository.findById.mockResolvedValue({ _id: '1' });
    await service.delete('1');
    expect(mockRepository.delete).toHaveBeenCalled();
  });
});
