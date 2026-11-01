import { HydratedDocument } from 'mongoose';
export type ResidentDocument = HydratedDocument<Resident>;
export declare class Resident {
    name: string;
    email: string;
    phone: string;
    cpf?: string;
    address: string;
    apartment?: string;
    propertyId: string;
    moveInDate: Date;
    moveOutDate?: Date;
    isActive: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ResidentSchema: import("mongoose").Schema<Resident, import("mongoose").Model<Resident, any, any, any, import("mongoose").Document<unknown, any, Resident, any, {}> & Resident & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Resident, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Resident>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Resident> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
