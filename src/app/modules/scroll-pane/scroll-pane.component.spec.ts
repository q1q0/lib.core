import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ScrollPaneComponent } from './scroll-pane.component';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
	selector: 'app-test-componnent',
	template: `
  <vt-scroll-pane [resizeHeight]="resizeHeight" [skipScrollAdjustment]="skipScrollAdj">
  </vt-scroll-pane>
	`
})
class AppTestComponent {
  resizeHeight: string = "250";
  skipScrollAdj: boolean = true;
}
class MockElementRef extends ElementRef {
	constructor() {
		super(null);
	}
}

describe('ScrollPaneComponent', () => {
  let component: ScrollPaneComponent;
  let fixture: ComponentFixture<AppTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollPaneComponent, AppTestComponent ],
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
    component = fixture.debugElement.query(By.directive(ScrollPaneComponent)).injector.get(ScrollPaneComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "isScrollView" method that returns true', ()=> {
    expect(component.isScrollView()).toBe(true);
  });

  it('should have "isScrollPane" method that returns true', ()=> {
    expect(component.isScrollPane()).toBe(true);
  });

  describe('Input properties', ()=> {
    it('should accept "resizeHeight" input and set height style property', ()=> {
      expect(component.resizeHeight).toBe('250');
      expect(component.styles["height"]).toBe("calc(100% - 250px)");
    });

    it('should accept "skipScrollAdjustment" input', ()=> {
      expect(component.skipScrollAdjustment).toBe(true);
    });
  });
});
