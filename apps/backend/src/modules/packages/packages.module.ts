import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageSchema } from './schemas/package.schema.js';
import { PackagesController } from './packages.controller.js';
import { PackagesService } from './packages.service.js';
import { PackagesRepository } from './packages.repository.js';
import {
  CreatePackageHandler,
  UpdatePackageHandler,
  PickupPackageHandler,
  DeletePackageHandler,
  ConfirmNotificationHandler,
} from './handlers/commands/index.js';
import {
  GetPackageHandler,
  ListPackagesHandler,
  ListResidentPackagesHandler,
} from './handlers/queries/index.js';

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

@Module({
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
export class PackagesModule {}
