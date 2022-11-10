import { IsNumber, IsString } from 'class-validator';

export class EventSummaryDto {
  @IsString()
  vehicle_id: string;

  @IsString()
  vehicle_title: string;

  @IsString()
  zipcode: string;

  @IsNumber()
  quantity: number;
}
