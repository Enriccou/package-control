import { CreateManagerDto } from '../../dtos/create-manager.dto.js';

export class CreateManagerCommand {
  constructor(public readonly createManagerDto: CreateManagerDto) {}
}
