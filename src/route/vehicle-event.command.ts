import { Command, Positional } from 'nestjs-command';
import { Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import { EventFacadeService } from './facade/event-facade.service';
import { VehicleEventService } from './vehicle-event.service';
import { FormatHelper } from './helper/format.helper';

@Injectable()
export class VehicleEventCommand {
  constructor(
    @Inject('EVENT_FACADE') private eventFacade: EventFacadeService,
    @Inject('EVENT_SERVICE') private vehicleEventService: VehicleEventService,
    private formatHelper: FormatHelper,
  ) {}

  @Command({
    command: 'route:events <filename> <date> [scale]',
    describe:
      'List events that indicate how many times a vehicle visited a region on each date',
  })
  async run(
    @Positional({
      name: 'filename',
      describe: 'the filename',
      type: 'string',
    })
    filename: string,
    @Positional({
      name: 'date',
      describe: 'Event date',
      type: 'string',
    })
    date: string,
  ) {
    const sanitizedFilename = VehicleEventCommand.sanitize(filename);
    if (sanitizedFilename != filename) {
      console.warn(
        `Please validate filename. "${sanitizedFilename}" used instead.`,
      );
    }
    const filePath = path.join(process.cwd(), sanitizedFilename);
    await this.eventFacade.fill(filePath).then(async () => {
      const records = await this.vehicleEventService.totalBefore(
        new Date(date),
      );
      records.forEach((row) => {
        console.log(this.formatHelper.toString(row));
      });
    });
  }

  /**
   * Sanitize filepath
   * @param input
   * @private
   */
  private static sanitize(input): string {
    const illegalRe = /[\/\?<>\\:\*\|":]/g;
    const controlRe = /[\x00-\x1f\x80-\x9f]/g;
    const reservedRe = /\.\.+/;
    const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    const replacement = '';
    return input
      .replace(illegalRe, replacement)
      .replace(controlRe, replacement)
      .replace(reservedRe, replacement)
      .replace(windowsReservedRe, replacement);
  }
}
