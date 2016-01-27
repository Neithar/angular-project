/**
 * Utilities for the functional testing
 * @type json
 * @values {{fillInput: Utils.fillInput, clearLocalStorage: Utils.clearLocalStorage,
 * selectOption: Utils.selectOption, hasClass: Utils.hasClass, clearField: Utils.clearField}}
 */
var Utils = {
    fillInput: function (element, elementName, value) {
        switch (element.inputType) {
            case 'text':
                element.inputElement.sendKeys(value);
                break;
            case 'select':
                selectOption(elementName, value);
                break;
            case 'checkbox':
                if (value) element.inputElement.click();
                break;
        }
    },
    clearLocalStorage: function () {
        return browser.executeScript('localStorage.clear();');
    },
    selectOption: function (element, item) {
        selectOption(element, item);
    },
    hasClass: function (element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    },
    clearField: function (field) {
        field.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
        field.sendKeys(protractor.Key.BACK_SPACE);
        field.clear();
    }
}

/**
 * Function to select item in a select element name
 * @param elementName
 * @param item
 */
function selectOption(elementName, item) {

    var desiredOption;
    var element = browser.findElement(by.xpath('//select[@name="' + elementName + '"]'));

    element.findElements(by.tagName('option')).then(
        function (options) {
            options.some(function (option) {
                option.getText().then(function (text) {
                    if (text == item) desiredOption = option;
                    return true;
                });
            });
        }
        )
        .then(function () {
            if (desiredOption) desiredOption.click();
        });

    if (typeof milliseconds != 'undefined') browser.sleep(milliseconds);
}

module.exports = Utils;