import { ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { DynamicElement } from "./dynamic-element";
import { BaseComponent } from "../base/base.component";
/**
 * DynamicComponent class. Renders components at runtime by definition
 */
export declare class DynamicComponent implements AfterViewInit {
    private cd;
    /**
     * Definition of component to render
     */
    elementDef: DynamicElement;
    myComponent: BaseComponent;
    constructor(cd: ChangeDetectorRef);
    /**
     * After init lifecycle.
     */
    ngAfterViewInit(): void;
    /**
     * Check if element is visible
     * @returns Value of [[DynamicElement]] visible property.
     */
    isVisible(): boolean;
    /**
     * Get component ID if it exists, otherwise generate a unique id
     * @returns Component's id value
     */
    getId(): string;
    /**
     * Event handler for OnCommand event. Call runtime component's onCommand handler
     */
    handleOnCommand(): void;
    /**
     * Event handler for OnContextMenu (i.e. right click, ctrl click) event. Call runtime component's onContextMenu Handler
     */
    handleOnContextMenu(): void;
    /**
     * Set runtime component's 'enabled' property value based on cssClass and call parent class cleanCss method
     */
    cleanClass(): void;
}
