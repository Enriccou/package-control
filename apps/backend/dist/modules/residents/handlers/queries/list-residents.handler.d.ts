import { IQueryHandler } from '@nestjs/cqrs';
import { ListResidentsQuery } from '../../queries/impl/list-residents.query.js';
import { ResidentsService } from '../../residents.service.js';
export declare class ListResidentsHandler implements IQueryHandler<ListResidentsQuery> {
    private residentsService;
    constructor(residentsService: ResidentsService);
    execute(query: ListResidentsQuery): Promise<import("../../index.js").Resident[]>;
}
