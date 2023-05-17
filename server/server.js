const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const User = require("./model/User.js");
const bcrypt = require("bcryptjs");
const LeaderBoard = require("./model/LeaderBoard.js");
// const UserSchema = require("./model/User.js");
const dotenv = require("dotenv").config();

const app = express();
const connectionString = process.env.MONGO_URL;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

mongoose.connect(connectionString).then(console.log("Server connection OK!"));

// name and password validation
app.get("/:name/:password", async (req, res) => {
  //console.log(req.params.name, req.params.password);

  try {
    let foundUser = await User.findOne({ name: req.params.name });

    !foundUser
      ? res.json("Incorrect name!")
      : foundUser.password === req.params.password
      ? res.json(foundUser)
      : res.json("Incorrect password!");
  } catch (error) {
    res.json(error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const userNameExists = await User.findOne({ name: req.body.name });

    if (!userNameExists) {
      let newUser = await User.create(req.body);
      res.json(newUser);
    } else {
      res.json("User already exists!");
    }
  } catch (error) {
    res.json(error);
  }
});

app.patch("/api/score", async (req, res) => {
  console.log(req.body.name, req.body.score);
  try {
    await User.findOneAndUpdate(
      { name: req.body.name },
      { $inc: { points: req.body.score } },
      { new: true }
    );
    const responseBody = await User.find({}, { name: 1, points: 1 }).sort({
      points: "desc",
    });

    console.log(responseBody);

    res.json(responseBody);
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => console.log("Server started on port 3001"));
