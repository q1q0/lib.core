import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

/**
 * Class for bottom/right split-pane section
 */
@Component({
  selector: 'vt-bottom',
  templateUrl: './bottom-pane.component.html',
  styleUrls: ['./bottom-pane.component.css']
})
export class BottomPaneComponent implements OnInit {
  @ViewChild(TemplateRef) content;
  
  constructor() { }

  ngOnInit() {
  }

}
