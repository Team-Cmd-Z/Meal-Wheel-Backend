'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ingredients: { type: String, required: true },
  directions: { type: String, required: true },
  notes: { type: String, required: false }
});

const recipeModel = mongoose.model('recipe', recipeSchema);

module.exports = recipeModel;
