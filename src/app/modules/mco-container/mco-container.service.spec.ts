import { TestBed, ComponentFixture } from '@angular/core/testing';

import { McoContainerService } from './mco-container.service';
import { SessionService } from '../session/session.service';
import { ViewComponent } from '../view/view.component';
import { Component, forwardRef, ElementRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { UiDocument } from '../base/ui-document';
import { ButtonModule } from '../button/button.module';
import { DialogModule } from '../dialog/dialog.module';
import { BaseModule } from '../base/base.module';
import { appInjector } from '../session/app-injector';
import { ViewModule } from '../view/view.module';
import { McoContainerModule } from './mco-container.module';
import { SessionModule } from '../session/session.module';

class MyMco {
  constructor() {
  }
}

@Component({
  selector: 'dummy-view-test',
  template: `
  <vt-dialog id="view1">
    <vt-button id="button1" text="test"></vt-button>
  </vt-dialog>
  `,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>DummyView),
      multi: false
    }
  ]
})
class DummyView extends ViewComponent {
  constructor(
    sessionService: SessionService,
    elementRef: ElementRef,
  ) {
    super(null, sessionService, elementRef);
  }
}

@Component({
  selector: 'dummy-view-test2',
  template: `
    <vt-dialog id="view2">
      <vt-button id="button2" text="test button 2"></vt-button>
    </vt-dialog>
  `,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>DummyView2),
      multi: false
    }
  ]
})
class DummyView2 extends ViewComponent {
  constructor(
    sessionService: SessionService,
    elementRef: ElementRef,
  ) {
    super(null, sessionService, elementRef);
  }
}

describe('McoContainerService', () => {
  let service: McoContainerService;

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [DummyView, DummyView2],
    providers: [
      Renderer2
    ],
    imports: [
      McoContainerModule,
      SessionModule,
      DialogModule,
      ButtonModule,
      BaseModule,
      ViewModule
    ]
  }));

  beforeEach(()=>{
    service = TestBed.get(McoContainerService);
    appInjector(TestBed);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should stored mco', () => {
    const myMco = new MyMco();
    service.registerMco('my_STINKY_mco', myMco);
    expect(service.getMco('my_stinky_mco')).toBe(myMco);
  });

  it('ViewComponent should registered itself to container service', ()=>{
    const fixture: ComponentFixture<DummyView> = TestBed.createComponent(DummyView);
    fixture.detectChanges();

    expect(service.activeViewsCount()).toEqual(1);
    fixture.componentInstance.ngOnDestroy();
  });

  it('popLastActiveView should return last active view', ()=>{
    const fixture: ComponentFixture<DummyView> = TestBed.createComponent(DummyView);
    fixture.detectChanges();

    const view: ViewComponent = service.popLastActiveView();

    expect(view.uniqueId).toEqual(fixture.componentInstance.uniqueId);
  });

  it('popLastActiveView should remove the view from the stack', ()=>{
    const fixture: ComponentFixture<DummyView> = TestBed.createComponent(DummyView);
    fixture.detectChanges();

    const view: ViewComponent = service.popLastActiveView();
    expect(service.hasView(view)).toBeFalsy();
  });

  it('popLastActiveView should not empty the stack when there are more than one view', ()=>{
    const fixture: ComponentFixture<DummyView> = TestBed.createComponent(DummyView);
    fixture.detectChanges();

    const fixture2: ComponentFixture<DummyView2> = TestBed.createComponent(DummyView2);
    fixture2.detectChanges();

    expect(service.activeViewsCount()).toEqual(2);

    let view = service.popLastActiveView();

    expect(view.uniqueId).toEqual(fixture2.componentInstance.uniqueId);
    expect(service.activeViewsCount()).toEqual(1);

    view = service.popLastActiveView();

    expect(view.uniqueId).toEqual(fixture.componentInstance.uniqueId);
    expect(service.activeViewsCount()).toEqual(0);
  });

  it("removeView should not empty activeViewsStack when stack has more than one view", ()=>{
    const fixture: ComponentFixture<DummyView> = TestBed.createComponent(DummyView);
    fixture.detectChanges();

    const fixture2: ComponentFixture<DummyView2> = TestBed.createComponent(DummyView2);
    fixture2.detectChanges();

    //review a view
    service.removeView(fixture.componentInstance);

    expect(service.getViews().length).toEqual(1);
  });

  describe("UiDocument", ()=>{
    it("toJson() should return whole UiDocument", ()=>{
      const fixture: ComponentFixture<DummyView> = TestBed.createComponent(DummyView);
      fixture.detectChanges();

      const fixture2: ComponentFixture<DummyView2> = TestBed.createComponent(DummyView2);
      fixture2.detectChanges();

      const uiDoc = UiDocument.toJson();

      expect(uiDoc["view1"]).toBeDefined();
      expect(uiDoc["view2"]).toBeDefined();

      const button = uiDoc["view1"].children.find(item=>item.nxTagName === "button");
      expect(button).toBeDefined();
      expect(button.id).toEqual("button1");
    });
  });
});
