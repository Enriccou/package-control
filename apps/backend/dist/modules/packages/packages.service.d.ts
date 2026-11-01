import { PackagesRepository } from './packages.repository.js';
import { CreatePackageDto } from './dtos/create-package.dto.js';
import { UpdatePackageDto } from './dtos/update-package.dto.js';
import { Package } from './schemas/package.schema.js';
export declare class PackagesService {
    private packagesRepository;
    constructor(packagesRepository: PackagesRepository);
    create(createPackageDto: CreatePackageDto): Promise<Package>;
    findAll(skip?: number, limit?: number): Promise<Package[]>;
    findById(id: string): Promise<Package | null>;
    findByResidentId(residentId: string, skip?: number, limit?: number): Promise<Package[]>;
    findPending(days?: number): Promise<Package[]>;
    update(id: string, updatePackageDto: UpdatePackageDto): Promise<Package | null>;
    markAsPickedUp(id: string): Promise<Package | null>;
    delete(id: string): Promise<Package | null>;
    incrementNotificationAttempts(id: string): Promise<void>;
    confirmNotification(id: string): Promise<Package | null>;
    getWhatsAppLink(id: string, residentPhone: string): Promise<string>;
}
