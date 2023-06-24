const express = require("express");
const api = require("../api");
const db = require("../db");
const Recipe = require("../models/recipes");
const { NotFoundError } = require("../expressError");
// const axios = require("axios");


const router = express.Router();



/** GET /recipes => { recipes: [{ recipe1 }, { recipe2 }, ...] }
 *
 * Returns a list of all recipes.
 **/
router.get("/", async function (req, res, next) {
    // console.log("GET /recipes request received");
    try {

        // Fetch recipes from the database
        const dbRecipes = await db.query("SELECT * FROM recipes");

        // If there are recipes in the database, return them
        if (dbRecipes.rows.length > 0) {
            return res.json({ recipes: dbRecipes.rows });
        }


        const response = await api.get("/recipes/random", {
            params: {
                number: 10, // Specify the number of recipes you want to fetch
            },
            headers: {
                Accept: "application/json", // Specify that you expect a JSON response
            },
        });


        // Extract the necessary data from the Spoonacular API response
        const apiRecipes = response.data.recipes.map((recipe) => ({
            id: recipe.id,
            title: recipe.title,
            description: recipe.summary
                .replace(/<\/?b>/g, "")
                .replace(/<\/?a(?:\s+href="([^"]+)")?>/g, ""),
            image: recipe.image,
        }));


        // Store the recipes in the database
        for (const recipe of apiRecipes) {
            await db.query(
                `INSERT INTO recipes (id, title, description, image)
               VALUES ($1, $2, $3, $4)`,
                [recipe.id, recipe.title, recipe.description, recipe.image]
            );
        }

        // Fetch recipes from the database again
        const updatedDbRecipes = await db.query("SELECT * FROM recipes");
        // Fetch recipes from the database
        // const dbRecipes = await db.query("SELECT * FROM recipes");

        // Set the Cache-Control header to disable caching
        res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

        return res.json({ updatedDbRecipes });

    } catch (err) {
        if (err.response && err.response.status === 404) {
            throw new NotFoundError("Recipe not found");
        }
        return next(err);
    }
});

//  Search Recipes
router.get("/search", async function (req, res, next) {
    const { query } = req.query;

    try {
        const searchQuery = `%${query}%`;

        const dbRecipes = await db.query(
            `SELECT * FROM recipes WHERE title ILIKE $1`,
            [searchQuery]
        );

        if (dbRecipes.rows.length > 0) {
            return res.json({ recipes: dbRecipes.rows });
        } else {
            return res.json({ recipes: [] });
        }
    } catch (err) {
        return next(err);
    }
});

/** GET /recipes/gluten => { recipes: [{ recipe1 }, { recipe2 }, ...] }
 *
 * Returns a list of gluten free recipes.
 **/

router.get("/gluten", async function (req, res, next) {
    try {
        console.log("Fetching gluten free recipes...");
        const response = await api.get("/recipes/complexSearch", {
            params: {
                intolerances: "gluten",
                number: 20,
            },
            headers: {
                Accept: "application/json",
            },
        });
        console.log("Response received:", response.data);

        const apiRecipes = response.data.results.map((recipe) => ({
            id: recipe.id,
            title: recipe.title,
            description: recipe.summary
                // .replace(/<\/?b>/g, "")
                // .replace(/<\/?a(?:\s+href="([^"]+)")?>/g, ""),
                ? recipe.summary
                    .replace(/<\/?b>/g, "")
                    .replace(/<\/?a(?:\s+href="([^"]+)")?>/g, "")
                : "No description available",
            image: recipe.image,
        }));

        console.log("API recipes:", apiRecipes);

        for (const recipe of apiRecipes) {
            await db.query(
                `INSERT INTO recipes (id, title, description, image)
           VALUES ($1, $2, $3, $4)`,
                [recipe.id, recipe.title, recipe.description, recipe.image]
            );
        }

        const dbRecipes = await db.query("SELECT * FROM recipes");
        console.log("DB recipes:", dbRecipes.rows);

        res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

        return res.json({ apiRecipes, dbRecipes });
    } catch (err) {
        if (err.response && err.response.status === 404) {
            throw new NotFoundError("Recipe not found");
        }
        return next(err);
    }
});




/** GET /recipes/dairy => { recipes: [{ recipe1 }, { recipe2 }, ...] }
 *
 * Returns a list of dairy free recipes.
 **/

router.get("/dairy", async function (req, res, next) {
    try {
        const response = await api.get("/recipes/complexSearch", {
            params: {
                intolerances: "dairy",
                number: 20,
            },
            headers: {
                Accept: "application/json",
            },
        });

        const apiRecipes = response.data.results.map((recipe) => ({
            id: recipe.id,
            title: recipe.title,
            description: recipe.summary
                ? recipe.summary
                    .replace(/<\/?b>/g, "")
                    .replace(/<\/?a(?:\s+href="([^"]+)")?>/g, "")
                : "No description available",
            image: recipe.image,
        }));


        for (const recipe of apiRecipes) {
            await db.query(
                `INSERT INTO recipes (id, title, description, image)
           VALUES ($1, $2, $3, $4)`,
                [recipe.id, recipe.title, recipe.description, recipe.image]
            );
        }

        const dbRecipes = await db.query("SELECT * FROM recipes");

        res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

        return res.json({ apiRecipes, dbRecipes });
    } catch (err) {
        if (err.response && err.response.status === 404) {
            throw new NotFoundError("Recipe not found");
        }
        return next(err);
    }
});

/** GET /recipes/breakfast => { recipes: [{ recipe1 }, { recipe2 }, ...] }
 *
 * Returns a list of breakfast recipes.
 **/

router.get("/breakfast", async function (req, res, next) {
    try {
        const response = await api.get("/recipes/complexSearch", {
            params: {
                type: "breakfast",
                number: 20,
            },
            headers: {
                Accept: "application/json",
            },
        });

        const apiRecipes = response.data.results.map((recipe) => ({
            id: recipe.id,
            title: recipe.title,
            description: recipe.summary
                ? recipe.summary
                    .replace(/<\/?b>/g, "")
                    .replace(/<\/?a(?:\s+href="([^"]+)")?>/g, "")
                : "No description available",
            image: recipe.image,
        }));

        for (const recipe of apiRecipes) {
            await db.query(
                `INSERT INTO recipes (id, title, description, image)
           VALUES ($1, $2, $3, $4)`,
                [recipe.id, recipe.title, recipe.description, recipe.image]
            );
        }

        const dbRecipes = await db.query("SELECT * FROM recipes");

        res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

        return res.json({ apiRecipes, dbRecipes });
    } catch (err) {
        if (err.response && err.response.status === 404) {
            throw new NotFoundError("Recipe not found");
        }
        return next(err);
    }
});


/** GET /recipes/maincourse => { recipes: [{ recipe1 }, { recipe2 }, ...] }
 *
 * Returns a list of breakfast recipes.
 **/

router.get("/maincourse", async function (req, res, next) {
    try {
        const response = await api.get("/recipes/complexSearch", {
            params: {
                type: "main course",
                number: 20,
            },
            headers: {
                Accept: "application/json",
            },
        });

        const apiRecipes = response.data.results.map((recipe) => ({
            id: recipe.id,
            title: recipe.title,
            description: recipe.summary
                ? recipe.summary
                    .replace(/<\/?b>/g, "")
                    .replace(/<\/?a(?:\s+href="([^"]+)")?>/g, "")
                : "No description available",
            image: recipe.image,
        }));


        for (const recipe of apiRecipes) {
            await db.query(
                `INSERT INTO recipes (id, title, description, image)
           VALUES ($1, $2, $3, $4)`,
                [recipe.id, recipe.title, recipe.description, recipe.image]
            );
        }

        const dbRecipes = await db.query("SELECT * FROM recipes");

        res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

        return res.json({ apiRecipes, dbRecipes });
    } catch (err) {
        if (err.response && err.response.status === 404) {
            throw new NotFoundError("Recipe not found");
        }
        return next(err);
    }
});

/** GET /recipes/:id => { recipe }
 *
 * Returns the recipe with the given ID.
 **/
router.get("/:id", async function (req, res, next) {
    try {
        const id = req.params.id;

        // Make a request to the Spoonacular API to fetch recipe details
        const response = await api.get(`/recipes/${id}/information`);

        // Extract the necessary data from the Spoonacular API response
        const recipe = {
            id: response.data.id,
            title: response.data.title,
            description: response.data.summary
                .replace(/<\/?b>/g, "")
                .replace(/<\/?a(?:\s+href="([^"]+)")?>/g, ""),
            image: response.data.image,
            ingredients: response.data.extendedIngredients.map((ingredient) => ingredient.original),
            instructions: response.data.instructions ? response.data.instructions
                .replace(/<[^>]+>/g, "")
                .split("\n") : [],
            // Add any other necessary fields you want to include in the response
        };

        // Make a separate request to fetch the recipe's nutrition label as an HTML widget
        const nutritionResponse = await api.get(`/recipes/${id}/nutritionLabel`, {
            headers: {
                Accept: "text/html", // Specify that you expect an HTML response
            },
        });

        const nutritionLabelWidget = nutritionResponse.data;

        // Include the nutrition label widget in the response
        recipe.nutritionLabelWidget = nutritionLabelWidget;

        return res.json({ recipe });
    } catch (err) {
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        return next(err);
    }
});



// Other route handlers for recipe routes...

module.exports = router;
