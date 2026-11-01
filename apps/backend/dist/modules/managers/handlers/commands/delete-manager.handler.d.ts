import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteManagerCommand } from '../../commands/impl/delete-manager.command.js';
import { ManagersService } from '../../managers.service.js';
export declare class DeleteManagerHandler implements ICommandHandler<DeleteManagerCommand> {
    private managersService;
    constructor(managersService: ManagersService);
    execute(command: DeleteManagerCommand): Promise<{
        message: string;
    }>;
}
