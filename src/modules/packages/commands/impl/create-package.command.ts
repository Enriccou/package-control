import { CreatePackageDto } from '../../dtos/create-package.dto.js';

export class CreatePackageCommand {
  constructor(public readonly createPackageDto: CreatePackageDto) {}
}
