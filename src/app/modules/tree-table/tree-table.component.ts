import { Component, OnInit, Input, ElementRef, SkipSelf, Optional, QueryList, ViewChildren, ViewEncapsulation, NgZone, ContentChildren, ViewChild, TemplateRef, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { TableColumnDirective } from '../table/table-column.directive';
import { HTMLElementWrapper } from './html-element-wrapper';

declare var jQuery: any;

import * as _ from "lodash";
import { Vector } from '../java/vector';

/**
 * Class for tree table component
 */
@Component({
  selector: 'vt-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>TreeTableComponent)
    }
  ]
})
export class TreeTableComponent extends BaseComponent implements OnInit {
  @Input() rowData: Array<any>;
  @Input() columnDefs: Array<any>;
  @Input() useDocFragment: boolean;

  @ContentChildren(TableColumnDirective)
  columns: QueryList<TableColumnDirective>;

  @ViewChild("tableBody", {read: ElementRef}) tableBody: ElementRef<HTMLElement>;

  _bodyFragment: DocumentFragment;

  private nodes: Array<HTMLElementWrapper> = [];
  selectedNodes: Array<number> = [];
  private selectedRowElements: Array<HTMLElementWrapper> = [];

  constructor(
    @Optional() @SkipSelf() parent: BaseComponent,
    sessionService: SessionService,
    elementRef: ElementRef,
    private zone: NgZone,
    renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) {
    super(parent, sessionService, elementRef, renderer);
  }

  /**
   * Init lifecycle. Must call parent ngOnInit
   */
  ngOnInit() {
    super.ngOnInit();

    // Width/Height is required otherwise grid will collapse to zero.
    // if (!this.controlHeight) this.controlHeight = '500px';
    // if (!this.controlWidth) this.controlWidth = '500px';
  }

  /* istanbul ignore next */
  /**
   * After view init lifecycle. Set table columns and call parent ngAfterViewInit
   */
  ngAfterViewInit() {
    //make sure to call sure it can init thing
    super.ngAfterViewInit();

    this.createDocFragment();

    if (this.columns != null && this.columns.length > 0) {
      this.columnDefs = [];

      this.columns.forEach(column=>{
        this.columnDefs.push({
          headerName: column.header,
          controlWidth: column.controlWidth
        });
      });
    }

    if (this.rowData && this.rowData.length > 0) {
      this.zone.runOutsideAngular(()=> {
        jQuery(`#${this.id} .jq-tree-table`).treetable();
      });
    }
  }

  /**
   * Destroy lifecycle. Delete tree nodes to clear out references
   */
  ngOnDestroy() {
    this.tableBody = null;

    this._bodyFragment = null;

    if (this.nodes != null) {
      for (let node of this.nodes) {
        node.destroy();
      }
    }

    this.nodes = null;
  }

  /**
   * Remove all child rows from this table
   */
  clearRows() {
    // while(this.tableBody.nativeElement.firstChild) {
    //   this.renderer.removeChild(this.tableBody.nativeElement, this.tableBody.nativeElement.firstChild);
    // }

    (this.tableBody.nativeElement as HTMLElement).innerHTML = "";

    this.nodes = [];
    this.selectedNodes = [];
    this.selectedRowElements = [];
    this.createDocFragment();
  }

  /* istanbul ignore next */
  /**
   * Create table row but DO NOT append to table
   */
  createRow(): HTMLElementWrapper {
    const row: HTMLElementWrapper = new HTMLElementWrapper(this.renderer, "row", this.getSession());
    row.setAttribute("id", BaseComponent.generateUniqueId("row"));
    row.parentTableId = this.id;
    row.parentTable = this;
    this.setParentScreenId(row);

    this.zone.runOutsideAngular(()=>{
      row.htmlElement.addEventListener("mousedown", ()=>{
        if (this.selectedNodes != null) {
          this.selectedNodes.forEach(idx=>{
            this._selectRow(idx, false);
          });
        }

        this.selectedRowElements = [];
        this.selectRow(row, true);
      });
    });

    this.trackNode(row);

    return row;
  }

  /* istanbul ignore next */
  /**
   * Create table row and append to table
   */
  addRow(): HTMLElementWrapper {
    const row = this.createRow();

    if (this.useDocFragment === true) {
      this._bodyFragment.appendChild(row.htmlElement);
    } else {
      this.renderer.appendChild(this.tableBody.nativeElement, row.htmlElement);
    }
    row.htmlElement.style["background"] = "";
    return row;
  }

  /* istanbul ignore next */
  /**
   * Set a row as selected and set selected style
   * @param nodeIndex Index of node/row to select
   * @param isSelected Toggle to set selected style
   */
  _selectRow(nodeIndex: number, isSelected: boolean) {

    let idx = _.findIndex(this.selectedNodes, (node) => {
        return node === nodeIndex;
    });

    /* istanbul ignore if */
    if (isSelected) {
        //if it wasn't selected, add it in selectedRows.
        if (idx < 0) {
            this.selectedNodes.push(nodeIndex);
            this.nodes[nodeIndex].htmlElement.querySelector('td').style.color = 'blue';
        }
    } else {
        //if it was selected before, remove it from selectedRows.
        if (idx >= 0) {
            this.selectedNodes.splice(idx, 1);
            this.nodes[nodeIndex].htmlElement.querySelector('td').style.color = "";
        }
    }
  }

  /**
   * This function is called by setAttribute(row, value);
   * @param row Row to set as selected row
   * @param isSelected Toggle selected state and style
   */
  selectRow(row: HTMLElementWrapper, isSelected: boolean) {
    if (this.nodes == null) return;
    let nodeIndex = _.findIndex(this.nodes, (node) => {
      return node === row;
    });
    //Now in the as-is'tree-table only one row can be selected.

    let tds: NodeList = this.elementRef.nativeElement.querySelectorAll('td');

    for (let i = 0; i < tds.length; i++) {
      (tds[i] as HTMLElement).style.color = '';
    }

    for (let i = 0; i < this.nodes.length; i++) {
      this._selectRow(i, false);
    }

    this._selectRow(nodeIndex, true);

    if (isSelected) {
      this.selectedRowElements.push(row);
    } else {
      this.selectedRowElements = this.selectedRowElements.filter(el=>{
        return el._uniqueId !== row._internalId;
      });
    }
  }

  getSelectedRows(): Array<HTMLElementWrapper> {
    return this.selectedRowElements;
  }

  /* istanbul ignore next */
  /**
   * Create table cell (will not append to anything)
   * @returns The table cell that is created
   */
  createCell(): HTMLElementWrapper {
    const cell: HTMLElementWrapper = new HTMLElementWrapper(this.renderer, "cell", this.getSession());
    cell.setAttribute("id", BaseComponent.generateUniqueId("cell"));
    this.setParentScreenId(cell);

    //for cell, we need to append it to the row
    this.trackNode(cell);

    return cell;
  }

  /* istanbul ignore next */
  /**
   * @deprecated used createCell instead
   */
  addCell(): HTMLElementWrapper {
    return this.createCell();
  }

  /* istanbul ignore next */
  /**
   * Re-render tree table. Must call jQuery plugin's method on element to re-render.
   */
  redrawTree() {
    this.zone.runOutsideAngular(()=>{
      /* istanbul ignore next */
      jQuery(`#${this.id} .jq-tree-table`).treetable({
        expandable: true
      }, true);
      this.markForCheck();

      const jq = jQuery(`#${this.id} .jq-tree-table`)[0]["parentElement"]["id"];

      if("NgnsSCR_SoOrd_EthEntryConposi01_TreOrderTree" !== jq 
      && "NgnsSCR_SoOrd_EthEntryConposi02_TreOrderTree" !== jq
      && "NgnsSCR_SoOrd_EntryConposi01_TreOrderTree" !== jq){
        setTimeout(() => {
          jQuery(`#${this.id} .jq-tree-table`).colResizable({
            liveDrag: false, //turning this on will incurred a severe performance penalty on IE so leave it off
            resizeMode: 'overflow',
            partialRefresh: true, //After closing the window and opening again, columnResizer can't work. To fix that, this value is needed.,
            headerOnly: true //allow dragging using header only
          });
          this.markForCheck();
        }, 300);
      }else{
        setTimeout(() => {
          jQuery(`#${this.id} .jq-tree-table`).colResizable({
            liveDrag: false, //turning this on will incurred a severe performance penalty on IE so leave it off
            resizeMode: 'overflow',
            headerOnly: true //allow dragging using header only
          });
          this.markForCheck();
        }, 300);
      }
    });
  }

  /* istanbul ignore next */
  /**
   * Expand all nodes in the tree
   */
  expandAll() {
    /* istanbul ignore next */
    jQuery(`#${this.id} .jq-tree-table`).treetable("expandAll");
    this.setNodeExpandedStatus("true");
  }

  /* istanbul ignore next */
  /**
   * Collapse all node in the tree
   */
  collapseAll() {
    jQuery(`#${this.id} .jq-tree-table`).treetable("collapseAll");
    this.setNodeExpandedStatus("false");
  }

  /**
   * Get child nodes of the table
   * @returns [[nodes]]
   */
  getTableChildren(): Array<HTMLElementWrapper> {
    return this.nodes;
  }

  /* istanbul ignore next */
  /**
   * Get number of child nodes for this tree
   * @returns Number of child nodes
   */
  getChildCount(): number {
    return this.nodes != null ? this.nodes.length : 0;
  }

  /**
   * Get child node by id
   * @param id
   */
  getChildById(id: string): HTMLElementWrapper {
    if (this.nodes != null) {
      const temp = _.filter(this.nodes, (item: HTMLElementWrapper)=>item.getId() === id);

      if (temp.length > 0) {
        return temp[0];
      }
    }

    return null;
  }

  /* istanbul ignore next */
  /**
   * Get list of nodes from XPath expression string
   * @param xpathExpression
   */
  /* istanbul ignore next */
  evaluateXPath(xpathExpression: string): any {
    /* istanbul ignore next */
    const result: Vector<any> = new Vector<any>();
    /* istanbul ignore next */
    const xpathResult: XPathResult = document.evaluate(xpathExpression.replace("cell[", "td[").replace("row[", "tr["), this.elementRef.nativeElement, null, XPathResult.ANY_TYPE, null);

    if (xpathResult != null) {
      let node: Node = xpathResult.iterateNext();

      while(node) {
        result.add(node);
        node = xpathResult.iterateNext();
      }
    }

    return result;
  }

  /**
   * Adds child node to the tree
   * @param node Child to add
   */
  private trackNode(node: HTMLElementWrapper) {
    if (this.nodes == null) {
      this.nodes = [];
    }

    this.nodes.push(node);
  }

  /**
   * Get NexaWeb tag name
   * @returns Tagname
   */
  protected getNxTagName() {
    return "treeTable";
  }

  /* istanbul ignore next */
  /**
   * Get [[cd]] (Change detector) property
   * @returns Change detector reference
   */
  protected getChangeDetector() {
    return this.cd;
  }

  /**
   * Set node expanded property value
   * @param status Value for node's expanded property
   */
  private setNodeExpandedStatus(status: string) {
    if (this.nodes != null) {
      _.forEach(this.nodes, (node)=>{
        if (node.getLocalName() === "row") {
          node.expanded = status;
        }
      });
    }
  }

  /**
   * Get JSON representation for this component
   * @returns Component metadata as JSON object
   */
  toJson(): {} {
    const retVal = super.toJson();

    if (this.nodes != null) {
      const children = this.nodes.filter(node=>node.getLocalName() === "row");

      if (children.length > 0) {
        retVal["children"] = children.map(child=>child.toJson());
      }
    }

    return retVal;
  }
  /**
   * Set the elements parent ID
   * @param el
   */
  private setParentScreenId(el: HTMLElementWrapper) {
    if (this.getParentView() != null) {
        el.parentScreenId = this.getParentView().getId();
    }
  }

  public getNodes(): HTMLElementWrapper[] {
    return this.nodes
  }

  private createDocFragment() {
    if (this.useDocFragment === true) {
      this._bodyFragment = document.createDocumentFragment();
    }
  }

  appendFragment() {
    if (this._bodyFragment != null) {
      (this.tableBody.nativeElement as HTMLElement).appendChild(this._bodyFragment);
    }
  }
}
