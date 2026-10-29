import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { ManagersModule } from './modules/managers/managers.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { ResidentsModule } from './modules/residents/residents.module.js';
import { PackagesModule } from './modules/packages/packages.module.js';
import { ReportsModule } from './modules/reports/reports.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/package-system',
    ),
    CqrsModule,
    ManagersModule,
    AuthModule,
    ResidentsModule,
    PackagesModule,
    ReportsModule,
  ],
})
export class AppModule {}
