import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteResidentCommand } from '../../commands/impl/delete-resident.command.js';
import { ResidentsService } from '../../residents.service.js';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteResidentCommand)
export class DeleteResidentHandler implements ICommandHandler<DeleteResidentCommand> {
  constructor(private residentsService: ResidentsService) {}

  async execute(command: DeleteResidentCommand) {
    const { id } = command;

    const resident = await this.residentsService.findById(id);
    if (!resident) {
      throw new NotFoundException('Residente não encontrado');
    }

    return this.residentsService.delete(id);
  }
}
