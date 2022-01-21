/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as clipboard from "clipboard-polyfill";
import * as i0 from "@angular/core";
var ClipboardService = /** @class */ (function () {
    function ClipboardService() {
    }
    //constructor(@Inject("ClipboardPolyfill") private clipboard: any) { }
    /**
     * Copy the {txt} text into the clipboard
     *
     * @param txt text to be copied into the clipboard
     */
    /**
     * Copy the {txt} text into the clipboard
     *
     * @param {?} txt text to be copied into the clipboard
     * @return {?}
     */
    ClipboardService.prototype.copy = /**
     * Copy the {txt} text into the clipboard
     *
     * @param {?} txt text to be copied into the clipboard
     * @return {?}
     */
    function (txt) {
        return clipboard.writeText(txt);
    };
    ClipboardService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ ClipboardService.ngInjectableDef = i0.defineInjectable({ factory: function ClipboardService_Factory() { return new ClipboardService(); }, token: ClipboardService, providedIn: "root" });
    return ClipboardService;
}());
export { ClipboardService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2NsaXBib2FyZC9jbGlwYm9hcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEtBQUssU0FBUyxNQUFNLG9CQUFvQixDQUFDOzs7OztJQVc5QyxzRUFBc0U7SUFFdEU7Ozs7T0FJRzs7Ozs7OztJQUNILCtCQUFJOzs7Ozs7SUFBSixVQUFLLEdBQVc7UUFDZCxPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakM7O2dCQWxCRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7MkJBTEQ7O1NBVWEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBjbGlwYm9hcmQgZnJvbSBcImNsaXBib2FyZC1wb2x5ZmlsbFwiO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbi8qKlxuICogQ2xpcGJvYXJkIHNlcnZpY2UgdGhhdCB1c2UgdGhlIG1vZGVybiBpbXBsZW1lbnRhdGlvbiBvZiBjbGlib2FyZC4gRm9yIG9sZGVyIGJyb3dzZXIsIGEgcG9seWZpbGxcbiAqIGlzIHVzZWQgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGNsYXNzIENsaXBib2FyZFNlcnZpY2Uge1xuXG4gIC8vY29uc3RydWN0b3IoQEluamVjdChcIkNsaXBib2FyZFBvbHlmaWxsXCIpIHByaXZhdGUgY2xpcGJvYXJkOiBhbnkpIHsgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSB7dHh0fSB0ZXh0IGludG8gdGhlIGNsaXBib2FyZFxuICAgKiBcbiAgICogQHBhcmFtIHR4dCB0ZXh0IHRvIGJlIGNvcGllZCBpbnRvIHRoZSBjbGlwYm9hcmRcbiAgICovXG4gIGNvcHkodHh0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gY2xpcGJvYXJkLndyaXRlVGV4dCh0eHQpO1xuICB9XG59XG4iXX0=