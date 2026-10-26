import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateManagerCommand } from '../../commands/impl/update-manager.command.js';
import { ManagersService } from '../../managers.service.js';

@CommandHandler(UpdateManagerCommand)
export class UpdateManagerHandler implements ICommandHandler<UpdateManagerCommand> {
  constructor(private managersService: ManagersService) {}

  async execute(command: UpdateManagerCommand) {
    return this.managersService.update(command.id, command.updateManagerDto);
  }
}
