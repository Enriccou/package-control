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
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../auth/guards/jwt.guard.js';
import { GetPendingPackagesQuery, GetFailedNotificationsQuery, } from './queries/index.js';
import { ReportsService } from './reports.service.js';
let ReportsController = class ReportsController {
    queryBus;
    reportsService;
    constructor(queryBus, reportsService) {
        this.queryBus = queryBus;
        this.reportsService = reportsService;
    }
    async getPendingPackages(days = 7) {
        return this.queryBus.execute(new GetPendingPackagesQuery(days));
    }
    async getFailedNotifications(skip = 0, limit = 10) {
        return this.queryBus.execute(new GetFailedNotificationsQuery(skip, limit));
    }
    async getStatistics() {
        return this.reportsService.getStatistics();
    }
};
__decorate([
    Get('packages/pending'),
    __param(0, Query('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getPendingPackages", null);
__decorate([
    Get('packages/failed-notifications'),
    __param(0, Query('skip')),
    __param(1, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getFailedNotifications", null);
__decorate([
    Get('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getStatistics", null);
ReportsController = __decorate([
    UseGuards(JwtAuthGuard),
    Controller('reports'),
    __metadata("design:paramtypes", [QueryBus,
        ReportsService])
], ReportsController);
export { ReportsController };
//# sourceMappingURL=reports.controller.js.map