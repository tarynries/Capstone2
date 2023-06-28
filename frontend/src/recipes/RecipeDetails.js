import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetails.css"

function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [nutritionLabelWidget, setNutritionLabelWidget] = useState("");
    console.log(useParams());

    useEffect(() => {
        fetch(`http://localhost:3001/recipes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setRecipe(data.recipe);
                setNutritionLabelWidget(data.recipe.nutritionLabelWidget);
            })
            .catch((error) => {
                console.error("Error fetching recipe details:", error);
            });
    }, [id]);

    const goBack = () => {
        navigate("/recipes");
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }


    return (
        <div className="recipe-detail">
            <h2 className="recipe-title">{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            <h4>Description:</h4>
            <p className="recipe-description">{recipe.description}</p>
            <h4>Ingredients:</h4>
            <ul className="recipe-ingredients">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h4>Instructions:</h4>
            <ol className="recipe-instructions">
                {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
            <div className="nutrition-label-container"
                dangerouslySetInnerHTML={{ __html: nutritionLabelWidget }}></div>
            <button className="recipe-button" onClick={goBack}>All Recipes</button>
        </div>
    );
}

export default RecipeDetails;

