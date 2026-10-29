import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let service: ReportsService;
  let mockModel: any;

  beforeEach(() => {
    mockModel = {
      find: vi.fn().mockReturnValue({
        sort: vi.fn().mockReturnValue({
          populate: vi.fn().mockReturnValue({
            exec: vi.fn().mockResolvedValue([]),
          }),
        }),
      }),
      countDocuments: vi.fn().mockResolvedValue(0),
      aggregate: vi.fn().mockReturnValue({
        exec: vi.fn().mockResolvedValue([]),
      }),
    };

    service = new ReportsService(mockModel);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get pending packages', async () => {
    const result = await service.getPendingPackages(7);
    expect(result).toBeDefined();
    expect(result.days).toBe(7);
  });

  it('should get pending packages with custom days', async () => {
    const result = await service.getPendingPackages(14);
    expect(result.days).toBe(14);
  });

  it('should get failed notifications', async () => {
    const result = await service.getFailedNotifications(0, 10);
    expect(result).toBeDefined();
    expect(result.skip).toBe(0);
    expect(result.limit).toBe(10);
  });

  it('should get statistics', async () => {
    mockModel.countDocuments
      .mockResolvedValueOnce(42) // total
      .mockResolvedValueOnce(5) // pending
      .mockResolvedValueOnce(35); // picked up

    const result = await service.getStatistics();
    expect(result).toBeDefined();
    expect(result.totalPackages).toBe(42);
    expect(result.pendingCount).toBe(5);
    expect(result.pickedUpCount).toBe(35);
  });
});
