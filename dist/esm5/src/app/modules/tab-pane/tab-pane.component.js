/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var TabPaneComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TabPaneComponent, _super);
    /**
     *
     * @param parent see [[BaseComponent]] constructor
     * @param sessionService see [[BaseComponent]] constructor
     * @param elementRef see [[BaseComponent]] constructor
     * @param cd Inject change detector
     * @param renderer see [[BaseComponent]] constructor
     */
    function TabPaneComponent(parent, sessionService, elementRef, cd, renderer) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.cd = cd;
        _this.tabPlacement = "top";
        _this.onClick = new EventEmitter();
        _this.selectedTabIndex = 0;
        _this.focusedTabIndex = 0;
        _this.tabs = [];
        return _this;
    }
    Object.defineProperty(TabPaneComponent.prototype, "tabsList", {
        set: /**
         * @param {?} tabList
         * @return {?}
         */
        function (tabList) {
            this.tabs = tabList.toArray();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After view init lifecycle. Set up tabs and trigger change detector
     */
    /**
     * After view init lifecycle. Set up tabs and trigger change detector
     * @return {?}
     */
    TabPaneComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Set up tabs and trigger change detector
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        this.configureTabs();
        this.cd.detectChanges();
    };
    /**
     * Set the [[selectedTabIndex]] to index of active tab
     * @return {?}
     */
    TabPaneComponent.prototype.configureTabs = /**
     * Set the [[selectedTabIndex]] to index of active tab
     * @return {?}
     */
    function () {
        var _this = this;
        _.forEach(this.tabs, function (tab, index) {
            if (tab.active === true) {
                _this.selectedTabIndex = index;
            }
        });
    };
    /* istanbul ignore next */
    /**
     * Event handler for when tab is selected
     * @param event
     * @param index Index of tab to select
     * @param tabId
     * @event onCommand
     */
    /**
     * Event handler for when tab is selected
     * \@event onCommand
     * @param {?} event
     * @param {?} index Index of tab to select
     * @param {?} tabId
     * @return {?}
     */
    TabPaneComponent.prototype.handleSelectTab = /**
     * Event handler for when tab is selected
     * \@event onCommand
     * @param {?} event
     * @param {?} index Index of tab to select
     * @param {?} tabId
     * @return {?}
     */
    function (event, index, tabId) {
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
        var parentView = this.getParentView();
        if (parentView != null) {
            parentView.resetAllScrollPanesPositionToPrevious();
        }
    };
    /* istanbul ignore next */
    /**
     * Event handler for keydown event. Arrow keys used for navigation
     * @param e Key event
     */
    /**
     * Event handler for keydown event. Arrow keys used for navigation
     * @param {?} e Key event
     * @return {?}
     */
    TabPaneComponent.prototype.handleKeydown = /**
     * Event handler for keydown event. Arrow keys used for navigation
     * @param {?} e Key event
     * @return {?}
     */
    function (e) {
        if (!document.activeElement.className.includes("combobox-input-box") && !document.activeElement.className.includes("dropdown-item")) {
            /** @type {?} */
            var UP_KEY_CODE = 38;
            /** @type {?} */
            var DOWN_KEY_CODE = 40;
            /** @type {?} */
            var ENTER_KEY_CODE = 13;
            /** @type {?} */
            var keyPressed = e.which;
            /** @type {?} */
            var navigationKeys = [UP_KEY_CODE, DOWN_KEY_CODE, ENTER_KEY_CODE];
            if (navigationKeys.indexOf(keyPressed) === -1)
                return;
            e.stopPropagation();
            /** @type {?} */
            var newIndex = void 0;
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
    };
    /* istanbul ignore next */
    /**
     * Focus a tab by it's index position
     * @param index Index of tab to focus
     */
    /**
     * Focus a tab by it's index position
     * @param {?} index Index of tab to focus
     * @return {?}
     */
    TabPaneComponent.prototype.setFocusedTab = /**
     * Focus a tab by it's index position
     * @param {?} index Index of tab to focus
     * @return {?}
     */
    function (index) {
        this.focusedTabIndex = index;
        /** @type {?} */
        var tabItem = this.tabNavItems.find(function (item, i) {
            return i === index;
        });
        if (tabItem) {
            setTimeout(function () {
                tabItem.nativeElement.focus();
            }, 0);
        }
    };
    /* istanbul ignore next */
    /**
     * Set selected tab by index or id
     * @param index Index or Id of [[TabComponent]] to select
     */
    /**
     * Set selected tab by index or id
     * @param {?} index Index or Id of [[TabComponent]] to select
     * @return {?}
     */
    TabPaneComponent.prototype.setSelectedTab = /**
     * Set selected tab by index or id
     * @param {?} index Index or Id of [[TabComponent]] to select
     * @return {?}
     */
    function (index) {
        if (typeof index === "number") {
            this.selectedTabIndex = index;
        }
        else {
            /** @type {?} */
            var tempIndex = _.findIndex(this.tabs, function (tab) { return tab.id === index; });
            if (tempIndex >= 0) {
                this.selectedTabIndex = tempIndex;
            }
        }
        this.markForCheck();
    };
    Object.defineProperty(TabPaneComponent.prototype, "selectedTab", {
        /**
         * Get the selected [[TabComponent]]
         * @returns Tab that is selected
         */
        get: /**
         * Get the selected [[TabComponent]]
         * @return {?} Tab that is selected
         */
        function () {
            var _this = this;
            return this.tabs.find(function (item, index) { return index === _this.selectedTabIndex; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get NexaWeb tag name
     * @returns Name of tag
     */
    /**
     * Get NexaWeb tag name
     * @return {?} Name of tag
     */
    TabPaneComponent.prototype.getNxTagName = /**
     * Get NexaWeb tag name
     * @return {?} Name of tag
     */
    function () {
        return "tabPane";
    };
    /**
     * Get [[cd]] (ChangeDetector) member
     */
    /**
     * Get [[cd]] (ChangeDetector) member
     * @return {?}
     */
    TabPaneComponent.prototype.getChangeDetector = /**
     * Get [[cd]] (ChangeDetector) member
     * @return {?}
     */
    function () {
        return this.cd;
    };
    /**
     * Remove a tab child from the pane
     * @param child Tab to remove
     */
    /**
     * Remove a tab child from the pane
     * @param {?} child Tab to remove
     * @return {?}
     */
    TabPaneComponent.prototype.removeChild = /**
     * Remove a tab child from the pane
     * @param {?} child Tab to remove
     * @return {?}
     */
    function (child) {
        _super.prototype.removeChild.call(this, child);
        this.tabs = _.filter(this.tabs, function (tab) { return tab.id !== child.id; });
        this.cd.markForCheck();
    };
    /**
     * Get JSON representation of this component
     * @returns Object JSON metadata
     */
    /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata
     */
    TabPaneComponent.prototype.toJson = /**
     * Get JSON representation of this component
     * @return {?} Object JSON metadata
     */
    function () {
        /** @type {?} */
        var json = _super.prototype.toJson.call(this);
        json["selectedTabIndex"] = this.selectedTabIndex;
        return json;
    };
    /**
     * Check if this is a container component
     * @returns True
     */
    /**
     * Check if this is a container component
     * @return {?} True
     */
    TabPaneComponent.prototype.isContainer = /**
     * Check if this is a container component
     * @return {?} True
     */
    function () {
        return true;
    };
    TabPaneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-tab-pane',
                    template: "<div\n  class=\"vt-tab-pane {{cssClass}}\"\n  [ngClass]=\"{'tabs-left': tabPlacement === 'left'}\"\n  [id]=\"id\" (contextmenu)=\"handleOnContextMenu($event)\"\n  (keydown)=\"handleKeydown($event)\"\n  [style.height]=\"controlHeight\"\n  >\n  <!-- Tab Navigation --->\n  <ul class=\"nav nav-tabs\" role=\"tablist\">\n    <li #tabNavItem *ngFor=\"let tab of tabs; let i=index\" [ngClass]=\"{'active': selectedTabIndex === i}\" role=\"presentation\" tabindex=\"-1\">\n      <a id=\"{{tab.id}}-title\" href=\"javascript:void(0)\" [ngClass]=\"{'active': tab.active, 'focused': focusedTabIndex === i}\" role=\"tab\" (click)=\"handleSelectTab($event, i, tab.id)\" tabindex=\"-1\">{{tab.text}}</a>\n    </li>\n  </ul>\n\n  <!-- Tab Content -->\n  <div class=\"tab-content\" [style.height]=\"controlHeight\">\n    <ng-template [ngIf]=\"selectedTab != null\">\n      <div role=\"tabpanel\" class=\"vt-tab tabpane {{selectedTab.cssClass}}\" [id]=\"selectedTab.id\" [style.height]=\"controlHeight\">\n          <ng-container *ngTemplateOutlet=\"selectedTab.content\"></ng-container>\n      </div>\n    </ng-template>\n  </div>\n\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return TabPaneComponent; })
                        }
                    ],
                    styles: [".tabs-below>.nav-tabs,.tabs-left>.nav-tabs,.tabs-right>.nav-tabs{border-bottom:0}.pill-content>.pill-pane,.tab-content>.tab-pane{display:none}.pill-content>.active,.tab-content>.active{display:block}.tabs-below>.nav-tabs{border-top:1px solid #ddd}.tabs-below>.nav-tabs>li{margin-top:-1px;margin-bottom:0}.tabs-below>.nav-tabs>li>a{border-radius:0 0 4px 4px}.tabs-below>.nav-tabs>li>a:focus,.tabs-below>.nav-tabs>li>a:hover{border-top-color:#ddd;border-bottom-color:transparent}.tabs-below>.nav-tabs>.active>a,.tabs-below>.nav-tabs>.active>a:focus,.tabs-below>.nav-tabs>.active>a:hover{border-color:transparent #ddd #ddd}.tabs-left>.nav-tabs>li,.tabs-right>.nav-tabs>li{float:none}.tabs-left>.nav-tabs>li>a,.tabs-right>.nav-tabs>li>a{min-width:74px;margin-right:0;margin-bottom:3px}.tabs-left>.nav-tabs{float:left;margin-right:19px;border-right:1px solid #ddd}.tabs-left>.nav-tabs>li>a{margin-right:-1px;border-radius:4px 0 0 4px}.tabs-left>.nav-tabs>li>a:focus,.tabs-left>.nav-tabs>li>a:hover{border-color:#9abecb #aaa #9abecb #9abecb}.tabs-left>.nav-tabs .active>a,.tabs-left>.nav-tabs .active>a:focus,.tabs-left>.nav-tabs .active>a:hover{border-color:#aaa transparent #aaa #aaa}.tabs-right>.nav-tabs{float:right;margin-left:19px;border-left:1px solid #ddd}.tabs-right>.nav-tabs>li>a{margin-left:-1px;border-radius:0 4px 4px 0}.tabs-right>.nav-tabs>li>a:focus,.tabs-right>.nav-tabs>li>a:hover{border-color:#eee #eee #eee #ddd}.tabs-right>.nav-tabs .active>a,.tabs-right>.nav-tabs .active>a:focus,.tabs-right>.nav-tabs .active>a:hover{border-color:#ddd #ddd #ddd transparent}"]
                }] }
    ];
    /** @nocollapse */
    TabPaneComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    TabPaneComponent.propDecorators = {
        tabPlacement: [{ type: Input }],
        tabsList: [{ type: ContentChildren, args: [TabComponent,] }],
        tabNavItems: [{ type: ViewChildren, args: ['tabNavItem',] }],
        onClick: [{ type: Output }]
    };
    return TabPaneComponent;
}(BaseComponent));
export { TabPaneComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLXBhbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy90YWItcGFuZS90YWItcGFuZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVix1QkFBdUIsRUFDdkIsZUFBZSxFQUVmLFlBQVksRUFFWixTQUFTLEVBQ1QsUUFBUSxFQUNSLFFBQVEsRUFDUixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFFWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUduRCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7OztJQW1CVSw0Q0FBYTtJQWFqRDs7Ozs7OztPQU9HO0lBQ0gsMEJBQzBCLE1BQXFCLEVBQzdDLGNBQThCLEVBQzlCLFVBQXNCLEVBQ2QsSUFDUixRQUFtQjtRQUxyQixZQU9FLGtCQUFNLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUNwRDtRQUpTLFFBQUUsR0FBRixFQUFFOzZCQXhCMEIsS0FBSzt3QkFNQyxJQUFJLFlBQVksRUFBWTtpQ0FFN0MsQ0FBQztnQ0FDRixDQUFDO3FCQUNDLEVBQUU7O0tBa0I3QjtJQTNCRCxzQkFBbUMsc0NBQVE7Ozs7O1FBQTNDLFVBQTRDLE9BQWdDO1lBQzFFLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQy9COzs7T0FBQTtJQTJCRDs7T0FFRzs7Ozs7SUFDSCwwQ0FB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QUF0QyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBRdWVyeUxpc3QsXG4gIFNraXBTZWxmLFxuICBPcHRpb25hbCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIElucHV0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgUmVuZGVyZXIyLFxuICBmb3J3YXJkUmVmLFxuICBDb250ZW50Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRhYkNvbXBvbmVudCB9IGZyb20gJy4vdGFiL3RhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFiRXZlbnQgfSBmcm9tICcuL3RhYi1ldmVudCc7XG5cbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuXG50eXBlIFRhYlBsYWNlbWVudCA9IFwibGVmdFwiIHwgXCJ0b3BcIiB8IFwiYm90dG9tXCIgfCBcInJpZ2h0XCI7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHRhYiBwYW5lIGNvbnRhaW5lciBjb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtdGFiLXBhbmUnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFiLXBhbmUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWItcGFuZS5jb21wb25lbnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBCYXNlQ29tcG9uZW50LFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCk9PlRhYlBhbmVDb21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRhYlBhbmVDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgQElucHV0KCkgdGFiUGxhY2VtZW50OiBUYWJQbGFjZW1lbnQgPSBcInRvcFwiO1xuICBAQ29udGVudENoaWxkcmVuKFRhYkNvbXBvbmVudCkgc2V0IHRhYnNMaXN0KHRhYkxpc3Q6IFF1ZXJ5TGlzdDxUYWJDb21wb25lbnQ+KSB7XG4gICAgdGhpcy50YWJzID0gdGFiTGlzdC50b0FycmF5KCk7XG4gIH1cbiAgQFZpZXdDaGlsZHJlbigndGFiTmF2SXRlbScpIHRhYk5hdkl0ZW1zOiBBcnJheTxFbGVtZW50UmVmPjtcblxuICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPFRhYkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFiRXZlbnQ+KCk7XG5cbiAgc2VsZWN0ZWRUYWJJbmRleDogbnVtYmVyID0gMDtcbiAgZm9jdXNlZFRhYkluZGV4OiBudW1iZXIgPSAwO1xuICB0YWJzOiBBcnJheTxUYWJDb21wb25lbnQ+ID0gW107XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwYXJlbnQgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBzZXNzaW9uU2VydmljZSBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGVsZW1lbnRSZWYgc2VlIFtbQmFzZUNvbXBvbmVudF1dIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjZCBJbmplY3QgY2hhbmdlIGRldGVjdG9yXG4gICAqIEBwYXJhbSByZW5kZXJlciBzZWUgW1tCYXNlQ29tcG9uZW50XV0gY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudDogQmFzZUNvbXBvbmVudCxcbiAgICBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHN1cGVyKHBhcmVudCwgc2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWYsIHJlbmRlcmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGluaXQgbGlmZWN5Y2xlLiBTZXQgdXAgdGFicyBhbmQgdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0b3JcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcblxuICAgIHRoaXMuY29uZmlndXJlVGFicygpO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCB0aGUgW1tzZWxlY3RlZFRhYkluZGV4XV0gdG8gaW5kZXggb2YgYWN0aXZlIHRhYlxuICAgKi9cbiAgcHJpdmF0ZSBjb25maWd1cmVUYWJzKCkge1xuICAgIF8uZm9yRWFjaCh0aGlzLnRhYnMsICh0YWIsIGluZGV4KT0+e1xuICAgICAgaWYgKHRhYi5hY3RpdmUgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYkluZGV4ID0gaW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3Igd2hlbiB0YWIgaXMgc2VsZWN0ZWRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSBpbmRleCBJbmRleCBvZiB0YWIgdG8gc2VsZWN0XG4gICAqIEBwYXJhbSB0YWJJZFxuICAgKiBAZXZlbnQgb25Db21tYW5kXG4gICAqL1xuICBoYW5kbGVTZWxlY3RUYWIoZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyLCB0YWJJZDogc3RyaW5nKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnNldEZvY3VzZWRUYWIoaW5kZXgpO1xuICAgIHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA9IGluZGV4O1xuICAgIC8vIHRoaXMub25DbGljay5lbWl0KHtcbiAgICAvLyAgIHRhYklkOiB0YWJJZCxcbiAgICAvLyAgIHRhYkluZGV4OiBpbmRleFxuICAgIC8vIH0pO1xuICAgIHRoaXMuc2VsZWN0ZWRUYWIub25Db21tYW5kLmVtaXQodGFiSWQpO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG5cbiAgICBjb25zdCBwYXJlbnRWaWV3ID0gdGhpcy5nZXRQYXJlbnRWaWV3KCk7XG5cbiAgICBpZiAocGFyZW50VmlldyAhPSBudWxsKSB7XG4gICAgICBwYXJlbnRWaWV3LnJlc2V0QWxsU2Nyb2xsUGFuZXNQb3NpdGlvblRvUHJldmlvdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXZlbnQgaGFuZGxlciBmb3Iga2V5ZG93biBldmVudC4gQXJyb3cga2V5cyB1c2VkIGZvciBuYXZpZ2F0aW9uXG4gICAqIEBwYXJhbSBlIEtleSBldmVudFxuICAgKi9cbiAgaGFuZGxlS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50LmNsYXNzTmFtZS5pbmNsdWRlcyhcImNvbWJvYm94LWlucHV0LWJveFwiKSAmJiAhZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc05hbWUuaW5jbHVkZXMoXCJkcm9wZG93bi1pdGVtXCIpKSB7XG4gICAgICAvKiBBbGxvdyB0YWIgbmF2aWdhdGlvbiB2aWEgYXJyb3cga2V5czogaHR0cHM6Ly9naXRodWIuY29tL3dlYXZlaW8vbmduc29waGlhL2lzc3Vlcy8xNDY1ICovXG4gICAgICBjb25zdCBVUF9LRVlfQ09ERSA9IDM4O1xuICAgICAgY29uc3QgRE9XTl9LRVlfQ09ERSA9IDQwO1xuICAgICAgY29uc3QgRU5URVJfS0VZX0NPREUgPSAxMztcbiAgICAgIGNvbnN0IGtleVByZXNzZWQgPSBlLndoaWNoO1xuICBcbiAgICAgIC8vIElnbm9yZSBhbGwga2V5cyBleGNlcHQgdXAvZG93biBvciBFTlRFUlxuICAgICAgY29uc3QgbmF2aWdhdGlvbktleXMgPSBbVVBfS0VZX0NPREUsIERPV05fS0VZX0NPREUsIEVOVEVSX0tFWV9DT0RFXTtcbiAgICAgIGlmIChuYXZpZ2F0aW9uS2V5cy5pbmRleE9mKGtleVByZXNzZWQpID09PSAtMSkgcmV0dXJuO1xuICBcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIFxuICAgICAgbGV0IG5ld0luZGV4OiBudW1iZXI7XG4gIFxuICAgICAgaWYoa2V5UHJlc3NlZCA9PT0gRE9XTl9LRVlfQ09ERSAmJiB0aGlzLmZvY3VzZWRUYWJJbmRleCA8IHRoaXMudGFicy5sZW5ndGggLSAxKSB7XG4gICAgICAgIG5ld0luZGV4ID0gdGhpcy5mb2N1c2VkVGFiSW5kZXggKyAxO1xuICAgICAgfSBlbHNlIGlmKGtleVByZXNzZWQgPT09IFVQX0tFWV9DT0RFICYmIHRoaXMuZm9jdXNlZFRhYkluZGV4ID4gMCkge1xuICAgICAgICBuZXdJbmRleCA9IHRoaXMuZm9jdXNlZFRhYkluZGV4IC0gMTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5UHJlc3NlZCA9PT0gRU5URVJfS0VZX0NPREUpIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZFRhYih0aGlzLmZvY3VzZWRUYWJJbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdJbmRleCA9IHRoaXMuZm9jdXNlZFRhYkluZGV4O1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRGb2N1c2VkVGFiKG5ld0luZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRm9jdXMgYSB0YWIgYnkgaXQncyBpbmRleCBwb3NpdGlvblxuICAgKiBAcGFyYW0gaW5kZXggSW5kZXggb2YgdGFiIHRvIGZvY3VzXG4gICAqL1xuICBzZXRGb2N1c2VkVGFiKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmZvY3VzZWRUYWJJbmRleCA9IGluZGV4O1xuICAgIGNvbnN0IHRhYkl0ZW0gPSB0aGlzLnRhYk5hdkl0ZW1zLmZpbmQoKGl0ZW0sIGkpPT4ge1xuICAgICAgcmV0dXJuIGkgPT09IGluZGV4O1xuICAgIH0pO1xuXG4gICAgaWYgKHRhYkl0ZW0pIHtcbiAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgdGFiSXRlbS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0IHNlbGVjdGVkIHRhYiBieSBpbmRleCBvciBpZFxuICAgKiBAcGFyYW0gaW5kZXggSW5kZXggb3IgSWQgb2YgW1tUYWJDb21wb25lbnRdXSB0byBzZWxlY3RcbiAgICovXG4gIHNldFNlbGVjdGVkVGFiKGluZGV4OiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIGluZGV4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVGFiSW5kZXggPSBpbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9zZWxlY3RlZCB0YWIgYnkgbmFtZT9cbiAgICAgIGNvbnN0IHRlbXBJbmRleCA9IF8uZmluZEluZGV4KHRoaXMudGFicywgKHRhYjogVGFiQ29tcG9uZW50KT0+dGFiLmlkID09PSBpbmRleCk7XG5cbiAgICAgIGlmICh0ZW1wSW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiSW5kZXggPSB0ZW1wSW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNlbGVjdGVkIFtbVGFiQ29tcG9uZW50XV1cbiAgICogQHJldHVybnMgVGFiIHRoYXQgaXMgc2VsZWN0ZWRcbiAgICovXG4gIGdldCBzZWxlY3RlZFRhYigpOiBUYWJDb21wb25lbnQge1xuICAgIHJldHVybiB0aGlzLnRhYnMuZmluZCgoaXRlbSwgaW5kZXgpPT5pbmRleCA9PT0gdGhpcy5zZWxlY3RlZFRhYkluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgTmV4YVdlYiB0YWcgbmFtZVxuICAgKiBAcmV0dXJucyBOYW1lIG9mIHRhZ1xuICAgKi9cbiAgcHJvdGVjdGVkIGdldE54VGFnTmFtZSgpIHtcbiAgICByZXR1cm4gXCJ0YWJQYW5lXCI7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFtbY2RdXSAoQ2hhbmdlRGV0ZWN0b3IpIG1lbWJlclxuICAgKi9cbiAgZ2V0Q2hhbmdlRGV0ZWN0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2Q7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgdGFiIGNoaWxkIGZyb20gdGhlIHBhbmVcbiAgICogQHBhcmFtIGNoaWxkIFRhYiB0byByZW1vdmVcbiAgICovXG4gIHJlbW92ZUNoaWxkKGNoaWxkOiBUYWJDb21wb25lbnQpIHtcbiAgICBzdXBlci5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgdGhpcy50YWJzID0gXy5maWx0ZXIodGhpcy50YWJzLCAodGFiKT0+dGFiLmlkICE9PSBjaGlsZC5pZCk7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyBPYmplY3QgSlNPTiBtZXRhZGF0YVxuICAgKi9cbiAgdG9Kc29uKCkge1xuICAgIGNvbnN0IGpzb24gPSBzdXBlci50b0pzb24oKTtcbiAgICBqc29uW1wic2VsZWN0ZWRUYWJJbmRleFwiXSA9IHRoaXMuc2VsZWN0ZWRUYWJJbmRleDtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgaXMgYSBjb250YWluZXIgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIFRydWVcbiAgICovXG4gIHByb3RlY3RlZCBpc0NvbnRhaW5lcigpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19