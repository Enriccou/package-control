import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PackagesService } from './packages.service';

describe('PackagesService', () => {
  let service: PackagesService;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn().mockResolvedValue({ _id: '1', carrier: 'Test' }),
      findAll: vi.fn().mockResolvedValue([]),
      findById: vi.fn().mockResolvedValue(null),
      findByResidentId: vi.fn().mockResolvedValue([]),
      findPending: vi.fn().mockResolvedValue([]),
      update: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
      incrementNotificationAttempts: vi.fn(),
      confirmNotification: vi.fn().mockResolvedValue({}),
    };

    service = new PackagesService(mockRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a package', async () => {
    const dto = { residentId: '1', carrier: 'Test' };
    const result = await service.create(dto);
    expect(result).toBeDefined();
    expect(mockRepository.create).toHaveBeenCalledWith(dto);
  });

  it('should find all packages', async () => {
    await service.findAll(0, 10);
    expect(mockRepository.findAll).toHaveBeenCalledWith(0, 10);
  });

  it('should find package by id', async () => {
    await service.findById('1');
    expect(mockRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should find packages by resident id', async () => {
    await service.findByResidentId('1');
    expect(mockRepository.findByResidentId).toHaveBeenCalled();
  });

  it('should find pending packages', async () => {
    await service.findPending(7);
    expect(mockRepository.findPending).toHaveBeenCalledWith(7);
  });

  it('should update a package', async () => {
    const dto = { carrier: 'Updated' };
    await service.update('1', dto);
    expect(mockRepository.update).toHaveBeenCalledWith('1', dto);
  });

  it('should mark as picked up', async () => {
    await service.markAsPickedUp('1');
    expect(mockRepository.update).toHaveBeenCalled();
  });

  it('should delete a package', async () => {
    await service.delete('1');
    expect(mockRepository.delete).toHaveBeenCalledWith('1');
  });

  it('should increment notification attempts', async () => {
    await service.incrementNotificationAttempts('1');
    expect(mockRepository.incrementNotificationAttempts).toHaveBeenCalledWith('1');
  });

  it('should confirm notification', async () => {
    await service.confirmNotification('1');
    expect(mockRepository.confirmNotification).toHaveBeenCalledWith('1');
  });

  it('should generate whatsapp link', async () => {
    mockRepository.findById.mockResolvedValue({
      carrier: 'Sedex',
      trackingNumber: 'ABC123',
      receivedAt: new Date(),
    });

    const link = await service.getWhatsAppLink('1', '5511999999999');
    expect(link).toContain('wa.me');
    expect(link).toContain('5511999999999');
  });

  it('should return null for whatsapp link if package not found', async () => {
    mockRepository.findById.mockResolvedValue(null);
    const link = await service.getWhatsAppLink('1', '5511999999999');
    expect(link).toBeNull();
  });
});
