import { Component, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';

import { Subscription } from "rxjs";
import { ContextMenuService } from '../context-menu.service';
import { PopupMenuComponent } from '../popup-menu.component';

/**
 * Class for popup menu container
 */
@Component({
  selector: 'vt-popup-menu-container',
  templateUrl: './popup-menu-container.component.html',
  styleUrls: ['./popup-menu-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupMenuContainerComponent implements OnDestroy {
  @ViewChild(PopupMenuComponent) popupMenu: PopupMenuComponent;

  private activeMenuSubscription: Subscription;

  activeMenuId: string;
  activeMenuItems: Array<any>;
  
  hasPopupMenu: boolean = false;

  /**
   * 
   * @param contextMenuService Injects reference to context menu service
   * @param cd Injects change detector reference
   */
  constructor(
    private contextMenuService: ContextMenuService,
    private cd: ChangeDetectorRef
  ) {
    this.activeMenuSubscription = this.contextMenuService.activeMenuObservable.subscribe((activeMenu)=>{
      this.setActiveMenu(activeMenu);
    });
  }

  /**
   * Destroy lifecycle. Remove references
   */
  ngOnDestroy() {
    if (this.activeMenuSubscription != null) {
      this.activeMenuSubscription.unsubscribe();
    }

    this.activeMenuSubscription = null;
    this.activeMenuItems = null;
    this.contextMenuService = null;
  }

  /**
   * Set active menu by id
   * @param id Id of menu to set as active
   */
  setActiveMenu(id: string) {
    this.activeMenuId = id;
    
    if (id != null) {
      this.activeMenuItems = this.contextMenuService.getContextMenuItems(id);

      if (this.activeMenuItems != null && this.activeMenuItems.length > 0) {
        this.hasPopupMenu = true;
      }
    } else {
      this.activeMenuItems = null;
      this.hasPopupMenu = false;
    }

    this.cd.detectChanges();
  }
}
