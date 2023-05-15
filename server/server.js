const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const User = require("./model/User.js");
const LeaderBoard = require("./model/LeaderBoard.js");
// const UserSchema = require("./model/User.js");

const app = express();

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
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);



mongoose.connect(
  "mongodb+srv://mongoDBuser:8xBqvbasy84EHKe@cluster0.ahid9oc.mongodb.net/flagfun"
);


// name and password validation
app.get("/:name/:password", async (req, res) => {
  //console.log(req.params.name, req.params.password);

 try {
  let foundUser = await User.findOne({name: req.params.name});

  !foundUser 
  ? res.json("Incorrect name!")
  : foundUser.password === req.params.password 
  ? res.json(foundUser) 
  : res.json("Incorrect password!")


 } catch (error) {
  res.json(error);
 }

})

app.post("/register", async (req, res) => {
  
  try {
    const userNameExists = await User.findOne({name: req.body.name});

    if (!userNameExists ) {
      let newUser = await User.create(req.body)
      res.json(newUser);
    } else {
      res.json("User already existst!")
    }
  } catch (error) {
    res.json(error)
  }
})

app.post("/api/score", async (req, res) => {
  // try {
  //   let newUser = req.body;
  //   // User.findOne({ name: newUser.name, email: newUser.email }).then((user) => {
  //   //   if (user) {
  //   //     res.json({ message: "User already exists!", user: user });
  //   //   } else {
  //   //const newCreatedUser = User.create(req.body)
  //   //  res.status(200).json({message:"New user created", user: newCreatedUser});
  //  // }
  //  // });
  // } catch (error) {
  //   res.status(500).json("error");
  // }

  const user = req.body.name;
  const score = req.body.score;

  const newScore = new LeaderBoard({
    name: user,
    score: score,
  });
  newScore.save().then(() => { LeaderBoard.find().then((data) => res.json(data)).catch(e=>console.log(e)) })
  ;
});

app.listen(3001, () => console.log("Server started on port 3001"));
