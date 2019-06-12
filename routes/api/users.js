const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");

// router.get("/", (req, res) => {
//   res.send("test");
// });

// @route '/users'
// HTTP GET request that gets all of the users
router.get("/", (req, res) => {
  Users.find()
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

  Users.create({
    email,
    password,
    username
  })
    .then(user => res.json(user))
    .then(user => Users(user).save)
    .catch(err => {
      if (err) return console.log(err);
    });
});

// @route '/users'
// HTTP DELETE request that deletes all of the users
router.delete("/:id", (req, res) => {
  userId = req.params.id;
  Users.remove({
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

  Users.findByIdAndUpdate(
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
