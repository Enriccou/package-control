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
import { Manager } from './schemas/manager.schema.js';
let ManagersRepository = class ManagersRepository {
    managerModel;
    constructor(managerModel) {
        this.managerModel = managerModel;
    }
    async create(data) {
        const createdManager = new this.managerModel(data);
        return createdManager.save();
    }
    async findById(id) {
        return this.managerModel.findById(id).where('deletedAt').equals(null);
    }
    async findByEmail(email) {
        return this.managerModel
            .findOne({ email: email.toLowerCase() })
            .where('deletedAt')
            .equals(null);
    }
    async findAll(skip, limit) {
        return this.managerModel
            .find()
            .where('deletedAt')
            .equals(null)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
    }
    async update(id, data) {
        return this.managerModel
            .findByIdAndUpdate(id, data, { new: true })
            .where('deletedAt')
            .equals(null);
    }
    async softDelete(id) {
        return this.managerModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    }
    async checkEmailExists(email) {
        const count = await this.managerModel
            .countDocuments({
            email: email.toLowerCase(),
            deletedAt: null,
        });
        return count > 0;
    }
};
ManagersRepository = __decorate([
    Injectable(),
    __param(0, InjectModel(Manager.name)),
    __metadata("design:paramtypes", [Model])
], ManagersRepository);
export { ManagersRepository };
//# sourceMappingURL=managers.repository.js.map