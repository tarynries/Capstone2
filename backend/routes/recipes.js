const express = require("express");
const Recipe = require("../models/recipes");
const axios = require("axios");
const api = require("../api")
const { NotFoundError } = require("../expressError");

const router = express.Router();


// const BASE_URL = 'https://api.spoonacular.com'; // Base URL for the API requests
// const API_KEY = '66a73a7cd6c84d138abe08a3b2ded76e';


/** GET /recipes => { recipes: [{ recipe1 }, { recipe2 }, ...] }
 *
 * Returns a list of all recipes.
 **/
router.get("/recipes", async function (req, res, next) {
    try {
        const response = await api.get("/recipes/random", {
            params: {
                number: 10, // Specify the number of recipes you want to fetch
            },
        });
        //console statements for data 
        //transform and clean data - only use whats needed 

        // Extract the necessary data from the Spoonacular API response
        const recipes = response.data.recipes.map((recipe) => ({
            title: recipe.title,
            description: recipe.summary,
            image: recipe.image,
            // Add any other necessary fields you want to include in the response
        }));

        // Store the recipes in the database
        for (const recipe of recipes) {
            await Recipe.create(recipe);
        }
        return res.json({ recipes });
    } catch (err) {
        if (err.response && err.response.status === 404) {
            throw new NotFoundError("Recipe not found");
            // return res.status(404).json({ error: "Recipe not found" });
        }
        return next(err);
    }
});

/** GET /recipes/:id => { recipe }
 *
 * Returns the recipe with the given ID.
 **/
router.get("/recipes/:id", async function (req, res, next) {
    try {
        const recipeId = req.params.id;

        // Make a request to the Spoonacular API to fetch recipe details
        const response = await api.get(`/recipes/${recipeId}/information`);

        // Extract the necessary data from the Spoonacular API response
        const recipe = {
            title: response.data.title,
            description: response.data.summary,
            image: response.data.image,
            ingredients: response.data.extendedIngredients.map((ingredient) => ingredient.original),
            instructions: response.data.instructions ? response.data.instructions.split("\n") : [],
            // Add any other necessary fields you want to include in the response
        };

        return res.json({ recipe });
    } catch (err) {
        return next(err);
    }
});

// Other route handlers for recipe routes...

module.exports = router;
