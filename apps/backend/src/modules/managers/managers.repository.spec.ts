import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ManagersRepository } from './managers.repository';

describe('ManagersRepository', () => {
  let repository: ManagersRepository;
  let mockModel: any;

  beforeEach(() => {
    mockModel = {
      findById: vi.fn(),
      findOne: vi.fn(),
      find: vi.fn(),
      findByIdAndUpdate: vi.fn(),
      countDocuments: vi.fn(),
    };

    repository = new ManagersRepository(mockModel);
  });

  describe('findById', () => {
    it('should find manager by id', async () => {
      const mockQuery = {
        where: vi.fn().mockReturnThis(),
        equals: vi.fn().mockResolvedValue({
          _id: '123',
          name: 'John',
          deletedAt: null,
        }),
      };

      mockModel.findById.mockReturnValue(mockQuery);

      const result = await repository.findById('123');

      expect(result).toBeDefined();
      expect(mockModel.findById).toHaveBeenCalledWith('123');
    });

    it('should return null when manager not found', async () => {
      const mockQuery = {
        where: vi.fn().mockReturnThis(),
        equals: vi.fn().mockResolvedValue(null),
      };

      mockModel.findById.mockReturnValue(mockQuery);

      const result = await repository.findById('invalid');

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should find manager by email', async () => {
      const mockQuery = {
        where: vi.fn().mockReturnThis(),
        equals: vi.fn().mockResolvedValue({
          _id: '123',
          email: 'john@example.com',
        }),
      };

      mockModel.findOne.mockReturnValue(mockQuery);

      const result = await repository.findByEmail('JOHN@EXAMPLE.COM');

      expect(result).toBeDefined();
      expect(mockModel.findOne).toHaveBeenCalledWith({
        email: 'john@example.com',
      });
    });
  });

  describe('findAll', () => {
    it('should find all managers with pagination', async () => {
      const mockQuery = {
        where: vi.fn().mockReturnThis(),
        equals: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        sort: vi.fn().mockResolvedValue([
          { _id: '1', name: 'John' },
          { _id: '2', name: 'Jane' },
        ]),
      };

      mockModel.find.mockReturnValue(mockQuery);

      const result = await repository.findAll(0, 10);

      expect(result).toBeDefined();
      expect(mockModel.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a manager', async () => {
      const mockQuery = {
        where: vi.fn().mockReturnThis(),
        equals: vi.fn().mockResolvedValue({
          _id: '123',
          name: 'Jane',
        }),
      };

      mockModel.findByIdAndUpdate.mockReturnValue(mockQuery);

      const result = await repository.update('123', { name: 'Jane' });

      expect(result).toBeDefined();
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '123',
        { name: 'Jane' },
        { new: true },
      );
    });
  });

  describe('softDelete', () => {
    it('should soft delete a manager', async () => {
      const mockResult = {
        _id: '123',
        deletedAt: new Date(),
      };

      mockModel.findByIdAndUpdate.mockResolvedValue(mockResult);

      const result = await repository.softDelete('123');

      expect(result).toBeDefined();
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalled();
    });
  });

  describe('checkEmailExists', () => {
    it('should return true if email exists', async () => {
      mockModel.countDocuments.mockResolvedValue(1);

      const result = await repository.checkEmailExists('john@example.com');

      expect(result).toBe(true);
      expect(mockModel.countDocuments).toHaveBeenCalledWith({
        email: 'john@example.com',
        deletedAt: null,
      });
    });

    it('should return false if email does not exist', async () => {
      mockModel.countDocuments.mockResolvedValue(0);

      const result = await repository.checkEmailExists('notfound@example.com');

      expect(result).toBe(false);
    });
  });
});
