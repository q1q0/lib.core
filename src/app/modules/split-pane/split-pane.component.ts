import { Component, ChangeDetectionStrategy, Input, ContentChild, ViewChild, ElementRef, Optional, SkipSelf, Renderer2, NgZone, ChangeDetectorRef, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { BottomPaneComponent } from './bottom-pane/bottom-pane.component';
/* istanbul ignore next */
import { TopPaneComponent } from './top-pane/top-pane.component';
import { SessionService } from '../session/session.service';
import * as _ from 'lodash';

declare var $: any;

/**
 * Class for split resizable panes
 */
@Component({
  selector: 'vt-split-pane',
  templateUrl: './split-pane.component.html',
  styleUrls: ['./split-pane.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>SplitPaneComponent)
    }
  ]
})
export class SplitPaneComponent extends BaseComponent {
  /**
   * 'horizontal' = top/bottom panes, 'vertical' = left/right panes
   */
  @Input() orientation: string = 'horizontal';

  /**
   * Where the divider position should be set
   */
  @Input() splitPosition: string = '50%'; //percent
  /**
   * Set true, in case of cascading split pane
   */
  @Input() set noScroll(value){
    this._noScroll = value;
    this.topPaneStyles['overflow'] = value ? 'hidden' : 'inherit';
    this.bottomPaneStyles['overflow'] = value ? 'hidden' : 'inherit';
  }
  get noScroll(){ return this._noScroll; }
  private _noScroll: boolean = false;

  @ViewChild("topPaneSection", {read: ElementRef}) topPaneElement: ElementRef;
  @ViewChild("splitPaneDivider", {read: ElementRef}) splitPaneDivider: ElementRef;
  @ViewChild("bottomPaneSection", {read: ElementRef}) bottomPaneElement: ElementRef;
  @ViewChild("splitPaneContainer", {read: ElementRef}) splitPaneContainer: ElementRef;

  @ContentChild(TopPaneComponent) topPane: TopPaneComponent;
  @ContentChild(BottomPaneComponent) bottomPane: BottomPaneComponent;

  dividerStyles: {[name: string]: string} = {};
  topPaneStyles: {[name: string]: string} = {};
  bottomPaneStyles: {[name: string]: string} = {};

  dividerCssClass = ["split-pane-divider"];

  private _resizeOn: boolean = false;
  private _handleMouseMove: (event)=>void;
  private _handleMouseDown: (event)=>void;
  private _handleMouseUp: (event)=>void;
  private _prevPos = -1;
  private _containerHeight: number;
  private _containerWidth: number;
  private _update = false;
  private scrollHandler: Function = null;
  private _preScrollTop = 0;
  /* istanbul ignore next */
  /**
   *
   * @param parent see [[BaseComponent]] constructor
   * @param sessionService see [[BaseComponent]] constructor
   * @param elementRef see [[BaseComponent]] constructor
   * @param renderer see [[BaseComponent]] constructor
   * @param zone Inject [[NgZone]] reference
   * @param cd Inject [[ChangeDetectorRef]]
   */
  constructor(@Optional() @SkipSelf() parent: BaseComponent, sessionService: SessionService, elementRef: ElementRef, renderer: Renderer2, private zone: NgZone, private cd: ChangeDetectorRef) {
    super(parent, sessionService, elementRef, renderer);

    this._handleMouseMove =  _.throttle((event)=>{
      this._resizePanels(event);
    },150);

    this._handleMouseDown = (event)=>{
      this.zone.runOutsideAngular(()=>{
        document.addEventListener('mousemove', this._handleMouseMove, true);
      });

      if (this.orientation === "vertical") {
        this._prevPos = event.pageX;
      } else {
        this._prevPos = event.pageY;
      }
      this._resizeOn = true;
      this._update = false;
    };

    this._handleMouseUp = (event)=>{
      this.zone.runOutsideAngular(()=>{
        document.removeEventListener("mousemove", this._handleMouseMove, true);
      });

      this._resizeOn = false;
      this._update = true;
    }

    this.scrollHandler = (event: Event) => {
      this._preScrollTop = (event.srcElement as HTMLElement).scrollTop;
    }
  }

  /* istanbul ignore next */
  /**
   * Init lifecycle. Set panel width
   */
  ngOnInit() {
    super.ngOnInit();
    this.setPaneWidth();
  }

  /* istanbul ignore next */
  moveUp() {
    if (this.orientation === 'horizontal') {
      this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "0%");
      this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "calc(100% - 13px)");
    } else {
      this.renderer.setStyle(this.topPaneElement.nativeElement, "width", "calc(100% - 13px)");
      this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", "0%");
    }
  }

  /* istanbul ignore next */
  moveDown() {
    if (this.orientation === 'horizontal') {
      this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "calc(100% - 13px)");
      this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "0%");
    } else {
      this.renderer.setStyle(this.topPaneElement.nativeElement, "width", "0%");
      this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", "calc(100% - 13px)");
    }
  }

  /**
   * Check if this is a container component
   * @returns True
   */
  protected isContainer() {
    return true;
  }

  /* istanbul ignore next */
  /**
   * Set pane layout and dimensions
   */
  private setPaneWidth() {
    if (this.orientation === 'vertical') {
      this.dividerStyles["height"] = "100%";
      this.dividerStyles["width"] = "1px";
      this.dividerStyles['float'] = 'left';
      this.topPaneStyles['width'] = 'calc(' + this.splitPosition + ' - 3px)';
      this.topPaneStyles['height'] = "100%";
      this.topPaneStyles['float'] = 'left'
      let percent: string = this.splitPosition.split('%', 1)[0];
      let nPercent = +percent;
      this.bottomPaneStyles['width'] = 'calc(' + (100 - nPercent) + '% - 10px)';
      this.bottomPaneStyles['height'] = "100%";
      this.bottomPaneStyles['float'] = 'left';
      this.dividerCssClass.push("vertical");
    } else {
      this.dividerStyles["height"] = "8px";
      this.dividerStyles["width"] = "100%";
      this.topPaneStyles['height'] = 'calc(' + this.splitPosition + ' - 3px)';
      this.topPaneStyles['width'] = "100%";
      let percent: string = this.splitPosition.split('%', 1)[0];
      let nPercent = +percent;
      this.bottomPaneStyles['height'] = 'calc(' + (100 - nPercent) + '% - 10px)';
      this.bottomPaneStyles['width'] = "100%";
      this.dividerCssClass.push("horizontal");
    }
  }

  /**
   * After view init lifecycle. Add event listeners
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.detectChanges();

    this.zone.runOutsideAngular(()=>{
      (this.splitPaneDivider.nativeElement as HTMLElement).addEventListener("mousedown", this._handleMouseDown, true);
      this.topPaneElement.nativeElement.addEventListener('scroll', this.scrollHandler, true);
      document.addEventListener("mouseup", this._handleMouseUp, true);
    });
  }

  /* istanbul ignore next */
  /**
   * Destroy lifecycle. Remove event listeners
   */
  ngOnDestroy() {
    this.zone.runOutsideAngular(()=>{
      (this.splitPaneDivider.nativeElement as HTMLElement).removeEventListener("mousedown", this._handleMouseDown, true);
      document.removeEventListener("mouseup", this._handleMouseUp, true);
      document.removeEventListener("mousemove", this._handleMouseMove, true);
      this.topPaneElement.nativeElement.removeEventListener('scroll', this.scrollHandler, true);
    });

    this._handleMouseDown = null;
    this._handleMouseMove = null;
    this._handleMouseUp = null;
    this.scrollHandler = null;
    super.ngOnDestroy();
  }

  /**
   * Get value of [[cd]] (ChangeDetectorRef) property
   * @returns The component's change detector
   */
  protected getChangeDetector() {
    return this.cd;
  }

  /* istanbul ignore next */
  /**
   * Event handler for panel resize event
   * @param event Mouse event
   */
  private _resizePanels(event: MouseEvent) {
    if (!this._update) {
      if (this._containerWidth == null) {
        const c = $(this.splitPaneContainer.nativeElement);
        this._containerHeight = c.height();
        this._containerWidth = c.width();
      }

      this._update = true;
      requestAnimationFrame(()=>this._doUpdate(event));
    }
  }

  /* istanbul ignore next */
  /**
   * Event handler for mouse event. Update pane width/height
   * @param event Mouse event
   */
  private _doUpdate(event: MouseEvent) {
    if (this._resizeOn === true) {
      if (this.orientation === "vertical") {
        const diff = this._prevPos - event.pageX;
        const leftWidth =  ($(this.topPaneElement.nativeElement).width() - diff);
        this._containerWidth = $(this.splitPaneContainer.nativeElement).width();
        let left: number = (leftWidth / this._containerWidth) * 100;
        let maximum: number = (leftWidth / (this._containerWidth - 15)) * 100;
        if( maximum > 100 ) this.renderer.setStyle(this.topPaneElement.nativeElement, "width", "calc(100% - 13px)");
        else this.renderer.setStyle(this.topPaneElement.nativeElement, "width", left + "%");
        // this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", (this._containerWidth - (leftWidth + 6)) + "px");
        this.renderer.setStyle(this.bottomPaneElement.nativeElement, "width", "calc(" + (100 - left) + "% - 13px)");
        this._prevPos = event.pageX;
      } else {
        const diff = this._prevPos - event.pageY;
        const topHeight =  ($(this.topPaneElement.nativeElement).height() - diff);
        this._containerHeight = $(this.splitPaneContainer.nativeElement).height();
        let top: number = (topHeight / this._containerHeight) * 100;
        if( top < 0 ) top = 0;
        let maximum: number = (topHeight / (this._containerHeight - 13)) * 100;
        if( maximum > 100 ) this.renderer.setStyle(this.topPaneElement.nativeElement, "height", "calc(100% - 13px");
        else this.renderer.setStyle(this.topPaneElement.nativeElement, "height", top + "%");
        // this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", (this._containerHeight - (topHeight + 10)) + "px");
        if( top != 0){
          this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "calc(" + (100 - top) + "% - 13px)");
        } else {
          this.renderer.setStyle(this.bottomPaneElement.nativeElement, "height", "calc(" + (100 - top) + "% - 18px)");
        }

        this._prevPos = event.pageY;
      }

      this._update = false;
    }
  }

  resetScrollTopToPreviousPosition() {
    this.zone.runOutsideAngular(()=>{
      if(this.topPaneElement != null){
        this.topPaneElement.nativeElement.scrollTop = this._preScrollTop;
      }
    });
  }

  isSplitPanel() {
    return true;
  }
}
