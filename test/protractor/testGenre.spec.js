browser.ignoreSynchronization = true;

var utils = require('./common/utils.js');
var poGenre = require('./pageObjects/genre.po.js');
var poMovie = require('./pageObjects/movie.po.js');


//------------------------------------------------------------------------------

var secureSleepTimeMs = 100;

describe('Tests for Genres section', function() {

    it('Should check for invalid fields and then, valid', function () {
        // Open URL
        poGenre.start();
        //Genre get Modal
        poGenre.openModal();
        browser.waitForAngular();

        // Check for invalid genre name format
        // --------------------------------------
        utils.fillInput(poGenre.inputs.name, 'name', "m");
        poGenre.btnSubmit.click();

        // To do this test we need all the fields
        // because these fields don't use ng-invalid class
        var testFields = [
            'name'
        ];

        // Check if all the fields are invalid.
        for (var i = 0, lenArr = testFields.length; i < lenArr; i++) {
            expect(poMovie.inputs[testFields[i]].inputElement.getAttribute('class')).toMatch('ng-invalid');
        }

        // Check for valid movie name format & valid data
        // ------------------------------------------------
        browser.sleep(secureSleepTimeMs);
        poMovie.inputs.name.inputElement.clear();
        utils.fillInput(poMovie.inputs.name, 'name', "Thriller");

        expect(poMovie.inputs.name.inputElement.getAttribute('class')).not.toMatch('ng-invalid');

        browser.sleep(secureSleepTimeMs);

    });

    it('Should add new Genre', function () {
        // Open URL
        poGenre.start();
        //Genre get Modal
        poGenre.openModal();
        browser.waitForAngular();

        // Add new genre and check if alert-success appears
        // --------------------------------------
        utils.fillInput(poGenre.inputs.name, 'name', "Terror");
        poMovie.btnSubmit.click();

        var valGenre = browser.executeScript("return window.localStorage.getItem('genre');");
        expect(valGenre).toEqual('[{"name":"Terror","num":0}}]');
        expect(browser.isElementPresent(by.class('alert-success'))).toBe(true);
    });
});