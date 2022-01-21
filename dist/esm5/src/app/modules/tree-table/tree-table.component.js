/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var TreeTableComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TreeTableComponent, _super);
    function TreeTableComponent(parent, sessionService, elementRef, zone, renderer, cd) {
        var _this = _super.call(this, parent, sessionService, elementRef, renderer) || this;
        _this.zone = zone;
        _this.cd = cd;
        _this.nodes = [];
        _this.selectedNodes = [];
        _this.selectedRowElements = [];
        return _this;
    }
    /**
     * Init lifecycle. Must call parent ngOnInit
     */
    /**
     * Init lifecycle. Must call parent ngOnInit
     * @return {?}
     */
    TreeTableComponent.prototype.ngOnInit = /**
     * Init lifecycle. Must call parent ngOnInit
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        // Width/Height is required otherwise grid will collapse to zero.
        // if (!this.controlHeight) this.controlHeight = '500px';
        // if (!this.controlWidth) this.controlWidth = '500px';
    };
    /* istanbul ignore next */
    /**
     * After view init lifecycle. Set table columns and call parent ngAfterViewInit
     */
    /**
     * After view init lifecycle. Set table columns and call parent ngAfterViewInit
     * @return {?}
     */
    TreeTableComponent.prototype.ngAfterViewInit = /**
     * After view init lifecycle. Set table columns and call parent ngAfterViewInit
     * @return {?}
     */
    function () {
        var _this = this;
        //make sure to call sure it can init thing
        _super.prototype.ngAfterViewInit.call(this);
        this.createDocFragment();
        if (this.columns != null && this.columns.length > 0) {
            this.columnDefs = [];
            this.columns.forEach(function (column) {
                _this.columnDefs.push({
                    headerName: column.header,
                    controlWidth: column.controlWidth
                });
            });
        }
        if (this.rowData && this.rowData.length > 0) {
            this.zone.runOutsideAngular(function () {
                jQuery("#" + _this.id + " .jq-tree-table").treetable();
            });
        }
    };
    /**
     * Destroy lifecycle. Delete tree nodes to clear out references
     */
    /**
     * Destroy lifecycle. Delete tree nodes to clear out references
     * @return {?}
     */
    TreeTableComponent.prototype.ngOnDestroy = /**
     * Destroy lifecycle. Delete tree nodes to clear out references
     * @return {?}
     */
    function () {
        var e_1, _a;
        this.tableBody = null;
        this._bodyFragment = null;
        if (this.nodes != null) {
            try {
                for (var _b = tslib_1.__values(this.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var node = _c.value;
                    node.destroy();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        this.nodes = null;
    };
    /**
     * Remove all child rows from this table
     */
    /**
     * Remove all child rows from this table
     * @return {?}
     */
    TreeTableComponent.prototype.clearRows = /**
     * Remove all child rows from this table
     * @return {?}
     */
    function () {
        // while(this.tableBody.nativeElement.firstChild) {
        //   this.renderer.removeChild(this.tableBody.nativeElement, this.tableBody.nativeElement.firstChild);
        // }
        (/** @type {?} */ (this.tableBody.nativeElement)).innerHTML = "";
        this.nodes = [];
        this.selectedNodes = [];
        this.selectedRowElements = [];
        this.createDocFragment();
    };
    /* istanbul ignore next */
    /**
     * Create table row but DO NOT append to table
     */
    /**
     * Create table row but DO NOT append to table
     * @return {?}
     */
    TreeTableComponent.prototype.createRow = /**
     * Create table row but DO NOT append to table
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var row = new HTMLElementWrapper(this.renderer, "row", this.getSession());
        row.setAttribute("id", BaseComponent.generateUniqueId("row"));
        row.parentTableId = this.id;
        row.parentTable = this;
        this.setParentScreenId(row);
        this.zone.runOutsideAngular(function () {
            row.htmlElement.addEventListener("mousedown", function () {
                if (_this.selectedNodes != null) {
                    _this.selectedNodes.forEach(function (idx) {
                        _this._selectRow(idx, false);
                    });
                }
                _this.selectedRowElements = [];
                _this.selectRow(row, true);
            });
        });
        this.trackNode(row);
        return row;
    };
    /* istanbul ignore next */
    /**
     * Create table row and append to table
     */
    /**
     * Create table row and append to table
     * @return {?}
     */
    TreeTableComponent.prototype.addRow = /**
     * Create table row and append to table
     * @return {?}
     */
    function () {
        /** @type {?} */
        var row = this.createRow();
        if (this.useDocFragment === true) {
            this._bodyFragment.appendChild(row.htmlElement);
        }
        else {
            this.renderer.appendChild(this.tableBody.nativeElement, row.htmlElement);
        }
        row.htmlElement.style["background"] = "";
        return row;
    };
    /* istanbul ignore next */
    /**
     * Set a row as selected and set selected style
     * @param nodeIndex Index of node/row to select
     * @param isSelected Toggle to set selected style
     */
    /**
     * Set a row as selected and set selected style
     * @param {?} nodeIndex Index of node/row to select
     * @param {?} isSelected Toggle to set selected style
     * @return {?}
     */
    TreeTableComponent.prototype._selectRow = /**
     * Set a row as selected and set selected style
     * @param {?} nodeIndex Index of node/row to select
     * @param {?} isSelected Toggle to set selected style
     * @return {?}
     */
    function (nodeIndex, isSelected) {
        /** @type {?} */
        var idx = _.findIndex(this.selectedNodes, function (node) {
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
    };
    /**
     * This function is called by setAttribute(row, value);
     * @param row Row to set as selected row
     * @param isSelected Toggle selected state and style
     */
    /**
     * This function is called by setAttribute(row, value);
     * @param {?} row Row to set as selected row
     * @param {?} isSelected Toggle selected state and style
     * @return {?}
     */
    TreeTableComponent.prototype.selectRow = /**
     * This function is called by setAttribute(row, value);
     * @param {?} row Row to set as selected row
     * @param {?} isSelected Toggle selected state and style
     * @return {?}
     */
    function (row, isSelected) {
        if (this.nodes == null)
            return;
        /** @type {?} */
        var nodeIndex = _.findIndex(this.nodes, function (node) {
            return node === row;
        });
        /** @type {?} */
        var tds = this.elementRef.nativeElement.querySelectorAll('td');
        for (var i = 0; i < tds.length; i++) {
            (/** @type {?} */ (tds[i])).style.color = '';
        }
        for (var i = 0; i < this.nodes.length; i++) {
            this._selectRow(i, false);
        }
        this._selectRow(nodeIndex, true);
        if (isSelected) {
            this.selectedRowElements.push(row);
        }
        else {
            this.selectedRowElements = this.selectedRowElements.filter(function (el) {
                return el._uniqueId !== row._internalId;
            });
        }
    };
    /**
     * @return {?}
     */
    TreeTableComponent.prototype.getSelectedRows = /**
     * @return {?}
     */
    function () {
        return this.selectedRowElements;
    };
    /* istanbul ignore next */
    /**
     * Create table cell (will not append to anything)
     * @returns The table cell that is created
     */
    /**
     * Create table cell (will not append to anything)
     * @return {?} The table cell that is created
     */
    TreeTableComponent.prototype.createCell = /**
     * Create table cell (will not append to anything)
     * @return {?} The table cell that is created
     */
    function () {
        /** @type {?} */
        var cell = new HTMLElementWrapper(this.renderer, "cell", this.getSession());
        cell.setAttribute("id", BaseComponent.generateUniqueId("cell"));
        this.setParentScreenId(cell);
        //for cell, we need to append it to the row
        this.trackNode(cell);
        return cell;
    };
    /* istanbul ignore next */
    /**
     * @deprecated used createCell instead
     */
    /**
     * @deprecated used createCell instead
     * @return {?}
     */
    TreeTableComponent.prototype.addCell = /**
     * @deprecated used createCell instead
     * @return {?}
     */
    function () {
        return this.createCell();
    };
    /* istanbul ignore next */
    /**
     * Re-render tree table. Must call jQuery plugin's method on element to re-render.
     */
    /**
     * Re-render tree table. Must call jQuery plugin's method on element to re-render.
     * @return {?}
     */
    TreeTableComponent.prototype.redrawTree = /**
     * Re-render tree table. Must call jQuery plugin's method on element to re-render.
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            /* istanbul ignore next */
            jQuery("#" + _this.id + " .jq-tree-table").treetable({
                expandable: true
            }, true);
            _this.cd.markForCheck();
        });
    };
    /* istanbul ignore next */
    /**
     * Expand all nodes in the tree
     */
    /**
     * Expand all nodes in the tree
     * @return {?}
     */
    TreeTableComponent.prototype.expandAll = /**
     * Expand all nodes in the tree
     * @return {?}
     */
    function () {
        /* istanbul ignore next */
        jQuery("#" + this.id + " .jq-tree-table").treetable("expandAll");
        this.setNodeExpandedStatus("true");
    };
    /* istanbul ignore next */
    /**
     * Collapse all node in the tree
     */
    /**
     * Collapse all node in the tree
     * @return {?}
     */
    TreeTableComponent.prototype.collapseAll = /**
     * Collapse all node in the tree
     * @return {?}
     */
    function () {
        jQuery("#" + this.id + " .jq-tree-table").treetable("collapseAll");
        this.setNodeExpandedStatus("false");
    };
    /**
     * Get child nodes of the table
     * @returns [[nodes]]
     */
    /**
     * Get child nodes of the table
     * @return {?} [[nodes]]
     */
    TreeTableComponent.prototype.getTableChildren = /**
     * Get child nodes of the table
     * @return {?} [[nodes]]
     */
    function () {
        return this.nodes;
    };
    /* istanbul ignore next */
    /**
     * Get number of child nodes for this tree
     * @returns Number of child nodes
     */
    /**
     * Get number of child nodes for this tree
     * @return {?} Number of child nodes
     */
    TreeTableComponent.prototype.getChildCount = /**
     * Get number of child nodes for this tree
     * @return {?} Number of child nodes
     */
    function () {
        return this.nodes != null ? this.nodes.length : 0;
    };
    /**
     * Get child node by id
     * @param id
     */
    /**
     * Get child node by id
     * @param {?} id
     * @return {?}
     */
    TreeTableComponent.prototype.getChildById = /**
     * Get child node by id
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (this.nodes != null) {
            /** @type {?} */
            var temp = _.filter(this.nodes, function (item) { return item.getId() === id; });
            if (temp.length > 0) {
                return temp[0];
            }
        }
        return null;
    };
    /* istanbul ignore next */
    /**
     * Get list of nodes from XPath expression string
     * @param xpathExpression
     */
    /* istanbul ignore next */
    /**
     * Get list of nodes from XPath expression string
     * @param {?} xpathExpression
     * @return {?}
     */
    TreeTableComponent.prototype.evaluateXPath = /**
     * Get list of nodes from XPath expression string
     * @param {?} xpathExpression
     * @return {?}
     */
    function (xpathExpression) {
        /** @type {?} */
        var result = new Vector();
        /** @type {?} */
        var xpathResult = document.evaluate(xpathExpression.replace("cell[", "td[").replace("row[", "tr["), this.elementRef.nativeElement, null, XPathResult.ANY_TYPE, null);
        if (xpathResult != null) {
            /** @type {?} */
            var node = xpathResult.iterateNext();
            while (node) {
                result.add(node);
                node = xpathResult.iterateNext();
            }
        }
        return result;
    };
    /**
     * Adds child node to the tree
     * @param {?} node Child to add
     * @return {?}
     */
    TreeTableComponent.prototype.trackNode = /**
     * Adds child node to the tree
     * @param {?} node Child to add
     * @return {?}
     */
    function (node) {
        if (this.nodes == null) {
            this.nodes = [];
        }
        this.nodes.push(node);
    };
    /**
     * Get NexaWeb tag name
     * @returns Tagname
     */
    /**
     * Get NexaWeb tag name
     * @return {?} Tagname
     */
    TreeTableComponent.prototype.getNxTagName = /**
     * Get NexaWeb tag name
     * @return {?} Tagname
     */
    function () {
        return "treeTable";
    };
    /* istanbul ignore next */
    /**
     * Get [[cd]] (Change detector) property
     * @returns Change detector reference
     */
    /**
     * Get [[cd]] (Change detector) property
     * @return {?} Change detector reference
     */
    TreeTableComponent.prototype.getChangeDetector = /**
     * Get [[cd]] (Change detector) property
     * @return {?} Change detector reference
     */
    function () {
        return this.cd;
    };
    /**
     * Set node expanded property value
     * @param {?} status Value for node's expanded property
     * @return {?}
     */
    TreeTableComponent.prototype.setNodeExpandedStatus = /**
     * Set node expanded property value
     * @param {?} status Value for node's expanded property
     * @return {?}
     */
    function (status) {
        if (this.nodes != null) {
            _.forEach(this.nodes, function (node) {
                if (node.getLocalName() === "row") {
                    node.expanded = status;
                }
            });
        }
    };
    /**
     * Get JSON representation for this component
     * @returns Component metadata as JSON object
     */
    /**
     * Get JSON representation for this component
     * @return {?} Component metadata as JSON object
     */
    TreeTableComponent.prototype.toJson = /**
     * Get JSON representation for this component
     * @return {?} Component metadata as JSON object
     */
    function () {
        /** @type {?} */
        var retVal = _super.prototype.toJson.call(this);
        if (this.nodes != null) {
            /** @type {?} */
            var children = this.nodes.filter(function (node) { return node.getLocalName() === "row"; });
            if (children.length > 0) {
                retVal["children"] = children.map(function (child) { return child.toJson(); });
            }
        }
        return retVal;
    };
    /**
     * Set the elements parent ID
     * @param {?} el
     * @return {?}
     */
    TreeTableComponent.prototype.setParentScreenId = /**
     * Set the elements parent ID
     * @param {?} el
     * @return {?}
     */
    function (el) {
        if (this.getParentView() != null) {
            el.parentScreenId = this.getParentView().getId();
        }
    };
    /**
     * @return {?}
     */
    TreeTableComponent.prototype.getNodes = /**
     * @return {?}
     */
    function () {
        return this.nodes;
    };
    /**
     * @return {?}
     */
    TreeTableComponent.prototype.createDocFragment = /**
     * @return {?}
     */
    function () {
        if (this.useDocFragment === true) {
            this._bodyFragment = document.createDocumentFragment();
        }
    };
    /**
     * @return {?}
     */
    TreeTableComponent.prototype.appendFragment = /**
     * @return {?}
     */
    function () {
        if (this._bodyFragment != null) {
            (/** @type {?} */ (this.tableBody.nativeElement)).appendChild(this._bodyFragment);
        }
    };
    TreeTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'vt-tree-table',
                    template: "<div [id]=\"id\"\nclass=\"vt-tree-table {{cssClass}}\"\n[style.width]=\"controlWidth\"\n[style.height]=\"controlHeight\"\n[style.border-style]=\"borderStyle\">\n    <table\n        class=\"table jq-tree-table\" [style.border-width]=\"borderWidth\">\n        <thead #tableHeader>\n            <tr>\n                <th scope=\"col\" *ngFor=\"let col of columnDefs\" [style.width.px]=\"col.controlWidth\">\n                    {{col.headerName}}\n                </th>\n            </tr>\n        </thead>\n        <tbody #tableBody>\n            <tr *ngFor=\"let row of rowData; let i = index\">\n                <td *ngFor=\"let col of columnDefs\">\n                    {{row[col.field]}}\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        {
                            provide: BaseComponent,
                            useExisting: forwardRef(function () { return TreeTableComponent; })
                        }
                    ],
                    styles: ["table.treetable span.indenter{display:inline-block;margin:0;padding:0;text-align:right;-ms-user-select:none;user-select:none;-khtml-user-select:none;-moz-user-select:none;-o-user-select:none;-webkit-user-select:none;box-sizing:content-box;width:19px}table.treetable span.indenter a{background-position:left center;background-repeat:no-repeat;display:inline-block;text-decoration:none;width:19px}table.treetable{border:1px solid #888;border-collapse:collapse;font-size:.8em;line-height:1;width:100%}table.treetable caption{font-size:.9em;font-weight:700;margin-bottom:.2em}table.treetable thead{background:url(data:image/png;base64,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) top left repeat-x #aaa;font-size:.9em}table.treetable thead tr th{border:1px solid #888;font-weight:400;padding:.3em 1em .1em;text-align:left;height:6px}table.treetable tbody tr td{cursor:default;border-right:1px solid #8080ff}table.treetable span{background-position:center left;background-repeat:no-repeat;padding:.2em 0 .2em 1.5em}table.treetable span.file{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADoSURBVBgZBcExblNBGAbA2ceegTRBuIKOgiihSZNTcC5LUHAihNJR0kGKCDcYJY6D3/77MdOinTvzAgCw8ysThIvn/VojIyMjIyPP+bS1sUQIV2s95pBDDvmbP/mdkft83tpYguZq5Jh/OeaYh+yzy8hTHvNlaxNNczm+la9OTlar1UdA/+C2A4trRCnD3jS8BB1obq2Gk6GU6QbQAS4BUaYSQAf4bhhKKTFdAzrAOwAxEUAH+KEM01SY3gM6wBsEAQB0gJ+maZoC3gI6iPYaAIBJsiRmHU0AALOeFC3aK2cWAACUXe7+AwO0lc9eTHYTAAAAAElFTkSuQmCC)}table.treetable span.folder{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLxZO7ihRBFIa/6u0ZW7GHBUV0UQQTZzd3QdhMQxOfwMRXEANBMNQX0MzAzFAwEzHwARbNFDdwEd31Mj3X7a6uOr9BtzNjYjKBJ6nicP7v3KqcJFaxhBVtZUAK8OHlld2st7Xl3DJPVONP+zEUV4HqL5UDYHr5xvuQAjgl/Qs7TzvOOVAjxjlC+ePSwe6DfbVegLVuT4r14eTr6zvA8xSAoBLzx6pvj4l+DZIezuVkG9fY2H7YRQIMZIBwycmzH1/s3F8AapfIPNF3kQk7+kw9PWBy+IZOdg5Ug3mkAATy/t0usovzGeCUWTjCz0B+Sj0ekfdvkZ3abBv+U4GaCtJ1iEm6ANQJ6fEzrG/engcKw/wXQvEKxSEKQxRGKE7Izt+DSiwBJMUSm71rguMYhQKrBygOIRStf4TiFFRBvbRGKiQLWP29yRSHKBTtfdBmHs0BUpgvtgF4yRFR+NUKi0XZcYjCeCG2smkzLAHkbRBmP0/Uk26O5YnUActBp1GsAI+S5nRJJJal5K1aAMrq0d6Tm9uI6zjyf75dAe6tx/SsWeD//o2/Ab6IH3/h25pOAAAAAElFTkSuQmCC)}table.treetable tr.collapsed span.indenter a{background-image:url(data:image/png;base64,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)}table.treetable tr.expanded span.indenter a{background-image:url(data:image/png;base64,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)}table.treetable tr.branch{background-color:#f9f9f9}table.treetable tr.selected{background-color:#3875d7;color:#fff}table.treetable tr span.indenter a{outline:0}table.treetable tr.collapsed.selected span.indenter a{background-image:url(data:image/png;base64,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)}table.treetable tr.expanded.selected span.indenter a{background-image:url(data:image/png;base64,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)}table.treetable tr.accept{background-color:#a3bce4;color:#fff}table.treetable tr.collapsed.accept td span.indenter a{background-image:url(data:image/x-png;base64,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)}table.treetable tr.expanded.accept td span.indenter a{background-image:url(data:image/x-png;base64,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)}vt-tree-table{overflow:auto}table.treetable tr:nth-child(odd){background:0 0}table.treetable tr:nth-child(even){background:#e6e6e6}"]
                }] }
    ];
    /** @nocollapse */
    TreeTableComponent.ctorParameters = function () { return [
        { type: BaseComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: SessionService },
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    TreeTableComponent.propDecorators = {
        rowData: [{ type: Input }],
        columnDefs: [{ type: Input }],
        useDocFragment: [{ type: Input }],
        columns: [{ type: ContentChildren, args: [TableColumnDirective,] }],
        tableBody: [{ type: ViewChild, args: ["tableBody", { read: ElementRef },] }]
    };
    return TreeTableComponent;
}(BaseComponent));
export { TreeTableComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3RyZWUtdGFibGUvdHJlZS10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQWdCLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFlLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDelAsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUk1RCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0lBa0JBLDhDQUFhO0lBZ0JuRCw0QkFDMEIsTUFBcUIsRUFDN0MsY0FBOEIsRUFDOUIsVUFBc0IsRUFDZCxNQUNSLFFBQW1CLEVBQ1g7UUFOVixZQVFFLGtCQUFNLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUNwRDtRQUxTLFVBQUksR0FBSixJQUFJO1FBRUosUUFBRSxHQUFGLEVBQUU7c0JBVitCLEVBQUU7OEJBQ2QsRUFBRTtvQ0FDd0IsRUFBRTs7S0FXMUQ7SUFFRDs7T0FFRzs7Ozs7SUFDSCxxQ0FBUTs7OztJQUFSO1FBQ0UsaUJBQU0sUUFBUSxXQUFFLENBQUM7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b21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYsIFNraXBTZWxmLCBPcHRpb25hbCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4sIFZpZXdFbmNhcHN1bGF0aW9uLCBOZ1pvbmUsIENvbnRlbnRDaGlsZHJlbiwgVmlld0NoaWxkLCBUZW1wbGF0ZVJlZiwgUmVuZGVyZXIyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFibGVDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuLi90YWJsZS90YWJsZS1jb2x1bW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IEhUTUxFbGVtZW50V3JhcHBlciB9IGZyb20gJy4vaHRtbC1lbGVtZW50LXdyYXBwZXInO1xuXG5kZWNsYXJlIHZhciBqUXVlcnk6IGFueTtcblxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tICcuLi9qYXZhL3ZlY3Rvcic7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHRyZWUgdGFibGUgY29tcG9uZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Z0LXRyZWUtdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vdHJlZS10YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RyZWUtdGFibGUuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEJhc2VDb21wb25lbnQsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKT0+VHJlZVRhYmxlQ29tcG9uZW50KVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUcmVlVGFibGVDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcm93RGF0YTogQXJyYXk8YW55PjtcbiAgQElucHV0KCkgY29sdW1uRGVmczogQXJyYXk8YW55PjtcbiAgQElucHV0KCkgdXNlRG9jRnJhZ21lbnQ6IGJvb2xlYW47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihUYWJsZUNvbHVtbkRpcmVjdGl2ZSlcbiAgY29sdW1uczogUXVlcnlMaXN0PFRhYmxlQ29sdW1uRGlyZWN0aXZlPjtcblxuICBAVmlld0NoaWxkKFwidGFibGVCb2R5XCIsIHtyZWFkOiBFbGVtZW50UmVmfSkgdGFibGVCb2R5OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBfYm9keUZyYWdtZW50OiBEb2N1bWVudEZyYWdtZW50O1xuXG4gIHByaXZhdGUgbm9kZXM6IEFycmF5PEhUTUxFbGVtZW50V3JhcHBlcj4gPSBbXTtcbiAgc2VsZWN0ZWROb2RlczogQXJyYXk8bnVtYmVyPiA9IFtdO1xuICBwcml2YXRlIHNlbGVjdGVkUm93RWxlbWVudHM6IEFycmF5PEhUTUxFbGVtZW50V3JhcHBlcj4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IEJhc2VDb21wb25lbnQsXG4gICAgc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICBzdXBlcihwYXJlbnQsIHNlc3Npb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBsaWZlY3ljbGUuIE11c3QgY2FsbCBwYXJlbnQgbmdPbkluaXRcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAvLyBXaWR0aC9IZWlnaHQgaXMgcmVxdWlyZWQgb3RoZXJ3aXNlIGdyaWQgd2lsbCBjb2xsYXBzZSB0byB6ZXJvLlxuICAgIC8vIGlmICghdGhpcy5jb250cm9sSGVpZ2h0KSB0aGlzLmNvbnRyb2xIZWlnaHQgPSAnNTAwcHgnO1xuICAgIC8vIGlmICghdGhpcy5jb250cm9sV2lkdGgpIHRoaXMuY29udHJvbFdpZHRoID0gJzUwMHB4JztcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBBZnRlciB2aWV3IGluaXQgbGlmZWN5Y2xlLiBTZXQgdGFibGUgY29sdW1ucyBhbmQgY2FsbCBwYXJlbnQgbmdBZnRlclZpZXdJbml0XG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy9tYWtlIHN1cmUgdG8gY2FsbCBzdXJlIGl0IGNhbiBpbml0IHRoaW5nXG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG5cbiAgICB0aGlzLmNyZWF0ZURvY0ZyYWdtZW50KCk7XG5cbiAgICBpZiAodGhpcy5jb2x1bW5zICE9IG51bGwgJiYgdGhpcy5jb2x1bW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuY29sdW1uRGVmcyA9IFtdO1xuXG4gICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChjb2x1bW49PntcbiAgICAgICAgdGhpcy5jb2x1bW5EZWZzLnB1c2goe1xuICAgICAgICAgIGhlYWRlck5hbWU6IGNvbHVtbi5oZWFkZXIsXG4gICAgICAgICAgY29udHJvbFdpZHRoOiBjb2x1bW4uY29udHJvbFdpZHRoXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucm93RGF0YSAmJiB0aGlzLnJvd0RhdGEubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpPT4ge1xuICAgICAgICBqUXVlcnkoYCMke3RoaXMuaWR9IC5qcS10cmVlLXRhYmxlYCkudHJlZXRhYmxlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBsaWZlY3ljbGUuIERlbGV0ZSB0cmVlIG5vZGVzIHRvIGNsZWFyIG91dCByZWZlcmVuY2VzXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnRhYmxlQm9keSA9IG51bGw7XG5cbiAgICB0aGlzLl9ib2R5RnJhZ21lbnQgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMubm9kZXMgIT0gbnVsbCkge1xuICAgICAgZm9yIChsZXQgbm9kZSBvZiB0aGlzLm5vZGVzKSB7XG4gICAgICAgIG5vZGUuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubm9kZXMgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgY2hpbGQgcm93cyBmcm9tIHRoaXMgdGFibGVcbiAgICovXG4gIGNsZWFyUm93cygpIHtcbiAgICAvLyB3aGlsZSh0aGlzLnRhYmxlQm9keS5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAvLyAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy50YWJsZUJvZHkubmF0aXZlRWxlbWVudCwgdGhpcy50YWJsZUJvZHkubmF0aXZlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAvLyB9XG5cbiAgICAodGhpcy50YWJsZUJvZHkubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIHRoaXMubm9kZXMgPSBbXTtcbiAgICB0aGlzLnNlbGVjdGVkTm9kZXMgPSBbXTtcbiAgICB0aGlzLnNlbGVjdGVkUm93RWxlbWVudHMgPSBbXTtcbiAgICB0aGlzLmNyZWF0ZURvY0ZyYWdtZW50KCk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQ3JlYXRlIHRhYmxlIHJvdyBidXQgRE8gTk9UIGFwcGVuZCB0byB0YWJsZVxuICAgKi9cbiAgY3JlYXRlUm93KCk6IEhUTUxFbGVtZW50V3JhcHBlciB7XG4gICAgY29uc3Qgcm93OiBIVE1MRWxlbWVudFdyYXBwZXIgPSBuZXcgSFRNTEVsZW1lbnRXcmFwcGVyKHRoaXMucmVuZGVyZXIsIFwicm93XCIsIHRoaXMuZ2V0U2Vzc2lvbigpKTtcbiAgICByb3cuc2V0QXR0cmlidXRlKFwiaWRcIiwgQmFzZUNvbXBvbmVudC5nZW5lcmF0ZVVuaXF1ZUlkKFwicm93XCIpKTtcbiAgICByb3cucGFyZW50VGFibGVJZCA9IHRoaXMuaWQ7XG4gICAgcm93LnBhcmVudFRhYmxlID0gdGhpcztcbiAgICB0aGlzLnNldFBhcmVudFNjcmVlbklkKHJvdyk7XG5cbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PntcbiAgICAgIHJvdy5odG1sRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsICgpPT57XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZXMgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWROb2Rlcy5mb3JFYWNoKGlkeD0+e1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0Um93KGlkeCwgZmFsc2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZFJvd0VsZW1lbnRzID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0Um93KHJvdywgdHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMudHJhY2tOb2RlKHJvdyk7XG5cbiAgICByZXR1cm4gcm93O1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIENyZWF0ZSB0YWJsZSByb3cgYW5kIGFwcGVuZCB0byB0YWJsZVxuICAgKi9cbiAgYWRkUm93KCk6IEhUTUxFbGVtZW50V3JhcHBlciB7XG4gICAgY29uc3Qgcm93ID0gdGhpcy5jcmVhdGVSb3coKTtcblxuICAgIGlmICh0aGlzLnVzZURvY0ZyYWdtZW50ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLl9ib2R5RnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93Lmh0bWxFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxlQm9keS5uYXRpdmVFbGVtZW50LCByb3cuaHRtbEVsZW1lbnQpO1xuICAgIH1cbiAgICByb3cuaHRtbEVsZW1lbnQuc3R5bGVbXCJiYWNrZ3JvdW5kXCJdID0gXCJcIjtcbiAgICByZXR1cm4gcm93O1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFNldCBhIHJvdyBhcyBzZWxlY3RlZCBhbmQgc2V0IHNlbGVjdGVkIHN0eWxlXG4gICAqIEBwYXJhbSBub2RlSW5kZXggSW5kZXggb2Ygbm9kZS9yb3cgdG8gc2VsZWN0XG4gICAqIEBwYXJhbSBpc1NlbGVjdGVkIFRvZ2dsZSB0byBzZXQgc2VsZWN0ZWQgc3R5bGVcbiAgICovXG4gIF9zZWxlY3RSb3cobm9kZUluZGV4OiBudW1iZXIsIGlzU2VsZWN0ZWQ6IGJvb2xlYW4pIHtcblxuICAgIGxldCBpZHggPSBfLmZpbmRJbmRleCh0aGlzLnNlbGVjdGVkTm9kZXMsIChub2RlKSA9PiB7XG4gICAgICAgIHJldHVybiBub2RlID09PSBub2RlSW5kZXg7XG4gICAgfSk7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgICAvL2lmIGl0IHdhc24ndCBzZWxlY3RlZCwgYWRkIGl0IGluIHNlbGVjdGVkUm93cy5cbiAgICAgICAgaWYgKGlkeCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWROb2Rlcy5wdXNoKG5vZGVJbmRleCk7XG4gICAgICAgICAgICB0aGlzLm5vZGVzW25vZGVJbmRleF0uaHRtbEVsZW1lbnQucXVlcnlTZWxlY3RvcigndGQnKS5zdHlsZS5jb2xvciA9ICdibHVlJztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vaWYgaXQgd2FzIHNlbGVjdGVkIGJlZm9yZSwgcmVtb3ZlIGl0IGZyb20gc2VsZWN0ZWRSb3dzLlxuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWROb2Rlcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIHRoaXMubm9kZXNbbm9kZUluZGV4XS5odG1sRWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0ZCcpLnN0eWxlLmNvbG9yID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBieSBzZXRBdHRyaWJ1dGUocm93LCB2YWx1ZSk7XG4gICAqIEBwYXJhbSByb3cgUm93IHRvIHNldCBhcyBzZWxlY3RlZCByb3dcbiAgICogQHBhcmFtIGlzU2VsZWN0ZWQgVG9nZ2xlIHNlbGVjdGVkIHN0YXRlIGFuZCBzdHlsZVxuICAgKi9cbiAgc2VsZWN0Um93KHJvdzogSFRNTEVsZW1lbnRXcmFwcGVyLCBpc1NlbGVjdGVkOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMubm9kZXMgPT0gbnVsbCkgcmV0dXJuO1xuICAgIGxldCBub2RlSW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLm5vZGVzLCAobm9kZSkgPT4ge1xuICAgICAgcmV0dXJuIG5vZGUgPT09IHJvdztcbiAgICB9KTtcbiAgICAvL05vdyBpbiB0aGUgYXMtaXMndHJlZS10YWJsZSBvbmx5IG9uZSByb3cgY2FuIGJlIHNlbGVjdGVkLlxuXG4gICAgbGV0IHRkczogTm9kZUxpc3QgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICh0ZHNbaV0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmNvbG9yID0gJyc7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9zZWxlY3RSb3coaSwgZmFsc2UpO1xuICAgIH1cblxuICAgIHRoaXMuX3NlbGVjdFJvdyhub2RlSW5kZXgsIHRydWUpO1xuXG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRSb3dFbGVtZW50cy5wdXNoKHJvdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRSb3dFbGVtZW50cyA9IHRoaXMuc2VsZWN0ZWRSb3dFbGVtZW50cy5maWx0ZXIoZWw9PntcbiAgICAgICAgcmV0dXJuIGVsLl91bmlxdWVJZCAhPT0gcm93Ll9pbnRlcm5hbElkO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0U2VsZWN0ZWRSb3dzKCk6IEFycmF5PEhUTUxFbGVtZW50V3JhcHBlcj4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkUm93RWxlbWVudHM7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvKipcbiAgICogQ3JlYXRlIHRhYmxlIGNlbGwgKHdpbGwgbm90IGFwcGVuZCB0byBhbnl0aGluZylcbiAgICogQHJldHVybnMgVGhlIHRhYmxlIGNlbGwgdGhhdCBpcyBjcmVhdGVkXG4gICAqL1xuICBjcmVhdGVDZWxsKCk6IEhUTUxFbGVtZW50V3JhcHBlciB7XG4gICAgY29uc3QgY2VsbDogSFRNTEVsZW1lbnRXcmFwcGVyID0gbmV3IEhUTUxFbGVtZW50V3JhcHBlcih0aGlzLnJlbmRlcmVyLCBcImNlbGxcIiwgdGhpcy5nZXRTZXNzaW9uKCkpO1xuICAgIGNlbGwuc2V0QXR0cmlidXRlKFwiaWRcIiwgQmFzZUNvbXBvbmVudC5nZW5lcmF0ZVVuaXF1ZUlkKFwiY2VsbFwiKSk7XG4gICAgdGhpcy5zZXRQYXJlbnRTY3JlZW5JZChjZWxsKTtcblxuICAgIC8vZm9yIGNlbGwsIHdlIG5lZWQgdG8gYXBwZW5kIGl0IHRvIHRoZSByb3dcbiAgICB0aGlzLnRyYWNrTm9kZShjZWxsKTtcblxuICAgIHJldHVybiBjZWxsO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVzZWQgY3JlYXRlQ2VsbCBpbnN0ZWFkXG4gICAqL1xuICBhZGRDZWxsKCk6IEhUTUxFbGVtZW50V3JhcHBlciB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQ2VsbCgpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIFJlLXJlbmRlciB0cmVlIHRhYmxlLiBNdXN0IGNhbGwgalF1ZXJ5IHBsdWdpbidzIG1ldGhvZCBvbiBlbGVtZW50IHRvIHJlLXJlbmRlci5cbiAgICovXG4gIHJlZHJhd1RyZWUoKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpPT57XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgalF1ZXJ5KGAjJHt0aGlzLmlkfSAuanEtdHJlZS10YWJsZWApLnRyZWV0YWJsZSh7XG4gICAgICAgIGV4cGFuZGFibGU6IHRydWVcbiAgICAgIH0sIHRydWUpO1xuXG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEV4cGFuZCBhbGwgbm9kZXMgaW4gdGhlIHRyZWVcbiAgICovXG4gIGV4cGFuZEFsbCgpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGpRdWVyeShgIyR7dGhpcy5pZH0gLmpxLXRyZWUtdGFibGVgKS50cmVldGFibGUoXCJleHBhbmRBbGxcIik7XG4gICAgdGhpcy5zZXROb2RlRXhwYW5kZWRTdGF0dXMoXCJ0cnVlXCIpO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIENvbGxhcHNlIGFsbCBub2RlIGluIHRoZSB0cmVlXG4gICAqL1xuICBjb2xsYXBzZUFsbCgpIHtcbiAgICBqUXVlcnkoYCMke3RoaXMuaWR9IC5qcS10cmVlLXRhYmxlYCkudHJlZXRhYmxlKFwiY29sbGFwc2VBbGxcIik7XG4gICAgdGhpcy5zZXROb2RlRXhwYW5kZWRTdGF0dXMoXCJmYWxzZVwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY2hpbGQgbm9kZXMgb2YgdGhlIHRhYmxlXG4gICAqIEByZXR1cm5zIFtbbm9kZXNdXVxuICAgKi9cbiAgZ2V0VGFibGVDaGlsZHJlbigpOiBBcnJheTxIVE1MRWxlbWVudFdyYXBwZXI+IHtcbiAgICByZXR1cm4gdGhpcy5ub2RlcztcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgbnVtYmVyIG9mIGNoaWxkIG5vZGVzIGZvciB0aGlzIHRyZWVcbiAgICogQHJldHVybnMgTnVtYmVyIG9mIGNoaWxkIG5vZGVzXG4gICAqL1xuICBnZXRDaGlsZENvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubm9kZXMgIT0gbnVsbCA/IHRoaXMubm9kZXMubGVuZ3RoIDogMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY2hpbGQgbm9kZSBieSBpZFxuICAgKiBAcGFyYW0gaWRcbiAgICovXG4gIGdldENoaWxkQnlJZChpZDogc3RyaW5nKTogSFRNTEVsZW1lbnRXcmFwcGVyIHtcbiAgICBpZiAodGhpcy5ub2RlcyAhPSBudWxsKSB7XG4gICAgICBjb25zdCB0ZW1wID0gXy5maWx0ZXIodGhpcy5ub2RlcywgKGl0ZW06IEhUTUxFbGVtZW50V3JhcHBlcik9Pml0ZW0uZ2V0SWQoKSA9PT0gaWQpO1xuXG4gICAgICBpZiAodGVtcC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0ZW1wWzBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEdldCBsaXN0IG9mIG5vZGVzIGZyb20gWFBhdGggZXhwcmVzc2lvbiBzdHJpbmdcbiAgICogQHBhcmFtIHhwYXRoRXhwcmVzc2lvblxuICAgKi9cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgZXZhbHVhdGVYUGF0aCh4cGF0aEV4cHJlc3Npb246IHN0cmluZyk6IGFueSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBjb25zdCByZXN1bHQ6IFZlY3Rvcjxhbnk+ID0gbmV3IFZlY3Rvcjxhbnk+KCk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBjb25zdCB4cGF0aFJlc3VsdDogWFBhdGhSZXN1bHQgPSBkb2N1bWVudC5ldmFsdWF0ZSh4cGF0aEV4cHJlc3Npb24ucmVwbGFjZShcImNlbGxbXCIsIFwidGRbXCIpLnJlcGxhY2UoXCJyb3dbXCIsIFwidHJbXCIpLCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgbnVsbCwgWFBhdGhSZXN1bHQuQU5ZX1RZUEUsIG51bGwpO1xuXG4gICAgaWYgKHhwYXRoUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIGxldCBub2RlOiBOb2RlID0geHBhdGhSZXN1bHQuaXRlcmF0ZU5leHQoKTtcblxuICAgICAgd2hpbGUobm9kZSkge1xuICAgICAgICByZXN1bHQuYWRkKG5vZGUpO1xuICAgICAgICBub2RlID0geHBhdGhSZXN1bHQuaXRlcmF0ZU5leHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgY2hpbGQgbm9kZSB0byB0aGUgdHJlZVxuICAgKiBAcGFyYW0gbm9kZSBDaGlsZCB0byBhZGRcbiAgICovXG4gIHByaXZhdGUgdHJhY2tOb2RlKG5vZGU6IEhUTUxFbGVtZW50V3JhcHBlcikge1xuICAgIGlmICh0aGlzLm5vZGVzID09IG51bGwpIHtcbiAgICAgIHRoaXMubm9kZXMgPSBbXTtcbiAgICB9XG5cbiAgICB0aGlzLm5vZGVzLnB1c2gobm9kZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IE5leGFXZWIgdGFnIG5hbWVcbiAgICogQHJldHVybnMgVGFnbmFtZVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldE54VGFnTmFtZSgpIHtcbiAgICByZXR1cm4gXCJ0cmVlVGFibGVcIjtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBHZXQgW1tjZF1dIChDaGFuZ2UgZGV0ZWN0b3IpIHByb3BlcnR5XG4gICAqIEByZXR1cm5zIENoYW5nZSBkZXRlY3RvciByZWZlcmVuY2VcbiAgICovXG4gIHByb3RlY3RlZCBnZXRDaGFuZ2VEZXRlY3RvcigpIHtcbiAgICByZXR1cm4gdGhpcy5jZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbm9kZSBleHBhbmRlZCBwcm9wZXJ0eSB2YWx1ZVxuICAgKiBAcGFyYW0gc3RhdHVzIFZhbHVlIGZvciBub2RlJ3MgZXhwYW5kZWQgcHJvcGVydHlcbiAgICovXG4gIHByaXZhdGUgc2V0Tm9kZUV4cGFuZGVkU3RhdHVzKHN0YXR1czogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubm9kZXMgIT0gbnVsbCkge1xuICAgICAgXy5mb3JFYWNoKHRoaXMubm9kZXMsIChub2RlKT0+e1xuICAgICAgICBpZiAobm9kZS5nZXRMb2NhbE5hbWUoKSA9PT0gXCJyb3dcIikge1xuICAgICAgICAgIG5vZGUuZXhwYW5kZWQgPSBzdGF0dXM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgSlNPTiByZXByZXNlbnRhdGlvbiBmb3IgdGhpcyBjb21wb25lbnRcbiAgICogQHJldHVybnMgQ29tcG9uZW50IG1ldGFkYXRhIGFzIEpTT04gb2JqZWN0XG4gICAqL1xuICB0b0pzb24oKToge30ge1xuICAgIGNvbnN0IHJldFZhbCA9IHN1cGVyLnRvSnNvbigpO1xuXG4gICAgaWYgKHRoaXMubm9kZXMgIT0gbnVsbCkge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLm5vZGVzLmZpbHRlcihub2RlPT5ub2RlLmdldExvY2FsTmFtZSgpID09PSBcInJvd1wiKTtcblxuICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0VmFsW1wiY2hpbGRyZW5cIl0gPSBjaGlsZHJlbi5tYXAoY2hpbGQ9PmNoaWxkLnRvSnNvbigpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG4gIC8qKlxuICAgKiBTZXQgdGhlIGVsZW1lbnRzIHBhcmVudCBJRFxuICAgKiBAcGFyYW0gZWxcbiAgICovXG4gIHByaXZhdGUgc2V0UGFyZW50U2NyZWVuSWQoZWw6IEhUTUxFbGVtZW50V3JhcHBlcikge1xuICAgIGlmICh0aGlzLmdldFBhcmVudFZpZXcoKSAhPSBudWxsKSB7XG4gICAgICAgIGVsLnBhcmVudFNjcmVlbklkID0gdGhpcy5nZXRQYXJlbnRWaWV3KCkuZ2V0SWQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Tm9kZXMoKTogSFRNTEVsZW1lbnRXcmFwcGVyW10ge1xuICAgIHJldHVybiB0aGlzLm5vZGVzXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZURvY0ZyYWdtZW50KCkge1xuICAgIGlmICh0aGlzLnVzZURvY0ZyYWdtZW50ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLl9ib2R5RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgfVxuICB9XG5cbiAgYXBwZW5kRnJhZ21lbnQoKSB7XG4gICAgaWYgKHRoaXMuX2JvZHlGcmFnbWVudCAhPSBudWxsKSB7XG4gICAgICAodGhpcy50YWJsZUJvZHkubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuYXBwZW5kQ2hpbGQodGhpcy5fYm9keUZyYWdtZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==