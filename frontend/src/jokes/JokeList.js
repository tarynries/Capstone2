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
        <div>
            <h2 className="joke-list-title">Jokes</h2>
            <div className="joke-list">
                {jokeList.length > 0 ? (
                    jokeList.map((joke, index) => (
                        <div key={index} className="joke-container">
                            <h3 className="joke">{joke}</h3>
                        </div>
                    ))
                ) : (
                    <p>No jokes found.</p>
                )}
                <br />
                <Link to="/">
                    <button className="joke-button">Homepage</button>
                </Link>
            </div>
        </div>

    );
}

export default JokeList;