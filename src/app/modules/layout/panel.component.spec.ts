import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, ElementRef, Renderer2, Component, forwardRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PanelComponent } from './panel.component';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { Layout } from '../base/style-literals';
import { ViewComponent } from '../view/view.component';
import { LayoutModule } from './layout.module';
import { LabelModule } from '../label/label.module';
import { ButtonModule } from '../button/button.module';
import { TextFieldModule } from '../text-field/text-field.module';
import { SessionModule } from '../session/session.module';
import { McoContainerModule } from '../mco-container/mco-container.module';
import { LabelComponent } from '../label/label.component';
import { ButtonComponent } from '../button/button.component';
import { TextFieldComponent } from '../text-field/text-field.component';

class MockElementRef extends ElementRef {
	constructor() {
		super(null);
	}
}

@Component({
  selector: 'test-panel-component',
  template: `
    <vt-panel #myPanel id="myPanel">
      <vt-label id="lbl" text="Label"></vt-label>
      <vt-button *ngIf="true" id="btn" text="Button"></vt-button>
      <vt-text-field id="txtField" text="Text field"></vt-text-field>
    </vt-panel>
  `,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>TestPanelComponent)
    }
  ]
})
export class TestPanelComponent extends ViewComponent {
  @ViewChild("myPanel", {read: PanelComponent}) myPanel: PanelComponent;
}

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;
  let panelElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPanelComponent ],
      imports: [
        LayoutModule,
        LabelModule,
        ButtonModule,
        TextFieldModule,
        SessionModule,
        McoContainerModule
      ],
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
    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    panelElement = fixture.debugElement.query(By.css('div'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept "borderPosition" input and set border style', () => {
    component.borderPosition = 'north';
    fixture.detectChanges();
    expect(panelElement.nativeElement.style['border-top']).toBeDefined();
  });

  it('should accept "layout" input and set css class to "container-fluid" if value is grid', () => {
    let layoutType = 'grid';
    component.layout = layoutType as Layout;
    fixture.detectChanges();
    expect(panelElement.nativeElement.classList.contains(`container-fluid`)).toBeTruthy();
  });

  it('should accept "caption" input and set title on panel', ()=> {
    let caption = "Panel Title";
    component.caption = caption;
    fixture.detectChanges();
    expect(document.querySelector('h1').innerText).toEqual(caption);
  });

  it("should have [hidden] css class name when visible property is false", ()=>{
    component.setVisible(false);
    fixture.detectChanges();

    expect(component.panelClasses.indexOf("hidden")).toBeGreaterThanOrEqual(0);
  });

  it("should NOT have [hidden] css class name when visible property is true", ()=>{
    component.setVisible(true);
    fixture.detectChanges();

    expect(component.panelClasses.indexOf("hidden")).toBeLessThan(0);
  });

  it("should return correct number of children", ()=>{
    const panelFixture: ComponentFixture<TestPanelComponent> = TestBed.createComponent(TestPanelComponent);
    panelFixture.detectChanges();

    expect(panelFixture.componentInstance.myPanel.getChildren().size()).toEqual(3);
  });

  it("should return children in proper order", ()=>{
    const panelFixture: ComponentFixture<TestPanelComponent> = TestBed.createComponent(TestPanelComponent);
    panelFixture.detectChanges();

    expect(panelFixture.componentInstance.myPanel.getChildren().get(0) instanceof LabelComponent).toBeTruthy();
    expect(panelFixture.componentInstance.myPanel.getChildren().get(1) instanceof ButtonComponent).toBeTruthy();
    expect(panelFixture.componentInstance.myPanel.getChildren().get(2) instanceof TextFieldComponent).toBeTruthy();
  });

  describe("toJson", ()=>{
    it("should put element in proper order", ()=>{
      const panelFixture: ComponentFixture<TestPanelComponent> = TestBed.createComponent(TestPanelComponent);
      panelFixture.detectChanges();

      const json = panelFixture.componentInstance.myPanel.toJson();
      expect(json["children"][0].id).toEqual("lbl");
      expect(json["children"][1].id).toEqual("btn");
      expect(json["children"][2].id).toEqual("txtField");
    });

    it("should return proper value for tagName", ()=>{
      const panelFixture: ComponentFixture<TestPanelComponent> = TestBed.createComponent(TestPanelComponent);
      panelFixture.detectChanges();

      const json = panelFixture.componentInstance.myPanel.toJson();
      expect(json["tagName"]).toBe("VT-PANEL");
    });

    it("should return proper value for nxTagName", ()=>{
      const panelFixture: ComponentFixture<TestPanelComponent> = TestBed.createComponent(TestPanelComponent);
      panelFixture.detectChanges();

      const json = panelFixture.componentInstance.myPanel.toJson();
      expect(json["nxTagName"]).toBe("panel");
    });
  });
});
