import { UpdateResidentDto } from '../../dtos/update-resident.dto.js';
export declare class UpdateResidentCommand {
    readonly id: string;
    readonly updateResidentDto: UpdateResidentDto;
    constructor(id: string, updateResidentDto: UpdateResidentDto);
}
