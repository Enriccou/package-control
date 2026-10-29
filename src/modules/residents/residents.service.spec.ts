import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ResidentsService } from './residents.service';

describe('ResidentsService', () => {
  let residentsService: ResidentsService;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      findByEmail: vi.fn(),
      findByPropertyId: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    residentsService = new ResidentsService(mockRepository);
  });

  describe('create', () => {
    it('should create a resident', async () => {
      const createDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        propertyId: 'prop-123',
      };

      const mockResident = {
        _id: '123',
        ...createDto,
      };

      mockRepository.create.mockResolvedValue(mockResident);

      const result = await residentsService.create(createDto);

      expect(result._id).toBe('123');
      expect(result.name).toBe('John Doe');
      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return all residents with default pagination', async () => {
      const mockResidents = [
        { _id: '1', name: 'John', email: 'john@example.com' },
        { _id: '2', name: 'Jane', email: 'jane@example.com' },
      ];

      mockRepository.findAll.mockResolvedValue(mockResidents);

      const result = await residentsService.findAll();

      expect(result).toHaveLength(2);
      expect(mockRepository.findAll).toHaveBeenCalledWith(0, 10);
    });

    it('should return residents with custom pagination', async () => {
      const mockResidents = [{ _id: '1', name: 'John' }];

      mockRepository.findAll.mockResolvedValue(mockResidents);

      const result = await residentsService.findAll(5, 20);

      expect(mockRepository.findAll).toHaveBeenCalledWith(5, 20);
    });
  });

  describe('findById', () => {
    it('should find resident by id', async () => {
      const mockResident = {
        _id: '123',
        name: 'John',
        email: 'john@example.com',
      };

      mockRepository.findById.mockResolvedValue(mockResident);

      const result = await residentsService.findById('123');

      expect(result.name).toBe('John');
      expect(mockRepository.findById).toHaveBeenCalledWith('123');
    });

    it('should return null when resident not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      const result = await residentsService.findById('invalid');

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should find resident by email', async () => {
      const mockResident = {
        _id: '123',
        email: 'test@example.com',
        name: 'Test User',
      };

      mockRepository.findByEmail.mockResolvedValue(mockResident);

      const result = await residentsService.findByEmail('test@example.com');

      expect(result.email).toBe('test@example.com');
      expect(mockRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    });
  });

  describe('findByPropertyId', () => {
    it('should find residents by property id', async () => {
      const mockResidents = [
        { _id: '1', name: 'John', propertyId: 'prop-123' },
        { _id: '2', name: 'Jane', propertyId: 'prop-123' },
      ];

      mockRepository.findByPropertyId.mockResolvedValue(mockResidents);

      const result = await residentsService.findByPropertyId('prop-123');

      expect(result).toHaveLength(2);
      expect(mockRepository.findByPropertyId).toHaveBeenCalledWith('prop-123');
    });
  });

  describe('update', () => {
    it('should update a resident', async () => {
      const updateDto = { name: 'Jane Doe' };
      const mockResident = {
        _id: '123',
        name: 'Jane Doe',
        email: 'jane@example.com',
      };

      mockRepository.update.mockResolvedValue(mockResident);

      const result = await residentsService.update('123', updateDto);

      expect(result.name).toBe('Jane Doe');
      expect(mockRepository.update).toHaveBeenCalledWith('123', updateDto);
    });
  });

  describe('delete', () => {
    it('should delete a resident', async () => {
      const mockResident = { _id: '123', name: 'John' };

      mockRepository.delete.mockResolvedValue(mockResident);

      const result = await residentsService.delete('123');

      expect(result._id).toBe('123');
      expect(mockRepository.delete).toHaveBeenCalledWith('123');
    });

    it('should return null when resident not found', async () => {
      mockRepository.delete.mockResolvedValue(null);

      const result = await residentsService.delete('invalid');

      expect(result).toBeNull();
    });
  });
});
