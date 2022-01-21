import { Directive, Input, TemplateRef, ContentChild, OnInit } from '@angular/core';

import { TableCellDirective } from './table-cell.directive';
import { TableHeaderDirective } from './table-header.directive';
import { HeaderDirective } from './header.directive';
import { BaseComponent } from '../base/base.component';
import { AttributesEnum } from '../base/attributes.enum';
import { JavaUtils } from '../java/java-utils';
import * as _ from "lodash";

@Directive({
    selector: 'vt-table-column'
})
export class TableColumnDirective implements OnInit {
    //TODO
    @Input() locked: boolean = false;

    //TODO
    @Input() enabled: boolean = true;

    @Input() sortable: boolean = true;

    @Input() isChecked: boolean = false;

    @Input() resizable: boolean = true;//For NGN-2313
    /**
     * Horizontal alignment (center, left, right)
     */
    @Input() alignHorizontal: string;

    @Input() id: string;

    @Input() sorting: string;

    //cell template
    @ContentChild(TableCellDirective, {read: TableCellDirective})
    cellTemplate: TableCellDirective;

    //header template if we want to render the header differently (i.e. checkbox, etc)
    @ContentChild(TableHeaderDirective, {read: TemplateRef})
    headerTemplate: TemplateRef<any>;

    //header tag?
    @ContentChild(HeaderDirective) headerDirective: HeaderDirective;

    //default, use the {header} as the header for the cell
    @Input() set header (header: string) {
        this._header = header;
    }

    get header(): string {
        return this.headerDirective ? this.headerDirective.text : this._header;
    }

    @Input() autoWrap: boolean;

    _header: string;

    sortDirection: string;

    originalColumnIndex: number;

    @Input() controlWidth: string | number;

    @Input() controlMinWidth: string | number;

    @Input() controlHeight: string | number;

    @Input() cellHeight: string | number;

    @Input() headerHeight: string | number;

    @Input() set visible(vis: boolean) {
        this._visible = vis;

        if (this._visible === true) {
            if (this.styles) {
                delete this.styles["display"];
            }
        } else {
            if (this.styles) {
                this.styles["display"] = "none";
            } else {
                this.styles = {
                    "display": "none"
                }
            }
        }
    }

    get visible() {
        return this._visible;
    }

    _visible: boolean = true;

    @Input() customAttributes: {[name: string]: any};

    styles: {[name: string]: string};

    get isHeaderTemplate() {
        return this.headerTemplate === null || this.headerTemplate === undefined ? false : true;
    }

    /**
     * Don't track this column (that is, use for display only).
     */
    @Input() skipTracking: boolean;

    //work around for now
    @Input() soColumnNo: string;
    @Input() SoColumnNo: string;
    @Input() idName: string;

    parent: BaseComponent;

    ngOnInit() {
      if (this.headerDirective != null) {
        this.header = this.headerDirective.text;

        if (this.autoWrap == null) {
            this.autoWrap = this.headerDirective.autoWrap === true || this.headerDirective.autoWrap === "true"
        }
      }

      if (this.id == null) {
          this.id = BaseComponent.generateUniqueId("column");
      }

      if (this.headerHeight != null) {
        this.headerHeight = this.headerHeight;
      }

      if (this.soColumnNo != null) {
        this.setAttribute("soColumnNo", this.soColumnNo);
      }

      //for typos
      if (this.SoColumnNo != null) {
        this.setAttribute("soColumnNo", this.SoColumnNo);
      }

      if (this.idName != null) {
        this.setAttribute("idName", this.idName);
      }

    }

    setAttribute(name: string, value: string) {
        if (typeof name === "number" && name === AttributesEnum.VISIBLE) {
            this.visible = JavaUtils.parseBoolean(value);
        } else {
            if (this.customAttributes == null) {
                this.customAttributes = {};
            }

            this.customAttributes[name] = value;
        }
    }

    getAttribute(name: string): string {
        if (typeof name === "number" && name === AttributesEnum.VISIBLE) return this.visible as any;
        if (typeof name === "number" && name === AttributesEnum.ID) return this.id;

        let retVal = null;

        if (this.customAttributes != null) {
          retVal = this.customAttributes[name];

          if (retVal == null) {
            const keys = _.keys(this.customAttributes);

            //search for wrong case
            for (let key of keys) {
              if (typeof key === "string" && typeof name === "string" && key.toLowerCase() === name.toLowerCase()) {
                retVal = this.customAttributes[key];
              }
            }
          }

          if (retVal != null && typeof retVal !== "string") {
            retVal = retVal + "";
          }
        }

        return retVal;
    }

    setVisible(vis: boolean) {
      this.visible = vis;
    }

    getId() {
      return this.id;
    }

    getParent() {
      return this.parent;
    }
}
