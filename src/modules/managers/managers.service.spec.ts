import { Test, TestingModule } from '@nestjs/testing';
import { ManagersService } from './managers.service';
import { ManagersRepository } from './managers.repository';
import { CreateManagerDto } from './dtos/create-manager.dto';
import { UpdateManagerDto } from './dtos/update-manager.dto';

describe('ManagersService', () => {
  let service: ManagersService;
  let repository: jest.Mocked<ManagersRepository>;

  const mockManager = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2b$10$hashedpassword',
    role: 'ADMIN',
    isActive: true,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockRepositoryProvider = {
      provide: ManagersRepository,
      useValue: {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        findByEmail: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagersService, mockRepositoryProvider],
    }).compile();

    service = module.get<ManagersService>(ManagersService);
    repository = module.get(ManagersRepository) as jest.Mocked<ManagersRepository>;
  });

  describe('create', () => {
    it('should create a manager', async () => {
      const createDto: CreateManagerDto = {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Secure@123',
      };

      repository.create.mockResolvedValue(mockManager as any);

      const result = await service.create(createDto);

      expect(result).toEqual(mockManager);
      expect(repository.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return array of managers', async () => {
      const managers = [mockManager];
      repository.findAll.mockResolvedValue(managers as any);

      const result = await service.findAll(0, 10);

      expect(result).toEqual(managers);
      expect(repository.findAll).toHaveBeenCalledWith(0, 10);
    });
  });

  describe('findById', () => {
    it('should return a manager by id', async () => {
      repository.findById.mockResolvedValue(mockManager as any);

      const result = await service.findById('507f1f77bcf86cd799439011');

      expect(result).toEqual(mockManager);
    });

    it('should return null if not found', async () => {
      repository.findById.mockResolvedValue(null);

      const result = await service.findById('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return a manager by email', async () => {
      repository.findByEmail.mockResolvedValue(mockManager as any);

      const result = await service.findByEmail('admin@example.com');

      expect(result).toEqual(mockManager);
      expect(repository.findByEmail).toHaveBeenCalledWith('admin@example.com');
    });
  });

  describe('update', () => {
    it('should update a manager', async () => {
      const updateDto: UpdateManagerDto = { name: 'Updated Name' };
      const updated = { ...mockManager, name: 'Updated Name' };

      repository.update.mockResolvedValue(updated as any);

      const result = await service.update('507f1f77bcf86cd799439011', updateDto);

      expect(result).toEqual(updated);
      expect(repository.update).toHaveBeenCalledWith('507f1f77bcf86cd799439011', updateDto);
    });
  });

  describe('delete', () => {
    it('should soft delete a manager', async () => {
      const deleted = { ...mockManager, deletedAt: new Date() };
      repository.delete.mockResolvedValue(deleted as any);

      const result = await service.delete('507f1f77bcf86cd799439011');

      expect(result).toEqual(deleted);
    });
  });
});
