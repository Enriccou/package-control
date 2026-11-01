import { Model } from 'mongoose';
import { Package, PackageDocument } from './schemas/package.schema.js';
import { CreatePackageDto } from './dtos/create-package.dto.js';
import { UpdatePackageDto } from './dtos/update-package.dto.js';
export declare class PackagesRepository {
    private packageModel;
    constructor(packageModel: Model<PackageDocument>);
    create(createPackageDto: CreatePackageDto): Promise<Package>;
    findAll(skip?: number, limit?: number): Promise<Package[]>;
    findById(id: string): Promise<Package | null>;
    findByResidentId(residentId: string, skip?: number, limit?: number): Promise<Package[]>;
    findPending(days?: number): Promise<Package[]>;
    update(id: string, updatePackageDto: UpdatePackageDto): Promise<Package | null>;
    delete(id: string): Promise<Package | null>;
    incrementNotificationAttempts(id: string): Promise<void>;
    confirmNotification(id: string): Promise<Package | null>;
}
