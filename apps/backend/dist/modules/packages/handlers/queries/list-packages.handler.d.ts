import { IQueryHandler } from '@nestjs/cqrs';
import { ListPackagesQuery } from '../../queries/impl/list-packages.query.js';
import { PackagesService } from '../../packages.service.js';
export declare class ListPackagesHandler implements IQueryHandler<ListPackagesQuery> {
    private packagesService;
    constructor(packagesService: PackagesService);
    execute(query: ListPackagesQuery): Promise<import("../../index.js").Package[]>;
}
