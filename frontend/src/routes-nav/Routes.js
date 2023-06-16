import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Redirect, useNavigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import RecipeList from "../recipes/RecipeList";
import RecipeDetails from "../recipes/RecipeDetails";
import GlutenFreeRecipeList from "../recipes/GlutenFreeRecipeList";
import DairyFreeRecipeList from "../recipes/DairyFreeRecipeList";
import BreakfastRecipeList from "../recipes/BreakfastList";
import MainCourseRecipeList from "../recipes/MaincourseList";


/** Site-wide routes.
 *
 */


// could add more static data with more details to work with just front end 
function AppRoutes() {
    const navigate = useNavigate();

    return (

        // need to edit this piece 
        <div className="pt-5">

            <Routes>

                <Route path="*" element={<Homepage />} ></Route>

                <Route path="/recipes" element={<RecipeList />} ></Route>

                <Route path="/recipes/:id" element={<RecipeDetails />} ></Route>

                <Route path="/recipes/gluten" element={<GlutenFreeRecipeList />} ></Route>

                <Route path="/recipes/dairy" element={<DairyFreeRecipeList />} ></Route>

                <Route path="/recipes/maincourse" element={<MainCourseRecipeList />} ></Route>

                <Route path="/recipes/breakfast" element={<BreakfastRecipeList />} ></Route>

                <Route path="*" element={() => {
                    navigate("/");
                    return null;
                }} ></Route>
            </Routes>



        </div>
    );
}

export default AppRoutes;