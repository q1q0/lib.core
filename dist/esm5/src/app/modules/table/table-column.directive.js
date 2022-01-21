/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, TemplateRef, ContentChild } from '@angular/core';
import { TableCellDirective } from './table-cell.directive';
import { TableHeaderDirective } from './table-header.directive';
import { HeaderDirective } from './header.directive';
import { BaseComponent } from '../base/base.component';
import { AttributesEnum } from '../base/attributes.enum';
import { JavaUtils } from '../java/java-utils';
var TableColumnDirective = /** @class */ (function () {
    function TableColumnDirective() {
        //TODO
        this.locked = false;
        //TODO
        this.enabled = true;
        this.sortable = true;
        this.isChecked = false;
        this._visible = true;
    }
    Object.defineProperty(TableColumnDirective.prototype, "header", {
        get: /**
         * @return {?}
         */
        function () {
            return this.headerDirective ? this.headerDirective.text : this._header;
        },
        //default, use the {header} as the header for the cell
        set: /**
         * @param {?} header
         * @return {?}
         */
        function (header) {
            this._header = header;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableColumnDirective.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} vis
         * @return {?}
         */
        function (vis) {
            this._visible = vis;
            if (this._visible === true) {
                if (this.styles) {
                    delete this.styles["display"];
                }
            }
            else {
                if (this.styles) {
                    this.styles["display"] = "none";
                }
                else {
                    this.styles = {
                        "display": "none"
                    };
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableColumnDirective.prototype, "isHeaderTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.headerTemplate === null || this.headerTemplate === undefined ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TableColumnDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.headerDirective != null) {
            this.header = this.headerDirective.text;
            if (this.autoWrap == null) {
                this.autoWrap = this.headerDirective.autoWrap === true || this.headerDirective.autoWrap === "true";
            }
        }
        if (this.id == null) {
            this.id = BaseComponent.generateUniqueId("column");
        }
        if (this.headerHeight != null) {
            this.headerHeight = this.headerHeight;
        }
    };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    TableColumnDirective.prototype.setAttribute = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        if (typeof name === "number" && name === AttributesEnum.VISIBLE) {
            this.visible = JavaUtils.parseBoolean(value);
        }
        else {
            if (this.customAttributes == null) {
                this.customAttributes = {};
            }
            this.customAttributes[name] = value;
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    TableColumnDirective.prototype.getAttribute = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (typeof name === "number" && name === AttributesEnum.VISIBLE)
            return /** @type {?} */ (this.visible);
        if (typeof name === "number" && name === AttributesEnum.ID)
            return this.id;
        /** @type {?} */
        var retVal = this.customAttributes != null ? this.customAttributes[name] : null;
        if (typeof retVal !== "string") {
            retVal = retVal + "";
        }
        return retVal;
    };
    /**
     * @param {?} vis
     * @return {?}
     */
    TableColumnDirective.prototype.setVisible = /**
     * @param {?} vis
     * @return {?}
     */
    function (vis) {
        this.visible = vis;
    };
    TableColumnDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'vt-table-column'
                },] }
    ];
    TableColumnDirective.propDecorators = {
        locked: [{ type: Input }],
        enabled: [{ type: Input }],
        sortable: [{ type: Input }],
        isChecked: [{ type: Input }],
        alignHorizontal: [{ type: Input }],
        id: [{ type: Input }],
        cellTemplate: [{ type: ContentChild, args: [TableCellDirective, { read: TableCellDirective },] }],
        headerTemplate: [{ type: ContentChild, args: [TableHeaderDirective, { read: TemplateRef },] }],
        headerDirective: [{ type: ContentChild, args: [HeaderDirective,] }],
        header: [{ type: Input }],
        autoWrap: [{ type: Input }],
        controlWidth: [{ type: Input }],
        controlHeight: [{ type: Input }],
        cellHeight: [{ type: Input }],
        headerHeight: [{ type: Input }],
        visible: [{ type: Input }],
        customAttributes: [{ type: Input }],
        skipTracking: [{ type: Input }]
    };
    return TableColumnDirective;
}());
export { TableColumnDirective };
if (false) {
    /** @type {?} */
    TableColumnDirective.prototype.locked;
    /** @type {?} */
    TableColumnDirective.prototype.enabled;
    /** @type {?} */
    TableColumnDirective.prototype.sortable;
    /** @type {?} */
    TableColumnDirective.prototype.isChecked;
    /**
     * Horizontal alignment (center, left, right)
     * @type {?}
     */
    TableColumnDirective.prototype.alignHorizontal;
    /** @type {?} */
    TableColumnDirective.prototype.id;
    /** @type {?} */
    TableColumnDirective.prototype.cellTemplate;
    /** @type {?} */
    TableColumnDirective.prototype.headerTemplate;
    /** @type {?} */
    TableColumnDirective.prototype.headerDirective;
    /** @type {?} */
    TableColumnDirective.prototype.autoWrap;
    /** @type {?} */
    TableColumnDirective.prototype._header;
    /** @type {?} */
    TableColumnDirective.prototype.sortDirection;
    /** @type {?} */
    TableColumnDirective.prototype.originalColumnIndex;
    /** @type {?} */
    TableColumnDirective.prototype.controlWidth;
    /** @type {?} */
    TableColumnDirective.prototype.controlHeight;
    /** @type {?} */
    TableColumnDirective.prototype.cellHeight;
    /** @type {?} */
    TableColumnDirective.prototype.headerHeight;
    /** @type {?} */
    TableColumnDirective.prototype._visible;
    /** @type {?} */
    TableColumnDirective.prototype.customAttributes;
    /** @type {?} */
    TableColumnDirective.prototype.styles;
    /**
     * Don't track this column (that is, use for display only).
     * @type {?}
     */
    TableColumnDirective.prototype.skipTracking;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY29sdW1uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvdGFibGUvdGFibGUtY29sdW1uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVwRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7c0JBT2hCLEtBQUs7O3VCQUdKLElBQUk7d0JBRUgsSUFBSTt5QkFFSCxLQUFLO3dCQWtFZixJQUFJOztJQTdDeEIsc0JBQWEsd0NBQU07Ozs7UUFJbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQzFFO1FBUEQsc0RBQXNEOzs7OztRQUN0RCxVQUFxQixNQUFjO1lBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ3pCOzs7T0FBQTtJQXFCRCxzQkFBYSx5Q0FBTzs7OztRQWtCcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDeEI7Ozs7O1FBcEJELFVBQXFCLEdBQVk7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FB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O0tBQ3BCOztnQkEzSUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7aUJBQzlCOzs7eUJBR0ksS0FBSzswQkFHTCxLQUFLOzJCQUVMLEtBQUs7NEJBRUwsS0FBSztrQ0FLTCxLQUFLO3FCQUVMLEtBQUs7K0JBR0wsWUFBWSxTQUFDLGtCQUFrQixFQUFFLEVBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFDO2lDQUkzRCxZQUFZLFNBQUMsb0JBQW9CLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFDO2tDQUl0RCxZQUFZLFNBQUMsZUFBZTt5QkFHNUIsS0FBSzsyQkFRTCxLQUFLOytCQVFMLEtBQUs7Z0NBQ0wsS0FBSzs2QkFFTCxLQUFLOytCQUVMLEtBQUs7MEJBRUwsS0FBSzttQ0F3QkwsS0FBSzsrQkFXTCxLQUFLOzsrQkFyR1Y7O1NBYWEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRhYmxlQ2VsbERpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtY2VsbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGFibGVIZWFkZXJEaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLWhlYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9oZWFkZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IENlbGxEZWZpbml0aW9uIH0gZnJvbSAnLi9jZWxsLWRlZmluaXRpb24nO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXR0cmlidXRlc0VudW0gfSBmcm9tICcuLi9iYXNlL2F0dHJpYnV0ZXMuZW51bSc7XG5pbXBvcnQgeyBKYXZhVXRpbHMgfSBmcm9tICcuLi9qYXZhL2phdmEtdXRpbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3Z0LXRhYmxlLWNvbHVtbidcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVDb2x1bW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8vVE9ET1xuICAgIEBJbnB1dCgpIGxvY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy9UT0RPXG4gICAgQElucHV0KCkgZW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzb3J0YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBpc0NoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEhvcml6b250YWwgYWxpZ25tZW50IChjZW50ZXIsIGxlZnQsIHJpZ2h0KVxuICAgICAqL1xuICAgIEBJbnB1dCgpIGFsaWduSG9yaXpvbnRhbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAgIC8vY2VsbCB0ZW1wbGF0ZVxuICAgIEBDb250ZW50Q2hpbGQoVGFibGVDZWxsRGlyZWN0aXZlLCB7cmVhZDogVGFibGVDZWxsRGlyZWN0aXZlfSlcbiAgICBjZWxsVGVtcGxhdGU6IFRhYmxlQ2VsbERpcmVjdGl2ZTtcblxuICAgIC8vaGVhZGVyIHRlbXBsYXRlIGlmIHdlIHdhbnQgdG8gcmVuZGVyIHRoZSBoZWFkZXIgZGlmZmVyZW50bHkgKGkuZS4gY2hlY2tib3gsIGV0YylcbiAgICBAQ29udGVudENoaWxkKFRhYmxlSGVhZGVyRGlyZWN0aXZlLCB7cmVhZDogVGVtcGxhdGVSZWZ9KVxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLy9oZWFkZXIgdGFnP1xuICAgIEBDb250ZW50Q2hpbGQoSGVhZGVyRGlyZWN0aXZlKSBoZWFkZXJEaXJlY3RpdmU6IEhlYWRlckRpcmVjdGl2ZTtcblxuICAgIC8vZGVmYXVsdCwgdXNlIHRoZSB7aGVhZGVyfSBhcyB0aGUgaGVhZGVyIGZvciB0aGUgY2VsbFxuICAgIEBJbnB1dCgpIHNldCBoZWFkZXIgKGhlYWRlcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2hlYWRlciA9IGhlYWRlcjtcbiAgICB9XG5cbiAgICBnZXQgaGVhZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlYWRlckRpcmVjdGl2ZSA/IHRoaXMuaGVhZGVyRGlyZWN0aXZlLnRleHQgOiB0aGlzLl9oZWFkZXI7XG4gICAgfVxuXG4gICAgQElucHV0KCkgYXV0b1dyYXA6IGJvb2xlYW47XG5cbiAgICBfaGVhZGVyOiBzdHJpbmc7XG5cbiAgICBzb3J0RGlyZWN0aW9uOiBzdHJpbmc7XG5cbiAgICBvcmlnaW5hbENvbHVtbkluZGV4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBjb250cm9sV2lkdGg6IHN0cmluZyB8IG51bWJlcjtcbiAgICBASW5wdXQoKSBjb250cm9sSGVpZ2h0OiBzdHJpbmcgfCBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBjZWxsSGVpZ2h0OiBzdHJpbmcgfCBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBoZWFkZXJIZWlnaHQ6IHN0cmluZyB8IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHNldCB2aXNpYmxlKHZpczogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmlzO1xuXG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdHlsZXMpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zdHlsZXNbXCJkaXNwbGF5XCJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3R5bGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZXNbXCJkaXNwbGF5XCJdID0gXCJub25lXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBcImRpc3BsYXlcIjogXCJub25lXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfVxuXG4gICAgX3Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgY3VzdG9tQXR0cmlidXRlczoge1tuYW1lOiBzdHJpbmddOiBhbnl9O1xuXG4gICAgc3R5bGVzOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ307XG5cbiAgICBnZXQgaXNIZWFkZXJUZW1wbGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhZGVyVGVtcGxhdGUgPT09IG51bGwgfHwgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvbid0IHRyYWNrIHRoaXMgY29sdW1uICh0aGF0IGlzLCB1c2UgZm9yIGRpc3BsYXkgb25seSkuXG4gICAgICovXG4gICAgQElucHV0KCkgc2tpcFRyYWNraW5nOiBib29sZWFuO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICBpZiAodGhpcy5oZWFkZXJEaXJlY3RpdmUgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmhlYWRlciA9IHRoaXMuaGVhZGVyRGlyZWN0aXZlLnRleHQ7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b1dyYXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5hdXRvV3JhcCA9IHRoaXMuaGVhZGVyRGlyZWN0aXZlLmF1dG9XcmFwID09PSB0cnVlIHx8IHRoaXMuaGVhZGVyRGlyZWN0aXZlLmF1dG9XcmFwID09PSBcInRydWVcIlxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlkID09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmlkID0gQmFzZUNvbXBvbmVudC5nZW5lcmF0ZVVuaXF1ZUlkKFwiY29sdW1uXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5oZWFkZXJIZWlnaHQgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmhlYWRlckhlaWdodCA9IHRoaXMuaGVhZGVySGVpZ2h0O1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwibnVtYmVyXCIgJiYgbmFtZSA9PT0gQXR0cmlidXRlc0VudW0uVklTSUJMRSkge1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gSmF2YVV0aWxzLnBhcnNlQm9vbGVhbih2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXN0b21BdHRyaWJ1dGVzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jdXN0b21BdHRyaWJ1dGVzW25hbWVdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSBcIm51bWJlclwiICYmIG5hbWUgPT09IEF0dHJpYnV0ZXNFbnVtLlZJU0lCTEUpIHJldHVybiB0aGlzLnZpc2libGUgYXMgYW55O1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwibnVtYmVyXCIgJiYgbmFtZSA9PT0gQXR0cmlidXRlc0VudW0uSUQpIHJldHVybiB0aGlzLmlkO1xuXG4gICAgICAgIGxldCByZXRWYWwgPSB0aGlzLmN1c3RvbUF0dHJpYnV0ZXMgIT0gbnVsbCA/IHRoaXMuY3VzdG9tQXR0cmlidXRlc1tuYW1lXSA6IG51bGw7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXRWYWwgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICByZXRWYWwgPSByZXRWYWwgKyBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9XG5cbiAgICBzZXRWaXNpYmxlKHZpczogYm9vbGVhbikge1xuICAgICAgdGhpcy52aXNpYmxlID0gdmlzO1xuICAgIH1cbn1cbiJdfQ==