import { QueryList, NgZone, ElementRef, OnDestroy, EventEmitter } from '@angular/core';
import { ArrowNavigatableItemDirective } from './arrow-navigatable-item.directive';
export declare class ArrowNavigatableContainerDirective implements OnDestroy {
    private zone;
    private element;
    activeParent: HTMLElement;
    onItemHover: EventEmitter<ArrowNavigatableItemDirective>;
    onTab: EventEmitter<void>;
    navigatableItemsQuery: QueryList<ArrowNavigatableItemDirective>;
    private keydownHandler;
    private activeItem;
    private navigatableItems;
    constructor(zone: NgZone, element: ElementRef);
    ngOnDestroy(): void;
    private handleKeydown;
    private moveUp;
    private moveDown;
    private select;
    private hasItems;
    private isActiveElementDirectChildren;
}
