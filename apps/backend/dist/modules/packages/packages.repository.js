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
import { Package } from './schemas/package.schema.js';
let PackagesRepository = class PackagesRepository {
    packageModel;
    constructor(packageModel) {
        this.packageModel = packageModel;
    }
    async create(createPackageDto) {
        const pkg = new this.packageModel(createPackageDto);
        return pkg.save();
    }
    async findAll(skip = 0, limit = 10) {
        return this.packageModel
            .find({ deletedAt: null })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .exec();
    }
    async findById(id) {
        return this.packageModel.findOne({ _id: id, deletedAt: null }).exec();
    }
    async findByResidentId(residentId, skip = 0, limit = 10) {
        return this.packageModel
            .find({ residentId, deletedAt: null })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .exec();
    }
    async findPending(days = 7) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return this.packageModel
            .find({
            status: 'pending',
            receivedAt: { $lt: date },
            deletedAt: null,
        })
            .sort({ receivedAt: 1 })
            .exec();
    }
    async update(id, updatePackageDto) {
        return this.packageModel
            .findByIdAndUpdate(id, updatePackageDto, { new: true })
            .exec();
    }
    async delete(id) {
        return this.packageModel
            .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
            .exec();
    }
    async incrementNotificationAttempts(id) {
        await this.packageModel
            .findByIdAndUpdate(id, {
            $inc: { notificationAttempts: 1 },
            lastNotificationAt: new Date(),
        }, { new: true })
            .exec();
    }
    async confirmNotification(id) {
        return this.packageModel
            .findByIdAndUpdate(id, {
            notificationConfirmedAt: new Date(),
            lastNotificationAt: new Date(),
            $inc: { notificationAttempts: 1 },
        }, { new: true })
            .exec();
    }
};
PackagesRepository = __decorate([
    Injectable(),
    __param(0, InjectModel(Package.name)),
    __metadata("design:paramtypes", [Model])
], PackagesRepository);
export { PackagesRepository };
//# sourceMappingURL=packages.repository.js.map