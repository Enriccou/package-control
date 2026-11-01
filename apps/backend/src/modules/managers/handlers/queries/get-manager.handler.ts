import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetManagerQuery } from '../../queries/impl/get-manager.query.js';
import { ManagersService } from '../../managers.service.js';

@QueryHandler(GetManagerQuery)
export class GetManagerHandler implements IQueryHandler<GetManagerQuery> {
  constructor(private managersService: ManagersService) {}

  async execute(query: GetManagerQuery) {
    return this.managersService.findById(query.id);
  }
}
