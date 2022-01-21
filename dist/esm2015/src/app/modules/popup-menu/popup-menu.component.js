/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Optional, SkipSelf, ElementRef, Input, ChangeDetectionStrategy, ChangeDetectorRef, IterableDiffers, ViewChild, ViewEncapsulation, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { ContextMenuService } from './context-menu.service';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { UiDocument } from '../base/ui-document';
/**
 * Class for popup menu component
 */
export class PopupMenuComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd Change detector
     * @param {?} differs
     * @param {?} popupMenuService
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, cd, differs, popupMenuService, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.popupMenuService = popupMenuService;
        this.menuItems = [];
        this.menuItemsDiffer = null;
        this.isShown = false;
        this.menuItemsDiffer = differs.find([]).create();
        this.onDocumentClick = (event) => {
            this.handleDocumentClick(event);
        };
        document.addEventListener("click", this.onDocumentClick, true);
    }
    /**
     * @return {?}
     */
    get hasMenuItems() {
        return this.menuItems != null && this.menuItems.length > 0;
    }
    /**
     * Do check lifecycle
     * @return {?}
     */
    ngDoCheck() {
        if (this.menuItemsDiffer.diff(this.menuItems)) {
            this.cd.markForCheck();
        }
    }
    /**
     * After view init lifecycle. Trigger change detection and show this component
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cd.detectChanges();
        UiDocument.registerMenuItemElement(this.getId(), /** @type {?} */ (this));
        /** @type {?} */
        const tm = setTimeout(() => {
            clearTimeout(tm);
            this.show();
        });
    }
    /**
     * Destroy lifecycle. Remove event listeners and remove dropdown elements
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        UiDocument.unregisterMenuItemElement(this.getId());
        document.removeEventListener("click", this.onDocumentClick, true);
        this.dropdownContainer = null;
        this.dropdown = null;
    }
    /**
     * Show the popup by setting CSS position to on screen
     * @return {?}
     */
    show() {
        this.popupMenuService.setActiveMenu(this.id);
        if (this.dropdown != null) {
            this.dropdown.show();
            this.isShown = true;
            /** @type {?} */
            const position = this.getSession().getMousePosition();
            if (position != null && this.dropdownContainer != null) {
                this.renderer.setStyle(this.dropdownContainer.nativeElement, "left", position.x + "px");
                this.renderer.setStyle(this.dropdownContainer.nativeElement, "top", position.y + "px");
            }
            this.cd.markForCheck();
        }
    }
    /**
     * Hide the popup menu
     * @return {?}
     */
    hide() {
        this.dropdown.hide();
        this.isShown = false;
        this.cd.markForCheck();
        this.popupMenuService.setActiveMenu(null);
    }
    /**
     * Event handler for mouse click
     * @param {?} event
     * @return {?}
     */
    handleDocumentClick(event) {
        if (this.isShown === true && !this.elementRef.nativeElement.contains(event.target)) {
            this.hide();
        }
    }
    /**
     * Get [[cd]] (Change detector) property
     * @return {?}
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Event handler that hides all other popup menus and displays this one
     * @param {?} event
     * @return {?}
     */
    dispSubmenu(event) {
        /** @type {?} */
        const currentTarget = event.currentTarget;
        /** @type {?} */
        const currentChildren = currentTarget.children;
        /** @type {?} */
        const parentChildren = currentTarget.parentElement.children;
        for (let i = 0, len = parentChildren.length; i < len; i++) {
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
    }
    /**
     * Set an attribute with value on the menu item
     * @param {?} name Attribute name
     * @param {?} value Attribute value
     * @return {?}
     */
    setAttribute(name, value) {
        this.setCustomAttribute(name, value);
    }
    /**
     * Get the value of an attribute by name
     * @param {?} name Attribute name
     * @return {?}
     */
    getAttribute(name) {
        return this.getCustomAttribute(name);
    }
    /**
     * @return {?}
     */
    toJson() {
        return super.toJson();
    }
}
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
PopupMenuComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: IterableDiffers },
    { type: ContextMenuService },
    { type: Renderer2 }
];
PopupMenuComponent.propDecorators = {
    idName: [{ type: Input }],
    dropdown: [{ type: ViewChild, args: ["myDropdown", { read: BsDropdownDirective },] }],
    dropdownContainer: [{ type: ViewChild, args: ["bsDropdownContainer", { read: ElementRef },] }],
    menuItems: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3BvcHVwLW1lbnUvcG9wdXAtbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFFBQVEsRUFDUixVQUFVLEVBR1YsS0FBSyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsZUFBZSxFQUVmLFNBQVMsRUFFVCxpQkFBaUIsRUFDakIsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQVlqRCxNQUFNLHlCQUEwQixTQUFRLGFBQWE7Ozs7Ozs7Ozs7O0lBMkJuRCxZQUMwQixNQUFxQixFQUM3QyxjQUE4QixFQUM5QixVQUFzQixFQUNkLElBQ1IsT0FBd0IsRUFDaEIsa0JBQ1IsUUFBbUI7UUFFbkIsS0FBSyxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBTDVDLE9BQUUsR0FBRixFQUFFO1FBRUYscUJBQWdCLEdBQWhCLGdCQUFnQjt5QkE1QlksRUFBRTsrQkFFTSxJQUFJO3VCQUV2QixLQUFLO1FBNkI5QixJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFakQsSUFBSSxDQUFD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bkcsT0FBTztTQUNSO1FBRUQsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDdEU7Ozs7Ozs7SUFPRCxZQUFZLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDbkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN0Qzs7Ozs7O0lBTUQsWUFBWSxDQUFDLElBQVk7UUFDdkIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEM7Ozs7SUFFRCxNQUFNO1FBQ0osT0FBTyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDdkI7OztZQTFMRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsOG9DQUEwQztnQkFFMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7OztZQXJCUSxhQUFhLHVCQWtEakIsUUFBUSxZQUFJLFFBQVE7WUFqRGhCLGNBQWM7WUFmckIsVUFBVTtZQUtWLGlCQUFpQjtZQUVqQixlQUFlO1lBV1Isa0JBQWtCO1lBTnpCLFNBQVM7OztxQkF5QlIsS0FBSzt1QkFDTCxTQUFTLFNBQUMsWUFBWSxFQUFFLEVBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFDO2dDQUNuRCxTQUFTLFNBQUMscUJBQXFCLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDO3dCQUVuRCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG4gIEVsZW1lbnRSZWYsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBJbnB1dCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEb0NoZWNrLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBWaWV3Q2hpbGQsXG4gIENvbnRlbnRDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVudUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL21lbnUtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICcuL21lbnUtaXRlbSc7XG5pbXBvcnQgeyBDb250ZXh0TWVudVNlcnZpY2UgfSBmcm9tICcuL2NvbnRleHQtbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IEJzRHJvcGRvd25EaXJlY3RpdmUgfSBmcm9tICduZ3gtYm9vdHN0cmFwJztcbmltcG9ydCB7IE1lbnVJdGVtQnVpbGRlciB9IGZyb20gJy4vbWVudS1pdGVtLWJ1aWxkZXInO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBDbGllbnRFdmVudCB9IGZyb20gJy4uL2V2ZW50LWhhbmRsZXIvY2xpZW50LWV2ZW50JztcbmltcG9ydCB7IEFwcFV0aWxzIH0gZnJvbSAnLi4vYmFzZS9hcHAtdXRpbHMnO1xuaW1wb3J0IHsgVWlEb2N1bWVudCB9IGZyb20gJy4uL2Jhc2UvdWktZG9jdW1lbnQnO1xuXG4vKipcbiAqIENsYXNzIGZvciBwb3B1cCBtZW51IGNvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2dC1wb3B1cC1tZW51LXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vcG9wdXAtbWVudS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BvcHVwLW1lbnUuY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBQb3B1cE1lbnVDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjayB7XG4gIEBJbnB1dCgpIHByaXZhdGUgaWROYW1lOiBzdHJpbmc7IC8vRE8gTk9UIHVzZWQsIGV4aXN0cyBmb3IgYmFkIHVzYWdlXG4gIEBWaWV3Q2hpbGQoXCJteURyb3Bkb3duXCIsIHtyZWFkOiBCc0Ryb3Bkb3duRGlyZWN0aXZlfSkgZHJvcGRvd246IEJzRHJvcGRvd25EaXJlY3RpdmU7XG4gIEBWaWV3Q2hpbGQoXCJic0Ryb3Bkb3duQ29udGFpbmVyXCIsIHtyZWFkOiBFbGVtZW50UmVmfSkgZHJvcGRvd25Db250YWluZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIEBJbnB1dCgpIG1lbnVJdGVtczogQXJyYXk8TWVudUl0ZW0+ID0gW107XG5cbiAgcHJpdmF0ZSBtZW51SXRlbXNEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHt9PiA9IG51bGw7XG5cbiAgcHJpdmF0ZSBpc1Nob3duOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IGhhc01lbnVJdGVtcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tZW51SXRlbXMgIT0gbnVsbCAmJiB0aGlzLm1lbnVJdGVtcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgb25Eb2N1bWVudENsaWNrOiAoZXZlbnQpPT52b2lkO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcGFyZW50IHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gc2Vzc2lvblNlcnZpY2Ugc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBlbGVtZW50UmVmIHNlZSBbW0Jhc2VDb21wb25lbnRdXSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY2QgQ2hhbmdlIGRldGVjdG9yXG4gICAqIEBwYXJhbSBkaWZmZXJzXG4gICAqIEBwYXJhbSBwb3B1cE1lbnVTZXJ2aWNlXG4gICAqIEBwYXJhbSByZW5kZXJlciBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudDogQmFzZUNvbXBvbmVudCxcbiAgICBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgcHJpdmF0ZSBwb3B1cE1lbnVTZXJ2aWNlOiBDb250ZXh0TWVudVNlcnZpY2UsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG5cbiAgICB0aGlzLm1lbnVJdGVtc0RpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG5cbiAgICB0aGlzLm9uRG9jdW1lbnRDbGljayA9IChldmVudCk9PntcbiAgICAgIHRoaXMuaGFuZGxlRG9jdW1lbnRDbGljayhldmVudCk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uRG9jdW1lbnRDbGljaywgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogRG8gY2hlY2sgbGlmZWN5Y2xlXG4gICAqL1xuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMubWVudUl0ZW1zRGlmZmVyLmRpZmYodGhpcy5tZW51SXRlbXMpKSB7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGluaXQgbGlmZWN5Y2xlLiBUcmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gYW5kIHNob3cgdGhpcyBjb21wb25lbnRcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcblxuICAgIFVpRG9jdW1lbnQucmVnaXN0ZXJNZW51SXRlbUVsZW1lbnQodGhpcy5nZXRJZCgpLCB0aGlzIGFzIGFueSk7XG5cbiAgICBjb25zdCB0bSA9IHNldFRpbWVvdXQoKCk9PntcbiAgICAgIGNsZWFyVGltZW91dCh0bSk7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGxpZmVjeWNsZS4gUmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBhbmQgcmVtb3ZlIGRyb3Bkb3duIGVsZW1lbnRzXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuXG4gICAgVWlEb2N1bWVudC51bnJlZ2lzdGVyTWVudUl0ZW1FbGVtZW50KHRoaXMuZ2V0SWQoKSk7XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkRvY3VtZW50Q2xpY2ssIHRydWUpO1xuICAgIHRoaXMuZHJvcGRvd25Db250YWluZXIgPSBudWxsO1xuICAgIHRoaXMuZHJvcGRvd24gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgdGhlIHBvcHVwIGJ5IHNldHRpbmcgQ1NTIHBvc2l0aW9uIHRvIG9uIHNjcmVlblxuICAgKi9cbiAgcHJpdmF0ZSBzaG93KCkge1xuICAgIHRoaXMucG9wdXBNZW51U2VydmljZS5zZXRBY3RpdmVNZW51KHRoaXMuaWQpO1xuXG4gICAgaWYgKHRoaXMuZHJvcGRvd24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5kcm9wZG93bi5zaG93KCk7XG4gICAgICB0aGlzLmlzU2hvd24gPSB0cnVlO1xuICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmdldFNlc3Npb24oKS5nZXRNb3VzZVBvc2l0aW9uKCk7XG5cbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsICYmIHRoaXMuZHJvcGRvd25Db250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJvcGRvd25Db250YWluZXIubmF0aXZlRWxlbWVudCwgXCJsZWZ0XCIsIHBvc2l0aW9uLnggKyBcInB4XCIpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJvcGRvd25Db250YWluZXIubmF0aXZlRWxlbWVudCwgXCJ0b3BcIiwgcG9zaXRpb24ueSArIFwicHhcIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhpZGUgdGhlIHBvcHVwIG1lbnVcbiAgICovXG4gIHByaXZhdGUgaGlkZSgpIHtcbiAgICB0aGlzLmRyb3Bkb3duLmhpZGUoKTtcbiAgICB0aGlzLmlzU2hvd24gPSBmYWxzZTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMucG9wdXBNZW51U2VydmljZS5zZXRBY3RpdmVNZW51KG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgZm9yIG1vdXNlIGNsaWNrXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgaGFuZGxlRG9jdW1lbnRDbGljayhldmVudDogTW91c2VFdmVudCl7XG4gICAgaWYgKHRoaXMuaXNTaG93biA9PT0gdHJ1ZSAmJiAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBbW2NkXV0gKENoYW5nZSBkZXRlY3RvcikgcHJvcGVydHlcbiAgICovXG4gIGdldENoYW5nZURldGVjdG9yKCkge1xuICAgIHJldHVybiB0aGlzLmNkO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgdGhhdCBoaWRlcyBhbGwgb3RoZXIgcG9wdXAgbWVudXMgYW5kIGRpc3BsYXlzIHRoaXMgb25lXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgZGlzcFN1Ym1lbnUoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRUYXJnZXQ6IGFueSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3QgY3VycmVudENoaWxkcmVuOiBBcnJheTxhbnk+ID0gY3VycmVudFRhcmdldC5jaGlsZHJlbjtcbiAgICBjb25zdCBwYXJlbnRDaGlsZHJlbjogQXJyYXk8YW55PiA9IGN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5jaGlsZHJlbjtcblxuICAgIGZvcihsZXQgaSA9IDAsIGxlbiA9IHBhcmVudENoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgIGlmKHBhcmVudENoaWxkcmVuW2ldICE9PSB1bmRlZmluZWQpe1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHBhcmVudENoaWxkcmVuW2ldLCBcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmZmZmXCIpO1xuICAgICAgfVxuICAgICAgaWYocGFyZW50Q2hpbGRyZW5baV0uY2hpbGRyZW5bMV0gPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwYXJlbnRDaGlsZHJlbltpXS5jaGlsZHJlblsxXS5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cC1zdWItbWVudS1kaXNwbGF5Jyk7XG4gICAgfVxuXG4gICAgaWYoY3VycmVudENoaWxkcmVuWzFdID09PSB1bmRlZmluZWRcbiAgICAgICAgfHwgKGN1cnJlbnRDaGlsZHJlblswXSAhPT0gdW5kZWZpbmVkICYmICFjdXJyZW50Q2hpbGRyZW5bMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi1pdGVtJykpKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjdXJyZW50Q2hpbGRyZW5bMV0uY2xhc3NMaXN0LmFkZCgncG9wdXAtc3ViLW1lbnUtZGlzcGxheScpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY3VycmVudFRhcmdldCwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2Y1ZGU5MlwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYW4gYXR0cmlidXRlIHdpdGggdmFsdWUgb24gdGhlIG1lbnUgaXRlbVxuICAgKiBAcGFyYW0gbmFtZSBBdHRyaWJ1dGUgbmFtZVxuICAgKiBAcGFyYW0gdmFsdWUgQXR0cmlidXRlIHZhbHVlXG4gICAqL1xuICBzZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5zZXRDdXN0b21BdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdmFsdWUgb2YgYW4gYXR0cmlidXRlIGJ5IG5hbWVcbiAgICogQHBhcmFtIG5hbWUgQXR0cmlidXRlIG5hbWVcbiAgICovXG4gIGdldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXN0b21BdHRyaWJ1dGUobmFtZSk7XG4gIH1cblxuICB0b0pzb24oKSB7XG4gICAgcmV0dXJuIHN1cGVyLnRvSnNvbigpO1xuICB9XG59XG4iXX0=