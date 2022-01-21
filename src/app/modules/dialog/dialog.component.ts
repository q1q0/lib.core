import {
  Component,
  Input,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Inject,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SkipSelf,
  Optional,
  ViewContainerRef,
  TemplateRef,
  ContentChild,
  Renderer2,
  Output,
  EventEmitter,
  NgZone
} from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { InitialPosition } from '../base/initial-position';
import { DraggableDirective } from './draggable.directive';
import { DynamicPagesService } from '../view/dynamic-pages.service';
import { TableComponent } from '../table/table.component';
import { UiDocument } from '../base/ui-document';
import { isIE } from '../../functions/is-ie';
import * as _ from 'lodash';

//this stupid thing is needed b/c ng-packagr is complained about namespace
import * as tabbableFRollup from "tabbable";
import { JavaUtils } from '../java/java-utils';

const tabbable = tabbableFRollup;

declare var $: any;

/*
 * Modal markup placement.
 * Always try to place a modal's HTML code in a top-level position in your document to
 * avoid other components affecting the modal's appearance and/or functionality.
*/

/**
 * Class for dialog component
 */
@Component({
  selector: 'vt-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('modalBody') body: ElementRef;
  @ViewChild("modalDialog") modalDialog: ElementRef;
  @ViewChild("modalContent") modalContent: ElementRef;

  @Input() title: String;
  @Input() draggable: boolean = true; //default to true
  @Input() initialPosition: InitialPosition;

  //modal is default to false, when true, it is blocking
  @Input()
  set modal(modal: string | boolean) {
    this._modal = modal;

    this.updateModalDialogStyle();
  }

  get modal() {
    return this._modal;
  }

  private _modal: string | boolean = "false";

  @Input() set centered(boo: boolean | string) {
    if (typeof boo === 'string') {
      this._center = boo === 'true' ? true : false;
    } else {
      this._center = boo;
    }
  }

  //alias
  @Input() set windowTitle(title: string) {
    this.title = title;
  }

  _center: boolean = false;
  @Input() modalSize: string = 'large';

  @Input() resizeable: boolean = false;

  @Output() onClosing: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('myModal', {read: ElementRef}) modalElement: ElementRef;
  @ViewChild('viewContainer', {read: ViewContainerRef}) viewContainer: ViewContainerRef;
  @ViewChild('draggablePanel', {read: ViewContainerRef}) draggablePanel: ViewContainerRef;
  @ViewChild(DraggableDirective) draggableDirective: DraggableDirective;

  modalWidth: number | string = '100%';
  modalHeight: number | string = '100%';
  modalBodyHeight: number | string = '100%';
  isMaximize: boolean = false;
  isUnMaximize: boolean = false;
  contentWidth: string;
  contentHeight: string;

  static readonly UNMAXIMIZE_HEGHT: string ="20px";

  // 画面リサイズ対応 Start
  @Input() resizeDialog: boolean = false;
  modalBodyMinHeight: string = null;
  modalBodyDivHeight: string = null;
  modalBodyDivWidth: string = null;
  modalBodyPercentHeight: string = null;
  // 画面リサイズ対応 End
  resizeFlg: boolean = false;

  modalOriginalLeft: number = 0;
  modalOriginalTop: number = 0;

  /* istanbul ignore next */
  bsModalClass = ["vt-dialog", "modal", "fade", "in"];

  private viewRouteUrl: string = '';

  private viewId: string;
  @Input() tableId: string; //リサイズ時に操作する対象となるテーブルタグのID

  screenIndex: number;

  //sophia 1803: track disabled element that has error background
  _disabledErrorElementId: Array<string>;
  _canTrackFocusLostOnErrorDisabled: boolean;

  //tab cycling
  private _tabbables: Array<HTMLElement>;
  private wasClickOutside: boolean;
  private docClickHandler: (event: MouseEvent)=>void;
  private modalFocusOutHandler: (event: FocusEvent)=>void;
  private keydownHandler: (event: KeyboardEvent)=>void;
  private _lastFocus: HTMLElement;
  private isIE9: boolean;
  /* istanbul ignore next */
  /**
   *
   * @param parent see [[BaseComponent]] constructor
   * @param sessionService see [[BaseComponent]] constructor
   * @param elementRef see [[BaseComponent]] constructor
   * @param cd [[ChangeDetectorRef]] to inject
   * @param renderer see [[BaseComponent]]
   * @param dynamicPageService [[DynamicPageService]] instance to inject
   * @param zone Angular zone
   */
  constructor(@Optional() @SkipSelf() parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, private cd: ChangeDetectorRef, renderer: Renderer2, private dynamicPageService: DynamicPagesService, private zone: NgZone) {
    super(parent, sessionService, elementRef, renderer);

    this.docClickHandler = (event: MouseEvent)=>{
      this.handleDocClickEvent(event);
    };

    this.modalFocusOutHandler = (event: FocusEvent)=>{
      this.checkFocusOut(event);
    };

    this.keydownHandler = (event: KeyboardEvent)=>{
      this.checkKey(event);
    }
    this.isIE9 = isIE() == 9;
  }

  /**
   * Set [[viewRouteUrl]] property
   * @param viewRouteUrl
   */
  setViewRouteUrl(viewRouteUrl: string) {
    this.viewRouteUrl = viewRouteUrl;
  }

  /**
   * Set draggable directive id and [[id]]
   */
  resetId() {
    this.updateDraggableDirectiveId();
    super.resetId();

    this.detectChanges();
  }

  /**
   * 一覧画面をテンプレートを表示している画面で横スクロールがでてしまう事象を回避するためのメソッド
   * 初回リサイズする
   */
  dialogResize() {
    /* istanbul ignore else */
    if (this.resizeFlg === false) {
      //this.resizeExecute();
      this.resizeFlg = true;
      this.setDisabledDialogWidth();
    }
  }

    /**
   * 一覧画面をテンプレートを表示している画面で横スクロールがでてしまう事象を回避するためのメソッド
   * リサイズを行う
   */
  resizeExecute() {
    const bound: DOMRect = (this.modalElement.nativeElement.firstChild.lastElementChild as HTMLElement).getBoundingClientRect() as DOMRect;
    const newX = bound.right - bound.left + 20;
    this.zone.runOutsideAngular(() => {
      this.renderer.setStyle(this.modalElement.nativeElement.firstChild.lastElementChild, 'width', newX + 'px');
    });
    this.detectChanges();
  }

  /* istanbul ignore next */
  /**
   * Init lifecycle. Sets [[viewId]]
   */
  ngOnInit() {
    super.ngOnInit();

    this.viewId = this.id;
  }

  /* istanbul ignore next */
  /**
   * Destroy lifecycle. Cleans up references
   */
  ngOnDestroy() {
    super.ngOnDestroy();

    this.modalDialog = null;
    this.modalContent = null;
    this._lastFocus = null;

    if (this.viewContainer != null) {
      this.viewContainer.clear();
      this.viewContainer = null;
    }

    if (this.draggablePanel != null) {
      this.draggablePanel.clear();
      this.draggablePanel = null;
    }

    if (this.docClickHandler != null) {
      document.removeEventListener("mousedown", this.docClickHandler);
    }

    if (this.modalFocusOutHandler != null) {
      (this.modalElement.nativeElement as HTMLElement).removeEventListener("focusout", this.modalFocusOutHandler, true);
    }

    if (this.keydownHandler) {
      (this.modalElement.nativeElement as HTMLElement).removeEventListener("keydown", this.keydownHandler, true);
    }

    this.docClickHandler = null;
    this.modalFocusOutHandler = null;
    this.keydownHandler = null;

    this.draggableDirective = null;
    this.modalElement = null;
    this._tabbables = null;
  }

  /**
   * After view init lifecycle. Sets initial dialog height/width and positioning
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();

    //add 80px for grid padding
    this.modalWidth = parseInt(this.controlWidth) + 80;
    this.modalHeight = parseInt(this.controlHeight) + 80;

    // 画面リサイズ対応 Start
    if (this.resizeDialog) {
      this.modalBodyPercentHeight = "calc(100% - 25px)"; //modal-header分を削って設定
      this.modalBodyDivHeight = "100%";
      this.modalBodyDivWidth = "100%";
      this.modalBodyMinHeight = "auto";
    } else {
      this.modalBodyHeight = parseInt(this.controlHeight) - 25; //modal-header分を削って設定
    }
    // 画面リサイズ対応 End

    this.detectChanges();

    if (this.modal !== "true" && this.modal !== true) {
      this.setModalLessPosition();
      this.bsModalClass.push("modaless");
      this.detectChanges();
    } else {
      //disable buttons
      $(".header").addClass("header-disabled");
      $(".footer").addClass("footer-disabled");
      $(".header button").attr("disabled", "true");
    }

    this.setInitialPosition(this.initialPosition);
    this.updateDraggableDirectiveId();

    this.setDisabledDialogWidth();
    // if(this.resizeDialog){ 一時的にコメントアウト
      $(this.modalElement.nativeElement).resizable({
        handles: 'n, e, s, w, ne, se, sw, nw',
        minWidth: 150,
        minHeight: 20,
        resize: (event, ui)=>{
          //top、left、right、bottom場所制限設定
          // console.log(ui);
          let isNotRestricted = true;
          if (ui.originalPosition.top != ui.position.top)
            isNotRestricted = isNotRestricted && this.topRestriction(ui);
          if (ui.originalPosition.top == ui.position.top && ui.originalSize.height != ui.size.height)
            isNotRestricted = isNotRestricted && this.bottomRestriction(ui);
          if(!isNotRestricted) return;
          ui.element.css("min-height", "");
          ui.element.css("min-width", "");

          $(this.modalDialog.nativeElement).css("height", ui.size.height);
          $(this.modalDialog.nativeElement).css("width", ui.size.width);

          $(this.modalContent.nativeElement).css("height", ui.size.height);
          $(this.modalContent.nativeElement).css("width", ui.size.width);

          $(this.body.nativeElement).css("min-height", "calc(100% - 25px)");

          if (this.tableId != null) {
            const table: TableComponent = UiDocument.getElementById(this.tableId) as TableComponent;
            if (table != null) {
              table.tableResize();
            }
          }
        }
      });
      $(this.modalElement.nativeElement).on( "resizestop", ()=> {
        this.setDisabledDialogWidth();
      });
    // }

    this._tabbables= tabbable(this.body.nativeElement);
    this.initTabbableTabIndex();

    if (this._tabbables && this._tabbables.length > 0) {
      this._tabbables[0].focus();
    }

    this.zone.runOutsideAngular(()=>{
      document.addEventListener("mousedown", this.docClickHandler);
      (this.modalElement.nativeElement as HTMLElement).addEventListener("focusout", this.modalFocusOutHandler, true);
      (this.modalElement.nativeElement as HTMLElement).addEventListener("keydown", this.keydownHandler, true);
    });
  }

  /* istanbul ignore next */
  /**
   * Set the width of disabled-dialog with the width of the modal-content
   */
  private setDisabledDialogWidth(){
    const element = this.modalElement.nativeElement;
    //this.renderer.setStyle(element.querySelector('.disabled-dialog'),'width', element.querySelector('.modal-content').offsetWidth+'px');
    //this.renderer.setStyle(element.querySelector('.disabled-dialog'),'height', element.querySelector('.modal-content').offsetHeight+'px');
  }

  /* istanbul ignore next */
  /**
   * Sets the [[draggableDirective]] view id to the dialog instance [[id]]
   */
  private updateDraggableDirectiveId() {
    if (this.draggableDirective != null) {
      this.draggableDirective.setViewId(this.id);
      this.draggableDirective.setTableId(this.tableId);
      this.draggableDirective.screenIndex = this.screenIndex;
    }
  }

  /* istanbul ignore next */
  /**
   * Set position of window component
   */
  private setModalLessPosition() {
    const bound: DOMRect = (this.modalElement.nativeElement.firstChild as HTMLElement).getBoundingClientRect() as DOMRect;
    const left = (bound.x || bound.left) + "px";
    const top = (Math.max(bound.y || bound.top, 120)) + "px";

    this.renderer.setStyle(this.modalElement.nativeElement, "left", left);
    this.renderer.setStyle(this.modalElement.nativeElement, "top", top);
  }

  /**
   * Get the native HTML element of this dialog
   * @returns DOM element
   */
  getElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  /* istanbul ignore next */
  /**
   * Event handler for click on close button. Closes the window
   * @param event
   * @param immediate
   */
  close(event: MouseEvent = null, immediate: boolean = false) {
    // this.bsModalClass = ["vt-dialog", "modal", "fade", "out"];

    //this.detectChanges();

    if (event != null) {
      event.stopPropagation();
    }

    if (this.dynamicPageService.isParentModalExist()) {
      $(".header").removeClass("header-disabled");
      $(".footer").removeClass("footer-disabled");
      $(".header button").removeAttr("disabled");
    }

    if (this.getParent() != null && this.getParent().isView() && this.getParent().isDynamicView()) {
      this.dynamicPageService.removeView(this.getParent() as any, immediate);
    } else {
      if (this.getSession() != null && this.getSession().getRouteNavigatorService() != null) {
        this.getSession().getRouteNavigatorService().destroyRoute(this.viewRouteUrl);
      } else {
        console.error("Unable to change route, session or route navigation service is not defined");
      }
    }
  }

  /* istanbul ignore next */
  /**
   * Set [[disabled]] property value
   * @param boo Value for disabled property
   */
  setDisabled(boo: boolean){
    this.disabled = boo;
    $(this.modalElement.nativeElement).resizable( "option", "disabled", boo );//Don't remove this. This makes disabled-dialog not to be resizable.
    $(this.modalElement.nativeElement.querySelector('.modal-content')).disabled = boo;//I am not sure why this is needed.
  }

  /**
   * Sets the dialogs 'z-index' CSS property
   * @param newZIndex
   */
  updateZIndex(newZIndex: number) {
    if (this.modalElement != null && this.renderer != null) {
      this.renderer.setStyle(this.modalElement.nativeElement, "z-index", newZIndex);
    }

    this.setInactiveDialogStyle();
  }

  /* istanbul ignore next */
  /**
   * Set inactive window style if this dialog is not the current active dialog
   */
  setInactiveDialogStyle() {
    const inactiveDialogClass = 'inactive-dialog';

    // Apply inactive dialog class when other window is focused
    if (
      this.getSession().getMcoContainer().activeView() == null ||
      this.getSession().getMcoContainer().activeView().id != this.viewId
    ) {
      this.bsModalClass.push(inactiveDialogClass);
    } else {
      this.bsModalClass = _.filter(this.bsModalClass, (c)=> {
        return c !== inactiveDialogClass;
      });
    }

    //we used OnPush and change detector only know that it needs to do something if
    //our style array is immutable, so we need to tell it that changes happen.
    this.markForCheck();
  }

  /* istanbul ignore next */
  /**
   * Set position of this dialog when it is first opened
   * @param position Window position
   */
  setInitialPosition(position: InitialPosition) {
    if (position != null) {
      if (position.left >= 0) {
        this.renderer.setStyle(this.modalElement.nativeElement, "left", position.left + "px");
      } else {
        this.renderer.setStyle(this.modalElement.nativeElement, "left", "auto");
      }

      if (position.right >= 0) {
        this.renderer.setStyle(this.modalElement.nativeElement, "right", position.right + "px");
      }

      if (position.top >= 0) {
        this.renderer.setStyle(this.modalElement.nativeElement, "top", position.top + "px");
      } else {
        this.renderer.setStyle(this.modalElement.nativeElement, "top", "auto");
      }

      if (position.bottom >= 0) {
        this.renderer.setStyle(this.modalElement.nativeElement, "bottom", position.bottom + "px");
      } else {
        this.renderer.setStyle(this.modalElement.nativeElement, "bottom", "auto");
      }
    }

    // header height and footer height
    const appHeader = $(".header")[0];

    /* istanbul ignore if */
    //appHeader can be null (in unit test, etc)
    if (appHeader) {
      let headerH = appHeader.clientHeight + appHeader.offsetTop;
      // init position
      this.renderer.setStyle(this.modalElement.nativeElement, "top", headerH + "px");
      if ((position != null)) {
        if ( !(position.left > 0)  ) {
          this.renderer.setStyle(this.modalElement.nativeElement, "left", "0");
        }
      } else {
        this.renderer.setStyle(this.modalElement.nativeElement, "left", "0");
      }

      // If 'centered' input is true, override initialPosition and modalLessPosition
      if (this._center) {
        let modelH = $(this.modalElement.nativeElement).height();
        let footerH = $(".footer")[0].clientHeight;
        const appContent = $(".content")[0];
        let calcTop = (appContent.clientHeight -headerH - footerH - modelH) / 2;
        if(calcTop < -70) {
          this.renderer.setStyle(this.modalElement.nativeElement, "top", "100px");
        } else {
          this.renderer.setStyle(this.modalElement.nativeElement, "top", `calc(((100vh - ${headerH}px - ${footerH}px - ${modelH}px) / 2) + ${headerH}px)`);
        }
//        this.renderer.setStyle(this.modalElement.nativeElement, "top", `calc(((100vh - ${headerH}px - ${footerH}px - ${modelH}px) / 2) + ${headerH}px)`);
        this.renderer.setStyle(this.modalElement.nativeElement, "left", "calc((100vw / 2) - " + ($(this.modalElement.nativeElement).width() / 2) + "px)");
      }
    }
  }

  /**
   * Event handler for close event
   * @event OnClosing
   */
  handleOnClosing() {
    this.onClosing.emit();
  }

  /**
   * Get the Nexaweb tag name of this component
   */
  protected getNxTagName() {
    return "dialog";
  }

  /**
   * Get JSON representation of dialog state
   */
  toJson(): {} {
    const json: any = super.toJson();
    this.setJson(json, "title", this.title);
    this.setJson(json, "modal", this.modal);
    this.setJson(json, "centered", this._center);

    return json;
  }

  /**
   * Check whether or not this dialog is a container
   * @returns Boolean
   */
  protected isContainer() {
    return true;
  }

  /**
   * Check whether or not this is a dialog. Implementation of BaseComponent method
   * @returns Boolean
   */
  protected isDialog() {
    return true;
  }

  /* istanbul ignore next */
  /**
   * Get the [[cd]] (ChangeDetectorRef) property
   * @returns ChangeDetectorRef
   */
  getChangeDetector() {
    return this.cd;
  }

  /* istanbul ignore next */
  /**
   * Event handler for minimize button click. Minimizes dialog
   * @param event
   */
  minimize(event: MouseEvent) {
    if (event != null) {
      event.stopPropagation();
    }
    if((JavaUtils.parseBoolean(this.modal))){
      if (!this.isUnMaximize){
        let minHeightLoc = DialogComponent.UNMAXIMIZE_HEGHT;
        this.isUnMaximize =true;
        if (this.isMaximize) {
          $(this.modalElement.nativeElement).css("top", `${this.modalOriginalTop}px`);
          $(this.modalElement.nativeElement).css("left", `${this.modalOriginalLeft}px`);
          this.isMaximize =false;
        }
        $(this.body.nativeElement).css("min-height", "");
        $(this.body.nativeElement).css("height", minHeightLoc);
        $(this.modalElement.nativeElement).css("min-height", "");
        $(this.modalElement.nativeElement).css("height", minHeightLoc);
        $(this.modalElement.nativeElement.querySelector('.modal-content')).css("height", minHeightLoc);
        this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "unmaximize"];
      }else{
        this.isUnMaximize =false;
        let minHeightLoc =$(this.modalElement.nativeElement.querySelector('.modal-dialog')).css("height");
        $(this.body.nativeElement).css("min-height", "calc(100% - 25px)");
        $(this.body.nativeElement).css("height", "calc(100% - 25px)");
        $(this.modalElement.nativeElement).css("min-height", minHeightLoc);
        $(this.modalElement.nativeElement).css("height", minHeightLoc);
        $(this.modalElement.nativeElement.querySelector('.modal-content')).css("height", minHeightLoc);
        this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "unmaximize"];
      }
    }else{
      if (this.isMaximize) {
        $(this.modalElement.nativeElement).css("top", `${this.modalOriginalTop}px`);
        $(this.modalElement.nativeElement).css("left", `${this.modalOriginalLeft}px`);
        this.isMaximize =false;
      }
      this.isUnMaximize =false;
      this.bsModalClass = ["vt-dialog", "modal", "fade", "out", "minimize"];
      this.getSession().getMcoContainer().minimizeView(this.viewId);
    }
    $(this.modalElement.nativeElement).resizable( "option", "disabled", false );
    this.detectChanges();
  }

  /* istanbul ignore next */
  /**
   * Event handler for maximize button click. Maximizes dialog
   * @param event
   */
  maximize(event: MouseEvent) {

    if (event != null) {
      event.stopPropagation();
    }

    if (this.isMaximize) {
      this.bsModalClass = ["vt-dialog", "modal", "fade", "in"];
      $(this.modalElement.nativeElement).css("top", `${this.modalOriginalTop}px`);
      $(this.modalElement.nativeElement).css("left", `${this.modalOriginalLeft}px`);
      this.isMaximize = false;
      if(JavaUtils.parseBoolean(this.modal) &&  $(this.modalElement.nativeElement.querySelector('.modal-content'))[0].style.height === DialogComponent.UNMAXIMIZE_HEGHT){
        this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "unmaximize"];
        this.isUnMaximize =true;
      }else{
        this.isUnMaximize =false;
      }
      this.detectChanges();
      let parentView = this.getParentView();
      if (parentView != null) {
        parentView.restoreAllTablesColumnWidth();
      }
      $(this.modalElement.nativeElement).resizable( "option", "disabled", false );
    } else {
      $(this.body.nativeElement).css("min-height", "calc(100% - 25px)");
      $(this.modalElement.nativeElement).css("height", "auto");
      this.modalOriginalLeft = (this.modalElement.nativeElement as HTMLElement).getBoundingClientRect().left;
      this.modalOriginalTop = (this.modalElement.nativeElement as HTMLElement).getBoundingClientRect().top;
      $(this.modalElement.nativeElement).css("left", `${this.modalOriginalLeft}px`);
      $(this.modalElement.nativeElement).css("top", `${this.modalOriginalTop}px`);
      this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "maximize"];
      this.isMaximize = true;
      this.isUnMaximize =false;
      this.detectChanges();
      let parentView = this.getParentView();
      if (parentView != null) {
        parentView.maximizeAllTablesColumnWidth();
      }
      $(this.modalElement.nativeElement).resizable( "option", "disabled", true );
    }

    // istanbul ignore if */
    if (this.tableId != null) {
      const table: TableComponent = UiDocument.getElementById(this.tableId) as TableComponent;
      if (table != null) {
        table.tableResize();
      }
    }

    this.getSession().getMcoContainer().showView(this.viewId);

    const parentView = this.getParentView();
    if (parentView != null) {
      parentView.resetAllTablesPositionToPrevious();
      parentView.resetAllTablesColumnResizer();
    }
    this.cd.detectChanges();
  }

  /* istanbul ignore next */
  /**
   * Show the view after it has been hidden via minimized
   */
  showView() {
    if(this.disabled) return;
    if (this.isMaximize) {
      this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "maximize"];
    } else {
      this.bsModalClass = ["vt-dialog", "modal", "fade", "in"];
    }

    this.detectChanges();
    this.getSession().getMcoContainer().showView(this.viewId, this.screenIndex);

    const parentView = this.getParentView();
    if (parentView != null) {
      if (!this.isMaximize) {
        parentView.restoreAllTablesColumnWidth();
        if (this.isIE9){//NGN-2350: restore scroll position once dialog is restored
          parentView.resetAllScrollPanesPositionToPrevious();
          parentView.resetSplitPanelPositionToPrevious();//NGN-2350: restore scroll position of panels
        }
      }
      parentView.resetAllTablesPositionToPrevious();
    }
    this.cd.detectChanges();
  }

  /**
   * Event handler for mousedown event. Resets dialog view stack
   */
  handleMouseDown() {
    //make this screen top most.
    this.getSession().getMcoContainer().reStackView(this.viewId, this.screenIndex);
  }
  /**
   * Stop propagation on disabled dialog
   */
  onClickDisableContent(event){
    if(this.disabled) event.stopPropagation();
  }
  /**
   * Stop propagation on modal dialog
   */
  onClickBackdrop(event){
    if(this.modal == true || this.modal == 'true') event.stopPropagation();
  }

  private updateModalDialogStyle() {
    if (this.renderer != null && this.elementRef != null) {
      if (this.modal === true || this.modal === "true") {
        this.renderer.addClass(this.elementRef.nativeElement, "modal");
        this.renderer.setStyle(this.elementRef.nativeElement, "display", "inline-block");
        $(".header").addClass("header-disabled");
        $(".footer").addClass("footer-disabled");
        $(".header button").attr("disabled", "true");
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, "modal");
        this.renderer.removeStyle(this.elementRef.nativeElement, "display");
      }
    }
  }

  private checkFocusOut(event: FocusEvent) {
    // if ((this.elementRef.nativeElement as HTMLElement).contains(event.relatedTarget as HTMLElement)) {
    //   this.getSession()._windowLostFocus = false;
    // }

    // if (
    //   this.getSession()._windowLostFocus !== true &&
    //   this._tabbables &&
    //   this._tabbables.length > 0 &&
    //   this.wasClickOutside !== true &&
    //   !((this.elementRef.nativeElement as HTMLElement).contains(event.relatedTarget as HTMLElement))
    //   && this.disabled !== true
    // ) {

    //   if (
    //     event.relatedTarget == null ||
    //     (
    //       !(event.relatedTarget as HTMLElement).classList.contains("dropdown-item") &&
    //       !(event.relatedTarget as HTMLElement).classList.contains("menuItem")
    //     )
    //   ) {
    //     event.preventDefault();
    //     event.stopPropagation();

    //     this._tabbables[0].focus();
    //   }
    // }

    // this.getSession()._windowLostFocus = false;
  }

  private handleDocClickEvent(event: MouseEvent) {
    this.wasClickOutside = false;

    if (
      !((this.elementRef.nativeElement as HTMLElement).contains(event.target as HTMLElement))
    ) {
      this.wasClickOutside = true;
    }

    let _leftDisabledErroElementId = [];
    //if disabled element
    if (this._canTrackFocusLostOnErrorDisabled === true) {
      if (
        this._disabledErrorElementId != null &&
        this._disabledErrorElementId.length > 0
      ) {

        for (let elId of this._disabledErrorElementId) {
          const disabledEl = UiDocument.getElementById(elId);
          const inputElement = disabledEl.getElement().querySelector('input');
          if (disabledEl != null) {
            if(event.target != inputElement)
              disabledEl.setBgColor("");
            else
              _leftDisabledErroElementId.push(elId);
          }
        }
      }
      if(_leftDisabledErroElementId.length == 0){
        this._disabledErrorElementId = null;
        this._canTrackFocusLostOnErrorDisabled = false;
      }
      else{
        this._disabledErrorElementId = _leftDisabledErroElementId;
      }
    }
  }

  checkKey(event: KeyboardEvent){
    if (this.disabled === true){
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (document.querySelector(".backdrop") != null && this.modal != "true" && this.modal != true)
    {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.code === "Tab" || event.keyCode === 9) {
      this.handleTabbing(event);
    }

    if (event.code === "Space" || event.keyCode === 32) {
      if($(`#${this.id} .combobox-input-box`).is(":focus")) {
        event.preventDefault();
      }
    }
  }

  trackFocusLostOnErrorDisabled() {
    this._canTrackFocusLostOnErrorDisabled = true;
  }

  topRestriction(ui) {
    if (ui.position.top < 100) {
      // top制限を超えた場合
      $(this.modalDialog.nativeElement).css("height", ui.size.height - (100 - ui.position.top));
      $(this.modalContent.nativeElement).css("height", ui.size.height - (100 - ui.position.top));
      // モーダル画面の高さを調整する
      $(this.modalElement.nativeElement).css("height", ui.size.height - (100 - ui.position.top));
      // リサイズの高さを調整する
      ui.position.top = 100;

      // if (ui.position.left < 0) {
      //   // left制限を超えた場合
      //   $(this.modalDialog.nativeElement).css("width", ui.size.width + ui.position.left);
      //   $(this.modalContent.nativeElement).css("width", ui.size.width + ui.position.left);
      //   // モーダル画面の横幅を調整する
      //   $(this.modalElement.nativeElement).css("width", ui.size.width + ui.position.left);
      //   // リサイズの横幅を調整する
      //   ui.position.left = 0;
      //   return false;

      // } else if (window.innerWidth <= ui.position.left + ui.size.width) {
      //   // right制限を超えた場合
      //   $(this.modalDialog.nativeElement).css("width", window.innerWidth - ui.position.left - 1);
      //   $(this.modalContent.nativeElement).css("width", window.innerWidth - ui.position.left - 1);
      //   // モーダル画面の横幅を調整する
      //   $(this.modalElement.nativeElement).css("width", window.innerWidth - ui.position.left - 1);
      //   // リサイズの横幅を調整する
      //   return false;

      // } else {
        // top以外の制限を超えない場合
        $(this.modalContent.nativeElement).css("width", ui.size.width);
        $(this.modalDialog.nativeElement).css("width", ui.size.width);
        if (this.tableId != null) {
          const table: TableComponent = UiDocument.getElementById(this.tableId) as TableComponent;
          if (table != null) {
            table.tableResize();
          }
        }
      // }
      return false;
    }
    return true;
  }

  leftRestriction(ui) {
    if (ui.position.left < 0) {
        // left制限を超えた場合
        $(this.modalDialog.nativeElement).css("width", ui.size.width + ui.position.left);
        $(this.modalContent.nativeElement).css("width", ui.size.width + ui.position.left);
        // モーダル画面の横幅を調整する
        $(this.modalElement.nativeElement).css("width", ui.size.width + ui.position.left);
        $(this.modalElement.nativeElement).css("min-width", window.innerWidth - ui.position.left - 1);
        // リサイズの横幅を調整する
        ui.position.left = 0;

      if (ui.position.top < 100) {
        // left制限を超えた場合
        $(this.modalDialog.nativeElement).css("height", ui.size.height - (100 - ui.position.top));
        $(this.modalContent.nativeElement).css("height", ui.size.height - (100 - ui.position.top));
        // モーダル画面の高さを調整する
        $(this.modalElement.nativeElement).css("height", ui.size.height - (100 - ui.position.top));
        // リサイズの高さを調整する
        ui.position.top = 100;
          return false;

      } else if (window.innerHeight - 39 <= ui.position.top + ui.size.height) {
        // bottom制限を超えた場合
        $(this.modalDialog.nativeElement).css("height", window.innerHeight - ui.position.top - 40);
        $(this.modalContent.nativeElement).css("height", window.innerHeight - ui.position.top - 40);
        // モーダル画面の高さを調整する
        $(this.modalElement.nativeElement).css("height", window.innerHeight - ui.position.top - 40);
        // リサイズの高さを調整する
        return false;

      } else {
        // left以外の制限を超えない場合
        $(this.modalDialog.nativeElement).css("height", ui.size.height);
        $(this.modalContent.nativeElement).css("height", ui.size.height);
        if (this.tableId != null) {
          const table: TableComponent = UiDocument.getElementById(this.tableId) as TableComponent;
          if (table != null) {
            table.tableResize();
          }
        }
      }
      return false;
    }
    return true;
  }

  rightRestriction(ui) {
    if (window.innerWidth <= ui.position.left + ui.size.width) {
      // right制限を超えた場合
      $(this.modalDialog.nativeElement).css("width", window.innerWidth - ui.position.left - 1);
      $(this.modalContent.nativeElement).css("width", window.innerWidth - ui.position.left - 1);
      // モーダル画面の横幅を調整する
      $(this.modalElement.nativeElement).css("width", window.innerWidth - ui.position.left - 1);
      $(this.modalElement.nativeElement).css("min-width", window.innerWidth - ui.position.left - 1);
      // リサイズの横幅を調整する

      if (ui.position.top < 100) {
        // top制限を超えた場合
        $(this.modalDialog.nativeElement).css("height", ui.size.height - (100 - ui.position.top));
        $(this.modalContent.nativeElement).css("height", ui.size.height - (100 - ui.position.top));
        // モーダル画面の高さを調整する
        $(this.modalElement.nativeElement).css("height", ui.size.height - (100 - ui.position.top));
        // リサイズの高さを調整する
        ui.position.top = 100;
          return false;

      } else if (window.innerHeight - 39 <= ui.position.top + ui.size.height) {
        // bottom制限を超えた場合
        $(this.modalDialog.nativeElement).css("height", window.innerHeight - ui.position.top - 40);
        $(this.modalContent.nativeElement).css("height", window.innerHeight - ui.position.top - 40);
        // モーダル画面の高さを調整する
        $(this.modalElement.nativeElement).css("height", window.innerHeight - ui.position.top - 40);
        // リサイズの高さを調整する
        return false;
      }
        // right以外の制限を超えない場合
      $(this.modalDialog.nativeElement).css("height", ui.size.height);
      $(this.modalContent.nativeElement).css("height", ui.size.height);
      if (this.tableId != null) {
        const table: TableComponent = UiDocument.getElementById(this.tableId) as TableComponent;
        if (table != null) {
          table.tableResize();
        }
      }
      return false;
    }
    return true;
  }
  bottomRestriction(ui) {
    if (window.innerHeight - 39 <= ui.position.top + ui.size.height) {
      // bottom制限を超えた場合
      $(this.modalDialog.nativeElement).css("height", window.innerHeight - ui.position.top - 40);
      $(this.modalContent.nativeElement).css("height", window.innerHeight - ui.position.top - 40);
      // モーダル画面の高さを調整する
      $(this.modalElement.nativeElement).css("height", window.innerHeight - ui.position.top - 40);
      // リサイズの高さを調整する

      // if (ui.position.left < 0) {
      //   // left制限を超えた場合
      //   $(this.modalDialog.nativeElement).css("width", ui.size.width + ui.position.left);
      //   $(this.modalContent.nativeElement).css("width", ui.size.width + ui.position.left);
      //   // モーダル画面の横幅を調整する
      //   $(this.modalElement.nativeElement).css("width", ui.size.width + ui.position.left);
      //   // リサイズの横幅を調整する
      //   ui.position.left = 0;
      //   return false;

      // } else if (window.innerWidth <= ui.position.left + ui.size.width) {
      //   // right制限を超えた場合
      //   $(this.modalDialog.nativeElement).css("width", window.innerWidth - ui.position.left - 1);
      //   $(this.modalContent.nativeElement).css("width", window.innerWidth - ui.position.left - 1);
      //   // モーダル画面の横幅を調整する
      //   $(this.modalElement.nativeElement).css("width", window.innerWidth - ui.position.left - 1);
      //   // リサイズの横幅を調整する
      //   return false;

      // } else {
        // bottom以外の制限を超えない場合
        $(this.modalContent.nativeElement).css("width", ui.size.width);
        $(this.modalDialog.nativeElement).css("width", ui.size.width);
        if (this.tableId != null) {
          const table: TableComponent = UiDocument.getElementById(this.tableId) as TableComponent;
          if (table != null) {
            table.tableResize();
          }
        }
      // }
      return false;
    }
    return true;
  }

  /* istanbuil ignore next */
  updateTabbables(isStayFocus:boolean = false) {
    this.zone.runOutsideAngular(()=>{
      this.resetTabbable();
      this._tabbables = tabbable(this.body.nativeElement);
      if(!isStayFocus){
        this.initTabbableTabIndex();
      }
    });
  }

  //reset tab index to 0 so we can requery tabbale.
  private resetTabbable() {
    if (this._tabbables != null && this._tabbables.length > 0) {
      this._tabbables.forEach((el)=>{
        el.tabIndex = 0;
      });
    }
  }

  /* istanbul ignore next */
  /**
   * Set each tabbable element tabIndex to -1 so that user can't navigate using the tab key. We will
   * handle the tabbing ourself.
   */
  private initTabbableTabIndex() {
    if (this._tabbables != null && this._tabbables.length > 0) {
      this._tabbables.forEach((el)=>{
        el.tabIndex = -1;
      });

      //focus the first focusable element
      this._tabbables[0].focus();
    }
  }

  /* istanbul ignore next */
  /**
   * Override browsre tab handling by handle it ourself so that we can trap focus to stay within the dialog.
   *
   * @param event
   */
  private handleTabbing(event: KeyboardEvent) {
    const idx = this._tabbables.indexOf(event.srcElement as HTMLElement);
    let nextFocusableElementIdx = idx;

    if (event.shiftKey === true) {
      if (idx === 0) {
        nextFocusableElementIdx = this.nextTabbable(this._tabbables.length - 1, false);
      } else {
        nextFocusableElementIdx = this.nextTabbable(nextFocusableElementIdx - 1, false);
      }
    } else if (idx === this._tabbables.length -1){
      nextFocusableElementIdx = this.nextTabbable(0);
    } else {
      nextFocusableElementIdx = this.nextTabbable(nextFocusableElementIdx + 1);
    }

    this._tabbables[nextFocusableElementIdx].focus();
    this._lastFocus = this._tabbables[nextFocusableElementIdx];

    event.preventDefault();
    // event.stopPropagation();
  }

  /* istanbul ignore next */
  /**
   * Check to see if the next tabbable element is disabled, if so, get next tabbable element.
   *
   * @param startingIdx
   * @param searchForward
   */
  private nextTabbable(startingIdx: number, searchForward: boolean = true) {
    if (searchForward !== false) {
      do {
        if (
          this.isElementEnable(this._tabbables[startingIdx] as HTMLInputElement) &&
          this.isElementReadOnly(this._tabbables[startingIdx] as HTMLInputElement) !== true &&
          getComputedStyle(this._tabbables[startingIdx]).visibility !== "hidden"
        ) {
          break;
        } else {
          startingIdx++;
        }
      } while(startingIdx < this._tabbables.length);

      //circled back
      if (startingIdx > this._tabbables.length - 1) {
        startingIdx = 0;
      }
    } else {
      do {
        if (
          this.isElementEnable(this._tabbables[startingIdx] as HTMLInputElement) &&
          this.isElementReadOnly(this._tabbables[startingIdx] as HTMLInputElement) !== true &&
          getComputedStyle(this._tabbables[startingIdx]).visibility !== "hidden"
        ) {
          break;
        } else {
          startingIdx--;
        }
      } while(startingIdx > 0);
    }

    return startingIdx;
  }

  /* istanbul ignore next */
  /**
   * return if the element is enabled
   * @param node
   */
  private isElementEnable(node: HTMLInputElement) {
    return node.disabled !== true;
  }

  /* istanbul ignore next */
  /**
   * return if an element is readonly (with the exception of combobox)
   * @param node
   */
  private isElementReadOnly(node: HTMLElement) {
    return (node as HTMLInputElement).readOnly === true && !node.classList.contains("combobox-input-box");
  }

  requestFocus() {
    super.requestFocus();

    if (this._lastFocus != null) {
      this._lastFocus.focus();
    } else if (this._tabbables && this._tabbables.length > 0) {
      this._tabbables[0].focus();
    }
  }
}
