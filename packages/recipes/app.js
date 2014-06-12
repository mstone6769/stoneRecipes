'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Recipes = new Module('recipes');




/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Recipes.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Recipes.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Recipes.menus.add({
        title: 'Recipes',
        link: 'all recipes',
        //roles: ['authenticated'],
        menu: 'main'
    });

    Recipes.menus.add({
        title: 'Add Recipe',
        link: 'create recipe',
        roles: ['authenticated'],
        menu: 'main'
    });

    Recipes.aggregateAsset('css','recipes.css');
    Recipes.aggregateAsset('js','sortable.js', {global: true});
    Recipes.angularDependencies(['ui.sortable']);

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Recipes.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Recipes.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Recipes.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Recipes;
});
