import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ManagersService } from './managers.service';
import { BadRequestException } from '@nestjs/common';

describe('ManagersService', () => {
  let managersService: ManagersService;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      checkEmailExists: vi.fn().mockResolvedValue(false),
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByEmail: vi.fn(),
      update: vi.fn(),
      softDelete: vi.fn(),
    };

    managersService = new ManagersService(mockRepository);
  });

  describe('create', () => {
    it('should create a manager successfully', async () => {
      const createDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'MANAGER',
      };

      const mockManager = {
        _id: '123',
        ...createDto,
        toObject: () => ({
          _id: '123',
          ...createDto,
        }),
      };

      mockRepository.create.mockResolvedValue(mockManager);

      const result = await managersService.create(createDto);

      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('email');
      expect(result).not.toHaveProperty('password');
      expect(mockRepository.checkEmailExists).toHaveBeenCalled();
    });

    it('should throw when email already exists', async () => {
      mockRepository.checkEmailExists.mockResolvedValue(true);

      await expect(
        managersService.create({
          name: 'John',
          email: 'existing@example.com',
          password: 'pass',
          role: 'MANAGER',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findById', () => {
    it('should find a manager by id', async () => {
      const mockManager = {
        _id: '123',
        name: 'John',
        email: 'john@example.com',
        password: 'hashed',
        role: 'MANAGER',
        toObject: () => ({
          _id: '123',
          name: 'John',
          email: 'john@example.com',
          password: 'hashed',
          role: 'MANAGER',
        }),
      };

      mockRepository.findById.mockResolvedValue(mockManager);

      const result = await managersService.findById('123');

      expect(result.name).toBe('John');
      expect(result).not.toHaveProperty('password');
    });

    it('should throw when manager not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(managersService.findById('invalid')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all managers', async () => {
      const mockManagers = [
        {
          _id: '1',
          name: 'John',
          email: 'john@example.com',
          toObject: () => ({ _id: '1', name: 'John', email: 'john@example.com' }),
        },
        {
          _id: '2',
          name: 'Jane',
          email: 'jane@example.com',
          toObject: () => ({ _id: '2', name: 'Jane', email: 'jane@example.com' }),
        },
      ];

      mockRepository.findAll.mockResolvedValue(mockManagers);

      const result = await managersService.findAll(0, 10);

      expect(result).toHaveLength(2);
      expect(mockRepository.findAll).toHaveBeenCalledWith(0, 10);
    });
  });

  describe('findByEmail', () => {
    it('should find manager by email', async () => {
      const mockManager = {
        _id: '123',
        email: 'test@example.com',
      };

      mockRepository.findByEmail.mockResolvedValue(mockManager);

      const result = await managersService.findByEmail('TEST@EXAMPLE.COM');

      expect(mockRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    });
  });

  describe('update', () => {
    it('should update a manager', async () => {
      const mockManager = {
        _id: '123',
        name: 'John',
        email: 'john@example.com',
      };

      const updatedManager = {
        _id: '123',
        name: 'Jane',
        email: 'jane@example.com',
        toObject: () => ({
          _id: '123',
          name: 'Jane',
          email: 'jane@example.com',
        }),
      };

      mockRepository.findById.mockResolvedValue(mockManager);
      mockRepository.checkEmailExists.mockResolvedValue(false);
      mockRepository.update.mockResolvedValue(updatedManager);

      const result = await managersService.update('123', {
        name: 'Jane',
        email: 'jane@example.com',
      });

      expect(result.name).toBe('Jane');
    });

    it('should throw when trying to update with existing email', async () => {
      const mockManager = {
        _id: '123',
        name: 'John',
        email: 'john@example.com',
      };

      mockRepository.findById.mockResolvedValue(mockManager);
      mockRepository.checkEmailExists.mockResolvedValue(true);

      await expect(
        managersService.update('123', { email: 'other@example.com' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should allow updating same email', async () => {
      const mockManager = {
        _id: '123',
        name: 'John',
        email: 'john@example.com',
      };

      const updatedManager = {
        _id: '123',
        name: 'John Updated',
        email: 'john@example.com',
        toObject: () => ({
          _id: '123',
          name: 'John Updated',
          email: 'john@example.com',
        }),
      };

      mockRepository.findById.mockResolvedValue(mockManager);
      mockRepository.checkEmailExists.mockResolvedValue(true);
      mockRepository.update.mockResolvedValue(updatedManager);

      const result = await managersService.update('123', {
        name: 'John Updated',
        email: 'john@example.com',
      });

      expect(result.email).toBe('john@example.com');
    });

    it('should throw when manager not found on update', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(
        managersService.update('invalid', { name: 'Test' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw when update fails', async () => {
      const mockManager = {
        _id: '123',
        email: 'john@example.com',
      };

      mockRepository.findById.mockResolvedValue(mockManager);
      mockRepository.checkEmailExists.mockResolvedValue(false);
      mockRepository.update.mockResolvedValue(null);

      await expect(
        managersService.update('123', { name: 'New Name' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('softDelete', () => {
    it('should soft delete a manager', async () => {
      mockRepository.findById.mockResolvedValue({ _id: '123' });
      mockRepository.softDelete.mockResolvedValue(null);

      const result = await managersService.softDelete('123');

      expect(result.message).toBe('Manager deletado com sucesso');
      expect(mockRepository.softDelete).toHaveBeenCalledWith('123');
    });

    it('should throw when manager not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(managersService.softDelete('invalid')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('validatePassword', () => {
    it('should validate password', async () => {
      const mockManager = {
        password: '$2a$10$mock',
      };

      const result = await managersService.validatePassword(
        mockManager,
        'password',
      );

      expect(typeof result).toBe('boolean');
    });
  });

  describe('update with password', () => {
    it('should update manager with new password', async () => {
      const mockManager = {
        _id: '123',
        name: 'John',
        email: 'john@example.com',
      };

      const updatedManager = {
        _id: '123',
        name: 'John',
        email: 'john@example.com',
        password: 'hashed_new_password',
        toObject: () => ({
          _id: '123',
          name: 'John',
          email: 'john@example.com',
        }),
      };

      mockRepository.findById.mockResolvedValue(mockManager);
      mockRepository.checkEmailExists.mockResolvedValue(false);
      mockRepository.update.mockResolvedValue(updatedManager);

      const result = await managersService.update('123', {
        password: 'newpassword',
      });

      expect(result).toBeDefined();
    });
  });
});
