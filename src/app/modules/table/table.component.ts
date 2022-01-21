import * as _ from 'lodash';
import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, SkipSelf, Optional, forwardRef, Renderer2, ContentChild, NgZone, IterableDiffers, IterableDiffer, DoCheck } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { TableColumnDirective } from './table-column.directive';
import { TableSelectionEvent } from './table-selection-event';
import { HTMLElementWrapper } from '../tree-table/html-element-wrapper';
import { OnCreateEvent } from '../base/on-create-event';
import { Vector } from '../java/vector';
import { TableRowDefDirective } from './table-row-def.directive';
import { FooterRowDirective } from './footer-row.directive';
import { Subscription, Subject, timer } from 'rxjs';
import { debounce } from "rxjs/operators";
import { RowDirective } from './row.directive';
import { ClientEvent } from '../event-handler/client-event';
import { AppUtils } from '../base/app-utils';
import { ViewComponent } from '../view/view.component';
import { ClipboardService } from '../clipboard/clipboard.service';
import { TableCellDirective } from './table-cell.directive';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { KeyUtils } from '../base/key-utils';
import { isIE } from '../../functions/is-ie';
import { LabelComponent } from '../label/label.component';
import { PanelComponent } from '../layout/panel.component';
import { DialogComponent } from '../dialog/dialog.component';

declare var jQuery: any;

declare var $;

declare type SelectionMode = "none" | "singleRow" | "multiRow" | "singleCell" | "multiCell" | "singleColumn" | "multiColumn";

export interface VirtualColumnChangeData {
    text: string,
    checked: boolean,
    sortValue?: string
}
/**
 * Class for table component
 */
@Component({
    selector: 'vt-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
      {
        provide: BaseComponent,
        useExisting: forwardRef(()=>TableComponent)
      }
    ]
})
export class TableComponent extends BaseComponent implements OnInit, DoCheck {
    private static readonly INTERNAL_VIRTUAL_ORIGINAL_INDEX: string = "$$INTERNAL_VIRTUAL_ORIGINAL_INDEX$$";
    private static readonly INTERNAL_VIRTUAL_ROW_DATA : string = "$$INTERNAL_VIRTUAL_ROW_DATA$$";
    private static readonly INTERNAL_ROW_DIFFER_ID : string = "$$INTERNAL_VIRTUAL_ROW_DIFFER_ID$$";
    private static readonly INTERNAL_ROW_ID : string = "$$INTERNAL_VIRTUAL_ROW_ID$$";
    private static readonly INTERNAL_COLUMN_HEADER_ID = "$$INTERNAL_COLUMN_HEADER_ID$$";

    @Input() selectionMode: SelectionMode = "singleRow";
    @Input() rowCustomAttributeBuilder: (row:any, rowNumber?: number, view?: ViewComponent)=>{};
    @Input() rowIdBuilder: (row:any, rowNumber?: number)=>string;
    @Input() rowStyleFn: (row:any)=>string;
    @Input() onlyLastColumnWidthChanged: boolean = true;
    @Input() skipHeadWidthAdjustment: boolean = false;
    /** Enable use of virtual scrolling, if this is on, controlWidth and controlHeight must be defined */
    @Input() virtualScroll: boolean;

    //custom sort function for virtual scroll
    @Input() virtualScrollSortFn: (view: BaseComponent, columnIndex: number)=>string;

    //custom function to "render" the invisible row (for virtual scroll)
    @Input() virtualScrollInvisibleRowBuilder: (view: BaseComponent, rowData: any)=>HTMLElementWrapper;

    @Input() sortValueFn: (view: BaseComponent, columnIndex: number, rowData: any)=>string;

    //use for virtual scrolling
    @Input() rowHeight: number = 24;

    @Input() scrollTimeout: number = 200;

    //show blank row if we don't have enough data
    showBlankRow: boolean;
    sortIdx: number;

    @Input() set dataSource(ds: Array<any>) {
        //data has changes, we need to do some clean up.
        if (this.cleanUpDataSourceDiffer == null || this.cleanUpDataSourceDiffer.diff(ds)) {
            this.cleanUpChildNodes();
        }

        this.resetTableColumns();
        this._dataSource = this.buildRowIdentity(ds);

        this.checkShowBlankRow();
        this.previousRowIndex = null;
        this.modifiedVirtualRows = null;
        this.modifiedVirtualRowsJson = null;
        this.selectedRows = [];
        this.selectedRadioRow = -1;

        //attempt to get actual height of each row so we can calculate virtual rows
        this.calculateRowHeight();
        this.calcVirtualScrollHeight();
        this.calcVirtualScrollViewPort(this.prevScrollTop, true);

        this.applyResizeColumns();
    }

    get dataSource() {
        return this.virtualScroll === true ? this._virtualViewPort : this._dataSource;
    }

    /* istanbul ignore next */
    //virtual datasource
    private _virtualViewPort: Array<any>;

    /* istanbul ignore next */
    private _dataSource: Array<any>;

    /* istanbul ignore next */
    /** Weather or not should enabled sort, default to enabled (null/undefined/true mean enabled) */
    @Input() enableSort: boolean;

    /* istanbul ignore next */
    /** Weather or not should allow column drag/drop, default to enabled (null/undefined/true mean enabled) */
    @Input() enableColumnDragging: boolean

    /* istanbul ignore next */
    /** Weather or not should allow column resize, default to enabled (null/undefined/true mean enabled) */
    @Input() enableColumnResize: boolean;

    /* istanbul ignore next */
    /** Whether row can be dropped into this table */
    @Input() droppable: boolean | string;

    /* istanbul ignore next */
    /**
     * Restricted right click popup menu only to cell where popup is defined
     * <ng-template ...><vt-label ...popup="abc"></vt-label></ng-template>
     * */
    @Input() restrictCellPopup: boolean;



    /* istanbul ignore next */
    @Output() onChange: EventEmitter<TableSelectionEvent> = new EventEmitter<TableSelectionEvent>();
    @Output() onStateChange: EventEmitter<void> = new EventEmitter<void>();
    @Output() onDoubleClick: EventEmitter<TableSelectionEvent> = new EventEmitter<TableSelectionEvent>();
    @Output() onDragDrop: EventEmitter<void> = new EventEmitter<void>();
    @Output() onPositionChange = new EventEmitter();

    @ViewChild('table') table: ElementRef;
    @ViewChild("tableContainer", {read: ElementRef}) tableContainer: ElementRef;
    @ViewChild("tableWrapper", {read: ElementRef}) tableWrapper: ElementRef;
    @ViewChild("tableHead", {read: ElementRef}) tableHead: ElementRef;
    /* istanbul ignore next */
    @ViewChild("tableFoot", {read: ElementRef}) tableFoot: ElementRef;

    @ViewChild("fakeTable", {read: ElementRef}) fakeTable: ElementRef;
    @ViewChild("ghostHeader", {read: ElementRef}) ghostHeader: ElementRef;

    @ContentChildren(TableColumnDirective)
    set tableColumns(columns: QueryList<TableColumnDirective>) {
      this.clearHeaderNodes();
      this.columns = this.toColumns(columns);

      if (this._isViewInit === true) {
        this.initPlugins();
      }
    }

    columns: Array<TableColumnDirective>;

    @ContentChild(TableRowDefDirective) tableRowDef: TableRowDefDirective;
    @ContentChild(FooterRowDirective) footerRow: FooterRowDirective;

    //table with no datasource
    @ContentChildren(RowDirective) set tableRowQuery(rows: QueryList<RowDirective>) {
        if (this._dataSource == null) {
            this.cleanUpChildNodes();
        }

        this._tableRow = [];
        this.detectChanges();

        this._tableRow = rows.toArray();
    }

    get tableRow(): Array<RowDirective> {
        return this._tableRow;
    }

    private _tableRow: Array<RowDirective>;

    //custom sort function for virtual scroll
    @Input() forceFixWidth: boolean = true;
    @Input() isHeaderPadding: boolean = false;
    @Input() isHeaderAuto: boolean = false;

    @Input() skipRowsAdjustment: boolean;

    //force reset columns when dataSource changes
    @Input() forceResetColumns: boolean;

    //table-layout default fixed
    @Input() tableLayout: string = "fixed";

    //track dynamic rows so we can query for child later
    nodes: Array<HTMLElementWrapper> = [];
    headNode: HTMLElementWrapper;
    selectedRows: Array<number> = [];
    lastSelectedRowIndex: number;
    private _prevSelectedRows = [];
    private get ROW_INDEX_KEY(): string {
        return '$$$$rowIndex$$$$';
    }
    private $colResizable: JQuery | any;
    // private $dragableColumns: JQuery | any;
    private $draggableColumns: Array<any> = [];
    private $droppableColumns: Array<any> = [];
    private $tablesorter: JQuery | any;
    private scrollHandler: Function = null;
    modifiedVirtualRows: {[name: string]: {[name: string]: VirtualColumnChangeData}};
    modifiedVirtualRowsJson: {[name: string]: {}};
    // mouseUpHandler: Function = null;

    /* istanbul ignore next */
    private dataSourceDiffer: IterableDiffer<Array<any>>;
    private columnsDiffer: IterableDiffer<Array<any>>;
    private customRowDiffer: IterableDiffer<Array<any>>;
    private cleanUpDataSourceDiffer: IterableDiffer<Array<any>>;

    //virtual scroll
    private virtualScrollDataSourceDiffer: IterableDiffer<Array<any>>;

    private previousRowIndex: number = null;

    /* istanbul ignore next */
    private scrollSubcription: Subscription;
    private scrollSubject: Subject<any> = new Subject<any>();
    private keyupHandler: (evt: KeyboardEvent)=>void;

    // Virtual script height, use internally
    _virtualScrollDivHeight: number;

    private _virtualScrollRowPerView: number;

    private _isViewInit: boolean;

    private maxScrollTop: number;

    tableStyles: {[name: string]: string};
    scrollContainerStyles: {[name: string]: string};
    /* istanbul ignore next */
    virtualScrollProgressStyles: {[name: string]: string};
    virtualScrollSortKeys: Array<string>;
    prevScrollTop: number = 0;
    prevScrollTopForHiddenHeader: number = 0;

    sortDirection:string = "";   // RXC Add
    sortColumnId:number = 0;    // RXC Add

    private _disabledScrolling: boolean;

    private _tableSorterRefreshTm: any;

    private _tableSorterCacheRefreshTm: any;

    private _isHeaderCell: boolean;

    private animationFrameId: any;

    private theadHeight: number = 0;

    private scrollLeft: number = 0;

    private columnsHasBeenSwapped: boolean;

    //init plugins timer
    private initTm: any;

    private draggableRows: boolean;
    private shouldHandleMouseUp: boolean;
    private isHeaderAppendToFakeTable: boolean;
    private skipGhostHeader: boolean;

    private clientHeightVirtualScroll: number;



    private isIE9: boolean;

    private _preScrollLeft = 0;
    private _preScrollTop = 0;
    private _parentPositionStyle: string;

    private isDefinedColumnWidth: boolean;

    private _rowHeightCalculated: boolean;

    private tableHeadHeight = 0;

    ghostHeaderStyle = {"width": "calc(100% - 15px)"};//whenever dialog or table is resized, ghost-header has to be resized.
    ghostHeaderShown: boolean;

    //track table container height
    private _tableContainerHeight: number;

    /* istanbul ignore next */
    //temporary skip table height calculation for virtual rows
    private _skipTableHeightCalculation: boolean;

    private selectedRadioRow = -1;
    /* istanbul ignore next */
    private _checkBoxTm: any;

    /* istanbul ignore next */
    private _initTableScrollerTm: any;
    private _initDraggingColumnTm: any;

    /* istanbul ignore next */
    private resetScrollTopToPreviousPositionTm: any;

    /* istanbul ignore next */
    private _applyColumnResizeTm: any;

    /* istanbul ignore next */
    private virtualScrollRedrawTm: any;

    private resetTabbableTm: any;
    private resetTableScrollTop: any;
    /* istanbul ignore next */

    footerRefreshTm : any = null;
    ie9HorizontalScrollTm : any = null;
    private fromIndex = -1;
    private _columnwidth: Array<any> = [];
    private _maximizeColumnWidth: Array<any> = [];
    private _stopDragging = false; //NGN-2281: disable empty frame moving with cursor after clicking unsortable header
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
    constructor(
        @Optional() @SkipSelf() parent: BaseComponent,
        sessionService: SessionService,
        private el: ElementRef,
        private changeDetectorRef: ChangeDetectorRef,
        renderer: Renderer2,
        private zone: NgZone,
        differs: IterableDiffers,
        private clipboardService: ClipboardService
    ) {
        super(parent, sessionService, el, renderer);

        this.dataSourceDiffer = differs.find([]).create();
        this.columnsDiffer = differs.find([]).create();
        this.customRowDiffer = differs.find([]).create();
        this.cleanUpDataSourceDiffer = differs.find([]).create();

        this.isIE9 = isIE() == 9;

        //for virtual scroll
        this.virtualScrollDataSourceDiffer = differs.find([]).create();

        this.keyupHandler = (evt: KeyboardEvent)=> this.handleKeyUp(evt);
        this.scrollHandler = (event: Event) => {
            if (this._disabledScrolling === true) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }

            let scrollTop = (event.srcElement as HTMLElement).scrollTop;
            const tableHeight = $(event.srcElement).find(".table").height();
            const viewHeight  = (event.srcElement as HTMLElement).clientHeight;
            let scrollBotom = tableHeight - viewHeight;
            if(scrollBotom < 0) {
                scrollBotom = 0;
            }
            if(scrollBotom < scrollTop) {
                (event.srcElement as HTMLElement).scrollTop = scrollBotom;
                scrollTop = (event.srcElement as HTMLElement).scrollTop;
            }

            if (this.prevScrollTopForHiddenHeader !== scrollTop) {
                if (!this.skipGhostHeader) {
                    this.renderer.setStyle(this.ghostHeader.nativeElement, "display", "inline-block");
                    this.ghostHeaderShown = true;
                    // if (this.controlWidth === "100%") {
                    //     this.renderer.setStyle(this.ghostHeader.nativeElement, "width", "100%");
                    // }
                    this.renderer.setStyle(this.tableHead.nativeElement, "visibility", "hidden");
                }

            //   if(this.forceFixWidth){
            //     this.renderer.setStyle(this.fakeTable.nativeElement, "table-layout", "fixed");
            //   }

              if(this.tableFoot != null) {
                this.renderer.setStyle(this.tableFoot.nativeElement, "visibility", "hidden");
              }

            //   this.appendHeaderToFakeTable();


                if (this.virtualScroll === true) {
                    // if (this.animationFrameId != null) {
                    //     cancelAnimationFrame(this.animationFrameId);
                    // }

                    this.adjustTableHead(event, false, true, scrollTop);
                }
            }

            this.prevScrollTopForHiddenHeader = scrollTop;

            //disabled for IE11/IE9 (too slow)
            // else {
            //     if (this.animationFrameId != null) {
            //         cancelAnimationFrame(this.animationFrameId);
            //    }

            //     this.animationFrameId = requestAnimationFrame(()=>this.adjustTableHead(event, true));
            // }

            this.scrollSubject.next(event);
            this.registerClientEvent(event);
            this.onPositionChange.emit();
        };
    }

    /* istanbul ignore next */
    /**
     * 画面がリサイズされた際に動かすイベント
     */
    tableResize() {
        this.adjustTableFooter();
    }

    /* istanbul ignore next */
    /**
     * Do check lifecycle
     */
    ngDoCheck() {
        if (
            this.dataSourceDiffer.diff(this._dataSource)
        ) {
            if (this.virtualScroll === true) {
                this.calcVirtualScrollHeight();
                this.calcVirtualScrollViewPort(this.prevScrollTop);
            }

            this.checkShowBlankRow();
            this.markForCheck();
            this.refreshTableSorter();

            this.applyResizeColumns();

            if (this._checkBoxTm != null) {
              clearTimeout(this._checkBoxTm);
            }

            if (this.virtualScroll !== true) {
              this.updateTabbable();
            }

            this._checkBoxTm = setTimeout(()=>{
              this._checkBoxTm = null;

              //NO-DEFECT: found while testing stuff, virtual table does not have tableSorter
              //if (this.virtualScroll !== true) {
              //  const jQueryTable = jQuery(this.table.nativeElement);
              //  let elm = jQueryTable.find("vt-check-box").length > 0 ? jQueryTable.find("vt-check-box") : jQueryTable.find("vt-radio-button")
              //  elm.on('change', ()=>{
              //      this.$tablesorter.trigger('updateCache');
              //      this.$tablesorter.trigger('updateCell');
              //      this.$tablesorter.trigger('updateHeaders');
              //  });
              //}
              const table = jQuery(this.table.nativeElement);
              const tableContainer = table.closest('.table-container');
              const scrollTop = tableContainer.scrollTop();
              const viewHeight  = tableContainer[0].clientHeight;
              const tableHeight = table.height();
              let scrollBotom = tableHeight - viewHeight;
              if(scrollBotom < 0) {
                  scrollBotom = 0;
              }
              if(scrollBotom < scrollTop) {
                tableContainer.scrollTop(scrollBotom);
              }
            }, 1000);

            //if (this.$tablesorter != null) {
            //  const jQueryTable = jQuery(this.table.nativeElement);
            //  this.sortIdx = jQueryTable.find(".tablesorter-headerAsc,.tablesorter-headerDesc").index();
            //  this.$tablesorter.trigger("updateAll", [false]);
            //}

        } else if (this.virtualScroll === true && this.virtualScrollDataSourceDiffer.diff(this._virtualViewPort)) {
          this.checkShowBlankRow();
            this.markForCheck();
        } else {
          this.checkCustomRowsForChanged();
          this.checkColumnsForChanged();
          this.adjustTableFooter();
        }
        if(this.isIE9){
            this.adjustTableHead(null);
            if(this.ie9HorizontalScrollTm === null) {
            this.ie9HorizontalScrollTm = setTimeout(()=>{
              // IE9 hHorizontal scrooll visible or invidsible
              if (Math.abs($(`#${this.id} .table-scroller`).width() - $(`#${this.id} .table`).width()) <= 1) {
                $(`#${this.id} .table-scroller`).css('overflow', 'hidden');
              } else {
                $(`#${this.id} .table-scroller`).css('overflow', 'visible');
              }
              this.ie9HorizontalScrollTm = null;
            }, 100);
          }
        }
    }

    /**
     * Init lifecycle. Call parent class ngOnInit
     */
    ngOnInit() {
      super.ngOnInit();
    }

    /* istanbul ignore next */
    /**
     * After view init lifecycle. Apply jQuery plugin and event listeners
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();

        //this.ghostHeaderStyle = {"width": `${this.tableContainer.nativeElement.offsetWidth - 15}px`};

        //attempt to get actual height of each row so we can calculate virtual rows
        this.calculateRowHeight();

        //1726: It looks like sophia also querying for table column def so we need to store to our parent
        const view = this._getNoneActiveViewParent() || this.getParentView();

        if (view != null && this.columns != null) {
            this.columns.filter(col=>col.id != null && col.id !== "").forEach(col=>{
              if (view["_tableColumnsMap"] == null) {
                view["_tableColumnsMap"] = new Map<string, BaseComponent>();
              }

              view["_tableColumnsMap"].set(KeyUtils.toMapKey(col.id), col as any);
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
                drop: (event, ui)=>{
                    this.onDragDrop.emit();
                },
                tolerance: "pointer"
            });
        }

        /* istanbul ignore next */
        //NGN-2059: decrease debounce while user scrolling
        if (this.virtualScroll === true) {
          this.scrollTimeout = 100;
        }

        this.scrollSubcription = this.scrollSubject.pipe(debounce(()=>timer(this.scrollTimeout))).subscribe((event)=>{
          this.renderer.removeAttribute(this.ghostHeader.nativeElement, "display");

          /* istanbul ignore next */
          if (this.virtualScroll === true) {
            if (this.animationFrameId != null) {
              cancelAnimationFrame(this.animationFrameId);
            }

            this.animationFrameId = requestAnimationFrame(()=>{
              this.recalculateVirtualScrollData(event, true);
              this.resetRadioRows();

              this.animationFrameId = null;
            });


            if (this.virtualScrollRedrawTm != null) {
              clearTimeout(this.virtualScrollRedrawTm);
            }

            this.virtualScrollRedrawTm = setTimeout(()=>{
              this.ghostHeaderShown = false;
              this.adjustTableHead(event);
              //this.applyResizeColumns();
              this.virtualScrollRedrawTm = null;
            }, 500);
          } else {
              this.adjustTableHead(event);
              //this.applyResizeColumns();
          }
        });

        this.scrollContainerStyles = {
            "overflow-y": "auto",
            "overflow-x": "visible",
            "position": "relative"
        }

        /* istanbul ignore next */
        if (this.virtualScroll === true) {
            try {
                if(this.controlHeight == null || this.controlHeight == "100%")
                    this.clientHeightVirtualScroll = (this.tableContainer.nativeElement as HTMLElement).clientHeight;
                else
                    this.clientHeightVirtualScroll = parseInt(this.controlHeight);

                if (isNaN(this.clientHeightVirtualScroll) === false) {
                    this.recCalcNoVirtualRow();
                    this._isViewInit = true;
                }
            } catch (e) {

            }

            this.tableStyles = {
                "top": "0px",
                "left": "0px",
                "position": "absolute",
                "width": "100%",
                // "height": "calc(100% - 17px)",
                "max-width": "100vw",
                "max-height": "100vh"
            }

            this.virtualScrollProgressStyles = {
                "top": "0px",
                "display": "none",
                "position": "absolute"
            }

            this.calcVirtualTablePosition(0);
        }

        /* istanbul ignore next */
         //fix expression has changed blah blah blah
        this.detectChanges();

        if (this.virtualScroll === true) {
            this.calcVirtualScrollHeight();
            this.calcVirtualScrollViewPort(0);
        }

        this._isViewInit = true;
        this.initPlugins();

        this.zone.runOutsideAngular(()=>{
            this.el.nativeElement.addEventListener('scroll', this.scrollHandler, true);
            // this.el.nativeElement.addEventListener("mouseup", this.mouseUpHandler, true);
            this.el.nativeElement.addEventListener("keyup", this.keyupHandler, true);
            const that = this;
            jQuery(this.table.nativeElement).find("tbody").off("focusin.scroll").on("focusin.scroll",function(event){
                // is item focus change Event
                if(event.relatedTarget === null) return;
                let targetTr = $(event.target).closest("tr");
                if(targetTr.length > 0) {
                  const jQueryTable = jQuery(that.table.nativeElement);
                  const tableContainer = jQueryTable.closest('.table-container');
                  //const headerHeight = that.tableHead.nativeElement.clientHeight;
                  const headerHeight = jQueryTable.find('thead').height();
                  //const scrollTop = that.tableContainer.nativeElement.scrollTop;
                  const scrollTop = tableContainer.scrollTop();
                  const trPos = targetTr[0].offsetTop;
                  //let trHeight = targetTr[0].clientHeight;
                  let trHeight = targetTr.height();
                  if(trHeight < 1){
                    trHeight = 20;
                  }
                  let toScrollTop = scrollTop;
                  if(trPos < (toScrollTop + headerHeight)){
                      // scroll to  visible scroll position
                      toScrollTop = trPos - headerHeight;
                  }
                  const footerHeight = jQueryTable.find('tfoot').height();
                  if(footerHeight){
                    const viewHeight = tableContainer.height();
                    const scrollHeight = tableContainer[0].scrollHeight;
                    // scroollPosition < scrollBottom
                    if(toScrollTop < (scrollHeight - viewHeight)) {
                      // event Tr under position > view footerPosition
                      if((trPos + trHeight) > (toScrollTop + viewHeight - footerHeight)){
                        toScrollTop = (trPos + trHeight) - (viewHeight - footerHeight);
                      }
                    }
                  }
                  if(Math.abs(scrollTop - toScrollTop) > 2) {
                      that.tableContainer.nativeElement.scrollTop = toScrollTop;
                  }
                }
            });
        });

        this.updateTabbable();
    }

    /* istanbul ignore next */
    private initPlugins() {
        // if (this.$dragableColumns) {
        //     this.$dragableColumns.destroy();
        // }

        for(let i = 0; i < this.columns.length; i++){
            if (this.$draggableColumns[i]) {
                this.$draggableColumns[i].draggable('destroy');
            }
            if (this.$droppableColumns[i]) {
                this.$droppableColumns[i].droppable('destroy');
            }
        }
        this.$draggableColumns = [];
        this.$droppableColumns = [];

        if (this.initTm != null) {
          clearTimeout(this.initTm);
        }

        // if (this.table) {
            // this.renderer.setStyle(this.table.nativeElement, "visibility", "hidden");

            this.initTm = setTimeout(()=>{
              this.initTm = null;
                if (this.table) {
                    this.renderer.setStyle(this.table.nativeElement, "visibility", "hidden");
                    // 再表示時にスクロールバーの位置を戻す
                    this.tableContainer.nativeElement.scrollLeft = 0;

                    const jQueryTable = jQuery(this.table.nativeElement);
                    
                    if (this.enableColumnDragging == null || this.enableColumnDragging === true) {
                        if (this._initDraggingColumnTm != null) {
                            clearTimeout(this._initDraggingColumnTm);
                        }
                        this._initDraggingColumnTm = setTimeout(()=>{
                            this._initDraggingColumnTm = null;
                            this.initDraggingColumn();
                        }, 1000);
                    }
                    if ((this.enableSort == null || this.enableSort === true) && this.$tablesorter == null) {
                        if (this.virtualScroll !== true) {
                          if (this._initTableScrollerTm != null) {
                            clearTimeout(this._initTableScrollerTm);
                          }
                            this._initTableScrollerTm = setTimeout(()=>{
                              this._initTableScrollerTm = null;
                              this.initTableSorter();
                              // footer posistion reset
                              this.adjustTableFooter();
                            }, 1000);
                        }
                    } else if (this.virtualScroll !== true && this.$tablesorter != null) {
                        this.$tablesorter.trigger("updateHeaders");
                    }

                    this.setHeaderWidthHeight();

                    if (this.skipHeadWidthAdjustment){
                        this.applyResizeColumns();
                        if(this.isIE9){
                            if (Math.abs($(`#${this.id} .table-scroller`).width() - $(`#${this.id} .table`).width()) <= 1){
                                $(`#${this.id} .table-scroller`).css('overflow', 'hidden');
                            }
                            else{
                                $(`#${this.id} .table-scroller`).css('overflow', 'visible');
                            }
                        }
                    }
                    else {
                    if (this.enableColumnResize == null || this.enableColumnResize === true) {
                        let target_columns = new Array();
                        let original_columnWidths = new Array();
                        for(let i = 0; i < this.columns.length; i++){
                            let column = this.columns.find((item, idx)=>idx === i);
                            if(column != null)
                            {
                                const headChildren = (this.tableHead.nativeElement.querySelector('th:nth-child(' + (i+1) + ')') as HTMLElement);
                                target_columns.push(column);
                                if(headChildren.style.width !=null && headChildren.style.width != '')
                                    original_columnWidths.push(headChildren.style.width);
                                else
                                    original_columnWidths.push(`${headChildren.offsetWidth}px`);
                            }
                        }
                        //reset
                        this.applyResizeColumns();
                        if(this.isIE9){
                            if (Math.abs($(`#${this.id} .table-scroller`).width() - $(`#${this.id} .table`).width()) <= 1){
                                $(`#${this.id} .table-scroller`).css('overflow', 'hidden');
                            }
                            else{
                                $(`#${this.id} .table-scroller`).css('overflow', 'visible');
                            }
                        }
                        if(this.onlyLastColumnWidthChanged){
                            let sumWidth = 0;
                            for(let i = 0; i < target_columns.length; i++){
                                const targetColumn = target_columns[i];
                                if (i < target_columns.length - 1){
                                    const originalChildren_width = this.toWholeNumber(original_columnWidths[i]);
                                    sumWidth += originalChildren_width;
                                    // this.renderer.setStyle(targetColumn, "width", original_columnWidths[i]);
                                    targetColumn.styles = {"width": original_columnWidths[i]}
                                    this._columnwidth.push(original_columnWidths[i]);
                                    this._maximizeColumnWidth.push(original_columnWidths[i]);
                                }
                                else {
                                    targetColumn.styles = {"width": original_columnWidths[i]}
                                    this._columnwidth.push(original_columnWidths[i]);
                                    this._maximizeColumnWidth.push(`calc(100% - ${sumWidth}px)`);
                                }
                            }
                        }
                        else{
                            for(let i = 0; i < target_columns.length; i++){
                                const targetColumn = target_columns[i];
                                // const headChildren_width = this.toWholeNumber(targetColumn.style.width.slice(0,-2));
                                // const originalChildren_width = this.toWholeNumber(original_columnWidths[i]);
                                // if(headChildren_width < originalChildren_width){
                                    targetColumn.styles = {"width": original_columnWidths[i]}
                                // }
                                this._columnwidth.push(original_columnWidths[i]);
                                this._maximizeColumnWidth.push(original_columnWidths[i]);
                            }
                        }
                        target_columns = null;
                        original_columnWidths = null;
                    }
                    }
                    //this.adjustTableFooter();
                    this.renderer.setStyle(this.table.nativeElement, "table-layout", this.tableLayout);
                }

                if (this.table != null) {
                    this.renderer.removeStyle(this.table.nativeElement, "visibility");
                }
            }, 200);
        //}
    }

    /* istanbul ignore next */
    /**
     * Destroy lifecycle. Remove event listeners
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.cleanUpChildNodes(true);
        this.clearHeaderNodes(true);

        //1726: It looks like sophia also querying for table column def so we need to store to our parent
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

        if(this.scrollHandler) {
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

        // if (this.$dragableColumns != null) {
        //     this.$dragableColumns.destroy();
        // }

        for(let i = 0; i < this.columns.length; i++){
            if (this.$draggableColumns[i]) {
                this.$draggableColumns[i].draggable('destroy');
            }
            if (this.$droppableColumns[i]) {
                this.$droppableColumns[i].droppable('destroy');
            }
        }

        this.$draggableColumns = [];
        this.$droppableColumns = [];
        if (this.droppable === true || this.droppable === "true") {
            $(this.tableContainer.nativeElement).droppable('destroy');
        }

        // if (this.columnsChangeSubscription != null) {
        //     this.columnsChangeSubscription.unsubscribe();
        // }

        if (this.columns != null) {
          this.columns.forEach(col=>col.parent = null);
        }

        $(this.table.nativeElement).colResizable({
            disable: true
        });
        $(this.table.nativeElement).trigger("destroy") ; 

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
        this.scrollContainerStyles = null;
        this.cleanUpDataSourceDiffer = null;
        this.columns = null;
        this._columnwidth = null;
        this._maximizeColumnWidth = null;
        this.onChange.unsubscribe();
        this.onChange = null;
        this.onStateChange.unsubscribe();
        this.onStateChange = null;
        this.onDoubleClick.unsubscribe();
        this.onDoubleClick = null;
        this.onDragDrop.unsubscribe();
        this.onDragDrop = null;
        this.onPositionChange.unsubscribe();
        this.onPositionChange = null;
        this.changeDetectorRef = null;
    }

    private initDraggingColumn() {
        const jQueryTable = jQuery(this.table.nativeElement);
        let thElms = jQueryTable.find("th");

        this.columns.forEach((column, idx) => {
            const th = $(thElms[idx]);
            this.$draggableColumns.push(
                th.draggable({
                    appendTo: "body",
                    addClasses: false,
                    helper: ()=>{
                        const helper: HTMLElement = document.createElement("div");
                        helper.classList.add("draggable-column-helper");
                        helper.style.width = `${th.width()}px`;
                        helper.style.height = `${th.height()}px`;
                        helper.id = "draggableColumnHelperInternal";
                        return helper;
                    },
                    start: (event, ui)=>{
                        this.skipGhostHeader = true;
                        this.fromIndex = $(event.target).index();
                        const canDrag = this.canDragColumn(this.fromIndex);
                        if (canDrag) {
                            // console.log(`fromIndex:${this.fromIndex}`);
                            this.scrollContainerStyles["overflow-y"] = "hidden";
                            this._parentPositionStyle = $(this.tableContainer.nativeElement).closest( ".vt-dialog" ).css( "position");//for IE11 of sophia:1893
                            $(this.tableContainer.nativeElement).closest( ".vt-dialog" ).css( "position", "absolute" );
                            this.detectChanges();
                            this._disabledScrolling = true;
                        }
                        else{
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    },
                    stop: (event, ui)=>{
                        this.skipGhostHeader = false;
                        this.scrollContainerStyles["overflow-y"] = "auto";
                        if(this._parentPositionStyle != null)
                            $(this.tableContainer.nativeElement).closest( ".vt-dialog" ).css( "position", this._parentPositionStyle );
                        this.detectChanges();
                        this._disabledScrolling = false;
                        setTimeout(()=>{
                            this.fromIndex = -1;
                        })
                        // console.log('drag completed');
                        this._stopDragging = false;
                    },
                    drag: (event, ui)=>{
                        if(this._stopDragging && !column.sortable) return false;
                    }
                })
            );
            this.$droppableColumns.push(
                th.droppable({
                    hoverClass: "th-state-hover",
                    accept: "th",
                    drop: (event, ui)=>{
                        const toIndex = $(event.target).index();
                        // console.log(`toIndex:${toIndex}`);
                        // console.log(`this.fromIndex:${this.fromIndex}`);
                        let canDrag = this.canDragColumn(toIndex);
                        if (canDrag && this.fromIndex >= 0) {
                            this.swapColumns(this.fromIndex, toIndex);
/*
                            this.columns.forEach((column, idx) => {
                                const targetColumn = this.tableHead.nativeElement.querySelector('th:nth-child(' + (idx + 1) + ')');
                                this.renderer.setStyle(targetColumn, "width", `${column.controlWidth}px`);
                            });
*/
                        }
                        else {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        this.fromIndex = -1;
                        // console.log('drop completed');
                    },
                    tolerance: "pointer"
                })
            );
        });
        // console.log(`=============${this.id}================`)
        // console.log(this.$draggableColumns);
        // console.log(this.$droppableColumns);
        // console.log(`=======================================`)
        // this.$dragableColumns = jQueryTable.dragableColumns({
        //     dropCallback: (fromIndex, toIndex) => {
        //         this.swapColumns(fromIndex, toIndex);
        //         this.columns.forEach((column, idx) => {
        //             const targetColumn = this.tableHead.nativeElement.querySelector('th:nth-child(' + (idx + 1) + ')');
        //             this.renderer.setStyle(targetColumn, "width", `${column.controlWidth}px`);
        //         });
        //     },
        //     dragEndCallback: ()=> {
        //         this.skipGhostHeader = false;
        //         this.scrollContainerStyles["overflow-y"] = "auto";
        //         if(this._parentPositionStyle != null)
        //             $(this.tableContainer.nativeElement).closest( ".vt-dialog" ).css( "position", this._parentPositionStyle );
        //         this.detectChanges();
        //         this._disabledScrolling = false;
        //     },
        //     dragStartCallback: (colIdx)=> {
        //         this.skipGhostHeader = true;
        //         let canDrag = this.canDragColumn(colIdx);

        //         if (canDrag) {
        //             this.scrollContainerStyles["overflow-y"] = "hidden";
        //             this._parentPositionStyle = $(this.tableContainer.nativeElement).closest( ".vt-dialog" ).css( "position");//for IE11 of sophia:1893
        //             $(this.tableContainer.nativeElement).closest( ".vt-dialog" ).css( "position", "absolute" );
        //             this.detectChanges();
        //             this._disabledScrolling = true;
        //         }

        //         return canDrag;
        //     },
        //     dragEnterCallback: (colIdx)=>{
        //         return this.canDragColumn(colIdx);
        //     }
        // });
    }
    
    private initTableSorter() {
        const jQueryTable = jQuery(this.table.nativeElement);

        let thElms = jQueryTable.find("th");

        let elm = jQueryTable.find("vt-check-box").length > 0 ? jQueryTable.find("vt-check-box") : jQueryTable.find("vt-radio-button")
        let tdElm = elm.parent("td");
        let trLength = jQueryTable.find("tr").length - 1;
        for (let i = 0; i < tdElm.length; i += trLength) {
            let idx = $(elm.parent("td")[i]).index()
            $(thElms[idx]).addClass("checkbox-sort");
        }
        let inputElm = jQueryTable.find("input");

        let columns = this.columns;
        columns.forEach((column, idx) => {
            if (column.sorting === "checkbox") {
                $(thElms[idx]).addClass("checkbox-sort");
            }
            if (column.sorting === "input") {
                $(thElms[idx]).addClass("input-sort");
            }
            if (column.sorting === "value") {
                $(thElms[idx]).addClass("value-sort");
            }
        });



        this.$tablesorter = jQueryTable.tablesorter({
            widgets        : ['zebra', 'columns'],
            usNumberFormat : true,
            tabIndex : false,
            sortReset : false,
            sortRestart : true,
            sortStable : true,
            delayInit: true, // move the initial performance hit to first sort so the table would load faster
            emptyTo : 'emptyMin',
            textExtraction : {
                '.checkbox-sort' : function(node) {
                    if ($(node).find("input")[0]) {
                        return $(node).find("input")[0].checked.toString();
                    }
                    return "false";
                }
                ,
                '.input-sort' : function(node) {
                    if ($(node).find("input")[0]) {
                        return $(node).find("input")[0].checked.toString() === "true" ? '0' : '1';
                    }
                    return "";
                }
                ,
                '.value-sort' : function(node) {
                    if ($(node).find("input")[0]) {
                        return $(node).find("input")[0].value;
                    }
                    return "";
                }
            },
            textSorter: {
                '.checkbox-sort': function(a, b) {
                    return a.localeCompare(b);
                }
            }
        });

        //tableSorter does not exists on virtual scroll
        if (this.virtualScroll !== true) {
          elm.on('change.sort', ()=>{
              this.$tablesorter.trigger('updateCache');
              this.$tablesorter.trigger('updateCell');
              this.$tablesorter.trigger('updateHeaders');
          });
          inputElm.on('change.sort', this.tableSorterUpdate);
        }
    }

    tableSorterUpdate(){
      const tableDom = $(this).closest('.table');
      if(tableDom){
        setTimeout(()=>{
            tableDom.trigger('updateCache');
            tableDom.trigger('updateCell');
            tableDom.trigger('updateHeaders');
        }, 10);
      }
    }

    /* istanbul ignore next */
    /**
     * Check to see if columns have changes
     */
    private checkColumnsForChanged() {
        if (this.columns != null && this.columnsDiffer.diff(this.columns.map<any>(item=>{
            return {
                visible: item.visible,
                header: item.header,
                controlWidth: item.controlWidth,
                controlMinWidth: item.controlMinWidth,
                locked: item.locked,
                enabled: item.enabled,
                sortable: item.sortable
            }

            // PK: DO NOT REMOVED
            // Comment this out for now and revert to previous, will bring this back
            // when we added a diff to check for changes in vt-row
            // return item.visible +
            //     item.header +
            //     item.controlWidth +
            //     item.locked +
            //     item.enabled +
            //     item.sortable;
        }))){
          //this.cleanUpChildNodes();
          this.markForCheck();
          this.recCalcNoVirtualRow();
        }
    }

    /* istanbul ignore next */
    private checkCustomRowsForChanged() {
        if (this._tableRow != null && this.customRowDiffer.diff(this._tableRow as any)) {
          this.checkShowBlankRow();
            this.markForCheck();
        }
    }

    /* istanbul ignore next */
    private clearHeaderNodes(nullOutHeadNode: boolean = false) {
      if (this.headNode != null) {
        if (this.headNode.childNodes != null && this.headNode.childNodes.length > 0) {
          for (let node of this.headNode.childNodes) {
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

    /* istanbul ignore next */
    /**
     * Clean up our faux table children
     */
    private cleanUpChildNodes(skipTrackingVirtualRow: boolean = false) {
        if (this.nodes != null) {
            const parentView = this.getParentView();

            for (let node of this.nodes) {
                //cache modified data if virtual scroll
                if (
                    skipTrackingVirtualRow !== true &&
                    node.getLocalName() === "row" &&
                    this.virtualScroll === true &&
                    this.modifiedVirtualRows != null &&
                    this.modifiedVirtualRows[node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] != null
                ) {
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
     * @returns Number of rows in [[dataSource]]
     */
    getRowCount(): number {
        return this._dataSource ? this._dataSource.length : 0;
    }

    /* istanbul ignore next */
    /**
     * Add/remove row to list of selected rows
     * @param row
     * @param isSelected If true, row will be added, otherwise row will be removed from selected rows collection
     */
    selectRow(row: HTMLElementWrapper, isSelected: boolean) {
        let rowIndex = -1;

        if (this.virtualScroll === true) {
            const tempNode = _.find(this.nodes, (node) => {
                return node === row;
            });

            if (tempNode != null) {
                rowIndex = tempNode[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
            }
        } else {
            rowIndex = _.findIndex(this.nodes, (node) => {
                return node === row;
            });
        }

        if (rowIndex >= 0 && rowIndex < this._dataSource.length) {
            let idx = _.findIndex(this.selectedRows, (row) => {
                return row === rowIndex;
            });

            if (isSelected) {
                //if it wasn't selected, add it in selectedRows.
                if (idx < 0) {
                    this.selectedRows.push(rowIndex);
                }
            } else {
                //if it was selected before, remove it from selectedRows.
                if (idx >= 0) {
                    this.selectedRows.splice(idx, 1);
                }
            }
        }
    }

    /* istanbul ignore next */
    /**
     * Event handler for click on row
     * @param event Mouse click event
     * @param rowIndex Index of the row that was clicked
     * @event onStateChange
     */
    onRowClick(event: MouseEvent, rowIndex: number) {
        //add the row to view children map for lookup
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

    /* istanbul ignore next */
    private triggerStateChange() {
      const clientEvent = new ClientEvent(this, event);

      if (AppUtils.customizeClientEvent != null) {
        AppUtils.customizeClientEvent(this, clientEvent);
      }

      if (this.getParentView() != null) {
          clientEvent.setParameter("screenId", this.getParentView().getId());
      }

      clientEvent.setParameter("id", this.getId());

      //user can selected more than one row
      let rowId: string = this.selectedRows.map(idx=>this.getChildByOriginalRowIndex(idx).getId()).join(",");

      clientEvent.setParameter("rowId", rowId);

      this.getSession().getEventHandler().setClientEvent(clientEvent);
      this.onStateChange.emit();
    }

    /* istanbul ignore next */
    private getChildByOriginalRowIndex(index: number): HTMLElementWrapper {
        let node: HTMLElementWrapper = this.nodes[index];

        if (this.virtualScroll === true) {
            node = _.find(this.nodes, (el: HTMLElementWrapper)=>{
                return el[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] === index;
            });
        }

        return node;
    }

    handleMouseUp(event: MouseEvent, rowIndex: number, row: any) {
      //for draggale rows, we need to double check row selection again
      if (this.draggableRows === true && this.shouldHandleMouseUp === true) {
        this.toggleRowSelection(event, rowIndex, row, true);
      }

      this.shouldHandleMouseUp = false;
    }

    /* istanbul ignore next */
    /**
     * Set row as selected/unselected
     * @param rowIndex Index of row to toggle on/off
     */
    toggleRowSelection(event: MouseEvent, rowIndex: number, row: any, isMouseUp: boolean = false) {

        const targetEl = <HTMLElement>event.target;

        if (targetEl.tagName.toLowerCase() == 'input' && targetEl.getAttribute('type') != null) {
            if (targetEl.getAttribute('type').toLowerCase() == 'radio') {
                return;
            }
        }

        if (targetEl.tagName.toLowerCase() == 'button') {
            return;
        }

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
              let clearSelection = true;

              if (this.draggableRows === true && isMouseUp !== true && this.selectedRows.indexOf(actualRowIndex) >= 0) {
                clearSelection = false;
                this.shouldHandleMouseUp = true;
              }

              if (clearSelection) {
                this.selectedRows.splice(0, this.selectedRows.length);
              }
            }

            let idx = _.findIndex(this.selectedRows, (row) => {
                return row === actualRowIndex;
            });

            if (idx < 0) {
                //if multi row and user is pressing shift/ctrl key, allow multi row selection
                if (this.selectionMode === "multiRow" && (event.shiftKey || event.ctrlKey)) {
                    if (event.ctrlKey) {
                        this.selectedRows.push(actualRowIndex);
                    } else if (event.shiftKey) {
                        if (this.lastSelectedRowIndex >= 0) {
                            if (this.lastSelectedRowIndex > rowIndex) {
                                for (let i = rowIndex; i <= this.lastSelectedRowIndex; i++) {
                                    this.selectedRows.push(this.getOriginalIndex(i));
                                }
                            } else if (this.lastSelectedRowIndex < rowIndex) {
                                for (let i = this.lastSelectedRowIndex + 0; i <= rowIndex; i++) {
                                    this.selectedRows.push(this.getOriginalIndex(i));
                                }
                            } else {
                                this.selectedRows.push(actualRowIndex);
                            }
                        } else {
                            this.selectedRows.push(actualRowIndex);
                        }
                    }
                } else {
                    this.selectedRows = [actualRowIndex];
                }
            } else if (event.ctrlKey === true && idx >= 0 && event.buttons !== 2) {
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
     * @param index
     */
    private getOriginalIndex(index: number): number {
        if (this.virtualScroll === true && this.nodes[index] != null) {
            return this.nodes[index][TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
        }

        return index;
    }

    /**
     * Set [[disabled]] property value
     * @param boo Toggle [[disabled]]
     */
    setDisabled(boo: boolean) {
        this.disabled = boo;
    }

    /**
     * Get [[disabled]] property value
     */
    getDisabled(): boolean {
        return this.disabled;
    }

    /* istanbul ignore next */
    /**
     * Get a collection of all row elements that are selected
     * @returns The selected rows
     */
    getSelectedRows(): Array<HTMLElementWrapper> {
        const selectedRowElements: Array<HTMLElementWrapper> = [];

        /* istanbul ignore if */
        if (this.selectedRows.length > 0 && this.nodes != null && this.nodes.length > 0) {
            for (let rowIndex of this.selectedRows) {
                for (let node of this.nodes) {
                    let nodeRowIndex = node.rowNumber;

                    if (this.virtualScroll === true) {
                        nodeRowIndex = node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
                    }

                    if (node.getLocalName() === "row" && nodeRowIndex === rowIndex) {
                        selectedRowElements.push(node);
                        break;
                    }
                }
            }
        }

        return selectedRowElements;
    }

    /* istanbul ignore next */
    /**
     * Get collection of selected row indexes
     */
    getSelectedRowIndexes(): Array<number> {
        return this.selectedRows.map(row => {
            return row[this.ROW_INDEX_KEY];
        });
    }

    /**
     * Event handler for row select event
     * @param event
     */
    handleRowSelection(event: any) {
        /* istanbul ignore next */
        if (!_.isEqual(event.selected, this._prevSelectedRows)) {
            this.onChange.emit(new TableSelectionEvent(event.selected));
        }

        this._prevSelectedRows = event.selected;
    }

    /**
     * Event handler for double click on cell
     * @param event
     * @event onDoubleClick
     */
    handleCellActivation(event: any) {
        if (event.type === 'dblclick') {
            this.onDoubleClick.emit(new TableSelectionEvent(event.row));
        }
    }

    //internal
    appendRowIndexToRow(row: any, rowIndex: number) {
        row[this.ROW_INDEX_KEY] = rowIndex;
    }

    /* istanbul ignore */
    /**
     * Trigger change detection and re-render the table
     * @param clearData Set to true to empty table data
     */
    refresh(clearData: boolean = false) {
        if (clearData == true) {
            this._dataSource = [];
        }

        this.detectChanges();
    }

    /* istanbul ignore next */
    /**
     * Redraw table headers
     */
    refreshTableHeader() {
      const prevResetColumns = this.forceResetColumns;
      this.forceResetColumns = true;
      this.columnsHasBeenSwapped = true;

      //force redraw of table header
      this.resetTableColumns();

      //reset flag
      this.forceResetColumns = prevResetColumns;
    }

    /* istanbul ignore next */
    /**
     * Get [[changeDetectorRef]] property
     * @return the ChangeDetector
     */
    protected getChangeDetector(): ChangeDetectorRef {
      return this.changeDetectorRef;
    }

    /**
     * Get NexaWeb tag name
     * @returns Tag name
     */
    protected getNxTagName() {
        return "table";
    }

    /* istanbul ignore next */
    /**
     * Conver the content of this screens to JSON object so it can be sent to the server.
     */
    toJson(): {} {
        const json: any = super.toJson();

        // if (this.getSelectedRows() != null && this.getSelectedRows().length > 0) {
        //     this.setJson(json, "selectedRows", this.getSelectedRows().map(item=>item.toJson()));
        // }

        if (
            this.nodes != null &&
            this.nodes.length > 0
        ) {
            //virtual scroll (track which rows we already converted)
            let tempRows: {[name: string]: any}

            if (this.virtualScroll === true) {
                tempRows = {};
            }

            json["rows"] = this.nodes.map((node, index)=>{
                const rowJson = node.toJson();
                let actualRowIndex = index;

                if (this.virtualScroll === true) {
                  actualRowIndex = node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
                  tempRows[node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
                }

                if (this.selectedRows != null && this.selectedRows.indexOf(actualRowIndex) >= 0) {
                    rowJson["selected"] = "true";
                    rowJson["index"] = actualRowIndex + "";
                }

                return rowJson;
            });

            //virtual scroll data
            if (this.virtualScroll === true && this.modifiedVirtualRowsJson != null) {
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
            let columns = this.columns;
            if (
                this.getLocalName() === "table" &&
                this.columnsHasBeenSwapped === true
            ) {
                columns = _.orderBy(columns, (child: TableColumnDirective)=> {
                  return child.originalColumnIndex;
                }) as any;
            }

            json["columnDefs"] = columns.map((column, index)=>{
                const def = {
                    "visible": this.toJsonValue(column.visible),
                    "locked": this.toJsonValue(column.locked),
                    "enabled": this.toJsonValue(column.enabled),
                    "sortable": this.toJsonValue(column.sortable),
                    "isChecked": this.toJsonValue(column.isChecked),
                    "customAttributes": BaseComponent.mapToJson(column.customAttributes)
                };

                // make sure customAttributes has 'width' property
                if (def["customAttributes"]["width"] != null)
                {
                    const node = this.headNode.getChildAt(index);
                    const width = this.toWholeNumber(node.htmlElement.style.width.slice(0,-2));//server expect whole number
                    def["customAttributes"]["width"] = this.toJsonValue(width);
                }

                if (column.id) {
                    def["id"] = this.toJsonValue(column.id);
                } else {
                    def["id"] = BaseComponent.generateUniqueId("column");
                }

                if (column.locked === true) {
                    def["tagName"] = "lockedColumn";
                    def["nxTagName"] = "lockedColumn";
                } else {
                    def["tagName"] = "column";
                    def["nxTagName"] = "column";
                }

                //header tag of column
                /* istanbul ignore next */
                const header = {
                    "tagName": "header",
                    "nxTagName": "header",
                    "text": this.toJsonValue(column.header)
                };

                if (column.headerDirective && column.headerDirective.id) {
                    header["id"] = this.toJsonValue(column.headerDirective.id);
                } else {
                    header["id"] = BaseComponent.generateUniqueId("header");
                }

                def["children"] = [header];

                return def;
            });
        }

        return json;
    }

    /* istanbul ignore next */
    /**
     * Convert child to JSON
     * @param child child to be converted to JSON
     */
    protected childToJson(child: BaseComponent) {
        return child.getTagName() === "headrow" || child.getTagName() === "headcell" ? child.toJson() : null;
    }

    /* istanbul ignore next */
    /**
     * Add element to internal list of row, cell, or header cell
     * @param type 'row' | 'cell' | 'headcell'
     * @param event Create event
     * @param rowOrColumnIndex
     * @param rowDataOrColumnDef
     */
    registerFauxElement(type: string, event: OnCreateEvent, rowOrColumnIndex: number, rowDataOrColumnDef: any) {
        this._isHeaderCell = false;

        if (rowDataOrColumnDef === null ||
            (rowDataOrColumnDef !== undefined &&
                rowDataOrColumnDef !== null &&
                rowDataOrColumnDef.skipTracking !== true)) {
            if (type === "row") {
                this.trackRow(event, rowOrColumnIndex, rowDataOrColumnDef);
            } else if (type === "cell") {
                this.trackCell(event, rowOrColumnIndex, rowDataOrColumnDef);
            } else if (type === "headcell") {
                this._isHeaderCell = true;
                this.trackHeadCell(event, rowOrColumnIndex, rowDataOrColumnDef);

                if (rowOrColumnIndex === this.columns.length - 1) {
                  this.initPlugins();
                }
            }
        }
    }

    /**
     * Get [[nodes]] property
     * @returns Node list
     */
    getTableChildren(): Array<HTMLElementWrapper> {
      return this.nodes;
    }

    /**
     * Get number of nodes
     * @returns Number of nodes
     */
    getChildCount(): number {
        return this.nodes != null ? this.nodes.length : 0;
    }

    /**
     * Get all children of this table
     * @return List of children
     */
    getChildren(): Vector<any> {
        const children: Vector<HTMLElementWrapper> = new Vector<HTMLElementWrapper>();

        _.forEach(this.getTableChildren(), (child)=>children.add(child));

        return children;
    }

    /**
     *
     * @param xpathExpression Get query result from an xpath expression string
     */
    evaluateXPath(xpathExpression: string): any {
      const result: Vector<any> = new Vector<any>();
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
     *
     * @param childOrArrayOrStringWtf
     * @param rowNumber
     */
    /* istanbul ignore next */
    appendChild(childOrArrayOrStringWtf: any, rowNumber: number = -1) {
        //TODO need to append child to certain row? dpending on childOrArrayOrStringWtf
    }

    /**
     * Check if the row has been selected
     * @param rowIndex Index of row to check
     * @returns True if row is a selected row
     */
    isSelectedRow(rowIndex: number, row: any) {
      if (this.virtualScroll === true && row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] != null) {
        rowIndex = row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
      }

      return this.selectedRows != null && this.selectedRows.indexOf(rowIndex) >= 0;
    }

    /* istanbul ignore next */
    /**
     * Get custom attributes of row if it has any, otherwise return null
     * @param row
     * @param rowOrColumnIndex
     */
    getRowCustomAttributes(row: any, rowOrColumnIndex: number) {
        if (typeof this.rowCustomAttributeBuilder === "function") {
            return this.rowCustomAttributeBuilder(row, rowOrColumnIndex, (this._getNoneActiveViewParent() || this.getParentView()) as ViewComponent);
        }

        if (row != null && row.customAttributes) {
            return row.customAttributes;
        }

        return null;
    }

    /**
     * Check if column is visible. Either by index or column
     * @param index
     * @param column
     * @returns True if column is visible
     */
    isColumnVisible(index: number, column: TableColumnDirective = null): boolean {
        if (column != null) {
            return column.visible;
        }

        return this.columns.find((item, idx)=>idx === index).visible;
    }

    /* istanbul ignore next */
    /**
     * Add a child component to the table
     * @param child Component to add
     */
    protected addChild(child: BaseComponent) {
        super.addChild(child);
        const row = this.nodes[this.nodes.length - 1];

        if (this._isHeaderCell !== true && row) {
            child.tableRowNo = row.rowNumber;
            row.parentTableId = this.id;
            row.parentTable = this;
            //when we get here row.childNodes[currentLength] should be the cell parent row
            //append child component to cell (for dynamic)
            if (row.childNodes[row.childNodes.length - 1] == null) {
                console.error("TableComponent: Unable to register element to cell of current row (cell is null)");
            } else {
                child.setAttribute("isLockedColumn", row.childNodes[row.childNodes.length - 1].getAttribute("isLockedColumn", true));
                row.childNodes[row.childNodes.length - 1].setComponent(child, true);

                //sophia #1728: restricted right click
                if (this.restrictCellPopup === true) {
                  child.skipEmitContextMenuEvent = true;
                }

                if (this.virtualScroll !== true) {
                  const sortValue = child.getAttribute("sortValue", true);

                  if (sortValue != null) {
                      this.renderer.setAttribute(row.childNodes[row.childNodes.length - 1].htmlElement, "data-text", sortValue);
                  }
                }

                let changeTrackingComponent = child;
                /* istanbul ignore if */
                if (
                    this.virtualScroll === true &&
                    changeTrackingComponent instanceof PanelComponent &&
                    changeTrackingComponent.getChildCount() > 0
                ) {
                    const it = changeTrackingComponent["_children"].values();
                    let value = it.next();

                    let done = false;

                    //look for element inside PanelComponent if the column is a panel
                    while(value.done !== true && !done) {
                        if (
                            value.value instanceof CheckboxComponent ||
                            value.value instanceof RadioButtonComponent ||
                            value.value instanceof TextFieldComponent ||
                            value.value instanceof ComboBoxComponent
                        ) {
                            changeTrackingComponent = value.value;
                            done = true;
                        } else if (value.value instanceof LabelComponent && value.value.getVisible() !== false) {
                            changeTrackingComponent = value.value;
                            done = true;
                        }

                        value = it.next();
                    }
                }

                //track change if virtual scroll
                /* istanbul ignore if */
                if (
                    this.virtualScroll === true &&
                    (
                        changeTrackingComponent instanceof CheckboxComponent ||
                        changeTrackingComponent instanceof RadioButtonComponent ||
                        changeTrackingComponent instanceof TextFieldComponent ||
                        changeTrackingComponent instanceof ComboBoxComponent ||
                        changeTrackingComponent instanceof LabelComponent
                    )
                ) {
                    const columnIdx = row.childNodes.length - 1;

                    //has cached data?
                    if (
                      this.modifiedVirtualRows != null &&
                      this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] != null &&
                      this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx]["originalColumnIndex"]] != null
                    ) {
                        const temp = this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx]["originalColumnIndex"]];

                        if (temp.text !== undefined) {
                            (changeTrackingComponent as any).setText(temp.text);
                        }

                        (changeTrackingComponent as any).setChecked(temp.checked, true);
                    }

                    changeTrackingComponent._internalChangeCb = (comp)=>{
                        this._checkInitModifiedVirtualRows();

                        if (this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] == null) {
                            this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]] = {};
                        }

                        this.modifiedVirtualRows[row[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX]][row.childNodes[columnIdx]["originalColumnIndex"]] = {
                            text: comp.getText(),
                            checked: comp.getChecked(),
                            sortValue: comp.getAttribute("sortValue", true)
                        };
                    }
                }
            }
        }
        else if(this.headNode != null){
          //skip emiting event so we can emit ourself.
          child.skipEmitContextMenuEvent = true;
          child.tableRowNo = -1;
          this.headNode.parentTableId = this.id;
          this.headNode.parentTable = this;
          this.headNode.childNodes[this.headNode.childNodes.length - 1].setComponent(child);
        }
    }

    /* istanbul ignore next */
    /**
     * 選択中の行を削除する
     */
    removeSelectedRow(){
        if (this.selectedRows.length > 0){
            // 選択行を降順で並び替える
            let selected :Array<number> = this.selectedRows.concat().sort(function(v1,v2){return v2-v1;});
            for (let idx of selected) {
                let child : HTMLElementWrapper = this.nodes[idx];
                for(let target of child.childNodes) {
                    this.removeChild(target.getComponent());
                }
                child.destroy();
                this.nodes.splice(idx, 1);
                this.dataSource.splice(idx, 1);
            }
            let rowNumber :number = 0;
            for(let row of this.nodes){
                row.rowNumber = rowNumber++;
            }
            this.selectedRows = [];
        }
    }

    /**
     * Check if this is a container component
     * @returns True
     */
    protected isContainer() {
      return true;
    }

    /* istanbul ignore next */
    /**
     * Add row to list of nodes
     * @param event
     * @param rowOrColumnIndex
     * @param rowData
     */
    private trackRow(event: OnCreateEvent, rowOrColumnIndex: number, rowData: any) {
        const row = new HTMLElementWrapper(this.renderer, "", this.getSession());
        row.rowNumber = rowOrColumnIndex;
        row.htmlElement = event.element.nativeElement as HTMLElement;
        this.setParentScreenId(row);
        row.setLocaleName("row");

        const customAttributes = this.getRowCustomAttributes(rowData, rowOrColumnIndex);

        if (customAttributes != null && customAttributes !== "") {
          //NGN-2027: allow invalid use of css class binding that break angular styling.
          //should be using rowStyleFn function to style row
          if (
            typeof customAttributes.class === "string" &&
            customAttributes.class.length > 0
          ) {

            customAttributes.class = customAttributes.class.replace("selected-row", "");
            if (this.isSelectedRow(rowOrColumnIndex, rowData) === true) {
              customAttributes.class = customAttributes.class.trim() + " selected-row";
            }
          }

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

    toRowIndex(rowIndex: number, rowData: any): number {
        return this.virtualScroll === true && rowData != null ? rowData[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] : rowIndex;
    }

    /* istanbul ignore next */
    /**
     * Add cell to list of nodes
     * @param event
     * @param columnDef
     */
    private trackCell(event: OnCreateEvent, columnIndex: number, columnDef: TableColumnDirective) {
        const cell = new HTMLElementWrapper(this.renderer, "", this.getSession());
        cell.htmlElement = event.element.nativeElement as HTMLElement;
        cell.setLocaleName("cell");
        if (columnDef.customAttributes !== undefined) {
          if (!cell.getAttribute("class")) {
              cell.setAttribute("class", columnDef.customAttributes["class"]);
          } else {
              let orgClass: string = cell.getAttribute("class");
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
        if (this.nodes[this.nodes.length - 1] !== undefined && this.nodes[this.nodes.length - 1] !== null){
            this.nodes[this.nodes.length - 1].appendChild(cell,false);
        }
    }

    /* istanbul ignore next */
    private trackHeadCell(event: OnCreateEvent, columnIndex: number, columnDef: TableColumnDirective) {
        if(this.headNode == null){
            this.headNode = new HTMLElementWrapper(this.renderer, "", this.getSession());
            this.headNode.rowNumber = -1;
            this.setParentScreenId(this.headNode);
            this.headNode.setLocaleName("headrow");
        }

        const cell = new HTMLElementWrapper(this.renderer, "", this.getSession());
        cell.htmlElement = event.element.nativeElement as HTMLElement;
        cell.setLocaleName("headcell");
        cell.setAttribute("isLockedColumn", columnDef.locked + "");
        cell.customData = columnDef;
        this.setParentScreenId(cell);
        if (columnDef.originalColumnIndex == null) {
            columnDef.originalColumnIndex = columnIndex;
        }

        this.headNode.appendChild(cell);
    }

    /* istanbul ignore next */
    /**
     * Add element to internal [[nodes]] list to keep track of
     * @param node Element to add to internal node list
     */
    private trackNode(node: HTMLElementWrapper) {
        if (this.nodes == null) {
        this.nodes = [];
        }

        this.nodes.push(node);
    }

    /* istanbul ignore next */
    /**
     * Set the parent screen id on an element
     * @param el
     */
    private setParentScreenId(el: HTMLElementWrapper) {
        if (this.getParentView() != null) {
            el.parentScreenId = this.getParentView().getId();
        }
    }

    /**
     * Get invoke [[rowStyleFn]] on a row and get it's style
     * @param row
     * @returns Style attributes
     */
    rowStyleClass(row: any): string {
        if (typeof this.rowStyleFn === "function") {
            return this.rowStyleFn(row);
        }

        return "";
    }

    /**
     * Find the child node by id
     * @param id Child's id
     */
    getChildNodeById(id: string): HTMLElementWrapper {
        return this.nodes != null ? this.nodes.find(child=>child.id === id) : null;
    }

    /* istanbul ignore next */
    /**
     * Handle cell onContextMenu if component inside the cell has not already handle it
     *
     * @param rowNumber
     * @param columnIndex
     * @param event
     */
    handleColumnOnContextMenu(column: TableCellDirective ,rowNumber, columnIndex: number, event: MouseEvent) {
        if (this.nodes != null && this.nodes[rowNumber] != null) {
            const childColumn = this.nodes[rowNumber].getChildAt(columnIndex);

            // 右クリックメニューイベントフラグがOFFの場合、右クリックメニューを呼び出さない
            if (!column.onContextMenuFlg) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }

            if (childColumn != null && childColumn.component != null) {
              //sophia #1728
              if (this.restrictCellPopup !== true) {
                childColumn.component.handleOnContextMenu(event);
              } else if (this.restrictCellPopup === true) {
                if (childColumn.component.popup != null && childColumn.component.popup !== "") {
                  childColumn.component.handleOnContextMenu(event, true);
                } else {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }
            } else if (column != null) {
                if (this.getSession() != null) {
                    this.getSession().setMousePosition(event);
                }

                const parentView = this.getParentView();
                let popupMenuId: string = null;

                if (parentView != null) {
                    popupMenuId = (parentView as ViewComponent).getFirstPopupMenuId();
                }

                if (typeof column.onContextMenuCb === "function") {
                  column.onContextMenuCb(this._getNoneActiveViewParent() || this.getParentView());
                }

                if (popupMenuId != null) {
                    event.stopPropagation();
                    event.preventDefault();

                    const tm = setTimeout(()=>{
                      clearTimeout(tm);

                    //   if (this.getSession()._currentPopupMenuId != null) {
                    //       popupMenuId = this.getSession()._currentPopupMenuId;
                    //   }

                      this.getSession().showContextMenu(popupMenuId);
                    //   this.getSession()._currentPopupMenuId = null;
                    });
                }
            }
        }
    }

    /* istanbul ignore next */
    /**
     * Event handler for context click on the header
     * @param columnIndex Index of column that was clicked
     * @param event
     */
    handleHeaderOnContextMenu(columnIndex: number, event: MouseEvent) {
        /* istanbul ignore if */
        if (this.headNode != null) {
            const childColumn = this.headNode.getChildAt(columnIndex);

            if (childColumn != null && childColumn.component != null) {
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

    /* istanbul ignore next */
    private recalculateVirtualScrollData(event: MouseEvent, skipTableHeadAdjustment: boolean = false) {
        /* istanbul ignore if */
        if (this.virtualScroll === true) {
          let scrollTop = (event.srcElement as HTMLElement).scrollTop;

          //adjust only on IE9, otherwise, it will stuck in inf loop
          if (this.isIE9 === true) {
              scrollTop -= 0.5;
          }

          if (this.scrollLeft === (event.srcElement as HTMLElement).scrollLeft) {
            this.calcVirtualScrollViewPort(scrollTop);
            this.detectChanges();
          }

          if (skipTableHeadAdjustment !== true) {
            this.adjustTableHead(event);
          }
        }
    }

    /* istanbul ignore next */
    /**
     * Event handler for table head change. Set style to properly display
     * @param event
     */
    private adjustTableHead(event, skipBodyAdjustment: boolean = false, skipHeader: boolean = false, srcElementScrollTop?: number) {
        if (this.table == null || this.columns == null) return;
        let scrollTop = srcElementScrollTop;
        let tableContainerElm = null;
        
        if (event !== null) {
            if($(event.srcElement).hasClass('table-container')){
                tableContainerElm = event.srcElement;
            }
        }
        if(tableContainerElm == null){
            const elements = $(this.table.nativeElement).closest('.table-container');
            if(elements.length < 1){
                return;
            }
            tableContainerElm = elements[0];
        }

        if (srcElementScrollTop == null) {
          //scrollTop = event.srcElement.scrollTop;
          scrollTop = tableContainerElm.scrollTop;
        }

        if(event !== null){//NGN-2307 fix regression of reset scroll position 
            this._preScrollTop = scrollTop;
            //this._preScrollLeft = event.srcElement.scrollLeft;
            this._preScrollLeft = tableContainerElm.scrollLeft;
        }
        //adjust only on IE9, otherwise, it will stuck in inf loop
        if (this.isIE9 === true) {
            scrollTop -= 0.5;
        }

        //this.scrollLeft = event.srcElement.scrollLeft
        this.scrollLeft = tableContainerElm.scrollLeft

        if (this.virtualScroll === true) {
            // if (event.srcElement.scrollTop > this.maxScrollTop) {
            //     scrollTop = this.maxScrollTop;
            // }

            //this.calcVirtualScrollViewPort(scrollTop);
            if (this.prevScrollTopForHiddenHeader !== scrollTop && skipHeader === true) {
              scrollTop -= this.theadHeight;
            }

            this.prevScrollTopForHiddenHeader = scrollTop;
            //this._disabledScrolling = true;
            this.calcVirtualTablePosition(scrollTop);
            // setTimeout(()=>{
            //     this._disabledScrolling = false;

            //     if (this._preScrollVerticalPos === 0 && this.tableContainer != null && this.tableContainer.nativeElement.scrollTop > 0) {
            //         let newScrollTop = this.tableContainer.nativeElement.scrollTop;

            //         if (this.isIE9 === true) {
            //             newScrollTop += 0.5;
            //         }

            //         this.calcVirtualTablePosition(newScrollTop);
            //     }
            // },100);
        }

        if (skipHeader !== true) {
        //   this.fakeTable.nativeElement.innerHTML = "";
        //   this.isHeaderAppendToFakeTable = false;
          this.renderer.removeStyle(this.tableHead.nativeElement, "visibility");
          if(this.tableFoot != null) {
            this.renderer.removeStyle(this.tableFoot.nativeElement, "visibility");
          }

          this.renderer.setStyle(this.ghostHeader.nativeElement, "width", this.tableContainer.nativeElement.clientWidth + "px");
          this.renderer.setStyle(this.ghostHeader.nativeElement, "display", "none");
          this.ghostHeaderShown = false;

          const table = this.table.nativeElement;
          const thead = table.querySelector('thead');
          const tbody = table.querySelector('tbody');

          const JCLRgrip = $(`#${this.id} .JCLRgrip`);
          let offsetJCLRgrip = 0;
          for(let i = 0; i < this.columns.length; i++){
              let column = this.columns.find((item, idx)=>idx === i);
              if(column != null && column.visible && column.locked)
              {
                  const headChildren = $(thead.querySelector('th:nth-child(' + (i+1) + ')'));
                  let trans = `translate(${this.scrollLeft}px, ${scrollTop}px)`;

                  if (this.virtualScroll === true) {
                      trans = `translateX(${this.scrollLeft}px)`;
                  }

                  headChildren.css("transform", trans);
                  headChildren.css("-ms-transform", trans);

                  if (skipBodyAdjustment !== true) {
                      const bodyChildren = $(tbody.querySelectorAll('td:nth-child(' + (i+1) + ')'));
                      bodyChildren.css("transform", `translate(${this.scrollLeft}px`);
                      bodyChildren.css("-ms-transform", `translate(${this.scrollLeft}px`);
                  }

                if(this.enableColumnResize == null || this.enableColumnResize === true){
                //   trans = `translateX(${this.scrollLeft}px)`;
                //   $(JCLRgrip[i]).css("transform", trans);//after resizing column, this is not correct.
                //   $(JCLRgrip[i]).css("-ms-transform", trans);
                  offsetJCLRgrip += $(headChildren).outerWidth();
                  $(JCLRgrip[i]).css("left", `${this.scrollLeft + offsetJCLRgrip}px`);
                }
              } else if (column != null && column.visible && this.virtualScroll !== true) {
                  const headChildren = $(thead.querySelector('th:nth-child(' + (i+1) + ')'));
                  const trans = `translateY(${scrollTop}px)`;

                  headChildren.css("transform", trans);
                  headChildren.css("-ms-transform", trans);
              }
          }

          this.adjustTableFooter();
        }
    }

    /* istanbul ignore next */
    /**
     * Set table footer styles for proper display
     */
    private adjustTableFooter() {
        /* istanbul ignore if */
      if (this.table == null) return;

      const tfoot = this.table.nativeElement.querySelector("tfoot");
      /* istanbul ignore if */
      if (tfoot != null && this.footerRefreshTm === null) {

        // set footter position
        const that = this;
        this.footerRefreshTm = setTimeout(()=>{
          const footer = that.table.nativeElement.querySelector("tfoot");
          const dummyFooter = $(footer).find('.dummyFooter');
          $(dummyFooter).css("display","none");
          $(dummyFooter).find('td').each(function (idx,tdElement){
            $(tdElement).css("height","0px");
          });
          //Vivify, for https://github.com/weaveio/ngnsophia/issues/1806
          const scrollAreaClientHeight    = that.tableContainer.nativeElement.clientHeight;
          const scrollAreaScrollTop = that.tableContainer.nativeElement.scrollTop;
          const tableClientHeight       = that.table.nativeElement.clientHeight;
          let tfootPos = 0;
          if(tableClientHeight <= scrollAreaClientHeight + 2) {
              // not scroll
              tfootPos = scrollAreaClientHeight - tableClientHeight + 2;
          } else {
              // scroll
              if(tableClientHeight <= (scrollAreaClientHeight + scrollAreaScrollTop +2)) {
                  // scroll is bottom
                  tfootPos = 0;
              } else {
                  tfootPos = scrollAreaClientHeight - tableClientHeight + scrollAreaScrollTop + 2;
              }
          }

          if(0 <= tfootPos) {
            $(footer).find('tr:not(.dummyFooter) td').each(function (idx,tdElement){
              $(tdElement).css("transform","");
              $(tdElement).css("-ms-transform","");
              $(tdElement).css("position","");
            });
            if(0 < Math.floor(tfootPos)) {
              //tfootPos += 10;
              $(dummyFooter).css("display", "");
              $(dummyFooter).find('td').each(function (idx,tdElement){
                $(tdElement).css("height", tfootPos+"px");
              });
            }
          } else {
            for(let i = 0; i < that.columns.length; i++){
              let column = that.columns.find((item, idx)=>idx === i);
              if (column != null) {
                const footChildren = $(footer.querySelector('tr:not(.dummyFooter) td:nth-child(' + (i+1) + ')'));
                const trans = `translateY(${tfootPos}px)`;

                footChildren.css("transform", trans);
                footChildren.css("-ms-transform", trans);
                footChildren.css("position", "relative");
                footChildren.css("z-index", "3");
              }
            }
          }
          that.footerRefreshTm = null;
        },100);
      }
    }

    /* istanbul ignore next */
    /**
     * Event handler for keyup. Copy keyboard shortcut support
     * @param event Keyup event
     */
    handleKeyUp(event: KeyboardEvent) {
        if (
            event.ctrlKey === true &&
            (
                event.code === "KeyC" ||
                event.keyCode === 67 ||
                event.keyCode === 99
            )
         ) {
            // istanbul ignore next
            this.copySelectedRowAsText();
        }
    }

    /* istanbul ignore next */
    /**
     * Check to see if we can send selected rows to clipboard
     */
    copySelectedRowAsText() {
        /* istanbul ignore if */
        if (this.selectedRows != null && this.selectedRows.length === 1) {
            let selectedRowText: Array<string>;
            const selectedRow: HTMLElementWrapper = this.getSelectedRows()[0];

            /* istanbul ignore if */
            if (selectedRow.childNodes != null && selectedRow.childNodes.length > 0) {
                selectedRowText = selectedRow.childNodes.map(child => child.getText());
            } else if (selectedRow.dynamicChildNodes != null && selectedRow.dynamicChildNodes.length > 0) {
                selectedRowText = selectedRow.dynamicChildNodes.map(child => child.getText());
            }

            /* istanbul ignore if */
            if (selectedRowText != null && selectedRowText.length > 0) {
                this.clipboardService.copy(selectedRowText.join(String.fromCharCode(9)));
            }
        }
    }

    /* istanbul ignore next */
    /**
     * Generate a row id based on row's [[id]] and index
     * @param row
     * @param rowIndex
     */
    buildRowId(row: any, rowIndex: number): string {
        if (typeof this.rowIdBuilder === "function") {
            return this.rowIdBuilder(row, rowIndex);
        }

        return ['row', this.id, rowIndex].join('-');
    }

    /* istanbul ignore next */
    /**
     * Sort the data (for virtual scroll)
     *
     * @param column
     */
    handleSort(column: TableColumnDirective) {
        if(!column.sortable){
            this._stopDragging = true;
        }
        //sorting is only allowed on a non locking column
        /* istanbul ignore if */
        if (this.virtualScroll === true) {
            //find previous sort direction for the column
            this.columns.forEach(col=>{
                //using originalColumnIndex b/c use can drag column around and thus column index changed
                if (col.originalColumnIndex !== column.originalColumnIndex) {
                    col.sortDirection = null;
                }
            });

            if (column.sortDirection === "asc") {
                column.sortDirection = "desc";
            } else {
                column.sortDirection = "asc";
            }

            let sortColumnId: string = this.virtualScrollSortKeys[column.originalColumnIndex];

            //if custom sortn fn is provided, used to find proper column to sort
            const parentView = this._getNoneActiveViewParent() || this.getParentView();

            if (typeof this.virtualScrollSortFn === "function") {
                sortColumnId = this.virtualScrollSortFn(parentView, column.originalColumnIndex);
            }

            if (sortColumnId != null) {
                this._dataSource = _.orderBy(this._dataSource, (item)=>{
                    let itemValue = item[sortColumnId];
                    const idx = item[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];

                    //check for modified rows to get data
                    if (
                        this.modifiedVirtualRows != null &&
                        this.modifiedVirtualRows[idx] != null &&
                        this.modifiedVirtualRows[idx][column.originalColumnIndex] != null
                    ) {
                        itemValue = this.modifiedVirtualRows[idx][column.originalColumnIndex].sortValue;

                        //if sortValue is null, use text
                        if (itemValue == null) {
                            itemValue = this.modifiedVirtualRows[idx][column.originalColumnIndex].text;
                        }

                        //if text is null, use checked value
                        if (itemValue == null || (itemValue === "" && this.modifiedVirtualRows[idx][column.originalColumnIndex].checked == true)) {
                            itemValue = this.modifiedVirtualRows[idx][column.originalColumnIndex].checked;
                        }

                        if (itemValue === false) {
                            itemValue = "";
                        }
                    }

                    //if sortValueFn function is provided, use it to retrieve value for sorting
                    if (typeof this.sortValueFn === "function") {
                        const sortFnValue = this.sortValueFn(parentView, column.originalColumnIndex, item);

                        //only use it if it is returned none null value, so sortFnValue can returned null
                        //for the column if the column can be no op.
                        if (sortFnValue != null) {
                            itemValue = sortFnValue;
                        }
                    }

                    return itemValue;
                }, [column.sortDirection] as any);
            }

            this.calcVirtualScrollViewPort(this.prevScrollTop);

            //NGN-1997: temporary skip virtual height (we are sorting, height should stay the same)
            this._skipTableHeightCalculation = true;
            this.detectChanges();

            //NGN-1997: allow virtual height to recalc when needed
            //run outside of zone to prevent un-needed change detection
            this.zone.runOutsideAngular(()=>{
              setTimeout(()=>{
                this._skipTableHeightCalculation = false;
              }, 100);
            });
        }  else if (this.virtualScroll === false || this.virtualScroll == null) {
            // RXC Add
            if (this.sortDirection === "") {
                this.sortDirection = "asc";
            } else if (this.sortColumnId === column.originalColumnIndex) {
                if (this.sortDirection === "asc") {
                    this.sortDirection = "desc";
                } else {
                    this.sortDirection = "asc";
                }
            } else {
                this.sortDirection = "asc";
            }
            this.sortColumnId = column.originalColumnIndex;
        }
    }

    /* istanbul ignore next */
    /**
     * Calculate the overall height so we can add scrollbar for virtual scroll. This is done
     * by multiplying the number of rows to the height of each row.
     *
     */
    private calcVirtualScrollHeight() {
        // istanbul ignore if
        if (this.virtualScroll === true && this._skipTableHeightCalculation !== true) {
            if (this._dataSource != null && this._dataSource.length > 0) {
                //scroll height = 10px * # rows (10px is the height of each row)
                this._virtualScrollDivHeight = (this.rowHeight * this._dataSource.length) + this.tableHeadHeight;
                this.maxScrollTop = this._virtualScrollDivHeight;
                this.virtualScrollSortKeys = _.keys(this._dataSource[0]);

                //track original index
                if (typeof this._dataSource[this._dataSource.length - 1][TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] !== "number") {
                    _.forEach(this._dataSource, (item, index)=>{
                        item[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] = index;
                    });
                }
            } else {
                this._virtualScrollDivHeight = 0;
            }
            this.markForCheck();
        }
    }

    /**
     * Adjust/move the position of the table container so that it displayed properly.
     *
     * @param scrollTop
     */
    private calcVirtualTablePosition(scrollTop: number) {
        if (this.virtualScroll === true) {
            //-ms-transform
            //transform
            // if (this.maxScrollTop > 0) {
            //     scrollTop = Math.min(scrollTop, this.maxScrollTop);
            // }

            let actualScrollTop = scrollTop;

            if (this.ghostHeaderShown === true) {
                actualScrollTop += this.tableHeadHeight;
            }

            this.renderer.setStyle(this.tableWrapper.nativeElement, "transform", `translateY(${actualScrollTop}px)`);
            this.renderer.setStyle(this.tableWrapper.nativeElement, "-ms-transform", `translateY(${actualScrollTop}px)`);
            this.markForCheck();
        }
    }

    /**
     * Calculate the visible virtual rows to display to the user
     *
     * @param scrollTop
     */
    private calcVirtualScrollViewPort(scrollTop: number = 0, skipCleanUp: boolean = false) {
        if (this.virtualScroll === true && this._isViewInit === true && this._dataSource != null && this._skipTableHeightCalculation !== true) {
            let startIdx: number = 0;

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
            if (skipCleanUp !== true) {
                this.cleanUpChildNodes();
                this.detectChanges();
            }

            this.zone.run(()=>{
                this._virtualViewPort = this.buildRowIdentity(this._dataSource.slice(startIdx, startIdx + this._virtualScrollRowPerView));

                this.updateTabbable();
            });
        }
    }

    private _swap(fromIndex: number, toIndex: number) {
      const tempToColumn = this.columns[toIndex];

      this.columns[toIndex] = this.columns[fromIndex];
      this.columns[fromIndex] = tempToColumn;

      if (this.skipHeadWidthAdjustment || this._columnwidth == null || this._columnwidth.length == 0) return;
      let tempWidth = this._columnwidth[toIndex];
      this._columnwidth[toIndex] = this._columnwidth[fromIndex];
      this._columnwidth[fromIndex] = tempWidth;

      if (this.skipHeadWidthAdjustment || this._maximizeColumnWidth == null || this._maximizeColumnWidth.length == 0) return;
      tempWidth = this._maximizeColumnWidth[toIndex];
      this._maximizeColumnWidth[toIndex] = this._maximizeColumnWidth[fromIndex];
      this._maximizeColumnWidth[fromIndex] = tempWidth;
    }

    /* istanbul ignore next */
    /**
     * Swap the columns after a column is being drag and rop
     *
     * @param fromIndex column that is being dragged (moved)
     * @param toIndex  column that is being droped into
     */
    private swapColumns(fromIndex: number, toIndex: number) {
      //sophia 1856: need to properly swap columns
      if (fromIndex < toIndex) {
        for (let i = fromIndex; i < toIndex; i++) {
          this._swap(i, i + 1);
        }
      } else if (fromIndex > toIndex) {
        for (let i = fromIndex; i > toIndex; i--) {
          this._swap(i, i - 1);
        }
      }

      if (this.scrollContainerStyles != null) {
          this.scrollContainerStyles["overflow-y"] = "auto";
          this.detectChanges();
      }

      //sophia 1823: for server tracking
      _.forEach(this.columns, (col, idx)=>{
        col.setAttribute("visualIndex", idx + "");
      });

      if (this.virtualScroll !== true) {
        this.detectChanges();

        setTimeout(()=>{
          this.applyResizeColumns();
        }, 200);
      } else {
        this.applyResizeColumns();
      }

      if (this.$tablesorter != null) {
        // this.$tablesorter.trigger("update");
        // this.$tablesorter.trigger("updateHeaders");
        // this.$tablesorter.trigger("updateCache");
        this.$tablesorter.trigger("updateAll", [false]);
      }

      this.columnsHasBeenSwapped = true;
    }

    /* istanbul ignore next */
    private _cleanupColResize() {
        //reset
        this.$colResizable = $(this.table.nativeElement).colResizable({
          disable: true
        });

        $(`#${this.id} .JCLRgrips`).remove();
    }

    /* istanbul ignore next */
    applyResizeColumns() {
      if (this._applyColumnResizeTm != null) {
        clearTimeout(this._applyColumnResizeTm);
      }

      this._applyColumnResizeTm = setTimeout(()=>{
        this._applyColumnResizeTm = null;

        let headerOnly = false;

        if (this._dataSource == null || this._dataSource.length == 0) {
          headerOnly = true;

          if (this.tableContainer != null) {
            (this.tableContainer.nativeElement as HTMLElement).scrollTop = 0;
          }
        }

        if(this.isIE9){//This looks strange, but this is for https://github.com/weaveio/ngnsophia/issues/2033.
            this.tableContainer.nativeElement.scrollLeft--;
            this.tableContainer.nativeElement.scrollLeft++;
            const prevScrollTop = this.tableContainer.nativeElement.scrollTop;
            this.tableContainer.nativeElement.scrollTop = 0;
            this.resetTableScrollTop = setTimeout(()=>{
                clearTimeout(this.resetTableScrollTop);
                this.resetTableScrollTop = null;
                const scrollHeight = (this.tableContainer.nativeElement as HTMLElement).scrollHeight;
                if(prevScrollTop > scrollHeight)
                    this.tableContainer.nativeElement.scrollTop = scrollHeight;
                else
                    this.tableContainer.nativeElement.scrollTop = prevScrollTop;
            }, 1000);

            // IE9 hHorizontal scrooll visible or invidsible
            if (Math.abs($(`#${this.id} .table-scroller`).width() - $(`#${this.id} .table`).width()) <= 1) {
                $(`#${this.id} .table-scroller`).css('overflow', 'hidden');
            } else {
                $(`#${this.id} .table-scroller`).css('overflow', 'visible');
            }
        }

        const _resizeDisabledColumns = [];
        _.forEach(this.columns, (col, idx)=>{
            if(!col.resizable) _resizeDisabledColumns.push(idx);
        });

        if (this.table != null && (this.enableColumnResize == null || this.enableColumnResize === true)) {
          this._cleanupColResize();
          this.$colResizable = $(this.table.nativeElement).colResizable({
              liveDrag: false, //turning this on will incurred a severe performance penalty on IE so leave it off
              resizeMode: 'overflow',
              partialRefresh: true, //After closing the window and opening again, columnResizer can't work. To fix that, this value is needed.,
              headerOnly: headerOnly, //allow dragging using header only
              disabledColumns: _resizeDisabledColumns
          });
        }
      }, 200);
    }

    /**
     * Return whether or not the column at the particular index can be dragged/drop
     *
     * @param colIdx
     */
    private canDragColumn(colIdx: number) {
        if(colIdx < 0) return false;
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
     * @param child row to check fo rindex?
     */
    indexOfChild(child: any): number {
        if (this.nodes != null && this.nodes.length > 0) {
            return _.findIndex(this.nodes, (node)=>node === child);
        }

        //child does not exists
        return -1;
    }

    private _checkInitModifiedVirtualRows() {
      if (this.modifiedVirtualRows == null) {
        this.modifiedVirtualRows = {};
      }
    }

    private _checkInitModifiedVirtualRowsJson() {
      if (this.modifiedVirtualRowsJson == null) {
        this.modifiedVirtualRowsJson = {};
      }
    }

    /**
     * Refresh the table sorter
     */
    private refreshTableSorter() {
      //data changes, need to update tableSorter
      if (this._tableSorterRefreshTm != null) {
          clearTimeout(this._tableSorterRefreshTm);
          this._tableSorterRefreshTm = null;
      }

      let _this = this;
      this.zone.runOutsideAngular(() => {
          this._tableSorterRefreshTm = setTimeout(() => {
              clearTimeout(this._tableSorterRefreshTm);
              this._tableSorterRefreshTm = null;

              if (_this.$tablesorter != null) {
                  const jQueryTable = jQuery(_this.table.nativeElement);
                  jQueryTable.find("vt-check-box,vt-radio-button, input")
                      .off('change.sort').on('change.sort',this.tableSorterUpdate);

                  let ascIdx = jQueryTable.find(".tablesorter-headerAsc").index();
                  let dscIdx = jQueryTable.find(".tablesorter-headerDesc").index();
                  if (dscIdx !== -1) {
                    _this.$tablesorter.trigger("updateAll", [false]);
                    _this.$tablesorter.trigger("update", [[[dscIdx, 1]]]);
                  } else if (ascIdx !== -1) {
                    _this.$tablesorter.trigger("updateAll", [false]);
                    _this.$tablesorter.trigger("update", [[[ascIdx, 0]]]);
                  } else {
                    _this.$tablesorter.trigger("update");
                  }
              }

              if(this.tableContainer != null) {
                this.tableContainer.nativeElement.scrollTop = this._preScrollTop;
                this.tableContainer.nativeElement.scrollLeft = this._preScrollLeft;
              }
              this.adjustTableFooter();
          }, 1000);
      });
    }

    /**
     * Refresh cache data (sort value, etc)
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
          }, 500);
      });
  }

    setSelectAllVirtualRows(shouldSelected: boolean) {
        if (shouldSelected !== true) {
            this.modifiedVirtualRows = {};
            this.modifiedVirtualRowsJson = {};
            this.selectedRows = [];
        } else {
            this._checkInitModifiedVirtualRows();
            this._checkInitModifiedVirtualRowsJson();

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
                    if (_.findIndex(this.nodes, (node)=>{
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
                            const rowElement: HTMLElementWrapper = this.virtualScrollInvisibleRowBuilder(
                                this._getNoneActiveViewParent() || this.getParentView(),
                                row
                            );

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

    private recCalcNoVirtualRow() {
      if (this.virtualScroll === true) {
        let height = $(this.tableContainer.nativeElement).height();

        if (this.tableHead != null) {
          this.theadHeight = $(this.tableHead.nativeElement).height();
          height = height - this.theadHeight;

        //   if (this.skipRowsAdjustment !== true) {
        //     this.adjustedRows = Math.round(this.theadHeight / this.rowHeight) + 2;
        //   }
        }

        const prevVirtualRowPerView = this._virtualScrollRowPerView;

        this._virtualScrollRowPerView = Math.floor(height / this.rowHeight);

        if (prevVirtualRowPerView > 0 && prevVirtualRowPerView !== this._virtualScrollRowPerView) {
            this.calcVirtualScrollViewPort(this.prevScrollTop);
            this.detectChanges();
            this._tableContainerHeight = Math.floor(height);
        }
      }
    }

    private setHeaderWidthHeight(){//For https://github.com/weaveio/ngnsophia/issues/1618
        const table = this.table.nativeElement;
        const thead = table.querySelector('thead');
        //let headerMaxHeight = 0;
        var id = table.id;
        if (this.columns != null){
            if(this.forceFixWidth){
                //WARNING: This code is needed so that width of each column can properly be calculated.
                //please do not comment out or removed, it will cause a bunch of major regression.
                //if for whatever reason, you need to remove this, please create a bug and explain the issue
                //you are trying to resolve.

                this.isDefinedColumnWidth = true;
                for(let i = 0; i < this.columns.length; i++){
                    let column = this.columns.find((item, idx)=>idx === i);
                    if(column != null)
                    {
                        if(column.controlWidth == null || column.controlWidth == '')
                        {
                            this.isDefinedColumnWidth = false;
                            break;
                        }
                    }
                }
                if(this.isDefinedColumnWidth)
                    this.renderer.setStyle(this.table.nativeElement, "table-layout", "fixed");
                else
                    this.renderer.setStyle(this.table.nativeElement, "table-layout", "auto");

                for(let i = 0; i < this.columns.length; i++){
                    let column = this.columns.find((item, idx)=>idx === i);
                    if(column != null)
                    {
                        const headChildren = thead.querySelector('th:nth-child(' + (i+1) + ')');
                        if(column.controlWidth !== null && column.controlWidth !== '')
                            this.renderer.setStyle(headChildren, "width", `${column.controlWidth}px`);
                        if(column.controlMinWidth !== undefined){
                            this.renderer.setStyle(headChildren, "min-width", `${column.controlMinWidth}px`);
                        }
                        if(column.controlHeight !== undefined){
                            this.isHeaderAuto = true;
                            //if(headerMaxHeight < column.controlHeight){
                            //    headerMaxHeight = Number(column.controlHeight);
                            //}
                        }
                    }
                }
                if(this.isHeaderAuto){
                    $(this.table.nativeElement).removeClass("header-fixed");
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
            //if (headerMaxHeight == 0) {
            //    headerMaxHeight = 30;
            //}

            //this.renderer.setStyle(this.ghostHeader.nativeElement, "height", headerMaxHeight + "px");
            this.renderer.setStyle(this.ghostHeader.nativeElement, "height", $(table).find("thead").innerHeight() + "px");
            this.renderer.setStyle(this.ghostHeader.nativeElement, "width", this.tableContainer.nativeElement.clientWidth + "px");
        }
    }

    /**
     * Reset table column (in case it has been swapped)
     */
    private resetTableColumns() {
        if (
          this.forceResetColumns === true &&
          this._isDying !== true &&
          this.columns != null &&
          this.columnsHasBeenSwapped === true
        ) {
            this.columnsHasBeenSwapped = false;

            const temp = _.clone(this.columns);
            this.columns = [];
            this.detectChanges();

            if (this.headNode != null) {
                this.headNode.childNodes = [];
            }

            this.columns = _.sortBy(temp, (col: TableColumnDirective, idx: number)=>{
                col.setAttribute("visualIndex", idx + "");
                return col.originalColumnIndex;
            });
            this.detectChanges();
            this.initPlugins();
        }
    }

    private buildRowIdentity(rows: Array<any>) {
        if (rows == null || rows.length === 0) return rows;

        // for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        //     rows[rowIndex][TableComponent.INTERNAL_ROW_DIFFER_ID] = BaseComponent.generateUniqueId("row_differ");
        //     rows[rowIndex][TableComponent.INTERNAL_ROW_ID] = this.buildRowId(rows[rowIndex], rowIndex);
        // }

        return rows;
    }

    rowTrackByFn(idx:number, row: any) {
        return row[TableComponent.INTERNAL_ROW_DIFFER_ID];
    }

    columnHeaderTrackByFn(idx: number, column: TableColumnDirective) {
      return column[TableComponent.INTERNAL_COLUMN_HEADER_ID];
    }

    /**
     * Removed vt-row by index. This will not works for rows that are created by dataSource
     */
    removeTableRowByIndex(index: number) {
        if (this._tableRow != null && this._tableRow.length > index) {
            this._tableRow = _.filter(this._tableRow, (row, rowIndex)=>{
                return rowIndex !== index;
            });

            this.cleanUpChildNodes();
            this.detectChanges();
        }
    }

    /**
     * Removed vt-row by id. This will not works for rows that are created by dataSource
     */
    removeTableRowById(id: string) {
        if (this._tableRow != null && this._tableRow.length > 0) {
            this._tableRow = _.filter(this._tableRow, (row)=>{
                return row.id !== id;
            });

            this.cleanUpChildNodes();
            this.detectChanges();
        }
    }

    private toColumns(columns: QueryList<TableColumnDirective>): Array<TableColumnDirective> {
      return columns.map((col, idx)=>{
        col[TableComponent.INTERNAL_COLUMN_HEADER_ID] = BaseComponent.generateUniqueId("hc");
        col.setAttribute("visualIndex", idx + '');
        col.parent = this;
        return col;
      });
    }

    private toWholeNumber(width: string): number {
      return parseInt(width);
    }

    private checkShowBlankRow() {
      //NGN-1997: skip calculation when sorting virtual table
      if (this._skipTableHeightCalculation === true) return;

      if (
          (
            this.dataSource == null ||
            this.dataSource.length === 0 ||
          (this.tableContainer.nativeElement as HTMLElement).scrollHeight > (this.tableContainer.nativeElement as HTMLElement).clientHeight
          )
      ) {
        this.showBlankRow = false;
      } else {
        this.showBlankRow = true;
      }
    }

    // removeFromTableRow(whtvr:string) {
    //   //no idea what this for
    // }

    private appendHeaderToFakeTable() {
      if (this.isHeaderAppendToFakeTable !== true) {
          this.fakeTable.nativeElement.innerHTML = "";
        this.fakeTable.nativeElement.appendChild($(this.tableHead.nativeElement).clone()[0]);
        this.isHeaderAppendToFakeTable = true;
      }
    }
    /**
     * Remove row from tableRows by id. no detect change
     * @param id row element id
     */
    removeFromTableRow(id: string){
      const i = this.tableRow.findIndex(r=>r.id === id);
      this.tableRow.splice(i, 1);
    }

    isTable() {
      return true;
    }

    resetScrollTopToPreviousPosition() {
        this.zone.runOutsideAngular(()=>{
          if (this.resetScrollTopToPreviousPositionTm != null) {
            clearTimeout(this.resetScrollTopToPreviousPositionTm);
          }


          this.resetScrollTopToPreviousPositionTm = setTimeout(()=>{
            this.resetScrollTopToPreviousPositionTm = null;
            //NGN-2060: Need to redraw virtual table after switching tab b/c virtual table
            //can't render properly when it doesn't have a height
            this.calculateRowHeight(true);
            this.calcVirtualScrollHeight();
            this.calcVirtualScrollViewPort(this.prevScrollTop, true);

            if(this.tableContainer != null){
                this.tableContainer.nativeElement.scrollTop = this._preScrollTop;
                this.tableContainer.nativeElement.scrollLeft = this._preScrollLeft;
            }
            }, 300);
        });
    }

    resetColumnResizer() {
        if (this._applyColumnResizeTm != null) {
            clearTimeout(this._applyColumnResizeTm);
        }
    
        this._applyColumnResizeTm = setTimeout(()=>{
            this._applyColumnResizeTm = null;
            let headerOnly = false;
            if (this._dataSource == null || this._dataSource.length == 0) {
                headerOnly = true;
                if (this.tableContainer != null) {
                    (this.tableContainer.nativeElement as HTMLElement).scrollTop = 0;
                }
            }
            if (this.table != null && (this.enableColumnResize == null || this.enableColumnResize === true)) {
                this._cleanupColResize();
                const _resizeDisabledColumns = [];
                _.forEach(this.columns, (col, idx)=>{
                    if(!col.resizable) _resizeDisabledColumns.push(idx);
                });
                this.$colResizable = $(this.table.nativeElement).colResizable({
                    liveDrag: false, //turning this on will incurred a severe performance penalty on IE so leave it off
                    resizeMode: 'overflow',
                    partialRefresh: true, //After closing the window and opening again, columnResizer can't work. To fix that, this value is needed.,
                    headerOnly: headerOnly, //allow dragging using header only
                    disabledColumns: _resizeDisabledColumns
                });
            }
        }, 200);
    }

    restoreColumnWidth() {
        if (this.skipHeadWidthAdjustment || this._columnwidth == null || this._columnwidth.length == 0) return;
        for(let i = 0; i < this.columns.length; i++){
            let column = this.columns.find((item, idx)=>idx === i);
            if(column != null && column.visible)
            {
                const headChildren = (this.tableHead.nativeElement.querySelector('th:nth-child(' + (i+1) + ')') as HTMLElement);
                this.renderer.setStyle(headChildren, "width", this._columnwidth[i]);
                column.styles = {"width": this._columnwidth[i]};
            }
        }
        setTimeout(()=>{
            this.adjustTableFooter();
        }, 200);
        this.applyResizeColumns();
    }

    maximizeColumnWidth() {
        if (this.skipHeadWidthAdjustment || this._maximizeColumnWidth == null || this._maximizeColumnWidth.length == 0) return;
        for(let i = 0; i < this.columns.length; i++){
            let column = this.columns.find((item, idx)=>idx === i);
            if(column != null && column.visible)
            {
                column.styles = {"width": this._maximizeColumnWidth[i]};
            }
        }
        this.applyResizeColumns();
    }

    private calculateRowHeight(force: boolean = false) {
        if ((force === true || this._rowHeightCalculated !== true) && this.virtualScroll === true && this._dataSource != null && this._dataSource.length > 0) {
            this._virtualViewPort = this.buildRowIdentity(this._dataSource.slice(0, 1));
            this.detectChanges();

            if (this.nodes.length > 0) {
                const tempRowHeight = this.nodes[0].htmlElement.offsetHeight;

                if (tempRowHeight > 0) {
                    this.rowHeight = tempRowHeight;
                    if (this.tableHead != null) {
                        this.tableHeadHeight = this.tableHead.nativeElement.offsetHeight;
                    }

                    const height = Math.floor($(this.tableContainer.nativeElement).height());

                    if (height !== this._tableContainerHeight) {
                      this.recCalcNoVirtualRow();
                    }

                    this._tableContainerHeight = height;

                    //if height of container is less than 50px, assume that we didn't get the full height of the
                    //table container yet so that we can try again later.
                    if (this._tableContainerHeight > 50) {
                      this._rowHeightCalculated =  true;
                    }
                    // this.appendHeaderToFakeTable();
                }
            }
        }
    }

    getScrollPosHorizontal(){
        return this.tableContainer.nativeElement.scrollLeft
    }

    setScrollPosHorizontal(scrollLeft){
        this.tableContainer.nativeElement.scrollLeft = scrollLeft
    }

    setSelectedRadioRow(selectedRow){
        if(this.virtualScroll)
            this.selectedRadioRow = selectedRow[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX];
    }

    resetRadioRows() {
        if(this.virtualScroll){
            let radioBoxColumnIdx = -1;
            if (this.nodes != null && this.nodes.length > 0) {
                //find all checkboxes columns
                for (let i = 0; i < this.nodes[0].childNodes.length; i++) {
                    if (this.nodes[0].childNodes[i].component instanceof RadioButtonComponent) {
                        radioBoxColumnIdx = i;
                    }
                }
            }
            if(radioBoxColumnIdx > -1){
                _.forEach(this.nodes, (node) => {
                    if(node[TableComponent.INTERNAL_VIRTUAL_ORIGINAL_INDEX] != this.selectedRadioRow)
                    {
                        const comp = node.childNodes[radioBoxColumnIdx].getComponent();
                        comp.setChecked(false);
                    }
                });
            }
            this.detectChanges();
        }
    }

    private updateTabbable() {
      if (this.resetTabbableTm != null) {
        clearTimeout(this.resetTabbableTm);
      }

      this.resetTabbableTm = setTimeout(()=>{
        clearTimeout(this.resetTabbableTm);
        this.resetTabbableTm = null;

        const parentDialog: DialogComponent = this.getParentDialogView() as DialogComponent;

        if (parentDialog != null) {
          parentDialog.updateTabbables();
        }
      }, 1000);
    }
}
