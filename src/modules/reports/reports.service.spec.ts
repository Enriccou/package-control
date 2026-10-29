import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ReportsService } from './reports.service';
import { Package } from '../packages/schemas/package.schema';
import { PackageStatus } from '../packages/schemas/package.schema';

describe('ReportsService', () => {
  let service: ReportsService;
  let mockPackageModel: any;

  const mockPackage = {
    _id: '507f1f77bcf86cd799439011',
    carrier: 'Sedex',
    status: PackageStatus.PENDING,
    receivedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    notificationFailed: true,
    lastNotificationAt: new Date(),
    residentId: {
      _id: '507f1f77bcf86cd799439012',
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '11999999999',
      apartment: '201',
    },
  };

  beforeEach(async () => {
    mockPackageModel = {
      find: jest.fn(),
      countDocuments: jest.fn(),
      aggregate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getModelToken(Package.name),
          useValue: mockPackageModel,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  describe('getPendingPackages', () => {
    it('should return pending packages older than specified days', async () => {
      const query = {
        sort: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([mockPackage]),
      };

      mockPackageModel.find.mockReturnValue(query);

      const result = await service.getPendingPackages(7);

      expect(result.count).toBe(1);
      expect(result.days).toBe(7);
      expect(result.packages).toEqual([mockPackage]);
      expect(mockPackageModel.find).toHaveBeenCalledWith({
        status: 'pending',
        receivedAt: expect.any(Object),
        deletedAt: null,
      });
    });

    it('should use default 7 days', async () => {
      const query = {
        sort: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([]),
      };

      mockPackageModel.find.mockReturnValue(query);

      await service.getPendingPackages();

      expect(mockPackageModel.find).toHaveBeenCalled();
    });
  });

  describe('getFailedNotifications', () => {
    it('should return failed notifications with pagination', async () => {
      const query = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([mockPackage]),
      };

      mockPackageModel.find.mockReturnValue(query);
      mockPackageModel.countDocuments.mockResolvedValue(15);

      const result = await service.getFailedNotifications(0, 10);

      expect(result.total).toBe(15);
      expect(result.count).toBe(1);
      expect(result.skip).toBe(0);
      expect(result.limit).toBe(10);
      expect(result.packages).toEqual([mockPackage]);
    });
  });

  describe('getStatistics', () => {
    it('should return package statistics', async () => {
      mockPackageModel.countDocuments
        .mockResolvedValueOnce(42) // total
        .mockResolvedValueOnce(5) // pending
        .mockResolvedValueOnce(35); // picked up

      mockPackageModel.aggregate.mockReturnValue({
        exec: jest.fn().mockResolvedValue([
          { _id: 'pending', count: 5 },
          { _id: 'picked_up', count: 35 },
        ]),
      });

      const result = await service.getStatistics();

      expect(result.totalPackages).toBe(42);
      expect(result.pendingCount).toBe(5);
      expect(result.pickedUpCount).toBe(35);
      expect(result.byStatus).toHaveLength(2);
    });
  });
});
