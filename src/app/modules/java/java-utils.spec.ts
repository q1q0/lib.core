import { JavaUtils } from './java-utils';

describe('JavaUtil', () => {
  it('should create an instance', () => {
    expect(new JavaUtils()).toBeTruthy();
  });

  it('should convert true boolean to string', ()=>{
    expect(JavaUtils.booleanToString(true)).toBe('true');
    expect(JavaUtils.booleanToString(true)).not.toBe(true as any);
  });

  it('should convert false boolean to string', ()=>{
    expect(JavaUtils.booleanToString(false)).toBe('false');
    expect(JavaUtils.booleanToString(false)).not.toBe(false as any);
  });

  it('equals(1,1) should be true', ()=>{
    expect(JavaUtils.equals(1,1)).toBe(true);
  });

  it('equals(1,2) should be false', ()=>{
    expect(JavaUtils.equals(1,2)).toBe(false);
  });

  it('equals(obj1,obj1) should be true', ()=>{
    const d1 = new Date();
    expect(JavaUtils.equals(d1,d1)).toBe(true);
  });

  it('equals(obj1,obj2) where obj1 != obj2 should be false', ()=>{
    const d1 = new Date();
    const d2 = new Date();
    expect(JavaUtils.equals(d1,d2)).toBe(false);
  });

  it('parseBoolean should parse "true" boolean string into true boolean value', ()=>{
    expect(JavaUtils.parseBoolean('true')).toBe(true);
  });

  it('parseBoolean should parse "false" boolean string into false boolean value', ()=>{
    expect(JavaUtils.parseBoolean('false')).toBe(false);
  });

  it('parseBoolean should parse other string value into false boolean value', ()=>{
    expect(JavaUtils.parseBoolean('falsasdfasfe')).toBe(false);
  });

  it('parseBoolean should parse boolean as boolean', ()=>{
    expect(JavaUtils.parseBoolean(true)).toBe(true);
  });

  it('stringValue should convert number to string', ()=>{
    expect(JavaUtils.stringValue(123)).toBe('123');
  });

  it('stringValue should convert boolean to string', ()=>{
    expect(JavaUtils.stringValue(true)).toBe('true');
  });

  it('stringValue should return argument if it\'s a string', ()=> {
    expect(JavaUtils.stringValue("string")).toBe("string");
  });

  it('longValue should return null for null argument', ()=> {
    expect(JavaUtils.longValue(null)).toBe(null);
  });

  it('longValue should return number if it\'s a numeric string', ()=> {
    expect(JavaUtils.longValue("3")).toBe(3);
  });

  it('intValue should return null for null argument', ()=> {
    expect(JavaUtils.intValue(null)).toBe(null);
  });

  it('intValue should return number if it\'s a numeric string', ()=> {
    expect(JavaUtils.intValue("3")).toBe(3);
  });

  it('toString should return boolean string if argument is of boolean type', ()=> {
    expect(JavaUtils.toString(true)).toBe("true");
  });

  it('compareTo should return 0 for equal items', ()=> {
    expect(JavaUtils.compareTo("a", "a")).toBe(0);
  });

  it('compareTo should return 1 if first argument is greater than second', ()=> {
    expect(JavaUtils.compareTo("z", "a")).toBe(1);
  });

  it('compareTo should return -1 if first argument is less than second', ()=> {
    expect(JavaUtils.compareTo("a", "z")).toBe(-1);
  });

  it('bigDecimal should return the argument if it is numeric and scale is less than 0', ()=> {
    expect(JavaUtils.bigDecimal(3)).toBe(3);
  });

  it('bigDecimal should return parsed float if argument is numeric string and scale is less than 0', ()=> {
    expect(JavaUtils.bigDecimal("4.0")).toBe(4.0);
  });

  it('bigDecimal should return formatted number if scale is greater than 0', ()=> {
    expect(JavaUtils.bigDecimal("4.5", 2)).toBe(4.5);
  });
});
