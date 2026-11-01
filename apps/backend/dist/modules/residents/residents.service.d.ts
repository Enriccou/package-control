import { ResidentsRepository } from './residents.repository.js';
import { CreateResidentDto } from './dtos/create-resident.dto.js';
import { UpdateResidentDto } from './dtos/update-resident.dto.js';
import { Resident } from './schemas/resident.schema.js';
export declare class ResidentsService {
    private residentsRepository;
    constructor(residentsRepository: ResidentsRepository);
    create(createResidentDto: CreateResidentDto): Promise<Resident>;
    findAll(skip?: number, limit?: number): Promise<Resident[]>;
    findById(id: string): Promise<Resident | null>;
    findByEmail(email: string): Promise<Resident | null>;
    findByPropertyId(propertyId: string): Promise<Resident[]>;
    update(id: string, updateResidentDto: UpdateResidentDto): Promise<Resident | null>;
    delete(id: string): Promise<Resident | null>;
}
