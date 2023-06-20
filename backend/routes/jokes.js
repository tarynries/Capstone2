const express = require("express");
const api = require("../api");
const db = require("../db");
const { NotFoundError } = require("../expressError");

const router = express.Router();

router.get("/", async function (req, res, next) {
    try {
        const response = await api.get("/food/jokes/random", {
            params: {
                number: 10,
            },
            headers: {
                Accept: "application/json",
            },
        });

        console.log("response", response);

        const MAX_JOKE_LENGTH = 255;

        const apiJokes = [];
        if (response.data.text) {
            const joke = {
                id: null,
                text: response.data.text.substring(0, MAX_JOKE_LENGTH),
            };
            apiJokes.push(joke);
        }

        for (const joke of apiJokes) {
            const result = await db.query(`INSERT INTO jokes (text) VALUES ($1)`, [joke.text]);

            const insertedJoke = result.rows[0];
            joke.id = insertedJoke ? insertedJoke.id : null;
        }

        const dbJokes = await db.query("SELECT * FROM jokes");
        const jokes = dbJokes.rows.map((joke) => joke.text);

        res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

        return res.json({ joke: jokes ? jokes.text : null });
    } catch (err) {
        if (err.response && err.response.status === 404) {
            throw new NotFoundError("Joke not found");
        }
        return next(err);
    }
});

module.exports = router;
