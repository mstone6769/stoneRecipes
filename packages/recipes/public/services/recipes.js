'use strict';

angular.module('mean.recipes').factory('Recipes', ['$resource',
    // function() {
    //     return {
    //         name: 'recipes'
    //     };
    // }
    function($resource) {
		return $resource('recipes/:recipeId', {
			recipeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
