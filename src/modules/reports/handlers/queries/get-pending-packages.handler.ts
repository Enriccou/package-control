import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetPendingPackagesQuery } from '../../queries/impl/get-pending-packages.query.js';
import { ReportsService } from '../../reports.service.js';

@QueryHandler(GetPendingPackagesQuery)
export class GetPendingPackagesHandler
  implements IQueryHandler<GetPendingPackagesQuery>
{
  constructor(private reportsService: ReportsService) {}

  async execute(query: GetPendingPackagesQuery) {
    const { days } = query;

    return this.reportsService.getPendingPackages(days);
  }
}
