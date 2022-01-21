import { BaseComponent } from "../base/base.component";
import { Renderer2 } from "@angular/core";
import { SessionService } from "../session/session.service";
import { AttributeChangeListener } from "../base/attribute-change-listener";
import { AttributeChangeEvent } from "../base/attribute-change-event";
export declare class HTMLElementWrapper implements AttributeChangeListener {
    private renderer;
    private sessionService;
    private parent;
    private localName;
    parentTableId: string;
    parentScreenId: string;
    parentTable: any;
    _uniqueId: string;
    htmlElement: HTMLElement;
    component: BaseComponent;
    childNodes: Array<HTMLElementWrapper>;
    dynamicChildNodes: Array<HTMLElementWrapper>;
    onContextHandler: (event: any) => any;
    onMouseDownHandler: (event: any) => any;
    onDoubleClickHandler: (event: any) => any;
    private _dynamicComponent;
    popupName: string;
    contextMenuAction: string | ((any: any) => any);
    mouseDownAction: string | (() => any);
    doubleClickAction: string | (() => any);
    rowNumber: number;
    expanded: string;
    private childRows;
    readonly id: any;
    private customAttributes;
    private attributesName;
    private fauxElementAttributes;
    private draggableApplied;
    customData: any;
    static createVirtualElement(type: string): HTMLElementWrapper;
    constructor(renderer: Renderer2, type: string, sessionService: SessionService, virtual?: boolean, docFragment?: DocumentFragment);
    destroy(skipDestroyChild?: boolean): void;
    setText(text: any): void;
    setFontSize(size: any): void;
    setFontBold(bold: any): void;
    setClass(css: string): void;
    /**
     * Insert a child row at specific location
     * @param idx
     * @param child
     */
    insertChildRowAt(idx: number, child: HTMLElementWrapper): void;
    /**
     * Append a child to this element. If this is a row and we append a row, set {@ appendToTable} to true
     * will also append the actual table row (tr) to the table.
     *
     * @param child child to be appended
     * @param appendToTable
     */
    appendChild(child: HTMLElementWrapper, appendToTableIfRow?: boolean): void;
    appendCustomAttributes(cust: {
        [name: string]: string;
    }): void;
    setAttribute(name: string, value: string): void;
    getAttribute(name: any, skipQueryDOMIfNotExists?: boolean): any;
    getText(): any;
    getId(): any;
    setDraggable(draggable: string): void;
    getExpanded(): string;
    setExpanded(str: string): void;
    setOnContextMenu(action: string | (() => any)): void;
    setOnMouseDown(action: string | (() => any)): void;
    setOnDoubleClick(action: string | (() => any)): void;
    setPopup(popupName: string): void;
    getParent(): HTMLElementWrapper;
    getLocalName(): string;
    setLocaleName(localName: string): void;
    getChildren(): HTMLElementWrapper[];
    getChildCount(): number;
    getChildAt(idx: number): HTMLElementWrapper;
    setComponent(component: BaseComponent, fromVirtualTable?: boolean): void;
    private invokeMcoAction;
    getComponent(): BaseComponent;
    private showPopupMenu;
    private handleOnMouseDown;
    private handleDoubleClick;
    expandNode(isExpanded: boolean | string, justUpdateAttribute?: boolean): void;
    private trackAttributeName;
    toJson(): {};
    isView(): boolean;
    isDialog(): boolean;
    isDynamicView(): boolean;
    isFauxElement(): boolean;
    setChecked(chk: string | boolean): void;
    /**
     * Search for child using the provided function
     *
     * @param fn function to execute while iterating child lookup
     */
    findChildByFn(fn: (element: HTMLElementWrapper) => boolean): HTMLElementWrapper;
    /**
     * Concate {fromNode} to {toNode}
     *
     * @param toNode array of nodes to be concated to
     * @param fromNode node to be concated from
     * @returns the concated node
     */
    private concatNode;
    _internalId: string;
    beforeAttributeRemoved(evt: AttributeChangeEvent): void;
    beforeAttributeSet(evt: AttributeChangeEvent): void;
    onAttributeRemoved(evt: AttributeChangeEvent): void;
    onAttributeSet(evt: AttributeChangeEvent): void;
    private updateSortValue;
    isDraggable(): boolean;
    applyDraggable(): void;
    isDraggableApplied(): boolean;
    /**
     * rowなどBaseComponentとして存在しないwrapperにcustomAttributesを設定します。
     * @param name
     * @param value
     */
    setCustomAttribute(name: string, value: any): void;
}
