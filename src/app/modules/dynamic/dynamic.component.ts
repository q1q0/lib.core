import { Component, Input, ViewChild, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy } from "@angular/core";
import { DynamicElement } from "./dynamic-element";
import { BaseComponent } from "../base/base.component";
import { AppUtils } from "../base/app-utils";
import { AttributesEnum } from "../base/attributes.enum";
import * as _ from "lodash";

/**
 * DynamicComponent class. Renders components at runtime by definition
 */
@Component({
    selector: "vt-dynamic-component",
    templateUrl: "./dynamic.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicComponent implements AfterViewInit {
    /**
     * Definition of component to render
     */
    @Input() elementDef: DynamicElement;
    @ViewChild("myComponent", { read: BaseComponent }) myComponent: BaseComponent;

    constructor(private cd: ChangeDetectorRef) {

    }

    /**
     * After init lifecycle.
     */
    ngAfterViewInit() {
        this.cleanClass();

        this.cd.detectChanges();
    }

    /**
     * Check if element is visible
     * @returns Value of [[DynamicElement]] visible property.
     */
    isVisible() {
        return this.elementDef.visible !== false;
    }

    /**
     * Get component ID if it exists, otherwise generate a unique id
     * @returns Component's id value
     */
    getId() {
        return this.elementDef.id == null ? BaseComponent.generateUniqueId() : this.elementDef.id;
    }

    /**
     * Event handler for OnCommand event. Call runtime component's onCommand handler
     */
    handleOnCommand() {
        if (typeof this.elementDef.onCommand === "function") {
            this.elementDef.onCommand(this.myComponent);
        }
    }

    /**
     * Event handler for OnContextMenu (i.e. right click, ctrl click) event. Call runtime component's onContextMenu Handler
     */
    handleOnContextMenu() {
        if (typeof this.elementDef.onContextMenu === "function") {
            this.elementDef.onContextMenu(this.myComponent);
        }
    }

    /**
     * Set runtime component's 'enabled' property value based on cssClass and call parent class cleanCss method
     */
    cleanClass() {
        if (this.elementDef.cssClass != null && this.elementDef.cssClass !== "") {
            if (typeof AppUtils.attributeOverrideClass === "function") {
                const attrs = AppUtils.attributeOverrideClass(this.elementDef.cssClass);
                
                if (attrs != null) {
                    _.forEach(attrs, (val)=>{
                        if (val != null && val.attributeName === AttributesEnum.ENABLED) {
                            this.elementDef.enabled = val.value;
                        }
                    });
                }
            }

            this.elementDef.cssClass = BaseComponent.cleanCss(this.elementDef.cssClass);
        }
    }
}