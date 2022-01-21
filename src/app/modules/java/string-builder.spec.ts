import { StringBuilder } from './string-builder';

describe('StringBuilder', () => {
  it('should create an instance', () => {
    expect(new StringBuilder()).toBeTruthy();
  });

  it('should append multiple string value', ()=>{
    const sb = new StringBuilder();
    sb.append('hello');
    sb.append(' ');
    sb.append('world');

    expect(sb.toString()).toBe('hello world');
  });

  it('should return indexOf', ()=>{
    const sb = new StringBuilder();
    sb.append('hello');
    sb.append(' ');
    sb.append('world');

    expect(sb.indexOf("o")).toEqual(4);
  });

  it('should replace string', ()=>{
    const sb = new StringBuilder();
    sb.append('hello');
    sb.append(' ');
    sb.append('world');

    sb.replace(0, 5, "goodbye");
    expect(sb.toString()).toEqual("goodbye world");
  });
});
