import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../auth/guards/jwt.guard.js';
import { CreatePackageDto } from './dtos/create-package.dto.js';
import { UpdatePackageDto } from './dtos/update-package.dto.js';
import {
  CreatePackageCommand,
  UpdatePackageCommand,
  PickupPackageCommand,
  DeletePackageCommand,
  ConfirmNotificationCommand,
} from './commands/index.js';
import {
  GetPackageQuery,
  ListPackagesQuery,
  ListResidentPackagesQuery,
} from './queries/index.js';
import { PackagesService } from './packages.service.js';

@UseGuards(JwtAuthGuard)
@Controller('packages')
export class PackagesController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private packagesService: PackagesService,
  ) {}

  @Post()
  async create(@Body() createPackageDto: CreatePackageDto) {
    return this.commandBus.execute(new CreatePackageCommand(createPackageDto));
  }

  @Get()
  async findAll(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return this.queryBus.execute(new ListPackagesQuery(skip, limit));
  }

  @Get('resident/:residentId')
  async findByResident(
    @Param('residentId') residentId: string,
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return this.queryBus.execute(
      new ListResidentPackagesQuery(residentId, skip, limit),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetPackageQuery(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ) {
    return this.commandBus.execute(
      new UpdatePackageCommand(id, updatePackageDto),
    );
  }

  @Put(':id/pickup')
  async markAsPickedUp(@Param('id') id: string) {
    return this.commandBus.execute(new PickupPackageCommand(id));
  }

  @Put(':id/confirm-notification')
  async confirmNotification(@Param('id') id: string) {
    return this.commandBus.execute(new ConfirmNotificationCommand(id));
  }

  @Get(':id/whatsapp-link')
  async getWhatsAppLink(
    @Param('id') id: string,
    @Query('phone') phone: string,
  ) {
    const link = await this.packagesService.getWhatsAppLink(id, phone);
    return { url: link };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commandBus.execute(new DeletePackageCommand(id));
  }
}
