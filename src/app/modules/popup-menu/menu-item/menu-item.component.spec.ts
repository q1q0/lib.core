import { Component, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MenuItemComponent } from './menu-item.component';
import { SessionModule } from '../../session/session.module';
import { MenuItem } from '../menu-item';

@Component({
	selector: 'app-test-componnent',
  template: `
  <ul>
    <li vt-menu-item-comp text="Hello world"
      id="test-123"
      popupMenuId="test-menu-id"
      [item]="menuItems[0]"
      [menuItems]="menuItems"
      [display]="true"
      [visible]="true">
    </li>
  </ul>
	`
})
class AppTestComponent {
  menuItems = [
    {
      id: '1',
      visible: true,
      text: 'Item 1'
    },
    {
      id: '2',
      visible: true,
      text: 'Item 2'
    }
  ];
}
class MockElementRef extends ElementRef {
	constructor() {
		super({
      tagName: 'vt-menu-item-comp'
    });
	}
}

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<AppTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemComponent, AppTestComponent ],
      imports: [
        SessionModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTestComponent);
    component = fixture.debugElement.query(By.directive(MenuItemComponent)).injector.get(MenuItemComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should set display attribute", ()=>{
    component.item = {
      display: false
    }

    component.setAttribute("display", true);
    expect(component.getAttribute("display")).toBe(true);
    component.setAttribute("text", "Test");
    expect(component.getAttribute("text")).toBe("Test");
    component.setAttribute("customAttribute", "red");
    expect(component.getAttribute("customAttribute")).toBe("red");
  });

  describe('Inputs', ()=> {
    it('should accept a "text" input', ()=> {
      expect(component.text).toBe("Hello world");
    });

    it('should accept an "id" input', ()=> {
      expect(component.id).toBe('test-123');
    });

    it('should accept a "menuItems" input', ()=> {
      expect(component.menuItems).toBeDefined();
    });

    it('should accept a "display" input', ()=> {
      expect(component.display).toBe(true);
    });

    it('should accept a "visible" input', ()=> {
      expect(component.visible).toBe(true);
    });

    it('should accept an "item" input', ()=> {
      expect(component.item).toBeDefined();
    });

    it('should accept a "popupMenuId" input', ()=> {
      expect(component.popupMenuId).toBeDefined();
      expect(component.popupMenuId).toBe('test-menu-id');
    });
  });

  it('should have a method to check if menuItems exist', ()=> {
    expect(component.hasMenuItems).toBe(true);
  });

  it('should convert to Json correctly', ()=>{
    const json: any = component.toJson();
    expect(json.id).toEqual('test-123');
    expect(json.text).toEqual('Hello world');
    expect(json.popup).toEqual('#test-menu-id');
  });
});
