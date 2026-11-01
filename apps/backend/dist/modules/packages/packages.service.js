var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PackagesRepository } from './packages.repository.js';
import { PackageStatus } from './schemas/package.schema.js';
let PackagesService = class PackagesService {
    packagesRepository;
    constructor(packagesRepository) {
        this.packagesRepository = packagesRepository;
    }
    async create(createPackageDto) {
        return this.packagesRepository.create(createPackageDto);
    }
    async findAll(skip = 0, limit = 10) {
        return this.packagesRepository.findAll(skip, limit);
    }
    async findById(id) {
        return this.packagesRepository.findById(id);
    }
    async findByResidentId(residentId, skip = 0, limit = 10) {
        return this.packagesRepository.findByResidentId(residentId, skip, limit);
    }
    async findPending(days = 7) {
        return this.packagesRepository.findPending(days);
    }
    async update(id, updatePackageDto) {
        return this.packagesRepository.update(id, updatePackageDto);
    }
    async markAsPickedUp(id) {
        return this.packagesRepository.update(id, {
            status: PackageStatus.PICKED_UP,
        });
    }
    async delete(id) {
        return this.packagesRepository.delete(id);
    }
    async incrementNotificationAttempts(id) {
        await this.packagesRepository.incrementNotificationAttempts(id);
    }
    async confirmNotification(id) {
        return this.packagesRepository.confirmNotification(id);
    }
    async getWhatsAppLink(id, residentPhone) {
        const pkg = await this.findById(id);
        if (!pkg)
            throw new Error('Package not found');
        const message = `Olá! Sua encomenda (${pkg.carrier} - ${pkg.trackingNumber || 'sem rastreamento'}) chegou no ${new Date(pkg.receivedAt).toLocaleDateString('pt-BR')}. Por favor, retire na portaria.`;
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${residentPhone}?text=${encodedMessage}`;
    }
};
PackagesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PackagesRepository])
], PackagesService);
export { PackagesService };
//# sourceMappingURL=packages.service.js.map