var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { Resident, ResidentSchema } from './schemas/resident.schema.js';
import { ResidentsController } from './residents.controller.js';
import { ResidentsService } from './residents.service.js';
import { ResidentsRepository } from './residents.repository.js';
import { CreateResidentHandler, UpdateResidentHandler, DeleteResidentHandler, } from './handlers/commands/index.js';
import { GetResidentHandler, ListResidentsHandler, } from './handlers/queries/index.js';
let ResidentsModule = class ResidentsModule {
};
ResidentsModule = __decorate([
    Module({
        imports: [
            CqrsModule,
            MongooseModule.forFeature([{ name: Resident.name, schema: ResidentSchema }]),
        ],
        controllers: [ResidentsController],
        providers: [
            ResidentsService,
            ResidentsRepository,
            CreateResidentHandler,
            UpdateResidentHandler,
            DeleteResidentHandler,
            GetResidentHandler,
            ListResidentsHandler,
        ],
    })
], ResidentsModule);
export { ResidentsModule };
//# sourceMappingURL=residents.module.js.map