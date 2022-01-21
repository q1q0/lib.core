import * as _ from 'lodash';
import * as moment from 'moment';
import { IllegalArgumentException } from './illegal-argument-exception';

export class JavaUtils {
  static readonly NUMERIC = new RegExp("^[0-9]+$");

  static isNumber(str: string): boolean {
    return str == null ? false : JavaUtils.NUMERIC.test(str);
  }

  static booleanToString(boo: boolean): string {
    if (boo === true) {
      return 'true';
    }

    return 'false';
  }

  static equals(a: any, b: any) {
    return a == b;
  }

  static parseBoolean(val: any) {
    if (typeof val === 'boolean') {
      return val;
    } else if (typeof val === 'string') {
      return val === 'true' ? true : false;
    } else {
      throw new Error('Unsupport boolean value: ' + val);
    }
  }

  static stringValue(val: any) {
    if (typeof val === 'string') {
      return val;
    }

    return val + '';
  }

  static longValue(str: any) {
    if (str != null) {
      return _.parseInt(str);
    }

    return null;
  }

  static doubleValue(str: string) {
    if (str != null) {
      str = str.replace(/,/g,"");
      let result :number = str.indexOf(".") >= 0 ? parseFloat(str) : _.parseInt(str);

      if (isNaN(result)){
        throw new IllegalArgumentException;
      }
      return result;
    }
    return null;
  }

  static intValue(str: any) {
    if (str != null) {
      return _.parseInt(str);
    }

    return null;
  }

  static toString(val: any) {
    if (typeof val === 'number') {
      return val + '';
    } else if (typeof val === 'boolean') {
      return JavaUtils.booleanToString(val);
    }
  }

  static compareTo(a: string, b: string): number {
    let retVal = null;

    if (a === b) {
      retVal = 0;
    } else if (a > b) {
      retVal = 1;
    } else {
      retVal = -1;
    }

    return retVal;
  }

  static bigDecimal(val: number | string, scale: number = 0, roundingMode: number = -1) {
    //for now, just retrn the number
    const fixedValue = typeof val === 'number' ? val : parseFloat(val);

    if (scale > 0) {
      return parseFloat(`${fixedValue}.${_.padStart('', scale, '0')}`);
    } else {
      return fixedValue;
    }
  }

  static signum(num: number): number {
    return num === 0 ? 0 : num > 0 ? 1 : -1;
  }

  static floatValue(str: string): number {
    return parseFloat(str);
  }

  static lessThan(a: any, b: any): boolean {
    if (moment.isMoment(a) && moment.isMoment(b)) {
      return (a as moment.Moment).isBefore(b);
    }

    return a < b;
  }
}
