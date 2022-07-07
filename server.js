'use strict';

// ---------- REQUIRES ----------
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recipes = require('./modules/recipes.js');
const axios = require('axios');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// ------------ USE ----------
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3002;

// ----------------- ROUTES -----------------

// stuff going to mongo == build a model around.

// -------- GET -----------
//create another async function. new argument is recipe id#. use that for second url

app.get('/recipes', getRecipes);
async function getRecipes(req, res, next) {
  try {
    // TO DO -- ADD RANDOMIZER!
    let cuisine = req.query.cuisine;
    let url = `https://api.spoonacular.com/recipes/complexSearch?query=${cuisine}&number=6&apiKey=${process.env.SPOON_API_KEY}`;
    console.log(url);
    let apiResultOne = await axios.get(url);
    let recipeArr = apiResultOne.data.results;
    console.log(recipeArr[0]);
    res.status(200).send(recipeArr);
  } catch(error) {
    next(error);
  }
}

// another GET request to get specific recipe

app.get('/recipelist', getActualRecipe);
async function getActualRecipe(req, res, next) {
  try {
    let recipeId = req.query.recipeId;
    let url = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${process.env.SPOON_API_KEY}`;
    console.log(url);
    let apiResultTwo = await axios.get(url);

    let fullRecipeObj = apiResultTwo.data;
    console.log(fullRecipeObj);

    let groomedRecipe = new ActualRecipe(fullRecipeObj);

    console.log(groomedRecipe);
    res.status(200).send(groomedRecipe);
  } catch(error) {
    next(error);
  }
}

// CLASS CONSTRUCTOR

class ActualRecipe {
  constructor(fullRecipeObj){

    let ingredients = [];
    fullRecipeObj.extendedIngredients.map(obj => ingredients.push(obj.original));

    this.title = fullRecipeObj.title;
    this.ingredients = ingredients;
    this.instructions = fullRecipeObj.instructions;
    this.image = fullRecipeObj.image;
  }
}

// ------------- POST ------------

app.post('/recipes', async (req, res, next) => {
  try {
    const likedRecipe = await recipes.create(req.body);
    res.status(200).send(likedRecipe);
  } catch(error) {
    res.status(404).send('Not found.');
    next(error);
  }
});


// ------------- GET ------------
app.get('/recipes/collection', getSaved);
async function getSaved (req, res, next) {
  try {
    const savedRecipes = await recipes.find();
    res.status(200).send(savedRecipes);
  } catch (error) {
    res.status(404).send('Not found.');
    next(error);
  }
}

// ------------- POST ------------
app.put('/recipes/:id', async (req, res, next) => {
  let id = req.params.id;
  try {
    let data = req.body;
    const updatedRecipe = await recipes.findByIdAndUpdate(id, data, { new: true, overwrite: true });
    res.status(200).send(updatedRecipe);
  } catch(error) {
    next(error);
  }
});

// ------------- DELETE ------------
app.delete('/recipes/:id', deleteRecipe);
async function deleteRecipe(req, res, next) {
  let id = req.params.id;
  try {
    await recipes.findByIdAndDelete(id);
    res.status(200).send('Recipe deleted.');
  } catch(error) {
    next(error);
  }
}

app.get ('*', (req, res) => {
  res.status(404).send('Looks like that place doesn\'t exist.');
});

// ---------- ERRORS ----------
app.use((error, req, res) => {
  res.status(500).send(error.message);
});

// ---------- LISTEN ----------
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
