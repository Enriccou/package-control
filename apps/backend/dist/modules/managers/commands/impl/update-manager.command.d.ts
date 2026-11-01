import { UpdateManagerDto } from '../../dtos/update-manager.dto.js';
export declare class UpdateManagerCommand {
    readonly id: string;
    readonly updateManagerDto: UpdateManagerDto;
    constructor(id: string, updateManagerDto: UpdateManagerDto);
}
