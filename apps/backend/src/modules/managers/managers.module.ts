import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Manager, ManagerSchema } from './schemas/manager.schema.js';
import { ManagersController } from './managers.controller.js';
import { ManagersService } from './managers.service.js';
import { ManagersRepository } from './managers.repository.js';
import {
  CreateManagerHandler,
  UpdateManagerHandler,
  DeleteManagerHandler,
} from './handlers/commands/index.js';
import {
  GetManagerHandler,
  ListManagersHandler,
} from './handlers/queries/index.js';

const CommandHandlers = [
  CreateManagerHandler,
  UpdateManagerHandler,
  DeleteManagerHandler,
];

const QueryHandlers = [GetManagerHandler, ListManagersHandler];

@Module({
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
export class ManagersModule {}
