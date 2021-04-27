const dotenv = require("dotenv")
const express = require('express')
const cors = require('cors');
const connectDB = require("./database/connect");

dotenv.config();
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use(function(req, res, next) {
  res.header(
      "Access-Control-Allow-Origin"
  );
  next();
});

app.use('/', require('./routes/route')) 


module.exports = app