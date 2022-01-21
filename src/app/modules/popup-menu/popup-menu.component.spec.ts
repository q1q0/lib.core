import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMenuComponent } from './popup-menu.component';
import { MenuItemDirective } from './menu-item.directive';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { SessionModule } from '../session/session.module';
import { BaseModule } from '../base/base.module';
import { Component, ViewChild } from '@angular/core';
import { MenuDirective } from './menu.directive';
import { By } from '@angular/platform-browser';
import { ContextMenuService } from './context-menu.service';
import { PopupMenuModule } from './popup-menu.module';
import { PopupMenuContainerComponent } from './popup-menu-container/popup-menu-container.component';
@Component({
  selector: "vt-test-popup-component",
  template: `
  <vt-popup-menu-container></vt-popup-menu-container>
  <vt-popup-menu id="NgnsSCR_SoOrd_EntryConposi01_PomOrderRightClick" idName="サンプル右クリックメニュー">
    <vt-menu text="回線追加">
        <vt-menu-item id="NgnsSCR_SoOrd_EntryConposi01_MniBase" idName="ベース回線追加" text="ベース回線追加"></vt-menu-item>
        <vt-menu-item id="NgnsSCR_SoOrd_EntryConposi01_MniPoi" idName="POI中継回線追加" text="POI中継回線追加"></vt-menu-item>
    </vt-menu>
    <vt-menu-item id="NgnsSCR_SoOrd_EntryConposi01_MniCopy" idName="複写" text="複写"></vt-menu-item>
    <vt-menu-item text="-"></vt-menu-item>
    <vt-menu-item id="NgnsSCR_SoOrd_EntryConposi01_MniDetail" idName="回線情報詳細" text="回線情報詳細" (onCommand)="thunkIt()"></vt-menu-item>
  </vt-popup-menu>
  `
})
export class TestPopupMenuComponent {
  @ViewChild(PopupMenuContainerComponent) popupMenuContainer: PopupMenuContainerComponent;

  constructor(public contextMenuService: ContextMenuService) {
    
  }

  thunkIt() {
    console.log("thunk it!");
  }
}

describe('PopupMenuComponent', () => {
  const contextMenuId: string = "NgnsSCR_SoOrd_EntryConposi01_PomOrderRightClick";

  let component: PopupMenuComponent;
  let fixture: ComponentFixture<PopupMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestPopupMenuComponent
      ],
      imports: [
        SessionModule,
        BaseModule,
        PopupMenuModule
      ],
      providers: [
        ContextMenuService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menu items', ()=>{
    const fixture = TestBed.createComponent(TestPopupMenuComponent);
    fixture.detectChanges();
    fixture.autoDetectChanges(true);

    fixture.componentInstance.contextMenuService.showContextMenu(contextMenuId);

    expect(fixture.componentInstance.popupMenuContainer.popupMenu).toBeDefined();
    expect(fixture.componentInstance.popupMenuContainer.popupMenu.menuItems.length).toEqual(4);
  });

  it('should read menu item input(s)', ()=>{
    const fixture = TestBed.createComponent(TestPopupMenuComponent);
    fixture.detectChanges();
    fixture.autoDetectChanges(true);

    fixture.componentInstance.contextMenuService.showContextMenu(contextMenuId);

    expect(fixture.componentInstance.popupMenuContainer.popupMenu.menuItems[0].text).toEqual("回線追加");
  });

  it('should read menu item should have children (not including itself)', ()=>{
    const fixture = TestBed.createComponent(TestPopupMenuComponent);
    fixture.detectChanges();
    fixture.autoDetectChanges(true);

    fixture.componentInstance.contextMenuService.showContextMenu(contextMenuId);

    expect(fixture.componentInstance.popupMenuContainer.popupMenu.menuItems[0].menuItems.length).toEqual(2);
  });

  //moved to e2e
  // it('should read menu item  onCommand should fire when click', ()=>{
  //   const fixture = TestBed.createComponent(TestPopupMenuComponent);
  //   fixture.detectChanges();
  //   fixture.autoDetectChanges(true);

  //   spyOn(fixture.componentInstance, "thunkIt");

  //   fixture.componentInstance.comp.show();
  //   fixture.detectChanges();
  //   const testEl = fixture.debugElement.query(By.css("#NgnsSCR_SoOrd_EntryConposi01_MniDetail a"));
  //   (testEl.nativeElement as HTMLElement).click();

  //   expect(fixture.componentInstance.thunkIt).toHaveBeenCalled();
  // });
});
