import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeList.css"


function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = () => {
        let url = "http://localhost:3001/recipes";
        if (searchQuery) {
            url = `${url}/search?query=${searchQuery}`;
        }

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.recipes) {
                    setRecipes(data.recipes.slice(0, 200));
                } else {
                    setRecipes([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching recipes:", error);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchRecipes();
    };

    return (
        <div>
            <nav className="navbar">
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
                    <li>
                        <Link to="/">
                            <button>Homepage</button>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="recipe-list">
                <div className="title-search-container">
                    <h2>All Recipes</h2>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search recipes..."
                        />
                        <button type="submit">Search</button>
                    </form>
                </div >
                <div className="recipes-container">
                    {recipes.length > 0 ? (
                        recipes.map((recipe, index) => (
                            <div key={`${recipe.id}-${index}`}>
                                <h3>{recipe.title}</h3>
                                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                                <Link to={`/recipes/${recipe.id}`}>
                                    <button>Recipe Details</button>
                                </Link>
                            </div>

                        ))
                    ) : (
                        <p>No recipes found.</p>
                    )}
                </div>
                <br />
                <Link to="/">
                    <button>Homepage</button>
                </Link>
            </div>
        </div >
    );
}

export default RecipeList;