import { Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../auth/guards/jwt.guard.js';
import { CreateResidentDto } from './dtos/create-resident.dto.js';
import { UpdateResidentDto } from './dtos/update-resident.dto.js';
import { CreateResidentCommand } from './commands/impl/create-resident.command.js';
import { UpdateResidentCommand } from './commands/impl/update-resident.command.js';
import { DeleteResidentCommand } from './commands/impl/delete-resident.command.js';
import { GetResidentQuery } from './queries/impl/get-resident.query.js';
import { ListResidentsQuery } from './queries/impl/list-residents.query.js';

@UseGuards(JwtAuthGuard)
@Controller('residents')
export class ResidentsController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createResidentDto: CreateResidentDto) {
    return this.commandBus.execute(new CreateResidentCommand(createResidentDto));
  }

  @Get()
  async findAll(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return this.queryBus.execute(new ListResidentsQuery(skip, limit));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetResidentQuery(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateResidentDto: UpdateResidentDto,
  ) {
    return this.commandBus.execute(
      new UpdateResidentCommand(id, updateResidentDto),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteResidentCommand(id));
  }
}
