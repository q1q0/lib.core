import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HorizontalSeparatorComponent } from './horizontal-separator.component';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { ElementRef, DebugElement, Renderer2 } from '@angular/core';

class MockElementRef extends ElementRef {
	constructor() {
		super({
			tagName: 'vt-horizontal-separator'
		});
	}
}

describe('HorizontalSeparatorComponent', () => {
  let component: HorizontalSeparatorComponent;
  let fixture: ComponentFixture<HorizontalSeparatorComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalSeparatorComponent ],
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
    fixture = TestBed.createComponent(HorizontalSeparatorComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('hr'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept borderColor input and set css style', ()=> {
    let color = 'rgb(255, 0, 0)';
    component.borderColor = color;
    fixture.detectChanges();
    expect(el.nativeElement.style.backgroundColor).toEqual(color);
  });
});
