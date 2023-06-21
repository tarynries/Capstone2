const request = require("supertest");
const app = require("../app"); // Replace with the path to your Express app

describe("Recipe Routes", () => {
    describe("GET /recipes", () => {
        it("should return a list of recipes", async () => {
            const res = await request(app).get("/recipes");
            console.log(res);
            // expect(res.status).toBe(200);
            // expect(res.body.recipes).toBeDefined();
            expect(Array.isArray(res.body.recipes)).toBe(true);
        });
    });
    describe("GET /recipes/search", () => {
        it("should return a list of recipes matching the search query", async () => {
            const query = "chicken";
            const res = await request(app).get(`/recipes/search?query=${query}`);
            expect(res.status).toBe(200);
            expect(res.body.recipes).toBeDefined();
            expect(Array.isArray(res.body.recipes)).toBe(true);
        });
    });

    //     describe("GET /recipes/gluten", () => {
    //         it("should return a list of gluten-free recipes", async () => {
    //             const res = await request(app).get("/recipes/gluten");
    //             expect(res.status).toBe(200);
    //             expect(res.body.apiRecipes).toBeDefined();
    //             expect(res.body.dbRecipes).toBeDefined();
    //             expect(Array.isArray(res.body.apiRecipes)).toBe(true);
    //             expect(Array.isArray(res.body.dbRecipes)).toBe(true);
    //         });
    //     });

    //     describe("GET /recipes/dairy", () => {
    //         it("should return a list of dairy-free recipes", async () => {
    //             const res = await request(app).get("/recipes/dairy");
    //             expect(res.status).toBe(200);
    //             expect(res.body.apiRecipes).toBeDefined();
    //             expect(res.body.dbRecipes).toBeDefined();
    //             expect(Array.isArray(res.body.apiRecipes)).toBe(true);
    //             expect(Array.isArray(res.body.dbRecipes)).toBe(true);
    //         });
    //     });

    //     describe("GET /recipes/breakfast", () => {
    //         it("should return a list of breakfast recipes", async () => {
    //             const res = await request(app).get("/recipes/breakfast");
    //             expect(res.status).toBe(200);
    //             expect(res.body.apiRecipes).toBeDefined();
    //             expect(res.body.dbRecipes).toBeDefined();
    //             expect(Array.isArray(res.body.apiRecipes)).toBe(true);
    //             expect(Array.isArray(res.body.dbRecipes)).toBe(true);
    //         });
    //     });

    //     describe("GET /recipes/maincourse", () => {
    //         it("should return a list of main course recipes", async () => {
    //             const res = await request(app).get("/recipes/maincourse");
    //             expect(res.status).toBe(200);
    //             expect(res.body.apiRecipes).toBeDefined();
    //             expect(res.body.dbRecipes).toBeDefined();
    //             expect(Array.isArray(res.body.apiRecipes)).toBe(true);
    //             expect(Array.isArray(res.body.dbRecipes)).toBe(true);
    //         });
    //     });

    //     describe("GET /recipes/:id", () => {
    //         it("should return the recipe with the given ID", async () => {
    //             const recipeId = "12345"; // Replace with a valid recipe ID
    //             const res = await request(app).get(`/recipes/${recipeId}`);
    //             expect(res.status).toBe(200);
    //             expect(res.body.recipe).toBeDefined();
    //             expect(res.body.recipe.id).toBe(recipeId);
    //         });

    //         it("should return a 404 error if the recipe is not found", async () => {
    //             const invalidRecipeId = "99999"; // Replace with an invalid recipe ID
    //             const res = await request(app).get(`/recipes/${invalidRecipeId}`);
    //             expect(res.status).toBe(404);
    //             expect(res.body.error).toBe("Recipe not found");
    //         });
    //     });
});
