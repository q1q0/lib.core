import { EventEmitter, OnInit, QueryList, ElementRef, ChangeDetectorRef, Renderer2, NgZone, IterableDiffers, DoCheck } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { TableColumnDirective } from './table-column.directive';
import { TableSelectionEvent } from './table-selection-event';
import { HTMLElementWrapper } from '../tree-table/html-element-wrapper';
import { OnCreateEvent } from '../base/on-create-event';
import { Vector } from '../java/vector';
import { TableRowDefDirective } from './table-row-def.directive';
import { FooterRowDirective } from './footer-row.directive';
import { RowDirective } from './row.directive';
import { ViewComponent } from '../view/view.component';
import { ClipboardService } from '../clipboard/clipboard.service';
import { TableCellDirective } from './table-cell.directive';
declare type SelectionMode = "none" | "singleRow" | "multiRow" | "singleCell" | "multiCell" | "singleColumn" | "multiColumn";
export interface VirtualColumnChangeData {
    text: string;
    checked: boolean;
}
/**
 * Class for table component
 */
export declare class TableComponent extends BaseComponent implements OnInit, DoCheck {
    private el;
    private changeDetectorRef;
    private zone;
    private clipboardService;
    private static readonly INTERNAL_VIRTUAL_ORIGINAL_INDEX;
    private static readonly INTERNAL_VIRTUAL_ROW_DATA;
    private static readonly INTERNAL_ROW_DIFFER_ID;
    private static readonly INTERNAL_ROW_ID;
    private static readonly INTERNAL_COLUMN_HEADER_ID;
    selectionMode: SelectionMode;
    rowCustomAttributeBuilder: (row: any, rowNumber?: number, view?: ViewComponent) => {};
    rowIdBuilder: (row: any, rowNumber?: number) => string;
    rowStyleFn: (row: any) => string;
    /** Enable use of virtual scrolling, if this is on, controlWidth and controlHeight must be defined */
    virtualScroll: boolean;
    virtualScrollSortFn: (view: BaseComponent, columnIndex: number) => string;
    virtualScrollInvisibleRowBuilder: (view: BaseComponent, rowData: any) => HTMLElementWrapper;
    rowHeight: number;
    scrollTimeout: number;
    showBlankRow: boolean;
    dataSource: Array<any>;
    private _virtualViewPort;
    private _dataSource;
    /** Weather or not should enabled sort, default to enabled (null/undefined/true mean enabled) */
    enableSort: boolean;
    /** Weather or not should allow column drag/drop, default to enabled (null/undefined/true mean enabled) */
    enableColumnDragging: boolean;
    /** Weather or not should allow column resize, default to enabled (null/undefined/true mean enabled) */
    enableColumnResize: boolean;
    /** Whether row can be dropped into this table */
    droppable: boolean | string;
    /**
     * Restricted right click popup menu only to cell where popup is defined
     * <ng-template ...><vt-label ...popup="abc"></vt-label></ng-template>
     * */
    restrictCellPopup: boolean;
    onChange: EventEmitter<TableSelectionEvent>;
    onStateChange: EventEmitter<void>;
    onDoubleClick: EventEmitter<TableSelectionEvent>;
    onDragDrop: EventEmitter<void>;
    table: ElementRef;
    tableContainer: ElementRef;
    tableWrapper: ElementRef;
    tableHead: ElementRef;
    tableFoot: ElementRef;
    ghostHeader: ElementRef;
    tableColumns: QueryList<TableColumnDirective>;
    columns: Array<TableColumnDirective>;
    tableRowDef: TableRowDefDirective;
    footerRow: FooterRowDirective;
    tableRowQuery: QueryList<RowDirective>;
    readonly tableRow: Array<RowDirective>;
    private _tableRow;
    forceFixWidth: boolean;
    isHeaderPadding: boolean;
    isHeaderAuto: boolean;
    skipRowsAdjustment: boolean;
    forceResetColumns: boolean;
    tableLayout: string;
    nodes: Array<HTMLElementWrapper>;
    headNode: HTMLElementWrapper;
    selectedRows: Array<number>;
    lastSelectedRowIndex: number;
    private _prevSelectedRows;
    private readonly ROW_INDEX_KEY;
    private $colResizable;
    private $dragableColumns;
    private $tablesorter;
    private scrollHandler;
    private modifiedVirtualRows;
    private modifiedVirtualRowsJson;
    private dataSourceDiffer;
    private columnsDiffer;
    private customRowDiffer;
    private virtualScrollDataSourceDiffer;
    private previousRowIndex;
    private scrollSubcription;
    private scrollSubject;
    private keyupHandler;
    _virtualScrollDivHeight: number;
    private _virtualScrollRowPerView;
    private _isViewInit;
    private maxScrollTop;
    tableStyles: {
        [name: string]: string;
    };
    scrollContainerStyles: {
        [name: string]: string;
    };
    virtualScrollProgressStyles: {
        [name: string]: string;
    };
    virtualScrollSortKeys: Array<string>;
    prevScrollTop: number;
    prevScrollTopForHiddenHeader: number;
    sortDirection: string;
    sortColumnId: number;
    private _disabledScrolling;
    private _tableSorterRefreshTm;
    private _tableSorterCacheRefreshTm;
    private _isHeaderCell;
    private animationFrameId;
    private theadHeight;
    private scrollLeft;
    private columnsHasBeenSwapped;
    private initTm;
    private draggableRows;
    private shouldHandleMouseUp;
    private isHeaderAppendToFakeTable;
    private adjustedRows;
    private skipGhostHeader;
    private clientHeightVirtualScroll;
    private preMouseEvent;
    private isIE9;
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param el see [[BaseComponent]] constructor
     * @param changeDetectorRef Inject ChangeDetector
     * @param renderer see [[BaseComponent]] constructor
     * @param zone Inject NgZone
     * @param differs Inject InterableDiffers
     * @param clipboardService Inject [[ClipboardService]]
     */
    constructor(parent: BaseComponent, sessionService: SessionService, el: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, zone: NgZone, differs: IterableDiffers, clipboardService: ClipboardService);
    /**
     * 画面がリサイズされた際に動かすイベント
     */
    tableResize(): void;
    /**
     * Do check lifecycle
     */
    ngDoCheck(): void;
    /**
     * Init lifecycle. Call parent class ngOnInit
     */
    ngOnInit(): void;
    /**
     * After view init lifecycle. Apply jQuery plugin and event listeners
     */
    ngAfterViewInit(): void;
    private initPlugins;
    /**
     * Destroy lifecycle. Remove event listeners
     */
    ngOnDestroy(): void;
    /**
     * Check to see if columns have changes
     */
    private checkColumnsForChanged;
    private checkCustomRowsForChanged;
    private clearHeaderNodes;
    /**
     * Clean up our faux table children
     */
    private cleanUpChildNodes;
    /**
     * Get the datasource row count
     * @returns Number of rows in [[dataSource]]
     */
    getRowCount(): number;
    /**
     * Add/remove row to list of selected rows
     * @param row
     * @param isSelected If true, row will be added, otherwise row will be removed from selected rows collection
     */
    selectRow(row: HTMLElementWrapper, isSelected: boolean): void;
    /**
     * Event handler for click on row
     * @param event Mouse click event
     * @param rowIndex Index of the row that was clicked
     * @event onStateChange
     */
    onRowClick(event: MouseEvent, rowIndex: number): void;
    private triggerStateChange;
    private getChildByOriginalRowIndex;
    handleMouseUp(event: MouseEvent, rowIndex: number, row: any): void;
    /**
     * Set row as selected/unselected
     * @param rowIndex Index of row to toggle on/off
     */
    toggleRowSelection(event: MouseEvent, rowIndex: number, row: any, isMouseUp?: boolean): void;
    /**
     * return the actual indexes base on datasource
     *
     * @param index
     */
    private getOriginalIndex;
    /**
     * Set [[disabled]] property value
     * @param boo Toggle [[disabled]]
     */
    setDisabled(boo: boolean): void;
    /**
     * Get [[disabled]] property value
     */
    getDisabled(): boolean;
    /**
     * Get a collection of all row elements that are selected
     * @returns The selected rows
     */
    getSelectedRows(): Array<HTMLElementWrapper>;
    /**
     * Get collection of selected row indexes
     */
    getSelectedRowIndexes(): Array<number>;
    /**
     * Event handler for row select event
     * @param event
     */
    handleRowSelection(event: any): void;
    /**
     * Event handler for double click on cell
     * @param event
     * @event onDoubleClick
     */
    handleCellActivation(event: any): void;
    appendRowIndexToRow(row: any, rowIndex: number): void;
    /**
     * Trigger change detection and re-render the table
     * @param clearData Set to true to empty table data
     */
    refresh(clearData?: boolean): void;
    /**
     * Get [[changeDetectorRef]] property
     * @return the ChangeDetector
     */
    protected getChangeDetector(): ChangeDetectorRef;
    /**
     * Get NexaWeb tag name
     * @returns Tag name
     */
    protected getNxTagName(): string;
    /**
     * Conver the content of this screens to JSON object so it can be sent to the server.
     */
    toJson(): {};
    /**
     * Convert child to JSON
     * @param child child to be converted to JSON
     */
    protected childToJson(child: BaseComponent): {};
    /**
     * Add element to internal list of row, cell, or header cell
     * @param type 'row' | 'cell' | 'headcell'
     * @param event Create event
     * @param rowOrColumnIndex
     * @param rowDataOrColumnDef
     */
    registerFauxElement(type: string, event: OnCreateEvent, rowOrColumnIndex: number, rowDataOrColumnDef: any): void;
    /**
     * Get [[nodes]] property
     * @returns Node list
     */
    getTableChildren(): Array<HTMLElementWrapper>;
    /**
     * Get number of nodes
     * @returns Number of nodes
     */
    getChildCount(): number;
    /**
     * Get all children of this table
     * @return List of children
     */
    getChildren(): Vector<any>;
    /**
     *
     * @param xpathExpression Get query result from an xpath expression string
     */
    evaluateXPath(xpathExpression: string): any;
    /**
     *
     * @param childOrArrayOrStringWtf
     * @param rowNumber
     */
    appendChild(childOrArrayOrStringWtf: any, rowNumber?: number): void;
    /**
     * Check if the row has been selected
     * @param rowIndex Index of row to check
     * @returns True if row is a selected row
     */
    isSelectedRow(rowIndex: number, row: any): boolean;
    /**
     * Get custom attributes of row if it has any, otherwise return null
     * @param row
     * @param rowOrColumnIndex
     */
    getRowCustomAttributes(row: any, rowOrColumnIndex: number): any;
    /**
     * Check if column is visible. Either by index or column
     * @param index
     * @param column
     * @returns True if column is visible
     */
    isColumnVisible(index: number, column?: TableColumnDirective): boolean;
    /**
     * Add a child component to the table
     * @param child Component to add
     */
    protected addChild(child: BaseComponent): void;
    /**
     * 選択中の行を削除する
     */
    removeSelectedRow(): void;
    /**
     * Check if this is a container component
     * @returns True
     */
    protected isContainer(): boolean;
    /**
     * Add row to list of nodes
     * @param event
     * @param rowOrColumnIndex
     * @param rowData
     */
    private trackRow;
    toRowIndex(rowIndex: number, rowData: any): number;
    /**
     * Add cell to list of nodes
     * @param event
     * @param columnDef
     */
    private trackCell;
    private trackHeadCell;
    /**
     * Add element to internal [[nodes]] list to keep track of
     * @param node Element to add to internal node list
     */
    private trackNode;
    /**
     * Set the parent screen id on an element
     * @param el
     */
    private setParentScreenId;
    /**
     * Get invoke [[rowStyleFn]] on a row and get it's style
     * @param row
     * @returns Style attributes
     */
    rowStyleClass(row: any): string;
    /**
     * Find the child node by id
     * @param id Child's id
     */
    getChildNodeById(id: string): HTMLElementWrapper;
    /**
     * Handle cell onContextMenu if component inside the cell has not already handle it
     *
     * @param rowNumber
     * @param columnIndex
     * @param event
     */
    handleColumnOnContextMenu(column: TableCellDirective, rowNumber: any, columnIndex: number, event: MouseEvent): void;
    /**
     * Event handler for context click on the header
     * @param columnIndex Index of column that was clicked
     * @param event
     */
    handleHeaderOnContextMenu(columnIndex: number, event: MouseEvent): void;
    private recalculateVirtualScrollData;
    /**
     * Event handler for table head change. Set style to properly display
     * @param event
     */
    private adjustTableHead;
    /**
     * Set table footer styles for proper display
     */
    private adjustTableFooter;
    /**
     * Event handler for keyup. Copy keyboard shortcut support
     * @param event Keyup event
     */
    handleKeyUp(event: KeyboardEvent): void;
    /**
     * Check to see if we can send selected rows to clipboard
     */
    copySelectedRowAsText(): void;
    /**
     * Generate a row id based on row's [[id]] and index
     * @param row
     * @param rowIndex
     */
    buildRowId(row: any, rowIndex: number): string;
    /**
     * Sort the data (for virtual scroll)
     *
     * @param column
     */
    handleSort(column: TableColumnDirective): void;
    /**
     * Calculate the overall height so we can add scrollbar for virtual scroll. This is done
     * by multiplying the number of rows to the height of each row.
     *
     */
    private calcVirtualScrollHeight;
    /**
     * Adjust/move the position of the table container so that it displayed properly.
     *
     * @param scrollTop
     */
    private calcVirtualTablePosition;
    /**
     * Calculate the visible virtual rows to display to the user
     *
     * @param scrollTop
     */
    private calcVirtualScrollViewPort;
    private _swap;
    /**
     * Swap the columns after a column is being drag and rop
     *
     * @param fromIndex column that is being dragged (moved)
     * @param toIndex  column that is being droped into
     */
    private swapColumns;
    private _cleanupColResize;
    applyResizeColumns(): void;
    /**
     * Return whether or not the column at the particular index can be dragged/drop
     *
     * @param colIdx
     */
    private canDragColumn;
    /**
     * Return the index of the suppplied row
     *
     * @param child row to check fo rindex?
     */
    indexOfChild(child: any): number;
    private _checkInitModifiedVirtualRows;
    private _checkInitModifiedVirtualRowsJson;
    /**
     * Refresh the table sorter
     */
    private refreshTableSorter;
    /**
     * Refresh cache data (sort value, etc)
     */
    refreshTableSorterCache(): void;
    setSelectAllVirtualRows(shouldSelected: boolean): void;
    private recCalcNoVirtualRow;
    private setHeaderWidthHeight;
    /**
     * Reset table column (in case it has been swapped)
     */
    private resetTableColumns;
    private buildRowIdentity;
    rowTrackByFn(idx: number, row: any): any;
    columnHeaderTrackByFn(idx: number, column: TableColumnDirective): any;
    /**
     * Removed vt-row by index. This will not works for rows that are created by dataSource
     */
    removeTableRowByIndex(index: number): void;
    /**
     * Removed vt-row by id. This will not works for rows that are created by dataSource
     */
    removeTableRowById(id: string): void;
    private toColumns;
    private toWholeNumber;
    private checkShowBlankRow;
    /**
     * Remove row from tableRows by id. no detect change
     * @param id row element id
     */
    removeFromTableRow(id: string): void;
}
export {};
