// 'use strict';

// // The Package is past automatically as first parameter
// module.exports = function(Recipes, app, auth, database) {

//     app.get('/recipes/example/anyone', function(req, res, next) {
//         res.send('Anyone can access this');
//     });

//     app.get('/recipes/example/auth', auth.requiresLogin, function(req, res, next) {
//         res.send('Only authenticated users can access this');
//     });

//     app.get('/recipes/example/admin', auth.requiresAdmin, function(req, res, next) {
//         res.send('Only users with Admin role can access this');
//     });

//     app.get('/recipes/example/render', function(req, res, next) {
//         Recipes.render('index', {
//             package: 'recipes'
//         }, function(err, html) {
//             //Rendering a view from the Package server/views
//             res.send(html);
//         });
//     });
// };



'use strict';

var recipes = require('../controllers/recipes');

// Recipe authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.recipe.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Recipes, app, auth) {

    app.route('/recipes')
        .get(recipes.all)
        .post(auth.requiresLogin, recipes.create);
    app.route('/recipes/:recipeId')
        .get(recipes.show)
        .put(auth.requiresLogin, hasAuthorization, recipes.update)
        .delete(auth.requiresLogin, hasAuthorization, recipes.destroy);

    // Finish with setting up the recipeId param
    app.param('recipeId', recipes.recipe);
};
