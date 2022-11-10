import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum Event {
  DRIVE = 'DRIVE',
  SERVICE = 'SERVICE',
}

@Entity()
export class EventsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({
    type: 'simple-enum',
    enum: Event,
    default: Event.DRIVE,
    nullable: false,
  })
  event_name: string;

  @Column({ nullable: false })
  vehicle_id: string;

  @Column({ nullable: true })
  vehicle_title: string;

  @Column({ nullable: true })
  zipcode: string;

  @Column({ nullable: true })
  date: Date;

  @Column('integer', {
    nullable: false,
    default: 0,
  })
  quantity: number;
}
