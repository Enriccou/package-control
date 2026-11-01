import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageSchema } from '../packages/schemas/package.schema.js';
import { ReportsController } from './reports.controller.js';
import { ReportsService } from './reports.service.js';
import {
  GetPendingPackagesHandler,
  GetFailedNotificationsHandler,
} from './handlers/queries/index.js';

const QueryHandlers = [
  GetPendingPackagesHandler,
  GetFailedNotificationsHandler,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Package.name, schema: PackageSchema }]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, ...QueryHandlers],
})
export class ReportsModule {}
