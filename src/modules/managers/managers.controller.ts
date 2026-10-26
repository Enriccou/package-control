import { Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../auth/guards/jwt.guard.js';
import { CreateManagerDto } from './dtos/create-manager.dto.js';
import { UpdateManagerDto } from './dtos/update-manager.dto.js';
import { CreateManagerCommand } from './commands/impl/create-manager.command.js';
import { UpdateManagerCommand } from './commands/impl/update-manager.command.js';
import { DeleteManagerCommand } from './commands/impl/delete-manager.command.js';
import { GetManagerQuery } from './queries/impl/get-manager.query.js';
import { ListManagersQuery } from './queries/impl/list-managers.query.js';

@UseGuards(JwtAuthGuard)
@Controller('managers')
export class ManagersController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createManagerDto: CreateManagerDto) {
    return this.commandBus.execute(new CreateManagerCommand(createManagerDto));
  }

  @Get()
  async findAll(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return this.queryBus.execute(new ListManagersQuery(skip, limit));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetManagerQuery(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateManagerDto: UpdateManagerDto,
  ) {
    return this.commandBus.execute(
      new UpdateManagerCommand(id, updateManagerDto),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteManagerCommand(id));
  }
}
