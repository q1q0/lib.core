/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { AttributesEnum } from "../base/attributes.enum";
export class FauxComboElement {
    /**
     * @param {?} comboBox
     * @param {?} valuePair
     */
    constructor(comboBox, valuePair) {
        this.comboBox = comboBox;
        this.valuePair = valuePair;
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(name, value) {
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
    }
    /**
     * @return {?}
     */
    getLocalName() {
        return FauxComboElement.LOCAL_NAME;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getAttribute(name) {
        if (name === "value" || name === AttributesEnum.VALUE) {
            return this.valuePair.value;
        }
        if (name === "text" || name === AttributesEnum.TEXT) {
            return this.valuePair.text;
        }
        if (name === "selected" || name === AttributesEnum.SELECTED) {
            return this.valuePair.selected == true ? "true" : "false";
        }
    }
    /**
     * @return {?}
     */
    getValue() {
        return this.getAttribute("value");
    }
    /**
     * @return {?}
     */
    getText() {
        return this.getAttribute("text");
    }
    /**
     * @return {?}
     */
    isSelected() {
        return this.getAttribute("selected");
    }
    /**
     * @param {?} boo
     * @return {?}
     */
    setChecked(boo) {
        this.setAttribute("selected", boo);
    }
}
FauxComboElement.LOCAL_NAME = "listItem";
if (false) {
    /** @type {?} */
    FauxComboElement.LOCAL_NAME;
    /** @type {?} */
    FauxComboElement.prototype.comboBox;
    /** @type {?} */
    FauxComboElement.prototype.valuePair;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmF1eC1jb21iby1lbGVtZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdml2aWZ5LWNvcmUtY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jb21iby1ib3gvZmF1eC1jb21iby1lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHekQsTUFBTTs7Ozs7SUFFRixZQUFvQixRQUEyQixFQUFVLFNBQW9CO1FBQXpELGFBQVEsR0FBUixRQUFRLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztLQUU1RTs7Ozs7O0lBR0QsWUFBWSxDQUFDLElBQVMsRUFBRSxLQUFVO1FBQzlCLElBQUksSUFBSSxLQUFLLGNBQWMsQ0FBQyxRQUFRLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRTtZQUN6RCxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRTtnQkFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyRDtpQkFBTTtnQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDM0M7WUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxNQUFNLENBQUM7WUFFM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUNqQzthQUFNLElBQUksSUFBSSxLQUFLLGNBQWMsQ0FBQyxPQUFPLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDbEM7YUFBTSxJQUFJLElBQUksS0FBSyxjQUFjLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQy9CO2FBQU0sSUFBSSxJQUFJLEtBQUssY0FBYyxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQzFELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUNoQzthQUFNO1lBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNqRTtLQUNKOzs7O0lBRUQsWUFBWTtRQUNSLE9BQU8sZ0JBQWdCLENBQUMsVUFBVSxDQUFDO0tBQ3RDOzs7OztJQUdELFlBQVksQ0FBQyxJQUFTO1FBQ2xCLElBQUksSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLEtBQUssY0FBYyxDQUFDLEtBQUssRUFBRTtZQUNuRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1NBQy9CO1FBRUQsSUFBSSxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxjQUFjLENBQUMsSUFBSSxFQUFFO1lBQ2pELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDOUI7UUFFRCxJQUFJLElBQUksS0FBSyxVQUFVLElBQUksSUFBSSxLQUFLLGNBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDekQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1NBQzdEO0tBQ0o7Ozs7SUFHRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JDOzs7O0lBR0QsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNwQzs7OztJQUVELFVBQVU7UUFDTixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDeEM7Ozs7O0lBRUQsVUFBVSxDQUFDLEdBQVk7UUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDdEM7OzhCQS9Eb0MsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbWJvQm94Q29tcG9uZW50IH0gZnJvbSBcIi4vY29tYm8tYm94LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgVmFsdWVQYWlyIH0gZnJvbSBcIi4vdmFsdWUtcGFpclwiO1xuaW1wb3J0IHsgQXR0cmlidXRlc0VudW0gfSBmcm9tIFwiLi4vYmFzZS9hdHRyaWJ1dGVzLmVudW1cIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjbGFzcyBGYXV4Q29tYm9FbGVtZW50IHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgTE9DQUxfTkFNRTogc3RyaW5nID0gXCJsaXN0SXRlbVwiO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tYm9Cb3g6IENvbWJvQm94Q29tcG9uZW50LCBwcml2YXRlIHZhbHVlUGFpcjogVmFsdWVQYWlyKSB7XG5cbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHNldEF0dHJpYnV0ZShuYW1lOiBhbnksIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IEF0dHJpYnV0ZXNFbnVtLlNFTEVDVEVEIHx8IG5hbWUgPT09IFwic2VsZWN0ZWRcIikge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRydWUgfHwgdmFsdWUgPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJvQm94LnNldFNlbGVjdEl0ZW0odGhpcy52YWx1ZVBhaXIsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJvQm94LnNldFNlbGVjdEl0ZW0obnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudmFsdWVQYWlyLnNlbGVjdGVkID0gdmFsdWUgPT0gdHJ1ZSB8fCB2YWx1ZSA9PSBcInRydWVcIjtcblxuICAgICAgICAgICAgdGhpcy5jb21ib0JveC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gQXR0cmlidXRlc0VudW0uVklTSUJMRSB8fCBuYW1lID09PSBcInZpc2libGVcIikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZVBhaXIudmlzaWJsZSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09IEF0dHJpYnV0ZXNFbnVtLlRFWFQgfHwgbmFtZSA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVQYWlyLnRleHQgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBBdHRyaWJ1dGVzRW51bS5WQUxVRSB8fCBuYW1lID09PSBcInZhbHVlXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVQYWlyLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmF1eENvbWJvRWxlbWVudDogVW5rbm93biBhdHRyaWJ1dGU6IFwiICsgbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMb2NhbE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEZhdXhDb21ib0VsZW1lbnQuTE9DQUxfTkFNRTtcbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGdldEF0dHJpYnV0ZShuYW1lOiBhbnkpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IFwidmFsdWVcIiB8fCBuYW1lID09PSBBdHRyaWJ1dGVzRW51bS5WQUxVRSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVQYWlyLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5hbWUgPT09IFwidGV4dFwiIHx8IG5hbWUgPT09IEF0dHJpYnV0ZXNFbnVtLlRFWFQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlUGFpci50ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5hbWUgPT09IFwic2VsZWN0ZWRcIiB8fCBuYW1lID09PSBBdHRyaWJ1dGVzRW51bS5TRUxFQ1RFRCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVQYWlyLnNlbGVjdGVkID09IHRydWUgPyBcInRydWVcIiA6IFwiZmFsc2VcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpO1xuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgZ2V0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwidGV4dFwiKTtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiKTtcbiAgICB9XG5cbiAgICBzZXRDaGVja2VkKGJvbzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIGJvbyk7XG4gICAgfVxufSJdfQ==