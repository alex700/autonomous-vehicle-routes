import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEventCommand } from './vehicle-event.command';
import { EventSourceService } from './event-source/event-source.service';
import { EventsEntity } from './entities/events.entity';
import { EventFacadeService } from './facade/event-facade.service';
import { VehicleEventService } from './vehicle-event.service';
import { VehicleEventListener } from './listeners/vehicle-event.listener';
import { FormatHelper } from './helper/format.helper';

@Module({
  imports: [TypeOrmModule.forFeature([EventsEntity])],
  providers: [
    VehicleEventCommand,
    {
      provide: 'EVENT_SOURCE',
      useClass: EventSourceService,
    },
    {
      provide: 'EVENT_FACADE',
      useClass: EventFacadeService,
    },
    {
      provide: 'EVENT_SERVICE',
      useClass: VehicleEventService,
    },
    VehicleEventListener,
    FormatHelper,
  ],
})
export class VehicleEventModule {}
