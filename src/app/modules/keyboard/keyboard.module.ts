import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowNavigatableContainerDirective } from './arrow-navigatable-container.directive';
import { ArrowNavigatableItemDirective } from './arrow-navigatable-item.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ArrowNavigatableItemDirective,
    ArrowNavigatableContainerDirective
  ],
  exports: [
    ArrowNavigatableItemDirective,
    ArrowNavigatableContainerDirective
  ]
})
export class KeyboardModule { }
