import { Component, OnInit, ElementRef, EventEmitter, Input, Output, ViewChild, TemplateRef, Optional, SkipSelf, Renderer2, ContentChild, ViewContainerRef, forwardRef } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { SessionService } from '../../session/session.service';

/**
 * Class for tab component
 */
@Component({
  selector: 'vt-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>TabComponent)
    }
  ]
})
export class TabComponent extends BaseComponent implements OnInit {
  // Sets active tab class
  @Input() active: boolean;
  @Input() id: string;

  @Output() onCommand = new EventEmitter();

  @ViewChild(TemplateRef) content: TemplateRef<any>;

  /**
   *
   * @param parent see [[BaseComponent]] constructor
   * @param sessionService see [[BaseComponent]] constructor
   * @param elementRef see [[BaseComponent]] constructor
   * @param renderer see [[BaseComponent]] constructor
   */
  constructor(@Optional() @SkipSelf() parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, renderer: Renderer2) {
    super(parent, sessionService, elementRef, renderer);
  }

  /* istanbul ignore next */
  /**
   *
   * @param child Tab child component to add
   */
  protected addChild(child: BaseComponent) {
    (this.parent as any).addChild(child);

    if (this.tabChildrenIds == null) {
      this.tabChildrenIds = [];
    }

    this.tabChildrenIds.push(child.getId());
  }

  /* istanbul ignore next */
  /**
   * After view init lifecycle
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  /* istanbul ignore next */
  /**
   * Get JSON representation of this component
   * @returns Object JSON metadata about this component
   */
  toJson() {
    const json: any = super.toJson();
    this.setJson(json, "active", this.focused);

    return json;
  }

  /* istanbul ignore next */
  /**
   * Get NexaWeb component tag name
   */
  protected getNxTagName() {
    return "tab";
  }

  /* istanbul ignore next */
  /**
   * Event handler for click event
   * @event onCommand
   */
  onClick() {
    this.onCommand.emit(this.id);
    this.active = true;
  }

  /* istanbul ignore next */
  /**
   * Focus this tab
   */
  setFocus() {
    const parent = this.getParent();

    if (parent != null && typeof parent["setSelectedTab"] === "function") {
      parent["setSelectedTab"](this.id);
    } else {
      super.setFocus();
    }
  }
}
