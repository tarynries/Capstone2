import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetails.css"

function RecipeDetails({ recipes }) {
    const { id } = useParams();
    const recipe = recipes.find((recipe) => recipe.id === Number(id));
    const navigate = useNavigate();

    if (!recipe) {
        return <div>Recipe not found!</div>;
    }

    const goBack = () => {
        navigate("/recipes");
    };

    return (
        <div className="recipe-detail">
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.description}</p>
            <h4>Ingredients:</h4>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h4>Instructions:</h4>
            <ol>
                {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
            <button onClick={goBack}>All Recipes</button>
        </div>
    );
}

export default RecipeDetails;



{/* API has an analyze recipes link that could potentially be used for recipe instructions  */ }