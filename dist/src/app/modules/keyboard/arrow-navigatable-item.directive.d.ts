import { ElementRef, NgZone, OnDestroy, Renderer2, EventEmitter } from '@angular/core';
export declare class ArrowNavigatableItemDirective implements OnDestroy {
    element: ElementRef;
    private zone;
    private renderer;
    vtArrowOnMouseEnter: EventEmitter<void>;
    vtArrowOnMouseLeave: EventEmitter<void>;
    parent: any;
    jq: any;
    handleOnBlur(): void;
    handleOnFocus(): void;
    constructor(element: ElementRef, zone: NgZone, renderer: Renderer2);
    ngOnDestroy(): void;
    focus(): void;
    blur(): void;
    select(): void;
    hover(): void;
    leave(): void;
}
