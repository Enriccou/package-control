import { UpdatePackageDto } from '../../dtos/update-package.dto.js';
export declare class UpdatePackageCommand {
    readonly id: string;
    readonly updatePackageDto: UpdatePackageDto;
    constructor(id: string, updatePackageDto: UpdatePackageDto);
}
