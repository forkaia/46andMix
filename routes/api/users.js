const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users/usersController.js");

const { findAll, signUp, logIn, deleteById, updateById } = usersController;

// @router '/users/login'
// user submits username and password from client-side
router.post("/login", logIn);

// @route '/users'
// HTTP GET request that gets all of the users
router.get("/", findAll);

// @route '/users'
// HTTP POST request that creates users
router.post("/", signUp);

// @route '/users/:id'
// HTTP DELETE request that deletes all of the users
router.delete("/:id", deleteById);

// @route '/users/:id'
// HTTP PUT request that updates a user
router.put("/:id", updateById);

module.exports = router;
