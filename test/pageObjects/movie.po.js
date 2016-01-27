/**
 * Movie Configurations & Actions
 * @type json
 * @value {{start: MoviePO.start,
 *      openModal: MoviePO.openModal,
 *      inputs: {name: {inputType: string, inputElement: (ElementFinder|webdriver.WebElement|ElementArrayFinder)},
 *              genre: {inputType: string, inputElement: (ElementFinder|webdriver.WebElement|ElementArrayFinder)}},
 *      btnSubmit: (ElementFinder|webdriver.WebElement|ElementArrayFinder)}}
 */
var utils = require('./../common/utils.js');

var MoviePO = {
    start: function () {
        return browser.get('index.html');
    },
    openModal: function (){
        element(by.id('addMovie')).click()
    },
    inputs: {
        name: {inputType: 'text', inputElement: element(by.name('name'))},
        genre: {inputType: 'select', inputElement: element(by.name('genre'))}
    },
    btnSubmit: element(by.id('submit'))
};

module.exports = MoviePO;