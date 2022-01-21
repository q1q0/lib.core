import { Component, OnInit, ElementRef, ChangeDetectionStrategy, SkipSelf, Optional, forwardRef, Renderer2, ChangeDetectorRef, Input, ViewChild, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';

declare var $;

/**
 * Class for scroll pane component
 */
@Component({
  selector: 'vt-scroll-pane',
  templateUrl: './scroll-pane.component.html',
  styleUrls: ['./scroll-pane.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BaseComponent,
      useExisting: forwardRef(()=>ScrollPaneComponent)
    }
  ]
})
export class ScrollPaneComponent extends BaseComponent implements OnInit {

  //指定された分だけ固定部分として除き、それ以外を可変領域とする
  @Input() resizeHeight: string;
  @Input() skipScrollAdjustment: boolean;

  @ViewChild('scrollDiv') scrollDivElement: ElementRef;

  private _scrollerHandler: (event)=>void;

  private _scrollVerticalPos = 0;

  private _scrollHandlerTm: any;

  /**
   *
   * @param parent see [[BaseComponent]] constructor
   * @param sessionService see [[BaseComponent]] constructor
   * @param elementRef see [[BaseComponent]] constructor
   * @param renderer see [[BaseComponent]] constructor
   * @param cd Change detector for this component instance
   */
  constructor(
    @Optional() @SkipSelf() parent: BaseComponent,
    sessionService: SessionService,
    elementRef: ElementRef,
    renderer: Renderer2,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {
    super(parent, sessionService, elementRef, renderer);

    this._scrollerHandler = (event)=>{
      this.zone.runOutsideAngular(()=>{
        if (this._scrollHandlerTm != null) {
          clearTimeout(this._scrollHandlerTm);
        }

        //we need to calculate scroll position when scroll stop
        this._scrollHandlerTm = setTimeout(()=>{
          this.handleOnScroll(event);
        }, 300);
      });
    }
  }

  /**
   * Get [[cd]] (Change detector) property value
   * @returns Change detector reference
   */
  getChangeDetector() {
    return this.cd;
  }

  /**
   * After view init lifecycle. Set dimensions and trigger change detection
   */
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.controlHeight == null) {
      this.controlHeight = '100%';
    }
    if (this.controlHeight != null && this.controlHeight !== "") {
      this.styles["height"] = this.controlHeight + "px";
    }

    if (this.controlWidth != null && this.controlWidth !== "") {
      this.styles["max-width"] = this.controlWidth + "px";
    }

    if (this.maxHeight != null && this.maxHeight !== "") {
      this.styles["max-height"] = this.maxHeight + "px";
    }
    if (this.resizeHeight != null && this.resizeHeight !== "") {
      this.styles["height"] = "calc(100% - " + this.resizeHeight + "px)";
    }

    this.zone.runOutsideAngular(()=>{
      //for https://github.com/weaveio/ngnsophia/issues/1392, track position of scroll pane
      //so it can be reset back when user switching tabs
      if (this.skipScrollAdjustment !== true) {
        (this.scrollDivElement.nativeElement as HTMLElement).addEventListener("scroll", this._scrollerHandler, true);
      }
    });

    this.detectChanges();
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    (this.scrollDivElement.nativeElement as HTMLElement).removeEventListener("scroll", this._scrollerHandler, true);
    this._scrollerHandler = null;
  }

  /**
   * Scroll event of div
   */
  private handleOnScroll(event) {
    let scrollPaneElm = null;//NGN-2307: scroll event of scroll-pane occurred while scrolling on the table.
    if (event !== null) {
      if($(event.srcElement).hasClass('vt-scroll-pane')){
        scrollPaneElm = event.srcElement;
      }
    }
    if(scrollPaneElm == null){
      const elements = $(this.scrollDivElement.nativeElement).closest('.vt-scroll-pane');
      if(elements.length < 1){
          return;
      }
      scrollPaneElm = elements[0];
    }
    this._scrollVerticalPos = scrollPaneElm.scrollTop;
    // console.log(`handleOnScroll: ${this.id}: ${this._scrollVerticalPos}`);
  }

  resetScrollTopToPreviousPosition() {
    this.zone.runOutsideAngular(()=>{
      setTimeout(()=>{
        // console.log(`resetScrollTopToPreviousPosition: ${this.id}: ${this._scrollVerticalPos}`);
        if(this.scrollDivElement.nativeElement.scrollTop != this._scrollVerticalPos) {
          this.scrollDivElement.nativeElement.scrollTop = this._scrollVerticalPos;
        }
      }, 300);
    });
  }

  resetScrollTopPosition() {
    this.zone.runOutsideAngular(()=>{
      setTimeout(()=>{
        this._scrollVerticalPos = 0;
        this.scrollDivElement.nativeElement.scrollTop = this._scrollVerticalPos;
      }, 300);
    });
  }

  isScrollView(): boolean {
    return true;
  }

  isScrollPane() {
    return true;
  }

  handleKeyDown(event: KeyboardEvent){
    if (event.keyCode === 38 || event.keyCode === 40){
      event.preventDefault();
    }
  }
}
