import { Model } from 'mongoose';
import { Resident, ResidentDocument } from './schemas/resident.schema.js';
import { CreateResidentDto } from './dtos/create-resident.dto.js';
import { UpdateResidentDto } from './dtos/update-resident.dto.js';
export declare class ResidentsRepository {
    private residentModel;
    constructor(residentModel: Model<ResidentDocument>);
    create(createResidentDto: CreateResidentDto): Promise<Resident>;
    findAll(skip?: number, limit?: number): Promise<Resident[]>;
    findById(id: string): Promise<Resident | null>;
    findByEmail(email: string): Promise<Resident | null>;
    findByPropertyId(propertyId: string): Promise<Resident[]>;
    update(id: string, updateResidentDto: UpdateResidentDto): Promise<Resident | null>;
    delete(id: string): Promise<Resident | null>;
}
