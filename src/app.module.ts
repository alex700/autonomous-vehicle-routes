import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { VehicleEventModule } from './route/vehicle-event.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    CommandModule,
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    VehicleEventModule,
  ],
})
export class AppModule {}
