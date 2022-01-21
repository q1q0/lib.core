import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonComponent } from './radio-button.component';
import { SessionService } from '../session/session.service';
import { BaseComponent } from '../base/base.component';
import { ElementRef, Component, ViewChild, Renderer2 } from '@angular/core';
import { RadioButtonModule } from './radio-button.module';

@Component({
  selector: "app-test-radio",
  template: `
  <vt-radio-button #radio1 [checked]="true" (onCommand)="changeMe()" group="NgnsSCR_SoOrd_EntryOdrInput01_1" id="NgnsSCR_SoOrd_EntryOdrInput01_RdbApp_kind_cd" text="本申込" value="2"></vt-radio-button>
  <vt-radio-button #radio2 (onCommand)="changeMe2()" group="NgnsSCR_SoOrd_EntryOdrInput01_1" id="NgnsSCR_SoOrd_EntryOdrInput01_RdbApp_kind_cd2" text="two" value="1"></vt-radio-button>
  `
})
export class AppTestRadio {
  @ViewChild("radio1", {read: RadioButtonComponent}) radio: RadioButtonComponent;
  @ViewChild("radio2", {read: RadioButtonComponent}) radio2: RadioButtonComponent;

  changeMe() {

  }

  changeMe2() {

  }
}

class MockElementRef extends ElementRef {
	constructor() {
		super(null);
	}
}

describe('RadioButtonComponent', () => {
  let component: RadioButtonComponent;
  let fixture: ComponentFixture<RadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTestRadio ],
      imports: [
        RadioButtonModule
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
    fixture = TestBed.createComponent(RadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("toJson should include value attribute (if exists)", ()=>{
    const appTestFixture = TestBed.createComponent(AppTestRadio);
    const appTestComponent = appTestFixture.componentInstance;
    appTestFixture.detectChanges();

    const json = appTestComponent.radio.toJson();

    expect(json["text"]).toEqual("本申込");
    expect(json["value"]).toEqual("2");
  });

  it("onCommand should emitted when clicked and it is checked", ()=>{
    const appTestFixture = TestBed.createComponent(AppTestRadio);
    const appTestComponent = appTestFixture.componentInstance;
    appTestFixture.detectChanges();

    spyOn(appTestComponent, "changeMe");

    ((appTestComponent.radio.getElement() as HTMLElement).firstElementChild.firstElementChild.firstElementChild as HTMLElement).click();
    expect(appTestComponent.changeMe).toHaveBeenCalledTimes(0);
  });

  it("onCommand should emitted when clicked and it is not checked", ()=>{
    const appTestFixture = TestBed.createComponent(AppTestRadio);
    const appTestComponent = appTestFixture.componentInstance;
    appTestFixture.detectChanges();

    spyOn(appTestComponent, "changeMe2");

    ((appTestComponent.radio2.getElement() as HTMLElement).firstElementChild.firstElementChild.firstElementChild as HTMLElement).click();
    expect(appTestComponent.changeMe2).toHaveBeenCalled();
  });
});
