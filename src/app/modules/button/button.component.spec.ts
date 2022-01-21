import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, ElementRef, Component, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';

@Component({
	selector: 'app-test-componnent',
	template: `
	<vt-button id="test-123" text="Hello world" cssClass="css-1 css2" [disabled]="buttonDisabled" [enabled]="buttonEnabled" [focused]="false" [customAttributes]="{'whatever_man': 'custom attribute value', 'numeric_value': 1234567890, 'null_numeric': null}"></vt-button>
	`
})
class AppTestComponent {
	buttonDisabled: boolean = true;
	buttonEnabled: boolean = false;
}

class MockElementRef extends ElementRef {
	constructor() {
		super({
			tagName: 'vt-button'
		});
	}
}

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<AppTestComponent>;

  let buttonEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			declarations: [ ButtonComponent, AppTestComponent ],
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
		fixture.detectChanges();

		component = fixture.debugElement.query(By.directive(ButtonComponent)).injector.get(ButtonComponent);

		buttonEl = fixture.debugElement.query(By.css('button'));
		fixture.elementRef = buttonEl;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('should have btn and btn-default classes', () => {
		expect((buttonEl.nativeElement as HTMLElement).classList.contains("btn")).toBeTruthy();
		expect((buttonEl.nativeElement as HTMLElement).classList.contains("btn-default")).toBeTruthy();
	});

  it('should accept css class input and set it on button element', () => {
		expect((buttonEl.nativeElement as HTMLElement).classList.contains("css-1")).toBeTruthy();
		expect((buttonEl.nativeElement as HTMLElement).classList.contains("css2")).toBeTruthy();
	});
	
	it('should have method to get ChangeDetector', ()=> {
		expect(component['getChangeDetector']()).toBeDefined();
	});

	describe('enabled/disabled inputs', () => {
		it('should enable button when "enabled" is true', () => {
			fixture.componentInstance.buttonDisabled = false;
			fixture.detectChanges();
			expect(buttonEl.nativeElement.disabled).toBeFalsy();
		});
		it('should not enable button when "enabled" is false', () => {
			fixture.componentInstance.buttonEnabled = false;
			fixture.detectChanges();
			expect(buttonEl.nativeElement.disabled).toBeTruthy();
		});
		it('should disable button when "disabled" is true', () => {
			fixture.componentInstance.buttonDisabled = true;
			fixture.detectChanges();
			expect(buttonEl.nativeElement.disabled).toBeTruthy();
		});
	});

	it('should accept "text" input which sets button lablel', () => {
		expect(buttonEl.nativeElement.textContent.trim()).toEqual('Hello world');
	});

	it('should accept "id" input which sets button id attribute', () => {
		expect(buttonEl.nativeElement.id).toEqual('test-123');
	});

	it('should call handler on mousedown event', ()=> {
		spyOn(component, 'onMouseDown');
		buttonEl.nativeElement.click();
		fixture.whenStable().then(()=> {
			expect(component.handleMouseDown).toHaveBeenCalled();
		});
	});

	it('should call handler on click event', ()=> {
		spyOn(component, 'onClick');
		buttonEl.nativeElement.click();
		fixture.whenStable().then(()=> {
			expect(component.handleClick).toHaveBeenCalled();
		});
	})

  it('should convert to Json correctly', ()=>{
    const json: any = component.toJson();
    expect(json.id).toEqual('test-123');
    expect(json.text).toEqual('Hello world');
    expect(json.disabled).toEqual('true');
    expect(json.enabled).toEqual('false');
    expect(json.visible).toEqual('true');
		expect(json.cssClass).toEqual('css-1 css2');
		expect(json.focused).toEqual('false');
		expect(json.customAttributes.whatever_man).toEqual('custom attribute value');
		expect(json.tagName).toEqual('VT-BUTTON');
		expect(json.customAttributes.numeric_value).toEqual('1234567890');
		expect(json.customAttributes.null_numeric).toEqual(null);		
  });
});
