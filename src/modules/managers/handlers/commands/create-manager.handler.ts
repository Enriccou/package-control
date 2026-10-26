import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateManagerCommand } from '../../commands/impl/create-manager.command.js';
import { ManagersService } from '../../managers.service.js';

@CommandHandler(CreateManagerCommand)
export class CreateManagerHandler implements ICommandHandler<CreateManagerCommand> {
  constructor(private managersService: ManagersService) {}

  async execute(command: CreateManagerCommand) {
    return this.managersService.create(command.createManagerDto);
  }
}
