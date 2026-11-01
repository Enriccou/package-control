import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateManagerCommand } from '../../commands/impl/update-manager.command.js';
import { ManagersService } from '../../managers.service.js';
export declare class UpdateManagerHandler implements ICommandHandler<UpdateManagerCommand> {
    private managersService;
    constructor(managersService: ManagersService);
    execute(command: UpdateManagerCommand): Promise<any>;
}
