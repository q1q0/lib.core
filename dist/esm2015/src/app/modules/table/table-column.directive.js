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
export class TableColumnDirective {
    constructor() {
        //TODO
        this.locked = false;
        //TODO
        this.enabled = true;
        this.sortable = true;
        this.isChecked = false;
        this._visible = true;
    }
    /**
     * @param {?} header
     * @return {?}
     */
    set header(header) {
        this._header = header;
    }
    /**
     * @return {?}
     */
    get header() {
        return this.headerDirective ? this.headerDirective.text : this._header;
    }
    /**
     * @param {?} vis
     * @return {?}
     */
    set visible(vis) {
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
    }
    /**
     * @return {?}
     */
    get visible() {
        return this._visible;
    }
    /**
     * @return {?}
     */
    get isHeaderTemplate() {
        return this.headerTemplate === null || this.headerTemplate === undefined ? false : true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(name, value) {
        if (typeof name === "number" && name === AttributesEnum.VISIBLE) {
            this.visible = JavaUtils.parseBoolean(value);
        }
        else {
            if (this.customAttributes == null) {
                this.customAttributes = {};
            }
            this.customAttributes[name] = value;
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getAttribute(name) {
        if (typeof name === "number" && name === AttributesEnum.VISIBLE)
            return /** @type {?} */ (this.visible);
        if (typeof name === "number" && name === AttributesEnum.ID)
            return this.id;
        /** @type {?} */
        let retVal = this.customAttributes != null ? this.customAttributes[name] : null;
        if (typeof retVal !== "string") {
            retVal = retVal + "";
        }
        return retVal;
    }
    /**
     * @param {?} vis
     * @return {?}
     */
    setVisible(vis) {
        this.visible = vis;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY29sdW1uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvdGFibGUvdGFibGUtY29sdW1uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVwRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFLL0MsTUFBTTs7O3NCQUV5QixLQUFLOzt1QkFHSixJQUFJO3dCQUVILElBQUk7eUJBRUgsS0FBSzt3QkFrRWYsSUFBSTs7Ozs7O0lBN0N4QixJQUFhLE1BQU0sQ0FBRSxNQUFjO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0tBQ3pCOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUMxRTs7Ozs7SUFpQkQsSUFBYSxPQUFPLENBQUMsR0FBWTtRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUVwQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ3hCLElBQUks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LEtBQUs7dUJBRUwsS0FBSzt3QkFFTCxLQUFLOzhCQUtMLEtBQUs7aUJBRUwsS0FBSzsyQkFHTCxZQUFZLFNBQUMsa0JBQWtCLEVBQUUsRUFBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUM7NkJBSTNELFlBQVksU0FBQyxvQkFBb0IsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUM7OEJBSXRELFlBQVksU0FBQyxlQUFlO3FCQUc1QixLQUFLO3VCQVFMLEtBQUs7MkJBUUwsS0FBSzs0QkFDTCxLQUFLO3lCQUVMLEtBQUs7MkJBRUwsS0FBSztzQkFFTCxLQUFLOytCQXdCTCxLQUFLOzJCQVdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVGFibGVDZWxsRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJsZS1jZWxsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJsZUhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtaGVhZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIZWFkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2hlYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2VsbERlZmluaXRpb24gfSBmcm9tICcuL2NlbGwtZGVmaW5pdGlvbic7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVzRW51bSB9IGZyb20gJy4uL2Jhc2UvYXR0cmlidXRlcy5lbnVtJztcbmltcG9ydCB7IEphdmFVdGlscyB9IGZyb20gJy4uL2phdmEvamF2YS11dGlscyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAndnQtdGFibGUtY29sdW1uJ1xufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUNvbHVtbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLy9UT0RPXG4gICAgQElucHV0KCkgbG9ja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvL1RPRE9cbiAgICBASW5wdXQoKSBlbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNvcnRhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGlzQ2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSG9yaXpvbnRhbCBhbGlnbm1lbnQgKGNlbnRlciwgbGVmdCwgcmlnaHQpXG4gICAgICovXG4gICAgQElucHV0KCkgYWxpZ25Ib3Jpem9udGFsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gICAgLy9jZWxsIHRlbXBsYXRlXG4gICAgQENvbnRlbnRDaGlsZChUYWJsZUNlbGxEaXJlY3RpdmUsIHtyZWFkOiBUYWJsZUNlbGxEaXJlY3RpdmV9KVxuICAgIGNlbGxUZW1wbGF0ZTogVGFibGVDZWxsRGlyZWN0aXZlO1xuXG4gICAgLy9oZWFkZXIgdGVtcGxhdGUgaWYgd2Ugd2FudCB0byByZW5kZXIgdGhlIGhlYWRlciBkaWZmZXJlbnRseSAoaS5lLiBjaGVja2JveCwgZXRjKVxuICAgIEBDb250ZW50Q2hpbGQoVGFibGVIZWFkZXJEaXJlY3RpdmUsIHtyZWFkOiBUZW1wbGF0ZVJlZn0pXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvL2hlYWRlciB0YWc/XG4gICAgQENvbnRlbnRDaGlsZChIZWFkZXJEaXJlY3RpdmUpIGhlYWRlckRpcmVjdGl2ZTogSGVhZGVyRGlyZWN0aXZlO1xuXG4gICAgLy9kZWZhdWx0LCB1c2UgdGhlIHtoZWFkZXJ9IGFzIHRoZSBoZWFkZXIgZm9yIHRoZSBjZWxsXG4gICAgQElucHV0KCkgc2V0IGhlYWRlciAoaGVhZGVyOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faGVhZGVyID0gaGVhZGVyO1xuICAgIH1cblxuICAgIGdldCBoZWFkZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhZGVyRGlyZWN0aXZlID8gdGhpcy5oZWFkZXJEaXJlY3RpdmUudGV4dCA6IHRoaXMuX2hlYWRlcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBhdXRvV3JhcDogYm9vbGVhbjtcblxuICAgIF9oZWFkZXI6IHN0cmluZztcblxuICAgIHNvcnREaXJlY3Rpb246IHN0cmluZztcblxuICAgIG9yaWdpbmFsQ29sdW1uSW5kZXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGNvbnRyb2xXaWR0aDogc3RyaW5nIHwgbnVtYmVyO1xuICAgIEBJbnB1dCgpIGNvbnRyb2xIZWlnaHQ6IHN0cmluZyB8IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGNlbGxIZWlnaHQ6IHN0cmluZyB8IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGhlYWRlckhlaWdodDogc3RyaW5nIHwgbnVtYmVyO1xuXG4gICAgQElucHV0KCkgc2V0IHZpc2libGUodmlzOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2aXM7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0eWxlcykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0eWxlc1tcImRpc3BsYXlcIl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdHlsZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlc1tcImRpc3BsYXlcIl0gPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheVwiOiBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB2aXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9XG5cbiAgICBfdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBjdXN0b21BdHRyaWJ1dGVzOiB7W25hbWU6IHN0cmluZ106IGFueX07XG5cbiAgICBzdHlsZXM6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfTtcblxuICAgIGdldCBpc0hlYWRlclRlbXBsYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWFkZXJUZW1wbGF0ZSA9PT0gbnVsbCB8fCB0aGlzLmhlYWRlclRlbXBsYXRlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG9uJ3QgdHJhY2sgdGhpcyBjb2x1bW4gKHRoYXQgaXMsIHVzZSBmb3IgZGlzcGxheSBvbmx5KS5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBza2lwVHJhY2tpbmc6IGJvb2xlYW47XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgIGlmICh0aGlzLmhlYWRlckRpcmVjdGl2ZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy5oZWFkZXJEaXJlY3RpdmUudGV4dDtcblxuICAgICAgICBpZiAodGhpcy5hdXRvV3JhcCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9XcmFwID0gdGhpcy5oZWFkZXJEaXJlY3RpdmUuYXV0b1dyYXAgPT09IHRydWUgfHwgdGhpcy5oZWFkZXJEaXJlY3RpdmUuYXV0b1dyYXAgPT09IFwidHJ1ZVwiXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaWQgPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuaWQgPSBCYXNlQ29tcG9uZW50LmdlbmVyYXRlVW5pcXVlSWQoXCJjb2x1bW5cIik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmhlYWRlckhlaWdodCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuaGVhZGVySGVpZ2h0ID0gdGhpcy5oZWFkZXJIZWlnaHQ7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBzZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJudW1iZXJcIiAmJiBuYW1lID09PSBBdHRyaWJ1dGVzRW51bS5WSVNJQkxFKSB7XG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSBKYXZhVXRpbHMucGFyc2VCb29sZWFuKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUF0dHJpYnV0ZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tQXR0cmlidXRlcyA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN1c3RvbUF0dHJpYnV0ZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwibnVtYmVyXCIgJiYgbmFtZSA9PT0gQXR0cmlidXRlc0VudW0uVklTSUJMRSkgcmV0dXJuIHRoaXMudmlzaWJsZSBhcyBhbnk7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJudW1iZXJcIiAmJiBuYW1lID09PSBBdHRyaWJ1dGVzRW51bS5JRCkgcmV0dXJuIHRoaXMuaWQ7XG5cbiAgICAgICAgbGV0IHJldFZhbCA9IHRoaXMuY3VzdG9tQXR0cmlidXRlcyAhPSBudWxsID8gdGhpcy5jdXN0b21BdHRyaWJ1dGVzW25hbWVdIDogbnVsbDtcblxuICAgICAgICBpZiAodHlwZW9mIHJldFZhbCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHJldFZhbCA9IHJldFZhbCArIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgIH1cblxuICAgIHNldFZpc2libGUodmlzOiBib29sZWFuKSB7XG4gICAgICB0aGlzLnZpc2libGUgPSB2aXM7XG4gICAgfVxufVxuIl19