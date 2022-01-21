import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display welcome message', () => {
    expect(page.getParagraphText()).toEqual('Vivify Core Component Library');
  });

  describe("ButtonComponent", ()=>{
    it('should display text for the button', ()=>{
      expect(page.getButtonText()).toBe('Click Me');
    });
  });

  describe("PanelComponent", ()=>{
    it('should set the visility of panel to visible', ()=>{
      expect(page.getPanelVisiblity()).toBe('visible');
    });

    it('should render panel with grid layout', ()=>{
      page.getGridLayoutColumnsText().then((rs)=>{
        expect(rs).toEqual(['Column 1', 'Column 2', 'Column 3']);
      });
    });
  });

  describe("TableComponent", ()=>{
    it('table should render table header text', ()=> {
      page.getTableHeader().then((rs)=>{
        expect(rs).toEqual("Name");
      });
    });

    it('table should render table header cell template text', ()=> {
      page.getTableHeaderTemplateText().then((rs)=>{
        expect(rs).toEqual("Smoker");
      });
    });

    it('table should should render table header cell template', ()=> {
      page.getTableHeaderTemplateElementType().then((rs)=>{
        expect(rs).toEqual("checkbox");
      });
    });

    it('table should should render table row first column as plain text', ()=> {
      page.getTableFirstRowFirstColumn().then((rs)=>{
        expect(rs).toEqual("Homer Simpson");
      });
    });

    it('table should should render table row second column as checkbox', ()=> {
      page.getTableFirstRowSecondColumnElementType().then((rs)=>{
        expect(rs).toEqual("checkbox");
      });
    });
  });

  describe("CheckBoxComponent", ()=>{
    it('apple checkbox should checked', ()=>{
      page.isElementSelected('vt-check-box', 'chkApple').then(val=>{
        expect(val).toEqual(true);
      });
    });

    it('apple checkbox should NOT checked after clicked', ()=>{
      page.clickElement('vt-check-box', 'chkApple').then(()=>{
        page.isElementSelected('vt-check-box', 'chkApple').then(val=>{
          expect(val).toEqual(false);
        });
      });
    });

    it('orange checkbox should not checked', ()=>{
      page.isElementSelected('vt-check-box', 'chkOrange').then(val=>{
        expect(val).toEqual(false);
      });
    });

    it('orange checkbox should checked after clicked', ()=>{
      page.clickElement('vt-check-box', 'chkOrange').then(()=>{
        page.isElementSelected('vt-check-box', 'chkOrange').then(val=>{
          expect(val).toEqual(true);
        });
      });
    });
  });

  describe("RadioButtonComponent", ()=>{
    it('should checked when checked attribute is set to true', ()=>{
      page.isElementSelected('vt-radio-button', 'grpLemo').then(val=>{
        expect(val).toEqual(true);
      });
    });

    it('orange radio should not checked', ()=>{
      page.isElementSelected('vt-radio-button', 'grpOrange').then(val=>{
        expect(val).toEqual(false);
      });
    });

    it('apple radio should checked when clicked', ()=>{
      page.clickElement('vt-radio-button', 'grpApple');
      page.isElementSelected('vt-radio-button', 'grpApple').then(val=>{
        expect(val).toEqual(true);
      });
    });

    it('orange radio should NOT checked when other radio is clicked', ()=>{
      page.clickElement('vt-radio-button', 'grpApple');
      page.isElementSelected('vt-radio-button', 'grpOrange').then(val=>{
        expect(val).toEqual(false);
      });
    });
  });

  describe("TabComponent", ()=>{
    it('should display text for tab', ()=> {
      expect(page.getTabText()).toEqual('tab1');
    });

    it('should return tab2 content', ()=>{
      page.clickTab2();
      expect(page.getTab2Content()).toBe("tab content 2");
    });
  });

  //text field
  describe("TextFieldComponent", ()=>{
    it('textfield should set text', ()=>{
      expect(page.getTextFieldText("txt-field-text")).toEqual("Hello world");
    });

    it('textfield should set text', ()=>{
      expect(page.getTextFieldText("txt-field-blank")).toEqual("");
    });

    it('typing should trigger change', ()=>{
      const test: string = "Testing string";
      page.typeOnTextField("txt-field-blank", test);
      expect(page.getTextFieldText("txt-field-blank")).toEqual(test);
    });

    it("should not be disabled", ()=>{
      expect(page.getElementAttributeValue("input#txt-field-blank", "disabled")).toBeFalsy();
    });

    it("should not be readonly", ()=>{
      expect(page.getElementAttributeValue("input#txt-field-blank", "readonly")).toBeFalsy();
    });

    it("should be readonly when editable is set to false", ()=>{
      expect(page.getElementAttributeValue("input#txt-field-text", "readonly")).toBeTruthy();
    });
    
    it("should enforce maxLength", ()=>{
      page.typeOnTextField("textFieldMaxLength", "hello world");
      expect(page.getTextFieldText("textFieldMaxLength")).toEqual("hello");
    });
  });

  //combobox
  describe("ComboBoxComponent", ()=>{
    it("input element should be readonly", ()=>{
      expect(page.getComboBoxInputAttribute("test-combobox", "readonly")).toBeTruthy();
    });

    it("should be enabled by default", ()=>{
      expect(page.getComboBoxButtonAttribute("test-combobox", "disabled")).toBeFalsy();
    });

    describe("when it is enabled", ()=>{
      it("should display dropdown list when clicked", ()=>{
        page.clickOnComboDropdown("test-combobox");
        expect(page.getComboBoxDropdownList("test-combobox")).toBeDefined();
      });

      it("should set the text of the list item to input field when list item is selected", ()=>{
        page.clickOnComboDropdown("test-combobox");
        page.clickOnComboDropdownListItem("test-combobox", "Apple");
        expect(page.getComboBoxInputAttribute("test-combobox", "value")).toEqual("Apple");
      });

      // it("should display empty space as &nbsp;", ()=>{
      //   page.clickOnComboDropdown("test-combobox");
      //   page.clickOnComboDropdownListItem("test-combobox", "&nbsp;");
      //   expect(page.getComboBoxInputAttribute("test-combobox", "value")).toEqual("");
      // });
    });

    describe("when it is disabled", ()=>{
      it("should be disabled when disabled is set to true", ()=>{
        expect(page.getComboBoxButtonCss("test-combobox-disabled", "vt-disabled-combobox")).toBeDefined();
      });

      it("should not dropdown list when clicked", ()=>{
        page.clickOnComboDropdown("test-combobox-disabled");
        expect(page.getComboBoxDropdownList("test-combobox-disabled")).toBeDefined();
      });
    });
  });

  describe("LabelComponent", ()=>{
    const labelId: string = "span#label-test";

    it("should display the text property", ()=>{
      expect(page.getElementText(labelId)).toEqual("I am a label");
    });

    it("should set font-weight property to bold when fontBold is true", ()=>{
      expect(page.getElementCssValue(labelId, "font-weight")).toEqual("700");
    });

    it("should set font-style property to italic when fontItalic is true", ()=>{
      expect(page.getElementCssValue(labelId, "font-style")).toEqual("italic");
    });

    it("should set text-decoration property to underline when fontUnderline is true", ()=>{
      expect(page.getElementCssValue(labelId, "text-decoration")).toContain("underline");
    });
  });

  describe("TreeTableComp", ()=>{
    const treeTableId: string = "tree-table-test";
    const buttonId: string = "tree-table-button";

    beforeEach(()=>{
      page.clickElement("", buttonId);
    });

    it("should render parent correctly", ()=>{
      expect(page.getElementAttributeValue(`#${treeTableId} tr td`, "innerHTML")).toContain("Homer");
    });

    it("should render child correctly", ()=>{
      expect(page.getElementAttributeValue(`#${treeTableId} tr.leaf td`, "innerHTML")).toContain("Bart");
    });
  });

  describe("PopupMenuComponent", ()=>{
    const popupId = "popup-menu-button";

    it("should display popup when show() is call", ()=>{
      page.clickElement("", popupId);
      expect(page.getMenuAttributeValue("#NgnsSCR_SoOrd_EntryConposi01_MniChange", "innerHTML")).toEqual("変更");
    });
  });
});
