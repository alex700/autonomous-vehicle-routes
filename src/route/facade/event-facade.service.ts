import { Inject, Injectable } from '@nestjs/common';
import { EventSourceService } from '../event-source/event-source.service';

/**
 * Facade to extract data from the route source
 */
@Injectable()
export class EventFacadeService {
  constructor(
    @Inject('EVENT_SOURCE') private eventSourceService: EventSourceService,
  ) {}

  /**
   * Read driving events
   * @param filePath
   */
  async fill(filePath: string) {
    return this.eventSourceService.validate(filePath).extract(filePath);
  }
}
