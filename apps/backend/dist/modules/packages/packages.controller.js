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
import { Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards, } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../auth/guards/jwt.guard.js';
import { CreatePackageDto } from './dtos/create-package.dto.js';
import { UpdatePackageDto } from './dtos/update-package.dto.js';
import { CreatePackageCommand, UpdatePackageCommand, PickupPackageCommand, DeletePackageCommand, ConfirmNotificationCommand, } from './commands/index.js';
import { GetPackageQuery, ListPackagesQuery, ListResidentPackagesQuery, } from './queries/index.js';
import { PackagesService } from './packages.service.js';
let PackagesController = class PackagesController {
    commandBus;
    queryBus;
    packagesService;
    constructor(commandBus, queryBus, packagesService) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
        this.packagesService = packagesService;
    }
    async create(createPackageDto) {
        return this.commandBus.execute(new CreatePackageCommand(createPackageDto));
    }
    async findAll(skip = 0, limit = 10) {
        return this.queryBus.execute(new ListPackagesQuery(skip, limit));
    }
    async findByResident(residentId, skip = 0, limit = 10) {
        return this.queryBus.execute(new ListResidentPackagesQuery(residentId, skip, limit));
    }
    async findOne(id) {
        return this.queryBus.execute(new GetPackageQuery(id));
    }
    async update(id, updatePackageDto) {
        return this.commandBus.execute(new UpdatePackageCommand(id, updatePackageDto));
    }
    async markAsPickedUp(id) {
        return this.commandBus.execute(new PickupPackageCommand(id));
    }
    async confirmNotification(id) {
        return this.commandBus.execute(new ConfirmNotificationCommand(id));
    }
    async getWhatsAppLink(id, phone) {
        const link = await this.packagesService.getWhatsAppLink(id, phone);
        return { url: link };
    }
    async delete(id) {
        return this.commandBus.execute(new DeletePackageCommand(id));
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePackageDto]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Query('skip')),
    __param(1, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "findAll", null);
__decorate([
    Get('resident/:residentId'),
    __param(0, Param('residentId')),
    __param(1, Query('skip')),
    __param(2, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "findByResident", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "findOne", null);
__decorate([
    Put(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdatePackageDto]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "update", null);
__decorate([
    Put(':id/pickup'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "markAsPickedUp", null);
__decorate([
    Put(':id/confirm-notification'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "confirmNotification", null);
__decorate([
    Get(':id/whatsapp-link'),
    __param(0, Param('id')),
    __param(1, Query('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "getWhatsAppLink", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "delete", null);
PackagesController = __decorate([
    UseGuards(JwtAuthGuard),
    Controller('packages'),
    __metadata("design:paramtypes", [CommandBus,
        QueryBus,
        PackagesService])
], PackagesController);
export { PackagesController };
//# sourceMappingURL=packages.controller.js.map