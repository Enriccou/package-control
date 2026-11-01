import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateResidentDto } from './dtos/create-resident.dto.js';
import { UpdateResidentDto } from './dtos/update-resident.dto.js';
export declare class ResidentsController {
    private commandBus;
    private queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    create(createResidentDto: CreateResidentDto): Promise<any>;
    findAll(skip?: number, limit?: number): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateResidentDto: UpdateResidentDto): Promise<any>;
    delete(id: string): Promise<any>;
}
