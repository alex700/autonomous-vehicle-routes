import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import * as lineStreamUtil from 'line-stream-util';
import * as mime from 'mime-types';
import { EventNormalizer } from './event-normalizer';
import { VehicleEventService } from '../vehicle-event.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsEntity } from '../entities/events.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventSourceService {
  constructor(
    @Inject('EVENT_SERVICE')
    private vehicleEventService: VehicleEventService,
    @InjectRepository(EventsEntity)
    private entityRepository: Repository<EventsEntity>,
    private eventEmitter: EventEmitter2,
  ) {}

  /**
   * Validate MIME type of the file
   * @param filePath
   */
  validate(filePath) {
    if (mime.lookup(filePath) !== 'text/csv') {
      throw Error('Error: Unsupported source type.');
    }
    return this;
  }

  /**
   * Extract rows to trigger driving async event
   * @param filePath
   */
  async extract(filePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const rows = [];
      fs.createReadStream(filePath)
        .pipe(lineStreamUtil.split())
        .pipe(parse())
        .on('data', (data) => {
          rows.push(
            new EventNormalizer(
              data[0],
              data[1],
              data[2],
              data[3],
              data[4],
              data[5],
            ).normalize(),
          );
        })
        .on('end', () => {
          return Promise.all(rows.map((row) => this.dispatchRow(row)))
            .then(() => {
              resolve(true);
            })
            .catch((e) => {
              console.error(e);
              reject();
            });
        })
        .on('error', (e) => {
          console.error(e);
          reject();
        });
    });
  }

  private async dispatchRow(row): Promise<void> {
    try {
      await this.eventEmitter.emitAsync('vehicle-event.received.after', row);
    } catch (e) {
      console.error(e.message);
    }
  }
}
