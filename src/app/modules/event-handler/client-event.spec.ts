import { ClientEvent } from './client-event';
import { BaseComponent } from '../base/base.component';

describe('ClientEvent', () => {
  it('should create an instance', () => {
    expect(new ClientEvent(null, null)).toBeTruthy();
  });

  it('should set source', () => {
    const source = new BaseComponent(null, null, null, null);
    const clientEvent= new ClientEvent(source, null);
    expect(clientEvent.getSource()).toBe(source);
  });


  it('should set event', () => {
    const event = new FocusEvent(null);
    const clientEvent= new ClientEvent(null, event);
    expect(clientEvent.getEvent()).toBe(event);
  });

  it('should set/get parameter should set parameter', () => {
    const clientEvent= new ClientEvent(null, null);
    const val = Date.now();
    clientEvent.setParameter('Hello_World', val);
    expect(clientEvent.getParameter('hello_world')).toBe(val);
  });

  it('should set parameter should NOT set attribute', () => {
    const clientEvent= new ClientEvent(null, null);
    const val = Date.now();
    clientEvent.setParameter('Hello_World', val);
    expect(clientEvent.getAttribute('hello_world')).toBeUndefined();
  });

  it('should set/get attribute should set attribute', () => {
    const clientEvent= new ClientEvent(null, null);
    const val = Date.now();
    clientEvent.setAttribute('Hello_World', val);
    expect(clientEvent.getAttribute('hello_world')).toBe(val);
    expect(clientEvent.getParameter('hello_world')).toBeUndefined();
  });

  it('should set attribute should not set parameter', () => {
    const clientEvent= new ClientEvent(null, null);
    const val = Date.now();
    clientEvent.setAttribute('Hello_World', val);
    expect(clientEvent.getParameter('hello_world')).toBeUndefined();
  });

  it('should set returned value', ()=>{
    const clientEvent= new ClientEvent(null, null);
    const val = Date.now();
    clientEvent.setReturnValue(val);
    expect(clientEvent.getReturnValue()).toBe(val);
  });

  it('should set return flag to true when returned value is set', ()=>{
    const clientEvent= new ClientEvent(null, null);
    clientEvent.setReturnValue(null);
    expect(clientEvent.isReturnValueSet()).toBeTruthy();
  });

  it('should NOT set return flag to true when returned value is NOT set', ()=>{
    const clientEvent= new ClientEvent(null, null);
    expect(clientEvent.isReturnValueSet()).toBeFalsy();
  });
});
