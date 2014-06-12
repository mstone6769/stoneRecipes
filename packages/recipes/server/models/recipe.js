'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Recipe Schema
 */

var IngredientSchema = new Schema ({
	name: String,
	amount: Number,
	amountFraction: Number,
	measurement: String
});

var StepSchema = new Schema ({
    number: String,
    content: {
        type: String,
        default: '',
        trim: true
    }
});


// mongoose.model('Ingredients', IngredientsSchema);

var RecipeSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    ingredients: [IngredientSchema],
    directions: [StepSchema],
    description: {
        type: String,
        default: '',
        trim: true
    },
    yield: {
        type: Number,
        default: 1,
    },
    time: {
        prep: {
            type: Number,
            default: 0,
        },
        inactive: {
            type: Number,
            default: 0,
        },
        cook: {
            type: Number,
            default: 0,
        }
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
RecipeSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
RecipeSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};


mongoose.model('Recipe', RecipeSchema);
