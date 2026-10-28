import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { Resident, ResidentSchema } from './schemas/resident.schema.js';
import { ResidentsController } from './residents.controller.js';
import { ResidentsService } from './residents.service.js';
import { ResidentsRepository } from './residents.repository.js';
import {
  CreateResidentHandler,
  UpdateResidentHandler,
  DeleteResidentHandler,
} from './handlers/commands/index.js';
import {
  GetResidentHandler,
  ListResidentsHandler,
} from './handlers/queries/index.js';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Resident.name, schema: ResidentSchema }]),
  ],
  controllers: [ResidentsController],
  providers: [
    ResidentsService,
    ResidentsRepository,
    // Commands
    CreateResidentHandler,
    UpdateResidentHandler,
    DeleteResidentHandler,
    // Queries
    GetResidentHandler,
    ListResidentsHandler,
  ],
})
export class ResidentsModule {}
