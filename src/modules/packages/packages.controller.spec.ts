import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { PackagesController } from './packages.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dtos/create-package.dto';
import { PackageStatus } from './schemas/package.schema';

describe('PackagesController', () => {
  let controller: PackagesController;
  let commandBus: any;
  let queryBus: any;
  let service: any;

  const mockPackage = {
    _id: '507f1f77bcf86cd799439011',
    residentId: '507f1f77bcf86cd799439012',
    carrier: 'Sedex',
    trackingNumber: 'AA123456789BR',
    status: PackageStatus.RECEIVED,
    receivedAt: new Date(),
    notificationAttempts: 0,
    notificationFailed: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackagesController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: vi.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: vi.fn(),
          },
        },
        {
          provide: PackagesService,
          useValue: {
            getWhatsAppLink: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PackagesController>(PackagesController);
    commandBus = module.get(CommandBus);
    queryBus = module.get(QueryBus);
    service = module.get(PackagesService);
  });

  describe('create', () => {
    it('should create a package', async () => {
      const createDto: CreatePackageDto = {
        residentId: '507f1f77bcf86cd799439012',
        carrier: 'Sedex',
      };

      commandBus.execute.mockResolvedValue(mockPackage);

      const result = await controller.create(createDto);

      expect(result).toEqual(mockPackage);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should list packages with pagination', async () => {
      queryBus.execute.mockResolvedValue([mockPackage]);

      const result = await controller.findAll(0, 10);

      expect(result).toEqual([mockPackage]);
      expect(queryBus.execute).toHaveBeenCalled();
    });
  });

  describe('findByResident', () => {
    it('should find packages by resident', async () => {
      queryBus.execute.mockResolvedValue([mockPackage]);

      const result = await controller.findByResident('507f1f77bcf86cd799439012');

      expect(result).toEqual([mockPackage]);
      expect(queryBus.execute).toHaveBeenCalled();
    });
  });

  describe('getWhatsAppLink', () => {
    it('should return WhatsApp link', async () => {
      const link = 'https://wa.me/5511999999999?text=...';
      service.getWhatsAppLink.mockResolvedValue(link);

      const result = await controller.getWhatsAppLink(
        '507f1f77bcf86cd799439011',
        '5511999999999',
      );

      expect(result).toEqual({ url: link });
    });
  });

  describe('markAsPickedUp', () => {
    it('should mark as picked up', async () => {
      const pickedUp = { ...mockPackage, status: PackageStatus.PICKED_UP };
      commandBus.execute.mockResolvedValue(pickedUp);

      const result = await controller.markAsPickedUp('507f1f77bcf86cd799439011');

      expect(result).toEqual(pickedUp);
    });
  });

  describe('confirmNotification', () => {
    it('should confirm notification', async () => {
      const confirmed = {
        ...mockPackage,
        notificationConfirmedAt: new Date(),
      };
      commandBus.execute.mockResolvedValue(confirmed);

      const result = await controller.confirmNotification(
        '507f1f77bcf86cd799439011',
      );

      expect(result).toEqual(confirmed);
    });
  });
});
