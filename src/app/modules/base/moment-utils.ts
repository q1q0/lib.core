import * as momentImported from 'moment-timezone';

// Need to do this to prevent packagr namespace error
// https://github.com/ng-packagr/ng-packagr/issues/217
const moment = momentImported;

/**
 * Simple util to parse moment into proper zone (if needed)
 */
// @dynamic -- this line comment is necessary to prevent packagr error
export class MomentUtils {
  static timeZone: string;

  static moment(dateString: string, format?: string): momentImported.Moment {
    if (format != null && format != '') {
      if (MomentUtils.timeZone != null && MomentUtils.timeZone != '') {
        return moment.tz(dateString, format, MomentUtils.timeZone);
      }

      return moment(dateString, format);
    } else {
      if (MomentUtils.timeZone != null && MomentUtils.timeZone != '') {
        return moment.tz(dateString, MomentUtils.timeZone);
      }

      return moment(dateString);
    }
  }
}
