import { Directive, ElementRef, Input, Renderer2, AfterViewInit, OnDestroy, Host, ContentChild, NgZone } from '@angular/core';
import { SessionService } from '../session/session.service';
import { TableComponent } from '../table/table.component';
import { UiDocument } from '../base/ui-document';
import * as _ from 'lodash';

declare var $;
interface Position {
  x: number,
  y: number
}

@Directive({
  selector: '[vtDraggable]',
  host: {
    // '(dragstart)': 'onDragStart($event)',
    // '(dragend)': 'onDragEnd($event)',
    // '(drag)': 'onDrag($event)',
    '(click)': 'onClick($event)'
  }
})
export class DraggableDirective implements AfterViewInit, OnDestroy {
  public positionAttrValues: Array<string> = ['absolute', 'fixed', 'relative'];
  @Input() vtDraggable: boolean;
  @Input("modal") modal: boolean;
  @Input() isView: boolean = true;

  private viewId: string;
  private tableId: string; //リサイズ時に操作するテーブルタグのID

  private parentElement:any;

  @Input() title: string;

  screenIndex: number;

    /** @Input */ @Input() canDrag: boolean = true; //this is dumn but work around for now (for main mdi window where we don't want to drag)
  @ContentChild('draggablePanel', { read: ElementRef }) draggablePanel: ElementRef;
  @ContentChild('myModal', { read: ElementRef }) parentPanel: ElementRef;

  mouseDownHandler: (event) => void;
  mouseMoveHandler: (event) => void;
  mouseUpHandler: (event) => void;

  private canTrackMouseMove: boolean = false;
  private mousePosition: Position = {
    x: 0,
    y: 0
  };

  constructor(
    public renderer: Renderer2,
    public ngZone: NgZone,
    private sessionService: SessionService) {
      this.mouseDownHandler = (event) => this.onMouseDownHandler(event);
      this.mouseMoveHandler = _.throttle((event) => this.onMouseMoveHandler(event),75);
      this.mouseUpHandler = (event) => this.onMouseUpHandler(event);
  }

  public addDragListeners() {
    let dragElement: HTMLElement = this.getDragElement();

    if (dragElement) {
      this.ngZone.runOutsideAngular(() => {
          dragElement.addEventListener('mousedown', this.mouseDownHandler, true);
          document.addEventListener('mouseup', this.mouseUpHandler, true);
          dragElement = null;
      });
    }
  }

  public removeDragListeners() {
    let dragElement: HTMLElement = this.getDragElement();

    if (dragElement) {
        dragElement.removeEventListener('mousedown', this.mouseDownHandler, true);
        document.removeEventListener('mousemove', this.mouseMoveHandler, true); // 念のため置いておく
        document.removeEventListener('mouseup', this.mouseUpHandler, true);
        dragElement = null;
    }
  }

  public ngAfterViewInit(): void {
    this.addDragListeners();
    if(this.isView){
      this.parentElement = this.parentPanel.nativeElement;
    }
    else{
      this.parentElement = this.parentPanel.nativeElement.parentElement.parentElement.parentElement;//get div('modal-dialog')
    }
    if (this.canDrag && this.parentElement != null) {
      // const bound = this.getBound((this.parentPanel.nativeElement as HTMLElement).firstChild as HTMLElement);
      // console.error(bound);
      //this.parentPanel.nativeElement.style.position = "absolute";
      //this.applyTranslate(bound.x, bound.y);
    } else {
      this.canDrag = false;
    }

  }

  public ngOnDestroy(): void {
    this.removeDragListeners();

    delete this.renderer;
    delete this.ngZone;
    delete this.draggablePanel;
    delete this.mouseDownHandler;
    delete this.mouseMoveHandler;
    delete this.mouseUpHandler;
    delete this.parentPanel;
  }

  onMouseDownHandler(event: any) {
    let dragElement: HTMLElement = this.getDragElement();

    if (dragElement) {
      this.ngZone.runOutsideAngular(() => {
          document.addEventListener('mousemove', this.mouseMoveHandler, true);
          dragElement = null;
      });
    }
    this.mousePosition = {
      x: event.pageX,
      y: event.pageY
    };

    if (this.canDrag) {
      if(this.isView){//for main dialog
        const bound = this.getBound(this.parentElement);
        this.renderer.setStyle(this.parentElement, "position", "absolute");
        this.renderer.setStyle(this.parentElement, "margin", "0");
        this.applyTranslate(bound.x, bound.y);
        this.moveWindowToTop();
        this.canTrackMouseMove = true;
      }
      else{//for error/info dialog
        const bound = this.getBound(this.parentElement);
        const height = this.parentElement.offsetHeight + 'px';
        const width = this.parentElement.offsetWidth + 'px';
        this.renderer.setStyle(this.parentElement, "position", "absolute");
        this.renderer.setStyle(this.parentElement, "margin", "0");
        this.renderer.setStyle(this.parentElement,'height', height);
        this.renderer.setStyle(this.parentElement,'width', width);
        this.applyTranslate(bound.x, bound.y);
        this.canTrackMouseMove = true;
      }
    }
  }

  onMouseMoveHandler(event: MouseEvent) {
    if (this.canDrag && this.canTrackMouseMove) {
      const currentMousePosition: Position = {
        x: event.pageX,
        y: event.pageY
      }

      const diffX = currentMousePosition.x - this.mousePosition.x;
      const diffY = currentMousePosition.y - this.mousePosition.y;

      const parentBound = this.getBound(this.parentElement);

      const newX = parentBound.x + diffX;
      const newY = parentBound.y + diffY;
      this.applyTranslate(newX, newY);
      this.mousePosition = currentMousePosition;
    }
  }

  onMouseUpHandler(event: any) {
    let dragElement: HTMLElement = this.getDragElement();

    if (dragElement) {
        const boundingBox = dragElement.getBoundingClientRect();
        if (boundingBox.right < 0) {
          const newX = boundingBox.width * 0.1 - boundingBox.width;
          this.applyTranslate(newX, boundingBox.top);
        } else if (boundingBox.left > $(window).width()) {
          const newX = $(window).width() - boundingBox.width * 0.1;
          this.applyTranslate(newX, boundingBox.top);
        }
        if (boundingBox.top > $(window).height()) {
          const newY = $(window).height() - boundingBox.width * 0.1;
          this.applyTranslate(boundingBox.left, newY);
        }
        document.removeEventListener('mousemove', this.mouseMoveHandler, true);
        dragElement = null;
    }

    if (this.canDrag && this.canTrackMouseMove) {
      this.canTrackMouseMove = false;
    }

  }

  onClick(event: MouseEvent) {
    if (this.canDrag) {
      if(this.isView) this.moveWindowToTop();
    }
  }

  applyTranslate(x: number, y: number) {
    if (y > 0) {
      this.ngZone.runOutsideAngular(() => {
        let top: number = 0;
        // let left: number = 0;

        // This is height of app header
        let topMax = 92;

        if(this.isView) {
          top = Math.max(y, topMax);
        } else {
          top = Math.max(y, 0);
        }

        // if (this.sessionService.dialogMaxTopPosition > 0 && top > this.sessionService.dialogMaxTopPosition) {
        //   top = this.sessionService.dialogMaxTopPosition;
        // }

        let dialogMaxTopPosition = window.innerHeight - 64;
        if (dialogMaxTopPosition > 0 && top > dialogMaxTopPosition) {
          top = dialogMaxTopPosition;
        }

        //#1587: in the as-is, there is no limit to where you can drag the window to the left/right
        // left = Math.max(x, 0);

        this.renderer.setStyle(this.parentElement, 'top', top + 'px');
        this.renderer.setStyle(this.parentElement, 'left', x + 'px');
      });
    }
  }

  moveWindowToTop() {
    this.sessionService.getMcoContainer().reStackView(this.viewId, this.screenIndex);
  }

  setViewId(id: string) {
    if (id != null) {
      this.viewId = id;
    }
  }

  setTableId(id: string) {
    if (id != null) {
      this.tableId = id;
    }
  }

  private getDragElement(): HTMLElement {
    if (this.vtDraggable === true && this.draggablePanel) {
      return this.draggablePanel.nativeElement;
    }

    return null;
  }

  private getBound(el: HTMLElement): Position {
    const bound = el.getBoundingClientRect() as DOMRect;

    return {
      x: bound.x || bound.left,
      y: bound.y || bound.top
    }
  }
}
