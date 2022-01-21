/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BaseComponent } from "../base/base.component";
import { ClientEvent } from "../event-handler/client-event";
import { AppUtils } from "../base/app-utils";
import * as _ from "lodash";
import { LabelComponent } from "../label/label.component";
var HTMLElementWrapper = /** @class */ (function () {
    function HTMLElementWrapper(renderer, type, sessionService, virtual, docFragment) {
        if (virtual === void 0) { virtual = false; }
        if (docFragment === void 0) { docFragment = null; }
        var _this = this;
        this.renderer = renderer;
        this.sessionService = sessionService;
        //for none dynamic stuf
        this.childNodes = [];
        this.customAttributes = null;
        this._uniqueId = BaseComponent.generateUniqueId(type);
        this.localName = type;
        if (type === "row" && virtual !== true) {
            this.htmlElement = this.renderer.createElement("tr");
            this._dynamicComponent = true;
        }
        else if (type === "cell" && virtual !== true) {
            this.htmlElement = this.renderer.createElement("td");
            this._dynamicComponent = true;
        }
        else if (type === "label" || type === "menuItem" || virtual === true) {
            this.fauxElementAttributes = new Map();
            this.setAttribute("id", this._uniqueId);
        }
        if (this._dynamicComponent === true) {
            if (this.htmlElement instanceof HTMLTableRowElement) {
                this.htmlElement.setAttribute("data-tt-id", this._uniqueId);
            }
            this.onContextHandler = function (event) {
                /** @type {?} */
                var clientEvent = new ClientEvent(_this, event);
                if (AppUtils.customizeClientEvent != null) {
                    AppUtils.customizeClientEvent(_this, clientEvent);
                }
                if (_this.parentScreenId != null) {
                    clientEvent.setParameter("screenId", _this.parentScreenId);
                }
                _this.sessionService.getEventHandler().setClientEvent(clientEvent);
                if (typeof _this.contextMenuAction === "string") {
                    _this.invokeMcoAction(_this.contextMenuAction);
                }
                else if (typeof _this.contextMenuAction === "function") {
                    _this.contextMenuAction.apply(_this, [_this]);
                }
                _this.showPopupMenu(event);
            };
            this.htmlElement.addEventListener("mousedown", function (event) { return _this.onMouseDownHandler(event); }, true);
            this.htmlElement.addEventListener("dblclick", function (event) { return _this.onDoubleClickHandler(event); }, true);
            this.onMouseDownHandler = function (event) {
                _this.handleOnMouseDown(event);
            };
            this.onDoubleClickHandler = function (event) {
                _this.handleDoubleClick(event);
            };
        }
    }
    Object.defineProperty(HTMLElementWrapper.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this.getId();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} type
     * @return {?}
     */
    HTMLElementWrapper.createVirtualElement = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return new HTMLElementWrapper(null, type, null, true);
    };
    /**
     * @param {?=} skipDestroyChild
     * @return {?}
     */
    HTMLElementWrapper.prototype.destroy = /**
     * @param {?=} skipDestroyChild
     * @return {?}
     */
    function (skipDestroyChild) {
        if (skipDestroyChild === void 0) { skipDestroyChild = false; }
        if (this._dynamicComponent === true && this.htmlElement != null) {
            this.htmlElement.removeEventListener("contextmenu", this.onContextHandler, true);
            this.htmlElement.removeEventListener("mousedown", this.onMouseDownHandler, true);
            this.htmlElement.removeEventListener("dblclick", this.onDoubleClickHandler, true);
        }
        if (this.childNodes != null && skipDestroyChild !== true) {
            /** @type {?} */
            var stack = this.childNodes;
            while (stack.length > 0) {
                /** @type {?} */
                var node = stack.pop();
                if (node.childNodes != null) {
                    stack = stack.concat(node.childNodes);
                }
                node.destroy(true);
            }
        }
        if (this.dynamicChildNodes != null && skipDestroyChild !== true) {
            /** @type {?} */
            var stack = this.dynamicChildNodes;
            while (stack.length > 0) {
                /** @type {?} */
                var node = stack.pop();
                if (node.dynamicChildNodes != null) {
                    stack = stack.concat(node.dynamicChildNodes);
                }
                node.destroy(true);
            }
        }
        if (this.childRows != null && skipDestroyChild !== true) {
            /** @type {?} */
            var stack = this.childRows;
            while (stack.length > 0) {
                /** @type {?} */
                var node = stack.pop();
                if (node.childRows != null) {
                    stack = stack.concat(node.childRows);
                }
                node.destroy(true);
            }
        }
        if (this.component != null) {
            this.component.removeAttributeChangeListener(this);
        }
        this.htmlElement = null;
        this.parent = null;
        this._uniqueId = null;
        this.component = null;
        this.childNodes = null;
        this.attributesName = null;
        this.fauxElementAttributes = null;
        this.childRows = null;
    };
    /**
     * @param {?} text
     * @return {?}
     */
    HTMLElementWrapper.prototype.setText = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        if (this._dynamicComponent === true) {
            this.renderer.setProperty(this.htmlElement, "innerHTML", text);
        }
        else if (this.component != null) {
            this.component.setText(text);
        }
        else if (this.fauxElementAttributes != null) {
            this.fauxElementAttributes.set("text", text);
        }
    };
    /**
     * @param {?} size
     * @return {?}
     */
    HTMLElementWrapper.prototype.setFontSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        if (this._dynamicComponent === true) {
            this.renderer.setStyle(this.htmlElement, "font-size", size + "px");
        }
        else if (this.component != null) {
            this.component.setFontSize(size);
        }
        else if (this.fauxElementAttributes != null) {
            this.fauxElementAttributes.set("fontSize", size);
        }
    };
    /**
     * @param {?} bold
     * @return {?}
     */
    HTMLElementWrapper.prototype.setFontBold = /**
     * @param {?} bold
     * @return {?}
     */
    function (bold) {
        if (this._dynamicComponent === true) {
            if (bold === "true" || bold === true) {
                this.renderer.setStyle(this.htmlElement, "font-weight", "bold");
            }
            else {
                this.renderer.setStyle(this.htmlElement, "font-weight", "normal");
            }
        }
        else if (this.component != null) {
            this.component.setFontBold(bold);
        }
        else if (this.fauxElementAttributes != null) {
            this.fauxElementAttributes.set("fontBold", bold);
        }
    };
    /**
     * @param {?} css
     * @return {?}
     */
    HTMLElementWrapper.prototype.setClass = /**
     * @param {?} css
     * @return {?}
     */
    function (css) {
        if (css != null && css.indexOf(".") >= 0) {
            /** @type {?} */
            var temp = css.split("\.");
            /** @type {?} */
            var cssClass = temp.join("-");
            if (temp[0] === "") {
                css = cssClass.substring(1);
            }
        }
        if (this.htmlElement != null) {
            this.renderer.setAttribute(this.htmlElement, "class", css);
        }
        else if (this.component != null) {
            this.component.addCssClass(css);
        }
        else if (this.fauxElementAttributes != null) {
            this.setAttribute("class", css);
        }
    };
    /**
     * Insert a child row at specific location
     * @param idx
     * @param child
     */
    /**
     * Insert a child row at specific location
     * @param {?} idx
     * @param {?} child
     * @return {?}
     */
    HTMLElementWrapper.prototype.insertChildRowAt = /**
     * Insert a child row at specific location
     * @param {?} idx
     * @param {?} child
     * @return {?}
     */
    function (idx, child) {
        if (child.htmlElement instanceof HTMLTableRowElement !== true && this._dynamicComponent === true) {
            throw new Error("Invalid insertion, only HTMLTableRowElement is allowed");
        }
        if (idx > 0 && (this.childRows == null || this.childRows.length <= idx)) {
            throw new Error("Unable to insert child row at this specific location (index overflow)");
        }
        else if (idx >= 0 && (this.childRows != null && this.childRows.length > idx)) {
            //track child rows so we can used insertChildRowAt
            if (this.childRows == null) {
                this.childRows = [];
            }
            if (this.parentTable.useDocFragment === true) {
                (/** @type {?} */ (this.parentTable._bodyFragment)).insertBefore(child.htmlElement, this.childRows[idx].htmlElement);
            }
            else {
                this.renderer.insertBefore(this.parentTable.tableBody.nativeElement, child.htmlElement, this.childRows[idx].htmlElement);
            }
            this.childRows.splice(idx, 0, child);
        }
        this.renderer.setAttribute(child.htmlElement, "data-tt-parent-id", this._uniqueId);
        child.parent = this;
    };
    /**
     * Append a child to this element. If this is a row and we append a row, set {@ appendToTable} to true
     * will also append the actual table row (tr) to the table.
     *
     * @param child child to be appended
     * @param appendToTable
     */
    /**
     * Append a child to this element. If this is a row and we append a row, set {\@ appendToTable} to true
     * will also append the actual table row (tr) to the table.
     *
     * @param {?} child child to be appended
     * @param {?=} appendToTableIfRow
     * @return {?}
     */
    HTMLElementWrapper.prototype.appendChild = /**
     * Append a child to this element. If this is a row and we append a row, set {\@ appendToTable} to true
     * will also append the actual table row (tr) to the table.
     *
     * @param {?} child child to be appended
     * @param {?=} appendToTableIfRow
     * @return {?}
     */
    function (child, appendToTableIfRow) {
        if (appendToTableIfRow === void 0) { appendToTableIfRow = false; }
        if (this._dynamicComponent === true) {
            if (child.htmlElement instanceof HTMLTableRowElement) {
                this.renderer.setAttribute(child.htmlElement, "data-tt-parent-id", this._uniqueId);
                if (appendToTableIfRow === true) {
                    if (this.parentTable.useDocFragment === true) {
                        (/** @type {?} */ (this.parentTable._bodyFragment)).appendChild(child.htmlElement);
                    }
                    else {
                        this.renderer.appendChild(this.parentTable.tableBody.nativeElement, child.htmlElement);
                    }
                }
                //track child rows so we can used insertChildRowAt
                if (this.childRows == null) {
                    this.childRows = [];
                }
                this.childRows.push(child);
            }
            else if (child.htmlElement instanceof HTMLTableCellElement) {
                this.renderer.appendChild(this.htmlElement, child.htmlElement);
                if (this.dynamicChildNodes == null) {
                    this.dynamicChildNodes = [];
                }
                this.dynamicChildNodes.push(child);
            }
        }
        else {
            this.childNodes.push(child);
        }
        child.parent = this;
    };
    /**
     * @param {?} cust
     * @return {?}
     */
    HTMLElementWrapper.prototype.appendCustomAttributes = /**
     * @param {?} cust
     * @return {?}
     */
    function (cust) {
        var e_1, _a;
        if (cust != null) {
            /** @type {?} */
            var keys = _.keys(cust);
            try {
                for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    this.setAttribute(key, cust[key]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    //NSD will override this, added to fix error
    // setCustomAttribute(name: string, value: string) {
    //   this.setAttribute(name, value);
    // }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    HTMLElementWrapper.prototype.setAttribute = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        if (name === 'selected' && this.localName == 'row') {
            if (this.parentTable != null) {
                if (value == 'true')
                    this.parentTable.selectRow(this, true);
                else
                    this.parentTable.selectRow(this, false);
                this.parentTable.markForCheck();
            }
        }
        if (name === "expanded") {
            this.expandNode(value);
        }
        else if (this.component != null) {
            this.component.setAttribute(name, value);
            this.trackAttributeName(name);
        }
        else if (this.htmlElement != null) {
            if (name === "isLockedColumn") {
                if (this.fauxElementAttributes == null) {
                    this.fauxElementAttributes = new Map();
                }
                this.fauxElementAttributes.set(name, value);
            }
            else {
                this.renderer.setAttribute(this.htmlElement, name, value);
            }
            this.trackAttributeName(name);
        }
        else if (this.fauxElementAttributes != null) {
            this.fauxElementAttributes.set(name, value);
            this.trackAttributeName(name);
        }
    };
    /**
     * @param {?} name
     * @param {?=} skipQueryDOMIfNotExists
     * @return {?}
     */
    HTMLElementWrapper.prototype.getAttribute = /**
     * @param {?} name
     * @param {?=} skipQueryDOMIfNotExists
     * @return {?}
     */
    function (name, skipQueryDOMIfNotExists) {
        if (skipQueryDOMIfNotExists === void 0) { skipQueryDOMIfNotExists = false; }
        if (name === "expanded") {
            return this.expanded === "true" ? "true" : "false";
        }
        if (this.component != null) {
            return this.component.getAttribute(name, skipQueryDOMIfNotExists);
        }
        else if (this.htmlElement != null && skipQueryDOMIfNotExists !== true) {
            if (name === "text") {
                /** @type {?} */
                var text = this.htmlElement.getAttribute(name);
                if (text == null) {
                    text = this.htmlElement.innerText;
                }
                if (text == null || text === "") {
                    text = (/** @type {?} */ (this.htmlElement)).textContent;
                }
                if (typeof text === "string") {
                    text = text.trim();
                }
                return text;
            }
            else if (name === "isLockedColumn" && this.fauxElementAttributes != null) {
                return this.fauxElementAttributes.get(name);
            }
            else if (name === "isLockedColumn") {
                return "false";
            }
            return this.htmlElement.getAttribute(name);
        }
        else if (this.fauxElementAttributes != null) {
            return this.fauxElementAttributes.get(name);
        }
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getText = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("text");
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getId = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("id");
    };
    /**
     * @param {?} draggable
     * @return {?}
     */
    HTMLElementWrapper.prototype.setDraggable = /**
     * @param {?} draggable
     * @return {?}
     */
    function (draggable) {
        this.setAttribute("draggable", draggable);
        if (draggable == "true") {
            this.applyDraggable();
        }
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getExpanded = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("expanded");
    };
    /**
     * @param {?} str
     * @return {?}
     */
    HTMLElementWrapper.prototype.setExpanded = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        this.setAttribute("expanded", str);
    };
    /**
     * @param {?} action
     * @return {?}
     */
    HTMLElementWrapper.prototype.setOnContextMenu = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        var _this = this;
        if (this.htmlElement != null) {
            this.contextMenuAction = action;
            this.htmlElement.addEventListener("contextmenu", function (event) { return _this.onContextHandler(event); }, true);
        }
    };
    /**
     * @param {?} action
     * @return {?}
     */
    HTMLElementWrapper.prototype.setOnMouseDown = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.mouseDownAction = action;
    };
    /**
     * @param {?} action
     * @return {?}
     */
    HTMLElementWrapper.prototype.setOnDoubleClick = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.doubleClickAction = action;
    };
    /**
     * @param {?} popupName
     * @return {?}
     */
    HTMLElementWrapper.prototype.setPopup = /**
     * @param {?} popupName
     * @return {?}
     */
    function (popupName) {
        this.popupName = popupName.replace("#", "");
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getParent = /**
     * @return {?}
     */
    function () {
        return this.parent;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getLocalName = /**
     * @return {?}
     */
    function () {
        return this.localName;
    };
    /**
     * @param {?} localName
     * @return {?}
     */
    HTMLElementWrapper.prototype.setLocaleName = /**
     * @param {?} localName
     * @return {?}
     */
    function (localName) {
        this.localName = localName;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getChildren = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var children = this.childNodes;
        if ((children == null || children.length === 0) && (this.dynamicChildNodes != null)) {
            children = this.dynamicChildNodes;
        }
        if (this.getLocalName() === "row" &&
            children != null &&
            this.parentTable != null &&
            this.parentTable.getLocalName() === "table" &&
            this.parentTable.columnsHasBeenSwapped === true) {
            children = /** @type {?} */ (_.orderBy(children, function (child) {
                return child["originalColumnIndex"];
            }));
        }
        return children;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getChildCount = /**
     * @return {?}
     */
    function () {
        return this.childNodes != null ? this.childNodes.length : 0;
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    HTMLElementWrapper.prototype.getChildAt = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        return this.getChildCount() > idx ? this.childNodes[idx] : null;
    };
    /**
     * @param {?} component
     * @param {?=} fromVirtualTable
     * @return {?}
     */
    HTMLElementWrapper.prototype.setComponent = /**
     * @param {?} component
     * @param {?=} fromVirtualTable
     * @return {?}
     */
    function (component, fromVirtualTable) {
        if (fromVirtualTable === void 0) { fromVirtualTable = false; }
        this.component = component;
        this.component.parentTableRow = this.parent;
        if (component != null && fromVirtualTable === true) {
            component.addAttributeChangeListener(this);
        }
    };
    /**
     * @param {?} action
     * @return {?}
     */
    HTMLElementWrapper.prototype.invokeMcoAction = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        if (typeof action === "function") {
            action();
        }
        else if (action.indexOf("mco://") === 0) {
            /** @type {?} */
            var mcoName = action.substring(6, action.indexOf("."));
            /** @type {?} */
            var methodName = action.substring(action.indexOf(".") + 1, action.indexOf("("));
            /** @type {?} */
            var arg = action.substring(action.indexOf("(") + 1, action.indexOf(")"));
            if (arg != null && arg.length > 0) {
                /** @type {?} */
                var mco = this.sessionService.getMcoContainer().getMco(mcoName);
                if (mco != null) {
                    if (arg === "this") {
                        mco[methodName].apply(mco, [this]);
                    }
                    else {
                        mco[methodName].apply(mco, [arg]);
                    }
                }
                else {
                    console.error("Unable to execute MCO action, mco not found: " + mcoName);
                }
            }
            else {
                /** @type {?} */
                var mco = this.sessionService.getMcoContainer().getMco(mcoName);
                if (mco != null) {
                    mco[methodName].apply(mco);
                }
                else {
                    console.error("Unable to execute MCO action, mco not found: " + mcoName);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.getComponent = /**
     * @return {?}
     */
    function () {
        return this.component;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HTMLElementWrapper.prototype.showPopupMenu = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.sessionService.setMousePosition(event);
        if (this.popupName != null) {
            /** @type {?} */
            var contextMenu = this.sessionService.showContextMenu(this.popupName);
            if (contextMenu === true) {
                event.preventDefault();
                event.stopPropagation();
                // contextMenu.show(this.htmlElement);
            }
        }
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        clientEvent.setParameter("screenId", this.parentScreenId);
        this.sessionService.getEventHandler().setClientEvent(clientEvent);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HTMLElementWrapper.prototype.handleOnMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.parentTable != null) {
            /** @type {?} */
            var table = this.parentTable.elementRef.nativeElement;
            /** @type {?} */
            var tds = table.querySelectorAll('td');
            for (var i = 0; i < tds.length; i++) {
                (/** @type {?} */ (tds[i])).style.color = '';
            }
            tds = this.htmlElement.querySelectorAll('td');
            for (var i = 0; i < tds.length; i++) {
                (/** @type {?} */ (tds[i])).style.color = 'blue';
            }
        }
        if (this.mouseDownAction != null) {
            /** @type {?} */
            var clientEvent = new ClientEvent(this, event);
            if (AppUtils.customizeClientEvent != null) {
                AppUtils.customizeClientEvent(this, clientEvent);
            }
            if (this.parentScreenId != null) {
                clientEvent.setParameter("screenId", this.parentScreenId);
            }
            this.sessionService.getEventHandler().setClientEvent(clientEvent);
            this.invokeMcoAction(this.mouseDownAction);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HTMLElementWrapper.prototype.handleDoubleClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        if (this.parentScreenId != null) {
            clientEvent.setParameter("screenId", this.parentScreenId);
        }
        this.sessionService.getEventHandler().setClientEvent(clientEvent);
        if (this.doubleClickAction != null) {
            this.invokeMcoAction(this.doubleClickAction);
        }
    };
    /**
     * @param {?} isExpanded
     * @param {?=} justUpdateAttribute
     * @return {?}
     */
    HTMLElementWrapper.prototype.expandNode = /**
     * @param {?} isExpanded
     * @param {?=} justUpdateAttribute
     * @return {?}
     */
    function (isExpanded, justUpdateAttribute) {
        if (justUpdateAttribute === void 0) { justUpdateAttribute = false; }
        this.expanded = typeof isExpanded === "string" ? isExpanded : isExpanded + '';
        if (justUpdateAttribute !== true && this.parentTableId != null && this.parentTableId !== "") {
            /** @type {?} */
            var jq = jQuery("#" + this.parentTableId + " .jq-tree-table");
            if (jq != null) {
                /** @type {?} */
                var nodeId = this.getAttribute("data-tt-id");
                if (nodeId != null) {
                    try {
                        if (isExpanded === "true" || isExpanded === true) {
                            jq.treetable("expandNode", nodeId);
                        }
                        else {
                            jq.treetable("collapseNode", nodeId);
                        }
                    }
                    catch (e) {
                        console.error("Unable to expand node due to error");
                    }
                }
            }
            else {
                console.error("Unable to expand node, tree table is null");
            }
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    HTMLElementWrapper.prototype.trackAttributeName = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (this.attributesName == null) {
            this.attributesName = [];
        }
        this.attributesName.push(name);
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.toJson = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var retVal = {};
        if (this.component != null) {
            retVal = this.component.toJson();
            if (this.component instanceof LabelComponent) {
                retVal["nxTagName"] = this.getLocalName();
                retVal["tagName"] = this.getLocalName();
            }
        }
        else {
            retVal["nxTagName"] = this.getLocalName();
            retVal["tagName"] = this.getLocalName();
        }
        if (this.component == null) {
            retVal["id"] = this.getId() || this._uniqueId;
            retVal["text"] = this.getText();
        }
        if (this.attributesName != null) {
            this.attributesName.forEach(function (name) {
                retVal[name] = _this.getAttribute(name);
            });
        }
        /** @type {?} */
        var children;
        if (this.childNodes != null && this.childNodes.length > 0) {
            children = this.childNodes;
        }
        else if (this.dynamicChildNodes != null && this.dynamicChildNodes.length > 0) {
            children = this.dynamicChildNodes;
        }
        if (children != null) {
            if (this.getLocalName() === "row" &&
                this.parentTable != null &&
                this.parentTable.getLocalName() === "table" &&
                this.parentTable.columnsHasBeenSwapped === true) {
                children = /** @type {?} */ (_.orderBy(children, function (child) {
                    return child["originalColumnIndex"];
                }));
            }
            retVal["children"] = children.map(function (child) { return child.toJson(); });
        }
        if (this.customAttributes)
            retVal['customAttributes'] = this.customAttributes;
        return retVal;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.isView = /**
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.isDialog = /**
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.isDynamicView = /**
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.isFauxElement = /**
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * @param {?} chk
     * @return {?}
     */
    HTMLElementWrapper.prototype.setChecked = /**
     * @param {?} chk
     * @return {?}
     */
    function (chk) {
        if (typeof chk === "boolean") {
            chk = chk + "";
        }
        this.setAttribute("checked", chk);
    };
    /**
     * Search for child using the provided function
     *
     * @param fn function to execute while iterating child lookup
     */
    /**
     * Search for child using the provided function
     *
     * @param {?} fn function to execute while iterating child lookup
     * @return {?}
     */
    HTMLElementWrapper.prototype.findChildByFn = /**
     * Search for child using the provided function
     *
     * @param {?} fn function to execute while iterating child lookup
     * @return {?}
     */
    function (fn) {
        /** @type {?} */
        var retVal;
        /** @type {?} */
        var children = this.concatNode(/** @type {?} */ ([]), this);
        while (children.length > 0) {
            /** @type {?} */
            var child = children.pop();
            if (child != null) {
                if (fn(child) === true) {
                    retVal = child;
                    break;
                }
                else {
                    children = this.concatNode(children, child);
                }
            }
        }
        return retVal;
    };
    /**
     * Concate {fromNode} to {toNode}
     *
     * @param {?} toNode array of nodes to be concated to
     * @param {?} fromNode node to be concated from
     * @return {?} the concated node
     */
    HTMLElementWrapper.prototype.concatNode = /**
     * Concate {fromNode} to {toNode}
     *
     * @param {?} toNode array of nodes to be concated to
     * @param {?} fromNode node to be concated from
     * @return {?} the concated node
     */
    function (toNode, fromNode) {
        /** @type {?} */
        var retVal = toNode;
        if (fromNode != null) {
            if (fromNode.childNodes != null) {
                retVal = retVal.concat(fromNode.childNodes);
            }
            if (fromNode.childRows != null) {
                retVal = retVal.concat(fromNode.childRows);
            }
            if (fromNode.dynamicChildNodes != null) {
                retVal = retVal.concat(fromNode.dynamicChildNodes);
            }
        }
        return retVal;
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    HTMLElementWrapper.prototype.beforeAttributeRemoved = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    HTMLElementWrapper.prototype.beforeAttributeSet = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    HTMLElementWrapper.prototype.onAttributeRemoved = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    HTMLElementWrapper.prototype.onAttributeSet = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        if (evt.getName() === "sortValue" && this.htmlElement != null) {
            this.updateSortValue(evt.getNewValue());
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    HTMLElementWrapper.prototype.updateSortValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.renderer != null) {
            this.renderer.setAttribute(this.htmlElement, "data-text", value);
            if (this.component != null && this.component.getParent() != null && typeof (/** @type {?} */ (this.component.getParent())).refreshTableSorterCache === "function") {
                (/** @type {?} */ (this.component.getParent())).refreshTableSorterCache();
            }
        }
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.isDraggable = /**
     * @return {?}
     */
    function () {
        return this.getAttribute("draggable") === "true";
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.applyDraggable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isDraggable() && this.draggableApplied !== true && this.htmlElement != null) {
            jQuery(this.htmlElement).draggable({
                appendTo: "body",
                addClasses: false,
                helper: function () {
                    /** @type {?} */
                    var helper = document.createElement("div");
                    helper.classList.add("draggable-row-helper");
                    helper.id = "draggableRowHelperInternal";
                    // if (this.parentTable != null && this.parentTable.selectedRows != null && this.parentTable.selectedRows.length > 1) {
                    //   helper.classList.add("drag-row-helper-container");
                    //   const c = this.parentTable.selectedRows.length;
                    //   const frag = document.createDocumentFragment();
                    //   for (let i = 0; i < c; i++) {
                    //     const row = document.createElement("div");
                    //     row.classList.add("drag-row-helper-row");
                    //     frag.appendChild(row);
                    //   }
                    //   helper.appendChild(frag);
                    // }
                    return helper;
                },
                start: function () {
                    /** @type {?} */
                    var clientEvent = new ClientEvent(_this, event);
                    clientEvent.setParameter("dragId", _this.parentTableId);
                    if (AppUtils.customizeClientEvent != null) {
                        AppUtils.customizeClientEvent(_this, clientEvent);
                    }
                    if (_this.parentScreenId != null) {
                        clientEvent.setParameter("screenId", _this.parentScreenId);
                    }
                    _this.sessionService.getEventHandler().setClientEvent(clientEvent);
                }
            });
        }
        this.draggableApplied = true;
    };
    /**
     * @return {?}
     */
    HTMLElementWrapper.prototype.isDraggableApplied = /**
     * @return {?}
     */
    function () {
        return this.draggableApplied;
    };
    /**
     * rowなどBaseComponentとして存在しないwrapperにcustomAttributesを設定します。
     * @param name
     * @param value
     */
    /**
     * rowなどBaseComponentとして存在しないwrapperにcustomAttributesを設定します。
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    HTMLElementWrapper.prototype.setCustomAttribute = /**
     * rowなどBaseComponentとして存在しないwrapperにcustomAttributesを設定します。
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        if (!this.customAttributes)
            this.customAttributes = {};
        this.customAttributes[name] = value;
    };
    return HTMLElementWrapper;
}());
export { HTMLElementWrapper };
if (false) {
    /** @type {?} */
    HTMLElementWrapper.prototype.parent;
    /** @type {?} */
    HTMLElementWrapper.prototype.localName;
    /** @type {?} */
    HTMLElementWrapper.prototype.parentTableId;
    /** @type {?} */
    HTMLElementWrapper.prototype.parentScreenId;
    /** @type {?} */
    HTMLElementWrapper.prototype.parentTable;
    /** @type {?} */
    HTMLElementWrapper.prototype._uniqueId;
    /** @type {?} */
    HTMLElementWrapper.prototype.htmlElement;
    /** @type {?} */
    HTMLElementWrapper.prototype.component;
    /** @type {?} */
    HTMLElementWrapper.prototype.childNodes;
    /** @type {?} */
    HTMLElementWrapper.prototype.dynamicChildNodes;
    /** @type {?} */
    HTMLElementWrapper.prototype.onContextHandler;
    /** @type {?} */
    HTMLElementWrapper.prototype.onMouseDownHandler;
    /** @type {?} */
    HTMLElementWrapper.prototype.onDoubleClickHandler;
    /** @type {?} */
    HTMLElementWrapper.prototype._dynamicComponent;
    /** @type {?} */
    HTMLElementWrapper.prototype.popupName;
    /** @type {?} */
    HTMLElementWrapper.prototype.contextMenuAction;
    /** @type {?} */
    HTMLElementWrapper.prototype.mouseDownAction;
    /** @type {?} */
    HTMLElementWrapper.prototype.doubleClickAction;
    /** @type {?} */
    HTMLElementWrapper.prototype.rowNumber;
    /** @type {?} */
    HTMLElementWrapper.prototype.expanded;
    /** @type {?} */
    HTMLElementWrapper.prototype.childRows;
    /** @type {?} */
    HTMLElementWrapper.prototype.customAttributes;
    /** @type {?} */
    HTMLElementWrapper.prototype.attributesName;
    /** @type {?} */
    HTMLElementWrapper.prototype.fauxElementAttributes;
    /** @type {?} */
    HTMLElementWrapper.prototype.draggableApplied;
    /** @type {?} */
    HTMLElementWrapper.prototype.customData;
    /** @type {?} */
    HTMLElementWrapper.prototype._internalId;
    /** @type {?} */
    HTMLElementWrapper.prototype.renderer;
    /** @type {?} */
    HTMLElementWrapper.prototype.sessionService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC1lbGVtZW50LXdyYXBwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3RyZWUtdGFibGUvaHRtbC1lbGVtZW50LXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFLMUQsSUFBQTtJQTBERSw0QkFBb0IsUUFBbUIsRUFBRSxJQUFZLEVBQVUsY0FBOEIsRUFBRSxPQUF3QixFQUFFLFdBQW9DO1FBQTlELHdCQUFBLEVBQUEsZUFBd0I7UUFBRSw0QkFBQSxFQUFBLGtCQUFvQztRQUE3SixpQkFzREM7UUF0RG1CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBd0IsbUJBQWMsR0FBZCxjQUFjLENBQWdCOzswQkFyQ3JELEVBQUU7Z0NBd0JRLElBQUk7UUFjcEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFdEIsSUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1NBQy9CO2FBQU0sSUFBSSxJQUFJLEtBQUssTUFBTSxJQUFJLE9B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QUFJLENBQUM7S0FDOUI7Ozs7SUFFRCwrQ0FBa0I7OztJQUFsQjtRQUNFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQzlCO0lBQ0Q7Ozs7T0FJRzs7Ozs7OztJQUNILCtDQUFrQjs7Ozs7O0lBQWxCLFVBQW1CLElBQVksRUFBRSxLQUFVO1FBQ3pDLElBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUNyQzs2QkE5MUJIO0lBKzFCQyxDQUFBO0FBcDFCRCw4QkFvMUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gXCIuLi9iYXNlL2Jhc2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBSZW5kZXJlcjIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU2Vzc2lvblNlcnZpY2UgfSBmcm9tIFwiLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IENsaWVudEV2ZW50IH0gZnJvbSBcIi4uL2V2ZW50LWhhbmRsZXIvY2xpZW50LWV2ZW50XCI7XG5pbXBvcnQgeyBBcHBVdGlscyB9IGZyb20gXCIuLi9iYXNlL2FwcC11dGlsc1wiO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBMYWJlbENvbXBvbmVudCB9IGZyb20gXCIuLi9sYWJlbC9sYWJlbC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVyIH0gZnJvbSBcIi4uL2Jhc2UvYXR0cmlidXRlLWNoYW5nZS1saXN0ZW5lclwiO1xuaW1wb3J0IHsgQXR0cmlidXRlQ2hhbmdlRXZlbnQgfSBmcm9tIFwiLi4vYmFzZS9hdHRyaWJ1dGUtY2hhbmdlLWV2ZW50XCI7XG5kZWNsYXJlIHZhciBqUXVlcnk6IGFueTtcblxuZXhwb3J0IGNsYXNzIEhUTUxFbGVtZW50V3JhcHBlciBpbXBsZW1lbnRzIEF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVyIHtcbiAgLy8gYXR0cmlidXRlczogTWFwPHN0cmluZywgc3RyaW5nPjtcbiAgLy8gdGV4dDogYW55O1xuICAvLyBkcmFnZ2FibGU6IHN0cmluZztcbiAgLy8gY3NzQ2xhc3M6IHN0cmluZztcbiAgLy8gb25Eb3VibGVDbGljazogc3RyaW5nO1xuICAvLyBvbkNvbnRleHRNZW51OiBzdHJpbmc7XG4gIC8vIG9uTW91c2VEb3duOiBzdHJpbmc7XG4gIC8vIHBvcHVwTmFtZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgcGFyZW50OiBIVE1MRWxlbWVudFdyYXBwZXI7XG4gIHByaXZhdGUgbG9jYWxOYW1lOiBzdHJpbmc7XG4gIHBhcmVudFRhYmxlSWQ6IHN0cmluZztcbiAgcGFyZW50U2NyZWVuSWQ6IHN0cmluZztcbiAgcGFyZW50VGFibGU6IGFueTtcblxuICBfdW5pcXVlSWQ6IHN0cmluZztcbiAgaHRtbEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBjb21wb25lbnQ6IEJhc2VDb21wb25lbnQ7XG5cbiAgLy9mb3Igbm9uZSBkeW5hbWljIHN0dWZcbiAgY2hpbGROb2RlczogQXJyYXk8SFRNTEVsZW1lbnRXcmFwcGVyPiA9IFtdO1xuXG4gIC8vZm9yIHRyZWUgdGFibGVcbiAgZHluYW1pY0NoaWxkTm9kZXM6IEFycmF5PEhUTUxFbGVtZW50V3JhcHBlcj47XG5cbiAgb25Db250ZXh0SGFuZGxlcjogKGV2ZW50KSA9PiBhbnk7XG4gIG9uTW91c2VEb3duSGFuZGxlcjogKGV2ZW50KSA9PiBhbnk7XG4gIG9uRG91YmxlQ2xpY2tIYW5kbGVyOiAoZXZlbnQpID0+IGFueTtcblxuICAvL2luZGljYXRlIHRoYXQgY29tcG9uZW50IGNyZWF0ZSBkeW5hbWljYWxseSAodmlhIGNyZWF0ZUVsZW1lbnQpXG4gIHByaXZhdGUgX2R5bmFtaWNDb21wb25lbnQ6IGJvb2xlYW47XG5cbiAgcG9wdXBOYW1lOiBzdHJpbmc7XG4gIGNvbnRleHRNZW51QWN0aW9uOiBzdHJpbmcgfCAoKGFueSkgPT4gYW55KTtcbiAgbW91c2VEb3duQWN0aW9uOiBzdHJpbmcgfCAoKCkgPT4gYW55KTtcbiAgZG91YmxlQ2xpY2tBY3Rpb246IHN0cmluZyB8ICgoKSA9PiBhbnkpO1xuICByb3dOdW1iZXI6IG51bWJlcjtcbiAgZXhwYW5kZWQ6IHN0cmluZztcblxuICBwcml2YXRlIGNoaWxkUm93czogQXJyYXk8SFRNTEVsZW1lbnRXcmFwcGVyPjtcblxuICBnZXQgaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SWQoKTtcbiAgfVxuICBwcml2YXRlIGN1c3RvbUF0dHJpYnV0ZXM6IHtbbmFtZTogc3RyaW5nXTogYW55fSA9IG51bGw7XG4gIHByaXZhdGUgYXR0cmlidXRlc05hbWU6IEFycmF5PHN0cmluZz47XG5cbiAgcHJpdmF0ZSBmYXV4RWxlbWVudEF0dHJpYnV0ZXM6IE1hcDxzdHJpbmcsIHN0cmluZz47XG5cbiAgcHJpdmF0ZSBkcmFnZ2FibGVBcHBsaWVkOiBib29sZWFuO1xuXG4gIGN1c3RvbURhdGE6IGFueTtcblxuICBzdGF0aWMgY3JlYXRlVmlydHVhbEVsZW1lbnQodHlwZTogc3RyaW5nKTogSFRNTEVsZW1lbnRXcmFwcGVyIHtcbiAgICByZXR1cm4gbmV3IEhUTUxFbGVtZW50V3JhcHBlcihudWxsLCB0eXBlLCBudWxsLCB0cnVlKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgdHlwZTogc3RyaW5nLCBwcml2YXRlIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSwgdmlydHVhbDogYm9vbGVhbiA9IGZhbHNlLCBkb2NGcmFnbWVudDogRG9jdW1lbnRGcmFnbWVudCA9IG51bGwpIHtcbiAgICB0aGlzLl91bmlxdWVJZCA9IEJhc2VDb21wb25lbnQuZ2VuZXJhdGVVbmlxdWVJZCh0eXBlKTtcblxuICAgIHRoaXMubG9jYWxOYW1lID0gdHlwZTtcblxuICAgIGlmICh0eXBlID09PSBcInJvd1wiICYmIHZpcnR1YWwgIT09IHRydWUpIHtcbiAgICAgIHRoaXMuaHRtbEVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICAgIHRoaXMuX2R5bmFtaWNDb21wb25lbnQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJjZWxsXCIgJiYgdmlydHVhbCAhPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5odG1sRWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgICAgdGhpcy5fZHluYW1pY0NvbXBvbmVudCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcImxhYmVsXCIgfHwgdHlwZSA9PT0gXCJtZW51SXRlbVwiIHx8IHZpcnR1YWwgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiaWRcIiwgdGhpcy5fdW5pcXVlSWQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9keW5hbWljQ29tcG9uZW50ID09PSB0cnVlKSB7XG4gICAgICBpZiAodGhpcy5odG1sRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxUYWJsZVJvd0VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5odG1sRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXR0LWlkXCIsIHRoaXMuX3VuaXF1ZUlkKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vbkNvbnRleHRIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGNsaWVudEV2ZW50ID0gbmV3IENsaWVudEV2ZW50KHRoaXMsIGV2ZW50KTtcblxuICAgICAgICBpZiAoQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQgIT0gbnVsbCkge1xuICAgICAgICAgIEFwcFV0aWxzLmN1c3RvbWl6ZUNsaWVudEV2ZW50KHRoaXMsIGNsaWVudEV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBhcmVudFNjcmVlbklkICE9IG51bGwpIHtcbiAgICAgICAgICBjbGllbnRFdmVudC5zZXRQYXJhbWV0ZXIoXCJzY3JlZW5JZFwiLCB0aGlzLnBhcmVudFNjcmVlbklkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Vzc2lvblNlcnZpY2UuZ2V0RXZlbnRIYW5kbGVyKCkuc2V0Q2xpZW50RXZlbnQoY2xpZW50RXZlbnQpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb250ZXh0TWVudUFjdGlvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHRoaXMuaW52b2tlTWNvQWN0aW9uKHRoaXMuY29udGV4dE1lbnVBY3Rpb24pO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmNvbnRleHRNZW51QWN0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aGlzLmNvbnRleHRNZW51QWN0aW9uLmFwcGx5KHRoaXMsIFt0aGlzXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNob3dQb3B1cE1lbnUoZXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5odG1sRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldmVudCkgPT4gdGhpcy5vbk1vdXNlRG93bkhhbmRsZXIoZXZlbnQpLCB0cnVlKTtcbiAgICAgIHRoaXMuaHRtbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsIChldmVudCkgPT4gdGhpcy5vbkRvdWJsZUNsaWNrSGFuZGxlcihldmVudCksIHRydWUpO1xuXG4gICAgICB0aGlzLm9uTW91c2VEb3duSGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZU9uTW91c2VEb3duKGV2ZW50KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMub25Eb3VibGVDbGlja0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVEb3VibGVDbGljayhldmVudCk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koc2tpcERlc3Ryb3lDaGlsZDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuX2R5bmFtaWNDb21wb25lbnQgPT09IHRydWUgJiYgdGhpcy5odG1sRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmh0bWxFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCB0aGlzLm9uQ29udGV4dEhhbmRsZXIsIHRydWUpO1xuICAgICAgdGhpcy5odG1sRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMub25Nb3VzZURvd25IYW5kbGVyLCB0cnVlKTtcbiAgICAgIHRoaXMuaHRtbEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsIHRoaXMub25Eb3VibGVDbGlja0hhbmRsZXIsIHRydWUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNoaWxkTm9kZXMgIT0gbnVsbCAmJiBza2lwRGVzdHJveUNoaWxkICE9PSB0cnVlKSB7XG4gICAgICBsZXQgc3RhY2sgPSB0aGlzLmNoaWxkTm9kZXM7XG5cbiAgICAgIHdoaWxlIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFjay5wb3AoKTtcblxuICAgICAgICBpZiAobm9kZS5jaGlsZE5vZGVzICE9IG51bGwpIHtcbiAgICAgICAgICBzdGFjayA9IHN0YWNrLmNvbmNhdChub2RlLmNoaWxkTm9kZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5kZXN0cm95KHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmR5bmFtaWNDaGlsZE5vZGVzICE9IG51bGwgJiYgc2tpcERlc3Ryb3lDaGlsZCAhPT0gdHJ1ZSkge1xuICAgICAgbGV0IHN0YWNrID0gdGhpcy5keW5hbWljQ2hpbGROb2RlcztcblxuICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YWNrLnBvcCgpO1xuXG4gICAgICAgIGlmIChub2RlLmR5bmFtaWNDaGlsZE5vZGVzICE9IG51bGwpIHtcbiAgICAgICAgICBzdGFjayA9IHN0YWNrLmNvbmNhdChub2RlLmR5bmFtaWNDaGlsZE5vZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUuZGVzdHJveSh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGlsZFJvd3MgIT0gbnVsbCAmJiBza2lwRGVzdHJveUNoaWxkICE9PSB0cnVlKSB7XG4gICAgICBsZXQgc3RhY2sgPSB0aGlzLmNoaWxkUm93cztcblxuICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YWNrLnBvcCgpO1xuXG4gICAgICAgIGlmIChub2RlLmNoaWxkUm93cyAhPSBudWxsKSB7XG4gICAgICAgICAgc3RhY2sgPSBzdGFjay5jb25jYXQobm9kZS5jaGlsZFJvd3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5kZXN0cm95KHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbXBvbmVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudC5yZW1vdmVBdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcih0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLmh0bWxFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5fdW5pcXVlSWQgPSBudWxsO1xuICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcbiAgICB0aGlzLmNoaWxkTm9kZXMgPSBudWxsO1xuICAgIHRoaXMuYXR0cmlidXRlc05hbWUgPSBudWxsO1xuICAgIHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzID0gbnVsbDtcbiAgICB0aGlzLmNoaWxkUm93cyA9IG51bGw7XG4gIH1cblxuICBzZXRUZXh0KHRleHQ6IGFueSkge1xuICAgIGlmICh0aGlzLl9keW5hbWljQ29tcG9uZW50ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuaHRtbEVsZW1lbnQsIFwiaW5uZXJIVE1MXCIsIHRleHQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb21wb25lbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jb21wb25lbnQuc2V0VGV4dCh0ZXh0KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzLnNldChcInRleHRcIiwgdGV4dCk7XG4gICAgfVxuICB9XG5cbiAgc2V0Rm9udFNpemUoc2l6ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuX2R5bmFtaWNDb21wb25lbnQgPT09IHRydWUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5odG1sRWxlbWVudCwgXCJmb250LXNpemVcIiwgc2l6ZSArIFwicHhcIik7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbXBvbmVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudC5zZXRGb250U2l6ZShzaXplKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzLnNldChcImZvbnRTaXplXCIsIHNpemUpO1xuICAgIH1cbiAgfVxuXG4gIHNldEZvbnRCb2xkKGJvbGQ6IGFueSkge1xuICAgIGlmICh0aGlzLl9keW5hbWljQ29tcG9uZW50ID09PSB0cnVlKSB7XG4gICAgICBpZiAoYm9sZCA9PT0gXCJ0cnVlXCIgfHwgYm9sZCA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaHRtbEVsZW1lbnQsIFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmh0bWxFbGVtZW50LCBcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jb21wb25lbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jb21wb25lbnQuc2V0Rm9udEJvbGQoYm9sZCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZhdXhFbGVtZW50QXR0cmlidXRlcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmZhdXhFbGVtZW50QXR0cmlidXRlcy5zZXQoXCJmb250Qm9sZFwiLCBib2xkKTtcbiAgICB9XG4gIH1cblxuICBzZXRDbGFzcyhjc3M6IHN0cmluZykge1xuICAgIGlmIChjc3MgIT0gbnVsbCAmJiBjc3MuaW5kZXhPZihcIi5cIikgPj0gMCkge1xuICAgICAgY29uc3QgdGVtcCA9IGNzcy5zcGxpdChcIlxcLlwiKTtcblxuICAgICAgbGV0IGNzc0NsYXNzID0gdGVtcC5qb2luKFwiLVwiKTtcblxuICAgICAgaWYgKHRlbXBbMF0gPT09IFwiXCIpIHtcbiAgICAgICAgY3NzID0gY3NzQ2xhc3Muc3Vic3RyaW5nKDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5odG1sRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmh0bWxFbGVtZW50LCBcImNsYXNzXCIsIGNzcyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbXBvbmVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudC5hZGRDc3NDbGFzcyhjc3MpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYXV4RWxlbWVudEF0dHJpYnV0ZXMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgYSBjaGlsZCByb3cgYXQgc3BlY2lmaWMgbG9jYXRpb25cbiAgICogQHBhcmFtIGlkeFxuICAgKiBAcGFyYW0gY2hpbGRcbiAgICovXG4gIGluc2VydENoaWxkUm93QXQoaWR4OiBudW1iZXIsIGNoaWxkOiBIVE1MRWxlbWVudFdyYXBwZXIpIHtcbiAgICBpZiAoY2hpbGQuaHRtbEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGFibGVSb3dFbGVtZW50ICE9PSB0cnVlICYmIHRoaXMuX2R5bmFtaWNDb21wb25lbnQgPT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW5zZXJ0aW9uLCBvbmx5IEhUTUxUYWJsZVJvd0VsZW1lbnQgaXMgYWxsb3dlZFwiKTtcbiAgICB9XG5cbiAgICBpZiAoaWR4ID4gMCAmJiAodGhpcy5jaGlsZFJvd3MgPT0gbnVsbCB8fCB0aGlzLmNoaWxkUm93cy5sZW5ndGggPD0gaWR4KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGluc2VydCBjaGlsZCByb3cgYXQgdGhpcyBzcGVjaWZpYyBsb2NhdGlvbiAoaW5kZXggb3ZlcmZsb3cpXCIpO1xuICAgIH0gZWxzZSBpZiAoaWR4ID49IDAgJiYgKHRoaXMuY2hpbGRSb3dzICE9IG51bGwgJiYgdGhpcy5jaGlsZFJvd3MubGVuZ3RoID4gaWR4KSkge1xuICAgICAgLy90cmFjayBjaGlsZCByb3dzIHNvIHdlIGNhbiB1c2VkIGluc2VydENoaWxkUm93QXRcbiAgICAgIGlmICh0aGlzLmNoaWxkUm93cyA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuY2hpbGRSb3dzID0gW107XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBhcmVudFRhYmxlLnVzZURvY0ZyYWdtZW50ID09PSB0cnVlKSB7XG4gICAgICAgICh0aGlzLnBhcmVudFRhYmxlLl9ib2R5RnJhZ21lbnQgYXMgRG9jdW1lbnRGcmFnbWVudCkuaW5zZXJ0QmVmb3JlKGNoaWxkLmh0bWxFbGVtZW50LCB0aGlzLmNoaWxkUm93c1tpZHhdLmh0bWxFbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuaW5zZXJ0QmVmb3JlKHRoaXMucGFyZW50VGFibGUudGFibGVCb2R5Lm5hdGl2ZUVsZW1lbnQsIGNoaWxkLmh0bWxFbGVtZW50LCB0aGlzLmNoaWxkUm93c1tpZHhdLmh0bWxFbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGlsZFJvd3Muc3BsaWNlKGlkeCwgMCwgY2hpbGQpO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGNoaWxkLmh0bWxFbGVtZW50LCBcImRhdGEtdHQtcGFyZW50LWlkXCIsIHRoaXMuX3VuaXF1ZUlkKTtcblxuICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kIGEgY2hpbGQgdG8gdGhpcyBlbGVtZW50LiBJZiB0aGlzIGlzIGEgcm93IGFuZCB3ZSBhcHBlbmQgYSByb3csIHNldCB7QCBhcHBlbmRUb1RhYmxlfSB0byB0cnVlXG4gICAqIHdpbGwgYWxzbyBhcHBlbmQgdGhlIGFjdHVhbCB0YWJsZSByb3cgKHRyKSB0byB0aGUgdGFibGUuXG4gICAqXG4gICAqIEBwYXJhbSBjaGlsZCBjaGlsZCB0byBiZSBhcHBlbmRlZFxuICAgKiBAcGFyYW0gYXBwZW5kVG9UYWJsZVxuICAgKi9cbiAgYXBwZW5kQ2hpbGQoY2hpbGQ6IEhUTUxFbGVtZW50V3JhcHBlciwgYXBwZW5kVG9UYWJsZUlmUm93OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAodGhpcy5fZHluYW1pY0NvbXBvbmVudCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGNoaWxkLmh0bWxFbGVtZW50IGluc3RhbmNlb2YgSFRNTFRhYmxlUm93RWxlbWVudCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShjaGlsZC5odG1sRWxlbWVudCwgXCJkYXRhLXR0LXBhcmVudC1pZFwiLCB0aGlzLl91bmlxdWVJZCk7XG5cbiAgICAgICAgaWYgKGFwcGVuZFRvVGFibGVJZlJvdyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmICh0aGlzLnBhcmVudFRhYmxlLnVzZURvY0ZyYWdtZW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAodGhpcy5wYXJlbnRUYWJsZS5fYm9keUZyYWdtZW50IGFzIERvY3VtZW50RnJhZ21lbnQpLmFwcGVuZENoaWxkKGNoaWxkLmh0bWxFbGVtZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLnBhcmVudFRhYmxlLnRhYmxlQm9keS5uYXRpdmVFbGVtZW50LCBjaGlsZC5odG1sRWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy90cmFjayBjaGlsZCByb3dzIHNvIHdlIGNhbiB1c2VkIGluc2VydENoaWxkUm93QXRcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRSb3dzID09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmNoaWxkUm93cyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGlsZFJvd3MucHVzaChjaGlsZCk7XG4gICAgICB9IGVsc2UgaWYgKGNoaWxkLmh0bWxFbGVtZW50IGluc3RhbmNlb2YgSFRNTFRhYmxlQ2VsbEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmh0bWxFbGVtZW50LCBjaGlsZC5odG1sRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZHluYW1pY0NoaWxkTm9kZXMgPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuZHluYW1pY0NoaWxkTm9kZXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHluYW1pY0NoaWxkTm9kZXMucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hpbGROb2Rlcy5wdXNoKGNoaWxkKTtcbiAgICB9XG5cbiAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICB9XG5cbiAgYXBwZW5kQ3VzdG9tQXR0cmlidXRlcyhjdXN0OiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSkge1xuICAgIGlmIChjdXN0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBfLmtleXMoY3VzdCk7XG5cbiAgICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGtleSwgY3VzdFtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL05TRCB3aWxsIG92ZXJyaWRlIHRoaXMsIGFkZGVkIHRvIGZpeCBlcnJvclxuICAvLyBzZXRDdXN0b21BdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gIC8vICAgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAvLyB9XG5cbiAgc2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIGlmKG5hbWUgPT09ICdzZWxlY3RlZCcgJiYgdGhpcy5sb2NhbE5hbWUgPT0gJ3Jvdycpe1xuICAgICAgaWYodGhpcy5wYXJlbnRUYWJsZSAhPSBudWxsKXtcbiAgICAgICAgaWYodmFsdWUgPT0gJ3RydWUnKVxuICAgICAgICAgIHRoaXMucGFyZW50VGFibGUuc2VsZWN0Um93KHRoaXMsIHRydWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGhpcy5wYXJlbnRUYWJsZS5zZWxlY3RSb3codGhpcywgZmFsc2UpO1xuICAgICAgICB0aGlzLnBhcmVudFRhYmxlLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobmFtZSA9PT0gXCJleHBhbmRlZFwiKSB7XG4gICAgICB0aGlzLmV4cGFuZE5vZGUodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb21wb25lbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jb21wb25lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgIHRoaXMudHJhY2tBdHRyaWJ1dGVOYW1lKG5hbWUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5odG1sRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBpZiAobmFtZSA9PT0gXCJpc0xvY2tlZENvbHVtblwiKSB7XG4gICAgICAgIGlmICh0aGlzLmZhdXhFbGVtZW50QXR0cmlidXRlcyA9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5mYXV4RWxlbWVudEF0dHJpYnV0ZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mYXV4RWxlbWVudEF0dHJpYnV0ZXMuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuaHRtbEVsZW1lbnQsIG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50cmFja0F0dHJpYnV0ZU5hbWUobmFtZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZhdXhFbGVtZW50QXR0cmlidXRlcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmZhdXhFbGVtZW50QXR0cmlidXRlcy5zZXQobmFtZSwgdmFsdWUpO1xuICAgICAgdGhpcy50cmFja0F0dHJpYnV0ZU5hbWUobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QXR0cmlidXRlKG5hbWU6IGFueSwgc2tpcFF1ZXJ5RE9NSWZOb3RFeGlzdHM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChuYW1lID09PSBcImV4cGFuZGVkXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLmV4cGFuZGVkID09PSBcInRydWVcIiA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbXBvbmVudCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0QXR0cmlidXRlKG5hbWUsIHNraXBRdWVyeURPTUlmTm90RXhpc3RzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaHRtbEVsZW1lbnQgIT0gbnVsbCAmJiBza2lwUXVlcnlET01JZk5vdEV4aXN0cyAhPT0gdHJ1ZSkge1xuICAgICAgaWYgKG5hbWUgPT09IFwidGV4dFwiKSB7XG4gICAgICAgIGxldCB0ZXh0ID0gdGhpcy5odG1sRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSk7XG5cbiAgICAgICAgaWYgKHRleHQgPT0gbnVsbCkge1xuICAgICAgICAgIHRleHQgPSB0aGlzLmh0bWxFbGVtZW50LmlubmVyVGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0ZXh0ID09IG51bGwgfHwgdGV4dCA9PT0gXCJcIikge1xuICAgICAgICAgIHRleHQgPSAodGhpcy5odG1sRWxlbWVudCBhcyBIVE1MVGFibGVDZWxsRWxlbWVudCkudGV4dENvbnRlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRleHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICB0ZXh0ID0gdGV4dC50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJpc0xvY2tlZENvbHVtblwiICYmIHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzLmdldChuYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJpc0xvY2tlZENvbHVtblwiKSB7XG4gICAgICAgIHJldHVybiBcImZhbHNlXCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmh0bWxFbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmZhdXhFbGVtZW50QXR0cmlidXRlcy5nZXQobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJ0ZXh0XCIpO1xuICB9XG5cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gIH1cblxuICBzZXREcmFnZ2FibGUoZHJhZ2dhYmxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBkcmFnZ2FibGUpO1xuXG4gICAgaWYgKGRyYWdnYWJsZSA9PSBcInRydWVcIikge1xuICAgICAgdGhpcy5hcHBseURyYWdnYWJsZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldEV4cGFuZGVkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwiZXhwYW5kZWRcIik7XG4gIH1cblxuICBzZXRFeHBhbmRlZChzdHI6IHN0cmluZykge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiZXhwYW5kZWRcIiwgc3RyKTtcbiAgfVxuXG4gIHNldE9uQ29udGV4dE1lbnUoYWN0aW9uOiBzdHJpbmcgfCAoKCkgPT4gYW55KSkge1xuICAgIGlmICh0aGlzLmh0bWxFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuY29udGV4dE1lbnVBY3Rpb24gPSBhY3Rpb247XG4gICAgICB0aGlzLmh0bWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCAoZXZlbnQpID0+IHRoaXMub25Db250ZXh0SGFuZGxlcihldmVudCksIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldE9uTW91c2VEb3duKGFjdGlvbjogc3RyaW5nIHwgKCgpID0+IGFueSkpIHtcbiAgICB0aGlzLm1vdXNlRG93bkFjdGlvbiA9IGFjdGlvbjtcbiAgfVxuXG4gIHNldE9uRG91YmxlQ2xpY2soYWN0aW9uOiBzdHJpbmcgfCAoKCkgPT4gYW55KSkge1xuICAgIHRoaXMuZG91YmxlQ2xpY2tBY3Rpb24gPSBhY3Rpb247XG4gIH1cblxuICBzZXRQb3B1cChwb3B1cE5hbWU6IHN0cmluZykge1xuICAgIHRoaXMucG9wdXBOYW1lID0gcG9wdXBOYW1lLnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuICB9XG5cbiAgZ2V0UGFyZW50KCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgfVxuXG4gIGdldExvY2FsTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbE5hbWU7XG4gIH1cblxuICBzZXRMb2NhbGVOYW1lKGxvY2FsTmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5sb2NhbE5hbWUgPSBsb2NhbE5hbWU7XG4gIH1cblxuICBnZXRDaGlsZHJlbigpIHtcbiAgICBsZXQgY2hpbGRyZW46IEFycmF5PEhUTUxFbGVtZW50V3JhcHBlcj4gPSB0aGlzLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoKGNoaWxkcmVuID09IG51bGwgfHwgY2hpbGRyZW4ubGVuZ3RoID09PSAwKSAmJiAodGhpcy5keW5hbWljQ2hpbGROb2RlcyAhPSBudWxsKSkge1xuICAgICAgY2hpbGRyZW4gPSB0aGlzLmR5bmFtaWNDaGlsZE5vZGVzO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMuZ2V0TG9jYWxOYW1lKCkgPT09IFwicm93XCIgJiZcbiAgICAgIGNoaWxkcmVuICE9IG51bGwgJiZcbiAgICAgIHRoaXMucGFyZW50VGFibGUgIT0gbnVsbCAmJlxuICAgICAgdGhpcy5wYXJlbnRUYWJsZS5nZXRMb2NhbE5hbWUoKSA9PT0gXCJ0YWJsZVwiICYmXG4gICAgICB0aGlzLnBhcmVudFRhYmxlLmNvbHVtbnNIYXNCZWVuU3dhcHBlZCA9PT0gdHJ1ZVxuICAgICkge1xuICAgICAgY2hpbGRyZW4gPSBfLm9yZGVyQnkoY2hpbGRyZW4sIChjaGlsZDogSFRNTEVsZW1lbnRXcmFwcGVyKT0+IHtcbiAgICAgICAgcmV0dXJuIGNoaWxkW1wib3JpZ2luYWxDb2x1bW5JbmRleFwiXTtcbiAgICAgIH0pIGFzIGFueTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICBnZXRDaGlsZENvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGROb2RlcyAhPSBudWxsID8gdGhpcy5jaGlsZE5vZGVzLmxlbmd0aCA6IDA7XG4gIH1cblxuICBnZXRDaGlsZEF0KGlkeDogbnVtYmVyKTogSFRNTEVsZW1lbnRXcmFwcGVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDaGlsZENvdW50KCkgPiBpZHggPyB0aGlzLmNoaWxkTm9kZXNbaWR4XSA6IG51bGw7XG4gIH1cblxuICBzZXRDb21wb25lbnQoY29tcG9uZW50OiBCYXNlQ29tcG9uZW50LCBmcm9tVmlydHVhbFRhYmxlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICB0aGlzLmNvbXBvbmVudC5wYXJlbnRUYWJsZVJvdyA9IHRoaXMucGFyZW50O1xuXG4gICAgaWYgKGNvbXBvbmVudCAhPSBudWxsICYmIGZyb21WaXJ0dWFsVGFibGUgPT09IHRydWUpIHtcbiAgICAgIGNvbXBvbmVudC5hZGRBdHRyaWJ1dGVDaGFuZ2VMaXN0ZW5lcih0aGlzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGludm9rZU1jb0FjdGlvbihhY3Rpb246IHN0cmluZyB8ICgoKSA9PiBhbnkpKSB7XG4gICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgYWN0aW9uKCk7XG4gICAgfSBlbHNlIGlmIChhY3Rpb24uaW5kZXhPZihcIm1jbzovL1wiKSA9PT0gMCkge1xuICAgICAgY29uc3QgbWNvTmFtZSA9IGFjdGlvbi5zdWJzdHJpbmcoNiwgYWN0aW9uLmluZGV4T2YoXCIuXCIpKTtcbiAgICAgIGNvbnN0IG1ldGhvZE5hbWUgPSBhY3Rpb24uc3Vic3RyaW5nKGFjdGlvbi5pbmRleE9mKFwiLlwiKSArIDEsIGFjdGlvbi5pbmRleE9mKFwiKFwiKSk7XG4gICAgICBjb25zdCBhcmcgPSBhY3Rpb24uc3Vic3RyaW5nKGFjdGlvbi5pbmRleE9mKFwiKFwiKSArIDEsIGFjdGlvbi5pbmRleE9mKFwiKVwiKSk7XG5cbiAgICAgIGlmIChhcmcgIT0gbnVsbCAmJiBhcmcubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBtY28gPSB0aGlzLnNlc3Npb25TZXJ2aWNlLmdldE1jb0NvbnRhaW5lcigpLmdldE1jbyhtY29OYW1lKTtcblxuICAgICAgICBpZiAobWNvICE9IG51bGwpIHtcbiAgICAgICAgICBpZiAoYXJnID09PSBcInRoaXNcIikge1xuICAgICAgICAgICAgbWNvW21ldGhvZE5hbWVdLmFwcGx5KG1jbywgW3RoaXNdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWNvW21ldGhvZE5hbWVdLmFwcGx5KG1jbywgW2FyZ10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGV4ZWN1dGUgTUNPIGFjdGlvbiwgbWNvIG5vdCBmb3VuZDogXCIgKyBtY29OYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWNvID0gdGhpcy5zZXNzaW9uU2VydmljZS5nZXRNY29Db250YWluZXIoKS5nZXRNY28obWNvTmFtZSk7XG5cbiAgICAgICAgaWYgKG1jbyAhPSBudWxsKSB7XG4gICAgICAgICAgbWNvW21ldGhvZE5hbWVdLmFwcGx5KG1jbyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBleGVjdXRlIE1DTyBhY3Rpb24sIG1jbyBub3QgZm91bmQ6IFwiICsgbWNvTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRDb21wb25lbnQoKTogQmFzZUNvbXBvbmVudCB7XG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBzaG93UG9wdXBNZW51KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5zZXRNb3VzZVBvc2l0aW9uKGV2ZW50KTtcblxuICAgIGlmICh0aGlzLnBvcHVwTmFtZSAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjb250ZXh0TWVudSA9IHRoaXMuc2Vzc2lvblNlcnZpY2Uuc2hvd0NvbnRleHRNZW51KHRoaXMucG9wdXBOYW1lKTtcblxuICAgICAgaWYgKGNvbnRleHRNZW51ID09PSB0cnVlKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIC8vIGNvbnRleHRNZW51LnNob3codGhpcy5odG1sRWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2xpZW50RXZlbnQgPSBuZXcgQ2xpZW50RXZlbnQodGhpcywgZXZlbnQpO1xuXG4gICAgaWYgKEFwcFV0aWxzLmN1c3RvbWl6ZUNsaWVudEV2ZW50ICE9IG51bGwpIHtcbiAgICAgIEFwcFV0aWxzLmN1c3RvbWl6ZUNsaWVudEV2ZW50KHRoaXMsIGNsaWVudEV2ZW50KTtcbiAgICB9XG5cbiAgICBjbGllbnRFdmVudC5zZXRQYXJhbWV0ZXIoXCJzY3JlZW5JZFwiLCB0aGlzLnBhcmVudFNjcmVlbklkKTtcblxuICAgIHRoaXMuc2Vzc2lvblNlcnZpY2UuZ2V0RXZlbnRIYW5kbGVyKCkuc2V0Q2xpZW50RXZlbnQoY2xpZW50RXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVPbk1vdXNlRG93bihldmVudCkge1xuICAgIGlmKHRoaXMucGFyZW50VGFibGUgIT0gbnVsbCl7XG4gICAgICBsZXQgdGFibGUgPSB0aGlzLnBhcmVudFRhYmxlLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIGxldCB0ZHM6IE5vZGVMaXN0ID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndGQnKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgKHRkc1tpXSBhcyBhbnkpLnN0eWxlLmNvbG9yID0gJyc7XG4gICAgICB9XG5cbiAgICAgIHRkcyA9IHRoaXMuaHRtbEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGQnKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICh0ZHNbaV0gYXMgYW55KS5zdHlsZS5jb2xvciA9ICdibHVlJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5tb3VzZURvd25BY3Rpb24gIT0gbnVsbCkge1xuICAgICAgY29uc3QgY2xpZW50RXZlbnQgPSBuZXcgQ2xpZW50RXZlbnQodGhpcywgZXZlbnQpO1xuXG4gICAgICBpZiAoQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQgIT0gbnVsbCkge1xuICAgICAgICBBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudCh0aGlzLCBjbGllbnRFdmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnBhcmVudFNjcmVlbklkICE9IG51bGwpIHtcbiAgICAgICAgY2xpZW50RXZlbnQuc2V0UGFyYW1ldGVyKFwic2NyZWVuSWRcIiwgdGhpcy5wYXJlbnRTY3JlZW5JZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2Vzc2lvblNlcnZpY2UuZ2V0RXZlbnRIYW5kbGVyKCkuc2V0Q2xpZW50RXZlbnQoY2xpZW50RXZlbnQpO1xuXG4gICAgICB0aGlzLmludm9rZU1jb0FjdGlvbih0aGlzLm1vdXNlRG93bkFjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVEb3VibGVDbGljayhldmVudCkge1xuICAgIGNvbnN0IGNsaWVudEV2ZW50ID0gbmV3IENsaWVudEV2ZW50KHRoaXMsIGV2ZW50KTtcblxuICAgIGlmIChBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudCAhPSBudWxsKSB7XG4gICAgICBBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudCh0aGlzLCBjbGllbnRFdmVudCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFyZW50U2NyZWVuSWQgIT0gbnVsbCkge1xuICAgICAgY2xpZW50RXZlbnQuc2V0UGFyYW1ldGVyKFwic2NyZWVuSWRcIiwgdGhpcy5wYXJlbnRTY3JlZW5JZCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5nZXRFdmVudEhhbmRsZXIoKS5zZXRDbGllbnRFdmVudChjbGllbnRFdmVudCk7XG5cbiAgICBpZiAodGhpcy5kb3VibGVDbGlja0FjdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLmludm9rZU1jb0FjdGlvbih0aGlzLmRvdWJsZUNsaWNrQWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICBleHBhbmROb2RlKGlzRXhwYW5kZWQ6IGJvb2xlYW4gfCBzdHJpbmcsIGp1c3RVcGRhdGVBdHRyaWJ1dGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuZXhwYW5kZWQgPSB0eXBlb2YgaXNFeHBhbmRlZCA9PT0gXCJzdHJpbmdcIiA/IGlzRXhwYW5kZWQgOiBpc0V4cGFuZGVkICsgJyc7XG5cbiAgICBpZiAoanVzdFVwZGF0ZUF0dHJpYnV0ZSAhPT0gdHJ1ZSAmJiB0aGlzLnBhcmVudFRhYmxlSWQgIT0gbnVsbCAmJiB0aGlzLnBhcmVudFRhYmxlSWQgIT09IFwiXCIpIHtcbiAgICAgIGNvbnN0IGpxID0galF1ZXJ5KGAjJHt0aGlzLnBhcmVudFRhYmxlSWR9IC5qcS10cmVlLXRhYmxlYCk7XG5cbiAgICAgIGlmIChqcSAhPSBudWxsKSB7XG4gICAgICAgIGxldCBub2RlSWQ6IHN0cmluZyA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS10dC1pZFwiKTtcblxuICAgICAgICBpZiAobm9kZUlkICE9IG51bGwpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGlzRXhwYW5kZWQgPT09IFwidHJ1ZVwiIHx8IGlzRXhwYW5kZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAganEudHJlZXRhYmxlKFwiZXhwYW5kTm9kZVwiLCBub2RlSWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAganEudHJlZXRhYmxlKFwiY29sbGFwc2VOb2RlXCIsIG5vZGVJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBleHBhbmQgbm9kZSBkdWUgdG8gZXJyb3JcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGV4cGFuZCBub2RlLCB0cmVlIHRhYmxlIGlzIG51bGxcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0cmFja0F0dHJpYnV0ZU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuYXR0cmlidXRlc05hbWUgPT0gbnVsbCkge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVzTmFtZSA9IFtdO1xuICAgIH1cblxuICAgIHRoaXMuYXR0cmlidXRlc05hbWUucHVzaChuYW1lKTtcbiAgfVxuXG4gIHRvSnNvbigpOiB7fSB7XG4gICAgbGV0IHJldFZhbCA9IHt9O1xuXG4gICAgaWYgKHRoaXMuY29tcG9uZW50ICE9IG51bGwpIHtcbiAgICAgIHJldFZhbCA9IHRoaXMuY29tcG9uZW50LnRvSnNvbigpO1xuXG4gICAgICBpZiAodGhpcy5jb21wb25lbnQgaW5zdGFuY2VvZiBMYWJlbENvbXBvbmVudCkge1xuICAgICAgICByZXRWYWxbXCJueFRhZ05hbWVcIl0gPSB0aGlzLmdldExvY2FsTmFtZSgpO1xuICAgICAgICByZXRWYWxbXCJ0YWdOYW1lXCJdID0gdGhpcy5nZXRMb2NhbE5hbWUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0VmFsW1wibnhUYWdOYW1lXCJdID0gdGhpcy5nZXRMb2NhbE5hbWUoKTtcbiAgICAgIHJldFZhbFtcInRhZ05hbWVcIl0gPSB0aGlzLmdldExvY2FsTmFtZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbXBvbmVudCA9PSBudWxsKSB7XG4gICAgICByZXRWYWxbXCJpZFwiXSA9IHRoaXMuZ2V0SWQoKSB8fCB0aGlzLl91bmlxdWVJZDtcbiAgICAgIHJldFZhbFtcInRleHRcIl0gPSB0aGlzLmdldFRleHQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hdHRyaWJ1dGVzTmFtZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZXNOYW1lLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIHJldFZhbFtuYW1lXSA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9hbnkgY2hpbGRyZW4/XG4gICAgbGV0IGNoaWxkcmVuOiBBcnJheTxIVE1MRWxlbWVudFdyYXBwZXI+O1xuICAgIGlmICh0aGlzLmNoaWxkTm9kZXMgIT0gbnVsbCAmJiB0aGlzLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgY2hpbGRyZW4gPSB0aGlzLmNoaWxkTm9kZXM7XG4gICAgfSBlbHNlIGlmICh0aGlzLmR5bmFtaWNDaGlsZE5vZGVzICE9IG51bGwgJiYgdGhpcy5keW5hbWljQ2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjaGlsZHJlbiA9IHRoaXMuZHluYW1pY0NoaWxkTm9kZXM7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkcmVuICE9IG51bGwpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5nZXRMb2NhbE5hbWUoKSA9PT0gXCJyb3dcIiAmJlxuICAgICAgICB0aGlzLnBhcmVudFRhYmxlICE9IG51bGwgJiZcbiAgICAgICAgdGhpcy5wYXJlbnRUYWJsZS5nZXRMb2NhbE5hbWUoKSA9PT0gXCJ0YWJsZVwiICYmXG4gICAgICAgIHRoaXMucGFyZW50VGFibGUuY29sdW1uc0hhc0JlZW5Td2FwcGVkID09PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgY2hpbGRyZW4gPSBfLm9yZGVyQnkoY2hpbGRyZW4sIChjaGlsZDogSFRNTEVsZW1lbnRXcmFwcGVyKT0+IHtcbiAgICAgICAgICByZXR1cm4gY2hpbGRbXCJvcmlnaW5hbENvbHVtbkluZGV4XCJdO1xuICAgICAgICB9KSBhcyBhbnk7XG4gICAgICB9XG5cbiAgICAgIHJldFZhbFtcImNoaWxkcmVuXCJdID0gY2hpbGRyZW4ubWFwKGNoaWxkPT5jaGlsZC50b0pzb24oKSk7XG4gICAgfVxuICAgIGlmKHRoaXMuY3VzdG9tQXR0cmlidXRlcylcbiAgICAgIHJldFZhbFsnY3VzdG9tQXR0cmlidXRlcyddID0gdGhpcy5jdXN0b21BdHRyaWJ1dGVzO1xuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBpc1ZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNEaWFsb2coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNEeW5hbWljVmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0ZhdXhFbGVtZW50KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc2V0Q2hlY2tlZChjaGs6IHN0cmluZyB8IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIGNoayA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgIGNoayA9IGNoayArIFwiXCI7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsIGNoayk7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIGZvciBjaGlsZCB1c2luZyB0aGUgcHJvdmlkZWQgZnVuY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIGZuIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hpbGUgaXRlcmF0aW5nIGNoaWxkIGxvb2t1cFxuICAgKi9cbiAgZmluZENoaWxkQnlGbihmbjogKGVsZW1lbnQ6IEhUTUxFbGVtZW50V3JhcHBlcik9PmJvb2xlYW4pIHtcbiAgICBsZXQgcmV0VmFsOiBIVE1MRWxlbWVudFdyYXBwZXI7XG5cbiAgICBsZXQgY2hpbGRyZW46IEFycmF5PEhUTUxFbGVtZW50V3JhcHBlcj4gPSB0aGlzLmNvbmNhdE5vZGUoW10gYXMgYW55LCB0aGlzKTtcblxuICAgIHdoaWxlKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW4ucG9wKCk7XG5cbiAgICAgIGlmIChjaGlsZCAhPSBudWxsKSB7XG4gICAgICAgIGlmIChmbihjaGlsZCkgPT09IHRydWUpIHtcbiAgICAgICAgICByZXRWYWwgPSBjaGlsZDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGlsZHJlbiA9IHRoaXMuY29uY2F0Tm9kZShjaGlsZHJlbiwgY2hpbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25jYXRlIHtmcm9tTm9kZX0gdG8ge3RvTm9kZX1cbiAgICpcbiAgICogQHBhcmFtIHRvTm9kZSBhcnJheSBvZiBub2RlcyB0byBiZSBjb25jYXRlZCB0b1xuICAgKiBAcGFyYW0gZnJvbU5vZGUgbm9kZSB0byBiZSBjb25jYXRlZCBmcm9tXG4gICAqIEByZXR1cm5zIHRoZSBjb25jYXRlZCBub2RlXG4gICAqL1xuICBwcml2YXRlIGNvbmNhdE5vZGUodG9Ob2RlOiBBcnJheTxIVE1MRWxlbWVudFdyYXBwZXI+LCBmcm9tTm9kZTogSFRNTEVsZW1lbnRXcmFwcGVyKTogQXJyYXk8SFRNTEVsZW1lbnRXcmFwcGVyPiB7XG4gICAgbGV0IHJldFZhbCA9IHRvTm9kZTtcblxuICAgIGlmIChmcm9tTm9kZSAhPSBudWxsKSB7XG4gICAgICBpZiAoZnJvbU5vZGUuY2hpbGROb2RlcyAhPSBudWxsKSB7XG4gICAgICAgIHJldFZhbCA9IHJldFZhbC5jb25jYXQoZnJvbU5vZGUuY2hpbGROb2Rlcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmcm9tTm9kZS5jaGlsZFJvd3MgIT0gbnVsbCkge1xuICAgICAgICByZXRWYWwgPSByZXRWYWwuY29uY2F0KGZyb21Ob2RlLmNoaWxkUm93cyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmcm9tTm9kZS5keW5hbWljQ2hpbGROb2RlcyAhPSBudWxsKSB7XG4gICAgICAgIHJldFZhbCA9IHJldFZhbC5jb25jYXQoZnJvbU5vZGUuZHluYW1pY0NoaWxkTm9kZXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICAvL2F0dHJpYnV0ZSBjaGFuZ2UgbGlzdGVuZXJcbiAgX2ludGVybmFsSWQ6IHN0cmluZztcblxuICBiZWZvcmVBdHRyaWJ1dGVSZW1vdmVkKGV2dDogQXR0cmlidXRlQ2hhbmdlRXZlbnQpOiB2b2lkIHtcblxuICB9XG5cbiAgYmVmb3JlQXR0cmlidXRlU2V0KGV2dDogQXR0cmlidXRlQ2hhbmdlRXZlbnQpOiB2b2lkIHtcblxuICB9XG5cbiAgb25BdHRyaWJ1dGVSZW1vdmVkKGV2dDogQXR0cmlidXRlQ2hhbmdlRXZlbnQpOiB2b2lkIHtcblxuICB9XG5cbiAgb25BdHRyaWJ1dGVTZXQoZXZ0OiBBdHRyaWJ1dGVDaGFuZ2VFdmVudCk6IHZvaWQge1xuICAgIGlmIChldnQuZ2V0TmFtZSgpID09PSBcInNvcnRWYWx1ZVwiICYmIHRoaXMuaHRtbEVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy51cGRhdGVTb3J0VmFsdWUoZXZ0LmdldE5ld1ZhbHVlKCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU29ydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMucmVuZGVyZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5odG1sRWxlbWVudCwgXCJkYXRhLXRleHRcIiwgdmFsdWUpO1xuXG4gICAgICBpZiAodGhpcy5jb21wb25lbnQgIT0gbnVsbCAmJiB0aGlzLmNvbXBvbmVudC5nZXRQYXJlbnQoKSAhPSBudWxsICYmIHR5cGVvZiAodGhpcy5jb21wb25lbnQuZ2V0UGFyZW50KCkgYXMgYW55KS5yZWZyZXNoVGFibGVTb3J0ZXJDYWNoZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICh0aGlzLmNvbXBvbmVudC5nZXRQYXJlbnQoKSBhcyBhbnkpLnJlZnJlc2hUYWJsZVNvcnRlckNhY2hlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNEcmFnZ2FibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIpID09PSBcInRydWVcIjtcbiAgfVxuXG4gIGFwcGx5RHJhZ2dhYmxlKCkge1xuICAgIGlmICh0aGlzLmlzRHJhZ2dhYmxlKCkgJiYgdGhpcy5kcmFnZ2FibGVBcHBsaWVkICE9PSB0cnVlICYmIHRoaXMuaHRtbEVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgalF1ZXJ5KHRoaXMuaHRtbEVsZW1lbnQpLmRyYWdnYWJsZSh7XG4gICAgICAgIGFwcGVuZFRvOiBcImJvZHlcIixcbiAgICAgICAgYWRkQ2xhc3NlczogZmFsc2UsXG4gICAgICAgIGhlbHBlcjogKCk9PntcbiAgICAgICAgICBjb25zdCBoZWxwZXI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBoZWxwZXIuY2xhc3NMaXN0LmFkZChcImRyYWdnYWJsZS1yb3ctaGVscGVyXCIpO1xuICAgICAgICAgIGhlbHBlci5pZCA9IFwiZHJhZ2dhYmxlUm93SGVscGVySW50ZXJuYWxcIjtcblxuICAgICAgICAgIC8vIGlmICh0aGlzLnBhcmVudFRhYmxlICE9IG51bGwgJiYgdGhpcy5wYXJlbnRUYWJsZS5zZWxlY3RlZFJvd3MgIT0gbnVsbCAmJiB0aGlzLnBhcmVudFRhYmxlLnNlbGVjdGVkUm93cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgLy8gICBoZWxwZXIuY2xhc3NMaXN0LmFkZChcImRyYWctcm93LWhlbHBlci1jb250YWluZXJcIik7XG5cbiAgICAgICAgICAvLyAgIGNvbnN0IGMgPSB0aGlzLnBhcmVudFRhYmxlLnNlbGVjdGVkUm93cy5sZW5ndGg7XG4gICAgICAgICAgLy8gICBjb25zdCBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICAgICAgLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IGM7IGkrKykge1xuICAgICAgICAgIC8vICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIC8vICAgICByb3cuY2xhc3NMaXN0LmFkZChcImRyYWctcm93LWhlbHBlci1yb3dcIik7XG4gICAgICAgICAgLy8gICAgIGZyYWcuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgICAgICAvLyAgIH1cblxuICAgICAgICAgIC8vICAgaGVscGVyLmFwcGVuZENoaWxkKGZyYWcpO1xuICAgICAgICAgIC8vIH1cblxuICAgICAgICAgIHJldHVybiBoZWxwZXI7XG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0OiAoKT0+e1xuICAgICAgICAgIGNvbnN0IGNsaWVudEV2ZW50ID0gbmV3IENsaWVudEV2ZW50KHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICBjbGllbnRFdmVudC5zZXRQYXJhbWV0ZXIoXCJkcmFnSWRcIiwgdGhpcy5wYXJlbnRUYWJsZUlkKTtcblxuICAgICAgICAgIGlmIChBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICBBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudCh0aGlzLCBjbGllbnRFdmVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMucGFyZW50U2NyZWVuSWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgY2xpZW50RXZlbnQuc2V0UGFyYW1ldGVyKFwic2NyZWVuSWRcIiwgdGhpcy5wYXJlbnRTY3JlZW5JZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5zZXNzaW9uU2VydmljZS5nZXRFdmVudEhhbmRsZXIoKS5zZXRDbGllbnRFdmVudChjbGllbnRFdmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZHJhZ2dhYmxlQXBwbGllZCA9IHRydWU7XG4gIH1cblxuICBpc0RyYWdnYWJsZUFwcGxpZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlQXBwbGllZDtcbiAgfVxuICAvKipcbiAgICogcm9344Gq44GpQmFzZUNvbXBvbmVudOOBqOOBl+OBpuWtmOWcqOOBl+OBquOBhHdyYXBwZXLjgatjdXN0b21BdHRyaWJ1dGVz44KS6Kit5a6a44GX44G+44GZ44CCXG4gICAqIEBwYXJhbSBuYW1lXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgc2V0Q3VzdG9tQXR0cmlidXRlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmKCF0aGlzLmN1c3RvbUF0dHJpYnV0ZXMpXG4gICAgICB0aGlzLmN1c3RvbUF0dHJpYnV0ZXMgPSB7fTtcbiAgICB0aGlzLmN1c3RvbUF0dHJpYnV0ZXNbbmFtZV0gPSB2YWx1ZTtcbiAgfVxufVxuIl19