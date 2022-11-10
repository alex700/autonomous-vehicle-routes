import { IsString } from 'class-validator';

export class EventDto {
  @IsString()
  event_name: string;

  @IsString()
  vehicle_id: string;

  @IsString()
  vehicle_title: string;

  @IsString()
  zipcode: string;

  @IsString()
  date: Date;

  @IsString()
  quantity: number;
}
