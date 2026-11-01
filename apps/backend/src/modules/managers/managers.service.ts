import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { ManagersRepository } from './managers.repository.js';
import { CreateManagerDto } from './dtos/create-manager.dto.js';
import { UpdateManagerDto } from './dtos/update-manager.dto.js';

@Injectable()
export class ManagersService {
  constructor(private managersRepository: ManagersRepository) {}

  async create(createManagerDto: CreateManagerDto) {
    const emailExists = await this.managersRepository.checkEmailExists(
      createManagerDto.email,
    );

    if (emailExists) {
      throw new BadRequestException('Email já está registrado');
    }

    const hashedPassword = await bcrypt.hash(createManagerDto.password, 10);

    const manager = await this.managersRepository.create({
      ...createManagerDto,
      email: createManagerDto.email.toLowerCase(),
      password: hashedPassword,
    });

    return this.sanitizeManager((manager as any).toObject());
  }

  async findById(id: string) {
    const manager = await this.managersRepository.findById(id);

    if (!manager) {
      throw new BadRequestException('Manager não encontrado');
    }

    return this.sanitizeManager((manager as any).toObject());
  }

  async findAll(skip: number, limit: number) {
    const managers = await this.managersRepository.findAll(skip, limit);
    return managers.map(m => this.sanitizeManager((m as any).toObject()));
  }

  async findByEmail(email: string) {
    return this.managersRepository.findByEmail(email.toLowerCase());
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const manager = await this.managersRepository.findById(id);

    if (!manager) {
      throw new BadRequestException('Manager não encontrado');
    }

    const updateData = { ...updateManagerDto };

    if (updateManagerDto.email) {
      const emailExists = await this.managersRepository.checkEmailExists(
        updateManagerDto.email,
      );

      if (emailExists && manager.email !== updateManagerDto.email) {
        throw new BadRequestException('Email já está registrado');
      }

      updateData['email'] = updateManagerDto.email.toLowerCase();
    }

    if (updateManagerDto.password) {
      updateData['password'] = await bcrypt.hash(updateManagerDto.password, 10);
    }

    const updatedManager = await this.managersRepository.update(id, updateData);

    if (!updatedManager) {
      throw new BadRequestException('Manager não encontrado');
    }

    return this.sanitizeManager((updatedManager as any).toObject());
  }

  async softDelete(id: string) {
    const manager = await this.managersRepository.findById(id);

    if (!manager) {
      throw new BadRequestException('Manager não encontrado');
    }

    await this.managersRepository.softDelete(id);
    return { message: 'Manager deletado com sucesso' };
  }

  async validatePassword(manager: any, password: string): Promise<boolean> {
    return bcrypt.compare(password, manager.password);
  }

  private sanitizeManager(manager: any) {
    const { password, deletedAt, ...rest } = manager;
    return rest;
  }
}
