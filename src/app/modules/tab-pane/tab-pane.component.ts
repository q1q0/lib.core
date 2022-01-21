import {
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  ContentChildren,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  QueryList,
  SkipSelf,
  Optional,
  EventEmitter,
  Output,
  Input,
  ChangeDetectorRef,
  Renderer2,
  forwardRef,
  ContentChild,
  NgZone
} from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { TabComponent } from './tab/tab.component';
import { TabEvent } from './tab-event';

import * as _ from "lodash";

type TabPlacement = "left" | "top" | "bottom" | "right";

declare var $;

/**
 * Class for tab pane container component
 */
@Component({
  selector: 'vt-tab-pane',
  templateUrl: './tab-pane.component.html',
  styleUrls: ['./tab-pane.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>TabPaneComponent)
    }
  ]
})
export class TabPaneComponent extends BaseComponent {
  @Input() tabPlacement: TabPlacement = "top";
  @ContentChildren(TabComponent) set tabsList(tabList: QueryList<TabComponent>) {
    this.tabs = tabList.toArray();
  }
  @ViewChildren('tabNavItem') tabNavItems: Array<ElementRef>;

  @Output() onClick: EventEmitter<TabEvent> = new EventEmitter<TabEvent>();
  selectedTabIndex: number = 0;
  focusedTabIndex: number = 0;
  hasChanged: boolean = false;
  tabs: Array<TabComponent> = [];

  _verticalBgColor: boolean | string = false;
  navTabs:string ="nav-tabs";
  @Input() set verticalBgColor(isVer: boolean | string) {
    this._verticalBgColor = isVer;
    if (isVer===true || isVer === "true"){
      this.navTabs ="nav-tabs ver-nav-tabs";
    }else{
      this.navTabs = "nav-tabs";
    }
  }
  get verticalBgColor(): boolean | string {
    return this._verticalBgColor;
  }

  /**
   *
   * @param parent see [[BaseComponent]] constructor
   * @param sessionService see [[BaseComponent]] constructor
   * @param elementRef see [[BaseComponent]] constructor
   * @param cd Inject change detector
   * @param renderer see [[BaseComponent]] constructor
   */
  constructor(
    @Optional() @SkipSelf() parent: BaseComponent,
    sessionService: SessionService,
    elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    renderer: Renderer2,
    private ngZone: NgZone
  ) {
    super(parent, sessionService, elementRef, renderer);
  }

  /**
   * After view init lifecycle. Set up tabs and trigger change detector
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.configureTabs();
    this.detectChanges();
  }

  ngAfterViewChecked() {
    if (this.hasChanged) {
      let selectedTab = this.tabs[this.focusedTabIndex];
      let selectedTabElement = selectedTab.getElement();
      this.hasChanged = false;

      if (selectedTabElement) {
        const parentView = this.getParentView();

        if (parentView != null) {
          parentView.resetAllTablesColumnResizer();
        }
      }
    }
  }

  /* istanbul ignore next */
  /**
   * Set the [[selectedTabIndex]] to index of active tab
   */
  private configureTabs() {
    _.forEach(this.tabs, (tab, index)=>{
      if (tab.active === true) {
        this.selectedTabIndex = index;
      }
    });
  }

  /* istanbul ignore next */
  /**
   * Event handler for when tab is selected
   * @param event
   * @param index Index of tab to select
   * @param tabId
   * @event onCommand
   */
  handleSelectTab(event: Event, index: number, tabId: string) {
    const tab = this.tabs.find((item, i)=> {
      return i === index;
    });

    if (tab == null || tab.disabled == true) {
      return;
    }

    event.preventDefault();
    this.setFocusedTab(index);
    this.selectedTabIndex = index;
    // this.onClick.emit({
    //   tabId: tabId,
    //   tabIndex: index
    // });
    this.selectedTab.onCommand.emit(tabId);
    this.markForCheck();

    const parentView = this.getParentView();

    if (parentView != null) {
      parentView.resetAllScrollPanesPositionToPrevious();
      parentView.resetAllTablesPositionToPrevious();

      if (typeof (parentView as any).updateTabbables === "function") {
        this.ngZone.runOutsideAngular(()=>{
          setTimeout(()=>{
            (parentView as any).updateTabbables();
            this.setFocusedTab(index);
          }, 1000);
        });
      }
    }
  }

  /* istanbul ignore next */
  /**
   * Event handler for keydown event. Arrow keys used for navigation
   * @param e Key event
   */
  handleKeydown(e: KeyboardEvent) {
    if (!document.activeElement.className.includes("combobox-input-box") && !document.activeElement.className.includes("dropdown-item")) {
      /* Allow tab navigation via arrow keys: https://github.com/weaveio/ngnsophia/issues/1465 */
      const UP_KEY_CODE = 38;
      const DOWN_KEY_CODE = 40;
      const ENTER_KEY_CODE = 13;
      const PAGEUP_KEY_CODE = 33;
      const PAGEDOWN_KEY_CODE = 34;
      const keyPressed = e.which;

      // Ignore all keys except up/down or ENTER
      const navigationKeys = [UP_KEY_CODE, DOWN_KEY_CODE, ENTER_KEY_CODE, PAGEUP_KEY_CODE, PAGEDOWN_KEY_CODE];
      if (navigationKeys.indexOf(keyPressed) === -1) return;

      e.stopPropagation();

      let newIndex: number;

      if(e.ctrlKey === true && keyPressed === PAGEDOWN_KEY_CODE)
      {
        newIndex = this.focusedTabIndex + 1;
        newIndex = newIndex % this.tabs.length;
        this.setSelectedTab(newIndex);
      }
      else if(e.ctrlKey === true && keyPressed === PAGEUP_KEY_CODE)
      {
        newIndex = this.focusedTabIndex - 1;
        newIndex += this.tabs.length;
        newIndex = newIndex % this.tabs.length;
        this.setSelectedTab(newIndex);
      } else if(keyPressed === DOWN_KEY_CODE && this.focusedTabIndex < this.tabs.length - 1) {
        newIndex = this.focusedTabIndex + 1;
      } else if(keyPressed === UP_KEY_CODE && this.focusedTabIndex > 0) {
        newIndex = this.focusedTabIndex - 1;
      } else if (keyPressed === ENTER_KEY_CODE) {
        newIndex = this.focusedTabIndex;
        this.setSelectedTab(this.focusedTabIndex);
      } else {
        newIndex = this.focusedTabIndex;
      }
      this.setFocusedTab(newIndex);
    }
  }

  /* istanbul ignore next */
  /**
   * Focus a tab by it's index position
   * @param index Index of tab to focus
   */
  setFocusedTab(index: number) {
    this.focusedTabIndex = index;
    this.hasChanged = true;
    const tabItem = this.tabNavItems.find((item, i)=> {
      return i === index;
    });

    if (tabItem) {
      setTimeout(()=>{
        tabItem.nativeElement.focus();
      }, 0);
    }
  }

  /* istanbul ignore next */
  /**
   * Set selected tab by index or id
   * @param index Index or Id of [[TabComponent]] to select
   */
  setSelectedTab(index: number | string) {
    if (typeof index === "number") {
      this.selectedTabIndex = index;
    } else {
      //selected tab by name?
      const tempIndex = _.findIndex(this.tabs, (tab: TabComponent)=>tab.id === index);

      if (tempIndex >= 0) {
        this.selectedTabIndex = tempIndex;
      }
    }

    this.markForCheck();
    const parentView = this.getParentView();

    if (parentView != null) {
      parentView.resetAllScrollPanesPositionToPrevious();
      parentView.resetAllTablesPositionToPrevious();
    }
  }

  /**
   * Get the selected [[TabComponent]]
   * @returns Tab that is selected
   */
  get selectedTab(): TabComponent {
    return this.tabs.find((item, index)=>index === this.selectedTabIndex);
  }

  /**
   * Get NexaWeb tag name
   * @returns Name of tag
   */
  protected getNxTagName() {
    return "tabPane";
  }

  /**
   * Get [[cd]] (ChangeDetector) member
   */
  getChangeDetector() {
    return this.cd;
  }

  /**
   * Remove a tab child from the pane
   * @param child Tab to remove
   */
  removeChild(child: TabComponent) {
    super.removeChild(child);
    this.tabs = _.filter(this.tabs, (tab)=>tab.id !== child.id);
    this.markForCheck();
  }

  /**
   * Get JSON representation of this component
   * @returns Object JSON metadata
   */
  toJson() {
    const json = super.toJson();
    json["selectedTabIndex"] = this.selectedTabIndex;

    return json;
  }

  /**
   * Check if this is a container component
   * @returns True
   */
  protected isContainer() {
    return true;
  }
}
