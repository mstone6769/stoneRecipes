'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Recipe = mongoose.model('Recipe'),
    _ = require('lodash');


/**
 * Find recipe by id
 */
exports.recipe = function(req, res, next, id) {
    Recipe.load(id, function(err, recipe) {
        if (err) return next(err);
        if (!recipe) return next(new Error('Failed to load recipe ' + id));
        req.recipe = recipe;
        next();
    });
};

/**
 * Create an recipe
 */
exports.create = function(req, res) {
    var recipe = new Recipe(req.body);
    recipe.user = req.user;

    recipe.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                recipe: recipe
            });
        } else {
            res.jsonp(recipe);
        }
    });
};

/**
 * Update an recipe
 */
exports.update = function(req, res) {
    var recipe = req.recipe;

    recipe = _.extend(recipe, req.body);

    recipe.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                recipe: recipe
            });
        } else {
            res.jsonp(recipe);
        }
    });
};

/**
 * Delete an recipe
 */
exports.destroy = function(req, res) {
    var recipe = req.recipe;

    recipe.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                recipe: recipe
            });
        } else {
            res.jsonp(recipe);
        }
    });
};

/**
 * Show an recipe
 */
exports.show = function(req, res) {
    res.jsonp(req.recipe);
};

/**
 * List of Recipes
 */
exports.all = function(req, res) {
    Recipe.find().sort('-created').populate('user', 'name username').exec(function(err, recipes) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(recipes);
        }
    });
};
