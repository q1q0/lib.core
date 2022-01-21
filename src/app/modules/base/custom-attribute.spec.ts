import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponent } from './base.component';
import { SessionService } from '../session/session.service';
import { McoContainerService } from '../mco-container/mco-container.service';
import { EventHandlerService } from '../event-handler/event-handler.service';
import { Directive, Component, ViewChild, Optional, Input, ContentChild } from '@angular/core';
import { CustomAttribute } from './custom-attribute';
import { ButtonComponent } from '../button/button.component';
import { BaseModule } from './base.module';
import { ButtonModule } from '../button/button.module';
import { ViewComponent } from '../view/view.component';

@Directive({
    selector: "[test-prop]"
})
export class TestPropDirective extends CustomAttribute {
    @Input("test-prop") testProp: string;

    constructor(@Optional() parent: BaseComponent) {
        super(parent);
    }

    getPropertyName(): string {
        return "test-prop";
    }

    getPropertyValue(): string {
        return this.testProp;
    }
}

@Component({
    selector: 'app-test-comp',
    template: `
    <vt-button #testButton test-prop="hello world"></vt-button>
    `
})
export class TestView extends ViewComponent {
    @ViewChild("testButton", { read: ButtonComponent }) button: ButtonComponent;
    @ViewChild(TestPropDirective) testProp: TestPropDirective;
}

describe('BaseComponent', () => {
    let component: TestView;
    let fixture: ComponentFixture<TestView>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BaseModule,
                ButtonModule
            ],
            declarations: [TestPropDirective, TestView],
            providers: [
                SessionService,
                McoContainerService,
                EventHandlerService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("custom attribute should be lifted", ()=>{
        expect(component.testProp.testProp).toBe("hello world");
    });
});
