import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetResidentQuery } from '../../queries/impl/get-resident.query.js';
import { ResidentsService } from '../../residents.service.js';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetResidentQuery)
export class GetResidentHandler implements IQueryHandler<GetResidentQuery> {
  constructor(private residentsService: ResidentsService) {}

  async execute(query: GetResidentQuery) {
    const { id } = query;

    const resident = await this.residentsService.findById(id);
    if (!resident) {
      throw new NotFoundException('Residente não encontrado');
    }

    return resident;
  }
}
