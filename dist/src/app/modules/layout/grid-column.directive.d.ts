import { ElementRef, OnInit } from '@angular/core';
export declare class GridColumnDirective implements OnInit {
    private el;
    vtGridColumn: number;
    constructor(el: ElementRef);
    /**
     * Init lifecycle. Set grid column css class
     */
    ngOnInit(): void;
}
