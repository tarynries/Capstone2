import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BreakfastList.css";

function BreakfastRecipeList() {
    const [breakfastRecipes, setBreakfastRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/recipes/breakfast")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.apiRecipes) {
                    setBreakfastRecipes(data.apiRecipes);
                }
            })
            .catch((error) => {
                console.error("Error fetching breakfast recipes:", error);
            });
    }, []);

    return (
        <div className="recipe-list">
            <h2>Breakfast Recipes</h2>
            <div className="recipes-container">
                {breakfastRecipes.length > 0 ? (
                    breakfastRecipes.map((recipe) => (
                        <div key={recipe.id} >
                            <h3>{recipe.title}</h3>
                            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                            <Link to={`/recipes/${recipe.id}`}>
                                <button>Recipe Details</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No breakfast recipes found.</p>
                )}
            </div>
            <br />
            <Link to="/">
                <button>Homepage</button>
            </Link>
            <Link to="/recipes">
                <button>All Recipes</button>
            </Link>
        </div>

    );
}

export default BreakfastRecipeList;