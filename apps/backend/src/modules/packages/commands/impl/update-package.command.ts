import { UpdatePackageDto } from '../../dtos/update-package.dto.js';

export class UpdatePackageCommand {
  constructor(
    public readonly id: string,
    public readonly updatePackageDto: UpdatePackageDto,
  ) {}
}
