import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteManagerCommand } from '../../commands/impl/delete-manager.command.js';
import { ManagersService } from '../../managers.service.js';

@CommandHandler(DeleteManagerCommand)
export class DeleteManagerHandler implements ICommandHandler<DeleteManagerCommand> {
  constructor(private managersService: ManagersService) {}

  async execute(command: DeleteManagerCommand) {
    return this.managersService.softDelete(command.id);
  }
}
