/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { BaseComponent } from "../base/base.component";
import { ClientEvent } from "../event-handler/client-event";
import { AppUtils } from "../base/app-utils";
import * as _ from "lodash";
import { LabelComponent } from "../label/label.component";
export class HTMLElementWrapper {
    /**
     * @param {?} renderer
     * @param {?} type
     * @param {?} sessionService
     * @param {?=} virtual
     * @param {?=} docFragment
     */
    constructor(renderer, type, sessionService, virtual = false, docFragment = null) {
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
            this.onContextHandler = (event) => {
                /** @type {?} */
                const clientEvent = new ClientEvent(this, event);
                if (AppUtils.customizeClientEvent != null) {
                    AppUtils.customizeClientEvent(this, clientEvent);
                }
                if (this.parentScreenId != null) {
                    clientEvent.setParameter("screenId", this.parentScreenId);
                }
                this.sessionService.getEventHandler().setClientEvent(clientEvent);
                if (typeof this.contextMenuAction === "string") {
                    this.invokeMcoAction(this.contextMenuAction);
                }
                else if (typeof this.contextMenuAction === "function") {
                    this.contextMenuAction.apply(this, [this]);
                }
                this.showPopupMenu(event);
            };
            this.htmlElement.addEventListener("mousedown", (event) => this.onMouseDownHandler(event), true);
            this.htmlElement.addEventListener("dblclick", (event) => this.onDoubleClickHandler(event), true);
            this.onMouseDownHandler = (event) => {
                this.handleOnMouseDown(event);
            };
            this.onDoubleClickHandler = (event) => {
                this.handleDoubleClick(event);
            };
        }
    }
    /**
     * @return {?}
     */
    get id() {
        return this.getId();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    static createVirtualElement(type) {
        return new HTMLElementWrapper(null, type, null, true);
    }
    /**
     * @param {?=} skipDestroyChild
     * @return {?}
     */
    destroy(skipDestroyChild = false) {
        if (this._dynamicComponent === true && this.htmlElement != null) {
            this.htmlElement.removeEventListener("contextmenu", this.onContextHandler, true);
            this.htmlElement.removeEventListener("mousedown", this.onMouseDownHandler, true);
            this.htmlElement.removeEventListener("dblclick", this.onDoubleClickHandler, true);
        }
        if (this.childNodes != null && skipDestroyChild !== true) {
            /** @type {?} */
            let stack = this.childNodes;
            while (stack.length > 0) {
                /** @type {?} */
                const node = stack.pop();
                if (node.childNodes != null) {
                    stack = stack.concat(node.childNodes);
                }
                node.destroy(true);
            }
        }
        if (this.dynamicChildNodes != null && skipDestroyChild !== true) {
            /** @type {?} */
            let stack = this.dynamicChildNodes;
            while (stack.length > 0) {
                /** @type {?} */
                const node = stack.pop();
                if (node.dynamicChildNodes != null) {
                    stack = stack.concat(node.dynamicChildNodes);
                }
                node.destroy(true);
            }
        }
        if (this.childRows != null && skipDestroyChild !== true) {
            /** @type {?} */
            let stack = this.childRows;
            while (stack.length > 0) {
                /** @type {?} */
                const node = stack.pop();
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
    }
    /**
     * @param {?} text
     * @return {?}
     */
    setText(text) {
        if (this._dynamicComponent === true) {
            this.renderer.setProperty(this.htmlElement, "innerHTML", text);
        }
        else if (this.component != null) {
            this.component.setText(text);
        }
        else if (this.fauxElementAttributes != null) {
            this.fauxElementAttributes.set("text", text);
        }
    }
    /**
     * @param {?} size
     * @return {?}
     */
    setFontSize(size) {
        if (this._dynamicComponent === true) {
            this.renderer.setStyle(this.htmlElement, "font-size", size + "px");
        }
        else if (this.component != null) {
            this.component.setFontSize(size);
        }
        else if (this.fauxElementAttributes != null) {
            this.fauxElementAttributes.set("fontSize", size);
        }
    }
    /**
     * @param {?} bold
     * @return {?}
     */
    setFontBold(bold) {
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
    }
    /**
     * @param {?} css
     * @return {?}
     */
    setClass(css) {
        if (css != null && css.indexOf(".") >= 0) {
            /** @type {?} */
            const temp = css.split("\.");
            /** @type {?} */
            let cssClass = temp.join("-");
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
    }
    /**
     * Insert a child row at specific location
     * @param {?} idx
     * @param {?} child
     * @return {?}
     */
    insertChildRowAt(idx, child) {
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
    }
    /**
     * Append a child to this element. If this is a row and we append a row, set {\@ appendToTable} to true
     * will also append the actual table row (tr) to the table.
     *
     * @param {?} child child to be appended
     * @param {?=} appendToTableIfRow
     * @return {?}
     */
    appendChild(child, appendToTableIfRow = false) {
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
    }
    /**
     * @param {?} cust
     * @return {?}
     */
    appendCustomAttributes(cust) {
        if (cust != null) {
            /** @type {?} */
            const keys = _.keys(cust);
            for (let key of keys) {
                this.setAttribute(key, cust[key]);
            }
        }
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(name, value) {
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
    }
    /**
     * @param {?} name
     * @param {?=} skipQueryDOMIfNotExists
     * @return {?}
     */
    getAttribute(name, skipQueryDOMIfNotExists = false) {
        if (name === "expanded") {
            return this.expanded === "true" ? "true" : "false";
        }
        if (this.component != null) {
            return this.component.getAttribute(name, skipQueryDOMIfNotExists);
        }
        else if (this.htmlElement != null && skipQueryDOMIfNotExists !== true) {
            if (name === "text") {
                /** @type {?} */
                let text = this.htmlElement.getAttribute(name);
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
    getId() {
        return this.getAttribute("id");
    }
    /**
     * @param {?} draggable
     * @return {?}
     */
    setDraggable(draggable) {
        this.setAttribute("draggable", draggable);
        if (draggable == "true") {
            this.applyDraggable();
        }
    }
    /**
     * @return {?}
     */
    getExpanded() {
        return this.getAttribute("expanded");
    }
    /**
     * @param {?} str
     * @return {?}
     */
    setExpanded(str) {
        this.setAttribute("expanded", str);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    setOnContextMenu(action) {
        if (this.htmlElement != null) {
            this.contextMenuAction = action;
            this.htmlElement.addEventListener("contextmenu", (event) => this.onContextHandler(event), true);
        }
    }
    /**
     * @param {?} action
     * @return {?}
     */
    setOnMouseDown(action) {
        this.mouseDownAction = action;
    }
    /**
     * @param {?} action
     * @return {?}
     */
    setOnDoubleClick(action) {
        this.doubleClickAction = action;
    }
    /**
     * @param {?} popupName
     * @return {?}
     */
    setPopup(popupName) {
        this.popupName = popupName.replace("#", "");
    }
    /**
     * @return {?}
     */
    getParent() {
        return this.parent;
    }
    /**
     * @return {?}
     */
    getLocalName() {
        return this.localName;
    }
    /**
     * @param {?} localName
     * @return {?}
     */
    setLocaleName(localName) {
        this.localName = localName;
    }
    /**
     * @return {?}
     */
    getChildren() {
        /** @type {?} */
        let children = this.childNodes;
        if ((children == null || children.length === 0) && (this.dynamicChildNodes != null)) {
            children = this.dynamicChildNodes;
        }
        if (this.getLocalName() === "row" &&
            children != null &&
            this.parentTable != null &&
            this.parentTable.getLocalName() === "table" &&
            this.parentTable.columnsHasBeenSwapped === true) {
            children = /** @type {?} */ (_.orderBy(children, (child) => {
                return child["originalColumnIndex"];
            }));
        }
        return children;
    }
    /**
     * @return {?}
     */
    getChildCount() {
        return this.childNodes != null ? this.childNodes.length : 0;
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    getChildAt(idx) {
        return this.getChildCount() > idx ? this.childNodes[idx] : null;
    }
    /**
     * @param {?} component
     * @param {?=} fromVirtualTable
     * @return {?}
     */
    setComponent(component, fromVirtualTable = false) {
        this.component = component;
        this.component.parentTableRow = this.parent;
        if (component != null && fromVirtualTable === true) {
            component.addAttributeChangeListener(this);
        }
    }
    /**
     * @param {?} action
     * @return {?}
     */
    invokeMcoAction(action) {
        if (typeof action === "function") {
            action();
        }
        else if (action.indexOf("mco://") === 0) {
            /** @type {?} */
            const mcoName = action.substring(6, action.indexOf("."));
            /** @type {?} */
            const methodName = action.substring(action.indexOf(".") + 1, action.indexOf("("));
            /** @type {?} */
            const arg = action.substring(action.indexOf("(") + 1, action.indexOf(")"));
            if (arg != null && arg.length > 0) {
                /** @type {?} */
                const mco = this.sessionService.getMcoContainer().getMco(mcoName);
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
                const mco = this.sessionService.getMcoContainer().getMco(mcoName);
                if (mco != null) {
                    mco[methodName].apply(mco);
                }
                else {
                    console.error("Unable to execute MCO action, mco not found: " + mcoName);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    getComponent() {
        return this.component;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    showPopupMenu(event) {
        this.sessionService.setMousePosition(event);
        if (this.popupName != null) {
            /** @type {?} */
            const contextMenu = this.sessionService.showContextMenu(this.popupName);
            if (contextMenu === true) {
                event.preventDefault();
                event.stopPropagation();
                // contextMenu.show(this.htmlElement);
            }
        }
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
        if (AppUtils.customizeClientEvent != null) {
            AppUtils.customizeClientEvent(this, clientEvent);
        }
        clientEvent.setParameter("screenId", this.parentScreenId);
        this.sessionService.getEventHandler().setClientEvent(clientEvent);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleOnMouseDown(event) {
        if (this.parentTable != null) {
            /** @type {?} */
            let table = this.parentTable.elementRef.nativeElement;
            /** @type {?} */
            let tds = table.querySelectorAll('td');
            for (let i = 0; i < tds.length; i++) {
                (/** @type {?} */ (tds[i])).style.color = '';
            }
            tds = this.htmlElement.querySelectorAll('td');
            for (let i = 0; i < tds.length; i++) {
                (/** @type {?} */ (tds[i])).style.color = 'blue';
            }
        }
        if (this.mouseDownAction != null) {
            /** @type {?} */
            const clientEvent = new ClientEvent(this, event);
            if (AppUtils.customizeClientEvent != null) {
                AppUtils.customizeClientEvent(this, clientEvent);
            }
            if (this.parentScreenId != null) {
                clientEvent.setParameter("screenId", this.parentScreenId);
            }
            this.sessionService.getEventHandler().setClientEvent(clientEvent);
            this.invokeMcoAction(this.mouseDownAction);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleDoubleClick(event) {
        /** @type {?} */
        const clientEvent = new ClientEvent(this, event);
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
    }
    /**
     * @param {?} isExpanded
     * @param {?=} justUpdateAttribute
     * @return {?}
     */
    expandNode(isExpanded, justUpdateAttribute = false) {
        this.expanded = typeof isExpanded === "string" ? isExpanded : isExpanded + '';
        if (justUpdateAttribute !== true && this.parentTableId != null && this.parentTableId !== "") {
            /** @type {?} */
            const jq = jQuery(`#${this.parentTableId} .jq-tree-table`);
            if (jq != null) {
                /** @type {?} */
                let nodeId = this.getAttribute("data-tt-id");
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
    }
    /**
     * @param {?} name
     * @return {?}
     */
    trackAttributeName(name) {
        if (this.attributesName == null) {
            this.attributesName = [];
        }
        this.attributesName.push(name);
    }
    /**
     * @return {?}
     */
    toJson() {
        /** @type {?} */
        let retVal = {};
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
            this.attributesName.forEach(name => {
                retVal[name] = this.getAttribute(name);
            });
        }
        /** @type {?} */
        let children;
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
                children = /** @type {?} */ (_.orderBy(children, (child) => {
                    return child["originalColumnIndex"];
                }));
            }
            retVal["children"] = children.map(child => child.toJson());
        }
        if (this.customAttributes)
            retVal['customAttributes'] = this.customAttributes;
        return retVal;
    }
    /**
     * @return {?}
     */
    isView() {
        return false;
    }
    /**
     * @return {?}
     */
    isDialog() {
        return false;
    }
    /**
     * @return {?}
     */
    isDynamicView() {
        return false;
    }
    /**
     * @return {?}
     */
    isFauxElement() {
        return true;
    }
    /**
     * @param {?} chk
     * @return {?}
     */
    setChecked(chk) {
        if (typeof chk === "boolean") {
            chk = chk + "";
        }
        this.setAttribute("checked", chk);
    }
    /**
     * Search for child using the provided function
     *
     * @param {?} fn function to execute while iterating child lookup
     * @return {?}
     */
    findChildByFn(fn) {
        /** @type {?} */
        let retVal;
        /** @type {?} */
        let children = this.concatNode(/** @type {?} */ ([]), this);
        while (children.length > 0) {
            /** @type {?} */
            const child = children.pop();
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
    }
    /**
     * Concate {fromNode} to {toNode}
     *
     * @param {?} toNode array of nodes to be concated to
     * @param {?} fromNode node to be concated from
     * @return {?} the concated node
     */
    concatNode(toNode, fromNode) {
        /** @type {?} */
        let retVal = toNode;
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
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    beforeAttributeRemoved(evt) {
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    beforeAttributeSet(evt) {
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onAttributeRemoved(evt) {
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onAttributeSet(evt) {
        if (evt.getName() === "sortValue" && this.htmlElement != null) {
            this.updateSortValue(evt.getNewValue());
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    updateSortValue(value) {
        if (this.renderer != null) {
            this.renderer.setAttribute(this.htmlElement, "data-text", value);
            if (this.component != null && this.component.getParent() != null && typeof (/** @type {?} */ (this.component.getParent())).refreshTableSorterCache === "function") {
                (/** @type {?} */ (this.component.getParent())).refreshTableSorterCache();
            }
        }
    }
    /**
     * @return {?}
     */
    isDraggable() {
        return this.getAttribute("draggable") === "true";
    }
    /**
     * @return {?}
     */
    applyDraggable() {
        if (this.isDraggable() && this.draggableApplied !== true && this.htmlElement != null) {
            jQuery(this.htmlElement).draggable({
                appendTo: "body",
                addClasses: false,
                helper: () => {
                    /** @type {?} */
                    const helper = document.createElement("div");
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
                start: () => {
                    /** @type {?} */
                    const clientEvent = new ClientEvent(this, event);
                    clientEvent.setParameter("dragId", this.parentTableId);
                    if (AppUtils.customizeClientEvent != null) {
                        AppUtils.customizeClientEvent(this, clientEvent);
                    }
                    if (this.parentScreenId != null) {
                        clientEvent.setParameter("screenId", this.parentScreenId);
                    }
                    this.sessionService.getEventHandler().setClientEvent(clientEvent);
                }
            });
        }
        this.draggableApplied = true;
    }
    /**
     * @return {?}
     */
    isDraggableApplied() {
        return this.draggableApplied;
    }
    /**
     * rowなどBaseComponentとして存在しないwrapperにcustomAttributesを設定します。
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setCustomAttribute(name, value) {
        if (!this.customAttributes)
            this.customAttributes = {};
        this.customAttributes[name] = value;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC1lbGVtZW50LXdyYXBwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXZpZnktY29yZS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL3RyZWUtdGFibGUvaHRtbC1lbGVtZW50LXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUd2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUsxRCxNQUFNOzs7Ozs7OztJQTBESixZQUFvQixRQUFtQixFQUFFLElBQVksRUFBVSxjQUE4QixFQUFFLFVBQW1CLEtBQUssRUFBRSxjQUFnQyxJQUFJO1FBQXpJLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBd0IsbUJBQWMsR0FBZCxjQUFjLENBQWdCOzswQkFyQ3JELEVBQUU7Z0NBd0JRLElBQUk7UUFjcEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFdEIsSUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1NBQy9CO2FBQU0sSUFBSSxJQUFJLEtBQUssTUFBTSxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJ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QUFDLGNBQWMsSUFBSSxJQUFJLEVBQUU7d0JBQy9CLFdBQVcsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztxQkFDM0Q7b0JBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ25FO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0tBQzlCOzs7O0lBRUQsa0JBQWtCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQzlCOzs7Ozs7O0lBTUQsa0JBQWtCLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDekMsSUFBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0I7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ3JDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSBcIi4uL2Jhc2UvYmFzZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFJlbmRlcmVyMiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gXCIuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZVwiO1xuaW1wb3J0IHsgQ2xpZW50RXZlbnQgfSBmcm9tIFwiLi4vZXZlbnQtaGFuZGxlci9jbGllbnQtZXZlbnRcIjtcbmltcG9ydCB7IEFwcFV0aWxzIH0gZnJvbSBcIi4uL2Jhc2UvYXBwLXV0aWxzXCI7XG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IExhYmVsQ29tcG9uZW50IH0gZnJvbSBcIi4uL2xhYmVsL2xhYmVsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQXR0cmlidXRlQ2hhbmdlTGlzdGVuZXIgfSBmcm9tIFwiLi4vYmFzZS9hdHRyaWJ1dGUtY2hhbmdlLWxpc3RlbmVyXCI7XG5pbXBvcnQgeyBBdHRyaWJ1dGVDaGFuZ2VFdmVudCB9IGZyb20gXCIuLi9iYXNlL2F0dHJpYnV0ZS1jaGFuZ2UtZXZlbnRcIjtcbmRlY2xhcmUgdmFyIGpRdWVyeTogYW55O1xuXG5leHBvcnQgY2xhc3MgSFRNTEVsZW1lbnRXcmFwcGVyIGltcGxlbWVudHMgQXR0cmlidXRlQ2hhbmdlTGlzdGVuZXIge1xuICAvLyBhdHRyaWJ1dGVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xuICAvLyB0ZXh0OiBhbnk7XG4gIC8vIGRyYWdnYWJsZTogc3RyaW5nO1xuICAvLyBjc3NDbGFzczogc3RyaW5nO1xuICAvLyBvbkRvdWJsZUNsaWNrOiBzdHJpbmc7XG4gIC8vIG9uQ29udGV4dE1lbnU6IHN0cmluZztcbiAgLy8gb25Nb3VzZURvd246IHN0cmluZztcbiAgLy8gcG9wdXBOYW1lOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBwYXJlbnQ6IEhUTUxFbGVtZW50V3JhcHBlcjtcbiAgcHJpdmF0ZSBsb2NhbE5hbWU6IHN0cmluZztcbiAgcGFyZW50VGFibGVJZDogc3RyaW5nO1xuICBwYXJlbnRTY3JlZW5JZDogc3RyaW5nO1xuICBwYXJlbnRUYWJsZTogYW55O1xuXG4gIF91bmlxdWVJZDogc3RyaW5nO1xuICBodG1sRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIGNvbXBvbmVudDogQmFzZUNvbXBvbmVudDtcblxuICAvL2ZvciBub25lIGR5bmFtaWMgc3R1ZlxuICBjaGlsZE5vZGVzOiBBcnJheTxIVE1MRWxlbWVudFdyYXBwZXI+ID0gW107XG5cbiAgLy9mb3IgdHJlZSB0YWJsZVxuICBkeW5hbWljQ2hpbGROb2RlczogQXJyYXk8SFRNTEVsZW1lbnRXcmFwcGVyPjtcblxuICBvbkNvbnRleHRIYW5kbGVyOiAoZXZlbnQpID0+IGFueTtcbiAgb25Nb3VzZURvd25IYW5kbGVyOiAoZXZlbnQpID0+IGFueTtcbiAgb25Eb3VibGVDbGlja0hhbmRsZXI6IChldmVudCkgPT4gYW55O1xuXG4gIC8vaW5kaWNhdGUgdGhhdCBjb21wb25lbnQgY3JlYXRlIGR5bmFtaWNhbGx5ICh2aWEgY3JlYXRlRWxlbWVudClcbiAgcHJpdmF0ZSBfZHluYW1pY0NvbXBvbmVudDogYm9vbGVhbjtcblxuICBwb3B1cE5hbWU6IHN0cmluZztcbiAgY29udGV4dE1lbnVBY3Rpb246IHN0cmluZyB8ICgoYW55KSA9PiBhbnkpO1xuICBtb3VzZURvd25BY3Rpb246IHN0cmluZyB8ICgoKSA9PiBhbnkpO1xuICBkb3VibGVDbGlja0FjdGlvbjogc3RyaW5nIHwgKCgpID0+IGFueSk7XG4gIHJvd051bWJlcjogbnVtYmVyO1xuICBleHBhbmRlZDogc3RyaW5nO1xuXG4gIHByaXZhdGUgY2hpbGRSb3dzOiBBcnJheTxIVE1MRWxlbWVudFdyYXBwZXI+O1xuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRJZCgpO1xuICB9XG4gIHByaXZhdGUgY3VzdG9tQXR0cmlidXRlczoge1tuYW1lOiBzdHJpbmddOiBhbnl9ID0gbnVsbDtcbiAgcHJpdmF0ZSBhdHRyaWJ1dGVzTmFtZTogQXJyYXk8c3RyaW5nPjtcblxuICBwcml2YXRlIGZhdXhFbGVtZW50QXR0cmlidXRlczogTWFwPHN0cmluZywgc3RyaW5nPjtcblxuICBwcml2YXRlIGRyYWdnYWJsZUFwcGxpZWQ6IGJvb2xlYW47XG5cbiAgY3VzdG9tRGF0YTogYW55O1xuXG4gIHN0YXRpYyBjcmVhdGVWaXJ0dWFsRWxlbWVudCh0eXBlOiBzdHJpbmcpOiBIVE1MRWxlbWVudFdyYXBwZXIge1xuICAgIHJldHVybiBuZXcgSFRNTEVsZW1lbnRXcmFwcGVyKG51bGwsIHR5cGUsIG51bGwsIHRydWUpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCB0eXBlOiBzdHJpbmcsIHByaXZhdGUgc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlLCB2aXJ0dWFsOiBib29sZWFuID0gZmFsc2UsIGRvY0ZyYWdtZW50OiBEb2N1bWVudEZyYWdtZW50ID0gbnVsbCkge1xuICAgIHRoaXMuX3VuaXF1ZUlkID0gQmFzZUNvbXBvbmVudC5nZW5lcmF0ZVVuaXF1ZUlkKHR5cGUpO1xuXG4gICAgdGhpcy5sb2NhbE5hbWUgPSB0eXBlO1xuXG4gICAgaWYgKHR5cGUgPT09IFwicm93XCIgJiYgdmlydHVhbCAhPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5odG1sRWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgICAgdGhpcy5fZHluYW1pY0NvbXBvbmVudCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcImNlbGxcIiAmJiB2aXJ0dWFsICE9PSB0cnVlKSB7XG4gICAgICB0aGlzLmh0bWxFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgICB0aGlzLl9keW5hbWljQ29tcG9uZW50ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwibGFiZWxcIiB8fCB0eXBlID09PSBcIm1lbnVJdGVtXCIgfHwgdmlydHVhbCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5mYXV4RWxlbWVudEF0dHJpYnV0ZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCB0aGlzLl91bmlxdWVJZCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2R5bmFtaWNDb21wb25lbnQgPT09IHRydWUpIHtcbiAgICAgIGlmICh0aGlzLmh0bWxFbGVtZW50IGluc3RhbmNlb2YgSFRNTFRhYmxlUm93RWxlbWVudCkge1xuICAgICAgICB0aGlzLmh0bWxFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtdHQtaWRcIiwgdGhpcy5fdW5pcXVlSWQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm9uQ29udGV4dEhhbmRsZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY2xpZW50RXZlbnQgPSBuZXcgQ2xpZW50RXZlbnQodGhpcywgZXZlbnQpO1xuXG4gICAgICAgIGlmIChBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQodGhpcywgY2xpZW50RXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucGFyZW50U2NyZWVuSWQgIT0gbnVsbCkge1xuICAgICAgICAgIGNsaWVudEV2ZW50LnNldFBhcmFtZXRlcihcInNjcmVlbklkXCIsIHRoaXMucGFyZW50U2NyZWVuSWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXNzaW9uU2VydmljZS5nZXRFdmVudEhhbmRsZXIoKS5zZXRDbGllbnRFdmVudChjbGllbnRFdmVudCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbnRleHRNZW51QWN0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgdGhpcy5pbnZva2VNY29BY3Rpb24odGhpcy5jb250ZXh0TWVudUFjdGlvbik7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuY29udGV4dE1lbnVBY3Rpb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRoaXMuY29udGV4dE1lbnVBY3Rpb24uYXBwbHkodGhpcywgW3RoaXNdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hvd1BvcHVwTWVudShldmVudCk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmh0bWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2ZW50KSA9PiB0aGlzLm9uTW91c2VEb3duSGFuZGxlcihldmVudCksIHRydWUpO1xuICAgICAgdGhpcy5odG1sRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgKGV2ZW50KSA9PiB0aGlzLm9uRG91YmxlQ2xpY2tIYW5kbGVyKGV2ZW50KSwgdHJ1ZSk7XG5cbiAgICAgIHRoaXMub25Nb3VzZURvd25IYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlT25Nb3VzZURvd24oZXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5vbkRvdWJsZUNsaWNrSGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZURvdWJsZUNsaWNrKGV2ZW50KTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveShza2lwRGVzdHJveUNoaWxkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBpZiAodGhpcy5fZHluYW1pY0NvbXBvbmVudCA9PT0gdHJ1ZSAmJiB0aGlzLmh0bWxFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuaHRtbEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIHRoaXMub25Db250ZXh0SGFuZGxlciwgdHJ1ZSk7XG4gICAgICB0aGlzLmh0bWxFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5vbk1vdXNlRG93bkhhbmRsZXIsIHRydWUpO1xuICAgICAgdGhpcy5odG1sRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgdGhpcy5vbkRvdWJsZUNsaWNrSGFuZGxlciwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2hpbGROb2RlcyAhPSBudWxsICYmIHNraXBEZXN0cm95Q2hpbGQgIT09IHRydWUpIHtcbiAgICAgIGxldCBzdGFjayA9IHRoaXMuY2hpbGROb2RlcztcblxuICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YWNrLnBvcCgpO1xuXG4gICAgICAgIGlmIChub2RlLmNoaWxkTm9kZXMgIT0gbnVsbCkge1xuICAgICAgICAgIHN0YWNrID0gc3RhY2suY29uY2F0KG5vZGUuY2hpbGROb2Rlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLmRlc3Ryb3kodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZHluYW1pY0NoaWxkTm9kZXMgIT0gbnVsbCAmJiBza2lwRGVzdHJveUNoaWxkICE9PSB0cnVlKSB7XG4gICAgICBsZXQgc3RhY2sgPSB0aGlzLmR5bmFtaWNDaGlsZE5vZGVzO1xuXG4gICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBub2RlID0gc3RhY2sucG9wKCk7XG5cbiAgICAgICAgaWYgKG5vZGUuZHluYW1pY0NoaWxkTm9kZXMgIT0gbnVsbCkge1xuICAgICAgICAgIHN0YWNrID0gc3RhY2suY29uY2F0KG5vZGUuZHluYW1pY0NoaWxkTm9kZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5kZXN0cm95KHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmNoaWxkUm93cyAhPSBudWxsICYmIHNraXBEZXN0cm95Q2hpbGQgIT09IHRydWUpIHtcbiAgICAgIGxldCBzdGFjayA9IHRoaXMuY2hpbGRSb3dzO1xuXG4gICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBub2RlID0gc3RhY2sucG9wKCk7XG5cbiAgICAgICAgaWYgKG5vZGUuY2hpbGRSb3dzICE9IG51bGwpIHtcbiAgICAgICAgICBzdGFjayA9IHN0YWNrLmNvbmNhdChub2RlLmNoaWxkUm93cyk7XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLmRlc3Ryb3kodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29tcG9uZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50LnJlbW92ZUF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVyKHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMuaHRtbEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLl91bmlxdWVJZCA9IG51bGw7XG4gICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuICAgIHRoaXMuY2hpbGROb2RlcyA9IG51bGw7XG4gICAgdGhpcy5hdHRyaWJ1dGVzTmFtZSA9IG51bGw7XG4gICAgdGhpcy5mYXV4RWxlbWVudEF0dHJpYnV0ZXMgPSBudWxsO1xuICAgIHRoaXMuY2hpbGRSb3dzID0gbnVsbDtcbiAgfVxuXG4gIHNldFRleHQodGV4dDogYW55KSB7XG4gICAgaWYgKHRoaXMuX2R5bmFtaWNDb21wb25lbnQgPT09IHRydWUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5odG1sRWxlbWVudCwgXCJpbm5lckhUTUxcIiwgdGV4dCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbXBvbmVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudC5zZXRUZXh0KHRleHQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYXV4RWxlbWVudEF0dHJpYnV0ZXMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5mYXV4RWxlbWVudEF0dHJpYnV0ZXMuc2V0KFwidGV4dFwiLCB0ZXh0KTtcbiAgICB9XG4gIH1cblxuICBzZXRGb250U2l6ZShzaXplOiBhbnkpIHtcbiAgICBpZiAodGhpcy5fZHluYW1pY0NvbXBvbmVudCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmh0bWxFbGVtZW50LCBcImZvbnQtc2l6ZVwiLCBzaXplICsgXCJweFwiKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29tcG9uZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50LnNldEZvbnRTaXplKHNpemUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYXV4RWxlbWVudEF0dHJpYnV0ZXMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5mYXV4RWxlbWVudEF0dHJpYnV0ZXMuc2V0KFwiZm9udFNpemVcIiwgc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0Rm9udEJvbGQoYm9sZDogYW55KSB7XG4gICAgaWYgKHRoaXMuX2R5bmFtaWNDb21wb25lbnQgPT09IHRydWUpIHtcbiAgICAgIGlmIChib2xkID09PSBcInRydWVcIiB8fCBib2xkID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5odG1sRWxlbWVudCwgXCJmb250LXdlaWdodFwiLCBcImJvbGRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaHRtbEVsZW1lbnQsIFwiZm9udC13ZWlnaHRcIiwgXCJub3JtYWxcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbXBvbmVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudC5zZXRGb250Qm9sZChib2xkKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzLnNldChcImZvbnRCb2xkXCIsIGJvbGQpO1xuICAgIH1cbiAgfVxuXG4gIHNldENsYXNzKGNzczogc3RyaW5nKSB7XG4gICAgaWYgKGNzcyAhPSBudWxsICYmIGNzcy5pbmRleE9mKFwiLlwiKSA+PSAwKSB7XG4gICAgICBjb25zdCB0ZW1wID0gY3NzLnNwbGl0KFwiXFwuXCIpO1xuXG4gICAgICBsZXQgY3NzQ2xhc3MgPSB0ZW1wLmpvaW4oXCItXCIpO1xuXG4gICAgICBpZiAodGVtcFswXSA9PT0gXCJcIikge1xuICAgICAgICBjc3MgPSBjc3NDbGFzcy5zdWJzdHJpbmcoMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmh0bWxFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuaHRtbEVsZW1lbnQsIFwiY2xhc3NcIiwgY3NzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29tcG9uZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50LmFkZENzc0NsYXNzKGNzcyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZhdXhFbGVtZW50QXR0cmlidXRlcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNzcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCBhIGNoaWxkIHJvdyBhdCBzcGVjaWZpYyBsb2NhdGlvblxuICAgKiBAcGFyYW0gaWR4XG4gICAqIEBwYXJhbSBjaGlsZFxuICAgKi9cbiAgaW5zZXJ0Q2hpbGRSb3dBdChpZHg6IG51bWJlciwgY2hpbGQ6IEhUTUxFbGVtZW50V3JhcHBlcikge1xuICAgIGlmIChjaGlsZC5odG1sRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxUYWJsZVJvd0VsZW1lbnQgIT09IHRydWUgJiYgdGhpcy5fZHluYW1pY0NvbXBvbmVudCA9PT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbnNlcnRpb24sIG9ubHkgSFRNTFRhYmxlUm93RWxlbWVudCBpcyBhbGxvd2VkXCIpO1xuICAgIH1cblxuICAgIGlmIChpZHggPiAwICYmICh0aGlzLmNoaWxkUm93cyA9PSBudWxsIHx8IHRoaXMuY2hpbGRSb3dzLmxlbmd0aCA8PSBpZHgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gaW5zZXJ0IGNoaWxkIHJvdyBhdCB0aGlzIHNwZWNpZmljIGxvY2F0aW9uIChpbmRleCBvdmVyZmxvdylcIik7XG4gICAgfSBlbHNlIGlmIChpZHggPj0gMCAmJiAodGhpcy5jaGlsZFJvd3MgIT0gbnVsbCAmJiB0aGlzLmNoaWxkUm93cy5sZW5ndGggPiBpZHgpKSB7XG4gICAgICAvL3RyYWNrIGNoaWxkIHJvd3Mgc28gd2UgY2FuIHVzZWQgaW5zZXJ0Q2hpbGRSb3dBdFxuICAgICAgaWYgKHRoaXMuY2hpbGRSb3dzID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5jaGlsZFJvd3MgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucGFyZW50VGFibGUudXNlRG9jRnJhZ21lbnQgPT09IHRydWUpIHtcbiAgICAgICAgKHRoaXMucGFyZW50VGFibGUuX2JvZHlGcmFnbWVudCBhcyBEb2N1bWVudEZyYWdtZW50KS5pbnNlcnRCZWZvcmUoY2hpbGQuaHRtbEVsZW1lbnQsIHRoaXMuY2hpbGRSb3dzW2lkeF0uaHRtbEVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5pbnNlcnRCZWZvcmUodGhpcy5wYXJlbnRUYWJsZS50YWJsZUJvZHkubmF0aXZlRWxlbWVudCwgY2hpbGQuaHRtbEVsZW1lbnQsIHRoaXMuY2hpbGRSb3dzW2lkeF0uaHRtbEVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNoaWxkUm93cy5zcGxpY2UoaWR4LCAwLCBjaGlsZCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoY2hpbGQuaHRtbEVsZW1lbnQsIFwiZGF0YS10dC1wYXJlbnQtaWRcIiwgdGhpcy5fdW5pcXVlSWQpO1xuXG4gICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmQgYSBjaGlsZCB0byB0aGlzIGVsZW1lbnQuIElmIHRoaXMgaXMgYSByb3cgYW5kIHdlIGFwcGVuZCBhIHJvdywgc2V0IHtAIGFwcGVuZFRvVGFibGV9IHRvIHRydWVcbiAgICogd2lsbCBhbHNvIGFwcGVuZCB0aGUgYWN0dWFsIHRhYmxlIHJvdyAodHIpIHRvIHRoZSB0YWJsZS5cbiAgICpcbiAgICogQHBhcmFtIGNoaWxkIGNoaWxkIHRvIGJlIGFwcGVuZGVkXG4gICAqIEBwYXJhbSBhcHBlbmRUb1RhYmxlXG4gICAqL1xuICBhcHBlbmRDaGlsZChjaGlsZDogSFRNTEVsZW1lbnRXcmFwcGVyLCBhcHBlbmRUb1RhYmxlSWZSb3c6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLl9keW5hbWljQ29tcG9uZW50ID09PSB0cnVlKSB7XG4gICAgICBpZiAoY2hpbGQuaHRtbEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGFibGVSb3dFbGVtZW50KSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGNoaWxkLmh0bWxFbGVtZW50LCBcImRhdGEtdHQtcGFyZW50LWlkXCIsIHRoaXMuX3VuaXF1ZUlkKTtcblxuICAgICAgICBpZiAoYXBwZW5kVG9UYWJsZUlmUm93ID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHRoaXMucGFyZW50VGFibGUudXNlRG9jRnJhZ21lbnQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICh0aGlzLnBhcmVudFRhYmxlLl9ib2R5RnJhZ21lbnQgYXMgRG9jdW1lbnRGcmFnbWVudCkuYXBwZW5kQ2hpbGQoY2hpbGQuaHRtbEVsZW1lbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMucGFyZW50VGFibGUudGFibGVCb2R5Lm5hdGl2ZUVsZW1lbnQsIGNoaWxkLmh0bWxFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3RyYWNrIGNoaWxkIHJvd3Mgc28gd2UgY2FuIHVzZWQgaW5zZXJ0Q2hpbGRSb3dBdFxuICAgICAgICBpZiAodGhpcy5jaGlsZFJvd3MgPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuY2hpbGRSb3dzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoaWxkUm93cy5wdXNoKGNoaWxkKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hpbGQuaHRtbEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGFibGVDZWxsRWxlbWVudCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuaHRtbEVsZW1lbnQsIGNoaWxkLmh0bWxFbGVtZW50KTtcblxuICAgICAgICBpZiAodGhpcy5keW5hbWljQ2hpbGROb2RlcyA9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5keW5hbWljQ2hpbGROb2RlcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5keW5hbWljQ2hpbGROb2Rlcy5wdXNoKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGlsZE5vZGVzLnB1c2goY2hpbGQpO1xuICAgIH1cblxuICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gIH1cblxuICBhcHBlbmRDdXN0b21BdHRyaWJ1dGVzKGN1c3Q6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9KSB7XG4gICAgaWYgKGN1c3QgIT0gbnVsbCkge1xuICAgICAgY29uc3Qga2V5cyA9IF8ua2V5cyhjdXN0KTtcblxuICAgICAgZm9yIChsZXQga2V5IG9mIGtleXMpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoa2V5LCBjdXN0W2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vTlNEIHdpbGwgb3ZlcnJpZGUgdGhpcywgYWRkZWQgdG8gZml4IGVycm9yXG4gIC8vIHNldEN1c3RvbUF0dHJpYnV0ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgLy8gICB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIC8vIH1cblxuICBzZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYobmFtZSA9PT0gJ3NlbGVjdGVkJyAmJiB0aGlzLmxvY2FsTmFtZSA9PSAncm93Jyl7XG4gICAgICBpZih0aGlzLnBhcmVudFRhYmxlICE9IG51bGwpe1xuICAgICAgICBpZih2YWx1ZSA9PSAndHJ1ZScpXG4gICAgICAgICAgdGhpcy5wYXJlbnRUYWJsZS5zZWxlY3RSb3codGhpcywgdHJ1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0aGlzLnBhcmVudFRhYmxlLnNlbGVjdFJvdyh0aGlzLCBmYWxzZSk7XG4gICAgICAgIHRoaXMucGFyZW50VGFibGUubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChuYW1lID09PSBcImV4cGFuZGVkXCIpIHtcbiAgICAgIHRoaXMuZXhwYW5kTm9kZSh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbXBvbmVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgdGhpcy50cmFja0F0dHJpYnV0ZU5hbWUobmFtZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmh0bWxFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIGlmIChuYW1lID09PSBcImlzTG9ja2VkQ29sdW1uXCIpIHtcbiAgICAgICAgaWYgKHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzID09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmZhdXhFbGVtZW50QXR0cmlidXRlcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZhdXhFbGVtZW50QXR0cmlidXRlcy5zZXQobmFtZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5odG1sRWxlbWVudCwgbmFtZSwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRyYWNrQXR0cmlidXRlTmFtZShuYW1lKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzLnNldChuYW1lLCB2YWx1ZSk7XG4gICAgICB0aGlzLnRyYWNrQXR0cmlidXRlTmFtZShuYW1lKTtcbiAgICB9XG4gIH1cblxuICBnZXRBdHRyaWJ1dGUobmFtZTogYW55LCBza2lwUXVlcnlET01JZk5vdEV4aXN0czogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgaWYgKG5hbWUgPT09IFwiZXhwYW5kZWRcIikge1xuICAgICAgcmV0dXJuIHRoaXMuZXhwYW5kZWQgPT09IFwidHJ1ZVwiID8gXCJ0cnVlXCIgOiBcImZhbHNlXCI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29tcG9uZW50ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXRBdHRyaWJ1dGUobmFtZSwgc2tpcFF1ZXJ5RE9NSWZOb3RFeGlzdHMpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5odG1sRWxlbWVudCAhPSBudWxsICYmIHNraXBRdWVyeURPTUlmTm90RXhpc3RzICE9PSB0cnVlKSB7XG4gICAgICBpZiAobmFtZSA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgICAgbGV0IHRleHQgPSB0aGlzLmh0bWxFbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKTtcblxuICAgICAgICBpZiAodGV4dCA9PSBudWxsKSB7XG4gICAgICAgICAgdGV4dCA9IHRoaXMuaHRtbEVsZW1lbnQuaW5uZXJUZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRleHQgPT0gbnVsbCB8fCB0ZXh0ID09PSBcIlwiKSB7XG4gICAgICAgICAgdGV4dCA9ICh0aGlzLmh0bWxFbGVtZW50IGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50KS50ZXh0Q29udGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHRleHQgPSB0ZXh0LnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBcImlzTG9ja2VkQ29sdW1uXCIgJiYgdGhpcy5mYXV4RWxlbWVudEF0dHJpYnV0ZXMgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mYXV4RWxlbWVudEF0dHJpYnV0ZXMuZ2V0KG5hbWUpO1xuICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBcImlzTG9ja2VkQ29sdW1uXCIpIHtcbiAgICAgICAgcmV0dXJuIFwiZmFsc2VcIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuaHRtbEVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mYXV4RWxlbWVudEF0dHJpYnV0ZXMgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmF1eEVsZW1lbnRBdHRyaWJ1dGVzLmdldChuYW1lKTtcbiAgICB9XG4gIH1cblxuICBnZXRUZXh0KCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcInRleHRcIik7XG4gIH1cblxuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgfVxuXG4gIHNldERyYWdnYWJsZShkcmFnZ2FibGU6IHN0cmluZykge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIGRyYWdnYWJsZSk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlID09IFwidHJ1ZVwiKSB7XG4gICAgICB0aGlzLmFwcGx5RHJhZ2dhYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RXhwYW5kZWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJleHBhbmRlZFwiKTtcbiAgfVxuXG4gIHNldEV4cGFuZGVkKHN0cjogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJleHBhbmRlZFwiLCBzdHIpO1xuICB9XG5cbiAgc2V0T25Db250ZXh0TWVudShhY3Rpb246IHN0cmluZyB8ICgoKSA9PiBhbnkpKSB7XG4gICAgaWYgKHRoaXMuaHRtbEVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jb250ZXh0TWVudUFjdGlvbiA9IGFjdGlvbjtcbiAgICAgIHRoaXMuaHRtbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIChldmVudCkgPT4gdGhpcy5vbkNvbnRleHRIYW5kbGVyKGV2ZW50KSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0T25Nb3VzZURvd24oYWN0aW9uOiBzdHJpbmcgfCAoKCkgPT4gYW55KSkge1xuICAgIHRoaXMubW91c2VEb3duQWN0aW9uID0gYWN0aW9uO1xuICB9XG5cbiAgc2V0T25Eb3VibGVDbGljayhhY3Rpb246IHN0cmluZyB8ICgoKSA9PiBhbnkpKSB7XG4gICAgdGhpcy5kb3VibGVDbGlja0FjdGlvbiA9IGFjdGlvbjtcbiAgfVxuXG4gIHNldFBvcHVwKHBvcHVwTmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5wb3B1cE5hbWUgPSBwb3B1cE5hbWUucmVwbGFjZShcIiNcIiwgXCJcIik7XG4gIH1cblxuICBnZXRQYXJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50O1xuICB9XG5cbiAgZ2V0TG9jYWxOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLmxvY2FsTmFtZTtcbiAgfVxuXG4gIHNldExvY2FsZU5hbWUobG9jYWxOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmxvY2FsTmFtZSA9IGxvY2FsTmFtZTtcbiAgfVxuXG4gIGdldENoaWxkcmVuKCkge1xuICAgIGxldCBjaGlsZHJlbjogQXJyYXk8SFRNTEVsZW1lbnRXcmFwcGVyPiA9IHRoaXMuY2hpbGROb2RlcztcblxuICAgIGlmICgoY2hpbGRyZW4gPT0gbnVsbCB8fCBjaGlsZHJlbi5sZW5ndGggPT09IDApICYmICh0aGlzLmR5bmFtaWNDaGlsZE5vZGVzICE9IG51bGwpKSB7XG4gICAgICBjaGlsZHJlbiA9IHRoaXMuZHluYW1pY0NoaWxkTm9kZXM7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRMb2NhbE5hbWUoKSA9PT0gXCJyb3dcIiAmJlxuICAgICAgY2hpbGRyZW4gIT0gbnVsbCAmJlxuICAgICAgdGhpcy5wYXJlbnRUYWJsZSAhPSBudWxsICYmXG4gICAgICB0aGlzLnBhcmVudFRhYmxlLmdldExvY2FsTmFtZSgpID09PSBcInRhYmxlXCIgJiZcbiAgICAgIHRoaXMucGFyZW50VGFibGUuY29sdW1uc0hhc0JlZW5Td2FwcGVkID09PSB0cnVlXG4gICAgKSB7XG4gICAgICBjaGlsZHJlbiA9IF8ub3JkZXJCeShjaGlsZHJlbiwgKGNoaWxkOiBIVE1MRWxlbWVudFdyYXBwZXIpPT4ge1xuICAgICAgICByZXR1cm4gY2hpbGRbXCJvcmlnaW5hbENvbHVtbkluZGV4XCJdO1xuICAgICAgfSkgYXMgYW55O1xuICAgIH1cblxuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIGdldENoaWxkQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzICE9IG51bGwgPyB0aGlzLmNoaWxkTm9kZXMubGVuZ3RoIDogMDtcbiAgfVxuXG4gIGdldENoaWxkQXQoaWR4OiBudW1iZXIpOiBIVE1MRWxlbWVudFdyYXBwZXIge1xuICAgIHJldHVybiB0aGlzLmdldENoaWxkQ291bnQoKSA+IGlkeCA/IHRoaXMuY2hpbGROb2Rlc1tpZHhdIDogbnVsbDtcbiAgfVxuXG4gIHNldENvbXBvbmVudChjb21wb25lbnQ6IEJhc2VDb21wb25lbnQsIGZyb21WaXJ0dWFsVGFibGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgIHRoaXMuY29tcG9uZW50LnBhcmVudFRhYmxlUm93ID0gdGhpcy5wYXJlbnQ7XG5cbiAgICBpZiAoY29tcG9uZW50ICE9IG51bGwgJiYgZnJvbVZpcnR1YWxUYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgY29tcG9uZW50LmFkZEF0dHJpYnV0ZUNoYW5nZUxpc3RlbmVyKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW52b2tlTWNvQWN0aW9uKGFjdGlvbjogc3RyaW5nIHwgKCgpID0+IGFueSkpIHtcbiAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBhY3Rpb24oKTtcbiAgICB9IGVsc2UgaWYgKGFjdGlvbi5pbmRleE9mKFwibWNvOi8vXCIpID09PSAwKSB7XG4gICAgICBjb25zdCBtY29OYW1lID0gYWN0aW9uLnN1YnN0cmluZyg2LCBhY3Rpb24uaW5kZXhPZihcIi5cIikpO1xuICAgICAgY29uc3QgbWV0aG9kTmFtZSA9IGFjdGlvbi5zdWJzdHJpbmcoYWN0aW9uLmluZGV4T2YoXCIuXCIpICsgMSwgYWN0aW9uLmluZGV4T2YoXCIoXCIpKTtcbiAgICAgIGNvbnN0IGFyZyA9IGFjdGlvbi5zdWJzdHJpbmcoYWN0aW9uLmluZGV4T2YoXCIoXCIpICsgMSwgYWN0aW9uLmluZGV4T2YoXCIpXCIpKTtcblxuICAgICAgaWYgKGFyZyAhPSBudWxsICYmIGFyZy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IG1jbyA9IHRoaXMuc2Vzc2lvblNlcnZpY2UuZ2V0TWNvQ29udGFpbmVyKCkuZ2V0TWNvKG1jb05hbWUpO1xuXG4gICAgICAgIGlmIChtY28gIT0gbnVsbCkge1xuICAgICAgICAgIGlmIChhcmcgPT09IFwidGhpc1wiKSB7XG4gICAgICAgICAgICBtY29bbWV0aG9kTmFtZV0uYXBwbHkobWNvLCBbdGhpc10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtY29bbWV0aG9kTmFtZV0uYXBwbHkobWNvLCBbYXJnXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZXhlY3V0ZSBNQ08gYWN0aW9uLCBtY28gbm90IGZvdW5kOiBcIiArIG1jb05hbWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtY28gPSB0aGlzLnNlc3Npb25TZXJ2aWNlLmdldE1jb0NvbnRhaW5lcigpLmdldE1jbyhtY29OYW1lKTtcblxuICAgICAgICBpZiAobWNvICE9IG51bGwpIHtcbiAgICAgICAgICBtY29bbWV0aG9kTmFtZV0uYXBwbHkobWNvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGV4ZWN1dGUgTUNPIGFjdGlvbiwgbWNvIG5vdCBmb3VuZDogXCIgKyBtY29OYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldENvbXBvbmVudCgpOiBCYXNlQ29tcG9uZW50IHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnQ7XG4gIH1cblxuICBwcml2YXRlIHNob3dQb3B1cE1lbnUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLnNldE1vdXNlUG9zaXRpb24oZXZlbnQpO1xuXG4gICAgaWYgKHRoaXMucG9wdXBOYW1lICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGNvbnRleHRNZW51ID0gdGhpcy5zZXNzaW9uU2VydmljZS5zaG93Q29udGV4dE1lbnUodGhpcy5wb3B1cE5hbWUpO1xuXG4gICAgICBpZiAoY29udGV4dE1lbnUgPT09IHRydWUpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gY29udGV4dE1lbnUuc2hvdyh0aGlzLmh0bWxFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjbGllbnRFdmVudCA9IG5ldyBDbGllbnRFdmVudCh0aGlzLCBldmVudCk7XG5cbiAgICBpZiAoQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQgIT0gbnVsbCkge1xuICAgICAgQXBwVXRpbHMuY3VzdG9taXplQ2xpZW50RXZlbnQodGhpcywgY2xpZW50RXZlbnQpO1xuICAgIH1cblxuICAgIGNsaWVudEV2ZW50LnNldFBhcmFtZXRlcihcInNjcmVlbklkXCIsIHRoaXMucGFyZW50U2NyZWVuSWQpO1xuXG4gICAgdGhpcy5zZXNzaW9uU2VydmljZS5nZXRFdmVudEhhbmRsZXIoKS5zZXRDbGllbnRFdmVudChjbGllbnRFdmVudCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZU9uTW91c2VEb3duKGV2ZW50KSB7XG4gICAgaWYodGhpcy5wYXJlbnRUYWJsZSAhPSBudWxsKXtcbiAgICAgIGxldCB0YWJsZSA9IHRoaXMucGFyZW50VGFibGUuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgbGV0IHRkczogTm9kZUxpc3QgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAodGRzW2ldIGFzIGFueSkuc3R5bGUuY29sb3IgPSAnJztcbiAgICAgIH1cblxuICAgICAgdGRzID0gdGhpcy5odG1sRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgKHRkc1tpXSBhcyBhbnkpLnN0eWxlLmNvbG9yID0gJ2JsdWUnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLm1vdXNlRG93bkFjdGlvbiAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjbGllbnRFdmVudCA9IG5ldyBDbGllbnRFdmVudCh0aGlzLCBldmVudCk7XG5cbiAgICAgIGlmIChBcHBVdGlscy5jdXN0b21pemVDbGllbnRFdmVudCAhPSBudWxsKSB7XG4gICAgICAgIEFwcFV0aWxzLmN1c3RvbWl6ZUNsaWVudEV2ZW50KHRoaXMsIGNsaWVudEV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucGFyZW50U2NyZWVuSWQgIT0gbnVsbCkge1xuICAgICAgICBjbGllbnRFdmVudC5zZXRQYXJhbWV0ZXIoXCJzY3JlZW5JZFwiLCB0aGlzLnBhcmVudFNjcmVlbklkKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXNzaW9uU2VydmljZS5nZXRFdmVudEhhbmRsZXIoKS5zZXRDbGllbnRFdmVudChjbGllbnRFdmVudCk7XG5cbiAgICAgIHRoaXMuaW52b2tlTWNvQWN0aW9uKHRoaXMubW91c2VEb3duQWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZURvdWJsZUNsaWNrKGV2ZW50KSB7XG4gICAgY29uc3QgY2xpZW50RXZlbnQgPSBuZXcgQ2xpZW50RXZlbnQodGhpcywgZXZlbnQpO1xuXG4gICAgaWYgKEFwcFV0aWxzLmN1c3RvbWl6ZUNsaWVudEV2ZW50ICE9IG51bGwpIHtcbiAgICAgIEFwcFV0aWxzLmN1c3RvbWl6ZUNsaWVudEV2ZW50KHRoaXMsIGNsaWVudEV2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXJlbnRTY3JlZW5JZCAhPSBudWxsKSB7XG4gICAgICBjbGllbnRFdmVudC5zZXRQYXJhbWV0ZXIoXCJzY3JlZW5JZFwiLCB0aGlzLnBhcmVudFNjcmVlbklkKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLmdldEV2ZW50SGFuZGxlcigpLnNldENsaWVudEV2ZW50KGNsaWVudEV2ZW50KTtcblxuICAgIGlmICh0aGlzLmRvdWJsZUNsaWNrQWN0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuaW52b2tlTWNvQWN0aW9uKHRoaXMuZG91YmxlQ2xpY2tBY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIGV4cGFuZE5vZGUoaXNFeHBhbmRlZDogYm9vbGVhbiB8IHN0cmluZywganVzdFVwZGF0ZUF0dHJpYnV0ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgdGhpcy5leHBhbmRlZCA9IHR5cGVvZiBpc0V4cGFuZGVkID09PSBcInN0cmluZ1wiID8gaXNFeHBhbmRlZCA6IGlzRXhwYW5kZWQgKyAnJztcblxuICAgIGlmIChqdXN0VXBkYXRlQXR0cmlidXRlICE9PSB0cnVlICYmIHRoaXMucGFyZW50VGFibGVJZCAhPSBudWxsICYmIHRoaXMucGFyZW50VGFibGVJZCAhPT0gXCJcIikge1xuICAgICAgY29uc3QganEgPSBqUXVlcnkoYCMke3RoaXMucGFyZW50VGFibGVJZH0gLmpxLXRyZWUtdGFibGVgKTtcblxuICAgICAgaWYgKGpxICE9IG51bGwpIHtcbiAgICAgICAgbGV0IG5vZGVJZDogc3RyaW5nID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXR0LWlkXCIpO1xuXG4gICAgICAgIGlmIChub2RlSWQgIT0gbnVsbCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoaXNFeHBhbmRlZCA9PT0gXCJ0cnVlXCIgfHwgaXNFeHBhbmRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBqcS50cmVldGFibGUoXCJleHBhbmROb2RlXCIsIG5vZGVJZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBqcS50cmVldGFibGUoXCJjb2xsYXBzZU5vZGVcIiwgbm9kZUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGV4cGFuZCBub2RlIGR1ZSB0byBlcnJvclwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZXhwYW5kIG5vZGUsIHRyZWUgdGFibGUgaXMgbnVsbFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyYWNrQXR0cmlidXRlTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5hdHRyaWJ1dGVzTmFtZSA9PSBudWxsKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZXNOYW1lID0gW107XG4gICAgfVxuXG4gICAgdGhpcy5hdHRyaWJ1dGVzTmFtZS5wdXNoKG5hbWUpO1xuICB9XG5cbiAgdG9Kc29uKCk6IHt9IHtcbiAgICBsZXQgcmV0VmFsID0ge307XG5cbiAgICBpZiAodGhpcy5jb21wb25lbnQgIT0gbnVsbCkge1xuICAgICAgcmV0VmFsID0gdGhpcy5jb21wb25lbnQudG9Kc29uKCk7XG5cbiAgICAgIGlmICh0aGlzLmNvbXBvbmVudCBpbnN0YW5jZW9mIExhYmVsQ29tcG9uZW50KSB7XG4gICAgICAgIHJldFZhbFtcIm54VGFnTmFtZVwiXSA9IHRoaXMuZ2V0TG9jYWxOYW1lKCk7XG4gICAgICAgIHJldFZhbFtcInRhZ05hbWVcIl0gPSB0aGlzLmdldExvY2FsTmFtZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXRWYWxbXCJueFRhZ05hbWVcIl0gPSB0aGlzLmdldExvY2FsTmFtZSgpO1xuICAgICAgcmV0VmFsW1widGFnTmFtZVwiXSA9IHRoaXMuZ2V0TG9jYWxOYW1lKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29tcG9uZW50ID09IG51bGwpIHtcbiAgICAgIHJldFZhbFtcImlkXCJdID0gdGhpcy5nZXRJZCgpIHx8IHRoaXMuX3VuaXF1ZUlkO1xuICAgICAgcmV0VmFsW1widGV4dFwiXSA9IHRoaXMuZ2V0VGV4dCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNOYW1lICE9IG51bGwpIHtcbiAgICAgIHRoaXMuYXR0cmlidXRlc05hbWUuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgcmV0VmFsW25hbWVdID0gdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvL2FueSBjaGlsZHJlbj9cbiAgICBsZXQgY2hpbGRyZW46IEFycmF5PEhUTUxFbGVtZW50V3JhcHBlcj47XG4gICAgaWYgKHRoaXMuY2hpbGROb2RlcyAhPSBudWxsICYmIHRoaXMuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjaGlsZHJlbiA9IHRoaXMuY2hpbGROb2RlcztcbiAgICB9IGVsc2UgaWYgKHRoaXMuZHluYW1pY0NoaWxkTm9kZXMgIT0gbnVsbCAmJiB0aGlzLmR5bmFtaWNDaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNoaWxkcmVuID0gdGhpcy5keW5hbWljQ2hpbGROb2RlcztcbiAgICB9XG5cbiAgICBpZiAoY2hpbGRyZW4gIT0gbnVsbCkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmdldExvY2FsTmFtZSgpID09PSBcInJvd1wiICYmXG4gICAgICAgIHRoaXMucGFyZW50VGFibGUgIT0gbnVsbCAmJlxuICAgICAgICB0aGlzLnBhcmVudFRhYmxlLmdldExvY2FsTmFtZSgpID09PSBcInRhYmxlXCIgJiZcbiAgICAgICAgdGhpcy5wYXJlbnRUYWJsZS5jb2x1bW5zSGFzQmVlblN3YXBwZWQgPT09IHRydWVcbiAgICAgICkge1xuICAgICAgICBjaGlsZHJlbiA9IF8ub3JkZXJCeShjaGlsZHJlbiwgKGNoaWxkOiBIVE1MRWxlbWVudFdyYXBwZXIpPT4ge1xuICAgICAgICAgIHJldHVybiBjaGlsZFtcIm9yaWdpbmFsQ29sdW1uSW5kZXhcIl07XG4gICAgICAgIH0pIGFzIGFueTtcbiAgICAgIH1cblxuICAgICAgcmV0VmFsW1wiY2hpbGRyZW5cIl0gPSBjaGlsZHJlbi5tYXAoY2hpbGQ9PmNoaWxkLnRvSnNvbigpKTtcbiAgICB9XG4gICAgaWYodGhpcy5jdXN0b21BdHRyaWJ1dGVzKVxuICAgICAgcmV0VmFsWydjdXN0b21BdHRyaWJ1dGVzJ10gPSB0aGlzLmN1c3RvbUF0dHJpYnV0ZXM7XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIGlzVmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0RpYWxvZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0R5bmFtaWNWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRmF1eEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzZXRDaGVja2VkKGNoazogc3RyaW5nIHwgYm9vbGVhbikge1xuICAgIGlmICh0eXBlb2YgY2hrID09PSBcImJvb2xlYW5cIikge1xuICAgICAgY2hrID0gY2hrICsgXCJcIjtcbiAgICB9XG5cbiAgICB0aGlzLnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgY2hrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggZm9yIGNoaWxkIHVzaW5nIHRoZSBwcm92aWRlZCBmdW5jdGlvblxuICAgKlxuICAgKiBAcGFyYW0gZm4gZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGlsZSBpdGVyYXRpbmcgY2hpbGQgbG9va3VwXG4gICAqL1xuICBmaW5kQ2hpbGRCeUZuKGZuOiAoZWxlbWVudDogSFRNTEVsZW1lbnRXcmFwcGVyKT0+Ym9vbGVhbikge1xuICAgIGxldCByZXRWYWw6IEhUTUxFbGVtZW50V3JhcHBlcjtcblxuICAgIGxldCBjaGlsZHJlbjogQXJyYXk8SFRNTEVsZW1lbnRXcmFwcGVyPiA9IHRoaXMuY29uY2F0Tm9kZShbXSBhcyBhbnksIHRoaXMpO1xuXG4gICAgd2hpbGUoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbi5wb3AoKTtcblxuICAgICAgaWYgKGNoaWxkICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGZuKGNoaWxkKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldFZhbCA9IGNoaWxkO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoaWxkcmVuID0gdGhpcy5jb25jYXROb2RlKGNoaWxkcmVuLCBjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmNhdGUge2Zyb21Ob2RlfSB0byB7dG9Ob2RlfVxuICAgKlxuICAgKiBAcGFyYW0gdG9Ob2RlIGFycmF5IG9mIG5vZGVzIHRvIGJlIGNvbmNhdGVkIHRvXG4gICAqIEBwYXJhbSBmcm9tTm9kZSBub2RlIHRvIGJlIGNvbmNhdGVkIGZyb21cbiAgICogQHJldHVybnMgdGhlIGNvbmNhdGVkIG5vZGVcbiAgICovXG4gIHByaXZhdGUgY29uY2F0Tm9kZSh0b05vZGU6IEFycmF5PEhUTUxFbGVtZW50V3JhcHBlcj4sIGZyb21Ob2RlOiBIVE1MRWxlbWVudFdyYXBwZXIpOiBBcnJheTxIVE1MRWxlbWVudFdyYXBwZXI+IHtcbiAgICBsZXQgcmV0VmFsID0gdG9Ob2RlO1xuXG4gICAgaWYgKGZyb21Ob2RlICE9IG51bGwpIHtcbiAgICAgIGlmIChmcm9tTm9kZS5jaGlsZE5vZGVzICE9IG51bGwpIHtcbiAgICAgICAgcmV0VmFsID0gcmV0VmFsLmNvbmNhdChmcm9tTm9kZS5jaGlsZE5vZGVzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZyb21Ob2RlLmNoaWxkUm93cyAhPSBudWxsKSB7XG4gICAgICAgIHJldFZhbCA9IHJldFZhbC5jb25jYXQoZnJvbU5vZGUuY2hpbGRSb3dzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZyb21Ob2RlLmR5bmFtaWNDaGlsZE5vZGVzICE9IG51bGwpIHtcbiAgICAgICAgcmV0VmFsID0gcmV0VmFsLmNvbmNhdChmcm9tTm9kZS5keW5hbWljQ2hpbGROb2Rlcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIC8vYXR0cmlidXRlIGNoYW5nZSBsaXN0ZW5lclxuICBfaW50ZXJuYWxJZDogc3RyaW5nO1xuXG4gIGJlZm9yZUF0dHJpYnV0ZVJlbW92ZWQoZXZ0OiBBdHRyaWJ1dGVDaGFuZ2VFdmVudCk6IHZvaWQge1xuXG4gIH1cblxuICBiZWZvcmVBdHRyaWJ1dGVTZXQoZXZ0OiBBdHRyaWJ1dGVDaGFuZ2VFdmVudCk6IHZvaWQge1xuXG4gIH1cblxuICBvbkF0dHJpYnV0ZVJlbW92ZWQoZXZ0OiBBdHRyaWJ1dGVDaGFuZ2VFdmVudCk6IHZvaWQge1xuXG4gIH1cblxuICBvbkF0dHJpYnV0ZVNldChldnQ6IEF0dHJpYnV0ZUNoYW5nZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2dC5nZXROYW1lKCkgPT09IFwic29ydFZhbHVlXCIgJiYgdGhpcy5odG1sRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnVwZGF0ZVNvcnRWYWx1ZShldnQuZ2V0TmV3VmFsdWUoKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTb3J0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5yZW5kZXJlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmh0bWxFbGVtZW50LCBcImRhdGEtdGV4dFwiLCB2YWx1ZSk7XG5cbiAgICAgIGlmICh0aGlzLmNvbXBvbmVudCAhPSBudWxsICYmIHRoaXMuY29tcG9uZW50LmdldFBhcmVudCgpICE9IG51bGwgJiYgdHlwZW9mICh0aGlzLmNvbXBvbmVudC5nZXRQYXJlbnQoKSBhcyBhbnkpLnJlZnJlc2hUYWJsZVNvcnRlckNhY2hlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgKHRoaXMuY29tcG9uZW50LmdldFBhcmVudCgpIGFzIGFueSkucmVmcmVzaFRhYmxlU29ydGVyQ2FjaGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc0RyYWdnYWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIikgPT09IFwidHJ1ZVwiO1xuICB9XG5cbiAgYXBwbHlEcmFnZ2FibGUoKSB7XG4gICAgaWYgKHRoaXMuaXNEcmFnZ2FibGUoKSAmJiB0aGlzLmRyYWdnYWJsZUFwcGxpZWQgIT09IHRydWUgJiYgdGhpcy5odG1sRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBqUXVlcnkodGhpcy5odG1sRWxlbWVudCkuZHJhZ2dhYmxlKHtcbiAgICAgICAgYXBwZW5kVG86IFwiYm9keVwiLFxuICAgICAgICBhZGRDbGFzc2VzOiBmYWxzZSxcbiAgICAgICAgaGVscGVyOiAoKT0+e1xuICAgICAgICAgIGNvbnN0IGhlbHBlcjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIGhlbHBlci5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dhYmxlLXJvdy1oZWxwZXJcIik7XG4gICAgICAgICAgaGVscGVyLmlkID0gXCJkcmFnZ2FibGVSb3dIZWxwZXJJbnRlcm5hbFwiO1xuXG4gICAgICAgICAgLy8gaWYgKHRoaXMucGFyZW50VGFibGUgIT0gbnVsbCAmJiB0aGlzLnBhcmVudFRhYmxlLnNlbGVjdGVkUm93cyAhPSBudWxsICYmIHRoaXMucGFyZW50VGFibGUuc2VsZWN0ZWRSb3dzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAvLyAgIGhlbHBlci5jbGFzc0xpc3QuYWRkKFwiZHJhZy1yb3ctaGVscGVyLWNvbnRhaW5lclwiKTtcblxuICAgICAgICAgIC8vICAgY29uc3QgYyA9IHRoaXMucGFyZW50VGFibGUuc2VsZWN0ZWRSb3dzLmxlbmd0aDtcbiAgICAgICAgICAvLyAgIGNvbnN0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgICAgICAvLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgYzsgaSsrKSB7XG4gICAgICAgICAgLy8gICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgLy8gICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwiZHJhZy1yb3ctaGVscGVyLXJvd1wiKTtcbiAgICAgICAgICAvLyAgICAgZnJhZy5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICAgIC8vICAgfVxuXG4gICAgICAgICAgLy8gICBoZWxwZXIuYXBwZW5kQ2hpbGQoZnJhZyk7XG4gICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgcmV0dXJuIGhlbHBlcjtcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnQ6ICgpPT57XG4gICAgICAgICAgY29uc3QgY2xpZW50RXZlbnQgPSBuZXcgQ2xpZW50RXZlbnQodGhpcywgZXZlbnQpO1xuICAgICAgICAgIGNsaWVudEV2ZW50LnNldFBhcmFtZXRlcihcImRyYWdJZFwiLCB0aGlzLnBhcmVudFRhYmxlSWQpO1xuXG4gICAgICAgICAgaWYgKEFwcFV0aWxzLmN1c3RvbWl6ZUNsaWVudEV2ZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgIEFwcFV0aWxzLmN1c3RvbWl6ZUNsaWVudEV2ZW50KHRoaXMsIGNsaWVudEV2ZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5wYXJlbnRTY3JlZW5JZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBjbGllbnRFdmVudC5zZXRQYXJhbWV0ZXIoXCJzY3JlZW5JZFwiLCB0aGlzLnBhcmVudFNjcmVlbklkKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLmdldEV2ZW50SGFuZGxlcigpLnNldENsaWVudEV2ZW50KGNsaWVudEV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5kcmFnZ2FibGVBcHBsaWVkID0gdHJ1ZTtcbiAgfVxuXG4gIGlzRHJhZ2dhYmxlQXBwbGllZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kcmFnZ2FibGVBcHBsaWVkO1xuICB9XG4gIC8qKlxuICAgKiByb3fjgarjgalCYXNlQ29tcG9uZW5044Go44GX44Gm5a2Y5Zyo44GX44Gq44GEd3JhcHBlcuOBq2N1c3RvbUF0dHJpYnV0ZXPjgpLoqK3lrprjgZfjgb7jgZnjgIJcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBzZXRDdXN0b21BdHRyaWJ1dGUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYoIXRoaXMuY3VzdG9tQXR0cmlidXRlcylcbiAgICAgIHRoaXMuY3VzdG9tQXR0cmlidXRlcyA9IHt9O1xuICAgIHRoaXMuY3VzdG9tQXR0cmlidXRlc1tuYW1lXSA9IHZhbHVlO1xuICB9XG59XG4iXX0=