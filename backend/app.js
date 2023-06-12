const express = require('express');
const config = require('./config');
const { NotFoundError } = require("./expressError");


const recipeRoutes = require("./routes/recipes");

const app = express();

// Set up middleware, routes, and other configurations here

app.use(express.json());
app.use("/recipes", recipeRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });

});

module.exports = app;
