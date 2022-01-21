/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, SkipSelf, Optional, forwardRef, Renderer2, ContentChild, NgZone, IterableDiffers } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { TableColumnDirective } from './table-column.directive';
import { TableSelectionEvent } from './table-selection-event';
import { HTMLElementWrapper } from '../tree-table/html-element-wrapper';
import { Vector } from '../java/vector';
import { TableRowDefDirective } from './table-row-def.directive';
import { FooterRowDirective } from './footer-row.directive';
import { Subject, timer } from 'rxjs';
import { debounce } from "rxjs/operators";
import { RowDirective } from './row.directive';
import { ClientEvent } from '../event-handler/client-event';
import { AppUtils } from '../base/app-utils';
import { ClipboardService } from '../clipboard/clipboard.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { KeyUtils } from '../base/key-utils';
import { isIE } from '../../functions/is-ie';
/**
 * @record
 */
export function VirtualColumnChangeData() { }
/** @type {?} */
VirtualColumnChangeData.prototype.text;
/** @type {?} */
VirtualColumnChangeData.prototype.checked;
/**
 * Class for table component
 */
export class TableComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} el see [[BaseComponent]] constructor
     * @param {?} changeDetectorRef Inject ChangeDetector
     * @param {?} renderer see [[BaseComponent]] constructor
     * @param {?} zone Inject NgZone
     * @param {?} differs Inject InterableDiffers
     * @param {?} clipboardService Inject [[ClipboardService]]
     */
    constructor(parent, sessionService, el, changeDetectorRef, renderer, zone, differs, clipboardService) {
        super(parent, sessionService, el, renderer);
        this.el = el;
        this.changeDetectorRef = changeDetectorRef;
        this.zone = zone;
        this.clipboardService = clipboardService;
        this.selectionMode = "singleRow";
        //use for virtual scrolling
        this.rowHeight = 24;
        this.scrollTimeout = 200;
        /* istanbul ignore next */
        this.onChange = new EventEmitter();
        this.onStateChange = new EventEmitter();
        this.onDoubleClick = new EventEmitter();
        this.onDragDrop = new EventEmitter();
        //custom sort function for virtual scroll
        this.forceFixWidth = true;
        this.isHeaderPadding = false;
        this.isHeaderAuto = false;
        //table-layout default fixed
        this.tableLayout = "fixed";
        //track dynamic rows so we can query for child later
        this.nodes = [];
        this.selectedRows = [];
        this._prevSelectedRows = [];
        this.scrollHandler = null;
        this.previousRowIndex = null;
        this.scrollSubject = new Subject();
        this.prevScrollTop = 0;
        this.prevScrollTopForHiddenHeader = 0;
        this.sortDirection = "";
        this.sortColumnId = 0;
        this.theadHeight = 0;
        this.scrollLeft = 0;
        this.adjustedRows = 0;
        this.preMouseEvent = null;
        this.dataSourceDiffer = differs.find([]).create();
        this.columnsDiffer = differs.find([]).create();
        this.customRowDiffer = differs.find([]).create();
        this.isIE9 = isIE() == 9;
        //for virtual scroll
        this.virtualScrollDataSourceDiffer = differs.find([]).create();
        this.keyupHandler = (evt) => this.handleKeyUp(evt);
        this.scrollHandler = (event) => {
            if (this._disabledScrolling === true) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (this.prevScrollTopForHiddenHeader !== event.srcElement.scrollTop) {
                if (!this.skipGhostHeader) {
                    this.renderer.setStyle(this.ghostHeader.nativeElement, "display", "inline-block");
                    if (this.controlWidth === "100%") {
                        this.renderer.setStyle(this.ghostHeader.nativeElement, "width", "100%");
                    }
                    this.renderer.setStyle(this.tableHead.nativeElement, "visibility", "hidden");
                }
                //   if(this.forceFixWidth){
                //     this.renderer.setStyle(this.fakeTable.nativeElement, "table-layout", "fixed");
                //   }
                if (this.tableFoot != null) {
                    this.renderer.setStyle(this.tableFoot.nativeElement, "visibility", "hidden");
                }
                //   this.appendHeaderToFakeTable();
                if (this.virtualScroll === true) {
                    if (this.animationFrameId != null) {
                        cancelAnimationFrame(this.animationFrameId);
                    }
                    this.adjustTableHead(event, false, true);
                }
            }
            this.prevScrollTopForHiddenHeader = event.srcElement.scrollTop;
            //disabled for IE11/IE9 (too slow)
            // else {
            //     if (this.animationFrameId != null) {
            //         cancelAnimationFrame(this.animationFrameId);
            //    }
            //     this.animationFrameId = requestAnimationFrame(()=>this.adjustTableHead(event, true));
            // }
            this.scrollSubject.next(event);
        };
    }
    /**
     * @param {?} ds
     * @return {?}
     */
    set dataSource(ds) {
        //data has changes, we need to do some clean up.
        this.cleanUpChildNodes();
        this.resetTableColumns();
        this._dataSource = this.buildRowIdentity(ds);
        this.checkShowBlankRow();
        this.previousRowIndex = null;
        this.modifiedVirtualRows = null;
        this.modifiedVirtualRowsJson = null;
        this.selectedRows = [];
        this.calcVirtualScrollHeight();
        this.calcVirtualScrollViewPort();
    }
    /**
     * @return {?}
     */
    get dataSource() {
        return this.virtualScroll === true ? this._virtualViewPort : this._dataSource;
    }
    /**
     * @param {?} columns
     * @return {?}
     */
    set tableColumns(columns) {
        this.clearHeaderNodes();
        this.columns = this.toColumns(columns);
        if (this._isViewInit === true) {
            this.initPlugins();
        }
    }
    /**
     * @param {?} rows
     * @return {?}
     */
    set tableRowQuery(rows) {
        this.cleanUpChildNodes();
        this._tableRow = [];
        this.detectChanges();
        this._tableRow = rows.toArray();
    }
    /**
     * @return {?}
     */
    get tableRow() {
        return this._tableRow;
    }
    /**
     * @return {?}
     */
    get ROW_INDEX_KEY() {
        return '$$$$rowIndex$$$$';
    }
    /**
     * 画面がリサイズされた際に動かすイベント
     * @return {?}
     */
    tableResize() {
        this.adjustTableFooter();
    }
    /**
     * Do check lifecycle
     * @return {?}
     */
    ngDoCheck() {
        if (this.dataSourceDiffer.diff(this._dataSource)) {
            if (this.virtualScroll === true) {
                this.calcVirtualScrollHeight();
                this.calcVirtualScrollViewPort(this.prevScrollTop);
            }
            this.checkShowBlankRow();
            this.markForCheck();
            this.refreshTableSorter();
        }
        else if (this.virtualScroll === true && this.virtualScrollDataSourceDiffer.diff(this._virtualViewPort)) {
            this.checkShowBlankRow();
            this.markForCheck();
        }
        else {
            this.checkCustomRowsForChanged();
            this.checkColumnsForChanged();
        }
    }
    /**
     * Init lifecycle. Call parent class ngOnInit
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
    }
    /**
     * After view init lifecycle. Apply jQuery plugin and event listeners
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        /** @type {?} */
        const view = this._getNoneActiveViewParent() || this.getParentView();
        if (view != null && this.columns != null) {
            this.columns.filter(col => col.id != null && col.id !== "").forEach(col => {
                if (view["_tableColumnsMap"] == null) {
                    view["_tableColumnsMap"] = new Map();
                }
                view["_tableColumnsMap"].set(KeyUtils.toMapKey(col.id), /** @type {?} */ (col));
            });
        }
        //droppable?
        if (this.droppable === true || this.droppable === "true") {
            $(this.tableContainer.nativeElement).droppable({
                classes: {
                    "ui-droppable-hover": "ui-state-hover"
                },
                hoverClass: "ui-state-hover",
                accept: "tr",
                drop: (event, ui) => {
                    this.onDragDrop.emit();
                },
                tolerance: "pointer"
            });
        }
        this.scrollSubcription = this.scrollSubject.pipe(debounce(() => timer(this.scrollTimeout))).subscribe((event) => {
            this.renderer.removeAttribute(this.ghostHeader.nativeElement, "display");
            /* istanbul ignore next */
            if (this.virtualScroll === true) {
                this.recalculateVirtualScrollData(event);
            }
            else {
                this.adjustTableHead(event);
            }
        });
        this.scrollContainerStyles = {
            "overflow-y": "auto",
            "overflow-x": "visible",
            "position": "relative"
        };
        /* istanbul ignore next */
        if (this.virtualScroll === true) {
            try {
                if (this.controlHeight == null || this.controlHeight == "100%")
                    this.clientHeightVirtualScroll = (/** @type {?} */ (this.tableContainer.nativeElement)).clientHeight;
                else
                    this.clientHeightVirtualScroll = parseInt(this.controlHeight);
                if (isNaN(this.clientHeightVirtualScroll) === false) {
                    this.recCalcNoVirtualRow();
                    this._isViewInit = true;
                }
            }
            catch (e) {
            }
            this.tableStyles = {
                "top": "0px",
                "left": "0px",
                "position": "absolute",
                "width": "100%",
                "height": "calc(100% - 17px)",
                "max-width": "100vw",
                "max-height": "100vh"
            };
            this.virtualScrollProgressStyles = {
                "top": "0px",
                "display": "none",
                "position": "absolute"
            };
            this.calcVirtualTablePosition(0);
        }
        /* istanbul ignore next */
        //fix expression has changed blah blah blah
        this.detectChanges();
        if (this.virtualScroll === true) {
            this.calcVirtualScrollHeight();
            this.calcVirtualScrollViewPort(0);
        }
        this.zone.runOutsideAngular(() => {
            this._isViewInit = true;
            this.initPlugins();
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.addEventListener('scroll', this.scrollHandler, true);
                // this.el.nativeElement.addEventListener("mouseup", this.mouseUpHandler, true);
                this.el.nativeElement.addEventListener("keyup", this.keyupHandler, true);
            });
        });
    }
    /**
     * @return {?}
     */
    initPlugins() {
        if (this.$dragableColumns) {
            this.$dragableColumns.destroy();
        }
        if (this.initTm != null) {
            clearTimeout(this.initTm);
        }
        // if (this.table) {
        this.renderer.setStyle(this.table.nativeElement, "visibility", "hidden");
        this.initTm = setTimeout(() => {
            if (this.table) {
                this.renderer.setStyle(this.table.nativeElement, "visibility", "hidden");
                // 再表示時にスクロールバーの位置を戻す
                this.tableContainer.nativeElement.scrollLeft = 0;
                /** @type {?} */
                const jQueryTable = jQuery(this.table.nativeElement);
                if (this.enableColumnDragging == null || this.enableColumnDragging === true) {
                    this.$dragableColumns = jQueryTable.dragableColumns({
                        dropCallback: (fromIndex, toIndex) => this.swapColumns(fromIndex, toIndex),
                        dragEndCallback: () => {
                            this.skipGhostHeader = false;
                            this.scrollContainerStyles["overflow-y"] = "auto";
                            this.detectChanges();
                            this._disabledScrolling = false;
                        },
                        dragStartCallback: (colIdx) => {
                            this.skipGhostHeader = true;
                            /** @type {?} */
                            let canDrag = this.canDragColumn(colIdx);
                            if (canDrag) {
                                this.scrollContainerStyles["overflow-y"] = "hidden";
                                this.detectChanges();
                                this._disabledScrolling = true;
                            }
                            return canDrag;
                        },
                        dragEnterCallback: (colIdx) => {
                            return this.canDragColumn(colIdx);
                        }
                    });
                }
                if ((this.enableSort == null || this.enableSort === true) && this.$tablesorter == null) {
                    if (this.virtualScroll !== true) {
                        this.$tablesorter = jQueryTable.tablesorter({
                            widgets: ['zebra', 'columns'],
                            usNumberFormat: false,
                            tabIndex: false,
                            sortReset: false,
                            sortRestart: true,
                            sortStable: true,
                            delayInit: true // move the initial performance hit to first sort so the table would load faster
                        });
                    }
                }
                else if (this.virtualScroll !== true && this.$tablesorter != null) {
                    this.$tablesorter.trigger("updateHeaders");
                }
                this.setHeaderWidthHeight();
                if (this.enableColumnResize == null || this.enableColumnResize === true) {
                    /** @type {?} */
                    let target_columns = new Array();
                    /** @type {?} */
                    let original_columnWidths = new Array();
                    for (let i = 0; i < this.columns.length; i++) {
                        /** @type {?} */
                        let column = this.columns.find((item, idx) => idx === i);
                        if (column != null) {
                            /** @type {?} */
                            const headChildren = this.tableHead.nativeElement.querySelector('th:nth-child(' + (i + 1) + ')');
                            target_columns.push(headChildren);
                            original_columnWidths.push(headChildren.style.width);
                        }
                    }
                    //reset
                    this._cleanupColResize();
                    this.$colResizable = jQueryTable.colResizable({
                        liveDrag: false,
                        //turning this on will incurred a severe performance penalty on IE so leave it off
                        resizeMode: 'overflow',
                        partialRefresh: true,
                        //After closing the window and opening again, columnResizer can't work. To fix that, this value is needed.,
                        headerOnly: true //allow dragging using header only
                    });
                    for (let i = 0; i < target_columns.length; i++) {
                        /** @type {?} */
                        const targetColumn = target_columns[i];
                        /** @type {?} */
                        const headChildren_width = this.toWholeNumber(targetColumn.style.width.slice(0, -2));
                        /** @type {?} */
                        const originalChildren_width = this.toWholeNumber(original_columnWidths[i]);
                        // if(headChildren_width < originalChildren_width){
                        this.renderer.setStyle(targetColumn, "width", original_columnWidths[i]);
                        // }
                    }
                    target_columns = null;
                    original_columnWidths = null;
                }
                this.adjustTableFooter();
                this.renderer.setStyle(this.table.nativeElement, "table-layout", this.tableLayout);
            }
            if (this.table != null) {
                this.renderer.removeStyle(this.table.nativeElement, "visibility");
            }
        }, 200);
        //}
    }
    /**
     * Destroy lifecycle. Remove event listeners
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.cleanUpChildNodes(true);
        this.clearHeaderNodes(true);
        /** @type {?} */
        const view = this._getNoneActiveViewParent() || this.getParentView();
        if (view != null && view["_tableColumnsMap"] != null) {
            view["_tableColumnsMap"].clear();
            view["_tableColumnsMap"] = null;
        }
        if (this._children != null) {
            this._children.clear();
        }
        this._children = null;
        if (this._viewChildrenMap != null) {
            this._viewChildrenMap.clear();
        }
        this._viewChildrenMap = null;
        if (this.scrollSubcription != null) {
            this.scrollSubcription.unsubscribe();
        }
        this.modifiedVirtualRows = null;
        this.modifiedVirtualRowsJson = null;
        this.scrollSubject = null;
        this.scrollSubcription = null;
        if (this.scrollHandler) {
            this.el.nativeElement.removeEventListener('scroll', this.scrollHandler, true);
            this.scrollHandler = null;
        }
        // if (this.mouseUpHandler) {
        //     this.el.nativeElement.removeEventListener("mouseup", this.mouseUpHandler, true);
        //     this.mouseUpHandler = null;
        // }
        if (this.keyupHandler) {
            this.table.nativeElement.removeEventListener("keyup", this.keyupHandler, true);
            this.keyupHandler = null;
        }
        if (this.$dragableColumns != null) {
            this.$dragableColumns.destroy();
        }
        // if (this.columnsChangeSubscription != null) {
        //     this.columnsChangeSubscription.unsubscribe();
        // }
        // this.columnsChangeSubscription = null;
        this.dataSourceDiffer = null;
        this.columnsDiffer = null;
        this.customRowDiffer = null;
        this.virtualScrollDataSourceDiffer = null;
        this.selectedRows = null;
        this.tableHead = null;
        this.tableWrapper = null;
        this.tableContainer = null;
        this.table = null;
        this.preMouseEvent = null;
        this.scrollContainerStyles = null;
    }
    /**
     * Check to see if columns have changes
     * @return {?}
     */
    checkColumnsForChanged() {
        if (this.columns != null && this.columnsDiffer.diff(this.columns.map(item => {
            return {
                visible: item.visible,
                header: item.header,
                controlWidth: item.controlWidth,
                locked: item.locked,
                enabled: item.enabled,
                sortable: item.sortable
            };
            // PK: DO NOT REMOVED
            // Comment this out for now and revert to previous, will bring this back
            // when we added a diff to check for changes in vt-row
            // return item.visible +
            //     item.header +
            //     item.controlWidth +
            //     item.locked +
            //     item.enabled +
            //     item.sortable;
        }))) {
            //this.cleanUpChildNodes();
            this.markForCheck();
            this.recCalcNoVirtualRow();
        }
    }
    /**
     * @return {?}
     */
    checkCustomRowsForChanged() {
        if (this._tableRow != null && this.customRowDiffer.diff(/** @type {?} */ (this._tableRow))) {
            this.checkShowBlankRow();
            this.markForCheck();
        }
    }
    /**
     * @param {?=} nullOutHeadNode
     * @return {?}
     */
    clearHeaderNodes(nullOutHeadNode = false) {
        if (this.headNode != null) {
            if (this.headNode.childNodes != null && this.headNode.childNodes.length > 0) {
                for (let node of this.headNode.childNodes) {
                    /** @type {?} */
                    const parentView = this.getParentView();
                    if (parentView != null) {
                        parentView.removeViewChildFromMap(node.getId());
                    }
                    node.destroy();
                }
            }
            this.headNode.childNodes = [];
        }
        if (nullOutHeadNode === true) {
            this.headNode = null;
        }
    }
    /**
     * Clean up our faux table children
     * @param {?=} skipTrackingVirtualRow
     * @return {?}
     */
    cleanUpChildNodes(skipTrackingVirtualRow = false) {
        if (this.nodes != null) {
            /** @type {?} */
            const parentView = this.getParentView();
            for (let node of this.nodes) {
                //cache modified data if virtual scroll
                if (skipTrackingVirtualRow !== true &&
                    node.getLocalName() === "row" &&
                    this.virtualScroll === true &&
                    this.modifiedVirtualRows != null &&
                    this.modifiedVirtualRows[node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] != null) {
                    this._checkInitModifiedVirtualRowsJson();
                    this.modifiedVirtualRowsJson[node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = node.toJson();
                }
                //removed ourself from parent cache
                if (parentView != null) {
                    parentView.removeViewChildFromMap(node.getId());
                }
                node.destroy();
            }
        }
        this.nodes = [];
        if (this.virtualScroll !== true) {
            this.selectedRows = [];
        }
        this._prevSelectedRows = [];
        this.lastSelectedRowIndex = null;
    }
    /**
     * Get the datasource row count
     * @return {?} Number of rows in [[dataSource]]
     */
    getRowCount() {
        return this._dataSource ? this._dataSource.length : 0;
    }
    /**
     * Add/remove row to list of selected rows
     * @param {?} row
     * @param {?} isSelected If true, row will be added, otherwise row will be removed from selected rows collection
     * @return {?}
     */
    selectRow(row, isSelected) {
        /** @type {?} */
        let rowIndex = -1;
        if (this.virtualScroll === true) {
            /** @type {?} */
            const tempNode = _.find(this.nodes, (node) => {
                return node === row;
            });
            if (tempNode != null) {
                rowIndex = tempNode[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
            }
        }
        else {
            rowIndex = _.findIndex(this.nodes, (node) => {
                return node === row;
            });
        }
        if (rowIndex >= 0 && rowIndex < this._dataSource.length) {
            /** @type {?} */
            let idx = _.findIndex(this.selectedRows, (row) => {
                return row === rowIndex;
            });
            if (isSelected) {
                //if it wasn't selected, add it in selectedRows.
                if (idx < 0) {
                    this.selectedRows.push(rowIndex);
                }
            }
            else {
                //if it was selected before, remove it from selectedRows.
                if (idx >= 0) {
                    this.selectedRows.splice(idx, 1);
                }
            }
        }
    }
    /**
     * Event handler for click on row
     * \@event onStateChange
     * @param {?} event Mouse click event
     * @param {?} rowIndex Index of the row that was clicked
     * @return {?}
     */
    onRowClick(event, rowIndex) {
        /** @type {?} */
        const parentView = this.getParentView();
        /* istanbul ignore if */
        if (parentView != null) {
            parentView.addViewChildToMap(this.nodes[rowIndex]);
            if (this.previousRowIndex != null && this.nodes[this.previousRowIndex] != null) {
                parentView.removeViewChildFromMap(this.nodes[this.previousRowIndex].getId());
            }
        }
        this.previousRowIndex = rowIndex;
        this.triggerStateChange();
    }
    /**
     * @return {?}
     */
    triggerStateChange() {
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        if (this.getParentView() != null) {
            clientEvent.setParameter("screenId", this.getParentView().getId());
        }
        clientEvent.setParameter("id", this.getId());
        /** @type {?} */
        let rowId = this.selectedRows.map(idx => this.getChildByOriginalRowIndex(idx).getId()).join(",");
        clientEvent.setParameter("rowId", rowId);
        this.getSession().getEventHandler().setClientEvent(clientEvent);
        this.onStateChange.emit();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getChildByOriginalRowIndex(index) {
        /** @type {?} */
        let node = this.nodes[index];
        if (this.virtualScroll === true) {
            node = _.find(this.nodes, (el) => {
                return el[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] === index;
            });
        }
        return node;
    }
    /**
     * @param {?} event
     * @param {?} rowIndex
     * @param {?} row
     * @return {?}
     */
    handleMouseUp(event, rowIndex, row) {
        //for draggale rows, we need to double check row selection again
        if (this.draggableRows === true && this.shouldHandleMouseUp === true) {
            this.toggleRowSelection(event, rowIndex, row, true);
        }
        this.shouldHandleMouseUp = false;
    }
    /**
     * Set row as selected/unselected
     * @param {?} event
     * @param {?} rowIndex Index of row to toggle on/off
     * @param {?} row
     * @param {?=} isMouseUp
     * @return {?}
     */
    toggleRowSelection(event, rowIndex, row, isMouseUp = false) {
        /** @type {?} */
        const targetEl = /** @type {?} */ (event.target);
        if (targetEl.tagName.toLowerCase() == 'input' && targetEl.getAttribute('type') != null) {
            if (targetEl.getAttribute('type').toLowerCase() == 'radio') {
                return;
            }
        }
        if (targetEl.tagName.toLowerCase() == 'button') {
            return;
        }
        /** @type {?} */
        let actualRowIndex = rowIndex;
        //prevent text selection when shiftKey is pressed
        if (event.shiftKey === true && event.preventDefault) {
            event.preventDefault();
        }
        if (this.selectionMode !== "none") {
            if (this.virtualScroll === true && row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] != null) {
                actualRowIndex = row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
            }
            //if user is not pressing shift key, clear all previous selection
            if (event.shiftKey !== true && event.ctrlKey !== true && event.buttons !== 2) {
                /** @type {?} */
                let clearSelection = true;
                if (this.draggableRows === true && isMouseUp !== true && this.selectedRows.indexOf(actualRowIndex) >= 0) {
                    clearSelection = false;
                    this.shouldHandleMouseUp = true;
                }
                if (clearSelection) {
                    this.selectedRows.splice(0, this.selectedRows.length);
                }
            }
            /** @type {?} */
            let idx = _.findIndex(this.selectedRows, (row) => {
                return row === actualRowIndex;
            });
            if (idx < 0) {
                //if multi row and user is pressing shift/ctrl key, allow multi row selection
                if (this.selectionMode === "multiRow" && (event.shiftKey || event.ctrlKey)) {
                    if (event.ctrlKey) {
                        this.selectedRows.push(actualRowIndex);
                    }
                    else if (event.shiftKey) {
                        if (this.lastSelectedRowIndex >= 0) {
                            if (this.lastSelectedRowIndex > rowIndex) {
                                for (let i = rowIndex; i < this.lastSelectedRowIndex; i++) {
                                    this.selectedRows.push(this.getOriginalIndex(i));
                                }
                            }
                            else if (this.lastSelectedRowIndex < rowIndex) {
                                for (let i = this.lastSelectedRowIndex + 1; i <= rowIndex; i++) {
                                    this.selectedRows.push(this.getOriginalIndex(i));
                                }
                            }
                            else {
                                this.selectedRows.push(actualRowIndex);
                            }
                        }
                        else {
                            this.selectedRows.push(actualRowIndex);
                        }
                    }
                }
                else {
                    this.selectedRows = [actualRowIndex];
                }
            }
            else if (event.ctrlKey === true && idx >= 0 && event.buttons !== 2) {
                //if control key is pressed (and not right click), remove the selected row
                this.selectedRows.splice(idx, 1);
            }
            this.detectChanges();
            this.lastSelectedRowIndex = rowIndex;
        }
        this.triggerStateChange();
    }
    /**
     * return the actual indexes base on datasource
     *
     * @param {?} index
     * @return {?}
     */
    getOriginalIndex(index) {
        if (this.virtualScroll === true && this.nodes[index] != null) {
            return this.nodes[index][TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
        }
        return index;
    }
    /**
     * Set [[disabled]] property value
     * @param {?} boo Toggle [[disabled]]
     * @return {?}
     */
    setDisabled(boo) {
        this.disabled = boo;
    }
    /**
     * Get [[disabled]] property value
     * @return {?}
     */
    getDisabled() {
        return this.disabled;
    }
    /**
     * Get a collection of all row elements that are selected
     * @return {?} The selected rows
     */
    getSelectedRows() {
        /** @type {?} */
        const selectedRowElements = [];
        /* istanbul ignore if */
        if (this.selectedRows.length > 0 && this.nodes != null && this.nodes.length > 0) {
            for (let rowIndex of this.selectedRows) {
                for (let node of this.nodes) {
                    if (node.getLocalName() === "row" && node.rowNumber === rowIndex) {
                        selectedRowElements.push(node);
                        break;
                    }
                }
            }
        }
        return selectedRowElements;
    }
    /**
     * Get collection of selected row indexes
     * @return {?}
     */
    getSelectedRowIndexes() {
        return this.selectedRows.map(row => {
            return row[this.ROW_INDEX_KEY];
        });
    }
    /**
     * Event handler for row select event
     * @param {?} event
     * @return {?}
     */
    handleRowSelection(event) {
        /* istanbul ignore next */
        if (!_.isEqual(event.selected, this._prevSelectedRows)) {
            this.onChange.emit(new TableSelectionEvent(event.selected));
        }
        this._prevSelectedRows = event.selected;
    }
    /**
     * Event handler for double click on cell
     * \@event onDoubleClick
     * @param {?} event
     * @return {?}
     */
    handleCellActivation(event) {
        if (event.type === 'dblclick') {
            this.onDoubleClick.emit(new TableSelectionEvent(event.row));
        }
    }
    /**
     * @param {?} row
     * @param {?} rowIndex
     * @return {?}
     */
    appendRowIndexToRow(row, rowIndex) {
        row[this.ROW_INDEX_KEY] = rowIndex;
    }
    /**
     * Trigger change detection and re-render the table
     * @param {?=} clearData Set to true to empty table data
     * @return {?}
     */
    refresh(clearData = false) {
        if (clearData == true) {
            this._dataSource = [];
        }
        this.detectChanges();
    }
    /**
     * Get [[changeDetectorRef]] property
     * @return {?} the ChangeDetector
     */
    getChangeDetector() {
        return this.changeDetectorRef;
    }
    /**
     * Get NexaWeb tag name
     * @return {?} Tag name
     */
    getNxTagName() {
        return "table";
    }
    /**
     * Conver the content of this screens to JSON object so it can be sent to the server.
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        // if (this.getSelectedRows() != null && this.getSelectedRows().length > 0) {
        //     this.setJson(json, "selectedRows", this.getSelectedRows().map(item=>item.toJson()));
        // }
        if (this.nodes != null &&
            this.nodes.length > 0) {
            /** @type {?} */
            let tempRows;
            if (this.virtualScroll === true) {
                tempRows = {};
            }
            json["rows"] = this.nodes.map((node, index) => {
                /** @type {?} */
                const rowJson = node.toJson();
                if (this.selectedRows != null && this.selectedRows.indexOf(index) >= 0) {
                    rowJson["selected"] = "true";
                    rowJson["index"] = index + "";
                }
                if (this.virtualScroll === true) {
                    tempRows[node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
                }
                return rowJson;
            });
            //virtual scroll data
            if (this.virtualScroll === true && this.modifiedVirtualRowsJson != null) {
                /** @type {?} */
                const keys = _.keys(this.modifiedVirtualRowsJson);
                for (const key of keys) {
                    //make sure we not already converted them
                    if (tempRows[key] == null) {
                        json["rows"].push(this.modifiedVirtualRowsJson[key]);
                    }
                }
            }
        }
        if (this.columns != null && this.columns.length > 0) {
            /** @type {?} */
            let columns = this.columns;
            if (this.getLocalName() === "table" &&
                this.columnsHasBeenSwapped === true) {
                columns = /** @type {?} */ (_.orderBy(columns, (child) => {
                    return child.originalColumnIndex;
                }));
            }
            json["columnDefs"] = columns.map((column, index) => {
                /** @type {?} */
                const def = {
                    "visible": this.toJsonValue(column.visible),
                    "locked": this.toJsonValue(column.locked),
                    "enabled": this.toJsonValue(column.enabled),
                    "sortable": this.toJsonValue(column.sortable),
                    "isChecked": this.toJsonValue(column.isChecked),
                    "customAttributes": BaseComponent.mapToJson(column.customAttributes)
                };
                // make sure customAttributes has 'width' property
                if (def["customAttributes"]["width"] != null) {
                    /** @type {?} */
                    const node = this.headNode.getChildAt(index);
                    /** @type {?} */
                    const width = this.toWholeNumber(node.htmlElement.style.width.slice(0, -2)); //server expect whole number
                    def["customAttributes"]["width"] = this.toJsonValue(width);
                }
                if (column.id) {
                    def["id"] = this.toJsonValue(column.id);
                }
                else {
                    def["id"] = BaseComponent.generateUniqueId("column");
                }
                if (column.locked === true) {
                    def["tagName"] = "lockedColumn";
                    def["nxTagName"] = "lockedColumn";
                }
                else {
                    def["tagName"] = "column";
                    def["nxTagName"] = "column";
                }
                /** @type {?} */
                const header = {
                    "tagName": "header",
                    "nxTagName": "header",
                    "text": this.toJsonValue(column.header)
                };
                if (column.headerDirective && column.headerDirective.id) {
                    header["id"] = this.toJsonValue(column.headerDirective.id);
                }
                else {
                    header["id"] = BaseComponent.generateUniqueId("header");
                }
                def["children"] = [header];
                return def;
            });
        }
        return json;
    }
    /**
     * Convert child to JSON
     * @param {?} child child to be converted to JSON
     * @return {?}
     */
    childToJson(child) {
        return child.getTagName() === "headrow" || child.getTagName() === "headcell" ? child.toJson() : null;
    }
    /**
     * Add element to internal list of row, cell, or header cell
     * @param {?} type 'row' | 'cell' | 'headcell'
     * @param {?} event Create event
     * @param {?} rowOrColumnIndex
     * @param {?} rowDataOrColumnDef
     * @return {?}
     */
    registerFauxElement(type, event, rowOrColumnIndex, rowDataOrColumnDef) {
        this._isHeaderCell = false;
        if (rowDataOrColumnDef === null ||
            (rowDataOrColumnDef !== undefined &&
                rowDataOrColumnDef !== null &&
                rowDataOrColumnDef.skipTracking !== true)) {
            if (type === "row") {
                this.trackRow(event, rowOrColumnIndex, rowDataOrColumnDef);
            }
            else if (type === "cell") {
                this.trackCell(event, rowOrColumnIndex, rowDataOrColumnDef);
            }
            else if (type === "headcell") {
                this._isHeaderCell = true;
                this.trackHeadCell(event, rowDataOrColumnDef);
                if (rowOrColumnIndex === this.columns.length - 1) {
                    this.initPlugins();
                }
            }
        }
    }
    /**
     * Get [[nodes]] property
     * @return {?} Node list
     */
    getTableChildren() {
        return this.nodes;
    }
    /**
     * Get number of nodes
     * @return {?} Number of nodes
     */
    getChildCount() {
        return this.nodes != null ? this.nodes.length : 0;
    }
    /**
     * Get all children of this table
     * @return {?} List of children
     */
    getChildren() {
        /** @type {?} */
        const children = new Vector();
        _.forEach(this.getTableChildren(), (child) => children.add(child));
        return children;
    }
    /**
     *
     * @param {?} xpathExpression Get query result from an xpath expression string
     * @return {?}
     */
    evaluateXPath(xpathExpression) {
        /** @type {?} */
        const result = new Vector();
        /** @type {?} */
        const xpathResult = document.evaluate(xpathExpression.replace("cell[", "td[").replace("row[", "tr["), this.elementRef.nativeElement, null, XPathResult.ANY_TYPE, null);
        if (xpathResult != null) {
            /** @type {?} */
            let node = xpathResult.iterateNext();
            while (node) {
                result.add(node);
                node = xpathResult.iterateNext();
            }
        }
        return result;
    }
    /**
     *
     * @param {?} childOrArrayOrStringWtf
     * @param {?=} rowNumber
     * @return {?}
     */
    appendChild(childOrArrayOrStringWtf, rowNumber = -1) {
        //TODO need to append child to certain row? dpending on childOrArrayOrStringWtf
    }
    /**
     * Check if the row has been selected
     * @param {?} rowIndex Index of row to check
     * @param {?} row
     * @return {?} True if row is a selected row
     */
    isSelectedRow(rowIndex, row) {
        if (this.virtualScroll === true && row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] != null) {
            rowIndex = row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
        }
        return this.selectedRows != null && this.selectedRows.indexOf(rowIndex) >= 0;
    }
    /**
     * Get custom attributes of row if it has any, otherwise return null
     * @param {?} row
     * @param {?} rowOrColumnIndex
     * @return {?}
     */
    getRowCustomAttributes(row, rowOrColumnIndex) {
        if (typeof this.rowCustomAttributeBuilder === "function") {
            return this.rowCustomAttributeBuilder(row, rowOrColumnIndex, /** @type {?} */ ((this._getNoneActiveViewParent() || this.getParentView())));
        }
        if (row != null && row.customAttributes) {
            return row.customAttributes;
        }
        return null;
    }
    /**
     * Check if column is visible. Either by index or column
     * @param {?} index
     * @param {?=} column
     * @return {?} True if column is visible
     */
    isColumnVisible(index, column = null) {
        if (column != null) {
            return column.visible;
        }
        return this.columns.find((item, idx) => idx === index).visible;
    }
    /**
     * Add a child component to the table
     * @param {?} child Component to add
     * @return {?}
     */
    addChild(child) {
        super.addChild(child);
        /** @type {?} */
        const row = this.nodes[this.nodes.length - 1];
        if (this._isHeaderCell !== true && row) {
            child.tableRowNo = row.rowNumber;
            row.parentTableId = this.id;
            row.parentTable = this;
            //when we get here row.childNodes[currentLength] should be the cell parent row
            //append child component to cell (for dynamic)
            if (row.childNodes[row.childNodes.length - 1] == null) {
                console.error("TableComponent: Unable to register element to cell of current row (cell is null)");
            }
            else {
                child.setAttribute("isLockedColumn", row.childNodes[row.childNodes.length - 1].getAttribute("isLockedColumn", true));
                row.childNodes[row.childNodes.length - 1].setComponent(child, true);
                //sophia #1728: restricted right click
                if (this.restrictCellPopup === true) {
                    child.skipEmitContextMenuEvent = true;
                }
                if (this.virtualScroll !== true) {
                    /** @type {?} */
                    const sortValue = child.getAttribute("sortValue", true);
                    if (sortValue != null) {
                        this.renderer.setAttribute(row.childNodes[row.childNodes.length - 1].htmlElement, "data-text", sortValue);
                    }
                }
                //track change if virtual scroll
                /* istanbul ignore if */
                if (this.virtualScroll === true &&
                    (child instanceof CheckboxComponent ||
                        child instanceof RadioButtonComponent ||
                        child instanceof TextFieldComponent ||
                        child instanceof ComboBoxComponent)) {
                    /** @type {?} */
                    const columnIdx = row.childNodes.length - 1;
                    //has cached data?
                    if (this.modifiedVirtualRows != null &&
                        this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] != null &&
                        this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx]["originalColumnIndex"]] != null) {
                        /** @type {?} */
                        const temp = this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx]["originalColumnIndex"]];
                        if (temp.text !== undefined) {
                            (/** @type {?} */ (child)).setText(temp.text);
                        }
                        (/** @type {?} */ (child)).setChecked(temp.checked, true);
                    }
                    child._internalChangeCb = (comp) => {
                        this._checkInitModifiedVirtualRows();
                        if (this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] == null) {
                            this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = {};
                        }
                        this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx]["originalColumnIndex"]] = {
                            text: comp.getText(),
                            checked: comp.getChecked()
                        };
                    };
                }
            }
        }
        else if (this.headNode != null) {
            //skip emiting event so we can emit ourself.
            child.skipEmitContextMenuEvent = true;
            child.tableRowNo = -1;
            this.headNode.parentTableId = this.id;
            this.headNode.parentTable = this;
            this.headNode.childNodes[this.headNode.childNodes.length - 1].setComponent(child);
        }
    }
    /**
     * 選択中の行を削除する
     * @return {?}
     */
    removeSelectedRow() {
        if (this.selectedRows.length > 0) {
            /** @type {?} */
            let selected = this.selectedRows.concat().sort(function (v1, v2) { return v2 - v1; });
            for (let idx of selected) {
                /** @type {?} */
                let child = this.nodes[idx];
                for (let target of child.childNodes) {
                    this.removeChild(target.getComponent());
                }
                child.destroy();
                this.nodes.splice(idx, 1);
                this.dataSource.splice(idx, 1);
            }
            /** @type {?} */
            let rowNumber = 0;
            for (let row of this.nodes) {
                row.rowNumber = rowNumber++;
            }
            this.selectedRows = [];
        }
    }
    /**
     * Check if this is a container component
     * @return {?} True
     */
    isContainer() {
        return true;
    }
    /**
     * Add row to list of nodes
     * @param {?} event
     * @param {?} rowOrColumnIndex
     * @param {?} rowData
     * @return {?}
     */
    trackRow(event, rowOrColumnIndex, rowData) {
        /** @type {?} */
        const row = new HTMLElementWrapper(this.renderer, "", this.getSession());
        row.rowNumber = rowOrColumnIndex;
        row.htmlElement = /** @type {?} */ (event.element.nativeElement);
        this.setParentScreenId(row);
        row.setLocaleName("row");
        /** @type {?} */
        const customAttributes = this.getRowCustomAttributes(rowData, rowOrColumnIndex);
        if (customAttributes != null && customAttributes !== "") {
            row.appendCustomAttributes(customAttributes);
        }
        if (rowData != null && rowData.id != null) {
            row.setAttribute("id", rowData.id);
        }
        if (this.virtualScroll === true && rowData != null) {
            row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] = rowData[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
        }
        this.trackNode(row);
        //draggable row
        if (row.isDraggable()) {
            row.applyDraggable();
            this.draggableRows = true;
        }
    }
    /**
     * @param {?} rowIndex
     * @param {?} rowData
     * @return {?}
     */
    toRowIndex(rowIndex, rowData) {
        return this.virtualScroll === true && rowData != null ? rowData[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] : rowIndex;
    }
    /**
     * Add cell to list of nodes
     * @param {?} event
     * @param {?} columnIndex
     * @param {?} columnDef
     * @return {?}
     */
    trackCell(event, columnIndex, columnDef) {
        /** @type {?} */
        const cell = new HTMLElementWrapper(this.renderer, "", this.getSession());
        cell.htmlElement = /** @type {?} */ (event.element.nativeElement);
        cell.setLocaleName("cell");
        if (columnDef.customAttributes !== undefined) {
            if (!cell.getAttribute("class")) {
                cell.setAttribute("class", columnDef.customAttributes["class"]);
            }
            else {
                /** @type {?} */
                let orgClass = cell.getAttribute("class");
                cell.setAttribute("class", orgClass + " " + columnDef.customAttributes["class"]);
            }
        }
        cell.setAttribute("isLockedColumn", columnDef.locked + "");
        this.setParentScreenId(cell);
        //track original column index for sorting
        if (columnDef.originalColumnIndex == null) {
            columnDef.originalColumnIndex = columnIndex;
        }
        cell["originalColumnIndex"] = columnDef.originalColumnIndex;
        //add cell to current row
        if (this.nodes[this.nodes.length - 1] !== undefined && this.nodes[this.nodes.length - 1] !== null) {
            this.nodes[this.nodes.length - 1].appendChild(cell, false);
        }
    }
    /**
     * @param {?} event
     * @param {?} columnDef
     * @return {?}
     */
    trackHeadCell(event, columnDef) {
        if (this.headNode == null) {
            this.headNode = new HTMLElementWrapper(this.renderer, "", this.getSession());
            this.headNode.rowNumber = -1;
            this.setParentScreenId(this.headNode);
            this.headNode.setLocaleName("headrow");
        }
        /** @type {?} */
        const cell = new HTMLElementWrapper(this.renderer, "", this.getSession());
        cell.htmlElement = /** @type {?} */ (event.element.nativeElement);
        cell.setLocaleName("headcell");
        cell.setAttribute("isLockedColumn", columnDef.locked + "");
        cell.customData = columnDef;
        this.setParentScreenId(cell);
        this.headNode.appendChild(cell);
    }
    /**
     * Add element to internal [[nodes]] list to keep track of
     * @param {?} node Element to add to internal node list
     * @return {?}
     */
    trackNode(node) {
        if (this.nodes == null) {
            this.nodes = [];
        }
        this.nodes.push(node);
    }
    /**
     * Set the parent screen id on an element
     * @param {?} el
     * @return {?}
     */
    setParentScreenId(el) {
        if (this.getParentView() != null) {
            el.parentScreenId = this.getParentView().getId();
        }
    }
    /**
     * Get invoke [[rowStyleFn]] on a row and get it's style
     * @param {?} row
     * @return {?} Style attributes
     */
    rowStyleClass(row) {
        if (typeof this.rowStyleFn === "function") {
            return this.rowStyleFn(row);
        }
        return "";
    }
    /**
     * Find the child node by id
     * @param {?} id Child's id
     * @return {?}
     */
    getChildNodeById(id) {
        return this.nodes != null ? this.nodes.find(child => child.id === id) : null;
    }
    /**
     * Handle cell onContextMenu if component inside the cell has not already handle it
     *
     * @param {?} column
     * @param {?} rowNumber
     * @param {?} columnIndex
     * @param {?} event
     * @return {?}
     */
    handleColumnOnContextMenu(column, rowNumber, columnIndex, event) {
        if (this.nodes != null && this.nodes[rowNumber] != null) {
            /** @type {?} */
            const childColumn = this.nodes[rowNumber].getChildAt(columnIndex);
            if (childColumn != null && childColumn.component != null) {
                //sophia #1728
                if (this.restrictCellPopup !== true) {
                    childColumn.component.handleOnContextMenu(event);
                }
                else if (this.restrictCellPopup === true) {
                    if (childColumn.component.popup != null && childColumn.component.popup !== "") {
                        childColumn.component.handleOnContextMenu(event, true);
                    }
                    else {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            }
            else if (column != null) {
                if (this.getSession() != null) {
                    this.getSession().setMousePosition(event);
                }
                /** @type {?} */
                const parentView = this.getParentView();
                /** @type {?} */
                let popupMenuId = null;
                if (parentView != null) {
                    popupMenuId = (/** @type {?} */ (parentView)).getFirstPopupMenuId();
                }
                if (typeof column.onContextMenuCb === "function") {
                    column.onContextMenuCb(this._getNoneActiveViewParent() || this.getParentView());
                }
                if (popupMenuId != null) {
                    event.stopPropagation();
                    event.preventDefault();
                    /** @type {?} */
                    const tm = setTimeout(() => {
                        clearTimeout(tm);
                        if (this.getSession()._currentPopupMenuId != null) {
                            popupMenuId = this.getSession()._currentPopupMenuId;
                        }
                        this.getSession().showContextMenu(popupMenuId);
                        this.getSession()._currentPopupMenuId = null;
                    });
                }
            }
        }
    }
    /**
     * Event handler for context click on the header
     * @param {?} columnIndex Index of column that was clicked
     * @param {?} event
     * @return {?}
     */
    handleHeaderOnContextMenu(columnIndex, event) {
        /* istanbul ignore if */
        if (this.headNode != null) {
            /** @type {?} */
            const childColumn = this.headNode.getChildAt(columnIndex);
            if (childColumn != null && childColumn.component != null) {
                /** @type {?} */
                const clientEvent = new ClientEvent(childColumn, event);
                if (AppUtils.customizeClientEvent != null) {
                    AppUtils.customizeClientEvent(childColumn, clientEvent);
                }
                if (this.getParentView() != null) {
                    clientEvent.setParameter("screenId", this.getParentView().getId());
                }
                clientEvent.setParameter("id", this.getId());
                this.getSession().getEventHandler().setClientEvent(clientEvent);
                childColumn.component.handleOnContextMenu(event, true);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    recalculateVirtualScrollData(event) {
        /* istanbul ignore if */
        if (this.virtualScroll === true) {
            /** @type {?} */
            let scrollTop = event.srcElement.scrollTop;
            //adjust only on IE9, otherwise, it will stuck in inf loop
            if (this.isIE9 === true) {
                scrollTop -= 0.5;
            }
            if (this.scrollLeft === event.srcElement.scrollLeft) {
                this.calcVirtualScrollViewPort(scrollTop);
                this.detectChanges();
            }
            this.adjustTableHead(event);
        }
    }
    /**
     * Event handler for table head change. Set style to properly display
     * @param {?} event
     * @param {?=} skipBodyAdjustment
     * @param {?=} skipHeader
     * @return {?}
     */
    adjustTableHead(event, skipBodyAdjustment = false, skipHeader = false) {
        if (this.table == null || event == null)
            return;
        this.preMouseEvent = event;
        /** @type {?} */
        let scrollTop = event.srcElement.scrollTop;
        //adjust only on IE9, otherwise, it will stuck in inf loop
        if (this.isIE9 === true) {
            scrollTop -= 0.5;
        }
        this.scrollLeft = event.srcElement.scrollLeft;
        if (this.virtualScroll === true) {
            // if (event.srcElement.scrollTop > this.maxScrollTop) {
            //     scrollTop = this.maxScrollTop;
            // }
            //this.calcVirtualScrollViewPort(scrollTop);
            if (this.prevScrollTopForHiddenHeader !== scrollTop && skipHeader === true) {
                scrollTop -= this.theadHeight;
            }
            this.prevScrollTopForHiddenHeader = scrollTop;
            this._disabledScrolling = true;
            this.calcVirtualTablePosition(scrollTop);
            setTimeout(() => {
                this._disabledScrolling = false;
            }, 100);
        }
        if (skipHeader !== true) {
            //   this.fakeTable.nativeElement.innerHTML = "";
            //   this.isHeaderAppendToFakeTable = false;
            this.renderer.removeStyle(this.tableHead.nativeElement, "visibility");
            if (this.tableFoot != null) {
                this.renderer.removeStyle(this.tableFoot.nativeElement, "visibility");
            }
            this.renderer.setStyle(this.ghostHeader.nativeElement, "display", "none");
            /** @type {?} */
            const table = this.table.nativeElement;
            /** @type {?} */
            const thead = table.querySelector('thead');
            /** @type {?} */
            const tbody = table.querySelector('tbody');
            for (let i = 0; i < this.columns.length; i++) {
                /** @type {?} */
                let column = this.columns.find((item, idx) => idx === i);
                if (column != null && column.visible && column.locked) {
                    /** @type {?} */
                    const headChildren = $(thead.querySelector('th:nth-child(' + (i + 1) + ')'));
                    /** @type {?} */
                    let trans = `translate(${this.scrollLeft}px, ${scrollTop}px)`;
                    if (this.virtualScroll === true) {
                        trans = `translateX(${this.scrollLeft}px)`;
                    }
                    headChildren.css("transform", trans);
                    headChildren.css("-ms-transform", trans);
                    if (skipBodyAdjustment !== true) {
                        /** @type {?} */
                        const bodyChildren = $(tbody.querySelectorAll('td:nth-child(' + (i + 1) + ')'));
                        bodyChildren.css("transform", `translate(${this.scrollLeft}px`);
                        bodyChildren.css("-ms-transform", `translate(${this.scrollLeft}px`);
                    }
                }
                else if (column != null && column.visible && this.virtualScroll !== true) {
                    /** @type {?} */
                    const headChildren = $(thead.querySelector('th:nth-child(' + (i + 1) + ')'));
                    /** @type {?} */
                    const trans = `translateY(${scrollTop}px)`;
                    headChildren.css("transform", trans);
                    headChildren.css("-ms-transform", trans);
                }
            }
            this.adjustTableFooter();
        }
    }
    /**
     * Set table footer styles for proper display
     * @return {?}
     */
    adjustTableFooter() {
        /* istanbul ignore if */
        if (this.table == null)
            return;
        /** @type {?} */
        const tfoot = this.table.nativeElement.querySelector("tfoot");
        /* istanbul ignore if */
        if (tfoot != null) {
            /** @type {?} */
            let tfootPos = 0;
            if ($(this.table.nativeElement).height() < $(this.tableContainer.nativeElement).height()) {
                tfootPos = $(this.tableContainer.nativeElement).height() - $(this.table.nativeElement).height();
            }
            else {
                tfootPos = ($(this.tableContainer.nativeElement).height() - $(this.table.nativeElement).height()) + this.tableContainer.nativeElement.scrollTop;
            }
            for (let i = 0; i < this.columns.length; i++) {
                /** @type {?} */
                let column = this.columns.find((item, idx) => idx === i);
                if (column != null) {
                    /** @type {?} */
                    const footChildren = $(tfoot.querySelector('td:nth-child(' + (i + 1) + ')'));
                    /** @type {?} */
                    const trans = `translateY(${tfootPos}px)`;
                    footChildren.css("transform", trans);
                    footChildren.css("-ms-transform", trans);
                    footChildren.css("position", "relative");
                    footChildren.css("z-index", "3");
                }
            }
        }
    }
    /**
     * Event handler for keyup. Copy keyboard shortcut support
     * @param {?} event Keyup event
     * @return {?}
     */
    handleKeyUp(event) {
        if (event.ctrlKey === true &&
            (event.code === "KeyC" ||
                event.keyCode === 67 ||
                event.keyCode === 99)) {
            // istanbul ignore next
            this.copySelectedRowAsText();
        }
    }
    /**
     * Check to see if we can send selected rows to clipboard
     * @return {?}
     */
    copySelectedRowAsText() {
        /* istanbul ignore if */
        if (this.selectedRows != null && this.selectedRows.length === 1) {
            /** @type {?} */
            let selectedRowText;
            /** @type {?} */
            const selectedRow = this.getSelectedRows()[0];
            /* istanbul ignore if */
            if (selectedRow.childNodes != null && selectedRow.childNodes.length > 0) {
                selectedRowText = selectedRow.childNodes.map(child => child.getText());
            }
            else if (selectedRow.dynamicChildNodes != null && selectedRow.dynamicChildNodes.length > 0) {
                selectedRowText = selectedRow.dynamicChildNodes.map(child => child.getText());
            }
            /* istanbul ignore if */
            if (selectedRowText != null && selectedRowText.length > 0) {
                this.clipboardService.copy(selectedRowText.join(String.fromCharCode(9)));
            }
        }
    }
    /**
     * Generate a row id based on row's [[id]] and index
     * @param {?} row
     * @param {?} rowIndex
     * @return {?}
     */
    buildRowId(row, rowIndex) {
        if (typeof this.rowIdBuilder === "function") {
            return this.rowIdBuilder(row, rowIndex);
        }
        return ['row', this.id, rowIndex].join('-');
    }
    /**
     * Sort the data (for virtual scroll)
     *
     * @param {?} column
     * @return {?}
     */
    handleSort(column) {
        //sorting is only allowed on a non locking column
        /* istanbul ignore if */
        if (this.virtualScroll === true && column.locked !== true) {
            //find previous sort direction for the column
            this.columns.forEach(col => {
                //using originalColumnIndex b/c use can drag column around and thus column index changed
                if (col.originalColumnIndex !== column.originalColumnIndex) {
                    col.sortDirection = null;
                }
            });
            if (column.sortDirection === "asc") {
                column.sortDirection = "desc";
            }
            else {
                column.sortDirection = "asc";
            }
            /** @type {?} */
            let sortColumnId = this.virtualScrollSortKeys[column.originalColumnIndex];
            //if custom sortn fn is provided, used to find proper column to sort
            if (typeof this.virtualScrollSortFn === "function") {
                sortColumnId = this.virtualScrollSortFn(this._getNoneActiveViewParent() || this.getParentView(), column.originalColumnIndex);
            }
            if (sortColumnId != null) {
                this._dataSource = _.orderBy(this._dataSource, [sortColumnId], /** @type {?} */ ([column.sortDirection]));
            }
            this.calcVirtualScrollViewPort(this.prevScrollTop);
            this.detectChanges();
        }
        else if (this.virtualScroll !== true && column.locked !== true) {
            // RXC Add
            if (this.sortDirection === "") {
                this.sortDirection = "asc";
            }
            else if (this.sortColumnId === column.originalColumnIndex) {
                if (this.sortDirection === "asc") {
                    this.sortDirection = "desc";
                }
                else {
                    this.sortDirection = "asc";
                }
            }
            else {
                this.sortDirection = "asc";
            }
            this.sortColumnId = column.originalColumnIndex;
        }
    }
    /**
     * Calculate the overall height so we can add scrollbar for virtual scroll. This is done
     * by multiplying the number of rows to the height of each row.
     *
     * @return {?}
     */
    calcVirtualScrollHeight() {
        // istanbul ignore if
        if (this.virtualScroll === true) {
            if (this._dataSource != null && this._dataSource.length > 0) {
                //scroll height = 10px * # rows (10px is the height of each row)
                this._virtualScrollDivHeight = (this.rowHeight * this._dataSource.length);
                this.maxScrollTop = this._virtualScrollDivHeight;
                this.virtualScrollSortKeys = _.keys(this._dataSource[0]);
                //track original index
                if (typeof this._dataSource[this._dataSource.length - 1][TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] !== "number") {
                    _.forEach(this._dataSource, (item, index) => {
                        item[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] = index;
                    });
                }
            }
            else {
                this._virtualScrollDivHeight = 0;
            }
            this.markForCheck();
        }
    }
    /**
     * Adjust/move the position of the table container so that it displayed properly.
     *
     * @param {?} scrollTop
     * @return {?}
     */
    calcVirtualTablePosition(scrollTop) {
        if (this.virtualScroll === true) {
            //-ms-transform
            //transform
            // if (this.maxScrollTop > 0) {
            //     scrollTop = Math.min(scrollTop, this.maxScrollTop);
            // }
            this.renderer.setStyle(this.tableWrapper.nativeElement, "transform", `translateY(${scrollTop}px)`);
            this.renderer.setStyle(this.tableWrapper.nativeElement, "-ms-transform", `translateY(${scrollTop}px)`);
            // this.markForCheck();
        }
    }
    /**
     * Calculate the visible virtual rows to display to the user
     *
     * @param {?=} scrollTop
     * @return {?}
     */
    calcVirtualScrollViewPort(scrollTop = 0) {
        if (this._isViewInit === true && this._dataSource != null) {
            /** @type {?} */
            let startIdx = 0;
            //if scrollTop is greater than 0, need to figure the starting row
            if (scrollTop > 0) {
                //each row is 10px height, if scrollTop is 100px, then we start at row 10
                //scrollTop / 10px?
                startIdx = Math.floor(scrollTop / this.rowHeight);
                if (startIdx > this._dataSource.length - this._virtualScrollRowPerView) {
                    startIdx = this._dataSource.length - this._virtualScrollRowPerView;
                }
            }
            this._virtualViewPort = null;
            this.prevScrollTop = scrollTop;
            this.cleanUpChildNodes();
            this.detectChanges();
            this.zone.run(() => {
                this._virtualViewPort = this.buildRowIdentity(this._dataSource.slice(startIdx, startIdx + this._virtualScrollRowPerView + this.adjustedRows));
            });
        }
    }
    /**
     * @param {?} fromIndex
     * @param {?} toIndex
     * @return {?}
     */
    _swap(fromIndex, toIndex) {
        /** @type {?} */
        const tempToColumn = this.columns[toIndex];
        this.columns[toIndex] = this.columns[fromIndex];
        this.columns[fromIndex] = tempToColumn;
    }
    /**
     * Swap the columns after a column is being drag and rop
     *
     * @param {?} fromIndex column that is being dragged (moved)
     * @param {?} toIndex  column that is being droped into
     * @return {?}
     */
    swapColumns(fromIndex, toIndex) {
        //sophia 1856: need to properly swap columns
        if (fromIndex < toIndex) {
            for (let i = fromIndex; i < toIndex; i++) {
                this._swap(i, i + 1);
            }
        }
        else if (fromIndex > toIndex) {
            for (let i = fromIndex; i > toIndex; i--) {
                this._swap(i, i - 1);
            }
        }
        if (this.scrollContainerStyles != null) {
            this.scrollContainerStyles["overflow-y"] = "auto";
            this.detectChanges();
        }
        //sophia 1823: for server tracking
        _.forEach(this.columns, (col, idx) => {
            col.setAttribute("visualIndex", idx + "");
        });
        if (this.virtualScroll !== true) {
            this.detectChanges();
            setTimeout(() => {
                this.applyResizeColumns();
            }, 200);
        }
        this.columnsHasBeenSwapped = true;
    }
    /**
     * @return {?}
     */
    _cleanupColResize() {
        //reset
        this.$colResizable = $(this.table.nativeElement).colResizable({
            disable: true
        });
        $(`#${this.id} .JCLRgrips`).remove();
    }
    /**
     * @return {?}
     */
    applyResizeColumns() {
        if (this.table != null && (this.enableColumnResize == null || this.enableColumnResize === true)) {
            this._cleanupColResize();
            this.$colResizable = $(this.table.nativeElement).colResizable({
                liveDrag: false,
                //turning this on will incurred a severe performance penalty on IE so leave it off
                resizeMode: 'overflow',
                partialRefresh: true,
                //After closing the window and opening again, columnResizer can't work. To fix that, this value is needed.,
                headerOnly: true //allow dragging using header only
            });
        }
    }
    /**
     * Return whether or not the column at the particular index can be dragged/drop
     *
     * @param {?} colIdx
     * @return {?}
     */
    canDragColumn(colIdx) {
        /** @type {?} */
        let canDrag = true;
        for (let col of this.columns) {
            if (col.originalColumnIndex === colIdx && col.locked === true) {
                canDrag = false;
                break;
            }
        }
        return canDrag;
    }
    /**
     * Return the index of the suppplied row
     *
     * @param {?} child row to check fo rindex?
     * @return {?}
     */
    indexOfChild(child) {
        if (this.nodes != null && this.nodes.length > 0) {
            return _.findIndex(this.nodes, (node) => node === child);
        }
        //child does not exists
        return -1;
    }
    /**
     * @return {?}
     */
    _checkInitModifiedVirtualRows() {
        if (this.modifiedVirtualRows == null) {
            this.modifiedVirtualRows = {};
        }
    }
    /**
     * @return {?}
     */
    _checkInitModifiedVirtualRowsJson() {
        if (this.modifiedVirtualRowsJson == null) {
            this.modifiedVirtualRowsJson = {};
        }
    }
    /**
     * Refresh the table sorter
     * @return {?}
     */
    refreshTableSorter() {
        //data changes, need to update tableSorter
        if (this._tableSorterRefreshTm != null) {
            clearTimeout(this._tableSorterRefreshTm);
            this._tableSorterRefreshTm = null;
        }
        this.zone.runOutsideAngular(() => {
            this._tableSorterRefreshTm = setTimeout(() => {
                clearTimeout(this._tableSorterRefreshTm);
                this._tableSorterRefreshTm = null;
                if (this.$tablesorter != null) {
                    this.$tablesorter.trigger("update");
                }
                this.adjustTableHead(this.preMouseEvent);
            }, 200);
        });
    }
    /**
     * Refresh cache data (sort value, etc)
     * @return {?}
     */
    refreshTableSorterCache() {
        //data changes, need to update tableSorter
        if (this._tableSorterCacheRefreshTm != null) {
            clearTimeout(this._tableSorterCacheRefreshTm);
            this._tableSorterCacheRefreshTm = null;
        }
        this.zone.runOutsideAngular(() => {
            this._tableSorterCacheRefreshTm = setTimeout(() => {
                clearTimeout(this._tableSorterCacheRefreshTm);
                this._tableSorterCacheRefreshTm = null;
                if (this.$tablesorter != null) {
                    this.$tablesorter.trigger("updateCache");
                }
            }, 200);
        });
    }
    /**
     * @param {?} shouldSelected
     * @return {?}
     */
    setSelectAllVirtualRows(shouldSelected) {
        if (shouldSelected !== true) {
            this.modifiedVirtualRows = {};
            this.modifiedVirtualRowsJson = {};
            this.selectedRows = [];
        }
        else {
            this._checkInitModifiedVirtualRows();
            this._checkInitModifiedVirtualRowsJson();
            /** @type {?} */
            const checkBoxeColumnIdxs = [];
            if (this.nodes != null && this.nodes.length > 0) {
                //find all checkboxes columns
                for (let i = 0; i < this.nodes[0].childNodes.length; i++) {
                    if (this.nodes[0].childNodes[i].component instanceof CheckboxComponent) {
                        checkBoxeColumnIdxs.push(i);
                    }
                }
            }
            //if there are checkboxes, check them
            this.lastSelectedRowIndex = 0;
            if (checkBoxeColumnIdxs.length > 0) {
                for (let row of this._dataSource) {
                    //make sure row is not visible
                    if (_.findIndex(this.nodes, (node) => {
                        return node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] === row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
                    }) < 0) {
                        if (this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] == null) {
                            this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = {};
                        }
                        for (let colIdx of checkBoxeColumnIdxs) {
                            this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][colIdx] = {
                                checked: true,
                                text: undefined
                            };
                        }
                        //this.modifiedVirtualRowsJson []
                        if (typeof this.virtualScrollInvisibleRowBuilder === "function") {
                            /** @type {?} */
                            const rowElement = this.virtualScrollInvisibleRowBuilder(this._getNoneActiveViewParent() || this.getParentView(), row);
                            rowElement.setAttribute("selected", "true");
                            this.modifiedVirtualRowsJson[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = rowElement.toJson();
                        }
                        //selected the row
                        if (this.selectedRows == null) {
                            this.selectedRows = [];
                        }
                        this.selectedRows.push(row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]);
                    }
                }
            }
        }
    }
    /**
     * @return {?}
     */
    recCalcNoVirtualRow() {
        if (this.virtualScroll === true) {
            /** @type {?} */
            let height = $(this.tableContainer.nativeElement).height();
            if (this.tableHead != null) {
                this.theadHeight = $(this.tableHead.nativeElement).height();
                height = height - this.theadHeight;
                if (this.skipRowsAdjustment !== true) {
                    this.adjustedRows = Math.round(this.theadHeight / this.rowHeight) + 2;
                }
            }
            this._virtualScrollRowPerView = Math.round(height / this.rowHeight);
        }
    }
    /**
     * @return {?}
     */
    setHeaderWidthHeight() {
        /** @type {?} */
        const table = this.table.nativeElement;
        /** @type {?} */
        const thead = table.querySelector('thead');
        /** @type {?} */
        let headerMaxHeight = 0;
        /** @type {?} */
        var id = table.id;
        if (this.columns != null) {
            if (this.forceFixWidth) {
                //please do not removed our code
                //this.renderer.setStyle(this.table.nativeElement, "table-layout", "fixed");
                for (let i = 0; i < this.columns.length; i++) {
                    /** @type {?} */
                    let column = this.columns.find((item, idx) => idx === i);
                    if (column != null) {
                        /** @type {?} */
                        const headChildren = thead.querySelector('th:nth-child(' + (i + 1) + ')');
                        this.renderer.setStyle(headChildren, "width", `${column.controlWidth}px`);
                        if (column.controlHeight !== undefined) {
                            this.isHeaderAuto = true;
                            if (headerMaxHeight < column.controlHeight) {
                                headerMaxHeight = Number(column.controlHeight);
                            }
                        }
                    }
                }
                if (this.isHeaderAuto) {
                    $("#" + id + ">div>div>table").removeClass("header-fixed");
                }
            }
            /*else{
                            for(let i = 0; i < this.columns.length; i++){
                                let column = this.columns.find((item, idx)=>idx === i);
                                if(column != null)
                                {
                                    const headChildren = thead.querySelector('th:nth-child(' + (i+1) + ')');
                                    this.renderer.setStyle(headChildren, "min-width", `${column.controlWidth}px`);
                                }
                            }
                        }*/
        }
        if (this.ghostHeader != null) {
            if (headerMaxHeight == 0) {
                headerMaxHeight = 30;
            }
            this.renderer.setStyle(this.ghostHeader.nativeElement, "height", headerMaxHeight + "px");
        }
    }
    /**
     * Reset table column (in case it has been swapped)
     * @return {?}
     */
    resetTableColumns() {
        if (this.forceResetColumns === true &&
            this._isDying !== true &&
            this.columns != null &&
            this.columnsHasBeenSwapped === true) {
            this.columnsHasBeenSwapped = false;
            /** @type {?} */
            const temp = _.clone(this.columns);
            this.columns = [];
            this.detectChanges();
            if (this.headNode != null) {
                this.headNode.childNodes = [];
            }
            this.columns = _.sortBy(temp, (col, idx) => {
                col.setAttribute("visualIndex", idx + "");
                return col.originalColumnIndex;
            });
            this.detectChanges();
            this.initPlugins();
        }
    }
    /**
     * @param {?} rows
     * @return {?}
     */
    buildRowIdentity(rows) {
        // if (rows == null) return rows;
        // for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        //     rows[rowIndex][TableComponent.INTERNAL_ROW_DIFFER_ID] = BaseComponent.generateUniqueId("row_differ");
        //     rows[rowIndex][TableComponent.INTERNAL_ROW_ID] = this.buildRowId(rows[rowIndex], rowIndex);
        // }
        return rows;
    }
    /**
     * @param {?} idx
     * @param {?} row
     * @return {?}
     */
    rowTrackByFn(idx, row) {
        return row[TableComponent.INTERNAL_ROW_DIFFER_ID];
    }
    /**
     * @param {?} idx
     * @param {?} column
     * @return {?}
     */
    columnHeaderTrackByFn(idx, column) {
        return column[TableComponent.INTERNAL_COLUMN_HEADER_ID];
    }
    /**
     * Removed vt-row by index. This will not works for rows that are created by dataSource
     * @param {?} index
     * @return {?}
     */
    removeTableRowByIndex(index) {
        if (this._tableRow != null && this._tableRow.length > index) {
            this._tableRow = _.filter(this._tableRow, (row, rowIndex) => {
                return rowIndex !== index;
            });
            this.cleanUpChildNodes();
            this.detectChanges();
        }
    }
    /**
     * Removed vt-row by id. This will not works for rows that are created by dataSource
     * @param {?} id
     * @return {?}
     */
    removeTableRowById(id) {
        if (this._tableRow != null && this._tableRow.length > 0) {
            this._tableRow = _.filter(this._tableRow, (row) => {
                return row.id !== id;
            });
            this.cleanUpChildNodes();
            this.detectChanges();
        }
    }
    /**
     * @param {?} columns
     * @return {?}
     */
    toColumns(columns) {
        return columns.map((col, idx) => {
            col[TableComponent.INTERNAL_COLUMN_HEADER_ID] = BaseComponent.generateUniqueId("hc");
            col.setAttribute("visualIndex", idx + '');
            return col;
        });
    }
    /**
     * @param {?} width
     * @return {?}
     */
    toWholeNumber(width) {
        return parseInt(width);
    }
    /**
     * @return {?}
     */
    checkShowBlankRow() {
        if (this.dataSource == null ||
            this.dataSource.length === 0 ||
            (/** @type {?} */ (this.tableContainer.nativeElement)).scrollHeight > (/** @type {?} */ (this.tableContainer.nativeElement)).clientHeight) {
            this.showBlankRow = false;
        }
        else {
            this.showBlankRow = true;
        }
    }
    /**
     * Remove row from tableRows by id. no detect change
     * @param {?} id row element id
     * @return {?}
     */
    removeFromTableRow(id) {
        /** @type {?} */
        const i = this.tableRow.findIndex(r => r.id === id);
        this.tableRow.splice(i, 1);
    }
}
TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX = "$$INTERNAL_VIRTUAL_ORIGINAL_INDEX$$";
TableComponent.INTERNAL_VIRTUAL_ROW_DATA = "$$INTERNAL_VIRTUAL_ROW_DATA$$";
TableComponent.INTERNAL_ROW_DIFFER_ID = "$$INTERNAL_VIRTUAL_ROW_DIFFER_ID$$";
TableComponent.INTERNAL_ROW_ID = "$$INTERNAL_VIRTUAL_ROW_ID$$";
TableComponent.INTERNAL_COLUMN_HEADER_ID = "$$INTERNAL_COLUMN_HEADER_ID$$";
TableComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-table',
                template: "<div #ghostHeader class=\"ghost-header\" [style.width.px]=\"controlWidth\" style=\"display: none; position: absolute; z-index: 1; overflow: hidden;\">\n  <!-- <table #fakeTable class=\"fake-table table\" style=\"z-index: 1;\"></table> -->\n</div>\n<div #tableContainer class=\"table-container\"\n  [ngClass]=\"cssClass\"\n  [style.maxWidth.px]=\"controlWidth\"\n  [style.height.px]=\"controlHeight\"\n  [style.color]=\"fontColor\"\n  [style.visibility]=\"visible ? 'visible' : 'hidden'\"\n  [ngStyle]=\"scrollContainerStyles\"\n>\n  <!-- Virtual scroll height -->\n  <div *ngIf=\"virtualScroll === true\" [style.height.px]=\"_virtualScrollDivHeight\" [style.width.px]=\"1\"></div>\n  <div #tableWrapper class=\"table-scroller\" [ngStyle]=\"tableStyles\">\n    <table class=\"table tablesorter header-fixed\" [id]=\"id\" #table>\n      <thead #tableHead>\n        <tr class=\"dnd-moved\">\n          <th *ngFor=\"let column of columns; index as columnIndex; trackBy: columnHeaderTrackByFn\"\n            [ngClass]=\"{'headerPadding': isHeaderPadding === true,'nonForceFixWidth': forceFixWidth === false, 'vt-locked-column': column.locked === true, 'sort-up': column.sortDirection === 'asc' && column.locked !== true, 'sort-down': column.sortDirection === 'desc' && column.locked !== true, 'internal-sort': virtualScroll === true && enableSort !== false, 'auto-wrap': column.autoWrap === true}\"\n            [style.height.px]=\"column.headerHeight\"\n            [runOutsideZone]=\"false\"\n            (vtOnCreate)=\"registerFauxElement('headcell', $event, columnIndex, column)\"\n            [ngStyle]=\"column.styles\"\n            (contextmenu)=\"handleHeaderOnContextMenu(columnIndex, $event)\"\n            (click)=\"handleSort(column)\"\n            [attr.data-sorter]=\"column.sortable\">\n            <!-- If column has header as text, render as text -->\n            <span *ngIf=\"column.isHeaderTemplate === false\">\n              {{column.header}}\n            </span>\n            <!-- otherwise, if it has custom rendering (i.e. they want to render checkbox, etc), we spit out the template to them -->\n            <ng-template [ngIf]=\"column.isHeaderTemplate === true\" [ngTemplateOutlet]=\"column.headerTemplate\" [ngTemplateOutletContext]=\"{columnIndex: columnIndex}\"></ng-template>\n          </th>\n        </tr>\n      </thead>\n      <tbody>\n        <!-- when there are data-->\n        <ng-template [ngIf]=\"dataSource != null && dataSource.length > 0\">\n          <tr class=\"dnd-moved\" *ngFor=\"let item of dataSource; index as rowIndex\" [id]=\"buildRowId(item, rowIndex)\" (vtOnCreate)=\"registerFauxElement('row', $event, rowIndex, item)\" [attr.rowNo]=\"rowIndex\" (mousedown)=\"toggleRowSelection($event, rowIndex, item)\" (mouseup)=\"handleMouseUp($event, rowIndex, item)\" (click)=\"onRowClick($event, rowIndex)\" [ngClass]=\"{'selected-row': isSelectedRow(rowIndex, item)}\" class=\"{{rowStyleClass(item)}}\">\n            <td *ngFor=\"let column of columns; index as columnIndex\" [ngClass]=\"{'vt-locked-column': column.locked === true}\" (vtOnCreate)=\"registerFauxElement('cell', $event, columnIndex, column)\" [attr.rowNo]=\"rowIndex\" [ngStyle]=\"column.styles\" [style.height.px]=\"column.cellHeight\" [style.textAlign]=\"column.alignHorizontal\" (contextmenu)=\"handleColumnOnContextMenu(column.cellTemplate, rowIndex, columnIndex, $event)\">\n                <!--\n                  the user of the library will choose how to render the data, i.e. as a checkbox, textfield, or whatever, we spit\n                  this out via columns cellTemplate (ColumnDirective lift this up via CellDirective which lift the content of the\n                  host of the directive)\n                -->\n                <ng-template [ngTemplateOutlet]=\"column.cellTemplate?.template\" [ngTemplateOutletContext]=\"{row: item, rowIndex: toRowIndex(rowIndex, item), columnIndex: columnIndex}\"></ng-template>\n            </td>\n          </tr>\n          <tr *ngIf=\"showBlankRow === true\"></tr>\n        </ng-template>\n        <!-- when there are no data-->\n        <ng-template [ngIf]=\"(dataSource == null || dataSource.length == 0) && (tableRow == null || tableRow.length === 0)\">\n          <tr class=\"dnd-moved\">\n            <td *ngFor=\"let column of columns; index as columnIndex\" [ngClass]=\"{'vt-locked-column': column.locked === true}\" [ngStyle]=\"column.styles\" >&nbsp;</td>\n          </tr>\n          <!-- <tr></tr> -->\n        </ng-template>\n        <!-- custom table row -->\n        <ng-template [ngIf]=\"tableRow != null && tableRow.length > 0\">\n          <tr *ngFor=\"let item of tableRow; index as rowIndex\" class=\"dnd-moved {{item.cssClass}}\" (vtOnCreate)=\"registerFauxElement('row', $event, rowIndex, item)\" [attr.rowNo]=\"rowIndex\" (mousedown)=\"toggleRowSelection($event, rowIndex, item)\" (mouseup)=\"handleMouseUp($event, rowIndex, item)\" [ngClass]=\"{'selected-row': isSelectedRow(rowIndex, item)}\" class=\"{{rowStyleClass(item)}}\">\n            <td *ngFor=\"let column of item.cellTemplates; index as columnIndex\" (vtOnCreate)=\"registerFauxElement('cell', $event, columnIndex, column)\" [attr.rowNo]=\"rowIndex\" (contextmenu)=\"handleColumnOnContextMenu(column, rowIndex, columnIndex, $event)\">\n              <ng-template [ngTemplateOutlet]=\"column.template\" [ngTemplateOutletContext]=\"{row: item, rowIndex: rowIndex, columnIndex: columnIndex}\"></ng-template>\n            </td>\n          </tr>\n        </ng-template>\n      </tbody>\n      <ng-template [ngIf]=\"footerRow != null && footerRow.cellTemplates != null && footerRow.cellTemplates.length > 0\">\n        <tfoot #tableFoot>\n          <tr class=\"dnd-moved\">\n            <td *ngFor=\"let column of footerRow.cellTemplates; index as columnIndex\" [style.display]=\"'table-cell'\" [style.textAlign]=\"column.alignHorizontal\">\n              <ng-template [ngTemplateOutlet]=\"column.template\" [ngTemplateOutletContext]=\"{columnIndex: columnIndex}\"></ng-template>\n            </td>\n          </tr>\n        </tfoot>\n      </ng-template>\n    </table>\n    <!-- <div *ngIf=\"virtualScroll === true\" [style.height.px]=\"controlHeight\" [style.width.px]=\"controlWidth\" [ngStyle]=\"virtualScrollProgressStyles\"></div> -->\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => TableComponent)
                    }
                ],
                styles: [".table-container{width:100%;height:100%;overflow:auto;border:1px solid #888}table{table-layout:auto;width:100%!important;background-color:#fff;border-collapse:separate}table>tbody>tr>td,table>thead>tr>th{min-width:1px;white-space:nowrap;text-align:center}table tr.selected-row>td{background-color:#cff!important;color:#1014ff!important}table>thead>tr>th{position:relative;vertical-align:middle;overflow:hidden}.vt-locked-column{position:relative}th.vt-locked-column{background-color:#44a!important;z-index:4}.ghost-header,.table>tfoot>tr>td,.table>thead>tr>th{border-bottom:1px solid #d8d8dc;border-right:1px solid #d8d8dc;background-color:#6a6aff;color:#fff;font-weight:400}.table>tbody>tr>td{border-bottom:1px solid #8080ff;border-right:1px solid #8080ff;padding-left:2px!important;padding-right:2px!important}.table>tfoot>tr>td{padding-left:2px!important;padding-right:2px!important;white-space:nowrap}.table>tbody>tr:nth-child(odd)>td{background:#fff}.table>tbody>tr:nth-child(even)>td{background:#e6e6e6}.table>tfoot>tr{height:10px}td{display:table-cell}table>thead>tr>th.auto-wrap{white-space:normal}.internal-sort{padding:4px 21px 4px 4px}.sort-up{background:url(data:image/gif;base64,R0lGODlhCwALAJEAAAAAAP///xUVFf///yH5BAEAAAMALAAAAAALAAsAAAIRnC2nKLnT4or00Puy3rx7VQAAOw==) center right no-repeat}.sort-down{background:url(data:image/gif;base64,R0lGODlhCwALAJEAAAAAAP///xUVFf///yH5BAEAAAMALAAAAAALAAsAAAIPnI+py+0/hJzz0IruwjsVADs=) center right no-repeat}table thead th.auto-wrap{white-space:normal!important;text-align:center}th.headerPadding{padding-right:14px;padding-left:14px}.fake-table>thead{visibility:visible!important}"]
            }] }
];
/** @nocollapse */
TableComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: NgZone },
    { type: IterableDiffers },
    { type: ClipboardService }
];
TableComponent.propDecorators = {
    selectionMode: [{ type: Input }],
    rowCustomAttributeBuilder: [{ type: Input }],
    rowIdBuilder: [{ type: Input }],
    rowStyleFn: [{ type: Input }],
    virtualScroll: [{ type: Input }],
    virtualScrollSortFn: [{ type: Input }],
    virtualScrollInvisibleRowBuilder: [{ type: Input }],
    rowHeight: [{ type: Input }],
    scrollTimeout: [{ type: Input }],
    dataSource: [{ type: Input }],
    enableSort: [{ type: Input }],
    enableColumnDragging: [{ type: Input }],
    enableColumnResize: [{ type: Input }],
    droppable: [{ type: Input }],
    restrictCellPopup: [{ type: Input }],
    onChange: [{ type: Output }],
    onStateChange: [{ type: Output }],
    onDoubleClick: [{ type: Output }],
    onDragDrop: [{ type: Output }],
    table: [{ type: ViewChild, args: ['table',] }],
    tableContainer: [{ type: ViewChild, args: ["tableContainer", { read: ElementRef },] }],
    tableWrapper: [{ type: ViewChild, args: ["tableWrapper", { read: ElementRef },] }],
    tableHead: [{ type: ViewChild, args: ["tableHead", { read: ElementRef },] }],
    tableFoot: [{ type: ViewChild, args: ["tableFoot", { read: ElementRef },] }],
    ghostHeader: [{ type: ViewChild, args: ["ghostHeader", { read: ElementRef },] }],
    tableColumns: [{ type: ContentChildren, args: [TableColumnDirective,] }],
    tableRowDef: [{ type: ContentChild, args: [TableRowDefDirective,] }],
    footerRow: [{ type: ContentChild, args: [FooterRowDirective,] }],
    tableRowQuery: [{ type: ContentChildren, args: [RowDirective,] }],
    forceFixWidth: [{ type: Input }],
    isHeaderPadding: [{ type: Input }],
    isHeaderAuto: [{ type: Input }],
    skipRowsAdjustment: [{ type: Input }],
    forceResetColumns: [{ type: Input }],
    tableLayout: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX;
    /** @type {?} */
    TableComponent.INTERNAL_VIRTUAL_ROW_DATA;
    /** @type {?} */
    TableComponent.INTERNAL_ROW_DIFFER_ID;
    /** @type {?} */
    TableComponent.INTERNAL_ROW_ID;
    /** @type {?} */
    TableComponent.INTERNAL_COLUMN_HEADER_ID;
    /** @type {?} */
    TableComponent.prototype.selectionMode;
    /** @type {?} */
    TableComponent.prototype.rowCustomAttributeBuilder;
    /** @type {?} */
    TableComponent.prototype.rowIdBuilder;
    /** @type {?} */
    TableComponent.prototype.rowStyleFn;
    /**
     * Enable use of virtual scrolling, if this is on, controlWidth and controlHeight must be defined
     * @type {?}
     */
    TableComponent.prototype.virtualScroll;
    /** @type {?} */
    TableComponent.prototype.virtualScrollSortFn;
    /** @type {?} */
    TableComponent.prototype.virtualScrollInvisibleRowBuilder;
    /** @type {?} */
    TableComponent.prototype.rowHeight;
    /** @type {?} */
    TableComponent.prototype.scrollTimeout;
    /** @type {?} */
    TableComponent.prototype.showBlankRow;
    /** @type {?} */
    TableComponent.prototype._virtualViewPort;
    /** @type {?} */
    TableComponent.prototype._dataSource;
    /**
     * Weather or not should enabled sort, default to enabled (null/undefined/true mean enabled)
     * @type {?}
     */
    TableComponent.prototype.enableSort;
    /**
     * Weather or not should allow column drag/drop, default to enabled (null/undefined/true mean enabled)
     * @type {?}
     */
    TableComponent.prototype.enableColumnDragging;
    /**
     * Weather or not should allow column resize, default to enabled (null/undefined/true mean enabled)
     * @type {?}
     */
    TableComponent.prototype.enableColumnResize;
    /**
     * Whether row can be dropped into this table
     * @type {?}
     */
    TableComponent.prototype.droppable;
    /**
     * Restricted right click popup menu only to cell where popup is defined
     * <ng-template ...><vt-label ...popup="abc"></vt-label></ng-template>
     *
     * @type {?}
     */
    TableComponent.prototype.restrictCellPopup;
    /** @type {?} */
    TableComponent.prototype.onChange;
    /** @type {?} */
    TableComponent.prototype.onStateChange;
    /** @type {?} */
    TableComponent.prototype.onDoubleClick;
    /** @type {?} */
    TableComponent.prototype.onDragDrop;
    /** @type {?} */
    TableComponent.prototype.table;
    /** @type {?} */
    TableComponent.prototype.tableContainer;
    /** @type {?} */
    TableComponent.prototype.tableWrapper;
    /** @type {?} */
    TableComponent.prototype.tableHead;
    /** @type {?} */
    TableComponent.prototype.tableFoot;
    /** @type {?} */
    TableComponent.prototype.ghostHeader;
    /** @type {?} */
    TableComponent.prototype.columns;
    /** @type {?} */
    TableComponent.prototype.tableRowDef;
    /** @type {?} */
    TableComponent.prototype.footerRow;
    /** @type {?} */
    TableComponent.prototype._tableRow;
    /** @type {?} */
    TableComponent.prototype.forceFixWidth;
    /** @type {?} */
    TableComponent.prototype.isHeaderPadding;
    /** @type {?} */
    TableComponent.prototype.isHeaderAuto;
    /** @type {?} */
    TableComponent.prototype.skipRowsAdjustment;
    /** @type {?} */
    TableComponent.prototype.forceResetColumns;
    /** @type {?} */
    TableComponent.prototype.tableLayout;
    /** @type {?} */
    TableComponent.prototype.nodes;
    /** @type {?} */
    TableComponent.prototype.headNode;
    /** @type {?} */
    TableComponent.prototype.selectedRows;
    /** @type {?} */
    TableComponent.prototype.lastSelectedRowIndex;
    /** @type {?} */
    TableComponent.prototype._prevSelectedRows;
    /** @type {?} */
    TableComponent.prototype.$colResizable;
    /** @type {?} */
    TableComponent.prototype.$dragableColumns;
    /** @type {?} */
    TableComponent.prototype.$tablesorter;
    /** @type {?} */
    TableComponent.prototype.scrollHandler;
    /** @type {?} */
    TableComponent.prototype.modifiedVirtualRows;
    /** @type {?} */
    TableComponent.prototype.modifiedVirtualRowsJson;
    /** @type {?} */
    TableComponent.prototype.dataSourceDiffer;
    /** @type {?} */
    TableComponent.prototype.columnsDiffer;
    /** @type {?} */
    TableComponent.prototype.customRowDiffer;
    /** @type {?} */
    TableComponent.prototype.virtualScrollDataSourceDiffer;
    /** @type {?} */
    TableComponent.prototype.previousRowIndex;
    /** @type {?} */
    TableComponent.prototype.scrollSubcription;
    /** @type {?} */
    TableComponent.prototype.scrollSubject;
    /** @type {?} */
    TableComponent.prototype.keyupHandler;
    /** @type {?} */
    TableComponent.prototype._virtualScrollDivHeight;
    /** @type {?} */
    TableComponent.prototype._virtualScrollRowPerView;
    /** @type {?} */
    TableComponent.prototype._isViewInit;
    /** @type {?} */
    TableComponent.prototype.maxScrollTop;
    /** @type {?} */
    TableComponent.prototype.tableStyles;
    /** @type {?} */
    TableComponent.prototype.scrollContainerStyles;
    /** @type {?} */
    TableComponent.prototype.virtualScrollProgressStyles;
    /** @type {?} */
    TableComponent.prototype.virtualScrollSortKeys;
    /** @type {?} */
    TableComponent.prototype.prevScrollTop;
    /** @type {?} */
    TableComponent.prototype.prevScrollTopForHiddenHeader;
    /** @type {?} */
    TableComponent.prototype.sortDirection;
    /** @type {?} */
    TableComponent.prototype.sortColumnId;
    /** @type {?} */
    TableComponent.prototype._disabledScrolling;
    /** @type {?} */
    TableComponent.prototype._tableSorterRefreshTm;
    /** @type {?} */
    TableComponent.prototype._tableSorterCacheRefreshTm;
    /** @type {?} */
    TableComponent.prototype._isHeaderCell;
    /** @type {?} */
    TableComponent.prototype.animationFrameId;
    /** @type {?} */
    TableComponent.prototype.theadHeight;
    /** @type {?} */
    TableComponent.prototype.scrollLeft;
    /** @type {?} */
    TableComponent.prototype.columnsHasBeenSwapped;
    /** @type {?} */
    TableComponent.prototype.initTm;
    /** @type {?} */
    TableComponent.prototype.draggableRows;
    /** @type {?} */
    TableComponent.prototype.shouldHandleMouseUp;
    /** @type {?} */
    TableComponent.prototype.isHeaderAppendToFakeTable;
    /** @type {?} */
    TableComponent.prototype.adjustedRows;
    /** @type {?} */
    TableComponent.prototype.skipGhostHeader;
    /** @type {?} */
    TableComponent.prototype.clientHeightVirtualScroll;
    /** @type {?} */
    TableComponent.prototype.preMouseEvent;
    /** @type {?} */
    TableComponent.prototype.isIE9;
    /** @type {?} */
    TableComponent.prototype.el;
    /** @type {?} */
    TableComponent.prototype.changeDetectorRef;
    /** @type {?} */
    TableComponent.prototype.zone;
    /** @type {?} */
    TableComponent.prototype.clipboardService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFDelIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUV4RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFnQixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7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TUFBTTt5QkFDTixNQUFNO29CQUVOLFNBQVMsU0FBQyxPQUFPOzZCQUNqQixTQUFTLFNBQUMsZ0JBQWdCLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDOzJCQUM5QyxTQUFTLFNBQUMsY0FBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQzt3QkFDNUMsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7d0JBRXpDLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDOzBCQUd6QyxTQUFTLFNBQUMsYUFBYSxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQzsyQkFFM0MsZUFBZSxTQUFDLG9CQUFvQjswQkFZcEMsWUFBWSxTQUFDLG9CQUFvQjt3QkFDakMsWUFBWSxTQUFDLGtCQUFrQjs0QkFHL0IsZUFBZSxTQUFDLFlBQVk7NEJBZTVCLEtBQUs7OEJBQ0wsS0FBSzsyQkFDTCxLQUFLO2lDQUVMLEtBQUs7Z0NBR0wsS0FBSzswQkFHTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdG9yUmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0NoaWxkLCBTa2lwU2VsZiwgT3B0aW9uYWwsIGZvcndhcmRSZWYsIFJlbmRlcmVyMiwgQ29udGVudENoaWxkLCBOZ1pvbmUsIEl0ZXJhYmxlRGlmZmVycywgSXRlcmFibGVEaWZmZXIsIERvQ2hlY2sgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFibGVDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLWNvbHVtbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGFibGVTZWxlY3Rpb25FdmVudCB9IGZyb20gJy4vdGFibGUtc2VsZWN0aW9uLWV2ZW50JztcbmltcG9ydCB7IEhUTUxFbGVtZW50V3JhcHBlciB9IGZyb20gJy4uL3RyZWUtdGFibGUvaHRtbC1lbGVtZW50LXdyYXBwZXInO1xuaW1wb3J0IHsgT25DcmVhdGVFdmVudCB9IGZyb20gJy4uL2Jhc2Uvb24tY3JlYXRlLWV2ZW50JztcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gJy4uL2phdmEvdmVjdG9yJztcbmltcG9ydCB7IFRhYmxlUm93RGVmRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJsZS1yb3ctZGVmLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGb290ZXJSb3dEaXJlY3RpdmUgfSBmcm9tICcuL2Zvb3Rlci1yb3cuZGlyZWN0aXZlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3ViamVjdCwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBSb3dEaXJlY3RpdmUgfSBmcm9tICcuL3Jvdy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2xpZW50RXZlbnQgfSBmcm9tICcuLi9ldmVudC1oYW5kbGVyL2NsaWVudC1ldmVudCc7XG5pbXBvcnQgeyBBcHBVdGlscyB9IGZyb20gJy4uL2Jhc2UvYXBwLXV0aWxzJztcbmltcG9ydCB7IFZpZXdDb21wb25lbnQgfSBmcm9tICcuLi92aWV3L3ZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IENsaXBib2FyZFNlcnZpY2UgfSBmcm9tICcuLi9jbGlwYm9hcmQvY2xpcGJvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFibGVDZWxsRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJsZS1jZWxsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4uL2NoZWNrYm94L2NoZWNrYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSYWRpb0J1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4uL3JhZGlvLWJ1dHRvbi9yYWRpby1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRGaWVsZENvbXBvbmVudCB9IGZyb20gJy4uL3RleHQtZmllbGQvdGV4dC1maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tYm9Cb3hDb21wb25lbnQgfSBmcm9tICcuLi9jb21iby1ib3gvY29tYm8tYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBLZXlVdGlscyB9IGZyb20gJy4uL2Jhc2Uva2V5LXV0aWxzJztcbmltcG9ydCB7IGlzSUUgfSBmcm9tICcuLi8uLi9mdW5jdGlvbnMvaXMtaWUnO1xuXG5kZWNsYXJlIHZhciBqUXVlcnk6IGFueTtcblxuZGVjbGFyZSB2YXIgJDtcblxuZGVjbGFyZSB0eXBlIFNlbGVjdGlvbk1vZGUgPSBcIm5vbmVcIiB8IFwic2luZ2xlUm93XCIgfCBcIm11bHRpUm93XCIgfCBcInNpbmdsZUNlbGxcIiB8IFwibXVsdGlDZWxsXCIgfCBcInNpbmdsZUNvbHVtblwiIHwgXCJtdWx0aUNvbHVtblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZpcnR1YWxDb2x1bW5DaGFuZ2VEYXRhIHtcbiAgICB0ZXh0OiBzdHJpbmcsXG4gICAgY2hlY2tlZDogYm9vbGVhblxufVxuLyoqXG4gKiBDbGFzcyBmb3IgdGFibGUgY29tcG9uZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndnQtdGFibGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFibGUuY29tcG9uZW50LmNzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAge1xuICAgICAgICBwcm92aWRlOiBCYXNlQ29tcG9uZW50LFxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKT0+VGFibGVDb21wb25lbnQpXG4gICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2sge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVg6IHN0cmluZyA9IFwiJCRJTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYJCRcIjtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlRFUk5BTF9WSVJUVUFMX1JPV19EQVRBIDogc3RyaW5nID0gXCIkJElOVEVSTkFMX1ZJUlRVQUxfUk9XX0RBVEEkJFwiO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOVEVSTkFMX1JPV19ESUZGRVJfSUQgOiBzdHJpbmcgPSBcIiQkSU5URVJOQUxfVklSVFVBTF9ST1dfRElGRkVSX0lEJCRcIjtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlRFUk5BTF9ST1dfSUQgOiBzdHJpbmcgPSBcIiQkSU5URVJOQUxfVklSVFVBTF9ST1dfSUQkJFwiO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOVEVSTkFMX0NPTFVNTl9IRUFERVJfSUQgPSBcIiQkSU5URVJOQUxfQ09MVU1OX0hFQURFUl9JRCQkXCI7XG5cbiAgICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlOiBTZWxlY3Rpb25Nb2RlID0gXCJzaW5nbGVSb3dcIjtcbiAgICBASW5wdXQoKSByb3dDdXN0b21BdHRyaWJ1dGVCdWlsZGVyOiAocm93OmFueSwgcm93TnVtYmVyPzogbnVtYmVyLCB2aWV3PzogVmlld0NvbXBvbmVudCk9Pnt9O1xuICAgIEBJbnB1dCgpIHJvd0lkQnVpbGRlcjogKHJvdzphbnksIHJvd051bWJlcj86IG51bWJlcik9PnN0cmluZztcbiAgICBASW5wdXQoKSByb3dTdHlsZUZuOiAocm93OmFueSk9PnN0cmluZztcblxuICAgIC8qKiBFbmFibGUgdXNlIG9mIHZpcnR1YWwgc2Nyb2xsaW5nLCBpZiB0aGlzIGlzIG9uLCBjb250cm9sV2lkdGggYW5kIGNvbnRyb2xIZWlnaHQgbXVzdCBiZSBkZWZpbmVkICovXG4gICAgQElucHV0KCkgdmlydHVhbFNjcm9sbDogYm9vbGVhbjtcblxuICAgIC8vY3VzdG9tIHNvcnQgZnVuY3Rpb24gZm9yIHZpcnR1YWwgc2Nyb2xsXG4gICAgQElucHV0KCkgdmlydHVhbFNjcm9sbFNvcnRGbjogKHZpZXc6IEJhc2VDb21wb25lbnQsIGNvbHVtbkluZGV4OiBudW1iZXIpPT5zdHJpbmc7XG5cbiAgICAvL2N1c3RvbSBmdW5jdGlvbiB0byBcInJlbmRlclwiIHRoZSBpbnZpc2libGUgcm93IChmb3IgdmlydHVhbCBzY3JvbGwpXG4gICAgQElucHV0KCkgdmlydHVhbFNjcm9sbEludmlzaWJsZVJvd0J1aWxkZXI6ICh2aWV3OiBCYXNlQ29tcG9uZW50LCByb3dEYXRhOiBhbnkpPT5IVE1MRWxlbWVudFdyYXBwZXI7XG5cbiAgICAvL3VzZSBmb3IgdmlydHVhbCBzY3JvbGxpbmdcbiAgICBASW5wdXQoKSByb3dIZWlnaHQ6IG51bWJlciA9IDI0O1xuXG4gICAgQElucHV0KCkgc2Nyb2xsVGltZW91dDogbnVtYmVyID0gMjAwO1xuXG4gICAgLy9zaG93IGJsYW5rIHJvdyBpZiB3ZSBkb24ndCBoYXZlIGVub3VnaCBkYXRhXG4gICAgc2hvd0JsYW5rUm93OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc2V0IGRhdGFTb3VyY2UoZHM6IEFycmF5PGFueT4pIHtcbiAgICAgICAgLy9kYXRhIGhhcyBjaGFuZ2VzLCB3ZSBuZWVkIHRvIGRvIHNvbWUgY2xlYW4gdXAuXG4gICAgICAgIHRoaXMuY2xlYW5VcENoaWxkTm9kZXMoKTtcblxuICAgICAgICB0aGlzLnJlc2V0VGFibGVDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB0aGlzLmJ1aWxkUm93SWRlbnRpdHkoZHMpO1xuXG4gICAgICAgIHRoaXMuY2hlY2tTaG93QmxhbmtSb3coKTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1Jvd0luZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzSnNvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzID0gW107XG5cbiAgICAgICAgdGhpcy5jYWxjVmlydHVhbFNjcm9sbEhlaWdodCgpO1xuICAgICAgICB0aGlzLmNhbGNWaXJ0dWFsU2Nyb2xsVmlld1BvcnQoKTtcbiAgICB9XG5cbiAgICBnZXQgZGF0YVNvdXJjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSA/IHRoaXMuX3ZpcnR1YWxWaWV3UG9ydCA6IHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvL3ZpcnR1YWwgZGF0YXNvdXJjZVxuICAgIHByaXZhdGUgX3ZpcnR1YWxWaWV3UG9ydDogQXJyYXk8YW55PjtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogQXJyYXk8YW55PjtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqIFdlYXRoZXIgb3Igbm90IHNob3VsZCBlbmFibGVkIHNvcnQsIGRlZmF1bHQgdG8gZW5hYmxlZCAobnVsbC91bmRlZmluZWQvdHJ1ZSBtZWFuIGVuYWJsZWQpICovXG4gICAgQElucHV0KCkgZW5hYmxlU29ydDogYm9vbGVhbjtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqIFdlYXRoZXIgb3Igbm90IHNob3VsZCBhbGxvdyBjb2x1bW4gZHJhZy9kcm9wLCBkZWZhdWx0IHRvIGVuYWJsZWQgKG51bGwvdW5kZWZpbmVkL3RydWUgbWVhbiBlbmFibGVkKSAqL1xuICAgIEBJbnB1dCgpIGVuYWJsZUNvbHVtbkRyYWdnaW5nOiBib29sZWFuXG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKiBXZWF0aGVyIG9yIG5vdCBzaG91bGQgYWxsb3cgY29sdW1uIHJlc2l6ZSwgZGVmYXVsdCB0byBlbmFibGVkIChudWxsL3VuZGVmaW5lZC90cnVlIG1lYW4gZW5hYmxlZCkgKi9cbiAgICBASW5wdXQoKSBlbmFibGVDb2x1bW5SZXNpemU6IGJvb2xlYW47XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKiBXaGV0aGVyIHJvdyBjYW4gYmUgZHJvcHBlZCBpbnRvIHRoaXMgdGFibGUgKi9cbiAgICBASW5wdXQoKSBkcm9wcGFibGU6IGJvb2xlYW4gfCBzdHJpbmc7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIFJlc3RyaWN0ZWQgcmlnaHQgY2xpY2sgcG9wdXAgbWVudSBvbmx5IHRvIGNlbGwgd2hlcmUgcG9wdXAgaXMgZGVmaW5lZFxuICAgICAqIDxuZy10ZW1wbGF0ZSAuLi4+PHZ0LWxhYmVsIC4uLnBvcHVwPVwiYWJjXCI+PC92dC1sYWJlbD48L25nLXRlbXBsYXRlPlxuICAgICAqICovXG4gICAgQElucHV0KCkgcmVzdHJpY3RDZWxsUG9wdXA6IGJvb2xlYW47XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPFRhYmxlU2VsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZVNlbGVjdGlvbkV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBvblN0YXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIG9uRG91YmxlQ2xpY2s6IEV2ZW50RW1pdHRlcjxUYWJsZVNlbGVjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFibGVTZWxlY3Rpb25FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgb25EcmFnRHJvcDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgQFZpZXdDaGlsZCgndGFibGUnKSB0YWJsZTogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwidGFibGVDb250YWluZXJcIiwge3JlYWQ6IEVsZW1lbnRSZWZ9KSB0YWJsZUNvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwidGFibGVXcmFwcGVyXCIsIHtyZWFkOiBFbGVtZW50UmVmfSkgdGFibGVXcmFwcGVyOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJ0YWJsZUhlYWRcIiwge3JlYWQ6IEVsZW1lbnRSZWZ9KSB0YWJsZUhlYWQ6IEVsZW1lbnRSZWY7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBAVmlld0NoaWxkKFwidGFibGVGb290XCIsIHtyZWFkOiBFbGVtZW50UmVmfSkgdGFibGVGb290OiBFbGVtZW50UmVmO1xuXG4gICAgLy8gQFZpZXdDaGlsZChcImZha2VUYWJsZVwiLCB7cmVhZDogRWxlbWVudFJlZn0pIGZha2VUYWJsZTogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwiZ2hvc3RIZWFkZXJcIiwge3JlYWQ6IEVsZW1lbnRSZWZ9KSBnaG9zdEhlYWRlcjogRWxlbWVudFJlZjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oVGFibGVDb2x1bW5EaXJlY3RpdmUpXG4gICAgc2V0IHRhYmxlQ29sdW1ucyhjb2x1bW5zOiBRdWVyeUxpc3Q8VGFibGVDb2x1bW5EaXJlY3RpdmU+KSB7XG4gICAgICB0aGlzLmNsZWFySGVhZGVyTm9kZXMoKTtcbiAgICAgIHRoaXMuY29sdW1ucyA9IHRoaXMudG9Db2x1bW5zKGNvbHVtbnMpO1xuXG4gICAgICBpZiAodGhpcy5faXNWaWV3SW5pdCA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmluaXRQbHVnaW5zKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29sdW1uczogQXJyYXk8VGFibGVDb2x1bW5EaXJlY3RpdmU+O1xuXG4gICAgQENvbnRlbnRDaGlsZChUYWJsZVJvd0RlZkRpcmVjdGl2ZSkgdGFibGVSb3dEZWY6IFRhYmxlUm93RGVmRGlyZWN0aXZlO1xuICAgIEBDb250ZW50Q2hpbGQoRm9vdGVyUm93RGlyZWN0aXZlKSBmb290ZXJSb3c6IEZvb3RlclJvd0RpcmVjdGl2ZTtcblxuICAgIC8vdGFibGUgd2l0aCBubyBkYXRhc291cmNlXG4gICAgQENvbnRlbnRDaGlsZHJlbihSb3dEaXJlY3RpdmUpIHNldCB0YWJsZVJvd1F1ZXJ5KHJvd3M6IFF1ZXJ5TGlzdDxSb3dEaXJlY3RpdmU+KSB7XG4gICAgICAgIHRoaXMuY2xlYW5VcENoaWxkTm9kZXMoKTtcbiAgICAgICAgdGhpcy5fdGFibGVSb3cgPSBbXTtcbiAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAgICAgdGhpcy5fdGFibGVSb3cgPSByb3dzLnRvQXJyYXkoKTtcbiAgICB9XG5cbiAgICBnZXQgdGFibGVSb3coKTogQXJyYXk8Um93RGlyZWN0aXZlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YWJsZVJvdztcbiAgICB9XG5cbiAgICBwcml2YXRlIF90YWJsZVJvdzogQXJyYXk8Um93RGlyZWN0aXZlPjtcblxuICAgIC8vY3VzdG9tIHNvcnQgZnVuY3Rpb24gZm9yIHZpcnR1YWwgc2Nyb2xsXG4gICAgQElucHV0KCkgZm9yY2VGaXhXaWR0aDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgaXNIZWFkZXJQYWRkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgaXNIZWFkZXJBdXRvOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBza2lwUm93c0FkanVzdG1lbnQ6IGJvb2xlYW47XG5cbiAgICAvL2ZvcmNlIHJlc2V0IGNvbHVtbnMgd2hlbiBkYXRhU291cmNlIGNoYW5nZXNcbiAgICBASW5wdXQoKSBmb3JjZVJlc2V0Q29sdW1uczogYm9vbGVhbjtcblxuICAgIC8vdGFibGUtbGF5b3V0IGRlZmF1bHQgZml4ZWRcbiAgICBASW5wdXQoKSB0YWJsZUxheW91dDogc3RyaW5nID0gXCJmaXhlZFwiO1xuXG4gICAgLy90cmFjayBkeW5hbWljIHJvd3Mgc28gd2UgY2FuIHF1ZXJ5IGZvciBjaGlsZCBsYXRlclxuICAgIG5vZGVzOiBBcnJheTxIVE1MRWxlbWVudFdyYXBwZXI+ID0gW107XG4gICAgaGVhZE5vZGU6IEhUTUxFbGVtZW50V3JhcHBlcjtcbiAgICBzZWxlY3RlZFJvd3M6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgICBsYXN0U2VsZWN0ZWRSb3dJbmRleDogbnVtYmVyO1xuICAgIHByaXZhdGUgX3ByZXZTZWxlY3RlZFJvd3MgPSBbXTtcbiAgICBwcml2YXRlIGdldCBST1dfSU5ERVhfS0VZKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnJCQkJHJvd0luZGV4JCQkJCc7XG4gICAgfVxuICAgIHByaXZhdGUgJGNvbFJlc2l6YWJsZTogSlF1ZXJ5IHwgYW55O1xuICAgIHByaXZhdGUgJGRyYWdhYmxlQ29sdW1uczogSlF1ZXJ5IHwgYW55O1xuICAgIHByaXZhdGUgJHRhYmxlc29ydGVyOiBKUXVlcnkgfCBhbnk7XG4gICAgcHJpdmF0ZSBzY3JvbGxIYW5kbGVyOiBGdW5jdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBtb2RpZmllZFZpcnR1YWxSb3dzOiB7W25hbWU6IHN0cmluZ106IHtbbmFtZTogc3RyaW5nXTogVmlydHVhbENvbHVtbkNoYW5nZURhdGF9fTtcbiAgICBwcml2YXRlIG1vZGlmaWVkVmlydHVhbFJvd3NKc29uOiB7W25hbWU6IHN0cmluZ106IHt9fTtcbiAgICAvLyBtb3VzZVVwSGFuZGxlcjogRnVuY3Rpb24gPSBudWxsO1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwcml2YXRlIGRhdGFTb3VyY2VEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPEFycmF5PGFueT4+O1xuICAgIHByaXZhdGUgY29sdW1uc0RpZmZlcjogSXRlcmFibGVEaWZmZXI8QXJyYXk8YW55Pj47XG4gICAgcHJpdmF0ZSBjdXN0b21Sb3dEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPEFycmF5PGFueT4+O1xuXG4gICAgLy92aXJ0dWFsIHNjcm9sbFxuICAgIHByaXZhdGUgdmlydHVhbFNjcm9sbERhdGFTb3VyY2VEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPEFycmF5PGFueT4+O1xuXG4gICAgcHJpdmF0ZSBwcmV2aW91c1Jvd0luZGV4OiBudW1iZXIgPSBudWxsO1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwcml2YXRlIHNjcm9sbFN1YmNyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBzY3JvbGxTdWJqZWN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgcHJpdmF0ZSBrZXl1cEhhbmRsZXI6IChldnQ6IEtleWJvYXJkRXZlbnQpPT52b2lkO1xuXG4gICAgLy8gVmlydHVhbCBzY3JpcHQgaGVpZ2h0LCB1c2UgaW50ZXJuYWxseVxuICAgIF92aXJ0dWFsU2Nyb2xsRGl2SGVpZ2h0OiBudW1iZXI7XG5cbiAgICBwcml2YXRlIF92aXJ0dWFsU2Nyb2xsUm93UGVyVmlldzogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBfaXNWaWV3SW5pdDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgbWF4U2Nyb2xsVG9wOiBudW1iZXI7XG5cbiAgICB0YWJsZVN0eWxlczoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9O1xuICAgIHNjcm9sbENvbnRhaW5lclN0eWxlczoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9O1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgdmlydHVhbFNjcm9sbFByb2dyZXNzU3R5bGVzOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ307XG4gICAgdmlydHVhbFNjcm9sbFNvcnRLZXlzOiBBcnJheTxzdHJpbmc+O1xuICAgIHByZXZTY3JvbGxUb3A6IG51bWJlciA9IDA7XG4gICAgcHJldlNjcm9sbFRvcEZvckhpZGRlbkhlYWRlcjogbnVtYmVyID0gMDtcblxuICAgIHNvcnREaXJlY3Rpb246c3RyaW5nID0gXCJcIjsgICAvLyBSWEMgQWRkXG4gICAgc29ydENvbHVtbklkOm51bWJlciA9IDA7ICAgIC8vIFJYQyBBZGRcblxuICAgIHByaXZhdGUgX2Rpc2FibGVkU2Nyb2xsaW5nOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBfdGFibGVTb3J0ZXJSZWZyZXNoVG06IGFueTtcblxuICAgIHByaXZhdGUgX3RhYmxlU29ydGVyQ2FjaGVSZWZyZXNoVG06IGFueTtcblxuICAgIHByaXZhdGUgX2lzSGVhZGVyQ2VsbDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgYW5pbWF0aW9uRnJhbWVJZDogYW55O1xuXG4gICAgcHJpdmF0ZSB0aGVhZEhlaWdodDogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgc2Nyb2xsTGVmdDogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgY29sdW1uc0hhc0JlZW5Td2FwcGVkOiBib29sZWFuO1xuXG4gICAgLy9pbml0IHBsdWdpbnMgdGltZXJcbiAgICBwcml2YXRlIGluaXRUbTogYW55O1xuXG4gICAgcHJpdmF0ZSBkcmFnZ2FibGVSb3dzOiBib29sZWFuO1xuICAgIHByaXZhdGUgc2hvdWxkSGFuZGxlTW91c2VVcDogYm9vbGVhbjtcbiAgICBwcml2YXRlIGlzSGVhZGVyQXBwZW5kVG9GYWtlVGFibGU6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBhZGp1c3RlZFJvd3M6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBza2lwR2hvc3RIZWFkZXI6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIGNsaWVudEhlaWdodFZpcnR1YWxTY3JvbGw6IG51bWJlcjtcblxuICAgIHByaXZhdGUgcHJlTW91c2VFdmVudDogTW91c2VFdmVudCA9IG51bGw7XG5cbiAgICBwcml2YXRlIGlzSUU5OiBib29sZWFuO1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXJlbnQgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSBlbCBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gY2hhbmdlRGV0ZWN0b3JSZWYgSW5qZWN0IENoYW5nZURldGVjdG9yXG4gICAgICogQHBhcmFtIHJlbmRlcmVyIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB6b25lIEluamVjdCBOZ1pvbmVcbiAgICAgKiBAcGFyYW0gZGlmZmVycyBJbmplY3QgSW50ZXJhYmxlRGlmZmVyc1xuICAgICAqIEBwYXJhbSBjbGlwYm9hcmRTZXJ2aWNlIEluamVjdCBbW0NsaXBib2FyZFNlcnZpY2VdXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsXG4gICAgICAgIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgICAgICBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgIHByaXZhdGUgY2xpcGJvYXJkU2VydmljZTogQ2xpcGJvYXJkU2VydmljZVxuICAgICkge1xuICAgICAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbCwgcmVuZGVyZXIpO1xuXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZURpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgICAgIHRoaXMuY29sdW1uc0RpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgICAgIHRoaXMuY3VzdG9tUm93RGlmZmVyID0gZGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcblxuICAgICAgICB0aGlzLmlzSUU5ID0gaXNJRSgpID09IDk7XG5cbiAgICAgICAgLy9mb3IgdmlydHVhbCBzY3JvbGxcbiAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsRGF0YVNvdXJjZURpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG5cbiAgICAgICAgdGhpcy5rZXl1cEhhbmRsZXIgPSAoZXZ0OiBLZXlib2FyZEV2ZW50KT0+IHRoaXMuaGFuZGxlS2V5VXAoZXZ0KTtcbiAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGlzYWJsZWRTY3JvbGxpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucHJldlNjcm9sbFRvcEZvckhpZGRlbkhlYWRlciAhPT0gZXZlbnQuc3JjRWxlbWVudC5zY3JvbGxUb3ApIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2tpcEdob3N0SGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5naG9zdEhlYWRlci5uYXRpdmVFbGVtZW50LCBcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xXaWR0aCA9PT0gXCIxMDAlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5naG9zdEhlYWRlci5uYXRpdmVFbGVtZW50LCBcIndpZHRoXCIsIFwiMTAwJVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudGFibGVIZWFkLm5hdGl2ZUVsZW1lbnQsIFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vICAgaWYodGhpcy5mb3JjZUZpeFdpZHRoKXtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZmFrZVRhYmxlLm5hdGl2ZUVsZW1lbnQsIFwidGFibGUtbGF5b3V0XCIsIFwiZml4ZWRcIik7XG4gICAgICAgICAgICAvLyAgIH1cblxuICAgICAgICAgICAgICBpZih0aGlzLnRhYmxlRm9vdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRhYmxlRm9vdC5uYXRpdmVFbGVtZW50LCBcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gICB0aGlzLmFwcGVuZEhlYWRlclRvRmFrZVRhYmxlKCk7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uRnJhbWVJZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbkZyYW1lSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RUYWJsZUhlYWQoZXZlbnQsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJldlNjcm9sbFRvcEZvckhpZGRlbkhlYWRlciA9IGV2ZW50LnNyY0VsZW1lbnQuc2Nyb2xsVG9wO1xuXG4gICAgICAgICAgICAvL2Rpc2FibGVkIGZvciBJRTExL0lFOSAodG9vIHNsb3cpXG4gICAgICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICBpZiAodGhpcy5hbmltYXRpb25GcmFtZUlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25GcmFtZUlkKTtcbiAgICAgICAgICAgIC8vICAgIH1cblxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYW5pbWF0aW9uRnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKT0+dGhpcy5hZGp1c3RUYWJsZUhlYWQoZXZlbnQsIHRydWUpKTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgdGhpcy5zY3JvbGxTdWJqZWN0Lm5leHQoZXZlbnQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICog55S76Z2i44GM44Oq44K144Kk44K644GV44KM44Gf6Zqb44Gr5YuV44GL44GZ44Kk44OZ44Oz44OIXG4gICAgICovXG4gICAgdGFibGVSZXNpemUoKSB7XG4gICAgICAgIHRoaXMuYWRqdXN0VGFibGVGb290ZXIoKTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIERvIGNoZWNrIGxpZmVjeWNsZVxuICAgICAqL1xuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlRGlmZmVyLmRpZmYodGhpcy5fZGF0YVNvdXJjZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjVmlydHVhbFNjcm9sbEhlaWdodCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY1ZpcnR1YWxTY3JvbGxWaWV3UG9ydCh0aGlzLnByZXZTY3JvbGxUb3ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNoZWNrU2hvd0JsYW5rUm93KCk7XG4gICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVGFibGVTb3J0ZXIoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUgJiYgdGhpcy52aXJ0dWFsU2Nyb2xsRGF0YVNvdXJjZURpZmZlci5kaWZmKHRoaXMuX3ZpcnR1YWxWaWV3UG9ydCkpIHtcbiAgICAgICAgICB0aGlzLmNoZWNrU2hvd0JsYW5rUm93KCk7XG4gICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2hlY2tDdXN0b21Sb3dzRm9yQ2hhbmdlZCgpO1xuICAgICAgICAgIHRoaXMuY2hlY2tDb2x1bW5zRm9yQ2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdCBsaWZlY3ljbGUuIENhbGwgcGFyZW50IGNsYXNzIG5nT25Jbml0XG4gICAgICovXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZS4gQXBwbHkgalF1ZXJ5IHBsdWdpbiBhbmQgZXZlbnQgbGlzdGVuZXJzXG4gICAgICovXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcblxuICAgICAgICAvLzE3MjY6IEl0IGxvb2tzIGxpa2Ugc29waGlhIGFsc28gcXVlcnlpbmcgZm9yIHRhYmxlIGNvbHVtbiBkZWYgc28gd2UgbmVlZCB0byBzdG9yZSB0byBvdXIgcGFyZW50XG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLl9nZXROb25lQWN0aXZlVmlld1BhcmVudCgpIHx8IHRoaXMuZ2V0UGFyZW50VmlldygpO1xuXG4gICAgICAgIGlmICh2aWV3ICE9IG51bGwgJiYgdGhpcy5jb2x1bW5zICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5maWx0ZXIoY29sPT5jb2wuaWQgIT0gbnVsbCAmJiBjb2wuaWQgIT09IFwiXCIpLmZvckVhY2goY29sPT57XG4gICAgICAgICAgICAgIGlmICh2aWV3W1wiX3RhYmxlQ29sdW1uc01hcFwiXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmlld1tcIl90YWJsZUNvbHVtbnNNYXBcIl0gPSBuZXcgTWFwPHN0cmluZywgQmFzZUNvbXBvbmVudD4oKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZpZXdbXCJfdGFibGVDb2x1bW5zTWFwXCJdLnNldChLZXlVdGlscy50b01hcEtleShjb2wuaWQpLCBjb2wgYXMgYW55KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9kcm9wcGFibGU/XG4gICAgICAgIGlmICh0aGlzLmRyb3BwYWJsZSA9PT0gdHJ1ZSB8fCB0aGlzLmRyb3BwYWJsZSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICQodGhpcy50YWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50KS5kcm9wcGFibGUoe1xuICAgICAgICAgICAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgICAgICAgICAgIFwidWktZHJvcHBhYmxlLWhvdmVyXCI6IFwidWktc3RhdGUtaG92ZXJcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaG92ZXJDbGFzczogXCJ1aS1zdGF0ZS1ob3ZlclwiLFxuICAgICAgICAgICAgICAgIGFjY2VwdDogXCJ0clwiLFxuICAgICAgICAgICAgICAgIGRyb3A6IChldmVudCwgdWkpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25EcmFnRHJvcC5lbWl0KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0b2xlcmFuY2U6IFwicG9pbnRlclwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsU3ViY3JpcHRpb24gPSB0aGlzLnNjcm9sbFN1YmplY3QucGlwZShkZWJvdW5jZSgoKT0+dGltZXIodGhpcy5zY3JvbGxUaW1lb3V0KSkpLnN1YnNjcmliZSgoZXZlbnQpPT57XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5naG9zdEhlYWRlci5uYXRpdmVFbGVtZW50LCBcImRpc3BsYXlcIik7XG5cbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZVZpcnR1YWxTY3JvbGxEYXRhKGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmFkanVzdFRhYmxlSGVhZChldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNjcm9sbENvbnRhaW5lclN0eWxlcyA9IHtcbiAgICAgICAgICAgIFwib3ZlcmZsb3cteVwiOiBcImF1dG9cIixcbiAgICAgICAgICAgIFwib3ZlcmZsb3cteFwiOiBcInZpc2libGVcIixcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiXG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29udHJvbEhlaWdodCA9PSBudWxsIHx8IHRoaXMuY29udHJvbEhlaWdodCA9PSBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGllbnRIZWlnaHRWaXJ0dWFsU2Nyb2xsID0gKHRoaXMudGFibGVDb250YWluZXIubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgICAgIGVsc2UgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50SGVpZ2h0VmlydHVhbFNjcm9sbCA9IHBhcnNlSW50KHRoaXMuY29udHJvbEhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4odGhpcy5jbGllbnRIZWlnaHRWaXJ0dWFsU2Nyb2xsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNDYWxjTm9WaXJ0dWFsUm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzVmlld0luaXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRhYmxlU3R5bGVzID0ge1xuICAgICAgICAgICAgICAgIFwidG9wXCI6IFwiMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJsZWZ0XCI6IFwiMHB4XCIsXG4gICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBcImNhbGMoMTAwJSAtIDE3cHgpXCIsXG4gICAgICAgICAgICAgICAgXCJtYXgtd2lkdGhcIjogXCIxMDB2d1wiLFxuICAgICAgICAgICAgICAgIFwibWF4LWhlaWdodFwiOiBcIjEwMHZoXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsUHJvZ3Jlc3NTdHlsZXMgPSB7XG4gICAgICAgICAgICAgICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICAgICAgICAgICAgICBcImRpc3BsYXlcIjogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jYWxjVmlydHVhbFRhYmxlUG9zaXRpb24oMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgLy9maXggZXhwcmVzc2lvbiBoYXMgY2hhbmdlZCBibGFoIGJsYWggYmxhaFxuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcblxuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGNWaXJ0dWFsU2Nyb2xsSGVpZ2h0KCk7XG4gICAgICAgICAgICB0aGlzLmNhbGNWaXJ0dWFsU2Nyb2xsVmlld1BvcnQoMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PiB7XG4gICAgICAgICAgICB0aGlzLl9pc1ZpZXdJbml0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFBsdWdpbnMoKTtcblxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsSGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5rZXl1cEhhbmRsZXIsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHJpdmF0ZSBpbml0UGx1Z2lucygpIHtcbiAgICAgICAgaWYgKHRoaXMuJGRyYWdhYmxlQ29sdW1ucykge1xuICAgICAgICAgICAgdGhpcy4kZHJhZ2FibGVDb2x1bW5zLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmluaXRUbSAhPSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaW5pdFRtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmICh0aGlzLnRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudGFibGUubmF0aXZlRWxlbWVudCwgXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuXG4gICAgICAgICAgICB0aGlzLmluaXRUbSA9IHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudGFibGUubmF0aXZlRWxlbWVudCwgXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyDlho3ooajnpLrmmYLjgavjgrnjgq/jg63jg7zjg6vjg5Djg7zjga7kvY3nva7jgpLmiLvjgZlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGpRdWVyeVRhYmxlID0galF1ZXJ5KHRoaXMudGFibGUubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW5hYmxlQ29sdW1uRHJhZ2dpbmcgPT0gbnVsbCB8fCB0aGlzLmVuYWJsZUNvbHVtbkRyYWdnaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRkcmFnYWJsZUNvbHVtbnMgPSBqUXVlcnlUYWJsZS5kcmFnYWJsZUNvbHVtbnMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BDYWxsYmFjazogKGZyb21JbmRleCwgdG9JbmRleCk9PnRoaXMuc3dhcENvbHVtbnMoZnJvbUluZGV4LCB0b0luZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnRW5kQ2FsbGJhY2s6ICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNraXBHaG9zdEhlYWRlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbENvbnRhaW5lclN0eWxlc1tcIm92ZXJmbG93LXlcIl0gPSBcImF1dG9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnU3RhcnRDYWxsYmFjazogKGNvbElkeCk9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpcEdob3N0SGVhZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhbkRyYWcgPSB0aGlzLmNhbkRyYWdDb2x1bW4oY29sSWR4KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuRHJhZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxDb250YWluZXJTdHlsZXNbXCJvdmVyZmxvdy15XCJdID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWRTY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbkRyYWc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnRW50ZXJDYWxsYmFjazogKGNvbElkeCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FuRHJhZ0NvbHVtbihjb2xJZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0aGlzLmVuYWJsZVNvcnQgPT0gbnVsbCB8fCB0aGlzLmVuYWJsZVNvcnQgPT09IHRydWUpICYmIHRoaXMuJHRhYmxlc29ydGVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR0YWJsZXNvcnRlciA9IGpRdWVyeVRhYmxlLnRhYmxlc29ydGVyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0cyAgICAgICAgOiBbJ3plYnJhJywgJ2NvbHVtbnMnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNOdW1iZXJGb3JtYXQgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXggOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydFJlc2V0IDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRSZXN0YXJ0IDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydFN0YWJsZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5SW5pdDogdHJ1ZSAvLyBtb3ZlIHRoZSBpbml0aWFsIHBlcmZvcm1hbmNlIGhpdCB0byBmaXJzdCBzb3J0IHNvIHRoZSB0YWJsZSB3b3VsZCBsb2FkIGZhc3RlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmlydHVhbFNjcm9sbCAhPT0gdHJ1ZSAmJiB0aGlzLiR0YWJsZXNvcnRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR0YWJsZXNvcnRlci50cmlnZ2VyKFwidXBkYXRlSGVhZGVyc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0SGVhZGVyV2lkdGhIZWlnaHQoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmFibGVDb2x1bW5SZXNpemUgPT0gbnVsbCB8fCB0aGlzLmVuYWJsZUNvbHVtblJlc2l6ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldF9jb2x1bW5zID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3JpZ2luYWxfY29sdW1uV2lkdGhzID0gbmV3IEFycmF5KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2x1bW4gPSB0aGlzLmNvbHVtbnMuZmluZCgoaXRlbSwgaWR4KT0+aWR4ID09PSBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb2x1bW4gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRDaGlsZHJlbiA9IHRoaXMudGFibGVIZWFkLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcigndGg6bnRoLWNoaWxkKCcgKyAoaSsxKSArICcpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldF9jb2x1bW5zLnB1c2goaGVhZENoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxfY29sdW1uV2lkdGhzLnB1c2goaGVhZENoaWxkcmVuLnN0eWxlLndpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbGVhbnVwQ29sUmVzaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRjb2xSZXNpemFibGUgPSBqUXVlcnlUYWJsZS5jb2xSZXNpemFibGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdmVEcmFnOiBmYWxzZSwgLy90dXJuaW5nIHRoaXMgb24gd2lsbCBpbmN1cnJlZCBhIHNldmVyZSBwZXJmb3JtYW5jZSBwZW5hbHR5IG9uIElFIHNvIGxlYXZlIGl0IG9mZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZU1vZGU6ICdvdmVyZmxvdycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGlhbFJlZnJlc2g6IHRydWUsIC8vQWZ0ZXIgY2xvc2luZyB0aGUgd2luZG93IGFuZCBvcGVuaW5nIGFnYWluLCBjb2x1bW5SZXNpemVyIGNhbid0IHdvcmsuIFRvIGZpeCB0aGF0LCB0aGlzIHZhbHVlIGlzIG5lZWRlZC4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyT25seTogdHJ1ZSAvL2FsbG93IGRyYWdnaW5nIHVzaW5nIGhlYWRlciBvbmx5XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRhcmdldF9jb2x1bW5zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRDb2x1bW4gPSB0YXJnZXRfY29sdW1uc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkQ2hpbGRyZW5fd2lkdGggPSB0aGlzLnRvV2hvbGVOdW1iZXIodGFyZ2V0Q29sdW1uLnN0eWxlLndpZHRoLnNsaWNlKDAsLTIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbENoaWxkcmVuX3dpZHRoID0gdGhpcy50b1dob2xlTnVtYmVyKG9yaWdpbmFsX2NvbHVtbldpZHRoc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYoaGVhZENoaWxkcmVuX3dpZHRoIDwgb3JpZ2luYWxDaGlsZHJlbl93aWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGFyZ2V0Q29sdW1uLCBcIndpZHRoXCIsIG9yaWdpbmFsX2NvbHVtbldpZHRoc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0X2NvbHVtbnMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxfY29sdW1uV2lkdGhzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0VGFibGVGb290ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRhYmxlLm5hdGl2ZUVsZW1lbnQsIFwidGFibGUtbGF5b3V0XCIsIHRoaXMudGFibGVMYXlvdXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhYmxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLnRhYmxlLm5hdGl2ZUVsZW1lbnQsIFwidmlzaWJpbGl0eVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAvL31cbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgbGlmZWN5Y2xlLiBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgICAgIHRoaXMuY2xlYW5VcENoaWxkTm9kZXModHJ1ZSk7XG4gICAgICAgIHRoaXMuY2xlYXJIZWFkZXJOb2Rlcyh0cnVlKTtcblxuICAgICAgICAvLzE3MjY6IEl0IGxvb2tzIGxpa2Ugc29waGlhIGFsc28gcXVlcnlpbmcgZm9yIHRhYmxlIGNvbHVtbiBkZWYgc28gd2UgbmVlZCB0byBzdG9yZSB0byBvdXIgcGFyZW50XG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLl9nZXROb25lQWN0aXZlVmlld1BhcmVudCgpIHx8IHRoaXMuZ2V0UGFyZW50VmlldygpO1xuXG4gICAgICAgIGlmICh2aWV3ICE9IG51bGwgJiYgdmlld1tcIl90YWJsZUNvbHVtbnNNYXBcIl0gIT0gbnVsbCkge1xuICAgICAgICAgIHZpZXdbXCJfdGFibGVDb2x1bW5zTWFwXCJdLmNsZWFyKCk7XG4gICAgICAgICAgdmlld1tcIl90YWJsZUNvbHVtbnNNYXBcIl0gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLl92aWV3Q2hpbGRyZW5NYXAgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX3ZpZXdDaGlsZHJlbk1hcC5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdmlld0NoaWxkcmVuTWFwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxTdWJjcmlwdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxTdWJjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzSnNvbiA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5zY3JvbGxTdWJqZWN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zY3JvbGxTdWJjcmlwdGlvbiA9IG51bGw7XG5cbiAgICAgICAgaWYodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAodGhpcy5tb3VzZVVwSGFuZGxlcikge1xuICAgICAgICAvLyAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRydWUpO1xuICAgICAgICAvLyAgICAgdGhpcy5tb3VzZVVwSGFuZGxlciA9IG51bGw7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBpZiAodGhpcy5rZXl1cEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMudGFibGUubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5rZXl1cEhhbmRsZXIsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy5rZXl1cEhhbmRsZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJGRyYWdhYmxlQ29sdW1ucyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRkcmFnYWJsZUNvbHVtbnMuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgKHRoaXMuY29sdW1uc0NoYW5nZVN1YnNjcmlwdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmNvbHVtbnNDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIHRoaXMuY29sdW1uc0NoYW5nZVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZURpZmZlciA9IG51bGw7XG4gICAgICAgIHRoaXMuY29sdW1uc0RpZmZlciA9IG51bGw7XG4gICAgICAgIHRoaXMuY3VzdG9tUm93RGlmZmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsRGF0YVNvdXJjZURpZmZlciA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzID0gbnVsbDtcbiAgICAgICAgdGhpcy50YWJsZUhlYWQgPSBudWxsO1xuICAgICAgICB0aGlzLnRhYmxlV3JhcHBlciA9IG51bGw7XG4gICAgICAgIHRoaXMudGFibGVDb250YWluZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnRhYmxlID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmVNb3VzZUV2ZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zY3JvbGxDb250YWluZXJTdHlsZXMgPSBudWxsO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdG8gc2VlIGlmIGNvbHVtbnMgaGF2ZSBjaGFuZ2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGVja0NvbHVtbnNGb3JDaGFuZ2VkKCkge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5zICE9IG51bGwgJiYgdGhpcy5jb2x1bW5zRGlmZmVyLmRpZmYodGhpcy5jb2x1bW5zLm1hcDxhbnk+KGl0ZW09PntcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmlzaWJsZTogaXRlbS52aXNpYmxlLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogaXRlbS5oZWFkZXIsXG4gICAgICAgICAgICAgICAgY29udHJvbFdpZHRoOiBpdGVtLmNvbnRyb2xXaWR0aCxcbiAgICAgICAgICAgICAgICBsb2NrZWQ6IGl0ZW0ubG9ja2VkLFxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGl0ZW0uZW5hYmxlZCxcbiAgICAgICAgICAgICAgICBzb3J0YWJsZTogaXRlbS5zb3J0YWJsZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBQSzogRE8gTk9UIFJFTU9WRURcbiAgICAgICAgICAgIC8vIENvbW1lbnQgdGhpcyBvdXQgZm9yIG5vdyBhbmQgcmV2ZXJ0IHRvIHByZXZpb3VzLCB3aWxsIGJyaW5nIHRoaXMgYmFja1xuICAgICAgICAgICAgLy8gd2hlbiB3ZSBhZGRlZCBhIGRpZmYgdG8gY2hlY2sgZm9yIGNoYW5nZXMgaW4gdnQtcm93XG4gICAgICAgICAgICAvLyByZXR1cm4gaXRlbS52aXNpYmxlICtcbiAgICAgICAgICAgIC8vICAgICBpdGVtLmhlYWRlciArXG4gICAgICAgICAgICAvLyAgICAgaXRlbS5jb250cm9sV2lkdGggK1xuICAgICAgICAgICAgLy8gICAgIGl0ZW0ubG9ja2VkICtcbiAgICAgICAgICAgIC8vICAgICBpdGVtLmVuYWJsZWQgK1xuICAgICAgICAgICAgLy8gICAgIGl0ZW0uc29ydGFibGU7XG4gICAgICAgIH0pKSl7XG4gICAgICAgICAgLy90aGlzLmNsZWFuVXBDaGlsZE5vZGVzKCk7XG4gICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB0aGlzLnJlY0NhbGNOb1ZpcnR1YWxSb3coKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHJpdmF0ZSBjaGVja0N1c3RvbVJvd3NGb3JDaGFuZ2VkKCkge1xuICAgICAgICBpZiAodGhpcy5fdGFibGVSb3cgIT0gbnVsbCAmJiB0aGlzLmN1c3RvbVJvd0RpZmZlci5kaWZmKHRoaXMuX3RhYmxlUm93IGFzIGFueSkpIHtcbiAgICAgICAgICB0aGlzLmNoZWNrU2hvd0JsYW5rUm93KCk7XG4gICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwcml2YXRlIGNsZWFySGVhZGVyTm9kZXMobnVsbE91dEhlYWROb2RlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgIGlmICh0aGlzLmhlYWROb2RlICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVhZE5vZGUuY2hpbGROb2RlcyAhPSBudWxsICYmIHRoaXMuaGVhZE5vZGUuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiB0aGlzLmhlYWROb2RlLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudFZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcblxuICAgICAgICAgICAgaWYgKHBhcmVudFZpZXcgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBwYXJlbnRWaWV3LnJlbW92ZVZpZXdDaGlsZEZyb21NYXAobm9kZS5nZXRJZCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oZWFkTm9kZS5jaGlsZE5vZGVzID0gW107XG4gICAgICB9XG5cbiAgICAgIGlmIChudWxsT3V0SGVhZE5vZGUgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5oZWFkTm9kZSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBDbGVhbiB1cCBvdXIgZmF1eCB0YWJsZSBjaGlsZHJlblxuICAgICAqL1xuICAgIHByaXZhdGUgY2xlYW5VcENoaWxkTm9kZXMoc2tpcFRyYWNraW5nVmlydHVhbFJvdzogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudFZpZXcgPSB0aGlzLmdldFBhcmVudFZpZXcoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiB0aGlzLm5vZGVzKSB7XG4gICAgICAgICAgICAgICAgLy9jYWNoZSBtb2RpZmllZCBkYXRhIGlmIHZpcnR1YWwgc2Nyb2xsXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBza2lwVHJhY2tpbmdWaXJ0dWFsUm93ICE9PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0TG9jYWxOYW1lKCkgPT09IFwicm93XCIgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93cyAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93c1tub2RlW1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdXSAhPSBudWxsXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrSW5pdE1vZGlmaWVkVmlydHVhbFJvd3NKc29uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93c0pzb25bbm9kZVtUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXV0gPSBub2RlLnRvSnNvbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vcmVtb3ZlZCBvdXJzZWxmIGZyb20gcGFyZW50IGNhY2hlXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudFZpZXcgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRWaWV3LnJlbW92ZVZpZXdDaGlsZEZyb21NYXAobm9kZS5nZXRJZCgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubm9kZXMgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93cyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcHJldlNlbGVjdGVkUm93cyA9IFtdO1xuICAgICAgICB0aGlzLmxhc3RTZWxlY3RlZFJvd0luZGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRhdGFzb3VyY2Ugcm93IGNvdW50XG4gICAgICogQHJldHVybnMgTnVtYmVyIG9mIHJvd3MgaW4gW1tkYXRhU291cmNlXV1cbiAgICAgKi9cbiAgICBnZXRSb3dDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZSA/IHRoaXMuX2RhdGFTb3VyY2UubGVuZ3RoIDogMDtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIEFkZC9yZW1vdmUgcm93IHRvIGxpc3Qgb2Ygc2VsZWN0ZWQgcm93c1xuICAgICAqIEBwYXJhbSByb3dcbiAgICAgKiBAcGFyYW0gaXNTZWxlY3RlZCBJZiB0cnVlLCByb3cgd2lsbCBiZSBhZGRlZCwgb3RoZXJ3aXNlIHJvdyB3aWxsIGJlIHJlbW92ZWQgZnJvbSBzZWxlY3RlZCByb3dzIGNvbGxlY3Rpb25cbiAgICAgKi9cbiAgICBzZWxlY3RSb3cocm93OiBIVE1MRWxlbWVudFdyYXBwZXIsIGlzU2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IHJvd0luZGV4ID0gLTE7XG5cbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgdGVtcE5vZGUgPSBfLmZpbmQodGhpcy5ub2RlcywgKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZSA9PT0gcm93O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0ZW1wTm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcm93SW5kZXggPSB0ZW1wTm9kZVtUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvd0luZGV4ID0gXy5maW5kSW5kZXgodGhpcy5ub2RlcywgKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZSA9PT0gcm93O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm93SW5kZXggPj0gMCAmJiByb3dJbmRleCA8IHRoaXMuX2RhdGFTb3VyY2UubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgaWR4ID0gXy5maW5kSW5kZXgodGhpcy5zZWxlY3RlZFJvd3MsIChyb3cpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93ID09PSByb3dJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIC8vaWYgaXQgd2Fzbid0IHNlbGVjdGVkLCBhZGQgaXQgaW4gc2VsZWN0ZWRSb3dzLlxuICAgICAgICAgICAgICAgIGlmIChpZHggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzLnB1c2gocm93SW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9pZiBpdCB3YXMgc2VsZWN0ZWQgYmVmb3JlLCByZW1vdmUgaXQgZnJvbSBzZWxlY3RlZFJvd3MuXG4gICAgICAgICAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlciBmb3IgY2xpY2sgb24gcm93XG4gICAgICogQHBhcmFtIGV2ZW50IE1vdXNlIGNsaWNrIGV2ZW50XG4gICAgICogQHBhcmFtIHJvd0luZGV4IEluZGV4IG9mIHRoZSByb3cgdGhhdCB3YXMgY2xpY2tlZFxuICAgICAqIEBldmVudCBvblN0YXRlQ2hhbmdlXG4gICAgICovXG4gICAgb25Sb3dDbGljayhldmVudDogTW91c2VFdmVudCwgcm93SW5kZXg6IG51bWJlcikge1xuICAgICAgICAvL2FkZCB0aGUgcm93IHRvIHZpZXcgY2hpbGRyZW4gbWFwIGZvciBsb29rdXBcbiAgICAgICAgY29uc3QgcGFyZW50VmlldyA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAocGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICAgICAgICBwYXJlbnRWaWV3LmFkZFZpZXdDaGlsZFRvTWFwKHRoaXMubm9kZXNbcm93SW5kZXhdKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNSb3dJbmRleCAhPSBudWxsICYmIHRoaXMubm9kZXNbdGhpcy5wcmV2aW91c1Jvd0luZGV4XSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Vmlldy5yZW1vdmVWaWV3Q2hpbGRGcm9tTWFwKHRoaXMubm9kZXNbdGhpcy5wcmV2aW91c1Jvd0luZGV4XS5nZXRJZCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJldmlvdXNSb3dJbmRleCA9IHJvd0luZGV4O1xuICAgICAgICB0aGlzLnRyaWdnZXJTdGF0ZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHJpdmF0ZSB0cmlnZ2VyU3RhdGVDaGFuZ2UoKSB7XG4gICAgICBjb25zdCBjbGllbnRFdmVudCA9IG5ldyBDbGllbnRFdmVudCh0aGlzLCBldmVudCk7XG5cbiAgICAgIGlmIChBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudCAhPSBudWxsKSB7XG4gICAgICAgIEFwcFV0aWxzLmN1c3RvbWl6ZUNsaWVudEV2ZW50KHRoaXMsIGNsaWVudEV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZ2V0UGFyZW50VmlldygpICE9IG51bGwpIHtcbiAgICAgICAgICBjbGllbnRFdmVudC5zZXRQYXJhbWV0ZXIoXCJzY3JlZW5JZFwiLCB0aGlzLmdldFBhcmVudFZpZXcoKS5nZXRJZCgpKTtcbiAgICAgIH1cblxuICAgICAgY2xpZW50RXZlbnQuc2V0UGFyYW1ldGVyKFwiaWRcIiwgdGhpcy5nZXRJZCgpKTtcblxuICAgICAgLy91c2VyIGNhbiBzZWxlY3RlZCBtb3JlIHRoYW4gb25lIHJvd1xuICAgICAgbGV0IHJvd0lkOiBzdHJpbmcgPSB0aGlzLnNlbGVjdGVkUm93cy5tYXAoaWR4PT50aGlzLmdldENoaWxkQnlPcmlnaW5hbFJvd0luZGV4KGlkeCkuZ2V0SWQoKSkuam9pbihcIixcIik7XG5cbiAgICAgIGNsaWVudEV2ZW50LnNldFBhcmFtZXRlcihcInJvd0lkXCIsIHJvd0lkKTtcblxuICAgICAgdGhpcy5nZXRTZXNzaW9uKCkuZ2V0RXZlbnRIYW5kbGVyKCkuc2V0Q2xpZW50RXZlbnQoY2xpZW50RXZlbnQpO1xuICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlLmVtaXQoKTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHByaXZhdGUgZ2V0Q2hpbGRCeU9yaWdpbmFsUm93SW5kZXgoaW5kZXg6IG51bWJlcik6IEhUTUxFbGVtZW50V3JhcHBlciB7XG4gICAgICAgIGxldCBub2RlOiBIVE1MRWxlbWVudFdyYXBwZXIgPSB0aGlzLm5vZGVzW2luZGV4XTtcblxuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBub2RlID0gXy5maW5kKHRoaXMubm9kZXMsIChlbDogSFRNTEVsZW1lbnRXcmFwcGVyKT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBlbFtUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXSA9PT0gaW5kZXg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIGhhbmRsZU1vdXNlVXAoZXZlbnQ6IE1vdXNlRXZlbnQsIHJvd0luZGV4OiBudW1iZXIsIHJvdzogYW55KSB7XG4gICAgICAvL2ZvciBkcmFnZ2FsZSByb3dzLCB3ZSBuZWVkIHRvIGRvdWJsZSBjaGVjayByb3cgc2VsZWN0aW9uIGFnYWluXG4gICAgICBpZiAodGhpcy5kcmFnZ2FibGVSb3dzID09PSB0cnVlICYmIHRoaXMuc2hvdWxkSGFuZGxlTW91c2VVcCA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnRvZ2dsZVJvd1NlbGVjdGlvbihldmVudCwgcm93SW5kZXgsIHJvdywgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2hvdWxkSGFuZGxlTW91c2VVcCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogU2V0IHJvdyBhcyBzZWxlY3RlZC91bnNlbGVjdGVkXG4gICAgICogQHBhcmFtIHJvd0luZGV4IEluZGV4IG9mIHJvdyB0byB0b2dnbGUgb24vb2ZmXG4gICAgICovXG4gICAgdG9nZ2xlUm93U2VsZWN0aW9uKGV2ZW50OiBNb3VzZUV2ZW50LCByb3dJbmRleDogbnVtYmVyLCByb3c6IGFueSwgaXNNb3VzZVVwOiBib29sZWFuID0gZmFsc2UpIHtcblxuICAgICAgICBjb25zdCB0YXJnZXRFbCA9IDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQ7XG5cbiAgICAgICAgaWYgKHRhcmdldEVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAnaW5wdXQnICYmIHRhcmdldEVsLmdldEF0dHJpYnV0ZSgndHlwZScpICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXRFbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKS50b0xvd2VyQ2FzZSgpID09ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGFyZ2V0RWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09ICdidXR0b24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWN0dWFsUm93SW5kZXggPSByb3dJbmRleDtcblxuICAgICAgICAvL3ByZXZlbnQgdGV4dCBzZWxlY3Rpb24gd2hlbiBzaGlmdEtleSBpcyBwcmVzc2VkXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSA9PT0gdHJ1ZSAmJiBldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgIT09IFwibm9uZVwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlICYmIHJvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGFjdHVhbFJvd0luZGV4ID0gcm93W1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2lmIHVzZXIgaXMgbm90IHByZXNzaW5nIHNoaWZ0IGtleSwgY2xlYXIgYWxsIHByZXZpb3VzIHNlbGVjdGlvblxuICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICE9PSB0cnVlICYmIGV2ZW50LmN0cmxLZXkgIT09IHRydWUgJiYgZXZlbnQuYnV0dG9ucyAhPT0gMikge1xuICAgICAgICAgICAgICBsZXQgY2xlYXJTZWxlY3Rpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnYWJsZVJvd3MgPT09IHRydWUgJiYgaXNNb3VzZVVwICE9PSB0cnVlICYmIHRoaXMuc2VsZWN0ZWRSb3dzLmluZGV4T2YoYWN0dWFsUm93SW5kZXgpID49IDApIHtcbiAgICAgICAgICAgICAgICBjbGVhclNlbGVjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdWxkSGFuZGxlTW91c2VVcCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoY2xlYXJTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93cy5zcGxpY2UoMCwgdGhpcy5zZWxlY3RlZFJvd3MubGVuZ3RoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaWR4ID0gXy5maW5kSW5kZXgodGhpcy5zZWxlY3RlZFJvd3MsIChyb3cpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93ID09PSBhY3R1YWxSb3dJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoaWR4IDwgMCkge1xuICAgICAgICAgICAgICAgIC8vaWYgbXVsdGkgcm93IGFuZCB1c2VyIGlzIHByZXNzaW5nIHNoaWZ0L2N0cmwga2V5LCBhbGxvdyBtdWx0aSByb3cgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gXCJtdWx0aVJvd1wiICYmIChldmVudC5zaGlmdEtleSB8fCBldmVudC5jdHJsS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY3RybEtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvd3MucHVzaChhY3R1YWxSb3dJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3RTZWxlY3RlZFJvd0luZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXN0U2VsZWN0ZWRSb3dJbmRleCA+IHJvd0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSByb3dJbmRleDsgaSA8IHRoaXMubGFzdFNlbGVjdGVkUm93SW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvd3MucHVzaCh0aGlzLmdldE9yaWdpbmFsSW5kZXgoaSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmxhc3RTZWxlY3RlZFJvd0luZGV4IDwgcm93SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMubGFzdFNlbGVjdGVkUm93SW5kZXggKyAxOyBpIDw9IHJvd0luZGV4OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzLnB1c2godGhpcy5nZXRPcmlnaW5hbEluZGV4KGkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzLnB1c2goYWN0dWFsUm93SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvd3MucHVzaChhY3R1YWxSb3dJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93cyA9IFthY3R1YWxSb3dJbmRleF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5jdHJsS2V5ID09PSB0cnVlICYmIGlkeCA+PSAwICYmIGV2ZW50LmJ1dHRvbnMgIT09IDIpIHtcbiAgICAgICAgICAgICAgICAvL2lmIGNvbnRyb2wga2V5IGlzIHByZXNzZWQgKGFuZCBub3QgcmlnaHQgY2xpY2spLCByZW1vdmUgdGhlIHNlbGVjdGVkIHJvd1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIHRoaXMubGFzdFNlbGVjdGVkUm93SW5kZXggPSByb3dJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlclN0YXRlQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJuIHRoZSBhY3R1YWwgaW5kZXhlcyBiYXNlIG9uIGRhdGFzb3VyY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0T3JpZ2luYWxJbmRleChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSAmJiB0aGlzLm5vZGVzW2luZGV4XSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2Rlc1tpbmRleF1bVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IFtbZGlzYWJsZWRdXSBwcm9wZXJ0eSB2YWx1ZVxuICAgICAqIEBwYXJhbSBib28gVG9nZ2xlIFtbZGlzYWJsZWRdXVxuICAgICAqL1xuICAgIHNldERpc2FibGVkKGJvbzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gYm9vO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBbW2Rpc2FibGVkXV0gcHJvcGVydHkgdmFsdWVcbiAgICAgKi9cbiAgICBnZXREaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBHZXQgYSBjb2xsZWN0aW9uIG9mIGFsbCByb3cgZWxlbWVudHMgdGhhdCBhcmUgc2VsZWN0ZWRcbiAgICAgKiBAcmV0dXJucyBUaGUgc2VsZWN0ZWQgcm93c1xuICAgICAqL1xuICAgIGdldFNlbGVjdGVkUm93cygpOiBBcnJheTxIVE1MRWxlbWVudFdyYXBwZXI+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRSb3dFbGVtZW50czogQXJyYXk8SFRNTEVsZW1lbnRXcmFwcGVyPiA9IFtdO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFJvd3MubGVuZ3RoID4gMCAmJiB0aGlzLm5vZGVzICE9IG51bGwgJiYgdGhpcy5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCByb3dJbmRleCBvZiB0aGlzLnNlbGVjdGVkUm93cykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG5vZGUgb2YgdGhpcy5ub2Rlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5nZXRMb2NhbE5hbWUoKSA9PT0gXCJyb3dcIiAmJiBub2RlLnJvd051bWJlciA9PT0gcm93SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkUm93RWxlbWVudHMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkUm93RWxlbWVudHM7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBHZXQgY29sbGVjdGlvbiBvZiBzZWxlY3RlZCByb3cgaW5kZXhlc1xuICAgICAqL1xuICAgIGdldFNlbGVjdGVkUm93SW5kZXhlcygpOiBBcnJheTxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRSb3dzLm1hcChyb3cgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJvd1t0aGlzLlJPV19JTkRFWF9LRVldO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciByb3cgc2VsZWN0IGV2ZW50XG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgaGFuZGxlUm93U2VsZWN0aW9uKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgaWYgKCFfLmlzRXF1YWwoZXZlbnQuc2VsZWN0ZWQsIHRoaXMuX3ByZXZTZWxlY3RlZFJvd3MpKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQobmV3IFRhYmxlU2VsZWN0aW9uRXZlbnQoZXZlbnQuc2VsZWN0ZWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3ByZXZTZWxlY3RlZFJvd3MgPSBldmVudC5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBkb3VibGUgY2xpY2sgb24gY2VsbFxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqIEBldmVudCBvbkRvdWJsZUNsaWNrXG4gICAgICovXG4gICAgaGFuZGxlQ2VsbEFjdGl2YXRpb24oZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2RibGNsaWNrJykge1xuICAgICAgICAgICAgdGhpcy5vbkRvdWJsZUNsaWNrLmVtaXQobmV3IFRhYmxlU2VsZWN0aW9uRXZlbnQoZXZlbnQucm93KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2ludGVybmFsXG4gICAgYXBwZW5kUm93SW5kZXhUb1Jvdyhyb3c6IGFueSwgcm93SW5kZXg6IG51bWJlcikge1xuICAgICAgICByb3dbdGhpcy5ST1dfSU5ERVhfS0VZXSA9IHJvd0luZGV4O1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSAqL1xuICAgIC8qKlxuICAgICAqIFRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBhbmQgcmUtcmVuZGVyIHRoZSB0YWJsZVxuICAgICAqIEBwYXJhbSBjbGVhckRhdGEgU2V0IHRvIHRydWUgdG8gZW1wdHkgdGFibGUgZGF0YVxuICAgICAqL1xuICAgIHJlZnJlc2goY2xlYXJEYXRhOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGNsZWFyRGF0YSA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIEdldCBbW2NoYW5nZURldGVjdG9yUmVmXV0gcHJvcGVydHlcbiAgICAgKiBAcmV0dXJuIHRoZSBDaGFuZ2VEZXRlY3RvclxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRDaGFuZ2VEZXRlY3RvcigpOiBDaGFuZ2VEZXRlY3RvclJlZiB7XG4gICAgICByZXR1cm4gdGhpcy5jaGFuZ2VEZXRlY3RvclJlZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgTmV4YVdlYiB0YWcgbmFtZVxuICAgICAqIEByZXR1cm5zIFRhZyBuYW1lXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldE54VGFnTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwidGFibGVcIjtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIENvbnZlciB0aGUgY29udGVudCBvZiB0aGlzIHNjcmVlbnMgdG8gSlNPTiBvYmplY3Qgc28gaXQgY2FuIGJlIHNlbnQgdG8gdGhlIHNlcnZlci5cbiAgICAgKi9cbiAgICB0b0pzb24oKToge30ge1xuICAgICAgICBjb25zdCBqc29uOiBhbnkgPSBzdXBlci50b0pzb24oKTtcblxuICAgICAgICAvLyBpZiAodGhpcy5nZXRTZWxlY3RlZFJvd3MoKSAhPSBudWxsICYmIHRoaXMuZ2V0U2VsZWN0ZWRSb3dzKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyAgICAgdGhpcy5zZXRKc29uKGpzb24sIFwic2VsZWN0ZWRSb3dzXCIsIHRoaXMuZ2V0U2VsZWN0ZWRSb3dzKCkubWFwKGl0ZW09Pml0ZW0udG9Kc29uKCkpKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMubm9kZXMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgdGhpcy5ub2Rlcy5sZW5ndGggPiAwXG4gICAgICAgICkge1xuICAgICAgICAgICAgLy92aXJ0dWFsIHNjcm9sbCAodHJhY2sgd2hpY2ggcm93cyB3ZSBhbHJlYWR5IGNvbnZlcnRlZClcbiAgICAgICAgICAgIGxldCB0ZW1wUm93czoge1tuYW1lOiBzdHJpbmddOiBhbnl9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0ZW1wUm93cyA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBqc29uW1wicm93c1wiXSA9IHRoaXMubm9kZXMubWFwKChub2RlLCBpbmRleCk9PntcbiAgICAgICAgICAgICAgICBjb25zdCByb3dKc29uID0gbm9kZS50b0pzb24oKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUm93cyAhPSBudWxsICYmIHRoaXMuc2VsZWN0ZWRSb3dzLmluZGV4T2YoaW5kZXgpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcm93SnNvbltcInNlbGVjdGVkXCJdID0gXCJ0cnVlXCI7XG4gICAgICAgICAgICAgICAgICAgIHJvd0pzb25bXCJpbmRleFwiXSA9IGluZGV4ICsgXCJcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBSb3dzW25vZGVbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF1dID0gbm9kZVtUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcm93SnNvbjtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL3ZpcnR1YWwgc2Nyb2xsIGRhdGFcbiAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUgJiYgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzSnNvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5cyA9IF8ua2V5cyh0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3NKc29uKTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9tYWtlIHN1cmUgd2Ugbm90IGFscmVhZHkgY29udmVydGVkIHRoZW1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBSb3dzW2tleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAganNvbltcInJvd3NcIl0ucHVzaCh0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3NKc29uW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29sdW1ucyAhPSBudWxsICYmIHRoaXMuY29sdW1ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgY29sdW1ucyA9IHRoaXMuY29sdW1ucztcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLmdldExvY2FsTmFtZSgpID09PSBcInRhYmxlXCIgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbnNIYXNCZWVuU3dhcHBlZCA9PT0gdHJ1ZVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29sdW1ucyA9IF8ub3JkZXJCeShjb2x1bW5zLCAoY2hpbGQ6IFRhYmxlQ29sdW1uRGlyZWN0aXZlKT0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZC5vcmlnaW5hbENvbHVtbkluZGV4O1xuICAgICAgICAgICAgICAgIH0pIGFzIGFueTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAganNvbltcImNvbHVtbkRlZnNcIl0gPSBjb2x1bW5zLm1hcCgoY29sdW1uLCBpbmRleCk9PntcbiAgICAgICAgICAgICAgICBjb25zdCBkZWYgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOiB0aGlzLnRvSnNvblZhbHVlKGNvbHVtbi52aXNpYmxlKSxcbiAgICAgICAgICAgICAgICAgICAgXCJsb2NrZWRcIjogdGhpcy50b0pzb25WYWx1ZShjb2x1bW4ubG9ja2VkKSxcbiAgICAgICAgICAgICAgICAgICAgXCJlbmFibGVkXCI6IHRoaXMudG9Kc29uVmFsdWUoY29sdW1uLmVuYWJsZWQpLFxuICAgICAgICAgICAgICAgICAgICBcInNvcnRhYmxlXCI6IHRoaXMudG9Kc29uVmFsdWUoY29sdW1uLnNvcnRhYmxlKSxcbiAgICAgICAgICAgICAgICAgICAgXCJpc0NoZWNrZWRcIjogdGhpcy50b0pzb25WYWx1ZShjb2x1bW4uaXNDaGVja2VkKSxcbiAgICAgICAgICAgICAgICAgICAgXCJjdXN0b21BdHRyaWJ1dGVzXCI6IEJhc2VDb21wb25lbnQubWFwVG9Kc29uKGNvbHVtbi5jdXN0b21BdHRyaWJ1dGVzKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgY3VzdG9tQXR0cmlidXRlcyBoYXMgJ3dpZHRoJyBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgIGlmIChkZWZbXCJjdXN0b21BdHRyaWJ1dGVzXCJdW1wid2lkdGhcIl0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmhlYWROb2RlLmdldENoaWxkQXQoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMudG9XaG9sZU51bWJlcihub2RlLmh0bWxFbGVtZW50LnN0eWxlLndpZHRoLnNsaWNlKDAsLTIpKTsvL3NlcnZlciBleHBlY3Qgd2hvbGUgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIGRlZltcImN1c3RvbUF0dHJpYnV0ZXNcIl1bXCJ3aWR0aFwiXSA9IHRoaXMudG9Kc29uVmFsdWUod2lkdGgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW4uaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmW1wiaWRcIl0gPSB0aGlzLnRvSnNvblZhbHVlKGNvbHVtbi5pZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmW1wiaWRcIl0gPSBCYXNlQ29tcG9uZW50LmdlbmVyYXRlVW5pcXVlSWQoXCJjb2x1bW5cIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbi5sb2NrZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmW1widGFnTmFtZVwiXSA9IFwibG9ja2VkQ29sdW1uXCI7XG4gICAgICAgICAgICAgICAgICAgIGRlZltcIm54VGFnTmFtZVwiXSA9IFwibG9ja2VkQ29sdW1uXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmW1widGFnTmFtZVwiXSA9IFwiY29sdW1uXCI7XG4gICAgICAgICAgICAgICAgICAgIGRlZltcIm54VGFnTmFtZVwiXSA9IFwiY29sdW1uXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9oZWFkZXIgdGFnIG9mIGNvbHVtblxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0ge1xuICAgICAgICAgICAgICAgICAgICBcInRhZ05hbWVcIjogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJueFRhZ05hbWVcIjogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCI6IHRoaXMudG9Kc29uVmFsdWUoY29sdW1uLmhlYWRlcilcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbi5oZWFkZXJEaXJlY3RpdmUgJiYgY29sdW1uLmhlYWRlckRpcmVjdGl2ZS5pZCkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJbXCJpZFwiXSA9IHRoaXMudG9Kc29uVmFsdWUoY29sdW1uLmhlYWRlckRpcmVjdGl2ZS5pZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyW1wiaWRcIl0gPSBCYXNlQ29tcG9uZW50LmdlbmVyYXRlVW5pcXVlSWQoXCJoZWFkZXJcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGVmW1wiY2hpbGRyZW5cIl0gPSBbaGVhZGVyXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkZWY7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBqc29uO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogQ29udmVydCBjaGlsZCB0byBKU09OXG4gICAgICogQHBhcmFtIGNoaWxkIGNoaWxkIHRvIGJlIGNvbnZlcnRlZCB0byBKU09OXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNoaWxkVG9Kc29uKGNoaWxkOiBCYXNlQ29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBjaGlsZC5nZXRUYWdOYW1lKCkgPT09IFwiaGVhZHJvd1wiIHx8IGNoaWxkLmdldFRhZ05hbWUoKSA9PT0gXCJoZWFkY2VsbFwiID8gY2hpbGQudG9Kc29uKCkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogQWRkIGVsZW1lbnQgdG8gaW50ZXJuYWwgbGlzdCBvZiByb3csIGNlbGwsIG9yIGhlYWRlciBjZWxsXG4gICAgICogQHBhcmFtIHR5cGUgJ3JvdycgfCAnY2VsbCcgfCAnaGVhZGNlbGwnXG4gICAgICogQHBhcmFtIGV2ZW50IENyZWF0ZSBldmVudFxuICAgICAqIEBwYXJhbSByb3dPckNvbHVtbkluZGV4XG4gICAgICogQHBhcmFtIHJvd0RhdGFPckNvbHVtbkRlZlxuICAgICAqL1xuICAgIHJlZ2lzdGVyRmF1eEVsZW1lbnQodHlwZTogc3RyaW5nLCBldmVudDogT25DcmVhdGVFdmVudCwgcm93T3JDb2x1bW5JbmRleDogbnVtYmVyLCByb3dEYXRhT3JDb2x1bW5EZWY6IGFueSkge1xuICAgICAgICB0aGlzLl9pc0hlYWRlckNlbGwgPSBmYWxzZTtcblxuICAgICAgICBpZiAocm93RGF0YU9yQ29sdW1uRGVmID09PSBudWxsIHx8XG4gICAgICAgICAgICAocm93RGF0YU9yQ29sdW1uRGVmICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICByb3dEYXRhT3JDb2x1bW5EZWYgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICByb3dEYXRhT3JDb2x1bW5EZWYuc2tpcFRyYWNraW5nICE9PSB0cnVlKSkge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwicm93XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNrUm93KGV2ZW50LCByb3dPckNvbHVtbkluZGV4LCByb3dEYXRhT3JDb2x1bW5EZWYpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcImNlbGxcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhY2tDZWxsKGV2ZW50LCByb3dPckNvbHVtbkluZGV4LCByb3dEYXRhT3JDb2x1bW5EZWYpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcImhlYWRjZWxsXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0hlYWRlckNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudHJhY2tIZWFkQ2VsbChldmVudCwgcm93RGF0YU9yQ29sdW1uRGVmKTtcblxuICAgICAgICAgICAgICAgIGlmIChyb3dPckNvbHVtbkluZGV4ID09PSB0aGlzLmNvbHVtbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGx1Z2lucygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBbW25vZGVzXV0gcHJvcGVydHlcbiAgICAgKiBAcmV0dXJucyBOb2RlIGxpc3RcbiAgICAgKi9cbiAgICBnZXRUYWJsZUNoaWxkcmVuKCk6IEFycmF5PEhUTUxFbGVtZW50V3JhcHBlcj4ge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG51bWJlciBvZiBub2Rlc1xuICAgICAqIEByZXR1cm5zIE51bWJlciBvZiBub2Rlc1xuICAgICAqL1xuICAgIGdldENoaWxkQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMgIT0gbnVsbCA/IHRoaXMubm9kZXMubGVuZ3RoIDogMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGNoaWxkcmVuIG9mIHRoaXMgdGFibGVcbiAgICAgKiBAcmV0dXJuIExpc3Qgb2YgY2hpbGRyZW5cbiAgICAgKi9cbiAgICBnZXRDaGlsZHJlbigpOiBWZWN0b3I8YW55PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuOiBWZWN0b3I8SFRNTEVsZW1lbnRXcmFwcGVyPiA9IG5ldyBWZWN0b3I8SFRNTEVsZW1lbnRXcmFwcGVyPigpO1xuXG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLmdldFRhYmxlQ2hpbGRyZW4oKSwgKGNoaWxkKT0+Y2hpbGRyZW4uYWRkKGNoaWxkKSk7XG5cbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHhwYXRoRXhwcmVzc2lvbiBHZXQgcXVlcnkgcmVzdWx0IGZyb20gYW4geHBhdGggZXhwcmVzc2lvbiBzdHJpbmdcbiAgICAgKi9cbiAgICBldmFsdWF0ZVhQYXRoKHhwYXRoRXhwcmVzc2lvbjogc3RyaW5nKTogYW55IHtcbiAgICAgIGNvbnN0IHJlc3VsdDogVmVjdG9yPGFueT4gPSBuZXcgVmVjdG9yPGFueT4oKTtcbiAgICAgIGNvbnN0IHhwYXRoUmVzdWx0OiBYUGF0aFJlc3VsdCA9IGRvY3VtZW50LmV2YWx1YXRlKHhwYXRoRXhwcmVzc2lvbi5yZXBsYWNlKFwiY2VsbFtcIiwgXCJ0ZFtcIikucmVwbGFjZShcInJvd1tcIiwgXCJ0cltcIiksIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBudWxsLCBYUGF0aFJlc3VsdC5BTllfVFlQRSwgbnVsbCk7XG5cbiAgICAgIGlmICh4cGF0aFJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgIGxldCBub2RlOiBOb2RlID0geHBhdGhSZXN1bHQuaXRlcmF0ZU5leHQoKTtcblxuICAgICAgICB3aGlsZShub2RlKSB7XG4gICAgICAgICAgcmVzdWx0LmFkZChub2RlKTtcbiAgICAgICAgICBub2RlID0geHBhdGhSZXN1bHQuaXRlcmF0ZU5leHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoaWxkT3JBcnJheU9yU3RyaW5nV3RmXG4gICAgICogQHBhcmFtIHJvd051bWJlclxuICAgICAqL1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgYXBwZW5kQ2hpbGQoY2hpbGRPckFycmF5T3JTdHJpbmdXdGY6IGFueSwgcm93TnVtYmVyOiBudW1iZXIgPSAtMSkge1xuICAgICAgICAvL1RPRE8gbmVlZCB0byBhcHBlbmQgY2hpbGQgdG8gY2VydGFpbiByb3c/IGRwZW5kaW5nIG9uIGNoaWxkT3JBcnJheU9yU3RyaW5nV3RmXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIHJvdyBoYXMgYmVlbiBzZWxlY3RlZFxuICAgICAqIEBwYXJhbSByb3dJbmRleCBJbmRleCBvZiByb3cgdG8gY2hlY2tcbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHJvdyBpcyBhIHNlbGVjdGVkIHJvd1xuICAgICAqL1xuICAgIGlzU2VsZWN0ZWRSb3cocm93SW5kZXg6IG51bWJlciwgcm93OiBhbnkpIHtcbiAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUgJiYgcm93W1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdICE9IG51bGwpIHtcbiAgICAgICAgcm93SW5kZXggPSByb3dbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkUm93cyAhPSBudWxsICYmIHRoaXMuc2VsZWN0ZWRSb3dzLmluZGV4T2Yocm93SW5kZXgpID49IDA7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBHZXQgY3VzdG9tIGF0dHJpYnV0ZXMgb2Ygcm93IGlmIGl0IGhhcyBhbnksIG90aGVyd2lzZSByZXR1cm4gbnVsbFxuICAgICAqIEBwYXJhbSByb3dcbiAgICAgKiBAcGFyYW0gcm93T3JDb2x1bW5JbmRleFxuICAgICAqL1xuICAgIGdldFJvd0N1c3RvbUF0dHJpYnV0ZXMocm93OiBhbnksIHJvd09yQ29sdW1uSW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMucm93Q3VzdG9tQXR0cmlidXRlQnVpbGRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb3dDdXN0b21BdHRyaWJ1dGVCdWlsZGVyKHJvdywgcm93T3JDb2x1bW5JbmRleCwgKHRoaXMuX2dldE5vbmVBY3RpdmVWaWV3UGFyZW50KCkgfHwgdGhpcy5nZXRQYXJlbnRWaWV3KCkpIGFzIFZpZXdDb21wb25lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvdyAhPSBudWxsICYmIHJvdy5jdXN0b21BdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gcm93LmN1c3RvbUF0dHJpYnV0ZXM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBjb2x1bW4gaXMgdmlzaWJsZS4gRWl0aGVyIGJ5IGluZGV4IG9yIGNvbHVtblxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqIEBwYXJhbSBjb2x1bW5cbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIGNvbHVtbiBpcyB2aXNpYmxlXG4gICAgICovXG4gICAgaXNDb2x1bW5WaXNpYmxlKGluZGV4OiBudW1iZXIsIGNvbHVtbjogVGFibGVDb2x1bW5EaXJlY3RpdmUgPSBudWxsKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChjb2x1bW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbHVtbi52aXNpYmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1ucy5maW5kKChpdGVtLCBpZHgpPT5pZHggPT09IGluZGV4KS52aXNpYmxlO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogQWRkIGEgY2hpbGQgY29tcG9uZW50IHRvIHRoZSB0YWJsZVxuICAgICAqIEBwYXJhbSBjaGlsZCBDb21wb25lbnQgdG8gYWRkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFkZENoaWxkKGNoaWxkOiBCYXNlQ29tcG9uZW50KSB7XG4gICAgICAgIHN1cGVyLmFkZENoaWxkKGNoaWxkKTtcbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5ub2Rlc1t0aGlzLm5vZGVzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc0hlYWRlckNlbGwgIT09IHRydWUgJiYgcm93KSB7XG4gICAgICAgICAgICBjaGlsZC50YWJsZVJvd05vID0gcm93LnJvd051bWJlcjtcbiAgICAgICAgICAgIHJvdy5wYXJlbnRUYWJsZUlkID0gdGhpcy5pZDtcbiAgICAgICAgICAgIHJvdy5wYXJlbnRUYWJsZSA9IHRoaXM7XG4gICAgICAgICAgICAvL3doZW4gd2UgZ2V0IGhlcmUgcm93LmNoaWxkTm9kZXNbY3VycmVudExlbmd0aF0gc2hvdWxkIGJlIHRoZSBjZWxsIHBhcmVudCByb3dcbiAgICAgICAgICAgIC8vYXBwZW5kIGNoaWxkIGNvbXBvbmVudCB0byBjZWxsIChmb3IgZHluYW1pYylcbiAgICAgICAgICAgIGlmIChyb3cuY2hpbGROb2Rlc1tyb3cuY2hpbGROb2Rlcy5sZW5ndGggLSAxXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlRhYmxlQ29tcG9uZW50OiBVbmFibGUgdG8gcmVnaXN0ZXIgZWxlbWVudCB0byBjZWxsIG9mIGN1cnJlbnQgcm93IChjZWxsIGlzIG51bGwpXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoXCJpc0xvY2tlZENvbHVtblwiLCByb3cuY2hpbGROb2Rlc1tyb3cuY2hpbGROb2Rlcy5sZW5ndGggLSAxXS5nZXRBdHRyaWJ1dGUoXCJpc0xvY2tlZENvbHVtblwiLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgcm93LmNoaWxkTm9kZXNbcm93LmNoaWxkTm9kZXMubGVuZ3RoIC0gMV0uc2V0Q29tcG9uZW50KGNoaWxkLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIC8vc29waGlhICMxNzI4OiByZXN0cmljdGVkIHJpZ2h0IGNsaWNrXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVzdHJpY3RDZWxsUG9wdXAgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgIGNoaWxkLnNraXBFbWl0Q29udGV4dE1lbnVFdmVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgY29uc3Qgc29ydFZhbHVlID0gY2hpbGQuZ2V0QXR0cmlidXRlKFwic29ydFZhbHVlXCIsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoc29ydFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShyb3cuY2hpbGROb2Rlc1tyb3cuY2hpbGROb2Rlcy5sZW5ndGggLSAxXS5odG1sRWxlbWVudCwgXCJkYXRhLXRleHRcIiwgc29ydFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL3RyYWNrIGNoYW5nZSBpZiB2aXJ0dWFsIHNjcm9sbFxuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkIGluc3RhbmNlb2YgQ2hlY2tib3hDb21wb25lbnQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkIGluc3RhbmNlb2YgUmFkaW9CdXR0b25Db21wb25lbnQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkIGluc3RhbmNlb2YgVGV4dEZpZWxkQ29tcG9uZW50IHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCBpbnN0YW5jZW9mIENvbWJvQm94Q29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uSWR4ID0gcm93LmNoaWxkTm9kZXMubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgICAgICAgICAvL2hhcyBjYWNoZWQgZGF0YT9cbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93cyAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzW3Jvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXV0gIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93c1tyb3dbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF1dW3Jvdy5jaGlsZE5vZGVzW2NvbHVtbklkeF1bXCJvcmlnaW5hbENvbHVtbkluZGV4XCJdXSAhPSBudWxsXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93c1tyb3dbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF1dW3Jvdy5jaGlsZE5vZGVzW2NvbHVtbklkeF1bXCJvcmlnaW5hbENvbHVtbkluZGV4XCJdXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXAudGV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoaWxkIGFzIGFueSkuc2V0VGV4dCh0ZW1wLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2hpbGQgYXMgYW55KS5zZXRDaGVja2VkKHRlbXAuY2hlY2tlZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5faW50ZXJuYWxDaGFuZ2VDYiA9IChjb21wKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tJbml0TW9kaWZpZWRWaXJ0dWFsUm93cygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzW3Jvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93c1tyb3dbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF1dID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93c1tyb3dbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF1dW3Jvdy5jaGlsZE5vZGVzW2NvbHVtbklkeF1bXCJvcmlnaW5hbENvbHVtbkluZGV4XCJdXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBjb21wLmdldFRleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBjb21wLmdldENoZWNrZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuaGVhZE5vZGUgIT0gbnVsbCl7XG4gICAgICAgICAgLy9za2lwIGVtaXRpbmcgZXZlbnQgc28gd2UgY2FuIGVtaXQgb3Vyc2VsZi5cbiAgICAgICAgICBjaGlsZC5za2lwRW1pdENvbnRleHRNZW51RXZlbnQgPSB0cnVlO1xuICAgICAgICAgIGNoaWxkLnRhYmxlUm93Tm8gPSAtMTtcbiAgICAgICAgICB0aGlzLmhlYWROb2RlLnBhcmVudFRhYmxlSWQgPSB0aGlzLmlkO1xuICAgICAgICAgIHRoaXMuaGVhZE5vZGUucGFyZW50VGFibGUgPSB0aGlzO1xuICAgICAgICAgIHRoaXMuaGVhZE5vZGUuY2hpbGROb2Rlc1t0aGlzLmhlYWROb2RlLmNoaWxkTm9kZXMubGVuZ3RoIC0gMV0uc2V0Q29tcG9uZW50KGNoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICog6YG45oqe5Lit44Gu6KGM44KS5YmK6Zmk44GZ44KLXG4gICAgICovXG4gICAgcmVtb3ZlU2VsZWN0ZWRSb3coKXtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRSb3dzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgLy8g6YG45oqe6KGM44KS6ZmN6aCG44Gn5Lim44Gz5pu/44GI44KLXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgOkFycmF5PG51bWJlcj4gPSB0aGlzLnNlbGVjdGVkUm93cy5jb25jYXQoKS5zb3J0KGZ1bmN0aW9uKHYxLHYyKXtyZXR1cm4gdjItdjE7fSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpZHggb2Ygc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgOiBIVE1MRWxlbWVudFdyYXBwZXIgPSB0aGlzLm5vZGVzW2lkeF07XG4gICAgICAgICAgICAgICAgZm9yKGxldCB0YXJnZXQgb2YgY2hpbGQuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRhcmdldC5nZXRDb21wb25lbnQoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByb3dOdW1iZXIgOm51bWJlciA9IDA7XG4gICAgICAgICAgICBmb3IobGV0IHJvdyBvZiB0aGlzLm5vZGVzKXtcbiAgICAgICAgICAgICAgICByb3cucm93TnVtYmVyID0gcm93TnVtYmVyKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93cyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhpcyBpcyBhIGNvbnRhaW5lciBjb21wb25lbnRcbiAgICAgKiBAcmV0dXJucyBUcnVlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGlzQ29udGFpbmVyKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBBZGQgcm93IHRvIGxpc3Qgb2Ygbm9kZXNcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcGFyYW0gcm93T3JDb2x1bW5JbmRleFxuICAgICAqIEBwYXJhbSByb3dEYXRhXG4gICAgICovXG4gICAgcHJpdmF0ZSB0cmFja1JvdyhldmVudDogT25DcmVhdGVFdmVudCwgcm93T3JDb2x1bW5JbmRleDogbnVtYmVyLCByb3dEYXRhOiBhbnkpIHtcbiAgICAgICAgY29uc3Qgcm93ID0gbmV3IEhUTUxFbGVtZW50V3JhcHBlcih0aGlzLnJlbmRlcmVyLCBcIlwiLCB0aGlzLmdldFNlc3Npb24oKSk7XG4gICAgICAgIHJvdy5yb3dOdW1iZXIgPSByb3dPckNvbHVtbkluZGV4O1xuICAgICAgICByb3cuaHRtbEVsZW1lbnQgPSBldmVudC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc2V0UGFyZW50U2NyZWVuSWQocm93KTtcbiAgICAgICAgcm93LnNldExvY2FsZU5hbWUoXCJyb3dcIik7XG5cbiAgICAgICAgY29uc3QgY3VzdG9tQXR0cmlidXRlcyA9IHRoaXMuZ2V0Um93Q3VzdG9tQXR0cmlidXRlcyhyb3dEYXRhLCByb3dPckNvbHVtbkluZGV4KTtcblxuICAgICAgICBpZiAoY3VzdG9tQXR0cmlidXRlcyAhPSBudWxsICYmIGN1c3RvbUF0dHJpYnV0ZXMgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDdXN0b21BdHRyaWJ1dGVzKGN1c3RvbUF0dHJpYnV0ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvd0RhdGEgIT0gbnVsbCAmJiByb3dEYXRhLmlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCByb3dEYXRhLmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUgJiYgcm93RGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICByb3dbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF0gPSByb3dEYXRhW1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFja05vZGUocm93KTtcblxuICAgICAgICAvL2RyYWdnYWJsZSByb3dcbiAgICAgICAgaWYgKHJvdy5pc0RyYWdnYWJsZSgpKSB7XG4gICAgICAgICAgICByb3cuYXBwbHlEcmFnZ2FibGUoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dhYmxlUm93cyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b1Jvd0luZGV4KHJvd0luZGV4OiBudW1iZXIsIHJvd0RhdGE6IGFueSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUgJiYgcm93RGF0YSAhPSBudWxsID8gcm93RGF0YVtUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXSA6IHJvd0luZGV4O1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogQWRkIGNlbGwgdG8gbGlzdCBvZiBub2Rlc1xuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqIEBwYXJhbSBjb2x1bW5EZWZcbiAgICAgKi9cbiAgICBwcml2YXRlIHRyYWNrQ2VsbChldmVudDogT25DcmVhdGVFdmVudCwgY29sdW1uSW5kZXg6IG51bWJlciwgY29sdW1uRGVmOiBUYWJsZUNvbHVtbkRpcmVjdGl2ZSkge1xuICAgICAgICBjb25zdCBjZWxsID0gbmV3IEhUTUxFbGVtZW50V3JhcHBlcih0aGlzLnJlbmRlcmVyLCBcIlwiLCB0aGlzLmdldFNlc3Npb24oKSk7XG4gICAgICAgIGNlbGwuaHRtbEVsZW1lbnQgPSBldmVudC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNlbGwuc2V0TG9jYWxlTmFtZShcImNlbGxcIik7XG4gICAgICAgIGlmIChjb2x1bW5EZWYuY3VzdG9tQXR0cmlidXRlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoIWNlbGwuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikpIHtcbiAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNvbHVtbkRlZi5jdXN0b21BdHRyaWJ1dGVzW1wiY2xhc3NcIl0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgb3JnQ2xhc3M6IHN0cmluZyA9IGNlbGwuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBvcmdDbGFzcyArIFwiIFwiICsgY29sdW1uRGVmLmN1c3RvbUF0dHJpYnV0ZXNbXCJjbGFzc1wiXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJpc0xvY2tlZENvbHVtblwiLCBjb2x1bW5EZWYubG9ja2VkICsgXCJcIik7XG4gICAgICAgIHRoaXMuc2V0UGFyZW50U2NyZWVuSWQoY2VsbCk7XG5cbiAgICAgICAgLy90cmFjayBvcmlnaW5hbCBjb2x1bW4gaW5kZXggZm9yIHNvcnRpbmdcbiAgICAgICAgaWYgKGNvbHVtbkRlZi5vcmlnaW5hbENvbHVtbkluZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbHVtbkRlZi5vcmlnaW5hbENvbHVtbkluZGV4ID0gY29sdW1uSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBjZWxsW1wib3JpZ2luYWxDb2x1bW5JbmRleFwiXSA9IGNvbHVtbkRlZi5vcmlnaW5hbENvbHVtbkluZGV4O1xuXG4gICAgICAgIC8vYWRkIGNlbGwgdG8gY3VycmVudCByb3dcbiAgICAgICAgaWYgKHRoaXMubm9kZXNbdGhpcy5ub2Rlcy5sZW5ndGggLSAxXSAhPT0gdW5kZWZpbmVkICYmIHRoaXMubm9kZXNbdGhpcy5ub2Rlcy5sZW5ndGggLSAxXSAhPT0gbnVsbCl7XG4gICAgICAgICAgICB0aGlzLm5vZGVzW3RoaXMubm9kZXMubGVuZ3RoIC0gMV0uYXBwZW5kQ2hpbGQoY2VsbCxmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHByaXZhdGUgdHJhY2tIZWFkQ2VsbChldmVudDogT25DcmVhdGVFdmVudCwgY29sdW1uRGVmOiBUYWJsZUNvbHVtbkRpcmVjdGl2ZSkge1xuICAgICAgICBpZih0aGlzLmhlYWROb2RlID09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy5oZWFkTm9kZSA9IG5ldyBIVE1MRWxlbWVudFdyYXBwZXIodGhpcy5yZW5kZXJlciwgXCJcIiwgdGhpcy5nZXRTZXNzaW9uKCkpO1xuICAgICAgICAgICAgdGhpcy5oZWFkTm9kZS5yb3dOdW1iZXIgPSAtMTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyZW50U2NyZWVuSWQodGhpcy5oZWFkTm9kZSk7XG4gICAgICAgICAgICB0aGlzLmhlYWROb2RlLnNldExvY2FsZU5hbWUoXCJoZWFkcm93XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IG5ldyBIVE1MRWxlbWVudFdyYXBwZXIodGhpcy5yZW5kZXJlciwgXCJcIiwgdGhpcy5nZXRTZXNzaW9uKCkpO1xuICAgICAgICBjZWxsLmh0bWxFbGVtZW50ID0gZXZlbnQuZWxlbWVudC5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjZWxsLnNldExvY2FsZU5hbWUoXCJoZWFkY2VsbFwiKTtcbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJpc0xvY2tlZENvbHVtblwiLCBjb2x1bW5EZWYubG9ja2VkICsgXCJcIik7XG4gICAgICAgIGNlbGwuY3VzdG9tRGF0YSA9IGNvbHVtbkRlZjtcbiAgICAgICAgdGhpcy5zZXRQYXJlbnRTY3JlZW5JZChjZWxsKTtcblxuICAgICAgICB0aGlzLmhlYWROb2RlLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogQWRkIGVsZW1lbnQgdG8gaW50ZXJuYWwgW1tub2Rlc11dIGxpc3QgdG8ga2VlcCB0cmFjayBvZlxuICAgICAqIEBwYXJhbSBub2RlIEVsZW1lbnQgdG8gYWRkIHRvIGludGVybmFsIG5vZGUgbGlzdFxuICAgICAqL1xuICAgIHByaXZhdGUgdHJhY2tOb2RlKG5vZGU6IEhUTUxFbGVtZW50V3JhcHBlcikge1xuICAgICAgICBpZiAodGhpcy5ub2RlcyA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMubm9kZXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubm9kZXMucHVzaChub2RlKTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcGFyZW50IHNjcmVlbiBpZCBvbiBhbiBlbGVtZW50XG4gICAgICogQHBhcmFtIGVsXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRQYXJlbnRTY3JlZW5JZChlbDogSFRNTEVsZW1lbnRXcmFwcGVyKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFBhcmVudFZpZXcoKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBlbC5wYXJlbnRTY3JlZW5JZCA9IHRoaXMuZ2V0UGFyZW50VmlldygpLmdldElkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgaW52b2tlIFtbcm93U3R5bGVGbl1dIG9uIGEgcm93IGFuZCBnZXQgaXQncyBzdHlsZVxuICAgICAqIEBwYXJhbSByb3dcbiAgICAgKiBAcmV0dXJucyBTdHlsZSBhdHRyaWJ1dGVzXG4gICAgICovXG4gICAgcm93U3R5bGVDbGFzcyhyb3c6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5yb3dTdHlsZUZuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvd1N0eWxlRm4ocm93KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIGNoaWxkIG5vZGUgYnkgaWRcbiAgICAgKiBAcGFyYW0gaWQgQ2hpbGQncyBpZFxuICAgICAqL1xuICAgIGdldENoaWxkTm9kZUJ5SWQoaWQ6IHN0cmluZyk6IEhUTUxFbGVtZW50V3JhcHBlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVzICE9IG51bGwgPyB0aGlzLm5vZGVzLmZpbmQoY2hpbGQ9PmNoaWxkLmlkID09PSBpZCkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNlbGwgb25Db250ZXh0TWVudSBpZiBjb21wb25lbnQgaW5zaWRlIHRoZSBjZWxsIGhhcyBub3QgYWxyZWFkeSBoYW5kbGUgaXRcbiAgICAgKlxuICAgICAqIEBwYXJhbSByb3dOdW1iZXJcbiAgICAgKiBAcGFyYW0gY29sdW1uSW5kZXhcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBoYW5kbGVDb2x1bW5PbkNvbnRleHRNZW51KGNvbHVtbjogVGFibGVDZWxsRGlyZWN0aXZlICxyb3dOdW1iZXIsIGNvbHVtbkluZGV4OiBudW1iZXIsIGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVzICE9IG51bGwgJiYgdGhpcy5ub2Rlc1tyb3dOdW1iZXJdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkQ29sdW1uID0gdGhpcy5ub2Rlc1tyb3dOdW1iZXJdLmdldENoaWxkQXQoY29sdW1uSW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAoY2hpbGRDb2x1bW4gIT0gbnVsbCAmJiBjaGlsZENvbHVtbi5jb21wb25lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAvL3NvcGhpYSAjMTcyOFxuICAgICAgICAgICAgICBpZiAodGhpcy5yZXN0cmljdENlbGxQb3B1cCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNoaWxkQ29sdW1uLmNvbXBvbmVudC5oYW5kbGVPbkNvbnRleHRNZW51KGV2ZW50KTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJlc3RyaWN0Q2VsbFBvcHVwID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkQ29sdW1uLmNvbXBvbmVudC5wb3B1cCAhPSBudWxsICYmIGNoaWxkQ29sdW1uLmNvbXBvbmVudC5wb3B1cCAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgY2hpbGRDb2x1bW4uY29tcG9uZW50LmhhbmRsZU9uQ29udGV4dE1lbnUoZXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0U2Vzc2lvbigpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTZXNzaW9uKCkuc2V0TW91c2VQb3NpdGlvbihldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50VmlldyA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xuICAgICAgICAgICAgICAgIGxldCBwb3B1cE1lbnVJZDogc3RyaW5nID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRWaWV3ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBNZW51SWQgPSAocGFyZW50VmlldyBhcyBWaWV3Q29tcG9uZW50KS5nZXRGaXJzdFBvcHVwTWVudUlkKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb2x1bW4ub25Db250ZXh0TWVudUNiID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtbi5vbkNvbnRleHRNZW51Q2IodGhpcy5fZ2V0Tm9uZUFjdGl2ZVZpZXdQYXJlbnQoKSB8fCB0aGlzLmdldFBhcmVudFZpZXcoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHBvcHVwTWVudUlkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG0gPSBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRtKTtcblxuICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFNlc3Npb24oKS5fY3VycmVudFBvcHVwTWVudUlkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBNZW51SWQgPSB0aGlzLmdldFNlc3Npb24oKS5fY3VycmVudFBvcHVwTWVudUlkO1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2Vzc2lvbigpLnNob3dDb250ZXh0TWVudShwb3B1cE1lbnVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTZXNzaW9uKCkuX2N1cnJlbnRQb3B1cE1lbnVJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlciBmb3IgY29udGV4dCBjbGljayBvbiB0aGUgaGVhZGVyXG4gICAgICogQHBhcmFtIGNvbHVtbkluZGV4IEluZGV4IG9mIGNvbHVtbiB0aGF0IHdhcyBjbGlja2VkXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgaGFuZGxlSGVhZGVyT25Db250ZXh0TWVudShjb2x1bW5JbmRleDogbnVtYmVyLCBldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHRoaXMuaGVhZE5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRDb2x1bW4gPSB0aGlzLmhlYWROb2RlLmdldENoaWxkQXQoY29sdW1uSW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAoY2hpbGRDb2x1bW4gIT0gbnVsbCAmJiBjaGlsZENvbHVtbi5jb21wb25lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCBjbGllbnRFdmVudCA9IG5ldyBDbGllbnRFdmVudChjaGlsZENvbHVtbiwgZXZlbnQpO1xuXG4gICAgICAgICAgICAgIGlmIChBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQoY2hpbGRDb2x1bW4sIGNsaWVudEV2ZW50KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICh0aGlzLmdldFBhcmVudFZpZXcoKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBjbGllbnRFdmVudC5zZXRQYXJhbWV0ZXIoXCJzY3JlZW5JZFwiLCB0aGlzLmdldFBhcmVudFZpZXcoKS5nZXRJZCgpKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNsaWVudEV2ZW50LnNldFBhcmFtZXRlcihcImlkXCIsIHRoaXMuZ2V0SWQoKSk7XG5cbiAgICAgICAgICAgICAgdGhpcy5nZXRTZXNzaW9uKCkuZ2V0RXZlbnRIYW5kbGVyKCkuc2V0Q2xpZW50RXZlbnQoY2xpZW50RXZlbnQpO1xuXG4gICAgICAgICAgICAgIGNoaWxkQ29sdW1uLmNvbXBvbmVudC5oYW5kbGVPbkNvbnRleHRNZW51KGV2ZW50LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHJpdmF0ZSByZWNhbGN1bGF0ZVZpcnR1YWxTY3JvbGxEYXRhKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgICAgbGV0IHNjcm9sbFRvcCA9IGV2ZW50LnNyY0VsZW1lbnQuc2Nyb2xsVG9wO1xuXG4gICAgICAgICAgLy9hZGp1c3Qgb25seSBvbiBJRTksIG90aGVyd2lzZSwgaXQgd2lsbCBzdHVjayBpbiBpbmYgbG9vcFxuICAgICAgICAgIGlmICh0aGlzLmlzSUU5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHNjcm9sbFRvcCAtPSAwLjU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsTGVmdCA9PT0gZXZlbnQuc3JjRWxlbWVudC5zY3JvbGxMZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLmNhbGNWaXJ0dWFsU2Nyb2xsVmlld1BvcnQoc2Nyb2xsVG9wKTtcbiAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuYWRqdXN0VGFibGVIZWFkKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlciBmb3IgdGFibGUgaGVhZCBjaGFuZ2UuIFNldCBzdHlsZSB0byBwcm9wZXJseSBkaXNwbGF5XG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGp1c3RUYWJsZUhlYWQoZXZlbnQsIHNraXBCb2R5QWRqdXN0bWVudDogYm9vbGVhbiA9IGZhbHNlLCBza2lwSGVhZGVyOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMudGFibGUgPT0gbnVsbCB8fCBldmVudCA9PSBudWxsKSByZXR1cm47XG4gICAgICAgIHRoaXMucHJlTW91c2VFdmVudCA9IGV2ZW50O1xuICAgICAgICBsZXQgc2Nyb2xsVG9wID0gZXZlbnQuc3JjRWxlbWVudC5zY3JvbGxUb3A7XG5cbiAgICAgICAgLy9hZGp1c3Qgb25seSBvbiBJRTksIG90aGVyd2lzZSwgaXQgd2lsbCBzdHVjayBpbiBpbmYgbG9vcFxuICAgICAgICBpZiAodGhpcy5pc0lFOSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2Nyb2xsVG9wIC09IDAuNTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zY3JvbGxMZWZ0ID0gZXZlbnQuc3JjRWxlbWVudC5zY3JvbGxMZWZ0XG5cbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gaWYgKGV2ZW50LnNyY0VsZW1lbnQuc2Nyb2xsVG9wID4gdGhpcy5tYXhTY3JvbGxUb3ApIHtcbiAgICAgICAgICAgIC8vICAgICBzY3JvbGxUb3AgPSB0aGlzLm1heFNjcm9sbFRvcDtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgLy90aGlzLmNhbGNWaXJ0dWFsU2Nyb2xsVmlld1BvcnQoc2Nyb2xsVG9wKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXZTY3JvbGxUb3BGb3JIaWRkZW5IZWFkZXIgIT09IHNjcm9sbFRvcCAmJiBza2lwSGVhZGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHNjcm9sbFRvcCAtPSB0aGlzLnRoZWFkSGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnByZXZTY3JvbGxUb3BGb3JIaWRkZW5IZWFkZXIgPSBzY3JvbGxUb3A7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZFNjcm9sbGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNhbGNWaXJ0dWFsVGFibGVQb3NpdGlvbihzY3JvbGxUb3ApO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LDEwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2tpcEhlYWRlciAhPT0gdHJ1ZSkge1xuICAgICAgICAvLyAgIHRoaXMuZmFrZVRhYmxlLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgLy8gICB0aGlzLmlzSGVhZGVyQXBwZW5kVG9GYWtlVGFibGUgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMudGFibGVIZWFkLm5hdGl2ZUVsZW1lbnQsIFwidmlzaWJpbGl0eVwiKTtcbiAgICAgICAgICBpZih0aGlzLnRhYmxlRm9vdCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMudGFibGVGb290Lm5hdGl2ZUVsZW1lbnQsIFwidmlzaWJpbGl0eVwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ2hvc3RIZWFkZXIubmF0aXZlRWxlbWVudCwgXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcblxuICAgICAgICAgIGNvbnN0IHRhYmxlID0gdGhpcy50YWJsZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IHRoZWFkID0gdGFibGUucXVlcnlTZWxlY3RvcigndGhlYWQnKTtcbiAgICAgICAgICBjb25zdCB0Ym9keSA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5Jyk7XG5cblxuICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICBsZXQgY29sdW1uID0gdGhpcy5jb2x1bW5zLmZpbmQoKGl0ZW0sIGlkeCk9PmlkeCA9PT0gaSk7XG4gICAgICAgICAgICAgIGlmKGNvbHVtbiAhPSBudWxsICYmIGNvbHVtbi52aXNpYmxlICYmIGNvbHVtbi5sb2NrZWQpXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRDaGlsZHJlbiA9ICQodGhlYWQucXVlcnlTZWxlY3RvcigndGg6bnRoLWNoaWxkKCcgKyAoaSsxKSArICcpJykpO1xuICAgICAgICAgICAgICAgICAgbGV0IHRyYW5zID0gYHRyYW5zbGF0ZSgke3RoaXMuc2Nyb2xsTGVmdH1weCwgJHtzY3JvbGxUb3B9cHgpYDtcblxuICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHRyYW5zID0gYHRyYW5zbGF0ZVgoJHt0aGlzLnNjcm9sbExlZnR9cHgpYDtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaGVhZENoaWxkcmVuLmNzcyhcInRyYW5zZm9ybVwiLCB0cmFucyk7XG4gICAgICAgICAgICAgICAgICBoZWFkQ2hpbGRyZW4uY3NzKFwiLW1zLXRyYW5zZm9ybVwiLCB0cmFucyk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChza2lwQm9keUFkanVzdG1lbnQgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib2R5Q2hpbGRyZW4gPSAkKHRib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkOm50aC1jaGlsZCgnICsgKGkrMSkgKyAnKScpKTtcbiAgICAgICAgICAgICAgICAgICAgICBib2R5Q2hpbGRyZW4uY3NzKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHt0aGlzLnNjcm9sbExlZnR9cHhgKTtcbiAgICAgICAgICAgICAgICAgICAgICBib2R5Q2hpbGRyZW4uY3NzKFwiLW1zLXRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7dGhpcy5zY3JvbGxMZWZ0fXB4YCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29sdW1uICE9IG51bGwgJiYgY29sdW1uLnZpc2libGUgJiYgdGhpcy52aXJ0dWFsU2Nyb2xsICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBoZWFkQ2hpbGRyZW4gPSAkKHRoZWFkLnF1ZXJ5U2VsZWN0b3IoJ3RoOm50aC1jaGlsZCgnICsgKGkrMSkgKyAnKScpKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zID0gYHRyYW5zbGF0ZVkoJHtzY3JvbGxUb3B9cHgpYDtcblxuICAgICAgICAgICAgICAgICAgaGVhZENoaWxkcmVuLmNzcyhcInRyYW5zZm9ybVwiLCB0cmFucyk7XG4gICAgICAgICAgICAgICAgICBoZWFkQ2hpbGRyZW4uY3NzKFwiLW1zLXRyYW5zZm9ybVwiLCB0cmFucyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmFkanVzdFRhYmxlRm9vdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIFNldCB0YWJsZSBmb290ZXIgc3R5bGVzIGZvciBwcm9wZXIgZGlzcGxheVxuICAgICAqL1xuICAgIHByaXZhdGUgYWRqdXN0VGFibGVGb290ZXIoKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKHRoaXMudGFibGUgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCB0Zm9vdCA9IHRoaXMudGFibGUubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidGZvb3RcIik7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICh0Zm9vdCAhPSBudWxsKSB7XG4gICAgICAgIC8vVml2aWZ5LCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3dlYXZlaW8vbmduc29waGlhL2lzc3Vlcy8xODA2XG4gICAgICAgIGxldCB0Zm9vdFBvcyA9IDA7XG4gICAgICAgIGlmKCQodGhpcy50YWJsZS5uYXRpdmVFbGVtZW50KS5oZWlnaHQoKSA8ICQodGhpcy50YWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50KS5oZWlnaHQoKSkge1xuICAgICAgICAgICAgdGZvb3RQb3MgPSAkKHRoaXMudGFibGVDb250YWluZXIubmF0aXZlRWxlbWVudCkuaGVpZ2h0KCkgLSAkKHRoaXMudGFibGUubmF0aXZlRWxlbWVudCkuaGVpZ2h0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0Zm9vdFBvcyA9ICgkKHRoaXMudGFibGVDb250YWluZXIubmF0aXZlRWxlbWVudCkuaGVpZ2h0KCkgLSAkKHRoaXMudGFibGUubmF0aXZlRWxlbWVudCkuaGVpZ2h0KCkpICsgdGhpcy50YWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IHRoaXMuY29sdW1ucy5maW5kKChpdGVtLCBpZHgpPT5pZHggPT09IGkpO1xuICAgICAgICAgICAgaWYgKGNvbHVtbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9vdENoaWxkcmVuID0gJCh0Zm9vdC5xdWVyeVNlbGVjdG9yKCd0ZDpudGgtY2hpbGQoJyArIChpKzEpICsgJyknKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnMgPSBgdHJhbnNsYXRlWSgke3Rmb290UG9zfXB4KWA7XG5cbiAgICAgICAgICAgICAgICBmb290Q2hpbGRyZW4uY3NzKFwidHJhbnNmb3JtXCIsIHRyYW5zKTtcbiAgICAgICAgICAgICAgICBmb290Q2hpbGRyZW4uY3NzKFwiLW1zLXRyYW5zZm9ybVwiLCB0cmFucyk7XG4gICAgICAgICAgICAgICAgZm9vdENoaWxkcmVuLmNzcyhcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIik7XG4gICAgICAgICAgICAgICAgZm9vdENoaWxkcmVuLmNzcyhcInotaW5kZXhcIiwgXCIzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBrZXl1cC4gQ29weSBrZXlib2FyZCBzaG9ydGN1dCBzdXBwb3J0XG4gICAgICogQHBhcmFtIGV2ZW50IEtleXVwIGV2ZW50XG4gICAgICovXG4gICAgaGFuZGxlS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgZXZlbnQuY3RybEtleSA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIGV2ZW50LmNvZGUgPT09IFwiS2V5Q1wiIHx8XG4gICAgICAgICAgICAgICAgZXZlbnQua2V5Q29kZSA9PT0gNjcgfHxcbiAgICAgICAgICAgICAgICBldmVudC5rZXlDb2RlID09PSA5OVxuICAgICAgICAgICAgKVxuICAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICAgICAgdGhpcy5jb3B5U2VsZWN0ZWRSb3dBc1RleHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdG8gc2VlIGlmIHdlIGNhbiBzZW5kIHNlbGVjdGVkIHJvd3MgdG8gY2xpcGJvYXJkXG4gICAgICovXG4gICAgY29weVNlbGVjdGVkUm93QXNUZXh0KCkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRSb3dzICE9IG51bGwgJiYgdGhpcy5zZWxlY3RlZFJvd3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRSb3dUZXh0OiBBcnJheTxzdHJpbmc+O1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRSb3c6IEhUTUxFbGVtZW50V3JhcHBlciA9IHRoaXMuZ2V0U2VsZWN0ZWRSb3dzKClbMF07XG5cbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkUm93LmNoaWxkTm9kZXMgIT0gbnVsbCAmJiBzZWxlY3RlZFJvdy5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFJvd1RleHQgPSBzZWxlY3RlZFJvdy5jaGlsZE5vZGVzLm1hcChjaGlsZCA9PiBjaGlsZC5nZXRUZXh0KCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFJvdy5keW5hbWljQ2hpbGROb2RlcyAhPSBudWxsICYmIHNlbGVjdGVkUm93LmR5bmFtaWNDaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFJvd1RleHQgPSBzZWxlY3RlZFJvdy5keW5hbWljQ2hpbGROb2Rlcy5tYXAoY2hpbGQgPT4gY2hpbGQuZ2V0VGV4dCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRSb3dUZXh0ICE9IG51bGwgJiYgc2VsZWN0ZWRSb3dUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaXBib2FyZFNlcnZpY2UuY29weShzZWxlY3RlZFJvd1RleHQuam9pbihTdHJpbmcuZnJvbUNoYXJDb2RlKDkpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGEgcm93IGlkIGJhc2VkIG9uIHJvdydzIFtbaWRdXSBhbmQgaW5kZXhcbiAgICAgKiBAcGFyYW0gcm93XG4gICAgICogQHBhcmFtIHJvd0luZGV4XG4gICAgICovXG4gICAgYnVpbGRSb3dJZChyb3c6IGFueSwgcm93SW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5yb3dJZEJ1aWxkZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm93SWRCdWlsZGVyKHJvdywgcm93SW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFsncm93JywgdGhpcy5pZCwgcm93SW5kZXhdLmpvaW4oJy0nKTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIFNvcnQgdGhlIGRhdGEgKGZvciB2aXJ0dWFsIHNjcm9sbClcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW5cbiAgICAgKi9cbiAgICBoYW5kbGVTb3J0KGNvbHVtbjogVGFibGVDb2x1bW5EaXJlY3RpdmUpIHtcbiAgICAgICAgLy9zb3J0aW5nIGlzIG9ubHkgYWxsb3dlZCBvbiBhIG5vbiBsb2NraW5nIGNvbHVtblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSAmJiBjb2x1bW4ubG9ja2VkICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAvL2ZpbmQgcHJldmlvdXMgc29ydCBkaXJlY3Rpb24gZm9yIHRoZSBjb2x1bW5cbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbD0+e1xuICAgICAgICAgICAgICAgIC8vdXNpbmcgb3JpZ2luYWxDb2x1bW5JbmRleCBiL2MgdXNlIGNhbiBkcmFnIGNvbHVtbiBhcm91bmQgYW5kIHRodXMgY29sdW1uIGluZGV4IGNoYW5nZWRcbiAgICAgICAgICAgICAgICBpZiAoY29sLm9yaWdpbmFsQ29sdW1uSW5kZXggIT09IGNvbHVtbi5vcmlnaW5hbENvbHVtbkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbC5zb3J0RGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGNvbHVtbi5zb3J0RGlyZWN0aW9uID09PSBcImFzY1wiKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLnNvcnREaXJlY3Rpb24gPSBcImRlc2NcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLnNvcnREaXJlY3Rpb24gPSBcImFzY1wiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc29ydENvbHVtbklkOiBzdHJpbmcgPSB0aGlzLnZpcnR1YWxTY3JvbGxTb3J0S2V5c1tjb2x1bW4ub3JpZ2luYWxDb2x1bW5JbmRleF07XG5cbiAgICAgICAgICAgIC8vaWYgY3VzdG9tIHNvcnRuIGZuIGlzIHByb3ZpZGVkLCB1c2VkIHRvIGZpbmQgcHJvcGVyIGNvbHVtbiB0byBzb3J0XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMudmlydHVhbFNjcm9sbFNvcnRGbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgc29ydENvbHVtbklkID0gdGhpcy52aXJ0dWFsU2Nyb2xsU29ydEZuKHRoaXMuX2dldE5vbmVBY3RpdmVWaWV3UGFyZW50KCkgfHwgdGhpcy5nZXRQYXJlbnRWaWV3KCksIGNvbHVtbi5vcmlnaW5hbENvbHVtbkluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNvcnRDb2x1bW5JZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IF8ub3JkZXJCeSh0aGlzLl9kYXRhU291cmNlLCBbc29ydENvbHVtbklkXSwgW2NvbHVtbi5zb3J0RGlyZWN0aW9uXSBhcyBhbnkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNhbGNWaXJ0dWFsU2Nyb2xsVmlld1BvcnQodGhpcy5wcmV2U2Nyb2xsVG9wKTtcbiAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9ICBlbHNlIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgIT09IHRydWUgJiYgY29sdW1uLmxvY2tlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gUlhDIEFkZFxuICAgICAgICAgICAgaWYgKHRoaXMuc29ydERpcmVjdGlvbiA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydERpcmVjdGlvbiA9IFwiYXNjXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc29ydENvbHVtbklkID09PSBjb2x1bW4ub3JpZ2luYWxDb2x1bW5JbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvcnREaXJlY3Rpb24gPT09IFwiYXNjXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0RGlyZWN0aW9uID0gXCJkZXNjXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0RGlyZWN0aW9uID0gXCJhc2NcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydERpcmVjdGlvbiA9IFwiYXNjXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNvcnRDb2x1bW5JZCA9IGNvbHVtbi5vcmlnaW5hbENvbHVtbkluZGV4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgdGhlIG92ZXJhbGwgaGVpZ2h0IHNvIHdlIGNhbiBhZGQgc2Nyb2xsYmFyIGZvciB2aXJ0dWFsIHNjcm9sbC4gVGhpcyBpcyBkb25lXG4gICAgICogYnkgbXVsdGlwbHlpbmcgdGhlIG51bWJlciBvZiByb3dzIHRvIHRoZSBoZWlnaHQgb2YgZWFjaCByb3cuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGNWaXJ0dWFsU2Nyb2xsSGVpZ2h0KCkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFTb3VyY2UgIT0gbnVsbCAmJiB0aGlzLl9kYXRhU291cmNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvL3Njcm9sbCBoZWlnaHQgPSAxMHB4ICogIyByb3dzICgxMHB4IGlzIHRoZSBoZWlnaHQgb2YgZWFjaCByb3cpXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlydHVhbFNjcm9sbERpdkhlaWdodCA9ICh0aGlzLnJvd0hlaWdodCAqIHRoaXMuX2RhdGFTb3VyY2UubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1heFNjcm9sbFRvcCA9IHRoaXMuX3ZpcnR1YWxTY3JvbGxEaXZIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsU29ydEtleXMgPSBfLmtleXModGhpcy5fZGF0YVNvdXJjZVswXSk7XG5cbiAgICAgICAgICAgICAgICAvL3RyYWNrIG9yaWdpbmFsIGluZGV4XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9kYXRhU291cmNlW3RoaXMuX2RhdGFTb3VyY2UubGVuZ3RoIC0gMV1bVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF0gIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHRoaXMuX2RhdGFTb3VyY2UsIChpdGVtLCBpbmRleCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1bVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF0gPSBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92aXJ0dWFsU2Nyb2xsRGl2SGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGp1c3QvbW92ZSB0aGUgcG9zaXRpb24gb2YgdGhlIHRhYmxlIGNvbnRhaW5lciBzbyB0aGF0IGl0IGRpc3BsYXllZCBwcm9wZXJseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY3JvbGxUb3BcbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGNWaXJ0dWFsVGFibGVQb3NpdGlvbihzY3JvbGxUb3A6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLy1tcy10cmFuc2Zvcm1cbiAgICAgICAgICAgIC8vdHJhbnNmb3JtXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5tYXhTY3JvbGxUb3AgPiAwKSB7XG4gICAgICAgICAgICAvLyAgICAgc2Nyb2xsVG9wID0gTWF0aC5taW4oc2Nyb2xsVG9wLCB0aGlzLm1heFNjcm9sbFRvcCk7XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50YWJsZVdyYXBwZXIubmF0aXZlRWxlbWVudCwgXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZVkoJHtzY3JvbGxUb3B9cHgpYCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudGFibGVXcmFwcGVyLm5hdGl2ZUVsZW1lbnQsIFwiLW1zLXRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlWSgke3Njcm9sbFRvcH1weClgKTtcbiAgICAgICAgICAgIC8vIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgdGhlIHZpc2libGUgdmlydHVhbCByb3dzIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY3JvbGxUb3BcbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGNWaXJ0dWFsU2Nyb2xsVmlld1BvcnQoc2Nyb2xsVG9wOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1ZpZXdJbml0ID09PSB0cnVlICYmIHRoaXMuX2RhdGFTb3VyY2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IHN0YXJ0SWR4OiBudW1iZXIgPSAwO1xuXG4gICAgICAgICAgICAvL2lmIHNjcm9sbFRvcCBpcyBncmVhdGVyIHRoYW4gMCwgbmVlZCB0byBmaWd1cmUgdGhlIHN0YXJ0aW5nIHJvd1xuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgICAgICAgICAvL2VhY2ggcm93IGlzIDEwcHggaGVpZ2h0LCBpZiBzY3JvbGxUb3AgaXMgMTAwcHgsIHRoZW4gd2Ugc3RhcnQgYXQgcm93IDEwXG4gICAgICAgICAgICAgICAgLy9zY3JvbGxUb3AgLyAxMHB4P1xuICAgICAgICAgICAgICAgIHN0YXJ0SWR4ID0gTWF0aC5mbG9vcihzY3JvbGxUb3AgLyB0aGlzLnJvd0hlaWdodCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRJZHggPiB0aGlzLl9kYXRhU291cmNlLmxlbmd0aCAtIHRoaXMuX3ZpcnR1YWxTY3JvbGxSb3dQZXJWaWV3KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0SWR4ID0gdGhpcy5fZGF0YVNvdXJjZS5sZW5ndGggLSB0aGlzLl92aXJ0dWFsU2Nyb2xsUm93UGVyVmlldztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3ZpcnR1YWxWaWV3UG9ydCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnByZXZTY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgICAgICAgICB0aGlzLmNsZWFuVXBDaGlsZE5vZGVzKCk7XG4gICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcblxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZpcnR1YWxWaWV3UG9ydCA9IHRoaXMuYnVpbGRSb3dJZGVudGl0eSh0aGlzLl9kYXRhU291cmNlLnNsaWNlKHN0YXJ0SWR4LCBzdGFydElkeCArIHRoaXMuX3ZpcnR1YWxTY3JvbGxSb3dQZXJWaWV3ICsgdGhpcy5hZGp1c3RlZFJvd3MpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3dhcChmcm9tSW5kZXg6IG51bWJlciwgdG9JbmRleDogbnVtYmVyKSB7XG4gICAgICBjb25zdCB0ZW1wVG9Db2x1bW4gPSB0aGlzLmNvbHVtbnNbdG9JbmRleF07XG5cbiAgICAgIHRoaXMuY29sdW1uc1t0b0luZGV4XSA9IHRoaXMuY29sdW1uc1tmcm9tSW5kZXhdO1xuICAgICAgdGhpcy5jb2x1bW5zW2Zyb21JbmRleF0gPSB0ZW1wVG9Db2x1bW47XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBTd2FwIHRoZSBjb2x1bW5zIGFmdGVyIGEgY29sdW1uIGlzIGJlaW5nIGRyYWcgYW5kIHJvcFxuICAgICAqXG4gICAgICogQHBhcmFtIGZyb21JbmRleCBjb2x1bW4gdGhhdCBpcyBiZWluZyBkcmFnZ2VkIChtb3ZlZClcbiAgICAgKiBAcGFyYW0gdG9JbmRleCAgY29sdW1uIHRoYXQgaXMgYmVpbmcgZHJvcGVkIGludG9cbiAgICAgKi9cbiAgICBwcml2YXRlIHN3YXBDb2x1bW5zKGZyb21JbmRleDogbnVtYmVyLCB0b0luZGV4OiBudW1iZXIpIHtcbiAgICAgIC8vc29waGlhIDE4NTY6IG5lZWQgdG8gcHJvcGVybHkgc3dhcCBjb2x1bW5zXG4gICAgICBpZiAoZnJvbUluZGV4IDwgdG9JbmRleCkge1xuICAgICAgICBmb3IgKGxldCBpID0gZnJvbUluZGV4OyBpIDwgdG9JbmRleDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5fc3dhcChpLCBpICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZnJvbUluZGV4ID4gdG9JbmRleCkge1xuICAgICAgICBmb3IgKGxldCBpID0gZnJvbUluZGV4OyBpID4gdG9JbmRleDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5fc3dhcChpLCBpIC0gMSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc2Nyb2xsQ29udGFpbmVyU3R5bGVzICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbENvbnRhaW5lclN0eWxlc1tcIm92ZXJmbG93LXlcIl0gPSBcImF1dG9cIjtcbiAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cblxuICAgICAgLy9zb3BoaWEgMTgyMzogZm9yIHNlcnZlciB0cmFja2luZ1xuICAgICAgXy5mb3JFYWNoKHRoaXMuY29sdW1ucywgKGNvbCwgaWR4KT0+e1xuICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwidmlzdWFsSW5kZXhcIiwgaWR4ICsgXCJcIik7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgdGhpcy5hcHBseVJlc2l6ZUNvbHVtbnMoKTtcbiAgICAgICAgfSwgMjAwKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb2x1bW5zSGFzQmVlblN3YXBwZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHJpdmF0ZSBfY2xlYW51cENvbFJlc2l6ZSgpIHtcbiAgICAgICAgLy9yZXNldFxuICAgICAgICB0aGlzLiRjb2xSZXNpemFibGUgPSAkKHRoaXMudGFibGUubmF0aXZlRWxlbWVudCkuY29sUmVzaXphYmxlKHtcbiAgICAgICAgICBkaXNhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoYCMke3RoaXMuaWR9IC5KQ0xSZ3JpcHNgKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGFwcGx5UmVzaXplQ29sdW1ucygpIHtcbiAgICAgIGlmICh0aGlzLnRhYmxlICE9IG51bGwgJiYgKHRoaXMuZW5hYmxlQ29sdW1uUmVzaXplID09IG51bGwgfHwgdGhpcy5lbmFibGVDb2x1bW5SZXNpemUgPT09IHRydWUpKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXBDb2xSZXNpemUoKTtcbiAgICAgICAgdGhpcy4kY29sUmVzaXphYmxlID0gJCh0aGlzLnRhYmxlLm5hdGl2ZUVsZW1lbnQpLmNvbFJlc2l6YWJsZSh7XG4gICAgICAgICAgICBsaXZlRHJhZzogZmFsc2UsIC8vdHVybmluZyB0aGlzIG9uIHdpbGwgaW5jdXJyZWQgYSBzZXZlcmUgcGVyZm9ybWFuY2UgcGVuYWx0eSBvbiBJRSBzbyBsZWF2ZSBpdCBvZmZcbiAgICAgICAgICAgIHJlc2l6ZU1vZGU6ICdvdmVyZmxvdycsXG4gICAgICAgICAgICBwYXJ0aWFsUmVmcmVzaDogdHJ1ZSwgLy9BZnRlciBjbG9zaW5nIHRoZSB3aW5kb3cgYW5kIG9wZW5pbmcgYWdhaW4sIGNvbHVtblJlc2l6ZXIgY2FuJ3Qgd29yay4gVG8gZml4IHRoYXQsIHRoaXMgdmFsdWUgaXMgbmVlZGVkLixcbiAgICAgICAgICAgIGhlYWRlck9ubHk6IHRydWUgLy9hbGxvdyBkcmFnZ2luZyB1c2luZyBoZWFkZXIgb25seVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gd2hldGhlciBvciBub3QgdGhlIGNvbHVtbiBhdCB0aGUgcGFydGljdWxhciBpbmRleCBjYW4gYmUgZHJhZ2dlZC9kcm9wXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sSWR4XG4gICAgICovXG4gICAgcHJpdmF0ZSBjYW5EcmFnQ29sdW1uKGNvbElkeDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjYW5EcmFnID0gdHJ1ZTtcblxuICAgICAgICBmb3IgKGxldCBjb2wgb2YgdGhpcy5jb2x1bW5zKSB7XG4gICAgICAgICAgICBpZiAoY29sLm9yaWdpbmFsQ29sdW1uSW5kZXggPT09IGNvbElkeCAmJiBjb2wubG9ja2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2FuRHJhZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhbkRyYWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBpbmRleCBvZiB0aGUgc3VwcHBsaWVkIHJvd1xuICAgICAqXG4gICAgICogQHBhcmFtIGNoaWxkIHJvdyB0byBjaGVjayBmbyByaW5kZXg/XG4gICAgICovXG4gICAgaW5kZXhPZkNoaWxkKGNoaWxkOiBhbnkpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5ub2RlcyAhPSBudWxsICYmIHRoaXMubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIF8uZmluZEluZGV4KHRoaXMubm9kZXMsIChub2RlKT0+bm9kZSA9PT0gY2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jaGlsZCBkb2VzIG5vdCBleGlzdHNcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NoZWNrSW5pdE1vZGlmaWVkVmlydHVhbFJvd3MoKSB7XG4gICAgICBpZiAodGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzID0ge307XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2hlY2tJbml0TW9kaWZpZWRWaXJ0dWFsUm93c0pzb24oKSB7XG4gICAgICBpZiAodGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzSnNvbiA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93c0pzb24gPSB7fTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWZyZXNoIHRoZSB0YWJsZSBzb3J0ZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZnJlc2hUYWJsZVNvcnRlcigpIHtcbiAgICAgICAgLy9kYXRhIGNoYW5nZXMsIG5lZWQgdG8gdXBkYXRlIHRhYmxlU29ydGVyXG4gICAgICAgIGlmICh0aGlzLl90YWJsZVNvcnRlclJlZnJlc2hUbSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGFibGVTb3J0ZXJSZWZyZXNoVG0pO1xuICAgICAgICAgICAgdGhpcy5fdGFibGVTb3J0ZXJSZWZyZXNoVG0gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3RhYmxlU29ydGVyUmVmcmVzaFRtID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RhYmxlU29ydGVyUmVmcmVzaFRtKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90YWJsZVNvcnRlclJlZnJlc2hUbSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kdGFibGVzb3J0ZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0YWJsZXNvcnRlci50cmlnZ2VyKFwidXBkYXRlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFkanVzdFRhYmxlSGVhZCh0aGlzLnByZU1vdXNlRXZlbnQpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVmcmVzaCBjYWNoZSBkYXRhIChzb3J0IHZhbHVlLCBldGMpXG4gICAgICovXG4gICAgcmVmcmVzaFRhYmxlU29ydGVyQ2FjaGUoKSB7XG4gICAgICAvL2RhdGEgY2hhbmdlcywgbmVlZCB0byB1cGRhdGUgdGFibGVTb3J0ZXJcbiAgICAgIGlmICh0aGlzLl90YWJsZVNvcnRlckNhY2hlUmVmcmVzaFRtICE9IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGFibGVTb3J0ZXJDYWNoZVJlZnJlc2hUbSk7XG4gICAgICAgICAgdGhpcy5fdGFibGVTb3J0ZXJDYWNoZVJlZnJlc2hUbSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fdGFibGVTb3J0ZXJDYWNoZVJlZnJlc2hUbSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGFibGVTb3J0ZXJDYWNoZVJlZnJlc2hUbSk7XG4gICAgICAgICAgICAgIHRoaXMuX3RhYmxlU29ydGVyQ2FjaGVSZWZyZXNoVG0gPSBudWxsO1xuXG4gICAgICAgICAgICAgIGlmICh0aGlzLiR0YWJsZXNvcnRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiR0YWJsZXNvcnRlci50cmlnZ2VyKFwidXBkYXRlQ2FjaGVcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAyMDApO1xuICAgICAgfSk7XG4gIH1cblxuICAgIHNldFNlbGVjdEFsbFZpcnR1YWxSb3dzKHNob3VsZFNlbGVjdGVkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChzaG91bGRTZWxlY3RlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzID0ge307XG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3NKc29uID0ge307XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93cyA9IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tJbml0TW9kaWZpZWRWaXJ0dWFsUm93cygpO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tJbml0TW9kaWZpZWRWaXJ0dWFsUm93c0pzb24oKTtcblxuICAgICAgICAgICAgY29uc3QgY2hlY2tCb3hlQ29sdW1uSWR4cyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlcyAhPSBudWxsICYmIHRoaXMubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vZmluZCBhbGwgY2hlY2tib3hlcyBjb2x1bW5zXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVzWzBdLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZXNbMF0uY2hpbGROb2Rlc1tpXS5jb21wb25lbnQgaW5zdGFuY2VvZiBDaGVja2JveENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tCb3hlQ29sdW1uSWR4cy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2lmIHRoZXJlIGFyZSBjaGVja2JveGVzLCBjaGVjayB0aGVtXG4gICAgICAgICAgICB0aGlzLmxhc3RTZWxlY3RlZFJvd0luZGV4ID0gMDtcbiAgICAgICAgICAgIGlmIChjaGVja0JveGVDb2x1bW5JZHhzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCByb3cgb2YgdGhpcy5fZGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSByb3cgaXMgbm90IHZpc2libGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uZmluZEluZGV4KHRoaXMubm9kZXMsIChub2RlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF0gPT09IHJvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXTtcbiAgICAgICAgICAgICAgICAgICAgfSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzW3Jvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93c1tyb3dbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF1dID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbElkeCBvZiBjaGVja0JveGVDb2x1bW5JZHhzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzW3Jvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXV1bY29sSWR4XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLm1vZGlmaWVkVmlydHVhbFJvd3NKc29uIFtdXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMudmlydHVhbFNjcm9sbEludmlzaWJsZVJvd0J1aWxkZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd0VsZW1lbnQ6IEhUTUxFbGVtZW50V3JhcHBlciA9IHRoaXMudmlydHVhbFNjcm9sbEludmlzaWJsZVJvd0J1aWxkZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldE5vbmVBY3RpdmVWaWV3UGFyZW50KCkgfHwgdGhpcy5nZXRQYXJlbnRWaWV3KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dFbGVtZW50LnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIFwidHJ1ZVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93c0pzb25bcm93W1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdXSA9IHJvd0VsZW1lbnQudG9Kc29uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0ZWQgdGhlIHJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRSb3dzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93cy5wdXNoKHJvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlY0NhbGNOb1ZpcnR1YWxSb3coKSB7XG4gICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgIGxldCBoZWlnaHQgPSAkKHRoaXMudGFibGVDb250YWluZXIubmF0aXZlRWxlbWVudCkuaGVpZ2h0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMudGFibGVIZWFkICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLnRoZWFkSGVpZ2h0ID0gJCh0aGlzLnRhYmxlSGVhZC5uYXRpdmVFbGVtZW50KS5oZWlnaHQoKTtcbiAgICAgICAgICBoZWlnaHQgPSBoZWlnaHQgLSB0aGlzLnRoZWFkSGVpZ2h0O1xuXG4gICAgICAgICAgaWYgKHRoaXMuc2tpcFJvd3NBZGp1c3RtZW50ICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmFkanVzdGVkUm93cyA9IE1hdGgucm91bmQodGhpcy50aGVhZEhlaWdodCAvIHRoaXMucm93SGVpZ2h0KSArIDI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdmlydHVhbFNjcm9sbFJvd1BlclZpZXcgPSBNYXRoLnJvdW5kKGhlaWdodCAvIHRoaXMucm93SGVpZ2h0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEhlYWRlcldpZHRoSGVpZ2h0KCl7Ly9Gb3IgaHR0cHM6Ly9naXRodWIuY29tL3dlYXZlaW8vbmduc29waGlhL2lzc3Vlcy8xNjE4XG4gICAgICAgIGNvbnN0IHRhYmxlID0gdGhpcy50YWJsZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCB0aGVhZCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkJyk7XG4gICAgICAgIGxldCBoZWFkZXJNYXhIZWlnaHQgPSAwO1xuICAgICAgICB2YXIgaWQgPSB0YWJsZS5pZDtcbiAgICAgICAgaWYgKHRoaXMuY29sdW1ucyAhPSBudWxsKXtcbiAgICAgICAgICAgIGlmKHRoaXMuZm9yY2VGaXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgLy9wbGVhc2UgZG8gbm90IHJlbW92ZWQgb3VyIGNvZGVcbiAgICAgICAgICAgICAgICAvL3RoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50YWJsZS5uYXRpdmVFbGVtZW50LCBcInRhYmxlLWxheW91dFwiLCBcImZpeGVkXCIpO1xuXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2x1bW4gPSB0aGlzLmNvbHVtbnMuZmluZCgoaXRlbSwgaWR4KT0+aWR4ID09PSBpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY29sdW1uICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRDaGlsZHJlbiA9IHRoZWFkLnF1ZXJ5U2VsZWN0b3IoJ3RoOm50aC1jaGlsZCgnICsgKGkrMSkgKyAnKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShoZWFkQ2hpbGRyZW4sIFwid2lkdGhcIiwgYCR7Y29sdW1uLmNvbnRyb2xXaWR0aH1weGApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29sdW1uLmNvbnRyb2xIZWlnaHQgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0hlYWRlckF1dG8gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhlYWRlck1heEhlaWdodCA8IGNvbHVtbi5jb250cm9sSGVpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyTWF4SGVpZ2h0ID0gTnVtYmVyKGNvbHVtbi5jb250cm9sSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0hlYWRlckF1dG8pe1xuICAgICAgICAgICAgICAgICAgICAkKFwiI1wiICsgaWQgKyBcIj5kaXY+ZGl2PnRhYmxlXCIpLnJlbW92ZUNsYXNzKFwiaGVhZGVyLWZpeGVkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qZWxzZXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbHVtbiA9IHRoaXMuY29sdW1ucy5maW5kKChpdGVtLCBpZHgpPT5pZHggPT09IGkpO1xuICAgICAgICAgICAgICAgICAgICBpZihjb2x1bW4gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZENoaWxkcmVuID0gdGhlYWQucXVlcnlTZWxlY3RvcigndGg6bnRoLWNoaWxkKCcgKyAoaSsxKSArICcpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGhlYWRDaGlsZHJlbiwgXCJtaW4td2lkdGhcIiwgYCR7Y29sdW1uLmNvbnRyb2xXaWR0aH1weGApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSovXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5naG9zdEhlYWRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoaGVhZGVyTWF4SGVpZ2h0ID09IDApIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJNYXhIZWlnaHQgPSAzMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdob3N0SGVhZGVyLm5hdGl2ZUVsZW1lbnQsIFwiaGVpZ2h0XCIsIGhlYWRlck1heEhlaWdodCArIFwicHhcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldCB0YWJsZSBjb2x1bW4gKGluIGNhc2UgaXQgaGFzIGJlZW4gc3dhcHBlZClcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlc2V0VGFibGVDb2x1bW5zKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5mb3JjZVJlc2V0Q29sdW1ucyA9PT0gdHJ1ZSAmJlxuICAgICAgICAgIHRoaXMuX2lzRHlpbmcgIT09IHRydWUgJiZcbiAgICAgICAgICB0aGlzLmNvbHVtbnMgIT0gbnVsbCAmJlxuICAgICAgICAgIHRoaXMuY29sdW1uc0hhc0JlZW5Td2FwcGVkID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zSGFzQmVlblN3YXBwZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgY29uc3QgdGVtcCA9IF8uY2xvbmUodGhpcy5jb2x1bW5zKTtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmhlYWROb2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWROb2RlLmNoaWxkTm9kZXMgPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gXy5zb3J0QnkodGVtcCwgKGNvbDogVGFibGVDb2x1bW5EaXJlY3RpdmUsIGlkeDogbnVtYmVyKT0+e1xuICAgICAgICAgICAgICAgIGNvbC5zZXRBdHRyaWJ1dGUoXCJ2aXN1YWxJbmRleFwiLCBpZHggKyBcIlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sLm9yaWdpbmFsQ29sdW1uSW5kZXg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgdGhpcy5pbml0UGx1Z2lucygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZFJvd0lkZW50aXR5KHJvd3M6IEFycmF5PGFueT4pIHtcbiAgICAgICAgLy8gaWYgKHJvd3MgPT0gbnVsbCkgcmV0dXJuIHJvd3M7XG5cbiAgICAgICAgLy8gZm9yIChsZXQgcm93SW5kZXggPSAwOyByb3dJbmRleCA8IHJvd3MubGVuZ3RoOyByb3dJbmRleCsrKSB7XG4gICAgICAgIC8vICAgICByb3dzW3Jvd0luZGV4XVtUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9ST1dfRElGRkVSX0lEXSA9IEJhc2VDb21wb25lbnQuZ2VuZXJhdGVVbmlxdWVJZChcInJvd19kaWZmZXJcIik7XG4gICAgICAgIC8vICAgICByb3dzW3Jvd0luZGV4XVtUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9ST1dfSURdID0gdGhpcy5idWlsZFJvd0lkKHJvd3Nbcm93SW5kZXhdLCByb3dJbmRleCk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICByZXR1cm4gcm93cztcbiAgICB9XG5cbiAgICByb3dUcmFja0J5Rm4oaWR4Om51bWJlciwgcm93OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHJvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9ST1dfRElGRkVSX0lEXTtcbiAgICB9XG5cbiAgICBjb2x1bW5IZWFkZXJUcmFja0J5Rm4oaWR4OiBudW1iZXIsIGNvbHVtbjogVGFibGVDb2x1bW5EaXJlY3RpdmUpIHtcbiAgICAgIHJldHVybiBjb2x1bW5bVGFibGVDb21wb25lbnQuSU5URVJOQUxfQ09MVU1OX0hFQURFUl9JRF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlZCB2dC1yb3cgYnkgaW5kZXguIFRoaXMgd2lsbCBub3Qgd29ya3MgZm9yIHJvd3MgdGhhdCBhcmUgY3JlYXRlZCBieSBkYXRhU291cmNlXG4gICAgICovXG4gICAgcmVtb3ZlVGFibGVSb3dCeUluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RhYmxlUm93ICE9IG51bGwgJiYgdGhpcy5fdGFibGVSb3cubGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhYmxlUm93ID0gXy5maWx0ZXIodGhpcy5fdGFibGVSb3csIChyb3csIHJvd0luZGV4KT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiByb3dJbmRleCAhPT0gaW5kZXg7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5jbGVhblVwQ2hpbGROb2RlcygpO1xuICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVkIHZ0LXJvdyBieSBpZC4gVGhpcyB3aWxsIG5vdCB3b3JrcyBmb3Igcm93cyB0aGF0IGFyZSBjcmVhdGVkIGJ5IGRhdGFTb3VyY2VcbiAgICAgKi9cbiAgICByZW1vdmVUYWJsZVJvd0J5SWQoaWQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5fdGFibGVSb3cgIT0gbnVsbCAmJiB0aGlzLl90YWJsZVJvdy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl90YWJsZVJvdyA9IF8uZmlsdGVyKHRoaXMuX3RhYmxlUm93LCAocm93KT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiByb3cuaWQgIT09IGlkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYW5VcENoaWxkTm9kZXMoKTtcbiAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b0NvbHVtbnMoY29sdW1uczogUXVlcnlMaXN0PFRhYmxlQ29sdW1uRGlyZWN0aXZlPik6IEFycmF5PFRhYmxlQ29sdW1uRGlyZWN0aXZlPiB7XG4gICAgICByZXR1cm4gY29sdW1ucy5tYXAoKGNvbCwgaWR4KT0+e1xuICAgICAgICBjb2xbVGFibGVDb21wb25lbnQuSU5URVJOQUxfQ09MVU1OX0hFQURFUl9JRF0gPSBCYXNlQ29tcG9uZW50LmdlbmVyYXRlVW5pcXVlSWQoXCJoY1wiKTtcbiAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcInZpc3VhbEluZGV4XCIsIGlkeCArICcnKTtcbiAgICAgICAgcmV0dXJuIGNvbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdG9XaG9sZU51bWJlcih3aWR0aDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiBwYXJzZUludCh3aWR0aCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja1Nob3dCbGFua1JvdygpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5kYXRhU291cmNlID09IG51bGwgfHxcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAodGhpcy50YWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5zY3JvbGxIZWlnaHQgPiAodGhpcy50YWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jbGllbnRIZWlnaHRcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNob3dCbGFua1JvdyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93QmxhbmtSb3cgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlbW92ZUZyb21UYWJsZVJvdyh3aHR2cjpzdHJpbmcpIHtcbiAgICAvLyAgIC8vbm8gaWRlYSB3aGF0IHRoaXMgZm9yXG4gICAgLy8gfVxuXG4gICAgLy8gcHJpdmF0ZSBhcHBlbmRIZWFkZXJUb0Zha2VUYWJsZSgpIHtcbiAgICAvLyAgIGlmICh0aGlzLmlzSGVhZGVyQXBwZW5kVG9GYWtlVGFibGUgIT09IHRydWUpIHtcbiAgICAvLyAgICAgdGhpcy5mYWtlVGFibGUubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCgkKHRoaXMudGFibGVIZWFkLm5hdGl2ZUVsZW1lbnQpLmNsb25lKClbMF0pO1xuICAgIC8vICAgICB0aGlzLmlzSGVhZGVyQXBwZW5kVG9GYWtlVGFibGUgPSB0cnVlO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgcm93IGZyb20gdGFibGVSb3dzIGJ5IGlkLiBubyBkZXRlY3QgY2hhbmdlXG4gICAgICogQHBhcmFtIGlkIHJvdyBlbGVtZW50IGlkXG4gICAgICovXG4gICAgcmVtb3ZlRnJvbVRhYmxlUm93KGlkOiBzdHJpbmcpe1xuICAgICAgY29uc3QgaSA9IHRoaXMudGFibGVSb3cuZmluZEluZGV4KHI9PnIuaWQgPT09IGlkKTtcbiAgICAgIHRoaXMudGFibGVSb3cuc3BsaWNlKGksIDEpO1xuICAgIH1cbn1cbiJdfQ==