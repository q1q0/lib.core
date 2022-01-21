import { Component, DoCheck } from "@angular/core";
import { ViewComponent } from "./modules/view/view.component";
import { ComponentType } from "./modules/base/component-type.enum";
import { BaseComponent } from "./modules/base/base.component";

@Component({
    selector: 'app-test-view2',
    template: `
    <div style="border: 2px solid #000000">
    <vt-label id="hello-world" text="Hellosafsaf world"></vt-label><br/>
    <button (click)="handleClick()">Add comp</button>
    <button (click)="remove()">Remove comp</button>
    <button (click)="removeHelloWorld()">Removeasfafs hello world</button>
    <vt-text-field></vt-text-field>
    </div>
    `
})
export class AppTestView2 extends ViewComponent implements DoCheck {
    comps: Array<BaseComponent> = [];

    ngDoCheck() {
        console.log("AppTestView2.Checking..." + Date.now());
    }

    handleClick() {
        const comp = this._createDynamicComponent(ComponentType.LABEL);
        comp.text = "asdfasfsafsdf!";

        this.comps.push(comp);
    }

    remove() {
        this._removeComponent(this.comps.pop().id);
    }

    removeHelloWorld() {
        this._removeComponent('hello-world');
    }
}