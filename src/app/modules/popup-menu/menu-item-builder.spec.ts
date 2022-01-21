 import { MenuItemBuilder } from './menu-item-builder';

 describe('MenuItemBuilder', ()=> {
     let menuItemBuilder: MenuItemBuilder;

     beforeEach(()=> {
        menuItemBuilder = new MenuItemBuilder();
     });

     it('should create an instance', ()=> {
         expect(new MenuItemBuilder()).toBeTruthy();
     });

     it('should have an array of known keys', ()=> {
         expect(MenuItemBuilder.knownKeys).toEqual([
            "id",
            "text",
            "onCommand",
            "onCommandCallback",
            "onMouseDownCallback",
            "menuItems",
            "display",
            "fontColor",
            "fontBold",
            "fontSize",
            "margin"
         ]);
     });

    it('should be able to set/get attributes', ()=> {
        menuItemBuilder.setAttribute('text', 'test');
        expect(menuItemBuilder.getAttribute('text')).toBe('test');
    });

    it('should have setText method that sets text attribute', ()=> {
        expect(menuItemBuilder.setText).toBeDefined();
        menuItemBuilder.setText('Hello');
        expect(menuItemBuilder.getAttribute('text')).toBe('Hello');
    });

    it('should have setMargin method that sets margin attribuge', ()=> {
        expect(menuItemBuilder.setMargin).toBeDefined();
        menuItemBuilder.setMargin('1rem');
        expect(menuItemBuilder.getAttribute('margin')).toBe('1rem');
    });

    it('should have setOnMouseDown method that sets mousedown callback', ()=> {
        const mockCallback = (e: MouseEvent)=> {
            // NO-OP
        };
        expect(menuItemBuilder.setOnMouseDown).toBeDefined();
        menuItemBuilder.setOnMouseDown(mockCallback);
        expect(menuItemBuilder.getAttribute('onMouseDownCallback')).toEqual(mockCallback);
    });

    it('should have setFontSize method that sets the font size attribute', ()=> {
        expect(menuItemBuilder.setFontSize).toBeDefined();
        menuItemBuilder.setFontSize('16px');
        expect(menuItemBuilder.getAttribute('fontSize')).toBe('16px');
    });

    it('should have setFontBold method that sets the font bold attribute', ()=> {
        expect(menuItemBuilder.setFontBold).toBeDefined();
        menuItemBuilder.setFontBold('bold');
        expect(menuItemBuilder.getAttribute('fontBold')).toBe('bold');
    });

    it('should have toMenuItem method that converts attributes to a MenuItem', ()=> {
        expect(menuItemBuilder.toMenuItem).toBeDefined();
        const menuItem = menuItemBuilder.toMenuItem();
        expect(menuItem).toBeDefined();
        expect(menuItem.text).toBe(menuItemBuilder.getAttribute('text'));
    });
 });