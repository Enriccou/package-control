import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateResidentCommand } from '../../commands/impl/create-resident.command.js';
import { ResidentsService } from '../../residents.service.js';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateResidentCommand)
export class CreateResidentHandler implements ICommandHandler<CreateResidentCommand> {
  constructor(private residentsService: ResidentsService) {}

  async execute(command: CreateResidentCommand) {
    const { createResidentDto } = command;

    // Verificar se email já existe
    const existingResident = await this.residentsService.findByEmail(
      createResidentDto.email,
    );
    if (existingResident) {
      throw new BadRequestException('Email já está registrado');
    }

    return this.residentsService.create(createResidentDto);
  }
}
