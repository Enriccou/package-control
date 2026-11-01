var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateResidentCommand } from '../../commands/impl/update-resident.command.js';
import { ResidentsService } from '../../residents.service.js';
import { NotFoundException, BadRequestException } from '@nestjs/common';
let UpdateResidentHandler = class UpdateResidentHandler {
    residentsService;
    constructor(residentsService) {
        this.residentsService = residentsService;
    }
    async execute(command) {
        const { id, updateResidentDto } = command;
        const resident = await this.residentsService.findById(id);
        if (!resident) {
            throw new NotFoundException('Residente não encontrado');
        }
        if (updateResidentDto.email && updateResidentDto.email !== resident.email) {
            const existingResident = await this.residentsService.findByEmail(updateResidentDto.email);
            if (existingResident) {
                throw new BadRequestException('Email já está registrado');
            }
        }
        return this.residentsService.update(id, updateResidentDto);
    }
};
UpdateResidentHandler = __decorate([
    CommandHandler(UpdateResidentCommand),
    __metadata("design:paramtypes", [ResidentsService])
], UpdateResidentHandler);
export { UpdateResidentHandler };
//# sourceMappingURL=update-resident.handler.js.map