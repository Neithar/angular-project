/**
 * Genre Configurations & Actions
 * @type json
 * @value {{start: GenrePO.start,
 *      openModal: GenrePO.openModal,
 *      mockGenre: GenrePO.mockGenre,
 *      inputs: {name: {inputType: string, inputElement: (ElementFinder|webdriver.WebElement|ElementArrayFinder)}},
 *      btnSubmit: (ElementFinder|webdriver.WebElement|ElementArrayFinder)}}
 */
var utils = require('./../common/utils.js');

var GenrePO = {
    start: function () {
        return browser.get('index.html');
    },
    openModal: function (){
        element(by.id('addGenre')).click()
    },
    mockGenre: function () {
        var val = '[{"name":"Thriller","num":0},{"name":"Terror","num":0},{"name":"Comedy","num":0},{"name":"Romantic","num":0}]';
        browser.executeScript("window.localStorage.setItem('genre', '" + val + "');");
    },
    inputs: {
        name: {inputType: 'text', inputElement: element(by.name('name'))}
    },
    btnSubmit: element(by.id('submit'))
};

module.exports = GenrePO;