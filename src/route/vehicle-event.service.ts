import { Injectable } from '@nestjs/common';
import { EventDto } from './dto/events.dto';
import { EventsEntity } from './entities/events.entity';
import { Repository, EntityManager } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EventSummaryDto } from './dto/event-summary.dto';

@Injectable()
export class VehicleEventService {
  constructor(
    @InjectRepository(EventsEntity)
    private entityRepository: Repository<EventsEntity>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async create(entity: EventDto): Promise<EventDto> {
    return this.entityRepository.save(entity);
  }

  async totalBefore(date: Date): Promise<EventSummaryDto[]> {
    return this.entityManager
      .createQueryBuilder()
      .select([
        'vehicles.vehicle_id as vehicle_id',
        'vehicles.vehicle_title as vehicle_title',
        'vehicles.zipcode as zipcode',
        'SUM(events.quantity) as quantity',
      ])
      .from(EventsEntity, 'vehicles')
      .leftJoin(
        EventsEntity,
        'events',
        'vehicles.id = events.id and events.date <= :date',
        { date: date.toISOString() },
      )
      .groupBy('vehicles.vehicle_id')
      .addGroupBy('vehicles.zipcode')
      .orderBy('vehicles.vehicle_id')
      .addOrderBy('vehicles.zipcode')
      .getRawMany();
  }
}
