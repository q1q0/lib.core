import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LinkComponent } from './link.component';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';

@Component({
	selector: 'app-test-componnent',
	template: `
  <vt-link id="test-123"
    cssClass="css-1 css2"
    [disabled]="true"
    [enabled]="false"
    [visible]="true"
    [customAttributes]="{'whatever_man': 'custom attribute value', 'numeric_value': 1234567890, 'null_numeric': null}"
    text="Click Me">
  </vt-link>
	`
})
class AppTestComponent {

}
class MockElementRef extends ElementRef {
	constructor() {
		super({
      tagName: 'vt-link'
    });
	}
}

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<AppTestComponent>;
  let linkEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkComponent, AppTestComponent ],
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
    component = fixture.debugElement.query(By.directive(LinkComponent)).injector.get(LinkComponent);
    linkEl = fixture.debugElement.query(By.css('span'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept text input which sets text of link', () => {
    expect(component.text).toBe("Click Me");
    expect(linkEl.nativeElement.textContent.trim()).toEqual("Click Me");
  });

  it('should accept disabled input', ()=> {
    expect(component.disabled).toBe(true);
  });

  it('should set opacity to "0.3" if disabled', ()=> {
    expect(component.opacity).toBe("0.3");
  });

  it('should be able to click the link', ()=> {
    spyOn(component, 'onClick');
    component.disabled = false;
    fixture.detectChanges();
    linkEl.nativeElement.click();
    fixture.whenStable().then(()=> {
      expect(component.onCommand.emit).toHaveBeenCalled();
    });
  })

  it('should not allow link to be clicked if it is disabled', ()=> {
    spyOn(component, 'onClick');
    linkEl.nativeElement.click();
    fixture.whenStable().then(()=> {
      expect(component.onCommand.emit).not.toHaveBeenCalled();
    });
  });

  it('should convert to Json correctly', ()=>{
    const json: any = component.toJson();
    expect(json.id).toEqual('test-123');
    expect(json.text).toEqual('Click Me');
    expect(json.disabled).toEqual('true');
    expect(json.enabled).toEqual('false');
    expect(json.visible).toEqual('true');
		expect(json.cssClass).toEqual('css-1 css2');
		expect(json.customAttributes.whatever_man).toEqual('custom attribute value');
		expect(json.tagName).toEqual('VT-LINK');
		expect(json.customAttributes.numeric_value).toEqual('1234567890');
		expect(json.customAttributes.null_numeric).toEqual(null);		
  });
});
