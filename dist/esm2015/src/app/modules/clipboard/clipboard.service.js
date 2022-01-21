/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as clipboard from "clipboard-polyfill";
import * as i0 from "@angular/core";
/**
 * Clipboard service that use the modern implementation of cliboard. For older browser, a polyfill
 * is used instead.
 */
export class ClipboardService {
    /**
     * Copy the {txt} text into the clipboard
     *
     * @param {?} txt text to be copied into the clipboard
     * @return {?}
     */
    copy(txt) {
        return clipboard.writeText(txt);
    }
}
ClipboardService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ ClipboardService.ngInjectableDef = i0.defineInjectable({ factory: function ClipboardService_Factory() { return new ClipboardService(); }, token: ClipboardService, providedIn: "root" });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2NsaXBib2FyZC9jbGlwYm9hcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEtBQUssU0FBUyxNQUFNLG9CQUFvQixDQUFDOztBQUVoRDs7OztBQU9BLE1BQU07Ozs7Ozs7SUFTSixJQUFJLENBQUMsR0FBVztRQUNkLE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqQzs7O1lBbEJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgY2xpcGJvYXJkIGZyb20gXCJjbGlwYm9hcmQtcG9seWZpbGxcIjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIENsaXBib2FyZCBzZXJ2aWNlIHRoYXQgdXNlIHRoZSBtb2Rlcm4gaW1wbGVtZW50YXRpb24gb2YgY2xpYm9hcmQuIEZvciBvbGRlciBicm93c2VyLCBhIHBvbHlmaWxsXG4gKiBpcyB1c2VkIGluc3RlYWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBDbGlwYm9hcmRTZXJ2aWNlIHtcblxuICAvL2NvbnN0cnVjdG9yKEBJbmplY3QoXCJDbGlwYm9hcmRQb2x5ZmlsbFwiKSBwcml2YXRlIGNsaXBib2FyZDogYW55KSB7IH1cblxuICAvKipcbiAgICogQ29weSB0aGUge3R4dH0gdGV4dCBpbnRvIHRoZSBjbGlwYm9hcmRcbiAgICogXG4gICAqIEBwYXJhbSB0eHQgdGV4dCB0byBiZSBjb3BpZWQgaW50byB0aGUgY2xpcGJvYXJkXG4gICAqL1xuICBjb3B5KHR4dDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGNsaXBib2FyZC53cml0ZVRleHQodHh0KTtcbiAgfVxufVxuIl19