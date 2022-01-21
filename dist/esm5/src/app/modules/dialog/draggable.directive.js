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
var DraggableDirective = /** @class */ (function () {
    function DraggableDirective(renderer, ngZone, sessionService) {
        var _this = this;
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
        this.mouseDownHandler = function (event) { return _this.onMouseDownHandler(event); };
        this.mouseMoveHandler = _.throttle(function (event) { return _this.onMouseMoveHandler(event); }, 75);
        this.mouseUpHandler = function (event) { return _this.onMouseUpHandler(event); };
    }
    /**
     * @return {?}
     */
    DraggableDirective.prototype.addDragListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var dragElement = this.getDragElement();
        if (dragElement) {
            this.ngZone.runOutsideAngular(function () {
                dragElement.addEventListener('mousedown', _this.mouseDownHandler, true);
                document.addEventListener('mouseup', _this.mouseUpHandler, true);
                dragElement = null;
            });
        }
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.removeDragListeners = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var dragElement = this.getDragElement();
        if (dragElement) {
            dragElement.removeEventListener('mousedown', this.mouseDownHandler, true);
            document.removeEventListener('mousemove', this.mouseMoveHandler, true); // 念のため置いておく
            document.removeEventListener('mouseup', this.mouseUpHandler, true);
            dragElement = null;
        }
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeDragListeners();
        delete this.renderer;
        delete this.ngZone;
        delete this.draggablePanel;
        delete this.mouseDownHandler;
        delete this.mouseMoveHandler;
        delete this.mouseUpHandler;
        delete this.parentPanel;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDirective.prototype.onMouseDownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var dragElement = this.getDragElement();
        if (dragElement) {
            this.ngZone.runOutsideAngular(function () {
                document.addEventListener('mousemove', _this.mouseMoveHandler, true);
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
                var bound = this.getBound(this.parentElement);
                this.renderer.setStyle(this.parentElement, "position", "absolute");
                this.renderer.setStyle(this.parentElement, "margin", "0");
                this.applyTranslate(bound.x, bound.y);
                this.moveWindowToTop();
                this.canTrackMouseMove = true;
            }
            else { //for error/info dialog
                /** @type {?} */
                var bound = this.getBound(this.parentElement);
                /** @type {?} */
                var height = this.parentElement.offsetHeight + 'px';
                /** @type {?} */
                var width = this.parentElement.offsetWidth + 'px';
                this.renderer.setStyle(this.parentElement, "position", "absolute");
                this.renderer.setStyle(this.parentElement, "margin", "0");
                this.renderer.setStyle(this.parentElement, 'height', height);
                this.renderer.setStyle(this.parentElement, 'width', width);
                this.applyTranslate(bound.x, bound.y);
                this.canTrackMouseMove = true;
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDirective.prototype.onMouseMoveHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.canDrag && this.canTrackMouseMove) {
            /** @type {?} */
            var currentMousePosition = {
                x: event.pageX,
                y: event.pageY
            };
            /** @type {?} */
            var diffX = currentMousePosition.x - this.mousePosition.x;
            /** @type {?} */
            var diffY = currentMousePosition.y - this.mousePosition.y;
            /** @type {?} */
            var parentBound = this.getBound(this.parentElement);
            /** @type {?} */
            var newX = parentBound.x + diffX;
            /** @type {?} */
            var newY = parentBound.y + diffY;
            this.applyTranslate(newX, newY);
            this.mousePosition = currentMousePosition;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDirective.prototype.onMouseUpHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var dragElement = this.getDragElement();
        if (dragElement) {
            document.removeEventListener('mousemove', this.mouseMoveHandler, true);
            dragElement = null;
        }
        if (this.canDrag && this.canTrackMouseMove) {
            this.canTrackMouseMove = false;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DraggableDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.canDrag) {
            if (this.isView)
                this.moveWindowToTop();
        }
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    DraggableDirective.prototype.applyTranslate = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        var _this = this;
        if (y > 0) {
            this.ngZone.runOutsideAngular(function () {
                /** @type {?} */
                var top = 0;
                /** @type {?} */
                var topMax = 82;
                if (_this.isView) {
                    top = Math.max(y, topMax);
                }
                else {
                    top = Math.max(y, 0);
                }
                if (_this.sessionService.dialogMaxTopPosition > 0 && top > _this.sessionService.dialogMaxTopPosition) {
                    top = _this.sessionService.dialogMaxTopPosition;
                }
                //#1587: in the as-is, there is no limit to where you can drag the window to the left/right
                //left = Math.max(x, 0);
                //#1587: in the as-is, there is no limit to where you can drag the window to the left/right
                //left = Math.max(x, 0);
                _this.renderer.setStyle(_this.parentElement, 'top', top + 'px');
                _this.renderer.setStyle(_this.parentElement, 'left', x + 'px');
            });
        }
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.moveWindowToTop = /**
     * @return {?}
     */
    function () {
        this.sessionService.getMcoContainer().reStackView(this.viewId, this.screenIndex);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DraggableDirective.prototype.setViewId = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (id != null) {
            this.viewId = id;
        }
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DraggableDirective.prototype.setTableId = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (id != null) {
            this.tableId = id;
        }
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.getDragElement = /**
     * @return {?}
     */
    function () {
        if (this.vtDraggable === true && this.draggablePanel) {
            return this.draggablePanel.nativeElement;
        }
        return null;
    };
    /**
     * @param {?} el
     * @return {?}
     */
    DraggableDirective.prototype.getBound = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        /** @type {?} */
        var bound = /** @type {?} */ (el.getBoundingClientRect());
        return {
            x: bound.x || bound.left,
            y: bound.y || bound.top
        };
    };
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
    DraggableDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: NgZone },
        { type: SessionService }
    ]; };
    DraggableDirective.propDecorators = {
        vtDraggable: [{ type: Input }],
        modal: [{ type: Input, args: ["modal",] }],
        isView: [{ type: Input }],
        title: [{ type: Input }],
        canDrag: [{ type: Input }],
        draggablePanel: [{ type: ContentChild, args: ['draggablePanel', { read: ElementRef },] }],
        parentPanel: [{ type: ContentChild, args: ['myModal', { read: ElementRef },] }]
    };
    return DraggableDirective;
}());
export { DraggableDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvZGlhbG9nL2RyYWdnYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQWtDLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzVELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7O0lBNkMxQiw0QkFDUyxVQUNBLFFBQ0M7UUFIVixpQkFPQztRQU5RLGFBQVEsR0FBUixRQUFRO1FBQ1IsV0FBTSxHQUFOLE1BQU07UUFDTCxtQkFBYyxHQUFkLGNBQWM7a0NBL0JtQixDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDO3NCQUdqRCxJQUFJOzs7O3VCQVdhLElBQUk7aUNBUVgsS0FBSzs2QkFDUjtZQUNoQyxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1NBQ0w7UUFNRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEVBQTlCLENBQThCLENBQUM7UUFDbEUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEVBQTlCLENBQThCLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBNUIsQ0FBNEIs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Z0JBbkJzQyxTQUFTO2dCQUFnRCxNQUFNO2dCQUM3RixjQUFjOzs7OEJBcUJwQixLQUFLO3dCQUNMLEtBQUssU0FBQyxPQUFPO3lCQUNiLEtBQUs7d0JBT0wsS0FBSzswQkFJVyxLQUFLO2lDQUNyQixZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFOzhCQUNuRCxZQUFZLFNBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTs7NkJBckMvQzs7U0FvQmEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgUmVuZGVyZXIyLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEhvc3QsIENvbnRlbnRDaGlsZCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi4vdGFibGUvdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IFVpRG9jdW1lbnQgfSBmcm9tICcuLi9iYXNlL3VpLWRvY3VtZW50JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW50ZXJmYWNlIFBvc2l0aW9uIHtcbiAgeDogbnVtYmVyLFxuICB5OiBudW1iZXJcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3Z0RHJhZ2dhYmxlXScsXG4gIGhvc3Q6IHtcbiAgICAvLyAnKGRyYWdzdGFydCknOiAnb25EcmFnU3RhcnQoJGV2ZW50KScsXG4gICAgLy8gJyhkcmFnZW5kKSc6ICdvbkRyYWdFbmQoJGV2ZW50KScsXG4gICAgLy8gJyhkcmFnKSc6ICdvbkRyYWcoJGV2ZW50KScsXG4gICAgJyhjbGljayknOiAnb25DbGljaygkZXZlbnQpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHB1YmxpYyBwb3NpdGlvbkF0dHJWYWx1ZXM6IEFycmF5PHN0cmluZz4gPSBbJ2Fic29sdXRlJywgJ2ZpeGVkJywgJ3JlbGF0aXZlJ107XG4gIEBJbnB1dCgpIHZ0RHJhZ2dhYmxlOiBib29sZWFuO1xuICBASW5wdXQoXCJtb2RhbFwiKSBtb2RhbDogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNWaWV3OiBib29sZWFuID0gdHJ1ZTtcblxuICBwcml2YXRlIHZpZXdJZDogc3RyaW5nO1xuICBwcml2YXRlIHRhYmxlSWQ6IHN0cmluZzsgLy/jg6rjgrXjgqTjgrrmmYLjgavmk43kvZzjgZnjgovjg4bjg7zjg5bjg6vjgr/jgrDjga5JRFxuXG4gIHByaXZhdGUgcGFyZW50RWxlbWVudDphbnk7XG5cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICBzY3JlZW5JbmRleDogbnVtYmVyO1xuXG4gICAgLyoqIEBJbnB1dCAqLyBASW5wdXQoKSBjYW5EcmFnOiBib29sZWFuID0gdHJ1ZTsgLy90aGlzIGlzIGR1bW4gYnV0IHdvcmsgYXJvdW5kIGZvciBub3cgKGZvciBtYWluIG1kaSB3aW5kb3cgd2hlcmUgd2UgZG9uJ3Qgd2FudCB0byBkcmFnKVxuICBAQ29udGVudENoaWxkKCdkcmFnZ2FibGVQYW5lbCcsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBkcmFnZ2FibGVQYW5lbDogRWxlbWVudFJlZjtcbiAgQENvbnRlbnRDaGlsZCgnbXlNb2RhbCcsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBwYXJlbnRQYW5lbDogRWxlbWVudFJlZjtcblxuICBtb3VzZURvd25IYW5kbGVyOiAoZXZlbnQpID0+IHZvaWQ7XG4gIG1vdXNlTW92ZUhhbmRsZXI6IChldmVudCkgPT4gdm9pZDtcbiAgbW91c2VVcEhhbmRsZXI6IChldmVudCkgPT4gdm9pZDtcblxuICBwcml2YXRlIGNhblRyYWNrTW91c2VNb3ZlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgbW91c2VQb3NpdGlvbjogUG9zaXRpb24gPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHVibGljIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlKSB7XG4gICAgICB0aGlzLm1vdXNlRG93bkhhbmRsZXIgPSAoZXZlbnQpID0+IHRoaXMub25Nb3VzZURvd25IYW5kbGVyKGV2ZW50KTtcbiAgICAgIHRoaXMubW91c2VNb3ZlSGFuZGxlciA9IF8udGhyb3R0bGUoKGV2ZW50KSA9PiB0aGlzLm9uTW91c2VNb3ZlSGFuZGxlcihldmVudCksNzUpO1xuICAgICAgdGhpcy5tb3VzZVVwSGFuZGxlciA9IChldmVudCkgPT4gdGhpcy5vbk1vdXNlVXBIYW5kbGVyKGV2ZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGREcmFnTGlzdGVuZXJzKCkge1xuICAgIGxldCBkcmFnRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmdldERyYWdFbGVtZW50KCk7XG5cbiAgICBpZiAoZHJhZ0VsZW1lbnQpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICBkcmFnRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkhhbmRsZXIsIHRydWUpO1xuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0cnVlKTtcbiAgICAgICAgICBkcmFnRWxlbWVudCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlRHJhZ0xpc3RlbmVycygpIHtcbiAgICBsZXQgZHJhZ0VsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5nZXREcmFnRWxlbWVudCgpO1xuXG4gICAgaWYgKGRyYWdFbGVtZW50KSB7XG4gICAgICAgIGRyYWdFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duSGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdHJ1ZSk7IC8vIOW/teOBruOBn+OCgee9ruOBhOOBpuOBiuOBj1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgIGRyYWdFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYWRkRHJhZ0xpc3RlbmVycygpO1xuICAgIGlmKHRoaXMuaXNWaWV3KXtcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudCA9IHRoaXMucGFyZW50UGFuZWwubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudCA9IHRoaXMucGFyZW50UGFuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDsvL2dldCBkaXYoJ21vZGFsLWRpYWxvZycpXG4gICAgfVxuICAgIGlmICh0aGlzLmNhbkRyYWcgJiYgdGhpcy5wYXJlbnRFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIC8vIGNvbnN0IGJvdW5kID0gdGhpcy5nZXRCb3VuZCgodGhpcy5wYXJlbnRQYW5lbC5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5maXJzdENoaWxkIGFzIEhUTUxFbGVtZW50KTtcbiAgICAgIC8vIGNvbnNvbGUuZXJyb3IoYm91bmQpO1xuICAgICAgLy90aGlzLnBhcmVudFBhbmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAvL3RoaXMuYXBwbHlUcmFuc2xhdGUoYm91bmQueCwgYm91bmQueSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FuRHJhZyA9IGZhbHNlO1xuICAgIH1cblxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlRHJhZ0xpc3RlbmVycygpO1xuXG4gICAgZGVsZXRlIHRoaXMucmVuZGVyZXI7XG4gICAgZGVsZXRlIHRoaXMubmdab25lO1xuICAgIGRlbGV0ZSB0aGlzLmRyYWdnYWJsZVBhbmVsO1xuICAgIGRlbGV0ZSB0aGlzLm1vdXNlRG93bkhhbmRsZXI7XG4gICAgZGVsZXRlIHRoaXMubW91c2VNb3ZlSGFuZGxlcjtcbiAgICBkZWxldGUgdGhpcy5tb3VzZVVwSGFuZGxlcjtcbiAgICBkZWxldGUgdGhpcy5wYXJlbnRQYW5lbDtcbiAgfVxuXG4gIG9uTW91c2VEb3duSGFuZGxlcihldmVudDogYW55KSB7XG4gICAgbGV0IGRyYWdFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuZ2V0RHJhZ0VsZW1lbnQoKTtcblxuICAgIGlmIChkcmFnRWxlbWVudCkge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgICAgZHJhZ0VsZW1lbnQgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMubW91c2VQb3NpdGlvbiA9IHtcbiAgICAgIHg6IGV2ZW50LnBhZ2VYLFxuICAgICAgeTogZXZlbnQucGFnZVlcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY2FuRHJhZykge1xuICAgICAgaWYodGhpcy5pc1ZpZXcpey8vZm9yIG1haW4gZGlhbG9nXG4gICAgICAgIGNvbnN0IGJvdW5kID0gdGhpcy5nZXRCb3VuZCh0aGlzLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMucGFyZW50RWxlbWVudCwgXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMucGFyZW50RWxlbWVudCwgXCJtYXJnaW5cIiwgXCIwXCIpO1xuICAgICAgICB0aGlzLmFwcGx5VHJhbnNsYXRlKGJvdW5kLngsIGJvdW5kLnkpO1xuICAgICAgICB0aGlzLm1vdmVXaW5kb3dUb1RvcCgpO1xuICAgICAgICB0aGlzLmNhblRyYWNrTW91c2VNb3ZlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2V7Ly9mb3IgZXJyb3IvaW5mbyBkaWFsb2dcbiAgICAgICAgY29uc3QgYm91bmQgPSB0aGlzLmdldEJvdW5kKHRoaXMucGFyZW50RWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMucGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMucGFyZW50RWxlbWVudC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJlbnRFbGVtZW50LCBcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJlbnRFbGVtZW50LCBcIm1hcmdpblwiLCBcIjBcIik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5wYXJlbnRFbGVtZW50LCdoZWlnaHQnLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMucGFyZW50RWxlbWVudCwnd2lkdGgnLCB3aWR0aCk7XG4gICAgICAgIHRoaXMuYXBwbHlUcmFuc2xhdGUoYm91bmQueCwgYm91bmQueSk7XG4gICAgICAgIHRoaXMuY2FuVHJhY2tNb3VzZU1vdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VNb3ZlSGFuZGxlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLmNhbkRyYWcgJiYgdGhpcy5jYW5UcmFja01vdXNlTW92ZSkge1xuICAgICAgY29uc3QgY3VycmVudE1vdXNlUG9zaXRpb246IFBvc2l0aW9uID0ge1xuICAgICAgICB4OiBldmVudC5wYWdlWCxcbiAgICAgICAgeTogZXZlbnQucGFnZVlcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlmZlggPSBjdXJyZW50TW91c2VQb3NpdGlvbi54IC0gdGhpcy5tb3VzZVBvc2l0aW9uLng7XG4gICAgICBjb25zdCBkaWZmWSA9IGN1cnJlbnRNb3VzZVBvc2l0aW9uLnkgLSB0aGlzLm1vdXNlUG9zaXRpb24ueTtcblxuICAgICAgY29uc3QgcGFyZW50Qm91bmQgPSB0aGlzLmdldEJvdW5kKHRoaXMucGFyZW50RWxlbWVudCk7XG5cbiAgICAgIGNvbnN0IG5ld1ggPSBwYXJlbnRCb3VuZC54ICsgZGlmZlg7XG4gICAgICBjb25zdCBuZXdZID0gcGFyZW50Qm91bmQueSArIGRpZmZZO1xuICAgICAgdGhpcy5hcHBseVRyYW5zbGF0ZShuZXdYLCBuZXdZKTtcbiAgICAgIHRoaXMubW91c2VQb3NpdGlvbiA9IGN1cnJlbnRNb3VzZVBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VVcEhhbmRsZXIoZXZlbnQ6IGFueSkge1xuICAgIGxldCBkcmFnRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmdldERyYWdFbGVtZW50KCk7XG5cbiAgICBpZiAoZHJhZ0VsZW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0cnVlKTtcbiAgICAgICAgZHJhZ0VsZW1lbnQgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNhbkRyYWcgJiYgdGhpcy5jYW5UcmFja01vdXNlTW92ZSkge1xuICAgICAgdGhpcy5jYW5UcmFja01vdXNlTW92ZSA9IGZhbHNlO1xuICAgIH1cblxuICB9XG5cbiAgb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLmNhbkRyYWcpIHtcbiAgICAgIGlmKHRoaXMuaXNWaWV3KSB0aGlzLm1vdmVXaW5kb3dUb1RvcCgpO1xuICAgIH1cbiAgfVxuXG4gIGFwcGx5VHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgaWYgKHkgPiAwKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIGxldCB0b3A6IG51bWJlciA9IDA7XG4gICAgICAgIC8vIGxldCBsZWZ0OiBudW1iZXIgPSAwO1xuXG4gICAgICAgIC8vIFRoaXMgaXMgaGVpZ2h0IG9mIGFwcCBoZWFkZXJcbiAgICAgICAgbGV0IHRvcE1heCA9IDgyO1xuXG4gICAgICAgIGlmKHRoaXMuaXNWaWV3KSB7XG4gICAgICAgICAgdG9wID0gTWF0aC5tYXgoeSwgdG9wTWF4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b3AgPSBNYXRoLm1heCh5LCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlc3Npb25TZXJ2aWNlLmRpYWxvZ01heFRvcFBvc2l0aW9uID4gMCAmJiB0b3AgPiB0aGlzLnNlc3Npb25TZXJ2aWNlLmRpYWxvZ01heFRvcFBvc2l0aW9uKSB7XG4gICAgICAgICAgdG9wID0gdGhpcy5zZXNzaW9uU2VydmljZS5kaWFsb2dNYXhUb3BQb3NpdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIzE1ODc6IGluIHRoZSBhcy1pcywgdGhlcmUgaXMgbm8gbGltaXQgdG8gd2hlcmUgeW91IGNhbiBkcmFnIHRoZSB3aW5kb3cgdG8gdGhlIGxlZnQvcmlnaHRcbiAgICAgICAgLy9sZWZ0ID0gTWF0aC5tYXgoeCwgMCk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmVudEVsZW1lbnQsICd0b3AnLCB0b3AgKyAncHgnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmVudEVsZW1lbnQsICdsZWZ0JywgeCArICdweCcpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbW92ZVdpbmRvd1RvVG9wKCkge1xuICAgIHRoaXMuc2Vzc2lvblNlcnZpY2UuZ2V0TWNvQ29udGFpbmVyKCkucmVTdGFja1ZpZXcodGhpcy52aWV3SWQsIHRoaXMuc2NyZWVuSW5kZXgpO1xuICB9XG5cbiAgc2V0Vmlld0lkKGlkOiBzdHJpbmcpIHtcbiAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgdGhpcy52aWV3SWQgPSBpZDtcbiAgICB9XG4gIH1cblxuICBzZXRUYWJsZUlkKGlkOiBzdHJpbmcpIHtcbiAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgdGhpcy50YWJsZUlkID0gaWQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXREcmFnRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgaWYgKHRoaXMudnREcmFnZ2FibGUgPT09IHRydWUgJiYgdGhpcy5kcmFnZ2FibGVQYW5lbCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlUGFuZWwubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Qm91bmQoZWw6IEhUTUxFbGVtZW50KTogUG9zaXRpb24ge1xuICAgIGNvbnN0IGJvdW5kID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgYXMgRE9NUmVjdDtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiBib3VuZC54IHx8IGJvdW5kLmxlZnQsXG4gICAgICB5OiBib3VuZC55IHx8IGJvdW5kLnRvcFxuICAgIH1cbiAgfVxufVxuIl19