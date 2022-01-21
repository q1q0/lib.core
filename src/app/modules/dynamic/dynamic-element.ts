export interface DynamicElement {
  id?: string,
  type?: string,
  text?: string,
  value?: string,
  styles?: { [name: string]: string },
  cssClass?: string,
  onCommand?: (thisArg?: any) => void,
  onContextMenu?: (thisArg?: any) => void,
  children?: Array<DynamicElement>,
  customAttributes?: { [name: string]: string },
  visible?: boolean,
  editable?: boolean,
  enabled?: boolean,
  tooltip?: string,
  popupMenuId?: string,
  richText?: boolean
}