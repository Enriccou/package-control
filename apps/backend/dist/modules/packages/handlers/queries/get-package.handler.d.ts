import { IQueryHandler } from '@nestjs/cqrs';
import { GetPackageQuery } from '../../queries/impl/get-package.query.js';
import { PackagesService } from '../../packages.service.js';
export declare class GetPackageHandler implements IQueryHandler<GetPackageQuery> {
    private packagesService;
    constructor(packagesService: PackagesService);
    execute(query: GetPackageQuery): Promise<import("../../index.js").Package>;
}
