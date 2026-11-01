var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../auth/guards/jwt.guard.js';
import { CreateResidentDto } from './dtos/create-resident.dto.js';
import { UpdateResidentDto } from './dtos/update-resident.dto.js';
import { CreateResidentCommand } from './commands/impl/create-resident.command.js';
import { UpdateResidentCommand } from './commands/impl/update-resident.command.js';
import { DeleteResidentCommand } from './commands/impl/delete-resident.command.js';
import { GetResidentQuery } from './queries/impl/get-resident.query.js';
import { ListResidentsQuery } from './queries/impl/list-residents.query.js';
let ResidentsController = class ResidentsController {
    commandBus;
    queryBus;
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    async create(createResidentDto) {
        return this.commandBus.execute(new CreateResidentCommand(createResidentDto));
    }
    async findAll(skip = 0, limit = 10) {
        return this.queryBus.execute(new ListResidentsQuery(skip, limit));
    }
    async findOne(id) {
        return this.queryBus.execute(new GetResidentQuery(id));
    }
    async update(id, updateResidentDto) {
        return this.commandBus.execute(new UpdateResidentCommand(id, updateResidentDto));
    }
    async delete(id) {
        return this.commandBus.execute(new DeleteResidentCommand(id));
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateResidentDto]),
    __metadata("design:returntype", Promise)
], ResidentsController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Query('skip')),
    __param(1, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ResidentsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResidentsController.prototype, "findOne", null);
__decorate([
    Put(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateResidentDto]),
    __metadata("design:returntype", Promise)
], ResidentsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResidentsController.prototype, "delete", null);
ResidentsController = __decorate([
    UseGuards(JwtAuthGuard),
    Controller('residents'),
    __metadata("design:paramtypes", [CommandBus,
        QueryBus])
], ResidentsController);
export { ResidentsController };
//# sourceMappingURL=residents.controller.js.map