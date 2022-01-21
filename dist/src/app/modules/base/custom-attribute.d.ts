import { OnInit } from "@angular/core";
import { BaseComponent } from "./base.component";
export declare abstract class CustomAttribute implements OnInit {
    private parent;
    constructor(parent: BaseComponent);
    ngOnInit(): void;
    /**
     * Return the name of the custom property
     */
    abstract getPropertyName(): string;
    /**
     * Return the value of the custom property
     */
    abstract getPropertyValue(): string;
}
