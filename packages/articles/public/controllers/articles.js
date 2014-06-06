'use strict';

angular.module('mean').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles',
    function($scope, $stateParams, $location, Global, Articles) {
        $scope.global = Global;

        $scope.hasAuthorization = function(article) {
            if (!article || !article.user) return false;
            return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
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
						// var theingredients = new Ingredients ({
						// 							ingredient: this.ingredient,
						//               amount: this.amount,
						//               measurement: this.measurement
						// 							
						// 						});
						
            var article = new Articles({
                title: this.title,
                ingredients: this.ingredients,
                content: this.content
            });
            article.$save(function(response) {
                $location.path('articles/' + response._id);
            });

            this.title = '';
            this.content = '';
            this.ingredient = '';
						this.amount = '';
						this.amountFraction = '';
						this.measurement = '';
        };

        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function(response) {
                    $location.path('articles');
                });
            }
        };

        $scope.update = function() {
            var article = $scope.article;
            if (!article.updated) {
                article.updated = [];
            }
            article.updated.push(new Date().getTime());

            article.$update(function() {
                $location.path('articles/' + article._id);
            });
        };

        $scope.find = function() {
            Articles.query(function(articles) {
                $scope.articles = articles;
            });
        };
				
				$scope.isSelected = function (theSelected, currentItem) {
					if (theSelected === currentItem) {
						return 'selected';
					} 
				};

				
				
				
				$scope.createForm = function() {
					$scope.ingredient = {amount : '1'};
				};

				
				if(typeof $scope.ingredients === 'undefined') {
				    $scope.ingredients = [
					    {ingredient:'', amount: 1, amountFraction: 0, measurement: 'tablespoon(s)'}
					  ];
				  }
				

				$scope.addIngredient = function () {
					if(typeof $scope.ingredients === 'undefined') {
					    $scope.ingredients = [];
					  }
			    $scope.ingredients.push({ingredient:'', amount: 1, amountFraction: 0, measurement: 'tablespoon(s)'});
			  };

        $scope.findOne = function() {
            Articles.get({
                articleId: $stateParams.articleId
            }, function(article) {
                $scope.article = article;
								$scope.ingredients = article.ingredients;
								//$scope.ingredient.amount = $scope.wholeNumbers[1];
            });
        };
    }
]);
