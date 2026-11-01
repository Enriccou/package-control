import { IQueryHandler } from '@nestjs/cqrs';
import { GetPendingPackagesQuery } from '../../queries/impl/get-pending-packages.query.js';
import { ReportsService } from '../../reports.service.js';
export declare class GetPendingPackagesHandler implements IQueryHandler<GetPendingPackagesQuery> {
    private reportsService;
    constructor(reportsService: ReportsService);
    execute(query: GetPendingPackagesQuery): Promise<{
        count: number;
        days: number;
        packages: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../../packages/index.js").Package, {}, {}> & import("../../../packages/index.js").Package & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../../packages/index.js").Package, {}, {}> & import("../../../packages/index.js").Package & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
}
