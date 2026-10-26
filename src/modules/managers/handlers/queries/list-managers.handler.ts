import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ListManagersQuery } from '../../queries/impl/list-managers.query.js';
import { ManagersService } from '../../managers.service.js';

@QueryHandler(ListManagersQuery)
export class ListManagersHandler implements IQueryHandler<ListManagersQuery> {
  constructor(private managersService: ManagersService) {}

  async execute(query: ListManagersQuery) {
    return this.managersService.findAll(query.skip, query.limit);
  }
}
