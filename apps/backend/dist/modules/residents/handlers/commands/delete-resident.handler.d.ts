import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteResidentCommand } from '../../commands/impl/delete-resident.command.js';
import { ResidentsService } from '../../residents.service.js';
export declare class DeleteResidentHandler implements ICommandHandler<DeleteResidentCommand> {
    private residentsService;
    constructor(residentsService: ResidentsService);
    execute(command: DeleteResidentCommand): Promise<import("../../index.js").Resident | null>;
}
