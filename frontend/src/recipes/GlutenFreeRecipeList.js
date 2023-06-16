import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./GlutenFreeRecipeList.css";

function GlutenFreeRecipeList() {
    const [glutenFreeRecipes, setGlutenFreeRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/recipes/gluten")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.apiRecipes) {
                    setGlutenFreeRecipes(data.apiRecipes);
                }
            })
            .catch((error) => {
                console.error("Error fetching gluten-free recipes:", error);
            });
    }, []);

    return (
        <div className="recipe-list">
            <h2>Gluten-Free Recipes</h2>
            {glutenFreeRecipes.length > 0 ? (
                glutenFreeRecipes.map((recipe) => (
                    <div key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.description}</p>
                        <Link to={`/recipes/${recipe.id}`}>
                            <button>Recipe Details</button>
                        </Link>
                    </div>
                ))
            ) : (
                <p>No gluten-free recipes found.</p>
            )}
            <br />
            <Link to="/">
                <button>Homepage</button>
            </Link>
        </div>
    );
}

export default GlutenFreeRecipeList;
