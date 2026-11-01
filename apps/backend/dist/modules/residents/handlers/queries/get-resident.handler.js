var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { QueryHandler } from '@nestjs/cqrs';
import { GetResidentQuery } from '../../queries/impl/get-resident.query.js';
import { ResidentsService } from '../../residents.service.js';
import { NotFoundException } from '@nestjs/common';
let GetResidentHandler = class GetResidentHandler {
    residentsService;
    constructor(residentsService) {
        this.residentsService = residentsService;
    }
    async execute(query) {
        const { id } = query;
        const resident = await this.residentsService.findById(id);
        if (!resident) {
            throw new NotFoundException('Residente não encontrado');
        }
        return resident;
    }
};
GetResidentHandler = __decorate([
    QueryHandler(GetResidentQuery),
    __metadata("design:paramtypes", [ResidentsService])
], GetResidentHandler);
export { GetResidentHandler };
//# sourceMappingURL=get-resident.handler.js.map