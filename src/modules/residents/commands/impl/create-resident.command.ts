import { CreateResidentDto } from '../../dtos/create-resident.dto.js';

export class CreateResidentCommand {
  constructor(public readonly createResidentDto: CreateResidentDto) {}
}
