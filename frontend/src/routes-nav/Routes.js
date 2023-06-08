import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Redirect, useNavigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";

/** Site-wide routes.
 *
 */

function AppRoutes() {
    return (

        // need to edit this piece 
        <div className="pt-5">

            <Routes>

                <Route path="*" element={<Homepage />} ></Route>

                <Route path="/recipes" element={<RecipeList recipes={recipes} />} ></Route>

                <Route path="/shopping" element={<ShoppingList />}></Route>

                <Route path="*" element={() => {
                    navigate("/");
                    return null;
                }} ></Route>
            </Routes>



        </div>
    );
}

export default AppRoutes;