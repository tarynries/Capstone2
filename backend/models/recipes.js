const db = require("../db");
const { NotFoundError } = require("../expressError");

class Recipe {
    /** Get all recipes */
    static async getAll() {
        const result = await db.query(
            `SELECT r.recipe_id, r.title, r.description, r.image_url, r.meal_category_id, mc.name AS meal_category_name
            FROM recipes AS r
            JOIN meal_categories AS mc ON r.meal_category_id = mc.meal_category_id
            ORDER BY r.title`
        );

        return result.rows;
    }

    /** Get all breakfast recipes */
    static async getBreakfast() {
        const result = await db.query(
            `SELECT r.recipe_id, r.title, r.description, r.image_url, r.meal_category_id, mc.name AS meal_category_name
       FROM recipes AS r
       JOIN meal_categories AS mc ON r.meal_category_id = mc.meal_category_id
       WHERE mc.name = 'breakfast'
       ORDER BY r.title`
        );

        return result.rows;
    }


    /** Get recipe by ID */
    static async getById(id) {
        const result = await db.query(
            `SELECT r.recipe_id, r.title, r.description, r.image_url, r.meal_category_id, mc.name AS meal_category_name
            FROM recipes AS r
            JOIN meal_categories AS mc ON r.meal_category_id = mc.meal_category_id
            WHERE r.recipe_id = $1`,
            [id]
        );
        const recipe = result.rows[0];

        if (!recipe) {
            throw new NotFoundError(`Recipe not found with ID: ${id}`);
        }

        return recipe;
    }
}


module.exports = Recipe;