/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, ChangeDetectionStrategy, ContentChildren, ViewChildren, QueryList, SkipSelf, Optional, EventEmitter, Output, Input, ChangeDetectorRef, Renderer2, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { TabComponent } from './tab/tab.component';
import * as _ from "lodash";
/** @typedef {?} */
var TabPlacement;
/**
 * Class for tab pane container component
 */
export class TabPaneComponent extends BaseComponent {
    /**
     *
     * @param {?} parent see [[BaseComponent]] constructor
     * @param {?} sessionService see [[BaseComponent]] constructor
     * @param {?} elementRef see [[BaseComponent]] constructor
     * @param {?} cd Inject change detector
     * @param {?} renderer see [[BaseComponent]] constructor
     */
    constructor(parent, sessionService, elementRef, cd, renderer) {
        super(parent, sessionService, elementRef, renderer);
        this.cd = cd;
        this.tabPlacement = "top";
        this.onClick = new EventEmitter();
        this.selectedTabIndex = 0;
        this.focusedTabIndex = 0;
        this.tabs = [];
    }
    /**
     * @param {?} tabList
     * @return {?}
     */
    set tabsList(tabList) {
        this.tabs = tabList.toArray();
    }
    /**
     * After view init lifecycle. Set up tabs and trigger change detector
     * @return {?}
     */
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.configureTabs();
        this.cd.detectChanges();
    }
    /**
     * Set the [[selectedTabIndex]] to index of active tab
     * @return {?}
     */
    configureTabs() {
        _.forEach(this.tabs, (tab, index) => {
            if (tab.active === true) {
                this.selectedTabIndex = index;
            }
        });
    }
    /**
     * Event handler for when tab is selected
     * \@event onCommand
     * @param {?} event
     * @param {?} index Index of tab to select
     * @param {?} tabId
     * @return {?}
     */
    handleSelectTab(event, index, tabId) {
        event.preventDefault();
        this.setFocusedTab(index);
        this.selectedTabIndex = index;
        // this.onClick.emit({
        //   tabId: tabId,
        //   tabIndex: index
        // });
        this.selectedTab.onCommand.emit(tabId);
        this.markForCheck();
        /** @type {?} */
        const parentView = this.getParentView();
        if (parentView != null) {
            parentView.resetAllScrollPanesPositionToPrevious();
        }
    }
    /**
     * Event handler for keydown event. Arrow keys used for navigation
     * @param {?} e Key event
     * @return {?}
     */
    handleKeydown(e) {
        if (!document.activeElement.className.includes("combobox-input-box") && !document.activeElement.className.includes("dropdown-item")) {
            /** @type {?} */
            const UP_KEY_CODE = 38;
            /** @type {?} */
            const DOWN_KEY_CODE = 40;
            /** @type {?} */
            const ENTER_KEY_CODE = 13;
            /** @type {?} */
            const keyPressed = e.which;
            /** @type {?} */
            const navigationKeys = [UP_KEY_CODE, DOWN_KEY_CODE, ENTER_KEY_CODE];
            if (navigationKeys.indexOf(keyPressed) === -1)
                return;
            e.stopPropagation();
            /** @type {?} */
            let newIndex;
            if (keyPressed === DOWN_KEY_CODE && this.focusedTabIndex < this.tabs.length - 1) {
                newIndex = this.focusedTabIndex + 1;
            }
            else if (keyPressed === UP_KEY_CODE && this.focusedTabIndex > 0) {
                newIndex = this.focusedTabIndex - 1;
            }
            else if (keyPressed === ENTER_KEY_CODE) {
                this.setSelectedTab(this.focusedTabIndex);
            }
            else {
                newIndex = this.focusedTabIndex;
            }
            this.setFocusedTab(newIndex);
        }
    }
    /**
     * Focus a tab by it's index position
     * @param {?} index Index of tab to focus
     * @return {?}
     */
    setFocusedTab(index) {
        this.focusedTabIndex = index;
        /** @type {?} */
        const tabItem = this.tabNavItems.find((item, i) => {
            return i === index;
        });
        if (tabItem) {
            setTimeout(() => {
                tabItem.nativeElement.focus();
            }, 0);
        }
    }
    /**
     * Set selected tab by index or id
     * @param {?} index Index or Id of [[TabComponent]] to select
     * @return {?}
     */
    setSelectedTab(index) {
        if (typeof index === "number") {
            this.selectedTabIndex = index;
        }
        else {
            /** @type {?} */
            const tempIndex = _.findIndex(this.tabs, (tab) => tab.id === index);
            if (tempIndex >= 0) {
                this.selectedTabIndex = tempIndex;
            }
        }
        this.markForCheck();
    }
    /**
     * Get the selected [[TabComponent]]
     * @return {?} Tab that is selected
     */
    get selectedTab() {
        return this.tabs.find((item, index) => index === this.selectedTabIndex);
    }
    /**
     * Get NexaWeb tag name
     * @return {?} Name of tag
     */
    getNxTagName() {
        return "tabPane";
    }
    /**
     * Get [[cd]] (ChangeDetector) member
     * @return {?}
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Remove a tab child from the pane
     * @param {?} child Tab to remove
     * @return {?}
     */
    removeChild(child) {
        super.removeChild(child);
        this.tabs = _.filter(this.tabs, (tab) => tab.id !== child.id);
        this.cd.markForCheck();
    }
    /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata
     */
    toJson() {
        /** @type {?} */
        const json = super.toJson();
        json["selectedTabIndex"] = this.selectedTabIndex;
        return json;
    }
    /**
     * Check if this is a container component
     * @return {?} True
     */
    isContainer() {
        return true;
    }
}
TabPaneComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-tab-pane',
                template: "<div\n  class=\"vt-tab-pane {{cssClass}}\"\n  [ngClass]=\"{'tabs-left': tabPlacement === 'left'}\"\n  [id]=\"id\" (contextmenu)=\"handleOnContextMenu($event)\"\n  (keydown)=\"handleKeydown($event)\"\n  [style.height]=\"controlHeight\"\n  >\n  <!-- Tab Navigation --->\n  <ul class=\"nav nav-tabs\" role=\"tablist\">\n    <li #tabNavItem *ngFor=\"let tab of tabs; let i=index\" [ngClass]=\"{'active': selectedTabIndex === i}\" role=\"presentation\" tabindex=\"-1\">\n      <a id=\"{{tab.id}}-title\" href=\"javascript:void(0)\" [ngClass]=\"{'active': tab.active, 'focused': focusedTabIndex === i}\" role=\"tab\" (click)=\"handleSelectTab($event, i, tab.id)\" tabindex=\"-1\">{{tab.text}}</a>\n    </li>\n  </ul>\n\n  <!-- Tab Content -->\n  <div class=\"tab-content\" [style.height]=\"controlHeight\">\n    <ng-template [ngIf]=\"selectedTab != null\">\n      <div role=\"tabpanel\" class=\"vt-tab tabpane {{selectedTab.cssClass}}\" [id]=\"selectedTab.id\" [style.height]=\"controlHeight\">\n          <ng-container *ngTemplateOutlet=\"selectedTab.content\"></ng-container>\n      </div>\n    </ng-template>\n  </div>\n\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => TabPaneComponent)
                    }
                ],
                styles: [".tabs-below>.nav-tabs,.tabs-left>.nav-tabs,.tabs-right>.nav-tabs{border-bottom:0}.pill-content>.pill-pane,.tab-content>.tab-pane{display:none}.pill-content>.active,.tab-content>.active{display:block}.tabs-below>.nav-tabs{border-top:1px solid #ddd}.tabs-below>.nav-tabs>li{margin-top:-1px;margin-bottom:0}.tabs-below>.nav-tabs>li>a{border-radius:0 0 4px 4px}.tabs-below>.nav-tabs>li>a:focus,.tabs-below>.nav-tabs>li>a:hover{border-top-color:#ddd;border-bottom-color:transparent}.tabs-below>.nav-tabs>.active>a,.tabs-below>.nav-tabs>.active>a:focus,.tabs-below>.nav-tabs>.active>a:hover{border-color:transparent #ddd #ddd}.tabs-left>.nav-tabs>li,.tabs-right>.nav-tabs>li{float:none}.tabs-left>.nav-tabs>li>a,.tabs-right>.nav-tabs>li>a{min-width:74px;margin-right:0;margin-bottom:3px}.tabs-left>.nav-tabs{float:left;margin-right:19px;border-right:1px solid #ddd}.tabs-left>.nav-tabs>li>a{margin-right:-1px;border-radius:4px 0 0 4px}.tabs-left>.nav-tabs>li>a:focus,.tabs-left>.nav-tabs>li>a:hover{border-color:#9abecb #aaa #9abecb #9abecb}.tabs-left>.nav-tabs .active>a,.tabs-left>.nav-tabs .active>a:focus,.tabs-left>.nav-tabs .active>a:hover{border-color:#aaa transparent #aaa #aaa}.tabs-right>.nav-tabs{float:right;margin-left:19px;border-left:1px solid #ddd}.tabs-right>.nav-tabs>li>a{margin-left:-1px;border-radius:0 4px 4px 0}.tabs-right>.nav-tabs>li>a:focus,.tabs-right>.nav-tabs>li>a:hover{border-color:#eee #eee #eee #ddd}.tabs-right>.nav-tabs .active>a,.tabs-right>.nav-tabs .active>a:focus,.tabs-right>.nav-tabs .active>a:hover{border-color:#ddd #ddd #ddd transparent}"]
            }] }
];
/** @nocollapse */
TabPaneComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
TabPaneComponent.propDecorators = {
    tabPlacement: [{ type: Input }],
    tabsList: [{ type: ContentChildren, args: [TabComponent,] }],
    tabNavItems: [{ type: ViewChildren, args: ['tabNavItem',] }],
    onClick: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    TabPaneComponent.prototype.tabPlacement;
    /** @type {?} */
    TabPaneComponent.prototype.tabNavItems;
    /** @type {?} */
    TabPaneComponent.prototype.onClick;
    /** @type {?} */
    TabPaneComponent.prototype.selectedTabIndex;
    /** @type {?} */
    TabPaneComponent.prototype.focusedTabIndex;
    /** @type {?} */
    TabPaneComponent.prototype.tabs;
    /** @type {?} */
    TabPaneComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLXBhbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy90YWItcGFuZS90YWItcGFuZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLHVCQUF1QixFQUN2QixlQUFlLEVBRWYsWUFBWSxFQUVaLFNBQVMsRUFDVCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR25ELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7QUFtQjVCLE1BQU0sdUJBQXdCLFNBQVEsYUFBYTs7Ozs7Ozs7O0lBcUJqRCxZQUMwQixNQUFxQixFQUM3QyxjQUE4QixFQUM5QixVQUFzQixFQUNkLElBQ1IsUUFBbUI7UUFFbkIsS0FBSyxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBSDVDLE9BQUUsR0FBRixFQUFFOzRCQXhCMEIsS0FBSzt1QkFNQyxJQUFJLFlBQVksRUFBWTtnQ0FFN0MsQ0FBQzsrQkFDRixDQUFDO29CQUNDLEVBQUU7S0FrQjdCOzs7OztJQTNCRCxJQUFtQyxRQUFRLENBQUMsT0FBZ0M7UUFDMUUsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDL0I7Ozs7O0lBOEJELGVBQWU7UUFDYixLQUFLLENBQUMsZUFBZSxF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LFlBQVksRUFBRSxDQUFDO0tBQ3hCOzs7OztJQU1ELE1BQU07O1FBQ0osTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUVqRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7OztJQU1TLFdBQVc7UUFDbkIsT0FBTyxJQUFJLENBQUM7S0FDYjs7O1lBck5GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsbW5DQUF3QztnQkFFeEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFFLEVBQUUsQ0FBQSxnQkFBZ0IsQ0FBQztxQkFDOUM7aUJBQ0Y7O2FBQ0Y7Ozs7WUF2QlEsYUFBYSx1QkE4Q2pCLFFBQVEsWUFBSSxRQUFRO1lBN0NoQixjQUFjO1lBbEJyQixVQUFVO1lBWVYsaUJBQWlCO1lBQ2pCLFNBQVM7OzsyQkE2QlIsS0FBSzt1QkFDTCxlQUFlLFNBQUMsWUFBWTswQkFHNUIsWUFBWSxTQUFDLFlBQVk7c0JBRXpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBRdWVyeUxpc3QsXG4gIFNraXBTZWxmLFxuICBPcHRpb25hbCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIElucHV0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgUmVuZGVyZXIyLFxuICBmb3J3YXJkUmVmLFxuICBDb250ZW50Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRhYkNvbXBvbmVudCB9IGZyb20gJy4vdGFiL3RhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFiRXZlbnQgfSBmcm9tICcuL3RhYi1ldmVudCc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuXG50eXBlIFRhYlBsYWNlbWVudCA9IFwibGVmdFwiIHwgXCJ0b3BcIiB8IFwiYm90dG9tXCIgfCBcInJpZ2h0XCI7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHRhYiBwYW5lIGNvbnRhaW5lciBjb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtdGFiLXBhbmUnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFiLXBhbmUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWItcGFuZS5jb21wb25lbnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBCYXNlQ29tcG9uZW50LFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCk9PlRhYlBhbmVDb21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRhYlBhbmVDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgQElucHV0KCkgdGFiUGxhY2VtZW50OiBUYWJQbGFjZW1lbnQgPSBcInRvcFwiO1xuICBAQ29udGVudENoaWxkcmVuKFRhYkNvbXBvbmVudCkgc2V0IHRhYnNMaXN0KHRhYkxpc3Q6IFF1ZXJ5TGlzdDxUYWJDb21wb25lbnQ+KSB7XG4gICAgdGhpcy50YWJzID0gdGFiTGlzdC50b0FycmF5KCk7XG4gIH1cbiAgQFZpZXdDaGlsZHJlbigndGFiTmF2SXRlbScpIHRhYk5hdkl0ZW1zOiBBcnJheTxFbGVtZW50UmVmPjtcblxuICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPFRhYkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFiRXZlbnQ+KCk7XG5cbiAgc2VsZWN0ZWRUYWJJbmRleDogbnVtYmVyID0gMDtcbiAgZm9jdXNlZFRhYkluZGV4OiBudW1iZXIgPSAwO1xuICB0YWJzOiBBcnJheTxUYWJDb21wb25lbnQ+ID0gW107XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwYXJlbnQgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBzZXNzaW9uU2VydmljZSBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGVsZW1lbnRSZWYgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjZCBJbmplY3QgY2hhbmdlIGRldGVjdG9yXG4gICAqIEBwYXJhbSByZW5kZXJlciBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudDogQmFzZUNvbXBvbmVudCxcbiAgICBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHN1cGVyKHBhcmVudCwgc2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWYsIHJlbmRlcmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGluaXQgbGlmZWN5Y2xlLiBTZXQgdXAgdGFicyBhbmQgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0b3JcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcblxuICAgIHRoaXMuY29uZmlndXJlVGFicygpO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCB0aGUgW1tzZWxlY3RlZFRhYkluZGV4XV0gdG8gaW5kZXggb2YgYWN0aXZlIHRhYlxuICAgKi9cbiAgcHJpdmF0ZSBjb25maWd1cmVUYWJzKCkge1xuICAgIF8uZm9yRWFjaCh0aGlzLnRhYnMsICh0YWIsIGluZGV4KT0+e1xuICAgICAgaWYgKHRhYi5hY3RpdmUgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYkluZGV4ID0gaW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3Igd2hlbiB0YWIgaXMgc2VsZWN0ZWRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSBpbmRleCBJbmRleCBvZiB0YWIgdG8gc2VsZWN0XG4gICAqIEBwYXJhbSB0YWJJZFxuICAgKiBAZXZlbnQgb25Db21tYW5kXG4gICAqL1xuICBoYW5kbGVTZWxlY3RUYWIoZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyLCB0YWJJZDogc3RyaW5nKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnNldEZvY3VzZWRUYWIoaW5kZXgpO1xuICAgIHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA9IGluZGV4O1xuICAgIC8vIHRoaXMub25DbGljay5lbWl0KHtcbiAgICAvLyAgIHRhYklkOiB0YWJJZCxcbiAgICAvLyAgIHRhYkluZGV4OiBpbmRleFxuICAgIC8vIH0pO1xuICAgIHRoaXMuc2VsZWN0ZWRUYWIub25Db21tYW5kLmVtaXQodGFiSWQpO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG5cbiAgICBjb25zdCBwYXJlbnRWaWV3ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XG5cbiAgICBpZiAocGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICBwYXJlbnRWaWV3LnJlc2V0QWxsU2Nyb2xsUGFuZXNQb3NpdGlvblRvUHJldmlvdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3Iga2V5ZG93biBldmVudC4gQXJyb3cga2V5cyB1c2VkIGZvciBuYXZpZ2F0aW9uXG4gICAqIEBwYXJhbSBlIEtleSBldmVudFxuICAgKi9cbiAgaGFuZGxlS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50LmNsYXNzTmFtZS5pbmNsdWRlcyhcImNvbWJvYm94LWlucHV0LWJveFwiKSAmJiAhZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc05hbWUuaW5jbHVkZXMoXCJkcm9wZG93bi1pdGVtXCIpKSB7XG4gICAgICAvKiBBbGxvdyB0YWIgbmF2aWdhdGlvbiB2aWEgYXJyb3cga2V5czogaHR0cHM6Ly9naXRodWIuY29tL3dlYXZlaW8vbmduc29waGlhL2lzc3Vlcy8xNDY1ICovXG4gICAgICBjb25zdCBVUF9LRVlfQ09ERSA9IDM4O1xuICAgICAgY29uc3QgRE9XTl9LRVlfQ09ERSA9IDQwO1xuICAgICAgY29uc3QgRU5URVJfS0VZX0NPREUgPSAxMztcbiAgICAgIGNvbnN0IGtleVByZXNzZWQgPSBlLndoaWNoO1xuICBcbiAgICAgIC8vIElnbm9yZSBhbGwga2V5cyBleGNlcHQgdXAvZG93biBvciBFTlRFUlxuICAgICAgY29uc3QgbmF2aWdhdGlvbktleXMgPSBbVVBfS0VZX0NPREUsIERPV05fS0VZX0NPREUsIEVOVEVSX0tFWV9DT0RFXTtcbiAgICAgIGlmIChuYXZpZ2F0aW9uS2V5cy5pbmRleE9mKGtleVByZXNzZWQpID09PSAtMSkgcmV0dXJuO1xuICBcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIFxuICAgICAgbGV0IG5ld0luZGV4OiBudW1iZXI7XG4gIFxuICAgICAgaWYoa2V5UHJlc3NlZCA9PT0gRE9XTl9LRVlfQ09ERSAmJiB0aGlzLmZvY3VzZWRUYWJJbmRleCA8IHRoaXMudGFicy5sZW5ndGggLSAxKSB7XG4gICAgICAgIG5ld0luZGV4ID0gdGhpcy5mb2N1c2VkVGFiSW5kZXggKyAxO1xuICAgICAgfSBlbHNlIGlmKGtleVByZXNzZWQgPT09IFVQX0tFWV9DT0RFICYmIHRoaXMuZm9jdXNlZFRhYkluZGV4ID4gMCkge1xuICAgICAgICBuZXdJbmRleCA9IHRoaXMuZm9jdXNlZFRhYkluZGV4IC0gMTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5UHJlc3NlZCA9PT0gRU5URVJfS0VZX0NPREUpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZFRhYih0aGlzLmZvY3VzZWRUYWJJbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdJbmRleCA9IHRoaXMuZm9jdXNlZFRhYkluZGV4O1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRGb2N1c2VkVGFiKG5ld0luZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRm9jdXMgYSB0YWIgYnkgaXQncyBpbmRleCBwb3NpdGlvblxuICAgKiBAcGFyYW0gaW5kZXggSW5kZXggb2YgdGFiIHRvIGZvY3VzXG4gICAqL1xuICBzZXRGb2N1c2VkVGFiKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmZvY3VzZWRUYWJJbmRleCA9IGluZGV4O1xuICAgIGNvbnN0IHRhYkl0ZW0gPSB0aGlzLnRhYk5hdkl0ZW1zLmZpbmQoKGl0ZW0sIGkpPT4ge1xuICAgICAgcmV0dXJuIGkgPT09IGluZGV4O1xuICAgIH0pO1xuXG4gICAgaWYgKHRhYkl0ZW0pIHtcbiAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgdGFiSXRlbS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0IHNlbGVjdGVkIHRhYiBieSBpbmRleCBvciBpZFxuICAgKiBAcGFyYW0gaW5kZXggSW5kZXggb3IgSWQgb2YgW1tUYWJDb21wb25lbnRdXSB0byBzZWxlY3RcbiAgICovXG4gIHNldFNlbGVjdGVkVGFiKGluZGV4OiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIGluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVGFiSW5kZXggPSBpbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9zZWxlY3RlZCB0YWIgYnkgbmFtZT9cbiAgICAgIGNvbnN0IHRlbXBJbmRleCA9IF8uZmluZEluZGV4KHRoaXMudGFicywgKHRhYjogVGFiQ29tcG9uZW50KT0+dGFiLmlkID09PSBpbmRleCk7XG5cbiAgICAgIGlmICh0ZW1wSW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiSW5kZXggPSB0ZW1wSW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNlbGVjdGVkIFtbVGFiQ29tcG9uZW50XV1cbiAgICogQHJldHVybnMgVGFiIHRoYXQgaXMgc2VsZWN0ZWRcbiAgICovXG4gIGdldCBzZWxlY3RlZFRhYigpOiBUYWJDb21wb25lbnQge1xuICAgIHJldHVybiB0aGlzLnRhYnMuZmluZCgoaXRlbSwgaW5kZXgpPT5pbmRleCA9PT0gdGhpcy5zZWxlY3RlZFRhYkluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgTmV4YVdlYiB0YWcgbmFtZVxuICAgKiBAcmV0dXJucyBOYW1lIG9mIHRhZ1xuICAgKi9cbiAgcHJvdGVjdGVkIGdldE54VGFnTmFtZSgpIHtcbiAgICByZXR1cm4gXCJ0YWJQYW5lXCI7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbY2RdXSAoQ2hhbmdlRGV0ZWN0b3IpIG1lbWJlclxuICAgKi9cbiAgZ2V0Q2hhbmdlRGV0ZWN0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2Q7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgdGFiIGNoaWxkIGZyb20gdGhlIHBhbmVcbiAgICogQHBhcmFtIGNoaWxkIFRhYiB0byByZW1vdmVcbiAgICovXG4gIHJlbW92ZUNoaWxkKGNoaWxkOiBUYWJDb21wb25lbnQpIHtcbiAgICBzdXBlci5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgdGhpcy50YWJzID0gXy5maWx0ZXIodGhpcy50YWJzLCAodGFiKT0+dGFiLmlkICE9PSBjaGlsZC5pZCk7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyBPYmplY3QgSlNPTiBtZXRhZGF0YVxuICAgKi9cbiAgdG9Kc29uKCkge1xuICAgIGNvbnN0IGpzb24gPSBzdXBlci50b0pzb24oKTtcbiAgICBqc29uW1wic2VsZWN0ZWRUYWJJbmRleFwiXSA9IHRoaXMuc2VsZWN0ZWRUYWJJbmRleDtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgaXMgYSBjb250YWluZXIgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIFRydWVcbiAgICovXG4gIHByb3RlY3RlZCBpc0NvbnRhaW5lcigpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19