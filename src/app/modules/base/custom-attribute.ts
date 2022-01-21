import { OnInit } from "@angular/core";
import { BaseComponent } from "./base.component";

export abstract class CustomAttribute implements OnInit {
    constructor (private parent: BaseComponent) {

    }

    ngOnInit() {
        const name = this.getPropertyName();
        let value = this.getPropertyValue();

        if (this.parent != null && name != null && name !== "") {
            if (value == null) {
                value = "";
            }

            this.parent.setCustomAttribute(name, value);
        } else if (this.parent == null) {
            console.error("Unable to set custom property, parent is null");
        }
    }

    /**
     * Return the name of the custom property
     */
    abstract getPropertyName(): string;

    /**
     * Return the value of the custom property
     */
    abstract getPropertyValue(): string;
}