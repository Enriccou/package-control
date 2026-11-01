import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PickupPackageCommand } from '../../commands/impl/pickup-package.command.js';
import { PackagesService } from '../../packages.service.js';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PackageStatus } from '../../schemas/package.schema.js';

@CommandHandler(PickupPackageCommand)
export class PickupPackageHandler implements ICommandHandler<PickupPackageCommand> {
  constructor(private packagesService: PackagesService) {}

  async execute(command: PickupPackageCommand) {
    const { id } = command;

    const pkg = await this.packagesService.findById(id);
    if (!pkg) {
      throw new NotFoundException('Encomenda não encontrada');
    }

    if (pkg.status === PackageStatus.PICKED_UP) {
      throw new BadRequestException('Encomenda já foi retirada');
    }

    return this.packagesService.markAsPickedUp(id);
  }
}
