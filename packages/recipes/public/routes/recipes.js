'use strict';

angular.module('mean.recipes').config(['$stateProvider',
    function($stateProvider) {

    	/// LIST
        $stateProvider.state('all recipes', {
            url: '/recipes/',
            templateUrl: 'recipes/views/list.html'
        });

        /// CREATE
        $stateProvider.state('create recipe', {
            url: '/recipes/create',
            templateUrl: 'recipes/views/create.html'
        });

        /// VIEW
        $stateProvider.state('recipe by id', {
            url: '/recipes/:recipeId',
            templateUrl: 'recipes/views/view.html'
        });

        /// EDIT
        $stateProvider.state('edit recipe', {
            url: '/recipes/:recipeId/edit',
            templateUrl: 'recipes/views/edit.html'
        });

    }
]);
