import { Component, OnInit, Input, Optional, SkipSelf, ElementRef, ChangeDetectionStrategy, forwardRef, ViewContainerRef, ContentChildren, QueryList, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { BorderPosition, Layout } from '../base/style-literals';
import { AttributesEnum } from '../base/attributes.enum';
import * as _ from "lodash";

@Component({
  selector: 'vt-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>PanelComponent)
    }
  ]
})
export class PanelComponent extends BaseComponent implements OnInit {
  @Input() layout: Layout;
  @Input() caption: String;
  @Input() evenlySpace: boolean; //TODO not sure what this is for
  /**
   * For escaping unneeded row & fluid container. This is a trikcy option.
   * Almost case, fluid container is not needed. it's too late...
   * @property {boolean}
   */
  @Input() noGutter: boolean = false;
    /**
   * For escaping fluid container. This is a trikcy option.
   * should be validated by `(layout !== 'grid')` . it's too late...
   * @property {boolean}
   */
  @Input() noGrid: boolean = false;
  //children list to keep indexes
  @ContentChildren(BaseComponent) set childrenList(children: QueryList<BaseComponent>) {
    this.resetChildIndexes(children.filter(child=>child !== this));
  }

  panelClasses: Array<string> = ['vt-panel'];
  panelStyles: {[name: string]: string} = {};

  // 画面リサイズ対応 Start
  @Input() resizeComponent: boolean = false;
  @Input() resizeMarginTop: string = null;
  resizeHeight: string = null;
  divHeight: string = null;
  // 画面リサイズ対応 End

  // 画面のレイアウト固定化対応 Start
  @Input() contentDisplayWidth: string = null;
  // 画面のレイアウト固定化対応 End

  constructor(@Optional() @SkipSelf() parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, private cd: ChangeDetectorRef, renderer: Renderer2) {
    super(parent, sessionService, elementRef, renderer);
  }

  /**
   * Init lifecycle. Set dimensions and css styles
   */
  ngOnInit() {
    super.ngOnInit();

    if (this.cssClass != null) {
      this.cssClass.split(' ').forEach(css=>this.panelClasses.push(css));
    }

    if (this.containerLayout === true && !this.noGrid && !this.noGutter) {
      this.panelClasses.push('container-fluid');
    }

    /*if (!this.borderColor) {
      this.borderColor = 'transparent';
    }*/

    if (this.borderWidth) {
      this.borderWidth = this.borderWidth + 'px';
      this.borderStyle = 'solid';

       if(this.borderColor == null){
         this.borderColor = '#ffffff';
       }
    }
    if (this.controlHeight == null) {
      this.controlHeight = '100%';
    }

    if (this.panelWidth) {
      if(this.panelWidth.indexOf('%') == -1){
        this.panelWidth = this.panelWidth + 'px';
      }
    }

    if (this.panelMinHeight) {
      if(this.panelMinHeight.indexOf('%') == -1){
        this.panelMinHeight = this.panelMinHeight + 'px';
      }
    }

    this.setVisible(this.visible);

    // 画面リサイズ対応 Start
    if (this.resizeComponent) {
      this.resizeHeight = "calc(100% - " + this.resizeMarginTop + "px)";
      this.divHeight = "100%";
    }

    if (this.marginLeft) {
      this.marginLeft = this.marginLeft + 'px';
    }

    if (this.marginRight) {
      this.marginRight = this.marginRight + 'px';
    }
  }

  /**
   * After view init lifecycle. Set dimensions and trigger change detection
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.initWidthHeightStyle();

    this.detectChanges();
  }

  /**
   *
   * @param childrenList Update list of children ids
   */
  private resetChildIndexes(childrenList: Array<BaseComponent>) {
    if (childrenList != null && childrenList.length > 0) {
      if (this._childrenIndex !== null) {
        this._childrenIndex = _.uniq(_.concat(childrenList.map(child=>child.getId()), this._childrenIndex));
      }
    }
  }

  /**
   * Set dimensions of panel based on [[controlHeight]] and [[controlWidth]] properties
   * @param heightStyleName
   * @param widthStyleName
   */
  protected initWidthHeightStyle(heightStyleName: string = 'height', widthStyleName: string = 'max-width') {
    if (this.controlHeight != null && this.controlHeight != "" && parseInt(this.controlHeight) > 0) {
      this.panelStyles["height"] = parseInt(this.controlHeight) + "px";
    }

    if (this.controlWidth != null && this.controlWidth != "" && parseInt(this.controlWidth) > 0) {
      this.panelStyles[widthStyleName] = parseInt(this.controlWidth) + "px";
    }
  }

  /**
   * Set [[disabled]] property value
   * @param boo Toggle disabled
   */
  setDisabled(boo: boolean){
    this.disabled = boo;
    this.getChildren().toArray().forEach(item => {
      item.setAttribute(AttributesEnum.DISABLED, boo);
    })
  }

  /**
   * Set [[visible]] property value
   * @param boo Toggle visibility
   */
  setVisible(boo: boolean) {
    this.visible = boo;
    if (this.visible) {
      this.removeCssClass('hidden');
      this.getElement().removeAttribute('hidden');
      
      const parentView = this.getParentView();

      if (parentView != null) {
        parentView.resetAllTablesColumnResizer();
      }
    } else {
      this.addCssClass('hidden');
      this.getElement().setAttribute('hidden', '');
    }
  }

  /**
   * Check if [[caption]] property exists and is set
   * @returns True if caption exists and has content, otherwise false
   */
  get hasCaption(): boolean {
    return this.caption != null && this.caption.length > 0;
  }

  /**
   * Check if [[layout]] property exists
   * @returns True if layout exists, otherwise false
   */
  get containerLayout(): boolean {
    return this.layout != null;
  }

  /**
   * Get the [[cd]] (ChangeDetectorRef) property
   * @returns Change detector for this panel
   */
  protected getChangeDetector(): ChangeDetectorRef {
    return this.cd;
  }

  /**
   * Check whether or not this component is a container
   * @returns True since panels are always containers
   */
  protected isContainer() {
    return true;
  }

  protected getNxTagName(): string {
    return "panel";
  }
}
