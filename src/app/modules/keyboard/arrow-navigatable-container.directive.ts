import { Directive, ContentChildren, QueryList, NgZone, ElementRef, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ArrowNavigatableItemDirective } from './arrow-navigatable-item.directive';

import * as _ from "lodash";

@Directive({
  selector: '[vt-arrow-navigatable-container]'
})
/**
 * Usage.
 * <ul vt-arrow-navigatable-container ...>
 *  <li vt-arrow-navigatable-item ...>
 *  <li vt-arrow-navigatable-item ...>
 * </ul>
 */
export class ArrowNavigatableContainerDirective implements OnDestroy {
  @Input() activeParent: HTMLElement;
  @Output() onItemHover: EventEmitter<ArrowNavigatableItemDirective> = new EventEmitter<ArrowNavigatableItemDirective>();
  @Output() onTab: EventEmitter<void> = new EventEmitter<void>();

  @ContentChildren(ArrowNavigatableItemDirective)
  set navigatableItemsQuery(items: QueryList<ArrowNavigatableItemDirective>) {
    if (items == null) {
      this.navigatableItems = null;
    } else {
      this.navigatableItems = items.toArray();
    }
  }

  private keydownHandler: (event: KeyboardEvent)=>void;
  private mouseoverHandler: (event: MouseEvent)=>void;

  private activeItem: ArrowNavigatableItemDirective;

  private navigatableItems: Array<ArrowNavigatableItemDirective>;

  constructor(private zone: NgZone, private element: ElementRef) {
    this.keydownHandler = (event)=>this.handleKeydown(event);
    this.mouseoverHandler = (event)=>this.handleMouseover(event);
    this.zone.runOutsideAngular(()=>{
      (document).addEventListener("keydown", this.keydownHandler);
      (document).addEventListener("mouseover", this.mouseoverHandler);
    });
  }

  ngOnDestroy() {
    this.navigatableItems = null;
    this.zone.runOutsideAngular(()=>{
      (document).removeEventListener("keydown", this.keydownHandler);
      (document).removeEventListener("mouseover", this.mouseoverHandler);
    });

    this.element = null;
    this.keydownHandler = null;
    this.navigatableItems = null;
    this.activeItem = null;
  }

  private handleMouseover(event: MouseEvent) {
    if (document.activeElement === this.element.nativeElement || document.activeElement === this.activeParent || this.isActiveElementDirectChildren()) {
      if (this.hasItems()) {
        let idx = 0;
        if (this.activeItem != null) {
          this.activeItem.blur();
          idx = _.findIndex(this.navigatableItems, (item)=>item === this.activeItem);
        } else if (this.isActiveElementDirectChildren()) {
          idx = _.findIndex(this.navigatableItems, (item)=> item.element.nativeElement === document.activeElement);
  
          if (idx >= 0) {
            this.navigatableItems[idx].blur();
          }
        }
      }
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    if (document.activeElement === this.element.nativeElement || document.activeElement === this.activeParent || this.isActiveElementDirectChildren()) {
      //check for arrow key and do stuff
      if (event.keyCode === 38 || event.key === "ArrowUp") {
        this.moveUp();
      } else if (event.keyCode === 40 || event.key === "ArrowDow") {
        this.moveDown();
      } else if (
        event.keyCode === 13 || event.key === "Enter" ||
        event.keyCode === 32 || event.key === "Space"
      ) {
        this.select();
      } else if (event.keyCode === 39 || event.key === "ArrowRight") {
        if (this.activeItem != null) {
          this.activeItem.hover();
        }
      } else if (event.keyCode === 37 || event.key === "ArrowLeft") {
        if (this.activeItem != null) {
          this.activeItem.leave();
        }
      } else if (event.keyCode === 9 || event.key === "Tab") {
        this.onTab.emit();
      }
    }
  }

  private moveUp() {
    //can only go up if there are any items above
    if (this.hasItems()) {
      let idx = 0;

      if (this.activeItem != null) {
        this.activeItem.blur();
        idx = _.findIndex(this.navigatableItems, (item)=>item === this.activeItem);
      } else if (this.isActiveElementDirectChildren()) {
        idx = _.findIndex(this.navigatableItems, (item)=> item.element.nativeElement === document.activeElement);

        if (idx >= 0) {
          this.navigatableItems[idx].blur();
        }
      }

      if (idx < this.navigatableItems.length && idx > 0) {
        this.activeItem = this.navigatableItems[idx - 1];
        this.activeItem.focus();
        this.onItemHover.emit(this.activeItem);
      } else if (idx === 0) {
        this.activeItem = this.navigatableItems[this.navigatableItems.length - 1];
        this.activeItem.focus();
        this.onItemHover.emit(this.activeItem);
      }
    }
  }

  private moveDown() {
    if (this.hasItems()) {
      let idx = -1;

      if (this.activeItem != null) {
        idx = _.findIndex(this.navigatableItems, (item)=>item === this.activeItem);

        this.activeItem.blur();
      } else if (this.isActiveElementDirectChildren()) {
        idx = _.findIndex(this.navigatableItems, (item)=> item.element.nativeElement === document.activeElement);
      }

      if (idx < this.navigatableItems.length - 1) {
        this.activeItem = this.navigatableItems[idx + 1];
        this.activeItem.focus();
        this.onItemHover.emit(this.activeItem);
      } else if (idx == this.navigatableItems.length - 1) {
        this.activeItem = this.navigatableItems[0];
        this.activeItem.focus();
        this.onItemHover.emit(this.activeItem);
      }
    }
  }

  private select() {
    if (this.activeItem != null) {
      this.activeItem.select();
    }
  }

  private hasItems(): boolean {
    return this.navigatableItems != null && this.navigatableItems.length > 0;
  }

  private isActiveElementDirectChildren() {
    let retVal: boolean = false;

    if (document.activeElement != null && this.navigatableItems != null && this.navigatableItems.length > 0) {
      retVal = _.findIndex(this.navigatableItems, (item)=>item.element.nativeElement === document.activeElement) >= 0;
    }

    return retVal;
  }
}
