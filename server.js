const express = require("express");
const mongoose = require("mongoose");
const app = express();
const usersRouter = require("./routes/api/users.js");
const loginRouter = require("./routes/api/login");

require("dotenv").config();

// parses incoming http requests to give
// access to req.body
app.use(express.json());
// the router that serves the users api calls
app.use("/users", usersRouter);
// the router that serves the login api calls
app.use("/login", loginRouter);

// MongoDB accessed from a URI
// that is saved in .env file
const db = process.env.MongoURI;

// console.log(db);

// Mongoose func to connect to DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo Database");
  })
  .catch(err => console.log(err));

// Server PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is listening on: ${PORT}`);
});
