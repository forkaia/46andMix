const express = require("express");
const router = express.Router();
const db = require("../../models/Users");
const bcrypt = require("bcrypt");

// @route '/users'
// HTTP GET request that gets all of the users
router.get("/", (req, res) => {
  db.find()
    .then(users => users)
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route '/users'
// HTTP POST request that creates users
router.post("/", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username
  };
  const { email, password, username } = user;
  const saltRounds = 10; // the cost factor for generating a hashed password, the higher the cost the more hashing but also more time it takes

  // first generate a salt with amount of salt rounds
  bcrypt.genSalt(saltRounds, (err, salt) => {
    // take salt as an argument in the bcrypt hash method to generate hashed password
    bcrypt.hash(password, salt, (err, hash) => {
      db.create({
        email,
        password: hash, // stores the hashed password into the MongoDB
        username
      })
        .then(user => res.json(user))
        .then(user => Users(user).save)
        .catch(err => {
          if (err) return console.log(err);
        });
    });
  });
});

// @route '/users'
// HTTP DELETE request that deletes all of the users
router.delete("/:id", (req, res) => {
  userId = req.params.id;
  db.remove({
    _id: userId
  })
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

// @route '/users'
// HTTP PUT request that updates a user
router.put("/:id", (req, res) => {
  userId = req.params.id;
  const updatedUser = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username
  };
  const { email, password, username } = updatedUser;

  db.findByIdAndUpdate(
    {
      _id: userId
    },
    {
      email,
      password,
      username
    }
  )
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

module.exports = router;
