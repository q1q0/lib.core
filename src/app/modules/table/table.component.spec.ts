import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement, ElementRef, Renderer2, Component, ViewChild, forwardRef, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TableComponent } from './table.component';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { ViewComponent } from '../view/view.component';
import { BaseModule } from '../base/base.module';
import { ViewModule } from '../view/view.module';
import { SessionModule } from '../session/session.module';
import { McoContainerModule } from '../mco-container/mco-container.module';
import { TableModule } from './table.module';
import { RadioButtonModule } from '../radio-button/radio-button.module';
import { LabelModule } from '../label/label.module';
import { DialogModule } from '../dialog/dialog.module';
import { TextFieldModule } from '../text-field/text-field.module';
import { ButtonModule } from '../button/button.module';
import { LayoutModule } from '../layout/layout.module';
import { LabelComponent } from '../label/label.component';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { AttributesEnum } from '../base/attributes.enum';

//test virtual table
@Component({
  selector: "vt-test-table",
  template: `
  <vt-dialog id="testVirtualTable">
    <vt-table #myTable [skipRowsAdjustment]="true" [dataSource]="myDs" id="myFunkyTable" [virtualScroll]="true" [rowHeight]="40" controlHeight="250">
      <vt-table-column>
        <vt-header text="ID"></vt-header>
        <ng-template vt-table-cell let-row="row" let-rowIndex="rowIndex">
          <vt-cell id="id{{rowIndex}}" text="{{rowIndex + 1}}"></vt-cell>
        </ng-template>
      </vt-table-column>
      <vt-table-column>
        <vt-header text="Radio"></vt-header>
        <ng-template vt-table-cell let-row="row" let-rowIndex="rowIndex">
          <vt-radio-button id="rad{{rowIndex}}" text="Test" [checked]="row['radio']"></vt-radio-button>
        </ng-template>
      </vt-table-column>
      <vt-table-column>
        <vt-header text="Check me"></vt-header>
        <ng-template vt-table-cell let-row="row" let-rowIndex="rowIndex">
          <vt-check-box id="chk{{rowIndex}}" text="Checkme" [isChecked]="row['checked']"></vt-check-box>
        </ng-template>
      </vt-table-column>
      <vt-table-column>
        <vt-header text="Text field"></vt-header>
        <ng-template vt-table-cell let-row="row" let-rowIndex="rowIndex">
          <vt-text-field id="txt{{rowIndex}}"></vt-text-field>
        </ng-template>
      </vt-table-column>
    </vt-table>
  </vt-dialog>
  `,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>VirtualTableTest)
    }
  ]
})
export class VirtualTableTest extends ViewComponent {
  @ViewChild("myTable", {read: TableComponent}) myTable: TableComponent;
  myDs: Array<any>;

  constructor(
    sessionService: SessionService,
    elementRef: ElementRef,
    private cd: ChangeDetectorRef
  ){
    super(null, sessionService, elementRef);
  }

  getChangeDetector() {
    return this.cd;
  }

  bodyInit(){
    this.myDs = [];

    for (let i = 0; i < 100; i++) {
      this.myDs.push({
        id: i,
        radio: i == 2 ? true : false,
        checked: i === 3 ? true: false
      });
    }

    this.detectChanges();
  }
}

@Component({
  selector: "vt-test-table",
  template: `
    <vt-dialog id="test-table">
      <vt-table #myTable [skipRowsAdjustment]="true" [dataSource]="myDs" id="myFunkyTable" [rowIdBuilder]="rowIdBuilder">
        <vt-table-column id="myTestColumnId" [visible]="true" [locked]="true" [customAttributes]="{'someAttribute': 1, 'otherAttribute': 'hello world'}">
          <vt-header text="ID"></vt-header>
          <ng-template vt-table-cell let-row="row" let-rowIndex="rowIndex">
            <vt-radio-button id="id{{rowIndex}}" text="Test" value="{{row['id']}}"></vt-radio-button>
          </ng-template>
        </vt-table-column>
        <vt-table-column>
          <vt-header text="Name"></vt-header>
          <ng-template vt-table-cell let-row="row" let-rowIndex="rowIndex">
            <vt-label id="name{{rowIndex}}" text="{{row['name']}}"></vt-label>
          </ng-template>
        </vt-table-column>
        <vt-table-column>
          <vt-header text="Other"></vt-header>
          <ng-template vt-table-cell let-row="row" let-rowIndex="rowIndex">
            Just plain text
          </ng-template>
        </vt-table-column>
        <vt-table-column>
          <vt-header text="Column with no cell def"></vt-header>
        </vt-table-column>
        <vt-table-column>
          <vt-header text="Whatever"></vt-header>
          <ng-template vt-table-cell>
            <vt-panel #myPanel id="myPanel">
              <vt-label [visible]="false" id="lbl" text="Label"></vt-label>
              <vt-button *ngIf="true" id="btn" text="Button"></vt-button>
              <vt-text-field *ngIf="true" id="txtField" text="Text field"></vt-text-field>
            </vt-panel>
          </ng-template>
        </vt-table-column>
      </vt-table>
    </vt-dialog>
  `,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>TestTableComponent)
    }
  ]
})
export class TestTableComponent extends ViewComponent {
  @ViewChild("myTable", {read: TableComponent}) myTable: TableComponent;
  
  myDs: Array<any> = [
    {
      id: 1,
      name: "Homer Simpson"
    },
    {
      id: 2,
      name: "Marge Simpson"
    }
  ];

  rowIdBuilder(row: any, rowIndex: number) {
    return "hello-world" + rowIndex;
  }
}

@Component({
  selector: "test-table-row",
  template: `
  <vt-dialog id="testTableRow">
    <vt-table #myTable [skipRowsAdjustment]="true" id="BepSlaList01_TblDamages">
      <vt-table-column [sortable]="false" alignHorizontal="center" controlWidth="105">
        <vt-header cssClass="header" text="対象年月"></vt-header>
      </vt-table-column>
      <vt-table-column [sortable]="false" controlWidth="105">
        <vt-header cssClass="header" richText="true" text="故障日数"></vt-header>
      </vt-table-column>

      <vt-row controlHeight="26">
        <ng-template vt-table-cell let-row="row" let-rowIndex="rowIndex">
          <vt-label id="lbl1" text="Test label"></vt-label>
        </ng-template>
        <ng-template vt-table-cell let-row="row" let-rowIndex="rowIndex">
          <vt-text-field id="txt1" text="hello world"></vt-text-field>
        </ng-template>
      </vt-row>
    </vt-table>
  </vt-dialog>
  `,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>TestTableRowComponent)
    }
  ]
})
export class TestTableRowComponent extends ViewComponent {
  @ViewChild("myTable", {read: TableComponent}) myTable: TableComponent;
}

class MockElementRef extends ElementRef {
	constructor() {
		super(null);
	}
}

describe('TableComponent', () => {
  let component: TestTableComponent;
  let fixture: ComponentFixture<TestTableComponent>;
  let tableEl: DebugElement;

  let virtualFixture: ComponentFixture<VirtualTableTest>;
  let virtualComp: VirtualTableTest;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTableComponent, VirtualTableTest, TestTableRowComponent ],
      providers: [
        {
          provide: ElementRef,
          useClass: MockElementRef
        }
      ],
      imports: [
        BaseModule,
        ViewModule,
        SessionModule,
        McoContainerModule,
        TableModule,
        RadioButtonModule,
        CheckboxModule,
        LabelModule,
        DialogModule,
        TextFieldModule,
        ButtonModule,
        LayoutModule
      ]
    })
    .compileComponents();
  }));

  describe("Default table", ()=>{
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTableComponent);
      component = fixture.componentInstance;
      tableEl = fixture.debugElement.query(By.css('table'));
    });

    it('should create', () => {
      fixture.detectChanges();
      expect(fixture.componentInstance.myTable).toBeDefined();
    });

    describe("toJson()", ()=>{
      it("should not be empty/null", ()=>{
        fixture.detectChanges();

        const json = fixture.componentInstance.myTable.toJson();
        expect(json).toBeDefined();
      });

      it("should have rows as array if parent view is active view", ()=>{
        fixture.detectChanges();

        const json = fixture.componentInstance.myTable.toJson();
        expect(Array.isArray(json["rows"])).toBeTruthy();
      });

      it("should have the correct number of rows", ()=>{
        fixture.detectChanges();

        const json = fixture.componentInstance.myTable.toJson();
        expect(json["rows"].length).toEqual(2);
      });

      it("each row should have correct number of cells", ()=>{
        fixture.detectChanges();

        const json = fixture.componentInstance.myTable.toJson();
        expect(json["rows"][0]["children"].length).toEqual(5);
      });

      it("tagName of each row should be 'row'", ()=>{
        fixture.detectChanges();

        const json = fixture.componentInstance.myTable.toJson();
        expect(json["rows"][0]["tagName"]).toEqual("row");
        expect(json["rows"][0]["nxTagName"]).toEqual("row");
      });

      it("tagName of label should be 'cell'", ()=>{
        fixture.detectChanges();

        const json = fixture.componentInstance.myTable.toJson();
        expect(json["rows"][0]["children"][1]["tagName"]).toEqual("cell");
        expect(json["rows"][0]["children"][1]["nxTagName"]).toEqual("cell");
      });

      it("tagName of other cell should be the tagName of the component it wrap", ()=>{
        fixture.detectChanges();

        const json = fixture.componentInstance.myTable.toJson();
        expect(json["rows"][0]["children"][0]["nxTagName"]).toEqual("radioButton");
      });

      it("each cell should have id", ()=>{
        fixture.detectChanges();

        const json = fixture.componentInstance.myTable.toJson();
        expect(json["rows"][0]["children"][1]["id"]).toEqual("name0");
      });

      it("cell should have inner children if it is not a label", ()=>{
        fixture.detectChanges();

        const json = fixture.componentInstance.myTable.toJson();
        expect(json["rows"][0]["children"][0]["nxTagName"]).toEqual("radioButton");
      });

      //this is no longer valid, we will send everything
      // it("should NOT have rows as array if parent view is NOT active view", ()=>{
      //   fixture.detectChanges();

      //   //overload to force active view to nothing
      //   fixture.componentInstance.getSession().getMcoContainer().activeView = function() {
      //     return null;
      //   }

      //   const json = fixture.componentInstance.myTable.toJson();
      //   expect(Array.isArray(json["rows"])).toBeFalsy();
      // });

      it("should have rows as array if parent view is NOT active view but is a subview", ()=>{
        fixture.detectChanges();

        //overload to force active view to nothing
        fixture.componentInstance.getSession().getMcoContainer().activeView = function() {
          return null;
        }

        //make view as subview
        fixture.componentInstance.canBeActiveView = false;

        const json = fixture.componentInstance.myTable.toJson();
        expect(Array.isArray(json["rows"])).toBeTruthy();
      });

      it("should NOT stored table row id to View (when the row is NOT clicked)", ()=>{
        fixture.detectChanges();

        const rowId = "hello-world0";

        expect(component.findElementById(rowId)).toBeNull();
      });

      it("should stored table row id to View (when the row is clicked)", ()=>{
        fixture.detectChanges();

        const rowId = "hello-world0";

        //call rowClick to imm. user clicking on the row
        component.myTable.onRowClick(null, 0);
        expect(component.findElementById(rowId) == null).toBeFalsy();
      });

      it("should remove previous clicked table row id to View (when new row is clicked)", ()=>{
        fixture.detectChanges();

        const rowId = "hello-world0";

        //call rowClick to imm. user clicking on the row
        component.myTable.onRowClick(null, 0);
        component.myTable.onRowClick(null, 1);
        expect(component.findElementById(rowId) == null).toBeTruthy();
      });

      it("toJson() should contains columns definition", ()=>{
        fixture.detectChanges();
        expect(component.myTable.toJson()["columnDefs"] != null).toBeTruthy();
      });

      it("toJson() columnDefs should contains two column", ()=>{
        fixture.detectChanges();
        const columnDefs = component.myTable.toJson()["columnDefs"];
        expect(columnDefs.length).toEqual(5);
      });

      it("toJson() columnDefs should contains correct information", ()=>{
        fixture.detectChanges();
        const columnDefs = component.myTable.toJson()["columnDefs"];
        expect(columnDefs[0].visible).toEqual("true");
        expect(columnDefs[0].locked).toEqual("true");
      });

      it("tagName of locked column toJson() should be lockedColumn", ()=>{
        fixture.detectChanges();
        const columnDefs = component.myTable.toJson()["columnDefs"];
        expect(columnDefs[0].tagName).toEqual("lockedColumn");
        expect(columnDefs[0].nxTagName).toEqual("lockedColumn");
      });

      it("tagName of regular column toJson() should be column", ()=>{
        fixture.detectChanges();
        const columnDefs = component.myTable.toJson()["columnDefs"];
        expect(columnDefs[1].tagName).toEqual("column");
        expect(columnDefs[1].nxTagName).toEqual("column");
      });

      it("each column should contains header child", ()=>{
        fixture.detectChanges();
        const columnDefs = component.myTable.toJson()["columnDefs"];
        expect(columnDefs[0].children.length).toEqual(1);
      });

      it("tagName of column header should be header", ()=>{
        fixture.detectChanges();
        const columnDefs = component.myTable.toJson()["columnDefs"];
        expect(columnDefs[1].children[0].tagName).toEqual("header");
        expect(columnDefs[1].children[0].nxTagName).toEqual("header");
      });

      it("toJson() header should have text attribute", ()=>{
        fixture.detectChanges();
        const columnDefs = component.myTable.toJson()["columnDefs"];
        expect(columnDefs[0].children[0].text).toEqual("ID");
      });

      it("toJson() each column def should contains customAttributes if one exists", ()=>{
        fixture.detectChanges();
        const columnDefs = component.myTable.toJson()["columnDefs"];
        expect(columnDefs[0].customAttributes.someAttribute).toEqual("1");
        expect(columnDefs[0].customAttributes.otherAttribute).toEqual("hello world");
      });

      it("toJson() customAttributes should not contains numeric enum", ()=>{
        fixture.detectChanges();

        component.setElementAttributeById("myTestColumnId", AttributesEnum.VISIBLE, false);
        const columnDefs = component.myTable.toJson()["columnDefs"];
        expect(columnDefs[0].visible).toBe("false");
        expect(columnDefs[0].customAttributes["1"]).toBeUndefined();
      });

      it("toJson() row should have selected property set to true if selected", ()=>{
        fixture.detectChanges();
        component.myTable.selectedRows = [0];

        const rows = component.myTable.toJson()["rows"];
        expect(rows[0].selected).toEqual("true");
      });

      it("toJson() row should NOT have selected property if it is not selected", ()=>{
        fixture.detectChanges();

        const rows = component.myTable.toJson()["rows"];
        expect(rows[0].selected).toBeUndefined();
      });

      it("cell template that without component (plain text) should have id", ()=>{
        fixture.detectChanges();

        const json = fixture.componentInstance.myTable.toJson();
        expect(json["rows"][0]["children"][2]["id"]).not.toBeNull();
      });

      it("cell teamplate without component (plain text) should convert to json correctly", ()=>{
        fixture.detectChanges();

        const json = fixture.componentInstance.myTable.toJson();
        expect(json["rows"][0]["children"][2]["text"]).toEqual("Just plain text");
      });

      it("toJson() should converted isLockedColumn to string not boolean", ()=>{
        fixture.detectChanges();

        const json = fixture.componentInstance.myTable.toJson();
        expect(json["rows"][0]["children"][0]["isLockedColumn"]).toBe("true");
        expect(json["rows"][0]["children"][1]["isLockedColumn"]).toBe("false");
      });


      it("toJson() should put columns in proper order after being swapped", ()=>{
        fixture.detectChanges();
  
        fixture.componentInstance.myTable["swapColumns"](0, 2);
        fixture.componentInstance.myTable.detectChanges();

        fixture.componentInstance.myDs.push(
          {
            id: 3,
            name: "Test Simpson"
          }
        );

        fixture.componentInstance.detectChanges();
        fixture.componentInstance.myTable.detectChanges();
        
        const json = fixture.componentInstance.myTable.toJson();
        expect(json["rows"][2]["children"][2]["text"]).toEqual("Just plain text");
      });

      it("toJson() should put columns def in proper order after being swapped", ()=>{
        fixture.detectChanges();
  
        fixture.componentInstance.myTable["swapColumns"](0, 2);
        fixture.componentInstance.myTable.detectChanges();
        
        const columnDefs = component.myTable.toJson()["columnDefs"];
        expect(columnDefs[0].children[0].text).toEqual("ID");
        expect(columnDefs[2].children[0].text).toEqual("Other");
      });
    });

    it("panel inside template with ngIf conditional children should return children in proper order", ()=>{
      fixture.detectChanges();

      expect(fixture.componentInstance.myTable.getTableChildren()[0].getChildren()[4].component.getChildren().get(0).getId()).toEqual("lbl");
    });

    it("should support custom row id builder", ()=>{
      fixture.detectChanges();
      expect(fixture.componentInstance.myTable.nodes[0].getId()).toBe("hello-world0");
    });

    it("indexOfChild should return the index of supplied row", ()=>{
      fixture.detectChanges();

      expect(fixture.componentInstance.myTable.indexOfChild(fixture.componentInstance.myTable.nodes[1])).toBe(1);
    });

    it("table.toJson()[children] should only contains header info", ()=>{
      fixture.detectChanges();

      const children = fixture.componentInstance.myTable.toJson()["children"].filter(item=>item["nxTagName"] !== "headrow" && item["nxTagName"] !== "headcell");
      expect(children.length).toBe(0);
    });
  });

  describe("VirtualScroll", ()=>{
    beforeEach(() => {  
      //virtual
      virtualFixture = TestBed.createComponent(VirtualTableTest);
      virtualComp = virtualFixture.componentInstance;
    });

    it("dataSource should have 100 rows", ()=>{
      virtualFixture.detectChanges();
      expect(virtualComp.myTable.getRowCount()).toBe(100);
    });

    it("should not render the whole dataSource", ()=>{
      virtualFixture.detectChanges();

      expect(virtualComp.myTable.dataSource.length).toBeLessThan(100);
    });

    it("should have 5 rows", ()=>{
      virtualFixture.detectChanges();

      expect(virtualComp.myTable.dataSource.length).toBe(5);
    });

    it("scrolldown should move to next row", ()=>{
      virtualFixture.detectChanges();

      const el = virtualFixture.debugElement.query(By.css("div.table-scroller"));
      //(el.nativeElement as HTMLDivElement).scrollTo(0, 4000);
      el.triggerEventHandler("scroll", null);
      virtualComp.myTable["calcVirtualScrollViewPort"](3800);

      expect(virtualComp.myTable.dataSource.length).toBeLessThan(6);
    });

    it("scrolldown should reset nodes list (empty and reload)", ()=>{
      virtualFixture.detectChanges();

      const el = virtualFixture.debugElement.query(By.css("div.table-scroller"));
      //(el.nativeElement as HTMLDivElement).scrollTo(0, 4000);
      el.triggerEventHandler("scroll", null);
      virtualComp.myTable["calcVirtualScrollViewPort"](3800);

      virtualComp.myTable.detectChanges();
      
      expect(virtualComp.myTable.nodes.length).toBeGreaterThan(0);
    });

    it("checkbox should exists in table", ()=>{
      virtualFixture.detectChanges();

      const el = virtualFixture.debugElement.query(By.css("input.input-checkbox#chk0"));

      expect(el).not.toBeNull();
    });

    it("checkbox should checked when clicked", ()=>{
      virtualFixture.detectChanges();

      const el = virtualFixture.debugElement.query(By.css("input.input-checkbox#chk0"));
      el.nativeElement.click();

      expect((el.nativeElement as HTMLInputElement).checked).toBeTruthy();
    });

    it("modified checkbox should be tracked when user scroll away", ()=>{
      virtualFixture.detectChanges();

      const el = virtualFixture.debugElement.query(By.css("input.input-checkbox#chk0"));
      el.nativeElement.click();

      const scroller = virtualFixture.debugElement.query(By.css("div.table-scroller"));
      //(el.nativeElement as HTMLDivElement).scrollTo(0, 4000);
      scroller.triggerEventHandler("scroll", null);
      virtualComp.myTable["calcVirtualScrollViewPort"](3800);

      //scrollback
      virtualComp.myTable["calcVirtualScrollViewPort"](0);

      virtualComp.myTable.detectChanges();
      
      expect(virtualComp.myTable.nodes[0].getChildAt(2).getAttribute("selected")).toBeTruthy();
    });

    it("modified textfield should be tracked when user scroll away", ()=>{
      const expectedValue = "Hello world";
      virtualFixture.detectChanges();

      const el = virtualFixture.debugElement.query(By.css("input#txt0"));
      (el.nativeElement as HTMLInputElement).value = expectedValue;
      virtualComp.myTable.nodes[0].getChildAt(3).setAttribute("text", expectedValue);
      virtualComp.myTable.nodes[0].getChildAt(3).component["_notifyInternalChangeCb"]();

      const scroller = virtualFixture.debugElement.query(By.css("div.table-scroller"));
      //(el.nativeElement as HTMLDivElement).scrollTo(0, 4000);
      scroller.triggerEventHandler("scroll", null);
      virtualComp.myTable["calcVirtualScrollViewPort"](3800);

      //scrollback
      virtualComp.myTable["calcVirtualScrollViewPort"](0);

      virtualComp.myTable.detectChanges();
      
      expect(virtualComp.myTable.nodes[0].getChildAt(3).getAttribute("text")).toBe(expectedValue);
    });

    it("toJson() should keep modified data", ()=>{
      virtualFixture.detectChanges();

      const el = virtualFixture.debugElement.query(By.css("input.input-checkbox#chk0"));
      el.nativeElement.click();

      const el2 = virtualFixture.debugElement.query(By.css("input.input-checkbox#chk1"));
      el2.nativeElement.click();

      const scroller = virtualFixture.debugElement.query(By.css("div.table-scroller"));
      //(el.nativeElement as HTMLDivElement).scrollTo(0, 4000);
      scroller.triggerEventHandler("scroll", null);
      virtualComp.myTable["calcVirtualScrollViewPort"](3800);

      virtualComp.myTable.detectChanges();
      
      const json = virtualComp.myTable.toJson();
      expect(json["rows"].length).toBe(7);
    });
  });

  describe("table with custom rows", ()=>{
    it("should convert toJson", ()=>{
      const fx = TestBed.createComponent(TestTableRowComponent);
      const comp = fx.componentInstance;
      fx.detectChanges();

      const json = comp.myTable.toJson();
      expect(json["rows"].length).toBe(1);
    });

    it("toJson should have column", ()=>{
      const fx = TestBed.createComponent(TestTableRowComponent);
      const comp = fx.componentInstance;
      fx.detectChanges();

      const json = comp.myTable.toJson();
      expect(json["rows"][0]["children"][0]["id"]).toBe("lbl1");
    });

    it("toJson should convert column with custom comp", ()=>{
      const fx = TestBed.createComponent(TestTableRowComponent);
      const comp = fx.componentInstance;
      fx.detectChanges();

      const json = comp.myTable.toJson();
      expect(json["rows"][0]["children"][0]["text"]).toBe("Test label");
      expect(json["rows"][0]["children"][0]["nxTagName"]).toBe("cell");
    });
  });
});
