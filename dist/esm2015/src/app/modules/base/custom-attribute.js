/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
export class CustomAttribute {
    /**
     * @param {?} parent
     */
    constructor(parent) {
        this.parent = parent;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const name = this.getPropertyName();
        /** @type {?} */
        let value = this.getPropertyValue();
        if (this.parent != null && name != null && name !== "") {
            if (value == null) {
                value = "";
            }
            this.parent.setCustomAttribute(name, value);
        }
        else if (this.parent == null) {
            console.error("Unable to set custom property, parent is null");
        }
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWF0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ZpdmlmeS1jb3JlLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvYmFzZS9jdXN0b20tYXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxNQUFNOzs7O0lBQ0YsWUFBcUIsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtLQUV6Qzs7OztJQUVELFFBQVE7O1FBQ0osTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOztRQUNwQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUVwQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUNwRCxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQ2YsS0FBSyxHQUFHLEVBQUUsQ0FBQzthQUNkO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0M7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztTQUNsRTtLQUNKO0NBV0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UuY29tcG9uZW50XCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDdXN0b21BdHRyaWJ1dGUgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGNvbnN0cnVjdG9yIChwcml2YXRlIHBhcmVudDogQmFzZUNvbXBvbmVudCkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldFByb3BlcnR5TmFtZSgpO1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFByb3BlcnR5VmFsdWUoKTtcblxuICAgICAgICBpZiAodGhpcy5wYXJlbnQgIT0gbnVsbCAmJiBuYW1lICE9IG51bGwgJiYgbmFtZSAhPT0gXCJcIikge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucGFyZW50LnNldEN1c3RvbUF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXJlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBzZXQgY3VzdG9tIHByb3BlcnR5LCBwYXJlbnQgaXMgbnVsbFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbmFtZSBvZiB0aGUgY3VzdG9tIHByb3BlcnR5XG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0UHJvcGVydHlOYW1lKCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgdmFsdWUgb2YgdGhlIGN1c3RvbSBwcm9wZXJ0eVxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldFByb3BlcnR5VmFsdWUoKTogc3RyaW5nO1xufSJdfQ==