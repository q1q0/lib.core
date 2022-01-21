/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var TableComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TableComponent, _super);
    /* istanbul ignore next */
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
    function TableComponent(parent, sessionService, el, changeDetectorRef, renderer, zone, differs, clipboardService) {
        var _this = _super.call(this, parent, sessionService, el, renderer) || this;
        _this.el = el;
        _this.changeDetectorRef = changeDetectorRef;
        _this.zone = zone;
        _this.clipboardService = clipboardService;
        _this.selectionMode = "singleRow";
        //use for virtual scrolling
        _this.rowHeight = 24;
        _this.scrollTimeout = 200;
        /* istanbul ignore next */
        _this.onChange = new EventEmitter();
        _this.onStateChange = new EventEmitter();
        _this.onDoubleClick = new EventEmitter();
        _this.onDragDrop = new EventEmitter();
        //custom sort function for virtual scroll
        _this.forceFixWidth = true;
        _this.isHeaderPadding = false;
        _this.isHeaderAuto = false;
        //table-layout default fixed
        _this.tableLayout = "fixed";
        //track dynamic rows so we can query for child later
        _this.nodes = [];
        _this.selectedRows = [];
        _this._prevSelectedRows = [];
        _this.scrollHandler = null;
        _this.previousRowIndex = null;
        _this.scrollSubject = new Subject();
        _this.prevScrollTop = 0;
        _this.prevScrollTopForHiddenHeader = 0;
        _this.sortDirection = "";
        _this.sortColumnId = 0;
        _this.theadHeight = 0;
        _this.scrollLeft = 0;
        _this.adjustedRows = 0;
        _this.preMouseEvent = null;
        _this.dataSourceDiffer = differs.find([]).create();
        _this.columnsDiffer = differs.find([]).create();
        _this.customRowDiffer = differs.find([]).create();
        _this.isIE9 = isIE() == 9;
        //for virtual scroll
        //for virtual scroll
        _this.virtualScrollDataSourceDiffer = differs.find([]).create();
        _this.keyupHandler = function (evt) { return _this.handleKeyUp(evt); };
        _this.scrollHandler = function (event) {
            if (_this._disabledScrolling === true) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (_this.prevScrollTopForHiddenHeader !== event.srcElement.scrollTop) {
                if (!_this.skipGhostHeader) {
                    _this.renderer.setStyle(_this.ghostHeader.nativeElement, "display", "inline-block");
                    if (_this.controlWidth === "100%") {
                        _this.renderer.setStyle(_this.ghostHeader.nativeElement, "width", "100%");
                    }
                    _this.renderer.setStyle(_this.tableHead.nativeElement, "visibility", "hidden");
                }
                //   if(this.forceFixWidth){
                //     this.renderer.setStyle(this.fakeTable.nativeElement, "table-layout", "fixed");
                //   }
                if (_this.tableFoot != null) {
                    _this.renderer.setStyle(_this.tableFoot.nativeElement, "visibility", "hidden");
                }
                //   this.appendHeaderToFakeTable();
                if (_this.virtualScroll === true) {
                    if (_this.animationFrameId != null) {
                        cancelAnimationFrame(_this.animationFrameId);
                    }
                    _this.adjustTableHead(event, false, true);
                }
            }
            _this.prevScrollTopForHiddenHeader = event.srcElement.scrollTop;
            //disabled for IE11/IE9 (too slow)
            // else {
            //     if (this.animationFrameId != null) {
            //         cancelAnimationFrame(this.animationFrameId);
            //    }
            //     this.animationFrameId = requestAnimationFrame(()=>this.adjustTableHead(event, true));
            // }
            //disabled for IE11/IE9 (too slow)
            // else {
            //     if (this.animationFrameId != null) {
            //         cancelAnimationFrame(this.animationFrameId);
            //    }
            //     this.animationFrameId = requestAnimationFrame(()=>this.adjustTableHead(event, true));
            // }
            _this.scrollSubject.next(event);
        };
        return _this;
    }
    Object.defineProperty(TableComponent.prototype, "dataSource", {
        get: /**
         * @return {?}
         */
        function () {
            return this.virtualScroll === true ? this._virtualViewPort : this._dataSource;
        },
        set: /**
         * @param {?} ds
         * @return {?}
         */
        function (ds) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "tableColumns", {
        set: /**
         * @param {?} columns
         * @return {?}
         */
        function (columns) {
            this.clearHeaderNodes();
            this.columns = this.toColumns(columns);
            if (this._isViewInit === true) {
                this.initPlugins();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "tableRowQuery", {
        //table with no datasource
        set: /**
         * @param {?} rows
         * @return {?}
         */
        function (rows) {
            this.cleanUpChildNodes();
            this._tableRow = [];
            this.detectChanges();
            this._tableRow = rows.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "tableRow", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tableRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "ROW_INDEX_KEY", {
        get: /**
         * @return {?}
         */
        function () {
            return '$$$$rowIndex$$$$';
        },
        enumerable: true,
        configurable: true
    });
    /* istanbul ignore next */
    /**
     * 画面がリサイズされた際に動かすイベント
     */
    /**
     * 画面がリサイズされた際に動かすイベント
     * @return {?}
     */
    TableComponent.prototype.tableResize = /**
     * 画面がリサイズされた際に動かすイベント
     * @return {?}
     */
    function () {
        this.adjustTableFooter();
    };
    /* istanbul ignore next */
    /**
     * Do check lifecycle
     */
    /**
     * Do check lifecycle
     * @return {?}
     */
    TableComponent.prototype.ngDoCheck = /**
     * Do check lifecycle
     * @return {?}
     */
    function () {
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
    };
    /**
     * Init lifecycle. Call parent class ngOnInit
     */
    /**
     * Init lifecycle. Call parent class ngOnInit
     * @return {?}
     */
    TableComponent.prototype.ngOnInit = /**
     * Init lifecycle. Call parent class ngOnInit
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
    };
    /* istanbul ignore next */
    /**
     * After view init lifecycle. Apply jQuery plugin and event listeners
     */
    /**
     * After view init lifecycle. Apply jQuery plugin and event listeners
     * @return {?}
     */
    TableComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Apply jQuery plugin and event listeners
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        /** @type {?} */
        var view = this._getNoneActiveViewParent() || this.getParentView();
        if (view != null && this.columns != null) {
            this.columns.filter(function (col) { return col.id != null && col.id !== ""; }).forEach(function (col) {
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
                drop: function (event, ui) {
                    _this.onDragDrop.emit();
                },
                tolerance: "pointer"
            });
        }
        this.scrollSubcription = this.scrollSubject.pipe(debounce(function () { return timer(_this.scrollTimeout); })).subscribe(function (event) {
            _this.renderer.removeAttribute(_this.ghostHeader.nativeElement, "display");
            /* istanbul ignore next */
            if (_this.virtualScroll === true) {
                _this.recalculateVirtualScrollData(event);
            }
            else {
                _this.adjustTableHead(event);
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
        this.zone.runOutsideAngular(function () {
            _this._isViewInit = true;
            _this.initPlugins();
            _this.zone.runOutsideAngular(function () {
                _this.el.nativeElement.addEventListener('scroll', _this.scrollHandler, true);
                // this.el.nativeElement.addEventListener("mouseup", this.mouseUpHandler, true);
                // this.el.nativeElement.addEventListener("mouseup", this.mouseUpHandler, true);
                _this.el.nativeElement.addEventListener("keyup", _this.keyupHandler, true);
            });
        });
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.initPlugins = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.$dragableColumns) {
            this.$dragableColumns.destroy();
        }
        if (this.initTm != null) {
            clearTimeout(this.initTm);
        }
        // if (this.table) {
        this.renderer.setStyle(this.table.nativeElement, "visibility", "hidden");
        this.initTm = setTimeout(function () {
            if (_this.table) {
                _this.renderer.setStyle(_this.table.nativeElement, "visibility", "hidden");
                // 再表示時にスクロールバーの位置を戻す
                // 再表示時にスクロールバーの位置を戻す
                _this.tableContainer.nativeElement.scrollLeft = 0;
                /** @type {?} */
                var jQueryTable = jQuery(_this.table.nativeElement);
                if (_this.enableColumnDragging == null || _this.enableColumnDragging === true) {
                    _this.$dragableColumns = jQueryTable.dragableColumns({
                        dropCallback: function (fromIndex, toIndex) { return _this.swapColumns(fromIndex, toIndex); },
                        dragEndCallback: function () {
                            _this.skipGhostHeader = false;
                            _this.scrollContainerStyles["overflow-y"] = "auto";
                            _this.detectChanges();
                            _this._disabledScrolling = false;
                        },
                        dragStartCallback: function (colIdx) {
                            _this.skipGhostHeader = true;
                            /** @type {?} */
                            var canDrag = _this.canDragColumn(colIdx);
                            if (canDrag) {
                                _this.scrollContainerStyles["overflow-y"] = "hidden";
                                _this.detectChanges();
                                _this._disabledScrolling = true;
                            }
                            return canDrag;
                        },
                        dragEnterCallback: function (colIdx) {
                            return _this.canDragColumn(colIdx);
                        }
                    });
                }
                if ((_this.enableSort == null || _this.enableSort === true) && _this.$tablesorter == null) {
                    if (_this.virtualScroll !== true) {
                        _this.$tablesorter = jQueryTable.tablesorter({
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
                else if (_this.virtualScroll !== true && _this.$tablesorter != null) {
                    _this.$tablesorter.trigger("updateHeaders");
                }
                _this.setHeaderWidthHeight();
                if (_this.enableColumnResize == null || _this.enableColumnResize === true) {
                    /** @type {?} */
                    var target_columns = new Array();
                    /** @type {?} */
                    var original_columnWidths = new Array();
                    var _loop_1 = function (i) {
                        /** @type {?} */
                        var column = _this.columns.find(function (item, idx) { return idx === i; });
                        if (column != null) {
                            /** @type {?} */
                            var headChildren = _this.tableHead.nativeElement.querySelector('th:nth-child(' + (i + 1) + ')');
                            target_columns.push(headChildren);
                            original_columnWidths.push(headChildren.style.width);
                        }
                    };
                    for (var i = 0; i < _this.columns.length; i++) {
                        _loop_1(i);
                    }
                    //reset
                    //reset
                    _this._cleanupColResize();
                    _this.$colResizable = jQueryTable.colResizable({
                        liveDrag: false,
                        //turning this on will incurred a severe performance penalty on IE so leave it off
                        resizeMode: 'overflow',
                        partialRefresh: true,
                        //After closing the window and opening again, columnResizer can't work. To fix that, this value is needed.,
                        headerOnly: true //allow dragging using header only
                    });
                    for (var i = 0; i < target_columns.length; i++) {
                        /** @type {?} */
                        var targetColumn = target_columns[i];
                        /** @type {?} */
                        var headChildren_width = _this.toWholeNumber(targetColumn.style.width.slice(0, -2));
                        /** @type {?} */
                        var originalChildren_width = _this.toWholeNumber(original_columnWidths[i]);
                        // if(headChildren_width < originalChildren_width){
                        // if(headChildren_width < originalChildren_width){
                        _this.renderer.setStyle(targetColumn, "width", original_columnWidths[i]);
                        // }
                    }
                    target_columns = null;
                    original_columnWidths = null;
                }
                _this.adjustTableFooter();
                _this.renderer.setStyle(_this.table.nativeElement, "table-layout", _this.tableLayout);
            }
            if (_this.table != null) {
                _this.renderer.removeStyle(_this.table.nativeElement, "visibility");
            }
        }, 200);
        //}
    };
    /* istanbul ignore next */
    /**
     * Destroy lifecycle. Remove event listeners
     */
    /**
     * Destroy lifecycle. Remove event listeners
     * @return {?}
     */
    TableComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Remove event listeners
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this.cleanUpChildNodes(true);
        this.clearHeaderNodes(true);
        /** @type {?} */
        var view = this._getNoneActiveViewParent() || this.getParentView();
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
    };
    /**
     * Check to see if columns have changes
     * @return {?}
     */
    TableComponent.prototype.checkColumnsForChanged = /**
     * Check to see if columns have changes
     * @return {?}
     */
    function () {
        if (this.columns != null && this.columnsDiffer.diff(this.columns.map(function (item) {
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
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.checkCustomRowsForChanged = /**
     * @return {?}
     */
    function () {
        if (this._tableRow != null && this.customRowDiffer.diff(/** @type {?} */ (this._tableRow))) {
            this.checkShowBlankRow();
            this.markForCheck();
        }
    };
    /**
     * @param {?=} nullOutHeadNode
     * @return {?}
     */
    TableComponent.prototype.clearHeaderNodes = /**
     * @param {?=} nullOutHeadNode
     * @return {?}
     */
    function (nullOutHeadNode) {
        if (nullOutHeadNode === void 0) { nullOutHeadNode = false; }
        var e_1, _a;
        if (this.headNode != null) {
            if (this.headNode.childNodes != null && this.headNode.childNodes.length > 0) {
                try {
                    for (var _b = tslib_1.__values(this.headNode.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var node = _c.value;
                        /** @type {?} */
                        var parentView = this.getParentView();
                        if (parentView != null) {
                            parentView.removeViewChildFromMap(node.getId());
                        }
                        node.destroy();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            this.headNode.childNodes = [];
        }
        if (nullOutHeadNode === true) {
            this.headNode = null;
        }
    };
    /**
     * Clean up our faux table children
     * @param {?=} skipTrackingVirtualRow
     * @return {?}
     */
    TableComponent.prototype.cleanUpChildNodes = /**
     * Clean up our faux table children
     * @param {?=} skipTrackingVirtualRow
     * @return {?}
     */
    function (skipTrackingVirtualRow) {
        if (skipTrackingVirtualRow === void 0) { skipTrackingVirtualRow = false; }
        var e_2, _a;
        if (this.nodes != null) {
            /** @type {?} */
            var parentView = this.getParentView();
            try {
                for (var _b = tslib_1.__values(this.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var node = _c.value;
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
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        this.nodes = [];
        if (this.virtualScroll !== true) {
            this.selectedRows = [];
        }
        this._prevSelectedRows = [];
        this.lastSelectedRowIndex = null;
    };
    /**
     * Get the datasource row count
     * @returns Number of rows in [[dataSource]]
     */
    /**
     * Get the datasource row count
     * @return {?} Number of rows in [[dataSource]]
     */
    TableComponent.prototype.getRowCount = /**
     * Get the datasource row count
     * @return {?} Number of rows in [[dataSource]]
     */
    function () {
        return this._dataSource ? this._dataSource.length : 0;
    };
    /* istanbul ignore next */
    /**
     * Add/remove row to list of selected rows
     * @param row
     * @param isSelected If true, row will be added, otherwise row will be removed from selected rows collection
     */
    /**
     * Add/remove row to list of selected rows
     * @param {?} row
     * @param {?} isSelected If true, row will be added, otherwise row will be removed from selected rows collection
     * @return {?}
     */
    TableComponent.prototype.selectRow = /**
     * Add/remove row to list of selected rows
     * @param {?} row
     * @param {?} isSelected If true, row will be added, otherwise row will be removed from selected rows collection
     * @return {?}
     */
    function (row, isSelected) {
        /** @type {?} */
        var rowIndex = -1;
        if (this.virtualScroll === true) {
            /** @type {?} */
            var tempNode = _.find(this.nodes, function (node) {
                return node === row;
            });
            if (tempNode != null) {
                rowIndex = tempNode[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
            }
        }
        else {
            rowIndex = _.findIndex(this.nodes, function (node) {
                return node === row;
            });
        }
        if (rowIndex >= 0 && rowIndex < this._dataSource.length) {
            /** @type {?} */
            var idx = _.findIndex(this.selectedRows, function (row) {
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
    };
    /* istanbul ignore next */
    /**
     * Event handler for click on row
     * @param event Mouse click event
     * @param rowIndex Index of the row that was clicked
     * @event onStateChange
     */
    /**
     * Event handler for click on row
     * \@event onStateChange
     * @param {?} event Mouse click event
     * @param {?} rowIndex Index of the row that was clicked
     * @return {?}
     */
    TableComponent.prototype.onRowClick = /**
     * Event handler for click on row
     * \@event onStateChange
     * @param {?} event Mouse click event
     * @param {?} rowIndex Index of the row that was clicked
     * @return {?}
     */
    function (event, rowIndex) {
        /** @type {?} */
        var parentView = this.getParentView();
        /* istanbul ignore if */
        if (parentView != null) {
            parentView.addViewChildToMap(this.nodes[rowIndex]);
            if (this.previousRowIndex != null && this.nodes[this.previousRowIndex] != null) {
                parentView.removeViewChildFromMap(this.nodes[this.previousRowIndex].getId());
            }
        }
        this.previousRowIndex = rowIndex;
        this.triggerStateChange();
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.triggerStateChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        if (this.getParentView() != null) {
            clientEvent.setParameter("screenId", this.getParentView().getId());
        }
        clientEvent.setParameter("id", this.getId());
        /** @type {?} */
        var rowId = this.selectedRows.map(function (idx) { return _this.getChildByOriginalRowIndex(idx).getId(); }).join(",");
        clientEvent.setParameter("rowId", rowId);
        this.getSession().getEventHandler().setClientEvent(clientEvent);
        this.onStateChange.emit();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    TableComponent.prototype.getChildByOriginalRowIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var node = this.nodes[index];
        if (this.virtualScroll === true) {
            node = _.find(this.nodes, function (el) {
                return el[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] === index;
            });
        }
        return node;
    };
    /**
     * @param {?} event
     * @param {?} rowIndex
     * @param {?} row
     * @return {?}
     */
    TableComponent.prototype.handleMouseUp = /**
     * @param {?} event
     * @param {?} rowIndex
     * @param {?} row
     * @return {?}
     */
    function (event, rowIndex, row) {
        //for draggale rows, we need to double check row selection again
        if (this.draggableRows === true && this.shouldHandleMouseUp === true) {
            this.toggleRowSelection(event, rowIndex, row, true);
        }
        this.shouldHandleMouseUp = false;
    };
    /* istanbul ignore next */
    /**
     * Set row as selected/unselected
     * @param rowIndex Index of row to toggle on/off
     */
    /**
     * Set row as selected/unselected
     * @param {?} event
     * @param {?} rowIndex Index of row to toggle on/off
     * @param {?} row
     * @param {?=} isMouseUp
     * @return {?}
     */
    TableComponent.prototype.toggleRowSelection = /**
     * Set row as selected/unselected
     * @param {?} event
     * @param {?} rowIndex Index of row to toggle on/off
     * @param {?} row
     * @param {?=} isMouseUp
     * @return {?}
     */
    function (event, rowIndex, row, isMouseUp) {
        if (isMouseUp === void 0) { isMouseUp = false; }
        /** @type {?} */
        var targetEl = /** @type {?} */ (event.target);
        if (targetEl.tagName.toLowerCase() == 'input' && targetEl.getAttribute('type') != null) {
            if (targetEl.getAttribute('type').toLowerCase() == 'radio') {
                return;
            }
        }
        if (targetEl.tagName.toLowerCase() == 'button') {
            return;
        }
        /** @type {?} */
        var actualRowIndex = rowIndex;
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
                var clearSelection = true;
                if (this.draggableRows === true && isMouseUp !== true && this.selectedRows.indexOf(actualRowIndex) >= 0) {
                    clearSelection = false;
                    this.shouldHandleMouseUp = true;
                }
                if (clearSelection) {
                    this.selectedRows.splice(0, this.selectedRows.length);
                }
            }
            /** @type {?} */
            var idx = _.findIndex(this.selectedRows, function (row) {
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
                                for (var i = rowIndex; i < this.lastSelectedRowIndex; i++) {
                                    this.selectedRows.push(this.getOriginalIndex(i));
                                }
                            }
                            else if (this.lastSelectedRowIndex < rowIndex) {
                                for (var i = this.lastSelectedRowIndex + 1; i <= rowIndex; i++) {
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
    };
    /**
     * return the actual indexes base on datasource
     *
     * @param {?} index
     * @return {?}
     */
    TableComponent.prototype.getOriginalIndex = /**
     * return the actual indexes base on datasource
     *
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.virtualScroll === true && this.nodes[index] != null) {
            return this.nodes[index][TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
        }
        return index;
    };
    /**
     * Set [[disabled]] property value
     * @param boo Toggle [[disabled]]
     */
    /**
     * Set [[disabled]] property value
     * @param {?} boo Toggle [[disabled]]
     * @return {?}
     */
    TableComponent.prototype.setDisabled = /**
     * Set [[disabled]] property value
     * @param {?} boo Toggle [[disabled]]
     * @return {?}
     */
    function (boo) {
        this.disabled = boo;
    };
    /**
     * Get [[disabled]] property value
     */
    /**
     * Get [[disabled]] property value
     * @return {?}
     */
    TableComponent.prototype.getDisabled = /**
     * Get [[disabled]] property value
     * @return {?}
     */
    function () {
        return this.disabled;
    };
    /* istanbul ignore next */
    /**
     * Get a collection of all row elements that are selected
     * @returns The selected rows
     */
    /**
     * Get a collection of all row elements that are selected
     * @return {?} The selected rows
     */
    TableComponent.prototype.getSelectedRows = /**
     * Get a collection of all row elements that are selected
     * @return {?} The selected rows
     */
    function () {
        var e_3, _a, e_4, _b;
        /** @type {?} */
        var selectedRowElements = [];
        /* istanbul ignore if */
        if (this.selectedRows.length > 0 && this.nodes != null && this.nodes.length > 0) {
            try {
                for (var _c = tslib_1.__values(this.selectedRows), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var rowIndex = _d.value;
                    try {
                        for (var _e = tslib_1.__values(this.nodes), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var node = _f.value;
                            if (node.getLocalName() === "row" && node.rowNumber === rowIndex) {
                                selectedRowElements.push(node);
                                break;
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return selectedRowElements;
    };
    /* istanbul ignore next */
    /**
     * Get collection of selected row indexes
     */
    /**
     * Get collection of selected row indexes
     * @return {?}
     */
    TableComponent.prototype.getSelectedRowIndexes = /**
     * Get collection of selected row indexes
     * @return {?}
     */
    function () {
        var _this = this;
        return this.selectedRows.map(function (row) {
            return row[_this.ROW_INDEX_KEY];
        });
    };
    /**
     * Event handler for row select event
     * @param event
     */
    /**
     * Event handler for row select event
     * @param {?} event
     * @return {?}
     */
    TableComponent.prototype.handleRowSelection = /**
     * Event handler for row select event
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /* istanbul ignore next */
        if (!_.isEqual(event.selected, this._prevSelectedRows)) {
            this.onChange.emit(new TableSelectionEvent(event.selected));
        }
        this._prevSelectedRows = event.selected;
    };
    /**
     * Event handler for double click on cell
     * @param event
     * @event onDoubleClick
     */
    /**
     * Event handler for double click on cell
     * \@event onDoubleClick
     * @param {?} event
     * @return {?}
     */
    TableComponent.prototype.handleCellActivation = /**
     * Event handler for double click on cell
     * \@event onDoubleClick
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.type === 'dblclick') {
            this.onDoubleClick.emit(new TableSelectionEvent(event.row));
        }
    };
    //internal
    /**
     * @param {?} row
     * @param {?} rowIndex
     * @return {?}
     */
    TableComponent.prototype.appendRowIndexToRow = /**
     * @param {?} row
     * @param {?} rowIndex
     * @return {?}
     */
    function (row, rowIndex) {
        row[this.ROW_INDEX_KEY] = rowIndex;
    };
    /* istanbul ignore */
    /**
     * Trigger change detection and re-render the table
     * @param clearData Set to true to empty table data
     */
    /**
     * Trigger change detection and re-render the table
     * @param {?=} clearData Set to true to empty table data
     * @return {?}
     */
    TableComponent.prototype.refresh = /**
     * Trigger change detection and re-render the table
     * @param {?=} clearData Set to true to empty table data
     * @return {?}
     */
    function (clearData) {
        if (clearData === void 0) { clearData = false; }
        if (clearData == true) {
            this._dataSource = [];
        }
        this.detectChanges();
    };
    /* istanbul ignore next */
    /**
     * Get [[changeDetectorRef]] property
     * @return the ChangeDetector
     */
    /**
     * Get [[changeDetectorRef]] property
     * @return {?} the ChangeDetector
     */
    TableComponent.prototype.getChangeDetector = /**
     * Get [[changeDetectorRef]] property
     * @return {?} the ChangeDetector
     */
    function () {
        return this.changeDetectorRef;
    };
    /**
     * Get NexaWeb tag name
     * @returns Tag name
     */
    /**
     * Get NexaWeb tag name
     * @return {?} Tag name
     */
    TableComponent.prototype.getNxTagName = /**
     * Get NexaWeb tag name
     * @return {?} Tag name
     */
    function () {
        return "table";
    };
    /* istanbul ignore next */
    /**
     * Conver the content of this screens to JSON object so it can be sent to the server.
     */
    /**
     * Conver the content of this screens to JSON object so it can be sent to the server.
     * @return {?}
     */
    TableComponent.prototype.toJson = /**
     * Conver the content of this screens to JSON object so it can be sent to the server.
     * @return {?}
     */
    function () {
        var _this = this;
        var e_5, _a;
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        // if (this.getSelectedRows() != null && this.getSelectedRows().length > 0) {
        //     this.setJson(json, "selectedRows", this.getSelectedRows().map(item=>item.toJson()));
        // }
        if (this.nodes != null &&
            this.nodes.length > 0) {
            /** @type {?} */
            var tempRows_1 = void 0;
            if (this.virtualScroll === true) {
                tempRows_1 = {};
            }
            json["rows"] = this.nodes.map(function (node, index) {
                /** @type {?} */
                var rowJson = node.toJson();
                if (_this.selectedRows != null && _this.selectedRows.indexOf(index) >= 0) {
                    rowJson["selected"] = "true";
                    rowJson["index"] = index + "";
                }
                if (_this.virtualScroll === true) {
                    tempRows_1[node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
                }
                return rowJson;
            });
            //virtual scroll data
            if (this.virtualScroll === true && this.modifiedVirtualRowsJson != null) {
                /** @type {?} */
                var keys = _.keys(this.modifiedVirtualRowsJson);
                try {
                    for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                        var key = keys_1_1.value;
                        //make sure we not already converted them
                        if (tempRows_1[key] == null) {
                            json["rows"].push(this.modifiedVirtualRowsJson[key]);
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        if (this.columns != null && this.columns.length > 0) {
            /** @type {?} */
            var columns = this.columns;
            if (this.getLocalName() === "table" &&
                this.columnsHasBeenSwapped === true) {
                columns = /** @type {?} */ (_.orderBy(columns, function (child) {
                    return child.originalColumnIndex;
                }));
            }
            json["columnDefs"] = columns.map(function (column, index) {
                /** @type {?} */
                var def = {
                    "visible": _this.toJsonValue(column.visible),
                    "locked": _this.toJsonValue(column.locked),
                    "enabled": _this.toJsonValue(column.enabled),
                    "sortable": _this.toJsonValue(column.sortable),
                    "isChecked": _this.toJsonValue(column.isChecked),
                    "customAttributes": BaseComponent.mapToJson(column.customAttributes)
                };
                // make sure customAttributes has 'width' property
                if (def["customAttributes"]["width"] != null) {
                    /** @type {?} */
                    var node = _this.headNode.getChildAt(index);
                    /** @type {?} */
                    var width = _this.toWholeNumber(node.htmlElement.style.width.slice(0, -2)); //server expect whole number
                    def["customAttributes"]["width"] = _this.toJsonValue(width);
                }
                if (column.id) {
                    def["id"] = _this.toJsonValue(column.id);
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
                var header = {
                    "tagName": "header",
                    "nxTagName": "header",
                    "text": _this.toJsonValue(column.header)
                };
                if (column.headerDirective && column.headerDirective.id) {
                    header["id"] = _this.toJsonValue(column.headerDirective.id);
                }
                else {
                    header["id"] = BaseComponent.generateUniqueId("header");
                }
                def["children"] = [header];
                return def;
            });
        }
        return json;
    };
    /* istanbul ignore next */
    /**
     * Convert child to JSON
     * @param child child to be converted to JSON
     */
    /**
     * Convert child to JSON
     * @param {?} child child to be converted to JSON
     * @return {?}
     */
    TableComponent.prototype.childToJson = /**
     * Convert child to JSON
     * @param {?} child child to be converted to JSON
     * @return {?}
     */
    function (child) {
        return child.getTagName() === "headrow" || child.getTagName() === "headcell" ? child.toJson() : null;
    };
    /* istanbul ignore next */
    /**
     * Add element to internal list of row, cell, or header cell
     * @param type 'row' | 'cell' | 'headcell'
     * @param event Create event
     * @param rowOrColumnIndex
     * @param rowDataOrColumnDef
     */
    /**
     * Add element to internal list of row, cell, or header cell
     * @param {?} type 'row' | 'cell' | 'headcell'
     * @param {?} event Create event
     * @param {?} rowOrColumnIndex
     * @param {?} rowDataOrColumnDef
     * @return {?}
     */
    TableComponent.prototype.registerFauxElement = /**
     * Add element to internal list of row, cell, or header cell
     * @param {?} type 'row' | 'cell' | 'headcell'
     * @param {?} event Create event
     * @param {?} rowOrColumnIndex
     * @param {?} rowDataOrColumnDef
     * @return {?}
     */
    function (type, event, rowOrColumnIndex, rowDataOrColumnDef) {
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
    };
    /**
     * Get [[nodes]] property
     * @returns Node list
     */
    /**
     * Get [[nodes]] property
     * @return {?} Node list
     */
    TableComponent.prototype.getTableChildren = /**
     * Get [[nodes]] property
     * @return {?} Node list
     */
    function () {
        return this.nodes;
    };
    /**
     * Get number of nodes
     * @returns Number of nodes
     */
    /**
     * Get number of nodes
     * @return {?} Number of nodes
     */
    TableComponent.prototype.getChildCount = /**
     * Get number of nodes
     * @return {?} Number of nodes
     */
    function () {
        return this.nodes != null ? this.nodes.length : 0;
    };
    /**
     * Get all children of this table
     * @return List of children
     */
    /**
     * Get all children of this table
     * @return {?} List of children
     */
    TableComponent.prototype.getChildren = /**
     * Get all children of this table
     * @return {?} List of children
     */
    function () {
        /** @type {?} */
        var children = new Vector();
        _.forEach(this.getTableChildren(), function (child) { return children.add(child); });
        return children;
    };
    /**
     *
     * @param xpathExpression Get query result from an xpath expression string
     */
    /**
     *
     * @param {?} xpathExpression Get query result from an xpath expression string
     * @return {?}
     */
    TableComponent.prototype.evaluateXPath = /**
     *
     * @param {?} xpathExpression Get query result from an xpath expression string
     * @return {?}
     */
    function (xpathExpression) {
        /** @type {?} */
        var result = new Vector();
        /** @type {?} */
        var xpathResult = document.evaluate(xpathExpression.replace("cell[", "td[").replace("row[", "tr["), this.elementRef.nativeElement, null, XPathResult.ANY_TYPE, null);
        if (xpathResult != null) {
            /** @type {?} */
            var node = xpathResult.iterateNext();
            while (node) {
                result.add(node);
                node = xpathResult.iterateNext();
            }
        }
        return result;
    };
    /**
     *
     * @param childOrArrayOrStringWtf
     * @param rowNumber
     */
    /* istanbul ignore next */
    /**
     *
     * @param {?} childOrArrayOrStringWtf
     * @param {?=} rowNumber
     * @return {?}
     */
    TableComponent.prototype.appendChild = /**
     *
     * @param {?} childOrArrayOrStringWtf
     * @param {?=} rowNumber
     * @return {?}
     */
    function (childOrArrayOrStringWtf, rowNumber) {
        if (rowNumber === void 0) { rowNumber = -1; }
        //TODO need to append child to certain row? dpending on childOrArrayOrStringWtf
    };
    /**
     * Check if the row has been selected
     * @param rowIndex Index of row to check
     * @returns True if row is a selected row
     */
    /**
     * Check if the row has been selected
     * @param {?} rowIndex Index of row to check
     * @param {?} row
     * @return {?} True if row is a selected row
     */
    TableComponent.prototype.isSelectedRow = /**
     * Check if the row has been selected
     * @param {?} rowIndex Index of row to check
     * @param {?} row
     * @return {?} True if row is a selected row
     */
    function (rowIndex, row) {
        if (this.virtualScroll === true && row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] != null) {
            rowIndex = row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
        }
        return this.selectedRows != null && this.selectedRows.indexOf(rowIndex) >= 0;
    };
    /* istanbul ignore next */
    /**
     * Get custom attributes of row if it has any, otherwise return null
     * @param row
     * @param rowOrColumnIndex
     */
    /**
     * Get custom attributes of row if it has any, otherwise return null
     * @param {?} row
     * @param {?} rowOrColumnIndex
     * @return {?}
     */
    TableComponent.prototype.getRowCustomAttributes = /**
     * Get custom attributes of row if it has any, otherwise return null
     * @param {?} row
     * @param {?} rowOrColumnIndex
     * @return {?}
     */
    function (row, rowOrColumnIndex) {
        if (typeof this.rowCustomAttributeBuilder === "function") {
            return this.rowCustomAttributeBuilder(row, rowOrColumnIndex, /** @type {?} */ ((this._getNoneActiveViewParent() || this.getParentView())));
        }
        if (row != null && row.customAttributes) {
            return row.customAttributes;
        }
        return null;
    };
    /**
     * Check if column is visible. Either by index or column
     * @param index
     * @param column
     * @returns True if column is visible
     */
    /**
     * Check if column is visible. Either by index or column
     * @param {?} index
     * @param {?=} column
     * @return {?} True if column is visible
     */
    TableComponent.prototype.isColumnVisible = /**
     * Check if column is visible. Either by index or column
     * @param {?} index
     * @param {?=} column
     * @return {?} True if column is visible
     */
    function (index, column) {
        if (column === void 0) { column = null; }
        if (column != null) {
            return column.visible;
        }
        return this.columns.find(function (item, idx) { return idx === index; }).visible;
    };
    /* istanbul ignore next */
    /**
     * Add a child component to the table
     * @param child Component to add
     */
    /**
     * Add a child component to the table
     * @param {?} child Component to add
     * @return {?}
     */
    TableComponent.prototype.addChild = /**
     * Add a child component to the table
     * @param {?} child Component to add
     * @return {?}
     */
    function (child) {
        var _this = this;
        _super.prototype.addChild.call(this, child);
        /** @type {?} */
        var row = this.nodes[this.nodes.length - 1];
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
                    var sortValue = child.getAttribute("sortValue", true);
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
                    var columnIdx_1 = row.childNodes.length - 1;
                    //has cached data?
                    if (this.modifiedVirtualRows != null &&
                        this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] != null &&
                        this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx_1]["originalColumnIndex"]] != null) {
                        /** @type {?} */
                        var temp = this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx_1]["originalColumnIndex"]];
                        if (temp.text !== undefined) {
                            (/** @type {?} */ (child)).setText(temp.text);
                        }
                        (/** @type {?} */ (child)).setChecked(temp.checked, true);
                    }
                    child._internalChangeCb = function (comp) {
                        _this._checkInitModifiedVirtualRows();
                        if (_this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] == null) {
                            _this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = {};
                        }
                        _this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx_1]["originalColumnIndex"]] = {
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
    };
    /* istanbul ignore next */
    /**
     * 選択中の行を削除する
     */
    /**
     * 選択中の行を削除する
     * @return {?}
     */
    TableComponent.prototype.removeSelectedRow = /**
     * 選択中の行を削除する
     * @return {?}
     */
    function () {
        var e_6, _a, e_7, _b, e_8, _c;
        if (this.selectedRows.length > 0) {
            /** @type {?} */
            var selected = this.selectedRows.concat().sort(function (v1, v2) { return v2 - v1; });
            try {
                for (var selected_1 = tslib_1.__values(selected), selected_1_1 = selected_1.next(); !selected_1_1.done; selected_1_1 = selected_1.next()) {
                    var idx = selected_1_1.value;
                    /** @type {?} */
                    var child = this.nodes[idx];
                    try {
                        for (var _d = tslib_1.__values(child.childNodes), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var target = _e.value;
                            this.removeChild(target.getComponent());
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    child.destroy();
                    this.nodes.splice(idx, 1);
                    this.dataSource.splice(idx, 1);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (selected_1_1 && !selected_1_1.done && (_a = selected_1.return)) _a.call(selected_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
            /** @type {?} */
            var rowNumber = 0;
            try {
                for (var _f = tslib_1.__values(this.nodes), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var row = _g.value;
                    row.rowNumber = rowNumber++;
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                }
                finally { if (e_8) throw e_8.error; }
            }
            this.selectedRows = [];
        }
    };
    /**
     * Check if this is a container component
     * @returns True
     */
    /**
     * Check if this is a container component
     * @return {?} True
     */
    TableComponent.prototype.isContainer = /**
     * Check if this is a container component
     * @return {?} True
     */
    function () {
        return true;
    };
    /**
     * Add row to list of nodes
     * @param {?} event
     * @param {?} rowOrColumnIndex
     * @param {?} rowData
     * @return {?}
     */
    TableComponent.prototype.trackRow = /**
     * Add row to list of nodes
     * @param {?} event
     * @param {?} rowOrColumnIndex
     * @param {?} rowData
     * @return {?}
     */
    function (event, rowOrColumnIndex, rowData) {
        /** @type {?} */
        var row = new HTMLElementWrapper(this.renderer, "", this.getSession());
        row.rowNumber = rowOrColumnIndex;
        row.htmlElement = /** @type {?} */ (event.element.nativeElement);
        this.setParentScreenId(row);
        row.setLocaleName("row");
        /** @type {?} */
        var customAttributes = this.getRowCustomAttributes(rowData, rowOrColumnIndex);
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
    };
    /**
     * @param {?} rowIndex
     * @param {?} rowData
     * @return {?}
     */
    TableComponent.prototype.toRowIndex = /**
     * @param {?} rowIndex
     * @param {?} rowData
     * @return {?}
     */
    function (rowIndex, rowData) {
        return this.virtualScroll === true && rowData != null ? rowData[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] : rowIndex;
    };
    /**
     * Add cell to list of nodes
     * @param {?} event
     * @param {?} columnIndex
     * @param {?} columnDef
     * @return {?}
     */
    TableComponent.prototype.trackCell = /**
     * Add cell to list of nodes
     * @param {?} event
     * @param {?} columnIndex
     * @param {?} columnDef
     * @return {?}
     */
    function (event, columnIndex, columnDef) {
        /** @type {?} */
        var cell = new HTMLElementWrapper(this.renderer, "", this.getSession());
        cell.htmlElement = /** @type {?} */ (event.element.nativeElement);
        cell.setLocaleName("cell");
        if (columnDef.customAttributes !== undefined) {
            if (!cell.getAttribute("class")) {
                cell.setAttribute("class", columnDef.customAttributes["class"]);
            }
            else {
                /** @type {?} */
                var orgClass = cell.getAttribute("class");
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
    };
    /**
     * @param {?} event
     * @param {?} columnDef
     * @return {?}
     */
    TableComponent.prototype.trackHeadCell = /**
     * @param {?} event
     * @param {?} columnDef
     * @return {?}
     */
    function (event, columnDef) {
        if (this.headNode == null) {
            this.headNode = new HTMLElementWrapper(this.renderer, "", this.getSession());
            this.headNode.rowNumber = -1;
            this.setParentScreenId(this.headNode);
            this.headNode.setLocaleName("headrow");
        }
        /** @type {?} */
        var cell = new HTMLElementWrapper(this.renderer, "", this.getSession());
        cell.htmlElement = /** @type {?} */ (event.element.nativeElement);
        cell.setLocaleName("headcell");
        cell.setAttribute("isLockedColumn", columnDef.locked + "");
        cell.customData = columnDef;
        this.setParentScreenId(cell);
        this.headNode.appendChild(cell);
    };
    /**
     * Add element to internal [[nodes]] list to keep track of
     * @param {?} node Element to add to internal node list
     * @return {?}
     */
    TableComponent.prototype.trackNode = /**
     * Add element to internal [[nodes]] list to keep track of
     * @param {?} node Element to add to internal node list
     * @return {?}
     */
    function (node) {
        if (this.nodes == null) {
            this.nodes = [];
        }
        this.nodes.push(node);
    };
    /**
     * Set the parent screen id on an element
     * @param {?} el
     * @return {?}
     */
    TableComponent.prototype.setParentScreenId = /**
     * Set the parent screen id on an element
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (this.getParentView() != null) {
            el.parentScreenId = this.getParentView().getId();
        }
    };
    /**
     * Get invoke [[rowStyleFn]] on a row and get it's style
     * @param row
     * @returns Style attributes
     */
    /**
     * Get invoke [[rowStyleFn]] on a row and get it's style
     * @param {?} row
     * @return {?} Style attributes
     */
    TableComponent.prototype.rowStyleClass = /**
     * Get invoke [[rowStyleFn]] on a row and get it's style
     * @param {?} row
     * @return {?} Style attributes
     */
    function (row) {
        if (typeof this.rowStyleFn === "function") {
            return this.rowStyleFn(row);
        }
        return "";
    };
    /**
     * Find the child node by id
     * @param id Child's id
     */
    /**
     * Find the child node by id
     * @param {?} id Child's id
     * @return {?}
     */
    TableComponent.prototype.getChildNodeById = /**
     * Find the child node by id
     * @param {?} id Child's id
     * @return {?}
     */
    function (id) {
        return this.nodes != null ? this.nodes.find(function (child) { return child.id === id; }) : null;
    };
    /* istanbul ignore next */
    /**
     * Handle cell onContextMenu if component inside the cell has not already handle it
     *
     * @param rowNumber
     * @param columnIndex
     * @param event
     */
    /**
     * Handle cell onContextMenu if component inside the cell has not already handle it
     *
     * @param {?} column
     * @param {?} rowNumber
     * @param {?} columnIndex
     * @param {?} event
     * @return {?}
     */
    TableComponent.prototype.handleColumnOnContextMenu = /**
     * Handle cell onContextMenu if component inside the cell has not already handle it
     *
     * @param {?} column
     * @param {?} rowNumber
     * @param {?} columnIndex
     * @param {?} event
     * @return {?}
     */
    function (column, rowNumber, columnIndex, event) {
        var _this = this;
        if (this.nodes != null && this.nodes[rowNumber] != null) {
            /** @type {?} */
            var childColumn = this.nodes[rowNumber].getChildAt(columnIndex);
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
                var parentView = this.getParentView();
                /** @type {?} */
                var popupMenuId_1 = null;
                if (parentView != null) {
                    popupMenuId_1 = (/** @type {?} */ (parentView)).getFirstPopupMenuId();
                }
                if (typeof column.onContextMenuCb === "function") {
                    column.onContextMenuCb(this._getNoneActiveViewParent() || this.getParentView());
                }
                if (popupMenuId_1 != null) {
                    event.stopPropagation();
                    event.preventDefault();
                    /** @type {?} */
                    var tm_1 = setTimeout(function () {
                        clearTimeout(tm_1);
                        if (_this.getSession()._currentPopupMenuId != null) {
                            popupMenuId_1 = _this.getSession()._currentPopupMenuId;
                        }
                        _this.getSession().showContextMenu(popupMenuId_1);
                        _this.getSession()._currentPopupMenuId = null;
                    });
                }
            }
        }
    };
    /* istanbul ignore next */
    /**
     * Event handler for context click on the header
     * @param columnIndex Index of column that was clicked
     * @param event
     */
    /**
     * Event handler for context click on the header
     * @param {?} columnIndex Index of column that was clicked
     * @param {?} event
     * @return {?}
     */
    TableComponent.prototype.handleHeaderOnContextMenu = /**
     * Event handler for context click on the header
     * @param {?} columnIndex Index of column that was clicked
     * @param {?} event
     * @return {?}
     */
    function (columnIndex, event) {
        /* istanbul ignore if */
        if (this.headNode != null) {
            /** @type {?} */
            var childColumn = this.headNode.getChildAt(columnIndex);
            if (childColumn != null && childColumn.component != null) {
                /** @type {?} */
                var clientEvent = new ClientEvent(childColumn, event);
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TableComponent.prototype.recalculateVirtualScrollData = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /* istanbul ignore if */
        if (this.virtualScroll === true) {
            /** @type {?} */
            var scrollTop = event.srcElement.scrollTop;
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
    };
    /**
     * Event handler for table head change. Set style to properly display
     * @param {?} event
     * @param {?=} skipBodyAdjustment
     * @param {?=} skipHeader
     * @return {?}
     */
    TableComponent.prototype.adjustTableHead = /**
     * Event handler for table head change. Set style to properly display
     * @param {?} event
     * @param {?=} skipBodyAdjustment
     * @param {?=} skipHeader
     * @return {?}
     */
    function (event, skipBodyAdjustment, skipHeader) {
        var _this = this;
        if (skipBodyAdjustment === void 0) { skipBodyAdjustment = false; }
        if (skipHeader === void 0) { skipHeader = false; }
        if (this.table == null || event == null)
            return;
        this.preMouseEvent = event;
        /** @type {?} */
        var scrollTop = event.srcElement.scrollTop;
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
            setTimeout(function () {
                _this._disabledScrolling = false;
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
            var table = this.table.nativeElement;
            /** @type {?} */
            var thead = table.querySelector('thead');
            /** @type {?} */
            var tbody = table.querySelector('tbody');
            var _loop_2 = function (i) {
                /** @type {?} */
                var column = this_1.columns.find(function (item, idx) { return idx === i; });
                if (column != null && column.visible && column.locked) {
                    /** @type {?} */
                    var headChildren = $(thead.querySelector('th:nth-child(' + (i + 1) + ')'));
                    /** @type {?} */
                    var trans = "translate(" + this_1.scrollLeft + "px, " + scrollTop + "px)";
                    if (this_1.virtualScroll === true) {
                        trans = "translateX(" + this_1.scrollLeft + "px)";
                    }
                    headChildren.css("transform", trans);
                    headChildren.css("-ms-transform", trans);
                    if (skipBodyAdjustment !== true) {
                        /** @type {?} */
                        var bodyChildren = $(tbody.querySelectorAll('td:nth-child(' + (i + 1) + ')'));
                        bodyChildren.css("transform", "translate(" + this_1.scrollLeft + "px");
                        bodyChildren.css("-ms-transform", "translate(" + this_1.scrollLeft + "px");
                    }
                }
                else if (column != null && column.visible && this_1.virtualScroll !== true) {
                    /** @type {?} */
                    var headChildren = $(thead.querySelector('th:nth-child(' + (i + 1) + ')'));
                    /** @type {?} */
                    var trans = "translateY(" + scrollTop + "px)";
                    headChildren.css("transform", trans);
                    headChildren.css("-ms-transform", trans);
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.columns.length; i++) {
                _loop_2(i);
            }
            this.adjustTableFooter();
        }
    };
    /**
     * Set table footer styles for proper display
     * @return {?}
     */
    TableComponent.prototype.adjustTableFooter = /**
     * Set table footer styles for proper display
     * @return {?}
     */
    function () {
        /* istanbul ignore if */
        if (this.table == null)
            return;
        /** @type {?} */
        var tfoot = this.table.nativeElement.querySelector("tfoot");
        /* istanbul ignore if */
        if (tfoot != null) {
            /** @type {?} */
            var tfootPos = 0;
            if ($(this.table.nativeElement).height() < $(this.tableContainer.nativeElement).height()) {
                tfootPos = $(this.tableContainer.nativeElement).height() - $(this.table.nativeElement).height();
            }
            else {
                tfootPos = ($(this.tableContainer.nativeElement).height() - $(this.table.nativeElement).height()) + this.tableContainer.nativeElement.scrollTop;
            }
            var _loop_3 = function (i) {
                /** @type {?} */
                var column = this_2.columns.find(function (item, idx) { return idx === i; });
                if (column != null) {
                    /** @type {?} */
                    var footChildren = $(tfoot.querySelector('td:nth-child(' + (i + 1) + ')'));
                    /** @type {?} */
                    var trans = "translateY(" + tfootPos + "px)";
                    footChildren.css("transform", trans);
                    footChildren.css("-ms-transform", trans);
                    footChildren.css("position", "relative");
                    footChildren.css("z-index", "3");
                }
            };
            var this_2 = this;
            for (var i = 0; i < this.columns.length; i++) {
                _loop_3(i);
            }
        }
    };
    /* istanbul ignore next */
    /**
     * Event handler for keyup. Copy keyboard shortcut support
     * @param event Keyup event
     */
    /**
     * Event handler for keyup. Copy keyboard shortcut support
     * @param {?} event Keyup event
     * @return {?}
     */
    TableComponent.prototype.handleKeyUp = /**
     * Event handler for keyup. Copy keyboard shortcut support
     * @param {?} event Keyup event
     * @return {?}
     */
    function (event) {
        if (event.ctrlKey === true &&
            (event.code === "KeyC" ||
                event.keyCode === 67 ||
                event.keyCode === 99)) {
            // istanbul ignore next
            this.copySelectedRowAsText();
        }
    };
    /* istanbul ignore next */
    /**
     * Check to see if we can send selected rows to clipboard
     */
    /**
     * Check to see if we can send selected rows to clipboard
     * @return {?}
     */
    TableComponent.prototype.copySelectedRowAsText = /**
     * Check to see if we can send selected rows to clipboard
     * @return {?}
     */
    function () {
        /* istanbul ignore if */
        if (this.selectedRows != null && this.selectedRows.length === 1) {
            /** @type {?} */
            var selectedRowText = void 0;
            /** @type {?} */
            var selectedRow = this.getSelectedRows()[0];
            /* istanbul ignore if */
            if (selectedRow.childNodes != null && selectedRow.childNodes.length > 0) {
                selectedRowText = selectedRow.childNodes.map(function (child) { return child.getText(); });
            }
            else if (selectedRow.dynamicChildNodes != null && selectedRow.dynamicChildNodes.length > 0) {
                selectedRowText = selectedRow.dynamicChildNodes.map(function (child) { return child.getText(); });
            }
            /* istanbul ignore if */
            if (selectedRowText != null && selectedRowText.length > 0) {
                this.clipboardService.copy(selectedRowText.join(String.fromCharCode(9)));
            }
        }
    };
    /* istanbul ignore next */
    /**
     * Generate a row id based on row's [[id]] and index
     * @param row
     * @param rowIndex
     */
    /**
     * Generate a row id based on row's [[id]] and index
     * @param {?} row
     * @param {?} rowIndex
     * @return {?}
     */
    TableComponent.prototype.buildRowId = /**
     * Generate a row id based on row's [[id]] and index
     * @param {?} row
     * @param {?} rowIndex
     * @return {?}
     */
    function (row, rowIndex) {
        if (typeof this.rowIdBuilder === "function") {
            return this.rowIdBuilder(row, rowIndex);
        }
        return ['row', this.id, rowIndex].join('-');
    };
    /* istanbul ignore next */
    /**
     * Sort the data (for virtual scroll)
     *
     * @param column
     */
    /**
     * Sort the data (for virtual scroll)
     *
     * @param {?} column
     * @return {?}
     */
    TableComponent.prototype.handleSort = /**
     * Sort the data (for virtual scroll)
     *
     * @param {?} column
     * @return {?}
     */
    function (column) {
        //sorting is only allowed on a non locking column
        /* istanbul ignore if */
        if (this.virtualScroll === true && column.locked !== true) {
            //find previous sort direction for the column
            this.columns.forEach(function (col) {
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
            var sortColumnId = this.virtualScrollSortKeys[column.originalColumnIndex];
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
    };
    /**
     * Calculate the overall height so we can add scrollbar for virtual scroll. This is done
     * by multiplying the number of rows to the height of each row.
     *
     * @return {?}
     */
    TableComponent.prototype.calcVirtualScrollHeight = /**
     * Calculate the overall height so we can add scrollbar for virtual scroll. This is done
     * by multiplying the number of rows to the height of each row.
     *
     * @return {?}
     */
    function () {
        // istanbul ignore if
        if (this.virtualScroll === true) {
            if (this._dataSource != null && this._dataSource.length > 0) {
                //scroll height = 10px * # rows (10px is the height of each row)
                this._virtualScrollDivHeight = (this.rowHeight * this._dataSource.length);
                this.maxScrollTop = this._virtualScrollDivHeight;
                this.virtualScrollSortKeys = _.keys(this._dataSource[0]);
                //track original index
                if (typeof this._dataSource[this._dataSource.length - 1][TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] !== "number") {
                    _.forEach(this._dataSource, function (item, index) {
                        item[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] = index;
                    });
                }
            }
            else {
                this._virtualScrollDivHeight = 0;
            }
            this.markForCheck();
        }
    };
    /**
     * Adjust/move the position of the table container so that it displayed properly.
     *
     * @param {?} scrollTop
     * @return {?}
     */
    TableComponent.prototype.calcVirtualTablePosition = /**
     * Adjust/move the position of the table container so that it displayed properly.
     *
     * @param {?} scrollTop
     * @return {?}
     */
    function (scrollTop) {
        if (this.virtualScroll === true) {
            //-ms-transform
            //transform
            // if (this.maxScrollTop > 0) {
            //     scrollTop = Math.min(scrollTop, this.maxScrollTop);
            // }
            this.renderer.setStyle(this.tableWrapper.nativeElement, "transform", "translateY(" + scrollTop + "px)");
            this.renderer.setStyle(this.tableWrapper.nativeElement, "-ms-transform", "translateY(" + scrollTop + "px)");
            // this.markForCheck();
        }
    };
    /**
     * Calculate the visible virtual rows to display to the user
     *
     * @param {?=} scrollTop
     * @return {?}
     */
    TableComponent.prototype.calcVirtualScrollViewPort = /**
     * Calculate the visible virtual rows to display to the user
     *
     * @param {?=} scrollTop
     * @return {?}
     */
    function (scrollTop) {
        var _this = this;
        if (scrollTop === void 0) { scrollTop = 0; }
        if (this._isViewInit === true && this._dataSource != null) {
            /** @type {?} */
            var startIdx_1 = 0;
            //if scrollTop is greater than 0, need to figure the starting row
            if (scrollTop > 0) {
                //each row is 10px height, if scrollTop is 100px, then we start at row 10
                //scrollTop / 10px?
                //each row is 10px height, if scrollTop is 100px, then we start at row 10
                //scrollTop / 10px?
                startIdx_1 = Math.floor(scrollTop / this.rowHeight);
                if (startIdx_1 > this._dataSource.length - this._virtualScrollRowPerView) {
                    startIdx_1 = this._dataSource.length - this._virtualScrollRowPerView;
                }
            }
            this._virtualViewPort = null;
            this.prevScrollTop = scrollTop;
            this.cleanUpChildNodes();
            this.detectChanges();
            this.zone.run(function () {
                _this._virtualViewPort = _this.buildRowIdentity(_this._dataSource.slice(startIdx_1, startIdx_1 + _this._virtualScrollRowPerView + _this.adjustedRows));
            });
        }
    };
    /**
     * @param {?} fromIndex
     * @param {?} toIndex
     * @return {?}
     */
    TableComponent.prototype._swap = /**
     * @param {?} fromIndex
     * @param {?} toIndex
     * @return {?}
     */
    function (fromIndex, toIndex) {
        /** @type {?} */
        var tempToColumn = this.columns[toIndex];
        this.columns[toIndex] = this.columns[fromIndex];
        this.columns[fromIndex] = tempToColumn;
    };
    /**
     * Swap the columns after a column is being drag and rop
     *
     * @param {?} fromIndex column that is being dragged (moved)
     * @param {?} toIndex  column that is being droped into
     * @return {?}
     */
    TableComponent.prototype.swapColumns = /**
     * Swap the columns after a column is being drag and rop
     *
     * @param {?} fromIndex column that is being dragged (moved)
     * @param {?} toIndex  column that is being droped into
     * @return {?}
     */
    function (fromIndex, toIndex) {
        var _this = this;
        //sophia 1856: need to properly swap columns
        if (fromIndex < toIndex) {
            for (var i = fromIndex; i < toIndex; i++) {
                this._swap(i, i + 1);
            }
        }
        else if (fromIndex > toIndex) {
            for (var i = fromIndex; i > toIndex; i--) {
                this._swap(i, i - 1);
            }
        }
        if (this.scrollContainerStyles != null) {
            this.scrollContainerStyles["overflow-y"] = "auto";
            this.detectChanges();
        }
        //sophia 1823: for server tracking
        _.forEach(this.columns, function (col, idx) {
            col.setAttribute("visualIndex", idx + "");
        });
        if (this.virtualScroll !== true) {
            this.detectChanges();
            setTimeout(function () {
                _this.applyResizeColumns();
            }, 200);
        }
        this.columnsHasBeenSwapped = true;
    };
    /**
     * @return {?}
     */
    TableComponent.prototype._cleanupColResize = /**
     * @return {?}
     */
    function () {
        //reset
        this.$colResizable = $(this.table.nativeElement).colResizable({
            disable: true
        });
        $("#" + this.id + " .JCLRgrips").remove();
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    TableComponent.prototype.applyResizeColumns = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * Return whether or not the column at the particular index can be dragged/drop
     *
     * @param {?} colIdx
     * @return {?}
     */
    TableComponent.prototype.canDragColumn = /**
     * Return whether or not the column at the particular index can be dragged/drop
     *
     * @param {?} colIdx
     * @return {?}
     */
    function (colIdx) {
        var e_9, _a;
        /** @type {?} */
        var canDrag = true;
        try {
            for (var _b = tslib_1.__values(this.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                var col = _c.value;
                if (col.originalColumnIndex === colIdx && col.locked === true) {
                    canDrag = false;
                    break;
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return canDrag;
    };
    /**
     * Return the index of the suppplied row
     *
     * @param child row to check fo rindex?
     */
    /**
     * Return the index of the suppplied row
     *
     * @param {?} child row to check fo rindex?
     * @return {?}
     */
    TableComponent.prototype.indexOfChild = /**
     * Return the index of the suppplied row
     *
     * @param {?} child row to check fo rindex?
     * @return {?}
     */
    function (child) {
        if (this.nodes != null && this.nodes.length > 0) {
            return _.findIndex(this.nodes, function (node) { return node === child; });
        }
        //child does not exists
        return -1;
    };
    /**
     * @return {?}
     */
    TableComponent.prototype._checkInitModifiedVirtualRows = /**
     * @return {?}
     */
    function () {
        if (this.modifiedVirtualRows == null) {
            this.modifiedVirtualRows = {};
        }
    };
    /**
     * @return {?}
     */
    TableComponent.prototype._checkInitModifiedVirtualRowsJson = /**
     * @return {?}
     */
    function () {
        if (this.modifiedVirtualRowsJson == null) {
            this.modifiedVirtualRowsJson = {};
        }
    };
    /**
     * Refresh the table sorter
     * @return {?}
     */
    TableComponent.prototype.refreshTableSorter = /**
     * Refresh the table sorter
     * @return {?}
     */
    function () {
        var _this = this;
        //data changes, need to update tableSorter
        if (this._tableSorterRefreshTm != null) {
            clearTimeout(this._tableSorterRefreshTm);
            this._tableSorterRefreshTm = null;
        }
        this.zone.runOutsideAngular(function () {
            _this._tableSorterRefreshTm = setTimeout(function () {
                clearTimeout(_this._tableSorterRefreshTm);
                _this._tableSorterRefreshTm = null;
                if (_this.$tablesorter != null) {
                    _this.$tablesorter.trigger("update");
                }
                _this.adjustTableHead(_this.preMouseEvent);
            }, 200);
        });
    };
    /**
     * Refresh cache data (sort value, etc)
     */
    /**
     * Refresh cache data (sort value, etc)
     * @return {?}
     */
    TableComponent.prototype.refreshTableSorterCache = /**
     * Refresh cache data (sort value, etc)
     * @return {?}
     */
    function () {
        var _this = this;
        //data changes, need to update tableSorter
        if (this._tableSorterCacheRefreshTm != null) {
            clearTimeout(this._tableSorterCacheRefreshTm);
            this._tableSorterCacheRefreshTm = null;
        }
        this.zone.runOutsideAngular(function () {
            _this._tableSorterCacheRefreshTm = setTimeout(function () {
                clearTimeout(_this._tableSorterCacheRefreshTm);
                _this._tableSorterCacheRefreshTm = null;
                if (_this.$tablesorter != null) {
                    _this.$tablesorter.trigger("updateCache");
                }
            }, 200);
        });
    };
    /**
     * @param {?} shouldSelected
     * @return {?}
     */
    TableComponent.prototype.setSelectAllVirtualRows = /**
     * @param {?} shouldSelected
     * @return {?}
     */
    function (shouldSelected) {
        var e_10, _a;
        if (shouldSelected !== true) {
            this.modifiedVirtualRows = {};
            this.modifiedVirtualRowsJson = {};
            this.selectedRows = [];
        }
        else {
            this._checkInitModifiedVirtualRows();
            this._checkInitModifiedVirtualRowsJson();
            /** @type {?} */
            var checkBoxeColumnIdxs = [];
            if (this.nodes != null && this.nodes.length > 0) {
                //find all checkboxes columns
                for (var i = 0; i < this.nodes[0].childNodes.length; i++) {
                    if (this.nodes[0].childNodes[i].component instanceof CheckboxComponent) {
                        checkBoxeColumnIdxs.push(i);
                    }
                }
            }
            //if there are checkboxes, check them
            this.lastSelectedRowIndex = 0;
            if (checkBoxeColumnIdxs.length > 0) {
                var _loop_4 = function (row) {
                    var e_11, _a;
                    //make sure row is not visible
                    if (_.findIndex(this_3.nodes, function (node) {
                        return node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] === row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
                    }) < 0) {
                        if (this_3.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] == null) {
                            this_3.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = {};
                        }
                        try {
                            for (var checkBoxeColumnIdxs_1 = tslib_1.__values(checkBoxeColumnIdxs), checkBoxeColumnIdxs_1_1 = checkBoxeColumnIdxs_1.next(); !checkBoxeColumnIdxs_1_1.done; checkBoxeColumnIdxs_1_1 = checkBoxeColumnIdxs_1.next()) {
                                var colIdx = checkBoxeColumnIdxs_1_1.value;
                                this_3.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][colIdx] = {
                                    checked: true,
                                    text: undefined
                                };
                            }
                        }
                        catch (e_11_1) { e_11 = { error: e_11_1 }; }
                        finally {
                            try {
                                if (checkBoxeColumnIdxs_1_1 && !checkBoxeColumnIdxs_1_1.done && (_a = checkBoxeColumnIdxs_1.return)) _a.call(checkBoxeColumnIdxs_1);
                            }
                            finally { if (e_11) throw e_11.error; }
                        }
                        //this.modifiedVirtualRowsJson []
                        if (typeof this_3.virtualScrollInvisibleRowBuilder === "function") {
                            /** @type {?} */
                            var rowElement = this_3.virtualScrollInvisibleRowBuilder(this_3._getNoneActiveViewParent() || this_3.getParentView(), row);
                            rowElement.setAttribute("selected", "true");
                            this_3.modifiedVirtualRowsJson[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = rowElement.toJson();
                        }
                        //selected the row
                        if (this_3.selectedRows == null) {
                            this_3.selectedRows = [];
                        }
                        this_3.selectedRows.push(row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]);
                    }
                };
                var this_3 = this;
                try {
                    for (var _b = tslib_1.__values(this._dataSource), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var row = _c.value;
                        _loop_4(row);
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
            }
        }
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.recCalcNoVirtualRow = /**
     * @return {?}
     */
    function () {
        if (this.virtualScroll === true) {
            /** @type {?} */
            var height = $(this.tableContainer.nativeElement).height();
            if (this.tableHead != null) {
                this.theadHeight = $(this.tableHead.nativeElement).height();
                height = height - this.theadHeight;
                if (this.skipRowsAdjustment !== true) {
                    this.adjustedRows = Math.round(this.theadHeight / this.rowHeight) + 2;
                }
            }
            this._virtualScrollRowPerView = Math.round(height / this.rowHeight);
        }
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.setHeaderWidthHeight = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var table = this.table.nativeElement;
        /** @type {?} */
        var thead = table.querySelector('thead');
        /** @type {?} */
        var headerMaxHeight = 0;
        /** @type {?} */
        var id = table.id;
        if (this.columns != null) {
            if (this.forceFixWidth) {
                //please do not removed our code
                //this.renderer.setStyle(this.table.nativeElement, "table-layout", "fixed");
                var _loop_5 = function (i) {
                    /** @type {?} */
                    var column = this_4.columns.find(function (item, idx) { return idx === i; });
                    if (column != null) {
                        /** @type {?} */
                        var headChildren = thead.querySelector('th:nth-child(' + (i + 1) + ')');
                        this_4.renderer.setStyle(headChildren, "width", column.controlWidth + "px");
                        if (column.controlHeight !== undefined) {
                            this_4.isHeaderAuto = true;
                            if (headerMaxHeight < column.controlHeight) {
                                headerMaxHeight = Number(column.controlHeight);
                            }
                        }
                    }
                };
                var this_4 = this;
                for (var i = 0; i < this.columns.length; i++) {
                    _loop_5(i);
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
    };
    /**
     * Reset table column (in case it has been swapped)
     * @return {?}
     */
    TableComponent.prototype.resetTableColumns = /**
     * Reset table column (in case it has been swapped)
     * @return {?}
     */
    function () {
        if (this.forceResetColumns === true &&
            this._isDying !== true &&
            this.columns != null &&
            this.columnsHasBeenSwapped === true) {
            this.columnsHasBeenSwapped = false;
            /** @type {?} */
            var temp = _.clone(this.columns);
            this.columns = [];
            this.detectChanges();
            if (this.headNode != null) {
                this.headNode.childNodes = [];
            }
            this.columns = _.sortBy(temp, function (col, idx) {
                col.setAttribute("visualIndex", idx + "");
                return col.originalColumnIndex;
            });
            this.detectChanges();
            this.initPlugins();
        }
    };
    /**
     * @param {?} rows
     * @return {?}
     */
    TableComponent.prototype.buildRowIdentity = /**
     * @param {?} rows
     * @return {?}
     */
    function (rows) {
        // if (rows == null) return rows;
        // for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        //     rows[rowIndex][TableComponent.INTERNAL_ROW_DIFFER_ID] = BaseComponent.generateUniqueId("row_differ");
        //     rows[rowIndex][TableComponent.INTERNAL_ROW_ID] = this.buildRowId(rows[rowIndex], rowIndex);
        // }
        return rows;
    };
    /**
     * @param {?} idx
     * @param {?} row
     * @return {?}
     */
    TableComponent.prototype.rowTrackByFn = /**
     * @param {?} idx
     * @param {?} row
     * @return {?}
     */
    function (idx, row) {
        return row[TableComponent.INTERNAL_ROW_DIFFER_ID];
    };
    /**
     * @param {?} idx
     * @param {?} column
     * @return {?}
     */
    TableComponent.prototype.columnHeaderTrackByFn = /**
     * @param {?} idx
     * @param {?} column
     * @return {?}
     */
    function (idx, column) {
        return column[TableComponent.INTERNAL_COLUMN_HEADER_ID];
    };
    /**
     * Removed vt-row by index. This will not works for rows that are created by dataSource
     */
    /**
     * Removed vt-row by index. This will not works for rows that are created by dataSource
     * @param {?} index
     * @return {?}
     */
    TableComponent.prototype.removeTableRowByIndex = /**
     * Removed vt-row by index. This will not works for rows that are created by dataSource
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this._tableRow != null && this._tableRow.length > index) {
            this._tableRow = _.filter(this._tableRow, function (row, rowIndex) {
                return rowIndex !== index;
            });
            this.cleanUpChildNodes();
            this.detectChanges();
        }
    };
    /**
     * Removed vt-row by id. This will not works for rows that are created by dataSource
     */
    /**
     * Removed vt-row by id. This will not works for rows that are created by dataSource
     * @param {?} id
     * @return {?}
     */
    TableComponent.prototype.removeTableRowById = /**
     * Removed vt-row by id. This will not works for rows that are created by dataSource
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (this._tableRow != null && this._tableRow.length > 0) {
            this._tableRow = _.filter(this._tableRow, function (row) {
                return row.id !== id;
            });
            this.cleanUpChildNodes();
            this.detectChanges();
        }
    };
    /**
     * @param {?} columns
     * @return {?}
     */
    TableComponent.prototype.toColumns = /**
     * @param {?} columns
     * @return {?}
     */
    function (columns) {
        return columns.map(function (col, idx) {
            col[TableComponent.INTERNAL_COLUMN_HEADER_ID] = BaseComponent.generateUniqueId("hc");
            col.setAttribute("visualIndex", idx + '');
            return col;
        });
    };
    /**
     * @param {?} width
     * @return {?}
     */
    TableComponent.prototype.toWholeNumber = /**
     * @param {?} width
     * @return {?}
     */
    function (width) {
        return parseInt(width);
    };
    /**
     * @return {?}
     */
    TableComponent.prototype.checkShowBlankRow = /**
     * @return {?}
     */
    function () {
        if (this.dataSource == null ||
            this.dataSource.length === 0 ||
            (/** @type {?} */ (this.tableContainer.nativeElement)).scrollHeight > (/** @type {?} */ (this.tableContainer.nativeElement)).clientHeight) {
            this.showBlankRow = false;
        }
        else {
            this.showBlankRow = true;
        }
    };
    // removeFromTableRow(whtvr:string) {
    //   //no idea what this for
    // }
    // private appendHeaderToFakeTable() {
    //   if (this.isHeaderAppendToFakeTable !== true) {
    //     this.fakeTable.nativeElement.appendChild($(this.tableHead.nativeElement).clone()[0]);
    //     this.isHeaderAppendToFakeTable = true;
    //   }
    // }
    /**
     * Remove row from tableRows by id. no detect change
     * @param id row element id
     */
    /**
     * Remove row from tableRows by id. no detect change
     * @param {?} id row element id
     * @return {?}
     */
    TableComponent.prototype.removeFromTableRow = /**
     * Remove row from tableRows by id. no detect change
     * @param {?} id row element id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var i = this.tableRow.findIndex(function (r) { return r.id === id; });
        this.tableRow.splice(i, 1);
    };
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
                            useExisting: forwardRef(function () { return TableComponent; })
                        }
                    ],
                    styles: [".table-container{width:100%;height:100%;overflow:auto;border:1px solid #888}table{table-layout:auto;width:100%!important;background-color:#fff;border-collapse:separate}table>tbody>tr>td,table>thead>tr>th{min-width:1px;white-space:nowrap;text-align:center}table tr.selected-row>td{background-color:#cff!important;color:#1014ff!important}table>thead>tr>th{position:relative;vertical-align:middle;overflow:hidden}.vt-locked-column{position:relative}th.vt-locked-column{background-color:#44a!important;z-index:4}.ghost-header,.table>tfoot>tr>td,.table>thead>tr>th{border-bottom:1px solid #d8d8dc;border-right:1px solid #d8d8dc;background-color:#6a6aff;color:#fff;font-weight:400}.table>tbody>tr>td{border-bottom:1px solid #8080ff;border-right:1px solid #8080ff;padding-left:2px!important;padding-right:2px!important}.table>tfoot>tr>td{padding-left:2px!important;padding-right:2px!important;white-space:nowrap}.table>tbody>tr:nth-child(odd)>td{background:#fff}.table>tbody>tr:nth-child(even)>td{background:#e6e6e6}.table>tfoot>tr{height:10px}td{display:table-cell}table>thead>tr>th.auto-wrap{white-space:normal}.internal-sort{padding:4px 21px 4px 4px}.sort-up{background:url(data:image/gif;base64,R0lGODlhCwALAJEAAAAAAP///xUVFf///yH5BAEAAAMALAAAAAALAAsAAAIRnC2nKLnT4or00Puy3rx7VQAAOw==) center right no-repeat}.sort-down{background:url(data:image/gif;base64,R0lGODlhCwALAJEAAAAAAP///xUVFf///yH5BAEAAAMALAAAAAALAAsAAAIPnI+py+0/hJzz0IruwjsVADs=) center right no-repeat}table thead th.auto-wrap{white-space:normal!important;text-align:center}th.headerPadding{padding-right:14px;padding-left:14px}.fake-table>thead{visibility:visible!important}"]
                }] }
    ];
    /** @nocollapse */
    TableComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 },
        { type: NgZone },
        { type: IterableDiffers },
        { type: ClipboardService }
    ]; };
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
    return TableComponent;
}(BaseComponent));
export { TableComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQTJCLE1BQU0sZUFBZSxDQUFDO0FBQ3pSLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFeEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBZ0IsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFD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QVUsRUFBQzs4QkFHekMsU0FBUyxTQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7K0JBRTNDLGVBQWUsU0FBQyxvQkFBb0I7OEJBWXBDLFlBQVksU0FBQyxvQkFBb0I7NEJBQ2pDLFlBQVksU0FBQyxrQkFBa0I7Z0NBRy9CLGVBQWUsU0FBQyxZQUFZO2dDQWU1QixLQUFLO2tDQUNMLEtBQUs7K0JBQ0wsS0FBSztxQ0FFTCxLQUFLO29DQUdMLEtBQUs7OEJBR0wsS0FBSzs7eUJBNUxWO0VBbURvQyxhQUFhO1NBQXBDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3Q2hpbGQsIFNraXBTZWxmLCBPcHRpb25hbCwgZm9yd2FyZFJlZiwgUmVuZGVyZXIyLCBDb250ZW50Q2hpbGQsIE5nWm9uZSwgSXRlcmFibGVEaWZmZXJzLCBJdGVyYWJsZURpZmZlciwgRG9DaGVjayB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtY29sdW1uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJsZVNlbGVjdGlvbkV2ZW50IH0gZnJvbSAnLi90YWJsZS1zZWxlY3Rpb24tZXZlbnQnO1xuaW1wb3J0IHsgSFRNTEVsZW1lbnRXcmFwcGVyIH0gZnJvbSAnLi4vdHJlZS10YWJsZS9odG1sLWVsZW1lbnQtd3JhcHBlcic7XG5pbXBvcnQgeyBPbkNyZWF0ZUV2ZW50IH0gZnJvbSAnLi4vYmFzZS9vbi1jcmVhdGUtZXZlbnQnO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi4vamF2YS92ZWN0b3InO1xuaW1wb3J0IHsgVGFibGVSb3dEZWZEaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLXJvdy1kZWYuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZvb3RlclJvd0RpcmVjdGl2ZSB9IGZyb20gJy4vZm9vdGVyLXJvdy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBTdWJqZWN0LCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7IFJvd0RpcmVjdGl2ZSB9IGZyb20gJy4vcm93LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDbGllbnRFdmVudCB9IGZyb20gJy4uL2V2ZW50LWhhbmRsZXIvY2xpZW50LWV2ZW50JztcbmltcG9ydCB7IEFwcFV0aWxzIH0gZnJvbSAnLi4vYmFzZS9hcHAtdXRpbHMnO1xuaW1wb3J0IHsgVmlld0NvbXBvbmVudCB9IGZyb20gJy4uL3ZpZXcvdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2xpcGJvYXJkU2VydmljZSB9IGZyb20gJy4uL2NsaXBib2FyZC9jbGlwYm9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBUYWJsZUNlbGxEaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLWNlbGwuZGlyZWN0aXZlJztcbmltcG9ydCB7IENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi4vY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IFJhZGlvQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi4vcmFkaW8tYnV0dG9uL3JhZGlvLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dEZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi4vdGV4dC1maWVsZC90ZXh0LWZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21ib0JveENvbXBvbmVudCB9IGZyb20gJy4uL2NvbWJvLWJveC9jb21iby1ib3guY29tcG9uZW50JztcbmltcG9ydCB7IEtleVV0aWxzIH0gZnJvbSAnLi4vYmFzZS9rZXktdXRpbHMnO1xuaW1wb3J0IHsgaXNJRSB9IGZyb20gJy4uLy4uL2Z1bmN0aW9ucy9pcy1pZSc7XG5cbmRlY2xhcmUgdmFyIGpRdWVyeTogYW55O1xuXG5kZWNsYXJlIHZhciAkO1xuXG5kZWNsYXJlIHR5cGUgU2VsZWN0aW9uTW9kZSA9IFwibm9uZVwiIHwgXCJzaW5nbGVSb3dcIiB8IFwibXVsdGlSb3dcIiB8IFwic2luZ2xlQ2VsbFwiIHwgXCJtdWx0aUNlbGxcIiB8IFwic2luZ2xlQ29sdW1uXCIgfCBcIm11bHRpQ29sdW1uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlydHVhbENvbHVtbkNoYW5nZURhdGEge1xuICAgIHRleHQ6IHN0cmluZyxcbiAgICBjaGVja2VkOiBib29sZWFuXG59XG4vKipcbiAqIENsYXNzIGZvciB0YWJsZSBjb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2dC10YWJsZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90YWJsZS5jb21wb25lbnQuY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICB7XG4gICAgICAgIHByb3ZpZGU6IEJhc2VDb21wb25lbnQsXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpPT5UYWJsZUNvbXBvbmVudClcbiAgICAgIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjayB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWDogc3RyaW5nID0gXCIkJElOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVgkJFwiO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOVEVSTkFMX1ZJUlRVQUxfUk9XX0RBVEEgOiBzdHJpbmcgPSBcIiQkSU5URVJOQUxfVklSVFVBTF9ST1dfREFUQSQkXCI7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5URVJOQUxfUk9XX0RJRkZFUl9JRCA6IHN0cmluZyA9IFwiJCRJTlRFUk5BTF9WSVJUVUFMX1JPV19ESUZGRVJfSUQkJFwiO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOVEVSTkFMX1JPV19JRCA6IHN0cmluZyA9IFwiJCRJTlRFUk5BTF9WSVJUVUFMX1JPV19JRCQkXCI7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5URVJOQUxfQ09MVU1OX0hFQURFUl9JRCA9IFwiJCRJTlRFUk5BTF9DT0xVTU5fSEVBREVSX0lEJCRcIjtcblxuICAgIEBJbnB1dCgpIHNlbGVjdGlvbk1vZGU6IFNlbGVjdGlvbk1vZGUgPSBcInNpbmdsZVJvd1wiO1xuICAgIEBJbnB1dCgpIHJvd0N1c3RvbUF0dHJpYnV0ZUJ1aWxkZXI6IChyb3c6YW55LCByb3dOdW1iZXI/OiBudW1iZXIsIHZpZXc/OiBWaWV3Q29tcG9uZW50KT0+e307XG4gICAgQElucHV0KCkgcm93SWRCdWlsZGVyOiAocm93OmFueSwgcm93TnVtYmVyPzogbnVtYmVyKT0+c3RyaW5nO1xuICAgIEBJbnB1dCgpIHJvd1N0eWxlRm46IChyb3c6YW55KT0+c3RyaW5nO1xuXG4gICAgLyoqIEVuYWJsZSB1c2Ugb2YgdmlydHVhbCBzY3JvbGxpbmcsIGlmIHRoaXMgaXMgb24sIGNvbnRyb2xXaWR0aCBhbmQgY29udHJvbEhlaWdodCBtdXN0IGJlIGRlZmluZWQgKi9cbiAgICBASW5wdXQoKSB2aXJ0dWFsU2Nyb2xsOiBib29sZWFuO1xuXG4gICAgLy9jdXN0b20gc29ydCBmdW5jdGlvbiBmb3IgdmlydHVhbCBzY3JvbGxcbiAgICBASW5wdXQoKSB2aXJ0dWFsU2Nyb2xsU29ydEZuOiAodmlldzogQmFzZUNvbXBvbmVudCwgY29sdW1uSW5kZXg6IG51bWJlcik9PnN0cmluZztcblxuICAgIC8vY3VzdG9tIGZ1bmN0aW9uIHRvIFwicmVuZGVyXCIgdGhlIGludmlzaWJsZSByb3cgKGZvciB2aXJ0dWFsIHNjcm9sbClcbiAgICBASW5wdXQoKSB2aXJ0dWFsU2Nyb2xsSW52aXNpYmxlUm93QnVpbGRlcjogKHZpZXc6IEJhc2VDb21wb25lbnQsIHJvd0RhdGE6IGFueSk9PkhUTUxFbGVtZW50V3JhcHBlcjtcblxuICAgIC8vdXNlIGZvciB2aXJ0dWFsIHNjcm9sbGluZ1xuICAgIEBJbnB1dCgpIHJvd0hlaWdodDogbnVtYmVyID0gMjQ7XG5cbiAgICBASW5wdXQoKSBzY3JvbGxUaW1lb3V0OiBudW1iZXIgPSAyMDA7XG5cbiAgICAvL3Nob3cgYmxhbmsgcm93IGlmIHdlIGRvbid0IGhhdmUgZW5vdWdoIGRhdGFcbiAgICBzaG93QmxhbmtSb3c6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzZXQgZGF0YVNvdXJjZShkczogQXJyYXk8YW55Pikge1xuICAgICAgICAvL2RhdGEgaGFzIGNoYW5nZXMsIHdlIG5lZWQgdG8gZG8gc29tZSBjbGVhbiB1cC5cbiAgICAgICAgdGhpcy5jbGVhblVwQ2hpbGROb2RlcygpO1xuXG4gICAgICAgIHRoaXMucmVzZXRUYWJsZUNvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IHRoaXMuYnVpbGRSb3dJZGVudGl0eShkcyk7XG5cbiAgICAgICAgdGhpcy5jaGVja1Nob3dCbGFua1JvdygpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUm93SW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3MgPSBudWxsO1xuICAgICAgICB0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3NKc29uID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFJvd3MgPSBbXTtcblxuICAgICAgICB0aGlzLmNhbGNWaXJ0dWFsU2Nyb2xsSGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuY2FsY1ZpcnR1YWxTY3JvbGxWaWV3UG9ydCgpO1xuICAgIH1cblxuICAgIGdldCBkYXRhU291cmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlID8gdGhpcy5fdmlydHVhbFZpZXdQb3J0IDogdGhpcy5fZGF0YVNvdXJjZTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8vdmlydHVhbCBkYXRhc291cmNlXG4gICAgcHJpdmF0ZSBfdmlydHVhbFZpZXdQb3J0OiBBcnJheTxhbnk+O1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwcml2YXRlIF9kYXRhU291cmNlOiBBcnJheTxhbnk+O1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKiogV2VhdGhlciBvciBub3Qgc2hvdWxkIGVuYWJsZWQgc29ydCwgZGVmYXVsdCB0byBlbmFibGVkIChudWxsL3VuZGVmaW5lZC90cnVlIG1lYW4gZW5hYmxlZCkgKi9cbiAgICBASW5wdXQoKSBlbmFibGVTb3J0OiBib29sZWFuO1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKiogV2VhdGhlciBvciBub3Qgc2hvdWxkIGFsbG93IGNvbHVtbiBkcmFnL2Ryb3AsIGRlZmF1bHQgdG8gZW5hYmxlZCAobnVsbC91bmRlZmluZWQvdHJ1ZSBtZWFuIGVuYWJsZWQpICovXG4gICAgQElucHV0KCkgZW5hYmxlQ29sdW1uRHJhZ2dpbmc6IGJvb2xlYW5cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqIFdlYXRoZXIgb3Igbm90IHNob3VsZCBhbGxvdyBjb2x1bW4gcmVzaXplLCBkZWZhdWx0IHRvIGVuYWJsZWQgKG51bGwvdW5kZWZpbmVkL3RydWUgbWVhbiBlbmFibGVkKSAqL1xuICAgIEBJbnB1dCgpIGVuYWJsZUNvbHVtblJlc2l6ZTogYm9vbGVhbjtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqIFdoZXRoZXIgcm93IGNhbiBiZSBkcm9wcGVkIGludG8gdGhpcyB0YWJsZSAqL1xuICAgIEBJbnB1dCgpIGRyb3BwYWJsZTogYm9vbGVhbiB8IHN0cmluZztcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogUmVzdHJpY3RlZCByaWdodCBjbGljayBwb3B1cCBtZW51IG9ubHkgdG8gY2VsbCB3aGVyZSBwb3B1cCBpcyBkZWZpbmVkXG4gICAgICogPG5nLXRlbXBsYXRlIC4uLj48dnQtbGFiZWwgLi4ucG9wdXA9XCJhYmNcIj48L3Z0LWxhYmVsPjwvbmctdGVtcGxhdGU+XG4gICAgICogKi9cbiAgICBASW5wdXQoKSByZXN0cmljdENlbGxQb3B1cDogYm9vbGVhbjtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VGFibGVTZWxlY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlU2VsZWN0aW9uRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIG9uU3RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgb25Eb3VibGVDbGljazogRXZlbnRFbWl0dGVyPFRhYmxlU2VsZWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZVNlbGVjdGlvbkV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBvbkRyYWdEcm9wOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBAVmlld0NoaWxkKCd0YWJsZScpIHRhYmxlOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJ0YWJsZUNvbnRhaW5lclwiLCB7cmVhZDogRWxlbWVudFJlZn0pIHRhYmxlQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJ0YWJsZVdyYXBwZXJcIiwge3JlYWQ6IEVsZW1lbnRSZWZ9KSB0YWJsZVdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcInRhYmxlSGVhZFwiLCB7cmVhZDogRWxlbWVudFJlZn0pIHRhYmxlSGVhZDogRWxlbWVudFJlZjtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIEBWaWV3Q2hpbGQoXCJ0YWJsZUZvb3RcIiwge3JlYWQ6IEVsZW1lbnRSZWZ9KSB0YWJsZUZvb3Q6IEVsZW1lbnRSZWY7XG5cbiAgICAvLyBAVmlld0NoaWxkKFwiZmFrZVRhYmxlXCIsIHtyZWFkOiBFbGVtZW50UmVmfSkgZmFrZVRhYmxlOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJnaG9zdEhlYWRlclwiLCB7cmVhZDogRWxlbWVudFJlZn0pIGdob3N0SGVhZGVyOiBFbGVtZW50UmVmO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihUYWJsZUNvbHVtbkRpcmVjdGl2ZSlcbiAgICBzZXQgdGFibGVDb2x1bW5zKGNvbHVtbnM6IFF1ZXJ5TGlzdDxUYWJsZUNvbHVtbkRpcmVjdGl2ZT4pIHtcbiAgICAgIHRoaXMuY2xlYXJIZWFkZXJOb2RlcygpO1xuICAgICAgdGhpcy5jb2x1bW5zID0gdGhpcy50b0NvbHVtbnMoY29sdW1ucyk7XG5cbiAgICAgIGlmICh0aGlzLl9pc1ZpZXdJbml0ID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuaW5pdFBsdWdpbnMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb2x1bW5zOiBBcnJheTxUYWJsZUNvbHVtbkRpcmVjdGl2ZT47XG5cbiAgICBAQ29udGVudENoaWxkKFRhYmxlUm93RGVmRGlyZWN0aXZlKSB0YWJsZVJvd0RlZjogVGFibGVSb3dEZWZEaXJlY3RpdmU7XG4gICAgQENvbnRlbnRDaGlsZChGb290ZXJSb3dEaXJlY3RpdmUpIGZvb3RlclJvdzogRm9vdGVyUm93RGlyZWN0aXZlO1xuXG4gICAgLy90YWJsZSB3aXRoIG5vIGRhdGFzb3VyY2VcbiAgICBAQ29udGVudENoaWxkcmVuKFJvd0RpcmVjdGl2ZSkgc2V0IHRhYmxlUm93UXVlcnkocm93czogUXVlcnlMaXN0PFJvd0RpcmVjdGl2ZT4pIHtcbiAgICAgICAgdGhpcy5jbGVhblVwQ2hpbGROb2RlcygpO1xuICAgICAgICB0aGlzLl90YWJsZVJvdyA9IFtdO1xuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcblxuICAgICAgICB0aGlzLl90YWJsZVJvdyA9IHJvd3MudG9BcnJheSgpO1xuICAgIH1cblxuICAgIGdldCB0YWJsZVJvdygpOiBBcnJheTxSb3dEaXJlY3RpdmU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhYmxlUm93O1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RhYmxlUm93OiBBcnJheTxSb3dEaXJlY3RpdmU+O1xuXG4gICAgLy9jdXN0b20gc29ydCBmdW5jdGlvbiBmb3IgdmlydHVhbCBzY3JvbGxcbiAgICBASW5wdXQoKSBmb3JjZUZpeFdpZHRoOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBpc0hlYWRlclBhZGRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBpc0hlYWRlckF1dG86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNraXBSb3dzQWRqdXN0bWVudDogYm9vbGVhbjtcblxuICAgIC8vZm9yY2UgcmVzZXQgY29sdW1ucyB3aGVuIGRhdGFTb3VyY2UgY2hhbmdlc1xuICAgIEBJbnB1dCgpIGZvcmNlUmVzZXRDb2x1bW5zOiBib29sZWFuO1xuXG4gICAgLy90YWJsZS1sYXlvdXQgZGVmYXVsdCBmaXhlZFxuICAgIEBJbnB1dCgpIHRhYmxlTGF5b3V0OiBzdHJpbmcgPSBcImZpeGVkXCI7XG5cbiAgICAvL3RyYWNrIGR5bmFtaWMgcm93cyBzbyB3ZSBjYW4gcXVlcnkgZm9yIGNoaWxkIGxhdGVyXG4gICAgbm9kZXM6IEFycmF5PEhUTUxFbGVtZW50V3JhcHBlcj4gPSBbXTtcbiAgICBoZWFkTm9kZTogSFRNTEVsZW1lbnRXcmFwcGVyO1xuICAgIHNlbGVjdGVkUm93czogQXJyYXk8bnVtYmVyPiA9IFtdO1xuICAgIGxhc3RTZWxlY3RlZFJvd0luZGV4OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfcHJldlNlbGVjdGVkUm93cyA9IFtdO1xuICAgIHByaXZhdGUgZ2V0IFJPV19JTkRFWF9LRVkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICckJCQkcm93SW5kZXgkJCQkJztcbiAgICB9XG4gICAgcHJpdmF0ZSAkY29sUmVzaXphYmxlOiBKUXVlcnkgfCBhbnk7XG4gICAgcHJpdmF0ZSAkZHJhZ2FibGVDb2x1bW5zOiBKUXVlcnkgfCBhbnk7XG4gICAgcHJpdmF0ZSAkdGFibGVzb3J0ZXI6IEpRdWVyeSB8IGFueTtcbiAgICBwcml2YXRlIHNjcm9sbEhhbmRsZXI6IEZ1bmN0aW9uID0gbnVsbDtcbiAgICBwcml2YXRlIG1vZGlmaWVkVmlydHVhbFJvd3M6IHtbbmFtZTogc3RyaW5nXToge1tuYW1lOiBzdHJpbmddOiBWaXJ0dWFsQ29sdW1uQ2hhbmdlRGF0YX19O1xuICAgIHByaXZhdGUgbW9kaWZpZWRWaXJ0dWFsUm93c0pzb246IHtbbmFtZTogc3RyaW5nXToge319O1xuICAgIC8vIG1vdXNlVXBIYW5kbGVyOiBGdW5jdGlvbiA9IG51bGw7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHByaXZhdGUgZGF0YVNvdXJjZURpZmZlcjogSXRlcmFibGVEaWZmZXI8QXJyYXk8YW55Pj47XG4gICAgcHJpdmF0ZSBjb2x1bW5zRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxBcnJheTxhbnk+PjtcbiAgICBwcml2YXRlIGN1c3RvbVJvd0RpZmZlcjogSXRlcmFibGVEaWZmZXI8QXJyYXk8YW55Pj47XG5cbiAgICAvL3ZpcnR1YWwgc2Nyb2xsXG4gICAgcHJpdmF0ZSB2aXJ0dWFsU2Nyb2xsRGF0YVNvdXJjZURpZmZlcjogSXRlcmFibGVEaWZmZXI8QXJyYXk8YW55Pj47XG5cbiAgICBwcml2YXRlIHByZXZpb3VzUm93SW5kZXg6IG51bWJlciA9IG51bGw7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHByaXZhdGUgc2Nyb2xsU3ViY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIHNjcm9sbFN1YmplY3Q6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICBwcml2YXRlIGtleXVwSGFuZGxlcjogKGV2dDogS2V5Ym9hcmRFdmVudCk9PnZvaWQ7XG5cbiAgICAvLyBWaXJ0dWFsIHNjcmlwdCBoZWlnaHQsIHVzZSBpbnRlcm5hbGx5XG4gICAgX3ZpcnR1YWxTY3JvbGxEaXZIZWlnaHQ6IG51bWJlcjtcblxuICAgIHByaXZhdGUgX3ZpcnR1YWxTY3JvbGxSb3dQZXJWaWV3OiBudW1iZXI7XG5cbiAgICBwcml2YXRlIF9pc1ZpZXdJbml0OiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBtYXhTY3JvbGxUb3A6IG51bWJlcjtcblxuICAgIHRhYmxlU3R5bGVzOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ307XG4gICAgc2Nyb2xsQ29udGFpbmVyU3R5bGVzOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ307XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICB2aXJ0dWFsU2Nyb2xsUHJvZ3Jlc3NTdHlsZXM6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfTtcbiAgICB2aXJ0dWFsU2Nyb2xsU29ydEtleXM6IEFycmF5PHN0cmluZz47XG4gICAgcHJldlNjcm9sbFRvcDogbnVtYmVyID0gMDtcbiAgICBwcmV2U2Nyb2xsVG9wRm9ySGlkZGVuSGVhZGVyOiBudW1iZXIgPSAwO1xuXG4gICAgc29ydERpcmVjdGlvbjpzdHJpbmcgPSBcIlwiOyAgIC8vIFJYQyBBZGRcbiAgICBzb3J0Q29sdW1uSWQ6bnVtYmVyID0gMDsgICAgLy8gUlhDIEFkZFxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWRTY3JvbGxpbmc6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIF90YWJsZVNvcnRlclJlZnJlc2hUbTogYW55O1xuXG4gICAgcHJpdmF0ZSBfdGFibGVTb3J0ZXJDYWNoZVJlZnJlc2hUbTogYW55O1xuXG4gICAgcHJpdmF0ZSBfaXNIZWFkZXJDZWxsOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBhbmltYXRpb25GcmFtZUlkOiBhbnk7XG5cbiAgICBwcml2YXRlIHRoZWFkSGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxMZWZ0OiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBjb2x1bW5zSGFzQmVlblN3YXBwZWQ6IGJvb2xlYW47XG5cbiAgICAvL2luaXQgcGx1Z2lucyB0aW1lclxuICAgIHByaXZhdGUgaW5pdFRtOiBhbnk7XG5cbiAgICBwcml2YXRlIGRyYWdnYWJsZVJvd3M6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBzaG91bGRIYW5kbGVNb3VzZVVwOiBib29sZWFuO1xuICAgIHByaXZhdGUgaXNIZWFkZXJBcHBlbmRUb0Zha2VUYWJsZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIGFkanVzdGVkUm93czogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHNraXBHaG9zdEhlYWRlcjogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgY2xpZW50SGVpZ2h0VmlydHVhbFNjcm9sbDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBwcmVNb3VzZUV2ZW50OiBNb3VzZUV2ZW50ID0gbnVsbDtcblxuICAgIHByaXZhdGUgaXNJRTk6IGJvb2xlYW47XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhcmVudCBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gc2Vzc2lvblNlcnZpY2Ugc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIGVsIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSBjaGFuZ2VEZXRlY3RvclJlZiBJbmplY3QgQ2hhbmdlRGV0ZWN0b3JcbiAgICAgKiBAcGFyYW0gcmVuZGVyZXIgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHpvbmUgSW5qZWN0IE5nWm9uZVxuICAgICAqIEBwYXJhbSBkaWZmZXJzIEluamVjdCBJbnRlcmFibGVEaWZmZXJzXG4gICAgICogQHBhcmFtIGNsaXBib2FyZFNlcnZpY2UgSW5qZWN0IFtbQ2xpcGJvYXJkU2VydmljZV1dXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudDogQmFzZUNvbXBvbmVudCxcbiAgICAgICAgc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgICAgIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgcHJpdmF0ZSBjbGlwYm9hcmRTZXJ2aWNlOiBDbGlwYm9hcmRTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudCwgc2Vzc2lvblNlcnZpY2UsIGVsLCByZW5kZXJlcik7XG5cbiAgICAgICAgdGhpcy5kYXRhU291cmNlRGlmZmVyID0gZGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zRGlmZmVyID0gZGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5jdXN0b21Sb3dEaWZmZXIgPSBkaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSgpO1xuXG4gICAgICAgIHRoaXMuaXNJRTkgPSBpc0lFKCkgPT0gOTtcblxuICAgICAgICAvL2ZvciB2aXJ0dWFsIHNjcm9sbFxuICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGxEYXRhU291cmNlRGlmZmVyID0gZGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcblxuICAgICAgICB0aGlzLmtleXVwSGFuZGxlciA9IChldnQ6IEtleWJvYXJkRXZlbnQpPT4gdGhpcy5oYW5kbGVLZXlVcChldnQpO1xuICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXNhYmxlZFNjcm9sbGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2U2Nyb2xsVG9wRm9ySGlkZGVuSGVhZGVyICE9PSBldmVudC5zcmNFbGVtZW50LnNjcm9sbFRvcCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5za2lwR2hvc3RIZWFkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdob3N0SGVhZGVyLm5hdGl2ZUVsZW1lbnQsIFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbFdpZHRoID09PSBcIjEwMCVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdob3N0SGVhZGVyLm5hdGl2ZUVsZW1lbnQsIFwid2lkdGhcIiwgXCIxMDAlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50YWJsZUhlYWQubmF0aXZlRWxlbWVudCwgXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gICBpZih0aGlzLmZvcmNlRml4V2lkdGgpe1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5mYWtlVGFibGUubmF0aXZlRWxlbWVudCwgXCJ0YWJsZS1sYXlvdXRcIiwgXCJmaXhlZFwiKTtcbiAgICAgICAgICAgIC8vICAgfVxuXG4gICAgICAgICAgICAgIGlmKHRoaXMudGFibGVGb290ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudGFibGVGb290Lm5hdGl2ZUVsZW1lbnQsIFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyAgIHRoaXMuYXBwZW5kSGVhZGVyVG9GYWtlVGFibGUoKTtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb25GcmFtZUlkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uRnJhbWVJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkanVzdFRhYmxlSGVhZChldmVudCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcmV2U2Nyb2xsVG9wRm9ySGlkZGVuSGVhZGVyID0gZXZlbnQuc3JjRWxlbWVudC5zY3JvbGxUb3A7XG5cbiAgICAgICAgICAgIC8vZGlzYWJsZWQgZm9yIElFMTEvSUU5ICh0b28gc2xvdylcbiAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgIGlmICh0aGlzLmFuaW1hdGlvbkZyYW1lSWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbkZyYW1lSWQpO1xuICAgICAgICAgICAgLy8gICAgfVxuXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5hbmltYXRpb25GcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpPT50aGlzLmFkanVzdFRhYmxlSGVhZChldmVudCwgdHJ1ZSkpO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFN1YmplY3QubmV4dChldmVudCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiDnlLvpnaLjgYzjg6rjgrXjgqTjgrrjgZXjgozjgZ/pmpvjgavli5XjgYvjgZnjgqTjg5njg7Pjg4hcbiAgICAgKi9cbiAgICB0YWJsZVJlc2l6ZSgpIHtcbiAgICAgICAgdGhpcy5hZGp1c3RUYWJsZUZvb3RlcigpO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogRG8gY2hlY2sgbGlmZWN5Y2xlXG4gICAgICovXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2VEaWZmZXIuZGlmZih0aGlzLl9kYXRhU291cmNlKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGNWaXJ0dWFsU2Nyb2xsSGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjVmlydHVhbFNjcm9sbFZpZXdQb3J0KHRoaXMucHJldlNjcm9sbFRvcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2hlY2tTaG93QmxhbmtSb3coKTtcbiAgICAgICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hUYWJsZVNvcnRlcigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSAmJiB0aGlzLnZpcnR1YWxTY3JvbGxEYXRhU291cmNlRGlmZmVyLmRpZmYodGhpcy5fdmlydHVhbFZpZXdQb3J0KSkge1xuICAgICAgICAgIHRoaXMuY2hlY2tTaG93QmxhbmtSb3coKTtcbiAgICAgICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jaGVja0N1c3RvbVJvd3NGb3JDaGFuZ2VkKCk7XG4gICAgICAgICAgdGhpcy5jaGVja0NvbHVtbnNGb3JDaGFuZ2VkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0IGxpZmVjeWNsZS4gQ2FsbCBwYXJlbnQgY2xhc3MgbmdPbkluaXRcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBBZnRlciB2aWV3IGluaXQgbGlmZWN5Y2xlLiBBcHBseSBqUXVlcnkgcGx1Z2luIGFuZCBldmVudCBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuXG4gICAgICAgIC8vMTcyNjogSXQgbG9va3MgbGlrZSBzb3BoaWEgYWxzbyBxdWVyeWluZyBmb3IgdGFibGUgY29sdW1uIGRlZiBzbyB3ZSBuZWVkIHRvIHN0b3JlIHRvIG91ciBwYXJlbnRcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuX2dldE5vbmVBY3RpdmVWaWV3UGFyZW50KCkgfHwgdGhpcy5nZXRQYXJlbnRWaWV3KCk7XG5cbiAgICAgICAgaWYgKHZpZXcgIT0gbnVsbCAmJiB0aGlzLmNvbHVtbnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLmZpbHRlcihjb2w9PmNvbC5pZCAhPSBudWxsICYmIGNvbC5pZCAhPT0gXCJcIikuZm9yRWFjaChjb2w9PntcbiAgICAgICAgICAgICAgaWYgKHZpZXdbXCJfdGFibGVDb2x1bW5zTWFwXCJdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2aWV3W1wiX3RhYmxlQ29sdW1uc01hcFwiXSA9IG5ldyBNYXA8c3RyaW5nLCBCYXNlQ29tcG9uZW50PigpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmlld1tcIl90YWJsZUNvbHVtbnNNYXBcIl0uc2V0KEtleVV0aWxzLnRvTWFwS2V5KGNvbC5pZCksIGNvbCBhcyBhbnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2Ryb3BwYWJsZT9cbiAgICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlID09PSB0cnVlIHx8IHRoaXMuZHJvcHBhYmxlID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgJCh0aGlzLnRhYmxlQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQpLmRyb3BwYWJsZSh7XG4gICAgICAgICAgICAgICAgY2xhc3Nlczoge1xuICAgICAgICAgICAgICAgICAgXCJ1aS1kcm9wcGFibGUtaG92ZXJcIjogXCJ1aS1zdGF0ZS1ob3ZlclwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBob3ZlckNsYXNzOiBcInVpLXN0YXRlLWhvdmVyXCIsXG4gICAgICAgICAgICAgICAgYWNjZXB0OiBcInRyXCIsXG4gICAgICAgICAgICAgICAgZHJvcDogKGV2ZW50LCB1aSk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkRyYWdEcm9wLmVtaXQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRvbGVyYW5jZTogXCJwb2ludGVyXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxTdWJjcmlwdGlvbiA9IHRoaXMuc2Nyb2xsU3ViamVjdC5waXBlKGRlYm91bmNlKCgpPT50aW1lcih0aGlzLnNjcm9sbFRpbWVvdXQpKSkuc3Vic2NyaWJlKChldmVudCk9PntcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLmdob3N0SGVhZGVyLm5hdGl2ZUVsZW1lbnQsIFwiZGlzcGxheVwiKTtcblxuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICB0aGlzLnJlY2FsY3VsYXRlVmlydHVhbFNjcm9sbERhdGEoZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuYWRqdXN0VGFibGVIZWFkKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyU3R5bGVzID0ge1xuICAgICAgICAgICAgXCJvdmVyZmxvdy15XCI6IFwiYXV0b1wiLFxuICAgICAgICAgICAgXCJvdmVyZmxvdy14XCI6IFwidmlzaWJsZVwiLFxuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCJcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb250cm9sSGVpZ2h0ID09IG51bGwgfHwgdGhpcy5jb250cm9sSGVpZ2h0ID09IFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWVudEhlaWdodFZpcnR1YWxTY3JvbGwgPSAodGhpcy50YWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgZWxzZSBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGllbnRIZWlnaHRWaXJ0dWFsU2Nyb2xsID0gcGFyc2VJbnQodGhpcy5jb250cm9sSGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIGlmIChpc05hTih0aGlzLmNsaWVudEhlaWdodFZpcnR1YWxTY3JvbGwpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY0NhbGNOb1ZpcnR1YWxSb3coKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNWaWV3SW5pdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGFibGVTdHlsZXMgPSB7XG4gICAgICAgICAgICAgICAgXCJ0b3BcIjogXCIwcHhcIixcbiAgICAgICAgICAgICAgICBcImxlZnRcIjogXCIwcHhcIixcbiAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IFwiY2FsYygxMDAlIC0gMTdweClcIixcbiAgICAgICAgICAgICAgICBcIm1heC13aWR0aFwiOiBcIjEwMHZ3XCIsXG4gICAgICAgICAgICAgICAgXCJtYXgtaGVpZ2h0XCI6IFwiMTAwdmhcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGxQcm9ncmVzc1N0eWxlcyA9IHtcbiAgICAgICAgICAgICAgICBcInRvcFwiOiBcIjBweFwiLFxuICAgICAgICAgICAgICAgIFwiZGlzcGxheVwiOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNhbGNWaXJ0dWFsVGFibGVQb3NpdGlvbigwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAvL2ZpeCBleHByZXNzaW9uIGhhcyBjaGFuZ2VkIGJsYWggYmxhaCBibGFoXG4gICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY1ZpcnR1YWxTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY1ZpcnR1YWxTY3JvbGxWaWV3UG9ydCgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuX2lzVmlld0luaXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pbml0UGx1Z2lucygpO1xuXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLmtleXVwSGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwcml2YXRlIGluaXRQbHVnaW5zKCkge1xuICAgICAgICBpZiAodGhpcy4kZHJhZ2FibGVDb2x1bW5zKSB7XG4gICAgICAgICAgICB0aGlzLiRkcmFnYWJsZUNvbHVtbnMuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdFRtICE9IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5pbml0VG0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgKHRoaXMudGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50YWJsZS5uYXRpdmVFbGVtZW50LCBcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdFRtID0gc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50YWJsZS5uYXRpdmVFbGVtZW50LCBcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWGjeihqOekuuaZguOBq+OCueOCr+ODreODvOODq+ODkOODvOOBruS9jee9ruOCkuaIu+OBmVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYmxlQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgalF1ZXJ5VGFibGUgPSBqUXVlcnkodGhpcy50YWJsZS5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmFibGVDb2x1bW5EcmFnZ2luZyA9PSBudWxsIHx8IHRoaXMuZW5hYmxlQ29sdW1uRHJhZ2dpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGRyYWdhYmxlQ29sdW1ucyA9IGpRdWVyeVRhYmxlLmRyYWdhYmxlQ29sdW1ucyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcENhbGxiYWNrOiAoZnJvbUluZGV4LCB0b0luZGV4KT0+dGhpcy5zd2FwQ29sdW1ucyhmcm9tSW5kZXgsIHRvSW5kZXgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdFbmRDYWxsYmFjazogKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpcEdob3N0SGVhZGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyU3R5bGVzW1wib3ZlcmZsb3cteVwiXSA9IFwiYXV0b1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWRTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdTdGFydENhbGxiYWNrOiAoY29sSWR4KT0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lwR2hvc3RIZWFkZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FuRHJhZyA9IHRoaXMuY2FuRHJhZ0NvbHVtbihjb2xJZHgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYW5EcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbENvbnRhaW5lclN0eWxlc1tcIm92ZXJmbG93LXlcIl0gPSBcImhpZGRlblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaXNhYmxlZFNjcm9sbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FuRHJhZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdFbnRlckNhbGxiYWNrOiAoY29sSWR4KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYW5EcmFnQ29sdW1uKGNvbElkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoKHRoaXMuZW5hYmxlU29ydCA9PSBudWxsIHx8IHRoaXMuZW5hYmxlU29ydCA9PT0gdHJ1ZSkgJiYgdGhpcy4kdGFibGVzb3J0ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHRhYmxlc29ydGVyID0galF1ZXJ5VGFibGUudGFibGVzb3J0ZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRzICAgICAgICA6IFsnemVicmEnLCAnY29sdW1ucyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c051bWJlckZvcm1hdCA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleCA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0UmVzZXQgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydFJlc3RhcnQgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0U3RhYmxlIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXlJbml0OiB0cnVlIC8vIG1vdmUgdGhlIGluaXRpYWwgcGVyZm9ybWFuY2UgaGl0IHRvIGZpcnN0IHNvcnQgc28gdGhlIHRhYmxlIHdvdWxkIGxvYWQgZmFzdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsICE9PSB0cnVlICYmIHRoaXMuJHRhYmxlc29ydGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHRhYmxlc29ydGVyLnRyaWdnZXIoXCJ1cGRhdGVIZWFkZXJzXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRIZWFkZXJXaWR0aEhlaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuYWJsZUNvbHVtblJlc2l6ZSA9PSBudWxsIHx8IHRoaXMuZW5hYmxlQ29sdW1uUmVzaXplID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0X2NvbHVtbnMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcmlnaW5hbF9jb2x1bW5XaWR0aHMgPSBuZXcgQXJyYXkoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbHVtbiA9IHRoaXMuY29sdW1ucy5maW5kKChpdGVtLCBpZHgpPT5pZHggPT09IGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvbHVtbiAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZENoaWxkcmVuID0gdGhpcy50YWJsZUhlYWQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0aDpudGgtY2hpbGQoJyArIChpKzEpICsgJyknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0X2NvbHVtbnMucHVzaChoZWFkQ2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbF9jb2x1bW5XaWR0aHMucHVzaChoZWFkQ2hpbGRyZW4uc3R5bGUud2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFudXBDb2xSZXNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGNvbFJlc2l6YWJsZSA9IGpRdWVyeVRhYmxlLmNvbFJlc2l6YWJsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl2ZURyYWc6IGZhbHNlLCAvL3R1cm5pbmcgdGhpcyBvbiB3aWxsIGluY3VycmVkIGEgc2V2ZXJlIHBlcmZvcm1hbmNlIHBlbmFsdHkgb24gSUUgc28gbGVhdmUgaXQgb2ZmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplTW9kZTogJ292ZXJmbG93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsUmVmcmVzaDogdHJ1ZSwgLy9BZnRlciBjbG9zaW5nIHRoZSB3aW5kb3cgYW5kIG9wZW5pbmcgYWdhaW4sIGNvbHVtblJlc2l6ZXIgY2FuJ3Qgd29yay4gVG8gZml4IHRoYXQsIHRoaXMgdmFsdWUgaXMgbmVlZGVkLixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJPbmx5OiB0cnVlIC8vYWxsb3cgZHJhZ2dpbmcgdXNpbmcgaGVhZGVyIG9ubHlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGFyZ2V0X2NvbHVtbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldENvbHVtbiA9IHRhcmdldF9jb2x1bW5zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRDaGlsZHJlbl93aWR0aCA9IHRoaXMudG9XaG9sZU51bWJlcih0YXJnZXRDb2x1bW4uc3R5bGUud2lkdGguc2xpY2UoMCwtMikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsQ2hpbGRyZW5fd2lkdGggPSB0aGlzLnRvV2hvbGVOdW1iZXIob3JpZ2luYWxfY29sdW1uV2lkdGhzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZihoZWFkQ2hpbGRyZW5fd2lkdGggPCBvcmlnaW5hbENoaWxkcmVuX3dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0YXJnZXRDb2x1bW4sIFwid2lkdGhcIiwgb3JpZ2luYWxfY29sdW1uV2lkdGhzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRfY29sdW1ucyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbF9jb2x1bW5XaWR0aHMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RUYWJsZUZvb3RlcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudGFibGUubmF0aXZlRWxlbWVudCwgXCJ0YWJsZS1sYXlvdXRcIiwgdGhpcy50YWJsZUxheW91dCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFibGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMudGFibGUubmF0aXZlRWxlbWVudCwgXCJ2aXNpYmlsaXR5XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIC8vfVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogRGVzdHJveSBsaWZlY3ljbGUuIFJlbW92ZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5jbGVhblVwQ2hpbGROb2Rlcyh0cnVlKTtcbiAgICAgICAgdGhpcy5jbGVhckhlYWRlck5vZGVzKHRydWUpO1xuXG4gICAgICAgIC8vMTcyNjogSXQgbG9va3MgbGlrZSBzb3BoaWEgYWxzbyBxdWVyeWluZyBmb3IgdGFibGUgY29sdW1uIGRlZiBzbyB3ZSBuZWVkIHRvIHN0b3JlIHRvIG91ciBwYXJlbnRcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuX2dldE5vbmVBY3RpdmVWaWV3UGFyZW50KCkgfHwgdGhpcy5nZXRQYXJlbnRWaWV3KCk7XG5cbiAgICAgICAgaWYgKHZpZXcgIT0gbnVsbCAmJiB2aWV3W1wiX3RhYmxlQ29sdW1uc01hcFwiXSAhPSBudWxsKSB7XG4gICAgICAgICAgdmlld1tcIl90YWJsZUNvbHVtbnNNYXBcIl0uY2xlYXIoKTtcbiAgICAgICAgICB2aWV3W1wiX3RhYmxlQ29sdW1uc01hcFwiXSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW4gIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdDaGlsZHJlbk1hcCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fdmlld0NoaWxkcmVuTWFwLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92aWV3Q2hpbGRyZW5NYXAgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbFN1YmNyaXB0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbFN1YmNyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3MgPSBudWxsO1xuICAgICAgICB0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3NKc29uID0gbnVsbDtcblxuICAgICAgICB0aGlzLnNjcm9sbFN1YmplY3QgPSBudWxsO1xuICAgICAgICB0aGlzLnNjcm9sbFN1YmNyaXB0aW9uID0gbnVsbDtcblxuICAgICAgICBpZih0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmICh0aGlzLm1vdXNlVXBIYW5kbGVyKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgIC8vICAgICB0aGlzLm1vdXNlVXBIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmICh0aGlzLmtleXVwSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy50YWJsZS5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLmtleXVwSGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmtleXVwSGFuZGxlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kZHJhZ2FibGVDb2x1bW5zICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJGRyYWdhYmxlQ29sdW1ucy5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAodGhpcy5jb2x1bW5zQ2hhbmdlU3Vic2NyaXB0aW9uICE9IG51bGwpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuY29sdW1uc0NoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gdGhpcy5jb2x1bW5zQ2hhbmdlU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlRGlmZmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb2x1bW5zRGlmZmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdXN0b21Sb3dEaWZmZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGxEYXRhU291cmNlRGlmZmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFJvd3MgPSBudWxsO1xuICAgICAgICB0aGlzLnRhYmxlSGVhZCA9IG51bGw7XG4gICAgICAgIHRoaXMudGFibGVXcmFwcGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy50YWJsZUNvbnRhaW5lciA9IG51bGw7XG4gICAgICAgIHRoaXMudGFibGUgPSBudWxsO1xuICAgICAgICB0aGlzLnByZU1vdXNlRXZlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLnNjcm9sbENvbnRhaW5lclN0eWxlcyA9IG51bGw7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBDaGVjayB0byBzZWUgaWYgY29sdW1ucyBoYXZlIGNoYW5nZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoZWNrQ29sdW1uc0ZvckNoYW5nZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbnMgIT0gbnVsbCAmJiB0aGlzLmNvbHVtbnNEaWZmZXIuZGlmZih0aGlzLmNvbHVtbnMubWFwPGFueT4oaXRlbT0+e1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiBpdGVtLnZpc2libGUsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBpdGVtLmhlYWRlcixcbiAgICAgICAgICAgICAgICBjb250cm9sV2lkdGg6IGl0ZW0uY29udHJvbFdpZHRoLFxuICAgICAgICAgICAgICAgIGxvY2tlZDogaXRlbS5sb2NrZWQsXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogaXRlbS5lbmFibGVkLFxuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBpdGVtLnNvcnRhYmxlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBLOiBETyBOT1QgUkVNT1ZFRFxuICAgICAgICAgICAgLy8gQ29tbWVudCB0aGlzIG91dCBmb3Igbm93IGFuZCByZXZlcnQgdG8gcHJldmlvdXMsIHdpbGwgYnJpbmcgdGhpcyBiYWNrXG4gICAgICAgICAgICAvLyB3aGVuIHdlIGFkZGVkIGEgZGlmZiB0byBjaGVjayBmb3IgY2hhbmdlcyBpbiB2dC1yb3dcbiAgICAgICAgICAgIC8vIHJldHVybiBpdGVtLnZpc2libGUgK1xuICAgICAgICAgICAgLy8gICAgIGl0ZW0uaGVhZGVyICtcbiAgICAgICAgICAgIC8vICAgICBpdGVtLmNvbnRyb2xXaWR0aCArXG4gICAgICAgICAgICAvLyAgICAgaXRlbS5sb2NrZWQgK1xuICAgICAgICAgICAgLy8gICAgIGl0ZW0uZW5hYmxlZCArXG4gICAgICAgICAgICAvLyAgICAgaXRlbS5zb3J0YWJsZTtcbiAgICAgICAgfSkpKXtcbiAgICAgICAgICAvL3RoaXMuY2xlYW5VcENoaWxkTm9kZXMoKTtcbiAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIHRoaXMucmVjQ2FsY05vVmlydHVhbFJvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwcml2YXRlIGNoZWNrQ3VzdG9tUm93c0ZvckNoYW5nZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLl90YWJsZVJvdyAhPSBudWxsICYmIHRoaXMuY3VzdG9tUm93RGlmZmVyLmRpZmYodGhpcy5fdGFibGVSb3cgYXMgYW55KSkge1xuICAgICAgICAgIHRoaXMuY2hlY2tTaG93QmxhbmtSb3coKTtcbiAgICAgICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHByaXZhdGUgY2xlYXJIZWFkZXJOb2RlcyhudWxsT3V0SGVhZE5vZGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgaWYgKHRoaXMuaGVhZE5vZGUgIT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5oZWFkTm9kZS5jaGlsZE5vZGVzICE9IG51bGwgJiYgdGhpcy5oZWFkTm9kZS5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIHRoaXMuaGVhZE5vZGUuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50VmlldyA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xuXG4gICAgICAgICAgICBpZiAocGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHBhcmVudFZpZXcucmVtb3ZlVmlld0NoaWxkRnJvbU1hcChub2RlLmdldElkKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhlYWROb2RlLmNoaWxkTm9kZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaWYgKG51bGxPdXRIZWFkTm9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmhlYWROb2RlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIENsZWFuIHVwIG91ciBmYXV4IHRhYmxlIGNoaWxkcmVuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjbGVhblVwQ2hpbGROb2Rlcyhza2lwVHJhY2tpbmdWaXJ0dWFsUm93OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50VmlldyA9IHRoaXMuZ2V0UGFyZW50VmlldygpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIHRoaXMubm9kZXMpIHtcbiAgICAgICAgICAgICAgICAvL2NhY2hlIG1vZGlmaWVkIGRhdGEgaWYgdmlydHVhbCBzY3JvbGxcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHNraXBUcmFja2luZ1ZpcnR1YWxSb3cgIT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRMb2NhbE5hbWUoKSA9PT0gXCJyb3dcIiAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzW25vZGVbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF1dICE9IG51bGxcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tJbml0TW9kaWZpZWRWaXJ0dWFsUm93c0pzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzSnNvbltub2RlW1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdXSA9IG5vZGUudG9Kc29uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9yZW1vdmVkIG91cnNlbGYgZnJvbSBwYXJlbnQgY2FjaGVcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudFZpZXcucmVtb3ZlVmlld0NoaWxkRnJvbU1hcChub2RlLmdldElkKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub2RlcyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wcmV2U2VsZWN0ZWRSb3dzID0gW107XG4gICAgICAgIHRoaXMubGFzdFNlbGVjdGVkUm93SW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGF0YXNvdXJjZSByb3cgY291bnRcbiAgICAgKiBAcmV0dXJucyBOdW1iZXIgb2Ygcm93cyBpbiBbW2RhdGFTb3VyY2VdXVxuICAgICAqL1xuICAgIGdldFJvd0NvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlID8gdGhpcy5fZGF0YVNvdXJjZS5sZW5ndGggOiAwO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogQWRkL3JlbW92ZSByb3cgdG8gbGlzdCBvZiBzZWxlY3RlZCByb3dzXG4gICAgICogQHBhcmFtIHJvd1xuICAgICAqIEBwYXJhbSBpc1NlbGVjdGVkIElmIHRydWUsIHJvdyB3aWxsIGJlIGFkZGVkLCBvdGhlcndpc2Ugcm93IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHNlbGVjdGVkIHJvd3MgY29sbGVjdGlvblxuICAgICAqL1xuICAgIHNlbGVjdFJvdyhyb3c6IEhUTUxFbGVtZW50V3JhcHBlciwgaXNTZWxlY3RlZDogYm9vbGVhbikge1xuICAgICAgICBsZXQgcm93SW5kZXggPSAtMTtcblxuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wTm9kZSA9IF8uZmluZCh0aGlzLm5vZGVzLCAobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlID09PSByb3c7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRlbXBOb2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByb3dJbmRleCA9IHRlbXBOb2RlW1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm93SW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLm5vZGVzLCAobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlID09PSByb3c7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb3dJbmRleCA+PSAwICYmIHJvd0luZGV4IDwgdGhpcy5fZGF0YVNvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBpZHggPSBfLmZpbmRJbmRleCh0aGlzLnNlbGVjdGVkUm93cywgKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByb3cgPT09IHJvd0luZGV4O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgLy9pZiBpdCB3YXNuJ3Qgc2VsZWN0ZWQsIGFkZCBpdCBpbiBzZWxlY3RlZFJvd3MuXG4gICAgICAgICAgICAgICAgaWYgKGlkeCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvd3MucHVzaChyb3dJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2lmIGl0IHdhcyBzZWxlY3RlZCBiZWZvcmUsIHJlbW92ZSBpdCBmcm9tIHNlbGVjdGVkUm93cy5cbiAgICAgICAgICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvd3Muc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBjbGljayBvbiByb3dcbiAgICAgKiBAcGFyYW0gZXZlbnQgTW91c2UgY2xpY2sgZXZlbnRcbiAgICAgKiBAcGFyYW0gcm93SW5kZXggSW5kZXggb2YgdGhlIHJvdyB0aGF0IHdhcyBjbGlja2VkXG4gICAgICogQGV2ZW50IG9uU3RhdGVDaGFuZ2VcbiAgICAgKi9cbiAgICBvblJvd0NsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCByb3dJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIC8vYWRkIHRoZSByb3cgdG8gdmlldyBjaGlsZHJlbiBtYXAgZm9yIGxvb2t1cFxuICAgICAgICBjb25zdCBwYXJlbnRWaWV3ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChwYXJlbnRWaWV3ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHBhcmVudFZpZXcuYWRkVmlld0NoaWxkVG9NYXAodGhpcy5ub2Rlc1tyb3dJbmRleF0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2aW91c1Jvd0luZGV4ICE9IG51bGwgJiYgdGhpcy5ub2Rlc1t0aGlzLnByZXZpb3VzUm93SW5kZXhdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRWaWV3LnJlbW92ZVZpZXdDaGlsZEZyb21NYXAodGhpcy5ub2Rlc1t0aGlzLnByZXZpb3VzUm93SW5kZXhdLmdldElkKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2aW91c1Jvd0luZGV4ID0gcm93SW5kZXg7XG4gICAgICAgIHRoaXMudHJpZ2dlclN0YXRlQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwcml2YXRlIHRyaWdnZXJTdGF0ZUNoYW5nZSgpIHtcbiAgICAgIGNvbnN0IGNsaWVudEV2ZW50ID0gbmV3IENsaWVudEV2ZW50KHRoaXMsIGV2ZW50KTtcblxuICAgICAgaWYgKEFwcFV0aWxzLmN1c3RvbWl6ZUNsaWVudEV2ZW50ICE9IG51bGwpIHtcbiAgICAgICAgQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQodGhpcywgY2xpZW50RXZlbnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5nZXRQYXJlbnRWaWV3KCkgIT0gbnVsbCkge1xuICAgICAgICAgIGNsaWVudEV2ZW50LnNldFBhcmFtZXRlcihcInNjcmVlbklkXCIsIHRoaXMuZ2V0UGFyZW50VmlldygpLmdldElkKCkpO1xuICAgICAgfVxuXG4gICAgICBjbGllbnRFdmVudC5zZXRQYXJhbWV0ZXIoXCJpZFwiLCB0aGlzLmdldElkKCkpO1xuXG4gICAgICAvL3VzZXIgY2FuIHNlbGVjdGVkIG1vcmUgdGhhbiBvbmUgcm93XG4gICAgICBsZXQgcm93SWQ6IHN0cmluZyA9IHRoaXMuc2VsZWN0ZWRSb3dzLm1hcChpZHg9PnRoaXMuZ2V0Q2hpbGRCeU9yaWdpbmFsUm93SW5kZXgoaWR4KS5nZXRJZCgpKS5qb2luKFwiLFwiKTtcblxuICAgICAgY2xpZW50RXZlbnQuc2V0UGFyYW1ldGVyKFwicm93SWRcIiwgcm93SWQpO1xuXG4gICAgICB0aGlzLmdldFNlc3Npb24oKS5nZXRFdmVudEhhbmRsZXIoKS5zZXRDbGllbnRFdmVudChjbGllbnRFdmVudCk7XG4gICAgICB0aGlzLm9uU3RhdGVDaGFuZ2UuZW1pdCgpO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHJpdmF0ZSBnZXRDaGlsZEJ5T3JpZ2luYWxSb3dJbmRleChpbmRleDogbnVtYmVyKTogSFRNTEVsZW1lbnRXcmFwcGVyIHtcbiAgICAgICAgbGV0IG5vZGU6IEhUTUxFbGVtZW50V3JhcHBlciA9IHRoaXMubm9kZXNbaW5kZXhdO1xuXG4gICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIG5vZGUgPSBfLmZpbmQodGhpcy5ub2RlcywgKGVsOiBIVE1MRWxlbWVudFdyYXBwZXIpPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsW1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdID09PSBpbmRleDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgaGFuZGxlTW91c2VVcChldmVudDogTW91c2VFdmVudCwgcm93SW5kZXg6IG51bWJlciwgcm93OiBhbnkpIHtcbiAgICAgIC8vZm9yIGRyYWdnYWxlIHJvd3MsIHdlIG5lZWQgdG8gZG91YmxlIGNoZWNrIHJvdyBzZWxlY3Rpb24gYWdhaW5cbiAgICAgIGlmICh0aGlzLmRyYWdnYWJsZVJvd3MgPT09IHRydWUgJiYgdGhpcy5zaG91bGRIYW5kbGVNb3VzZVVwID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlUm93U2VsZWN0aW9uKGV2ZW50LCByb3dJbmRleCwgcm93LCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zaG91bGRIYW5kbGVNb3VzZVVwID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBTZXQgcm93IGFzIHNlbGVjdGVkL3Vuc2VsZWN0ZWRcbiAgICAgKiBAcGFyYW0gcm93SW5kZXggSW5kZXggb2Ygcm93IHRvIHRvZ2dsZSBvbi9vZmZcbiAgICAgKi9cbiAgICB0b2dnbGVSb3dTZWxlY3Rpb24oZXZlbnQ6IE1vdXNlRXZlbnQsIHJvd0luZGV4OiBudW1iZXIsIHJvdzogYW55LCBpc01vdXNlVXA6IGJvb2xlYW4gPSBmYWxzZSkge1xuXG4gICAgICAgIGNvbnN0IHRhcmdldEVsID0gPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldDtcblxuICAgICAgICBpZiAodGFyZ2V0RWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09ICdpbnB1dCcgJiYgdGFyZ2V0RWwuZ2V0QXR0cmlidXRlKCd0eXBlJykgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldEVsLmdldEF0dHJpYnV0ZSgndHlwZScpLnRvTG93ZXJDYXNlKCkgPT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXRFbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ2J1dHRvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhY3R1YWxSb3dJbmRleCA9IHJvd0luZGV4O1xuXG4gICAgICAgIC8vcHJldmVudCB0ZXh0IHNlbGVjdGlvbiB3aGVuIHNoaWZ0S2V5IGlzIHByZXNzZWRcbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ID09PSB0cnVlICYmIGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSAhPT0gXCJub25lXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUgJiYgcm93W1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgYWN0dWFsUm93SW5kZXggPSByb3dbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vaWYgdXNlciBpcyBub3QgcHJlc3Npbmcgc2hpZnQga2V5LCBjbGVhciBhbGwgcHJldmlvdXMgc2VsZWN0aW9uXG4gICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgIT09IHRydWUgJiYgZXZlbnQuY3RybEtleSAhPT0gdHJ1ZSAmJiBldmVudC5idXR0b25zICE9PSAyKSB7XG4gICAgICAgICAgICAgIGxldCBjbGVhclNlbGVjdGlvbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlUm93cyA9PT0gdHJ1ZSAmJiBpc01vdXNlVXAgIT09IHRydWUgJiYgdGhpcy5zZWxlY3RlZFJvd3MuaW5kZXhPZihhY3R1YWxSb3dJbmRleCkgPj0gMCkge1xuICAgICAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG91bGRIYW5kbGVNb3VzZVVwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChjbGVhclNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzLnNwbGljZSgwLCB0aGlzLnNlbGVjdGVkUm93cy5sZW5ndGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpZHggPSBfLmZpbmRJbmRleCh0aGlzLnNlbGVjdGVkUm93cywgKHJvdykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByb3cgPT09IGFjdHVhbFJvd0luZGV4O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChpZHggPCAwKSB7XG4gICAgICAgICAgICAgICAgLy9pZiBtdWx0aSByb3cgYW5kIHVzZXIgaXMgcHJlc3Npbmcgc2hpZnQvY3RybCBrZXksIGFsbG93IG11bHRpIHJvdyBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSBcIm11bHRpUm93XCIgJiYgKGV2ZW50LnNoaWZ0S2V5IHx8IGV2ZW50LmN0cmxLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5jdHJsS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93cy5wdXNoKGFjdHVhbFJvd0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdFNlbGVjdGVkUm93SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3RTZWxlY3RlZFJvd0luZGV4ID4gcm93SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHJvd0luZGV4OyBpIDwgdGhpcy5sYXN0U2VsZWN0ZWRSb3dJbmRleDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93cy5wdXNoKHRoaXMuZ2V0T3JpZ2luYWxJbmRleChpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubGFzdFNlbGVjdGVkUm93SW5kZXggPCByb3dJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5sYXN0U2VsZWN0ZWRSb3dJbmRleCArIDE7IGkgPD0gcm93SW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvd3MucHVzaCh0aGlzLmdldE9yaWdpbmFsSW5kZXgoaSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvd3MucHVzaChhY3R1YWxSb3dJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93cy5wdXNoKGFjdHVhbFJvd0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzID0gW2FjdHVhbFJvd0luZGV4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmN0cmxLZXkgPT09IHRydWUgJiYgaWR4ID49IDAgJiYgZXZlbnQuYnV0dG9ucyAhPT0gMikge1xuICAgICAgICAgICAgICAgIC8vaWYgY29udHJvbCBrZXkgaXMgcHJlc3NlZCAoYW5kIG5vdCByaWdodCBjbGljayksIHJlbW92ZSB0aGUgc2VsZWN0ZWQgcm93XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvd3Muc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgdGhpcy5sYXN0U2VsZWN0ZWRSb3dJbmRleCA9IHJvd0luZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyU3RhdGVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gdGhlIGFjdHVhbCBpbmRleGVzIGJhc2Ugb24gZGF0YXNvdXJjZVxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRPcmlnaW5hbEluZGV4KGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlICYmIHRoaXMubm9kZXNbaW5kZXhdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGVzW2luZGV4XVtUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgW1tkaXNhYmxlZF1dIHByb3BlcnR5IHZhbHVlXG4gICAgICogQHBhcmFtIGJvbyBUb2dnbGUgW1tkaXNhYmxlZF1dXG4gICAgICovXG4gICAgc2V0RGlzYWJsZWQoYm9vOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBib287XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IFtbZGlzYWJsZWRdXSBwcm9wZXJ0eSB2YWx1ZVxuICAgICAqL1xuICAgIGdldERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIEdldCBhIGNvbGxlY3Rpb24gb2YgYWxsIHJvdyBlbGVtZW50cyB0aGF0IGFyZSBzZWxlY3RlZFxuICAgICAqIEByZXR1cm5zIFRoZSBzZWxlY3RlZCByb3dzXG4gICAgICovXG4gICAgZ2V0U2VsZWN0ZWRSb3dzKCk6IEFycmF5PEhUTUxFbGVtZW50V3JhcHBlcj4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFJvd0VsZW1lbnRzOiBBcnJheTxIVE1MRWxlbWVudFdyYXBwZXI+ID0gW107XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUm93cy5sZW5ndGggPiAwICYmIHRoaXMubm9kZXMgIT0gbnVsbCAmJiB0aGlzLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IHJvd0luZGV4IG9mIHRoaXMuc2VsZWN0ZWRSb3dzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiB0aGlzLm5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmdldExvY2FsTmFtZSgpID09PSBcInJvd1wiICYmIG5vZGUucm93TnVtYmVyID09PSByb3dJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRSb3dFbGVtZW50cy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRSb3dFbGVtZW50cztcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIEdldCBjb2xsZWN0aW9uIG9mIHNlbGVjdGVkIHJvdyBpbmRleGVzXG4gICAgICovXG4gICAgZ2V0U2VsZWN0ZWRSb3dJbmRleGVzKCk6IEFycmF5PG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFJvd3MubWFwKHJvdyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcm93W3RoaXMuUk9XX0lOREVYX0tFWV07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIHJvdyBzZWxlY3QgZXZlbnRcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBoYW5kbGVSb3dTZWxlY3Rpb24oZXZlbnQ6IGFueSkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAoIV8uaXNFcXVhbChldmVudC5zZWxlY3RlZCwgdGhpcy5fcHJldlNlbGVjdGVkUm93cykpIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChuZXcgVGFibGVTZWxlY3Rpb25FdmVudChldmVudC5zZWxlY3RlZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcHJldlNlbGVjdGVkUm93cyA9IGV2ZW50LnNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIGRvdWJsZSBjbGljayBvbiBjZWxsXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICogQGV2ZW50IG9uRG91YmxlQ2xpY2tcbiAgICAgKi9cbiAgICBoYW5kbGVDZWxsQWN0aXZhdGlvbihldmVudDogYW55KSB7XG4gICAgICAgIGlmIChldmVudC50eXBlID09PSAnZGJsY2xpY2snKSB7XG4gICAgICAgICAgICB0aGlzLm9uRG91YmxlQ2xpY2suZW1pdChuZXcgVGFibGVTZWxlY3Rpb25FdmVudChldmVudC5yb3cpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vaW50ZXJuYWxcbiAgICBhcHBlbmRSb3dJbmRleFRvUm93KHJvdzogYW55LCByb3dJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJvd1t0aGlzLlJPV19JTkRFWF9LRVldID0gcm93SW5kZXg7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlICovXG4gICAgLyoqXG4gICAgICogVHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIGFuZCByZS1yZW5kZXIgdGhlIHRhYmxlXG4gICAgICogQHBhcmFtIGNsZWFyRGF0YSBTZXQgdG8gdHJ1ZSB0byBlbXB0eSB0YWJsZSBkYXRhXG4gICAgICovXG4gICAgcmVmcmVzaChjbGVhckRhdGE6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAoY2xlYXJEYXRhID09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogR2V0IFtbY2hhbmdlRGV0ZWN0b3JSZWZdXSBwcm9wZXJ0eVxuICAgICAqIEByZXR1cm4gdGhlIENoYW5nZURldGVjdG9yXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldENoYW5nZURldGVjdG9yKCk6IENoYW5nZURldGVjdG9yUmVmIHtcbiAgICAgIHJldHVybiB0aGlzLmNoYW5nZURldGVjdG9yUmVmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBOZXhhV2ViIHRhZyBuYW1lXG4gICAgICogQHJldHVybnMgVGFnIG5hbWVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0TnhUYWdOYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJ0YWJsZVwiO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogQ29udmVyIHRoZSBjb250ZW50IG9mIHRoaXMgc2NyZWVucyB0byBKU09OIG9iamVjdCBzbyBpdCBjYW4gYmUgc2VudCB0byB0aGUgc2VydmVyLlxuICAgICAqL1xuICAgIHRvSnNvbigpOiB7fSB7XG4gICAgICAgIGNvbnN0IGpzb246IGFueSA9IHN1cGVyLnRvSnNvbigpO1xuXG4gICAgICAgIC8vIGlmICh0aGlzLmdldFNlbGVjdGVkUm93cygpICE9IG51bGwgJiYgdGhpcy5nZXRTZWxlY3RlZFJvd3MoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vICAgICB0aGlzLnNldEpzb24oanNvbiwgXCJzZWxlY3RlZFJvd3NcIiwgdGhpcy5nZXRTZWxlY3RlZFJvd3MoKS5tYXAoaXRlbT0+aXRlbS50b0pzb24oKSkpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5ub2RlcyAhPSBudWxsICYmXG4gICAgICAgICAgICB0aGlzLm5vZGVzLmxlbmd0aCA+IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvL3ZpcnR1YWwgc2Nyb2xsICh0cmFjayB3aGljaCByb3dzIHdlIGFscmVhZHkgY29udmVydGVkKVxuICAgICAgICAgICAgbGV0IHRlbXBSb3dzOiB7W25hbWU6IHN0cmluZ106IGFueX1cblxuICAgICAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRlbXBSb3dzID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGpzb25bXCJyb3dzXCJdID0gdGhpcy5ub2Rlcy5tYXAoKG5vZGUsIGluZGV4KT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvd0pzb24gPSBub2RlLnRvSnNvbigpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRSb3dzICE9IG51bGwgJiYgdGhpcy5zZWxlY3RlZFJvd3MuaW5kZXhPZihpbmRleCkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICByb3dKc29uW1wic2VsZWN0ZWRcIl0gPSBcInRydWVcIjtcbiAgICAgICAgICAgICAgICAgICAgcm93SnNvbltcImluZGV4XCJdID0gaW5kZXggKyBcIlwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcFJvd3Nbbm9kZVtUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXV0gPSBub2RlW1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByb3dKc29uO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vdmlydHVhbCBzY3JvbGwgZGF0YVxuICAgICAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSAmJiB0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3NKc29uICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlzID0gXy5rZXlzKHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93c0pzb24pO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSB3ZSBub3QgYWxyZWFkeSBjb252ZXJ0ZWQgdGhlbVxuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFJvd3Nba2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqc29uW1wicm93c1wiXS5wdXNoKHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93c0pzb25ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb2x1bW5zICE9IG51bGwgJiYgdGhpcy5jb2x1bW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW5zID0gdGhpcy5jb2x1bW5zO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TG9jYWxOYW1lKCkgPT09IFwidGFibGVcIiAmJlxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uc0hhc0JlZW5Td2FwcGVkID09PSB0cnVlXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zID0gXy5vcmRlckJ5KGNvbHVtbnMsIChjaGlsZDogVGFibGVDb2x1bW5EaXJlY3RpdmUpPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkLm9yaWdpbmFsQ29sdW1uSW5kZXg7XG4gICAgICAgICAgICAgICAgfSkgYXMgYW55O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBqc29uW1wiY29sdW1uRGVmc1wiXSA9IGNvbHVtbnMubWFwKChjb2x1bW4sIGluZGV4KT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlZiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6IHRoaXMudG9Kc29uVmFsdWUoY29sdW1uLnZpc2libGUpLFxuICAgICAgICAgICAgICAgICAgICBcImxvY2tlZFwiOiB0aGlzLnRvSnNvblZhbHVlKGNvbHVtbi5sb2NrZWQpLFxuICAgICAgICAgICAgICAgICAgICBcImVuYWJsZWRcIjogdGhpcy50b0pzb25WYWx1ZShjb2x1bW4uZW5hYmxlZCksXG4gICAgICAgICAgICAgICAgICAgIFwic29ydGFibGVcIjogdGhpcy50b0pzb25WYWx1ZShjb2x1bW4uc29ydGFibGUpLFxuICAgICAgICAgICAgICAgICAgICBcImlzQ2hlY2tlZFwiOiB0aGlzLnRvSnNvblZhbHVlKGNvbHVtbi5pc0NoZWNrZWQpLFxuICAgICAgICAgICAgICAgICAgICBcImN1c3RvbUF0dHJpYnV0ZXNcIjogQmFzZUNvbXBvbmVudC5tYXBUb0pzb24oY29sdW1uLmN1c3RvbUF0dHJpYnV0ZXMpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBjdXN0b21BdHRyaWJ1dGVzIGhhcyAnd2lkdGgnIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgaWYgKGRlZltcImN1c3RvbUF0dHJpYnV0ZXNcIl1bXCJ3aWR0aFwiXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuaGVhZE5vZGUuZ2V0Q2hpbGRBdChpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy50b1dob2xlTnVtYmVyKG5vZGUuaHRtbEVsZW1lbnQuc3R5bGUud2lkdGguc2xpY2UoMCwtMikpOy8vc2VydmVyIGV4cGVjdCB3aG9sZSBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgZGVmW1wiY3VzdG9tQXR0cmlidXRlc1wiXVtcIndpZHRoXCJdID0gdGhpcy50b0pzb25WYWx1ZSh3aWR0aCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbi5pZCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZbXCJpZFwiXSA9IHRoaXMudG9Kc29uVmFsdWUoY29sdW1uLmlkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWZbXCJpZFwiXSA9IEJhc2VDb21wb25lbnQuZ2VuZXJhdGVVbmlxdWVJZChcImNvbHVtblwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uLmxvY2tlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBkZWZbXCJ0YWdOYW1lXCJdID0gXCJsb2NrZWRDb2x1bW5cIjtcbiAgICAgICAgICAgICAgICAgICAgZGVmW1wibnhUYWdOYW1lXCJdID0gXCJsb2NrZWRDb2x1bW5cIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWZbXCJ0YWdOYW1lXCJdID0gXCJjb2x1bW5cIjtcbiAgICAgICAgICAgICAgICAgICAgZGVmW1wibnhUYWdOYW1lXCJdID0gXCJjb2x1bW5cIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2hlYWRlciB0YWcgb2YgY29sdW1uXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwidGFnTmFtZVwiOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICBcIm54VGFnTmFtZVwiOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIjogdGhpcy50b0pzb25WYWx1ZShjb2x1bW4uaGVhZGVyKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uLmhlYWRlckRpcmVjdGl2ZSAmJiBjb2x1bW4uaGVhZGVyRGlyZWN0aXZlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcltcImlkXCJdID0gdGhpcy50b0pzb25WYWx1ZShjb2x1bW4uaGVhZGVyRGlyZWN0aXZlLmlkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJbXCJpZFwiXSA9IEJhc2VDb21wb25lbnQuZ2VuZXJhdGVVbmlxdWVJZChcImhlYWRlclwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZWZbXCJjaGlsZHJlblwiXSA9IFtoZWFkZXJdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGNoaWxkIHRvIEpTT05cbiAgICAgKiBAcGFyYW0gY2hpbGQgY2hpbGQgdG8gYmUgY29udmVydGVkIHRvIEpTT05cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY2hpbGRUb0pzb24oY2hpbGQ6IEJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkLmdldFRhZ05hbWUoKSA9PT0gXCJoZWFkcm93XCIgfHwgY2hpbGQuZ2V0VGFnTmFtZSgpID09PSBcImhlYWRjZWxsXCIgPyBjaGlsZC50b0pzb24oKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBBZGQgZWxlbWVudCB0byBpbnRlcm5hbCBsaXN0IG9mIHJvdywgY2VsbCwgb3IgaGVhZGVyIGNlbGxcbiAgICAgKiBAcGFyYW0gdHlwZSAncm93JyB8ICdjZWxsJyB8ICdoZWFkY2VsbCdcbiAgICAgKiBAcGFyYW0gZXZlbnQgQ3JlYXRlIGV2ZW50XG4gICAgICogQHBhcmFtIHJvd09yQ29sdW1uSW5kZXhcbiAgICAgKiBAcGFyYW0gcm93RGF0YU9yQ29sdW1uRGVmXG4gICAgICovXG4gICAgcmVnaXN0ZXJGYXV4RWxlbWVudCh0eXBlOiBzdHJpbmcsIGV2ZW50OiBPbkNyZWF0ZUV2ZW50LCByb3dPckNvbHVtbkluZGV4OiBudW1iZXIsIHJvd0RhdGFPckNvbHVtbkRlZjogYW55KSB7XG4gICAgICAgIHRoaXMuX2lzSGVhZGVyQ2VsbCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChyb3dEYXRhT3JDb2x1bW5EZWYgPT09IG51bGwgfHxcbiAgICAgICAgICAgIChyb3dEYXRhT3JDb2x1bW5EZWYgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIHJvd0RhdGFPckNvbHVtbkRlZiAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHJvd0RhdGFPckNvbHVtbkRlZi5za2lwVHJhY2tpbmcgIT09IHRydWUpKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJyb3dcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhY2tSb3coZXZlbnQsIHJvd09yQ29sdW1uSW5kZXgsIHJvd0RhdGFPckNvbHVtbkRlZik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiY2VsbFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFja0NlbGwoZXZlbnQsIHJvd09yQ29sdW1uSW5kZXgsIHJvd0RhdGFPckNvbHVtbkRlZik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiaGVhZGNlbGxcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzSGVhZGVyQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFja0hlYWRDZWxsKGV2ZW50LCByb3dEYXRhT3JDb2x1bW5EZWYpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJvd09yQ29sdW1uSW5kZXggPT09IHRoaXMuY29sdW1ucy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRQbHVnaW5zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IFtbbm9kZXNdXSBwcm9wZXJ0eVxuICAgICAqIEByZXR1cm5zIE5vZGUgbGlzdFxuICAgICAqL1xuICAgIGdldFRhYmxlQ2hpbGRyZW4oKTogQXJyYXk8SFRNTEVsZW1lbnRXcmFwcGVyPiB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbnVtYmVyIG9mIG5vZGVzXG4gICAgICogQHJldHVybnMgTnVtYmVyIG9mIG5vZGVzXG4gICAgICovXG4gICAgZ2V0Q2hpbGRDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlcyAhPSBudWxsID8gdGhpcy5ub2Rlcy5sZW5ndGggOiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgY2hpbGRyZW4gb2YgdGhpcyB0YWJsZVxuICAgICAqIEByZXR1cm4gTGlzdCBvZiBjaGlsZHJlblxuICAgICAqL1xuICAgIGdldENoaWxkcmVuKCk6IFZlY3Rvcjxhbnk+IHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW46IFZlY3RvcjxIVE1MRWxlbWVudFdyYXBwZXI+ID0gbmV3IFZlY3RvcjxIVE1MRWxlbWVudFdyYXBwZXI+KCk7XG5cbiAgICAgICAgXy5mb3JFYWNoKHRoaXMuZ2V0VGFibGVDaGlsZHJlbigpLCAoY2hpbGQpPT5jaGlsZHJlbi5hZGQoY2hpbGQpKTtcblxuICAgICAgICByZXR1cm4gY2hpbGRyZW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0geHBhdGhFeHByZXNzaW9uIEdldCBxdWVyeSByZXN1bHQgZnJvbSBhbiB4cGF0aCBleHByZXNzaW9uIHN0cmluZ1xuICAgICAqL1xuICAgIGV2YWx1YXRlWFBhdGgoeHBhdGhFeHByZXNzaW9uOiBzdHJpbmcpOiBhbnkge1xuICAgICAgY29uc3QgcmVzdWx0OiBWZWN0b3I8YW55PiA9IG5ldyBWZWN0b3I8YW55PigpO1xuICAgICAgY29uc3QgeHBhdGhSZXN1bHQ6IFhQYXRoUmVzdWx0ID0gZG9jdW1lbnQuZXZhbHVhdGUoeHBhdGhFeHByZXNzaW9uLnJlcGxhY2UoXCJjZWxsW1wiLCBcInRkW1wiKS5yZXBsYWNlKFwicm93W1wiLCBcInRyW1wiKSwgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIG51bGwsIFhQYXRoUmVzdWx0LkFOWV9UWVBFLCBudWxsKTtcblxuICAgICAgaWYgKHhwYXRoUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IG5vZGU6IE5vZGUgPSB4cGF0aFJlc3VsdC5pdGVyYXRlTmV4dCgpO1xuXG4gICAgICAgIHdoaWxlKG5vZGUpIHtcbiAgICAgICAgICByZXN1bHQuYWRkKG5vZGUpO1xuICAgICAgICAgIG5vZGUgPSB4cGF0aFJlc3VsdC5pdGVyYXRlTmV4dCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hpbGRPckFycmF5T3JTdHJpbmdXdGZcbiAgICAgKiBAcGFyYW0gcm93TnVtYmVyXG4gICAgICovXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBhcHBlbmRDaGlsZChjaGlsZE9yQXJyYXlPclN0cmluZ1d0ZjogYW55LCByb3dOdW1iZXI6IG51bWJlciA9IC0xKSB7XG4gICAgICAgIC8vVE9ETyBuZWVkIHRvIGFwcGVuZCBjaGlsZCB0byBjZXJ0YWluIHJvdz8gZHBlbmRpbmcgb24gY2hpbGRPckFycmF5T3JTdHJpbmdXdGZcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgcm93IGhhcyBiZWVuIHNlbGVjdGVkXG4gICAgICogQHBhcmFtIHJvd0luZGV4IEluZGV4IG9mIHJvdyB0byBjaGVja1xuICAgICAqIEByZXR1cm5zIFRydWUgaWYgcm93IGlzIGEgc2VsZWN0ZWQgcm93XG4gICAgICovXG4gICAgaXNTZWxlY3RlZFJvdyhyb3dJbmRleDogbnVtYmVyLCByb3c6IGFueSkge1xuICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSAmJiByb3dbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF0gIT0gbnVsbCkge1xuICAgICAgICByb3dJbmRleCA9IHJvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRSb3dzICE9IG51bGwgJiYgdGhpcy5zZWxlY3RlZFJvd3MuaW5kZXhPZihyb3dJbmRleCkgPj0gMDtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIEdldCBjdXN0b20gYXR0cmlidXRlcyBvZiByb3cgaWYgaXQgaGFzIGFueSwgb3RoZXJ3aXNlIHJldHVybiBudWxsXG4gICAgICogQHBhcmFtIHJvd1xuICAgICAqIEBwYXJhbSByb3dPckNvbHVtbkluZGV4XG4gICAgICovXG4gICAgZ2V0Um93Q3VzdG9tQXR0cmlidXRlcyhyb3c6IGFueSwgcm93T3JDb2x1bW5JbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5yb3dDdXN0b21BdHRyaWJ1dGVCdWlsZGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvd0N1c3RvbUF0dHJpYnV0ZUJ1aWxkZXIocm93LCByb3dPckNvbHVtbkluZGV4LCAodGhpcy5fZ2V0Tm9uZUFjdGl2ZVZpZXdQYXJlbnQoKSB8fCB0aGlzLmdldFBhcmVudFZpZXcoKSkgYXMgVmlld0NvbXBvbmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm93ICE9IG51bGwgJiYgcm93LmN1c3RvbUF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiByb3cuY3VzdG9tQXR0cmlidXRlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGNvbHVtbiBpcyB2aXNpYmxlLiBFaXRoZXIgYnkgaW5kZXggb3IgY29sdW1uXG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICogQHBhcmFtIGNvbHVtblxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgY29sdW1uIGlzIHZpc2libGVcbiAgICAgKi9cbiAgICBpc0NvbHVtblZpc2libGUoaW5kZXg6IG51bWJlciwgY29sdW1uOiBUYWJsZUNvbHVtbkRpcmVjdGl2ZSA9IG51bGwpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGNvbHVtbiAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gY29sdW1uLnZpc2libGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jb2x1bW5zLmZpbmQoKGl0ZW0sIGlkeCk9PmlkeCA9PT0gaW5kZXgpLnZpc2libGU7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBBZGQgYSBjaGlsZCBjb21wb25lbnQgdG8gdGhlIHRhYmxlXG4gICAgICogQHBhcmFtIGNoaWxkIENvbXBvbmVudCB0byBhZGRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWRkQ2hpbGQoY2hpbGQ6IEJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgc3VwZXIuYWRkQ2hpbGQoY2hpbGQpO1xuICAgICAgICBjb25zdCByb3cgPSB0aGlzLm5vZGVzW3RoaXMubm9kZXMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzSGVhZGVyQ2VsbCAhPT0gdHJ1ZSAmJiByb3cpIHtcbiAgICAgICAgICAgIGNoaWxkLnRhYmxlUm93Tm8gPSByb3cucm93TnVtYmVyO1xuICAgICAgICAgICAgcm93LnBhcmVudFRhYmxlSWQgPSB0aGlzLmlkO1xuICAgICAgICAgICAgcm93LnBhcmVudFRhYmxlID0gdGhpcztcbiAgICAgICAgICAgIC8vd2hlbiB3ZSBnZXQgaGVyZSByb3cuY2hpbGROb2Rlc1tjdXJyZW50TGVuZ3RoXSBzaG91bGQgYmUgdGhlIGNlbGwgcGFyZW50IHJvd1xuICAgICAgICAgICAgLy9hcHBlbmQgY2hpbGQgY29tcG9uZW50IHRvIGNlbGwgKGZvciBkeW5hbWljKVxuICAgICAgICAgICAgaWYgKHJvdy5jaGlsZE5vZGVzW3Jvdy5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGFibGVDb21wb25lbnQ6IFVuYWJsZSB0byByZWdpc3RlciBlbGVtZW50IHRvIGNlbGwgb2YgY3VycmVudCByb3cgKGNlbGwgaXMgbnVsbClcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZShcImlzTG9ja2VkQ29sdW1uXCIsIHJvdy5jaGlsZE5vZGVzW3Jvdy5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdLmdldEF0dHJpYnV0ZShcImlzTG9ja2VkQ29sdW1uXCIsIHRydWUpKTtcbiAgICAgICAgICAgICAgICByb3cuY2hpbGROb2Rlc1tyb3cuY2hpbGROb2Rlcy5sZW5ndGggLSAxXS5zZXRDb21wb25lbnQoY2hpbGQsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgLy9zb3BoaWEgIzE3Mjg6IHJlc3RyaWN0ZWQgcmlnaHQgY2xpY2tcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXN0cmljdENlbGxQb3B1cCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgY2hpbGQuc2tpcEVtaXRDb250ZXh0TWVudUV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzb3J0VmFsdWUgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoXCJzb3J0VmFsdWVcIiwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChzb3J0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHJvdy5jaGlsZE5vZGVzW3Jvdy5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdLmh0bWxFbGVtZW50LCBcImRhdGEtdGV4dFwiLCBzb3J0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vdHJhY2sgY2hhbmdlIGlmIHZpcnR1YWwgc2Nyb2xsXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQgaW5zdGFuY2VvZiBDaGVja2JveENvbXBvbmVudCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQgaW5zdGFuY2VvZiBSYWRpb0J1dHRvbkNvbXBvbmVudCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQgaW5zdGFuY2VvZiBUZXh0RmllbGRDb21wb25lbnQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkIGluc3RhbmNlb2YgQ29tYm9Cb3hDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5JZHggPSByb3cuY2hpbGROb2Rlcy5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vaGFzIGNhY2hlZCBkYXRhP1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3Nbcm93W1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdXSAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzW3Jvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXV1bcm93LmNoaWxkTm9kZXNbY29sdW1uSWR4XVtcIm9yaWdpbmFsQ29sdW1uSW5kZXhcIl1dICE9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzW3Jvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXV1bcm93LmNoaWxkTm9kZXNbY29sdW1uSWR4XVtcIm9yaWdpbmFsQ29sdW1uSW5kZXhcIl1dO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcC50ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2hpbGQgYXMgYW55KS5zZXRUZXh0KHRlbXAudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIChjaGlsZCBhcyBhbnkpLnNldENoZWNrZWQodGVtcC5jaGVja2VkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLl9pbnRlcm5hbENoYW5nZUNiID0gKGNvbXApPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0luaXRNb2RpZmllZFZpcnR1YWxSb3dzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3Nbcm93W1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzW3Jvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXV0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzW3Jvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXV1bcm93LmNoaWxkTm9kZXNbY29sdW1uSWR4XVtcIm9yaWdpbmFsQ29sdW1uSW5kZXhcIl1dID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGNvbXAuZ2V0VGV4dCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGNvbXAuZ2V0Q2hlY2tlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5oZWFkTm9kZSAhPSBudWxsKXtcbiAgICAgICAgICAvL3NraXAgZW1pdGluZyBldmVudCBzbyB3ZSBjYW4gZW1pdCBvdXJzZWxmLlxuICAgICAgICAgIGNoaWxkLnNraXBFbWl0Q29udGV4dE1lbnVFdmVudCA9IHRydWU7XG4gICAgICAgICAgY2hpbGQudGFibGVSb3dObyA9IC0xO1xuICAgICAgICAgIHRoaXMuaGVhZE5vZGUucGFyZW50VGFibGVJZCA9IHRoaXMuaWQ7XG4gICAgICAgICAgdGhpcy5oZWFkTm9kZS5wYXJlbnRUYWJsZSA9IHRoaXM7XG4gICAgICAgICAgdGhpcy5oZWFkTm9kZS5jaGlsZE5vZGVzW3RoaXMuaGVhZE5vZGUuY2hpbGROb2Rlcy5sZW5ndGggLSAxXS5zZXRDb21wb25lbnQoY2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiDpgbjmip7kuK3jga7ooYzjgpLliYrpmaTjgZnjgotcbiAgICAgKi9cbiAgICByZW1vdmVTZWxlY3RlZFJvdygpe1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFJvd3MubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAvLyDpgbjmip7ooYzjgpLpmY3poIbjgafkuKbjgbPmm7/jgYjjgotcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZCA6QXJyYXk8bnVtYmVyPiA9IHRoaXMuc2VsZWN0ZWRSb3dzLmNvbmNhdCgpLnNvcnQoZnVuY3Rpb24odjEsdjIpe3JldHVybiB2Mi12MTt9KTtcbiAgICAgICAgICAgIGZvciAobGV0IGlkeCBvZiBzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZCA6IEhUTUxFbGVtZW50V3JhcHBlciA9IHRoaXMubm9kZXNbaWR4XTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHRhcmdldCBvZiBjaGlsZC5jaGlsZE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGFyZ2V0LmdldENvbXBvbmVudCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJvd051bWJlciA6bnVtYmVyID0gMDtcbiAgICAgICAgICAgIGZvcihsZXQgcm93IG9mIHRoaXMubm9kZXMpe1xuICAgICAgICAgICAgICAgIHJvdy5yb3dOdW1iZXIgPSByb3dOdW1iZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGlzIGlzIGEgY29udGFpbmVyIGNvbXBvbmVudFxuICAgICAqIEByZXR1cm5zIFRydWVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaXNDb250YWluZXIoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIEFkZCByb3cgdG8gbGlzdCBvZiBub2Rlc1xuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqIEBwYXJhbSByb3dPckNvbHVtbkluZGV4XG4gICAgICogQHBhcmFtIHJvd0RhdGFcbiAgICAgKi9cbiAgICBwcml2YXRlIHRyYWNrUm93KGV2ZW50OiBPbkNyZWF0ZUV2ZW50LCByb3dPckNvbHVtbkluZGV4OiBudW1iZXIsIHJvd0RhdGE6IGFueSkge1xuICAgICAgICBjb25zdCByb3cgPSBuZXcgSFRNTEVsZW1lbnRXcmFwcGVyKHRoaXMucmVuZGVyZXIsIFwiXCIsIHRoaXMuZ2V0U2Vzc2lvbigpKTtcbiAgICAgICAgcm93LnJvd051bWJlciA9IHJvd09yQ29sdW1uSW5kZXg7XG4gICAgICAgIHJvdy5odG1sRWxlbWVudCA9IGV2ZW50LmVsZW1lbnQubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgdGhpcy5zZXRQYXJlbnRTY3JlZW5JZChyb3cpO1xuICAgICAgICByb3cuc2V0TG9jYWxlTmFtZShcInJvd1wiKTtcblxuICAgICAgICBjb25zdCBjdXN0b21BdHRyaWJ1dGVzID0gdGhpcy5nZXRSb3dDdXN0b21BdHRyaWJ1dGVzKHJvd0RhdGEsIHJvd09yQ29sdW1uSW5kZXgpO1xuXG4gICAgICAgIGlmIChjdXN0b21BdHRyaWJ1dGVzICE9IG51bGwgJiYgY3VzdG9tQXR0cmlidXRlcyAhPT0gXCJcIikge1xuICAgICAgICAgICAgcm93LmFwcGVuZEN1c3RvbUF0dHJpYnV0ZXMoY3VzdG9tQXR0cmlidXRlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm93RGF0YSAhPSBudWxsICYmIHJvd0RhdGEuaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgcm93LnNldEF0dHJpYnV0ZShcImlkXCIsIHJvd0RhdGEuaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSAmJiByb3dEYXRhICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXSA9IHJvd0RhdGFbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYWNrTm9kZShyb3cpO1xuXG4gICAgICAgIC8vZHJhZ2dhYmxlIHJvd1xuICAgICAgICBpZiAocm93LmlzRHJhZ2dhYmxlKCkpIHtcbiAgICAgICAgICAgIHJvdy5hcHBseURyYWdnYWJsZSgpO1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2FibGVSb3dzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvUm93SW5kZXgocm93SW5kZXg6IG51bWJlciwgcm93RGF0YTogYW55KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlydHVhbFNjcm9sbCA9PT0gdHJ1ZSAmJiByb3dEYXRhICE9IG51bGwgPyByb3dEYXRhW1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdIDogcm93SW5kZXg7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBBZGQgY2VsbCB0byBsaXN0IG9mIG5vZGVzXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICogQHBhcmFtIGNvbHVtbkRlZlxuICAgICAqL1xuICAgIHByaXZhdGUgdHJhY2tDZWxsKGV2ZW50OiBPbkNyZWF0ZUV2ZW50LCBjb2x1bW5JbmRleDogbnVtYmVyLCBjb2x1bW5EZWY6IFRhYmxlQ29sdW1uRGlyZWN0aXZlKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBuZXcgSFRNTEVsZW1lbnRXcmFwcGVyKHRoaXMucmVuZGVyZXIsIFwiXCIsIHRoaXMuZ2V0U2Vzc2lvbigpKTtcbiAgICAgICAgY2VsbC5odG1sRWxlbWVudCA9IGV2ZW50LmVsZW1lbnQubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgY2VsbC5zZXRMb2NhbGVOYW1lKFwiY2VsbFwiKTtcbiAgICAgICAgaWYgKGNvbHVtbkRlZi5jdXN0b21BdHRyaWJ1dGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICghY2VsbC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSkge1xuICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY29sdW1uRGVmLmN1c3RvbUF0dHJpYnV0ZXNbXCJjbGFzc1wiXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBvcmdDbGFzczogc3RyaW5nID0gY2VsbC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIG9yZ0NsYXNzICsgXCIgXCIgKyBjb2x1bW5EZWYuY3VzdG9tQXR0cmlidXRlc1tcImNsYXNzXCJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZShcImlzTG9ja2VkQ29sdW1uXCIsIGNvbHVtbkRlZi5sb2NrZWQgKyBcIlwiKTtcbiAgICAgICAgdGhpcy5zZXRQYXJlbnRTY3JlZW5JZChjZWxsKTtcblxuICAgICAgICAvL3RyYWNrIG9yaWdpbmFsIGNvbHVtbiBpbmRleCBmb3Igc29ydGluZ1xuICAgICAgICBpZiAoY29sdW1uRGVmLm9yaWdpbmFsQ29sdW1uSW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgY29sdW1uRGVmLm9yaWdpbmFsQ29sdW1uSW5kZXggPSBjb2x1bW5JbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNlbGxbXCJvcmlnaW5hbENvbHVtbkluZGV4XCJdID0gY29sdW1uRGVmLm9yaWdpbmFsQ29sdW1uSW5kZXg7XG5cbiAgICAgICAgLy9hZGQgY2VsbCB0byBjdXJyZW50IHJvd1xuICAgICAgICBpZiAodGhpcy5ub2Rlc1t0aGlzLm5vZGVzLmxlbmd0aCAtIDFdICE9PSB1bmRlZmluZWQgJiYgdGhpcy5ub2Rlc1t0aGlzLm5vZGVzLmxlbmd0aCAtIDFdICE9PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMubm9kZXNbdGhpcy5ub2Rlcy5sZW5ndGggLSAxXS5hcHBlbmRDaGlsZChjZWxsLGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHJpdmF0ZSB0cmFja0hlYWRDZWxsKGV2ZW50OiBPbkNyZWF0ZUV2ZW50LCBjb2x1bW5EZWY6IFRhYmxlQ29sdW1uRGlyZWN0aXZlKSB7XG4gICAgICAgIGlmKHRoaXMuaGVhZE5vZGUgPT0gbnVsbCl7XG4gICAgICAgICAgICB0aGlzLmhlYWROb2RlID0gbmV3IEhUTUxFbGVtZW50V3JhcHBlcih0aGlzLnJlbmRlcmVyLCBcIlwiLCB0aGlzLmdldFNlc3Npb24oKSk7XG4gICAgICAgICAgICB0aGlzLmhlYWROb2RlLnJvd051bWJlciA9IC0xO1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJlbnRTY3JlZW5JZCh0aGlzLmhlYWROb2RlKTtcbiAgICAgICAgICAgIHRoaXMuaGVhZE5vZGUuc2V0TG9jYWxlTmFtZShcImhlYWRyb3dcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjZWxsID0gbmV3IEhUTUxFbGVtZW50V3JhcHBlcih0aGlzLnJlbmRlcmVyLCBcIlwiLCB0aGlzLmdldFNlc3Npb24oKSk7XG4gICAgICAgIGNlbGwuaHRtbEVsZW1lbnQgPSBldmVudC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNlbGwuc2V0TG9jYWxlTmFtZShcImhlYWRjZWxsXCIpO1xuICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZShcImlzTG9ja2VkQ29sdW1uXCIsIGNvbHVtbkRlZi5sb2NrZWQgKyBcIlwiKTtcbiAgICAgICAgY2VsbC5jdXN0b21EYXRhID0gY29sdW1uRGVmO1xuICAgICAgICB0aGlzLnNldFBhcmVudFNjcmVlbklkKGNlbGwpO1xuXG4gICAgICAgIHRoaXMuaGVhZE5vZGUuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBBZGQgZWxlbWVudCB0byBpbnRlcm5hbCBbW25vZGVzXV0gbGlzdCB0byBrZWVwIHRyYWNrIG9mXG4gICAgICogQHBhcmFtIG5vZGUgRWxlbWVudCB0byBhZGQgdG8gaW50ZXJuYWwgbm9kZSBsaXN0XG4gICAgICovXG4gICAgcHJpdmF0ZSB0cmFja05vZGUobm9kZTogSFRNTEVsZW1lbnRXcmFwcGVyKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVzID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5ub2RlcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBwYXJlbnQgc2NyZWVuIGlkIG9uIGFuIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gZWxcbiAgICAgKi9cbiAgICBwcml2YXRlIHNldFBhcmVudFNjcmVlbklkKGVsOiBIVE1MRWxlbWVudFdyYXBwZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0UGFyZW50VmlldygpICE9IG51bGwpIHtcbiAgICAgICAgICAgIGVsLnBhcmVudFNjcmVlbklkID0gdGhpcy5nZXRQYXJlbnRWaWV3KCkuZ2V0SWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBpbnZva2UgW1tyb3dTdHlsZUZuXV0gb24gYSByb3cgYW5kIGdldCBpdCdzIHN0eWxlXG4gICAgICogQHBhcmFtIHJvd1xuICAgICAqIEByZXR1cm5zIFN0eWxlIGF0dHJpYnV0ZXNcbiAgICAgKi9cbiAgICByb3dTdHlsZUNsYXNzKHJvdzogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnJvd1N0eWxlRm4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm93U3R5bGVGbihyb3cpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZCB0aGUgY2hpbGQgbm9kZSBieSBpZFxuICAgICAqIEBwYXJhbSBpZCBDaGlsZCdzIGlkXG4gICAgICovXG4gICAgZ2V0Q2hpbGROb2RlQnlJZChpZDogc3RyaW5nKTogSFRNTEVsZW1lbnRXcmFwcGVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMgIT0gbnVsbCA/IHRoaXMubm9kZXMuZmluZChjaGlsZD0+Y2hpbGQuaWQgPT09IGlkKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2VsbCBvbkNvbnRleHRNZW51IGlmIGNvbXBvbmVudCBpbnNpZGUgdGhlIGNlbGwgaGFzIG5vdCBhbHJlYWR5IGhhbmRsZSBpdFxuICAgICAqXG4gICAgICogQHBhcmFtIHJvd051bWJlclxuICAgICAqIEBwYXJhbSBjb2x1bW5JbmRleFxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIGhhbmRsZUNvbHVtbk9uQ29udGV4dE1lbnUoY29sdW1uOiBUYWJsZUNlbGxEaXJlY3RpdmUgLHJvd051bWJlciwgY29sdW1uSW5kZXg6IG51bWJlciwgZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZXMgIT0gbnVsbCAmJiB0aGlzLm5vZGVzW3Jvd051bWJlcl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRDb2x1bW4gPSB0aGlzLm5vZGVzW3Jvd051bWJlcl0uZ2V0Q2hpbGRBdChjb2x1bW5JbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChjaGlsZENvbHVtbiAhPSBudWxsICYmIGNoaWxkQ29sdW1uLmNvbXBvbmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIC8vc29waGlhICMxNzI4XG4gICAgICAgICAgICAgIGlmICh0aGlzLnJlc3RyaWN0Q2VsbFBvcHVwICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRDb2x1bW4uY29tcG9uZW50LmhhbmRsZU9uQ29udGV4dE1lbnUoZXZlbnQpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVzdHJpY3RDZWxsUG9wdXAgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRDb2x1bW4uY29tcG9uZW50LnBvcHVwICE9IG51bGwgJiYgY2hpbGRDb2x1bW4uY29tcG9uZW50LnBvcHVwICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICBjaGlsZENvbHVtbi5jb21wb25lbnQuaGFuZGxlT25Db250ZXh0TWVudShldmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29sdW1uICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRTZXNzaW9uKCkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNlc3Npb24oKS5zZXRNb3VzZVBvc2l0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRWaWV3ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XG4gICAgICAgICAgICAgICAgbGV0IHBvcHVwTWVudUlkOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudFZpZXcgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwb3B1cE1lbnVJZCA9IChwYXJlbnRWaWV3IGFzIFZpZXdDb21wb25lbnQpLmdldEZpcnN0UG9wdXBNZW51SWQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbHVtbi5vbkNvbnRleHRNZW51Q2IgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgY29sdW1uLm9uQ29udGV4dE1lbnVDYih0aGlzLl9nZXROb25lQWN0aXZlVmlld1BhcmVudCgpIHx8IHRoaXMuZ2V0UGFyZW50VmlldygpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocG9wdXBNZW51SWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0bSA9IHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodG0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0U2Vzc2lvbigpLl9jdXJyZW50UG9wdXBNZW51SWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwb3B1cE1lbnVJZCA9IHRoaXMuZ2V0U2Vzc2lvbigpLl9jdXJyZW50UG9wdXBNZW51SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTZXNzaW9uKCkuc2hvd0NvbnRleHRNZW51KHBvcHVwTWVudUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNlc3Npb24oKS5fY3VycmVudFBvcHVwTWVudUlkID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBjb250ZXh0IGNsaWNrIG9uIHRoZSBoZWFkZXJcbiAgICAgKiBAcGFyYW0gY29sdW1uSW5kZXggSW5kZXggb2YgY29sdW1uIHRoYXQgd2FzIGNsaWNrZWRcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBoYW5kbGVIZWFkZXJPbkNvbnRleHRNZW51KGNvbHVtbkluZGV4OiBudW1iZXIsIGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodGhpcy5oZWFkTm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZENvbHVtbiA9IHRoaXMuaGVhZE5vZGUuZ2V0Q2hpbGRBdChjb2x1bW5JbmRleCk7XG5cbiAgICAgICAgICAgIGlmIChjaGlsZENvbHVtbiAhPSBudWxsICYmIGNoaWxkQ29sdW1uLmNvbXBvbmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNsaWVudEV2ZW50ID0gbmV3IENsaWVudEV2ZW50KGNoaWxkQ29sdW1uLCBldmVudCk7XG5cbiAgICAgICAgICAgICAgaWYgKEFwcFV0aWxzLmN1c3RvbWl6ZUNsaWVudEV2ZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudChjaGlsZENvbHVtbiwgY2xpZW50RXZlbnQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGFyZW50VmlldygpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGNsaWVudEV2ZW50LnNldFBhcmFtZXRlcihcInNjcmVlbklkXCIsIHRoaXMuZ2V0UGFyZW50VmlldygpLmdldElkKCkpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY2xpZW50RXZlbnQuc2V0UGFyYW1ldGVyKFwiaWRcIiwgdGhpcy5nZXRJZCgpKTtcblxuICAgICAgICAgICAgICB0aGlzLmdldFNlc3Npb24oKS5nZXRFdmVudEhhbmRsZXIoKS5zZXRDbGllbnRFdmVudChjbGllbnRFdmVudCk7XG5cbiAgICAgICAgICAgICAgY2hpbGRDb2x1bW4uY29tcG9uZW50LmhhbmRsZU9uQ29udGV4dE1lbnUoZXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwcml2YXRlIHJlY2FsY3VsYXRlVmlydHVhbFNjcm9sbERhdGEoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgICBsZXQgc2Nyb2xsVG9wID0gZXZlbnQuc3JjRWxlbWVudC5zY3JvbGxUb3A7XG5cbiAgICAgICAgICAvL2FkanVzdCBvbmx5IG9uIElFOSwgb3RoZXJ3aXNlLCBpdCB3aWxsIHN0dWNrIGluIGluZiBsb29wXG4gICAgICAgICAgaWYgKHRoaXMuaXNJRTkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgc2Nyb2xsVG9wIC09IDAuNTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5zY3JvbGxMZWZ0ID09PSBldmVudC5zcmNFbGVtZW50LnNjcm9sbExlZnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY1ZpcnR1YWxTY3JvbGxWaWV3UG9ydChzY3JvbGxUb3ApO1xuICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5hZGp1c3RUYWJsZUhlYWQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciB0YWJsZSBoZWFkIGNoYW5nZS4gU2V0IHN0eWxlIHRvIHByb3Blcmx5IGRpc3BsYXlcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIGFkanVzdFRhYmxlSGVhZChldmVudCwgc2tpcEJvZHlBZGp1c3RtZW50OiBib29sZWFuID0gZmFsc2UsIHNraXBIZWFkZXI6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy50YWJsZSA9PSBudWxsIHx8IGV2ZW50ID09IG51bGwpIHJldHVybjtcbiAgICAgICAgdGhpcy5wcmVNb3VzZUV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIGxldCBzY3JvbGxUb3AgPSBldmVudC5zcmNFbGVtZW50LnNjcm9sbFRvcDtcblxuICAgICAgICAvL2FkanVzdCBvbmx5IG9uIElFOSwgb3RoZXJ3aXNlLCBpdCB3aWxsIHN0dWNrIGluIGluZiBsb29wXG4gICAgICAgIGlmICh0aGlzLmlzSUU5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzY3JvbGxUb3AgLT0gMC41O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjcm9sbExlZnQgPSBldmVudC5zcmNFbGVtZW50LnNjcm9sbExlZnRcblxuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBpZiAoZXZlbnQuc3JjRWxlbWVudC5zY3JvbGxUb3AgPiB0aGlzLm1heFNjcm9sbFRvcCkge1xuICAgICAgICAgICAgLy8gICAgIHNjcm9sbFRvcCA9IHRoaXMubWF4U2Nyb2xsVG9wO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAvL3RoaXMuY2FsY1ZpcnR1YWxTY3JvbGxWaWV3UG9ydChzY3JvbGxUb3ApO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldlNjcm9sbFRvcEZvckhpZGRlbkhlYWRlciAhPT0gc2Nyb2xsVG9wICYmIHNraXBIZWFkZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgc2Nyb2xsVG9wIC09IHRoaXMudGhlYWRIZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJldlNjcm9sbFRvcEZvckhpZGRlbkhlYWRlciA9IHNjcm9sbFRvcDtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkU2Nyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2FsY1ZpcnR1YWxUYWJsZVBvc2l0aW9uKHNjcm9sbFRvcCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWRTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sMTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChza2lwSGVhZGVyICE9PSB0cnVlKSB7XG4gICAgICAgIC8vICAgdGhpcy5mYWtlVGFibGUubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAvLyAgIHRoaXMuaXNIZWFkZXJBcHBlbmRUb0Zha2VUYWJsZSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy50YWJsZUhlYWQubmF0aXZlRWxlbWVudCwgXCJ2aXNpYmlsaXR5XCIpO1xuICAgICAgICAgIGlmKHRoaXMudGFibGVGb290ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy50YWJsZUZvb3QubmF0aXZlRWxlbWVudCwgXCJ2aXNpYmlsaXR5XCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5naG9zdEhlYWRlci5uYXRpdmVFbGVtZW50LCBcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuXG4gICAgICAgICAgY29uc3QgdGFibGUgPSB0aGlzLnRhYmxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgdGhlYWQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0aGVhZCcpO1xuICAgICAgICAgIGNvbnN0IHRib2R5ID0gdGFibGUucXVlcnlTZWxlY3RvcigndGJvZHknKTtcblxuXG4gICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgIGxldCBjb2x1bW4gPSB0aGlzLmNvbHVtbnMuZmluZCgoaXRlbSwgaWR4KT0+aWR4ID09PSBpKTtcbiAgICAgICAgICAgICAgaWYoY29sdW1uICE9IG51bGwgJiYgY29sdW1uLnZpc2libGUgJiYgY29sdW1uLmxvY2tlZClcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZENoaWxkcmVuID0gJCh0aGVhZC5xdWVyeVNlbGVjdG9yKCd0aDpudGgtY2hpbGQoJyArIChpKzEpICsgJyknKSk7XG4gICAgICAgICAgICAgICAgICBsZXQgdHJhbnMgPSBgdHJhbnNsYXRlKCR7dGhpcy5zY3JvbGxMZWZ0fXB4LCAke3Njcm9sbFRvcH1weClgO1xuXG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnMgPSBgdHJhbnNsYXRlWCgke3RoaXMuc2Nyb2xsTGVmdH1weClgO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBoZWFkQ2hpbGRyZW4uY3NzKFwidHJhbnNmb3JtXCIsIHRyYW5zKTtcbiAgICAgICAgICAgICAgICAgIGhlYWRDaGlsZHJlbi5jc3MoXCItbXMtdHJhbnNmb3JtXCIsIHRyYW5zKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKHNraXBCb2R5QWRqdXN0bWVudCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHlDaGlsZHJlbiA9ICQodGJvZHkucXVlcnlTZWxlY3RvckFsbCgndGQ6bnRoLWNoaWxkKCcgKyAoaSsxKSArICcpJykpO1xuICAgICAgICAgICAgICAgICAgICAgIGJvZHlDaGlsZHJlbi5jc3MoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke3RoaXMuc2Nyb2xsTGVmdH1weGApO1xuICAgICAgICAgICAgICAgICAgICAgIGJvZHlDaGlsZHJlbi5jc3MoXCItbXMtdHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHt0aGlzLnNjcm9sbExlZnR9cHhgKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2x1bW4gIT0gbnVsbCAmJiBjb2x1bW4udmlzaWJsZSAmJiB0aGlzLnZpcnR1YWxTY3JvbGwgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRDaGlsZHJlbiA9ICQodGhlYWQucXVlcnlTZWxlY3RvcigndGg6bnRoLWNoaWxkKCcgKyAoaSsxKSArICcpJykpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgdHJhbnMgPSBgdHJhbnNsYXRlWSgke3Njcm9sbFRvcH1weClgO1xuXG4gICAgICAgICAgICAgICAgICBoZWFkQ2hpbGRyZW4uY3NzKFwidHJhbnNmb3JtXCIsIHRyYW5zKTtcbiAgICAgICAgICAgICAgICAgIGhlYWRDaGlsZHJlbi5jc3MoXCItbXMtdHJhbnNmb3JtXCIsIHRyYW5zKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuYWRqdXN0VGFibGVGb290ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogU2V0IHRhYmxlIGZvb3RlciBzdHlsZXMgZm9yIHByb3BlciBkaXNwbGF5XG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGp1c3RUYWJsZUZvb3RlcigpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAodGhpcy50YWJsZSA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHRmb290ID0gdGhpcy50YWJsZS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0Zm9vdFwiKTtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKHRmb290ICE9IG51bGwpIHtcbiAgICAgICAgLy9WaXZpZnksIGZvciBodHRwczovL2dpdGh1Yi5jb20vd2VhdmVpby9uZ25zb3BoaWEvaXNzdWVzLzE4MDZcbiAgICAgICAgbGV0IHRmb290UG9zID0gMDtcbiAgICAgICAgaWYoJCh0aGlzLnRhYmxlLm5hdGl2ZUVsZW1lbnQpLmhlaWdodCgpIDwgJCh0aGlzLnRhYmxlQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQpLmhlaWdodCgpKSB7XG4gICAgICAgICAgICB0Zm9vdFBvcyA9ICQodGhpcy50YWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50KS5oZWlnaHQoKSAtICQodGhpcy50YWJsZS5uYXRpdmVFbGVtZW50KS5oZWlnaHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRmb290UG9zID0gKCQodGhpcy50YWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50KS5oZWlnaHQoKSAtICQodGhpcy50YWJsZS5uYXRpdmVFbGVtZW50KS5oZWlnaHQoKSkgKyB0aGlzLnRhYmxlQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gdGhpcy5jb2x1bW5zLmZpbmQoKGl0ZW0sIGlkeCk9PmlkeCA9PT0gaSk7XG4gICAgICAgICAgICBpZiAoY29sdW1uICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb290Q2hpbGRyZW4gPSAkKHRmb290LnF1ZXJ5U2VsZWN0b3IoJ3RkOm50aC1jaGlsZCgnICsgKGkrMSkgKyAnKScpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFucyA9IGB0cmFuc2xhdGVZKCR7dGZvb3RQb3N9cHgpYDtcblxuICAgICAgICAgICAgICAgIGZvb3RDaGlsZHJlbi5jc3MoXCJ0cmFuc2Zvcm1cIiwgdHJhbnMpO1xuICAgICAgICAgICAgICAgIGZvb3RDaGlsZHJlbi5jc3MoXCItbXMtdHJhbnNmb3JtXCIsIHRyYW5zKTtcbiAgICAgICAgICAgICAgICBmb290Q2hpbGRyZW4uY3NzKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICBmb290Q2hpbGRyZW4uY3NzKFwiei1pbmRleFwiLCBcIjNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIGtleXVwLiBDb3B5IGtleWJvYXJkIHNob3J0Y3V0IHN1cHBvcnRcbiAgICAgKiBAcGFyYW0gZXZlbnQgS2V5dXAgZXZlbnRcbiAgICAgKi9cbiAgICBoYW5kbGVLZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBldmVudC5jdHJsS2V5ID09PSB0cnVlICYmXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgZXZlbnQuY29kZSA9PT0gXCJLZXlDXCIgfHxcbiAgICAgICAgICAgICAgICBldmVudC5rZXlDb2RlID09PSA2NyB8fFxuICAgICAgICAgICAgICAgIGV2ZW50LmtleUNvZGUgPT09IDk5XG4gICAgICAgICAgICApXG4gICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgICB0aGlzLmNvcHlTZWxlY3RlZFJvd0FzVGV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAvKipcbiAgICAgKiBDaGVjayB0byBzZWUgaWYgd2UgY2FuIHNlbmQgc2VsZWN0ZWQgcm93cyB0byBjbGlwYm9hcmRcbiAgICAgKi9cbiAgICBjb3B5U2VsZWN0ZWRSb3dBc1RleHQoKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFJvd3MgIT0gbnVsbCAmJiB0aGlzLnNlbGVjdGVkUm93cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFJvd1RleHQ6IEFycmF5PHN0cmluZz47XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFJvdzogSFRNTEVsZW1lbnRXcmFwcGVyID0gdGhpcy5nZXRTZWxlY3RlZFJvd3MoKVswXTtcblxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRSb3cuY2hpbGROb2RlcyAhPSBudWxsICYmIHNlbGVjdGVkUm93LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkUm93VGV4dCA9IHNlbGVjdGVkUm93LmNoaWxkTm9kZXMubWFwKGNoaWxkID0+IGNoaWxkLmdldFRleHQoKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkUm93LmR5bmFtaWNDaGlsZE5vZGVzICE9IG51bGwgJiYgc2VsZWN0ZWRSb3cuZHluYW1pY0NoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkUm93VGV4dCA9IHNlbGVjdGVkUm93LmR5bmFtaWNDaGlsZE5vZGVzLm1hcChjaGlsZCA9PiBjaGlsZC5nZXRUZXh0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFJvd1RleHQgIT0gbnVsbCAmJiBzZWxlY3RlZFJvd1RleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpcGJvYXJkU2VydmljZS5jb3B5KHNlbGVjdGVkUm93VGV4dC5qb2luKFN0cmluZy5mcm9tQ2hhckNvZGUoOSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgYSByb3cgaWQgYmFzZWQgb24gcm93J3MgW1tpZF1dIGFuZCBpbmRleFxuICAgICAqIEBwYXJhbSByb3dcbiAgICAgKiBAcGFyYW0gcm93SW5kZXhcbiAgICAgKi9cbiAgICBidWlsZFJvd0lkKHJvdzogYW55LCByb3dJbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnJvd0lkQnVpbGRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb3dJZEJ1aWxkZXIocm93LCByb3dJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gWydyb3cnLCB0aGlzLmlkLCByb3dJbmRleF0uam9pbignLScpO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgLyoqXG4gICAgICogU29ydCB0aGUgZGF0YSAoZm9yIHZpcnR1YWwgc2Nyb2xsKVxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtblxuICAgICAqL1xuICAgIGhhbmRsZVNvcnQoY29sdW1uOiBUYWJsZUNvbHVtbkRpcmVjdGl2ZSkge1xuICAgICAgICAvL3NvcnRpbmcgaXMgb25seSBhbGxvd2VkIG9uIGEgbm9uIGxvY2tpbmcgY29sdW1uXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlICYmIGNvbHVtbi5sb2NrZWQgIT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vZmluZCBwcmV2aW91cyBzb3J0IGRpcmVjdGlvbiBmb3IgdGhlIGNvbHVtblxuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goY29sPT57XG4gICAgICAgICAgICAgICAgLy91c2luZyBvcmlnaW5hbENvbHVtbkluZGV4IGIvYyB1c2UgY2FuIGRyYWcgY29sdW1uIGFyb3VuZCBhbmQgdGh1cyBjb2x1bW4gaW5kZXggY2hhbmdlZFxuICAgICAgICAgICAgICAgIGlmIChjb2wub3JpZ2luYWxDb2x1bW5JbmRleCAhPT0gY29sdW1uLm9yaWdpbmFsQ29sdW1uSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sLnNvcnREaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoY29sdW1uLnNvcnREaXJlY3Rpb24gPT09IFwiYXNjXCIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uc29ydERpcmVjdGlvbiA9IFwiZGVzY1wiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uc29ydERpcmVjdGlvbiA9IFwiYXNjXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzb3J0Q29sdW1uSWQ6IHN0cmluZyA9IHRoaXMudmlydHVhbFNjcm9sbFNvcnRLZXlzW2NvbHVtbi5vcmlnaW5hbENvbHVtbkluZGV4XTtcblxuICAgICAgICAgICAgLy9pZiBjdXN0b20gc29ydG4gZm4gaXMgcHJvdmlkZWQsIHVzZWQgdG8gZmluZCBwcm9wZXIgY29sdW1uIHRvIHNvcnRcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy52aXJ0dWFsU2Nyb2xsU29ydEZuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBzb3J0Q29sdW1uSWQgPSB0aGlzLnZpcnR1YWxTY3JvbGxTb3J0Rm4odGhpcy5fZ2V0Tm9uZUFjdGl2ZVZpZXdQYXJlbnQoKSB8fCB0aGlzLmdldFBhcmVudFZpZXcoKSwgY29sdW1uLm9yaWdpbmFsQ29sdW1uSW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc29ydENvbHVtbklkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gXy5vcmRlckJ5KHRoaXMuX2RhdGFTb3VyY2UsIFtzb3J0Q29sdW1uSWRdLCBbY29sdW1uLnNvcnREaXJlY3Rpb25dIGFzIGFueSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2FsY1ZpcnR1YWxTY3JvbGxWaWV3UG9ydCh0aGlzLnByZXZTY3JvbGxUb3ApO1xuICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0gIGVsc2UgaWYgKHRoaXMudmlydHVhbFNjcm9sbCAhPT0gdHJ1ZSAmJiBjb2x1bW4ubG9ja2VkICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBSWEMgQWRkXG4gICAgICAgICAgICBpZiAodGhpcy5zb3J0RGlyZWN0aW9uID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0RGlyZWN0aW9uID0gXCJhc2NcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3J0Q29sdW1uSWQgPT09IGNvbHVtbi5vcmlnaW5hbENvbHVtbkluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc29ydERpcmVjdGlvbiA9PT0gXCJhc2NcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnREaXJlY3Rpb24gPSBcImRlc2NcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnREaXJlY3Rpb24gPSBcImFzY1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0RGlyZWN0aW9uID0gXCJhc2NcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc29ydENvbHVtbklkID0gY29sdW1uLm9yaWdpbmFsQ29sdW1uSW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgb3ZlcmFsbCBoZWlnaHQgc28gd2UgY2FuIGFkZCBzY3JvbGxiYXIgZm9yIHZpcnR1YWwgc2Nyb2xsLiBUaGlzIGlzIGRvbmVcbiAgICAgKiBieSBtdWx0aXBseWluZyB0aGUgbnVtYmVyIG9mIHJvd3MgdG8gdGhlIGhlaWdodCBvZiBlYWNoIHJvdy5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY1ZpcnR1YWxTY3JvbGxIZWlnaHQoKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YVNvdXJjZSAhPSBudWxsICYmIHRoaXMuX2RhdGFTb3VyY2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vc2Nyb2xsIGhlaWdodCA9IDEwcHggKiAjIHJvd3MgKDEwcHggaXMgdGhlIGhlaWdodCBvZiBlYWNoIHJvdylcbiAgICAgICAgICAgICAgICB0aGlzLl92aXJ0dWFsU2Nyb2xsRGl2SGVpZ2h0ID0gKHRoaXMucm93SGVpZ2h0ICogdGhpcy5fZGF0YVNvdXJjZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHRoaXMubWF4U2Nyb2xsVG9wID0gdGhpcy5fdmlydHVhbFNjcm9sbERpdkhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGxTb3J0S2V5cyA9IF8ua2V5cyh0aGlzLl9kYXRhU291cmNlWzBdKTtcblxuICAgICAgICAgICAgICAgIC8vdHJhY2sgb3JpZ2luYWwgaW5kZXhcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2RhdGFTb3VyY2VbdGhpcy5fZGF0YVNvdXJjZS5sZW5ndGggLSAxXVtUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2godGhpcy5fZGF0YVNvdXJjZSwgKGl0ZW0sIGluZGV4KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVtUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXSA9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZpcnR1YWxTY3JvbGxEaXZIZWlnaHQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkanVzdC9tb3ZlIHRoZSBwb3NpdGlvbiBvZiB0aGUgdGFibGUgY29udGFpbmVyIHNvIHRoYXQgaXQgZGlzcGxheWVkIHByb3Blcmx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjcm9sbFRvcFxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY1ZpcnR1YWxUYWJsZVBvc2l0aW9uKHNjcm9sbFRvcDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vLW1zLXRyYW5zZm9ybVxuICAgICAgICAgICAgLy90cmFuc2Zvcm1cbiAgICAgICAgICAgIC8vIGlmICh0aGlzLm1heFNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgICAgIC8vICAgICBzY3JvbGxUb3AgPSBNYXRoLm1pbihzY3JvbGxUb3AsIHRoaXMubWF4U2Nyb2xsVG9wKTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRhYmxlV3JhcHBlci5uYXRpdmVFbGVtZW50LCBcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlWSgke3Njcm9sbFRvcH1weClgKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50YWJsZVdyYXBwZXIubmF0aXZlRWxlbWVudCwgXCItbXMtdHJhbnNmb3JtXCIsIGB0cmFuc2xhdGVZKCR7c2Nyb2xsVG9wfXB4KWApO1xuICAgICAgICAgICAgLy8gdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgdmlzaWJsZSB2aXJ0dWFsIHJvd3MgdG8gZGlzcGxheSB0byB0aGUgdXNlclxuICAgICAqXG4gICAgICogQHBhcmFtIHNjcm9sbFRvcFxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY1ZpcnR1YWxTY3JvbGxWaWV3UG9ydChzY3JvbGxUb3A6IG51bWJlciA9IDApIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzVmlld0luaXQgPT09IHRydWUgJiYgdGhpcy5fZGF0YVNvdXJjZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgc3RhcnRJZHg6IG51bWJlciA9IDA7XG5cbiAgICAgICAgICAgIC8vaWYgc2Nyb2xsVG9wIGlzIGdyZWF0ZXIgdGhhbiAwLCBuZWVkIHRvIGZpZ3VyZSB0aGUgc3RhcnRpbmcgcm93XG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9wID4gMCkge1xuICAgICAgICAgICAgICAgIC8vZWFjaCByb3cgaXMgMTBweCBoZWlnaHQsIGlmIHNjcm9sbFRvcCBpcyAxMDBweCwgdGhlbiB3ZSBzdGFydCBhdCByb3cgMTBcbiAgICAgICAgICAgICAgICAvL3Njcm9sbFRvcCAvIDEwcHg/XG4gICAgICAgICAgICAgICAgc3RhcnRJZHggPSBNYXRoLmZsb29yKHNjcm9sbFRvcCAvIHRoaXMucm93SGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIGlmIChzdGFydElkeCA+IHRoaXMuX2RhdGFTb3VyY2UubGVuZ3RoIC0gdGhpcy5fdmlydHVhbFNjcm9sbFJvd1BlclZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRJZHggPSB0aGlzLl9kYXRhU291cmNlLmxlbmd0aCAtIHRoaXMuX3ZpcnR1YWxTY3JvbGxSb3dQZXJWaWV3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdmlydHVhbFZpZXdQb3J0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucHJldlNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICAgICAgICAgIHRoaXMuY2xlYW5VcENoaWxkTm9kZXMoKTtcbiAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlydHVhbFZpZXdQb3J0ID0gdGhpcy5idWlsZFJvd0lkZW50aXR5KHRoaXMuX2RhdGFTb3VyY2Uuc2xpY2Uoc3RhcnRJZHgsIHN0YXJ0SWR4ICsgdGhpcy5fdmlydHVhbFNjcm9sbFJvd1BlclZpZXcgKyB0aGlzLmFkanVzdGVkUm93cykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zd2FwKGZyb21JbmRleDogbnVtYmVyLCB0b0luZGV4OiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IHRlbXBUb0NvbHVtbiA9IHRoaXMuY29sdW1uc1t0b0luZGV4XTtcblxuICAgICAgdGhpcy5jb2x1bW5zW3RvSW5kZXhdID0gdGhpcy5jb2x1bW5zW2Zyb21JbmRleF07XG4gICAgICB0aGlzLmNvbHVtbnNbZnJvbUluZGV4XSA9IHRlbXBUb0NvbHVtbjtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIC8qKlxuICAgICAqIFN3YXAgdGhlIGNvbHVtbnMgYWZ0ZXIgYSBjb2x1bW4gaXMgYmVpbmcgZHJhZyBhbmQgcm9wXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZnJvbUluZGV4IGNvbHVtbiB0aGF0IGlzIGJlaW5nIGRyYWdnZWQgKG1vdmVkKVxuICAgICAqIEBwYXJhbSB0b0luZGV4ICBjb2x1bW4gdGhhdCBpcyBiZWluZyBkcm9wZWQgaW50b1xuICAgICAqL1xuICAgIHByaXZhdGUgc3dhcENvbHVtbnMoZnJvbUluZGV4OiBudW1iZXIsIHRvSW5kZXg6IG51bWJlcikge1xuICAgICAgLy9zb3BoaWEgMTg1NjogbmVlZCB0byBwcm9wZXJseSBzd2FwIGNvbHVtbnNcbiAgICAgIGlmIChmcm9tSW5kZXggPCB0b0luZGV4KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBmcm9tSW5kZXg7IGkgPCB0b0luZGV4OyBpKyspIHtcbiAgICAgICAgICB0aGlzLl9zd2FwKGksIGkgKyAxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChmcm9tSW5kZXggPiB0b0luZGV4KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBmcm9tSW5kZXg7IGkgPiB0b0luZGV4OyBpLS0pIHtcbiAgICAgICAgICB0aGlzLl9zd2FwKGksIGkgLSAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zY3JvbGxDb250YWluZXJTdHlsZXMgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyU3R5bGVzW1wib3ZlcmZsb3cteVwiXSA9IFwiYXV0b1wiO1xuICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuXG4gICAgICAvL3NvcGhpYSAxODIzOiBmb3Igc2VydmVyIHRyYWNraW5nXG4gICAgICBfLmZvckVhY2godGhpcy5jb2x1bW5zLCAoY29sLCBpZHgpPT57XG4gICAgICAgIGNvbC5zZXRBdHRyaWJ1dGUoXCJ2aXN1YWxJbmRleFwiLCBpZHggKyBcIlwiKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICB0aGlzLmFwcGx5UmVzaXplQ29sdW1ucygpO1xuICAgICAgICB9LCAyMDApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbHVtbnNIYXNCZWVuU3dhcHBlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwcml2YXRlIF9jbGVhbnVwQ29sUmVzaXplKCkge1xuICAgICAgICAvL3Jlc2V0XG4gICAgICAgIHRoaXMuJGNvbFJlc2l6YWJsZSA9ICQodGhpcy50YWJsZS5uYXRpdmVFbGVtZW50KS5jb2xSZXNpemFibGUoe1xuICAgICAgICAgIGRpc2FibGU6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChgIyR7dGhpcy5pZH0gLkpDTFJncmlwc2ApLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgYXBwbHlSZXNpemVDb2x1bW5zKCkge1xuICAgICAgaWYgKHRoaXMudGFibGUgIT0gbnVsbCAmJiAodGhpcy5lbmFibGVDb2x1bW5SZXNpemUgPT0gbnVsbCB8fCB0aGlzLmVuYWJsZUNvbHVtblJlc2l6ZSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cENvbFJlc2l6ZSgpO1xuICAgICAgICB0aGlzLiRjb2xSZXNpemFibGUgPSAkKHRoaXMudGFibGUubmF0aXZlRWxlbWVudCkuY29sUmVzaXphYmxlKHtcbiAgICAgICAgICAgIGxpdmVEcmFnOiBmYWxzZSwgLy90dXJuaW5nIHRoaXMgb24gd2lsbCBpbmN1cnJlZCBhIHNldmVyZSBwZXJmb3JtYW5jZSBwZW5hbHR5IG9uIElFIHNvIGxlYXZlIGl0IG9mZlxuICAgICAgICAgICAgcmVzaXplTW9kZTogJ292ZXJmbG93JyxcbiAgICAgICAgICAgIHBhcnRpYWxSZWZyZXNoOiB0cnVlLCAvL0FmdGVyIGNsb3NpbmcgdGhlIHdpbmRvdyBhbmQgb3BlbmluZyBhZ2FpbiwgY29sdW1uUmVzaXplciBjYW4ndCB3b3JrLiBUbyBmaXggdGhhdCwgdGhpcyB2YWx1ZSBpcyBuZWVkZWQuLFxuICAgICAgICAgICAgaGVhZGVyT25seTogdHJ1ZSAvL2FsbG93IGRyYWdnaW5nIHVzaW5nIGhlYWRlciBvbmx5XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB3aGV0aGVyIG9yIG5vdCB0aGUgY29sdW1uIGF0IHRoZSBwYXJ0aWN1bGFyIGluZGV4IGNhbiBiZSBkcmFnZ2VkL2Ryb3BcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2xJZHhcbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbkRyYWdDb2x1bW4oY29sSWR4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGNhbkRyYWcgPSB0cnVlO1xuXG4gICAgICAgIGZvciAobGV0IGNvbCBvZiB0aGlzLmNvbHVtbnMpIHtcbiAgICAgICAgICAgIGlmIChjb2wub3JpZ2luYWxDb2x1bW5JbmRleCA9PT0gY29sSWR4ICYmIGNvbC5sb2NrZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjYW5EcmFnID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2FuRHJhZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBzdXBwcGxpZWQgcm93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hpbGQgcm93IHRvIGNoZWNrIGZvIHJpbmRleD9cbiAgICAgKi9cbiAgICBpbmRleE9mQ2hpbGQoY2hpbGQ6IGFueSk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVzICE9IG51bGwgJiYgdGhpcy5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXy5maW5kSW5kZXgodGhpcy5ub2RlcywgKG5vZGUpPT5ub2RlID09PSBjaGlsZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2NoaWxkIGRvZXMgbm90IGV4aXN0c1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2hlY2tJbml0TW9kaWZpZWRWaXJ0dWFsUm93cygpIHtcbiAgICAgIGlmICh0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3MgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3MgPSB7fTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jaGVja0luaXRNb2RpZmllZFZpcnR1YWxSb3dzSnNvbigpIHtcbiAgICAgIGlmICh0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3NKc29uID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzSnNvbiA9IHt9O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZnJlc2ggdGhlIHRhYmxlIHNvcnRlclxuICAgICAqL1xuICAgIHByaXZhdGUgcmVmcmVzaFRhYmxlU29ydGVyKCkge1xuICAgICAgICAvL2RhdGEgY2hhbmdlcywgbmVlZCB0byB1cGRhdGUgdGFibGVTb3J0ZXJcbiAgICAgICAgaWYgKHRoaXMuX3RhYmxlU29ydGVyUmVmcmVzaFRtICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90YWJsZVNvcnRlclJlZnJlc2hUbSk7XG4gICAgICAgICAgICB0aGlzLl90YWJsZVNvcnRlclJlZnJlc2hUbSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdGFibGVTb3J0ZXJSZWZyZXNoVG0gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGFibGVTb3J0ZXJSZWZyZXNoVG0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhYmxlU29ydGVyUmVmcmVzaFRtID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLiR0YWJsZXNvcnRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRhYmxlc29ydGVyLnRyaWdnZXIoXCJ1cGRhdGVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0VGFibGVIZWFkKHRoaXMucHJlTW91c2VFdmVudCk7XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWZyZXNoIGNhY2hlIGRhdGEgKHNvcnQgdmFsdWUsIGV0YylcbiAgICAgKi9cbiAgICByZWZyZXNoVGFibGVTb3J0ZXJDYWNoZSgpIHtcbiAgICAgIC8vZGF0YSBjaGFuZ2VzLCBuZWVkIHRvIHVwZGF0ZSB0YWJsZVNvcnRlclxuICAgICAgaWYgKHRoaXMuX3RhYmxlU29ydGVyQ2FjaGVSZWZyZXNoVG0gIT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90YWJsZVNvcnRlckNhY2hlUmVmcmVzaFRtKTtcbiAgICAgICAgICB0aGlzLl90YWJsZVNvcnRlckNhY2hlUmVmcmVzaFRtID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICB0aGlzLl90YWJsZVNvcnRlckNhY2hlUmVmcmVzaFRtID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90YWJsZVNvcnRlckNhY2hlUmVmcmVzaFRtKTtcbiAgICAgICAgICAgICAgdGhpcy5fdGFibGVTb3J0ZXJDYWNoZVJlZnJlc2hUbSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgaWYgKHRoaXMuJHRhYmxlc29ydGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHRhYmxlc29ydGVyLnRyaWdnZXIoXCJ1cGRhdGVDYWNoZVwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDIwMCk7XG4gICAgICB9KTtcbiAgfVxuXG4gICAgc2V0U2VsZWN0QWxsVmlydHVhbFJvd3Moc2hvdWxkU2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHNob3VsZFNlbGVjdGVkICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3MgPSB7fTtcbiAgICAgICAgICAgIHRoaXMubW9kaWZpZWRWaXJ0dWFsUm93c0pzb24gPSB7fTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzID0gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja0luaXRNb2RpZmllZFZpcnR1YWxSb3dzKCk7XG4gICAgICAgICAgICB0aGlzLl9jaGVja0luaXRNb2RpZmllZFZpcnR1YWxSb3dzSnNvbigpO1xuXG4gICAgICAgICAgICBjb25zdCBjaGVja0JveGVDb2x1bW5JZHhzID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVzICE9IG51bGwgJiYgdGhpcy5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy9maW5kIGFsbCBjaGVja2JveGVzIGNvbHVtbnNcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZXNbMF0uY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2Rlc1swXS5jaGlsZE5vZGVzW2ldLmNvbXBvbmVudCBpbnN0YW5jZW9mIENoZWNrYm94Q29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0JveGVDb2x1bW5JZHhzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vaWYgdGhlcmUgYXJlIGNoZWNrYm94ZXMsIGNoZWNrIHRoZW1cbiAgICAgICAgICAgIHRoaXMubGFzdFNlbGVjdGVkUm93SW5kZXggPSAwO1xuICAgICAgICAgICAgaWYgKGNoZWNrQm94ZUNvbHVtbklkeHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHJvdyBvZiB0aGlzLl9kYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIHJvdyBpcyBub3QgdmlzaWJsZVxuICAgICAgICAgICAgICAgICAgICBpZiAoXy5maW5kSW5kZXgodGhpcy5ub2RlcywgKG5vZGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZVtUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXSA9PT0gcm93W1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdO1xuICAgICAgICAgICAgICAgICAgICB9KSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3Nbcm93W1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzW3Jvd1tUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9WSVJUVUFMX09SSUdJTkFMX0lOREVYXV0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY29sSWR4IG9mIGNoZWNrQm94ZUNvbHVtbklkeHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGlmaWVkVmlydHVhbFJvd3Nbcm93W1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdXVtjb2xJZHhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubW9kaWZpZWRWaXJ0dWFsUm93c0pzb24gW11cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy52aXJ0dWFsU2Nyb2xsSW52aXNpYmxlUm93QnVpbGRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93RWxlbWVudDogSFRNTEVsZW1lbnRXcmFwcGVyID0gdGhpcy52aXJ0dWFsU2Nyb2xsSW52aXNpYmxlUm93QnVpbGRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0Tm9uZUFjdGl2ZVZpZXdQYXJlbnQoKSB8fCB0aGlzLmdldFBhcmVudFZpZXcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0VsZW1lbnQuc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgXCJ0cnVlXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RpZmllZFZpcnR1YWxSb3dzSnNvbltyb3dbVGFibGVDb21wb25lbnQuSU5URVJOQUxfVklSVFVBTF9PUklHSU5BTF9JTkRFWF1dID0gcm93RWxlbWVudC50b0pzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3RlZCB0aGUgcm93XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFJvd3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzLnB1c2gocm93W1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1ZJUlRVQUxfT1JJR0lOQUxfSU5ERVhdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVjQ2FsY05vVmlydHVhbFJvdygpIHtcbiAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgPT09IHRydWUpIHtcbiAgICAgICAgbGV0IGhlaWdodCA9ICQodGhpcy50YWJsZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50KS5oZWlnaHQoKTtcblxuICAgICAgICBpZiAodGhpcy50YWJsZUhlYWQgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMudGhlYWRIZWlnaHQgPSAkKHRoaXMudGFibGVIZWFkLm5hdGl2ZUVsZW1lbnQpLmhlaWdodCgpO1xuICAgICAgICAgIGhlaWdodCA9IGhlaWdodCAtIHRoaXMudGhlYWRIZWlnaHQ7XG5cbiAgICAgICAgICBpZiAodGhpcy5za2lwUm93c0FkanVzdG1lbnQgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuYWRqdXN0ZWRSb3dzID0gTWF0aC5yb3VuZCh0aGlzLnRoZWFkSGVpZ2h0IC8gdGhpcy5yb3dIZWlnaHQpICsgMjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92aXJ0dWFsU2Nyb2xsUm93UGVyVmlldyA9IE1hdGgucm91bmQoaGVpZ2h0IC8gdGhpcy5yb3dIZWlnaHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SGVhZGVyV2lkdGhIZWlnaHQoKXsvL0ZvciBodHRwczovL2dpdGh1Yi5jb20vd2VhdmVpby9uZ25zb3BoaWEvaXNzdWVzLzE2MThcbiAgICAgICAgY29uc3QgdGFibGUgPSB0aGlzLnRhYmxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHRoZWFkID0gdGFibGUucXVlcnlTZWxlY3RvcigndGhlYWQnKTtcbiAgICAgICAgbGV0IGhlYWRlck1heEhlaWdodCA9IDA7XG4gICAgICAgIHZhciBpZCA9IHRhYmxlLmlkO1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5zICE9IG51bGwpe1xuICAgICAgICAgICAgaWYodGhpcy5mb3JjZUZpeFdpZHRoKXtcbiAgICAgICAgICAgICAgICAvL3BsZWFzZSBkbyBub3QgcmVtb3ZlZCBvdXIgY29kZVxuICAgICAgICAgICAgICAgIC8vdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRhYmxlLm5hdGl2ZUVsZW1lbnQsIFwidGFibGUtbGF5b3V0XCIsIFwiZml4ZWRcIik7XG5cbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbHVtbiA9IHRoaXMuY29sdW1ucy5maW5kKChpdGVtLCBpZHgpPT5pZHggPT09IGkpO1xuICAgICAgICAgICAgICAgICAgICBpZihjb2x1bW4gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZENoaWxkcmVuID0gdGhlYWQucXVlcnlTZWxlY3RvcigndGg6bnRoLWNoaWxkKCcgKyAoaSsxKSArICcpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGhlYWRDaGlsZHJlbiwgXCJ3aWR0aFwiLCBgJHtjb2x1bW4uY29udHJvbFdpZHRofXB4YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjb2x1bW4uY29udHJvbEhlaWdodCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSGVhZGVyQXV0byA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaGVhZGVyTWF4SGVpZ2h0IDwgY29sdW1uLmNvbnRyb2xIZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJNYXhIZWlnaHQgPSBOdW1iZXIoY29sdW1uLmNvbnRyb2xIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzSGVhZGVyQXV0byl7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjXCIgKyBpZCArIFwiPmRpdj5kaXY+dGFibGVcIikucmVtb3ZlQ2xhc3MoXCJoZWFkZXItZml4ZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyplbHNle1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sdW1uID0gdGhpcy5jb2x1bW5zLmZpbmQoKGl0ZW0sIGlkeCk9PmlkeCA9PT0gaSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbHVtbiAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkQ2hpbGRyZW4gPSB0aGVhZC5xdWVyeVNlbGVjdG9yKCd0aDpudGgtY2hpbGQoJyArIChpKzEpICsgJyknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoaGVhZENoaWxkcmVuLCBcIm1pbi13aWR0aFwiLCBgJHtjb2x1bW4uY29udHJvbFdpZHRofXB4YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ki9cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmdob3N0SGVhZGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChoZWFkZXJNYXhIZWlnaHQgPT0gMCkge1xuICAgICAgICAgICAgICAgIGhlYWRlck1heEhlaWdodCA9IDMwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ2hvc3RIZWFkZXIubmF0aXZlRWxlbWVudCwgXCJoZWlnaHRcIiwgaGVhZGVyTWF4SGVpZ2h0ICsgXCJweFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRhYmxlIGNvbHVtbiAoaW4gY2FzZSBpdCBoYXMgYmVlbiBzd2FwcGVkKVxuICAgICAqL1xuICAgIHByaXZhdGUgcmVzZXRUYWJsZUNvbHVtbnMoKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLmZvcmNlUmVzZXRDb2x1bW5zID09PSB0cnVlICYmXG4gICAgICAgICAgdGhpcy5faXNEeWluZyAhPT0gdHJ1ZSAmJlxuICAgICAgICAgIHRoaXMuY29sdW1ucyAhPSBudWxsICYmXG4gICAgICAgICAgdGhpcy5jb2x1bW5zSGFzQmVlblN3YXBwZWQgPT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnNIYXNCZWVuU3dhcHBlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gXy5jbG9uZSh0aGlzLmNvbHVtbnMpO1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaGVhZE5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZE5vZGUuY2hpbGROb2RlcyA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMgPSBfLnNvcnRCeSh0ZW1wLCAoY29sOiBUYWJsZUNvbHVtbkRpcmVjdGl2ZSwgaWR4OiBudW1iZXIpPT57XG4gICAgICAgICAgICAgICAgY29sLnNldEF0dHJpYnV0ZShcInZpc3VhbEluZGV4XCIsIGlkeCArIFwiXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2wub3JpZ2luYWxDb2x1bW5JbmRleDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRQbHVnaW5zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkUm93SWRlbnRpdHkocm93czogQXJyYXk8YW55Pikge1xuICAgICAgICAvLyBpZiAocm93cyA9PSBudWxsKSByZXR1cm4gcm93cztcblxuICAgICAgICAvLyBmb3IgKGxldCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgcm93cy5sZW5ndGg7IHJvd0luZGV4KyspIHtcbiAgICAgICAgLy8gICAgIHJvd3Nbcm93SW5kZXhdW1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1JPV19ESUZGRVJfSURdID0gQmFzZUNvbXBvbmVudC5nZW5lcmF0ZVVuaXF1ZUlkKFwicm93X2RpZmZlclwiKTtcbiAgICAgICAgLy8gICAgIHJvd3Nbcm93SW5kZXhdW1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1JPV19JRF0gPSB0aGlzLmJ1aWxkUm93SWQocm93c1tyb3dJbmRleF0sIHJvd0luZGV4KTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHJldHVybiByb3dzO1xuICAgIH1cblxuICAgIHJvd1RyYWNrQnlGbihpZHg6bnVtYmVyLCByb3c6IGFueSkge1xuICAgICAgICByZXR1cm4gcm93W1RhYmxlQ29tcG9uZW50LklOVEVSTkFMX1JPV19ESUZGRVJfSURdO1xuICAgIH1cblxuICAgIGNvbHVtbkhlYWRlclRyYWNrQnlGbihpZHg6IG51bWJlciwgY29sdW1uOiBUYWJsZUNvbHVtbkRpcmVjdGl2ZSkge1xuICAgICAgcmV0dXJuIGNvbHVtbltUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9DT0xVTU5fSEVBREVSX0lEXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVkIHZ0LXJvdyBieSBpbmRleC4gVGhpcyB3aWxsIG5vdCB3b3JrcyBmb3Igcm93cyB0aGF0IGFyZSBjcmVhdGVkIGJ5IGRhdGFTb3VyY2VcbiAgICAgKi9cbiAgICByZW1vdmVUYWJsZVJvd0J5SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5fdGFibGVSb3cgIT0gbnVsbCAmJiB0aGlzLl90YWJsZVJvdy5sZW5ndGggPiBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5fdGFibGVSb3cgPSBfLmZpbHRlcih0aGlzLl90YWJsZVJvdywgKHJvdywgcm93SW5kZXgpPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvd0luZGV4ICE9PSBpbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmNsZWFuVXBDaGlsZE5vZGVzKCk7XG4gICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZWQgdnQtcm93IGJ5IGlkLiBUaGlzIHdpbGwgbm90IHdvcmtzIGZvciByb3dzIHRoYXQgYXJlIGNyZWF0ZWQgYnkgZGF0YVNvdXJjZVxuICAgICAqL1xuICAgIHJlbW92ZVRhYmxlUm93QnlJZChpZDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLl90YWJsZVJvdyAhPSBudWxsICYmIHRoaXMuX3RhYmxlUm93Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3RhYmxlUm93ID0gXy5maWx0ZXIodGhpcy5fdGFibGVSb3csIChyb3cpPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvdy5pZCAhPT0gaWQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5jbGVhblVwQ2hpbGROb2RlcygpO1xuICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHRvQ29sdW1ucyhjb2x1bW5zOiBRdWVyeUxpc3Q8VGFibGVDb2x1bW5EaXJlY3RpdmU+KTogQXJyYXk8VGFibGVDb2x1bW5EaXJlY3RpdmU+IHtcbiAgICAgIHJldHVybiBjb2x1bW5zLm1hcCgoY29sLCBpZHgpPT57XG4gICAgICAgIGNvbFtUYWJsZUNvbXBvbmVudC5JTlRFUk5BTF9DT0xVTU5fSEVBREVSX0lEXSA9IEJhc2VDb21wb25lbnQuZ2VuZXJhdGVVbmlxdWVJZChcImhjXCIpO1xuICAgICAgICBjb2wuc2V0QXR0cmlidXRlKFwidmlzdWFsSW5kZXhcIiwgaWR4ICsgJycpO1xuICAgICAgICByZXR1cm4gY29sO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b1dob2xlTnVtYmVyKHdpZHRoOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHdpZHRoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrU2hvd0JsYW5rUm93KCkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPT0gbnVsbCB8fFxuICAgICAgICB0aGlzLmRhdGFTb3VyY2UubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICh0aGlzLnRhYmxlQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnNjcm9sbEhlaWdodCA+ICh0aGlzLnRhYmxlQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNsaWVudEhlaWdodFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuc2hvd0JsYW5rUm93ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3dCbGFua1JvdyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlRnJvbVRhYmxlUm93KHdodHZyOnN0cmluZykge1xuICAgIC8vICAgLy9ubyBpZGVhIHdoYXQgdGhpcyBmb3JcbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIGFwcGVuZEhlYWRlclRvRmFrZVRhYmxlKCkge1xuICAgIC8vICAgaWYgKHRoaXMuaXNIZWFkZXJBcHBlbmRUb0Zha2VUYWJsZSAhPT0gdHJ1ZSkge1xuICAgIC8vICAgICB0aGlzLmZha2VUYWJsZS5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKCQodGhpcy50YWJsZUhlYWQubmF0aXZlRWxlbWVudCkuY2xvbmUoKVswXSk7XG4gICAgLy8gICAgIHRoaXMuaXNIZWFkZXJBcHBlbmRUb0Zha2VUYWJsZSA9IHRydWU7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSByb3cgZnJvbSB0YWJsZVJvd3MgYnkgaWQuIG5vIGRldGVjdCBjaGFuZ2VcbiAgICAgKiBAcGFyYW0gaWQgcm93IGVsZW1lbnQgaWRcbiAgICAgKi9cbiAgICByZW1vdmVGcm9tVGFibGVSb3coaWQ6IHN0cmluZyl7XG4gICAgICBjb25zdCBpID0gdGhpcy50YWJsZVJvdy5maW5kSW5kZXgocj0+ci5pZCA9PT0gaWQpO1xuICAgICAgdGhpcy50YWJsZVJvdy5zcGxpY2UoaSwgMSk7XG4gICAgfVxufVxuIl19