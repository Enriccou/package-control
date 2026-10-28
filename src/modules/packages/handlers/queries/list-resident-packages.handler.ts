import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ListResidentPackagesQuery } from '../../queries/impl/list-resident-packages.query.js';
import { PackagesService } from '../../packages.service.js';

@QueryHandler(ListResidentPackagesQuery)
export class ListResidentPackagesHandler
  implements IQueryHandler<ListResidentPackagesQuery>
{
  constructor(private packagesService: PackagesService) {}

  async execute(query: ListResidentPackagesQuery) {
    const { residentId, skip, limit } = query;

    return this.packagesService.findByResidentId(residentId, skip, limit);
  }
}
