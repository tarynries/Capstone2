import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DairyFreeRecipeList.css";

function DairyFreeRecipeList() {
    const [dairyFreeRecipes, setDairyFreeRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/recipes/dairy")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.apiRecipes) {
                    setDairyFreeRecipes(data.apiRecipes);
                }
            })
            .catch((error) => {
                console.error("Error fetching dairy-free recipes:", error);
            });
    }, []);

    return (
        <div className="recipe-list">
            <h2>Dairy-Free Recipes</h2>
            <div className="recipes-container">
                {dairyFreeRecipes.length > 0 ? (
                    dairyFreeRecipes.map((recipe) => (
                        <div key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                            <Link to={`/recipes/${recipe.id}`}>
                                <button>Recipe Details</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No dairy-free recipes found.</p>
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

export default DairyFreeRecipeList;