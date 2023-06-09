import React from "react";
import "./RecipeCard.css"

function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            {/* unsure if the API gives description may need to update later */}
            <p>{recipe.description}</p>
        </div>
    );
}

export default RecipeCard;