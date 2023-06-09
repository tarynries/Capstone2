import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Redirect, useNavigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import RecipeList from "../recipes/RecipeList";
import RecipeDetails from "../recipes/RecipeDetails";

/** Site-wide routes.
 *
 */

function AppRoutes() {
    const navigate = useNavigate();
    const recipeData = [
        {
            id: 1,
            title: "Recipe 1",
            description: "This is recipe 1",
            ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
            instructions: [
                "Step 1: Do this.",
                "Step 2: Do that.",
                "Step 3: Complete the recipe.",
            ],
        },
        {
            id: 2,
            title: "Recipe 2",
            description: "This is recipe 2",
            ingredients: ["Ingredient A", "Ingredient B", "Ingredient C"],
            instructions: [
                "Step 1: Do this.",
                "Step 2: Do that.",
                "Step 3: Complete the recipe.",
            ],
        },
        {
            id: 3,
            title: "Recipe 3",
            description: "This is recipe 3",
            ingredients: ["Ingredient X", "Ingredient Y", "Ingredient Z"],
            instructions: [
                "Step 1: Do this.",
                "Step 2: Do that.",
                "Step 3: Complete the recipe.",
            ],
        },
        // Add more recipe objects as needed
    ];


    return (

        // need to edit this piece 
        <div className="pt-5">

            <Routes>

                <Route path="*" element={<Homepage />} ></Route>

                <Route path="/recipes" element={<RecipeList recipes={recipeData} />} ></Route>

                <Route path="/recipes/:id" element={<RecipeDetails recipes={recipeData} />} ></Route>

                {/* <Route path="/shopping" element={<ShoppingList />}></Route> */}

                <Route path="*" element={() => {
                    navigate("/");
                    return null;
                }} ></Route>
            </Routes>



        </div>
    );
}

export default AppRoutes;