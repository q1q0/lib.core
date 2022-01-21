import { BaseComponent } from "../base/base.component";
import { Renderer2 } from "@angular/core";
import { SessionService } from "../session/session.service";
import { ClientEvent } from "../event-handler/client-event";
import { AppUtils } from "../base/app-utils";
import * as _ from "lodash";
import { LabelComponent } from "../label/label.component";
import { AttributeChangeListener } from "../base/attribute-change-listener";
import { AttributeChangeEvent } from "../base/attribute-change-event";
declare var jQuery: any;

export class HTMLElementWrapper implements AttributeChangeListener {
  // attributes: Map<string, string>;
  // text: any;
  // draggable: string;
  // cssClass: string;
  // onDoubleClick: string;
  // onContextMenu: string;
  // onMouseDown: string;
  // popupName: string;

  private parent: HTMLElementWrapper;
  private localName: string;
  parentTableId: string;
  parentScreenId: string;
  parentTable: any;

  _uniqueId: string;
  htmlElement: HTMLElement;
  component: BaseComponent;

  //for none dynamic stuf
  childNodes: Array<HTMLElementWrapper> = [];

  //for tree table
  dynamicChildNodes: Array<HTMLElementWrapper>;

  onContextHandler: (event) => any;
  onMouseDownHandler: (event) => any;
  onDoubleClickHandler: (event) => any;

  //indicate that component create dynamically (via createElement)
  private _dynamicComponent: boolean;

  popupName: string;
  contextMenuAction: string | ((any) => any);
  mouseDownAction: string | (() => any);
  doubleClickAction: string | (() => any);
  rowNumber: number;
  expanded: string;

  private childRows: Array<HTMLElementWrapper>;

  get id() {
    return this.getId();
  }
  private customAttributes: {[name: string]: any} = null;
  private attributesName: Array<string>;

  private fauxElementAttributes: Map<string, string>;

  private draggableApplied: boolean;

  customData: any;

  static createVirtualElement(type: string): HTMLElementWrapper {
    return new HTMLElementWrapper(null, type, null, true);
  }

  constructor(private renderer: Renderer2, type: string, private sessionService: SessionService, virtual: boolean = false, docFragment: DocumentFragment = null) {
    this._uniqueId = BaseComponent.generateUniqueId(type);

    this.localName = type;

    if (type === "row" && virtual !== true) {
      this.htmlElement = this.renderer.createElement("tr");
      this._dynamicComponent = true;
    } else if (type === "cell" && virtual !== true) {
      this.htmlElement = this.renderer.createElement("td");
      this._dynamicComponent = true;
    } else if (type === "label" || type === "menuItem" || virtual === true) {
      this.fauxElementAttributes = new Map<string, string>();
      this.setAttribute("id", this._uniqueId);
    }

    if (this._dynamicComponent === true) {
      if (this.htmlElement instanceof HTMLTableRowElement) {
        this.htmlElement.setAttribute("data-tt-id", this._uniqueId);
      }

      this.onContextHandler = (event) => {
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
        } else if (typeof this.contextMenuAction === "function") {
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

  destroy(skipDestroyChild: boolean = false) {
    if (this._dynamicComponent === true && this.htmlElement != null) {
      this.htmlElement.removeEventListener("contextmenu", this.onContextHandler, true);
      this.htmlElement.removeEventListener("mousedown", this.onMouseDownHandler, true);
      this.htmlElement.removeEventListener("dblclick", this.onDoubleClickHandler, true);
    }

    if (this.childNodes != null && skipDestroyChild !== true) {
      let stack = this.childNodes;

      while (stack.length > 0) {
        const node = stack.pop();

        if (node.childNodes != null) {
          stack = stack.concat(node.childNodes);
        }

        node.destroy(true);
      }
    }

    if (this.dynamicChildNodes != null && skipDestroyChild !== true) {
      let stack = this.dynamicChildNodes;

      while (stack.length > 0) {
        const node = stack.pop();

        if (node.dynamicChildNodes != null) {
          stack = stack.concat(node.dynamicChildNodes);
        }

        node.destroy(true);
      }
    }

    if (this.childRows != null && skipDestroyChild !== true) {
      let stack = this.childRows;

      while (stack.length > 0) {
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
    this.sessionService = null;
  }

  setText(text: any) {
    if (this._dynamicComponent === true) {
      this.renderer.setProperty(this.htmlElement, "innerHTML", text);
    } else if (this.component != null) {
      this.component.setText(text);
    } else if (this.fauxElementAttributes != null) {
      this.fauxElementAttributes.set("text", text);
    }
  }

  setFontSize(size: any) {
    if (this._dynamicComponent === true) {
      this.renderer.setStyle(this.htmlElement, "font-size", size + "px");
    } else if (this.component != null) {
      this.component.setFontSize(size);
    } else if (this.fauxElementAttributes != null) {
      this.fauxElementAttributes.set("fontSize", size);
    }
  }

  setFontBold(bold: any) {
    if (this._dynamicComponent === true) {
      if (bold === "true" || bold === true) {
        this.renderer.setStyle(this.htmlElement, "font-weight", "bold");
      } else {
        this.renderer.setStyle(this.htmlElement, "font-weight", "normal");
      }
    } else if (this.component != null) {
      this.component.setFontBold(bold);
    } else if (this.fauxElementAttributes != null) {
      this.fauxElementAttributes.set("fontBold", bold);
    }
  }

  setClass(css: string) {
    if (css != null && css.indexOf(".") >= 0) {
      const temp = css.split("\.");

      let cssClass = temp.join("-");

      if (temp[0] === "") {
        css = cssClass.substring(1);
      }
    }
    if (this.htmlElement != null) {
      this.renderer.setAttribute(this.htmlElement, "class", css);
    } else if (this.component != null) {
      this.component.addCssClass(css);
    } else if (this.fauxElementAttributes != null) {
      this.setAttribute("class", css);
    }
  }

  /**
   * Insert a child row at specific location
   * @param idx
   * @param child
   */
  insertChildRowAt(idx: number, child: HTMLElementWrapper) {
    if (child.htmlElement instanceof HTMLTableRowElement !== true && this._dynamicComponent === true) {
      throw new Error("Invalid insertion, only HTMLTableRowElement is allowed");
    }

    if (idx > 0 && (this.childRows == null || this.childRows.length <= idx)) {
      throw new Error("Unable to insert child row at this specific location (index overflow)");
    } else if (idx >= 0 && (this.childRows != null && this.childRows.length > idx)) {
      //track child rows so we can used insertChildRowAt
      if (this.childRows == null) {
        this.childRows = [];
      }

      if (this.parentTable.useDocFragment === true) {
        (this.parentTable._bodyFragment as DocumentFragment).insertBefore(child.htmlElement, this.childRows[idx].htmlElement);
      } else {
        this.renderer.insertBefore(this.parentTable.tableBody.nativeElement, child.htmlElement, this.childRows[idx].htmlElement);
      }

      this.childRows.splice(idx, 0, child);
    }

    this.renderer.setAttribute(child.htmlElement, "data-tt-parent-id", this._uniqueId);

    child.parent = this;
  }

  /**
   * Append a child to this element. If this is a row and we append a row, set {@ appendToTable} to true
   * will also append the actual table row (tr) to the table.
   *
   * @param child child to be appended
   * @param appendToTable
   */
  appendChild(child: HTMLElementWrapper, appendToTableIfRow: boolean = false) {
    if (this._dynamicComponent === true) {
      if (child.htmlElement instanceof HTMLTableRowElement) {
        this.renderer.setAttribute(child.htmlElement, "data-tt-parent-id", this._uniqueId);

        if (appendToTableIfRow === true) {
          if (this.parentTable.useDocFragment === true) {
            (this.parentTable._bodyFragment as DocumentFragment).appendChild(child.htmlElement);
          } else {
            this.renderer.appendChild(this.parentTable.tableBody.nativeElement, child.htmlElement);
          }
        }

        //track child rows so we can used insertChildRowAt
        if (this.childRows == null) {
          this.childRows = [];
        }

        this.childRows.push(child);
      } else if (child.htmlElement instanceof HTMLTableCellElement) {
        this.renderer.appendChild(this.htmlElement, child.htmlElement);

        if (this.dynamicChildNodes == null) {
          this.dynamicChildNodes = [];
        }

        this.dynamicChildNodes.push(child);
      }
    } else {
      this.childNodes.push(child);
    }

    child.parent = this;
  }

  appendCustomAttributes(cust: { [name: string]: string }) {
    if (cust != null) {
      const keys = _.keys(cust);

      for (let key of keys) {
        this.setAttribute(key, cust[key]);
      }
    }
  }

  //NSD will override this, added to fix error
  // setCustomAttribute(name: string, value: string) {
  //   this.setAttribute(name, value);
  // }

  setAttribute(name: string, value: string) {
    if(name === 'selected' && this.localName == 'row'){
      if(this.parentTable != null){
        if(value == 'true')
          this.parentTable.selectRow(this, true);
        else
          this.parentTable.selectRow(this, false);
        this.parentTable.markForCheck();
      }
    }
    if (name === "expanded") {
      this.expandNode(value);
    } else if (this.component != null) {
      this.component.setAttribute(name, value);
      this.trackAttributeName(name);
    } else if (this.htmlElement != null) {
      if (name === "isLockedColumn") {
        if (this.fauxElementAttributes == null) {
          this.fauxElementAttributes = new Map<string, string>();
        }

        this.fauxElementAttributes.set(name, value);
      } else {
        this.renderer.setAttribute(this.htmlElement, name, value);
      }

      this.trackAttributeName(name);
    } else if (this.fauxElementAttributes != null) {
      this.fauxElementAttributes.set(name, value);
      this.trackAttributeName(name);
    }
  }

  getAttribute(name: any, skipQueryDOMIfNotExists: boolean = false) {
    if (name === "expanded") {
      return this.expanded === "true" ? "true" : "false";
    }

    if (this.component != null) {
      return this.component.getAttribute(name, skipQueryDOMIfNotExists);
    } else if (this.htmlElement != null && skipQueryDOMIfNotExists !== true) {
      if (name === "text") {
        let text = this.htmlElement.getAttribute(name);

        if (text == null) {
          text = this.htmlElement.innerText;
        }

        if (text == null || text === "") {
          text = (this.htmlElement as HTMLTableCellElement).textContent;
        }

        if (typeof text === "string") {
          text = text.trim();
        }

        return text;
      } else if (name === "isLockedColumn" && this.fauxElementAttributes != null) {
        return this.fauxElementAttributes.get(name);
      } else if (name === "isLockedColumn") {
        return "false";
      }

      return this.htmlElement.getAttribute(name);
    } else if (this.fauxElementAttributes != null) {
      return this.fauxElementAttributes.get(name);
    }
  }

  getText() {
    return this.getAttribute("text");
  }

  getId() {
    return this.getAttribute("id");
  }

  setDraggable(draggable: string) {
    this.setAttribute("draggable", draggable);

    if (draggable == "true") {
      this.applyDraggable();
    }
  }

  getExpanded(): string {
    return this.getAttribute("expanded");
  }

  setExpanded(str: string) {
    this.setAttribute("expanded", str);
  }

  setOnContextMenu(action: string | (() => any)) {
    if (this.htmlElement != null) {
      this.contextMenuAction = action;
      this.htmlElement.addEventListener("contextmenu", (event) => this.onContextHandler(event), true);
    }
  }

  setOnMouseDown(action: string | (() => any)) {
    this.mouseDownAction = action;
  }

  setOnDoubleClick(action: string | (() => any)) {
    this.doubleClickAction = action;
  }

  setPopup(popupName: string) {
    this.popupName = popupName.replace("#", "");
  }

  getParent() {
    return this.parent;
  }

  getLocalName() {
    return this.localName;
  }

  setLocaleName(localName: string) {
    this.localName = localName;
  }

  getChildren() {
    let children: Array<HTMLElementWrapper> = this.childNodes;

    if ((children == null || children.length === 0) && (this.dynamicChildNodes != null)) {
      children = this.dynamicChildNodes;
    }

    if (
      this.getLocalName() === "row" &&
      children != null &&
      this.parentTable != null &&
      this.parentTable.getLocalName() === "table" &&
      this.parentTable.columnsHasBeenSwapped === true
    ) {
      children = _.orderBy(children, (child: HTMLElementWrapper)=> {
        return child["originalColumnIndex"];
      }) as any;
    }

    return children;
  }

  getChildCount(): number {
    return this.childNodes != null ? this.childNodes.length : 0;
  }

  getChildAt(idx: number): HTMLElementWrapper {
    return this.getChildCount() > idx ? this.childNodes[idx] : null;
  }

  setComponent(component: BaseComponent, fromVirtualTable: boolean = false) {
    this.component = component;
    this.component.parentTableRow = this.parent;

    if (component != null && fromVirtualTable === true) {
      component.addAttributeChangeListener(this);
    }
  }

  private invokeMcoAction(action: string | (() => any)) {
    if (typeof action === "function") {
      action();
    } else if (action.indexOf("mco://") === 0) {
      const mcoName = action.substring(6, action.indexOf("."));
      const methodName = action.substring(action.indexOf(".") + 1, action.indexOf("("));
      const arg = action.substring(action.indexOf("(") + 1, action.indexOf(")"));

      if (arg != null && arg.length > 0) {
        const mco = this.sessionService.getMcoContainer().getMco(mcoName);

        if (mco != null) {
          if (arg === "this") {
            mco[methodName].apply(mco, [this]);
          } else {
            mco[methodName].apply(mco, [arg]);
          }
        } else {
          console.error("Unable to execute MCO action, mco not found: " + mcoName);
        }
      } else {
        const mco = this.sessionService.getMcoContainer().getMco(mcoName);

        if (mco != null) {
          mco[methodName].apply(mco);
        } else {
          console.error("Unable to execute MCO action, mco not found: " + mcoName);
        }
      }
    }
  }

  getComponent(): BaseComponent {
    return this.component;
  }

  private showPopupMenu(event: MouseEvent) {
    this.sessionService.setMousePosition(event);

    if (this.popupName != null) {
      const contextMenu = this.sessionService.showContextMenu(this.popupName);

      if (contextMenu === true) {
        event.preventDefault();
        event.stopPropagation();

        // contextMenu.show(this.htmlElement);
      }
    }

    const clientEvent = new ClientEvent(this, event);

    if (AppUtils.customizeClientEvent != null) {
      AppUtils.customizeClientEvent(this, clientEvent);
    }

    clientEvent.setParameter("screenId", this.parentScreenId);

    this.sessionService.getEventHandler().setClientEvent(clientEvent);
  }

  private handleOnMouseDown(event) {
    if(this.parentTable != null){
      let table = this.parentTable.elementRef.nativeElement;
      let tds: NodeList = table.querySelectorAll('td');

      for (let i = 0; i < tds.length; i++) {
        (tds[i] as any).style.color = '';
      }

      tds = this.htmlElement.querySelectorAll('td');
      for (let i = 0; i < tds.length; i++) {
        (tds[i] as any).style.color = 'blue';
      }
    }

    if (this.mouseDownAction != null) {
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

  private handleDoubleClick(event) {
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

  expandNode(isExpanded: boolean | string, justUpdateAttribute: boolean = false) {
    this.expanded = typeof isExpanded === "string" ? isExpanded : isExpanded + '';

    if (justUpdateAttribute !== true && this.parentTableId != null && this.parentTableId !== "") {
      const jq = jQuery(`#${this.parentTableId} .jq-tree-table`);

      if (jq != null) {
        let nodeId: string = this.getAttribute("data-tt-id");

        if (nodeId != null) {
          try {
            if (isExpanded === "true" || isExpanded === true) {
              jq.treetable("expandNode", nodeId);
            } else {
              jq.treetable("collapseNode", nodeId);
            }
          } catch (e) {
            console.error("Unable to expand node due to error");
          }
        }
      } else {
        console.error("Unable to expand node, tree table is null");
      }
    }
  }

  private trackAttributeName(name: string) {
    if (this.attributesName == null) {
      this.attributesName = [];
    }

    this.attributesName.push(name);
  }

  toJson(): {} {
    let retVal = {};

    if (this.component != null) {
      retVal = this.component.toJson();

      if (this.component instanceof LabelComponent) {
        retVal["nxTagName"] = this.getLocalName();
        retVal["tagName"] = this.getLocalName();
      }
    } else {
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

    //any children?
    let children: Array<HTMLElementWrapper>;
    if (this.childNodes != null && this.childNodes.length > 0) {
      children = this.childNodes;
    } else if (this.dynamicChildNodes != null && this.dynamicChildNodes.length > 0) {
      children = this.dynamicChildNodes;
    }

    if (children != null) {
      if (
        this.getLocalName() === "row" &&
        this.parentTable != null &&
        this.parentTable.getLocalName() === "table" &&
        this.parentTable.columnsHasBeenSwapped === true
      ) {
        children = _.orderBy(children, (child: HTMLElementWrapper)=> {
          return child["originalColumnIndex"];
        }) as any;
      }

      retVal["children"] = children.map(child=>child.toJson());
    }
    if(this.customAttributes)
      retVal['customAttributes'] = this.customAttributes;
    return retVal;
  }

  isView(): boolean {
    return false;
  }

  isDialog(): boolean {
    return false;
  }

  isDynamicView(): boolean {
    return false;
  }

  isFauxElement() {
    return true;
  }

  setChecked(chk: string | boolean) {
    if (typeof chk === "boolean") {
      chk = chk + "";
    }

    this.setAttribute("checked", chk);
  }

  /**
   * Search for child using the provided function
   *
   * @param fn function to execute while iterating child lookup
   */
  findChildByFn(fn: (element: HTMLElementWrapper)=>boolean) {
    let retVal: HTMLElementWrapper;

    let children: Array<HTMLElementWrapper> = this.concatNode([] as any, this);

    while(children.length > 0) {
      const child = children.pop();

      if (child != null) {
        if (fn(child) === true) {
          retVal = child;
          break;
        } else {
          children = this.concatNode(children, child);
        }
      }
    }

    return retVal;
  }

  /**
   * Concate {fromNode} to {toNode}
   *
   * @param toNode array of nodes to be concated to
   * @param fromNode node to be concated from
   * @returns the concated node
   */
  private concatNode(toNode: Array<HTMLElementWrapper>, fromNode: HTMLElementWrapper): Array<HTMLElementWrapper> {
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

  //attribute change listener
  _internalId: string;

  beforeAttributeRemoved(evt: AttributeChangeEvent): void {

  }

  beforeAttributeSet(evt: AttributeChangeEvent): void {

  }

  onAttributeRemoved(evt: AttributeChangeEvent): void {

  }

  onAttributeSet(evt: AttributeChangeEvent): void {
    if (evt.getName() === "sortValue" && this.htmlElement != null) {
      this.updateSortValue(evt.getNewValue());
    }
  }

  private updateSortValue(value) {
    if (this.renderer != null) {
      this.renderer.setAttribute(this.htmlElement, "data-text", value);

      if (this.component != null && this.component.getParent() != null && typeof (this.component.getParent() as any).refreshTableSorterCache === "function") {
        (this.component.getParent() as any).refreshTableSorterCache();
      }
    }
  }

  isDraggable(): boolean {
    return this.getAttribute("draggable") === "true";
  }

  applyDraggable() {
    if (this.isDraggable() && this.draggableApplied !== true && this.htmlElement != null) {
      jQuery(this.htmlElement).draggable({
        appendTo: "body",
        addClasses: false,
        helper: ()=>{
          const helper: HTMLElement = document.createElement("div");
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
        start: ()=>{
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

  isDraggableApplied() {
    return this.draggableApplied;
  }
  /**
   * rowなどBaseComponentとして存在しないwrapperにcustomAttributesを設定します。
   * @param name
   * @param value
   */
  setCustomAttribute(name: string, value: any) {
    if(!this.customAttributes)
      this.customAttributes = {};
    this.customAttributes[name] = value;
  }
}
