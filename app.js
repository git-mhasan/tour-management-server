const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());


//routes
const tripRoute = require('./routes/trip.route')

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.use('/api/v1/tours', tripRoute)

module.exports = app;
