browser.ignoreSynchronization = true;

var utils = require('./common/utils.js');
var poGenre = require('./pageObjects/genre.po.js');
var poMovie = require('./pageObjects/movie.po.js');


//------------------------------------------------------------------------------

var secureSleepTimeMs = 100;

describe('Tests for Movies section', function() {

    it('Should check for invalid fields and then, valid', function() {
        // Open URL
        poMovie.start();
        //Prefill genres
        poGenre.mockGenre();
        //Movie get Modal
        poMovie.openModal();
        browser.waitForAngular();

        // Check for invalid movie name format
        // --------------------------------------
        utils.fillInput(poMovie.inputs.name, 'name', "m");
        poMovie.btnSubmit.click();

        // To do this test we need all the fields
        // because these fields don't use ng-invalid class
        var testFields = [
            'name',
            'genre'
        ];

        // Check if all the fields are invalid.
        for(var i=0, lenArr = testFields.length; i<lenArr; i++) {
            expect(poMovie.inputs[testFields[i]].inputElement.getAttribute('class')).toMatch('ng-invalid');
        }

        // Check for valid movie name format & valid data
        // ------------------------------------------------
        browser.sleep(secureSleepTimeMs);
        poMovie.inputs.name.inputElement.clear();
        utils.fillInput(poMovie.inputs.name, 'name', "Oceans 11");
        utils.fillInput(poMovie.inputs.genre, 'genre', "Thriller");

        expect(poMovie.inputs.name.inputElement.getAttribute('class')).not.toMatch('ng-invalid');
        expect(poMovie.inputs.genre.inputElement.getAttribute('class')).not.toMatch('ng-invalid');

        browser.sleep(secureSleepTimeMs);


    });

    it('Should add new Movie', function() {
        // Open URL
        poMovie.start();
        //Prefill genres
        poGenre.mockGenre();
        //Movie get Modal
        poMovie.openModal();
        browser.waitForAngular();

        // Fill movie data (name and genre)
        // --------------------------------------
        utils.fillInput(poMovie.inputs.name, 'name', "Movie1");
        utils.fillInput(poMovie.inputs.genre, 'genre', 'Thriller');
        poMovie.btnSubmit.click();

        var valMovie = browser.executeScript("return window.localStorage.getItem('movie');");
        var valGenre = browser.executeScript("return window.localStorage.getItem('genre');");
        expect(valMovie).toEqual('[{"name":"Oceans 11","genre":"Thriller"}]');
        //Check if number of Thriller Genre movies increased to 1
        expect(valGenre).toEqual('[{"name":"Thriller","num":1},{"name":"Terror","num":0},{"name":"Comedy","num":0},{"name":"Romantic","num":0}]');
        expect(browser.isElementPresent(by.class('alert-success'))).toBe(true);

    });

});