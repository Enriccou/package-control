import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateManagerDto } from './dtos/create-manager.dto.js';
import { UpdateManagerDto } from './dtos/update-manager.dto.js';
export declare class ManagersController {
    private commandBus;
    private queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    create(createManagerDto: CreateManagerDto): Promise<any>;
    findAll(skip?: number, limit?: number): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateManagerDto: UpdateManagerDto): Promise<any>;
    delete(id: string): Promise<any>;
}
