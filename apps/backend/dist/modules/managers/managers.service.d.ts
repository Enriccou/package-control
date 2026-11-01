import { ManagersRepository } from './managers.repository.js';
import { CreateManagerDto } from './dtos/create-manager.dto.js';
import { UpdateManagerDto } from './dtos/update-manager.dto.js';
export declare class ManagersService {
    private managersRepository;
    constructor(managersRepository: ManagersRepository);
    create(createManagerDto: CreateManagerDto): Promise<any>;
    findById(id: string): Promise<any>;
    findAll(skip: number, limit: number): Promise<any[]>;
    findByEmail(email: string): Promise<import("./schemas/manager.schema.js").Manager | null>;
    update(id: string, updateManagerDto: UpdateManagerDto): Promise<any>;
    softDelete(id: string): Promise<{
        message: string;
    }>;
    validatePassword(manager: any, password: string): Promise<boolean>;
    private sanitizeManager;
}
