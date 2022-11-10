import { Test, TestingModule } from '@nestjs/testing';
import { VehicleEventService } from './vehicle-event.service';
import { EventsEntity } from './entities/events.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventNormalizer } from './event-source/event-normalizer';

const eventsFixture = {
  payload: [
    {
      event_name: 'DRIVE',
      vehicle_id: 'E001',
      vehicle_title: 'Ford Diesel',
      zipcode: '90274',
      date: new Date('2020-01-01'),
      quantity: 1000,
    },
    {
      event_name: 'SERVICE',
      vehicle_id: 'E001',
      vehicle_title: 'Ford Diesel',
      zipcode: '90274',
      date: new Date('2021-01-01'),
      quantity: 700,
    },
    {
      event_name: 'DRIVE',
      vehicle_id: 'E002',
      vehicle_title: 'Volvo Electric',
      zipcode: '90036',
      date: new Date('2020-01-01'),
      quantity: 234,
    },
  ],
  expected: [
    {
      vehicle_id: 'E001',
      vehicle_title: 'Ford Diesel',
      zipcode: '90274',
      quantity: 300,
    },
    {
      vehicle_id: 'E002',
      vehicle_title: 'Volvo Electric',
      zipcode: '90036',
      quantity: 234,
    },
  ],
};

describe('VehicleEventService', () => {
  let service: VehicleEventService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([EventsEntity]),
        EventEmitterModule.forRoot({
          wildcard: true,
          delimiter: '.',
        }),
      ],
      providers: [VehicleEventService],
    }).compile();
    service = module.get<VehicleEventService>(VehicleEventService);
    for (const entity of eventsFixture.payload) {
      await service.create(
        new EventNormalizer(
          entity.event_name,
          entity.vehicle_id,
          entity.vehicle_title,
          entity.zipcode,
          entity.date,
          entity.quantity,
        ).normalize(),
      );
    }
  });

  it('should return two records on 2021-01-01', async () => {
    return await service.totalBefore(new Date('2021-01-01')).then((summary) => {
      expect(new Set(summary)).toEqual(new Set(eventsFixture.expected));
    });
  });
});
