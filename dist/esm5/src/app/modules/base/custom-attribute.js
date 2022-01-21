/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
CustomAttribute = /** @class */ (function () {
    function CustomAttribute(parent) {
        this.parent = parent;
    }
    /**
     * @return {?}
     */
    CustomAttribute.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var name = this.getPropertyName();
        /** @type {?} */
        var value = this.getPropertyValue();
        if (this.parent != null && name != null && name !== "") {
            if (value == null) {
                value = "";
            }
            this.parent.setCustomAttribute(name, value);
        }
        else if (this.parent == null) {
            console.error("Unable to set custom property, parent is null");
        }
    };
    return CustomAttribute;
}());
/**
 * @abstract
 */
export { CustomAttribute };
if (false) {
    /** @type {?} */
    CustomAttribute.prototype.parent;
    /**
     * Return the name of the custom property
     * @abstract
     * @return {?}
     */
    CustomAttribute.prototype.getPropertyName = function () { };
    /**
     * Return the value of the custom property
     * @abstract
     * @return {?}
     */
    CustomAttribute.prototype.getPropertyValue = function () { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWF0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvYmFzZS9jdXN0b20tYXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQTs7O0FBQUE7SUFDSSx5QkFBcUIsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtLQUV6Qzs7OztJQUVELGtDQUFROzs7SUFBUjs7UUFDSSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O1FBQ3BDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXBDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ3BELElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDZixLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ2Q7WUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMvQzthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1NBQ2xFO0tBQ0o7MEJBckJMO0lBZ0NDLENBQUE7Ozs7QUE3QkQsMkJBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlLmNvbXBvbmVudFwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ3VzdG9tQXR0cmlidXRlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBwYXJlbnQ6IEJhc2VDb21wb25lbnQpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXRQcm9wZXJ0eU5hbWUoKTtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRQcm9wZXJ0eVZhbHVlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucGFyZW50ICE9IG51bGwgJiYgbmFtZSAhPSBudWxsICYmIG5hbWUgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBhcmVudC5zZXRDdXN0b21BdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gc2V0IGN1c3RvbSBwcm9wZXJ0eSwgcGFyZW50IGlzIG51bGxcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIG5hbWUgb2YgdGhlIGN1c3RvbSBwcm9wZXJ0eVxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldFByb3BlcnR5TmFtZSgpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIHZhbHVlIG9mIHRoZSBjdXN0b20gcHJvcGVydHlcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRQcm9wZXJ0eVZhbHVlKCk6IHN0cmluZztcbn0iXX0=