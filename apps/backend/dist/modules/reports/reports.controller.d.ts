import { QueryBus } from '@nestjs/cqrs';
import { ReportsService } from './reports.service.js';
export declare class ReportsController {
    private queryBus;
    private reportsService;
    constructor(queryBus: QueryBus, reportsService: ReportsService);
    getPendingPackages(days?: number): Promise<any>;
    getFailedNotifications(skip?: number, limit?: number): Promise<any>;
    getStatistics(): Promise<{
        totalPackages: number;
        pendingCount: number;
        pickedUpCount: number;
        byStatus: any[];
    }>;
}
