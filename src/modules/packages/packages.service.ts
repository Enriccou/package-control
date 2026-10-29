import { Injectable } from '@nestjs/common';
import { PackagesRepository } from './packages.repository.js';
import { CreatePackageDto } from './dtos/create-package.dto.js';
import { UpdatePackageDto } from './dtos/update-package.dto.js';
import { Package, PackageStatus } from './schemas/package.schema.js';

@Injectable()
export class PackagesService {
  constructor(private packagesRepository: PackagesRepository) {}

  async create(createPackageDto: CreatePackageDto): Promise<Package> {
    return this.packagesRepository.create(createPackageDto);
  }

  async findAll(skip: number = 0, limit: number = 10): Promise<Package[]> {
    return this.packagesRepository.findAll(skip, limit);
  }

  async findById(id: string): Promise<Package | null> {
    return this.packagesRepository.findById(id);
  }

  async findByResidentId(
    residentId: string,
    skip: number = 0,
    limit: number = 10,
  ): Promise<Package[]> {
    return this.packagesRepository.findByResidentId(residentId, skip, limit);
  }

  async findPending(days: number = 7): Promise<Package[]> {
    return this.packagesRepository.findPending(days);
  }

  async update(id: string, updatePackageDto: UpdatePackageDto): Promise<Package | null> {
    return this.packagesRepository.update(id, updatePackageDto);
  }

  async markAsPickedUp(id: string): Promise<Package | null> {
    return this.packagesRepository.update(id, {
      status: PackageStatus.PICKED_UP,
    });
  }

  async delete(id: string): Promise<Package | null> {
    return this.packagesRepository.delete(id);
  }

  async incrementNotificationAttempts(id: string): Promise<void> {
    await this.packagesRepository.incrementNotificationAttempts(id);
  }

  async confirmNotification(id: string): Promise<Package | null> {
    return this.packagesRepository.confirmNotification(id);
  }

  async getWhatsAppLink(id: string, residentPhone: string): Promise<string> {
    const pkg = await this.findById(id);
    if (!pkg) return null;

    const message = `Olá! Sua encomenda (${pkg.carrier} - ${pkg.trackingNumber || 'sem rastreamento'}) chegou no ${new Date(pkg.receivedAt).toLocaleDateString('pt-BR')}. Por favor, retire na portaria.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${residentPhone}?text=${encodedMessage}`;
  }
}
