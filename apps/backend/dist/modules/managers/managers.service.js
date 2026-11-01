var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { ManagersRepository } from './managers.repository.js';
let ManagersService = class ManagersService {
    managersRepository;
    constructor(managersRepository) {
        this.managersRepository = managersRepository;
    }
    async create(createManagerDto) {
        const emailExists = await this.managersRepository.checkEmailExists(createManagerDto.email);
        if (emailExists) {
            throw new BadRequestException('Email já está registrado');
        }
        const hashedPassword = await bcrypt.hash(createManagerDto.password, 10);
        const manager = await this.managersRepository.create({
            ...createManagerDto,
            email: createManagerDto.email.toLowerCase(),
            password: hashedPassword,
        });
        return this.sanitizeManager(manager.toObject());
    }
    async findById(id) {
        const manager = await this.managersRepository.findById(id);
        if (!manager) {
            throw new BadRequestException('Manager não encontrado');
        }
        return this.sanitizeManager(manager.toObject());
    }
    async findAll(skip, limit) {
        const managers = await this.managersRepository.findAll(skip, limit);
        return managers.map(m => this.sanitizeManager(m.toObject()));
    }
    async findByEmail(email) {
        return this.managersRepository.findByEmail(email.toLowerCase());
    }
    async update(id, updateManagerDto) {
        const manager = await this.managersRepository.findById(id);
        if (!manager) {
            throw new BadRequestException('Manager não encontrado');
        }
        const updateData = { ...updateManagerDto };
        if (updateManagerDto.email) {
            const emailExists = await this.managersRepository.checkEmailExists(updateManagerDto.email);
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
        return this.sanitizeManager(updatedManager.toObject());
    }
    async softDelete(id) {
        const manager = await this.managersRepository.findById(id);
        if (!manager) {
            throw new BadRequestException('Manager não encontrado');
        }
        await this.managersRepository.softDelete(id);
        return { message: 'Manager deletado com sucesso' };
    }
    async validatePassword(manager, password) {
        return bcrypt.compare(password, manager.password);
    }
    sanitizeManager(manager) {
        const { password, deletedAt, ...rest } = manager;
        return rest;
    }
};
ManagersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ManagersRepository])
], ManagersService);
export { ManagersService };
//# sourceMappingURL=managers.service.js.map