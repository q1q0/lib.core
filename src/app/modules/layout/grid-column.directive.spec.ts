
import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GridColumnDirective } from './grid-column.directive';

@Component({
  template: `
  <div [vtGridColumn]="4">Test</div>`
})
class TestComponent { }

describe('GridColumnDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let el: DebugElement;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [GridColumnDirective, TestComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    el = fixture.debugElement.query(By.css('div'));
  });

  it('should create an instance', () => {
    const directive = new GridColumnDirective(el);
    expect(directive).toBeTruthy();
  });
});
