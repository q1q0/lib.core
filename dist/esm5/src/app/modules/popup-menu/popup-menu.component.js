/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Optional, SkipSelf, ElementRef, Input, ChangeDetectionStrategy, ChangeDetectorRef, IterableDiffers, ViewChild, ViewEncapsulation, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { ContextMenuService } from './context-menu.service';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { UiDocument } from '../base/ui-document';
/**
 * Class for popup menu component
 */
var PopupMenuComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PopupMenuComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Change detector
     * @param differs
     * @param popupMenuService
     * @param renderer see [[BaseComponent]] constructor
     */
    function PopupMenuComponent(parent, sessionService, elementRef, cd, differs, popupMenuService, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.popupMenuService = popupMenuService;
        _this.menuItems = [];
        _this.menuItemsDiffer = null;
        _this.isShown = false;
        _this.menuItemsDiffer = differs.find([]).create();
        _this.onDocumentClick = function (event) {
            _this.handleDocumentClick(event);
        };
        document.addEventListener("click", _this.onDocumentClick, true);
        return _this;
    }
    Object.defineProperty(PopupMenuComponent.prototype, "hasMenuItems", {
        get: /**
         * @return {?}
         */
        function () {
            return this.menuItems != null && this.menuItems.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Do check lifecycle
     */
    /**
     * Do check lifecycle
     * @return {?}
     */
    PopupMenuComponent.prototype.ngDoCheck = /**
     * Do check lifecycle
     * @return {?}
     */
    function () {
        if (this.menuItemsDiffer.diff(this.menuItems)) {
            this.cd.markForCheck();
        }
    };
    /**
     * After view init lifecycle. Trigger change detection and show this component
     */
    /**
     * After view init lifecycle. Trigger change detection and show this component
     * @return {?}
     */
    PopupMenuComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Trigger change detection and show this component
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        this.cd.detectChanges();
        UiDocument.registerMenuItemElement(this.getId(), /** @type {?} */ (this));
        /** @type {?} */
        var tm = setTimeout(function () {
            clearTimeout(tm);
            _this.show();
        });
    };
    /**
     * Destroy lifecycle. Remove event listeners and remove dropdown elements
     */
    /**
     * Destroy lifecycle. Remove event listeners and remove dropdown elements
     * @return {?}
     */
    PopupMenuComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Remove event listeners and remove dropdown elements
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        UiDocument.unregisterMenuItemElement(this.getId());
        document.removeEventListener("click", this.onDocumentClick, true);
        this.dropdownContainer = null;
        this.dropdown = null;
    };
    /**
     * Show the popup by setting CSS position to on screen
     * @return {?}
     */
    PopupMenuComponent.prototype.show = /**
     * Show the popup by setting CSS position to on screen
     * @return {?}
     */
    function () {
        this.popupMenuService.setActiveMenu(this.id);
        if (this.dropdown != null) {
            this.dropdown.show();
            this.isShown = true;
            /** @type {?} */
            var position = this.getSession().getMousePosition();
            if (position != null && this.dropdownContainer != null) {
                this.renderer.setStyle(this.dropdownContainer.nativeElement, "left", position.x + "px");
                this.renderer.setStyle(this.dropdownContainer.nativeElement, "top", position.y + "px");
            }
            this.cd.markForCheck();
        }
    };
    /**
     * Hide the popup menu
     * @return {?}
     */
    PopupMenuComponent.prototype.hide = /**
     * Hide the popup menu
     * @return {?}
     */
    function () {
        this.dropdown.hide();
        this.isShown = false;
        this.cd.markForCheck();
        this.popupMenuService.setActiveMenu(null);
    };
    /**
     * Event handler for mouse click
     * @param event
     */
    /**
     * Event handler for mouse click
     * @param {?} event
     * @return {?}
     */
    PopupMenuComponent.prototype.handleDocumentClick = /**
     * Event handler for mouse click
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isShown === true && !this.elementRef.nativeElement.contains(event.target)) {
            this.hide();
        }
    };
    /**
     * Get [[cd]] (Change detector) property
     */
    /**
     * Get [[cd]] (Change detector) property
     * @return {?}
     */
    PopupMenuComponent.prototype.getChangeDetector = /**
     * Get [[cd]] (Change detector) property
     * @return {?}
     */
    function () {
        return this.cd;
    };
    /**
     * Event handler that hides all other popup menus and displays this one
     * @param event
     */
    /**
     * Event handler that hides all other popup menus and displays this one
     * @param {?} event
     * @return {?}
     */
    PopupMenuComponent.prototype.dispSubmenu = /**
     * Event handler that hides all other popup menus and displays this one
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var currentTarget = event.currentTarget;
        /** @type {?} */
        var currentChildren = currentTarget.children;
        /** @type {?} */
        var parentChildren = currentTarget.parentElement.children;
        for (var i = 0, len = parentChildren.length; i < len; i++) {
            if (parentChildren[i] !== undefined) {
                this.renderer.setStyle(parentChildren[i], "background-color", "#ffffff");
            }
            if (parentChildren[i].children[1] === undefined) {
                continue;
            }
            parentChildren[i].children[1].classList.remove('popup-sub-menu-display');
        }
        if (currentChildren[1] === undefined
            || (currentChildren[0] !== undefined && !currentChildren[0].classList.contains('dropdown-item'))) {
            return;
        }
        currentChildren[1].classList.add('popup-sub-menu-display');
        this.renderer.setStyle(currentTarget, "background-color", "#f5de92");
    };
    /**
     * Set an attribute with value on the menu item
     * @param name Attribute name
     * @param value Attribute value
     */
    /**
     * Set an attribute with value on the menu item
     * @param {?} name Attribute name
     * @param {?} value Attribute value
     * @return {?}
     */
    PopupMenuComponent.prototype.setAttribute = /**
     * Set an attribute with value on the menu item
     * @param {?} name Attribute name
     * @param {?} value Attribute value
     * @return {?}
     */
    function (name, value) {
        this.setCustomAttribute(name, value);
    };
    /**
     * Get the value of an attribute by name
     * @param name Attribute name
     */
    /**
     * Get the value of an attribute by name
     * @param {?} name Attribute name
     * @return {?}
     */
    PopupMenuComponent.prototype.getAttribute = /**
     * Get the value of an attribute by name
     * @param {?} name Attribute name
     * @return {?}
     */
    function (name) {
        return this.getCustomAttribute(name);
    };
    /**
     * @return {?}
     */
    PopupMenuComponent.prototype.toJson = /**
     * @return {?}
     */
    function () {
        return _super.prototype.toJson.call(this);
    };
    PopupMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-popup-menu-view',
                    template: "<div class=\"dropdown-container\" bs-dropdown-container #bsDropdownContainer>\n  <div id=\"{{id}}\" dropdown #myDropdown=\"bs-dropdown\" [autoClose]=\"true\">\n    <ul *dropdownMenu class=\"dropdown-menu popup-menu\" role=\"menu\" id=\"{{id}}_menus\">\n      <ng-template ngFor [ngForOf]=\"menuItems\" let-item>\n        <li *ngIf=\"item.text === '-' && item.display !== false\" role=\"separator\" class=\"divider\"></li>\n        <li (mouseover)=\"dispSubmenu($event)\" *ngIf=\"item.menuItems != null && item.menuItems.length > 0 && item.display !== false\" class=\"dropdown-submenu\" role=\"menuitem\" vt-menu-item-comp [text]=\"item.text\" id=\"{{item.id}}\" [menuItems]=\"item.menuItems\" [display]=\"item.display\" [item]=\"item\" [popupMenuId]=\"id\"></li>\n        <li (mouseover)=\"dispSubmenu($event)\" *ngIf=\"item.text !== '-' && (item.menuItems == null || item.menuItems.length === 0) && item.display !== false\" role=\"menuitem\" vt-menu-item-comp [text]=\"item.text\" id=\"{{item.id}}\" [menuItems]=\"item.menuItems\" [display]=\"item.display\" [item]=\"item\" [popupMenuId]=\"id\"></li>\n      </ng-template>\n    </ul>\n  </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".hidden{display:none}.dropdown-submenu{position:relative}.dropdown-submenu>a{text-align:left;padding-right:43px!important}.dropdown-submenu>.dropdown-menu{top:0;left:100%;margin-top:-1px;margin-left:-1px;border-radius:6px}.dropdown-submenu:hover>.dropdown-menu{display:block}.dropdown-submenu>a:after{display:block;position:relative;right:-8px;font-size:8px;content:\">\";color:#626d8d;text-shadow:1px 0 0 #626d8d;float:right;margin:2px 0 -10px;padding:0;width:0;height:0;background:0 0;border:none}.dropdown-submenu:hover>a:after{border-left-color:#fff}.dropdown-submenu.pull-left{float:none}.dropdown-submenu.pull-left>.dropdown-menu{left:-100%;margin-left:10px;border-radius:6px}.dropdown-container{position:absolute;z-index:9999}"]
                }] }
    ];
    /** @nocollapse */
    PopupMenuComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: IterableDiffers },
        { type: ContextMenuService },
        { type: Renderer2 }
    ]; };
    PopupMenuComponent.propDecorators = {
        idName: [{ type: Input }],
        dropdown: [{ type: ViewChild, args: ["myDropdown", { read: BsDropdownDirective },] }],
        dropdownContainer: [{ type: ViewChild, args: ["bsDropdownContainer", { read: ElementRef },] }],
        menuItems: [{ type: Input }]
    };
    return PopupMenuComponent;
}(BaseComponent));
export { PopupMenuComponent };
if (false) {
    /** @type {?} */
    PopupMenuComponent.prototype.idName;
    /** @type {?} */
    PopupMenuComponent.prototype.dropdown;
    /** @type {?} */
    PopupMenuComponent.prototype.dropdownContainer;
    /** @type {?} */
    PopupMenuComponent.prototype.menuItems;
    /** @type {?} */
    PopupMenuComponent.prototype.menuItemsDiffer;
    /** @type {?} */
    PopupMenuComponent.prototype.isShown;
    /** @type {?} */
    PopupMenuComponent.prototype.onDocumentClick;
    /** @type {?} */
    PopupMenuComponent.prototype.cd;
    /** @type {?} */
    PopupMenuComponent.prototype.popupMenuService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3BvcHVwLW1lbnUvcG9wdXAtbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFFBQVEsRUFDUixRQUFRLEVBQ1IsVUFBVSxFQUdWLEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBRWpCLGVBQWUsRUFFZixTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUtwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0lBWVQsOENBQWE7SUFpQm5EOzs7Ozs7Ozs7T0FTRztJQUNILDRCQUMwQixNQUFxQixFQUM3QyxjQUE4QixFQUM5QixVQUFzQixFQUNkLElBQ1IsT0FBd0IsRUFDaEIsa0JBQ1IsUUFBbUI7UUFQckIsWUFTRSxrQkFBTSxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsU0FTcEQ7UUFkUyxRQUFFLEdBQUYsRUFBRTtRQUVGLHNCQUFnQixHQUFoQixnQkFBZ0I7MEJBNUJZLEVBQUU7Z0NBRU0sSUFBSTt3QkFFdkIsS0FBSztRQTZCOUIsS0FBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWpELEtBQUksQ0FBQyxlQUFl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QixFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQzs0QkFFbkQsS0FBSzs7NkJBN0NSO0VBd0N3QyxhQUFhO1NBQXhDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxuICBFbGVtZW50UmVmLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgSW5wdXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRG9DaGVjayxcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBJdGVyYWJsZURpZmZlcixcbiAgVmlld0NoaWxkLFxuICBDb250ZW50Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE1lbnVJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAnLi9tZW51LWl0ZW0nO1xuaW1wb3J0IHsgQ29udGV4dE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi9jb250ZXh0LW1lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBCc0Ryb3Bkb3duRGlyZWN0aXZlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBNZW51SXRlbUJ1aWxkZXIgfSBmcm9tICcuL21lbnUtaXRlbS1idWlsZGVyJztcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHsgQ2xpZW50RXZlbnQgfSBmcm9tICcuLi9ldmVudC1oYW5kbGVyL2NsaWVudC1ldmVudCc7XG5pbXBvcnQgeyBBcHBVdGlscyB9IGZyb20gJy4uL2Jhc2UvYXBwLXV0aWxzJztcbmltcG9ydCB7IFVpRG9jdW1lbnQgfSBmcm9tICcuLi9iYXNlL3VpLWRvY3VtZW50JztcblxuLyoqXG4gKiBDbGFzcyBmb3IgcG9wdXAgbWVudSBjb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtcG9wdXAtbWVudS12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BvcHVwLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wb3B1cC1tZW51LmNvbXBvbmVudC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgUG9wdXBNZW51Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICBASW5wdXQoKSBwcml2YXRlIGlkTmFtZTogc3RyaW5nOyAvL0RPIE5PVCB1c2VkLCBleGlzdHMgZm9yIGJhZCB1c2FnZVxuICBAVmlld0NoaWxkKFwibXlEcm9wZG93blwiLCB7cmVhZDogQnNEcm9wZG93bkRpcmVjdGl2ZX0pIGRyb3Bkb3duOiBCc0Ryb3Bkb3duRGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKFwiYnNEcm9wZG93bkNvbnRhaW5lclwiLCB7cmVhZDogRWxlbWVudFJlZn0pIGRyb3Bkb3duQ29udGFpbmVyOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBASW5wdXQoKSBtZW51SXRlbXM6IEFycmF5PE1lbnVJdGVtPiA9IFtdO1xuXG4gIHByaXZhdGUgbWVudUl0ZW1zRGlmZmVyOiBJdGVyYWJsZURpZmZlcjx7fT4gPSBudWxsO1xuXG4gIHByaXZhdGUgaXNTaG93bjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBoYXNNZW51SXRlbXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWVudUl0ZW1zICE9IG51bGwgJiYgdGhpcy5tZW51SXRlbXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljazogKGV2ZW50KT0+dm9pZDtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHBhcmVudCBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHNlc3Npb25TZXJ2aWNlIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZWxlbWVudFJlZiBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNkIENoYW5nZSBkZXRlY3RvclxuICAgKiBAcGFyYW0gZGlmZmVyc1xuICAgKiBAcGFyYW0gcG9wdXBNZW51U2VydmljZVxuICAgKiBAcGFyYW0gcmVuZGVyZXIgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsXG4gICAgc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgIHByaXZhdGUgcG9wdXBNZW51U2VydmljZTogQ29udGV4dE1lbnVTZXJ2aWNlLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgc3VwZXIocGFyZW50LCBzZXNzaW9uU2VydmljZSwgZWxlbWVudFJlZiwgcmVuZGVyZXIpO1xuXG4gICAgdGhpcy5tZW51SXRlbXNEaWZmZXIgPSBkaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSgpO1xuXG4gICAgdGhpcy5vbkRvY3VtZW50Q2xpY2sgPSAoZXZlbnQpPT57XG4gICAgICB0aGlzLmhhbmRsZURvY3VtZW50Q2xpY2soZXZlbnQpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkRvY3VtZW50Q2xpY2ssIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERvIGNoZWNrIGxpZmVjeWNsZVxuICAgKi9cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICh0aGlzLm1lbnVJdGVtc0RpZmZlci5kaWZmKHRoaXMubWVudUl0ZW1zKSkge1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdmlldyBpbml0IGxpZmVjeWNsZS4gVHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIGFuZCBzaG93IHRoaXMgY29tcG9uZW50XG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICBVaURvY3VtZW50LnJlZ2lzdGVyTWVudUl0ZW1FbGVtZW50KHRoaXMuZ2V0SWQoKSwgdGhpcyBhcyBhbnkpO1xuXG4gICAgY29uc3QgdG0gPSBzZXRUaW1lb3V0KCgpPT57XG4gICAgICBjbGVhclRpbWVvdXQodG0pO1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBsaWZlY3ljbGUuIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMgYW5kIHJlbW92ZSBkcm9wZG93biBlbGVtZW50c1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcblxuICAgIFVpRG9jdW1lbnQudW5yZWdpc3Rlck1lbnVJdGVtRWxlbWVudCh0aGlzLmdldElkKCkpO1xuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25Eb2N1bWVudENsaWNrLCB0cnVlKTtcbiAgICB0aGlzLmRyb3Bkb3duQ29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLmRyb3Bkb3duID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IHRoZSBwb3B1cCBieSBzZXR0aW5nIENTUyBwb3NpdGlvbiB0byBvbiBzY3JlZW5cbiAgICovXG4gIHByaXZhdGUgc2hvdygpIHtcbiAgICB0aGlzLnBvcHVwTWVudVNlcnZpY2Uuc2V0QWN0aXZlTWVudSh0aGlzLmlkKTtcblxuICAgIGlmICh0aGlzLmRyb3Bkb3duICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZHJvcGRvd24uc2hvdygpO1xuICAgICAgdGhpcy5pc1Nob3duID0gdHJ1ZTtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5nZXRTZXNzaW9uKCkuZ2V0TW91c2VQb3NpdGlvbigpO1xuXG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCAmJiB0aGlzLmRyb3Bkb3duQ29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyb3Bkb3duQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsIFwibGVmdFwiLCBwb3NpdGlvbi54ICsgXCJweFwiKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyb3Bkb3duQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsIFwidG9wXCIsIHBvc2l0aW9uLnkgKyBcInB4XCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHRoZSBwb3B1cCBtZW51XG4gICAqL1xuICBwcml2YXRlIGhpZGUoKSB7XG4gICAgdGhpcy5kcm9wZG93bi5oaWRlKCk7XG4gICAgdGhpcy5pc1Nob3duID0gZmFsc2U7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLnBvcHVwTWVudVNlcnZpY2Uuc2V0QWN0aXZlTWVudShudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIGZvciBtb3VzZSBjbGlja1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIGhhbmRsZURvY3VtZW50Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpe1xuICAgIGlmICh0aGlzLmlzU2hvd24gPT09IHRydWUgJiYgIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgW1tjZF1dIChDaGFuZ2UgZGV0ZWN0b3IpIHByb3BlcnR5XG4gICAqL1xuICBnZXRDaGFuZ2VEZXRlY3RvcigpIHtcbiAgICByZXR1cm4gdGhpcy5jZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBoYW5kbGVyIHRoYXQgaGlkZXMgYWxsIG90aGVyIHBvcHVwIG1lbnVzIGFuZCBkaXNwbGF5cyB0aGlzIG9uZVxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIGRpc3BTdWJtZW51KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50VGFyZ2V0OiBhbnkgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IGN1cnJlbnRDaGlsZHJlbjogQXJyYXk8YW55PiA9IGN1cnJlbnRUYXJnZXQuY2hpbGRyZW47XG4gICAgY29uc3QgcGFyZW50Q2hpbGRyZW46IEFycmF5PGFueT4gPSBjdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGRyZW47XG5cbiAgICBmb3IobGV0IGkgPSAwLCBsZW4gPSBwYXJlbnRDaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICBpZihwYXJlbnRDaGlsZHJlbltpXSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShwYXJlbnRDaGlsZHJlbltpXSwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZmZmZlwiKTtcbiAgICAgIH1cbiAgICAgIGlmKHBhcmVudENoaWxkcmVuW2ldLmNoaWxkcmVuWzFdID09PSB1bmRlZmluZWQpe1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcGFyZW50Q2hpbGRyZW5baV0uY2hpbGRyZW5bMV0uY2xhc3NMaXN0LnJlbW92ZSgncG9wdXAtc3ViLW1lbnUtZGlzcGxheScpO1xuICAgIH1cblxuICAgIGlmKGN1cnJlbnRDaGlsZHJlblsxXSA9PT0gdW5kZWZpbmVkXG4gICAgICAgIHx8IChjdXJyZW50Q2hpbGRyZW5bMF0gIT09IHVuZGVmaW5lZCAmJiAhY3VycmVudENoaWxkcmVuWzBdLmNsYXNzTGlzdC5jb250YWlucygnZHJvcGRvd24taXRlbScpKSl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY3VycmVudENoaWxkcmVuWzFdLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLXN1Yi1tZW51LWRpc3BsYXknKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGN1cnJlbnRUYXJnZXQsIFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmNWRlOTJcIik7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGFuIGF0dHJpYnV0ZSB3aXRoIHZhbHVlIG9uIHRoZSBtZW51IGl0ZW1cbiAgICogQHBhcmFtIG5hbWUgQXR0cmlidXRlIG5hbWVcbiAgICogQHBhcmFtIHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZVxuICAgKi9cbiAgc2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuc2V0Q3VzdG9tQXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIG9mIGFuIGF0dHJpYnV0ZSBieSBuYW1lXG4gICAqIEBwYXJhbSBuYW1lIEF0dHJpYnV0ZSBuYW1lXG4gICAqL1xuICBnZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q3VzdG9tQXR0cmlidXRlKG5hbWUpO1xuICB9XG5cbiAgdG9Kc29uKCkge1xuICAgIHJldHVybiBzdXBlci50b0pzb24oKTtcbiAgfVxufVxuIl19