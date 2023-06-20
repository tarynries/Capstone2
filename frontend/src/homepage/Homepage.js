import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './Homepage.css'


/** Homepage of site.
 */

function Homepage() {

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Evolution Recipe Planning</h1>
                <p className="lead">Recipes and shopping list planning in one convenient place.</p>

                <p>
                    <div className="btn-container">
                        <Link className="btn btn-primary font-weight-bold mr-3"
                            to="/recipes">
                            Recipes
                        </Link>
                        <br></br>
                        <Link className="btn btn-primary font-weight-bold mr-3"
                            to="/shopping">
                            Shopping List
                        </Link>
                        <br></br>
                        <Link className="btn btn-primary font-weight-bold mr-3"
                            to="/jokes">
                            Jokes
                        </Link>
                    </div>
                    {/* <br></br>
                    <Link className="btn btn-primary font-weight-bold"
                        to="/shopping">
                        Shopping List
                    </Link> */}
                </p>

            </div>
        </div>
    );
}

export default Homepage;