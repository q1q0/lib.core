import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { ElementRef, DebugElement, Component, ViewChild, Renderer2 } from '@angular/core';

import { BsDropdownModule, BsDropdownToggleDirective } from 'ngx-bootstrap';
import { ComboBoxModule } from './combo-box.module';
import { BaseModule } from '../base/base.module';
import { ComboBoxComponent } from './combo-box.component';
import { McoContainerModule } from '../mco-container/mco-container.module';
import { McoContainerService } from '../mco-container/mco-container.service';

@Component({
  selector: 'app-test-combobox',
  template: `
	<vt-combo-box id="test-combobox" controlWidth="150">
		<vt-list-box>
			<vt-list-item text="" value=""></vt-list-item>
			<vt-list-item text="Apple" value="1" selected="true"></vt-list-item>
			<vt-list-item text="Orange" value="2"></vt-list-item>
		</vt-list-box>
	</vt-combo-box>
  `
})
export class ComboBoxTest {
  @ViewChild(ComboBoxComponent) comboBox: ComboBoxComponent;
}

class MockElementRef extends ElementRef {
	constructor() {
		super('vt-combo-box');
	}
}

describe('ComboBoxComponent', () => {
  let component: ComboBoxTest;
  let fixture: ComponentFixture<ComboBoxTest>;
  let comboBoxEl: DebugElement;
  let comboboxItems = [
    {
      text: "hello",
      value: 1,
      selected: false
    },
    {
      text: "world",
      value: 2,
      selected: true
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboBoxTest ],
      providers: [
        BaseComponent,
        SessionService,
        McoContainerService,
        {
          provide: ElementRef,
          useClass: MockElementRef
        },
        Renderer2
      ],
      imports: [
        BsDropdownModule.forRoot(),
        ComboBoxModule,
        BaseModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboBoxTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initialize list items', ()=>{
    expect(component.comboBox.listItems.length).toEqual(3);
  });

  it("should return the selected item value when listBox has selected item", ()=>{
    expect(component.comboBox.getValue()).toEqual("1");
  });

  it("should return the selected item text when listBox has selected item", ()=>{
    expect(component.comboBox.getText()).toEqual("Apple");
  });

  it('should set listItems to empty array if null is passed to initialize method', ()=> {
    component.comboBox.initializeComboboxValues(null);
    expect(component.comboBox.listItems).toEqual([]);
  });

  it("should return the selected item value after combo is initialize", ()=>{
    component.comboBox.initializeComboboxValues(comboboxItems);

    expect(component.comboBox.getValue()).toEqual(2);
  });

  it("should return the selected item text after combo is initialize", ()=>{
    component.comboBox.initializeComboboxValues(comboboxItems);

    expect(component.comboBox.getText()).toEqual("world");
  });

  it("should return toJson() value correctly", ()=>{
    component.comboBox.initializeComboboxValues(comboboxItems);

    const json: any = component.comboBox.toJson();
    expect(json.text).toEqual("world");
    expect(json.id).toEqual("test-combobox");
    expect(json.value).toEqual(2);
  });

  it('should allow setting selected item', ()=> {
    const combobox = component.comboBox;

    const valueA = 1;
    const itemA = {
      text: 'Option A',
      value: valueA,
      selected: false
    };

    const valueB = 2;
    const itemB = {
      text: 'Option B',
      value: valueB,
      selected: false
    };
    combobox.initializeComboboxValues([itemA, itemB]);
    combobox.setSelectItem(itemA);
    expect(combobox.selectedItem).toEqual(itemA);
  });

  it('should allow setting selected item by value', ()=> {
    const combobox = component.comboBox;

    const valueA = 1;
    const itemA = {
      text: 'Option A',
      value: valueA,
      selected: false
    };

    const valueB = 2;
    const itemB = {
      text: 'Option B',
      value: valueB,
      selected: false
    };
    combobox.initializeComboboxValues([itemA, itemB]);
    combobox.setSelectValue(valueB);
    expect(combobox.selectedItem).toEqual(itemB);
  });

  it('should allow dropdown width to be set', ()=> {
    const combobox = component.comboBox;

    combobox.adjustPulldownWidth();

    expect(combobox.dropdownMenuStyle['width']).toBeDefined();
  });

  it('should unselect selected item if setText is passed null value', ()=> {
    component.comboBox.initializeComboboxValues(comboboxItems);
    component.comboBox.setText(null);
    expect(component.comboBox.selectedItem).toBe(null);
    expect(component.comboBox.getText()).toBe('');
  });

  it('should select item that matches text argument of setText', ()=> {
    component.comboBox.initializeComboboxValues(comboboxItems);
    component.comboBox.setText('world');
    expect(component.comboBox.getText()).toBe('world');
  });

  it('should have method to find and item by text', ()=> {
    component.comboBox.initializeComboboxValues(comboboxItems);
    const item = component.comboBox.findItemByText('world');
    expect(item).toBeDefined();
    expect(item.text).toBe('world');
  });

  it('should have correct nexaweb tag name', ()=> {
    expect(component.comboBox['getNxTagName']()).toBe('comboBox');
  });
});
