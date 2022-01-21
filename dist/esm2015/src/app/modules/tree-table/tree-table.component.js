/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, SkipSelf, Optional, QueryList, ViewEncapsulation, NgZone, ContentChildren, ViewChild, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SessionService } from '../session/session.service';
import { TableColumnDirective } from '../table/table-column.directive';
import { HTMLElementWrapper } from './html-element-wrapper';
import * as _ from "lodash";
import { Vector } from '../java/vector';
/**
 * Class for tree table component
 */
export class TreeTableComponent extends BaseComponent {
    /**
     * @param {?} parent
     * @param {?} sessionService
     * @param {?} elementRef
     * @param {?} zone
     * @param {?} renderer
     * @param {?} cd
     */
    constructor(parent, sessionService, elementRef, zone, renderer, cd) {
        super(parent, sessionService, elementRef, renderer);
        this.zone = zone;
        this.cd = cd;
        this.nodes = [];
        this.selectedNodes = [];
        this.selectedRowElements = [];
    }
    /**
     * Init lifecycle. Must call parent ngOnInit
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        // Width/Height is required otherwise grid will collapse to zero.
        // if (!this.controlHeight) this.controlHeight = '500px';
        // if (!this.controlWidth) this.controlWidth = '500px';
    }
    /**
     * After view init lifecycle. Set table columns and call parent ngAfterViewInit
     * @return {?}
     */
    ngAfterViewInit() {
        //make sure to call sure it can init thing
        super.ngAfterViewInit();
        this.createDocFragment();
        if (this.columns != null && this.columns.length > 0) {
            this.columnDefs = [];
            this.columns.forEach(column => {
                this.columnDefs.push({
                    headerName: column.header,
                    controlWidth: column.controlWidth
                });
            });
        }
        if (this.rowData && this.rowData.length > 0) {
            this.zone.runOutsideAngular(() => {
                jQuery(`#${this.id} .jq-tree-table`).treetable();
            });
        }
    }
    /**
     * Destroy lifecycle. Delete tree nodes to clear out references
     * @return {?}
     */
    ngOnDestroy() {
        this.tableBody = null;
        this._bodyFragment = null;
        if (this.nodes != null) {
            for (let node of this.nodes) {
                node.destroy();
            }
        }
        this.nodes = null;
    }
    /**
     * Remove all child rows from this table
     * @return {?}
     */
    clearRows() {
        // while(this.tableBody.nativeElement.firstChild) {
        //   this.renderer.removeChild(this.tableBody.nativeElement, this.tableBody.nativeElement.firstChild);
        // }
        (/** @type {?} */ (this.tableBody.nativeElement)).innerHTML = "";
        this.nodes = [];
        this.selectedNodes = [];
        this.selectedRowElements = [];
        this.createDocFragment();
    }
    /**
     * Create table row but DO NOT append to table
     * @return {?}
     */
    createRow() {
        /** @type {?} */
        const row = new HTMLElementWrapper(this.renderer, "row", this.getSession());
        row.setAttribute("id", BaseComponent.generateUniqueId("row"));
        row.parentTableId = this.id;
        row.parentTable = this;
        this.setParentScreenId(row);
        this.zone.runOutsideAngular(() => {
            row.htmlElement.addEventListener("mousedown", () => {
                if (this.selectedNodes != null) {
                    this.selectedNodes.forEach(idx => {
                        this._selectRow(idx, false);
                    });
                }
                this.selectedRowElements = [];
                this.selectRow(row, true);
            });
        });
        this.trackNode(row);
        return row;
    }
    /**
     * Create table row and append to table
     * @return {?}
     */
    addRow() {
        /** @type {?} */
        const row = this.createRow();
        if (this.useDocFragment === true) {
            this._bodyFragment.appendChild(row.htmlElement);
        }
        else {
            this.renderer.appendChild(this.tableBody.nativeElement, row.htmlElement);
        }
        row.htmlElement.style["background"] = "";
        return row;
    }
    /**
     * Set a row as selected and set selected style
     * @param {?} nodeIndex Index of node/row to select
     * @param {?} isSelected Toggle to set selected style
     * @return {?}
     */
    _selectRow(nodeIndex, isSelected) {
        /** @type {?} */
        let idx = _.findIndex(this.selectedNodes, (node) => {
            return node === nodeIndex;
        });
        /* istanbul ignore if */
        if (isSelected) {
            //if it wasn't selected, add it in selectedRows.
            if (idx < 0) {
                this.selectedNodes.push(nodeIndex);
                this.nodes[nodeIndex].htmlElement.querySelector('td').style.color = 'blue';
            }
        }
        else {
            //if it was selected before, remove it from selectedRows.
            if (idx >= 0) {
                this.selectedNodes.splice(idx, 1);
                this.nodes[nodeIndex].htmlElement.querySelector('td').style.color = "";
            }
        }
    }
    /**
     * This function is called by setAttribute(row, value);
     * @param {?} row Row to set as selected row
     * @param {?} isSelected Toggle selected state and style
     * @return {?}
     */
    selectRow(row, isSelected) {
        if (this.nodes == null)
            return;
        /** @type {?} */
        let nodeIndex = _.findIndex(this.nodes, (node) => {
            return node === row;
        });
        /** @type {?} */
        let tds = this.elementRef.nativeElement.querySelectorAll('td');
        for (let i = 0; i < tds.length; i++) {
            (/** @type {?} */ (tds[i])).style.color = '';
        }
        for (let i = 0; i < this.nodes.length; i++) {
            this._selectRow(i, false);
        }
        this._selectRow(nodeIndex, true);
        if (isSelected) {
            this.selectedRowElements.push(row);
        }
        else {
            this.selectedRowElements = this.selectedRowElements.filter(el => {
                return el._uniqueId !== row._internalId;
            });
        }
    }
    /**
     * @return {?}
     */
    getSelectedRows() {
        return this.selectedRowElements;
    }
    /**
     * Create table cell (will not append to anything)
     * @return {?} The table cell that is created
     */
    createCell() {
        /** @type {?} */
        const cell = new HTMLElementWrapper(this.renderer, "cell", this.getSession());
        cell.setAttribute("id", BaseComponent.generateUniqueId("cell"));
        this.setParentScreenId(cell);
        //for cell, we need to append it to the row
        this.trackNode(cell);
        return cell;
    }
    /**
     * @deprecated used createCell instead
     * @return {?}
     */
    addCell() {
        return this.createCell();
    }
    /**
     * Re-render tree table. Must call jQuery plugin's method on element to re-render.
     * @return {?}
     */
    redrawTree() {
        this.zone.runOutsideAngular(() => {
            /* istanbul ignore next */
            jQuery(`#${this.id} .jq-tree-table`).treetable({
                expandable: true
            }, true);
            this.cd.markForCheck();
        });
    }
    /**
     * Expand all nodes in the tree
     * @return {?}
     */
    expandAll() {
        /* istanbul ignore next */
        jQuery(`#${this.id} .jq-tree-table`).treetable("expandAll");
        this.setNodeExpandedStatus("true");
    }
    /**
     * Collapse all node in the tree
     * @return {?}
     */
    collapseAll() {
        jQuery(`#${this.id} .jq-tree-table`).treetable("collapseAll");
        this.setNodeExpandedStatus("false");
    }
    /**
     * Get child nodes of the table
     * @return {?} [[nodes]]
     */
    getTableChildren() {
        return this.nodes;
    }
    /**
     * Get number of child nodes for this tree
     * @return {?} Number of child nodes
     */
    getChildCount() {
        return this.nodes != null ? this.nodes.length : 0;
    }
    /**
     * Get child node by id
     * @param {?} id
     * @return {?}
     */
    getChildById(id) {
        if (this.nodes != null) {
            /** @type {?} */
            const temp = _.filter(this.nodes, (item) => item.getId() === id);
            if (temp.length > 0) {
                return temp[0];
            }
        }
        return null;
    }
    /**
     * Get list of nodes from XPath expression string
     * @param {?} xpathExpression
     * @return {?}
     */
    evaluateXPath(xpathExpression) {
        /** @type {?} */
        const result = new Vector();
        /** @type {?} */
        const xpathResult = document.evaluate(xpathExpression.replace("cell[", "td[").replace("row[", "tr["), this.elementRef.nativeElement, null, XPathResult.ANY_TYPE, null);
        if (xpathResult != null) {
            /** @type {?} */
            let node = xpathResult.iterateNext();
            while (node) {
                result.add(node);
                node = xpathResult.iterateNext();
            }
        }
        return result;
    }
    /**
     * Adds child node to the tree
     * @param {?} node Child to add
     * @return {?}
     */
    trackNode(node) {
        if (this.nodes == null) {
            this.nodes = [];
        }
        this.nodes.push(node);
    }
    /**
     * Get NexaWeb tag name
     * @return {?} Tagname
     */
    getNxTagName() {
        return "treeTable";
    }
    /**
     * Get [[cd]] (Change detector) property
     * @return {?} Change detector reference
     */
    getChangeDetector() {
        return this.cd;
    }
    /**
     * Set node expanded property value
     * @param {?} status Value for node's expanded property
     * @return {?}
     */
    setNodeExpandedStatus(status) {
        if (this.nodes != null) {
            _.forEach(this.nodes, (node) => {
                if (node.getLocalName() === "row") {
                    node.expanded = status;
                }
            });
        }
    }
    /**
     * Get JSON representation for this component
     * @return {?} Component metadata as JSON object
     */
    toJson() {
        /** @type {?} */
        const retVal = super.toJson();
        if (this.nodes != null) {
            /** @type {?} */
            const children = this.nodes.filter(node => node.getLocalName() === "row");
            if (children.length > 0) {
                retVal["children"] = children.map(child => child.toJson());
            }
        }
        return retVal;
    }
    /**
     * Set the elements parent ID
     * @param {?} el
     * @return {?}
     */
    setParentScreenId(el) {
        if (this.getParentView() != null) {
            el.parentScreenId = this.getParentView().getId();
        }
    }
    /**
     * @return {?}
     */
    getNodes() {
        return this.nodes;
    }
    /**
     * @return {?}
     */
    createDocFragment() {
        if (this.useDocFragment === true) {
            this._bodyFragment = document.createDocumentFragment();
        }
    }
    /**
     * @return {?}
     */
    appendFragment() {
        if (this._bodyFragment != null) {
            (/** @type {?} */ (this.tableBody.nativeElement)).appendChild(this._bodyFragment);
        }
    }
}
TreeTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'vt-tree-table',
                template: "<div [id]=\"id\"\nclass=\"vt-tree-table {{cssClass}}\"\n[style.width]=\"controlWidth\"\n[style.height]=\"controlHeight\"\n[style.border-style]=\"borderStyle\">\n    <table\n        class=\"table jq-tree-table\" [style.border-width]=\"borderWidth\">\n        <thead #tableHeader>\n            <tr>\n                <th scope=\"col\" *ngFor=\"let col of columnDefs\" [style.width.px]=\"col.controlWidth\">\n                    {{col.headerName}}\n                </th>\n            </tr>\n        </thead>\n        <tbody #tableBody>\n            <tr *ngFor=\"let row of rowData; let i = index\">\n                <td *ngFor=\"let col of columnDefs\">\n                    {{row[col.field]}}\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                providers: [
                    {
                        provide: BaseComponent,
                        useExisting: forwardRef(() => TreeTableComponent)
                    }
                ],
                styles: ["table.treetable span.indenter{display:inline-block;margin:0;padding:0;text-align:right;-ms-user-select:none;user-select:none;-khtml-user-select:none;-moz-user-select:none;-o-user-select:none;-webkit-user-select:none;box-sizing:content-box;width:19px}table.treetable span.indenter a{background-position:left center;background-repeat:no-repeat;display:inline-block;text-decoration:none;width:19px}table.treetable{border:1px solid #888;border-collapse:collapse;font-size:.8em;line-height:1;width:100%}table.treetable caption{font-size:.9em;font-weight:700;margin-bottom:.2em}table.treetable thead{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAZCAYAAADwkER/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAD9JREFUeNpsxzEKgDAQAMHlQEhpYWuTF+RV+X+fmLU7ItgMDGoPYAXwJPOHkWxFbd9W1Dt7oZ4BTNSCeqDGOwDlRyvLRZQgvgAAAABJRU5ErkJggg==) top left repeat-x #aaa;font-size:.9em}table.treetable thead tr th{border:1px solid #888;font-weight:400;padding:.3em 1em .1em;text-align:left;height:6px}table.treetable tbody tr td{cursor:default;border-right:1px solid #8080ff}table.treetable span{background-position:center left;background-repeat:no-repeat;padding:.2em 0 .2em 1.5em}table.treetable span.file{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADoSURBVBgZBcExblNBGAbA2ceegTRBuIKOgiihSZNTcC5LUHAihNJR0kGKCDcYJY6D3/77MdOinTvzAgCw8ysThIvn/VojIyMjIyPP+bS1sUQIV2s95pBDDvmbP/mdkft83tpYguZq5Jh/OeaYh+yzy8hTHvNlaxNNczm+la9OTlar1UdA/+C2A4trRCnD3jS8BB1obq2Gk6GU6QbQAS4BUaYSQAf4bhhKKTFdAzrAOwAxEUAH+KEM01SY3gM6wBsEAQB0gJ+maZoC3gI6iPYaAIBJsiRmHU0AALOeFC3aK2cWAACUXe7+AwO0lc9eTHYTAAAAAElFTkSuQmCC)}table.treetable span.folder{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLxZO7ihRBFIa/6u0ZW7GHBUV0UQQTZzd3QdhMQxOfwMRXEANBMNQX0MzAzFAwEzHwARbNFDdwEd31Mj3X7a6uOr9BtzNjYjKBJ6nicP7v3KqcJFaxhBVtZUAK8OHlld2st7Xl3DJPVONP+zEUV4HqL5UDYHr5xvuQAjgl/Qs7TzvOOVAjxjlC+ePSwe6DfbVegLVuT4r14eTr6zvA8xSAoBLzx6pvj4l+DZIezuVkG9fY2H7YRQIMZIBwycmzH1/s3F8AapfIPNF3kQk7+kw9PWBy+IZOdg5Ug3mkAATy/t0usovzGeCUWTjCz0B+Sj0ekfdvkZ3abBv+U4GaCtJ1iEm6ANQJ6fEzrG/engcKw/wXQvEKxSEKQxRGKE7Izt+DSiwBJMUSm71rguMYhQKrBygOIRStf4TiFFRBvbRGKiQLWP29yRSHKBTtfdBmHs0BUpgvtgF4yRFR+NUKi0XZcYjCeCG2smkzLAHkbRBmP0/Uk26O5YnUActBp1GsAI+S5nRJJJal5K1aAMrq0d6Tm9uI6zjyf75dAe6tx/SsWeD//o2/Ab6IH3/h25pOAAAAAElFTkSuQmCC)}table.treetable tr.collapsed span.indenter a{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAHlJREFUeNrcU1sNgDAQ6wgmcAM2MICGGlg1gJnNzWQcvwQGy1j4oUl/7tH0mpwzM7SgQyO+EZAUWh2MkkzSWhJwuRAlHYsJwEwyvs1gABDuzqoJcTw5qxaIJN0bgQRgIjnlmn1heSO5PE6Y2YXe+5Cr5+h++gs12AcAS6FS+7YOsj4AAAAASUVORK5CYII=)}table.treetable tr.expanded span.indenter a{background-image:url(data:image/png;base64,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)}table.treetable tr.branch{background-color:#f9f9f9}table.treetable tr.selected{background-color:#3875d7;color:#fff}table.treetable tr span.indenter a{outline:0}table.treetable tr.collapsed.selected span.indenter a{background-image:url(data:image/png;base64,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)}table.treetable tr.expanded.selected span.indenter a{background-image:url(data:image/png;base64,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)}table.treetable tr.accept{background-color:#a3bce4;color:#fff}table.treetable tr.collapsed.accept td span.indenter a{background-image:url(data:image/x-png;base64,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)}table.treetable tr.expanded.accept td span.indenter a{background-image:url(data:image/x-png;base64,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)}vt-tree-table{overflow:auto}table.treetable tr:nth-child(odd){background:0 0}table.treetable tr:nth-child(even){background:#e6e6e6}"]
            }] }
];
/** @nocollapse */
TreeTableComponent.ctorParameters = () => [
    { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: SessionService },
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
TreeTableComponent.propDecorators = {
    rowData: [{ type: Input }],
    columnDefs: [{ type: Input }],
    useDocFragment: [{ type: Input }],
    columns: [{ type: ContentChildren, args: [TableColumnDirective,] }],
    tableBody: [{ type: ViewChild, args: ["tableBody", { read: ElementRef },] }]
};
if (false) {
    /** @type {?} */
    TreeTableComponent.prototype.rowData;
    /** @type {?} */
    TreeTableComponent.prototype.columnDefs;
    /** @type {?} */
    TreeTableComponent.prototype.useDocFragment;
    /** @type {?} */
    TreeTableComponent.prototype.columns;
    /** @type {?} */
    TreeTableComponent.prototype.tableBody;
    /** @type {?} */
    TreeTableComponent.prototype._bodyFragment;
    /** @type {?} */
    TreeTableComponent.prototype.nodes;
    /** @type {?} */
    TreeTableComponent.prototype.selectedNodes;
    /** @type {?} */
    TreeTableComponent.prototype.selectedRowElements;
    /** @type {?} */
    TreeTableComponent.prototype.zone;
    /** @type {?} */
    TreeTableComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3RyZWUtdGFibGUvdHJlZS10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBZ0IsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQWUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6UCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSTVELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQWtCeEMsTUFBTSx5QkFBMEIsU0FBUSxhQUFhOzs7Ozs7Ozs7SUFnQm5ELFlBQzBCLE1BQXFCLEVBQzdDLGNBQThCLEVBQzlCLFVBQXNCLEVBQ2QsTUFDUixRQUFtQixFQUNYO1FBRVIsS0FBSyxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBSjVDLFNBQUksR0FBSixJQUFJO1FBRUosT0FBRSxHQUFGLEVBQUU7cUJBVitCLEVBQUU7NkJBQ2QsRUFBRTttQ0FDd0IsRUFBRTtLQVcxRDs7Ozs7SUFLRCxRQUFRO1FBQ04sS0FBSyxDQUFDLFFBQVEsRUFBRSxD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WUF6QlEsYUFBYSx1QkEyQ2pCLFFBQVEsWUFBSSxRQUFRO1lBMUNoQixjQUFjO1lBRlksVUFBVTtZQUFrRSxNQUFNO1lBQTJDLFNBQVM7WUFBMkIsaUJBQWlCOzs7c0JBNEJsTixLQUFLO3lCQUNMLEtBQUs7NkJBQ0wsS0FBSztzQkFFTCxlQUFlLFNBQUMsb0JBQW9CO3dCQUdwQyxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRWxlbWVudFJlZiwgU2tpcFNlbGYsIE9wdGlvbmFsLCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbiwgVmlld0VuY2Fwc3VsYXRpb24sIE5nWm9uZSwgQ29udGVudENoaWxkcmVuLCBWaWV3Q2hpbGQsIFRlbXBsYXRlUmVmLCBSZW5kZXJlcjIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBUYWJsZUNvbHVtbkRpcmVjdGl2ZSB9IGZyb20gJy4uL3RhYmxlL3RhYmxlLWNvbHVtbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSFRNTEVsZW1lbnRXcmFwcGVyIH0gZnJvbSAnLi9odG1sLWVsZW1lbnQtd3JhcHBlcic7XG5cbmRlY2xhcmUgdmFyIGpRdWVyeTogYW55O1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gJy4uL2phdmEvdmVjdG9yJztcblxuLyoqXG4gKiBDbGFzcyBmb3IgdHJlZSB0YWJsZSBjb21wb25lbnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndnQtdHJlZS10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi90cmVlLXRhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHJlZS10YWJsZS5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQmFzZUNvbXBvbmVudCxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpPT5UcmVlVGFibGVDb21wb25lbnQpXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVUYWJsZUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSByb3dEYXRhOiBBcnJheTxhbnk+O1xuICBASW5wdXQoKSBjb2x1bW5EZWZzOiBBcnJheTxhbnk+O1xuICBASW5wdXQoKSB1c2VEb2NGcmFnbWVudDogYm9vbGVhbjtcblxuICBAQ29udGVudENoaWxkcmVuKFRhYmxlQ29sdW1uRGlyZWN0aXZlKVxuICBjb2x1bW5zOiBRdWVyeUxpc3Q8VGFibGVDb2x1bW5EaXJlY3RpdmU+O1xuXG4gIEBWaWV3Q2hpbGQoXCJ0YWJsZUJvZHlcIiwge3JlYWQ6IEVsZW1lbnRSZWZ9KSB0YWJsZUJvZHk6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIF9ib2R5RnJhZ21lbnQ6IERvY3VtZW50RnJhZ21lbnQ7XG5cbiAgcHJpdmF0ZSBub2RlczogQXJyYXk8SFRNTEVsZW1lbnRXcmFwcGVyPiA9IFtdO1xuICBzZWxlY3RlZE5vZGVzOiBBcnJheTxudW1iZXI+ID0gW107XG4gIHByaXZhdGUgc2VsZWN0ZWRSb3dFbGVtZW50czogQXJyYXk8SFRNTEVsZW1lbnRXcmFwcGVyPiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudDogQmFzZUNvbXBvbmVudCxcbiAgICBzZXNzaW9uU2VydmljZTogU2Vzc2lvblNlcnZpY2UsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHN1cGVyKHBhcmVudCwgc2Vzc2lvblNlcnZpY2UsIGVsZW1lbnRSZWYsIHJlbmRlcmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IGxpZmVjeWNsZS4gTXVzdCBjYWxsIHBhcmVudCBuZ09uSW5pdFxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIC8vIFdpZHRoL0hlaWdodCBpcyByZXF1aXJlZCBvdGhlcndpc2UgZ3JpZCB3aWxsIGNvbGxhcHNlIHRvIHplcm8uXG4gICAgLy8gaWYgKCF0aGlzLmNvbnRyb2xIZWlnaHQpIHRoaXMuY29udHJvbEhlaWdodCA9ICc1MDBweCc7XG4gICAgLy8gaWYgKCF0aGlzLmNvbnRyb2xXaWR0aCkgdGhpcy5jb250cm9sV2lkdGggPSAnNTAwcHgnO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEFmdGVyIHZpZXcgaW5pdCBsaWZlY3ljbGUuIFNldCB0YWJsZSBjb2x1bW5zIGFuZCBjYWxsIHBhcmVudCBuZ0FmdGVyVmlld0luaXRcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvL21ha2Ugc3VyZSB0byBjYWxsIHN1cmUgaXQgY2FuIGluaXQgdGhpbmdcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcblxuICAgIHRoaXMuY3JlYXRlRG9jRnJhZ21lbnQoKTtcblxuICAgIGlmICh0aGlzLmNvbHVtbnMgIT0gbnVsbCAmJiB0aGlzLmNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5jb2x1bW5EZWZzID0gW107XG5cbiAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKGNvbHVtbj0+e1xuICAgICAgICB0aGlzLmNvbHVtbkRlZnMucHVzaCh7XG4gICAgICAgICAgaGVhZGVyTmFtZTogY29sdW1uLmhlYWRlcixcbiAgICAgICAgICBjb250cm9sV2lkdGg6IGNvbHVtbi5jb250cm9sV2lkdGhcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yb3dEYXRhICYmIHRoaXMucm93RGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PiB7XG4gICAgICAgIGpRdWVyeShgIyR7dGhpcy5pZH0gLmpxLXRyZWUtdGFibGVgKS50cmVldGFibGUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGxpZmVjeWNsZS4gRGVsZXRlIHRyZWUgbm9kZXMgdG8gY2xlYXIgb3V0IHJlZmVyZW5jZXNcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudGFibGVCb2R5ID0gbnVsbDtcblxuICAgIHRoaXMuX2JvZHlGcmFnbWVudCA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5ub2RlcyAhPSBudWxsKSB7XG4gICAgICBmb3IgKGxldCBub2RlIG9mIHRoaXMubm9kZXMpIHtcbiAgICAgICAgbm9kZS5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5ub2RlcyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBjaGlsZCByb3dzIGZyb20gdGhpcyB0YWJsZVxuICAgKi9cbiAgY2xlYXJSb3dzKCkge1xuICAgIC8vIHdoaWxlKHRoaXMudGFibGVCb2R5Lm5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgIC8vICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLnRhYmxlQm9keS5uYXRpdmVFbGVtZW50LCB0aGlzLnRhYmxlQm9keS5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIC8vIH1cblxuICAgICh0aGlzLnRhYmxlQm9keS5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgdGhpcy5ub2RlcyA9IFtdO1xuICAgIHRoaXMuc2VsZWN0ZWROb2RlcyA9IFtdO1xuICAgIHRoaXMuc2VsZWN0ZWRSb3dFbGVtZW50cyA9IFtdO1xuICAgIHRoaXMuY3JlYXRlRG9jRnJhZ21lbnQoKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBDcmVhdGUgdGFibGUgcm93IGJ1dCBETyBOT1QgYXBwZW5kIHRvIHRhYmxlXG4gICAqL1xuICBjcmVhdGVSb3coKTogSFRNTEVsZW1lbnRXcmFwcGVyIHtcbiAgICBjb25zdCByb3c6IEhUTUxFbGVtZW50V3JhcHBlciA9IG5ldyBIVE1MRWxlbWVudFdyYXBwZXIodGhpcy5yZW5kZXJlciwgXCJyb3dcIiwgdGhpcy5nZXRTZXNzaW9uKCkpO1xuICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBCYXNlQ29tcG9uZW50LmdlbmVyYXRlVW5pcXVlSWQoXCJyb3dcIikpO1xuICAgIHJvdy5wYXJlbnRUYWJsZUlkID0gdGhpcy5pZDtcbiAgICByb3cucGFyZW50VGFibGUgPSB0aGlzO1xuICAgIHRoaXMuc2V0UGFyZW50U2NyZWVuSWQocm93KTtcblxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKT0+e1xuICAgICAgcm93Lmh0bWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKCk9PntcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWROb2RlcyAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGVzLmZvckVhY2goaWR4PT57XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RSb3coaWR4LCBmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdGVkUm93RWxlbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5zZWxlY3RSb3cocm93LCB0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy50cmFja05vZGUocm93KTtcblxuICAgIHJldHVybiByb3c7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQ3JlYXRlIHRhYmxlIHJvdyBhbmQgYXBwZW5kIHRvIHRhYmxlXG4gICAqL1xuICBhZGRSb3coKTogSFRNTEVsZW1lbnRXcmFwcGVyIHtcbiAgICBjb25zdCByb3cgPSB0aGlzLmNyZWF0ZVJvdygpO1xuXG4gICAgaWYgKHRoaXMudXNlRG9jRnJhZ21lbnQgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuX2JvZHlGcmFnbWVudC5hcHBlbmRDaGlsZChyb3cuaHRtbEVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMudGFibGVCb2R5Lm5hdGl2ZUVsZW1lbnQsIHJvdy5odG1sRWxlbWVudCk7XG4gICAgfVxuICAgIHJvdy5odG1sRWxlbWVudC5zdHlsZVtcImJhY2tncm91bmRcIl0gPSBcIlwiO1xuICAgIHJldHVybiByb3c7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogU2V0IGEgcm93IGFzIHNlbGVjdGVkIGFuZCBzZXQgc2VsZWN0ZWQgc3R5bGVcbiAgICogQHBhcmFtIG5vZGVJbmRleCBJbmRleCBvZiBub2RlL3JvdyB0byBzZWxlY3RcbiAgICogQHBhcmFtIGlzU2VsZWN0ZWQgVG9nZ2xlIHRvIHNldCBzZWxlY3RlZCBzdHlsZVxuICAgKi9cbiAgX3NlbGVjdFJvdyhub2RlSW5kZXg6IG51bWJlciwgaXNTZWxlY3RlZDogYm9vbGVhbikge1xuXG4gICAgbGV0IGlkeCA9IF8uZmluZEluZGV4KHRoaXMuc2VsZWN0ZWROb2RlcywgKG5vZGUpID0+IHtcbiAgICAgICAgcmV0dXJuIG5vZGUgPT09IG5vZGVJbmRleDtcbiAgICB9KTtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgIC8vaWYgaXQgd2Fzbid0IHNlbGVjdGVkLCBhZGQgaXQgaW4gc2VsZWN0ZWRSb3dzLlxuICAgICAgICBpZiAoaWR4IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGVzLnB1c2gobm9kZUluZGV4KTtcbiAgICAgICAgICAgIHRoaXMubm9kZXNbbm9kZUluZGV4XS5odG1sRWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0ZCcpLnN0eWxlLmNvbG9yID0gJ2JsdWUnO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy9pZiBpdCB3YXMgc2VsZWN0ZWQgYmVmb3JlLCByZW1vdmUgaXQgZnJvbSBzZWxlY3RlZFJvd3MuXG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGVzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgdGhpcy5ub2Rlc1tub2RlSW5kZXhdLmh0bWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RkJykuc3R5bGUuY29sb3IgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGJ5IHNldEF0dHJpYnV0ZShyb3csIHZhbHVlKTtcbiAgICogQHBhcmFtIHJvdyBSb3cgdG8gc2V0IGFzIHNlbGVjdGVkIHJvd1xuICAgKiBAcGFyYW0gaXNTZWxlY3RlZCBUb2dnbGUgc2VsZWN0ZWQgc3RhdGUgYW5kIHN0eWxlXG4gICAqL1xuICBzZWxlY3RSb3cocm93OiBIVE1MRWxlbWVudFdyYXBwZXIsIGlzU2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5ub2RlcyA9PSBudWxsKSByZXR1cm47XG4gICAgbGV0IG5vZGVJbmRleCA9IF8uZmluZEluZGV4KHRoaXMubm9kZXMsIChub2RlKSA9PiB7XG4gICAgICByZXR1cm4gbm9kZSA9PT0gcm93O1xuICAgIH0pO1xuICAgIC8vTm93IGluIHRoZSBhcy1pcyd0cmVlLXRhYmxlIG9ubHkgb25lIHJvdyBjYW4gYmUgc2VsZWN0ZWQuXG5cbiAgICBsZXQgdGRzOiBOb2RlTGlzdCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRkcy5sZW5ndGg7IGkrKykge1xuICAgICAgKHRkc1tpXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuY29sb3IgPSAnJztcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuX3NlbGVjdFJvdyhpLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2VsZWN0Um93KG5vZGVJbmRleCwgdHJ1ZSk7XG5cbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFJvd0VsZW1lbnRzLnB1c2gocm93KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZFJvd0VsZW1lbnRzID0gdGhpcy5zZWxlY3RlZFJvd0VsZW1lbnRzLmZpbHRlcihlbD0+e1xuICAgICAgICByZXR1cm4gZWwuX3VuaXF1ZUlkICE9PSByb3cuX2ludGVybmFsSWQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRTZWxlY3RlZFJvd3MoKTogQXJyYXk8SFRNTEVsZW1lbnRXcmFwcGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRSb3dFbGVtZW50cztcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBDcmVhdGUgdGFibGUgY2VsbCAod2lsbCBub3QgYXBwZW5kIHRvIGFueXRoaW5nKVxuICAgKiBAcmV0dXJucyBUaGUgdGFibGUgY2VsbCB0aGF0IGlzIGNyZWF0ZWRcbiAgICovXG4gIGNyZWF0ZUNlbGwoKTogSFRNTEVsZW1lbnRXcmFwcGVyIHtcbiAgICBjb25zdCBjZWxsOiBIVE1MRWxlbWVudFdyYXBwZXIgPSBuZXcgSFRNTEVsZW1lbnRXcmFwcGVyKHRoaXMucmVuZGVyZXIsIFwiY2VsbFwiLCB0aGlzLmdldFNlc3Npb24oKSk7XG4gICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBCYXNlQ29tcG9uZW50LmdlbmVyYXRlVW5pcXVlSWQoXCJjZWxsXCIpKTtcbiAgICB0aGlzLnNldFBhcmVudFNjcmVlbklkKGNlbGwpO1xuXG4gICAgLy9mb3IgY2VsbCwgd2UgbmVlZCB0byBhcHBlbmQgaXQgdG8gdGhlIHJvd1xuICAgIHRoaXMudHJhY2tOb2RlKGNlbGwpO1xuXG4gICAgcmV0dXJuIGNlbGw7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXNlZCBjcmVhdGVDZWxsIGluc3RlYWRcbiAgICovXG4gIGFkZENlbGwoKTogSFRNTEVsZW1lbnRXcmFwcGVyIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDZWxsKCk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogUmUtcmVuZGVyIHRyZWUgdGFibGUuIE11c3QgY2FsbCBqUXVlcnkgcGx1Z2luJ3MgbWV0aG9kIG9uIGVsZW1lbnQgdG8gcmUtcmVuZGVyLlxuICAgKi9cbiAgcmVkcmF3VHJlZSgpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PntcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBqUXVlcnkoYCMke3RoaXMuaWR9IC5qcS10cmVlLXRhYmxlYCkudHJlZXRhYmxlKHtcbiAgICAgICAgZXhwYW5kYWJsZTogdHJ1ZVxuICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogRXhwYW5kIGFsbCBub2RlcyBpbiB0aGUgdHJlZVxuICAgKi9cbiAgZXhwYW5kQWxsKCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgalF1ZXJ5KGAjJHt0aGlzLmlkfSAuanEtdHJlZS10YWJsZWApLnRyZWV0YWJsZShcImV4cGFuZEFsbFwiKTtcbiAgICB0aGlzLnNldE5vZGVFeHBhbmRlZFN0YXR1cyhcInRydWVcIik7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQ29sbGFwc2UgYWxsIG5vZGUgaW4gdGhlIHRyZWVcbiAgICovXG4gIGNvbGxhcHNlQWxsKCkge1xuICAgIGpRdWVyeShgIyR7dGhpcy5pZH0gLmpxLXRyZWUtdGFibGVgKS50cmVldGFibGUoXCJjb2xsYXBzZUFsbFwiKTtcbiAgICB0aGlzLnNldE5vZGVFeHBhbmRlZFN0YXR1cyhcImZhbHNlXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjaGlsZCBub2RlcyBvZiB0aGUgdGFibGVcbiAgICogQHJldHVybnMgW1tub2Rlc11dXG4gICAqL1xuICBnZXRUYWJsZUNoaWxkcmVuKCk6IEFycmF5PEhUTUxFbGVtZW50V3JhcHBlcj4ge1xuICAgIHJldHVybiB0aGlzLm5vZGVzO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEdldCBudW1iZXIgb2YgY2hpbGQgbm9kZXMgZm9yIHRoaXMgdHJlZVxuICAgKiBAcmV0dXJucyBOdW1iZXIgb2YgY2hpbGQgbm9kZXNcbiAgICovXG4gIGdldENoaWxkQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlcyAhPSBudWxsID8gdGhpcy5ub2Rlcy5sZW5ndGggOiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjaGlsZCBub2RlIGJ5IGlkXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgZ2V0Q2hpbGRCeUlkKGlkOiBzdHJpbmcpOiBIVE1MRWxlbWVudFdyYXBwZXIge1xuICAgIGlmICh0aGlzLm5vZGVzICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHRlbXAgPSBfLmZpbHRlcih0aGlzLm5vZGVzLCAoaXRlbTogSFRNTEVsZW1lbnRXcmFwcGVyKT0+aXRlbS5nZXRJZCgpID09PSBpZCk7XG5cbiAgICAgIGlmICh0ZW1wLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRlbXBbMF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogR2V0IGxpc3Qgb2Ygbm9kZXMgZnJvbSBYUGF0aCBleHByZXNzaW9uIHN0cmluZ1xuICAgKiBAcGFyYW0geHBhdGhFeHByZXNzaW9uXG4gICAqL1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBldmFsdWF0ZVhQYXRoKHhwYXRoRXhwcmVzc2lvbjogc3RyaW5nKTogYW55IHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGNvbnN0IHJlc3VsdDogVmVjdG9yPGFueT4gPSBuZXcgVmVjdG9yPGFueT4oKTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGNvbnN0IHhwYXRoUmVzdWx0OiBYUGF0aFJlc3VsdCA9IGRvY3VtZW50LmV2YWx1YXRlKHhwYXRoRXhwcmVzc2lvbi5yZXBsYWNlKFwiY2VsbFtcIiwgXCJ0ZFtcIikucmVwbGFjZShcInJvd1tcIiwgXCJ0cltcIiksIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBudWxsLCBYUGF0aFJlc3VsdC5BTllfVFlQRSwgbnVsbCk7XG5cbiAgICBpZiAoeHBhdGhSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgbGV0IG5vZGU6IE5vZGUgPSB4cGF0aFJlc3VsdC5pdGVyYXRlTmV4dCgpO1xuXG4gICAgICB3aGlsZShub2RlKSB7XG4gICAgICAgIHJlc3VsdC5hZGQobm9kZSk7XG4gICAgICAgIG5vZGUgPSB4cGF0aFJlc3VsdC5pdGVyYXRlTmV4dCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBjaGlsZCBub2RlIHRvIHRoZSB0cmVlXG4gICAqIEBwYXJhbSBub2RlIENoaWxkIHRvIGFkZFxuICAgKi9cbiAgcHJpdmF0ZSB0cmFja05vZGUobm9kZTogSFRNTEVsZW1lbnRXcmFwcGVyKSB7XG4gICAgaWYgKHRoaXMubm9kZXMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5ub2RlcyA9IFtdO1xuICAgIH1cblxuICAgIHRoaXMubm9kZXMucHVzaChub2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgTmV4YVdlYiB0YWcgbmFtZVxuICAgKiBAcmV0dXJucyBUYWduYW1lXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TnhUYWdOYW1lKCkge1xuICAgIHJldHVybiBcInRyZWVUYWJsZVwiO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEdldCBbW2NkXV0gKENoYW5nZSBkZXRlY3RvcikgcHJvcGVydHlcbiAgICogQHJldHVybnMgQ2hhbmdlIGRldGVjdG9yIHJlZmVyZW5jZVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldENoYW5nZURldGVjdG9yKCkge1xuICAgIHJldHVybiB0aGlzLmNkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBub2RlIGV4cGFuZGVkIHByb3BlcnR5IHZhbHVlXG4gICAqIEBwYXJhbSBzdGF0dXMgVmFsdWUgZm9yIG5vZGUncyBleHBhbmRlZCBwcm9wZXJ0eVxuICAgKi9cbiAgcHJpdmF0ZSBzZXROb2RlRXhwYW5kZWRTdGF0dXMoc3RhdHVzOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5ub2RlcyAhPSBudWxsKSB7XG4gICAgICBfLmZvckVhY2godGhpcy5ub2RlcywgKG5vZGUpPT57XG4gICAgICAgIGlmIChub2RlLmdldExvY2FsTmFtZSgpID09PSBcInJvd1wiKSB7XG4gICAgICAgICAgbm9kZS5leHBhbmRlZCA9IHN0YXR1cztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBKU09OIHJlcHJlc2VudGF0aW9uIGZvciB0aGlzIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyBDb21wb25lbnQgbWV0YWRhdGEgYXMgSlNPTiBvYmplY3RcbiAgICovXG4gIHRvSnNvbigpOiB7fSB7XG4gICAgY29uc3QgcmV0VmFsID0gc3VwZXIudG9Kc29uKCk7XG5cbiAgICBpZiAodGhpcy5ub2RlcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMubm9kZXMuZmlsdGVyKG5vZGU9Pm5vZGUuZ2V0TG9jYWxOYW1lKCkgPT09IFwicm93XCIpO1xuXG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICByZXRWYWxbXCJjaGlsZHJlblwiXSA9IGNoaWxkcmVuLm1hcChjaGlsZD0+Y2hpbGQudG9Kc29uKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cbiAgLyoqXG4gICAqIFNldCB0aGUgZWxlbWVudHMgcGFyZW50IElEXG4gICAqIEBwYXJhbSBlbFxuICAgKi9cbiAgcHJpdmF0ZSBzZXRQYXJlbnRTY3JlZW5JZChlbDogSFRNTEVsZW1lbnRXcmFwcGVyKSB7XG4gICAgaWYgKHRoaXMuZ2V0UGFyZW50VmlldygpICE9IG51bGwpIHtcbiAgICAgICAgZWwucGFyZW50U2NyZWVuSWQgPSB0aGlzLmdldFBhcmVudFZpZXcoKS5nZXRJZCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXROb2RlcygpOiBIVE1MRWxlbWVudFdyYXBwZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZXNcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRG9jRnJhZ21lbnQoKSB7XG4gICAgaWYgKHRoaXMudXNlRG9jRnJhZ21lbnQgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuX2JvZHlGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB9XG4gIH1cblxuICBhcHBlbmRGcmFnbWVudCgpIHtcbiAgICBpZiAodGhpcy5fYm9keUZyYWdtZW50ICE9IG51bGwpIHtcbiAgICAgICh0aGlzLnRhYmxlQm9keS5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5hcHBlbmRDaGlsZCh0aGlzLl9ib2R5RnJhZ21lbnQpO1xuICAgIH1cbiAgfVxufVxuIl19