import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';
import { SessionService } from '../session/session.service';
import { McoContainerService } from '../mco-container/mco-container.service';
import { EventHandlerService } from '../event-handler/event-handler.service';

import { Component, forwardRef, ViewChildren, QueryList, ComponentFactoryResolver, Renderer2, ElementRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DialogModule } from '../dialog/dialog.module';
import { BaseModule } from '../base/base.module';
import { LabelModule } from '../label/label.module';
import { ButtonModule } from '../button/button.module';
import { ModalModule } from 'ngx-bootstrap';
import { RadioButtonModule } from '../radio-button/radio-button.module';
import { LayoutModule } from '../layout/layout.module';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { DynamicPagesService } from './dynamic-pages.service';
import { appInjector } from '../session/app-injector';
import { ViewModule } from './view.module';

@Component({
  selector: "app-multi-view",
  template: `<vt-dialog id="multi-view-test"></vt-dialog>`,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>AppMultiView),
      multi: false
    }
  ]
})
export class AppMultiView extends ViewComponent {
  constructor(
    sessionService: SessionService,
    protected elementRef: ElementRef
  ) {
    super(null, sessionService, elementRef);

    //allow this screen to be opened multiple time
    this.allowMultipleScreen = true;
    
    //it looks like NSD decided to rewrite so we need to fix the test
    this.baseScreenId = "multi-view-test";
    this.registerScreenIndex();
  }
}

@Component({
  selector: 'app-test-view',
  template: `
  <vt-dialog id="test">
    <vt-label text="hello world" id="lblTest"></vt-label>
    <vt-button *ngIf="show === true" text="Test button" id="btnTest"></vt-button>
    <vt-panel>
      <vt-radio-button value="1" group="radioGroupTest" text="Foo"></vt-radio-button>
      <vt-radio-button value="2" group="radioGroupTest" text="Bar"></vt-radio-button>
      <vt-radio-button value="3" group="radioGroupTest" text="FarBoo" [checked]="true"></vt-radio-button>
    </vt-panel>
  </vt-dialog>
  `,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>AppTestComponent),
      multi: false
    }
  ]
})
export class AppTestComponent extends ViewComponent {
  show: boolean = true;

  @ViewChildren(RadioButtonComponent) radios: QueryList<RadioButtonComponent>;
  constructor(
    sessionService: SessionService,
    protected elementRef: ElementRef
  ) {
    super(null, sessionService, elementRef);
  }
}

describe('ViewComponent', () => {
  let component: AppTestComponent;
  let fixture: ComponentFixture<AppTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTestComponent, AppMultiView ],
      providers: [
        SessionService,
        McoContainerService,
        EventHandlerService,
        Renderer2
      ],
      imports: [
        ModalModule.forRoot(),
        DialogModule,
        BaseModule,
        ButtonModule,
        LabelModule,
        RadioButtonModule,
        LayoutModule,
        ViewModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    component.minimize();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toJson should return child toJson object', ()=>{
    fixture.detectChanges();

    // <vt-dialog id="test">
    //   <vt-label text="hello world" id="lblTest"></vt-label>
    //   <vt-button text="Test button" id="btnTest"></vt-button>
    // </vt-dialog>

    //TODO children contains vt-dialog, need to check in legacy app to see how it works
    const json: any = component.toJson();
    const lblTest = (json.children as Array<any>).find(item=>item.id === 'lblTest');

    expect(lblTest.id).toEqual('lblTest');
    expect(lblTest.text).toEqual('hello world');
  });

  it("should return first radio component if findElement is call using group name", ()=>{
    fixture.detectChanges();

    expect(component.findElementById("radioGroupTest")).toBeDefined();
  });

  it("should selected the correct radio button when setAttribute(selected, value) is called", ()=>{
    fixture.detectChanges();

    const expectedValue = 2;

    component.setElementAttributeById("radioGroupTest", "selected", expectedValue);
    fixture.detectChanges();

    let selectedValue: any = null;

    const selectedRadio = component.radios.filter(item=>item.getChecked() === true);
    expect(selectedRadio).toBeDefined();
    expect(selectedRadio.length).toEqual(1);
    expect(selectedRadio[0].getValue()).toEqual(expectedValue + '');
  });

  // describe("reduceChildrenIterative", ()=>{
  //   it("should return all children, including grandchildren ...", ()=>{
  //     const testFixture = TestBed.createComponent(AppTestComponent);
  //     const testComponent = testFixture.componentInstance;
  //     testFixture.detectChanges();

  //     const childrens = testComponent.reduceChildrenIterative();
  //     expect(childrens.length).toEqual(6);
  //   });
  // });

  describe("findElementById", ()=>{
    it("should using radio group name should returned the selected radio", ()=>{
      fixture.detectChanges();

      const comp = component.findElementById("radioGroupTest");

      expect(comp.getText()).toEqual("FarBoo");
    });

    it("should store all children to the view", ()=>{
      fixture.detectChanges();

      const comp = component["_viewChildrenMap"].get("btntest");
      expect(comp).toBeDefined();
    });

    it("should removed component view children map once it is destroyed", ()=>{
      fixture.detectChanges();

      component.show = false;
      fixture.detectChanges();

      expect(component["_viewChildrenMap"].get("btntest")).toBeUndefined();
    });
  });

  describe("multiview", ()=>{
    const testId = "multi-view-test";
    let fx1: ComponentFixture<AppMultiView>;
    let fx2: ComponentFixture<AppMultiView>;

    beforeEach(async()=>{
      fx1 = TestBed.createComponent(AppMultiView);
      fx1.detectChanges();

      fx2 = TestBed.createComponent(AppMultiView);
      fx2.detectChanges();
    });

    it("it should allow view to be opened multiple time if allowMultiScreen is true", ()=>{
      const myViewCount = fx1.componentInstance.getSession().getMcoContainer().getViews().filter(view=>view.id === testId).length;
      expect(myViewCount).toBe(2);
    });

    it("it should return the correct view if screenIndex is provided", ()=>{
      const view = fx1.componentInstance.getSession().getMcoContainer().getViewById(testId, 2);
      expect(fx2.componentInstance["_uniqueId"]).toBe(view["_uniqueId"]);
      expect(view.screenIndex).toBe(2);
    });

    it("should close the correct view if screenIndex is provided", ()=>{
      //we have to retrieve the view and then destroy it so clean up can occurred and
      //the view can call mco container to remove it self
      fx2.destroy();

      const view = fx1.componentInstance.getSession().getMcoContainer().getViewById(testId, 2);
      expect(view).toBeUndefined();
    });
  });

  it('should allow routerUrl to be set', ()=> {
    spyOn(component, 'setRouteUrl');
    expect(component.setRouteUrl).toBeDefined();
    component.setRouteUrl('test-route');
    //expect(component.getRouteUrl()).toBe('test-route');
    fixture.whenStable().then(()=> {
      expect(component.dialog.setViewRouteUrl).toHaveBeenCalled();
    });
  });

  it('should have method to indicate if route has been deactivated', ()=> {
    expect(component.isRouteDeactivated).toBeDefined();
    component['routeDeactivated'] = true;
    expect(component.isRouteDeactivated()).toBe(true);
  });

});
