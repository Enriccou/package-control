import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../auth/guards/jwt.guard.js';
import {
  GetPendingPackagesQuery,
  GetFailedNotificationsQuery,
} from './queries/index.js';
import { ReportsService } from './reports.service.js';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(
    private queryBus: QueryBus,
    private reportsService: ReportsService,
  ) {}

  @Get('packages/pending')
  async getPendingPackages(@Query('days') days: number = 7) {
    return this.queryBus.execute(new GetPendingPackagesQuery(days));
  }

  @Get('packages/failed-notifications')
  async getFailedNotifications(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return this.queryBus.execute(
      new GetFailedNotificationsQuery(skip, limit),
    );
  }

  @Get('statistics')
  async getStatistics() {
    return this.reportsService.getStatistics();
  }
}
