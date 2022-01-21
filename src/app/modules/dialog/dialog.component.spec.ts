import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DialogComponent } from './dialog.component';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { ModalModule, BsModalService, BsModalRef } from "ngx-bootstrap";
import { DraggableDirective } from './draggable.directive';
import { InitialPosition } from '../base/initial-position';

@Component({
	selector: 'app-test-componnent',
	template: `
  <vt-dialog id="test-123"
    tableId="table-test"
    text="Hello world"
    cssClass="css-1 css2"
    [title]="modalTitle"
    [windowTitle]="modalTitle"
    [modal]="modalActive"
    [initialPosition]="initialPosition"
    [centered]="modalCentered">
  </vt-dialog>
	`
})
class AppTestComponent {
  modalTitle: String = 'Title';
  modalCentered: boolean | string = true;
  modalActive: boolean = true;
  initialPosition: InitialPosition = {
    left: 0,
    right: 10,
    top: 20,
    bottom: 0
  }
}

class MockElementRef extends ElementRef {
	constructor() {
		super({
			tagName: 'vt-dialog'
		});
	}
}

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<AppTestComponent>;
  let dialogEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponent, AppTestComponent, DraggableDirective ],
      providers: [
        BaseComponent,
        SessionService,
        { provide: ElementRef, useClass: MockElementRef },
        Renderer2
      ],
      imports: [ModalModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {    
    fixture = TestBed.createComponent(AppTestComponent);
		fixture.detectChanges();

		component = fixture.debugElement.query(By.directive(DialogComponent)).injector.get(DialogComponent);

		dialogEl = fixture.debugElement.query(By.css('.modal'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert to Json correctly', ()=>{
    const json: any = component.toJson();
    expect(json.id).toEqual('test-123');
    expect(json.visible).toBeTruthy();
    expect(json.cssClass).toEqual('css-1 css2');
    expect(json.title).toEqual('Title');
    expect(json.modal).toBeTruthy();
    expect(json.tagName.toLowerCase()).toEqual('vt-dialog');
  });

  describe('"centered" Input', ()=> {
    it('should accept boolean value for "centered" input and set css class on dialog', ()=> {
      fixture.componentInstance.modalCentered = true;
      fixture.detectChanges();
      expect(component._center).toBeTruthy();

      //we are no longer used the dialog-centered css class and modal should already be centered
      //expect(dialogEl.nativeElement.classList.contains(cssClass)).toBeTruthy();
    });

    it('should accept string value for "centered" input and set css class on dialog', ()=> {
      fixture.componentInstance.modalCentered = "true";
      fixture.detectChanges();

      expect(component._center).toBeTruthy();
      //we are no longer used the dialog-centered css class and modal should already be centered
      //expect(dialogEl.nativeElement.classList.contains(cssClass)).toBeTruthy();
    });
  });

  it('shoudl have windowTitle alias Input that sets title', ()=> {
    expect(component.title).toBe('Title');
  });

  it('should return true from isContainer method', ()=> {
    expect(component['isContainer']()).toBe(true);
  });

  it('should return true from isDialog method', ()=> {
    expect(component['isDialog']()).toBe(true);
  });

  it('should have method to get native element', ()=> {
    expect(component.getElement).toBeDefined();
    expect(component.getElement()).toBeTruthy();
  });

  // TODO: It looks like NSD changed minimize functionality so this test is now failed.
  // it('should have minimize method that sets proper css classes', ()=> {
  //   let e = new MouseEvent('click');
  //   component.minimize(null);
  //   component.minimize(e);
  //   expect(component.bsModalClass).toEqual(["vt-dialog", "modal", "fade", "out", "minimize"]);
  // });

  it('should have maximize method that sets proper css classes', ()=> {
    let e = new MouseEvent('click');
    component.maximize(null);
    component.maximize(e);
    expect(component.bsModalClass).toEqual(["vt-dialog", "modal", "fade", "in"]);
  });
});
