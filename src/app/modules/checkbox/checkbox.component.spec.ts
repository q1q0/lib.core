import { Component, ElementRef, Renderer2, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';

@Component({
	selector: 'app-test-componnent',
	template: `
	<vt-check-box id="test-123" text="Hello world" cssClass="css-1 css2" [disabled]="cbDisabled" [enabled]="cbEnabled" [customAttributes]="{'whatever_man': 'custom attribute value', 'numeric_value': 1234567890, 'null_numeric': null}"></vt-check-box>
	`
})
class AppTestComponent {
  cbDisabled: boolean = true;
	cbEnabled: boolean = false;
}

class MockElementRef extends ElementRef {
	constructor() {
		super({
      tagName: 'vt-check-box'
    });
	}
}

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<AppTestComponent>;
  let checkboxEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxComponent, AppTestComponent ],
      imports: [ FormsModule ],
      providers: [
        BaseComponent,
        SessionService,
        { provide: ElementRef, useClass: MockElementRef },
        Renderer2
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTestComponent);
    fixture.detectChanges();
		component = fixture.debugElement.query(By.directive(CheckboxComponent)).injector.get(CheckboxComponent);

		checkboxEl = fixture.debugElement.query(By.css('input'));
		fixture.elementRef = checkboxEl;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should set selected to 'true' if checked", ()=>{
    component.setChecked(true);
    fixture.detectChanges();

    expect(component.getChecked()).toBe(true);
  });

  it("should set selected to 'false' if not checked", ()=>{
    component.setChecked(false);
    fixture.detectChanges();

    expect(component.getChecked()).toBe(false);
  });

  it("should return its value when getValue() is called", ()=>{
    component.value = "123";
    fixture.detectChanges();

    expect(component.getValue()).toBe("123");
  });

  it('should have a local name with value "checkbox"', ()=> {
    expect(component.getLocalName()).toBe('checkBox');
  });

  it('should convert to Json correctly', ()=>{
    const json: any = component.toJson();
    expect(json.id).toEqual('test-123');
    expect(json.text).toEqual('Hello world');
    expect(json.disabled).toEqual('true');
    expect(json.enabled).toEqual('false');
    expect(json.visible).toEqual('true');
		expect(json.cssClass).toEqual('css-1 css2');
		expect(json.customAttributes.whatever_man).toEqual('custom attribute value');
		expect(json.tagName).toEqual('VT-CHECK-BOX');
		expect(json.customAttributes.numeric_value).toEqual('1234567890');
		expect(json.customAttributes.null_numeric).toEqual(null);
  });
});
