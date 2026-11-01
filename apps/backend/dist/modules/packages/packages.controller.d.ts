import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePackageDto } from './dtos/create-package.dto.js';
import { UpdatePackageDto } from './dtos/update-package.dto.js';
import { PackagesService } from './packages.service.js';
export declare class PackagesController {
    private commandBus;
    private queryBus;
    private packagesService;
    constructor(commandBus: CommandBus, queryBus: QueryBus, packagesService: PackagesService);
    create(createPackageDto: CreatePackageDto): Promise<any>;
    findAll(skip?: number, limit?: number): Promise<any>;
    findByResident(residentId: string, skip?: number, limit?: number): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updatePackageDto: UpdatePackageDto): Promise<any>;
    markAsPickedUp(id: string): Promise<any>;
    confirmNotification(id: string): Promise<any>;
    getWhatsAppLink(id: string, phone: string): Promise<{
        url: string;
    }>;
    delete(id: string): Promise<any>;
}
