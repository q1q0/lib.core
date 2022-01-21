import { Component, DoCheck, SkipSelf, Optional, ElementRef, ChangeDetectorRef } from "@angular/core";
import { ViewComponent } from "./modules/view/view.component";
import { ComponentType } from "./modules/base/component-type.enum";
import { BaseComponent } from "./modules/base/base.component";
import { SessionService } from "./modules/session/session.service";

@Component({
    selector: 'app-test-view',
    template: `
    <vt-dialog id="test-dialog">
    <div style="border: 2px solid #000000">
    <vt-label id="hello-world" text="Hello world"></vt-label><br/>
    <button (click)="handleClick()">Add comp</button>
    <button (click)="remove()">Remove comp</button>
    <button (click)="removeHelloWorld()">Remove hello world</button>
    </div></vt-dialog>
    `
})
export class AppTestView extends ViewComponent implements DoCheck {
    comps: Array<BaseComponent> = [];

    constructor(
        @Optional() @SkipSelf() parent: BaseComponent,
        sessionService: SessionService,
        elementRef: ElementRef,
        private cd: ChangeDetectorRef) {
        super(null, sessionService, elementRef);
    }

    ngDoCheck() {
        console.log("AppTestView.Checking..." + Date.now());
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cd.detach();
    }

    handleClick() {
        const comp = this._createDynamicComponent(ComponentType.LABEL);
        comp.text = "I am a dynamically created label!";

        this.comps.push(comp);
    }

    remove() {
        this._removeComponent(this.comps.pop().id);
    }

    removeHelloWorld() {
        this._removeComponent('hello-world');
    }
}