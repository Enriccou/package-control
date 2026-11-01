import { ICommandHandler } from '@nestjs/cqrs';
import { CreateManagerCommand } from '../../commands/impl/create-manager.command.js';
import { ManagersService } from '../../managers.service.js';
export declare class CreateManagerHandler implements ICommandHandler<CreateManagerCommand> {
    private managersService;
    constructor(managersService: ManagersService);
    execute(command: CreateManagerCommand): Promise<any>;
}
