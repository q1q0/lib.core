import { Component, AfterViewInit, ViewChild, Type, ComponentFactoryResolver, ComponentRef, Input, ElementRef, Renderer2, SkipSelf, Optional, ViewChildren, ContentChildren } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AttributesEnum } from '../base/attributes.enum';

import { DialogComponent } from '../dialog/dialog.component';
import { ComponentType } from '../base/component-type.enum';
import { LabelComponent } from '../label/label.component';
import { ButtonComponent } from '../button/button.component';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { TextAreaComponent } from '../text-area/text-area.component';

import * as _ from 'lodash';
import { DynamicPagesService } from './dynamic-pages.service';
import { AppUtils } from '../base/app-utils';

import { Subject, Observable } from "rxjs";
import { SessionService } from '../session/session.service';
import { HTMLElementWrapper } from '../tree-table/html-element-wrapper';
import { UiDocument } from '../base/ui-document';
import { PopupMenuDirective } from '../popup-menu/popup-menu.directive';
import { Logger } from '../base/logger';
import { KeyUtils } from '../base/key-utils';
import { JavaUtils } from '../java/java-utils';
import { AttributeNameValue } from '../base/attribute-name-value';
import { MenuItemComponent } from '../popup-menu/menu-item/menu-item.component';

/**
 * Base parent component class that all other screen components inherit from
 */
@Component({
  selector: 'vt-dummy-view',
  template: ''
})
export class ViewComponent extends BaseComponent {
  @ViewChild(DialogComponent) dialog: DialogComponent;
  private routeUrl: string;
  private routeDeactivated: boolean;
  private mcos: Set<string> = new Set<string>();
  zIndex: number;
  isDynamicPage: boolean;
  isDestroyed: boolean;
  canBeActiveView: boolean = true;
  actionForwardName: string;
  modal:string;
  routeId: string;   //For route.service

  private _viewInitializedSubject: Subject<void> = new Subject<void>();
  viewInitialized: Observable<void> = this._viewInitializedSubject.asObservable();

  private defIds: Array<string> = [];
  private popupMenus: Array<PopupMenuDirective>;

  //private _findElementCache: any;

  private changeDetectionFrozen: boolean;

  isMinimized: boolean;

  skipBreadCrumb: boolean;

  //allow this same screen to launch multiple time
  allowMultipleScreen: boolean;
  screenIndex: number = null;
  baseScreenId: string; //id for grouping screen (avoiding screenindex)

  //callback for any custom cleanup
  beforeDestroyCb: (id: string)=>void;


  //keep track of menu items (that are not active) as are menu items are destroyed after it is closed.
  private _inactiveMenuItems: Map<string, HTMLElementWrapper>;

  private _tableColumnsMap: Map<string, any>;

  _viewStatus: number;

  private viewRouteSet: boolean;

  //refresh the HTML/NXML vs reloading the screen
  refreshHTML: boolean | Function;

  private subViews: Map<string, ViewComponent>;

  private _activeMessageDialogs: Map<string, any>;

  /**
   *
   * @param parent see [[BaseComponent]] constructor
   * @param sessionService see [[BaseComponent]] constructor
   * @param elementRef see [[BaseComponent]] constructor
   */
  constructor(
    @Optional() @SkipSelf() parent: BaseComponent,
    sessionService: SessionService,
    elementRef: ElementRef){
    super(parent, sessionService, elementRef, null);
    this.actionForwardName = this.getId();

    if (parent != null) {
      let parentView = parent;

      if (parent instanceof ViewComponent !== true) {
        parentView = parent.getParentView();
      }

      if (parentView != null) {
        (parentView as ViewComponent).addChildView(this);
      }
    }
  }

  viewIsInitialized: boolean;

  /**
   * Set [[routeUrl]] property value. If [[dialog]] exists, set it's route URL
   * @param url
   */
  setRouteUrl(url: string) {
    this.routeUrl = url;

    if (this.dialog != null) {
      this.dialog.setViewRouteUrl(url);
    }
  }

  /**
   * Get [[routeUrl]] property value
   * @returns Route URL
   */
  getRouteUrl(): string {
    return this.routeUrl;
  }


  /**
   * Check if route is deactivated.
   * @returns True if route is deactivated
   */
  isRouteDeactivated() {
    return this.routeDeactivated === true;
  }


  /**
   * After view init lifecycle
   */
  ngAfterViewInit() {
    if (this.canBeActiveView !== false) {
      this.parent = null;
    }

    //add view to stack
    this.getSession().getMcoContainer().registerView(this);

    super.ngAfterViewInit();

    this.afterDialogInit();

    if (this.popupMenus != null) {
      _.forEach(this.popupMenus, (popupMenu)=>popupMenu.convertSubMenuItems(this.id));
    }

    this.componentInitialize();

    if (this.dialog) {
      this.dialog.setViewRouteUrl(this.routeUrl);
      this.viewRouteSet = true;
    }

    const sessionService = this.getSession();
    if(sessionService)
      sessionService.getMcoContainer().reStackView(this.id, this.screenIndex);

    if(this._viewInitializedSubject)
      this._viewInitializedSubject.next();
    this.viewIsInitialized = true;
  }


  protected afterDialogInit() {
    if (this.dialog) {
      //get id of dialog as our id
      this.id = this.dialog.getId();
      this.dialog.screenIndex = this.screenIndex;

      if (typeof this.dialog.modal === "boolean"){
        this.modal = JavaUtils.booleanToString(this.dialog.modal);
      }else{
        this.modal = this.dialog.modal;
      }
      if (this.modal != null && (this.modal === "true" || this.modal === "false")) {
        this.setElementAttributeById(this.id, 'modal', this.modal);
        this.setModalMode();
      } else {
        this.dialog.modal = "false";
        this.modal = this.dialog.modal;
        this.setElementAttributeById(this.id, 'modal', "false");
      }

      if (this.popupMenus != null) {
        _.forEach(this.popupMenus, (popupMenu)=>popupMenu.convertSubMenuItems(this.id));
      }

      this.dialog.resetId();

      if (this.viewRouteSet !== true) {
        this.dialog.setViewRouteUrl(this.routeUrl);
        this.viewRouteSet = true;
      }
    }
  }


  /**
   * Set modal CSS and dialog's modal property value to true.
   * Make view component display as modal
   */
  setModalMode(){
    if (this.modal == "true") {
      this.dialog["elementRef"].nativeElement.className = "modal fade in";
      this.dialog["elementRef"].nativeElement.style.cssText = "display:inline-block;";
      this.setElementAttributeById(this.id, 'modal', this.modal);
      this.dialog.modal = this.modal;
    }
  }


  /**
   * Destroy lifecycle. Clear all references
   */
  ngOnDestroy() {
    this.removeActiveMessageDialogs();
    if (this.beforeDestroyCb != null) {
      this.beforeDestroyCb(this.getId());
    }

    if (this.subViews != null) {
      this.subViews.clear();
      this.subViews = null;
    }

    this._inactiveMenuItems = null;

    this.routeDeactivated = true;
    //remove view from stack
    this.getSession().getMcoContainer().removeView(this);

    this.mcos.forEach(mco=>this.getSession().getMcoContainer().removeMco(mco));
    this.mcos.clear();
    delete this.mcos;

    if (this.dialog != null) {
      if (this.dialog.viewContainer != null) {
        this.dialog.viewContainer.clear();

        delete this.dialog.viewContainer;
      }

      delete this.dialog;
    }

    this.isDestroyed = true;
    this.getSession().getInjector(DynamicPagesService).removeView(this);


    _.forEach(this.defIds, (id)=>{
      this.getSession().deleteDef(id);
    });

    this.defIds = null;
    this.popupMenus = null;

    // if (this._findElementCache != null) {
    //   this._findElementCache.clear();
    // }

    // this._findElementCache = null;

    this._tableColumnsMap = null;

    this._viewInitializedSubject.unsubscribe();
    this._viewInitializedSubject = null;
    this.viewInitialized = null;


    super.ngOnDestroy();
  }

  /**
   * Delegate to [[bodyInit]]
   */
  protected componentInitialize() {
    this.bodyInit();
  }

  /**
   * Get the component's tag name. Implementation of [[BaseComponent]] method
   * @returns Name of tag
   */
  getTagName(): string {
    return 'vt-dummy-view';
  }

  /**
   * Not implemented
   */
  bodyInit() {

  }


  /**
   * Query the "element" via selectFn function, then set the attribute of the element. If found
   * set the attribute {attribute} with value {value}
   *
   * @param selectorFn
   */
  setElementAttribute(
    selectorFn: ((map: Map<string, BaseComponent>)=>BaseComponent),
    attribute: AttributesEnum,
    value: any
  ) {
    const comp = selectorFn(this.children);

    if (comp == null) {
      Logger.warn('Unable to set attribute, component is null');
    } else {
      comp.setAttribute(attribute, value);
    }

    this.markForCheck();
  }

  /**
  * Set [[disabled]] property value
  * @param boo Value for disabled property
  */
  setDisabled(boo: boolean) {
    this.disabled = boo;
    this.dialog.setDisabled(boo);
  }


  /**
   * Query the "element" via selectFn function, then set the attribute of the element. If found
   * set the attribute {attribute} with value {value}
   *
   * @param selectorFn
   */
  setElementAttributeById(
    compId: string,
    attribute: AttributesEnum | string,
    value: any
  ) {

    if (attribute === AttributesEnum.TITLE || attribute === 'title') {
      this.setTitle(value);
    } else if (compId === this.getId()) {
      this.setAttribute(attribute, value);
    } else {
      let comp = this.findElementById(compId);

      /* istanbul ignore if */
      /* istanbul ignore else */
      if (comp == null) {
        //is this for def?
        let compDef = null;
        if(this.getSession() != null){
          compDef = this.getSession().getDef(compId);
        }

        if (compDef != null) {
          compDef.attribute[attribute] = value;
        } else {

          comp = UiDocument.getMenuComponent(compId);

          /* istanbul ignore else */
          if (comp != null) {
            comp.setAttribute(attribute, value);
          } else {
            Logger.warn(`Unable to set attribute, component with id: ${compId} is not found`);
          }
        }
      } else {
        comp.setAttribute(attribute, value);
      }

      this.markForCheck();
    }
  }


  /**
   * Wholesale set attributes to an element.
   *
   * @param compId element to set attribute
   * @param attributes an array of AttributesEnum to be set
   */
  setElementAttributesById(
    compId: string,
    attributes: Array<AttributeNameValue>
  ) {

    if (compId === this.getId()) {
      this.setAttributes(attributes);
    } else {
      const comp = this.findElementById(compId);

      if (comp == null) {
        //is this for def?
        const compDef = this.getSession().getDef(compId);

        if (compDef != null) {
          for (const attr of attributes) {
            compDef.attribute[attr.attributeName] = attr.value;
          }
        } else {
          Logger.warn(`Unable to set attribute, component with id: ${compId} is not found`);
        }
      } else {
        comp.setAttributes(attributes);
      }

      this.markForCheck();
    }
  }


  /**
   * Removes an attribute from a component with a specific id
   * @param compId Component id
   * @param attribute Name of attribute to remove from component
   */
  removeElementAttributeById(
    compId: string,
    attribute: AttributesEnum | string
  ) {

    if (attribute === AttributesEnum.TITLE || attribute === 'title') {
      this.setTitle("");
    } else if (compId === this.getId()) {
      this.removeAttribute(attribute);
    } else {
      const comp = this.findElementById(compId);

      /* istanbul ignore if */
      /* istanbul ignore else */
      if (comp == null) {
        Logger.warn(`Unable to remove attribute, component with id: ${compId} is not found`);
      } else {
        comp.removeAttribute(attribute);
      }
    }

    this.markForCheck();
  }


  /**
   * Searches for a radio button group by ID and adds an attribute to all [[RadioButtonComponent]] elements in the group
   * @param radioGroupId
   * @param attribute HTML attribute name to be set
   * @param value Value to set on HTML attribute
   */
  setRadioGroupAttribute(radioGroupId: string, attribute: AttributesEnum | string, value: any) {
    const radios = _.filter(Array.from(this.children.values()), (child)=>{
      return child instanceof RadioButtonComponent && (child as RadioButtonComponent).group === radioGroupId;
    });

    /* istanbul ignore if */
    if (radios != null && radios.length > 0) {
      _.forEach(radios, (radio)=>{
        radio.setAttribute(attribute, value);
      });
    }

    this.markForCheck();
  }


  /**
   * Get the value of an HTML attribute of a component
   * @param compId Id of component to get attribute from
   * @param attribute Name of HTML attribute to get
   */
  getElementAttributeById(compId: string, attribute: AttributesEnum | string): any {
    const comp = this.findElementById(compId);

    if (comp != null) {
      return comp.getAttribute(attribute);
    }
  }


  /**
   * Find [[ComboboxComponent]] by id and call it's initializeComboboxValues method.
   * @param compId Component ID to initialize
   * @param value Value to set on combobox
   * @param attribute Name of attribute to set on combobox
   */
  initializeComboBoxValues(
    compId: string,
    value: any,
    attribute: any
  ) {
    const comboBox: ComboBoxComponent = this.findElementById(compId) as ComboBoxComponent;

    if (comboBox == null) {
      console.error(`Unable to find combobox: ${compId} `);
    } else {
      comboBox.initializeComboboxValues(value);

      if (attribute != null) {
        if (attribute["width"] != null) {
          comboBox.setControlWidth(attribute["width"]);
        } else if (attribute["onCommand"] != null) {
          comboBox.setOnCommand(attribute["onCommand"]);
        }
      }
    }
  }

  /**
   * Set the [[ComboboxComponent]] selected item that matches value
   * @param compId [[ComboboxComponent]] id
   * @param value Value to set as selected
   */
  selectComboBoxItem(compId: string, value: any) {
    const comboBox: ComboBoxComponent = this.findElementById(compId) as ComboBoxComponent;

    /* istanbul ignore if */
    if (comboBox == null) {
      console.error(`Unable to find combobox: ${compId} `);
    } else {
      comboBox.setSelectValue(value);
    }
  }

  /**
   * Find component and focus it
   * @param compId Component id
   */
  setFocus(compId: string = null) {
    if (compId == this.id) {
      this.showView();
    }
    else if (compId == null || compId == '') {
      this.requestFocus();
    } else {
      const comp = UiDocument.findElementById(compId);

      if (comp == null) {
        console.error(`Unable to setFocus, component with id: ${compId} is not found`);
      } else {
        comp.requestFocus();
      }
    }
  }

  /**
   * Set title on [[DialogComponent]]
   * @param title Title of dialog
   */
  setTitle(title: string) {
    if (this.dialog != null) {
      this.dialog.title = title;

      this.dialog.markForCheck();
    }
  }


  /**
   * Close [[dialog]] if it exists on this component
   * @param delayDialogClose
   */
  close(delayDialogClose?: boolean) {
    const dialog = document.getElementById(this.dialog.id);
    dialog.setAttribute("style", "display: none;");
    dialog.innerHTML = "";

    this._viewStatus = 1;

    this.cleanup();

    if (this.dialog != null) {
      if(delayDialogClose) {
        setTimeout(() => {
          this.dialog.close(null, false);
        }, 1);
      } else {
        this.dialog.close(null, true);
      }
    } else if (this.isDynamicPage === true) {
      this.getSession().getInjector(DynamicPagesService).removeView(this);
    } else {
      if (this.getSession() != null && this.getSession().getRouteNavigatorService() != null) {
        this.getSession().getRouteNavigatorService().destroyRoute(this.routeUrl);
      } else {
        console.error("Unable to change route, session or route navigation service is not defined");
      }

      console.error('Unable to close ViewComponent, DialogComponent not found');
    }
  }

  /**
   * Get name of this component
   */
  getLocalName(): string {
    return "window";
  }


  /**
   * Register and add an MCO
   * @param mcoName
   * @param mcoClass
   */
  createMco(mcoName: string, mcoClass: Type<any>): any {
    let mco: any = this.getSession().getMcoContainer().getMco(mcoName);

    //check to see if MCO already exists?
    if (mco != null) {
      console.warn("MCO " + mcoName + " is already exists, use existing one");
    } else {
      mco = new mcoClass(this);
      this.getSession().getMcoContainer().registerMco(mcoName, mco);

      //add mco name for tracking (to be cleaned and removed later)
      this.mcos.add(mcoName);
    }

    return mco;
  }

  /**
   * Get MCO from client session
   * @param mcoName Name of MCO to get
   * @returns MCO
   */
  getMco(mcoName: string): any {
    return this.getSession().getMcoContainer().getMco(mcoName);
  }

  /**
   * Parse string and create component base on it
   *
   * @param domString
   */
  createComponent(domString: string) {
    //textField
    //label
    //panel
    //horizontalSeparator
    try {
      const element = AppUtils.parseDom(domString);
    } catch (e) {
      console.error(e);
    }
  }


  /**
   * @deprecated DO NOT USE THIS, exists only for legacy support, use ngIf instead
   * @param componentType
   */
  _createDynamicComponent(componentType: ComponentType): BaseComponent {
    let comp: BaseComponent = null;

    if (this.dialog != null && this.dialog.viewContainer != null) {
      try {
        const compFactory: ComponentFactoryResolver = this.getSession().getInjector(ComponentFactoryResolver);

        if (compFactory != null) {
          let compRef: ComponentRef<BaseComponent>;
          if (componentType === ComponentType.LABEL) {
            compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(LabelComponent));
          } else if (componentType === ComponentType.BUTTON) {
            compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(ButtonComponent));
          } else if (componentType === ComponentType.COMBOBOX) {
            compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(ComboBoxComponent));
          } else if (componentType === ComponentType.TEXT_FIELD) {
            compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(TextFieldComponent));
          } else if (componentType === ComponentType.CHECKBOX) {
            compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(CheckboxComponent));
          } else if (componentType === ComponentType.RADIO) {
            compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(RadioButtonComponent));
          } else if (componentType === ComponentType.TEXTAREA) {
            compRef = this.dialog.viewContainer.createComponent(compFactory.resolveComponentFactory(TextAreaComponent));
          } else {
            throw new Error("Unknown component type: " + componentType);
          }

          if (compRef != null) {
            comp = compRef.instance;
            comp.compRef = compRef;
            comp.compRef.changeDetectorRef.detectChanges();
          }
        }

      } catch (e) {
        console.error("fail to create component: " + e);
      }
    }

    return comp;
  }


  /**
   * @deprecated DO NOT USE THIS! Exists only for legacy support
   * @param id
   */
  _removeComponent(id: string) {
    const child = this.findElementById(id);

    if (child != null) {
      child.destroyComponent();
    } else {
      if (
        this.dialog != null &&
        this.dialog.viewContainer != null &&
        (this.dialog.viewContainer as any)._embeddedViews != null &&
        Array.isArray((this.dialog.viewContainer as any)._embeddedViews) &&
        (this.dialog.viewContainer as any)._embeddedViews.length > 0
      ) {
        try {
          const ev = (this.dialog.viewContainer as any)._embeddedViews;

          for (let v of ev) {
            if (v.nodes && Array.isArray(v.nodes) && v.nodes.length > 0) {

              for (let n of v.nodes) {
                if (n.instance != null && n.instance.id === id) {
                  if (typeof n.instance.destroyComponent === 'function') {
                    n.instance.destroyComponent()

                    /* istanbul ignore if */
                    if (AppUtils.enableLogging === true) {
                      console.info("Removed component: " + id);
                    }
                  }
                  break;
                }
              }
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }


  /**
   * Check if this view can be active
   * @returns True if view can be active or parent is null
   */
  isView(): boolean {
    return this.canBeActiveView !== false ? true : (this.getParent() == null ? true : false);
  }


  /**
   * Check if this view can't be active view
   * @returns True if view can't be active view
   */
  isNoneActiveView(): boolean {
    return this.canBeActiveView === false;
  }

  /**
   * Check if this is a dynamic page
   * @returns True if it is a dynamic page
   */
  isDynamicView(): boolean {
    return this.isDynamicPage === true ? true : false;
  }

  /**
   * Set [[DialogComponent]] instance z-index
   * @param newZIndex
   */
  updateZIndex(newZIndex: number) {
    if (this.dialog != null && this.isDestroyed !== true && this.disabled != true) {
      this.dialog.updateZIndex(newZIndex);
      this.zIndex = newZIndex;
    }
  }


  /**
   * Get JSON representation of this component
   * @returns Object JSON metadata for this component
   */
  toJson(): {} {
    const json: any = super.toJson();
    this.setJson(json, "screenIndex", this.getScreenIndex());

    if (this.getSession().getMcoContainer().activeView().getId() === this.getId() && UiDocument.menuItemElementMap != null) {
      const menuItems: Array<{}> = [];
      const keySet = UiDocument.menuItemElementMap.keys();
      let keyIt = keySet.next();

      while(keyIt.done !== true) {
        menuItems.push(UiDocument.menuItemElementMap.get(keyIt.value).toJson());
        keyIt = keySet.next();
      }

      if (this._inactiveMenuItems != null) {
        const keyIt = this._inactiveMenuItems.values();
        let rs = keyIt.next();

        while(rs.done !== true) {
          menuItems.push(rs.value.toJson());
          rs = keyIt.next();
        }
      }

      if (json["children"] != null) {
        json["children"] = json["children"].concat(menuItems);
      } else {
        json["children"] = menuItems;
      }
    }

    return json;
  }

  /**
   * Add component id to [[defIds]]
   * @param id
   */
  trackDef(id: string) {
    this.defIds.push(id);
  }

  private static closeOnInit = { idSet : new Set<string>(), types : new Set<Type<ViewComponent>>(), hooked : false };

  static hasIdAsCloseTargetOnInit(viewId: string): boolean {
    return ViewComponent.closeOnInit.idSet.has(viewId);
  }

  static hasTypeAsCloseTargetOnInit(viewType: Type<ViewComponent>): boolean {
    return ViewComponent.closeOnInit.types.has(viewType);
  }

  private static hookClosePrevView2DynamicPagesService() {
    if(!ViewComponent.closeOnInit.hooked) {
      DynamicPagesService.onCreateViewCloser = (sessionService, viewType, routeId) => {
        ViewComponent.closePrevView(sessionService, routeId ? routeId : viewType);
      };
      ViewComponent.closeOnInit.hooked = true;
    }
  }

  static closePrevView(sessionService: SessionService, target: string|Type<ViewComponent>) {
    let view: ViewComponent = null;
    if((typeof target) == "string") {
      let screenId: string = target as string;
      if(ViewComponent.hasIdAsCloseTargetOnInit(screenId)) {
        view = sessionService.getMcoContainer().getViewById(screenId);
      }
    } else if(target instanceof Type) {
      let viewType: Type<ViewComponent> = target as Type<ViewComponent>;
      if(ViewComponent.hasTypeAsCloseTargetOnInit(viewType)) {
        view = _.find(sessionService.getMcoContainer().getViews(), v => v.constructor == viewType);
      }
    }

    //Vivify: if view has actionForwardName, do not close the view as we will call it handleActionForward() to refresh the screen.
    if(view && view.actionForwardName == null) {
      view.close();
    }
  }

  /**
   * Close previous version of this view (if this view is "re-open"). This is to support usage
   * of removing current view and replacing with new view
   * @param viewId
   */
  closeView(viewId: string, delayDialogClose?: boolean) {
    //if the view about to be closed has the same "id" (i.e. same screen but diff).
    const checkScreenInique = viewId === this.id;

    const oldView: ViewComponent = _.find(this.getSession().getMcoContainer().getViews(), (view: ViewComponent)=>{
      return view.id === viewId &&
        (checkScreenInique === false ||
          (checkScreenInique === true &&
            view.uniqueId !== this.uniqueId
          )
        )
      ;
    });

    if (oldView != null) {
      //for case where we are the same screen, we should't call beforeDestroyCb to cleanup
      if (checkScreenInique === true) {
        oldView.beforeDestroyCb = null;
      }

      oldView.close(delayDialogClose);
    }
    if(!this.viewIsInitialized && checkScreenInique) {
      // This case is too late to close. This object's view is already exist, reused and un-closable!
      // To save this trying, and execute closing at router before create new view.
      if(!ViewComponent.closeOnInit.idSet.has(viewId)) {
        ViewComponent.closeOnInit.idSet.add(viewId);
      }
      let oType = this.constructor as Type<ViewComponent>;
      if(!ViewComponent.closeOnInit.types.has(oType)) {
        ViewComponent.closeOnInit.types.add(oType);
      }
      ViewComponent.hookClosePrevView2DynamicPagesService();
    }
  }


  /**
   * Add a [[PopupMenuDirective]] to [[popupMenus]] property
   * @param popupMenu Popup menu to add to internal [[popupMenus]] list
   */
  registerPopupMenu(popupMenu: PopupMenuDirective) {
    if (this.popupMenus == null) {
      this.popupMenus = [];
    }

    this.popupMenus.push(popupMenu);
  }

  /**
   * Check if [[popupMenus]] has 1 or more items
   * @returns True if [[popupMenus]] is defined and has at least 1 item
   */
  hasPopupMenu() {
    return this.popupMenus != null && this.popupMenus.length > 0;
  }

  /**
   * Get the ID of the first [[PopupMenuDirective]] instance in [[popupMenus
   * @returns Id of popup menu
   */
  getFirstPopupMenuId() {
    return this.popupMenus != null && this.popupMenus.length > 0 ? this.popupMenus[0].id : null;
  }

  getAllPopupMenuId() {
    return this.popupMenus != null && this.popupMenus.length > 0 ? this.popupMenus.map(men=>men.id) : null;
  }

  /**
   * Delegate to [[BaseComponent]] findElementById method
   * @param id Component ID
   */
  findElementById(id: string): BaseComponent {
    let comp: BaseComponent = super.findElementById(id);

    if (comp == null && this._tableColumnsMap != null) {
      comp = this._tableColumnsMap.get(KeyUtils.toMapKey(id));
    }

    if (comp == null) {
      //check for inactive menu items
      comp = this.getInactiveMenuItem(id) as any;
    }

    //grandchildren table columns??
    if (this.subViews != null) {
      const viewIt = this.subViews.values();
      let result = viewIt.next();

      while(result.done !== true && comp == null) {
        if (result.value._tableColumnsMap != null) {
          comp = result.value._tableColumnsMap.get(KeyUtils.toMapKey(id));
        }

        result = viewIt.next();
      }
    }

    return comp;
  }

  /**
   * Stop change detection
   */
  freezeChangeDetection() {
    if (this.getChangeDetector() != null) {
      this.getChangeDetector().detach();
      this.changeDetectionFrozen = true;
    }
  }

  /**
   * Resume change detection if it has been stopped
   */
  unfreezeChangeDetection() {
    if (this.getChangeDetector() != null) {
      this.getChangeDetector().detectChanges();
      this.getChangeDetector().reattach();
    }

    this.changeDetectionFrozen = false;
  }

  /**
   * Check if change detection has been stopped
   * @returns True if change detection has been stopped
   */
  isChangeDetectionFrozen() {
    return this.changeDetectionFrozen === true;
  }

  /**
   * Check if this is a container component
   * @returns True
   */
  protected isContainer() {
    return true;
  }

  /**
   * Trigger change detection for parent [[BaseComponent]] and [[dialog]] instance
   */
  detectChanges() {
    super.detectChanges();

    if (this.dialog != null) {
      this.dialog.detectChanges();
    }
  }

  /**
   * Mark this component for change detection
   */
  markForCheck() {
    super.markForCheck();

    if (this.dialog != null) {
      this.dialog.markForCheck();
    }
  }

  /**
   * Show the view after it has been hidden via minimized
   */
  showView() {
    if (this.dialog != null) {
      this.dialog.showView();
    }

    delete this.isMinimized;
  }

  /**
   * Minimize the [[dialog]] of this component
   */
  minimize() {
    if (this.dialog != null) {
      this.dialog.minimize(null);
    }
  }

  /**
   * Move this component to the top of the view stack
   */
  moveToTop() {
    this.getSession().getMcoContainer().reStackView(this.id), this.screenIndex;
  }

  trackInactiveMenuItem(menuItem: MenuItemComponent) {
    const id = menuItem.getId();

    const fauxMenuItem = new HTMLElementWrapper(null, "menuItem", null);
    fauxMenuItem.setAttribute("id", id);

    if (menuItem.item != null && menuItem.item.customAttributes != null) {
      const keys = _.keys(menuItem.item.customAttributes);

      for (const key of keys) {
        if (key !== "id") {
          fauxMenuItem.setAttribute(key, menuItem.item.customAttributes[key]);
        }
      }
    }

    if (this._inactiveMenuItems == null) {
      this._inactiveMenuItems = new Map<string, HTMLElementWrapper>();
    }

    this._inactiveMenuItems.set(id, fauxMenuItem);
  }

  getInactiveMenuItem(id: string) {
    return this._inactiveMenuItems != null ? this._inactiveMenuItems.get(id) : null;
  }

  cleanup() {
    super.cleanup();

    if (this._viewChildrenMap != null) {
      const cit = this._viewChildrenMap.values();
      let val = cit.next();

      while(val.done !== true) {
        //some children are not actual BaseComponent
        if (typeof val.value.emptyChildren === "function") {
          val.value.emptyChildren();
          val.value._isDying = true;
        }

        val = cit.next();
      }
    }

    super.emptyChildren();
  }

  isModalDialog(): boolean {
    return this.dialog != null && (this.dialog.modal === true || this.dialog.modal === "true");
  }

  /**
   * Not implemented
   */
  handleActionForward() {
  }
  /**
   * screen index(0~)の文字列表現
   */
  getScreenIndex():string {
    return (this.screenIndex === undefined || this.screenIndex === null)
      ? ''
      : this.screenIndex.toString();
  }
  registerScreenIndex(){
    this.screenIndex = this.getSession().getMcoContainer().nextScreenIndex(this.baseScreenId);
  }

  setVisible(boo: boolean) {
    super.setVisible(boo);
    this.getSession().getMcoContainer().refreshBreadCrumb();
  }

  //overload addChild to check for ViewComponent children
  private addChildView(child: BaseComponent) {
    if (child instanceof ViewComponent) {
      if (this.subViews == null) {
        this.subViews = new Map<string, ViewComponent>();
      }

      this.subViews.set(child.getId(), child);
    }
  }

  requestFocus() {
    super.requestFocus();

    if (this.dialog) {
      this.dialog.requestFocus();
    }
  }

  //updateTabbables() {
    updateTabbables(isStayFocus:boolean = false) {
    if (this.dialog != null) {
      this.dialog.updateTabbables(isStayFocus);
    }
  }

  removeActiveMessageDialogs() {
    if (this._activeMessageDialogs != null) {
      this._activeMessageDialogs.forEach((dialog)=>{
        //remove all dialogs
        try {
          if (typeof dialog["close"] === "function") {
            dialog.close();
          }

        } catch(e){}
      });

      this._activeMessageDialogs.clear();
      this._activeMessageDialogs = null
    }
  }

  registerMessageDialog(messageDialog: any) {
    if (messageDialog._internalId) {
      if (this._activeMessageDialogs == null) {
        this._activeMessageDialogs = new Map<string, any>();
      }

      this._activeMessageDialogs.set(messageDialog._internalId, messageDialog);
    }
  }

  unregisterMessageDialog(messageDialog: any) {
    if (messageDialog._internalId) {
      if (this._activeMessageDialogs != null) {
        this._activeMessageDialogs.delete(messageDialog._internalId);
      }
    }
  }
}
