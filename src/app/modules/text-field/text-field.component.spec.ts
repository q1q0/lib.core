import { async, ComponentFixture, TestBed, tick, flush, fakeAsync } from '@angular/core/testing';

import { TextFieldComponent } from './text-field.component';
import { SessionService } from '../session/session.service';
import { BaseComponent } from '../base/base.component';
import { ElementRef, Component, Renderer2 } from '@angular/core';
import { TextFieldModule } from './text-field.module';
import { By } from '@angular/platform-browser';

@Component({
	selector: 'app-test-componnent',
	template: `
  <vt-text-field value="test123"
    [editable]="editable"
    [maxLength]="14"
    type="email">
  </vt-text-field>
	`
})
class AppTestComponent {
  enabled: boolean = true;
}

class MockElementRef extends ElementRef {
	constructor() {
		super({
      tagName: 'vt-text-field'
    });
	}
}

describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<AppTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTestComponent ],
      imports: [
        TextFieldModule
      ],
      providers: [
        BaseComponent,
        { provide: ElementRef, useClass: MockElementRef },
        SessionService,
        Renderer2
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTestComponent);
    component = fixture.debugElement.query(By.directive(TextFieldComponent)).injector.get(TextFieldComponent);
    fixture.detectChanges();
  });

  beforeEach(async(()=>{
    fixture.detectChanges();
    fixture.whenStable();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
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
    component.editable = true;

    const json: any = component.toJson();
    expect(json.id).toEqual('test-123');
    expect(json.text).toEqual('Hello world');
    expect(json.disabled).toEqual('true')
    expect(json.enabled).toEqual('false')
    expect(json.visible).toEqual('true');
    expect(json.cssClass).toEqual('css-1 css2');
    expect(json.editable).toBeTruthy();
  });

  describe('Input properties', ()=> {
    it('should accept "value" input property', ()=> {
      expect(component.value).toBe('test123');
    });

    it('should accept "enabled" input property', ()=> {
      expect(component.enabled).toBe(true);
    });

    it('should accept "type" input property', ()=> {
      expect(component.type).toBe('email');
    });

    it('shoul accept "maxLength" input property', ()=> {
      expect(component.maxLength).toBe(14);
    });
  });

  it('should have  return proper nexaweb tag name', ()=> {
    expect(component['getNxTagName']()).toBe('textField');
  });
});
