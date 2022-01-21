import { MenuItem } from './menu-item';
/**
 * Menu item directive class. Adds menu dispay and behavior to component
 */
export declare class MenuItemDirective {
    private idName;
    private id;
    private text;
    private visible;
    private onCommand;
    private subMenuItems;
    /**
     * Convert [[MenuItemDirective]] children of parent view to [[MenuItem]]
     * @param parentScreenId
     */
    toMenuItem(parentScreenId?: string): MenuItem;
}
