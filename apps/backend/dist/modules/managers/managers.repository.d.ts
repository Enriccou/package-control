import { Model } from 'mongoose';
import { Manager, ManagerDocument } from './schemas/manager.schema.js';
export declare class ManagersRepository {
    private managerModel;
    constructor(managerModel: Model<ManagerDocument>);
    create(data: any): Promise<Manager>;
    findById(id: string): Promise<Manager | null>;
    findByEmail(email: string): Promise<Manager | null>;
    findAll(skip: number, limit: number): Promise<Manager[]>;
    update(id: string, data: any): Promise<Manager | null>;
    softDelete(id: string): Promise<Manager | null>;
    checkEmailExists(email: string): Promise<boolean>;
}
