var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageSchema } from './schemas/package.schema.js';
import { PackagesController } from './packages.controller.js';
import { PackagesService } from './packages.service.js';
import { PackagesRepository } from './packages.repository.js';
import { CreatePackageHandler, UpdatePackageHandler, PickupPackageHandler, DeletePackageHandler, ConfirmNotificationHandler, } from './handlers/commands/index.js';
import { GetPackageHandler, ListPackagesHandler, ListResidentPackagesHandler, } from './handlers/queries/index.js';
const CommandHandlers = [
    CreatePackageHandler,
    UpdatePackageHandler,
    PickupPackageHandler,
    DeletePackageHandler,
    ConfirmNotificationHandler,
];
const QueryHandlers = [
    GetPackageHandler,
    ListPackagesHandler,
    ListResidentPackagesHandler,
];
let PackagesModule = class PackagesModule {
};
PackagesModule = __decorate([
    Module({
        imports: [
            CqrsModule,
            MongooseModule.forFeature([{ name: Package.name, schema: PackageSchema }]),
        ],
        controllers: [PackagesController],
        providers: [
            PackagesService,
            PackagesRepository,
            ...CommandHandlers,
            ...QueryHandlers,
        ],
        exports: [PackagesService],
    })
], PackagesModule);
export { PackagesModule };
//# sourceMappingURL=packages.module.js.map