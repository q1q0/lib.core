import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef, Renderer2, Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TreeTableComponent } from './tree-table.component';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { HTMLElementWrapper } from './html-element-wrapper';
import { TreeTableModule } from './tree-table.module';

class MockElementRef extends ElementRef {
	constructor() {
		super({
      tagName: 'vt-tree-table'
    });
	}
}

@Component({
  selector: 'vt-test-tree-table',
  template: `
    <vt-tree-table #treeTable id="tree-table-test" [columnDefs]="treeColumnDefs"></vt-tree-table>
  `
})
export class TestTreeTableComponent {
  @ViewChild(TreeTableComponent) treeTable: TreeTableComponent;
  
  treeColumnDefs: Array<any> = [
    {
      headerName: 'First Name',
      field: 'firstName'
    },
    {
      headerName: 'Last Name',
      field: 'lastName'
    },
    {
      headerName: 'Is Smoker',
      field: 'smoker'
    }
  ];

  addTreeTableData() {
    
    this.treeTable.clearRows();

    //first row
    const row = this.treeTable.addRow();
    const homer = this.addCell(row, "Homer");
    this.addCell(row, "Simpson");
    this.addCell(row, "no");

    homer.setAttribute("homerCustomAge", "50");

    const row2 = this.treeTable.addRow();
    this.addCell(row2, "Bart");
    const bartSimpon = this.addCell(row2, "Simpson");
    this.addCell(row2, "no");

    bartSimpon.setAttribute("bartTestCustom", "hello");

    row.appendChild(row2);

    this.treeTable.redrawTree();
   }

   private addCell(row: HTMLElementWrapper, text: string) {
    const cell= this.treeTable.addCell();
    cell.setText(text);
    row.appendChild(cell);
    return cell;
   }
}

describe('TreeTableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TestTreeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTreeTableComponent],
      providers: [
        BaseComponent,
        SessionService,
        { provide: ElementRef, useClass: MockElementRef },
        Renderer2
      ],
      imports: [
        TreeTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTreeTableComponent);
    component = fixture.debugElement.query(By.directive(TreeTableComponent)).injector.get(TreeTableComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("toJson", ()=>{
    it("should contains row element(s)", ()=>{
      const testFixture = TestBed.createComponent(TestTreeTableComponent);
      const testComponent = testFixture.componentInstance;
      fixture.detectChanges();
      fixture.autoDetectChanges();

      testComponent.addTreeTableData();

      const json = testComponent.treeTable.toJson();
      expect(json["children"].length).toEqual(2);
      expect(json["children"][0]["tagName"]).toEqual("row");
    });

    it("should contains cell element(s)", ()=>{
      const testFixture = TestBed.createComponent(TestTreeTableComponent);
      const testComponent = testFixture.componentInstance;
      fixture.detectChanges();
      fixture.autoDetectChanges();

      testComponent.addTreeTableData();
      const json = testComponent.treeTable.toJson();
      expect(json["children"][0]["children"].length).toEqual(3);
      expect(json["children"][0]["children"][0]["tagName"]).toEqual("cell");
    });

    it("cell should list custom attributes", ()=>{
      const testFixture = TestBed.createComponent(TestTreeTableComponent);
      const testComponent = testFixture.componentInstance;
      fixture.detectChanges();
      fixture.autoDetectChanges();

      testComponent.addTreeTableData();
      const jsonString = JSON.stringify(testComponent.treeTable.toJson());
      expect(jsonString.indexOf(`"bartTestCustom"`)).toBeGreaterThan(0);
    });

    it('should be able to clear rows', ()=> {
      component.clearRows();
      expect(component.getNodes()).toEqual([]);
    });
  });
});
