import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateResidentCommand } from '../../commands/impl/update-resident.command.js';
import { ResidentsService } from '../../residents.service.js';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@CommandHandler(UpdateResidentCommand)
export class UpdateResidentHandler implements ICommandHandler<UpdateResidentCommand> {
  constructor(private residentsService: ResidentsService) {}

  async execute(command: UpdateResidentCommand) {
    const { id, updateResidentDto } = command;

    const resident = await this.residentsService.findById(id);
    if (!resident) {
      throw new NotFoundException('Residente não encontrado');
    }

    // Se mudou o email, verificar se novo email já existe
    if (updateResidentDto.email && updateResidentDto.email !== resident.email) {
      const existingResident = await this.residentsService.findByEmail(
        updateResidentDto.email,
      );
      if (existingResident) {
        throw new BadRequestException('Email já está registrado');
      }
    }

    return this.residentsService.update(id, updateResidentDto);
  }
}
