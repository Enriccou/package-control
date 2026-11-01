import { IQueryHandler } from '@nestjs/cqrs';
import { GetFailedNotificationsQuery } from '../../queries/impl/get-failed-notifications.query.js';
import { ReportsService } from '../../reports.service.js';
export declare class GetFailedNotificationsHandler implements IQueryHandler<GetFailedNotificationsQuery> {
    private reportsService;
    constructor(reportsService: ReportsService);
    execute(query: GetFailedNotificationsQuery): Promise<{
        total: number;
        count: number;
        skip: number;
        limit: number;
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
