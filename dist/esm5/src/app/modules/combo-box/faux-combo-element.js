/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { AttributesEnum } from "../base/attributes.enum";
var FauxComboElement = /** @class */ (function () {
    function FauxComboElement(comboBox, valuePair) {
        this.comboBox = comboBox;
        this.valuePair = valuePair;
    }
    /* istanbul ignore next */
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    FauxComboElement.prototype.setAttribute = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        if (name === AttributesEnum.SELECTED || name === "selected") {
            if (value == true || value == "true") {
                this.comboBox.setSelectItem(this.valuePair, true);
            }
            else {
                this.comboBox.setSelectItem(null, true);
            }
            this.valuePair.selected = value == true || value == "true";
            this.comboBox.detectChanges();
        }
        else if (name === AttributesEnum.VISIBLE || name === "visible") {
            this.valuePair.visible = value;
        }
        else if (name === AttributesEnum.TEXT || name === "text") {
            this.valuePair.text = value;
        }
        else if (name === AttributesEnum.VALUE || name === "value") {
            this.valuePair.value = value;
        }
        else {
            console.error("FauxComboElement: Unknown attribute: " + name);
        }
    };
    /**
     * @return {?}
     */
    FauxComboElement.prototype.getLocalName = /**
     * @return {?}
     */
    function () {
        return FauxComboElement.LOCAL_NAME;
    };
    /* istanbul ignore next */
    /**
     * @param {?} name
     * @return {?}
     */
    FauxComboElement.prototype.getAttribute = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (name === "value" || name === AttributesEnum.VALUE) {
            return this.valuePair.value;
        }
        if (name === "text" || name === AttributesEnum.TEXT) {
            return this.valuePair.text;
        }
        if (name === "selected" || name === AttributesEnum.SELECTED) {
            return this.valuePair.selected == true ? "true" : "false";
        }
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    FauxComboElement.prototype.getValue = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("value");
    };
    /* istanbul ignore next */
    /**
     * @return {?}
     */
    FauxComboElement.prototype.getText = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("text");
    };
    /**
     * @return {?}
     */
    FauxComboElement.prototype.isSelected = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("selected");
    };
    /**
     * @param {?} boo
     * @return {?}
     */
    FauxComboElement.prototype.setChecked = /**
     * @param {?} boo
     * @return {?}
     */
    function (boo) {
        this.setAttribute("selected", boo);
    };
    FauxComboElement.LOCAL_NAME = "listItem";
    return FauxComboElement;
}());
export { FauxComboElement };
if (false) {
    /** @type {?} */
    FauxComboElement.LOCAL_NAME;
    /** @type {?} */
    FauxComboElement.prototype.comboBox;
    /** @type {?} */
    FauxComboElement.prototype.valuePair;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmF1eC1jb21iby1lbGVtZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jb21iby1ib3gvZmF1eC1jb21iby1lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBS3JELDBCQUFvQixRQUEyQixFQUFVLFNBQW9CO1FBQXpELGFBQVEsR0FBUixRQUFRLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztLQUU1RTtJQUVELDBCQUEwQjs7Ozs7O0lBQzFCLHVDQUFZOzs7OztJQUFaLFVBQWEsSUFBUyxFQUFFLEtBQVU7UUFDOUIsSUFBSSxJQUFJLEtBQUssY0FBYyxDQUFDLFFBQVEsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO1lBQ3pELElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3JEO2lCQUFNO2dCQUNILElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMzQztZQUVELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQztZQUUzRCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxJQUFJLEtBQUssY0FBYyxDQUFDLE9BQU8sSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzlELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUNsQzthQUFNLElBQUksSUFBSSxLQUFLLGNBQWMsQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7U0FDL0I7YUFBTSxJQUFJLElBQUksS0FBSyxjQUFjLENBQUMsS0FBSyxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ2hDO2FBQU07WUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ2pFO0tBQ0o7Ozs7SUFFRCx1Q0FBWTs7O0lBQVo7UUFDSSxPQUFPLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztLQUN0QztJQUVELDBCQUEwQjs7Ozs7SUFDMUIsdUNBQVk7Ozs7SUFBWixVQUFhLElBQVM7UUFDbEIsSUFBSSxJQUFJLEtBQUssT0FBTyxJQUFJLElBQUksS0FBSyxjQUFjLENBQUMsS0FBSyxFQUFFO1lBQ25ELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDL0I7UUFFRCxJQUFJLElBQUksS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLGNBQWMsQ0FBQyxJQUFJLEVBQUU7WUFDakQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztTQUM5QjtRQUVELElBQUksSUFBSSxLQUFLLFVBQVUsSUFBSSxJQUFJLEtBQUssY0FBYyxDQUFDLFFBQVEsRUFBRTtZQUN6RCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDN0Q7S0FDSjtJQUVELDBCQUEwQjs7OztJQUMxQixtQ0FBUTs7O0lBQVI7UUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckM7SUFFRCwwQkFBMEI7Ozs7SUFDMUIsa0NBQU87OztJQUFQO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3BDOzs7O0lBRUQscUNBQVU7OztJQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3hDOzs7OztJQUVELHFDQUFVOzs7O0lBQVYsVUFBVyxHQUFZO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3RDO2tDQS9Eb0MsVUFBVTsyQkFObkQ7O1NBS2EsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tYm9Cb3hDb21wb25lbnQgfSBmcm9tIFwiLi9jb21iby1ib3guY29tcG9uZW50XCI7XG5pbXBvcnQgeyBWYWx1ZVBhaXIgfSBmcm9tIFwiLi92YWx1ZS1wYWlyXCI7XG5pbXBvcnQgeyBBdHRyaWJ1dGVzRW51bSB9IGZyb20gXCIuLi9iYXNlL2F0dHJpYnV0ZXMuZW51bVwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGNsYXNzIEZhdXhDb21ib0VsZW1lbnQge1xuICAgIHN0YXRpYyByZWFkb25seSBMT0NBTF9OQU1FOiBzdHJpbmcgPSBcImxpc3RJdGVtXCI7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21ib0JveDogQ29tYm9Cb3hDb21wb25lbnQsIHByaXZhdGUgdmFsdWVQYWlyOiBWYWx1ZVBhaXIpIHtcblxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgc2V0QXR0cmlidXRlKG5hbWU6IGFueSwgdmFsdWU6IGFueSkge1xuICAgICAgICBpZiAobmFtZSA9PT0gQXR0cmlidXRlc0VudW0uU0VMRUNURUQgfHwgbmFtZSA9PT0gXCJzZWxlY3RlZFwiKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gdHJ1ZSB8fCB2YWx1ZSA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tYm9Cb3guc2V0U2VsZWN0SXRlbSh0aGlzLnZhbHVlUGFpciwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tYm9Cb3guc2V0U2VsZWN0SXRlbShudWxsLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy52YWx1ZVBhaXIuc2VsZWN0ZWQgPSB2YWx1ZSA9PSB0cnVlIHx8IHZhbHVlID09IFwidHJ1ZVwiO1xuXG4gICAgICAgICAgICB0aGlzLmNvbWJvQm94LmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBBdHRyaWJ1dGVzRW51bS5WSVNJQkxFIHx8IG5hbWUgPT09IFwidmlzaWJsZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlUGFpci52aXNpYmxlID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gQXR0cmlidXRlc0VudW0uVEVYVCB8fCBuYW1lID09PSBcInRleHRcIikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZVBhaXIudGV4dCA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09IEF0dHJpYnV0ZXNFbnVtLlZBTFVFIHx8IG5hbWUgPT09IFwidmFsdWVcIikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZVBhaXIudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYXV4Q29tYm9FbGVtZW50OiBVbmtub3duIGF0dHJpYnV0ZTogXCIgKyBuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExvY2FsTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gRmF1eENvbWJvRWxlbWVudC5MT0NBTF9OQU1FO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgZ2V0QXR0cmlidXRlKG5hbWU6IGFueSkge1xuICAgICAgICBpZiAobmFtZSA9PT0gXCJ2YWx1ZVwiIHx8IG5hbWUgPT09IEF0dHJpYnV0ZXNFbnVtLlZBTFVFKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVBhaXIudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmFtZSA9PT0gXCJ0ZXh0XCIgfHwgbmFtZSA9PT0gQXR0cmlidXRlc0VudW0uVEVYVCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVQYWlyLnRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmFtZSA9PT0gXCJzZWxlY3RlZFwiIHx8IG5hbWUgPT09IEF0dHJpYnV0ZXNFbnVtLlNFTEVDVEVEKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVBhaXIuc2VsZWN0ZWQgPT0gdHJ1ZSA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwidmFsdWVcIik7XG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBnZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJ0ZXh0XCIpO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIpO1xuICAgIH1cblxuICAgIHNldENoZWNrZWQoYm9vOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgYm9vKTtcbiAgICB9XG59Il19