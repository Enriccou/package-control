import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ListResidentsQuery } from '../../queries/impl/list-residents.query.js';
import { ResidentsService } from '../../residents.service.js';

@QueryHandler(ListResidentsQuery)
export class ListResidentsHandler implements IQueryHandler<ListResidentsQuery> {
  constructor(private residentsService: ResidentsService) {}

  async execute(query: ListResidentsQuery) {
    const { skip, limit } = query;
    return this.residentsService.findAll(skip, limit);
  }
}
