import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type PackageDocument = HydratedDocument<Package>;
export declare enum PackageStatus {
    RECEIVED = "received",
    PENDING = "pending",
    PICKED_UP = "picked_up",
    FAILED = "failed"
}
export declare class Package {
    residentId: string;
    carrier: string;
    trackingNumber?: string;
    description?: string;
    status: PackageStatus;
    receivedAt: Date;
    pickupAt?: Date;
    notificationAttempts: number;
    lastNotificationAt?: Date;
    notificationConfirmedAt?: Date;
    notificationFailed: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PackageSchema: mongoose.Schema<Package, mongoose.Model<Package, any, any, any, mongoose.Document<unknown, any, Package, any, {}> & Package & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Package, mongoose.Document<unknown, {}, mongoose.FlatRecord<Package>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<Package> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
