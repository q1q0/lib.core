import { OnInit } from '@angular/core';
export declare class HeaderDirective implements OnInit {
    text: string;
    cssClass: string;
    controlHeight: string;
    controlWidth: string;
    headerHeight: string;
    autoWrap: boolean | string;
    id: string;
    constructor();
    ngOnInit(): void;
}
