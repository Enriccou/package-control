import { IQueryHandler } from '@nestjs/cqrs';
import { GetManagerQuery } from '../../queries/impl/get-manager.query.js';
import { ManagersService } from '../../managers.service.js';
export declare class GetManagerHandler implements IQueryHandler<GetManagerQuery> {
    private managersService;
    constructor(managersService: ManagersService);
    execute(query: GetManagerQuery): Promise<any>;
}
