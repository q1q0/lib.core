/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, SkipSelf, Optional, ViewContainerRef, Renderer2, Output, EventEmitter, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { DraggableDirective } from './draggable.directive';
import { DynamicPagesService } from '../view/dynamic-pages.service';
import { UiDocument } from '../base/ui-document';
import * as _ from 'lodash';
import * as tabbableFRollup from "tabbable";
import { JavaUtils } from '../java/java-utils';
/** @type {?} */
const tabbable = tabbableFRollup;
/**
 * Class for dialog component
 */
export class DialogComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd [[ChangeDetectorRef]] to inject
     * @param {?} renderer see [[BaseComponent]]
     * @param {?} dynamicPageService [[DynamicPageService]] instance to inject
     * @param {?} zone Angular zone
     */
    constructor(parent, sessionService, elementRef, cd, renderer, dynamicPageService, zone) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.dynamicPageService = dynamicPageService;
        this.zone = zone;
        this.draggable = true;
        this._modal = "false";
        this._center = false;
        this.modalSize = 'large';
        this.resizeable = false;
        this.onClosing = new EventEmitter();
        this.modalWidth = '100%';
        this.modalHeight = '100%';
        this.modalBodyHeight = '100%';
        this.isMaximize = false;
        this.isUnMaximize = false;
        // 画面リサイズ対応 Start
        this.resizeDialog = false;
        this.modalBodyMinHeight = null;
        this.modalBodyDivHeight = null;
        this.modalBodyDivWidth = null;
        this.modalBodyPercentHeight = null;
        // 画面リサイズ対応 End
        this.resizeFlg = false;
        this.modalOriginalLeft = 0;
        this.modalOriginalTop = 0;
        /* istanbul ignore next */
        this.bsModalClass = ["vt-dialog", "modal", "fade", "in"];
        this.viewRouteUrl = '';
        this.docClickHandler = (event) => {
            this.handleDocClickEvent(event);
        };
        this.modalFocusOutHandler = (event) => {
            this.checkFocusOut(event);
        };
        this.keydownHandler = (event) => {
            this.checkKey(event);
        };
    }
    /**
     * @param {?} modal
     * @return {?}
     */
    set modal(modal) {
        this._modal = modal;
        this.updateModalDialogStyle();
    }
    /**
     * @return {?}
     */
    get modal() {
        return this._modal;
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    set centered(boo) {
        if (typeof boo === 'string') {
            this._center = boo === 'true' ? true : false;
        }
        else {
            this._center = boo;
        }
    }
    /**
     * @param {?} title
     * @return {?}
     */
    set windowTitle(title) {
        this.title = title;
    }
    /**
     * Set [[viewRouteUrl]] property
     * @param {?} viewRouteUrl
     * @return {?}
     */
    setViewRouteUrl(viewRouteUrl) {
        this.viewRouteUrl = viewRouteUrl;
    }
    /**
     * Set draggable directive id and [[id]]
     * @return {?}
     */
    resetId() {
        this.updateDraggableDirectiveId();
        super.resetId();
        this.cd.detectChanges();
    }
    /**
     * 一覧画面をテンプレートを表示している画面で横スクロールがでてしまう事象を回避するためのメソッド
     * 初回リサイズする
     * @return {?}
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
     * @return {?}
     */
    resizeExecute() {
        /** @type {?} */
        const bound = /** @type {?} */ ((/** @type {?} */ (this.modalElement.nativeElement.firstChild.lastElementChild)).getBoundingClientRect());
        /** @type {?} */
        const newX = bound.right - bound.left + 20;
        this.zone.runOutsideAngular(() => {
            this.renderer.setStyle(this.modalElement.nativeElement.firstChild.lastElementChild, 'width', newX + 'px');
        });
        this.cd.detectChanges();
    }
    /**
     * Init lifecycle. Sets [[viewId]]
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.viewId = this.id;
    }
    /**
     * Destroy lifecycle. Cleans up references
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.modalDialog = null;
        this.modalContent = null;
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
            (/** @type {?} */ (this.modalElement.nativeElement)).removeEventListener("focusout", this.modalFocusOutHandler, true);
        }
        if (this.keydownHandler) {
            (/** @type {?} */ (this.modalElement.nativeElement)).removeEventListener("keydown", this.keydownHandler, true);
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
     * @return {?}
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
        }
        else {
            this.modalBodyHeight = parseInt(this.controlHeight) - 25; //modal-header分を削って設定
        }
        // 画面リサイズ対応 End
        this.cd.detectChanges();
        if (this.modal !== "true" && this.modal !== true) {
            this.setModalLessPosition();
            this.bsModalClass.push("modaless");
            this.cd.detectChanges();
        }
        else {
            //disable buttons
            $(".header").addClass("header-disabled");
            $(".footer").addClass("footer-disabled");
        }
        this.setInitialPosition(this.initialPosition);
        this.updateDraggableDirectiveId();
        this.setDisabledDialogWidth();
        // if(this.resizeDialog){ 一時的にコメントアウト
        $(this.modalElement.nativeElement).resizable({
            handles: 'n, e, s, w, ne, se, sw, nw',
            minWidth: 150,
            minHeight: 20,
            resize: (event, ui) => {
                //top場所制限設定
                if (ui.position.top <= 82) {
                    ui.position.top = 82;
                    return;
                }
                ui.element.css("min-height", "");
                ui.element.css("min-width", "");
                $(this.modalDialog.nativeElement).css("height", ui.size.height);
                $(this.modalDialog.nativeElement).css("width", ui.size.width);
                $(this.modalContent.nativeElement).css("height", ui.size.height);
                $(this.modalContent.nativeElement).css("width", ui.size.width);
                $(this.body.nativeElement).css("min-height", "calc(100% - 25px)");
                if (this.tableId != null) {
                    /** @type {?} */
                    const table = /** @type {?} */ (UiDocument.getElementById(this.tableId));
                    if (table != null) {
                        table.tableResize();
                    }
                }
            }
        });
        $(this.modalElement.nativeElement).on("resizestop", () => {
            this.setDisabledDialogWidth();
        });
        // }
        this._tabbables = tabbable(this.body.nativeElement);
        this.zone.runOutsideAngular(() => {
            document.addEventListener("mousedown", this.docClickHandler);
            (/** @type {?} */ (this.modalElement.nativeElement)).addEventListener("focusout", this.modalFocusOutHandler, true);
            (/** @type {?} */ (this.modalElement.nativeElement)).addEventListener("keydown", this.keydownHandler, true);
        });
    }
    /**
     * Set the width of disabled-dialog with the width of the modal-content
     * @return {?}
     */
    setDisabledDialogWidth() {
        /** @type {?} */
        const element = this.modalElement.nativeElement;
        this.renderer.setStyle(element.querySelector('.disabled-dialog'), 'width', element.querySelector('.modal-content').offsetWidth + 'px');
        this.renderer.setStyle(element.querySelector('.disabled-dialog'), 'height', element.querySelector('.modal-content').offsetHeight + 'px');
    }
    /**
     * Sets the [[draggableDirective]] view id to the dialog instance [[id]]
     * @return {?}
     */
    updateDraggableDirectiveId() {
        if (this.draggableDirective != null) {
            this.draggableDirective.setViewId(this.id);
            this.draggableDirective.setTableId(this.tableId);
            this.draggableDirective.screenIndex = this.screenIndex;
        }
    }
    /**
     * Set position of window component
     * @return {?}
     */
    setModalLessPosition() {
        /** @type {?} */
        const bound = /** @type {?} */ ((/** @type {?} */ (this.modalElement.nativeElement.firstChild)).getBoundingClientRect());
        /** @type {?} */
        const left = (bound.x || bound.left) + "px";
        /** @type {?} */
        const top = (Math.max(bound.y || bound.top, 120)) + "px";
        this.renderer.setStyle(this.modalElement.nativeElement, "left", left);
        this.renderer.setStyle(this.modalElement.nativeElement, "top", top);
    }
    /**
     * Get the native HTML element of this dialog
     * @return {?} DOM element
     */
    getElement() {
        return this.elementRef.nativeElement;
    }
    /**
     * Event handler for click on close button. Closes the window
     * @param {?=} event
     * @param {?=} immediate
     * @return {?}
     */
    close(event = null, immediate = false) {
        // this.bsModalClass = ["vt-dialog", "modal", "fade", "out"];
        //this.cd.detectChanges();
        if (event != null) {
            event.stopPropagation();
        }
        if (this.modal === "true" || this.modal === true) {
            $(".header").removeClass("header-disabled");
            $(".footer").removeClass("footer-disabled");
        }
        if (this.getParent() != null && this.getParent().isView() && this.getParent().isDynamicView()) {
            this.dynamicPageService.removeView(/** @type {?} */ (this.getParent()), immediate);
        }
        else {
            if (this.getSession() != null && this.getSession().getRouteNavigatorService() != null) {
                this.getSession().getRouteNavigatorService().destroyRoute(this.viewRouteUrl);
            }
            else {
                console.error("Unable to change route, session or route navigation service is not defined");
            }
        }
    }
    /**
     * Set [[disabled]] property value
     * @param {?} boo Value for disabled property
     * @return {?}
     */
    setDisabled(boo) {
        this.disabled = boo;
        $(this.modalElement.nativeElement).resizable("option", "disabled", boo); //Don't remove this. This makes disabled-dialog not to be resizable.
        $(this.modalElement.nativeElement.querySelector('.modal-content')).disabled = boo; //I am not sure why this is needed.
    }
    /**
     * Sets the dialogs 'z-index' CSS property
     * @param {?} newZIndex
     * @return {?}
     */
    updateZIndex(newZIndex) {
        if (this.modalElement != null && this.renderer != null) {
            this.renderer.setStyle(this.modalElement.nativeElement, "z-index", newZIndex);
        }
        this.setInactiveDialogStyle();
    }
    /**
     * Set inactive window style if this dialog is not the current active dialog
     * @return {?}
     */
    setInactiveDialogStyle() {
        /** @type {?} */
        const inactiveDialogClass = 'inactive-dialog';
        // Apply inactive dialog class when other window is focused
        if (this.getSession().getMcoContainer().activeView() == null ||
            this.getSession().getMcoContainer().activeView().id != this.viewId) {
            this.bsModalClass.push(inactiveDialogClass);
        }
        else {
            this.bsModalClass = _.filter(this.bsModalClass, (c) => {
                return c !== inactiveDialogClass;
            });
        }
        //we used OnPush and change detector only know that it needs to do something if
        //our style array is immutable, so we need to tell it that changes happen.
        this.cd.markForCheck();
    }
    /**
     * Set position of this dialog when it is first opened
     * @param {?} position Window position
     * @return {?}
     */
    setInitialPosition(position) {
        if (position != null) {
            if (position.left >= 0) {
                this.renderer.setStyle(this.modalElement.nativeElement, "left", position.left + "px");
            }
            else {
                this.renderer.setStyle(this.modalElement.nativeElement, "left", "auto");
            }
            if (position.right >= 0) {
                this.renderer.setStyle(this.modalElement.nativeElement, "right", position.right + "px");
            }
            if (position.top >= 0) {
                this.renderer.setStyle(this.modalElement.nativeElement, "top", position.top + "px");
            }
            else {
                this.renderer.setStyle(this.modalElement.nativeElement, "top", "auto");
            }
            if (position.bottom >= 0) {
                this.renderer.setStyle(this.modalElement.nativeElement, "bottom", position.bottom + "px");
            }
            else {
                this.renderer.setStyle(this.modalElement.nativeElement, "bottom", "auto");
            }
        }
        /** @type {?} */
        const appHeader = $(".header")[0];
        /* istanbul ignore if */
        //appHeader can be null (in unit test, etc)
        if (appHeader) {
            /** @type {?} */
            let headerH = appHeader.clientHeight + appHeader.offsetTop;
            // init position
            this.renderer.setStyle(this.modalElement.nativeElement, "top", headerH + "px");
            if ((position != null)) {
                if (!(position.left > 0)) {
                    this.renderer.setStyle(this.modalElement.nativeElement, "left", "0");
                }
            }
            else {
                this.renderer.setStyle(this.modalElement.nativeElement, "left", "0");
            }
            // If 'centered' input is true, override initialPosition and modalLessPosition
            if (this._center) {
                /** @type {?} */
                let modelH = $(this.modalElement.nativeElement).height();
                /** @type {?} */
                let footerH = $(".footer")[0].clientHeight;
                this.renderer.setStyle(this.modalElement.nativeElement, "top", `calc(((100vh - ${headerH}px - ${footerH}px - ${modelH}px) / 2) + ${headerH}px)`);
                this.renderer.setStyle(this.modalElement.nativeElement, "left", "calc((100vw / 2) - " + ($(this.modalElement.nativeElement).width() / 2) + "px");
            }
        }
    }
    /**
     * Event handler for close event
     * \@event OnClosing
     * @return {?}
     */
    handleOnClosing() {
        this.onClosing.emit();
    }
    /**
     * Get the Nexaweb tag name of this component
     * @return {?}
     */
    getNxTagName() {
        return "dialog";
    }
    /**
     * Get JSON representation of dialog state
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        this.setJson(json, "title", this.title);
        this.setJson(json, "modal", this.modal);
        this.setJson(json, "centered", this._center);
        return json;
    }
    /**
     * Check whether or not this dialog is a container
     * @return {?} Boolean
     */
    isContainer() {
        return true;
    }
    /**
     * Check whether or not this is a dialog. Implementation of BaseComponent method
     * @return {?} Boolean
     */
    isDialog() {
        return true;
    }
    /**
     * Get the [[cd]] (ChangeDetectorRef) property
     * @return {?} ChangeDetectorRef
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Event handler for minimize button click. Minimizes dialog
     * @param {?} event
     * @return {?}
     */
    minimize(event) {
        if (event != null) {
            event.stopPropagation();
        }
        if ((JavaUtils.parseBoolean(this.modal))) {
            if (!this.isUnMaximize) {
                /** @type {?} */
                let minHeightLoc = DialogComponent.UNMAXIMIZE_HEGHT;
                this.isUnMaximize = true;
                if (this.isMaximize) {
                    $(this.modalElement.nativeElement).css("top", `${this.modalOriginalTop}px`);
                    $(this.modalElement.nativeElement).css("left", `${this.modalOriginalLeft}px`);
                    this.isMaximize = false;
                }
                $(this.body.nativeElement).css("min-height", "");
                $(this.body.nativeElement).css("height", minHeightLoc);
                $(this.modalElement.nativeElement).css("min-height", "");
                $(this.modalElement.nativeElement).css("height", minHeightLoc);
                $(this.modalElement.nativeElement.querySelector('.modal-content')).css("height", minHeightLoc);
                this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "unmaximize"];
            }
            else {
                this.isUnMaximize = false;
                /** @type {?} */
                let minHeightLoc = $(this.modalElement.nativeElement.querySelector('.modal-dialog')).css("height");
                $(this.body.nativeElement).css("min-height", "calc(100% - 25px");
                $(this.body.nativeElement).css("height", "auto");
                $(this.modalElement.nativeElement).css("min-height", minHeightLoc);
                $(this.modalElement.nativeElement).css("height", minHeightLoc);
                $(this.modalElement.nativeElement.querySelector('.modal-content')).css("height", minHeightLoc);
                this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "unmaximize"];
            }
        }
        else {
            this.isUnMaximize = false;
            this.bsModalClass = ["vt-dialog", "modal", "fade", "out", "minimize"];
            this.getSession().getMcoContainer().minimizeView(this.viewId);
        }
        this.cd.detectChanges();
    }
    /**
     * Event handler for maximize button click. Maximizes dialog
     * @param {?} event
     * @return {?}
     */
    maximize(event) {
        if (event != null) {
            event.stopPropagation();
        }
        if (this.isMaximize) {
            this.bsModalClass = ["vt-dialog", "modal", "fade", "in"];
            $(this.modalElement.nativeElement).css("top", `${this.modalOriginalTop}px`);
            $(this.modalElement.nativeElement).css("left", `${this.modalOriginalLeft}px`);
            this.isMaximize = false;
            if (JavaUtils.parseBoolean(this.modal) && $(this.modalElement.nativeElement.querySelector('.modal-content'))[0].style.height === DialogComponent.UNMAXIMIZE_HEGHT) {
                this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "unmaximize"];
                this.isUnMaximize = true;
            }
            else {
                this.isUnMaximize = false;
            }
            this.cd.detectChanges();
        }
        else {
            $(this.body.nativeElement).css("min-height", "calc(100% - 25px)");
            $(this.modalElement.nativeElement).css("height", "auto");
            this.modalOriginalLeft = (/** @type {?} */ (this.modalElement.nativeElement)).getBoundingClientRect().left;
            this.modalOriginalTop = (/** @type {?} */ (this.modalElement.nativeElement)).getBoundingClientRect().top;
            $(this.modalElement.nativeElement).css("left", `${this.modalOriginalLeft}px`);
            $(this.modalElement.nativeElement).css("top", `${this.modalOriginalTop}px`);
            this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "maximize"];
            this.isMaximize = true;
            this.isUnMaximize = false;
            this.cd.detectChanges();
        }
        // istanbul ignore if */
        if (this.tableId != null) {
            /** @type {?} */
            const table = /** @type {?} */ (UiDocument.getElementById(this.tableId));
            if (table != null) {
                table.tableResize();
            }
        }
        this.getSession().getMcoContainer().showView(this.viewId);
    }
    /**
     * Show the view after it has been hidden via minimized
     * @return {?}
     */
    showView() {
        if (this.disabled)
            return;
        if (this.isMaximize) {
            this.bsModalClass = ["vt-dialog", "modal", "fade", "in", "maximize"];
        }
        else {
            this.bsModalClass = ["vt-dialog", "modal", "fade", "in"];
        }
        this.cd.detectChanges();
        this.getSession().getMcoContainer().showView(this.viewId, this.screenIndex);
    }
    /**
     * Event handler for mousedown event. Resets dialog view stack
     * @return {?}
     */
    handleMouseDown() {
        //make this screen top most.
        this.getSession().getMcoContainer().reStackView(this.viewId, this.screenIndex);
    }
    /**
     * Stop propagation on disabled dialog
     * @param {?} event
     * @return {?}
     */
    onClickDisableContent(event) {
        if (this.disabled)
            event.stopPropagation();
    }
    /**
     * Stop propagation on modal dialog
     * @param {?} event
     * @return {?}
     */
    onClickBackdrop(event) {
        if (this.modal == true || this.modal == 'true')
            event.stopPropagation();
    }
    /**
     * @return {?}
     */
    updateModalDialogStyle() {
        if (this.renderer != null && this.elementRef != null) {
            if (this.modal === true || this.modal === "true") {
                this.renderer.addClass(this.elementRef.nativeElement, "modal");
                this.renderer.setStyle(this.elementRef.nativeElement, "display", "inline-block");
            }
            else {
                this.renderer.removeClass(this.elementRef.nativeElement, "modal");
                this.renderer.removeStyle(this.elementRef.nativeElement, "display");
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    checkFocusOut(event) {
        if ((/** @type {?} */ (this.elementRef.nativeElement)).contains(/** @type {?} */ (event.relatedTarget))) {
            this.getSession()._windowLostFocus = false;
        }
        if (this.getSession()._windowLostFocus !== true &&
            this._tabbables &&
            this._tabbables.length > 0 &&
            this.wasClickOutside !== true &&
            !((/** @type {?} */ (this.elementRef.nativeElement)).contains(/** @type {?} */ (event.relatedTarget)))
            && this.disabled !== true) {
            if (event.relatedTarget == null ||
                (!(/** @type {?} */ (event.relatedTarget)).classList.contains("dropdown-item") &&
                    !(/** @type {?} */ (event.relatedTarget)).classList.contains("menuItem"))) {
                event.stopPropagation();
                this._tabbables[0].focus();
            }
        }
        this.getSession()._windowLostFocus = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleDocClickEvent(event) {
        this.wasClickOutside = false;
        if (!((/** @type {?} */ (this.elementRef.nativeElement)).contains(/** @type {?} */ (event.target)))) {
            this.wasClickOutside = true;
        }
        /** @type {?} */
        let _leftDisabledErroElementId = [];
        //if disabled element
        if (this._canTrackFocusLostOnErrorDisabled === true) {
            if (this._disabledErrorElementId != null &&
                this._disabledErrorElementId.length > 0) {
                for (let elId of this._disabledErrorElementId) {
                    /** @type {?} */
                    const disabledEl = UiDocument.getElementById(elId);
                    /** @type {?} */
                    const inputElement = disabledEl.getElement().querySelector('input');
                    if (disabledEl != null) {
                        if (event.target != inputElement)
                            disabledEl.setBgColor("");
                        else
                            _leftDisabledErroElementId.push(elId);
                    }
                }
            }
            if (_leftDisabledErroElementId.length == 0) {
                this._disabledErrorElementId = null;
                this._canTrackFocusLostOnErrorDisabled = false;
            }
            else {
                this._disabledErrorElementId = _leftDisabledErroElementId;
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    checkKey(event) {
        if (this.disabled === true) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * @return {?}
     */
    trackFocusLostOnErrorDisabled() {
        this._canTrackFocusLostOnErrorDisabled = true;
    }
}
DialogComponent.UNMAXIMIZE_HEGHT = "20px";
DialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-dialog',
                template: "<div #myModal [vtDraggable]=\"draggable\" [modal]=\"modal\" [id]=\"id\" [ngClass]=\"bsModalClass\" tabindex=\"-1\" role=\"dialog\" title=\"\"\n[style.minWidth.px]=\"controlWidth\"\n[style.minHeight.px]=\"controlHeight\"\n>\n<div\n  #modalDialog\n  [style.height.px]=\"controlHeight\"\n  [style.width.px]=\"controlWidth\"\n  class=\"modal-dialog\"\n  [ngClass]=\"cssClass\"\n  role=\"document\">\n  <div class=\"disabled-dialog\" [ngStyle]=\"{'display': disabled ? 'block' : 'none'}\" (click)=\"onClickDisableContent($event)\"></div>\n  <div #modalContent class=\"modal-content\" [style.height.px]=\"controlHeight\">\n    <div class=\"modal-header\" #draggablePanel>\n      <button type=\"button\" *ngIf=\"!isMaximize\" class=\"close\"\n        data-dismiss=\"modal\"\n        aria-label=\"maximize\"\n        (click)=\"maximize($event)\"\n        tabindex=\"-1\">\n        <span aria-hidden=\"true\"><div class=\"icon-maximize\"></div></span>\n      </button>\n      <button type=\"button\" *ngIf=\"isMaximize\" class=\"close\"\n        data-dismiss=\"modal\"\n        aria-label=\"maximize\"\n        (click)=\"maximize($event)\"\n        tabindex=\"-1\">\n        <span aria-hidden=\"true\"><div class=\"icon-unmaximize\"></div></span>\n      </button>\n      <button type=\"button\"  *ngIf=\"isUnMaximize\" class=\"close\"\n        data-dismiss=\"modal\"\n        aria-label=\"unmaximize\"\n        (click)=\"minimize($event)\"\n        tabindex=\"-1\">\n        <span aria-hidden=\"true\"><div class=\"icon-unmaximize\"></div></span>\n      </button>\n      <button type=\"button\" *ngIf=\"!isUnMaximize\" class=\"close\"\n        data-dismiss=\"modal\"\n        aria-label=\"minimize\"\n        (click)=\"minimize($event)\"\n        tabindex=\"-1\">\n        <span aria-hidden=\"true\"><div class=\"icon-minimize\"></div></span>\n      </button>\n      <!-- <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (mousedown)=\"handleOnClosing()\" (click)=\"close($event)\"><span aria-hidden=\"true\">&times;</span></button> -->\n      <h4 class=\"modal-title\" onselectstart=\"return false\" (dblclick)=\"maximize($event)\">{{ title }}</h4>\n    </div>\n    <div #modalBody class=\"modal-body\" [style.height.px]=\"modalBodyHeight\" [style.height]=\"modalBodyPercentHeight\" [style.minHeight]=\"modalBodyMinHeight\">\n      <div [style.width.percent]=\"100\" [style.width]=\"modalBodyDivWidth\" [style.height]=\"modalBodyDivHeight\" #viewContainer (mousedown)=\"handleMouseDown()\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div><!-- /.modal-content -->\n</div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n<div *ngIf= \" modal == true || modal == 'true'\" class=\"backdrop\" (click)=\"onClickBackdrop($event)\">\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".dialog-centered{position:fixed;top:50%;left:50%}@media (min-width:768px){.modal-xl{width:90%;max-width:1200px}}.modal.modaless{position:fixed;right:auto;bottom:auto}.modal.modaless .modal-dialog{margin:0}vt-dialog .modal-header{padding:5px 15px}.vt-dialog.modal{display:inline-block;right:auto;bottom:auto;overflow:visible}.minimize{display:none!important}.maximize{left:0!important;width:100%!important;bottom:34px!important;top:100px!important}.maximize .modal-dialog{width:100%!important;max-width:100%!important;height:100%!important}.maximize .modal-content{width:100%!important;height:100%!important}.maximize .modal-content.ui-resizable{left:0!important}@media (min-width:768px){.modal-dialog{margin:0;display:inline-block}}.modal-content{overflow:hidden}.modal-header .close{padding:3px;margin-left:3px;border:1px ridge;border-radius:4px}.icon-minimize{width:14px;height:10px;background-image:url(minimize.png);background-repeat:no-repeat;background-size:14px}.icon-maximize{width:14px;height:10px;background-image:url(maximize.png);background-repeat:no-repeat;background-size:14px}.icon-unmaximize{width:14px;height:10px;background-image:url(restore.png);background-repeat:no-repeat;background-size:14px}.disabled-dialog{position:absolute;z-index:10;background-color:rgba(0,0,0,.1)}.backdrop{width:100vw;height:100vh;opacity:0;background-color:#000}"]
            }] }
];
/** @nocollapse */
DialogComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: DynamicPagesService },
    { type: NgZone }
];
DialogComponent.propDecorators = {
    body: [{ type: ViewChild, args: ['modalBody',] }],
    modalDialog: [{ type: ViewChild, args: ["modalDialog",] }],
    modalContent: [{ type: ViewChild, args: ["modalContent",] }],
    title: [{ type: Input }],
    draggable: [{ type: Input }],
    initialPosition: [{ type: Input }],
    modal: [{ type: Input }],
    centered: [{ type: Input }],
    windowTitle: [{ type: Input }],
    modalSize: [{ type: Input }],
    resizeable: [{ type: Input }],
    onClosing: [{ type: Output }],
    modalElement: [{ type: ViewChild, args: ['myModal', { read: ElementRef },] }],
    viewContainer: [{ type: ViewChild, args: ['viewContainer', { read: ViewContainerRef },] }],
    draggablePanel: [{ type: ViewChild, args: ['draggablePanel', { read: ViewContainerRef },] }],
    draggableDirective: [{ type: ViewChild, args: [DraggableDirective,] }],
    resizeDialog: [{ type: Input }],
    tableId: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DialogComponent.UNMAXIMIZE_HEGHT;
    /** @type {?} */
    DialogComponent.prototype.body;
    /** @type {?} */
    DialogComponent.prototype.modalDialog;
    /** @type {?} */
    DialogComponent.prototype.modalContent;
    /** @type {?} */
    DialogComponent.prototype.title;
    /** @type {?} */
    DialogComponent.prototype.draggable;
    /** @type {?} */
    DialogComponent.prototype.initialPosition;
    /** @type {?} */
    DialogComponent.prototype._modal;
    /** @type {?} */
    DialogComponent.prototype._center;
    /** @type {?} */
    DialogComponent.prototype.modalSize;
    /** @type {?} */
    DialogComponent.prototype.resizeable;
    /** @type {?} */
    DialogComponent.prototype.onClosing;
    /** @type {?} */
    DialogComponent.prototype.modalElement;
    /** @type {?} */
    DialogComponent.prototype.viewContainer;
    /** @type {?} */
    DialogComponent.prototype.draggablePanel;
    /** @type {?} */
    DialogComponent.prototype.draggableDirective;
    /** @type {?} */
    DialogComponent.prototype.modalWidth;
    /** @type {?} */
    DialogComponent.prototype.modalHeight;
    /** @type {?} */
    DialogComponent.prototype.modalBodyHeight;
    /** @type {?} */
    DialogComponent.prototype.isMaximize;
    /** @type {?} */
    DialogComponent.prototype.isUnMaximize;
    /** @type {?} */
    DialogComponent.prototype.contentWidth;
    /** @type {?} */
    DialogComponent.prototype.contentHeight;
    /** @type {?} */
    DialogComponent.prototype.resizeDialog;
    /** @type {?} */
    DialogComponent.prototype.modalBodyMinHeight;
    /** @type {?} */
    DialogComponent.prototype.modalBodyDivHeight;
    /** @type {?} */
    DialogComponent.prototype.modalBodyDivWidth;
    /** @type {?} */
    DialogComponent.prototype.modalBodyPercentHeight;
    /** @type {?} */
    DialogComponent.prototype.resizeFlg;
    /** @type {?} */
    DialogComponent.prototype.modalOriginalLeft;
    /** @type {?} */
    DialogComponent.prototype.modalOriginalTop;
    /** @type {?} */
    DialogComponent.prototype.bsModalClass;
    /** @type {?} */
    DialogComponent.prototype.viewRouteUrl;
    /** @type {?} */
    DialogComponent.prototype.viewId;
    /** @type {?} */
    DialogComponent.prototype.tableId;
    /** @type {?} */
    DialogComponent.prototype.screenIndex;
    /** @type {?} */
    DialogComponent.prototype._disabledErrorElementId;
    /** @type {?} */
    DialogComponent.prototype._canTrackFocusLostOnErrorDisabled;
    /** @type {?} */
    DialogComponent.prototype._tabbables;
    /** @type {?} */
    DialogComponent.prototype.wasClickOutside;
    /** @type {?} */
    DialogComponent.prototype.docClickHandler;
    /** @type {?} */
    DialogComponent.prototype.modalFocusOutHandler;
    /** @type {?} */
    DialogComponent.prototype.keydownHandler;
    /** @type {?} */
    DialogComponent.prototype.cd;
    /** @type {?} */
    DialogComponent.prototype.dynamicPageService;
    /** @type {?} */
    DialogComponent.prototype.zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvZGlhbG9nL2RpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLFVBQVUsRUFDVixTQUFTLEVBR1QsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixRQUFRLEVBQ1IsUUFBUSxFQUNSLGdCQUFnQixFQUdoQixTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFakQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFHNUIsT0FBTyxLQUFLLGVBQWUsTUFBTSxVQUFVLENBQUM7QUFDNUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUUvQyxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUM7Ozs7QUFtQmpDLE1BQU0sc0JBQXVCLFNBQVEsYUFBYTs7Ozs7Ozs7Ozs7SUFzR2hELFlBQW9DLE1BQXFCLEVBQUUsY0FBOEIsRUFBRSxVQUFzQixFQUFVLEVBQXFCLEVBQUUsUUFBbUIsRUFBVSxrQkFBdUMsRUFBVSxJQUFZO1FBQzFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQURxRSxP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bnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBFbGVtZW50UmVmLFxuICBWaWV3Q2hpbGQsXG4gIEFmdGVyVmlld0luaXQsXG4gIEluamVjdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBTa2lwU2VsZixcbiAgT3B0aW9uYWwsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFRlbXBsYXRlUmVmLFxuICBDb250ZW50Q2hpbGQsXG4gIFJlbmRlcmVyMixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE5nWm9uZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5pdGlhbFBvc2l0aW9uIH0gZnJvbSAnLi4vYmFzZS9pbml0aWFsLXBvc2l0aW9uJztcbmltcG9ydCB7IERyYWdnYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEeW5hbWljUGFnZXNTZXJ2aWNlIH0gZnJvbSAnLi4vdmlldy9keW5hbWljLXBhZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFibGVDb21wb25lbnQgfSBmcm9tICcuLi90YWJsZS90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVWlEb2N1bWVudCB9IGZyb20gJy4uL2Jhc2UvdWktZG9jdW1lbnQnO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbi8vdGhpcyBzdHVwaWQgdGhpbmcgaXMgbmVlZGVkIGIvYyBuZy1wYWNrYWdyIGlzIGNvbXBsYWluZWQgYWJvdXQgbmFtZXNwYWNlXG5pbXBvcnQgKiBhcyB0YWJiYWJsZUZSb2xsdXAgZnJvbSBcInRhYmJhYmxlXCI7XG5pbXBvcnQgeyBKYXZhVXRpbHMgfSBmcm9tICcuLi9qYXZhL2phdmEtdXRpbHMnO1xuXG5jb25zdCB0YWJiYWJsZSA9IHRhYmJhYmxlRlJvbGx1cDtcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuXG4vKlxuICogTW9kYWwgbWFya3VwIHBsYWNlbWVudC5cbiAqIEFsd2F5cyB0cnkgdG8gcGxhY2UgYSBtb2RhbCdzIEhUTUwgY29kZSBpbiBhIHRvcC1sZXZlbCBwb3NpdGlvbiBpbiB5b3VyIGRvY3VtZW50IHRvXG4gKiBhdm9pZCBvdGhlciBjb21wb25lbnRzIGFmZmVjdGluZyB0aGUgbW9kYWwncyBhcHBlYXJhbmNlIGFuZC9vciBmdW5jdGlvbmFsaXR5LlxuKi9cblxuLyoqXG4gKiBDbGFzcyBmb3IgZGlhbG9nIGNvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2dC1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ21vZGFsQm9keScpIGJvZHk6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbERpYWxvZ1wiKSBtb2RhbERpYWxvZzogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcIm1vZGFsQ29udGVudFwiKSBtb2RhbENvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgdGl0bGU6IFN0cmluZztcbiAgQElucHV0KCkgZHJhZ2dhYmxlOiBib29sZWFuID0gdHJ1ZTsgLy9kZWZhdWx0IHRvIHRydWVcbiAgQElucHV0KCkgaW5pdGlhbFBvc2l0aW9uOiBJbml0aWFsUG9zaXRpb247XG5cbiAgLy9tb2RhbCBpcyBkZWZhdWx0IHRvIGZhbHNlLCB3aGVuIHRydWUsIGl0IGlzIGJsb2NraW5nXG4gIEBJbnB1dCgpXG4gIHNldCBtb2RhbChtb2RhbDogc3RyaW5nIHwgYm9vbGVhbikge1xuICAgIHRoaXMuX21vZGFsID0gbW9kYWw7XG5cbiAgICB0aGlzLnVwZGF0ZU1vZGFsRGlhbG9nU3R5bGUoKTtcbiAgfVxuXG4gIGdldCBtb2RhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kYWw7XG4gIH1cblxuICBwcml2YXRlIF9tb2RhbDogc3RyaW5nIHwgYm9vbGVhbiA9IFwiZmFsc2VcIjtcblxuICBASW5wdXQoKSBzZXQgY2VudGVyZWQoYm9vOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBib28gPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9jZW50ZXIgPSBib28gPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY2VudGVyID0gYm9vO1xuICAgIH1cbiAgfVxuXG4gIC8vYWxpYXNcbiAgQElucHV0KCkgc2V0IHdpbmRvd1RpdGxlKHRpdGxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gIH1cblxuICBfY2VudGVyOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIG1vZGFsU2l6ZTogc3RyaW5nID0gJ2xhcmdlJztcblxuICBASW5wdXQoKSByZXNpemVhYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIG9uQ2xvc2luZzogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ215TW9kYWwnLCB7cmVhZDogRWxlbWVudFJlZn0pIG1vZGFsRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgndmlld0NvbnRhaW5lcicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnZHJhZ2dhYmxlUGFuZWwnLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIGRyYWdnYWJsZVBhbmVsOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKERyYWdnYWJsZURpcmVjdGl2ZSkgZHJhZ2dhYmxlRGlyZWN0aXZlOiBEcmFnZ2FibGVEaXJlY3RpdmU7XG5cbiAgbW9kYWxXaWR0aDogbnVtYmVyIHwgc3RyaW5nID0gJzEwMCUnO1xuICBtb2RhbEhlaWdodDogbnVtYmVyIHwgc3RyaW5nID0gJzEwMCUnO1xuICBtb2RhbEJvZHlIZWlnaHQ6IG51bWJlciB8IHN0cmluZyA9ICcxMDAlJztcbiAgaXNNYXhpbWl6ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBpc1VuTWF4aW1pemU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY29udGVudFdpZHRoOiBzdHJpbmc7XG4gIGNvbnRlbnRIZWlnaHQ6IHN0cmluZztcblxuICBzdGF0aWMgcmVhZG9ubHkgVU5NQVhJTUlaRV9IRUdIVDogc3RyaW5nID1cIjIwcHhcIjtcblxuICAvLyDnlLvpnaLjg6rjgrXjgqTjgrrlr77lv5wgU3RhcnRcbiAgQElucHV0KCkgcmVzaXplRGlhbG9nOiBib29sZWFuID0gZmFsc2U7XG4gIG1vZGFsQm9keU1pbkhlaWdodDogc3RyaW5nID0gbnVsbDtcbiAgbW9kYWxCb2R5RGl2SGVpZ2h0OiBzdHJpbmcgPSBudWxsO1xuICBtb2RhbEJvZHlEaXZXaWR0aDogc3RyaW5nID0gbnVsbDtcbiAgbW9kYWxCb2R5UGVyY2VudEhlaWdodDogc3RyaW5nID0gbnVsbDtcbiAgLy8g55S76Z2i44Oq44K144Kk44K65a++5b+cIEVuZFxuICByZXNpemVGbGc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBtb2RhbE9yaWdpbmFsTGVmdDogbnVtYmVyID0gMDtcbiAgbW9kYWxPcmlnaW5hbFRvcDogbnVtYmVyID0gMDtcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBic01vZGFsQ2xhc3MgPSBbXCJ2dC1kaWFsb2dcIiwgXCJtb2RhbFwiLCBcImZhZGVcIiwgXCJpblwiXTtcblxuICBwcml2YXRlIHZpZXdSb3V0ZVVybDogc3RyaW5nID0gJyc7XG5cbiAgcHJpdmF0ZSB2aWV3SWQ6IHN0cmluZztcbiAgQElucHV0KCkgdGFibGVJZDogc3RyaW5nOyAvL+ODquOCteOCpOOCuuaZguOBq+aTjeS9nOOBmeOCi+WvvuixoeOBqOOBquOCi+ODhuODvOODluODq+OCv+OCsOOBrklEXG5cbiAgc2NyZWVuSW5kZXg6IG51bWJlcjtcblxuICAvL3NvcGhpYSAxODAzOiB0cmFjayBkaXNhYmxlZCBlbGVtZW50IHRoYXQgaGFzIGVycm9yIGJhY2tncm91bmRcbiAgX2Rpc2FibGVkRXJyb3JFbGVtZW50SWQ6IEFycmF5PHN0cmluZz47XG4gIF9jYW5UcmFja0ZvY3VzTG9zdE9uRXJyb3JEaXNhYmxlZDogYm9vbGVhbjtcblxuICAvL3RhYiBjeWNsaW5nXG4gIHByaXZhdGUgX3RhYmJhYmxlczogQXJyYXk8SFRNTEVsZW1lbnQ+O1xuICBwcml2YXRlIHdhc0NsaWNrT3V0c2lkZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBkb2NDbGlja0hhbmRsZXI6IChldmVudDogTW91c2VFdmVudCk9PnZvaWQ7XG4gIHByaXZhdGUgbW9kYWxGb2N1c091dEhhbmRsZXI6IChldmVudDogRm9jdXNFdmVudCk9PnZvaWQ7XG4gIHByaXZhdGUga2V5ZG93bkhhbmRsZXI6IChldmVudDogS2V5Ym9hcmRFdmVudCk9PnZvaWQ7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwYXJlbnQgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBzZXNzaW9uU2VydmljZSBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGVsZW1lbnRSZWYgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjZCBbW0NoYW5nZURldGVjdG9yUmVmXV0gdG8gaW5qZWN0XG4gICAqIEBwYXJhbSByZW5kZXJlciBzZWUgW1tCYXNlQ29tcG9uZW50XV1cbiAgICogQHBhcmFtIGR5bmFtaWNQYWdlU2VydmljZSBbW0R5bmFtaWNQYWdlU2VydmljZV1dIGluc3RhbmNlIHRvIGluamVjdFxuICAgKiBAcGFyYW0gem9uZSBBbmd1bGFyIHpvbmVcbiAgICovXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudDogQmFzZUNvbXBvbmVudCwgc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBkeW5hbWljUGFnZVNlcnZpY2U6IER5bmFtaWNQYWdlc1NlcnZpY2UsIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgc3VwZXIocGFyZW50LCBzZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZiwgcmVuZGVyZXIpO1xuXG4gICAgdGhpcy5kb2NDbGlja0hhbmRsZXIgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpPT57XG4gICAgICB0aGlzLmhhbmRsZURvY0NsaWNrRXZlbnQoZXZlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLm1vZGFsRm9jdXNPdXRIYW5kbGVyID0gKGV2ZW50OiBGb2N1c0V2ZW50KT0+e1xuICAgICAgdGhpcy5jaGVja0ZvY3VzT3V0KGV2ZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy5rZXlkb3duSGFuZGxlciA9IChldmVudDogS2V5Ym9hcmRFdmVudCk9PntcbiAgICAgIHRoaXMuY2hlY2tLZXkoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgW1t2aWV3Um91dGVVcmxdXSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0gdmlld1JvdXRlVXJsXG4gICAqL1xuICBzZXRWaWV3Um91dGVVcmwodmlld1JvdXRlVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZpZXdSb3V0ZVVybCA9IHZpZXdSb3V0ZVVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgZHJhZ2dhYmxlIGRpcmVjdGl2ZSBpZCBhbmQgW1tpZF1dXG4gICAqL1xuICByZXNldElkKCkge1xuICAgIHRoaXMudXBkYXRlRHJhZ2dhYmxlRGlyZWN0aXZlSWQoKTtcbiAgICBzdXBlci5yZXNldElkKCk7XG5cbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDkuIDopqfnlLvpnaLjgpLjg4bjg7Pjg5fjg6zjg7zjg4jjgpLooajnpLrjgZfjgabjgYTjgovnlLvpnaLjgafmqKrjgrnjgq/jg63jg7zjg6vjgYzjgafjgabjgZfjgb7jgYbkuovosaHjgpLlm57pgb/jgZnjgovjgZ/jgoHjga7jg6Hjgr3jg4Pjg4lcbiAgICog5Yid5Zue44Oq44K144Kk44K644GZ44KLXG4gICAqL1xuICBkaWFsb2dSZXNpemUoKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAodGhpcy5yZXNpemVGbGcgPT09IGZhbHNlKSB7XG4gICAgICAvL3RoaXMucmVzaXplRXhlY3V0ZSgpO1xuICAgICAgdGhpcy5yZXNpemVGbGcgPSB0cnVlO1xuICAgICAgdGhpcy5zZXREaXNhYmxlZERpYWxvZ1dpZHRoKCk7XG4gICAgfVxuICB9XG5cbiAgICAvKipcbiAgICog5LiA6Kan55S76Z2i44KS44OG44Oz44OX44Os44O844OI44KS6KGo56S644GX44Gm44GE44KL55S76Z2i44Gn5qiq44K544Kv44Ot44O844Or44GM44Gn44Gm44GX44G+44GG5LqL6LGh44KS5Zue6YG/44GZ44KL44Gf44KB44Gu44Oh44K944OD44OJXG4gICAqIOODquOCteOCpOOCuuOCkuihjOOBhlxuICAgKi9cbiAgcmVzaXplRXhlY3V0ZSgpIHtcbiAgICBjb25zdCBib3VuZDogRE9NUmVjdCA9ICh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQubGFzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgYXMgRE9NUmVjdDtcbiAgICBjb25zdCBuZXdYID0gYm91bmQucmlnaHQgLSBib3VuZC5sZWZ0ICsgMjA7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudC5maXJzdENoaWxkLmxhc3RFbGVtZW50Q2hpbGQsICd3aWR0aCcsIG5ld1ggKyAncHgnKTtcbiAgICB9KTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBJbml0IGxpZmVjeWNsZS4gU2V0cyBbW3ZpZXdJZF1dXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgdGhpcy52aWV3SWQgPSB0aGlzLmlkO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIERlc3Ryb3kgbGlmZWN5Y2xlLiBDbGVhbnMgdXAgcmVmZXJlbmNlc1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcblxuICAgIHRoaXMubW9kYWxEaWFsb2cgPSBudWxsO1xuICAgIHRoaXMubW9kYWxDb250ZW50ID0gbnVsbDtcblxuICAgIGlmICh0aGlzLnZpZXdDb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRyYWdnYWJsZVBhbmVsICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlUGFuZWwuY2xlYXIoKTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlUGFuZWwgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRvY0NsaWNrSGFuZGxlciAhPSBudWxsKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuZG9jQ2xpY2tIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tb2RhbEZvY3VzT3V0SGFuZGxlciAhPSBudWxsKSB7XG4gICAgICAodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIHRoaXMubW9kYWxGb2N1c091dEhhbmRsZXIsIHRydWUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmtleWRvd25IYW5kbGVyKSB7XG4gICAgICAodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5rZXlkb3duSGFuZGxlciwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5kb2NDbGlja0hhbmRsZXIgPSBudWxsO1xuICAgIHRoaXMubW9kYWxGb2N1c091dEhhbmRsZXIgPSBudWxsO1xuICAgIHRoaXMua2V5ZG93bkhhbmRsZXIgPSBudWxsO1xuXG4gICAgdGhpcy5kcmFnZ2FibGVEaXJlY3RpdmUgPSBudWxsO1xuICAgIHRoaXMubW9kYWxFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLl90YWJiYWJsZXMgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEFmdGVyIHZpZXcgaW5pdCBsaWZlY3ljbGUuIFNldHMgaW5pdGlhbCBkaWFsb2cgaGVpZ2h0L3dpZHRoIGFuZCBwb3NpdGlvbmluZ1xuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuXG4gICAgLy9hZGQgODBweCBmb3IgZ3JpZCBwYWRkaW5nXG4gICAgdGhpcy5tb2RhbFdpZHRoID0gcGFyc2VJbnQodGhpcy5jb250cm9sV2lkdGgpICsgODA7XG4gICAgdGhpcy5tb2RhbEhlaWdodCA9IHBhcnNlSW50KHRoaXMuY29udHJvbEhlaWdodCkgKyA4MDtcblxuICAgIC8vIOeUu+mdouODquOCteOCpOOCuuWvvuW/nCBTdGFydFxuICAgIGlmICh0aGlzLnJlc2l6ZURpYWxvZykge1xuICAgICAgdGhpcy5tb2RhbEJvZHlQZXJjZW50SGVpZ2h0ID0gXCJjYWxjKDEwMCUgLSAyNXB4KVwiOyAvL21vZGFsLWhlYWRlcuWIhuOCkuWJiuOBo+OBpuioreWumlxuICAgICAgdGhpcy5tb2RhbEJvZHlEaXZIZWlnaHQgPSBcIjEwMCVcIjtcbiAgICAgIHRoaXMubW9kYWxCb2R5RGl2V2lkdGggPSBcIjEwMCVcIjtcbiAgICAgIHRoaXMubW9kYWxCb2R5TWluSGVpZ2h0ID0gXCJhdXRvXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kYWxCb2R5SGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5jb250cm9sSGVpZ2h0KSAtIDI1OyAvL21vZGFsLWhlYWRlcuWIhuOCkuWJiuOBo+OBpuioreWumlxuICAgIH1cbiAgICAvLyDnlLvpnaLjg6rjgrXjgqTjgrrlr77lv5wgRW5kXG5cbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcblxuICAgIGlmICh0aGlzLm1vZGFsICE9PSBcInRydWVcIiAmJiB0aGlzLm1vZGFsICE9PSB0cnVlKSB7XG4gICAgICB0aGlzLnNldE1vZGFsTGVzc1Bvc2l0aW9uKCk7XG4gICAgICB0aGlzLmJzTW9kYWxDbGFzcy5wdXNoKFwibW9kYWxlc3NcIik7XG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9kaXNhYmxlIGJ1dHRvbnNcbiAgICAgICQoXCIuaGVhZGVyXCIpLmFkZENsYXNzKFwiaGVhZGVyLWRpc2FibGVkXCIpO1xuICAgICAgJChcIi5mb290ZXJcIikuYWRkQ2xhc3MoXCJmb290ZXItZGlzYWJsZWRcIik7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRJbml0aWFsUG9zaXRpb24odGhpcy5pbml0aWFsUG9zaXRpb24pO1xuICAgIHRoaXMudXBkYXRlRHJhZ2dhYmxlRGlyZWN0aXZlSWQoKTtcblxuICAgIHRoaXMuc2V0RGlzYWJsZWREaWFsb2dXaWR0aCgpO1xuICAgIC8vIGlmKHRoaXMucmVzaXplRGlhbG9nKXsg5LiA5pmC55qE44Gr44Kz44Oh44Oz44OI44Ki44Km44OIXG4gICAgICAkKHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLnJlc2l6YWJsZSh7XG4gICAgICAgIGhhbmRsZXM6ICduLCBlLCBzLCB3LCBuZSwgc2UsIHN3LCBudycsXG4gICAgICAgIG1pbldpZHRoOiAxNTAsXG4gICAgICAgIG1pbkhlaWdodDogMjAsXG4gICAgICAgIHJlc2l6ZTogKGV2ZW50LCB1aSk9PntcbiAgICAgICAgICAvL3RvcOWgtOaJgOWItumZkOioreWumlxuICAgICAgICAgIGlmICh1aS5wb3NpdGlvbi50b3AgPD0gODIpe1xuICAgICAgICAgICAgdWkucG9zaXRpb24udG9wID0gODI7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHVpLmVsZW1lbnQuY3NzKFwibWluLWhlaWdodFwiLCBcIlwiKTtcbiAgICAgICAgICB1aS5lbGVtZW50LmNzcyhcIm1pbi13aWR0aFwiLCBcIlwiKTtcblxuICAgICAgICAgICQodGhpcy5tb2RhbERpYWxvZy5uYXRpdmVFbGVtZW50KS5jc3MoXCJoZWlnaHRcIiwgdWkuc2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICQodGhpcy5tb2RhbERpYWxvZy5uYXRpdmVFbGVtZW50KS5jc3MoXCJ3aWR0aFwiLCB1aS5zaXplLndpZHRoKTtcblxuICAgICAgICAgICQodGhpcy5tb2RhbENvbnRlbnQubmF0aXZlRWxlbWVudCkuY3NzKFwiaGVpZ2h0XCIsIHVpLnNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAkKHRoaXMubW9kYWxDb250ZW50Lm5hdGl2ZUVsZW1lbnQpLmNzcyhcIndpZHRoXCIsIHVpLnNpemUud2lkdGgpO1xuXG4gICAgICAgICAgJCh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCkuY3NzKFwibWluLWhlaWdodFwiLCBcImNhbGMoMTAwJSAtIDI1cHgpXCIpO1xuXG4gICAgICAgICAgaWYgKHRoaXMudGFibGVJZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCB0YWJsZTogVGFibGVDb21wb25lbnQgPSBVaURvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudGFibGVJZCkgYXMgVGFibGVDb21wb25lbnQ7XG4gICAgICAgICAgICBpZiAodGFibGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICB0YWJsZS50YWJsZVJlc2l6ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAkKHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLm9uKCBcInJlc2l6ZXN0b3BcIiwgKCk9PiB7XG4gICAgICAgIHRoaXMuc2V0RGlzYWJsZWREaWFsb2dXaWR0aCgpO1xuICAgICAgfSk7XG4gICAgLy8gfVxuXG4gICAgdGhpcy5fdGFiYmFibGVzPSB0YWJiYWJsZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCk7XG5cbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PntcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5kb2NDbGlja0hhbmRsZXIpO1xuICAgICAgKHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCB0aGlzLm1vZGFsRm9jdXNPdXRIYW5kbGVyLCB0cnVlKTtcbiAgICAgICh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmtleWRvd25IYW5kbGVyLCB0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXQgdGhlIHdpZHRoIG9mIGRpc2FibGVkLWRpYWxvZyB3aXRoIHRoZSB3aWR0aCBvZiB0aGUgbW9kYWwtY29udGVudFxuICAgKi9cbiAgcHJpdmF0ZSBzZXREaXNhYmxlZERpYWxvZ1dpZHRoKCl7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXNhYmxlZC1kaWFsb2cnKSwnd2lkdGgnLCBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb250ZW50Jykub2Zmc2V0V2lkdGgrJ3B4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXNhYmxlZC1kaWFsb2cnKSwnaGVpZ2h0JywgZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29udGVudCcpLm9mZnNldEhlaWdodCsncHgnKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBbW2RyYWdnYWJsZURpcmVjdGl2ZV1dIHZpZXcgaWQgdG8gdGhlIGRpYWxvZyBpbnN0YW5jZSBbW2lkXV1cbiAgICovXG4gIHByaXZhdGUgdXBkYXRlRHJhZ2dhYmxlRGlyZWN0aXZlSWQoKSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dhYmxlRGlyZWN0aXZlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlRGlyZWN0aXZlLnNldFZpZXdJZCh0aGlzLmlkKTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlRGlyZWN0aXZlLnNldFRhYmxlSWQodGhpcy50YWJsZUlkKTtcbiAgICAgIHRoaXMuZHJhZ2dhYmxlRGlyZWN0aXZlLnNjcmVlbkluZGV4ID0gdGhpcy5zY3JlZW5JbmRleDtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0IHBvc2l0aW9uIG9mIHdpbmRvdyBjb21wb25lbnRcbiAgICovXG4gIHByaXZhdGUgc2V0TW9kYWxMZXNzUG9zaXRpb24oKSB7XG4gICAgY29uc3QgYm91bmQ6IERPTVJlY3QgPSAodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudC5maXJzdENoaWxkIGFzIEhUTUxFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBhcyBET01SZWN0O1xuICAgIGNvbnN0IGxlZnQgPSAoYm91bmQueCB8fCBib3VuZC5sZWZ0KSArIFwicHhcIjtcbiAgICBjb25zdCB0b3AgPSAoTWF0aC5tYXgoYm91bmQueSB8fCBib3VuZC50b3AsIDEyMCkpICsgXCJweFwiO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImxlZnRcIiwgbGVmdCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcInRvcFwiLCB0b3ApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbmF0aXZlIEhUTUwgZWxlbWVudCBvZiB0aGlzIGRpYWxvZ1xuICAgKiBAcmV0dXJucyBET00gZWxlbWVudFxuICAgKi9cbiAgZ2V0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIGNsaWNrIG9uIGNsb3NlIGJ1dHRvbi4gQ2xvc2VzIHRoZSB3aW5kb3dcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSBpbW1lZGlhdGVcbiAgICovXG4gIGNsb3NlKGV2ZW50OiBNb3VzZUV2ZW50ID0gbnVsbCwgaW1tZWRpYXRlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAvLyB0aGlzLmJzTW9kYWxDbGFzcyA9IFtcInZ0LWRpYWxvZ1wiLCBcIm1vZGFsXCIsIFwiZmFkZVwiLCBcIm91dFwiXTtcblxuICAgIC8vdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICBpZiAoZXZlbnQgIT0gbnVsbCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubW9kYWwgPT09IFwidHJ1ZVwiIHx8IHRoaXMubW9kYWwgPT09IHRydWUpIHtcbiAgICAgICQoXCIuaGVhZGVyXCIpLnJlbW92ZUNsYXNzKFwiaGVhZGVyLWRpc2FibGVkXCIpO1xuICAgICAgJChcIi5mb290ZXJcIikucmVtb3ZlQ2xhc3MoXCJmb290ZXItZGlzYWJsZWRcIik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ2V0UGFyZW50KCkgIT0gbnVsbCAmJiB0aGlzLmdldFBhcmVudCgpLmlzVmlldygpICYmIHRoaXMuZ2V0UGFyZW50KCkuaXNEeW5hbWljVmlldygpKSB7XG4gICAgICB0aGlzLmR5bmFtaWNQYWdlU2VydmljZS5yZW1vdmVWaWV3KHRoaXMuZ2V0UGFyZW50KCkgYXMgYW55LCBpbW1lZGlhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5nZXRTZXNzaW9uKCkgIT0gbnVsbCAmJiB0aGlzLmdldFNlc3Npb24oKS5nZXRSb3V0ZU5hdmlnYXRvclNlcnZpY2UoKSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZ2V0U2Vzc2lvbigpLmdldFJvdXRlTmF2aWdhdG9yU2VydmljZSgpLmRlc3Ryb3lSb3V0ZSh0aGlzLnZpZXdSb3V0ZVVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGNoYW5nZSByb3V0ZSwgc2Vzc2lvbiBvciByb3V0ZSBuYXZpZ2F0aW9uIHNlcnZpY2UgaXMgbm90IGRlZmluZWRcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBbW2Rpc2FibGVkXV0gcHJvcGVydHkgdmFsdWVcbiAgICogQHBhcmFtIGJvbyBWYWx1ZSBmb3IgZGlzYWJsZWQgcHJvcGVydHlcbiAgICovXG4gIHNldERpc2FibGVkKGJvbzogYm9vbGVhbil7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGJvbztcbiAgICAkKHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLnJlc2l6YWJsZSggXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBib28gKTsvL0Rvbid0IHJlbW92ZSB0aGlzLiBUaGlzIG1ha2VzIGRpc2FibGVkLWRpYWxvZyBub3QgdG8gYmUgcmVzaXphYmxlLlxuICAgICQodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29udGVudCcpKS5kaXNhYmxlZCA9IGJvbzsvL0kgYW0gbm90IHN1cmUgd2h5IHRoaXMgaXMgbmVlZGVkLlxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRpYWxvZ3MgJ3otaW5kZXgnIENTUyBwcm9wZXJ0eVxuICAgKiBAcGFyYW0gbmV3WkluZGV4XG4gICAqL1xuICB1cGRhdGVaSW5kZXgobmV3WkluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5tb2RhbEVsZW1lbnQgIT0gbnVsbCAmJiB0aGlzLnJlbmRlcmVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJ6LWluZGV4XCIsIG5ld1pJbmRleCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRJbmFjdGl2ZURpYWxvZ1N0eWxlKCk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0IGluYWN0aXZlIHdpbmRvdyBzdHlsZSBpZiB0aGlzIGRpYWxvZyBpcyBub3QgdGhlIGN1cnJlbnQgYWN0aXZlIGRpYWxvZ1xuICAgKi9cbiAgc2V0SW5hY3RpdmVEaWFsb2dTdHlsZSgpIHtcbiAgICBjb25zdCBpbmFjdGl2ZURpYWxvZ0NsYXNzID0gJ2luYWN0aXZlLWRpYWxvZyc7XG5cbiAgICAvLyBBcHBseSBpbmFjdGl2ZSBkaWFsb2cgY2xhc3Mgd2hlbiBvdGhlciB3aW5kb3cgaXMgZm9jdXNlZFxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0U2Vzc2lvbigpLmdldE1jb0NvbnRhaW5lcigpLmFjdGl2ZVZpZXcoKSA9PSBudWxsIHx8XG4gICAgICB0aGlzLmdldFNlc3Npb24oKS5nZXRNY29Db250YWluZXIoKS5hY3RpdmVWaWV3KCkuaWQgIT0gdGhpcy52aWV3SWRcbiAgICApIHtcbiAgICAgIHRoaXMuYnNNb2RhbENsYXNzLnB1c2goaW5hY3RpdmVEaWFsb2dDbGFzcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnNNb2RhbENsYXNzID0gXy5maWx0ZXIodGhpcy5ic01vZGFsQ2xhc3MsIChjKT0+IHtcbiAgICAgICAgcmV0dXJuIGMgIT09IGluYWN0aXZlRGlhbG9nQ2xhc3M7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvL3dlIHVzZWQgT25QdXNoIGFuZCBjaGFuZ2UgZGV0ZWN0b3Igb25seSBrbm93IHRoYXQgaXQgbmVlZHMgdG8gZG8gc29tZXRoaW5nIGlmXG4gICAgLy9vdXIgc3R5bGUgYXJyYXkgaXMgaW1tdXRhYmxlLCBzbyB3ZSBuZWVkIHRvIHRlbGwgaXQgdGhhdCBjaGFuZ2VzIGhhcHBlbi5cbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBwb3NpdGlvbiBvZiB0aGlzIGRpYWxvZyB3aGVuIGl0IGlzIGZpcnN0IG9wZW5lZFxuICAgKiBAcGFyYW0gcG9zaXRpb24gV2luZG93IHBvc2l0aW9uXG4gICAqL1xuICBzZXRJbml0aWFsUG9zaXRpb24ocG9zaXRpb246IEluaXRpYWxQb3NpdGlvbikge1xuICAgIGlmIChwb3NpdGlvbiAhPSBudWxsKSB7XG4gICAgICBpZiAocG9zaXRpb24ubGVmdCA+PSAwKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJsZWZ0XCIsIHBvc2l0aW9uLmxlZnQgKyBcInB4XCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImxlZnRcIiwgXCJhdXRvXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAocG9zaXRpb24ucmlnaHQgPj0gMCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwicmlnaHRcIiwgcG9zaXRpb24ucmlnaHQgKyBcInB4XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAocG9zaXRpb24udG9wID49IDApIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcInRvcFwiLCBwb3NpdGlvbi50b3AgKyBcInB4XCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcInRvcFwiLCBcImF1dG9cIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChwb3NpdGlvbi5ib3R0b20gPj0gMCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiYm90dG9tXCIsIHBvc2l0aW9uLmJvdHRvbSArIFwicHhcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiYm90dG9tXCIsIFwiYXV0b1wiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBoZWFkZXIgaGVpZ2h0IGFuZCBmb290ZXIgaGVpZ2h0XG4gICAgY29uc3QgYXBwSGVhZGVyID0gJChcIi5oZWFkZXJcIilbMF07XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAvL2FwcEhlYWRlciBjYW4gYmUgbnVsbCAoaW4gdW5pdCB0ZXN0LCBldGMpXG4gICAgaWYgKGFwcEhlYWRlcikge1xuICAgICAgbGV0IGhlYWRlckggPSBhcHBIZWFkZXIuY2xpZW50SGVpZ2h0ICsgYXBwSGVhZGVyLm9mZnNldFRvcDtcbiAgICAgIC8vIGluaXQgcG9zaXRpb25cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJ0b3BcIiwgaGVhZGVySCArIFwicHhcIik7XG4gICAgICBpZiAoKHBvc2l0aW9uICE9IG51bGwpKSB7XG4gICAgICAgIGlmICggIShwb3NpdGlvbi5sZWZ0ID4gMCkgICkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJsZWZ0XCIsIFwiMFwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImxlZnRcIiwgXCIwXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiAnY2VudGVyZWQnIGlucHV0IGlzIHRydWUsIG92ZXJyaWRlIGluaXRpYWxQb3NpdGlvbiBhbmQgbW9kYWxMZXNzUG9zaXRpb25cbiAgICAgIGlmICh0aGlzLl9jZW50ZXIpIHtcbiAgICAgICAgbGV0IG1vZGVsSCA9ICQodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudCkuaGVpZ2h0KCk7XG4gICAgICAgIGxldCBmb290ZXJIID0gJChcIi5mb290ZXJcIilbMF0uY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwidG9wXCIsIGBjYWxjKCgoMTAwdmggLSAke2hlYWRlckh9cHggLSAke2Zvb3Rlckh9cHggLSAke21vZGVsSH1weCkgLyAyKSArICR7aGVhZGVySH1weClgKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImxlZnRcIiwgXCJjYWxjKCgxMDB2dyAvIDIpIC0gXCIgKyAoJCh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50KS53aWR0aCgpIC8gMikgKyBcInB4XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBjbG9zZSBldmVudFxuICAgKiBAZXZlbnQgT25DbG9zaW5nXG4gICAqL1xuICBoYW5kbGVPbkNsb3NpbmcoKSB7XG4gICAgdGhpcy5vbkNsb3NpbmcuZW1pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgTmV4YXdlYiB0YWcgbmFtZSBvZiB0aGlzIGNvbXBvbmVudFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldE54VGFnTmFtZSgpIHtcbiAgICByZXR1cm4gXCJkaWFsb2dcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgSlNPTiByZXByZXNlbnRhdGlvbiBvZiBkaWFsb2cgc3RhdGVcbiAgICovXG4gIHRvSnNvbigpOiB7fSB7XG4gICAgY29uc3QganNvbjogYW55ID0gc3VwZXIudG9Kc29uKCk7XG4gICAgdGhpcy5zZXRKc29uKGpzb24sIFwidGl0bGVcIiwgdGhpcy50aXRsZSk7XG4gICAgdGhpcy5zZXRKc29uKGpzb24sIFwibW9kYWxcIiwgdGhpcy5tb2RhbCk7XG4gICAgdGhpcy5zZXRKc29uKGpzb24sIFwiY2VudGVyZWRcIiwgdGhpcy5fY2VudGVyKTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgb3Igbm90IHRoaXMgZGlhbG9nIGlzIGEgY29udGFpbmVyXG4gICAqIEByZXR1cm5zIEJvb2xlYW5cbiAgICovXG4gIHByb3RlY3RlZCBpc0NvbnRhaW5lcigpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIG9yIG5vdCB0aGlzIGlzIGEgZGlhbG9nLiBJbXBsZW1lbnRhdGlvbiBvZiBCYXNlQ29tcG9uZW50IG1ldGhvZFxuICAgKiBAcmV0dXJucyBCb29sZWFuXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNEaWFsb2coKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogR2V0IHRoZSBbW2NkXV0gKENoYW5nZURldGVjdG9yUmVmKSBwcm9wZXJ0eVxuICAgKiBAcmV0dXJucyBDaGFuZ2VEZXRlY3RvclJlZlxuICAgKi9cbiAgZ2V0Q2hhbmdlRGV0ZWN0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2Q7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgbWluaW1pemUgYnV0dG9uIGNsaWNrLiBNaW5pbWl6ZXMgZGlhbG9nXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgbWluaW1pemUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQgIT0gbnVsbCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIGlmKChKYXZhVXRpbHMucGFyc2VCb29sZWFuKHRoaXMubW9kYWwpKSl7XG4gICAgICBpZiAoIXRoaXMuaXNVbk1heGltaXplKXtcbiAgICAgICAgbGV0IG1pbkhlaWdodExvYyA9IERpYWxvZ0NvbXBvbmVudC5VTk1BWElNSVpFX0hFR0hUO1xuICAgICAgICB0aGlzLmlzVW5NYXhpbWl6ZSA9dHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuaXNNYXhpbWl6ZSkge1xuICAgICAgICAgICQodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudCkuY3NzKFwidG9wXCIsIGAke3RoaXMubW9kYWxPcmlnaW5hbFRvcH1weGApO1xuICAgICAgICAgICQodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudCkuY3NzKFwibGVmdFwiLCBgJHt0aGlzLm1vZGFsT3JpZ2luYWxMZWZ0fXB4YCk7XG4gICAgICAgICAgdGhpcy5pc01heGltaXplID1mYWxzZTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgICAgICQodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQpLmNzcyhcIm1pbi1oZWlnaHRcIiwgXCJcIik7XG4gICAgICAgICQodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQpLmNzcyhcImhlaWdodFwiLCBtaW5IZWlnaHRMb2MpO1xuICAgICAgICAkKHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLmNzcyhcIm1pbi1oZWlnaHRcIiwgXCJcIik7XG4gICAgICAgICQodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudCkuY3NzKFwiaGVpZ2h0XCIsIG1pbkhlaWdodExvYyk7XG4gICAgICAgICQodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29udGVudCcpKS5jc3MoXCJoZWlnaHRcIiwgbWluSGVpZ2h0TG9jKTtcbiAgICAgICAgdGhpcy5ic01vZGFsQ2xhc3MgPSBbXCJ2dC1kaWFsb2dcIiwgXCJtb2RhbFwiLCBcImZhZGVcIiwgXCJpblwiLCBcInVubWF4aW1pemVcIl07XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5pc1VuTWF4aW1pemUgPWZhbHNlO1xuICAgICAgICBsZXQgbWluSGVpZ2h0TG9jID0kKHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWRpYWxvZycpKS5jc3MoXCJoZWlnaHRcIik7XG4gICAgICAgICQodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQpLmNzcyhcIm1pbi1oZWlnaHRcIiwgXCJjYWxjKDEwMCUgLSAyNXB4XCIpO1xuICAgICAgICAkKHRoaXMuYm9keS5uYXRpdmVFbGVtZW50KS5jc3MoXCJoZWlnaHRcIiwgXCJhdXRvXCIpO1xuICAgICAgICAkKHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLmNzcyhcIm1pbi1oZWlnaHRcIiwgbWluSGVpZ2h0TG9jKTtcbiAgICAgICAgJCh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50KS5jc3MoXCJoZWlnaHRcIiwgbWluSGVpZ2h0TG9jKTtcbiAgICAgICAgJCh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb250ZW50JykpLmNzcyhcImhlaWdodFwiLCBtaW5IZWlnaHRMb2MpO1xuICAgICAgICB0aGlzLmJzTW9kYWxDbGFzcyA9IFtcInZ0LWRpYWxvZ1wiLCBcIm1vZGFsXCIsIFwiZmFkZVwiLCBcImluXCIsIFwidW5tYXhpbWl6ZVwiXTsgICAgICAgXG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmlzVW5NYXhpbWl6ZSA9ZmFsc2U7XG4gICAgICB0aGlzLmJzTW9kYWxDbGFzcyA9IFtcInZ0LWRpYWxvZ1wiLCBcIm1vZGFsXCIsIFwiZmFkZVwiLCBcIm91dFwiLCBcIm1pbmltaXplXCJdO1xuICAgICAgdGhpcy5nZXRTZXNzaW9uKCkuZ2V0TWNvQ29udGFpbmVyKCkubWluaW1pemVWaWV3KHRoaXMudmlld0lkKTtcbiAgICB9XG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgbWF4aW1pemUgYnV0dG9uIGNsaWNrLiBNYXhpbWl6ZXMgZGlhbG9nXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgbWF4aW1pemUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBcbiAgICBpZiAoZXZlbnQgIT0gbnVsbCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNNYXhpbWl6ZSkge1xuICAgICAgdGhpcy5ic01vZGFsQ2xhc3MgPSBbXCJ2dC1kaWFsb2dcIiwgXCJtb2RhbFwiLCBcImZhZGVcIiwgXCJpblwiXTtcbiAgICAgICQodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudCkuY3NzKFwidG9wXCIsIGAke3RoaXMubW9kYWxPcmlnaW5hbFRvcH1weGApO1xuICAgICAgJCh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50KS5jc3MoXCJsZWZ0XCIsIGAke3RoaXMubW9kYWxPcmlnaW5hbExlZnR9cHhgKTtcbiAgICAgIHRoaXMuaXNNYXhpbWl6ZSA9IGZhbHNlO1xuICAgICAgaWYoSmF2YVV0aWxzLnBhcnNlQm9vbGVhbih0aGlzLm1vZGFsKSAmJiAgJCh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb250ZW50JykpWzBdLnN0eWxlLmhlaWdodCA9PT0gRGlhbG9nQ29tcG9uZW50LlVOTUFYSU1JWkVfSEVHSFQpe1xuICAgICAgICB0aGlzLmJzTW9kYWxDbGFzcyA9IFtcInZ0LWRpYWxvZ1wiLCBcIm1vZGFsXCIsIFwiZmFkZVwiLCBcImluXCIsIFwidW5tYXhpbWl6ZVwiXTtcbiAgICAgICAgdGhpcy5pc1VuTWF4aW1pemUgPXRydWU7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5pc1VuTWF4aW1pemUgPWZhbHNlO1xuICAgICAgfVxuICAgICAgXG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCkuY3NzKFwibWluLWhlaWdodFwiLCBcImNhbGMoMTAwJSAtIDI1cHgpXCIpO1xuICAgICAgJCh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50KS5jc3MoXCJoZWlnaHRcIiwgXCJhdXRvXCIpO1xuICAgICAgdGhpcy5tb2RhbE9yaWdpbmFsTGVmdCA9ICh0aGlzLm1vZGFsRWxlbWVudC5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgdGhpcy5tb2RhbE9yaWdpbmFsVG9wID0gKHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICQodGhpcy5tb2RhbEVsZW1lbnQubmF0aXZlRWxlbWVudCkuY3NzKFwibGVmdFwiLCBgJHt0aGlzLm1vZGFsT3JpZ2luYWxMZWZ0fXB4YCk7XG4gICAgICAkKHRoaXMubW9kYWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLmNzcyhcInRvcFwiLCBgJHt0aGlzLm1vZGFsT3JpZ2luYWxUb3B9cHhgKTtcbiAgICAgIHRoaXMuYnNNb2RhbENsYXNzID0gW1widnQtZGlhbG9nXCIsIFwibW9kYWxcIiwgXCJmYWRlXCIsIFwiaW5cIiwgXCJtYXhpbWl6ZVwiXTtcbiAgICAgIHRoaXMuaXNNYXhpbWl6ZSA9IHRydWU7XG4gICAgICB0aGlzLmlzVW5NYXhpbWl6ZSA9ZmFsc2U7XG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgXG4gICAgLy8gaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMudGFibGVJZCAhPSBudWxsKSB7XG4gICAgICBjb25zdCB0YWJsZTogVGFibGVDb21wb25lbnQgPSBVaURvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudGFibGVJZCkgYXMgVGFibGVDb21wb25lbnQ7XG4gICAgICBpZiAodGFibGUgIT0gbnVsbCkge1xuICAgICAgICB0YWJsZS50YWJsZVJlc2l6ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmdldFNlc3Npb24oKS5nZXRNY29Db250YWluZXIoKS5zaG93Vmlldyh0aGlzLnZpZXdJZCk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2hvdyB0aGUgdmlldyBhZnRlciBpdCBoYXMgYmVlbiBoaWRkZW4gdmlhIG1pbmltaXplZFxuICAgKi9cbiAgc2hvd1ZpZXcoKSB7XG4gICAgaWYodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgIGlmICh0aGlzLmlzTWF4aW1pemUpIHtcbiAgICAgIHRoaXMuYnNNb2RhbENsYXNzID0gW1widnQtZGlhbG9nXCIsIFwibW9kYWxcIiwgXCJmYWRlXCIsIFwiaW5cIiwgXCJtYXhpbWl6ZVwiXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ic01vZGFsQ2xhc3MgPSBbXCJ2dC1kaWFsb2dcIiwgXCJtb2RhbFwiLCBcImZhZGVcIiwgXCJpblwiXTtcbiAgICB9XG5cbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLmdldFNlc3Npb24oKS5nZXRNY29Db250YWluZXIoKS5zaG93Vmlldyh0aGlzLnZpZXdJZCwgdGhpcy5zY3JlZW5JbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3IgbW91c2Vkb3duIGV2ZW50LiBSZXNldHMgZGlhbG9nIHZpZXcgc3RhY2tcbiAgICovXG4gIGhhbmRsZU1vdXNlRG93bigpIHtcbiAgICAvL21ha2UgdGhpcyBzY3JlZW4gdG9wIG1vc3QuXG4gICAgdGhpcy5nZXRTZXNzaW9uKCkuZ2V0TWNvQ29udGFpbmVyKCkucmVTdGFja1ZpZXcodGhpcy52aWV3SWQsIHRoaXMuc2NyZWVuSW5kZXgpO1xuICB9XG4gIC8qKlxuICAgKiBTdG9wIHByb3BhZ2F0aW9uIG9uIGRpc2FibGVkIGRpYWxvZ1xuICAgKi9cbiAgb25DbGlja0Rpc2FibGVDb250ZW50KGV2ZW50KXtcbiAgICBpZih0aGlzLmRpc2FibGVkKSBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuICAvKipcbiAgICogU3RvcCBwcm9wYWdhdGlvbiBvbiBtb2RhbCBkaWFsb2dcbiAgICovXG4gIG9uQ2xpY2tCYWNrZHJvcChldmVudCl7XG4gICAgaWYodGhpcy5tb2RhbCA9PSB0cnVlIHx8IHRoaXMubW9kYWwgPT0gJ3RydWUnKSBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTW9kYWxEaWFsb2dTdHlsZSgpIHtcbiAgICBpZiAodGhpcy5yZW5kZXJlciAhPSBudWxsICYmIHRoaXMuZWxlbWVudFJlZiAhPSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5tb2RhbCA9PT0gdHJ1ZSB8fCB0aGlzLm1vZGFsID09PSBcInRydWVcIikge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBcIm1vZGFsXCIpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBcIm1vZGFsXCIpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBcImRpc3BsYXlcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0ZvY3VzT3V0KGV2ZW50OiBGb2N1c0V2ZW50KSB7XG4gICAgaWYgKCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCBhcyBIVE1MRWxlbWVudCkpIHtcbiAgICAgIHRoaXMuZ2V0U2Vzc2lvbigpLl93aW5kb3dMb3N0Rm9jdXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmdldFNlc3Npb24oKS5fd2luZG93TG9zdEZvY3VzICE9PSB0cnVlICYmXG4gICAgICB0aGlzLl90YWJiYWJsZXMgJiZcbiAgICAgIHRoaXMuX3RhYmJhYmxlcy5sZW5ndGggPiAwICYmXG4gICAgICB0aGlzLndhc0NsaWNrT3V0c2lkZSAhPT0gdHJ1ZSAmJlxuICAgICAgISgodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpKVxuICAgICAgJiYgdGhpcy5kaXNhYmxlZCAhPT0gdHJ1ZVxuICAgICkge1xuXG4gICAgICBpZiAoXG4gICAgICAgIGV2ZW50LnJlbGF0ZWRUYXJnZXQgPT0gbnVsbCB8fFxuICAgICAgICAoXG4gICAgICAgICAgIShldmVudC5yZWxhdGVkVGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoXCJkcm9wZG93bi1pdGVtXCIpICYmXG4gICAgICAgICAgIShldmVudC5yZWxhdGVkVGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoXCJtZW51SXRlbVwiKVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuX3RhYmJhYmxlc1swXS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZ2V0U2Vzc2lvbigpLl93aW5kb3dMb3N0Rm9jdXMgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRG9jQ2xpY2tFdmVudChldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMud2FzQ2xpY2tPdXRzaWRlID0gZmFsc2U7XG5cbiAgICBpZiAoXG4gICAgICAhKCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSlcbiAgICApIHtcbiAgICAgIHRoaXMud2FzQ2xpY2tPdXRzaWRlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZXQgX2xlZnREaXNhYmxlZEVycm9FbGVtZW50SWQgPSBbXTtcbiAgICAvL2lmIGRpc2FibGVkIGVsZW1lbnRcbiAgICBpZiAodGhpcy5fY2FuVHJhY2tGb2N1c0xvc3RPbkVycm9yRGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5fZGlzYWJsZWRFcnJvckVsZW1lbnRJZCAhPSBudWxsICYmXG4gICAgICAgIHRoaXMuX2Rpc2FibGVkRXJyb3JFbGVtZW50SWQubGVuZ3RoID4gMFxuICAgICAgKSB7XG5cbiAgICAgICAgZm9yIChsZXQgZWxJZCBvZiB0aGlzLl9kaXNhYmxlZEVycm9yRWxlbWVudElkKSB7XG4gICAgICAgICAgY29uc3QgZGlzYWJsZWRFbCA9IFVpRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxJZCk7XG4gICAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZGlzYWJsZWRFbC5nZXRFbGVtZW50KCkucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgICAgICAgICBpZiAoZGlzYWJsZWRFbCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQgIT0gaW5wdXRFbGVtZW50KVxuICAgICAgICAgICAgICBkaXNhYmxlZEVsLnNldEJnQ29sb3IoXCJcIik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIF9sZWZ0RGlzYWJsZWRFcnJvRWxlbWVudElkLnB1c2goZWxJZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihfbGVmdERpc2FibGVkRXJyb0VsZW1lbnRJZC5sZW5ndGggPT0gMCl7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkRXJyb3JFbGVtZW50SWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9jYW5UcmFja0ZvY3VzTG9zdE9uRXJyb3JEaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWRFcnJvckVsZW1lbnRJZCA9IF9sZWZ0RGlzYWJsZWRFcnJvRWxlbWVudElkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNoZWNrS2V5KGV2ZW50KXtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCA9PT0gdHJ1ZSl7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgdHJhY2tGb2N1c0xvc3RPbkVycm9yRGlzYWJsZWQoKSB7XG4gICAgdGhpcy5fY2FuVHJhY2tGb2N1c0xvc3RPbkVycm9yRGlzYWJsZWQgPSB0cnVlO1xuICB9XG59XG4iXX0=