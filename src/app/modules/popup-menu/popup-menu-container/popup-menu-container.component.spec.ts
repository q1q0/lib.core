import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMenuContainerComponent } from './popup-menu-container.component';
import { PopupMenuModule } from '../popup-menu.module';

describe('PopupMenuContainerComponent', () => {
  let component: PopupMenuContainerComponent;
  let fixture: ComponentFixture<PopupMenuContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PopupMenuModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMenuContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
