/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2, ContentChild, NgZone } from '@angular/core';
import { SessionService } from '../session/session.service';
import * as _ from 'lodash';
/**
 * @record
 */
function Position() { }
/** @type {?} */
Position.prototype.x;
/** @type {?} */
Position.prototype.y;
export class DraggableDirective {
    /**
     * @param {?} renderer
     * @param {?} ngZone
     * @param {?} sessionService
     */
    constructor(renderer, ngZone, sessionService) {
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.sessionService = sessionService;
        this.positionAttrValues = ['absolute', 'fixed', 'relative'];
        this.isView = true;
        /**
         * \@Input
         */
        this.canDrag = true;
        this.canTrackMouseMove = false;
        this.mousePosition = {
            x: 0,
            y: 0
        };
        this.mouseDownHandler = (event) => this.onMouseDownHandler(event);
        this.mouseMoveHandler = _.throttle((event) => this.onMouseMoveHandler(event), 75);
        this.mouseUpHandler = (event) => this.onMouseUpHandler(event);
    }
    /**
     * @return {?}
     */
    addDragListeners() {
        /** @type {?} */
        let dragElement = this.getDragElement();
        if (dragElement) {
            this.ngZone.runOutsideAngular(() => {
                dragElement.addEventListener('mousedown', this.mouseDownHandler, true);
                document.addEventListener('mouseup', this.mouseUpHandler, true);
                dragElement = null;
            });
        }
    }
    /**
     * @return {?}
     */
    removeDragListeners() {
        /** @type {?} */
        let dragElement = this.getDragElement();
        if (dragElement) {
            dragElement.removeEventListener('mousedown', this.mouseDownHandler, true);
            document.removeEventListener('mousemove', this.mouseMoveHandler, true); // 念のため置いておく
            document.removeEventListener('mouseup', this.mouseUpHandler, true);
            dragElement = null;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.addDragListeners();
        if (this.isView) {
            this.parentElement = this.parentPanel.nativeElement;
        }
        else {
            this.parentElement = this.parentPanel.nativeElement.parentElement.parentElement.parentElement; //get div('modal-dialog')
        }
        if (this.canDrag && this.parentElement != null) {
            // const bound = this.getBound((this.parentPanel.nativeElement as HTMLElement).firstChild as HTMLElement);
            // console.error(bound);
            //this.parentPanel.nativeElement.style.position = "absolute";
            //this.applyTranslate(bound.x, bound.y);
        }
        else {
            this.canDrag = false;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeDragListeners();
        delete this.renderer;
        delete this.ngZone;
        delete this.draggablePanel;
        delete this.mouseDownHandler;
        delete this.mouseMoveHandler;
        delete this.mouseUpHandler;
        delete this.parentPanel;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseDownHandler(event) {
        /** @type {?} */
        let dragElement = this.getDragElement();
        if (dragElement) {
            this.ngZone.runOutsideAngular(() => {
                document.addEventListener('mousemove', this.mouseMoveHandler, true);
                dragElement = null;
            });
        }
        this.mousePosition = {
            x: event.pageX,
            y: event.pageY
        };
        if (this.canDrag) {
            if (this.isView) { //for main dialog
                /** @type {?} */
                const bound = this.getBound(this.parentElement);
                this.renderer.setStyle(this.parentElement, "position", "absolute");
                this.renderer.setStyle(this.parentElement, "margin", "0");
                this.applyTranslate(bound.x, bound.y);
                this.moveWindowToTop();
                this.canTrackMouseMove = true;
            }
            else { //for error/info dialog
                /** @type {?} */
                const bound = this.getBound(this.parentElement);
                /** @type {?} */
                const height = this.parentElement.offsetHeight + 'px';
                /** @type {?} */
                const width = this.parentElement.offsetWidth + 'px';
                this.renderer.setStyle(this.parentElement, "position", "absolute");
                this.renderer.setStyle(this.parentElement, "margin", "0");
                this.renderer.setStyle(this.parentElement, 'height', height);
                this.renderer.setStyle(this.parentElement, 'width', width);
                this.applyTranslate(bound.x, bound.y);
                this.canTrackMouseMove = true;
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseMoveHandler(event) {
        if (this.canDrag && this.canTrackMouseMove) {
            /** @type {?} */
            const currentMousePosition = {
                x: event.pageX,
                y: event.pageY
            };
            /** @type {?} */
            const diffX = currentMousePosition.x - this.mousePosition.x;
            /** @type {?} */
            const diffY = currentMousePosition.y - this.mousePosition.y;
            /** @type {?} */
            const parentBound = this.getBound(this.parentElement);
            /** @type {?} */
            const newX = parentBound.x + diffX;
            /** @type {?} */
            const newY = parentBound.y + diffY;
            this.applyTranslate(newX, newY);
            this.mousePosition = currentMousePosition;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseUpHandler(event) {
        /** @type {?} */
        let dragElement = this.getDragElement();
        if (dragElement) {
            document.removeEventListener('mousemove', this.mouseMoveHandler, true);
            dragElement = null;
        }
        if (this.canDrag && this.canTrackMouseMove) {
            this.canTrackMouseMove = false;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        if (this.canDrag) {
            if (this.isView)
                this.moveWindowToTop();
        }
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    applyTranslate(x, y) {
        if (y > 0) {
            this.ngZone.runOutsideAngular(() => {
                /** @type {?} */
                let top = 0;
                /** @type {?} */
                let topMax = 82;
                if (this.isView) {
                    top = Math.max(y, topMax);
                }
                else {
                    top = Math.max(y, 0);
                }
                if (this.sessionService.dialogMaxTopPosition > 0 && top > this.sessionService.dialogMaxTopPosition) {
                    top = this.sessionService.dialogMaxTopPosition;
                }
                //#1587: in the as-is, there is no limit to where you can drag the window to the left/right
                //left = Math.max(x, 0);
                this.renderer.setStyle(this.parentElement, 'top', top + 'px');
                this.renderer.setStyle(this.parentElement, 'left', x + 'px');
            });
        }
    }
    /**
     * @return {?}
     */
    moveWindowToTop() {
        this.sessionService.getMcoContainer().reStackView(this.viewId, this.screenIndex);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setViewId(id) {
        if (id != null) {
            this.viewId = id;
        }
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setTableId(id) {
        if (id != null) {
            this.tableId = id;
        }
    }
    /**
     * @return {?}
     */
    getDragElement() {
        if (this.vtDraggable === true && this.draggablePanel) {
            return this.draggablePanel.nativeElement;
        }
        return null;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getBound(el) {
        /** @type {?} */
        const bound = /** @type {?} */ (el.getBoundingClientRect());
        return {
            x: bound.x || bound.left,
            y: bound.y || bound.top
        };
    }
}
DraggableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vtDraggable]',
                host: {
                    // '(dragstart)': 'onDragStart($event)',
                    // '(dragend)': 'onDragEnd($event)',
                    // '(drag)': 'onDrag($event)',
                    '(click)': 'onClick($event)'
                }
            },] }
];
/** @nocollapse */
DraggableDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: NgZone },
    { type: SessionService }
];
DraggableDirective.propDecorators = {
    vtDraggable: [{ type: Input }],
    modal: [{ type: Input, args: ["modal",] }],
    isView: [{ type: Input }],
    title: [{ type: Input }],
    canDrag: [{ type: Input }],
    draggablePanel: [{ type: ContentChild, args: ['draggablePanel', { read: ElementRef },] }],
    parentPanel: [{ type: ContentChild, args: ['myModal', { read: ElementRef },] }]
};
if (false) {
    /** @type {?} */
    DraggableDirective.prototype.positionAttrValues;
    /** @type {?} */
    DraggableDirective.prototype.vtDraggable;
    /** @type {?} */
    DraggableDirective.prototype.modal;
    /** @type {?} */
    DraggableDirective.prototype.isView;
    /** @type {?} */
    DraggableDirective.prototype.viewId;
    /** @type {?} */
    DraggableDirective.prototype.tableId;
    /** @type {?} */
    DraggableDirective.prototype.parentElement;
    /** @type {?} */
    DraggableDirective.prototype.title;
    /** @type {?} */
    DraggableDirective.prototype.screenIndex;
    /**
     * \@Input
     * @type {?}
     */
    DraggableDirective.prototype.canDrag;
    /** @type {?} */
    DraggableDirective.prototype.draggablePanel;
    /** @type {?} */
    DraggableDirective.prototype.parentPanel;
    /** @type {?} */
    DraggableDirective.prototype.mouseDownHandler;
    /** @type {?} */
    DraggableDirective.prototype.mouseMoveHandler;
    /** @type {?} */
    DraggableDirective.prototype.mouseUpHandler;
    /** @type {?} */
    DraggableDirective.prototype.canTrackMouseMove;
    /** @type {?} */
    DraggableDirective.prototype.mousePosition;
    /** @type {?} */
    DraggableDirective.prototype.renderer;
    /** @type {?} */
    DraggableDirective.prototype.ngZone;
    /** @type {?} */
    DraggableDirective.prototype.sessionService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvZGlhbG9nL2RyYWdnYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQWtDLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzVELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7QUFnQjVCLE1BQU07Ozs7OztJQTZCSixZQUNTLFVBQ0EsUUFDQztRQUZELGFBQVEsR0FBUixRQUFRO1FBQ1IsV0FBTSxHQUFOLE1BQU07UUFDTCxtQkFBYyxHQUFkLGNBQWM7a0NBL0JtQixDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDO3NCQUdqRCxJQUFJOzs7O3VCQVdhLElBQUk7aUNBUVgsS0FBSzs2QkFDUjtZQUNoQyxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1NBQ0w7UUFNRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNqRTs7OztJQUVN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LFVBQVUsRUFBRTswQkFDbkQsWUFBWSxTQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBSZW5kZXJlcjIsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgSG9zdCwgQ29udGVudENoaWxkLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFibGVDb21wb25lbnQgfSBmcm9tICcuLi90YWJsZS90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVWlEb2N1bWVudCB9IGZyb20gJy4uL2Jhc2UvdWktZG9jdW1lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbnRlcmZhY2UgUG9zaXRpb24ge1xuICB4OiBudW1iZXIsXG4gIHk6IG51bWJlclxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdnREcmFnZ2FibGVdJyxcbiAgaG9zdDoge1xuICAgIC8vICcoZHJhZ3N0YXJ0KSc6ICdvbkRyYWdTdGFydCgkZXZlbnQpJyxcbiAgICAvLyAnKGRyYWdlbmQpJzogJ29uRHJhZ0VuZCgkZXZlbnQpJyxcbiAgICAvLyAnKGRyYWcpJzogJ29uRHJhZygkZXZlbnQpJyxcbiAgICAnKGNsaWNrKSc6ICdvbkNsaWNrKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcHVibGljIHBvc2l0aW9uQXR0clZhbHVlczogQXJyYXk8c3RyaW5nPiA9IFsnYWJzb2x1dGUnLCAnZml4ZWQnLCAncmVsYXRpdmUnXTtcbiAgQElucHV0KCkgdnREcmFnZ2FibGU6IGJvb2xlYW47XG4gIEBJbnB1dChcIm1vZGFsXCIpIG1vZGFsOiBib29sZWFuO1xuICBASW5wdXQoKSBpc1ZpZXc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHByaXZhdGUgdmlld0lkOiBzdHJpbmc7XG4gIHByaXZhdGUgdGFibGVJZDogc3RyaW5nOyAvL+ODquOCteOCpOOCuuaZguOBq+aTjeS9nOOBmeOCi+ODhuODvOODluODq+OCv+OCsOOBrklEXG5cbiAgcHJpdmF0ZSBwYXJlbnRFbGVtZW50OmFueTtcblxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuXG4gIHNjcmVlbkluZGV4OiBudW1iZXI7XG5cbiAgICAvKiogQElucHV0ICovIEBJbnB1dCgpIGNhbkRyYWc6IGJvb2xlYW4gPSB0cnVlOyAvL3RoaXMgaXMgZHVtbiBidXQgd29yayBhcm91bmQgZm9yIG5vdyAoZm9yIG1haW4gbWRpIHdpbmRvdyB3aGVyZSB3ZSBkb24ndCB3YW50IHRvIGRyYWcpXG4gIEBDb250ZW50Q2hpbGQoJ2RyYWdnYWJsZVBhbmVsJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIGRyYWdnYWJsZVBhbmVsOiBFbGVtZW50UmVmO1xuICBAQ29udGVudENoaWxkKCdteU1vZGFsJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIHBhcmVudFBhbmVsOiBFbGVtZW50UmVmO1xuXG4gIG1vdXNlRG93bkhhbmRsZXI6IChldmVudCkgPT4gdm9pZDtcbiAgbW91c2VNb3ZlSGFuZGxlcjogKGV2ZW50KSA9PiB2b2lkO1xuICBtb3VzZVVwSGFuZGxlcjogKGV2ZW50KSA9PiB2b2lkO1xuXG4gIHByaXZhdGUgY2FuVHJhY2tNb3VzZU1vdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBtb3VzZVBvc2l0aW9uOiBQb3NpdGlvbiA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwdWJsaWMgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UpIHtcbiAgICAgIHRoaXMubW91c2VEb3duSGFuZGxlciA9IChldmVudCkgPT4gdGhpcy5vbk1vdXNlRG93bkhhbmRsZXIoZXZlbnQpO1xuICAgICAgdGhpcy5tb3VzZU1vdmVIYW5kbGVyID0gXy50aHJvdHRsZSgoZXZlbnQpID0+IHRoaXMub25Nb3VzZU1vdmVIYW5kbGVyKGV2ZW50KSw3NSk7XG4gICAgICB0aGlzLm1vdXNlVXBIYW5kbGVyID0gKGV2ZW50KSA9PiB0aGlzLm9uTW91c2VVcEhhbmRsZXIoZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIGFkZERyYWdMaXN0ZW5lcnMoKSB7XG4gICAgbGV0IGRyYWdFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuZ2V0RHJhZ0VsZW1lbnQoKTtcblxuICAgIGlmIChkcmFnRWxlbWVudCkge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgIGRyYWdFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRydWUpO1xuICAgICAgICAgIGRyYWdFbGVtZW50ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVEcmFnTGlzdGVuZXJzKCkge1xuICAgIGxldCBkcmFnRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmdldERyYWdFbGVtZW50KCk7XG5cbiAgICBpZiAoZHJhZ0VsZW1lbnQpIHtcbiAgICAgICAgZHJhZ0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25IYW5kbGVyLCB0cnVlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0cnVlKTsgLy8g5b+144Gu44Gf44KB572u44GE44Gm44GK44GPXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0cnVlKTtcbiAgICAgICAgZHJhZ0VsZW1lbnQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hZGREcmFnTGlzdGVuZXJzKCk7XG4gICAgaWYodGhpcy5pc1ZpZXcpe1xuICAgICAgdGhpcy5wYXJlbnRFbGVtZW50ID0gdGhpcy5wYXJlbnRQYW5lbC5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgdGhpcy5wYXJlbnRFbGVtZW50ID0gdGhpcy5wYXJlbnRQYW5lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Oy8vZ2V0IGRpdignbW9kYWwtZGlhbG9nJylcbiAgICB9XG4gICAgaWYgKHRoaXMuY2FuRHJhZyAmJiB0aGlzLnBhcmVudEVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgLy8gY29uc3QgYm91bmQgPSB0aGlzLmdldEJvdW5kKCh0aGlzLnBhcmVudFBhbmVsLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgLy8gY29uc29sZS5lcnJvcihib3VuZCk7XG4gICAgICAvL3RoaXMucGFyZW50UGFuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgIC8vdGhpcy5hcHBseVRyYW5zbGF0ZShib3VuZC54LCBib3VuZC55KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYW5EcmFnID0gZmFsc2U7XG4gICAgfVxuXG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVEcmFnTGlzdGVuZXJzKCk7XG5cbiAgICBkZWxldGUgdGhpcy5yZW5kZXJlcjtcbiAgICBkZWxldGUgdGhpcy5uZ1pvbmU7XG4gICAgZGVsZXRlIHRoaXMuZHJhZ2dhYmxlUGFuZWw7XG4gICAgZGVsZXRlIHRoaXMubW91c2VEb3duSGFuZGxlcjtcbiAgICBkZWxldGUgdGhpcy5tb3VzZU1vdmVIYW5kbGVyO1xuICAgIGRlbGV0ZSB0aGlzLm1vdXNlVXBIYW5kbGVyO1xuICAgIGRlbGV0ZSB0aGlzLnBhcmVudFBhbmVsO1xuICB9XG5cbiAgb25Nb3VzZURvd25IYW5kbGVyKGV2ZW50OiBhbnkpIHtcbiAgICBsZXQgZHJhZ0VsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5nZXREcmFnRWxlbWVudCgpO1xuXG4gICAgaWYgKGRyYWdFbGVtZW50KSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0cnVlKTtcbiAgICAgICAgICBkcmFnRWxlbWVudCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5tb3VzZVBvc2l0aW9uID0ge1xuICAgICAgeDogZXZlbnQucGFnZVgsXG4gICAgICB5OiBldmVudC5wYWdlWVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5jYW5EcmFnKSB7XG4gICAgICBpZih0aGlzLmlzVmlldyl7Ly9mb3IgbWFpbiBkaWFsb2dcbiAgICAgICAgY29uc3QgYm91bmQgPSB0aGlzLmdldEJvdW5kKHRoaXMucGFyZW50RWxlbWVudCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJlbnRFbGVtZW50LCBcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJlbnRFbGVtZW50LCBcIm1hcmdpblwiLCBcIjBcIik7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGUoYm91bmQueCwgYm91bmQueSk7XG4gICAgICAgIHRoaXMubW92ZVdpbmRvd1RvVG9wKCk7XG4gICAgICAgIHRoaXMuY2FuVHJhY2tNb3VzZU1vdmUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZXsvL2ZvciBlcnJvci9pbmZvIGRpYWxvZ1xuICAgICAgICBjb25zdCBib3VuZCA9IHRoaXMuZ2V0Qm91bmQodGhpcy5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodCArICdweCc7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoICsgJ3B4JztcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmVudEVsZW1lbnQsIFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmVudEVsZW1lbnQsIFwibWFyZ2luXCIsIFwiMFwiKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmVudEVsZW1lbnQsJ2hlaWdodCcsIGhlaWdodCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJlbnRFbGVtZW50LCd3aWR0aCcsIHdpZHRoKTtcbiAgICAgICAgdGhpcy5hcHBseVRyYW5zbGF0ZShib3VuZC54LCBib3VuZC55KTtcbiAgICAgICAgdGhpcy5jYW5UcmFja01vdXNlTW92ZSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZU1vdmVIYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY2FuRHJhZyAmJiB0aGlzLmNhblRyYWNrTW91c2VNb3ZlKSB7XG4gICAgICBjb25zdCBjdXJyZW50TW91c2VQb3NpdGlvbjogUG9zaXRpb24gPSB7XG4gICAgICAgIHg6IGV2ZW50LnBhZ2VYLFxuICAgICAgICB5OiBldmVudC5wYWdlWVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaWZmWCA9IGN1cnJlbnRNb3VzZVBvc2l0aW9uLnggLSB0aGlzLm1vdXNlUG9zaXRpb24ueDtcbiAgICAgIGNvbnN0IGRpZmZZID0gY3VycmVudE1vdXNlUG9zaXRpb24ueSAtIHRoaXMubW91c2VQb3NpdGlvbi55O1xuXG4gICAgICBjb25zdCBwYXJlbnRCb3VuZCA9IHRoaXMuZ2V0Qm91bmQodGhpcy5wYXJlbnRFbGVtZW50KTtcblxuICAgICAgY29uc3QgbmV3WCA9IHBhcmVudEJvdW5kLnggKyBkaWZmWDtcbiAgICAgIGNvbnN0IG5ld1kgPSBwYXJlbnRCb3VuZC55ICsgZGlmZlk7XG4gICAgICB0aGlzLmFwcGx5VHJhbnNsYXRlKG5ld1gsIG5ld1kpO1xuICAgICAgdGhpcy5tb3VzZVBvc2l0aW9uID0gY3VycmVudE1vdXNlUG9zaXRpb247XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZVVwSGFuZGxlcihldmVudDogYW55KSB7XG4gICAgbGV0IGRyYWdFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuZ2V0RHJhZ0VsZW1lbnQoKTtcblxuICAgIGlmIChkcmFnRWxlbWVudCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRydWUpO1xuICAgICAgICBkcmFnRWxlbWVudCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2FuRHJhZyAmJiB0aGlzLmNhblRyYWNrTW91c2VNb3ZlKSB7XG4gICAgICB0aGlzLmNhblRyYWNrTW91c2VNb3ZlID0gZmFsc2U7XG4gICAgfVxuXG4gIH1cblxuICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY2FuRHJhZykge1xuICAgICAgaWYodGhpcy5pc1ZpZXcpIHRoaXMubW92ZVdpbmRvd1RvVG9wKCk7XG4gICAgfVxuICB9XG5cbiAgYXBwbHlUcmFuc2xhdGUoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICBpZiAoeSA+IDApIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgbGV0IHRvcDogbnVtYmVyID0gMDtcbiAgICAgICAgLy8gbGV0IGxlZnQ6IG51bWJlciA9IDA7XG5cbiAgICAgICAgLy8gVGhpcyBpcyBoZWlnaHQgb2YgYXBwIGhlYWRlclxuICAgICAgICBsZXQgdG9wTWF4ID0gODI7XG5cbiAgICAgICAgaWYodGhpcy5pc1ZpZXcpIHtcbiAgICAgICAgICB0b3AgPSBNYXRoLm1heCh5LCB0b3BNYXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvcCA9IE1hdGgubWF4KHksIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2Vzc2lvblNlcnZpY2UuZGlhbG9nTWF4VG9wUG9zaXRpb24gPiAwICYmIHRvcCA+IHRoaXMuc2Vzc2lvblNlcnZpY2UuZGlhbG9nTWF4VG9wUG9zaXRpb24pIHtcbiAgICAgICAgICB0b3AgPSB0aGlzLnNlc3Npb25TZXJ2aWNlLmRpYWxvZ01heFRvcFBvc2l0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8jMTU4NzogaW4gdGhlIGFzLWlzLCB0aGVyZSBpcyBubyBsaW1pdCB0byB3aGVyZSB5b3UgY2FuIGRyYWcgdGhlIHdpbmRvdyB0byB0aGUgbGVmdC9yaWdodFxuICAgICAgICAvL2xlZnQgPSBNYXRoLm1heCh4LCAwKTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMucGFyZW50RWxlbWVudCwgJ3RvcCcsIHRvcCArICdweCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMucGFyZW50RWxlbWVudCwgJ2xlZnQnLCB4ICsgJ3B4Jyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBtb3ZlV2luZG93VG9Ub3AoKSB7XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5nZXRNY29Db250YWluZXIoKS5yZVN0YWNrVmlldyh0aGlzLnZpZXdJZCwgdGhpcy5zY3JlZW5JbmRleCk7XG4gIH1cblxuICBzZXRWaWV3SWQoaWQ6IHN0cmluZykge1xuICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnZpZXdJZCA9IGlkO1xuICAgIH1cbiAgfVxuXG4gIHNldFRhYmxlSWQoaWQ6IHN0cmluZykge1xuICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnRhYmxlSWQgPSBpZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldERyYWdFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAodGhpcy52dERyYWdnYWJsZSA9PT0gdHJ1ZSAmJiB0aGlzLmRyYWdnYWJsZVBhbmVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5kcmFnZ2FibGVQYW5lbC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRCb3VuZChlbDogSFRNTEVsZW1lbnQpOiBQb3NpdGlvbiB7XG4gICAgY29uc3QgYm91bmQgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBhcyBET01SZWN0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGJvdW5kLnggfHwgYm91bmQubGVmdCxcbiAgICAgIHk6IGJvdW5kLnkgfHwgYm91bmQudG9wXG4gICAgfVxuICB9XG59XG4iXX0=