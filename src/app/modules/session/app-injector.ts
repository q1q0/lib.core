import { Injector } from '@angular/core';

/**
 * This constant provide a global access to injector so we can use it to retrieve
 * service from place where we can't inject (like function).
 *
 * !!!!!!!!!!!!!!DO NOT USE THIS IN PLACES WHERE YOU CAN INJECT SERVICES!!!!!!!!!!!
 */
let injectorRef: Injector;

export const appInjector = (injector?: Injector): Injector => {
    if (injector) {
        injectorRef = injector;
    }

    return injectorRef;
}
