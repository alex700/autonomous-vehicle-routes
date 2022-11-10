import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { VehicleEventService } from '../vehicle-event.service';
import { EventDto } from '../dto/events.dto';

/**
 * Driving events listener
 */
@Injectable()
export class VehicleEventListener {
  constructor(
    @Inject('EVENT_SERVICE')
    private vehicleEventService: VehicleEventService,
  ) {}
  @OnEvent('vehicle-event.received.after')
  async listenToEvent(data: EventDto) {
    await this.vehicleEventService.create(data);
  }
}
