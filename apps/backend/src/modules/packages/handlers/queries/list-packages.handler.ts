import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ListPackagesQuery } from '../../queries/impl/list-packages.query.js';
import { PackagesService } from '../../packages.service.js';

@QueryHandler(ListPackagesQuery)
export class ListPackagesHandler implements IQueryHandler<ListPackagesQuery> {
  constructor(private packagesService: PackagesService) {}

  async execute(query: ListPackagesQuery) {
    const { skip, limit } = query;

    return this.packagesService.findAll(skip, limit);
  }
}
