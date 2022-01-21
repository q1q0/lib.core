import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponent } from './base.component';
import { SessionService } from '../session/session.service';
import { McoContainerService } from '../mco-container/mco-container.service';
import { EventHandlerService } from '../event-handler/event-handler.service';
import { AttributesEnum } from './attributes.enum';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseComponent ],
      providers: [
        SessionService,
        McoContainerService,
        EventHandlerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set text correctly', ()=>{
    component.setText('Hello world');
    expect(component.getText()).toEqual('Hello world');
  });

  it('should setAttribute TEXT correctly', ()=>{
    component.setAttribute(AttributesEnum.TEXT, 'Hello world 2');
    expect(component.getText()).toEqual('Hello world 2');
  });

  it('should support setAttribute(ON_COMMAND)', ()=>{
    const goodByeWorld = 'Good bye world!';
    let val: string;

    const fn = ()=>{
      val = goodByeWorld;
    }

    component.setAttribute(AttributesEnum.ON_COMMAND, ()=>{
      fn();
    });

    (component as any)._internalOnCommand();

    expect(val).toBe(goodByeWorld);
  });

  it('should support setting of custom attribute', ()=>{
    const val = Date.now();
    const attributeName = 'whatever_man';

    component.setAttribute(attributeName, val);
    expect(component.getAttribute(attributeName)).toEqual(val + '');
  });

  it('should convert to Json correctly', ()=>{
    const val = Date.now();
    const attributeName = 'whatever_man';

    component.setAttribute(attributeName, val);
    component.id = 'test-123';
    component.text = 'Hello world';
    component.disabled = true;
    component.visible = true;
    component.cssClass = 'css-1 css2';

    const json: any = component.toJson();
    expect(json.id).toEqual('test-123');
    expect(json.text).toEqual('Hello world');
    expect(json.disabled).toEqual("true");
    expect(json.enabled).toEqual("false");
    expect(json.visible).toEqual("true");
    expect(json.cssClass).toEqual('css-1 css2');
    expect(json.customAttributes.whatever_man).toEqual(val + '');
  });

  it('text decoration should be set to underline', ()=>{
    component.fontUnderline = true;
    component.setFontUnderline(true);
    fixture.detectChanges();
    expect(component.styles["text-decoration"]).toBe("underline");
  });

  //PATTERN
  it("setAttribute should support PATTERN attribute enum", ()=>{
    const expectedValue = "some-pattern";
    component.setAttribute(AttributesEnum.PATTERN, expectedValue);
    expect(component.getAttribute(AttributesEnum.PATTERN)).toBe(expectedValue);
  });

  it("setAttribute should support 'pattern' literal", ()=>{
    const expectedValue = "some-pattern";
    component.setAttribute("pattern", expectedValue);
    expect(component.getAttribute("pattern")).toBe(expectedValue);
  });

  it("removeAttribute should support 'pattern' literal", ()=>{
    const expectedValue = "some-pattern";
    component.setAttribute("pattern", expectedValue);
    component.removeAttribute("pattern");
    expect(component.getAttribute("pattern")).toBeUndefined();
  });

  it("removeAttribute should support PATTERN enum", ()=>{
    const expectedValue = "some-pattern";
    component.setAttribute(AttributesEnum.PATTERN, expectedValue);
    component.removeAttribute(AttributesEnum.PATTERN);
    expect(component.getAttribute(AttributesEnum.PATTERN)).toBeUndefined();
  });

  //MIN
  it("setAttribute should support MIN attribute enum", ()=>{
    const expectedValue = 12;
    component.setAttribute(AttributesEnum.MIN, expectedValue);
    expect(component.getAttribute(AttributesEnum.MIN)).toBe(expectedValue);
  });

  it("setAttribute should support 'min' literal", ()=>{
    const expectedValue = 12;
    component.setAttribute("min", expectedValue);
    expect(component.getAttribute("min")).toBe(expectedValue);
  });

  it("removeAttribute should support 'min' literal", ()=>{
    const expectedValue = 12;
    component.setAttribute("min", expectedValue);
    component.removeAttribute("min");
    expect(component.getAttribute("min")).toBeUndefined();
  });

  it("removeAttribute should support MIN enum", ()=>{
    const expectedValue = 12;
    component.setAttribute(AttributesEnum.MIN, expectedValue);
    component.removeAttribute(AttributesEnum.MIN);
    expect(component.getAttribute(AttributesEnum.MIN)).toBeUndefined();
  });

  //MAX
  it("setAttribute should support max attribute enum", ()=>{
    const expectedValue = 12;
    component.setAttribute(AttributesEnum.MAX, expectedValue);
    expect(component.getAttribute(AttributesEnum.MAX)).toBe(expectedValue);
  });

  it("setAttribute should support 'max' literal", ()=>{
    const expectedValue = 12;
    component.setAttribute("max", expectedValue);
    expect(component.getAttribute("max")).toBe(expectedValue);
  });

  it("removeAttribute should support 'max' literal", ()=>{
    const expectedValue = 12;
    component.setAttribute("max", expectedValue);
    component.removeAttribute("max");
    expect(component.getAttribute("max")).toBeUndefined();
  });

  it("removeAttribute should support MAX enum", ()=>{
    const expectedValue = 12;
    component.setAttribute(AttributesEnum.MAX, expectedValue);
    component.removeAttribute(AttributesEnum.MAX);
    expect(component.getAttribute(AttributesEnum.MAX)).toBeUndefined();
  });

  //max_length
  it("setAttribute should support MAX_LENGTH attribute enum", ()=>{
    const expectedValue = 12;
    component.setAttribute(AttributesEnum.MAX_LENGTH, expectedValue);
    expect(component.getAttribute(AttributesEnum.MAX_LENGTH)).toBe(expectedValue);
  });

  it("setAttribute should support 'max_length' literal", ()=>{
    const expectedValue = 12;
    component.setAttribute("max_length", expectedValue);
    expect(component.getAttribute("max_length")).toBe(expectedValue);
  });

  it("removeAttribute should support 'max_length' literal", ()=>{
    const expectedValue = 12;
    component.setAttribute("max_length", expectedValue);
    component.removeAttribute("max_length");
    expect(component.getAttribute("max_length")).toBe(-1);
  });

  it("removeAttribute should support MAX_LENGTH enum", ()=>{
    const expectedValue = 12;
    component.setAttribute(AttributesEnum.MAX_LENGTH, expectedValue);
    component.removeAttribute(AttributesEnum.MAX_LENGTH);
    expect(component.getAttribute(AttributesEnum.MAX_LENGTH)).toBe(-1);
  });
});
