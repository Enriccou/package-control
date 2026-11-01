import { HydratedDocument } from 'mongoose';
export type ManagerDocument = HydratedDocument<Manager>;
export declare class Manager {
    name: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ManagerSchema: import("mongoose").Schema<Manager, import("mongoose").Model<Manager, any, any, any, import("mongoose").Document<unknown, any, Manager, any, {}> & Manager & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Manager, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Manager>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Manager> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
