import { Injectable } from '@nestjs/common';
import { EventSummaryDto } from '../dto/event-summary.dto';

/**
 * Event summary formatter
 */
@Injectable()
export class FormatHelper {
  /**
   * Converts EventSummaryDto object into comma delimited string.
   * @param eventData
   */
  toString(eventData: EventSummaryDto): string | void {
    const originalQty = eventData.quantity || 0;
    const qty = Number(originalQty);
    const renderData = {
      quantity: qty < 0 ? 0 : qty,
    };
    const merged = Object.assign({}, eventData, renderData);
    return Object.values(merged).join(',');
  }
}
