import { UpdateResidentDto } from '../../dtos/update-resident.dto.js';

export class UpdateResidentCommand {
  constructor(
    public readonly id: string,
    public readonly updateResidentDto: UpdateResidentDto,
  ) {}
}
