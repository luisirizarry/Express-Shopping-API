const express = require("express");
const morgan = require("morgan");
const itemRoutes = require("./routes/items");
const ExpressError = require("./expressError");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/items", itemRoutes);

/** 404 handler */
app.use(function (req, res, next) {
  return next(new ExpressError("Not Found", 404));
});

/** General error handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err.message,
  });
});

module.exports = app;
