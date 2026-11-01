import { ICommandHandler } from '@nestjs/cqrs';
import { CreateResidentCommand } from '../../commands/impl/create-resident.command.js';
import { ResidentsService } from '../../residents.service.js';
export declare class CreateResidentHandler implements ICommandHandler<CreateResidentCommand> {
    private residentsService;
    constructor(residentsService: ResidentsService);
    execute(command: CreateResidentCommand): Promise<import("../../index.js").Resident>;
}
