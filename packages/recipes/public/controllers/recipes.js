'use strict';

angular.module('mean.recipes').controller('RecipesController', ['$scope', '$stateParams', '$location', 'Global', 'Recipes',
    function($scope, $stateParams, $location,  Global, Recipes) {
        $scope.global = Global;
        $scope.package = {
            name: 'recipes'
        };

        $scope.hasAuthorization = function(recipe) {
            if (!recipe || !recipe.user) return false;
            return $scope.global.isAdmin || recipe.user._id === $scope.global.user._id;
        };



		$scope.wholeNumbers = [
			{value: 0},
			{value: 1},
			{value: 2},
			{value: 3},
			{value: 4},
			{value: 5},
			{value: 6},
			{value: 7},
			{value: 8},
			{value: 9},
			{value: 10}, 
			{value: 11},
			{value: 12}
		];
		

		$scope.measurements = [
			{name: 'tablespoon(s)'},
			{name: 'teaspoon(s)'}, 
			{name: 'cup(s)'},
			{name: 'fluid ounce(s)'}, 
			{name: 'pint(s)'}, 
			{name: 'quart(s)'}, 
			{name: 'gallon(s)'}, 
			{name: 'ounce(s)'}, 
			{name: 'mililiter(s)'}, 
			{name: 'pound(s)'}, 
			{name: 'liter(s)'}
		];
		
		$scope.fractions = [
			{fraction: '0', value: 0},
			{fraction: '1/16', value: 0.0625},
			{fraction: '1/8', value: 0.125},
			{fraction: '1/6', value: 0.1667},
			{fraction: '3/16', value: 0.1875},
			{fraction: '1/4', value: 0.25},
			{fraction: '5/16', value: 0.3125},
			{fraction: '1/3', value: 0.3333},
			{fraction: '3/8', value: 0.375},
			{fraction: '7/16', value: 0.4375},
			{fraction: '1/2', value: 0.5},
			{fraction: '9/16', value: 0.5625},
			{fraction: '5/8', value: 0.625},
			{fraction: '2/3', value: 0.667},
			{fraction: '11/16', value: 0.6875},
			{fraction: '3/4', value: 0.75},
			{fraction: '13/16', value: 0.8125},
			{fraction: '5/6', value: 0.833},
			{fraction: '7/8', value: 0.875},
			{fraction: '15/16', value: 0.9375} 
		];


				

        $scope.create = function() {
						
            var recipe = new Recipes({
                title: this.title,
                ingredients: this.ingredients,
                description: this.description
            });

            recipe.$save(function(response) {
                $location.path('recipes/' + response._id);
            });

            this.title = '';
            this.description = '';
        };

        $scope.remove = function(recipe) {
            if (recipe) {
                recipe.$remove();

                for (var i in $scope.recipes) {
                    if ($scope.recipes[i] === recipe) {
                        $scope.recipes.splice(i, 1);
                    }
                }
            } else {
                $scope.recipe.$remove(function(response) {
                    $location.path('recipes');
                });
            }
        };

        $scope.update = function() {
            var recipe = $scope.recipe;
            if (!recipe.updated) {
                recipe.updated = [];
            }
            recipe.updated.push(new Date().getTime());

            recipe.$update(function() {
                $location.path('recipes/' + recipe._id);
            });
        };

        $scope.find = function() {
            Recipes.query(function(recipes) {
                $scope.recipes = recipes;
            });
        };
				
		$scope.isSelected = function (theSelected, currentItem) {
			if (theSelected === currentItem) {
				return 'selected';
			} 
		};
		
		
		// $scope.createForm = function() {
		// 	$scope.ingredient = {amount : '1'};
		// };

		
		if(typeof $scope.ingredients === 'undefined') {
		    $scope.ingredients = [
			    {name:'', amount: 1, amountFraction: 0, measurement: 'tablespoon(s)'}
			  ];
		  }
		

		$scope.addIngredient = function () {
			if(typeof $scope.ingredients === 'undefined') {
			    $scope.ingredients = [];
			  }
	    	$scope.ingredients.push({name:'', amount: 1, amountFraction: 0, measurement: 'tablespoon(s)'});
	  	};

        $scope.findOne = function() {
            Recipes.get({
                recipeId: $stateParams.recipeId
            }, function(recipe) {
                $scope.recipe = recipe;
								$scope.ingredients = recipe.ingredients;
								//$scope.ingredient.amount = $scope.wholeNumbers[1];
            });
        };

    }
]);
