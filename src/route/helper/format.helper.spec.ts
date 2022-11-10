import { FormatHelper } from './format.helper';

describe('HelperService', () => {
  const eventSummaryFixture = {
    regular: {
      vehicle_id: 'E001',
      vehicle_title: 'Ford Diesel',
      zipcode: '90036',
      quantity: 300,
    },
    negative: {
      vehicle_id: 'E001',
      vehicle_title: 'Ford Diesel',
      zipcode: '90036',
      quantity: -300,
    },
  };

  it('should return comma delimited EventSummaryDto', () => {
    const formattedSummary = new FormatHelper().toString(
      eventSummaryFixture.regular,
    );
    expect(formattedSummary).toBe('E001,Ford Diesel,90036,300');
  });

  it('should reset to zero negative quantity', () => {
    const formattedSummary = new FormatHelper().toString(
      eventSummaryFixture.negative,
    );
    expect(formattedSummary).toBe('E001,Ford Diesel,90036,0');
  });
});
