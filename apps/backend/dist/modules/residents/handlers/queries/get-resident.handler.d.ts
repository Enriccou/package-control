import { IQueryHandler } from '@nestjs/cqrs';
import { GetResidentQuery } from '../../queries/impl/get-resident.query.js';
import { ResidentsService } from '../../residents.service.js';
export declare class GetResidentHandler implements IQueryHandler<GetResidentQuery> {
    private residentsService;
    constructor(residentsService: ResidentsService);
    execute(query: GetResidentQuery): Promise<import("../../index.js").Resident>;
}
