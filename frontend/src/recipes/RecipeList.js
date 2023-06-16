import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeList.css"
import axios from "axios";

function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/recipes")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.apiRecipes) {
                    setRecipes(data.apiRecipes);
                } else {
                }
            })
            .catch((error) => {
                console.error("Error fetching recipes:", error);
            });
    }, []);

    console.log(recipes);
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/recipes/gluten">Gluten-Free Recipes</Link>
                    </li>
                    <li>
                        <Link to="/recipes/dairy">Dairy-Free Recipes</Link>
                    </li>
                    <li>
                        <Link to="/recipes/breakfast">Breakfast Recipes</Link>
                    </li>
                    <li>
                        <Link to="/recipes/maincourse">Main Course Recipes</Link>
                    </li>
                </ul>
            </nav>
            <div className="recipe-list">
                <h2>All Recipes</h2>
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                            <Link to={`/recipes/${recipe.id}`}>
                                <button>Recipe Details</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
                <br />
                <Link to="/">
                    <button>Homepage</button>
                </Link>
            </div>
        </div>
    );
}

export default RecipeList;