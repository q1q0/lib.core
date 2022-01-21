import { OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ContextMenuService } from '../context-menu.service';
import { PopupMenuComponent } from '../popup-menu.component';
/**
 * Class for popup menu container
 */
export declare class PopupMenuContainerComponent implements OnDestroy {
    private contextMenuService;
    private cd;
    popupMenu: PopupMenuComponent;
    private activeMenuSubscription;
    activeMenuId: string;
    activeMenuItems: Array<any>;
    hasPopupMenu: boolean;
    /**
     *
     * @param contextMenuService Injects reference to context menu service
     * @param cd Injects change detector reference
     */
    constructor(contextMenuService: ContextMenuService, cd: ChangeDetectorRef);
    /**
     * Destroy lifecycle. Remove references
     */
    ngOnDestroy(): void;
    /**
     * Set active menu by id
     * @param id Id of menu to set as active
     */
    setActiveMenu(id: string): void;
}
