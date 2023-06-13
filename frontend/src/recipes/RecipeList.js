import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeList.css"

function RecipeList() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("/recipes")
            .then((response) => {
                console.log("Response data:", response.data);
                return response.json();
            })
            .then((data) => {
                setRecipes(data.recipes);
            })
            .catch((error) => {
                console.error("Error fetching recipes:", error);
            });
    }, []);


    return (
        <div className="recipe-list">
            <h2>All Recipes</h2>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                    <Link to={`/recipes/${recipe.id}`}>
                        <button>Recipe Details</button>
                    </Link>
                </div>
            ))}
            <br></br>
            <Link to="/">
                <button>Homepage</button>
            </Link>
        </div>
    );
}

export default RecipeList;