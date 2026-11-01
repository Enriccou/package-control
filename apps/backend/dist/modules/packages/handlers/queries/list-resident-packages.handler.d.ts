import { IQueryHandler } from '@nestjs/cqrs';
import { ListResidentPackagesQuery } from '../../queries/impl/list-resident-packages.query.js';
import { PackagesService } from '../../packages.service.js';
export declare class ListResidentPackagesHandler implements IQueryHandler<ListResidentPackagesQuery> {
    private packagesService;
    constructor(packagesService: PackagesService);
    execute(query: ListResidentPackagesQuery): Promise<import("../../index.js").Package[]>;
}
