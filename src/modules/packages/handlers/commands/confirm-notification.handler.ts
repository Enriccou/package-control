import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfirmNotificationCommand } from '../../commands/impl/confirm-notification.command.js';
import { PackagesService } from '../../packages.service.js';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(ConfirmNotificationCommand)
export class ConfirmNotificationHandler
  implements ICommandHandler<ConfirmNotificationCommand>
{
  constructor(private packagesService: PackagesService) {}

  async execute(command: ConfirmNotificationCommand) {
    const { id } = command;

    const pkg = await this.packagesService.findById(id);
    if (!pkg) {
      throw new NotFoundException('Encomenda não encontrada');
    }

    return this.packagesService.confirmNotification(id);
  }
}
