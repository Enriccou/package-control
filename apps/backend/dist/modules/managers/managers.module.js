var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Manager, ManagerSchema } from './schemas/manager.schema.js';
import { ManagersController } from './managers.controller.js';
import { ManagersService } from './managers.service.js';
import { ManagersRepository } from './managers.repository.js';
import { CreateManagerHandler, UpdateManagerHandler, DeleteManagerHandler, } from './handlers/commands/index.js';
import { GetManagerHandler, ListManagersHandler, } from './handlers/queries/index.js';
const CommandHandlers = [
    CreateManagerHandler,
    UpdateManagerHandler,
    DeleteManagerHandler,
];
const QueryHandlers = [GetManagerHandler, ListManagersHandler];
let ManagersModule = class ManagersModule {
};
ManagersModule = __decorate([
    Module({
        imports: [
            CqrsModule,
            MongooseModule.forFeature([
                { name: Manager.name, schema: ManagerSchema },
            ]),
        ],
        controllers: [ManagersController],
        providers: [
            ManagersService,
            ManagersRepository,
            ...CommandHandlers,
            ...QueryHandlers,
        ],
        exports: [ManagersService],
    })
], ManagersModule);
export { ManagersModule };
//# sourceMappingURL=managers.module.js.map