var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ResidentsRepository } from './residents.repository.js';
let ResidentsService = class ResidentsService {
    residentsRepository;
    constructor(residentsRepository) {
        this.residentsRepository = residentsRepository;
    }
    async create(createResidentDto) {
        return this.residentsRepository.create(createResidentDto);
    }
    async findAll(skip = 0, limit = 10) {
        return this.residentsRepository.findAll(skip, limit);
    }
    async findById(id) {
        return this.residentsRepository.findById(id);
    }
    async findByEmail(email) {
        return this.residentsRepository.findByEmail(email);
    }
    async findByPropertyId(propertyId) {
        return this.residentsRepository.findByPropertyId(propertyId);
    }
    async update(id, updateResidentDto) {
        return this.residentsRepository.update(id, updateResidentDto);
    }
    async delete(id) {
        return this.residentsRepository.delete(id);
    }
};
ResidentsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ResidentsRepository])
], ResidentsService);
export { ResidentsService };
//# sourceMappingURL=residents.service.js.map