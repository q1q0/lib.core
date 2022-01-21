import { OnInit, ElementRef, QueryList, NgZone, Renderer2, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { TableColumnDirective } from '../table/table-column.directive';
import { HTMLElementWrapper } from './html-element-wrapper';
/**
 * Class for tree table component
 */
export declare class TreeTableComponent extends BaseComponent implements OnInit {
    private zone;
    private cd;
    rowData: Array<any>;
    columnDefs: Array<any>;
    useDocFragment: boolean;
    columns: QueryList<TableColumnDirective>;
    tableBody: ElementRef<HTMLElement>;
    _bodyFragment: DocumentFragment;
    private nodes;
    selectedNodes: Array<number>;
    private selectedRowElements;
    constructor(parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, zone: NgZone, renderer: Renderer2, cd: ChangeDetectorRef);
    /**
     * Init lifecycle. Must call parent ngOnInit
     */
    ngOnInit(): void;
    /**
     * After view init lifecycle. Set table columns and call parent ngAfterViewInit
     */
    ngAfterViewInit(): void;
    /**
     * Destroy lifecycle. Delete tree nodes to clear out references
     */
    ngOnDestroy(): void;
    /**
     * Remove all child rows from this table
     */
    clearRows(): void;
    /**
     * Create table row but DO NOT append to table
     */
    createRow(): HTMLElementWrapper;
    /**
     * Create table row and append to table
     */
    addRow(): HTMLElementWrapper;
    /**
     * Set a row as selected and set selected style
     * @param nodeIndex Index of node/row to select
     * @param isSelected Toggle to set selected style
     */
    _selectRow(nodeIndex: number, isSelected: boolean): void;
    /**
     * This function is called by setAttribute(row, value);
     * @param row Row to set as selected row
     * @param isSelected Toggle selected state and style
     */
    selectRow(row: HTMLElementWrapper, isSelected: boolean): void;
    getSelectedRows(): Array<HTMLElementWrapper>;
    /**
     * Create table cell (will not append to anything)
     * @returns The table cell that is created
     */
    createCell(): HTMLElementWrapper;
    /**
     * @deprecated used createCell instead
     */
    addCell(): HTMLElementWrapper;
    /**
     * Re-render tree table. Must call jQuery plugin's method on element to re-render.
     */
    redrawTree(): void;
    /**
     * Expand all nodes in the tree
     */
    expandAll(): void;
    /**
     * Collapse all node in the tree
     */
    collapseAll(): void;
    /**
     * Get child nodes of the table
     * @returns [[nodes]]
     */
    getTableChildren(): Array<HTMLElementWrapper>;
    /**
     * Get number of child nodes for this tree
     * @returns Number of child nodes
     */
    getChildCount(): number;
    /**
     * Get child node by id
     * @param id
     */
    getChildById(id: string): HTMLElementWrapper;
    /**
     * Get list of nodes from XPath expression string
     * @param xpathExpression
     */
    evaluateXPath(xpathExpression: string): any;
    /**
     * Adds child node to the tree
     * @param node Child to add
     */
    private trackNode;
    /**
     * Get NexaWeb tag name
     * @returns Tagname
     */
    protected getNxTagName(): string;
    /**
     * Get [[cd]] (Change detector) property
     * @returns Change detector reference
     */
    protected getChangeDetector(): ChangeDetectorRef;
    /**
     * Set node expanded property value
     * @param status Value for node's expanded property
     */
    private setNodeExpandedStatus;
    /**
     * Get JSON representation for this component
     * @returns Component metadata as JSON object
     */
    toJson(): {};
    /**
     * Set the elements parent ID
     * @param el
     */
    private setParentScreenId;
    getNodes(): HTMLElementWrapper[];
    private createDocFragment;
    appendFragment(): void;
}
