import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SessionService } from '../session/session.service';
import { BaseComponent } from '../base/base.component';
import { LabelComponent } from './label.component';
import { AlignHorizontal } from '../base/style-literals';

class MockElementRef extends ElementRef {
	constructor() {
		super(null);
	}
}

describe('LabelComponent', () => {
	let labelEl: DebugElement;
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelComponent ],
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
    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
		
		labelEl = fixture.debugElement.query(By.css('span'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
	
	it('should accept "text" input and set inner text', () => {
		let text = "hello";
		component.text = text;
		fixture.detectChanges();
		expect(labelEl.nativeElement.textContent.trim()).toEqual(text);
  });

  it('should set "tooltip" to empty string if it is null or undefined', ()=> {
    component.tooltip = null;
    expect(component.tooltip).toBe('');
  });
  
  it('should accept "alignHorizontal" input and set text-align css property', () => {
    let alignment = 'center';
    component.alignHorizontal = alignment as AlignHorizontal;
    fixture.detectChanges();
    expect(labelEl.nativeElement.style['text-align']).toEqual(alignment);
  });
});
