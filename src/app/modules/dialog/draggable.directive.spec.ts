import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { SessionService } from '../session/session.service';
import { DialogModule } from './dialog.module';
import { SessionModule } from '../session/session.module';
import { McoContainerModule } from '../mco-container/mco-container.module';

@Component({
  selector: "app-test-component",
  template: `<div #myModal [vtDraggable]="true"></div>`
})
export class AppTestComponent {
  @ViewChild(DraggableDirective) draggableDirective: DraggableDirective;
}

describe('DraggableDirective', () => {
  let fixture: ComponentFixture<AppTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTestComponent ],
      imports: [
        DialogModule,
        SessionModule,
        McoContainerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(()=>{
    fixture = TestBed.createComponent(AppTestComponent);
		fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.draggableDirective).toBeTruthy();
  });
});
