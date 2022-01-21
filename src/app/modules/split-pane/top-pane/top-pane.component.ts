import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

/**
 * Class for top/left split-pane section
 */
@Component({
  selector: 'vt-top',
  templateUrl: './top-pane.component.html',
  styleUrls: ['./top-pane.component.css']
})
export class TopPaneComponent implements OnInit {
  @ViewChild(TemplateRef) content;
  
  constructor() { }

  ngOnInit() {
  }

}
