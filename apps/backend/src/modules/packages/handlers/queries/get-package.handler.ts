import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetPackageQuery } from '../../queries/impl/get-package.query.js';
import { PackagesService } from '../../packages.service.js';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetPackageQuery)
export class GetPackageHandler implements IQueryHandler<GetPackageQuery> {
  constructor(private packagesService: PackagesService) {}

  async execute(query: GetPackageQuery) {
    const { id } = query;

    const pkg = await this.packagesService.findById(id);
    if (!pkg) {
      throw new NotFoundException('Encomenda não encontrada');
    }

    return pkg;
  }
}
