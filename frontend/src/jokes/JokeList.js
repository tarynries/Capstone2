import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./JokeList.css"

function JokeList() {
    const [jokeList, setJokeList] = useState([]);
    const [currentJokeIndex, setCurrentJokeIndex] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3001/jokes")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.jokes) {
                    setJokeList(data.jokes);
                    const randomIndex = Math.floor(Math.random() * data.jokes.length);
                    setCurrentJokeIndex(randomIndex);
                } else {
                }
            })
            .catch((error) => {
                console.error("Error fetching jokes:", error);
            });
    }, []);

    const handleNextJoke = () => {
        setCurrentJokeIndex((prevIndex) => prevIndex + 1);
    };

    return (
        <div>
            <h2 className="joke-list-title">Jokes</h2>
            <div className="joke-list-background"></div>
            <div className="joke-list">
                {jokeList.length > 0 ? (
                    <div key={currentJokeIndex} className="joke-container">
                        <h3 className="joke">{jokeList[currentJokeIndex]}</h3>
                    </div>
                ) : (
                    <p>No jokes found.</p>
                )}
                <button className="joke-button" onClick={handleNextJoke}>
                    Next Joke
                </button>
                <br />
                <Link to="/">
                    <button className="joke-button">Homepage</button>
                </Link>
            </div>
        </div>

    );
}

export default JokeList;