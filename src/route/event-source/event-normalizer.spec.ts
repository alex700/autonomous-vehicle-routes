import { EventNormalizer } from './event-normalizer';

const fixture = {
  drive: {
    event_name: 'DRIVE',
    vehicle_id: 'E001',
    vehicle_title: 'Ford Diesel',
    zipcode: '90036',
    date: new Date('2020-01-01'),
    quantity: 1000,
  },
  service: {
    event_name: 'SERVICE',
    vehicle_id: 'E001',
    vehicle_title: 'Ford Diesel',
    zipcode: '90036',
    date: new Date('2021-01-01'),
    quantity: 700,
  },
};

describe('EventNormalizer', () => {
  it('should return normalize data with positive quantity for DRIVE event', () => {
    const normalizedEvent = new EventNormalizer(
      fixture.drive.event_name,
      fixture.drive.vehicle_id,
      fixture.drive.vehicle_title,
      fixture.drive.zipcode,
      fixture.drive.date,
      fixture.drive.quantity,
    ).normalize();
    expect(normalizedEvent).toEqual({
      event_name: fixture.drive.event_name,
      vehicle_id: fixture.drive.vehicle_id,
      vehicle_title: fixture.drive.vehicle_title,
      zipcode: fixture.drive.zipcode,
      date: new Date(fixture.drive.date),
      quantity: 1000,
    });
  });

  it('should return normalize data with negative quantity for SERVICE event', () => {
    const normalizedEvent = new EventNormalizer(
      fixture.service.event_name,
      fixture.service.vehicle_id,
      fixture.service.vehicle_title,
      fixture.service.zipcode,
      fixture.service.date,
      fixture.service.quantity,
    ).normalize();
    expect(normalizedEvent).toEqual({
      event_name: fixture.service.event_name,
      vehicle_id: fixture.service.vehicle_id,
      vehicle_title: fixture.service.vehicle_title,
      zipcode: fixture.service.zipcode,
      date: new Date(fixture.service.date),
      quantity: fixture.service.quantity * -1,
    });
  });
});
