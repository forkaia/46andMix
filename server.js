const express = require("express");
const mongoose = require("express");
const app = express();

// parses incoming http requests to give
// access to req.body
app.use(express.json());
