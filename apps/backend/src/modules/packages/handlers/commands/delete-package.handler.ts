import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePackageCommand } from '../../commands/impl/delete-package.command.js';
import { PackagesService } from '../../packages.service.js';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeletePackageCommand)
export class DeletePackageHandler implements ICommandHandler<DeletePackageCommand> {
  constructor(private packagesService: PackagesService) {}

  async execute(command: DeletePackageCommand) {
    const { id } = command;

    const pkg = await this.packagesService.findById(id);
    if (!pkg) {
      throw new NotFoundException('Encomenda não encontrada');
    }

    return this.packagesService.delete(id);
  }
}
