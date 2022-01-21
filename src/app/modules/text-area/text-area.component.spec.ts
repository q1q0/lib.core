import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TextAreaComponent } from './text-area.component';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { DebugElement, ElementRef, Renderer2, Component, ViewChild } from '@angular/core';
import { TextAreaModule } from './text-area.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: "test-text-area",
  template: `
    <vt-text-area #txtArea1
      id="test-123"
      cssClass="css-1 css-2"
      text="Hello world"
      [editable]="false"
      [enabled]="false"
      [disabled]="true"
      [visible]="true"
      [customAttributes]="{'whatever_man': 'custom attribute value', 'numeric_value': 1234567890, 'null_numeric': null}"
      [maxLength]="10">
    </vt-text-area>
    <vt-text-area #txtArea2></vt-text-area>
  `
})
export class TestTextArea {
  @ViewChild("txtArea1", {read: TextAreaComponent}) txtArea1: TextAreaComponent;
  @ViewChild("txtArea2", {read: TextAreaComponent}) txtArea2: TextAreaComponent;
}

class MockElementRef extends ElementRef {
	constructor() {
		super(null);
	}
}

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TestTextArea>;
  let textareaEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestTextArea],
      imports: [
        TextAreaModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: ElementRef,
          useClass: MockElementRef
        },
        BaseComponent,
        SessionService,
        Renderer2
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTextArea);
    component = fixture.debugElement.query(By.directive(TextAreaComponent)).injector.get(TextAreaComponent);
    textareaEl = fixture.debugElement.query(By.css('textarea'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct local name', ()=> {
    expect(component.getLocalName()).toBe('textArea');
  });

  it('should allow maxLength to be set', ()=> {
    component.setMaxLength(15);
    expect(component.getMaxLength()).toBe(15);
  });

  it('should allow visible to be set', ()=> {
    component.setVisible(false);
    expect(component.getVisible()).toBe(false);
    component.setVisible(true);
    expect(component.visible).toBe(true);
  });

  describe('Input properties', ()=> {
    it('should accept false "enabled" input and set disabled state to true', ()=> {
      expect(fixture.componentInstance.txtArea1.textarea.nativeElement.getAttribute('disabled')).toBeTruthy();
    });

    it('should accept true "enabled" input and set disabled state to false', ()=> {
      expect(fixture.componentInstance.txtArea2.textarea.nativeElement.getAttribute('disabled')).toBeFalsy();
    });

    // comment out due to NSD changed which cause this unit test failure
    // it('should accept false "editable" input and set readonly state to true', ()=> {
    //   expect(fixture.componentInstance.txtArea1.textarea.nativeElement.getAttribute('readonly')).toBeTruthy();
    // });

    it('should accept true "editable" input and set readonly state to false', ()=> {
      expect(fixture.componentInstance.txtArea2.textarea.nativeElement.getAttribute('readonly')).toBeFalsy();
    });

    it('should accept numeric maxLength input and set internal maxLength', ()=> {
      expect(component.maxLength).toEqual(10);
      expect(component.getMaxLength()).toEqual(10);
    });
  });

  it('should convert to Json correctly', ()=>{
    const json: any = component.toJson();
    expect(json.id).toEqual('test-123');
    expect(json.text).toEqual('Hello world');
    expect(json.disabled).toEqual('true');
    expect(json.enabled).toEqual('false');
    expect(json.visible).toEqual('true');
		expect(json.cssClass).toEqual('css-1 css-2');
		expect(json.customAttributes.whatever_man).toEqual('custom attribute value');
		expect(json.tagName).toEqual('VT-TEXT-AREA');
		expect(json.customAttributes.numeric_value).toEqual('1234567890');
		expect(json.customAttributes.null_numeric).toEqual(null);		
  });

  it('should emit onTextChange when text is input', ()=> {
    // spyOn(component, 'onInput');
    textareaEl.nativeElement.focus();
    textareaEl.nativeElement.value = 'test';
    textareaEl.nativeElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    fixture.whenStable().then(()=> {
      expect(component.onTextChange.emit).toHaveBeenCalled();
    });
  })

  it('should emit onEdit and validate when focus is lost', ()=> {
    spyOn(component, 'onBlur');
    textareaEl.nativeElement.focus();
    textareaEl.nativeElement.blur();

    fixture.whenStable().then(()=> {
      expect(component.onEdit.emit).toHaveBeenCalled();
      expect(component.validateField).toHaveBeenCalled();
    });
  });
});
