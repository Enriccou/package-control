import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

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
    // Importar módulos aqui quando implementar
    // Ex: ManagersModule, AuthModule, ResidentsModule, etc
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
