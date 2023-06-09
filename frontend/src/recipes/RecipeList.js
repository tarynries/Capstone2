import React from "react";
import { Link } from "react-router-dom";
import "./RecipeList.css"

function RecipeList({ recipes }) {
    return (
        <div className="recipe-list">
            <h2>Recipe List</h2>
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