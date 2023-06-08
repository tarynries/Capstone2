import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './Homepage.css'


/** Homepage of site.
 */

function Homepage() {

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Evolution Meal Planning</h1>
                <p className="lead">All the recipes and meal planning in one, convenient place.</p>

                <p>
                    <Link className="btn btn-primary font-weight-bold mr-3"
                        to="/recipes">
                        Recipes
                    </Link>
                    <br></br>
                    <Link className="btn btn-primary font-weight-bold"
                        to="/shopping">
                        Shopping List
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Homepage;