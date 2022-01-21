import { Component, forwardRef, ViewChild } from '@angular/core';
import { BaseComponent } from './modules/base/base.component';
import { TreeTableComponent } from './modules/tree-table/tree-table.component';
import { HTMLElementWrapper } from './modules/tree-table/html-element-wrapper';
import { PopupMenuComponent } from './modules/popup-menu/popup-menu.component';
import { ViewComponent } from './modules/view/view.component';
import { DynamicElement } from './modules/dynamic/dynamic-element';
import { TableComponent } from './modules/table/table.component';
import { UiDocument } from './modules/base/ui-document';

export class MyMco {
  hello() {
    alert("Hello world!");
  }

  handleDoubleClick(arg) {
    alert("double click!" + arg);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //provide our self so our children can identify themselve
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>AppComponent),
      multi: false
    }
  ]
})
export class AppComponent extends ViewComponent {
  @ViewChild("treeTable", {read: TreeTableComponent}) treeTable: TreeTableComponent;
  @ViewChild("table2", {read: TableComponent}) table2: TableComponent;

  mco: any;

  title = 'vivify-core-components';
  smoker: boolean = false;
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

  dynamicTableDs: Array<any> = [];

  dynamicCols: Array<any> = [];

  treeTableID: 'treeTableTest';

  dynamicTableData: Array<any> = [
    {
      firstName: 'Homer',
      lastName: 'Simpson',
      smoker: false
    },
    {
      firstName: 'Marge',
      lastName: 'Simpson',
      smoker: true
    }
  ];

  someArrayOfData: Array<any> = [
    {
      firstName: 'Homer',
      lastName: 'Simpson',
      smoker: false
    },
    {
      firstName: 'Marge',
      lastName: 'Simpson',
      smoker: true
    }
   ]

   dataForSort: Array<any> = [
      '20110270',	
      '20180100',	
      '20180110',	
      '20180130',	
      '20180220',	
      'S1322023',	
      'S1322024',	
      'S1327060',	
      'S1327099',	
      'S1333000',	
      'S1333010',	
      'S1333020',	
      'S1333030',	
      'S1333040',	
      'S1333050',	
      'S1333060',	
      'S1333070',	
      'S1333080',	
      'S1333200',	
      'S1333300',	
      'S1333410',	
      'S1333420',	
      'S1333430',	
      'S1333440',	
      'S1333450',	
      'S1333500',	
      'S1333510',	
      'S1333600',	
      'S1333700',	
      'S1337020',	
      'S1337021',	
      'S1337022',	
      'S1337023',	
      'S1337024',
      'S1337025',	
      'S1337026',
      'S1337027',
      'S1337028',	
      'S1337029',	
      'S1337030',	
      'S1337031',	
      'S1337032',
      'S1337033',	
      'S1337034',	
      'S1337035',	
      'S1337041',
      'S1337042',
      'S1337051',
      'S1337052',
      'S1343000',
      'S14410A8',
      'S14410A9',	
      'S14410B5',
      'S14410B6',	
      'S14410B9',
      'S2092000',
      'S2093000',
      'S2094000',	
      'S2095000',	
      'S2096000',	
      'S2097000',	
      'S2098000',	
      'S2099000',	
      'S2101000',	
      'S2102000',	
      'S2103000',	
   ];


   isHeader3Visible: boolean = true;

   initDs() {
    this.dynamicCols = [
      {
        header: "Dynamic 1"
      },
      {
        header: "Dynamic 2"
      }
    ];

     this.dynamicTableDs = [
       {
         text: "Dynamic text 1"
       },
       {
        text: "Dynamic text 2"
      }
     ]
   }

   messagesList: Array<DynamicElement> = [];

   toggleSmoker() {
   this.smoker = !this.smoker;
    this.someArrayOfData.forEach(item=>item.smoker = this.smoker);
   }

   launchView() {

   }

   addTreeTableData() {
    if (this.mco == null) {
      this.mco = this.getSession().getMcoContainer().addMco("mco", new MyMco());
    }

    this.treeTable.clearRows();

    //first row
    const row = this.treeTable.addRow();
    this.addCell(row, "Homer");
    this.addCell(row, "Simpson");
    this.addCell(row, "no");

    const row2 = this.treeTable.addRow();
    this.addCell(row2, "Bart");
    this.addCell(row2, "Simpson");
    this.addCell(row2, "no");

    row.appendChild(row2);

    this.treeTable.redrawTree();
    this.treeTable.expandAll();
   }

   private addCell(row: HTMLElementWrapper, text: string) {
    const cell= this.treeTable.addCell();
    cell.setText(text);
    cell.setPopup("#NgnsSCR_SoOrd_EntryConposi01_PomOrderRightClick");
    cell.setOnContextMenu("mco://mco.hello()");
    cell.setOnDoubleClick("mco://mco.handleDoubleClick(this)");
    row.appendChild(cell);
   }

   showPopup() {
     this.getSession().showContextMenu("NgnsSCR_SoOrd_EntryConposi01_PomOrderRightClick");
   }

   setEnableComp(comp, value) {
     comp.setAttribute("enabled", value);
   }

   bodyInit() {
     super.bodyInit();

    this.messagesList.push({
      type: 'panel',
      children: [
        {
          type: 'label',
          text: 'Name: '
        },
        {
          type: 'textField',
          id: 'dynamicName'
        },
        {
          type: "button",
          text: "click me!",
          onCommand: (thisArg)=>alert(thisArg)
        }
      ]
    });

    for (let i = 0; i < 10; i++) {
      this.dynamicTableData.push({
        firstName: 'firstname ' + i,
        lastName: 'lastname' + i
      });
    }
   }

   toggleHeader3() {
     this.isHeader3Visible = !this.isHeader3Visible;
   }

   lru() {
     this.findElementById("label-test");
     this["_findElementCache"].clear();
   }

   rowCustomAttributeBuilder(row: any, rowNumber: number) {
     return {
       "popup": "#NgnsSCR_SoOrd_EntryConposi01_PomOrderRightClick"
     }
   }

   testRightClickPriorToPopup() {
     const foo = UiDocument.findElementById("NgnsSCR_SoOrd_EntryConposi01_MniChange");
     foo.setAttribute("foo", "bar");
     foo.setAttribute("text", "Hello World");
   }

   alert() {
     alert("fooo!");
   }

   handleOnContextMenuCb() {
    console.error(Date.now());
   }
}