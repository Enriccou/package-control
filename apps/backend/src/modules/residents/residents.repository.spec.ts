import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ResidentsRepository } from './residents.repository';

describe('ResidentsRepository', () => {
  let repository: ResidentsRepository;
  let mockModel: any;

  beforeEach(() => {
    mockModel = {
      findOne: vi.fn(),
      find: vi.fn(),
      findByIdAndUpdate: vi.fn(),
    };

    repository = new ResidentsRepository(mockModel);
  });

  describe('findAll', () => {
    it('should find all residents with default pagination', async () => {
      const mockQuery = {
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([
          { _id: '1', name: 'John' },
          { _id: '2', name: 'Jane' },
        ]),
      };

      mockModel.find.mockReturnValue(mockQuery);

      const result = await repository.findAll();

      expect(result).toHaveLength(2);
      expect(mockModel.find).toHaveBeenCalledWith({ deletedAt: null });
      expect(mockQuery.skip).toHaveBeenCalledWith(0);
      expect(mockQuery.limit).toHaveBeenCalledWith(10);
    });

    it('should find all residents with custom pagination', async () => {
      const mockQuery = {
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([]),
      };

      mockModel.find.mockReturnValue(mockQuery);

      await repository.findAll(5, 20);

      expect(mockQuery.skip).toHaveBeenCalledWith(5);
      expect(mockQuery.limit).toHaveBeenCalledWith(20);
    });
  });

  describe('findById', () => {
    it('should find resident by id', async () => {
      const mockQuery = {
        exec: vi.fn().mockResolvedValue({
          _id: '123',
          name: 'John',
        }),
      };

      mockModel.findOne.mockReturnValue(mockQuery);

      const result = await repository.findById('123');

      expect(result).toBeDefined();
      expect(mockModel.findOne).toHaveBeenCalledWith({
        _id: '123',
        deletedAt: null,
      });
    });

    it('should return null when resident not found', async () => {
      const mockQuery = {
        exec: vi.fn().mockResolvedValue(null),
      };

      mockModel.findOne.mockReturnValue(mockQuery);

      const result = await repository.findById('invalid');

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should find resident by email', async () => {
      const mockQuery = {
        exec: vi.fn().mockResolvedValue({
          _id: '123',
          email: 'john@example.com',
        }),
      };

      mockModel.findOne.mockReturnValue(mockQuery);

      const result = await repository.findByEmail('JOHN@EXAMPLE.COM');

      expect(result).toBeDefined();
      expect(mockModel.findOne).toHaveBeenCalledWith({
        email: 'john@example.com',
        deletedAt: null,
      });
    });

    it('should return null when email not found', async () => {
      const mockQuery = {
        exec: vi.fn().mockResolvedValue(null),
      };

      mockModel.findOne.mockReturnValue(mockQuery);

      const result = await repository.findByEmail('notfound@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findByPropertyId', () => {
    it('should find residents by property id', async () => {
      const mockQuery = {
        sort: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([
          { _id: '1', propertyId: 'prop-123' },
          { _id: '2', propertyId: 'prop-123' },
        ]),
      };

      mockModel.find.mockReturnValue(mockQuery);

      const result = await repository.findByPropertyId('prop-123');

      expect(result).toHaveLength(2);
      expect(mockModel.find).toHaveBeenCalledWith({
        propertyId: 'prop-123',
        deletedAt: null,
      });
    });

    it('should return empty array when no residents found', async () => {
      const mockQuery = {
        sort: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([]),
      };

      mockModel.find.mockReturnValue(mockQuery);

      const result = await repository.findByPropertyId('invalid-prop');

      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a resident', async () => {
      const mockQuery = {
        exec: vi.fn().mockResolvedValue({
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

    it('should return null when resident not found on update', async () => {
      const mockQuery = {
        exec: vi.fn().mockResolvedValue(null),
      };

      mockModel.findByIdAndUpdate.mockReturnValue(mockQuery);

      const result = await repository.update('invalid', { name: 'Jane' });

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should soft delete a resident', async () => {
      const mockQuery = {
        exec: vi.fn().mockResolvedValue({
          _id: '123',
          deletedAt: new Date(),
        }),
      };

      mockModel.findByIdAndUpdate.mockReturnValue(mockQuery);

      const result = await repository.delete('123');

      expect(result).toBeDefined();
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalled();
    });

    it('should return null when resident not found on delete', async () => {
      const mockQuery = {
        exec: vi.fn().mockResolvedValue(null),
      };

      mockModel.findByIdAndUpdate.mockReturnValue(mockQuery);

      const result = await repository.delete('invalid');

      expect(result).toBeNull();
    });
  });
});
