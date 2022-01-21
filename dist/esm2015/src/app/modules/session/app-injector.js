/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * This constant provide a global access to injector so we can use it to retrieve
 * service from place where we can't inject (like function).
 *
 * !!!!!!!!!!!!!!DO NOT USE THIS IN PLACES WHERE YOU CAN INJECT SERVICES!!!!!!!!!!!
  @type {?} */
let injectorRef;
/** @type {?} */
export const appInjector = (injector) => {
    if (injector) {
        injectorRef = injector;
    }
    return injectorRef;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWluamVjdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9zZXNzaW9uL2FwcC1pbmplY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBUUEsSUFBSSxXQUFXLENBQVc7O0FBRTFCLGFBQWEsV0FBVyxHQUFHLENBQUMsUUFBbUIsRUFBWSxFQUFFO0lBQ3pELElBQUksUUFBUSxFQUFFO1FBQ1YsV0FBVyxHQUFHLFFBQVEsQ0FBQztLQUMxQjtJQUVELE9BQU8sV0FBVyxDQUFDO0NBQ3RCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoaXMgY29uc3RhbnQgcHJvdmlkZSBhIGdsb2JhbCBhY2Nlc3MgdG8gaW5qZWN0b3Igc28gd2UgY2FuIHVzZSBpdCB0byByZXRyaWV2ZVxuICogc2VydmljZSBmcm9tIHBsYWNlIHdoZXJlIHdlIGNhbid0IGluamVjdCAobGlrZSBmdW5jdGlvbikuXG4gKlxuICogISEhISEhISEhISEhISFETyBOT1QgVVNFIFRISVMgSU4gUExBQ0VTIFdIRVJFIFlPVSBDQU4gSU5KRUNUIFNFUlZJQ0VTISEhISEhISEhISFcbiAqL1xubGV0IGluamVjdG9yUmVmOiBJbmplY3RvcjtcblxuZXhwb3J0IGNvbnN0IGFwcEluamVjdG9yID0gKGluamVjdG9yPzogSW5qZWN0b3IpOiBJbmplY3RvciA9PiB7XG4gICAgaWYgKGluamVjdG9yKSB7XG4gICAgICAgIGluamVjdG9yUmVmID0gaW5qZWN0b3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluamVjdG9yUmVmO1xufVxuIl19