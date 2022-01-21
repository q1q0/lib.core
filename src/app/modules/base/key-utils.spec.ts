import { KeyUtils } from './key-utils';

describe('KeyUtils', () => {
  it('should exec toMapKey correctly', () => {
    expect(KeyUtils.toMapKey('Hello_World')).toBe('hello_world');
  });

  it('should return null when null is passed to toMapKey', ()=> {
    expect(KeyUtils.toMapKey(null)).toBe(null);
  });

  it('should return string if string is passed toJsonValue', ()=> {
    expect(KeyUtils.toJsonValue("test")).toBe("test");
  });

  it('should return string number if number is passed to toJsonValue', ()=> {
    expect(KeyUtils.toJsonValue(3)).toBe("3");
  });

  it('should return string representation of boolean if boolean is passed to toJsonValue', ()=> {
    expect(KeyUtils.toJsonValue(true)).toBe("true");
  });
});
