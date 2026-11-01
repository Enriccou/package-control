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
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package } from '../packages/schemas/package.schema.js';
let ReportsService = class ReportsService {
    packageModel;
    constructor(packageModel) {
        this.packageModel = packageModel;
    }
    async getPendingPackages(days = 7) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        const packages = await this.packageModel
            .find({
            status: 'pending',
            receivedAt: { $lt: date },
            deletedAt: null,
        })
            .sort({ receivedAt: 1 })
            .populate('residentId', ['name', 'email', 'phone', 'apartment'])
            .exec();
        return {
            count: packages.length,
            days,
            packages,
        };
    }
    async getFailedNotifications(skip = 0, limit = 10) {
        const packages = await this.packageModel
            .find({
            notificationFailed: true,
            deletedAt: null,
        })
            .skip(skip)
            .limit(limit)
            .sort({ lastNotificationAt: -1 })
            .populate('residentId', ['name', 'email', 'phone', 'apartment'])
            .exec();
        const total = await this.packageModel.countDocuments({
            notificationFailed: true,
            deletedAt: null,
        });
        return {
            total,
            count: packages.length,
            skip,
            limit,
            packages,
        };
    }
    async getStatistics() {
        const totalPackages = await this.packageModel.countDocuments({
            deletedAt: null,
        });
        const byStatus = await this.packageModel.aggregate([
            { $match: { deletedAt: null } },
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);
        const pendingCount = await this.packageModel.countDocuments({
            status: 'pending',
            deletedAt: null,
        });
        const pickedUpCount = await this.packageModel.countDocuments({
            status: 'picked_up',
            deletedAt: null,
        });
        return {
            totalPackages,
            pendingCount,
            pickedUpCount,
            byStatus,
        };
    }
};
ReportsService = __decorate([
    Injectable(),
    __param(0, InjectModel(Package.name)),
    __metadata("design:paramtypes", [Model])
], ReportsService);
export { ReportsService };
//# sourceMappingURL=reports.service.js.map