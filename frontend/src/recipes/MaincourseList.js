import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MaincourseList.css";

function MainCourseRecipeList() {
    const [maincourseRecipes, setMainCourseRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/recipes/maincourse")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.apiRecipes) {
                    setMainCourseRecipes(data.apiRecipes);
                }
            })
            .catch((error) => {
                console.error("Error fetching maincourse recipes:", error);
            });
    }, []);

    return (
        <div className="recipe-list">
            <h2>Main Course Recipes</h2>
            <div className="recipes-container">
                {maincourseRecipes.length > 0 ? (
                    maincourseRecipes.map((recipe) => (
                        <div key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                            <Link to={`/recipes/${recipe.id}`}>
                                <button>Recipe Details</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No maincourse recipes found.</p>
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

export default MainCourseRecipeList;