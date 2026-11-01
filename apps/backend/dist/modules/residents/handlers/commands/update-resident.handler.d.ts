import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateResidentCommand } from '../../commands/impl/update-resident.command.js';
import { ResidentsService } from '../../residents.service.js';
export declare class UpdateResidentHandler implements ICommandHandler<UpdateResidentCommand> {
    private residentsService;
    constructor(residentsService: ResidentsService);
    execute(command: UpdateResidentCommand): Promise<import("../../index.js").Resident | null>;
}
