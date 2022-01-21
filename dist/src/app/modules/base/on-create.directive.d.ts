import { OnInit, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { OnCreateEvent } from './on-create-event';
export declare class OnCreateDirective implements OnInit {
    private elementRef;
    private zone;
    runOutsideZone: boolean;
    vtOnCreate: EventEmitter<OnCreateEvent>;
    constructor(elementRef: ElementRef<HTMLElement>, zone: NgZone);
    ngOnInit(): void;
}
