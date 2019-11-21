"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

// require routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const apiRoutes = require("./routes/testApi");

// require jobs
const testJob = require("./jobs/jobs").testJob;

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan("dev"));

// setup bodyParser which allows us to use req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("body-parser").text());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// declaring routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/api", apiRoutes);

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Node Demo!"
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found"
  });
});

/******************
 JOBS
******************/
testJob();

/****************
START THE SERVER
****************/
app.set("port", process.env.PORT);

const server = app.listen(app.get("port"), "0.0.0.0", () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
