const express = require("express");
const router = express.Router();
const db = require("../../models/Users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @router '/login'
// user submits username and password from client-side
router.post("/", (req, res) => {
  const { username, password } = req.body; // pulling username and password from request body
  // criteria var determines whether to search for a user by their username or email
  const criteria =
    // checks if the given username from req.body.username contains a '@'
    username.indexOf("@") === -1 ? { username: username } : { email: username };
  db.findOne(criteria)
    .then(user => {
      bcrypt
        .compare(password, user.password)
        .then(verifiedUser => {
          if (verifiedUser) {
            const token = jwt.sign(
              {
                data: "foobar"
              },
              "secret",
              { expiresIn: "1h" }
            );
            console.log(`token: ${token}`);
            return token;
          }
        })
        .catch(err => {
          console.log("Error with bcrypt");
          throw err;
        });
    })
    .catch(err => {
      console.log("Error with finding the user");
      throw err;
    });
});

module.exports = router;
