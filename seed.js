'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const recipes = require('./modules/recipes');

async function seed() {
  await recipes.create({
    title: 'Sauteed Mash Fried Eggs',
    imageUrl: 'https://media.eggs.ca/assets/RecipeThumbs/_resampled/FillWyIxMjgwIiwiNzIwIl0/Masala-Egg-Chops-CMS.jpg',
    ingredients: '2 eggs, 1 mash',
    directions: 'Use your mash to mash the eggs and sautee for 45 minutes.',
    notes: 'Do not make again.'
  });
  console.log('Cooked mashed eggs');
}

seed();
