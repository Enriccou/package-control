import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ManagersModule } from './modules/managers/managers.module.js';
import { AuthModule } from './modules/auth/auth.module.js';

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
    // Módulos
    ManagersModule,
    AuthModule,
    // Adicione outros módulos aqui: ResidentsModule, etc
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
