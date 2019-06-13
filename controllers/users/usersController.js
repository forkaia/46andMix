const db = require("../../models/Users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  findAll: (req, res) => {
    db.find()
      .then(users => users)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  },
  signUp: (req, res) => {
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
  },
  logIn: (req, res) => {
    const { username, password } = req.body; // pulling username and password from request body
    // criteria var determines whether to search for a user by their username or email
    const criteria =
      // checks if the given username from req.body.username contains a '@'
      username.indexOf("@") === -1
        ? { username: username }
        : { email: username };
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
            res.send(403); // server denied client the requested URL
            console.log("Incorrect username or password or error with bcrypt");
            throw err;
          });
      })
      .catch(err => {
        console.log("Error with finding the user");
        throw err;
      });
  },
  deleteById: (req, res) => {
    userId = req.params.id;
    db.remove({
      _id: userId
    })
      .then(user => res.json(user))
      .catch(err => console.log(err));
  },
  updateById: (req, res) => {
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
  }
};
