const express = require('express');
const { NotFoundError } = require("./expressError");


const recipeRoutes = require("./routes/recipes");

const app = express();

// Set up middleware, routes, and other configurations here

app.use(express.json());
app.use("/recipes", recipeRoutes);

// console.log("Routes registered:", app._router.stack);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    // console.log("404 Error: Route not found");
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    // console.log("Error:", err);
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });

});

module.exports = app;
