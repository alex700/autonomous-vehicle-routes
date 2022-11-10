import { EventDto } from '../dto/events.dto';
import { Event } from '../entities/events.entity';

/**
 * Normalize data for EventDto
 */
export class EventNormalizer {
  constructor(
    private event_name: string,
    private vehicle_id: string,
    private vehicle_title: string,
    private zipcode: string,
    private date: Date,
    private quantity: number,
  ) {}

  normalize(): EventDto {
    let quantity = this.quantity || 0;
    if (this.event_name === Event.SERVICE) {
      quantity *= -1;
    }
    return {
      event_name: this.event_name,
      vehicle_id: this.vehicle_id,
      vehicle_title: this.vehicle_title,
      zipcode: this.zipcode,
      date: new Date(this.date),
      quantity: quantity,
    };
  }
}
