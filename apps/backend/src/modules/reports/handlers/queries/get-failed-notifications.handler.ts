import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetFailedNotificationsQuery } from '../../queries/impl/get-failed-notifications.query.js';
import { ReportsService } from '../../reports.service.js';

@QueryHandler(GetFailedNotificationsQuery)
export class GetFailedNotificationsHandler
  implements IQueryHandler<GetFailedNotificationsQuery>
{
  constructor(private reportsService: ReportsService) {}

  async execute(query: GetFailedNotificationsQuery) {
    const { skip, limit } = query;

    return this.reportsService.getFailedNotifications(skip, limit);
  }
}
