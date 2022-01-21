import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TabPaneComponent } from './tab-pane.component';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { ElementRef, Component, ViewChild, Renderer2, forwardRef } from '@angular/core';
import { TabPaneModule } from './tab-pane.module';
import { ViewComponent } from '../view/view.component';
import { ViewModule } from '../view/view.module';
import { BaseModule } from '../base/base.module';
import { SessionModule } from '../session/session.module';
import { LabelModule } from '../label/label.module';
import { LayoutModule } from '../layout/layout.module';

class MockElementRef extends ElementRef {
	constructor() {
		super({
      tagName: 'vt-tab-pane'
    });
	}
}

@Component({
  selector: 'app-tab-test',
  template: `
	<vt-tab-pane id="test-tab-pane">
		<vt-tab text="tab1" id="tab-1">tab content 1</vt-tab>
		<vt-tab *ngIf="isReady === true" text="tab2" id="tab-2">tab content 2</vt-tab>
    <vt-tab text="tab3" id="tab-3">
      <vt-panel id="testPanel">
        <vt-label id="shouldNotExists" text="dead"></vt-label>
      </vt-panel>
    </vt-tab>
	</vt-tab-pane>
  `,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>TestTabComponent)
    }
  ]
})
export class TestTabComponent extends ViewComponent{
  @ViewChild(TabPaneComponent) tabPane: TabPaneComponent;
  isReady: boolean = true;
}

describe('TabPaneComponent', () => {
  let component: TestTabComponent;
  let fixture: ComponentFixture<TestTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTabComponent ],
      providers: [
        { provide: ElementRef, useClass: MockElementRef },
        Renderer2
      ],
      imports: [
        TabPaneModule,
        ViewModule,
        BaseModule,
        SessionModule,
        LabelModule,
        LayoutModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.tabPane).toBeTruthy();
  });

  it('should have tab childrens', ()=>{
    expect(component.tabPane.tabs.length).toEqual(3);
    // expect(component.tabPane.children.size).toEqual(3);
  });

  it('should find tab via getElementById', ()=>{
    const el = component.findElementById("tab-2");
    expect(el).toBeDefined();
  });

  it('should have tab should have content', ()=>{
    expect(component.tabPane.tabs[0]).toBeTruthy();
  });

  it("toJson shoul return selectedTabIndex with proper value", ()=>{
    component.tabPane.selectedTabIndex = 1;
    const json = component.tabPane.toJson();
    expect(json["selectedTabIndex"]).toEqual(1);
  });

  it("should reset tab tab when tabList is updated (tab was visible, now hidden)", ()=>{
    component.isReady = false;
    fixture.detectChanges();
    expect(component.tabPane.tabs.length).toEqual(2);
  });

  it("should reset tab tab when tabList is updated (tab was hidden, now visible)", ()=>{
    component.isReady = false;
    fixture.detectChanges();

    component.isReady = true;
    fixture.detectChanges();

    // expect(el).toBeDefined();
    expect(component.tabPane.tabs.length).toEqual(3);
  });

  it("should reset tab tab when tabList is updated (tab is hidden and should not exists)", ()=>{
    component.isReady = false;
    fixture.detectChanges();
    const el = component.findElementById("tab-2");

    expect(el).toBeNull();
  });

  it("should reset tab tab when tabList is updated (tab is visible and should NOW exists)", ()=>{
    component.isReady = false;
    fixture.detectChanges();

    component.isReady = true;
    fixture.detectChanges();
    const el = component.findElementById("tab-2");

    expect(el).toBeDefined();
  });

  it("getChildren should return proper value when some of the tabs are hidden", ()=>{
    component.isReady = false;
    fixture.detectChanges();

    expect(component.tabPane.children.size).toEqual(3);
  });

  it("removedChild should destroy the tab and its children", ()=>{
    fixture.detectChanges();
    const tab3 = component.getElementById("tab-3");
    tab3.getParent().removeChild(tab3);

    const label = component.getElementById("shouldNotExists");
    expect(label).toBeNull();
  });
});
