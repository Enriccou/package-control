import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePackageCommand } from '../../commands/impl/update-package.command.js';
import { PackagesService } from '../../packages.service.js';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdatePackageCommand)
export class UpdatePackageHandler implements ICommandHandler<UpdatePackageCommand> {
  constructor(private packagesService: PackagesService) {}

  async execute(command: UpdatePackageCommand) {
    const { id, updatePackageDto } = command;

    const pkg = await this.packagesService.findById(id);
    if (!pkg) {
      throw new NotFoundException('Encomenda não encontrada');
    }

    return this.packagesService.update(id, updatePackageDto);
  }
}
