import { IQueryHandler } from '@nestjs/cqrs';
import { ListManagersQuery } from '../../queries/impl/list-managers.query.js';
import { ManagersService } from '../../managers.service.js';
export declare class ListManagersHandler implements IQueryHandler<ListManagersQuery> {
    private managersService;
    constructor(managersService: ManagersService);
    execute(query: ListManagersQuery): Promise<any[]>;
}
