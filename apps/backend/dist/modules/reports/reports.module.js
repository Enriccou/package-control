var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageSchema } from '../packages/schemas/package.schema.js';
import { ReportsController } from './reports.controller.js';
import { ReportsService } from './reports.service.js';
import { GetPendingPackagesHandler, GetFailedNotificationsHandler, } from './handlers/queries/index.js';
const QueryHandlers = [
    GetPendingPackagesHandler,
    GetFailedNotificationsHandler,
];
let ReportsModule = class ReportsModule {
};
ReportsModule = __decorate([
    Module({
        imports: [
            CqrsModule,
            MongooseModule.forFeature([{ name: Package.name, schema: PackageSchema }]),
        ],
        controllers: [ReportsController],
        providers: [ReportsService, ...QueryHandlers],
    })
], ReportsModule);
export { ReportsModule };
//# sourceMappingURL=reports.module.js.map