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
import { CreateManagerDto } from './dtos/create-manager.dto.js';
import { UpdateManagerDto } from './dtos/update-manager.dto.js';
import { CreateManagerCommand } from './commands/impl/create-manager.command.js';
import { UpdateManagerCommand } from './commands/impl/update-manager.command.js';
import { DeleteManagerCommand } from './commands/impl/delete-manager.command.js';
import { GetManagerQuery } from './queries/impl/get-manager.query.js';
import { ListManagersQuery } from './queries/impl/list-managers.query.js';
let ManagersController = class ManagersController {
    commandBus;
    queryBus;
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    async create(createManagerDto) {
        return this.commandBus.execute(new CreateManagerCommand(createManagerDto));
    }
    async findAll(skip = 0, limit = 10) {
        return this.queryBus.execute(new ListManagersQuery(skip, limit));
    }
    async findOne(id) {
        return this.queryBus.execute(new GetManagerQuery(id));
    }
    async update(id, updateManagerDto) {
        return this.commandBus.execute(new UpdateManagerCommand(id, updateManagerDto));
    }
    async delete(id) {
        return this.commandBus.execute(new DeleteManagerCommand(id));
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateManagerDto]),
    __metadata("design:returntype", Promise)
], ManagersController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Query('skip')),
    __param(1, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ManagersController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ManagersController.prototype, "findOne", null);
__decorate([
    Put(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateManagerDto]),
    __metadata("design:returntype", Promise)
], ManagersController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ManagersController.prototype, "delete", null);
ManagersController = __decorate([
    UseGuards(JwtAuthGuard),
    Controller('managers'),
    __metadata("design:paramtypes", [CommandBus,
        QueryBus])
], ManagersController);
export { ManagersController };
//# sourceMappingURL=managers.controller.js.map