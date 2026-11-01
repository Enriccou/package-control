import { PackageStatus } from '../schemas/package.schema.js';
export declare class UpdatePackageDto {
    carrier?: string;
    trackingNumber?: string;
    description?: string;
    status?: PackageStatus;
}
