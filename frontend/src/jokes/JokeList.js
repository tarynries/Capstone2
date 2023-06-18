import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./JokeList.css"

function JokeList() {
    const [jokeList, setJokeList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/jokes")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Jokes data:", data);
                if (data.jokes) {
                    setJokeList(data.jokes);
                    console.log("Updated joke list:", jokeList);
                } else {
                }
            })
            .catch((error) => {
                console.error("Error fetching jokes:", error);
            });
    }, []);

    return (
        <div className="joke-list">
            <h2>Jokes</h2>
            {jokeList.length > 0 ? (
                jokeList.map((joke, index) => (

                    // <h3 key={index}>{joke}</h3>
                    <div key={index} className="joke-container">
                        <h3>{joke}</h3>
                    </div>
                ))
            ) : (
                <p>No jokes found.</p>
            )}
            <br />
            <Link to="/">
                <button>Homepage</button>
            </Link>
        </div>
    );
}

export default JokeList;