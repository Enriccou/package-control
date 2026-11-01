import { Model } from 'mongoose';
import { Package, PackageDocument } from '../packages/schemas/package.schema.js';
export declare class ReportsService {
    private packageModel;
    constructor(packageModel: Model<PackageDocument>);
    getPendingPackages(days?: number): Promise<{
        count: number;
        days: number;
        packages: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Package, {}, {}> & Package & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Package, {}, {}> & Package & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    getFailedNotifications(skip?: number, limit?: number): Promise<{
        total: number;
        count: number;
        skip: number;
        limit: number;
        packages: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Package, {}, {}> & Package & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, Package, {}, {}> & Package & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    getStatistics(): Promise<{
        totalPackages: number;
        pendingCount: number;
        pickedUpCount: number;
        byStatus: any[];
    }>;
}
