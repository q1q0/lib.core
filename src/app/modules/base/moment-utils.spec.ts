import { MomentUtils } from './moment-utils';

describe('MomentUtils', () => {
  it('should parse date with format correctly', () => {
    expect(MomentUtils.moment('01/25/1998', 'MM/DD/YYYY').isValid()).toBe(true);
    expect(MomentUtils.moment('01/25/1998', 'MM/DD/YYYY').format('YYYY-MM-DD')).toBe('1998-01-25');
  });
});
