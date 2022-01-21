import { Component, ElementRef, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SplitPaneComponent } from './split-pane.component';
import { SessionService } from '../session/session.service';
import { BaseComponent } from '../base/base.component';
import { SplitPaneModule } from './split-pane.module';

@Component({
	selector: 'app-test-componnent',
  template: `
  <vt-split-pane orientation="vertical"
    splitPosition="25%"
    [noScroll]="true">
    <vt-top>
      <div id="test-content">I am top pane</div>
    </vt-top>
    <vt-bottom>
      <div id="test-content">I am botton pane</div>
    </vt-bottom>
  </vt-split-pane>
	`
})
class AppTestComponent {
}

class MockElementRef extends ElementRef {
	constructor() {
		super({
			tagName: 'vt-split-pane'
		});
	}
}

describe('SplitPaneComponent', () => {
  let component: SplitPaneComponent;
  let fixture: ComponentFixture<AppTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTestComponent ],
      imports: [SplitPaneModule],
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
    component = fixture.debugElement.query(By.directive(SplitPaneComponent)).injector.get(SplitPaneComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', ()=> {
    it('should accept an "orientation" input', ()=> {
      expect(component.orientation).toBe('vertical');
    });

    it('should accept a "splitPosition" input', ()=> {
      expect(component.splitPosition).toBe('25%');
    });

    it('should accept a "noScroll" input and set overflow style', ()=> {
      expect(component.noScroll).toBe(true);
      expect(component.topPaneStyles['overflow']).toBe('hidden');
      expect(component.bottomPaneStyles['overflow']).toBe('hidden');
    });
  });
});
