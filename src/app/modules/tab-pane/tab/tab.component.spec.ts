import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabComponent } from './tab.component';
import { BaseComponent } from '../../base/base.component';
import { SessionService } from '../../session/session.service';
import { ElementRef, DebugElement, Renderer2 } from '@angular/core';

class MockElementRef extends ElementRef {
	constructor() {
		super({
      tagName: 'vt-tab'
    });
	}
}

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabComponent ],
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
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('.vt-tab'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
