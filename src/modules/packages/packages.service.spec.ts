import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { PackagesService } from './packages.service';
import { PackagesRepository } from './packages.repository';
import { CreatePackageDto } from './dtos/create-package.dto';
import { UpdatePackageDto } from './dtos/update-package.dto';
import { PackageStatus } from './schemas/package.schema';

describe('PackagesService', () => {
  let service: PackagesService;
  let repository: any;

  const mockPackage = {
    _id: '507f1f77bcf86cd799439011',
    residentId: '507f1f77bcf86cd799439012',
    carrier: 'Sedex',
    trackingNumber: 'AA123456789BR',
    description: 'Eletrônico',
    status: PackageStatus.RECEIVED,
    receivedAt: new Date('2026-10-21'),
    pickupAt: null,
    notificationAttempts: 0,
    lastNotificationAt: null,
    notificationConfirmedAt: null,
    notificationFailed: false,
    deletedAt: null,
    createdAt: new Date('2026-10-21'),
    updatedAt: new Date('2026-10-21'),
  };

  beforeEach(async () => {
    const mockRepositoryProvider = {
      provide: PackagesRepository,
      useValue: {
        create: vi.fn(),
        findAll: vi.fn(),
        findById: vi.fn(),
        findByResidentId: vi.fn(),
        findPending: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        incrementNotificationAttempts: vi.fn(),
        confirmNotification: vi.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [PackagesService, mockRepositoryProvider],
    }).compile();

    service = module.get<PackagesService>(PackagesService);
    repository = module.get(PackagesRepository);
  });

  describe('create', () => {
    it('should create a package', async () => {
      const createDto: CreatePackageDto = {
        residentId: '507f1f77bcf86cd799439012',
        carrier: 'Sedex',
        trackingNumber: 'AA123456789BR',
      };

      repository.create.mockResolvedValue(mockPackage as any);

      const result = await service.create(createDto);

      expect(result).toEqual(mockPackage);
      expect(repository.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return array of packages', async () => {
      const packages = [mockPackage];
      repository.findAll.mockResolvedValue(packages as any);

      const result = await service.findAll(0, 10);

      expect(result).toEqual(packages);
      expect(repository.findAll).toHaveBeenCalledWith(0, 10);
    });

    it('should apply default pagination', async () => {
      repository.findAll.mockResolvedValue([]);

      await service.findAll();

      expect(repository.findAll).toHaveBeenCalledWith(0, 10);
    });
  });

  describe('findById', () => {
    it('should return a package by id', async () => {
      repository.findById.mockResolvedValue(mockPackage as any);

      const result = await service.findById('507f1f77bcf86cd799439011');

      expect(result).toEqual(mockPackage);
      expect(repository.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    });

    it('should return null if package not found', async () => {
      repository.findById.mockResolvedValue(null);

      const result = await service.findById('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('findByResidentId', () => {
    it('should return packages for resident', async () => {
      const packages = [mockPackage];
      repository.findByResidentId.mockResolvedValue(packages as any);

      const result = await service.findByResidentId('507f1f77bcf86cd799439012');

      expect(result).toEqual(packages);
      expect(repository.findByResidentId).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439012',
        0,
        10,
      );
    });
  });

  describe('findPending', () => {
    it('should return pending packages older than specified days', async () => {
      const pending = [mockPackage];
      repository.findPending.mockResolvedValue(pending as any);

      const result = await service.findPending(7);

      expect(result).toEqual(pending);
      expect(repository.findPending).toHaveBeenCalledWith(7);
    });

    it('should use default 7 days', async () => {
      repository.findPending.mockResolvedValue([]);

      await service.findPending();

      expect(repository.findPending).toHaveBeenCalledWith(7);
    });
  });

  describe('update', () => {
    it('should update a package', async () => {
      const updateDto: UpdatePackageDto = {
        carrier: 'Correios',
      };
      const updated = { ...mockPackage, carrier: 'Correios' };
      repository.update.mockResolvedValue(updated as any);

      const result = await service.update('507f1f77bcf86cd799439011', updateDto);

      expect(result).toEqual(updated);
      expect(repository.update).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateDto,
      );
    });
  });

  describe('markAsPickedUp', () => {
    it('should mark package as picked up', async () => {
      const pickedUp = { ...mockPackage, status: PackageStatus.PICKED_UP };
      repository.update.mockResolvedValue(pickedUp as any);

      const result = await service.markAsPickedUp('507f1f77bcf86cd799439011');

      expect(result).toEqual(pickedUp);
      expect(repository.update).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        { status: PackageStatus.PICKED_UP },
      );
    });
  });

  describe('delete', () => {
    it('should soft delete a package', async () => {
      const deleted = { ...mockPackage, deletedAt: new Date() };
      repository.delete.mockResolvedValue(deleted as any);

      const result = await service.delete('507f1f77bcf86cd799439011');

      expect(result).toEqual(deleted);
      expect(repository.delete).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    });
  });

  describe('incrementNotificationAttempts', () => {
    it('should increment notification attempts', async () => {
      await service.incrementNotificationAttempts('507f1f77bcf86cd799439011');

      expect(repository.incrementNotificationAttempts).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
    });
  });

  describe('confirmNotification', () => {
    it('should confirm notification', async () => {
      const confirmed = {
        ...mockPackage,
        notificationConfirmedAt: new Date(),
      };
      repository.confirmNotification.mockResolvedValue(confirmed as any);

      const result = await service.confirmNotification('507f1f77bcf86cd799439011');

      expect(result).toEqual(confirmed);
      expect(repository.confirmNotification).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
    });
  });

  describe('getWhatsAppLink', () => {
    it('should generate WhatsApp link', async () => {
      repository.findById.mockResolvedValue(mockPackage as any);

      const link = await service.getWhatsAppLink(
        '507f1f77bcf86cd799439011',
        '5511999999999',
      );

      expect(link).toContain('https://wa.me/5511999999999');
      expect(link).toContain('Sua%20encomenda');
      expect(link).toContain('Sedex');
    });

    it('should return null if package not found', async () => {
      repository.findById.mockResolvedValue(null);

      const link = await service.getWhatsAppLink(
        'nonexistent',
        '5511999999999',
      );

      expect(link).toBeNull();
    });
  });
});
