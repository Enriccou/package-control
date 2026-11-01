import { UpdateManagerDto } from '../../dtos/update-manager.dto.js';

export class UpdateManagerCommand {
  constructor(
    public readonly id: string,
    public readonly updateManagerDto: UpdateManagerDto,
  ) {}
}
