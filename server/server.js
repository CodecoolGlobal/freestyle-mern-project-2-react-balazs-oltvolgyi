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
  const { name, password } = req.params;
  try {
    let foundUser = await User.findOne({ name });
    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      res.status(200).json(foundUser);
    } else {
      res.status(401);
      throw new Error("Invalid credentials.");
    }
  } catch (error) {
    res.json(error);
  }
});

app.post("/register", async (req, res) => {
  const { name, password, password2, address, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const userNameExists = await User.findOne({ name: name });

    if (!userNameExists) {
      let user = {
        name: name,
        password: hashedPassword,
        address: address,
        email: email,
        points: 0,
      };
      let newUser = await User.create(user);
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
