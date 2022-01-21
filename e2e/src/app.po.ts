import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getElementText(selector: string) {
    return element(by.css(`app-root ${selector}`)).getText();
  }

  getElementAttributeValue(selector: string, attributeName: string) {
    return element(by.css(`app-root ${selector}`)).getAttribute(attributeName);
  }

  getMenuAttributeValue(selector: string, attributeName: string) {
    return element(by.css(`${selector}`)).getAttribute(attributeName);
  }

  getElementCssValue(selector: string, cssName: string) {
    return element(by.css(`app-root ${selector}`)).getCssValue(cssName);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getButtonText() {
    return element(by.css('app-root vt-button')).getText();
  }

  getPanelVisiblity() {
    return element(by.css('app-root vt-panel .vt-panel.panel-1')).getCssValue('visibility');
  }

  getGridLayoutColumnsText() {
    return element.all(by.css('app-root vt-panel .panel-1 .col-sm-4')).map(item=>item.getText());
  }

  getTableHeader() {
    return element(by.css('app-root vt-table #test-table th span')).getText();
  }

  getTableHeaderTemplateText() {
    return element(by.css('app-root vt-table #test-table th label span')).getText();
  }

  getTableHeaderTemplateElementType() {
    return element(by.css('app-root vt-table #test-table th input')).getAttribute("type");
  }

  getTableFirstRowFirstColumn() {
    return element.all(by.css('app-root vt-table #test-table tbody tr')).first().all(by.css("td")).first().getText();
  }

  getTableFirstRowSecondColumnElementType() {
    return element.all(by.css('app-root vt-table #test-table tbody tr')).first().all(by.css("td input")).first().getAttribute("type");
  }

  isElementSelected(elementTagName: string, id: string) {
    return element(by.css(`app-root ${elementTagName} #${id}`)).isSelected();
  }

  clickElement(elementTagName: string, id: string) {
    return element(by.css(`app-root ${elementTagName} #${id}`)).click();
  }

  getTabText() {
    return element(by.css('app-root vt-tab-pane #test-tab-pane #tab-1-title')).getText();
  }

  clickTab2() {
    return element(by.css('app-root vt-tab-pane #test-tab-pane #tab-2-title')).click();
  }

  getTab2Content() {
    return element(by.css('app-root vt-tab-pane #test-tab-pane .tab-content #tab-2')).getText();
  }

  getTextFieldText(id: string) {
    return element(by.css(`app-root vt-text-field #${id}`)).getAttribute("value");
  }

  typeOnTextField(id: string, text: string) {
    element(by.css(`app-root vt-text-field #${id}`)).sendKeys(text);
  }

  //return attribute of the <button> element of combobox
  getComboBoxInputAttribute(id: string, attributeName: string) {
    return element(by.css(`app-root vt-combo-box #${id} input.form-control`)).getAttribute(attributeName);
  }

  getComboBoxButtonAttribute(id: string, attributeName: string) {
    return element(by.css(`app-root vt-combo-box #${id} button.dropdown-toggle`)).getAttribute(attributeName);
  }

  getComboBoxButtonCss(id: string, cssName: string) {
    return element(by.css(`app-root vt-combo-box #${id} button.dropdown-toggle.${cssName}`));
  }

  getComboBoxDropdownList(id: string) {
    return element(by.css(`app-root vt-combo-box #dropdown-${id}`));
  }

  clickOnComboDropdown(id: string) {
    element(by.css(`app-root vt-combo-box #${id} button.dropdown-toggle`)).click();
  }

  clickOnComboDropdownFirstListItem(id: string) {
    element.all(by.css(`app-root vt-combo-box #dropdown-${id} li a`)).first().click();
  }

  clickOnComboDropdownListItem(id: string, text: string) {
    element(by.xpath(`//ul[@id='dropdown-${id}']/li/a[text()='${text}']`)).click();
  }
}
