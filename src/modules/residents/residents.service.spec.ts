import { Test, TestingModule } from '@nestjs/testing';
import { ResidentsService } from './residents.service';
import { ResidentsRepository } from './residents.repository';
import { CreateResidentDto } from './dtos/create-resident.dto';
import { UpdateResidentDto } from './dtos/update-resident.dto';

describe('ResidentsService', () => {
  let service: ResidentsService;
  let repository: jest.Mocked<ResidentsRepository>;

  const mockResident = {
    _id: '507f1f77bcf86cd799439012',
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '11999999999',
    cpf: '12345678901',
    address: 'Rua A, 123',
    apartment: '201',
    propertyId: '507f1f77bcf86cd799439010',
    moveInDate: new Date('2026-01-01'),
    moveOutDate: null,
    isActive: true,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockRepositoryProvider = {
      provide: ResidentsRepository,
      useValue: {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        findByEmail: jest.fn(),
        findByPropertyId: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ResidentsService, mockRepositoryProvider],
    }).compile();

    service = module.get<ResidentsService>(ResidentsService);
    repository = module.get(ResidentsRepository) as jest.Mocked<ResidentsRepository>;
  });

  describe('create', () => {
    it('should create a resident', async () => {
      const createDto: CreateResidentDto = {
        name: 'João Silva',
        email: 'joao@example.com',
        phone: '11999999999',
        address: 'Rua A, 123',
        propertyId: '507f1f77bcf86cd799439010',
        moveInDate: '2026-01-01',
      };

      repository.create.mockResolvedValue(mockResident as any);

      const result = await service.create(createDto);

      expect(result).toEqual(mockResident);
      expect(repository.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return array of residents', async () => {
      const residents = [mockResident];
      repository.findAll.mockResolvedValue(residents as any);

      const result = await service.findAll(0, 10);

      expect(result).toEqual(residents);
      expect(repository.findAll).toHaveBeenCalledWith(0, 10);
    });

    it('should apply default pagination', async () => {
      repository.findAll.mockResolvedValue([]);

      await service.findAll();

      expect(repository.findAll).toHaveBeenCalledWith(0, 10);
    });
  });

  describe('findById', () => {
    it('should return a resident by id', async () => {
      repository.findById.mockResolvedValue(mockResident as any);

      const result = await service.findById('507f1f77bcf86cd799439012');

      expect(result).toEqual(mockResident);
    });

    it('should return null if not found', async () => {
      repository.findById.mockResolvedValue(null);

      const result = await service.findById('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return a resident by email', async () => {
      repository.findByEmail.mockResolvedValue(mockResident as any);

      const result = await service.findByEmail('joao@example.com');

      expect(result).toEqual(mockResident);
      expect(repository.findByEmail).toHaveBeenCalledWith('joao@example.com');
    });
  });

  describe('findByPropertyId', () => {
    it('should return residents for property', async () => {
      const residents = [mockResident];
      repository.findByPropertyId.mockResolvedValue(residents as any);

      const result = await service.findByPropertyId('507f1f77bcf86cd799439010');

      expect(result).toEqual(residents);
      expect(repository.findByPropertyId).toHaveBeenCalledWith('507f1f77bcf86cd799439010');
    });
  });

  describe('update', () => {
    it('should update a resident', async () => {
      const updateDto: UpdateResidentDto = { phone: '11988888888' };
      const updated = { ...mockResident, phone: '11988888888' };

      repository.update.mockResolvedValue(updated as any);

      const result = await service.update('507f1f77bcf86cd799439012', updateDto);

      expect(result).toEqual(updated);
      expect(repository.update).toHaveBeenCalledWith('507f1f77bcf86cd799439012', updateDto);
    });
  });

  describe('delete', () => {
    it('should soft delete a resident', async () => {
      const deleted = { ...mockResident, deletedAt: new Date() };
      repository.delete.mockResolvedValue(deleted as any);

      const result = await service.delete('507f1f77bcf86cd799439012');

      expect(result).toEqual(deleted);
    });
  });
});
