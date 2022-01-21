import { ElementRef } from "@angular/core";
import { BaseComponent } from "./base.component";

export interface OnCreateEvent {
    element: ElementRef;
}