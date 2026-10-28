import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePackageCommand } from '../../commands/impl/create-package.command.js';
import { PackagesService } from '../../packages.service.js';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreatePackageCommand)
export class CreatePackageHandler implements ICommandHandler<CreatePackageCommand> {
  constructor(private packagesService: PackagesService) {}

  async execute(command: CreatePackageCommand) {
    const { createPackageDto } = command;

    return this.packagesService.create(createPackageDto);
  }
}
